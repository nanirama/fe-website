import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

export type StatementColumn = {
  _key?: string;
  body?: PortableTextBlock[];
};

export type StatementSectionData = {
  sectionTag?: string;
  heading?: string;
  columns?: StatementColumn[];
};

type Props = {
  data?: StatementSectionData;
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
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#14B8A6] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] sm:w-auto sm:min-h-0"
    >
      {label}
    </Link>
  );
}

function SecondaryCta({
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
      className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#D1D5DB] bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 sm:w-auto sm:min-h-0"
    >
      {label}
    </Link>
  );
}

function columnGridClass(count: number): string {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
}

function hasPortableBody(body: unknown): body is PortableTextBlock[] {
  return Array.isArray(body) && body.length > 0;
}

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-base leading-[130%] text-[#4B5563] last:mb-0 sm:text-base sm:leading-[130%]">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-slate-800">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default function StatementSection({ data }: Props) {
  const sectionTag = data?.sectionTag?.trim() ?? "";
  const heading = data?.heading?.trim() ?? "";
  const columns = (data?.columns ?? []).filter((c) => hasPortableBody(c.body));

  return (
    <section
      aria-labelledby={heading ? "statement-section-heading" : undefined}
      className="w-full bg-white px-4"
    >
      <div className="mx-auto max-w-7xl  border-t border-[#d3d7dd] py-16 sm:py-20 lg:py-24">
        <div className="rounded-2xl bg-slate-100 px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          <div className="grid lg:grid-cols-12 gap-5 items-end">
            <header className="min-w-0 lg:col-span-4">
              {sectionTag ? (
                <p className="mb-3 text-sm font-normal tracking-wide text-[#14B8A6] sm:text-base">
                  {sectionTag}
                </p>
              ) : null}
              {heading ? (
                <h2
                  id="statement-section-heading"
                  className="font-manrope text-balance text-4xl font-semibold leading-[1.15] tracking-tight text-[#020210] sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-[43px]"
                >
                  {heading}
                </h2>
              ) : null}
            </header>

            {columns.length > 0 ? (
              <div
                className={`grid min-w-0 gap-8 lg:col-span-8 lg:gap-5 ${columnGridClass(columns.length)}`}
              >
                {columns.map((col, index) => (
                  <div key={col._key ?? `statement-col-${index}`} className="min-w-0">
                    <PortableText value={col.body!} components={bodyComponents} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
