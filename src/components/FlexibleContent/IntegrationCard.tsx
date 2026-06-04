import Image from "next/image";
import Link from "next/link";
import type { SanityImage } from "@/src/types/sanity-image";
import { urlForImage } from "@/src/sanity/lib/utils";

type IntegrationCardItem = {
  _id: string;
  title?: string;
  slug?: string;
  listingOnly?: boolean;
  shortDescription?: string;
  image?: (SanityImage & { alt?: string }) | null;
};

export default function IntegrationCard({ integration }: { integration: IntegrationCardItem }) {
  const title = integration.title?.trim();
  const slug = integration.slug?.trim();
  const shortDescription = integration.shortDescription?.trim();
  const image = integration.image ?? undefined;
  const imageUrl = image ? urlForImage(image)?.width(800).height(450).fit("fillmax").quality(90).url() : undefined;
  const href = !integration.listingOnly && slug ? `/integrations/${slug}` : undefined;

  return (
    <article className="w-full">
      <div className="relative aspect-[5/3] w-full overflow-hidden  rounded-3xl">
        {href ? (
          <Link href={href} aria-label={title ? `${title} integration` : "Integration details"} className="block h-full w-full">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alt?.trim() || title || "Integration image"}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-contain  rounded-3xl"
              />
            ) : null}
          </Link>
        ) : imageUrl ? (
          <Image
            src={imageUrl}
            alt={image?.alt?.trim() || title || "Integration image"}
            fill
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-contain  rounded-2xl"
          />
        ) : null}
      </div>

      <div className="pt-5">
        {title ? (
          <h3 className="text-[24px] font-semibold leading-none tracking-tight text-[#020210]">
            {href ? <Link href={href}>{title}</Link> : title}
          </h3>
        ) : null}
        {shortDescription ? (
          <p className="mt-2 text-base leading-relaxed text-[#020210]/70">{shortDescription}</p>
        ) : null}
        {href ? (
          <Link href={href} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#13A89E] hover:underline">
            Learn More
            <span aria-hidden>→</span>
          </Link>
        ) : null}
      </div>
    </article>
  );
}
