import Link from "next/link";
import { ButtonComponent } from "../ButtonComponent";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type ComparisonItem = {
  _key?: string;
  beforeText?: string;
  afterText?: string;
};

type ComparisonSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  items?: ComparisonItem[];
  primaryButton?: CmsButton;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function CrossIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 shrink-0"
    >
      <path
        d="M5 5L15 15M15 5L5 15"
        stroke="#E8501A"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TickIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-0.5 shrink-0"
    >
      <path
        d="M4 10.5L8.5 15L16 6"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComparisonSection({ data }: { data?: ComparisonSectionData }) {
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();

  const items =
    data?.items?.filter((item) => item?.beforeText?.trim() || item?.afterText?.trim()) ?? [];
  const primaryButton = data?.primaryButton;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");

  return (
    <section
      aria-labelledby={heading ? "comparison-section-heading" : undefined}
      className="w-full bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          {sectionTag && (
            <p className="mb-3 text-base font-medium tracking-wide text-[#1EA9A0] sm:text-lg">
              {sectionTag}
            </p>
          )}
          {heading && (
            <h2
              id="comparison-section-heading"
              className="font-manrope text-balance text-3xl font-bold leading-[1.1] tracking-tight text-[#020210] sm:text-5xl lg:text-[3.25rem]"
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#020210]/60 sm:text-lg">
              {subheading}
            </p>
          )}
        </header>

        {/* Comparison Cards */}
        <div className="relative mt-12 sm:mt-16 lg:mt-20">
          {/* 
            On desktop: cards sit side-by-side, teal card pulls up 
            with negative margin-top to create the elevated effect.
            On mobile: stacked, normal order.
          */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-0">

            {/* Old Way */}
            <div className="w-full rounded-2xl bg-[#F1F3F5] sm:px-7 px-4 py-8 sm:px-10 sm:py-10 lg:w-1/2 lg:rounded-r-none lg:rounded-l-2xl lg:pb-12 lg:pt-10">
              <h3 className="text-3xl font-bold text-[#020210] sm:text-4xl">Old Way</h3>
              <ul className="mt-7 space-y-3" aria-label="Old way comparison points">
                {items.map((item, index) => (
                  <li key={item._key ?? `before-${index}`} className="flex items-start gap-3">
                    <CrossIcon />
                    <span className="text-base leading-relaxed text-[#020210]/80 sm:text-lg">
                      {item.beforeText?.trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* FieldEquip Way — elevated */}
            <div className="w-full rounded-2xl bg-[#1EA9A0] sm:px-7 px-4 py-7 shadow-xl shadow-[#1EA9A0]/30 flex justify-center flex-col sm:px-10 sm:py-10 lg:-mt-3 lg:w-1/2 lg:rounded-2xl lg:pb-17 lg:pt-10">
              <h3 className="text-3xl font-bold text-white sm:text-4xl">FieldEquip Way</h3>
              <ul className="mt-7 space-y-3" aria-label="FieldEquip way comparison points">
                {items.map((item, index) => (
                  <li key={item._key ?? `after-${index}`} className="flex items-start gap-3">
                    <TickIcon />
                    <span className="text-base leading-relaxed text-white/95 sm:text-lg">
                      {item.afterText?.trim()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {primaryLabel ? (
          <div className="mt-16 flex justify-center">
            <ButtonComponent href={primaryHref} variant="primary" className="min-h-11 rounded-full px-6 py-2.5 text-sm">
              {primaryLabel}
            </ButtonComponent>
          </div>
        ) : null}
        {/* CTA Button */}
        {/* {primaryHref && primaryLabel && (
          <div className="mt-12 flex justify-center sm:mt-14">
            <Link
              href={primaryHref}
              {...(shouldOpenInNewTab(primaryHref, primaryButton?.buttonType)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1EA9A0] px-8 py-3 text-sm font-bold text-white transition-colors hover:bg-[#179189] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1EA9A0]"
            >
              {primaryLabel}
            </Link>
          </div>
        )} */}
      </div>
    </section>
  );
}