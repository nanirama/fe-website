export type CaseStudyMetricStat = {
  _key?: string;
  heading?: string;
  description?: string;
};

type Props = {
  stats?: CaseStudyMetricStat[] | null;
};

/**
 * Case study headline metrics (Sanity `metricHighlights.stats`, max 3).
 */
export default function CaseStudyMetricHighlights({ stats }: Props) {
  const items = (stats ?? []).filter(
    (row) => row.heading?.trim() || row.description?.trim(),
  );
  if (items.length === 0) return null;

  return (
    <div className="mt-10 mb-16 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-6">
      {items.map((stat) => (
        <div
          key={stat._key ?? `${stat.heading}-${stat.description}`}
          className="rounded-2xl bg-[#EAEEF1] px-8 py-8 sm:px-10 sm:py-10"
        >
          {stat.heading?.trim() ? (
            <p className="font-manrope text-3xl font-bold leading-none tracking-tight text-[#13A89E] sm:text-4xl">
              {stat.heading.trim()}
            </p>
          ) : null}
          {stat.description?.trim() ? (
            <p className="mt-3 text-base font-normal leading-snug text-[#020210]/85 sm:text-lg">
              {stat.description.trim()}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
