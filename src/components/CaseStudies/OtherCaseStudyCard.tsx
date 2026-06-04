import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";

export type OtherCaseStudyListItem = {
  _id: string;
  name?: string;
  slug?: string;
  tags?: string[];
  industry?: string;
  image?: (SanityImage & { alt?: string }) | null;
  statistics?: { label?: string; value?: string }[];
  clientName?: string;
  clientJobTitle?: string;
  clientImage?: (SanityImage & { alt?: string }) | null;
};

function Stat({ value, label }: { value?: string; label: string }) {
  if (!value?.trim()) return null;
  return (
    <div className="min-w-0 flex-1">
      <p className="text-xl font-semibold leading-none text-[#020210] sm:text-2xl">{value.trim()}</p>
      <p className="mt-2 text-xs leading-tight text-[#020210]/65 sm:text-sm">{label}</p>
    </div>
  );
}

function buildTagPills(tags: string[] | undefined, industry: string | undefined): string[] {
  const raw = [...(tags ?? []).map((t) => t.trim()).filter(Boolean)];
  if (industry?.trim() && !raw.some((t) => t.toLowerCase() === industry.trim().toLowerCase())) {
    raw.unshift(industry.trim());
  }
  return raw;
}

type Props = {
  item: OtherCaseStudyListItem;
};

function OtherCaseStudyCardInner({ item }: Props) {
  const title = item.name?.trim() || "Case study";
  const href = item.slug ? `/case-study/${item.slug}` : "/case-studies";
  const tagSource = buildTagPills(item.tags, item.industry);
  const maxVisibleTags = 3;
  const visibleTags = tagSource.slice(0, maxVisibleTags);
  const extra = tagSource.length > maxVisibleTags ? tagSource.length - maxVisibleTags : 0;

  const heroBuilt = item.image && urlForImage(item.image);
  const fallbackBuilt = item.clientImage && urlForImage(item.clientImage);
  const coverUrl =
    heroBuilt?.width(1000).height(600).fit("crop").quality(82).format("webp").url() ??
    fallbackBuilt?.width(1000).height(600).fit("crop").quality(82).format("webp").url();
  const coverAlt =
    item.image?.alt?.trim() ||
    item.clientImage?.alt?.trim() ||
    `${title} — case study preview`;

  const overlayName = item.clientName?.trim();
  const overlayTitle = item.clientJobTitle?.trim();

  return (
    <article className="h-full w-full min-h-[420px] rounded-2xl border border-slate-200/80 bg-white shadow-sm sm:min-h-0">
      <Link href={href} className="flex h-full flex-col rounded-2xl outline-none transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#13A89E] focus-visible:ring-offset-2">
        <div className="relative aspect-[8/5] md:h-[360px] w-full overflow-hidden rounded-t-2xl bg-[#EAEEF1]">
          {coverUrl ? (
            <Image
              src={coverUrl}
              alt={coverAlt}
              width={800}
              height={500}
              className="h-full w-full object-cover"
              sizes="(max-width: 1023px) 92vw, min(45vw, 720px)"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          {overlayName ? (
            <div className="absolute bottom-3 left-3 max-w-[85%] rounded-md bg-[#13A89E]/95 px-2.5 py-1.5 text-left shadow-sm sm:bottom-4 sm:left-4 sm:px-3 sm:py-2">
              <p className="text-xs font-semibold leading-snug text-white sm:text-sm">{overlayName}</p>
              {overlayTitle ? (
                <p className="mt-0.5 text-[11px] font-normal leading-snug text-white/90 sm:text-xs">{overlayTitle}</p>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col px-4 pb-5 pt-4 sm:px-5 sm:pb-6 sm:pt-5">
          <div className="min-h-[32px] h-[32px] overflow-hidden">
            {visibleTags.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
              {visibleTags.map((tag) => (
                <li
                  key={`${item._id}-${tag}`}
                  className="rounded-full bg-[#E5E7EB] px-2.5 py-0.5 text-xs text-[#4B5563] sm:px-3 sm:py-1 sm:text-sm"
                >
                  {tag}
                </li>
              ))}
              {extra > 0 ? (
                <li className="rounded-full bg-[#E5E7EB] px-2.5 py-0.5 text-xs text-[#4B5563] sm:px-3 sm:py-1 sm:text-sm">
                  +{extra}
                </li>
              ) : null}
              </ul>
            ) : null}
          </div>

          <h3 className="mt-3 min-h-[4.5rem] line-clamp-3 font-manrope text-lg font-semibold leading-snug text-[#020210] sm:mt-4 sm:min-h-[5.25rem] sm:text-xl sm:leading-snug">
            {title}
          </h3>

          <div className="mt-auto border-t border-slate-200/90 pt-4 sm:pt-5">
            <div className="flex gap-3 sm:gap-4">
              {(item.statistics ?? []).slice(0, 3).map((stat, i) => (
                <Stat key={i} value={stat.value} label={stat.label ?? ""} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

const OtherCaseStudyCard = memo(OtherCaseStudyCardInner);
export default OtherCaseStudyCard;
