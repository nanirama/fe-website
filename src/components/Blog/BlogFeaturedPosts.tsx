import type { BlogPost } from "./types";
import BlogPostCard from "./BlogPostCard";

type Props = {
  posts: BlogPost[];
};

/** First three posts: large left + two stacked right (desktop); stacked mobile. */
export default function BlogFeaturedPosts({ posts }: Props) {
  const [a, b, c] = posts;
  if (!a) return null;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-6 lg:items-stretch">
      <div className="min-w-0 lg:row-span-2">
        <BlogPostCard post={a} variant="featured-large" priority titleHeading="h2" />
      </div>
      {b ? (
        <div className="min-w-0 lg:col-start-2 lg:row-start-1">
          <BlogPostCard post={b} variant="featured-small" titleHeading="h3" />
        </div>
      ) : null}
      {c ? (
        <div className="min-w-0 lg:col-start-2 lg:row-start-2">
          <BlogPostCard post={c} variant="featured-small" titleHeading="h3" />
        </div>
      ) : null}
    </div>
  );
}
