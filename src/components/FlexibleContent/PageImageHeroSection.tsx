import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/src/types/sanity-image";
import { ButtonComponent } from "../ButtonComponent";

import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type PageImageHeroSectionData = {
  heading?: string;
  subheading?: string;
  primaryButton?: CmsButton;
  secondaryButton?: CmsButton;
  image?: (SanityImage & { alt?: string }) | null;
};

type Props = {
  data?: PageImageHeroSectionData;
  page?: string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function toLabel(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function readBreadcrumb(page?: string): Array<{ label: string; href?: string }> {
  if (!page) return [{ label: "Home", href: "/" }];

  let segmentSource: string;

  try {
    const parsed = JSON.parse(page) as {
      page?: string;
      breadcrumb?: Array<{ label?: string | null; href?: string | null }>;
    };
    if (Array.isArray(parsed?.breadcrumb) && parsed.breadcrumb.length > 0) {
      return parsed.breadcrumb
        .map((item) => {
          const label = item.label?.trim();
          if (!label) return null;
          const href = isValidHref(item.href) ? item.href.trim() : undefined;
          return href ? { label, href } : { label };
        })
        .filter((item): item is { label: string; href?: string } => item !== null);
    }
    segmentSource =
      typeof parsed?.page === "string" && parsed.page.trim().length > 0 ? parsed.page.trim() : "";
  } catch {
    segmentSource = page;
  }

  if (!segmentSource) {
    return [{ label: "Home", href: "/" }];
  }

  const segments = segmentSource.split("/").filter(Boolean);
  const crumbs: Array<{ label: string; href?: string }> = [{ label: "Home", href: "/" }];

  let builtPath = "";
  for (let i = 0; i < segments.length; i += 1) {
    builtPath += `/${segments[i]}`;
    const isLast = i === segments.length - 1;
    crumbs.push({
      label: toLabel(segments[i]),
      href: isLast ? undefined : builtPath,
    });
  }
  return crumbs;
}

function Breadcrumb({ page }: { page?: string }) {
  const crumbs = readBreadcrumb(page);
  return (
    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-[#020210]/70 sm:text-sm">
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1;
          return (
            <li key={`${crumb.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-[#13A89E]">{">"}</span> : null}
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="hover:text-[#020210]">
                  {crumb.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined} className={isLast ? "text-[#020210]" : ""}>
                  {crumb.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default function PageImageHeroSection({ data, page }: Props) {
  const heading = data?.heading?.trim();
  const subheading = data?.subheading?.trim();
  const image = data?.image ?? undefined;
  const imageUrl = image ? urlForImage(image)?.width(1400).format("webp").quality(88).url() : undefined;

  const primaryHref = isValidHref(data?.primaryButton?.url) ? data.primaryButton.url.trim() : "";
  const primaryLabel = data?.primaryButton?.label?.trim() ||  "";
  const secondaryHref = isValidHref(data?.secondaryButton?.url) ? data.secondaryButton.url.trim() : "";
  const secondaryLabel = data?.secondaryButton?.label?.trim() || "";
  return (
    <section
      aria-labelledby={heading ? "page-image-hero-heading" : undefined}
      className="w-full pt-28 lg:pt-32 relative"
    >
      <div className="absolute -bottom-[20%] md:left-[0%] left-0 bg-[url('/images/abt-hero-left-shadow.png')] bg-no-repeat bg-contain z-40 w-[481px] h-[580px] " />
      <div className="absolute top-[0%] md:right-[10%] right-0 bg-[url('/images/abt-hero-right-shadow.png')] bg-no-repeat bg-contain z-30 w-[432px] h-[450px] " />


      <div className="mx-auto max-w-7xl border-b border-slate-300/70 px-4 sm:pb-12 lg:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 z-40 relative">
            <Breadcrumb page={page} />
            {heading ? (
              <h1
                id="page-image-hero-heading"
                className="font-manrope text-balance text-3xl font-medium leading-[1.08] tracking-tight text-[#020210] sm:text-5xl lg:text-6xl"
              >
                {heading}
              </h1>
            ) : null}
            {subheading ? (
              <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#020210]/70 sm:text-xl">{subheading}</p>
            ) : null}

            {(primaryLabel || secondaryLabel) && (
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                {primaryLabel ? (
                  <ButtonComponent
                    href={primaryHref || "#"}
                    variant="primary"
                    className="min-h-11 rounded-full px-6 py-2.5 text-sm hover:bg-[#0d9488]"
                  >
                    {primaryLabel}
                  </ButtonComponent>
                ) : null}
                {secondaryLabel ? (
                  <ButtonComponent
                    href={secondaryHref || "#"}
                    variant="secondarytrnsparentWhiteBorder"
                    className="min-h-11 rounded-full border-slate-300 bg-white px-6 py-2.5 text-sm hover:bg-slate-50"
                  >
                    {secondaryLabel}
                  </ButtonComponent>
                ) : null}
              </div>
            )}
          </div>

          <div className="min-w-0 z-40 relative">
          <div className="relative aspect-[5/3] w-full overflow-hidden  rounded-2xl">
          {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt?.trim() || heading || "Integration image"}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain  rounded-2xl"
              />
            ) : null}
            </div>
            {/* {imageUrl ? (
              <div className="overflow-hidden aspect-[5/3] w-full  rounded-2xl border border-slate-300 bg-white">
                <Image
                  src={imageUrl}
                  alt={image?.alt?.trim() || heading || "Integration image"}
                  fill
                  className="mx-auto h-auto w-full max-w-[480px] object-contain z-40 relative"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                />
              </div>
            ) : null} */}
          </div>
        </div>
      </div>
    </section>
  );
}
