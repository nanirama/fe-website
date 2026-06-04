import Image from "next/image";
import Link from "next/link";

import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";
import type { PortableTextBlock } from "@portabletext/types";

import BlogPostBody from "./BlogPostBody";
import BlogSingleCtaSection from "../Blog/BlogSingleCtaSection";

export type BlogPostArticleData = {
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  readTime?: number | null;
  mainImage?: SanityImage & { alt?: string };
  author?: {
    name?: string;
    title?: string;
    image?: SanityImage & { alt?: string };
  } | null;
  categories?: { title?: string }[] | null;
  body?: PortableTextBlock[];
};

function formatLongDate(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function categoryReadParts(post: BlogPostArticleData): { category: string; readLabel: string } {
  const category = post.categories?.[0]?.title?.trim() || "Blog";
  const mins = post.readTime;
  const readLabel =
    typeof mins === "number" && Number.isFinite(mins) && mins > 0 ? `${mins} mins read` : "Read";
  return { category, readLabel };
}

function authorInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Props = {
  post: BlogPostArticleData;
};

export default function BlogPostArticle({ post }: Props) {
  const title = post.title?.trim() || "Post";
  const { category, readLabel } = categoryReadParts(post);
  const heroUrl =
    post.mainImage &&
    urlForImage(post.mainImage)?.width(1920)?.height(1080)?.fit("crop")?.quality(85)?.format("webp")?.url();
  const heroBlur =
    post.mainImage && urlForImage(post.mainImage)?.width(40)?.height(22)?.blur(20)?.format("webp")?.url();
  const heroAlt = post.mainImage?.alt?.trim() || title;

  const authorName = post.author?.name?.trim() || post.author?.title?.trim() || "Author";
  const jobTitle = post.author?.title?.trim();
  const showSubtitle = Boolean(
    post.author?.name?.trim() && jobTitle && jobTitle !== post.author?.name?.trim(),
  );

  const avatarUrl =
    post.author?.image &&
    urlForImage(post.author.image)?.width(128)?.height(128)?.fit("crop")?.quality(80)?.format("webp")?.url();

  const updated = formatLongDate(post.publishedAt);

  return (
    <article className="w-full bg-white" itemScope itemType="https://schema.org/BlogPosting">
      <meta itemProp="headline" content={title} />
      {post.publishedAt ? <meta itemProp="datePublished" content={post.publishedAt} /> : null}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pt-36 sm:pt-32 pt-28 ">
        <nav aria-label="Breadcrumb" className="mx-auto max-w-full text-sm text-[#6B7280]">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href="/blog"
                className="font-medium text-[#14B8A6] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden className="text-[#9CA3AF]">
              /
            </li>
            <li className="text-[#111827]" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>

        <header className="mx-auto mt-6 w-full sm:mt-8">
          <p className="text-sm flex flex-row gap-2">
            <span className="text-[#020210]">{category}</span>
            <span className="text-[#6B7280]"> • </span>
            <span className="text-[#020210]/70"> {readLabel}</span>
          </p>
          <h1 className="mt-4 font-manrope text-3xl font-semibold leading-tight tracking-tight text-[#020210] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
            {title}
          </h1>

          <div className="mt-6 flex flex-col gap-4 border-b border-slate-200 pb-8 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:pb-10">
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${authorName} profile photo`}
                  width={56}
                  height={56}
                  className="h-12 w-12 shrink-0 rounded-full object-cover sm:h-14 sm:w-14"
                  sizes="56px"
                />
              ) : (
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/15 text-sm font-semibold text-[#0f766e] sm:h-14 sm:w-14 sm:text-base"
                  aria-hidden
                >
                  {authorInitials(authorName)}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-manrope text-base font-semibold text-[#020210] sm:text-lg">{authorName}</p>
                {showSubtitle ? (
                  <p className="mt-0.5 text-sm text-[#6B7280] sm:text-base">{jobTitle}</p>
                ) : null}
              </div>
            </div>
            {updated ? (
              <p className="shrink-0 text-sm text-[#6B7280] sm:text-right sm:text-base">
                <span className="font-medium text-[#374151]">Last Updated:</span> {updated}
              </p>
            ) : null}
          </div>
        </header>
        {heroUrl ? (
        <figure className="relative md:rounded-2xl rounded-lg w-full h-full min-h-150 overflow-hidden">
          <Image
            src={heroUrl}
            alt={heroAlt}
            fill
            className="h-full w-full max-h-full lg:max-h-full" 
            sizes="(max-width: full) full, 1280px"
            priority
            placeholder={heroBlur ? "blur" : "empty"}
            blurDataURL={heroBlur || undefined}
          />
        </figure>
      ) : null}

      </div>
      
      <BlogPostBody value={post.body} />
      <BlogSingleCtaSection />
    </article>
  );
}
