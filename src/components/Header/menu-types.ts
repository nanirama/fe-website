import type { SanityImage } from "@/src/types/sanity-image";

export type MenuItem = {
  title: string;
  href?: string;
  children?: MenuItem[];
};

export type IndustryMenuItem = {
  title: string;
  href: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

// Kept for any legacy usage
export type SanityIndustryMenuItem = {
  title: string;
  slug: string;
  shortDescription?: string | null;
  image?: SanityImage | null;
};

// CMS-driven types from the settings document

export type CmsProductNavItem = {
  title: string;
  _type?: string | null;
  slug?: string | null;
  featuresNav?: Array<{ title: string; _type?: string | null; slug?: string | null }> | null;
};

export type CmsIndustriesNavItem = {
  title: string;
  description?: string | null;
  _type?: string | null;
  slug?: string | null;
  image?: SanityImage | null;
};

export type CmsSimpleNavItem = {
  title: string;
  description?: string | null;
  _type?: string | null;
  slug?: string | null;
};

export type CmsFooterNavItem = {
  title: string;
  _type?: string | null;
  slug?: string | null;
};

export type CmsFooterMenuGroup = {
  menuTitle: string;
  navItems?: CmsFooterNavItem[] | null;
};

export type CmsSocialLink = {
  platform: "linkedin" | "x" | "youtube" | "facebook" | "instagram" | "github";
  url: string;
};

export type SettingsMenuData = {
  productsTitle?: string | null;
  productsDescription?: string | null;
  productNav?: CmsProductNavItem[] | null;
  industriesTitle?: string | null;
  industriesDescription?: string | null;
  industriesNav?: CmsIndustriesNavItem[] | null;
  companyTitle?: string | null;
  companyDescription?: string | null;
  companyNav?: CmsSimpleNavItem[] | null;
  resourcesTitle?: string | null;
  resourcesDescription?: string | null;
  resourcesNav?: CmsSimpleNavItem[] | null;
  footerNote?: string | null;
  socialLinks?: CmsSocialLink[] | null;
  copyright?: string | null;
  footerMenu?: CmsFooterMenuGroup[] | null;
  legalNav?: CmsFooterNavItem[] | null;
};
