import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

import ReusableVideoCard from "@/src/components/Video/ReusableVideoCard";
import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";

export type CaseStudyTestimonialFields = {
  clientName?: string;
  clientJobTitle?: string;
  clientTestimonial?: PortableTextBlock[] | null;
  clientImage?: (SanityImage & { alt?: string }) | null;
  youtubeVideoUrl?: string;
  videoDuration?: string;
};

const testimonialPortableComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-lg font-semibold leading-snug text-[#020210] sm:text-xl sm:leading-snug lg:text-2xl lg:leading-snug">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

type Props = {
  data: CaseStudyTestimonialFields;
  /** Used for video card title and fallbacks */
  caseStudyTitle?: string;
};

function hasTestimonialBlocks(blocks: PortableTextBlock[] | null | undefined): boolean {
  return Boolean(blocks?.some((b) => b._type === "block"));
}

export default function CaseStudyTestimonials({ data, caseStudyTitle }: Props) {
  const name = data.clientName?.trim();
  const jobTitle = data.clientJobTitle?.trim();
  const blocks = data.clientTestimonial;
  const hasQuote = hasTestimonialBlocks(blocks);
  const youtube = data.youtubeVideoUrl?.trim();
  const built = data.clientImage && urlForImage(data.clientImage);
  const fallbackImageUrl = built?.width(1280).height(720).fit("crop").quality(86).format("webp").url();
  const hasVideoOrImage = Boolean(youtube || fallbackImageUrl);

  if (!name && !hasQuote && !hasVideoOrImage) return null;

  const videoTitle = caseStudyTitle?.trim() || name || "Client testimonial";

  return (
    <section
      className="w-full bg-white py-12 sm:py-14 lg:py-20"
      aria-labelledby="case-study-testimonial-heading"
    >
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2
          id="case-study-testimonial-heading"
          className="text-left font-manrope text-2xl font-semibold tracking-tight text-[#020210] sm:text-3xl"
        >
          Client Testimonial
        </h2>

        {hasVideoOrImage ? (
          <div className="mt-6 w-full sm:mt-8">
            <ReusableVideoCard
              title={videoTitle}
              youtubeUrl={youtube}
              fallbackImageUrl={fallbackImageUrl}
              fallbackImageAlt={data.clientImage?.alt?.trim() || `${videoTitle} testimonial`}
              duration={data.videoDuration?.trim()}
              showTitleAndDescription={false}
              className="w-full max-w-full"
              priority={false}
            />
          </div>
        ) : null}

        {hasQuote ? (
          <blockquote className="mt-8 text-left sm:mt-10 lg:mt-12">
            <p
              className="font-manrope text-5xl font-normal leading-none text-[#13A89E] sm:text-6xl lg:text-7xl"
              aria-hidden
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="#13A89E" width="32" height="32" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>

            </p>
            <div className="mt-2 space-y-4 sm:mt-3">
              <PortableText value={blocks!} components={testimonialPortableComponents} />
            </div>
          </blockquote>
        ) : null}

        {name ? (
          <footer className="mt-8 text-left sm:mt-10">
            <p className="font-manrope text-base font-semibold text-[#020210] sm:text-lg">{name}</p>
            {jobTitle ? (
              <p className="mt-1 max-w-2xl text-sm font-normal leading-relaxed text-[#020210]/75 sm:mt-2 sm:text-base">
                {jobTitle}
              </p>
            ) : null}
          </footer>
        ) : null}
      </div>
    </section>
  );
}
