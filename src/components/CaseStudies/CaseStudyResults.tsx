import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { ButtonComponent } from "@/src/components/ButtonComponent";
import type { CaseStudyMetricStat } from "@/src/components/CaseStudies/CaseStudyMetricHighlights";
import type { CaseStudyCoverImage } from "@/src/components/CaseStudies/CaseStudyWideImage";
import { urlForImage } from "@/src/sanity/lib/utils";

const IMAGE_MAX = 1920;

export type CaseStudyResultsCta = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

export type CaseStudyResultsData = {
  image?: CaseStudyCoverImage | null;
  resultsContent?: PortableTextBlock[] | null;
  primaryButton?: CaseStudyResultsCta | null;
};

function normalizeLqip(lqip: string | null | undefined): string | undefined {
  if (typeof lqip !== "string") return undefined;
  const t = lqip.trim();
  if (!t) return undefined;
  if (t.startsWith("data:")) return t;
  if (t.startsWith("http://") || t.startsWith("https://")) return undefined;
  return `data:image/jpeg;base64,${t}`;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 10.5L8.5 15L16 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const resultsPortableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-8 font-manrope text-xl font-semibold tracking-tight text-white first:mt-0 sm:text-2xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-white/90 last:mb-0 sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 columns-1 text-base leading-relaxed text-white/90 last:mb-0 md:columns-2 md:[column-gap:2.5rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-white/90 last:mb-0 sm:pl-7">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-4 flex break-inside-avoid gap-3 text-base leading-relaxed text-white/90 last:mb-0">
        <CheckIcon className="mt-0.5 shrink-0 text-[#13A89E]" />
        <span className="min-w-0">{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/95">{children}</em>,
  },
};

type Props = {
  results?: CaseStudyResultsData | null;
  /** Reuses top-of-page headline metrics (same shape as `metricHighlights.stats`). */
  stats?: CaseStudyMetricStat[] | null;
  caseStudyTitle?: string;
};

export default function CaseStudyResults({ results, stats, caseStudyTitle }: Props) {
  const blocks = results?.resultsContent;
  const image = results?.image;
  const button = results?.primaryButton;

  // const href = button?.url?.trim() || "";
  // const label = button?.label?.trim() || "";

  // const hasButton = Boolean(href && label);


  const hasContent = Boolean(blocks?.length);
  const built = image && urlForImage(image);
  const hasImage = Boolean(built);

  const statItems = (stats ?? []).filter((row) => row.heading?.trim() || row.description?.trim());

  const href = typeof button?.url === "string" ? button.url.trim() : "";
  const label = typeof button?.label === "string" ? button.label.trim() : "";
  const hasButton = Boolean(href && label);

  if (!hasImage && !hasContent && statItems.length === 0 && !hasButton) return null;

  let imgSrc: string | undefined;
  let imgWidth = IMAGE_MAX;
  let imgHeight = Math.round((IMAGE_MAX * 9) / 16);

  if (built) {
    imgSrc = built.width(IMAGE_MAX).fit("max").quality(82).auto("format").url();
    const nw = image?.dimensions?.width;
    const nh = image?.dimensions?.height;
    if (nw && nh && nw > 0 && nh > 0) {
      const scale = Math.min(1, IMAGE_MAX / nw);
      imgWidth = Math.round(nw * scale);
      imgHeight = Math.round(nh * scale);
    } else {
      imgHeight = Math.round(IMAGE_MAX / 2.5);
    }
  }

  const lqip = image ? normalizeLqip(image.lqip) : undefined;
  const alt =
    image?.alt?.trim() ||
    (caseStudyTitle?.trim() ? `Results: ${caseStudyTitle.trim()}` : "Case study results");

  return (
    <section className="bg-base text-white" aria-labelledby="case-study-results-heading">
      {hasImage && imgSrc ? (
        <div className="w-full">
          <figure className="mx-auto w-full max-w-[1920px]">
            <div className="relative w-full overflow-hidden bg-black/20">
              <Image
                src={imgSrc}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1920px) 100vw, 1920px"
                quality={82}
                priority={false}
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                placeholder={lqip ? "blur" : "empty"}
                blurDataURL={lqip}
              />
            </div>
          </figure>
        </div>
      ) : null}

      <div className="mx-auto max-w-7xl px-6 py-14 sm:py-16 lg:px-8 lg:py-20">
        <h2
          id="case-study-results-heading"
          className="font-manrope text-3xl font-semibold tracking-tight text-white sm:text-4xl"
        >
          Result
        </h2>

        {hasContent ? (
          <div className="mx-auto mt-8 max-w-none sm:mt-10">
            <PortableText value={blocks!} components={resultsPortableComponents} />
          </div>
        ) : null}

        {statItems.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-10 border-t border-white/10 pt-12 sm:mt-14 sm:gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
            {statItems.map((stat) => (
              <div
                key={stat._key ?? `${stat.heading}-${stat.description}`}
                className="border-l-2 border-[#13A89E] pl-4 sm:pl-5"
              >
                {stat.heading?.trim() ? (
                  <p className="font-manrope text-3xl font-bold leading-none tracking-tight text-white sm:text-4xl">
                    {stat.heading.trim()}
                  </p>
                ) : null}
                {stat.description?.trim() ? (
                  <p className="mt-3 text-base leading-snug text-white/75">{stat.description.trim()}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}

        {label && (
          <div className="mt-10 flex justify-start">
            <ButtonComponent href={href} variant="primary">
              {label}
            </ButtonComponent>
          </div>
        )}
      </div>
    </section>
  );
}
