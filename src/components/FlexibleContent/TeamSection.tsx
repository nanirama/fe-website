import Image from "next/image";
import Link from "next/link";

type TeamMember = {
  _id?: string;
  name?: string;
  jobTitle?: string;
  linkedinUrl?: string;
  profileImage?: {
    alt?: string;
    url?: string;
  };
};

type TeamSectionData = {
  heading?: string;
  subheading?: string;
  members?: TeamMember[];
};

type Props = {
  data?: TeamSectionData;
};

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="ml-1 h-7 w-7 mt-1">
    <path
      d="M6 14L14 6M14 6H8M14 6V12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function TeamSection({ data }: Props) {
  const heading = data?.heading || "The People Behind the Platform";
  const subheading =
    data?.subheading ||
    "FieldEquip is built and supported by a team with experience across enterprise software, field systems, and large-scale implementation.";

  const members = data?.members ?? [];

  if (!members.length) return null;

  return (
    <section aria-labelledby="team-section-heading" className="w-full bg-brand py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 text-center border-b border-white/15 pb-20">
        <h2 id="team-section-heading" className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
          {heading}
        </h2>

        <p className="mt-3 sm:max-w-2xl mx-auto text-base text-white/70">
          {subheading}
        </p>

        <ul className="sm:mt-16 mt-6 grid grid-cols-1 sm:gap-4 gap-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5" aria-label="Team members">
          {members.map((member, index) => (
            <li key={member._id ?? `${member.name}-${index}`} className="min-w-0">
              <article className="text-center">
                <div className="relative mx-auto w-full overflow-hidden rounded-xl bg-white/10 aspect-[5/6]">
                  {member.profileImage?.url ? (
                    <Image
                      src={member.profileImage.url}
                      alt={member.profileImage.alt || member.name || "Team member"}
                      fill
                      sizes="(max-width: 1023px) 70vw, 22vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-white/10" />
                  )}
                </div>

                <div className="mt-4">
                  <h3 className="text-xl font-semibold leading-tight text-white">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-white/75">
                    {member.jobTitle}
                  </p>

                  {member.linkedinUrl ? (
                    <Link
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center text-base font-medium text-[#13A89E] transition-colors hover:text-teal-300"
                    >
                      <span>Visit LinkedIn</span>
                      <ArrowIcon />
                    </Link>
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}