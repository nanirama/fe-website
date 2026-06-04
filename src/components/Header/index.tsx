import { cache } from 'react';
import { cacheTag, cacheLife } from 'next/cache';
import { client } from "@/src/sanity/lib/client";
import { headerQuery } from "@/src/sanity/lib/queries";
import HeaderClient from "./HeaderClient";
import type { SettingsMenuData } from "./menu-types";

// ── Layer 1: Remote Data Cache ────────────────────────────────────────────────
// "use cache: remote" — Sanity nav data is shared across ALL users (not
// user-specific), fetched from a remote CMS. Cached in the Next.js Data Cache
// and invalidated on-demand by revalidateTag('settings') from the webhook.
async function fetchHeaderSettings(): Promise<SettingsMenuData> {
  'use cache: remote';
  cacheTag('settings');
  cacheLife({ revalidate: 3600 });
  const data = await client.fetch<SettingsMenuData | null>(headerQuery);
  return data ?? ({} as SettingsMenuData);
}

// React Request Memoization: if anything else in the same render tree calls
// getHeaderSettings(), Sanity is hit exactly once (Data Cache lookup is shared).
const getHeaderSettings = cache(fetchHeaderSettings);

// ── Layer 2: Component RSC Cache ──────────────────────────────────────────────
// "use cache" on the component caches the fully rendered RSC payload, keyed by
// the {layout} prop. There are exactly two cache entries: "dark" and "light".
// Invalidated together with the data cache via cacheTag('settings').
export interface HeaderProps {
  layout?: "dark" | "light";
}

export default async function Header({ layout }: HeaderProps) {
  "use cache";
  cacheTag('settings');
  cacheLife({ revalidate: 3600 });
  const settings = await getHeaderSettings();
  return <HeaderClient layout={layout} settings={settings} />;
}
