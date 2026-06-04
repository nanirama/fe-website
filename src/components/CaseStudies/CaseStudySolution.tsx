import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { urlForImage } from "@/src/sanity/lib/utils";
import type { CaseStudyCoverImage } from "@/src/components/CaseStudies/CaseStudyWideImage";

export type CaseStudySolutionData = {
  image?: CaseStudyCoverImage | null;
  solutionsContent?: PortableTextBlock[] | null;
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

const solutionPortableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-8 font-manrope text-4xl mb-6 font-semibold tracking-tight text-[#020210] first:mt-0 sm:text-4xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-[#020210] last:mb-0 sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 columns-1 text-base leading-relaxed text-[#020210] last:mb-0 md:columns-2 md:[column-gap:2.5rem]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-3 pl-6 text-base leading-relaxed text-[#020210] last:mb-0 sm:pl-7">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-4 flex break-inside-avoid gap-3 text-base leading-relaxed last:mb-0">
        <CheckIcon className="mt-0.5 shrink-0 text-[#13A89E]" />
        <span className="min-w-0">{children}</span>
      </li>
    ),
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

type Props = {
  solutions?: CaseStudySolutionData | null;
  caseStudyTitle?: string;
};

export default function CaseStudySolution({ solutions, caseStudyTitle }: Props) {
  const blocks = solutions?.solutionsContent;
  const image = solutions?.image;
  const hasContent = Boolean(blocks?.length);
  const built = image && urlForImage(image);
  const hasImage = Boolean(built);

  if (!hasContent && !hasImage) return null;

  const maxW = 1200;
  let imgSrc: string | undefined;
  let imgWidth = maxW;
  let imgHeight = Math.round((maxW * 9) / 16);

  if (built) {
    imgSrc = built.width(maxW).fit("max").quality(82).auto("format").url();
    const nw = image?.dimensions?.width;
    const nh = image?.dimensions?.height;
    if (nw && nh && nw > 0 && nh > 0) {
      const scale = Math.min(1, maxW / nw);
      imgWidth = Math.round(nw * scale);
      imgHeight = Math.round(nh * scale);
    }
  }

  const lqip = image ? normalizeLqip(image.lqip) : undefined;
  const alt =
    image?.alt?.trim() ||
    (caseStudyTitle?.trim() ? `Solution: ${caseStudyTitle.trim()}` : "Solution illustration");

  return (
    <section
      className="w-full bg-[#f5f7f9] py-14 sm:py-16 lg:py-20"
      aria-labelledby="case-study-solution-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* <h2
          id="case-study-solution-heading"
          className="font-manrope text-3xl font-semibold tracking-tight text-[#020210] sm:text-4xl"
        >
          Solution
        </h2> */}

        {hasImage && imgSrc ? (
          <figure className="mx-auto mt-8 max-w-3xl sm:mt-10">
            <div className="relative w-full overflow-hidden rounded-2xl bg-white/60">
              <Image
                src={imgSrc}
                alt={alt}
                width={imgWidth}
                height={imgHeight}
                className="h-auto w-full object-contain"
                sizes="(max-width: 1280px) 100vw, 1152px"
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
        ) : null}

        {hasContent ? (
          <div className="mx-auto mt-10 max-w-none sm:mt-12">
            <PortableText value={blocks!} components={solutionPortableComponents} />
          </div>
        ) : null}
      </div>
    </section>
  );
}
