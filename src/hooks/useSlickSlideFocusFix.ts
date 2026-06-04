"use client";

import type { RefObject } from "react";
import { useCallback, useLayoutEffect } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const DATA_ATTR = "data-slick-focus-fix";

/** Remove focusable elements from tab order inside slides marked aria-hidden (react-slick). */
export function applySlickSlideFocusFix(root: HTMLElement | null) {
  if (!root) return;
  const slides = root.querySelectorAll<HTMLElement>(".slick-slide");
  slides.forEach((slide) => {
    const hidden = slide.getAttribute("aria-hidden") === "true";
    slide.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR).forEach((el) => {
      if (hidden) {
        if (!el.hasAttribute(DATA_ATTR)) {
          const existing = el.getAttribute("tabindex");
          el.setAttribute(DATA_ATTR, existing === null ? "" : existing);
        }
        el.setAttribute("tabindex", "-1");
      } else {
        const stored = el.getAttribute(DATA_ATTR);
        if (stored !== null) {
          el.removeAttribute(DATA_ATTR);
          if (stored === "") {
            el.removeAttribute("tabindex");
          } else {
            el.setAttribute("tabindex", stored);
          }
        }
      }
    });
  });
}

export function useSlickSlideFocusFix(containerRef: RefObject<HTMLElement | null>) {
  const fix = useCallback((_index?: number) => {
    applySlickSlideFocusFix(containerRef.current);
  }, [containerRef]);

  useLayoutEffect(() => {
    fix();
  }, [fix]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const obs = new MutationObserver(() => fix());
    obs.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });
    return () => obs.disconnect();
  }, [containerRef, fix]);

  return {
    onInit: fix,
    onReInit: fix,
    afterChange: fix,
  };
}
