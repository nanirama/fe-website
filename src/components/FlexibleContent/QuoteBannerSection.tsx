import { section } from "framer-motion/client";

export type QuoteBannerSectionData = {
  quote?: string;
};

type Props = {
  data?: QuoteBannerSectionData;
};

export default function QuoteBannerSection({ data }: Props) {
  const quote = data?.quote?.trim();
  if (!quote) return null;

  return (
    <section className="w-full bg-brand">
      <div
        aria-label="Quote"
        className="max-w-7xl mx-auto border-b border-white/15 px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24"
      >
        <blockquote className="mx-auto ">
          <p className="font-manrope text-balance text-[28px] font-medium max-w-6xl mx-auto leading-[1.3] tracking-[-0.01em] text-white sm:text-[26px] lg:text-[34px] xl:text-[40px]">
            {quote}
          </p>
        </blockquote>
      </div>
    </section>
  );
}
