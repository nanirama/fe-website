import type { PortableTextBlock } from "@portabletext/types";

import type { CaseStudy as CaseStudyLayout1 } from "@/src/components/FlexibleContent/CaseStudyLayout1";
import type { CaseStudy as CaseStudyLayout2 } from "@/src/components/FlexibleContent/CaseStudyLayout2";

/** Row shape from `caseStudiesQuery` in `queries.ts`. */
export type CaseStudyListDocument = {
  _id: string;
  name?: string;
  slug?: string;
  tags?: string[];
  industry?: string;
  shortDescription?: PortableTextBlock[];
  statistics?: { label?: string; value?: string }[];
  image?: object | null;
  logoimage?: object | null;
  clientName?: string;
  clientJobTitle?: string;
  clientTestimonial?: PortableTextBlock[];
};

function blockParagraphs(blocks?: PortableTextBlock[] | null): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((b) => b._type === "block")
    .map((b) => {
      const children = "children" in b ? (b as { children?: { text?: string }[] }).children : [];
      return (children ?? []).map((c) => c.text ?? "").join("");
    })
    .map((s) => s.trim())
    .filter(Boolean);
}

function blocksToPlain(blocks?: PortableTextBlock[] | null): string {
  return blockParagraphs(blocks).join("\n\n");
}

function formatAttribution(doc: CaseStudyListDocument): string {
  const parts = [doc.clientName?.trim(), doc.clientJobTitle?.trim(), doc.industry?.trim()].filter(
    Boolean,
  ) as string[];
  return parts.join(" | ");
}

export function mapCaseStudyToLayout1(doc: CaseStudyListDocument): CaseStudyLayout1 {
  const paras = blockParagraphs(doc.shortDescription);
  const quote = blocksToPlain(doc.clientTestimonial);

  return {
    slug: doc.slug,
    result: doc.industry?.trim() || "CASE STUDY",
    title: doc.name ?? "",
    desc1: paras[0] ?? "",
    desc2: paras.slice(1).join("\n\n"),
    quote: quote || undefined,
    company: formatAttribution(doc) || undefined,
  };
}

export function mapCaseStudyToLayout2(doc: CaseStudyListDocument): CaseStudyLayout2 {
  const desc = blocksToPlain(doc.shortDescription);
  const quote = blocksToPlain(doc.clientTestimonial);

  return {
    slug: doc.slug,
    desc: desc || undefined,
    quote: quote || undefined,
    statistics: doc.statistics?.map((s) => ({ label: s.label, value: s.value })),
    logoimage: doc.logoimage ?? null,
    image: doc.image ?? null,
    company: formatAttribution(doc) || undefined,
  };
}
