import OtherCaseStudiesClient from "@/src/components/CaseStudies/OtherCaseStudiesClient";
import type { OtherCaseStudyListItem } from "@/src/components/CaseStudies/OtherCaseStudyCard";

type Props = {
  items: OtherCaseStudyListItem[];
};

/** Related case studies carousel; pass studies excluding the current slug (see page). */
export default function OtherCaseStudies({ items }: Props) {
  if (!items.length) return null;
  return <OtherCaseStudiesClient items={items} />;
}
