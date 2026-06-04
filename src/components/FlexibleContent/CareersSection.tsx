import Link from "next/link";

type CareersSectionData = {
  sectionTag?: string;
  heading?: string;
  subheading?: string;
};

type JobPosting = {
  id: string;
  title: string;
  department: string;
  location: string;
  href: string;
};

const STATIC_JOBS: JobPosting[] = [
  {
    id: "job-1",
    title: "Partnership & Fundraising Lead",
    department: "Impact Foundation",
    location: "New York",
    href: "#",
  },
  {
    id: "job-2",
    title: "Partnership & Fundraising Lead",
    department: "Impact Foundation",
    location: "New York",
    href: "#",
  },
  {
    id: "job-3",
    title: "Partnership & Fundraising Lead",
    department: "Impact Foundation",
    location: "New York",
    href: "#",
  },
  {
    id: "job-4",
    title: "Partnership & Fundraising Lead",
    department: "Impact Foundation",
    location: "New York",
    href: "#",
  },
  {
    id: "job-5",
    title: "Partnership & Fundraising Lead",
    department: "Impact Foundation",
    location: "New York",
    href: "#",
  },
];

export default function CareersSection({ data }: { data?: CareersSectionData }) {
  const sectionTag = data?.sectionTag?.trim() || "Open job positions";
  const heading = data?.heading?.trim() || "Open Roles";
  const subheading =
    data?.subheading?.trim() ||
    "Join a team of curious minds, bold thinkers, and customer champions transforming how the world makes decisions.";

  return (
    <section aria-labelledby="careers-section-heading" className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="grid gap-6 border-b border-slate-200 pb-8 sm:pb-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="mb-3 text-sm font-semibold tracking-wide text-[#14B8A6] sm:text-base">{sectionTag}</p>
            <h2
              id="careers-section-heading"
              className="font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-4xl"
            >
              {heading}
            </h2>
          </div>
          <p className="text-base leading-relaxed text-[#020210]/70 sm:text-lg lg:col-span-6">{subheading}</p>
        </header>

        <ul className="divide-y divide-slate-200" aria-label="Open job postings">
          {STATIC_JOBS.map((job) => (
            <li key={job.id} className="py-6">
              <article className="grid gap-5 sm:gap-6 lg:grid-cols-[2fr_1fr_1fr_auto] lg:items-center">
                <div>
                  <p className="text-sm leading-6 text-[#020210]/65 mb-2">Job Title</p>
                  <h3 className="text-xl font-bold leading-[1.2] text-[#020210]">{job.title}</h3>
                </div>

                <div>
                  <p className="text-sm leading-6 text-[#020210]/65 mb-2">Department</p>
                  <p className="text-xl font-bold leading-[1.2] text-[#020210]">{job.department}</p>
                </div>

                <div>
                  <p className="text-sm leading-6 text-[#020210]/65 mb-2">Location</p>
                  <p className="text-xl font-bold leading-[1.2] text-[#020210]">{job.location}</p>
                </div>

                <div className="lg:justify-self-end">
                  <Link
                    href={job.href}
                    aria-label={`See detail for ${job.title}`}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#14B8A6] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0d9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
                  >
                    See Detail
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
