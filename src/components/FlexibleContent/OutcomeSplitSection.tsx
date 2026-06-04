import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type OutcomeColumn = {
  _key?: string;
  body?: PortableTextBlock[];
};

type OutcomeSplitSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
  columns?: OutcomeColumn[];
};

function hasPortableBody(body: unknown): body is PortableTextBlock[] {
  return Array.isArray(body) && body.length > 0;
}

function columnGridClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-lg leading-relaxed text-[#020210]/70 last:mb-0">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-[#020210]">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function OutcomeSplitSection({ data }: { data?: OutcomeSplitSectionData }) {
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim();
  const subheading = data?.subheading?.trim();
  const columns = (data?.columns ?? []).filter((column) => hasPortableBody(column.body));

  return (
    <section
      aria-labelledby={heading ? "outcome-split-heading" : undefined}
      className="w-full  bg-[#E9EDF1]"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:py-24 border-t border-[#c1c9d3]">
        <header className="mx-auto max-w-4xl text-center">
          {sectionTag ? <p className="mb-2 text-sm font-medium text-[#13A89E] sm:text-base">{sectionTag}</p> : null}
          {heading ? (
            <h2
              id="outcome-split-heading"
              className="font-manrope text-balance text-4xl font-semibold leading-tight tracking-tight text-[#020210] sm:text-5xl"
            >
              {heading}
            </h2>
          ) : null}
          {subheading ? <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#020210]/65 sm:text-xl">{subheading}</p> : null}
        </header>

        {columns.length > 0 ? (
          <div className={`mt-10 grid gap-8 lg:mt-12 ${columnGridClass(columns.length)}`}>
            {columns.map((column, index) => (
              <div key={column._key ?? `outcome-column-${index}`} className="min-w-0">
                <PortableText value={column.body!} components={bodyComponents} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
