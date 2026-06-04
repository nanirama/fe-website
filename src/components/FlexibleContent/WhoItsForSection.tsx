import { ButtonComponent } from "../ButtonComponent";

type CmsButton = {
  label?: string | null;
  url?: string | null;
  buttonType?: string | null;
};

type WhoItsForItem = {
  _key?: string;
  bestFor?: string;
  notFor?: string;
};

type WhoItsForSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  items?: WhoItsForItem[];
  primaryButton?: CmsButton;
  theme?: "light" | "dark" | string;
};

function normalizeTheme(theme?: string): "light" | "dark" {
  return (theme ?? "light").toLowerCase() === "dark" ? "dark" : "light";
}

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

function ArrowMarker({ dark }: { dark: boolean }) {
  return <span aria-hidden className={["text-xl leading-none", dark ? "text-teal-300" : "text-[#13A89E]"].join(" ")}>→</span>;
}

export default function WhoItsForSection({ data }: { data?: WhoItsForSectionData }) {
  const theme = normalizeTheme(data?.theme);
  const isDark = theme === "dark";
  const sectionTag = data?.sectionTag?.trim() || "Who It's For";
  const heading = data?.heading?.trim() ?? "";
  const subheading = data?.subheading?.trim();
  const items = data?.items?.filter((item) => item?.bestFor?.trim() || item?.notFor?.trim()) ?? [];
  const primaryButton = data?.primaryButton;

  const primaryHref = isValidHref(primaryButton?.url) ? primaryButton.url.trim() : "";
  const primaryLabel = primaryButton?.label?.trim() || (primaryHref ? "Schedule a Demo" : "");

  const mainText = isDark ? "text-white" : "text-[#020210]";
  const bodyText = isDark ? "text-white/70" : "text-[#020210]/65";
  const divider = isDark ? "border-white/15" : "border-[#13A89E]/25";

  return (
    <section className={["w-full py-16 sm:py-20 lg:py-24", isDark ? "bg-[#0f2040]" : "bg-white"].join(" ")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <p className="mb-2 font-medium tracking-wide text-[#13A89E] text-base">{sectionTag}</p>
          {heading ? (
            <h2
              className={[
                "font-manrope text-balance text-[28.5px] font-semibold leading-[1.1] tracking-tight sm:text-5xl",
                mainText,
              ].join(" ")}
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? (
            <p className={["mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-xl", bodyText].join(" ")}>
              {subheading}
            </p>
          ) : null}
        </header>

        <div className="mt-10 grid gap-8 sm:mt-12 lg:grid-cols-2 lg:gap-10">
          <section className="min-w-0">
            <h3 className={["lg:text-3xl text-2xl font-semibold leading-tight", mainText].join(" ")}>Best For</h3>
            <ul className="mt-5 space-y-3" aria-label="Best for list">
              {items.map((item, index) => (
                <li key={item._key ?? `best-for-${index}`} className="flex items-start gap-3">
                  <ArrowMarker dark={isDark} />
                  <span className={["text-base leading-relaxed", bodyText].join(" ")}>{item.bestFor?.trim()}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className={["min-w-0 lg:border-l lg:pl-8", divider].join(" ")}>
            <h3 className={["lg:text-3xl text-2xl font-semibold leading-tight", mainText].join(" ")}>Not For</h3>
            <ul className="mt-5 space-y-3" aria-label="Not for list">
              {items.map((item, index) => (
                <li key={item._key ?? `not-for-${index}`} className="flex items-start gap-3">
                  <ArrowMarker dark={isDark} />
                  <span className={["text-base leading-relaxed", bodyText].join(" ")}>{item.notFor?.trim()}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {primaryLabel ? (
          <div className="mt-10 flex justify-center">
            <ButtonComponent href={primaryHref} variant="primary" className="min-h-11 rounded-full px-6 py-2.5 text-sm">
              {primaryLabel}
            </ButtonComponent>
          </div>
        ) : null}
      </div>
    </section>
  );
}
