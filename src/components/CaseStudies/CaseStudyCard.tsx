import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "next-sanity";
import Link from "next/link";
import Image from "next/image";
import type { SanityImage } from "@/src/types/sanity-image";
import { ButtonComponent } from "@/src/components/ButtonComponent";
import ReusableVideoCard from "@/src/components/Video/ReusableVideoCard";
import { urlForImage } from "@/src/sanity/lib/utils";

export type CaseStudyCardData = {
  _id: string;
  name?: string;
  slug?: string;
  tags?: string[];
  shortDescription?: PortableTextBlock[];
  image?: (SanityImage & { alt?: string }) | null;
  statistics?: { label?: string; value?: string }[];
  clientName?: string;
  clientJobTitle?: string;
  clientTestimonial?: PortableTextBlock[];
  clientImage?: (SanityImage & { alt?: string }) | null;
  youtubeVideoUrl?: string;
  videoDuration?: string;
};

type Props = {
  item: CaseStudyCardData;
  reverse?: boolean;
};

function Stat({ value, label }: { value?: string; label: string }) {
  if (!value?.trim()) return null;
  return (
    <div className="min-w-[90px]">
      <p className="text-[18px] font-semibold leading-none text-[#020210] sm:text-[24px]">{value}</p>
      <p className="mt-2 text-[12px] leading-tight text-[#020210]/70 sm:text-sm">{label}</p>
    </div>
  );
}

export default function CaseStudyCard({ item, reverse = false }: Props) {
  const title = item.name?.trim() || "Case study";
  const tags = (item.tags ?? []).filter((tag): tag is string => Boolean(tag?.trim()));
  const testimonial = item.clientTestimonial ?? [];
  const shortDescription = item.shortDescription ?? [];
  const imageUrl = item.image
    ? urlForImage(item.image)?.width(1280).fit("crop").quality(86).format("webp").url()
    : undefined;
  const cardUrl = item.slug ? `/case-study/${item.slug}` : "/case-studies";
  
  return (
    <article className="py-10 sm:py-12 lg:py-16">
      <div className={`grid gap-6 md:items-start lg:grid-cols-2 lg:gap-30 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="overflow-hidden">
          {item.youtubeVideoUrl ? (
            <div className="rounded-xl bg-[#EAEEF1]">
            <ReusableVideoCard
              title={title}
              youtubeUrl={item.youtubeVideoUrl}
              fallbackImageUrl={imageUrl}
              fallbackImageAlt={item.image?.alt?.trim() || `${title} testimonial`}
              duration={item.videoDuration}
              className=""
              showTitleAndDescription={false}
            />
            </div>
          ) : imageUrl ? (
            <div className="rounded-xl relative aspect-[16/10] p-0 m-0 border border-red-600">
            <Link href={cardUrl}><Image
              src={imageUrl}
              alt={item.image?.alt?.trim() || `${title} testimonial`}
              fill
              className="w-full rounded-xl"
            />
            </Link>
            </div>
          ) : null}

        </div>

        <div className="max-w-[480px] ">
          <Link href={cardUrl} className="font-manrope text-2xl font-semibold leading-tight text-[#020210] sm:text-[24px]">{title}</Link>

          {tags.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={`${item._id}-${tag}`} className="rounded-full bg-[#E5E7EB] px-3 py-1 text-xs text-[#4B5563] sm:text-sm">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-5 border-b border-slate-300/80 pb-5 sm:gap-x-8">
            {(item.statistics ?? []).slice(0, 3).map((stat, i) => (
              <Stat key={i} value={stat.value} label={stat.label ?? ""} />
            ))}
          </div>

          {testimonial.length > 0 ? (
            <>
            <div className="mt-5">
              <span className="mb-5" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" fill="#13A89E" width="32" height="32" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </span>
              <div className="leading-relaxed text-[#020210]  sm:text-base font-extrabold max-w-[450px] sm:leading-[1.35] [&_p]:mt-4 [&_strong]:font-semibold">
                <PortableText value={testimonial} />
              </div>
            </div>
            {item.clientName?.trim() ? <p className="mt-6 text-basetext-[#020210] font-extrabold">{item.clientName}</p> : null}
            {item.clientJobTitle?.trim() ? <p className="mt-1 text-[#020210]/70 sm:text-sm">{item.clientJobTitle}</p> : null}
            </>
          ) : shortDescription.length > 0 ? (
            <div className="mt-5">
              <PortableText value={shortDescription} />
            </div>
          ) : null}

          

          <div className="mt-6">
            <ButtonComponent href={cardUrl} variant="primary" className="px-6 py-2.5 text-sm font-semibold">
              Read Case Study
            </ButtonComponent>
          </div>
        </div>
      </div>
    </article>
  );
}
