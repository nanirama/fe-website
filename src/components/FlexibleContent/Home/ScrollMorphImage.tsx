/**
 * ScrollMorphImage — Client Component island.
 *
 * CWV fixes in this revision (on top of previous optimisations)
 * ──────────────────────────────────────────────────────────────────────────────
 * FIX-A  <style> tag REMOVED from JSX.
 *        An inline <style> in a Client Component re-injects into the CSSOM on
 *        every client render, forcing a style recalculation.  The nudge-pulse
 *        keyframes now live in globals.css (see comment at bottom of file).
 *        This removes a repeated CSSOM mutation from the hydration path → TBT ↓
 *
 * FIX-B  scroll-nudge-active class REMOVED from initial JSX.
 *        The previous version had className="scroll-nudge-active" hardcoded on
 *        the nudge div, which meant the CSS animation fired immediately on mount
 *        — bypassing the requestIdleCallback deferral entirely.  The class now
 *        starts absent and is added only inside the idle callback.
 *
 * FIX-C  springLoopRef.current assignment moved inside useEffect.
 *        Assigning to a ref in the component body (outside useEffect/useCallback)
 *        is a render-phase side effect.  It ran on every render, not just once.
 *        Now defined as a stable local function inside useEffect — created once,
 *        never recreated, no stale closure risk.
 *
 * FIX-D  applyProgress defined once as a module-level factory, not inside
 *        the component.  Eliminates per-render function allocation entirely.
 *
 * FIX-E  isLCP prop wires priority + fetchPriority correctly (unchanged from
 *        previous version — documented here for completeness).
 *        Pass isLCP={true} from HomeHeroSection since this IS the LCP element.
 */

"use client";

import Image from "next/image";
import { memo, useMemo, useRef, useEffect } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const PERSPECTIVE_STYLE: React.CSSProperties = {
  perspective: "1400px",
  perspectiveOrigin: "50% 25%",
};

// CSS containment: browser skips this subtree in global layout/style recalcs.
// "paint" excluded intentionally — 3-D perspective must escape paint boundary.
const SECTION_STYLE: React.CSSProperties = {
  contain: "layout style",
};

// Initial tilted state baked into HTML — no layout shift on hydration.
// will-change is absent here; added by JS only on first IO tick (FIX from v1).
const CARD_INITIAL_STYLE: React.CSSProperties = {
  transformOrigin: "50% 100%",
  transform: "rotateX(26deg) scale(0.83) translateY(52px)",
};

// Shadow starts invisible + no filter — zero rasterisation cost during LCP.
const SHADOW_INITIAL_STYLE: React.CSSProperties = {
  bottom: "-8%",
  height: "30%",
  opacity: 0,
  background:
    "radial-gradient(ellipse 90% 60% at 50% 100%, #38bdf8 0%, #0284c7 35%, transparent 72%)",
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface ScrollMorphImageProps {
  imageUrl: string;
  imageUrlMobile?: string;
  imageAlt: string;
  imageWidth?: number;
  imageHeight?: number;
  blurImageUrl?: string;
  /**
   * Set true when this component is the LCP element (above the fold).
   * Controls priority, fetchPriority, and loading on both images.
   * HomeHeroSection always passes isLCP={true}.
   */
  isLCP?: boolean;
}

// ── Pure module-level helpers — allocated once, never recreated ───────────────
function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * (t < 0 ? 0 : t > 1 ? 1 : t);
}

function calcScrollProgress(section: HTMLElement): number {
  const { top } = section.getBoundingClientRect();
  return Math.min(1, Math.max(0, 1 - top / (window.innerHeight * 0.65)));
}

/**
 * FIX-D: applyProgress as a module-level factory.
 * Returns a closure bound to the DOM refs once — called every rAF tick.
 * Zero per-render allocation; no stale closure because refs are stable objects.
 */
function makeApplyProgress(
  cardRef: React.RefObject<HTMLDivElement | null>,
  shadowRef: React.RefObject<HTMLDivElement | null>,
  nudgeRef: React.RefObject<HTMLDivElement | null>,
  gpuLayerActive: React.RefObject<boolean>
) {
  return function applyProgress(p: number) {
    const card   = cardRef.current;
    const shadow = shadowRef.current;
    const nudge  = nudgeRef.current;
    if (!card) return;

    // Promote to GPU compositor layer on first animation tick only.
    if (!gpuLayerActive.current) {
      card.style.willChange  = "transform";
      gpuLayerActive.current = true;
    }

    card.style.transform = [
      `rotateX(${lerp(26, 0, p)}deg)`,
      `scale(${lerp(0.83, 1, p)})`,
      `translateY(${lerp(52, 0, p)}px)`,
    ].join(" ");

    if (shadow) {
      shadow.style.opacity = String(lerp(0.65, 0.18, p));
      shadow.style.filter  = `blur(${lerp(72, 20, p)}px)`;
    }

    if (nudge) {
      nudge.style.opacity = String(lerp(1, 0, Math.min(1, p / 0.3)));
    }
  };
}

// ── Component ─────────────────────────────────────────────────────────────────
const ScrollMorphImage = memo(function ScrollMorphImage({
  imageUrl,
  imageUrlMobile,
  imageAlt,
  imageWidth,
  imageHeight,
  blurImageUrl,
  isLCP = false,
}: ScrollMorphImageProps) {

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const shadowRef  = useRef<HTMLDivElement>(null);
  const nudgeRef   = useRef<HTMLDivElement>(null);

  // ── Animation state refs — mutations never trigger re-renders ─────────────
  const progressRef    = useRef(0);
  const targetRef      = useRef(0);
  const rafRef         = useRef(0);
  const entranceDone   = useRef(false);
  const isVisible      = useRef(false);
  const gpuLayerActive = useRef(false);

  // ── Stable image dimensions ───────────────────────────────────────────────
  const { desktopW, desktopH, MOBILE_W, mobileH, mobileSrc, blurProps } =
    useMemo(() => {
      const desktopW  = imageWidth  ?? 1200;
      const desktopH  = imageHeight ?? 676;
      const MOBILE_W  = 420;
      const mobileH   = Math.round((MOBILE_W / desktopW) * desktopH);
      const mobileSrc = imageUrlMobile ?? imageUrl;
      const blurProps = blurImageUrl
        ? { placeholder: "blur" as const, blurDataURL: blurImageUrl }
        : { placeholder: "empty" as const };
      return { desktopW, desktopH, MOBILE_W, mobileH, mobileSrc, blurProps };
    }, [imageWidth, imageHeight, imageUrlMobile, imageUrl, blurImageUrl]);

  // ── Main effect — wires IO + scroll + idle nudge ──────────────────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /**
     * FIX-D: applyProgress closure created once inside useEffect.
     * Bound to the stable ref objects — never stale, never recreated.
     */
    const applyProgress = makeApplyProgress(
      cardRef,
      shadowRef,
      nudgeRef,
      gpuLayerActive
    );

    /**
     * FIX-C: springLoop defined inside useEffect as a named local function.
     * Replaces the render-phase ref assignment (springLoopRef.current = ...)
     * that was previously outside useEffect — that was a render-phase side
     * effect running on every render.
     */
    let rafId = 0;
    function springLoop() {
      const diff = targetRef.current - progressRef.current;
      if (Math.abs(diff) < 0.0005) {
        progressRef.current = targetRef.current;
        applyProgress(progressRef.current);
        return; // loop self-terminates
      }
      progressRef.current += diff * 0.06; // exponential lerp ≈ spring(50,20,0.9)
      applyProgress(progressRef.current);
      rafId = requestAnimationFrame(springLoop);
    }
    // Keep outer ref in sync so cleanup can cancel
    rafRef.current = rafId;

    // ── Scroll handler — attached lazily on first IO entry ────────────────
    let scrollAttached = false;
    function onScroll() {
      if (!isVisible.current) return;
      targetRef.current = calcScrollProgress(section);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(springLoop);
    }
    function attachScroll() {
      if (!scrollAttached) {
        scrollAttached = true;
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    }

    // ── IntersectionObserver ──────────────────────────────────────────────
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisible.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            attachScroll();
            if (!entranceDone.current) {
              entranceDone.current = true;
              const t = calcScrollProgress(section);
              targetRef.current =
                progressRef.current < 0.02 && t < 0.15
                  ? Math.max(t, 0.08)
                  : t;
              cancelAnimationFrame(rafRef.current);
              rafRef.current = requestAnimationFrame(springLoop);
            }
          }
        }
      },
      { threshold: [0, 0.1] }
    );

    observer.observe(section);

    // Already in viewport on mount (e.g. SSR above-fold)
    const initialP = calcScrollProgress(section);
    if (initialP > 0) {
      progressRef.current  = initialP;
      targetRef.current    = initialP;
      isVisible.current    = true;
      entranceDone.current = true;
      applyProgress(initialP);
      attachScroll();
    } else {
      applyProgress(0);
    }

    /**
     * FIX-B: Nudge CSS animation activated ONLY after idle callback.
     * The class is NOT present in the initial JSX render (was hardcoded before
     * which made the animation run immediately, defeating the deferral).
     * Keyframes live in globals.css — see note at bottom of this file.
     */
    const nudgeEl = nudgeRef.current;
    let idleHandle = 0 as unknown as ReturnType<typeof setTimeout>;

    function activateNudge() {
      nudgeEl?.classList.add("scroll-nudge-active");
    }

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as unknown as {
        requestIdleCallback: (cb: () => void, opts?: object) => number;
      }).requestIdleCallback(activateNudge, { timeout: 2000 });
    } else {
      idleHandle = setTimeout(activateNudge, 200);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      if (scrollAttached) window.removeEventListener("scroll", onScroll);
      clearTimeout(idleHandle);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    /**
     * NOTE — nudge-pulse keyframes must be in globals.css (FIX-A).
     * Add this to your globals.css:
     *
     *   @keyframes nudge-pulse {
     *     0%, 100% { transform: scaleY(0.25); opacity: 0.35; }
     *     50%       { transform: scaleY(1);    opacity: 1;    }
     *   }
     *   .scroll-nudge-line {
     *     transform-origin: top;
     *     transform: scaleY(0.25);
     *     opacity: 0.35;
     *   }
     *   .scroll-nudge-active .scroll-nudge-line {
     *     animation: nudge-pulse 1.7s ease-in-out infinite;
     *   }
     */
    <section
      ref={sectionRef}
      aria-label="FieldEquip scheduler interface preview"
      className="relative w-full mt-4"
      style={SECTION_STYLE}
    >
      {/* Perspective wrapper */}
      <div
        className="mx-auto w-full max-w-6xl px-4 sm:px-8"
        style={PERSPECTIVE_STYLE}
      >
        {/* Card: 3-D tilt target. will-change added by JS on first IO tick. */}
        <div
          ref={cardRef}
          role="img"
          aria-label={imageAlt}
          style={CARD_INITIAL_STYLE}
          className="relative w-full"
        >
          {/* Glow shadow — starts hidden, activated by JS after LCP paint */}
          <div
            ref={shadowRef}
            aria-hidden="true"
            style={SHADOW_INITIAL_STYLE}
            className="pointer-events-none absolute inset-x-4 rounded-[40%]"
          />

          {/* Image container */}
          <div className="relative w-full overflow-hidden max-w-4xl mx-auto rounded-2xl">

            {/*
              MOBILE IMAGE
              On desktop: sizes="1px" → browser skips this entirely.
              On mobile with isLCP: priority + fetchPriority="high" → preloaded.
              On mobile without isLCP: loading="lazy" + fetchPriority="low".
            */}
            <Image
              src={mobileSrc}
              alt={imageAlt}
              width={MOBILE_W}
              height={mobileH}
              sizes="(min-width: 640px) 1px, calc(100vw - 4rem)"
              quality={80}
              priority={isLCP}
              loading={isLCP ? undefined : "lazy"}
              // @ts-ignore — valid HTML attr, TS defs lag behind spec
              fetchPriority={isLCP ? "high" : "low"}
              decoding="async"
              {...blurProps}
              className="select-none w-full sm:mt-0  h-auto block sm:hidden"
              draggable={false}
            />

            {/*
              DESKTOP IMAGE
              isLCP={true}: priority + fetchPriority="high" → Next.js injects
              <link rel="preload"> in <head>; browser fetches before render.
              isLCP={false}: loading="lazy" + fetchPriority="low" → zero
              bandwidth competition with real LCP element above.
            */}
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={desktopW}
              height={desktopH}
              sizes="(max-width: 639px) 1px, (max-width: 1023px) calc(100vw - 4rem), 896px"
              quality={85}
              priority={isLCP}
              loading={isLCP ? undefined : "lazy"}
              // @ts-ignore
              fetchPriority={isLCP ? "high" : "low"}
              decoding="async"
              {...blurProps}
              className="select-none w-full h-auto hidden sm:block"
              draggable={false}
            />

            {/* Inset border shine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/9"
            />
          </div>
        </div>
      </div>

      {/*
        Scroll nudge.
        - NO scroll-nudge-active class here (FIX-B) — JS adds it after idle.
        - CSS keyframes in globals.css (FIX-A) — not injected per-render.
        - opacity controlled by applyProgress via ref mutation (no re-render).
      */}
      <div
        ref={nudgeRef}
        aria-hidden="true"
        className="mt-12 flex flex-col items-center gap-2"
        style={{ opacity: 1 }}
      >
        <span
          className="scroll-nudge-line block h-7 w-px"
          style={{
            background:
              "linear-gradient(to bottom, rgba(56,189,248,0.8), transparent)",
          }}
        />
      </div>
    </section>
  );
});

export default ScrollMorphImage;