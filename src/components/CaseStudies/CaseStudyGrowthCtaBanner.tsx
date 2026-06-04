import Link from "next/link";

import { ButtonComponent } from "@/src/components/ButtonComponent";

/** Use the same id on the main content wrapper below this banner (see case study page). */
export const CASE_STUDY_CONTENT_ANCHOR_ID = "case-study-content";

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Static mid-page CTA for case study detail. “Read more” scrolls to `CASE_STUDY_CONTENT_ANCHOR_ID` on the page. */
export default function CaseStudyGrowthCtaBanner() {
  return (
    <div className="my-6 py-12 border-slate-200/90 border-t border-slate-200/90">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <p className="max-w-xl text-base font-medium leading-snug text-[#020210] sm:text-lg">
          Looking to achieve similar growth for your business?
        </p>

        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:w-auto lg:max-w-none lg:justify-end lg:gap-3">
          <ButtonComponent href="/demo" variant="primary" className="w-full shrink-0 sm:w-auto">
            Schedule a Demo
          </ButtonComponent>
          <Link
            href={`#${CASE_STUDY_CONTENT_ANCHOR_ID}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-[31px] border border-slate-300/90 bg-white px-5 py-3 text-sm font-semibold leading-[140%] text-[#020210] transition-colors duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A89E] focus-visible:ring-offset-2 sm:w-auto"
          >
            Read More About the Case Study
            <ChevronDownIcon className="size-4 shrink-0 text-[#13A89E]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
//<div className="my-6 border-t border-slate-200/90 pt-10 sm:my-7 sm:pt-12 border-2 border-blue-600"></div>