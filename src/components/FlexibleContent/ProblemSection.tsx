export type ProblemColumn = {
  _key?: string;
  body?: string;
};

export type ProblemSectionData = {
  sectionTag?: string;
  heading?: string;
  columns?: ProblemColumn[];
  backgroundStyle?: "lightGradient" | "white" | "dark";
};

type Props = {
  data?: ProblemSectionData;
};

function columnGridClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

export default function ProblemSection({ data }: Props) {
  const sectionTag = data?.sectionTag?.trim() ?? "The Problem";
  const heading = data?.heading?.trim() ?? "";
  const columns = (data?.columns ?? []).filter((c) => c?.body?.trim());
  const bg = data?.backgroundStyle ?? "lightGradient";

  const isDark = bg === "dark";
  const isWhite = bg === "white";
  const isLightGradient = bg === "lightGradient" || (!isDark && !isWhite);

  const bodyClass = isDark ? "text-white/80" : "text-[#4B5563]";
  const headingClass = isDark ? "text-white" : "text-[#020210]";

  return (
    <section
      aria-labelledby={heading ? "problem-section-heading" : undefined}
      className={[
        "relative w-full overflow-hidden py-10 lg:py-16 ",
        isDark ? "bg-brand text-white" : isWhite ? "bg-white text-slate-900" : "bg-white text-slate-900",
      ].join(" ")}
    >
      {isLightGradient ? (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_0%_0%,rgba(199,210,254,0.55),transparent_58%),radial-gradient(ellipse_55%_45%_at_100%_100%,rgba(226,232,240,0.7),transparent_50%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184_/_0.16)_1px,transparent_0)] bg-[length:16px_16px] opacity-[0.45]"
          />
        </>
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16 items-end z-40 relative">
          <header className="min-w-0 lg:col-span-4">
            {sectionTag ? (
              <p className="mb-3 text-base font-normal tracking-wide text-[#13A89E]">{sectionTag}</p>
            ) : null}
            {heading ? (
              <h2
                id="problem-section-heading"
                className={`font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight xl:text-[42px] ${headingClass}`}
              >
                {heading}
              </h2>
            ) : null}
          </header>

          {columns.length > 0 ? (
            <div
              className={`grid min-w-0 gap-8 lg:col-span-8 lg:gap-10 ${columnGridClass(columns.length)}`}
            >
              {columns.map((col) => (
                <p
                  key={col._key ?? col.body}
                  className={`text-base text-[#020210]/70 leading-[130%] ${bodyClass}`}
                >
                  <span className="whitespace-pre-line">{col.body?.trim()}</span>
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
