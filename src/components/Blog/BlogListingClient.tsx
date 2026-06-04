"use client";

import { useDeferredValue, useMemo, useState } from "react";

import BlogCategoryFilter, { ALL_TOPICS_ID } from "./BlogCategoryFilter";
import BlogFeaturedPosts from "./BlogFeaturedPosts";
import BlogPagination from "./BlogPagination";
import BlogPostsGrid from "./BlogPostsGrid";
import BlogSearchAutocomplete from "./BlogSearchAutocomplete";
import type { BlogCategory, BlogPost } from "./types";

const GRID_PAGE_SIZE = 9;

type Props = {
  pageTitle?: string;
  posts: BlogPost[];
  categories: BlogCategory[];
};

function postMatchesCategory(post: BlogPost, categoryId: string): boolean {
  if (categoryId === ALL_TOPICS_ID) return true;
  return post.categories?.some((c) => c._id === categoryId) ?? false;
}

function postMatchesSearch(post: BlogPost, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const title = post.title?.toLowerCase() ?? "";
  const excerpt = post.excerpt?.toLowerCase() ?? "";
  return title.includes(q) || excerpt.includes(q);
}

export default function BlogListingClient({ pageTitle, posts, categories }: Props) {
  const [categoryId, setCategoryId] = useState(ALL_TOPICS_ID);
  const [searchQuery, setSearchQuery] = useState("");
  const [gridPage, setGridPage] = useState(1);

  const deferredSearch = useDeferredValue(searchQuery);

  const filtered = useMemo(() => {
    return posts.filter(
      (p) => postMatchesCategory(p, categoryId) && postMatchesSearch(p, deferredSearch),
    );
  }, [posts, categoryId, deferredSearch]);

  const featured = useMemo(() => filtered.slice(0, 3), [filtered]);
  const gridSource = useMemo(() => filtered.slice(3), [filtered]);

  const totalGridPages = Math.max(1, Math.ceil(gridSource.length / GRID_PAGE_SIZE));
  const safeGridPage = Math.min(gridPage, totalGridPages);

  const gridSlice = useMemo(() => {
    const page = safeGridPage;
    const start = (page - 1) * GRID_PAGE_SIZE;
    return gridSource.slice(start, start + GRID_PAGE_SIZE);
  }, [gridSource, safeGridPage]);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const pool = posts.filter((p) => postMatchesCategory(p, categoryId));
    const out: { id: string; label: string }[] = [];
    for (const p of pool) {
      const title = p.title?.trim();
      if (!title) continue;
      if (title.toLowerCase().includes(q) || p.excerpt?.toLowerCase().includes(q)) {
        out.push({ id: p._id, label: title });
      }
      if (out.length >= 8) break;
    }
    return out;
  }, [posts, categoryId, searchQuery]);

  const setCategory = (id: string) => {
    setCategoryId(id);
    setGridPage(1);
  };

  const setSearch = (v: string) => {
    setSearchQuery(v);
    setGridPage(1);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 lg:pt-32 lg:pb-16">
        {pageTitle?.trim() ? (
          <h1 className="font-manrope text-3xl font-semibold tracking-tight text-[#020210] sm:text-4xl">
            {pageTitle.trim()}
          </h1>
        ) : null}

        <div className="mt-8 flex flex-col gap-6 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div
            role="tablist"
            aria-label="Blog categories"
            className="flex min-w-0 flex-1 flex-wrap gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <BlogCategoryFilter categories={categories} activeId={categoryId} onChange={setCategory} />
          </div>
          <BlogSearchAutocomplete value={searchQuery} onChange={setSearch} suggestions={suggestions} />
        </div>

        <p className="sr-only" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "post" : "posts"} match your filters.
        </p>

        {featured.length > 0 ? (
          <div className="mt-10 lg:mt-12">
            <BlogFeaturedPosts posts={featured} />
          </div>
        ) : (
          <p className="mt-10 text-center text-lg text-[#4B5563] lg:mt-12">No posts match your filters.</p>
        )}

        <BlogPostsGrid posts={gridSlice} />

        <BlogPagination page={safeGridPage} totalPages={totalGridPages} onPageChange={setGridPage} />
      </div>
    </div>
  );
}
