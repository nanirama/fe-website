import type { ReactNode } from "react";
import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";

import { urlForImage } from "@/src/sanity/lib/utils";
import type { SanityImage } from "@/src/types/sanity-image";

export type WhitePaperHeroSectionData = {
  _key?: string;
  heading?: string;
  description?: PortableTextBlock[];
  image?: SanityImage & { alt?: string; lqip?: string };
};

type Props = {
  data?: WhitePaperHeroSectionData;
  page?: string;
};

const portableTextComponents = {
  block: {
    normal: ({ children }: { children?: ReactNode }) => (
      <p className="max-w-xl text-base font-normal leading-relaxed text-[#4b5563] sm:text-lg sm:leading-relaxed">
        {children}
      </p>
    ),
    highlight: ({ children }: { children?: ReactNode }) => (
      <p className="max-w-xl border-l-3 border-[#13A89E] ps-[14px] text-base font-bold max-w-[232px] mx-auto leading-snug text-[#020210] sm:text-lg sm:leading-snug">
        {children}
      </p>
    ),
  },
  marks: {
    em: ({ children }: { children?: ReactNode }) => (
      <em className="italic">{children}</em>
    ),
  },
};

export default function WhitePaperHeroSection({ data }: Props) {
  const heading = data?.heading?.trim();
  const description = data?.description;
  const image = data?.image;
  const headingId = `whitepaper-hero-heading-${data?._key ?? "default"}`;

  const imageUrl = image
    ? urlForImage(image)?.width(1200).format("webp").quality(88).url()
    : undefined;

  const imageAlt =
    image?.alt?.trim() ||
    (heading ? `${heading} — whitepaper cover` : "Whitepaper cover illustration");

  return (
    <section
      className="relative isolate w-full overflow-hidden bg-white"
      aria-labelledby={heading ? headingId : undefined}
    >
      
      {/* <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#3c5b8d]/12 blur-3xl sm:-left-16 sm:h-96 sm:w-96"
          aria-hidden
        />
        <div
          className="absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-[#6f8fc4]/15 blur-3xl sm:-right-10 sm:h-80 sm:w-80"
          aria-hidden
        />
        <div
          className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-[#13a89e]/8 blur-2xl"
          aria-hidden
        />
      </div> */}

      <div className="relative z-40 mx-auto max-w-7xl py-12 sm:py-14 lg:py-16 xl:py-20 border-b-2 border-black/10">
        <div className="grid grid-cols-1 z-40 relative items-center gap-10 sm:gap-18 lg:grid-cols-2 lg:gap-14 xl:gap-30">
          <div className="order-1 min-w-0 lg:order-1">
            {imageUrl ? (
              <figure className="mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none">
                <div
                  className="overflow-hidden rounded-2xl bg-slate-100 shadow-2xl ring-1 ring-slate-900/5"
                >
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={1200}
                    height={900}
                    priority
                    placeholder={image?.lqip ? "blur" : "empty"}
                    blurDataURL={image?.lqip}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </figure>
            ) : null}
          </div>

          <div className="order-2 min-w-0 lg:order-2">
            {heading ? (
              <h2
                id={headingId}
                className="text-balance font-manrope text-2xl font-semibold leading-tight tracking-tight text-[#020210] sm:text-3xl sm:leading-tight lg:text-4xl lg:leading-[1.15] xl:text-[2.5rem] xl:leading-tight"
              >
                {heading}
              </h2>
            ) : null}

            {description && description.length > 0 ? (
              <div className="mt-5 space-y-4 sm:mt-6 sm:space-y-5">
                <PortableText value={description} components={portableTextComponents} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
