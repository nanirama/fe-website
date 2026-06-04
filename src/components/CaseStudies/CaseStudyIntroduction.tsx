import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

export type CaseStudyIntroductionData = {
  introContent?: PortableTextBlock[] | null;
};

const introductionComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h3 className="mt-10 font-manrope text-2xl font-semibold tracking-tight text-[#020210] first:mt-0 sm:mt-12 sm:text-3xl">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-[#4B5563] last:mb-0 sm:text-lg sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-[#4B5563] last:mb-0 sm:pl-6 sm:text-lg">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-[#4B5563] last:mb-0 sm:pl-6 sm:text-lg">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

type Props = {
  introduction?: CaseStudyIntroductionData | null;
};

/**
 * Case study opening copy from Sanity `introduction.introContent` (portable text: h2, paragraphs, lists, bold, italic).
 */
export default function CaseStudyIntroduction({ introduction }: Props) {
  const blocks = introduction?.introContent;
  if (!blocks?.length) return null;

  return (
    <section
      className="w-full bg-[#F4F6F8] py-14 sm:py-16 lg:py-20"
      aria-labelledby="case-study-introduction-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <h2
          id="case-study-introduction-heading"
          className="font-manrope text-3xl font-semibold tracking-tight text-[#020210] sm:text-4xl"
        >
          Introduction
        </h2>
        <div className="mt-6 max-w-none sm:mt-8">
          <PortableText value={blocks} components={introductionComponents} />
        </div>
      </div>
    </section>
  );
}
