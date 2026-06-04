import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type SplitContentSectionData = {
  sectionTag?: string;
  heading?: string;
  description?: string;
  content?: PortableTextBlock[];
  primaryButton?: CmsButton;
  theme?: "dark" | "light" | "gray" | string;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function shouldOpenInNewTab(url: string, buttonType?: string | null): boolean {
  if (buttonType === "external" || buttonType === "newTab") return true;
  return /^https?:\/\//i.test(url);
}

function normalizeTheme(theme?: string): "dark" | "light" | "gray" {
  const normalized = (theme ?? "dark").toLowerCase();
  if (normalized === "light") return "light";
  if (normalized === "gray" || normalized === "grey") return "gray";
  return "dark";
}

const darkPt: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-base leading-relaxed text-white/75 last:mb-0 sm:text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-1 space-y-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 items-start">
        <span aria-hidden className="shrink-0 font-medium text-teal-400 mt-1.5">
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
        <span className="min-w-0 flex-1 text-base leading-relaxed text-white/85">{children}</span>
      </li>

    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/90">{children}</em>,
  },
};

const lightPt: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-3 text-base leading-relaxed text-[#020210]/70 last:mb-0 sm:text-lg">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-1 space-y-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3 items-center">
        <span aria-hidden className="shrink-0 font-medium text-[#13A89E]">
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
        <span className="min-w-0 text-base leading-relaxed text-[#020210]/70">{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic text-[#020210]/85">{children}</em>,
  },
};

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
      className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#14B8A6] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
    >
      {label}
    </Link>
  );
}

export default function SplitContentSection({ data }: { data?: SplitContentSectionData }) {
  const theme = normalizeTheme(data?.theme);
  const isDark = theme === "dark";
  const isGray = theme === "gray";
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim() ?? "";
  const description = data?.description?.trim();
  const content = data?.content;
  const primaryButton = data?.primaryButton;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Learn More" : "");

  return (
    <section
      aria-labelledby={heading ? "split-content-heading" : undefined}
      className={[
        "w-full py-14 sm:py-16 lg:py-20",
        isDark ? "bg-brand" : isGray ? "bg-[#E9EDF1]" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className={`pb-6 sm:pb-12 ${isDark ? "border-white/15 border-b" : ""}`}>
          <div className="grid items-end gap-8 lg:grid-cols-2 lg:gap-12">
            <header className="min-w-0">
              {sectionTag ? (
                <p className="mb-2 text-xs font-medium tracking-wide text-[#13A89E] sm:text-sm">{sectionTag}</p>
              ) : null}
              {heading ? (
                <h2
                  id="split-content-heading"
                  className={[
                    "font-manrope text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
                    isDark ? "text-white" : "text-[#020210]",
                  ].join(" ")}
                >
                  {heading}
                </h2>
              ) : null}
              {description ? (
                <p className={["mt-3 text-sm leading-relaxed sm:text-base", isDark ? "text-white/70" : "text-[#020210]/60"].join(" ")}>
                  {description}
                </p>
              ) : null}
            </header>

            <div className="min-w-0">
              {content && content.length > 0 ? (
                <PortableText value={content} components={isDark ? darkPt : lightPt} />
              ) : null}
              {primaryHref && primaryLabel ? (
                <div className="mt-5">
                  <PrimaryCta
                    label={primaryLabel}
                    href={primaryHref}
                    external={shouldOpenInNewTab(primaryHref, primaryButton?.buttonType)}
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
