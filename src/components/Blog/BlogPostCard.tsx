import Image from "next/image";
import Link from "next/link";

import type { BlogPost } from "./types";
import { getBlogCardImageUrls, getBlogFeaturedLargeImageUrls } from "./blogPostImage";

type Variant = "grid" | "featured-large" | "featured-small";

type Props = {
  post: BlogPost;
  variant: Variant;
  /** First card in viewport — improves LCP */
  priority?: boolean;
  titleHeading?: "h2" | "h3";
};

function categoryLabel(post: BlogPost): string {
  const first = post.categories?.[0];
  return first?.title?.trim() || "Blog";
}

function authorReadLine(post: BlogPost): string {
  const author =
    post.author?.name?.trim() || post.author?.title?.trim() || "Author";
  const mins = post.readTime;
  const read =
    typeof mins === "number" && Number.isFinite(mins) && mins > 0 ? `${mins} mins read` : "Read";
  return `${author} • ${read}`;
}

export default function BlogPostCard({ post, variant, priority = false, titleHeading }: Props) {
  const href = post.slug ? `/${post.slug}` : "#";
  const title = post.title?.trim() || "Untitled";
  const imageMeta =
    variant === "featured-large"
      ? getBlogFeaturedLargeImageUrls(post.mainImage)
      : getBlogCardImageUrls(post.mainImage);
  const alt = post.mainImage?.alt?.trim() || title;

  const isLarge = variant === "featured-large";
  const HeadingTag = titleHeading ?? (isLarge ? "h2" : "h3");

  const titleClass = isLarge
    ? "mt-4 line-clamp-3 font-manrope text-2xl font-semibold leading-tight text-[#020210] sm:text-3xl lg:text-[1.75rem] xl:text-3xl"
    : variant === "featured-small"
      ? "mt-3 line-clamp-2 font-manrope text-lg font-semibold leading-snug text-[#020210] sm:text-xl"
      : "mt-3 line-clamp-2 font-manrope text-lg font-semibold leading-snug text-[#020210] sm:text-xl";

  return (
    <article
      className={[
        "min-w-0 rounded-2xl",
        variant === "grid" ? "" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Link href={href} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]">
        <div className="overflow-hidden rounded-2xl bg-slate-100">
          {imageMeta.url ? (
            <Image
              src={imageMeta.url}
              alt={alt}
              width={isLarge ? 1200 : 800}
              height={isLarge ? 675 : 500}
              className={[
                "h-auto w-full object-cover",
                isLarge ? "aspect-[16/10] max-h-[420px] sm:max-h-none" : "aspect-[16/10]",
              ].join(" ")}
              sizes={
                isLarge
                  ? "(max-width: 1024px) 100vw, 65vw"
                  : variant === "featured-small"
                    ? "(max-width: 1024px) 100vw, 32vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              }
              priority={priority}
              placeholder={imageMeta.blurUrl ? "blur" : "empty"}
              blurDataURL={imageMeta.blurUrl || undefined}
            />
          ) : (
            <div
              className={[
                "w-full bg-slate-200/80",
                isLarge ? "aspect-[16/10] max-h-[420px]" : "aspect-[16/10]",
              ].join(" ")}
              aria-hidden
            />
          )}
        </div>
        <div className={variant === "grid" ? "py-4 sm:py-5" : isLarge ? "pt-4 sm:pt-5" : "pt-3"}>
          <p className="text-sm font-semibold text-[#14B8A6]">{categoryLabel(post)}</p>
          <HeadingTag className={titleClass}>{title}</HeadingTag>
          {isLarge && post.excerpt?.trim() ? (
            <p className="mt-3 line-clamp-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">{post.excerpt.trim()}</p>
          ) : null}
          <p className="mt-3 text-sm text-[#6B7280] sm:text-base">{authorReadLine(post)}</p>
        </div>
      </Link>
    </article>
  );
}
