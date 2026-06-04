import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/src/types/sanity-image";
import { ButtonComponent } from "../ButtonComponent";

import { urlForImage } from "@/src/sanity/lib/utils";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type FeatureCard = {
  _key?: string;
  icon?: SanityImage;
  title?: string;
  description?: string;
};

type FeatureCardsSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  cards?: FeatureCard[];
  primaryButton?: CmsButton;
  image?: SanityImage & { alt?: string };
  theme?: "dark" | "light" | string;
};

function normalizeTheme(theme?: string): "dark" | "light" {
  return (theme ?? "dark").toLowerCase() === "light" ? "light" : "dark";
}

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function DefaultIcon({ isDark }: { isDark: boolean }) {
  return (
    <span
      className={[
        "inline-flex h-8 w-8 items-center justify-center rounded-full",
        isDark ? "bg-slate-200 text-[#13A89E]" : "bg-slate-100 text-[#13A89E]",
      ].join(" ")}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3.75L19.25 8v8L12 20.25 4.75 16V8L12 3.75Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="2.2" fill="currentColor" />
      </svg>
    </span>
  );
}

export default function FeatureCardsSection({ data }: { data?: FeatureCardsSectionData }) {
  const theme = normalizeTheme(data?.theme);
  const isDark = theme === "dark";
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();
  const cards = data?.cards?.filter((card) => card?.title?.trim()) ?? [];
  const primaryButton = data?.primaryButton;
  const screenshot = data?.image;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");

  const screenshotAlt = screenshot?.alt?.trim() || heading || "Product interface screenshot";
  const screenshotUrl =
    screenshot &&
    urlForImage(screenshot)?.width(1600)?.format("webp")?.fit("max")?.quality(88)?.url();
  const screenshotBlur =
    screenshot &&
    urlForImage(screenshot)?.width(40)?.blur(25)?.format("webp")?.fit("max")?.url();

  return (
    <section className={["w-full py-16 sm:py-20 lg:py-24", isDark ? "bg-[#0f2040]" : "bg-white"].join(" ")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          {sectionTag ? (
            <p className="mb-2 text-sm font-medium tracking-wide text-[#13A89E] sm:text-base">{sectionTag}</p>
          ) : null}
          {heading ? (
            <h2
              className={[
                "font-manrope text-balance text-[27px] font-semibold leading-[1.1] tracking-tight lg::text-5xl",
                isDark ? "text-white" : "text-[#020210]",
              ].join(" ")}
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className={["mx-auto mt-4 max-w-2xl text-base leading-relaxed lg::text-xl", isDark ? "text-white/65" : "text-[#020210]/65"].join(" ")}>
              {subheading}
            </p>
          ) : null}
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4" aria-label="Feature cards">
          {cards.map((card, index) => {
            const iconUrl =
              card.icon &&
              urlForImage(card.icon)?.width(56)?.height(56)?.format("webp")?.fit("crop")?.quality(88)?.url();
            return (
              <li key={card._key ?? `feature-card-${index}`} className="min-w-0">
                <article className={["h-full rounded-2xl px-5 py-5", isDark ? "bg-slate-100 text-[#020210]" : "border border-slate-200 bg-white text-[#020210]"].join(" ")}>
                  <div className="mb-4">
                    {iconUrl ? (
                      <>
                        <div className="w-[42px] h-[42px] rounded-full bg-[#3C5B8D1A] flex justify-center items-center">
                          <Image src={iconUrl} alt="" aria-hidden width={42} height={42} className="h-10 w-10 object-contain" />
                        </div>
                      </>
                    ) : (
                      <DefaultIcon isDark={isDark} />
                    )}
                  </div>
                  <h3 className="text-2xl font-bold leading-tight">{card.title?.trim()}</h3>
                  {card.description?.trim() ? (
                    <p className="mt-3 text-base leading-relaxed text-[#020210]/65">{card.description.trim()}</p>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>

        {primaryLabel ? (
          <div className="mt-16 flex justify-center">
            <ButtonComponent href={primaryHref} variant="primary" className="min-h-11 rounded-full px-6 py-2.5 text-sm">
              {primaryLabel}
            </ButtonComponent>
          </div>
        ) : null}

        {screenshotUrl ? (
          <figure className="mt-40 overflow-hidden rounded-2xl">
            <Image
              src={screenshotUrl}
              alt={screenshotAlt}
              width={1600}
              height={940}
              className="h-auto w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 85vw"
              placeholder={screenshotBlur ? "blur" : "empty"}
              blurDataURL={screenshotBlur || undefined}
            />
          </figure>
        ) : null}
      </div>
    </section>
  );
}
