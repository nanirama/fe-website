"use client";

import Link from "next/link";
import { memo, useCallback, useState } from "react";

import { getSlugUrl } from "@/src/lib/utils";
import type { CmsProductNavItem, MenuItem } from "./menu-types";

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

function toMenuItems(cmsItems: CmsProductNavItem[] | null | undefined): MenuItem[] {
  if (!cmsItems?.length) return [];
  return cmsItems.map((cat) => ({
    title: cat.title,
    href: cat._type ? getSlugUrl(cat._type, cat.slug ?? undefined) : undefined,
    children: cat.featuresNav?.map((f) => ({
      title: f.title,
      href: f._type ? getSlugUrl(f._type, f.slug ?? undefined) : undefined,
    })),
  }));
}

function MenuSection({
  section,
  isOpen,
  onToggle,
}: {
  section: MenuItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const panelId = `products-section-${section.title.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <li className="py-3">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="inline-flex w-full items-center justify-between gap-2 rounded-md text-left text-[2rem] font-semibold leading-tight text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
      >
        <span className="text-[16px] font-bold text-[#020210] leading-tight mb-3">{section.title}</span>
        <ChevronRightIcon
          className={["h-4 w-4 shrink-0 text-teal-500 transition-transform", isOpen ? "rotate-90" : ""].join(" ")}
        />
      </button>

      <div
        id={panelId}
        className={["grid transition-all duration-200", isOpen ? "mt-5 grid-rows-[1fr]" : "grid-rows-[0fr]"].join(" ")}
      >
        <div className="overflow-hidden">
          <ul className="space-y-3" role="menu">
            {section.children?.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href ?? "#"}
                  role="menuitem"
                  className="inline-flex items-center gap-2 text-[16px] font-normal text-[#020210] leading-tight transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {item.title}
                  <ChevronRightIcon className="h-4 w-4 text-teal-500" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={section.href ?? "#"}
            className="mt-7 inline-flex items-center gap-2 text-[16px] font-normal text-[#020210] leading-[130%] transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
          >
            Explore More Features
            <ChevronRightIcon className="h-4 w-4 text-teal-500" />
          </Link>
        </div>
      </div>
    </li>
  );
}

type ProductsMenuMobileProps = {
  className?: string;
  menuTitle?: string | null;
  menuDescription?: string | null;
  items?: CmsProductNavItem[] | null;
};

function ProductsMenuMobileComponent({ className = "", menuTitle, menuDescription, items }: ProductsMenuMobileProps) {
  const menuItems = toMenuItems(items);
  const title = menuTitle?.trim() || "Products";
  const description = menuDescription?.trim() || "Explore all of our products that can help your growth";

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSections, setOpenSections] = useState<string[]>(() => menuItems.map((item) => item.title));

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const toggleSection = useCallback((sectionTitle: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionTitle) ? prev.filter((item) => item !== sectionTitle) : [...prev, sectionTitle],
    );
  }, []);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="products-mobile-drawer"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-black"
      >
        Products
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
          id="products-mobile-drawer"
          aria-label="Products menu"
          className="max-h-dvh overflow-y-auto overscroll-contain px-6 pb-8 pt-6"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
              <div>
              <Link href="/"><img src="/images/tinylogo.svg" alt="logo" width={41} height={35} loading="lazy" decoding="async" className="h-auto"/></Link>
              <p className="text-[32px] font-semibold leading-tight text-[#020210] pt-3">{title}</p>
              <p className="mt-3 max-w-[24ch] text-[16px] leading-[1.35] text-[#020210]">{description}</p>
            </div>

            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close products menu"
              className="rounded-md p-2 text-slate-900 transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="h-px w-full bg-slate-300" aria-hidden="true" />

          <ul className="mt-3 divide-y divide-slate-200">
            {menuItems.map((section) => (
              <MenuSection
                key={section.title}
                section={section}
                isOpen={openSections.includes(section.title)}
                onToggle={() => toggleSection(section.title)}
              />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

const ProductsMenuMobile = memo(ProductsMenuMobileComponent);
ProductsMenuMobile.displayName = "ProductsMenuMobile";

export default ProductsMenuMobile;
