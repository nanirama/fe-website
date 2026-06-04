import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/src/types/sanity-image";

import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type CapabilityCard = {
  _key?: string;
  icon?: SanityImage;
  title?: string;
  description?: string;
};

type CoreCapabilitiesSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  cards?: CapabilityCard[];
  primaryButton?: CmsButton;
  theme?: "dark" | "light" | string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function normalizeTheme(theme?: string): "dark" | "light" {
  return (theme ?? "light").toLowerCase() === "dark" ? "dark" : "light";
}

function DefaultIcon() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EAEE] text-[#13A89E]" aria-hidden>
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <path
          d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Zm8.25 3.75a8.22 8.22 0 0 0-.1-1.26l2.06-1.6-2-3.46-2.52 1a8.37 8.37 0 0 0-2.18-1.26l-.38-2.67h-4l-.38 2.67a8.37 8.37 0 0 0-2.18 1.26l-2.52-1-2 3.46 2.06 1.6a8.22 8.22 0 0 0 0 2.52l-2.06 1.6 2 3.46 2.52-1c.67.53 1.4.95 2.18 1.26l.38 2.67h4l.38-2.67a8.37 8.37 0 0 0 2.18-1.26l2.52 1 2-3.46-2.06-1.6c.06-.41.1-.83.1-1.26Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function CoreCapabilitiesSection({ data }: { data?: CoreCapabilitiesSectionData }) {
  const isDark = normalizeTheme(data?.theme) === "dark";
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim();
  const subheading = data?.subheading?.trim();
  const cards = data?.cards?.filter((card) => card?.title?.trim() || card?.description?.trim()) ?? [];

  const primaryHref = isValidHref(data?.primaryButton?.url) ? data.primaryButton.url.trim() : "";
  const primaryLabel = data?.primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");

  return (
    <section className={["w-full py-10", isDark ? "bg-[#0f2040]" : "bg-white"].join(" ")}>
      <div className="mx-auto max-w-7xl border-b border-slate-300/70 px-4 pb-10 sm:px-6 sm:pb-12 lg:px-8 lg:pb-28">
        <header className="mx-auto max-w-4xl text-center">
          {sectionTag ? <p className="mb-2 text-sm font-medium text-[#13A89E] sm:text-base">{sectionTag}</p> : null}
          {heading ? (
            <h2
              className={[
                "font-manrope text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
                isDark ? "text-white" : "text-[#020210]",
              ].join(" ")}
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className={["mx-auto mt-4 max-w-3xl text-sm leading-relaxed sm:text-xl", isDark ? "text-white/70" : "text-[#020210]/65"].join(" ")}>
              {subheading}
            </p>
          ) : null}
        </header>

        {cards.length > 0 ? (
          <ul className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-10" aria-label="Core capabilities">
            {cards.map((card, index) => {
              const iconUrl =
                card.icon &&
                urlForImage(card.icon)?.width(72)?.height(72)?.fit("crop")?.format("webp")?.quality(88)?.url();
              return (
                <li key={card._key ?? `capability-${index}`} className="min-w-0">
                  <article className={["h-full rounded-2xl p-6 sm:p-7", isDark ? "bg-white/10" : "bg-[#E8EAEE]"].join(" ")}>
                    <div className="mb-4 w-[42px] h-[42px] rounded-full flex justify-center items-center bg-[#d9e0e9]">
                      {iconUrl ? (
                        <Image src={iconUrl} alt="" aria-hidden width={40} height={40} className="h-10 w-10 object-contain" />
                      ) : (
                        <DefaultIcon />
                      )}
                    </div>
                    {card.title?.trim() ? (
                      <h3 className={["text-3xl font-semibold leading-tight", isDark ? "text-white" : "text-[#020210]"].join(" ")}>
                        {card.title.trim()}
                      </h3>
                    ) : null}
                    {card.description?.trim() ? (
                      <p className={["mt-3 text-base leading-relaxed", isDark ? "text-white/75" : "text-[#020210]/70"].join(" ")}>
                        {card.description.trim()}
                      </p>
                    ) : null}
                  </article>
                </li>
              );
            })}
          </ul>
        ) : null}

        {primaryHref && primaryLabel ? (
          <div className="mt-8 flex justify-center">
            <Link
              href={primaryHref}
              {...(shouldOpenInNewTab(primaryHref, data?.primaryButton?.buttonType)
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#14B8A6] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d9488]"
            >
              {primaryLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
