import { Fragment, cache } from "react";
import { cacheTag, cacheLife } from "next/cache";
import Link from "next/link";

import { client } from "@/src/sanity/lib/client";
import { footerQuery } from "@/src/sanity/lib/queries";
import { getSlugUrl } from "@/src/lib/utils";
import type { CmsSocialLink } from "@/src/components/Header/menu-types";

// Only the fields Footer actually renders — avoids pulling header mega-menu
// data (productNav, industriesNav with images, companyNav, resourcesNav).
type FooterData = {
  footerNote?: string;
  copyright?: string;
  socialLinks?: { platform: CmsSocialLink["platform"]; url: string }[];
  footerMenu?: { menuTitle?: string; navItems?: { title?: string; _type?: string; slug?: string }[] }[];
  legalNav?: { title?: string; _type?: string; slug?: string }[];
};

// ── Layer 1: Remote Data Cache ────────────────────────────────────────────────
// Fetches only the 5 footer-specific fields. "use cache: remote" persists the
// result in Next.js Data Cache (shared across all users). Invalidated when the
// Sanity webhook fires revalidateTag('settings').
async function fetchFooterData(): Promise<FooterData> {
  'use cache: remote';
  cacheTag('settings');
  cacheLife({ revalidate: 3600 });
  return await client.fetch<FooterData | null>(footerQuery) ?? {};
}

// React Request Memoization: deduplicates within the same render tree so
// multiple renders never make more than one Data Cache lookup per request.
const getFooterData = cache(fetchFooterData);

const footerLinkClass =
  "text-sm leading-[140%] text-white transition-colors hover:text-[#13A89E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A89E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#234a7a]";

const sectionTitleClass = "mb-2 text-lg leading-normal text-[#13A89E]";

const socialLinkClass =
  "inline-flex items-center justify-center rounded-sm text-white transition-colors hover:text-[#13A89E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#13A89E] focus-visible:ring-offset-2 focus-visible:ring-offset-[#234a7a]";

const PLATFORM_LABELS: Record<CmsSocialLink["platform"], string> = {
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  youtube: "YouTube",
  facebook: "Facebook",
  instagram: "Instagram",
  github: "GitHub",
};

function SocialIcon({ platform }: { platform: CmsSocialLink["platform"] }) {
  switch (platform) {
    case "linkedin":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.91845 17.6H1.10373V5.84938H4.91845V17.6ZM3.00904 4.24649C1.78922 4.24649 0.799805 3.28004 0.799805 2.11323C0.799805 1.55276 1.03256 1.01526 1.44687 0.618949C1.86119 0.222643 2.42311 0 3.00904 0C3.59496 0 4.15689 0.222643 4.5712 0.618949C4.98551 1.01526 5.21827 1.55276 5.21827 2.11323C5.21827 3.28004 4.22845 4.24649 3.00904 4.24649ZM19.1957 17.6H15.3892V11.8799C15.3892 10.5166 15.3604 8.76837 13.4059 8.76837C11.4225 8.76837 11.1186 10.2495 11.1186 11.7817V17.6H7.30798V5.84938H10.9666V7.45227H11.02C11.5293 6.52904 12.7734 5.55473 14.6294 5.55473C18.4901 5.55473 19.1998 7.98657 19.1998 11.1452V17.6H19.1957Z" fill="currentColor" />
        </svg>
      );
    case "x":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="footer-social-x-mask" maskUnits="userSpaceOnUse" x="1" y="1" width="18" height="18">
            <path d="M1 1H19V19H1V1Z" fill="white" />
          </mask>
          <g mask="url(#footer-social-x-mask)">
            <path d="M15.175 1.84326H17.9354L11.9054 8.75269L19 18.1564H13.4457L9.09229 12.4543L4.11657 18.1564H1.35357L7.80271 10.7635L1 1.84455H6.69571L10.6249 7.05555L15.175 1.84326ZM14.2043 16.5004H15.7343L5.86 3.41312H4.21943L14.2043 16.5004Z" fill="currentColor" />
          </g>
        </svg>
      );
    case "youtube":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.2 12.5714L12.871 10L8.2 7.42857V12.5714ZM18.604 5.86C18.721 6.26286 18.802 6.80286 18.856 7.48857C18.919 8.17429 18.946 8.76571 18.946 9.28L19 10C19 11.8771 18.856 13.2571 18.604 14.14C18.379 14.9114 17.857 15.4086 17.047 15.6229C16.624 15.7343 15.85 15.8114 14.662 15.8629C13.492 15.9229 12.421 15.9486 11.431 15.9486L10 16C6.229 16 3.88 15.8629 2.953 15.6229C2.143 15.4086 1.621 14.9114 1.396 14.14C1.279 13.7371 1.198 13.1971 1.144 12.5114C1.081 11.8257 1.054 11.2343 1.054 10.72L1 10C1 8.12286 1.144 6.74286 1.396 5.86C1.621 5.08857 2.143 4.59143 2.953 4.37714C3.376 4.26571 4.15 4.18857 5.338 4.13714C6.508 4.07714 7.579 4.05143 8.569 4.05143L10 4C13.771 4 16.12 4.13714 17.047 4.37714C17.857 4.59143 18.379 5.08857 18.604 5.86Z" fill="currentColor" />
        </svg>
      );
    case "facebook":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 10.049C18 5.603 14.418 2 10 2C5.582 2 2 5.603 2 10.049C2 14.067 4.925 17.396 8.75 18V12.313H6.719V10.049H8.75V8.285C8.75 6.274 9.944 5.16 11.772 5.16C12.648 5.16 13.563 5.318 13.563 5.318V7.292H12.554C11.56 7.292 11.25 7.91 11.25 8.543V10.049H13.469L13.116 12.313H11.25V18C15.075 17.396 18 14.067 18 10.049Z" fill="currentColor" />
        </svg>
      );
    case "instagram":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 2C7.716 2 7.445 2.01 6.545 2.05C5.648 2.091 5.033 2.233 4.494 2.441C3.936 2.655 3.463 2.944 2.992 3.416C2.52 3.887 2.231 4.361 2.017 4.919C1.809 5.457 1.667 6.073 1.626 6.97C1.586 7.87 1.576 8.142 1.576 10.424C1.576 12.707 1.586 12.978 1.626 13.878C1.667 14.776 1.809 15.391 2.017 15.929C2.231 16.487 2.52 16.961 2.992 17.432C3.463 17.904 3.936 18.193 4.494 18.407C5.033 18.615 5.648 18.757 6.545 18.798C7.445 18.838 7.716 18.848 10 18.848C12.284 18.848 12.555 18.838 13.455 18.798C14.352 18.757 14.967 18.615 15.506 18.407C16.064 18.193 16.537 17.904 17.008 17.432C17.48 16.961 17.769 16.487 17.983 15.929C18.191 15.391 18.333 14.776 18.374 13.878C18.414 12.978 18.424 12.707 18.424 10.424C18.424 8.142 18.414 7.87 18.374 6.97C18.333 6.073 18.191 5.457 17.983 4.919C17.769 4.361 17.48 3.887 17.008 3.416C16.537 2.944 16.064 2.655 15.506 2.441C14.967 2.233 14.352 2.091 13.455 2.05C12.555 2.01 12.284 2 10 2ZM10 3.622C12.243 3.622 12.495 3.631 13.385 3.671C14.207 3.707 14.653 3.845 14.951 3.96C15.348 4.113 15.63 4.296 15.927 4.592C16.224 4.889 16.406 5.172 16.559 5.568C16.674 5.866 16.812 6.313 16.848 7.135C16.888 8.025 16.897 8.277 16.897 10.52C16.897 12.763 16.888 13.015 16.848 13.905C16.812 14.727 16.674 15.174 16.559 15.472C16.406 15.868 16.224 16.151 15.927 16.448C15.63 16.744 15.348 16.927 14.951 17.08C14.653 17.195 14.207 17.333 13.385 17.369C12.495 17.409 12.244 17.418 10 17.418C7.756 17.418 7.505 17.409 6.615 17.369C5.793 17.333 5.347 17.195 5.049 17.08C4.652 16.927 4.37 16.744 4.073 16.448C3.776 16.151 3.594 15.868 3.441 15.472C3.326 15.174 3.188 14.727 3.152 13.905C3.112 13.015 3.103 12.763 3.103 10.52C3.103 8.277 3.112 8.025 3.152 7.135C3.188 6.313 3.326 5.866 3.441 5.568C3.594 5.172 3.776 4.889 4.073 4.592C4.37 4.296 4.652 4.113 5.049 3.96C5.347 3.845 5.793 3.707 6.615 3.671C7.505 3.631 7.757 3.622 10 3.622ZM10 6.108C7.617 6.108 5.686 8.039 5.686 10.424C5.686 12.808 7.617 14.739 10 14.739C12.383 14.739 14.314 12.808 14.314 10.424C14.314 8.039 12.383 6.108 10 6.108ZM10 13.117C8.512 13.117 7.307 11.912 7.307 10.424C7.307 8.935 8.512 7.73 10 7.73C11.488 7.73 12.693 8.935 12.693 10.424C12.693 11.912 11.488 13.117 10 13.117ZM15.846 5.924C15.846 6.521 15.361 7.005 14.764 7.005C14.168 7.005 13.683 6.521 13.683 5.924C13.683 5.327 14.168 4.843 14.764 4.843C15.361 4.843 15.846 5.327 15.846 5.924Z" fill="currentColor" />
        </svg>
      );
    case "github":
      return (
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M10 2C5.582 2 2 5.678 2 10.207C2 13.836 4.292 16.912 7.47 17.985C7.87 18.06 8.017 17.81 8.017 17.596C8.017 17.403 8.01 16.84 8.006 16.094C5.782 16.583 5.312 15.026 5.312 15.026C4.948 14.088 4.423 13.839 4.423 13.839C3.697 13.336 4.477 13.346 4.477 13.346C5.28 13.403 5.702 14.185 5.702 14.185C6.416 15.426 7.576 15.066 8.031 14.857C8.103 14.333 8.311 13.974 8.54 13.771C6.764 13.565 4.896 12.873 4.896 9.789C4.896 8.904 5.208 8.18 5.718 7.614C5.637 7.409 5.362 6.583 5.795 5.464C5.795 5.464 6.468 5.245 7.997 6.296C8.635 6.116 9.32 6.027 10 6.023C10.68 6.027 11.365 6.116 12.004 6.296C13.532 5.245 14.204 5.464 14.204 5.464C14.638 6.583 14.363 7.409 14.282 7.614C14.793 8.18 15.103 8.904 15.103 9.789C15.103 12.881 13.232 13.563 11.45 13.764C11.738 14.015 11.995 14.511 11.995 15.272C11.995 16.363 11.986 17.246 11.986 17.596C11.986 17.812 12.131 18.064 12.538 17.984C15.71 16.908 18 13.834 18 10.207C18 5.678 14.418 2 10 2Z" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

// ── Layer 2: Component RSC Cache ──────────────────────────────────────────────
// "use cache" on the component caches the fully rendered RSC payload.
// Footer has no varying props so there is exactly ONE cache entry for the whole
// site. Invalidated by cacheTag('settings') when the Sanity webhook fires.
export default async function Footer() {
  "use cache";
  cacheTag('settings');
  cacheLife({ revalidate: 3600 });

  const data = await getFooterData();
  const footerNote = data.footerNote?.trim() || "";
  const copyright = data.copyright?.trim() || "";
  const socialLinks = data.socialLinks ?? [];
  const navGroups = (data.footerMenu ?? []).map((group) => ({
    title: group.menuTitle?.trim() || "",
    items: (group.navItems ?? []).map((item) => ({
      title: item.title,
      href: item._type ? getSlugUrl(item._type, item.slug ?? undefined) : "#",
    })),
  }));
  const legalLinks = (data.legalNav ?? []).map((item) => ({
    title: item.title,
    href: item._type ? getSlugUrl(item._type, item.slug ?? undefined) : "#",
  }));

  return (
    <footer
      className="relative md:overflow-visible overflow-hidden bg-linear-to-b from-[#162A4A] via-[#234a7a] to-[#3463B0] py-24 ftr_bg"
      aria-labelledby="footer-heading"
    >
      <div className="relative z-30 mx-auto max-w-315 px-4">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>

        <div className="flex flex-col justify-between gap-8 border-b border-white/20 pb-20 lg:flex-row lg:gap-4">
          <div className="flex w-full flex-1 flex-col gap-8 lg:w-[40%]">
            <Link href="/" aria-label="FieldEquip home">
            <img
              src="/images/logo-white.svg"
              alt="FieldEquip Logo"
              width={187}
              height={35}
              decoding="async"
              loading="lazy"
              className="block max-w-[187px] h-auto"
            />
          </Link>
            {footerNote && (
              <p className="max-w-sm text-sm font-normal leading-[140%] text-white">{footerNote}</p>
            )}
            {socialLinks.length > 0 && (
              <nav aria-label="Social links">
                <ul className="flex flex-row gap-6">
                  {socialLinks.map((social) => (
                    <li key={social.platform}>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-label={`FieldEquip on ${PLATFORM_LABELS[social.platform] ?? social.platform} (opens in a new tab)`}
                        className={socialLinkClass}
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {navGroups.length > 0 && (
            <nav
              aria-label="Footer navigation"
              className="grid w-full flex-1 gap-8 sm:grid-cols-2 md:flex md:flex-row lg:w-[60%]"
            >
              {navGroups.map((group) => (
                <div key={group.title} className="flex flex-col gap-4">
                  <h3 className={sectionTitleClass}>{group.title}</h3>
                  <ul className="flex flex-col gap-2">
                    {group.items.map((item) => (
                      <li key={item.title}>
                        <Link prefetch={false} href={item.href} className={footerLinkClass}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 py-4 md:flex-row md:justify-between">
          {copyright && <p className="text-sm leading-[140%] text-white">{copyright}</p>}
          {legalLinks.length > 0 && (
            <nav aria-label="Legal links" className="flex flex-col items-center gap-4 sm:flex-row lg:gap-8">
              {legalLinks.map((item, index) => (
                <Fragment key={item.title}>
                  {index > 0 && (
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-white opacity-20 sm:block" />
                  )}
                  <Link prefetch={false} href={item.href} className={footerLinkClass}>
                    {item.title}
                  </Link>
                </Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
