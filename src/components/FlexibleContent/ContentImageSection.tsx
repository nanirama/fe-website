import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/src/types/sanity-image";

import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

export type ContentImageSectionData = {
  image?: SanityImage & { alt?: string };
  imagePosition?: "left" | "right";
  sectionTag?: string;
  heading?: string;
  content?: PortableTextBlock[];
  primaryButton?: CmsButton;
  theme?: "dark" | "light";
};

type Props = {
  data?: ContentImageSectionData;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function contentComponents(isDark: boolean): PortableTextComponents {
  const body = isDark ? "text-white/80" : "text-[#4B5563]";
  const strong = isDark ? "font-semibold text-white" : "font-semibold text-slate-900";

  return {
    block: {
      normal: ({ children }: any) => (
        <p className={`mb-4 text-base leading-relaxed last:mb-0 sm:text-lg sm:leading-relaxed ${body}`}>
          {children}
        </p>
      ),
    },
    // marks: {
    //   strong: ({ children }: any) => (
    //     <strong className="!text-[#13A89E] font-semibold">
    //       {children}
    //     </strong>
    //   ),
    // },
    list: {
      bullet: ({ children }) => (
        <ul
          className={`my-4 space-y-3 pl-0 text-base sm:text-lg ${body}`}
        >
          {children}
        </ul>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3">
          <span className="shrink-0 mt-[8px]">
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
      strong: ({ children }) => <strong className={strong}>{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
    },
  };
}


function PrimaryCta({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external: boolean;
}) {
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={[
        "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors sm:w-auto sm:min-h-0",
        "bg-[#14B8A6] text-white hover:bg-[#0d9488]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export default function ContentImageSection({ data }: Props) {
  const theme = data?.theme === "light" ? "light" : "dark";
  const isDark = theme === "dark";
  const imagePosition = data?.imagePosition === "right" ? "right" : "left";
  const imageRight = imagePosition === "right";

  const heading = data?.heading?.trim() ?? "";
  const sectionTag = data?.sectionTag?.trim();
  const content = data?.content;
  const primaryButton = data?.primaryButton;
  const image = data?.image;

  const imageAlt = image?.alt?.trim() || heading || "Product screenshot";

  const imageUrl =
    image &&
    urlForImage(image)?.width(800)?.format("webp")?.fit("max")?.quality(88)?.url();

  const blurImageUrl =
    image &&
    urlForImage(image)?.width(40)?.blur(25)?.format("webp")?.fit("max")?.url();

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Learn more" : "");

  const pt = contentComponents(isDark);
  return (
    <section
      aria-labelledby={heading ? "content-image-heading" : undefined}
      className={[
        "w-full sm:py-16 py-10 lg:py-24",
        isDark ? "bg-brand text-white" : "bg-white text-slate-900",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {imageUrl ? (
            <figure
              className={[
                "order-1 min-w-0",
                imageRight ? "lg:order-2" : "lg:order-1",
              ].join(" ")}
            >
              <div
                className={[
                  "overflow-hidden rounded-2xl shadow-lg ring-1 max-w-200 w-full",
                  isDark ? "shadow-black/30 ring-white/10" : "shadow-slate-900/10 ring-slate-200/80",
                ].join(" ")}
              >
                <Image
                  src={imageUrl}
                  alt={imageAlt}
                  width={800}
                  height={0}
                  style={{ height: 'auto' }}
                  className="w-full"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 800px"
                  placeholder={blurImageUrl ? "blur" : "empty"}
                  blurDataURL={blurImageUrl || undefined}
                />
              </div>
            </figure>
          ) : (
            <div
              className={[
                "order-1 aspect-[16/10] min-h-[200px] rounded-2xl bg-slate-200/60 lg:min-h-0",
                imageRight ? "lg:order-2" : "lg:order-1",
              ].join(" ")}
              aria-hidden
            />
          )}

          <div
            className={[
              "order-2 flex min-w-0 flex-col justify-center",
              imageRight ? "lg:order-1" : "lg:order-2",
            ].join(" ")}
          >
            {sectionTag ? (
              <p className="mb-3 text-sm font-semibold tracking-wide text-[#14B8A6] sm:text-base">
                {sectionTag}
              </p>
            ) : null}

            {heading ? (
              <h2
                id="content-image-heading"
                className="font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-4xl"
              >
                <span className={isDark ? "text-white" : "text-[#020210]"}>{heading}</span>
              </h2>
            ) : null}

            {content && content.length > 0 ? (
              <div className="mt-6 max-w-xl sm:mt-7 cnt_strong">
                <PortableText value={content} components={pt} />
              </div>
            ) : null}


            {primaryLabel ? (
              <div className="mt-2">
                <PrimaryCta
                  label={primaryLabel}
                  href={primaryHref || "#"}
                  external={shouldOpenInNewTab(primaryHref, primaryButton?.buttonType)}
                />
              </div>
            ) : null}

          </div>
        </div>
      </div>
    </section>
  );
}
