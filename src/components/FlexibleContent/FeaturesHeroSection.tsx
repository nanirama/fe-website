import Image from "next/image";
import Link from "next/link";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import { ButtonComponent } from "../ButtonComponent";

import { urlForImage } from "@/src/sanity/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

/** Compatible with Sanity image references passed to `urlForImage` */
type HeroSanityImage = {
  asset?: { _ref?: string };
  alt?: string;
};

type BreadcrumbItem = {
  title?: string | null;
  href?: string | null;
};

interface FeaturesHeroData {
  badge?: string;
  heading?: string;
  description?: PortableTextBlock[];
  breadcrumb?: { items?: BreadcrumbItem[] | null } | null;
  primaryButton?: CmsButton;
  secondaryButton?: CmsButton;
  image?: HeroSanityImage;
}

interface Props {
  data?: FeaturesHeroData;
  page?: string;
}

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

// ─── Portable Text ────────────────────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
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
    em: ({ children }) => <em className="italic">{children}</em>,
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

// ─── Buttons ──────────────────────────────────────────────────────────────────

function PrimaryCta({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#14B8A6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] sm:w-auto sm:min-h-0"
    >
      {label}
    </Link>
  );
}

function SecondaryCta({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:w-auto sm:min-h-0"
    >
      {label}
    </Link>
  );
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

function Breadcrumb({ breadcrumb }: { breadcrumb?: FeaturesHeroData["breadcrumb"] }) {
  if (!breadcrumb) return null;
  const items = [
    { title: "Home", href: "/" },
    ...(breadcrumb.items ?? [])
      .filter((i) => i?.title?.trim())
      .map((i) => ({ title: i.title!.trim(), href: i.href ?? undefined })),
  ];
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-[#020210]/70 sm:text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.title}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-[#13A89E]">{">"}</span> : null}
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-[#020210]">
                  {item.title}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-[#020210]" : ""}>
                  {item.title}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeaturesHeroSection({ data, page }: Props) {
  const badge = data?.badge;
  const heading = data?.heading ?? "";
  const description = data?.description;
  const primaryButton = data?.primaryButton;
  const secondaryButton = data?.secondaryButton;
  const image = data?.image;
  const imageAlt = image?.alt?.trim() || heading || "Product interface preview";

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
    primaryButton?.label?.trim() || (primaryHref ? "Learn more" : "");
  const secondaryLabel =
    secondaryButton?.label?.trim() || (secondaryHref ? "Learn more" : "");

  return (
    <section
      aria-labelledby="features-hero-heading"
      className="relative w-full overflow-hidden max-w-[1920px] mx-auto bg-white pt-28 pb-16"
    >
      {/* Decorative dot pattern — left edge (design) */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] bg-[length:10px_10px] opacity-[0.35] sm:w-20 sm:opacity-40"
      /> */}
      <div className="absolute top-10 right-60 bg-[url('/images/product-hero-shade1.png')] bg-no-repeat bg-contain z-30 w-[500px] h-[500px] " />
      <div className="absolute -bottom-10 -left-30 bg-[url('/images/product-hero-shade2.png')] bg-no-repeat bg-contain z-30 w-[330px] h-[430px] " />
      <div className="absolute -bottom-20 left-0 bg-[url('/images/product-hero-line1.png')] bg-no-repeat bg-contain z-20 w-[260px] h-[570px] " />
      <div className="absolute -top-20 right-50 bg-[url('/images/product-hero-line2.png')] bg-no-repeat bg-contain z-20 w-[780px] h-[780px] " />
      <div className="absolute -top-30 right-50 bg-[url('/images/product-hero-line3.png')] bg-no-repeat bg-contain z-20 w-[780px] h-[500px] " />


      <div className="relative mx-auto z-40 max-w-7xl px-4 pb-12 pt-10 sm:pb-14 sm:pt-12 lg:pb-20 lg:pt-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* Content column — first in DOM for mobile-first; visually left on lg */}
          <div className="order-1 flex min-w-0 flex-col lg:pr-4">
          <Breadcrumb breadcrumb={data?.breadcrumb} />

            {badge ? (
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                {badge}
              </p>
            ) : null}

            {/* <h1
              id="features-hero-heading"
              className="border border-red-600 text-balance font-manrope text-3xl font-semibold leading-[1.12] tracking-tight text-black sm:text-4xl sm:leading-[1.1] lg:text-[2.425rem] xl:text-5xl xl:leading-[1.08]"
            >
              {heading}
            </h1> */}

            <h1
              id="features-hero-heading"
              className="font-manrope text-2xl font-semibold leading-[1.12] tracking-tight text-black sm:text-4xl sm:leading-[1.1] lg:text-[1.8rem] xl:text-4xl xl:leading-[1.08]"
            >
              {heading}
            </h1>

            {description && description.length > 0 ? (
              <div className="mt-5 max-w-xl space-y-3 sm:mt-6 leading-[150%] text-[#020210]/70">
                <PortableText value={description} components={ptComponents} />
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-[14px] mt-4">
              {primaryLabel && (
                <ButtonComponent variant="primary" className="w-full sm:w-auto" href={primaryHref}>
                  {primaryLabel}
                </ButtonComponent>
              )}
              {secondaryLabel && (
                <ButtonComponent variant="secondarytrnsparentWhiteBorder" className="w-full sm:w-auto" href={secondaryHref}>
                  {secondaryLabel}
                </ButtonComponent>
              )}
            </div>
          </div>

          {/* Image column — below content on small screens, right on lg */}
          <div className="order-2 w-full min-w-0">
            <figure className="mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none">
              <div className="rounded-2xl bg-[#0f172a] p-2 shadow-[0_25px_50px_-12px_rgba(15,23,42,0.35)] sm:p-2.5">
                <div className="overflow-hidden rounded-xl bg-slate-800 ring-1 ring-white/10">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={1200}
                    height={900}
                    placeholder={blurImageUrl ? "blur" : "empty"}
                    blurDataURL={blurImageUrl || undefined}
                    className="h-auto w-full object-cover object-top"
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
