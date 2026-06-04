import Link from "next/link";
import { ButtonComponent } from "../ButtonComponent";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type HowStep = {
  _key?: string;
  title?: string;
  description?: string;
};

type HowItWorksSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  steps?: HowStep[];
  primaryButton?: CmsButton;
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

export default function HowItWorksSection({ data }: { data?: HowItWorksSectionData }) {
  const theme = normalizeTheme(data?.theme);
  const isDark = theme === "dark";

  const sectionTag = data?.sectionTag?.trim() || "How It Works";
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();
  const steps =
    data?.steps?.filter((step) => step?.title?.trim() || step?.description?.trim()) ?? [];
  const primaryButton = data?.primaryButton;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");

  const textColor = isDark ? "text-white" : "text-[#020210]";
  const bodyColor = isDark ? "text-white/55" : "text-[#020210]/65";

  return (
    <section
      className={[
        "w-full py-16",
        isDark ? "bg-[#0d1f3c]" : "bg-white",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4">

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-3 font-medium tracking-wide text-[#1EA9A0] text-base">
            {sectionTag}
          </p>
          {heading && (
            <h2
              className={[
                "font-manrope text-balance text-3xl font-bold leading-[1.1] tracking-tight lg:text-5xl",
                textColor,
              ].join(" ")}
            >
              {heading}
            </h2>
          )}
          {subheading && (
            <p className={["mx-auto lg:mt-5 mt-3 max-w-2xl mx-auto lg:text-base text-sm leading-relaxed sm:text-lg", bodyColor].join(" ")}>
              {subheading}
            </p>
          )}
        </header>

        {/* Steps */}
        {steps.length > 0 && (
          <>
            {/* ── Desktop timeline ── */}
            <div className="mt-14 hidden lg:block sm:mt-16 lg:mt-20">
              {/*
                Strategy:
                - Grid with N equal columns
                - Row 1: circles + the connecting line
                - The line spans from center of col-1 circle to center of col-N circle
                  achieved by: left = 50%/N, right = 50%/N (half a column inset each side)
                - Row 2: title + divider + description
              */}
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}
              >
                {/* Row 1 — circles with line */}
                {steps.map((step, index) => {
                  const stepNumber = String(index + 1).padStart(2, "0");
                  const isFirst = index === 0;
                  const isLast = index === steps.length - 1;

                  return (
                    <div key={step._key ?? `circle-${index}`} className="relative flex justify-center pb-8">
                      {/* Line segment — sits at vertical center of circle (h-12 = 48px, so top = 50% of circle) */}
                      {/* Left segment: from left edge to circle center */}
                      {!isFirst && (
                        <div
                          className={[
                            "absolute top-6 right-1/2 h-px",
                            isDark ? "bg-white/20" : "bg-slate-300",
                          ].join(" ")}
                          style={{ left: 0 }}
                          aria-hidden
                        />
                      )}
                      {/* Right segment: from circle center to right edge */}
                      {!isLast && (
                        <div
                          className={[
                            "absolute top-6 left-1/2 h-px",
                            isDark ? "bg-white/20" : "bg-slate-300",
                          ].join(" ")}
                          style={{ right: 0 }}
                          aria-hidden
                        />
                      )}

                      {/* Circle */}
                      <div
                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#1EA9A0]"
                        aria-label={`Step ${index + 1}`}
                      >
                        <span className="text-sm font-semibold tabular-nums text-white">
                          {stepNumber}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {/* Row 2 — text content */}
                {steps.map((step, index) => (
                  <div
                    key={step._key ?? `text-${index}`}
                    className="px-5 text-center"
                  >
                    {step.title?.trim() && (
                      <h3 className={["text-xl font-bold leading-snug sm:text-2xl", textColor].join(" ")}>
                        {step.title.trim()}
                      </h3>
                    )}
                    {step.description?.trim() && (
                      <p className={["text-base leading-relaxed", bodyColor].join(" ")}>
                        {step.description.trim()}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Mobile — vertical stacked ── */}
            <ol className="mt-10 flex flex-col gap-8 lg:hidden" aria-label="How it works steps">
              {steps.map((step, index) => {
                const stepNumber = String(index + 1).padStart(2, "0");
                const isLast = index === steps.length - 1;
                return (
                  <li key={step._key ?? `step-mob-${index}`} className="relative flex gap-4">
                    {/* Circle + vertical line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1EA9A0]">
                        <span className="text-sm font-semibold tabular-nums text-white">
                          {stepNumber}
                        </span>
                      </div>
                      {!isLast && (
                        <div
                          className={["mt-3 w-px flex-1 min-h-6", isDark ? "bg-white/20" : "bg-slate-300"].join(" ")}
                          aria-hidden
                        />
                      )}
                    </div>
                    {/* Text */}
                    <div className="pt-1.5">
                      {step.title?.trim() && (
                        <h3 className={["text-lg font-bold leading-snug", textColor].join(" ")}>
                          {step.title.trim()}
                        </h3>
                      )}
                      {step.description?.trim() && (
                        <p className={["text-base leading-relaxed", bodyColor].join(" ")}>
                          {step.description.trim()}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          </>
        )}

        {primaryLabel ? (
          <div className="mt-16 flex justify-center">
            <ButtonComponent href={primaryHref} variant="primary" className="min-h-11 rounded-full px-6 py-2.5 text-sm">
              {primaryLabel}
            </ButtonComponent>
          </div>
        ) : null}
      </div>
    </section>
  );
}