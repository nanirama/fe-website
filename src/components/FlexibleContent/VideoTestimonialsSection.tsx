"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReusableVideoCard from "@/src/components/Video/ReusableVideoCard";
import { useSlickSlideFocusFix } from "@/src/hooks/useSlickSlideFocusFix";
import { cn } from "@/src/lib/utils";

type Category = "customerTestimonials" | "productInformation" | "caseStudies";

type VideoTestimonialItem = {
  _id?: string;
  title?: string;
  description?: string;
  playtime?: string;
  youtubeEmbedUrl?: string;
  category?: Category;
};

type VideoTestimonialsSectionData = {
  heading?: string;
  subheading?: string;
  testimonials?: VideoTestimonialItem[];
};

const CATEGORY_LABELS: Record<Category, string> = {
  customerTestimonials: "Customer Testimonials",
  productInformation: "Product Information",
  caseStudies: "Case Studies",
};

const CATEGORY_ORDER: Category[] = [
  "customerTestimonials",
  "productInformation",
  "caseStudies",
];

/**
 * Same width ranges as react-slick builds from `settings.responsive`
 * (sorted breakpoints → min/max media queries).
 */
function slidesToShowForWidth(width: number): number {
  if (width <= 480) return 1;
  if (width <= 640) return 1;
  if (width <= 1024) return 2;
  if (width <= 1280) return 2.005;
  return 2.005;
}

function getInitialSlidesToShow(): number {
  if (typeof window === "undefined") return 2.005;
  return slidesToShowForWidth(window.innerWidth);
}

function useSlidesToShow(): number {
  const [slidesToShow, setSlidesToShow] = useState(getInitialSlidesToShow);

  useLayoutEffect(() => {
    const update = () => setSlidesToShow(slidesToShowForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return slidesToShow;
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="9"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M1.27 12.55L5.95 7.87A1.1 1.1 0 0 0 6 6.15L1.27 1.45"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CategorySliderProps = {
  category: Category;
  label: string;
  items: VideoTestimonialItem[];
  isFirst: boolean;
};

function VideoTestimonialCategorySlider({
  category,
  label,
  items,
  isFirst,
}: CategorySliderProps) {
  const sliderRef = useRef<InstanceType<typeof Slider> | null>(null);
  const slickWrapRef = useRef<HTMLDivElement>(null);
  const { onInit: fixHiddenSlideFocus, onReInit: fixHiddenSlideFocusReinit, afterChange: fixHiddenSlideFocusAfter } =
    useSlickSlideFocusFix(slickWrapRef);
  const slidesToShow = useSlidesToShow();
  const showNav = items.length > slidesToShow;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideIndex = Math.min(currentSlide, Math.max(0, items.length - 1));
  /** Same condition as react-slick `canGoNext` (non-infinite). */
  const canGoPrev = slideIndex > 0;
  const canGoNext =
    items.length > slidesToShow && slideIndex < items.length - slidesToShow;

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    sliderRef.current?.slickPrev();
  }, [canGoPrev]);

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    sliderRef.current?.slickNext();
  }, [canGoNext]);

  /**
   * slidesToShow: 2.005 → two full cards + slight peek of the third.
   * react-slick computes each slide width as: containerWidth / slidesToShow.
   */
  const syncSlideFromSlider = useCallback(() => {
    const inner = sliderRef.current?.innerSlider as
      | { state?: { currentSlide?: number } }
      | undefined;
    const idx = inner?.state?.currentSlide;
    if (typeof idx === "number") setCurrentSlide(idx);
  }, []);

  const settings = useMemo<Settings>(
    () => ({
      infinite: false,
      speed: 200,
      slidesToShow: 2.005,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      swipe: true,
      touchMove: true,
      onInit: () => {
        syncSlideFromSlider();
        fixHiddenSlideFocus();
      },
      onReInit: () => {
        syncSlideFromSlider();
        fixHiddenSlideFocusReinit();
      },
      responsive: [
        {
          breakpoint: 1280,
          settings: { slidesToShow: 2.005, slidesToScroll: 1 },
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 2, slidesToScroll: 1 },
        },
        {
          breakpoint: 640,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: 1, slidesToScroll: 1 },
        },
      ],
    }),
    [syncSlideFromSlider, fixHiddenSlideFocus, fixHiddenSlideFocusReinit],
  );

  return (
    <article
  className={cn(
    "max-w-7xl mx-auto pb-12 last:border-0 border-b border-[#d2d6dc]",
    isFirst ? "sm:mt-8 mt-6" : "mt-12"
  )}
>

      {/* Heading row — constrained inside 7xl */}
      <div className="mx-auto w-full  max-w-7xl px-4 ">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <h3 className="text-2xl font-semibold leading-tight text-[#111827] sm:text-[28px] lg:text-[32px]">
            {label}
          </h3>

          {showNav ? (
            <div className="flex shrink-0 gap-2 self-start sm:self-auto">
              <button
                type="button"
                disabled={!canGoPrev}
                aria-disabled={!canGoPrev}
                onClick={goPrev}
                className={cn(
                  "flex h-[36px] w-[54px] shrink-0 touch-manipulation items-center justify-center rounded-full shadow-sm",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  canGoPrev
                    ? "cursor-pointer bg-[#13A89E] text-white transition-colors hover:bg-[#0f9088] focus-visible:outline-[#13A89E]"
                    : "cursor-not-allowed bg-[#E5E9F0] text-[#6B7280]",
                )}
                aria-label={`Previous ${label}`}
              >
                <ChevronIcon className="rotate-180" />
              </button>
              <button
                type="button"
                disabled={!canGoNext}
                aria-disabled={!canGoNext}
                onClick={goNext}
                className={cn(
                  "flex h-[36px] w-[54px] shrink-0 touch-manipulation items-center justify-center rounded-full shadow-sm",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  canGoNext
                    ? "cursor-pointer bg-[#13A89E] text-white transition-colors hover:bg-[#0f9088] focus-visible:outline-[#13A89E]"
                    : "cursor-not-allowed bg-[#E5E9F0] text-[#6B7280]",
                )}
                aria-label={`Next ${label}`}
              >
                <ChevronIcon />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {/*
        ── Slider layout ──────────────────────────────────────────────────────
        • The wrapper has NO max-width and NO right padding — it spans full width.
        • padding-left mirrors the 7xl responsive gutter so slide[0] left-edge
          aligns exactly with the heading above.
        • slick-list overflow is set to visible so the partial 3rd slide peeks out
          on the right past the viewport. The parent <section> overflow-hidden
          clips it cleanly at the section boundary.
        ───────────────────────────────────────────────────────────────────── */}
      <div
        ref={slickWrapRef}
        className={[
          "mt-5 sm:mt-6 pl-4",
          "[&_.slick-list]:!overflow-visible",
          "[&_.slick-track]:flex",
          "[&_.slick-slide]:h-auto",
          "[&_.slick-slide>div]:h-full",
          /* 25px between cards only — not before first or after last slide */
          "[&_.slick-slide:not(:last-child)>div]:mr-[25px] max-w-7xl mx-auto",
        ].join(" ")}
      >
        <Slider
          ref={sliderRef}
          {...settings}
          afterChange={(index) => {
            fixHiddenSlideFocusAfter(index);
            setCurrentSlide(index);
          }}
        >
          {items.map((item, index) => (
            <div key={item._id ?? `${category}-${index}`} className="box-border h-full">
              <ReusableVideoCard
                title={item.title ?? "Untitled video"}
                description={item.description}
                duration={item.playtime}
                youtubeUrl={item.youtubeEmbedUrl}
                priority={isFirst && index === 0}
                className="w-full"
                showTitleAndDescription
              />
            </div>
          ))}
        </Slider>
        {/* <div className="max-w-7xl pt-12 mx-auto border-b border-[#d2d6dc]"></div> */}
      </div>
    </article>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function VideoTestimonialsSection({
  data,
}: {
  data?: VideoTestimonialsSectionData;
}) {
  const heading = data?.heading?.trim();
  const subheading = data?.subheading?.trim();
  const testimonials = Array.isArray(data?.testimonials) ? data.testimonials : [];

  if (!heading && !subheading && testimonials.length === 0) return null;

  const categorisedSliders = CATEGORY_ORDER.reduce<
    { category: Category; items: VideoTestimonialItem[] }[]
  >((acc, cat) => {
    const items = testimonials.filter((t) => t?.category === cat);
    if (items.length > 0) acc.push({ category: cat, items });
    return acc;
  }, []);

  return (
    <section
      aria-labelledby={heading ? "vts-heading" : undefined}
      className="w-full max-w-[1920px] mx-auto overflow-hidden bg-[#F6F7F8] pt-24 lg:pt-36 pb-8 sm:pb-10 lg:pb-12"
    >
      {(heading || subheading) && (
        <div className="mx-auto max-w-7xl px-4 sm:mb-20 mb-10">
          {heading && (
            <h2
              id="vts-heading"
              className="font-manrope text-4xl font-medium tracking-tight text-[#020210] sm:text-5xl"
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#020210]/70">
              {subheading}
            </p>
          )}
        </div>
      )}

      {categorisedSliders.map(({ category, items }, idx) => (
        <VideoTestimonialCategorySlider
          key={category}
          category={category}
          label={CATEGORY_LABELS[category]}
          items={items}
          isFirst={idx === 0}
        />
      ))}
    </section>
  );
}