import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/src/types/sanity-image";

import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

export type BuildSystemsData = {
  heading?: string;
  description?: PortableTextBlock[];
  primaryButton?: CmsButton;
  image?: SanityImage & { alt?: string };
};

export type FeatureHighlightSectionData = {
  heading?: string;
  subheading?: string;
  content?: PortableTextBlock[];
  /** Optional; add to Sanity schema when editors should control the graphic. */
  image?: SanityImage & { alt?: string };
  primaryButton?: CmsButton;
  buildSystems?: BuildSystemsData | null;
};

type Props = {
  data?: FeatureHighlightSectionData;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function LinkMark({
  value,
  children,
}: {
  value?: { href?: string; openInNewTab?: boolean };
  children?: ReactNode;
}) {
  const href = value?.href?.trim() || "#";
  const isExternal =
    /^https?:\/\//i.test(href) || /^mailto:/i.test(href) || /^tel:/i.test(href);
  const newTab = value?.openInNewTab !== false && isExternal;

  return (
    <Link
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="text-teal-300 underline decoration-teal-400/80 underline-offset-2 transition-colors hover:text-teal-200"
    >
      {children}
    </Link>
  );
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-base leading-relaxed text-white/75 last:mb-0 sm:text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 mt-2 space-y-4 text-base text-white/85 sm:text-lg">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex sm:items-center items-start gap-3">
        <span className="shrink-0 font-medium text-teal-400" aria-hidden>
          →
        </span>
        <span className="min-w-0 leading-relaxed">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
    link: LinkMark,
  },
};

const buildSystemsPtComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 leading-relaxed text-slate-600 last:mb-0 text-base md:max-w-md w-full">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-slate-900">{children}</strong>,
    em: ({ children }) => <em className="italic text-slate-700">{children}</em>,
  },
};

function hasBuildSystemsContent(bs?: BuildSystemsData | null): boolean {
  if (!bs) return false;
  const hasImage = Boolean(bs.image?.asset?._ref);
  const hasDesc = Boolean(bs.description && bs.description.length > 0);
  const hasBtn = isValidHref(bs.primaryButton?.url);
  return Boolean(bs.heading?.trim() || hasDesc || hasBtn || hasImage);
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

export default function FeatureHighlightSection({ data }: Props) {
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();
  const content = data?.content;
  const primaryButton = data?.primaryButton;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Learn more" : "");

  const hasContent = content && content.length > 0;

  const buildSystems = data?.buildSystems;
  const showBuildSystems = hasBuildSystemsContent(buildSystems ?? undefined);

  const bsImage = buildSystems?.image;
  const buildSystemsImageUrl =
    bsImage &&
    urlForImage(bsImage)?.width(1200)?.format("webp")?.fit("max")?.quality(88)?.url();
  const buildSystemsBlurUrl =
    bsImage &&
    urlForImage(bsImage)?.width(40)?.blur(25)?.format("webp")?.fit("max")?.url();
  const buildSystemsImageAlt =
    bsImage?.alt?.trim() || buildSystems?.heading?.trim() || "Product screenshot";

  const bsBtn = buildSystems?.primaryButton;
  const bsHref = isValidHref(bsBtn?.url) ? bsBtn.url.trim() : "";
  const bsLabel = bsBtn?.label?.trim() || (bsHref ? "Learn more" : "");
  const bsHasDesc = Boolean(buildSystems?.description && buildSystems.description.length > 0);

  return (
    <section
      aria-labelledby={heading ? "feature-highlight-heading" : undefined}
      className="w-full bg-brand md:pt-12 md:pb-36 py-10 relative"
    >
      <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8 relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-2 min-w-0 lg:order-1 md:block hidden">
            <Image src={`/images/globe.png`} alt="Globe" width={900} height={750} className="absolute left-0 top-0 object-contain" />
            {/* <div className="absolute left-0 top-0">
              <Image src={`/images/globe.png`} alt="Globe" width={1005} height={1313} />
            </div> */}
          </div>

          <div className="order-1 min-w-0 lg:order-2 md:mt-10 md:mb-40 z-50 relative">
            {heading ? (
              <h2
                id="feature-highlight-heading"
                className="font-manrope text-balance text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.25rem] xl:text-4xl"
              >
                {heading}
              </h2>
            ) : null}

            {subheading ? (
              <p className="mt-4 text-base leading-relaxed text-slate-300 sm:mt-5 sm:text-lg">
                {subheading}
              </p>
            ) : null}

            {hasContent ? (
              <div className="mt-6 sm:mt-8">
                <PortableText value={content} components={ptComponents} />
              </div>
            ) : null}

            {primaryLabel ? (
              <div className="mt-5">
                <PrimaryCta
                  label={primaryLabel}
                  href={primaryHref || "#"}
                  external={shouldOpenInNewTab(primaryHref, primaryButton?.buttonType)}
                />
              </div>
            ) : null}
          </div>
        </div>

        {showBuildSystems && buildSystems ? (
          <div className="mx-auto mt-16 w-full max-w-7xl sm:mt-20 lg:mt-24">
            <div className="rounded-3xl bg-white z-20 relative px-6 pt-10 shadow-sm sm:px-8 sm:pt-12 lg:px-12 lg:pt-16 overflow-hidden">
              <div className="flex md:flex-row flex-col items-center gap-4 lg:grid-cols-2 lg:gap-14 xl:gap-20">
                <div className="order-1 lg:order-1 md:pb-16 w-full">
                  <Link href="/" className="mb-4 inline-block">
                    <Image
                      src="/images/logo.svg"
                      alt="FieldEquip"
                      width={187}
                      height={35}
                      className="h-auto w-36 sm:w-[187px]"
                    />
                  </Link>
                  {buildSystems.heading ? (
                    <h3 className="font-manrope text-balance text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-[42px]">
                      {buildSystems.heading}
                    </h3>
                  ) : null}
                  {bsHasDesc && buildSystems.description ? (
                    <div className="mt-4">
                      <PortableText
                        value={buildSystems.description}
                        components={buildSystemsPtComponents}
                      />
                    </div>
                  ) : null}
                  {bsLabel ? (
                    <div className="mt-5">
                      <PrimaryCta
                        label={bsLabel}
                        href={bsHref || "#"}
                        external={shouldOpenInNewTab(bsHref, bsBtn?.buttonType)}
                      />
                    </div>
                  ) : null}
                </div>
                {buildSystemsImageUrl ? (
                  <div className="order-2 flex justify-center lg:order-2 lg:justify-end md:w-7/5 w-full">
                    <div className="relative w-full max-w-5xl drop-shadow-xl  -mb-13 md:-mr-28">
                      {/* <div className="absolute -top-[39%] right-[58%] bg-[url('/images/abt-hero-right-shadow.png')] bg-no-repeat bg-full w-[470px] h-[700px] -z-1" /> */}
                      <div className="blur-[150px] overflow-hidden pointer-events-none opacity-40 absolute top-[0%] left-[0%] bg-[radial-gradient(ellipse_60%_90%_at_48%_30%,#0066ff_0%,#005dff_35%,transparent_75%)] bg-no-repeat bg-full w-[400px] h-[480px] -z-1" />

                      <Image
                        src={buildSystemsImageUrl}
                        alt={buildSystemsImageAlt}
                        width={1100}
                        height={1000}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="h-auto w-full rounded-xl object-contain border"
                        placeholder={buildSystemsBlurUrl ? "blur" : "empty"}
                        blurDataURL={buildSystemsBlurUrl || undefined}
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
