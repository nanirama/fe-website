import Link from "next/link";

type TextLink = {
  label?: string;
  url?: string;
};

type CenteredCalloutSectionData = {
  heading?: string;
  body?: string;
  textLink?: TextLink;
};

function isValidHref(url: unknown): url is string {
  return typeof url === "string" && url.trim().length > 0;
}

export default function CenteredCalloutSection({ data }: { data?: CenteredCalloutSectionData }) {
  const heading = data?.heading?.trim() ?? "";
  const body = data?.body?.trim();
  const linkLabel = data?.textLink?.label?.trim();
  const linkUrl = isValidHref(data?.textLink?.url) ? data?.textLink?.url.trim() : "";
  const hasLink = Boolean(linkLabel && linkUrl);
  const isExternal = /^https?:\/\//i.test(linkUrl);

  if (!heading && !body && !hasLink) return null;

  return (
    <section
      aria-labelledby={heading ? "centered-callout-heading" : undefined}
      className="w-full bg-[#ebeff4] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {heading ? (
          <h2
            id="centered-callout-heading"
            className="font-manrope text-balance text-3xl font-semibold leading-tight tracking-tight text-[#020210] sm:text-4xl lg:text-[2.625rem]"
          >
            {heading}
          </h2>
        ) : null}

        {body ? (
          <p className="mx-auto mt-5 max-w-5xl text-base leading-relaxed text-[#020210]/70 sm:mt-6">
            {body}
          </p>
        ) : null}

        {hasLink ? (
          <div className="mt-6 sm:mt-8">
            <Link
              href={linkUrl}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex items-center gap-2 text-base font-semibold text-[#13A89E] transition-colors hover:text-[#0f9488] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13A89E]"
            >
              <span>{linkLabel}</span>
              <span aria-hidden="true" className="text-lg leading-none">
                →
              </span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
