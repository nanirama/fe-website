import type { SanityImage } from "@/src/types/sanity-image";

export type BlogCategory = {
  _id: string;
  title?: string;
  slug?: string;
};

export type BlogAuthor = {
  _id?: string;
  name?: string;
  title?: string;
};

export type BlogPost = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  readTime?: number | null;
  mainImage?: SanityImage & { alt?: string };
  author?: BlogAuthor | null;
  categories?: BlogCategory[] | null;
};
