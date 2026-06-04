"use client";

type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

function getPaginationItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const set = new Set<number>();
  set.add(1);
  set.add(total);
  set.add(current);
  set.add(current - 1);
  set.add(current + 1);
  const sorted = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "ellipsis")[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const n = sorted[i];
    if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
      out.push("ellipsis");
    }
    out.push(n);
  }
  return out;
}

export default function BlogPagination({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null;

  const items = getPaginationItems(page, totalPages);

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex justify-center sm:mt-16">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-[#111827] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          >
            <span aria-hidden className="text-[#14B8A6]">
              ‹
            </span>
          </button>
        </li>
        {items.map((item, idx) =>
          item === "ellipsis" ? (
            <li key={`e-${idx}`} className="px-1 text-slate-500" aria-hidden>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                onClick={() => onPageChange(item)}
                className={[
                  "flex h-10 min-w-10 items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors sm:h-11 sm:min-w-11 sm:text-base",
                  item === page
                    ? "bg-[#14B8A6] text-white"
                    : "border border-slate-200 bg-[#F3F4F6] text-[#111827] hover:bg-slate-200",
                ].join(" ")}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-[#F3F4F6] text-[#111827] transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40 sm:h-11 sm:w-11"
          >
            <span aria-hidden className="text-[#14B8A6]">
              ›
            </span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
