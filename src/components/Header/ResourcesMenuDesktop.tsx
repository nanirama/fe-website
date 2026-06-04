import { memo } from "react";
import Link from "next/link";

import { getSlugUrl } from "@/src/lib/utils";
import type { CmsSimpleNavItem } from "./menu-types";

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

type ResourcesMenuDesktopProps = {
  buttonClassName?: string;
  layout?: "dark" | "light";
  menuTitle?: string | null;
  menuDescription?: string | null;
  items?: CmsSimpleNavItem[] | null;
};

function ResourcesMenuDesktopComponent({
  buttonClassName = "",
  layout = "light",
  menuTitle,
  menuDescription,
  items,
}: ResourcesMenuDesktopProps) {
  const isDark = layout === "dark";
  const menuItems = items?.length ? items : [];
  const title = menuTitle?.trim() || "Resources";
  const description = menuDescription?.trim() || "Get the Insights, tools, and learning materials";

  return (
    <li className="group/resources relative list-none">
      <button
        type="button"
        aria-haspopup="true"
        className={[
          "inline-flex items-center gap-1 rounded-md px-2 py-6 text-sm font-medium",
          isDark ? "text-white" : "text-slate-800",
          "transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-teal-500 focus-visible:ring-offset-2",
          isDark ? "focus-visible:ring-offset-transparent" : "focus-visible:ring-offset-white",
          buttonClassName,
        ].join(" ")}
      >
        Resources
        <ChevronRightIcon className="h-3 w-3 rotate-90 text-teal-500 transition-transform duration-200 group-hover/resources:-rotate-90 group-focus-within/resources:-rotate-90" />
      </button>

      <div
        aria-label="Resources"
        className={[
          "pointer-events-none invisible fixed left-1/2 top-20 z-50 w-[calc(100vw-2rem)] max-w-7xl",
          "-translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/10",
          "opacity-0 transition duration-200 ease-out",
          "group-hover/resources:pointer-events-auto group-hover/resources:visible group-hover/resources:opacity-100",
          "group-focus-within/resources:pointer-events-auto group-focus-within/resources:visible group-focus-within/resources:opacity-100",
        ].join(" ")}
      >
        <div className="grid grid-cols-[230px_1fr] gap-6 items-end">
          <div className="border-r border-[#8B9DBA]/50 pr-6 h-full flex flex-col justify-end">
            <Link href="/"><img src="/images/tinylogo.svg" alt="logo" width={41} height={35} loading="lazy" decoding="async" className="h-auto"/></Link>
            <p className="text-[32px] font-semibold leading-tight text-[#020210] pt-3">{title}</p>
            <p className="mt-3 text-base leading-[130%] text-[#020210]">{description}</p>
          </div>

          <ul className="grid grid-cols-2 gap-x-12 gap-y-8" role="none">
            {menuItems.map((item) => {
              const href = item._type ? getSlugUrl(item._type, item.slug ?? undefined) : "#";
              return (
              <li key={item.title} className="min-w-0">
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 text-lg font-bold leading-tight text-[#020210] transition-colors hover:text-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2"
                >
                  {item.title}
                  <ChevronRightIcon className="h-3 w-3 text-teal-500" />
                </Link>
                {item.description && (
                  <p className="mt-1.5 text-base leading-[130%] text-[#020210]/70 max-w-md">{item.description}</p>
                )}
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </li>
  );
}

const ResourcesMenuDesktop = memo(ResourcesMenuDesktopComponent);
ResourcesMenuDesktop.displayName = "ResourcesMenuDesktop";
export default ResourcesMenuDesktop;
