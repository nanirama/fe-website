"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import Slider, { type Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import OtherCaseStudyCard, { type OtherCaseStudyListItem } from "@/src/components/CaseStudies/OtherCaseStudyCard";
import { useSlickSlideFocusFix } from "@/src/hooks/useSlickSlideFocusFix";
import { cn } from "@/src/lib/utils";

/**
 * Same width ranges as react-slick builds from `settings.responsive`
 * (sorted breakpoints → min/max media queries). Kept in sync with
 * `VideoTestimonialsSection` sliders.
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

type Props = {
  items: OtherCaseStudyListItem[];
};

export default function OtherCaseStudiesClient({ items }: Props) {
  const sliderRef = useRef<InstanceType<typeof Slider> | null>(null);
  const slickWrapRef = useRef<HTMLDivElement>(null);
  const { onInit: fixHiddenSlideFocus, onReInit: fixHiddenSlideFocusReinit, afterChange: fixHiddenSlideFocusAfter } =
    useSlickSlideFocusFix(slickWrapRef);
  const slidesToShow = useSlidesToShow();
  const showNav = items.length > slidesToShow;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideIndex = Math.min(currentSlide, Math.max(0, items.length - 1));
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
    <section
      className="w-full max-w-[1920px] mx-auto overflow-hidden bg-[#F2F4F7]"
      aria-labelledby="other-case-studies-heading"
    >
      <div className="relative py-12 sm:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
            <h2
              id="other-case-studies-heading"
              className="max-w-[min(100%,36rem)] text-2xl font-semibold leading-tight text-[#111827] sm:text-[28px] lg:text-[32px]"
            >
              Other Case Studies
            </h2>

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
                  aria-label="Previous case studies"
                >
                  <ChevronIcon className="rotate-180"/>
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
                  aria-label="Next case studies"
                >
                  <ChevronIcon />
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div
          ref={slickWrapRef}
          className={[
            "mt-5 sm:mt-6 pl-4 sm:pl-6 lg:pl-8",
            "[&_.slick-list]:!overflow-visible",
            "[&_.slick-track]:flex [&_.slick-track]:items-stretch",
            "[&_.slick-slide]:!flex [&_.slick-slide]:h-auto",
            "[&_.slick-slide>div]:!flex [&_.slick-slide>div]:h-full [&_.slick-slide>div]:w-full",
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
            {items.map((item) => (
              <div key={item._id} className="box-border flex h-full w-full">
                <OtherCaseStudyCard item={item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}
