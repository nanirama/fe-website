import Image from "next/image";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";
import HubSpotForm from "./HubSpotForm";

type ScheduleDemoBadge = {
  label?: string;
  image?: { alt?: string; url?: string };
};

type ScheduleDemoSectionData = {
  sectionTag?: string;
  heading?: string;
  description?: PortableTextBlock[];
  image?: SanityImage & { alt?: string; lqip?: string };
  bottomLineContent?: PortableTextBlock[];
  badge?: ScheduleDemoBadge;
};

type Props = {
  data?: ScheduleDemoSectionData;
  page?: string;
};

/** `page` from FlexibleContent is often `JSON.stringify({ page: slug, breadcrumb })`. */
function readRoutePageSlug(pageProp?: string): string | undefined {
  if (!pageProp?.trim()) return undefined;
  const trimmed = pageProp.trim();
  try {
    const parsed = JSON.parse(trimmed) as { page?: string };
    if (typeof parsed.page === "string" && parsed.page.trim()) {
      return parsed.page.trim();
    }
  } catch {
    // Plain slug or path (e.g. `home`, `integrations/foo`), not JSON.
    return trimmed;
  }
  return undefined;
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="mt-0.5 h-5 w-5 shrink-0 text-[#13A89E]"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

const descriptionPortableTextComponents = {
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-3 space-y-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 text-base font-medium leading-relaxed text-[#020210]/80">
        <CheckIcon />
        <span>{children}</span>
      </li>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-base font-medium leading-relaxed text-[#020210]/70 [&+p]:mt-3">
        {children}
      </p>
    ),
  },
};

const bottomLinePortableTextComponents = {
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul className="mt-3 space-y-2">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li className="flex items-start gap-2 font-medium text-base leading-relaxed text-[#64676a]">
        <CheckIcon />
        <span>{children}</span>
      </li>
    ),
  },
  block: {
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-xl font-bold leading-relaxed text-[#00000e] lg:text-2xl">{children}</p>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mt-6 text-lg font-bold text-[#020210]">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mt-5 text-base font-bold text-[#020210]">{children}</h4>
    ),
  },
};

export default function ScheduleDemoSection({ data, page }: Props) {
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim();
  const description = data?.description;
  const bottomLineContent = data?.bottomLineContent;
  const badge = data?.badge;
  const badgeImageUrl = badge?.image?.url;
  const badgeLabel = badge?.label?.trim();
  const image = data?.image;
  const imageUrl = image
    ? urlForImage(image)?.width(1000).format("webp").quality(88).url()
    : undefined;

  const routePageSlug = readRoutePageSlug(page);

  return (
    <section
      className={`w-full pt-28 pb-12 sm:py-16  ${routePageSlug === "demo" ? "lg:pt-36" : "lg:pt-20"}`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-20">

          {/* ── Left: Sanity content ── */}
          <div className="min-w-0">
            {sectionTag && (
              <p className="mb-1.5 text-xl font-semibold text-[#13A89E]">
                {sectionTag}
              </p>
            )}

            {heading && (
              <h2 className="text-balance text-xl font-bold leading-tight text-[#020210] sm:text-2xl lg:text-[32px]">
                {heading}
              </h2>
            )}

            {description && description.length > 0 && (
              <div className="mt-5">
                <PortableText
                  value={description}
                  components={descriptionPortableTextComponents}
                />
              </div>
            )}

            {imageUrl && (
              <>
                <hr className="my-6 border-slate-200 sm:my-8" />
                <div className="overflow-hidden rounded-2xl">
                  <Image
                    src={imageUrl}
                    alt={image?.alt?.trim() || heading || "Schedule a demo preview"}
                    width={534}
                    height={358}
                    placeholder={image?.lqip ? "blur" : "empty"}
                    blurDataURL={image?.lqip}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </>
            )}

            {bottomLineContent && bottomLineContent.length > 0 && (
              <div className="mt-6">
                <PortableText
                  value={bottomLineContent}
                  components={bottomLinePortableTextComponents}
                />
              </div>
            )}

            {(badgeImageUrl || badgeLabel) && (
              <div className="relative z-10 mt-10 flex items-center gap-1 rounded-xl bg-[#ebeff4] py-3 px-2 shadow-sm">
                {badgeImageUrl && (
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={badgeImageUrl}
                      alt={badge?.image?.alt?.trim() || badgeLabel || "Certification badge"}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                )}
                {badgeLabel && (
                  <p className="text-base font-bold max-w-[232px] leading-snug text-[#020210]">
                    {badgeLabel}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Right: static form card ── */}
          <HubSpotForm
            title="See FieldEquip in Action"
          />
        </div>
      </div>
    </section>
  );
}
