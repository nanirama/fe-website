import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { urlForImage } from "@/src/sanity/lib/utils";
import type { CaseStudyCoverImage } from "@/src/components/CaseStudies/CaseStudyWideImage";

export type CaseStudyChallengesData = {
  image?: CaseStudyCoverImage | null;
  challengesContent?: PortableTextBlock[] | null;
};

function normalizeLqip(lqip: string | null | undefined): string | undefined {
  if (typeof lqip !== "string") return undefined;
  const t = lqip.trim();
  if (!t) return undefined;
  if (t.startsWith("data:")) return t;
  if (t.startsWith("http://") || t.startsWith("https://")) return undefined;
  return `data:image/jpeg;base64,${t}`;
}

const challengesPortableComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-8 font-manrope text-3xl font-semibold tracking-tight text-[#020210] first:mt-0 sm:text-4xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-[#020210] last:mb-0 sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-none space-y-4 pl-0 text-base leading-relaxed text-[#020210] last:mb-0">
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
      <li className="flex gap-3 text-base leading-relaxed">
        <span className="mt-0.5 shrink-0 font-medium leading-none text-[#13A89E]" aria-hidden>
          →
        </span>
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
  challenges?: CaseStudyChallengesData | null;
  /** For image alt fallback */
  caseStudyTitle?: string;
};

export default function CaseStudyChallenges({ challenges, caseStudyTitle }: Props) {
  const blocks = challenges?.challengesContent;
  const image = challenges?.image;
  const hasContent = Boolean(blocks?.length);
  const built = image && urlForImage(image);
  const hasImage = Boolean(built);

  if (!hasContent && !hasImage) return null;

  const maxW = 720;
  let imgSrc: string | undefined;
  let imgWidth = maxW;
  let imgHeight = Math.round((maxW * 3) / 4);

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
    (caseStudyTitle?.trim() ? `Challenges illustration: ${caseStudyTitle.trim()}` : "Challenges illustration");

  return (
    <section
      className="w-full bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="case-study-challenges-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div
          className={
            hasImage
              ? "grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16"
              : "mx-auto max-w-3xl"
          }
        >
          {hasImage && imgSrc ? (
            <div className="order-2 flex justify-center lg:order-1 lg:justify-start">
              <figure className="relative w-full max-w-lg">
                <div className="relative w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={imgSrc}
                    alt={alt}
                    width={imgWidth}
                    height={imgHeight}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 100vw, 50vw"
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

          <div className={`order-1 min-w-0 ${hasImage ? "lg:order-2" : ""}`}>
            <h2
              id="case-study-challenges-heading"
              className="font-manrope text-3xl font-semibold tracking-tight text-[#020210] sm:text-4xl"
            >
              Challenges
            </h2>
            {hasContent ? (
              <div className="mt-6 max-w-none sm:mt-8">
                <PortableText value={blocks!} components={challengesPortableComponents} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
