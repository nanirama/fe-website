import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { SanityImage } from "@/src/types/sanity-image";
import { ButtonComponent } from "../ButtonComponent";
import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type IndustriesHeroSectionData = {
  heading?: string;
  image?: (SanityImage & { alt?: string }) | null;
  primaryButton?: CmsButton;
  secondaryButton?: CmsButton;
  content?: PortableTextBlock[];
};

type Props = {
  data?: IndustriesHeroSectionData;
  page?: string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

const contentComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-[#020210]/70 sm:text-lg">{children}</p>
    ),
  },
  list: {
      bullet: ({ children }) => (
        <ul
          className={`my-4 space-y-3 pl-0 text-base sm:text-lg grid sm:grid-cols-2`}
        >
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-center gap-3">
          <span className="shrink-0">
            <svg width="22" height="14" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 10H28M28 10L20 2M28 10L20 18"
                stroke="#14B8A6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="flex-1">{children}</span>
        </li>
      ),
    },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function IndustriesHeroSection({ data }: Props) {
  const heading = data?.heading?.trim();
  const image = data?.image ?? undefined;
  const imageUrl = image
    ? urlForImage(image)?.width(1400).format("webp").quality(88).url()
    : undefined;

  const primaryHref = isValidHref(data?.primaryButton?.url) ? data.primaryButton.url.trim() : "";
  const primaryLabel = data?.primaryButton?.label?.trim() || "";
  const secondaryHref = isValidHref(data?.secondaryButton?.url)
    ? data.secondaryButton.url.trim()
    : "";
  const secondaryLabel = data?.secondaryButton?.label?.trim() || "";

  return (
    <section className="w-full pt-28 lg:pt-32">
      <div className="mx-auto max-w-7xl border-b border-slate-300/70 px-4 pb-12 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0">
            {heading ? (
              <h1 className="font-manrope text-balance text-3xl font-medium leading-[1.08] tracking-tight text-[#020210] sm:text-5xl lg:text-6xl">
                {heading}
              </h1>
            ) : null}

            {(primaryLabel || secondaryLabel) && (
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                {primaryLabel ? (
                  <ButtonComponent
                    href={primaryHref || "#"}
                    variant="primary"
                    className="min-h-11 rounded-full px-6 py-2.5 text-sm"
                  >
                    {primaryLabel}
                  </ButtonComponent>
                ) : null}
                {secondaryLabel ? (
                  <ButtonComponent
                    href={secondaryHref || "#"}
                    variant="secondarytrnsparentWhiteBorder"
                    className="min-h-11 rounded-full border-slate-300 bg-white px-6 py-2.5 text-sm hover:bg-slate-50"
                  >
                    {secondaryLabel}
                  </ButtonComponent>
                ) : null}
              </div>
            )}
          </div>
          <div className="">


            {data?.content?.length ? (
              <div className="mt-5">
                <PortableText value={data.content} components={contentComponents} />
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-16">
          {imageUrl ? (
            <div className="min-w-0">
              <div className="relative aspect-[5/2] w-full overflow-hidden rounded-2xl">
                <Image
                  src={imageUrl}
                  alt={image?.alt?.trim() || heading || "Industry hero image"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
