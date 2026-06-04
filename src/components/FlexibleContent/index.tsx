import { Suspense, cache } from "react";
import { cacheTag, cacheLife } from "next/cache";
import type { ReactElement } from "react";
import type { SanityImage } from "@/src/types/sanity-image";

import HomeHeroSection from "./Home/HomeHeroSection";
import HomeStatsSection from "./Home/HomeStatsSection";
import HomeRoleSection from "./Home/HomeRoleSection";
import NoMiddlemenSection from "./Home/NoMiddlemenSection";
import ClientLogosSection from "./ClientLogosSection";
import CaseStudiesSection from "./CaseStudiesSection";
import CtaSection from "./CtaSection";
import MediaContentSection from "./MediaContentSection";
import ProductHeroSection from "./ProductsHeroSection";
import FeatureGridSection from "./FeatureGridSection";
import PlatformDeepDiveSection from "./PlatformDeepDiveSection";
import FaqSection from "./FaqSection";
import CtaSectionDark from "./CtaSectionDark";
import FeaturesCapabilitiesSection from "./FeaturesCapabilitiesSection";
import FeaturesHeroSection from "./FeaturesHeroSection";
import PageHeroSection from "./PageHeroSection";
import ContentImageSection from "./ContentImageSection";
import ProblemSection from "./ProblemSection";
import StatementSection from "./StatementSection";
import QuoteBannerSection from "./QuoteBannerSection";
import FeatureHighlightSection from "./FeatureHighlightSection";
import CareersSection from "./CareersSection";
import TeamSection from "./TeamSection";
import CenteredCalloutSection from "./CenteredCalloutSection";
import SplitContentSection from "./SplitContentSection";
import Soc2Type2Section from "./Soc2Type2Section";
import ComparisonSection from "./ComparisonSection";
import FeatureCardsSection from "./FeatureCardsSection";
import HowItWorksSection from "./HowItWorksSection";
import WhoItsForSection from "./WhoItsForSection";
import IntegrationsSection from "./IntegrationsSection";
import PageImageHeroSection from "./PageImageHeroSection";
import CoreCapabilitiesSection from "./CoreCapabilitiesSection";
import OutcomeSplitSection from "./OutcomeSplitSection";
import VideoTestimonialsSection from "./VideoTestimonialsSection";
import ImageOnlySection, { type ImageOnlySectionData } from "./ImageOnlySection";
import IndustriesHeroSection from "./IndustriesHeroSection";
import BuiltForRemoteSection from "./BuiltForRemoteSection";
import ContactSection from "./ContactSection";
import ScheduleDemoSection from "./ScheduleDemoSection";
import RoiCalculatorSection from "./RoiCalculatorSection";
import WhitePaperHeroSection from "./WhitePaperHeroSection";
import { getAllCaseStudies } from "@/src/sanity/loader/loadQuery";
import { mapCaseStudyToLayout1, mapCaseStudyToLayout2 } from "@/src/sanity/lib/mapCaseStudiesForSection";

// import {
//   loadLatestPosts,
//   loadAllProviders,
//   loadAllClinics,
//   loadAllLabTests,
// } from '@/sanity/loader/loadQuery';

type HeroSectionData = {
  heading?: string;
  description?: Array<{ _type?: string; children?: Array<{ text?: string }> }>;
  image?: { alt?: string; url?: string };
};

type HomeStatItem = {
  value?: string;
  label?: string;
};

type HomeStatsSectionData = {
  stats?: HomeStatItem[];
};

type PortableTextBlock = {
  _type: string;
  children?: Array<{ _type?: string; text?: string }>;
};

type HomeRoleCard = {
  tag?: string;
  heading?: string;
  description?: PortableTextBlock[];
  linkText?: string;
  icon?: { alt?: string; url?: string };
};

type HomeRolesSectionData = {
  heading?: string;
  cards?: HomeRoleCard[];
};

type ClientLogoItem = {
  link?: string;
  logo?: { alt?: string; url?: string };
};

type ClientLogosSectionData = {
  logos?: ClientLogoItem[];
};

type NoMiddlemenSectionData = {
  headline?: PortableTextBlock[];
  image?: { alt?: string; image?: { url?: string } };
  bodyContent?: PortableTextBlock[];
};

type MediaContentItem = {
  _key?: string;
  eyebrow?: string;
  title?: string;
  description?: PortableTextBlock[];
  image?: SanityImage;
  alt?: string;
  imagePosition?: "auto" | "left" | "right";
  linkText?: string;
};

type MediaContentSectionData = {
  title?: string;
  theme?: "dark" | "light";
  items?: MediaContentItem[];
};

type CaseStudyItem = {
  slug?: string | null;
  result?: string | null;
  title?: string | null;
  desc1?: string | null;
  desc2?: string | null;
  quote?: string | null;
  company?: string | null;
  desc?: string | null;
  stat1?: string | null;
  stat2?: string | null;
  stat3?: string | null;
};

type CaseStudiesSectionData = {
  heading?: string;
  layout?: "layout1" | "layout2";
  caseStudies?: CaseStudyItem[];
};

type FlexibleSection = {
  _key?: string;
  _type?: string;
} & HeroSectionData &
  HomeStatsSectionData &
  HomeRolesSectionData &
  ClientLogosSectionData &
  NoMiddlemenSectionData &
  MediaContentSectionData &
  CaseStudiesSectionData &
  Omit<ImageOnlySectionData, "_type">;

type SectionComponentProps = {
  data?: FlexibleSection;
  page?: string;
};

const sectionComponents: Record<string, (props: SectionComponentProps) => ReactElement> = {
  homeHeroSection: HomeHeroSection,
  homeStatsSection: HomeStatsSection,
  homeRolesSection: HomeRoleSection,
  // homeRoleSection: HomeRoleSection,
  clientLogosSection: ClientLogosSection,
  noMiddlemenSection: NoMiddlemenSection as (props: SectionComponentProps) => ReactElement,
  caseStudiesSection: CaseStudiesSection,
  ctaSection: CtaSection as (props: SectionComponentProps) => ReactElement,
  ctaSectionDark: CtaSectionDark as (props: SectionComponentProps) => ReactElement,
  mediaContentSection:MediaContentSection,
  productHeroSection: ProductHeroSection as (props: SectionComponentProps) => ReactElement,
  featuresHeroSection: FeaturesHeroSection as (props: SectionComponentProps) => ReactElement,
  pageHeroSection: PageHeroSection as (props: SectionComponentProps) => ReactElement,
  contentImageSection: ContentImageSection as (props: SectionComponentProps) => ReactElement,
  problemSection: ProblemSection as (props: SectionComponentProps) => ReactElement,
  statementSection: StatementSection as (props: SectionComponentProps) => ReactElement,
  quoteBannerSection: QuoteBannerSection as (props: SectionComponentProps) => ReactElement,
  featureHighlightSection: FeatureHighlightSection as (props: SectionComponentProps) => ReactElement,
  careersSection: CareersSection as (props: SectionComponentProps) => ReactElement,
  teamSection: TeamSection as (props: SectionComponentProps) => ReactElement,
  centeredCalloutSection: CenteredCalloutSection as (props: SectionComponentProps) => ReactElement,
  splitContentSection: SplitContentSection as (props: SectionComponentProps) => ReactElement,
  soc2Type2Section: Soc2Type2Section as (props: SectionComponentProps) => ReactElement,
  comparisonSection: ComparisonSection as (props: SectionComponentProps) => ReactElement,
  featureCardsSection: FeatureCardsSection as (props: SectionComponentProps) => ReactElement,
  howItWorksSection: HowItWorksSection as (props: SectionComponentProps) => ReactElement,
  whoItsForSection: WhoItsForSection as (props: SectionComponentProps) => ReactElement,
  integrationsSection: IntegrationsSection as (props: SectionComponentProps) => ReactElement,
  pageImageHeroSection: PageImageHeroSection as (props: SectionComponentProps) => ReactElement,
  coreCapabilitiesSection: CoreCapabilitiesSection as (props: SectionComponentProps) => ReactElement,
  outcomeSplitSection: OutcomeSplitSection as (props: SectionComponentProps) => ReactElement,
  videoTestimonialsSection: VideoTestimonialsSection as (props: SectionComponentProps) => ReactElement,
  imageOnlySection: ImageOnlySection as (props: SectionComponentProps) => ReactElement,
  featureGridSection: FeatureGridSection as (props: SectionComponentProps) => ReactElement,
  industriesHeroSection: IndustriesHeroSection as (props: SectionComponentProps) => ReactElement,
  builtForRemoteSection: BuiltForRemoteSection as (props: SectionComponentProps) => ReactElement,
  featuresCapabilitiesSection: FeaturesCapabilitiesSection as (props: SectionComponentProps) => ReactElement,
  contactSection: ContactSection as (props: SectionComponentProps) => ReactElement,
  scheduleDemoSection: ScheduleDemoSection as (props: SectionComponentProps) => ReactElement,
  roiCalculatorSection: RoiCalculatorSection as (props: SectionComponentProps) => ReactElement,
  platformDeepDiveSection: PlatformDeepDiveSection as (props: SectionComponentProps) => ReactElement,
  faqSection: FaqSection as (props: SectionComponentProps) => ReactElement,
  whitePaperHeroSection: WhitePaperHeroSection as (props: SectionComponentProps) => ReactElement,
};

type FlexibleContentProps = {
  data?: {
    sections?: unknown[];
  };
  page?:string;
};

function SectionFallbackLoader() {
  return (
    <div
      className="flex min-h-50 items-center justify-center"
      role="status"
      aria-live="polite"
      aria-label="Loading section"
    >
      <span
        aria-hidden="true"
        className="relative block h-10 w-10 rounded-full border-2 border-[#13A89E]/25 border-t-[#13A89E] animate-spin"
      >
        <span className="absolute inset-1 rounded-full border border-[#020210]/15 border-b-[#020210]/55 animate-spin [animation-duration:1.2s]" />
      </span>
    </div>
  );
}

// React Request Memoization: deduplicates getAllCaseStudies() within a single
// render pass — only one Sanity round-trip no matter how many sections request it.
const getCaseStudies = cache(getAllCaseStudies);

const FlexibleContent = async ({
  data,
  page,
}: FlexibleContentProps) => {
  // ── Component-level Data Cache ──────────────────────────────────────────────
  // "use cache" persists the rendered RSC payload in Next.js Data Cache.
  // The cache is keyed by the serialised props ({data, page}).
  // Invalidated on-demand when Sanity publishes: revalidateTag('home') clears it.
  "use cache";
  cacheTag('home', 'caseStudy');
  cacheLife({ revalidate: 3600 });

  const hasCaseStudies = data?.sections?.some(
    (s) => (s as FlexibleSection)?._type === 'caseStudiesSection'
  );
  const caseStudyDocs = hasCaseStudies ? await getCaseStudies() : [];

  const sections = await Promise.all(
    data?.sections && data?.sections?.map(async (section, index: number) => {
      const typedSection = section as FlexibleSection;
      if (!typedSection?._type) return null;
      const Section = sectionComponents[typedSection._type];
      if (!Section) return null;

      let sectionData: FlexibleSection = typedSection;
      if (typedSection._type === "caseStudiesSection" && caseStudyDocs.length > 0) {
        const useLayout2 = typedSection.layout === "layout2";
        sectionData = {
          ...typedSection,
          caseStudies: useLayout2
            ? caseStudyDocs.map(mapCaseStudyToLayout2)
            : caseStudyDocs.map(mapCaseStudyToLayout1),
        };
      }

      return (
        <Suspense fallback={<SectionFallbackLoader />} key={index}>
          <Section data={sectionData} page={page} />
        </Suspense>
      );
    }) || []
  );

  return <div className="w-full">{sections}</div>;
};
export default FlexibleContent;