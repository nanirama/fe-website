"use client";

import Image from "next/image";
import { useState } from "react";

import CapabilitiesAccordion, {
  type CapabilityItem,
} from "@/src/components/FlexibleContent/CapabilitiesAccordion";
import { urlForImage } from "@/src/sanity/lib/utils";

type SanityImage = {
  asset?: {
    _ref?: string;
  };
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface FeatureBlockData {
  heading: string;
  image?: SanityImage & { alt?: string };
  layout?: "imageLeft" | "imageRight";
  capabilities?: CapabilityItem[];
}

interface Props {
  data?: {
    heading?: string;
    subHeading?: string;
    features?: FeatureBlockData | null;
  };
}

// ─── Feature Block ────────────────────────────────────────────────────────────

function FeatureBlock({ feature }: { feature: FeatureBlockData }) {
  const { heading, image, layout, capabilities } = feature;
  const isImageLeft = layout === "imageLeft" || layout === undefined;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeCapImage = capabilities?.[activeIndex]?.image;
  const displayImage = activeCapImage ?? image;

  const built = displayImage ? urlForImage(displayImage) : undefined;
  const src = built?.width(840).quality(85).url() ?? "";
  const blurDataURL = built?.width(40).height(40).blur(20).format("webp").url();

  const meta =
    displayImage?.asset && typeof displayImage.asset === "object" && "metadata" in displayImage.asset
      ? (displayImage.asset as { metadata?: { dimensions?: { width?: number; height?: number } } })
          .metadata
      : undefined;
  const width = meta?.dimensions?.width ?? 800;
  const height = meta?.dimensions?.height ?? 600;

  const imageBlock = src ? (
    <div className="relative w-full md:mt-4 mt-2 mx-auto sm:mx-0 shrink-0 flex justify-center items-start">
      {/* Soft background card behind the image */}
      {/* <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-2xl bg-neutral-100 dark:bg-neutral-800 translate-x-3 translate-y-3"
      /> */}
      <figure className="relative rounded-[14px] overflow-hidden bg-white dark:bg-neutral-900">
        <Image
          src={src}
          alt={displayImage?.alt ?? heading}
          width={width}
          height={height}
          placeholder={blurDataURL ? "blur" : "empty"}
          blurDataURL={blurDataURL}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 60vw, 600px"
          className="w-full object-cover"
          priority={false}
        />
      </figure>
    </div>
  ) : null;

  const contentBlock = (
    <div className="flex-1 min-w-0">
      <div className="mb-6 ">
        <h3 className="text-2xl sm:text-[32px] font-semibold leading-tight tracking-tight text-[#020210] dark:text-neutral-100">
          {heading}
        </h3>
      </div>
      {capabilities && capabilities.length > 0 && (
        <CapabilitiesAccordion
          capabilities={capabilities}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />
      )}
    </div>
  );

  if (!imageBlock) {
    return <article className="max-w-3xl mx-auto">{contentBlock}</article>;
  }

  return (
    <article className=" flex md:flex-row flex-col justfiy-between items-start gap-8 lg:gap-16 grid md:grid-cols-2">
      {isImageLeft ? (
        <>
          {imageBlock}
          {contentBlock}
        </>
      ) : (
        <>
          {/* On mobile always show image first; sm+ respects layout */}
          <div className="sm:order-2">{imageBlock}</div>
          <div className="sm:order-1">{contentBlock}</div>
        </>
      )}
    </article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesCapabilitiesSection({ data }: Props) {
  const heading = data?.heading ?? "";
  const feature = data?.features;
  if (!feature?.heading) return null;

  return (
    <section
      aria-labelledby="features-heading"
      className="w-full py-16 sm:py-20 lg:py-28 bg-white dark:bg-neutral-950"
    >
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        {heading && (
          <header className="text-center mb-14 sm:mb-20 max-w-3xl mx-auto">
          <h2
            id="features-heading"
            className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-neutral-900 dark:text-neutral-100 leading-tight"
          >
            {heading}
          </h2>
        </header>
        )}
        

        <div className="w-full">
          <FeatureBlock feature={feature} />
        </div>
      </div>
    </section>
  );
}
