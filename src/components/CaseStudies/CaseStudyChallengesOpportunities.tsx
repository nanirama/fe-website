import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { ButtonComponent } from "@/src/components/ButtonComponent";

export type CaseStudyChallengesOpportunitiesCta = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

export type CaseStudyChallengesOpportunitiesData = {
  content?: PortableTextBlock[] | null;
  button?: CaseStudyChallengesOpportunitiesCta | null;
};

const components: PortableTextComponents = {
  types: {
    divider: () => (
      <hr className="my-10 w-full border-0 border-t border-slate-200 sm:my-12" aria-hidden />
    ),
  },
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-6 font-manrope text-3xl font-semibold tracking-tight text-[#020210] first:mt-0 sm:mt-12 sm:text-4xl">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-relaxed text-[#020210] last:mb-0 sm:leading-relaxed">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#020210] last:mb-0 sm:pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#020210] last:mb-0 sm:pl-7">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href) return <>{children}</>;
      const isHttp = /^https?:\/\//i.test(href);
      const openInNewTab =
        value?.openInNewTab === true || (value?.openInNewTab !== false && isHttp);
      return (
        <Link
          href={href}
          className="font-medium text-[#13A89E] underline underline-offset-2 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13A89E]"
          {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
};

type Props = {
  data?: CaseStudyChallengesOpportunitiesData | null;
};

/**
 * Sanity `challengesAndOpportunities`: portable `content` (blocks + `divider`) and optional CTA `button`.
 * Button renders only when `url` (projected from `link`) is non-empty.
 */
export default function CaseStudyChallengesOpportunities({ data }: Props) {
  const raw = data?.content;
  const blocks = Array.isArray(raw) ? raw : [];
  const hasPortable = blocks.length > 0;

  const href = typeof data?.button?.url === "string" ? data.button.url.trim() : "";
  const label = typeof data?.button?.label === "string" ? data.button.label.trim() : "";
  const showButton = Boolean(href);

  if (!hasPortable && !showButton) return null;

  return (
    <section
      className="border-y border-slate-200 bg-white py-14 sm:py-16 lg:py-20"
      aria-label="Challenges and opportunities"
    >
      <div className="mx-auto max-w-7xl px-4">
        {hasPortable ? (
          <div className="max-w-none">
            <PortableText value={blocks as PortableTextBlock[]} components={components} />
          </div>
        ) : null}

        {label ? (
          <div className={hasPortable ? "mt-10 sm:mt-10" : ""}>
            <ButtonComponent href={href} variant="primary">
              {label || "Learn more"}
            </ButtonComponent>
          </div>
        ) : null}
      </div>
    </section>
  );
}