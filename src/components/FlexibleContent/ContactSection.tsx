import Image from "next/image";
import HubSpotForm from "./HubSpotForm";

type BadgeImage = {
  alt?: string;
  url?: string;
};

type Badge = {
  image?: BadgeImage;
  label?: string;
};

type ContactSectionData = {
  heading?: string;
  address?: string;
  phone?: string;
  email?: string;
  badge?: Badge;
};

type Props = {
  data?: ContactSectionData;
  page?: string;
};

function GlobeDecoration() {
  return (
    <svg
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="pointer-events-none absolute -bottom-10 -right-10 h-65 w-65 opacity-20 sm:h-75 sm:w-75"
    >
      <circle cx="150" cy="150" r="148" stroke="white" strokeWidth="1.2" />
      <ellipse cx="150" cy="150" rx="148" ry="60" stroke="white" strokeWidth="1" />
      <ellipse cx="150" cy="150" rx="148" ry="110" stroke="white" strokeWidth="1" />
      <ellipse cx="150" cy="150" rx="60" ry="148" stroke="white" strokeWidth="1" />
      <ellipse cx="150" cy="150" rx="110" ry="148" stroke="white" strokeWidth="1" />
      <line x1="2" y1="150" x2="298" y2="150" stroke="white" strokeWidth="1" />
      <line x1="150" y1="2" x2="150" y2="298" stroke="white" strokeWidth="1" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="mt-0.5 h-5 w-5 shrink-0 text-white"
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.326 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0 text-white"
    >
      <path
        fillRule="evenodd"
        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function EnvelopeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 shrink-0 text-white"
    >
      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
  );
}


export default function ContactSection({ data }: Props) {
  const heading = data?.heading?.trim() || "Send Us a Message";
  const address = data?.address?.trim();
  const phone = data?.phone?.trim();
  const email = data?.email?.trim();
  const badge = data?.badge;
  const badgeImageUrl = badge?.image?.url;
  const badgeLabel = badge?.label?.trim();

  return (
    <section className="w-full py-10 sm:py-16 lg:pb-20 sm:pt-40 pt-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 overflow-hidden gap-6 rounded-2xl lg:grid-cols-12">

          {/* ── Left: 4 cols — Sanity content ── */}
          <div className="relative flex flex-col md:order-first order-last globe_contact justify-between rounded-xl overflow-hidden bg-[#13a89e] lg:col-span-4 p-5 lg:p-6">
            {/* Top content */}
            <div className="relative z-10 pt-5 ps-4">
              <h2 className="text-3xl font-semibold leading-tight text-white sm:text-4xl">
                {heading}
              </h2>

              <ul className="mt-8 space-y-1.5">
                {address && (
                  <li className="flex items-start gap-2">
                    <MapPinIcon />
                    <span className="whitespace-pre-line text-sm leading-relaxed text-[#f5fbfb]">
                      {address}
                    </span>
                  </li>
                )}
                {phone && (
                  <li className="flex items-center gap-2">
                    <PhoneIcon />
                    <a
                      href={`tel:${phone.replace(/[\s\-().]/g, "")}`}
                      className="text-sm text-white/90 transition hover:text-[#f5fbfb]"
                    >
                      {phone}
                    </a>
                  </li>
                )}
                {email && (
                  <li className="flex items-center gap-2">
                    <EnvelopeIcon />
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-white/90 transition hover:text-[#f5fbfb]"
                    >
                      {email}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Badge — pinned to bottom */}
            {(badgeImageUrl || badgeLabel) && (
              <div className="relative z-10 mt-10 flex items-center gap-1 rounded-xl bg-[#ebeff4] py-3 px-2 shadow-sm">
                {badgeImageUrl && (
                  <div className="relative h-20 w-20 shrink-0">
                    <Image
                      src={badgeImageUrl}
                      alt={badge?.image?.alt?.trim() || badgeLabel || "Certification badge"}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                )}
                {badgeLabel && (
                  <p className="text-base font-bold leading-snug text-[#020210]">
                    {badgeLabel}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Right: 8 cols — HubSpot form ── */}
          <div className="lg:col-span-8">
            <HubSpotForm title="Schedule Your Demo" />
          </div>

        </div>
      </div>
    </section>
  );
}
