"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useCallback, useState } from "react";

import { urlForImage } from "@/src/sanity/lib/utils";
import { getSlugUrl } from "@/src/lib/utils";
import type { CmsIndustriesNavItem } from "./menu-types";

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 12 12"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 2.5L8 6L4.5 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 16 16"
      className="h-5 w-5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

type IndustriesMenuMobileProps = {
  className?: string;
  menuTitle?: string | null;
  menuDescription?: string | null;
  industries: CmsIndustriesNavItem[];
};

function IndustriesMenuMobileComponent({ className = "", menuTitle, menuDescription, industries }: IndustriesMenuMobileProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const title = menuTitle?.trim() || "Industries";
  const description = menuDescription?.trim() || "Explore all of our industries that can leverage our product";

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="industries-mobile-drawer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-black transition-colors"
      >
        Industries
        <ChevronRightIcon
          className={[
            "inline-block h-4 w-4 shrink-0 text-teal-500 transition-transform duration-200",
            isMenuOpen ? "rotate-90" : "rotate-0",
          ].join(" ")}
        />
      </button>

      <div
        className={[
          "fixed inset-x-0 top-0 z-50 max-h-dvh overflow-hidden bg-white transition-opacity duration-200",
          isMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        aria-hidden={!isMenuOpen}
      >
        <nav
          id="industries-mobile-drawer"
          aria-label="Industries menu"
          className="max-h-dvh overflow-y-auto overscroll-contain px-6 pb-8 pt-6"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
              <div>
              <Link href="/"><img src="/images/tinylogo.svg" alt="logo" width={41} height={35} loading="lazy" decoding="async" className="h-auto"/></Link>
              <p className="text-[32px] font-semibold leading-tight text-[#020210] pt-3">{title}</p>
              <p className="mt-3 max-w-[24ch] text-[16px] leading-[130%] text-[#020210]">{description}</p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close industries menu"
              className="rounded-md p-2 text-slate-900 transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="h-px w-full bg-slate-300" aria-hidden="true" />

          <ul className="mt-5 space-y-6">
            {industries.map((item) => {
              const imgSrc = item.image ? urlForImage(item.image)?.width(700).height(340).url() : undefined;
              const href = item._type ? getSlugUrl(item._type, item.slug ?? undefined) : "#";
              return (
                <li key={href}>
                  <Link
                    href={href}
                    role="menuitem"
                    onClick={closeMenu}
                    className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                  >
                    {imgSrc && (
                      <div className="overflow-hidden rounded-xl">
                        <Image
                          src={imgSrc}
                          alt={item.title}
                          width={700}
                          height={340}
                          className="h-32.5 w-full object-cover"
                        />
                      </div>
                    )}
                    <p className="mt-3 inline-flex items-center gap-2 text-[24px] py-2 font-semibold leading-tight text-[#020210] transition-colors hover:text-teal-600">
                      {item.title}
                      <ChevronRightIcon className="h-4 w-4 text-teal-500" />
                    </p>
                    {item.description && (
                      <p className="mt-1 text-[16px] leading-[1.35] text-[#020210]/70">{item.description}</p>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

const IndustriesMenuMobile = memo(IndustriesMenuMobileComponent);
IndustriesMenuMobile.displayName = "IndustriesMenuMobile";

export default IndustriesMenuMobile;
