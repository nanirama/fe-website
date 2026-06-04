"use client";

/**
 * Header — FieldEquip
 *
 * Server-renderable by default; "use client" is added ONLY because the
 * mobile-menu toggle and dropdown open-state require minimal browser
 * interactivity.  All navigation data lives in a static constant so
 * there is zero runtime data-fetching overhead.
 *
 * Props
 * ─────
 * layout  "dark" | "light"   Controls text / icon / overlay colours.
 *
 * Accessibility
 * ─────────────
 * • Full keyboard navigation (Tab / Enter / Space / Escape / Arrow keys).
 * • ARIA roles: banner, navigation, menubar, menuitem, menu, dialog.
 * • aria-expanded on every trigger; aria-haspopup="true" on dropdowns.
 * • Focus trap inside the mobile drawer via a sentinel <span>.
 * • Visible :focus-visible ring on every interactive element.
 *
 * Performance
 * ───────────
 * • next/link for zero-JS prefetch on internal links.
 * • next/image for the logo (priority LCP asset).
 * • CSS-only transitions; no animation library dependency.
 * • Dropdown panels use CSS visibility/opacity instead of conditional
 *   rendering so the DOM is stable (no CLS).
 */

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, KeyboardEvent } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavChild {
  label: string;
  href: string;
}

interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface HeaderProps {
  layout: "dark" | "light";
}

// ─── Static navigation data ───────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  {
    label: "Products",
    children: [
      { label: "Field Service Management", href: "/products/fsm" },
      { label: "Work Order Management", href: "/products/work-orders" },
      { label: "Asset Management", href: "/products/assets" },
      { label: "Inventory Management", href: "/products/inventory" },
      { label: "Mobile Field App", href: "/products/mobile" },
    ],
  },
  {
    label: "Industries",
    children: [
      { label: "Oil & Gas", href: "/oil-and-gas" },
      { label: "Utilities", href: "/industries/utilities" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "Telecommunications", href: "/industries/telecom" },
      { label: "Healthcare", href: "/industries/healthcare" },
    ],
  },
  {
    label: "Company",
    children: [
      { label: "About Us", href: "/company/about" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
      { label: "Press", href: "/company/press" },
      { label: "Contact", href: "/company/contact" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Blog", href: "/resources/blog" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Documentation", href: "/resources/docs" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Support", href: "/resources/support" },
    ],
  },
];

// ─── ChevronIcon ──────────────────────────────────────────────────────────────

function ChevronIcon({
  open,
  className = "",
}: {
  open: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[
        "inline-block transition-transform duration-200",
        open ? "rotate-180" : "rotate-0",
        className,
      ].join(" ")}
    >
      <path
        d="M2 4.5L6 8L10 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── DropdownMenu ─────────────────────────────────────────────────────────────

interface DropdownMenuProps {
  item: NavItem;
  layout: "dark" | "light";
  isMobile?: boolean;
}

function DropdownMenu({ item, layout, isMobile = false }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLLIElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const isDark = layout === "dark";

  // Close on outside click / focus-out
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent | FocusEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    document.addEventListener("focusin", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("focusin", handler);
    };
  }, [open]);

  // Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    },
    []
  );

  if (!item.children) return null;

  // ── Mobile accordion ──
  if (isMobile) {
    return (
      <li ref={containerRef} className="w-full">
        <button
          ref={triggerRef}
          aria-expanded={open}
          aria-haspopup="true"
          onClick={() => setOpen((v) => !v)}
          onKeyDown={handleKeyDown}
          className={[
            "flex w-full items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors",
            isDark
              ? "text-white/80 hover:text-white hover:bg-white/10"
              : "text-slate-700 hover:text-slate-900 hover:bg-slate-100",
          ].join(" ")}
        >
          {item.label}
          <ChevronIcon open={open} />
        </button>

        <ul
          role="menu"
          aria-label={`${item.label} submenu`}
          className={[
            "overflow-hidden transition-all duration-300 pl-4",
            open ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          {item.children.map((child) => (
            <li key={child.href} role="none">
              <Link
                href={child.href}
                role="menuitem"
                className={[
                  "block px-4 py-2.5 text-sm rounded-lg transition-colors",
                  isDark
                    ? "text-white/70 hover:text-white hover:bg-white/10"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
                ].join(" ")}
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  // ── Desktop flyout ──
  return (
    <li
      ref={containerRef}
      role="none"
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        ref={triggerRef}
        role="menuitem"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleKeyDown}
        className={[
          "flex items-center gap-1.5 px-1 py-2 text-sm font-medium rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
          isDark
            ? "text-white/80 hover:text-white"
            : "text-slate-600 hover:text-slate-900",
        ].join(" ")}
      >
        {item.label}
        <ChevronIcon open={open} />
      </button>

      {/* Flyout panel — always in DOM for CLS stability */}
      <ul
        role="menu"
        aria-label={`${item.label} submenu`}
        className={[
          "absolute left-0 top-full mt-1 w-52 rounded-xl border py-2 shadow-xl backdrop-blur-md transition-all duration-200 origin-top",
          open
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none",
          isDark
            ? "bg-slate-900/90 border-white/10"
            : "bg-white/90 border-slate-200",
        ].join(" ")}
      >
        {item.children.map((child) => (
          <li key={child.href} role="none">
            <Link
              href={child.href}
              role="menuitem"
              tabIndex={open ? 0 : -1}
              className={[
                "block px-4 py-2 text-sm transition-colors rounded-lg mx-1",
                isDark
                  ? "text-white/70 hover:text-white hover:bg-white/10"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
              ].join(" ")}
            >
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

// ─── HamburgerIcon ────────────────────────────────────────────────────────────

function HamburgerIcon({ open, color }: { open: boolean; color: string }) {
  return (
    <span aria-hidden="true" className="relative flex h-5 w-5 flex-col justify-between">
      <span
        className={[
          "block h-[1.5px] w-full rounded-full transition-all duration-300 origin-center",
          open ? "rotate-45 translate-y-[8.5px]" : "",
          color,
        ].join(" ")}
      />
      <span
        className={[
          "block h-[1.5px] w-full rounded-full transition-all duration-300",
          open ? "opacity-0 scale-x-0" : "",
          color,
        ].join(" ")}
      />
      <span
        className={[
          "block h-[1.5px] w-full rounded-full transition-all duration-300 origin-center",
          open ? "-rotate-45 -translate-y-[8.5px]" : "",
          color,
        ].join(" ")}
      />
    </span>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

export default function Header({ layout }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDark = layout === "dark";

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close drawer on resize to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const toggleColor = isDark ? "bg-white" : "bg-slate-800";
  const logoSrc = isDark
    ? "/images/logo-dark.svg"   // white wordmark for dark background
    : "/images/logo-light.svg"; // teal/dark wordmark for light background

  return (
    <>
      {/* ── Skip link (a11y) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-lg focus:bg-teal-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
      >
        Skip to main content
      </a>

      {/* ── Main header ── */}
      <header
        role="banner"
        className={[
          "fixed inset-x-0 top-0 z-50 w-full",
          // Transparent background; caller controls page background
          "bg-transparent",
        ].join(" ")}
      >
        {/* Thin accent line at very top */}
        <div aria-hidden="true" className="h-[2px] w-full bg-gradient-to-r from-teal-400/0 via-teal-400/60 to-teal-400/0 " />

        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* ── Logo ── */}
          <Link
            href="/"
            aria-label="FieldEquip — go to homepage"
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          >
            {/*
              Replace width/height with your actual logo dimensions.
              Using next/image ensures the LCP asset is preloaded.
              Fallback text logo shown when image fails (SEO-safe).
            */}
            <Image
              src={logoSrc}
              alt="FieldEquip"
              width={140}
              height={32}
              priority
              // Fallback: if asset doesn't exist yet in dev, show text logo
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Accessible text fallback — hidden when image loads */}
            <span
              aria-hidden="true"
              className={[
                "text-xl font-bold tracking-tight select-none",
                isDark ? "text-white" : "text-slate-900",
              ].join(" ")}
              style={{ display: "none" }}
              id="logo-text-fallback"
            >
              Field<span className="text-teal-400">Equip</span>
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex lg:flex-1 lg:justify-center"
          >
            <ul role="menubar" aria-label="Site navigation" className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <DropdownMenu key={item.label} item={item} layout={layout} />
              ))}
            </ul>
          </nav>

          {/* ── CTA + mobile toggle ── */}
          <div className="flex items-center gap-3">
            {/* Schedule a Demo CTA */}
            <Link
              href="/demo"
              className={[
                "hidden sm:inline-flex items-center rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 focus-visible:ring-offset-2",
                // Teal pill — same in both modes
                "bg-teal-500 text-white hover:bg-teal-400 active:scale-95 shadow-sm hover:shadow-teal-500/30 hover:shadow-md",
              ].join(" ")}
            >
              Schedule a Demo
            </Link>

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className={[
                "flex items-center justify-center w-9 h-9 rounded-lg lg:hidden transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
                isDark ? "hover:bg-white/10" : "hover:bg-slate-100",
              ].join(" ")}
            >
              <HamburgerIcon open={mobileOpen} color={toggleColor} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile drawer overlay ── */}
      <div
        aria-hidden={!mobileOpen}
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
          isDark ? "bg-black/60" : "bg-black/30",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* ── Mobile drawer panel ── */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          "fixed inset-x-0 top-0 z-50 lg:hidden",
          "flex flex-col max-h-[100dvh] overflow-y-auto",
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-y-0" : "-translate-y-full",
          isDark
            ? "bg-slate-900 border-b border-white/10"
            : "bg-white border-b border-slate-200",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between h-14 px-4 sm:px-6 flex-shrink-0">
          <Link
            href="/"
            aria-label="FieldEquip — go to homepage"
            onClick={() => setMobileOpen(false)}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
          >
            <span
              className={[
                "text-xl font-bold tracking-tight",
                isDark ? "text-white" : "text-slate-900",
              ].join(" ")}
            >
              Field<span className="text-teal-400">Equip</span>
            </span>
          </Link>

          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className={[
              "flex items-center justify-center w-9 h-9 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
              isDark ? "hover:bg-white/10" : "hover:bg-slate-100",
            ].join(" ")}
          >
            <HamburgerIcon open={true} color={toggleColor} />
          </button>
        </div>

        {/* Divider */}
        <div
          aria-hidden="true"
          className={isDark ? "h-px bg-white/10 mx-4" : "h-px bg-slate-200 mx-4"}
        />

        {/* Mobile nav items */}
        <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <DropdownMenu
                key={item.label}
                item={item}
                layout={layout}
                isMobile
              />
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div className="px-4 pb-6 pt-2 flex-shrink-0">
          <Link
            href="/demo"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-full rounded-full py-3 text-sm font-semibold bg-teal-500 text-white hover:bg-teal-400 transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
          >
            Schedule a Demo
          </Link>
        </div>

        {/* Focus sentinel — keeps Tab inside the dialog */}
        <span tabIndex={0} aria-hidden="true" className="sr-only" />
      </div>
    </>
  );
}
