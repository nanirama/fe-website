'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { ButtonComponent } from "../ButtonComponent";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type BreadcrumbItem = {
  title?: string | null;
  href?: string | null;
};

type BreadcrumbData = {
  items?: BreadcrumbItem[] | null;
};

export type PageHeroSectionData = {
  heading?: string;
  subheading?: string;
  breadcrumb?: BreadcrumbData | null;
  primaryButton?: CmsButton;
  secondaryButton?: CmsButton;
};

type Props = {
  data?: PageHeroSectionData;
  page?: string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function Breadcrumb({ breadcrumb }: { breadcrumb?: BreadcrumbData | null }) {
  if (!breadcrumb) return null;
  const items = [
    { title: "Home", href: "/" },
    ...(breadcrumb.items ?? [])
      .filter((i) => i?.title?.trim())
      .map((i) => ({ title: i.title!.trim(), href: i.href ?? undefined })),
  ];
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex justify-center sm:mb-8">
      <ol className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1 text-xs text-[#020210] sm:text-sm">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={`${item.title}-${idx}`} className="flex items-center gap-2">
              {idx > 0 ? (
                <span aria-hidden="true" className="mx-2 text-[#020210]">
                  <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.750391 9.15002L4.39337 5.50687C4.46649 5.43375 4.5245 5.34693 4.56408 5.25139C4.60365 5.15585 4.62402 5.05344 4.62402 4.95002C4.62402 4.84661 4.60365 4.7442 4.56408 4.64866C4.5245 4.55311 4.46649 4.4663 4.39337 4.39317L0.750217 0.750025" stroke="#13A89E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              ) : null}
              {isLast || !item.href ? (
                <span className="font-normal text-[#020210]" aria-current={isLast ? "page" : undefined}>
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#111827] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

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
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
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
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:w-auto sm:min-h-0"
    >
      {label}
    </Link>
  );
}

export default function PageHeroSection({ data }: Props) {
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();
  const primaryButton = data?.primaryButton;
  const secondaryButton = data?.secondaryButton;
  const pathname = usePathname()
  const isCareers = pathname === '/careers'

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const secondaryHref = isValidHref(secondaryButton?.url) ? secondaryButton.url.trim() : "";

  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Learn more" : "");
  const secondaryLabel = secondaryButton?.label?.trim() || (secondaryHref ? "Learn more" : "");

  return (
    <section
      aria-labelledby="page-hero-heading"
      className="relative w-full max-w-[1920px] mx-auto bg-white"
    >

      <div className="md:absolute sm:-bottom-[20%] md:-bottom-[40%] md:left-[0%] sm:left-0 bg-[url('/images/abt-hero-left-shadow.png')] bg-no-repeat bg-contain z-40 md:w-[481px] md:h-[580px]" />
      <div className="absolute sm:top-[0%] md:right-[10%] sm:right-0 bg-[url('/images/abt-hero-right-shadow.png')] bg-no-repeat bg-contain z-30 md:w-[432px] md:h-[450px] " />

      <div
        className={`relative mx-auto max-w-7xl px-4 sm:pb-16 pb-10 pt-28 text-center md:pb-20 sm:pt-32 lg:pb-24 lg:pt-36 z-40 ${isCareers ? "border-b border-[#ecedf0]" : ""
          }`}
      >
        
        <Breadcrumb breadcrumb={data?.breadcrumb} />

        {heading ? (
          <h1
            id="page-hero-heading"
            className="font-manrope text-balance text-3xl max-w-4xl mx-auto font-medium leading-[1.15] tracking-tight text-[#020210] sm:text-4xl sm:leading-[1.12] lg:text-[54px] lg:leading-[1.1]"
          >
            <span className="whitespace-pre-line font-semibold">{heading}</span>
          </h1>
        ) : (
          <h1 id="page-hero-heading" className="sr-only">
            Page
          </h1>
        )}

        {subheading ? (
          <p className="mx-auto mt-6 max-w-3xl text-base mx-auto leading-relaxed text-[#020210]/70 sm:text-lg sm:leading-relaxed">
            {subheading}
          </p>
        ) : null}

        {primaryLabel ? (
          <div className="mt-6 flex justify-center">
            <ButtonComponent href={primaryHref} variant="primary" className="min-h-11 rounded-full px-6 py-2.5 text-sm">
              {primaryLabel}
            </ButtonComponent>
          </div>
        ) : null}

        {/* {(primaryHref || secondaryHref) && (primaryLabel || secondaryLabel) ? (
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4">
            {primaryHref && primaryLabel ? (
              <PrimaryCta
                label={primaryLabel}
                href={primaryHref}
                external={shouldOpenInNewTab(primaryHref, primaryButton?.buttonType)}
              />
            ) : null}
            {secondaryHref && secondaryLabel ? (
              <SecondaryCta
                label={secondaryLabel}
                href={secondaryHref}
                external={shouldOpenInNewTab(secondaryHref, secondaryButton?.buttonType)}
              />
            ) : null}
          </div>
        ) : null} */}
      </div>
    </section>
  );
}
