import type { BlogPost } from "./types";
import BlogPostCard from "./BlogPostCard";

type Props = {
  posts: BlogPost[];
};

export default function BlogPostsGrid({ posts }: Props) {
  if (posts.length === 0) return null;

  return (
    <ul className="mt-10 grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
      {posts.map((post) => (
        <li key={post._id} className="min-w-0">
          <BlogPostCard post={post} variant="grid" titleHeading="h3" />
        </li>
      ))}
    </ul>
  );
}
