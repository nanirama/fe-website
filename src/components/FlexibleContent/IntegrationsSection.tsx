import type { SanityImage } from "@/src/types/sanity-image";
import IntegrationCard from "./IntegrationCard";

type IntegrationListItem = {
  _id: string;
  title?: string;
  slug?: string;
  listingOnly?: boolean;
  shortDescription?: string;
  image?: (SanityImage & { alt?: string }) | null;
};

type IntegrationsSectionData = {
  sectionTag?: string;
  heading?: string;
  description?: string;
  integrations?: IntegrationListItem[];
};

export default function IntegrationsSection({ data }: { data?: IntegrationsSectionData }) {
  const sectionTag = data?.sectionTag?.trim();
  const heading = data?.heading?.trim();
  const description = data?.description?.trim();
  const integrations = data?.integrations ?? [];

  if (!sectionTag && !heading && !description && integrations.length === 0) return null;

  return (
    <section
      aria-labelledby={heading ? "integrations-section-heading" : undefined}
      className="w-full bg-white py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          <header className="min-w-0">
            {sectionTag ? (
              <p className="mb-2 text-xs font-medium tracking-wide text-[#13A89E] sm:text-sm">{sectionTag}</p>
            ) : null}
            {heading ? (
              <h2
                id="integrations-section-heading"
                className="font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-4xl"
              >
                {heading}
              </h2>
            ) : null}
          </header>

          {description ? (
            <div className="min-w-0 pt-0.5 lg:pt-1">
              <p className="max-w-[64ch] leading-relaxed text-[#020210]/70 text-base lg:leading-[1.45]">
                {description}
              </p>
            </div>
          ) : null}
        </div>

        {integrations.length > 0 ? (
          <div className="mt-10 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3">
            {integrations.map((integration) => (
              <IntegrationCard key={integration._id} integration={integration} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
