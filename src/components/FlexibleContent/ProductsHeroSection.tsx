import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { ButtonComponent } from "../ButtonComponent";
import { urlForImage } from "@/src/sanity/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Button {
  label?: string | null;
  url?: string | null;
}

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

/** Matches Sanity image shape for `urlForImage` */
type ProductHeroImage = {
  asset?: { _ref?: string };
  alt?: string;
};

interface ProductHeroSectionProps {
  data?: {
    badge?: string;
    heading?: string;
    description?: PortableTextBlock[];
    primaryButton?: Button;
    secondaryButton?: Button;
    image?: ProductHeroImage;
  };
}

// ─── PortableText ───────────────────────────────────────────────────────────────

const descriptionComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-[#4B5563] sm:text-lg sm:leading-relaxed">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-neutral-800">{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      const newTab: boolean = value?.openInNewTab ?? true
      return (
        <Link
          href={href}
          className="text-teal-600 underline underline-offset-2 hover:text-teal-700 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
};

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductHeroSection({ data }: ProductHeroSectionProps) {
  const badge = data?.badge;
  const heading = data?.heading ?? "";
  const description = data?.description;
  const primaryButton = data?.primaryButton;
  const secondaryButton = data?.secondaryButton;
  const image = data?.image;

  const imageAlt = image?.alt?.trim() || heading || "FieldEquip product interface";

  const imageUrl =
    (image &&
      urlForImage(image)
        ?.width(1000)
        ?.format("webp")
        ?.fit("max")
        ?.quality(85)
        ?.url()) || "/images/hero-image.png";

  const blurImageUrl =
    image &&
    urlForImage(image)
      ?.width(40)
      ?.blur(25)
      ?.format("webp")
      ?.fit("max")
      ?.url();

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const secondaryHref = isValidHref(secondaryButton?.url)
    ? secondaryButton.url.trim()
    : "";

  const primaryLabel =
    primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");
  const secondaryLabel =
    secondaryButton?.label?.trim() ||
    (secondaryHref ? "Build Your Business Case" : "");

  const primaryExternal = /^https?:\/\//i.test(primaryHref);
  const secondaryExternal = /^https?:\/\//i.test(secondaryHref);

  return (
    <section
      aria-labelledby="product-hero-heading"
      className="relative mx-auto w-full max-w-[1640px] overflow-x-hidden overflow-y-hidden bg-white"
    >
      {/* Atmosphere: soft teal wash + dot grid on the right (design) */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[min(100%,920px)] bg-gradient-to-l from-teal-50/95 via-cyan-50/40 to-transparent lg:max-w-[58%]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full max-w-[min(100%,880px)] bg-[linear-gradient(to_right,rgba(20,184,166,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.08)_1px,transparent_1px)] bg-[length:28px_28px] opacity-60 lg:max-w-[52%]"
      /> */}

      <div className="absolute top-10 right-60 bg-[url('/images/product-hero-shade1.png')] bg-no-repeat bg-contain z-30 w-[500px] h-[500px] " />
      <div className="absolute -bottom-10 -left-30 bg-[url('/images/product-hero-shade2.png')] bg-no-repeat bg-contain z-30 w-[330px] h-[430px] " />
      <div className="absolute -bottom-20 left-10 bg-[url('/images/product-hero-line1.png')] bg-no-repeat bg-contain z-20 w-[260px] h-[570px] " />
      <div className="absolute -top-20 right-30 bg-[url('/images/product-hero-line2.png')] bg-no-repeat bg-contain z-20 w-[780px] h-[780px] " />
      <div className="absolute -top-30 right-30 bg-[url('/images/product-hero-line3.png')] bg-no-repeat bg-contain z-20 w-[780px] h-[500px] " />


      <div className="relative z-[40] flex w-full flex-col gap-y-10 py-16 sm:gap-y-12 sm:py-20 lg:flex-row lg:items-stretch lg:gap-x-0 lg:gap-y-0 lg:py-24 xl:py-28">
        {/* Copy: 50% column; pl aligns with left edge of centered max-w-7xl (1280px) inside 1920 */}
        <div
          className="order-1 flex w-full z-80 relative min-w-0 flex-col justify-center px-4 sm:px-6 lg:box-border lg:flex-[0_0_50%] lg:pl-[max(1rem,calc((min(100vw,1640px)-1280px)/2+1rem))] lg:pr-8 xl:pr-10"
        >
          {badge ? (
            <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-200/80 bg-teal-50 px-3.5 py-1.5 text-xs font-medium tracking-wide text-teal-800 sm:text-sm">
              <WrenchIcon className="size-4 shrink-0 text-[#0e1d1b]" />
              {badge}
            </span>
          ) : null}

          <h1
            id="product-hero-heading"
            className="text-balance text-3xl font-bold leading-[1.12] tracking-tight text-black sm:text-4xl sm:leading-[1.1] lg:text-5xl lg:leading-[1.08] xl:text-[3.25rem]"
          >
            {heading}
          </h1>

          {description?.length ? (
            <div className="mt-5 max-w-xl space-y-3 sm:mt-6">
              <PortableText
                value={description}
                components={descriptionComponents}
              />
            </div>
          ) : null}

         
          {(primaryHref || secondaryHref) && (
            <div className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <ButtonComponent variant="primary" className="w-full sm:w-auto" href={primaryHref} target={primaryExternal ? "_blank" : undefined} rel={primaryExternal ? "noopener noreferrer" : undefined}>
                {primaryLabel}
              </ButtonComponent>
              <ButtonComponent variant="secondarytrnsparentWhiteBorder" className="w-full sm:w-auto">
                {secondaryLabel}
              </ButtonComponent>
            </div>
          )}
        </div>

        {/* Image: 50% column; flush to right edge of max-w-[1440px] section (no 7xl inset on this side) */}
        <div className="order-2 flex min-h-[520px] w-full min-w-0 items-stretch justify-center overflow-hidden px-4 sm:px-6 lg:flex-[0_0_50%] lg:min-h-[420px] lg:justify-end lg:pl-6 lg:pr-0">
          <figure className="relative h-full min-h-[520px] z-20 w-full max-w-lg sm:max-w-2xl lg:max-w-none">
            <Image
              fill
              src={imageUrl}
              alt={imageAlt}
              className="object-contain object-bottom lg:object-[right_bottom]"
              sizes="(max-width: 1023px) min(100vw - 2rem, 42rem), (max-width: 1920px) 50vw, 960px"
              placeholder={blurImageUrl ? "blur" : "empty"}
              blurDataURL={blurImageUrl || undefined}
              priority
              fetchPriority="high"
              quality={85}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
