import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { urlForImage } from "@/src/sanity/lib/utils";

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

type MediaItem = {
  image?: SanityImage;
  alt?: string;
};

type NoMiddlemenSectionData = {
  layout?: "layout1" | "layout2";
  headline?: PortableTextBlock[];
  /** Schema: array of { image, alt }; legacy single object supported */
  image?: MediaItem[] | MediaItem;
  bodyContent?: PortableTextBlock[];
};

function normalizeMedia(
  raw: NoMiddlemenSectionData["image"],
): MediaItem[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === "object" && raw !== null && "image" in raw) {
    return [raw as MediaItem];
  }
  return [];
}

const defaultHeadline: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "no-middlemen-default-headline",
    children: [
      {
        _type: "span",
        text: "No Third Parties. No Middlemen. No Surprises.",
      },
    ],
  },
];

function NoMiddlemenLayout1({ data }: { data?: NoMiddlemenSectionData }) {
  const headline = data?.headline?.length ? data.headline : defaultHeadline;
  const bodyBlocks = data?.bodyContent ?? [];
  const items = normalizeMedia(data?.image);
  const primary = items[0];
  const imageAlt = primary?.alt || "middlemen-graph";

  const imageUrl =
    (primary?.image &&
      urlForImage(primary.image)
        ?.width(600)
        ?.format("webp")
        ?.fit("crop")
        ?.quality(85)
        ?.url()) ||
    "/images/middlemen-img.webp";

  const blurImageUrl =
    primary?.image &&
    urlForImage(primary.image)
      ?.height(12)
      ?.width(13)
      ?.blur(20)
      .format("webp")
      ?.fit("crop")
      ?.url();

  const displayHeadlineClasses =
    "font-manrope text-center leading-[110%] tracking-tight text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl";

  return (
    <>
      <div className="relative w-full bg-brand py-15 sm:py-28 md:py-32 lg:py-36">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-0 px-4 sm:px-6">
          <div
            className="pointer-events-none absolute -top-20 inset-0 bg-[url('/images/middlemen-shade.webp')] bg-cover bg-center bg-no-repeat w-full h-[120%] opacity-10"
            aria-hidden
          />
          <PortableText
            value={headline}
            components={{
              block: {
                normal: ({ children }) => (
                  <h2 className={`${displayHeadlineClasses} text-white/40`}>
                    {children}
                  </h2>
                ),
              },
              marks: {
                strong: ({ children }) => (
                  <strong className={`${displayHeadlineClasses} text-white`}>
                    {children}
                  </strong>
                ),
              },
            }}
          />
        </div>
      </div>
      <div className=" w-full bg-brand pb-10 lg:pb-24">
        <div className="middlemen_img  relative max-w-6xl mx-auto">
          <div className="middle_img relative">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={600}
            height={400}
            placeholder={blurImageUrl ? "blur" : "empty"}
            blurDataURL={blurImageUrl || undefined}
            className="relative z-20 mx-auto h-auto w-full max-w-4xl  object-cover px-2 sm:px-4 md:px-0 py-10"
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, min(1280px, 85vw)"
          />
        </div>
        </div>
        <div className="w-full relative z-30 mx-auto max-w-2xl px-4 sm:px-6 media_content">
          <div className="mt-10">
            <PortableText
              value={bodyBlocks}

              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="mb-2 text-base leading-relaxed text-white/70 sm:leading-[130%] md:text-lg py-2">
                      {children}
                    </p>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className={`text-white text-[32px] font-semibold leading-[120%]`}>
                      {children}
                    </strong>
                  ),
                },
              }}
            />
          </div>
          {/* <p className="mb-4 text-base leading-relaxed text-white/70 sm:leading-[130%] md:text-lg pt-20">
            {bodyText ||
              "FieldEquip owns the platform, the implementation, and the ongoing relationship. No SI in the middle. No hand-off after go-live."}
          </p> */}
        </div>
      </div>
    </>
  );
}

const layout2BodyComponents = {
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 text-base font-normal leading-relaxed text-slate-900 last:mb-0 sm:text-[17px] sm:leading-[160%]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-slate-900">{children}</strong>
    ),
  },
};

function NoMiddlemenLayout2({ data }: { data?: NoMiddlemenSectionData }) {
  const headline = data?.headline?.length ? data.headline : defaultHeadline;
  const items = normalizeMedia(data?.image);
  const primary = items[0];
  const imageAlt = primary?.alt || "FieldEquip product on desktop and mobile";

  const imageUrl =
    (primary?.image &&
      urlForImage(primary.image)
        ?.width(1600)
        ?.format("webp")
        ?.fit("max")
        ?.quality(88)
        ?.url()) ||
    "/images/middlemen-img.webp";

  const blurImageUrl =
    primary?.image &&
    urlForImage(primary.image)
      ?.height(10)
      ?.blur(20)
      ?.format("webp")
      ?.fit("crop")
      ?.url();

  const blocks = data?.bodyContent?.length
    ? data.bodyContent
    : ([
      {
        _type: "block",
        _key: "l2a",
        children: [
          {
            _type: "span",
            text:
              "Most enterprise field service management vendors hand you off to a third-party integrator the moment the contract is signed. That integrator charges separately, controls your timeline, and sits between you and the product team.",
          },
        ],
      },
      {
        _type: "block",
        _key: "l2b",
        children: [
          {
            _type: "span",
            text:
              "FieldEquip is field service automation software built into the platform, not bolted on. Predictive scheduling, anomaly detection, and automated workflow optimization ship as platform updates, not add-on modules from a partner ecosystem. And the roadmap is driven by customer operations data, not reseller margins.",
          },
        ],
      },
    ] as PortableTextBlock[]);

  const middleBlocks =
    blocks.length >= 2 ? ([blocks[0]] as PortableTextBlock[]) : blocks;
  const rightBlocks =
    blocks.length >= 2 ? (blocks.slice(1) as PortableTextBlock[]) : [];

  return (
    <section className="w-full bg-white py-8">
      {/* Top: gradient + centered mockups */}
      <div className="">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative mx-auto flex max-w-6xl justify-center -my-40">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={1200}
              height={400}
              className="h-auto w-full object-contain"
              placeholder={blurImageUrl ? "blur" : "empty"}
              blurDataURL={blurImageUrl || undefined}
              quality={88}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1024px"
            />
          </div>
        </div>
      </div>

      {/* Bottom: 3 columns, top-aligned */}
      <div className="border-t border-slate-100/80 py-16 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:gap-14 sm:px-6 lg:grid-cols-3 lg:gap-16 lg:px-8">
          <div className="flex flex-col items-start gap-6">
            <Link href="/" className="">
              <Image
                src="/images/logo.svg"
                alt="FieldEquip"
                width={250}
                height={50}
                className="h-full w-full"
              />
            </Link>
            <PortableText
              value={headline}
              components={{
                block: {
                  normal: ({ children }) => (
                    <h2 className="font-manrope text-3xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-[72px] lg:text-[2.65rem]">
                      {children}
                    </h2>
                  ),
                },
                marks: {
                  strong: ({ children }) => (
                    <strong className="font-semibold! text-slate-950">{children}</strong>
                  ),
                },
              }}
            />
          </div>

          <div className="min-w-0 lg:pt-1">
            <PortableText
              value={middleBlocks}
              components={layout2BodyComponents}
            />
          </div>

          <div className="min-w-0 lg:pt-1">
            {rightBlocks.length > 0 ? (
              <PortableText
                value={rightBlocks}
                components={layout2BodyComponents}
              />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

const NoMiddlemenSection = ({ data }: { data?: NoMiddlemenSectionData }) => {
  const layout = data?.layout ?? "layout1";

  if (layout === "layout2") {
    return <NoMiddlemenLayout2 data={data} />;
  }

  return <NoMiddlemenLayout1 data={data} />;
};

export default NoMiddlemenSection;
