import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";

export function getBlogCardImageUrls(image: (SanityImage & { alt?: string }) | undefined) {
  const url =
    image &&
    urlForImage(image)?.width(800)?.height(500)?.fit("crop")?.quality(80)?.format("webp")?.url();
  const blurUrl =
    image && urlForImage(image)?.width(40)?.height(25)?.blur(20)?.format("webp")?.url();
  return { url: url || "", blurUrl: blurUrl || "" };
}

export function getBlogFeaturedLargeImageUrls(image: (SanityImage & { alt?: string }) | undefined) {
  const url =
    image &&
    urlForImage(image)?.width(1200)?.height(675)?.fit("crop")?.quality(82)?.format("webp")?.url();
  const blurUrl =
    image && urlForImage(image)?.width(40)?.height(22)?.blur(20)?.format("webp")?.url();
  return { url: url || "", blurUrl: blurUrl || "" };
}
