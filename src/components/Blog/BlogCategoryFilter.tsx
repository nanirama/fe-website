"use client";

import type { BlogCategory } from "./types";

export const ALL_TOPICS_ID = "all";

type Props = {
  categories: BlogCategory[];
  activeId: string;
  onChange: (categoryId: string) => void;
};

export default function BlogCategoryFilter({ categories, activeId, onChange }: Props) {
  return (
    <>
      <button
        type="button"
        role="tab"
        aria-selected={activeId === ALL_TOPICS_ID}
        aria-pressed={activeId === ALL_TOPICS_ID}
        onClick={() => onChange(ALL_TOPICS_ID)}
        className={[
          "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] sm:px-5 sm:text-base",
          activeId === ALL_TOPICS_ID
            ? "bg-[#14B8A6] text-white"
            : "bg-[#F3F4F6] text-[#111827] hover:bg-slate-200/90",
        ].join(" ")}
      >
        All Topics
      </button>
      {categories.map((cat) => {
        const id = cat._id;
        const label = cat.title?.trim() || "Category";
        const selected = activeId === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-pressed={selected}
            onClick={() => onChange(id)}
            className={[
              "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6] sm:px-5 sm:text-base",
              selected ? "bg-[#14B8A6] text-white" : "bg-[#F3F4F6] text-[#111827] hover:bg-slate-200/90",
            ].join(" ")}
          >
            {label}
          </button>
        );
      })}
    </>
  );
}
