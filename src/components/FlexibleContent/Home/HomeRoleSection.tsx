import Link from "next/link";
import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import { getSlugUrl } from "@/src/lib/utils";

type RoleCard = {
  tag?: string;
  heading?: string;
  description?: PortableTextBlock[];
  linkText?: string;
  _linkType?: string | null;
  _linkSlug?: string | null;
  icon?: { alt?: string; url?: string };
};

type HomeRoleSectionData = {
  heading?: string;
  cards?: RoleCard[];
};

const descriptionComponents: PortableTextComponents = {
  block: {
  normal: ({ children }) => (
    <p className="text-base text-[#020210]/70 leading-[130%] [&>a]:text-teal-500 [&>a]:underline [&>a]:underline-offset-2 hover:[&>a]:text-teal-600">
      {children}
    </p>
  ),
},
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href) return <>{children}</>;
      const isExternal = /^https?:\/\//i.test(href);
      return (
        <Link
          href={href}
          className="text-[#13A89E] underline underline-offset-2 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13A89E]"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
};

const fallbackCards: RoleCard[] = [
  {
    tag: "FINANCE",
    heading: "The invoice goes out the same day the job closes.",
    description: [],
    linkText: "See how Digital Field Ticketing closes the invoice gap",
  },
];

const HomeRoleSection = ({ data }: { data?: HomeRoleSectionData }) => {
  const sectionHeading = data?.heading || "What It Means for Your Role";
  const cards = Array.isArray(data?.cards) && data.cards.length > 0 ? data.cards : fallbackCards;

  return (
    <div className="w-full py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-left flex items-start justify-start">
          <h2 className="text-[42px] text-[#020210] font-semibold leading-[110%] w-auto">{sectionHeading}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch justify-between mt-16">
          {cards.map((card, index) => (
            <div
              key={`${card.tag || "role"}-${index}`}
              className={`flex flex-col gap-4 pr-8 ${index !== cards.length - 1 ? "md:border-r border-[#13A89E]" : ""}`}
            >
              {card?.icon?.url && (
                <div className="w-10.5 h-10.5 rounded-full bg-[#3C5B8D1A] flex justify-center items-center">
                  <Image
                    src={card.icon.url}
                    alt={card.icon.alt || "role-icon"}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
              )}
              <p className="text-sm font-semibold text-[#13A89E] leading-[140%]">{card.tag || ""}</p>
              <h3 className="text-2xl text-[#020210] font-semibold">{card.heading || ""}</h3>
              {card.description?.length ? (
                <PortableText value={card.description} components={descriptionComponents} />
              ) : null}
              {card.linkText && card._linkType && (
                <Link
                  href={getSlugUrl(card._linkType, card._linkSlug ?? undefined)}
                  className="text-base text-[#13A89E] underline leading-[130%]"
                >
                  {card.linkText} {"→"}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeRoleSection;
