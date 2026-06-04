import Image from "next/image";
import type { SanityImage } from "@/src/types/sanity-image";

import { urlForImage } from "@/src/sanity/lib/utils";

type Soc2Type2SectionData = {
  sectionTag?: string;
  heading?: string;
  body?: string;
  image?: SanityImage & { alt?: string };
};

export default function Soc2Type2Section({ data }: { data?: Soc2Type2SectionData }) {
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim() ?? "";
  const body = data?.body?.trim();
  const image = data?.image;

  const imageAlt = image?.alt?.trim() || heading || "SOC 2 Type 2 certification badge";
  const imageUrl =
    image &&
    urlForImage(image)?.width(900)?.format("webp")?.fit("max")?.quality(88)?.url();
  const blurUrl =
    image &&
    urlForImage(image)?.width(40)?.blur(25)?.format("webp")?.fit("max")?.url();

  return (
    <section
      aria-labelledby={heading ? "soc2-type2-heading" : undefined}
      className="w-full bg-white"
    >
      <div className="mx-auto max-w-7xl px-4 border-b border-[#ecedf0] md:py-20 py-10">
        <div className="rounded-2xl border border-slate-200/90 bg-[#f1f5f9] px-6 py-8 sm:px-10 sm:py-10">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <header className="min-w-0">
              {sectionTag ? (
                <p className="mb-3 text-sm font-medium tracking-wide text-[#13A89E] sm:text-base">{sectionTag}</p>
              ) : null}
              {heading ? (
                <h2
                  id="soc2-type2-heading"
                  className="font-manrope text-balance text-3xl font-semibold leading-tight tracking-tight text-[#020210] sm:text-4xl lg:text-[2.625rem]"
                >
                  {heading}
                </h2>
              ) : null}
              {body ? (
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#020210]/70 sm:mt-6 sm:text-lg">
                  {body}
                </p>
              ) : null}
            </header>

            <div className="min-w-0">
              {imageUrl ? (
                <figure className="mx-auto w-full max-w-sm lg:max-w-md">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    width={900}
                    height={900}
                    className="h-auto w-full object-contain"
                    sizes="(max-width: 1024px) 80vw, 40vw"
                    placeholder={blurUrl ? "blur" : "empty"}
                    blurDataURL={blurUrl || undefined}
                  />
                </figure>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
