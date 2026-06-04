'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import { urlForImage } from '@/src/sanity/lib/utils'

type SanityImage = {
  asset?: { _ref?: string }
  alt?: string
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface AccordionItem {
  _key?: string
  title: string
  description?: PortableTextBlock[]
  link?: { label?: string; url?: string }
}

interface PlatformTab {
  _key?: string
  label: string
  image?: SanityImage & { alt?: string }
  items?: AccordionItem[]
}

interface PlatformDeepDiveSectionProps {
  data?: {
    heading?: string
    subheading?: string
    tabs?: PlatformTab[]
  }
}

// ─── PortableText ─────────────────────────────────────────────────────────────

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-relaxed text-white/70 sm:text-base">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-2 space-y-1.5 text-sm text-white/70 sm:text-base">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-center gap-2">
        <span className="size-1 shrink-0 rounded-full bg-white/70" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = value?.href || '#'
      const isExternal = href.startsWith('http')
      return (
        <Link
          href={href}
          target={isExternal ? '_blank' : '_self'}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
}

// ─── Accordion Row ────────────────────────────────────────────────────────────

function AccordionRow({
  item,
  isOpen,
  onToggle,
}: {
  item: AccordionItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-slate-700/60 last:border-0">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        <span
          className={`text-base font-bold transition-colors sm:text-lg ${
            isOpen ? 'text-white' : 'text-slate-300'
          }`}
        >
          {item.title}
        </span>
        <span
          className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className={`size-5 ${isOpen ? 'text-teal-400' : 'text-slate-500'}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.81104 8.28966L11.0564 14.5348C11.1818 14.6601 11.3306 14.7596 11.4944 14.8274C11.6582 14.8953 11.8337 14.9302 12.011 14.9302C12.1883 14.9302 12.3639 14.8953 12.5277 14.8274C12.6915 14.7596 12.8403 14.6601 12.9656 14.5348L19.211 8.28936"
              stroke="#13A89E"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-3 pb-5">
            {item.description?.length ? (
              <PortableText value={item.description} components={ptComponents} />
            ) : null}
            {item.link?.label && (
              <Link
                href={item.link.url ?? '#'}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-400 underline-offset-2 transition-colors hover:text-teal-300 hover:underline"
              >
                {item.link.label}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="size-3.5"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlatformDeepDiveSection({ data }: PlatformDeepDiveSectionProps) {
  const heading = data?.heading ?? ''
  const subheading = data?.subheading
  const tabs = data?.tabs?.filter((t) => t?.label && (t.items?.length ?? 0) > 0) ?? []

  const firstKey = tabs[0]?._key ?? tabs[0]?.label ?? ''
  const [activeTab, setActiveTab] = useState(firstKey)
  const [openItems, setOpenItems] = useState<Record<string, string>>({})

  if (!tabs.length) return null

  const toggleItem = (tabKey: string, itemKey: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [tabKey]: prev[tabKey] === itemKey ? '' : itemKey,
    }))
  }

  return (
    <section id="features" className="bg-brand py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 border-b border-white/20 pb-10">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 text-center">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-white sm:text-[42px] leading-[110%]">
            {heading}
          </h2>
          {subheading && (
            <p className="mx-auto mt-4 max-w-3xl text-base text-slate-400 sm:text-lg mb-6">
              {subheading}
            </p>
          )}
        </div>

        {/* ── Tab Nav ─────────────────────────────────────────────────────── */}
        <div
          role="tablist"
          aria-label="Platform features"
          className="mb-16 flex flex-wrap items-center gap-2 rounded-full bg-white/10 py-2 px-2 sm:flex-nowrap sm:overflow-x-auto max-w-5xl mx-auto"
        >
          {tabs.map((tab) => {
            const key = tab._key ?? tab.label
            const isActive = activeTab === key
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                aria-controls={`tabpanel-${key}`}
                id={`tab-${key}`}
                onClick={() => setActiveTab(key)}
                className={[
                  'flex-1 cursor-pointer whitespace-nowrap px-4 py-2.5 text-center text-sm font-medium outline-none transition-all sm:text-base',
                  isActive
                    ? 'rounded-full bg-teal-500 text-white shadow-md shadow-teal-900/40'
                    : 'rounded-xl text-slate-400 hover:text-white',
                ].join(' ')}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── Tab Panels — only active panel is mounted ───────────────────── */}
        {tabs.map((tab) => {
          const tabKey = tab._key ?? tab.label
          if (activeTab !== tabKey) return null

          const image = tab.image
          const imageUrl =
            (image &&
              urlForImage(image)
                ?.width(632)
                ?.height(478)
                ?.format('webp')
                ?.fit('crop')
                ?.quality(80)
                ?.url()) || '/images/placeholder.png'

          const blurImageUrl =
            image &&
            urlForImage(image)
              ?.height(9)
              ?.width(22)
              ?.blur(20)
              ?.format('webp')
              ?.fit('crop')
              ?.url()

          const imageAlt = image?.alt ?? tab.label
          const defaultOpenKey = tab.items?.[0]?._key ?? 'item-0'
          const activeKey = openItems[tabKey] ?? defaultOpenKey

          return (
            <div
              key={tabKey}
              id={`tabpanel-${tabKey}`}
              role="tabpanel"
              aria-labelledby={`tab-${tabKey}`}
            >
              <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">

                {/* Left: Accordion */}
                <div className="flex flex-col divide-y divide-slate-700/60 rounded-2xl py-2 px-4">
                  {(tab.items ?? []).map((item, idx) => {
                    const itemKey = item._key ?? `item-${idx}`
                    return (
                      <AccordionRow
                        key={itemKey}
                        item={item}
                        isOpen={activeKey === itemKey}
                        onToggle={() => toggleItem(tabKey, itemKey)}
                      />
                    )
                  })}
                </div>

                {/* Right: Screenshot */}
                <div className="relative order-first lg:order-last">
                  <div className="relative overflow-hidden rounded-2xl border border-slate-700/60 shadow-2xl shadow-slate-950/60">
                    {/* Browser chrome bar */}
                    <div className="flex items-center gap-1.5 border-b border-slate-700/60 bg-slate-800 px-4 py-2.5">
                      <span className="size-2.5 rounded-full bg-red-500/70" />
                      <span className="size-2.5 rounded-full bg-yellow-500/70" />
                      <span className="size-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <Image
                      src={imageUrl}
                      alt={imageAlt}
                      width={632}
                      height={478}
                      placeholder={blurImageUrl ? 'blur' : 'empty'}
                      blurDataURL={blurImageUrl || undefined}
                      className="h-auto w-full object-cover"
                      quality={80}
                      sizes="(max-width: 1024px) 100vw, 632px"
                    />
                  </div>
                </div>

              </div>
            </div>
          )
        })}

      </div>
    </section>
  )
}
