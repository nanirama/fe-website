import Image from "next/image";

import { urlForImage } from "@/src/sanity/lib/utils";
import type { SanityImage } from "@/src/types/sanity-image";

const MAX_WIDTH = 1920;

export type CaseStudyCoverImage = SanityImage & {
  alt?: string;
  lqip?: string | null;
  dimensions?: { width?: number; height?: number } | null;
};

type Props = {
  image?: CaseStudyCoverImage | null;
  /** Used for alt text when CMS alt is empty */
  title: string;
};

function defaultAlt(title: string) {
  const t = title.trim();
  return t ? `Photograph for case study: ${t}` : "Case study photograph";
}

/** Sanity `metadata.lqip` is usually a data URL; some datasets store raw base64 only. */
function normalizeLqip(lqip: string | null | undefined): string | undefined {
  if (typeof lqip !== "string") return undefined;
  const t = lqip.trim();
  if (!t) return undefined;
  if (t.startsWith("data:")) return t;
  if (t.startsWith("http://") || t.startsWith("https://")) return undefined;
  return `data:image/jpeg;base64,${t}`;
}

/**
 * Full-bleed (within max width) case study cover from Sanity. Tuned for below-the-fold:
 * lazy load, low fetch priority, LQIP blur when available, responsive `sizes`, fixed layout from intrinsic dimensions.
 */
export default function CaseStudyWideImage({ image, title }: Props) {
  const built = image && urlForImage(image);
  if (!built) return null;

  const src = built.width(MAX_WIDTH).fit("max").quality(82).auto("format").url();

  const nw = image.dimensions?.width;
  const nh = image.dimensions?.height;

  let width = MAX_WIDTH;
  let height: number;

  if (nw && nh && nw > 0 && nh > 0) {
    const scale = Math.min(1, MAX_WIDTH / nw);
    width = Math.round(nw * scale);
    height = Math.round(nh * scale);
  } else {
    height = Math.round(MAX_WIDTH / 2.5);
  }

  const lqip = normalizeLqip(image.lqip);

  const alt = image.alt?.trim() || defaultAlt(title);

  return (
    <figure className="mx-auto w-full max-w-[1920px]">
      <div className="relative w-full overflow-hidden bg-slate-100">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-auto w-full object-cover"
          sizes="(max-width: 1920px) 100vw, 1920px"
          quality={82}
          priority={false}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          placeholder={lqip ? "blur" : "empty"}
          blurDataURL={lqip}
        />
      </div>
    </figure>
  );
}
