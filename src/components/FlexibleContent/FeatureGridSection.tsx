// components/sections/FeatureGridSection.tsx
'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { getSlugUrl } from '@/src/lib/utils'



// ─── Types ────────────────────────────────────────────────────────────────────

interface FeatureLink {
  label?: string
  url?: string | {
    _type?: string
    slug?: string
  }
}

interface FeatureItem {
  _key?: string
  eyebrow?: string
  icon?: { url: string; alt?: string }
  title: string
  description?: PortableTextBlock[]
  link?: FeatureLink
}

interface Footnote {
  text?: string
  linkLabel?: string
  linkUrl?: string
}

interface FeatureGridSectionProps {
  data?: {
    eyebrow?: string
    heading?: string
    subHeading?: string
    headingAlignment?: 'left' | 'center'
    items?: FeatureItem[]
    footnote?: Footnote
    theme?: 'light' | 'dark' | 'gray'
  }
}

// ─── PortableText ─────────────────────────────────────────────────────────────

const descComponents = (isDarkTheme: boolean): PortableTextComponents => ({
  block: {
    normal: ({ children }) => (
      <p className={`text-sm leading-relaxed sm:text-base ${isDarkTheme ? 'text-slate-300' : 'text-slate-500'}`}>
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      const newTab: boolean = value?.openInNewTab ?? true
      return (
        <Link
          href={href}
          target={newTab ? '_blank' : undefined}
          rel={newTab ? 'noopener noreferrer' : undefined}
          className={`underline underline-offset-2 transition-colors ${isDarkTheme ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}`}
        >
          {children}
        </Link>
      )
    },
  },
})

// ─── Component ────────────────────────────────────────────────────────────────

export default function FeatureGridSection({ data }: FeatureGridSectionProps) {
  const {
    eyebrow,
    heading = '',
    subHeading,
    headingAlignment = 'left',
    items = [],
    footnote,
    theme = 'light',
  } = data ?? {}


  const isDark = theme === 'dark'
  const isGray = theme === 'gray'
  const isCentered = headingAlignment === 'center'
  const pathname = usePathname()
  const isIntegrations = pathname === '/integrations'
  const isOilAndGas = pathname === "/oil-and-gas" || pathname === "/industrial-service";

  const getFeatureLinkHref = (link?: FeatureLink) => {
    if (!link?.url) return '#'

    if (typeof link.url === 'string') {
      return link.url.startsWith('/') || /^https?:\/\//.test(link.url) ? link.url : `/${link.url}`
    }

    return link.url._type ? getSlugUrl(link.url._type, link.url.slug) : '#'
  }

  return (
    <section
      className={
        isDark
          ? 'bg-brand text-white'
          : isGray
            ? 'bg-[#E9EDF1] text-slate-900'
            : 'bg-white text-slate-900'
      }
    >
      <div
        className={`mx-auto max-w-7xl px-4 pt-16 pb-16 sm:pt-20 sm:pb-20 border-b border-t ${isGray ? 'border-[#c1c9d3]' : 'border-[#162A4A]/20'}`}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        {(eyebrow || heading || subHeading) && (
          <div className={`mb-12 max-w-3xl mx-auto ${isCentered ? 'mx-auto text-center' : ''}`}>

            {eyebrow && (
              <p className={`mb-3 text-sm font-semibold tracking-wide sm:text-base text-center ${isDark ? 'text-[#14B8A6]' : 'text-teal-600'
                }`}>
                {eyebrow}
              </p>
            )}

            {heading && (
              <h2
                className={`text-center font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-4xl ${isDark ? 'text-white' : 'text-slate-900'
                  }`}
              >
                {heading}
              </h2>
            )}

            {subHeading && (
              <p
                className={`mt-4 text-base leading-relaxed sm:text-lg text-center ${isDark ? 'text-slate-300' : 'text-slate-600'} ${isCentered ? 'mx-auto max-w-2xl' : ''}`}
              >
                {subHeading}
              </p>
            )}

          </div>
        )}

        {/* ── Grid ───────────────────────────────────────────────────────── */}
        {/* <ul
          className={`grid grid-cols-1 items-start sm:grid-cols-2 
  ${isGray ? 'gap-6 sm:gap-6' : 'gap-10 sm:gap-4'} 
  ${isOilAndGas
              ? 'lg:grid-cols-4'
              : isIntegrations
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-3'
            }`}
        > */}
        <ul
          className={`grid grid-cols-1 items-start sm:grid-cols-2 
    ${isGray ? 'gap-6 sm:gap-6' : 'gap-10 sm:gap-4'} 
    ${isOilAndGas || isIntegrations
              ? 'lg:grid-cols-4'
              : items.length === 4
                ? 'lg:grid-cols-4'
                : items.length === 3
                  ? 'lg:grid-cols-3'
                  : items.length === 2
                    ? 'lg:grid-cols-2'
                    : 'lg:grid-cols-1'
            }`}
        >
          {items.map((item, idx) => (
            <li
              key={item._key ?? `${item.title}-${idx}`}
              className={`flex h-full flex-col gap-4 ${isGray
                ? 'rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm'
                : `md:first:-ml-6 md:p-6 ${isDark
                  ? 'border-[#45556e] border-b pb-8 last:border-b-0 last:pb-0 sm:border-b-0 sm:pb-0 md:border-r-[0.5px] last:border-r-0'
                  : 'md:border-r md:pr-8 border-[#162A4A]/20 last:border-r-0'
                }`
                }`}
            >
              {/* Icon */}
              {item.icon?.url && (
                <div className={`flex h-[42px] w-[42px] items-center justify-center rounded-full ${isDark ? 'bg-[#2e405c]' : 'bg-[#3C5B8D1A]'}`}>
                  <Image
                    src={item.icon.url}
                    alt={item.icon.alt ?? item.title}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
              )}

              <div className="flex flex-1 flex-col gap-2">
                {/* Eyebrow */}
                {item.eyebrow && (
                  <p className={`text-xs font-semibold uppercase tracking-widest ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                    {item.eyebrow}
                  </p>
                )}

                {/* Title */}
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-[#020210]'}`}>
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <div className="flex flex-col gap-1">
                    <PortableText
                      value={item.description}
                      components={descComponents(isDark)}
                    />
                  </div>
                )}
              </div>

              {/* Link */}
              {item.link?.label && (
                <Link
                  href={getFeatureLinkHref(item.link)}
                  className={`mt-2 inline-flex items-center gap-1 text-sm font-medium underline-offset-2 transition-colors hover:underline ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'
                    }`}
                >
                  {item.link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-3.5" aria-hidden="true">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* ── Footnote ───────────────────────────────────────────────────── */}
        {footnote?.text && (
          <div className='flex items-center justify-center'>
            <div className={`mt-12 inline-flex flex-wrap mx-auto px-6 py-2 rounded-[30px] items-center justify-center gap-2 text-center text-lg bg-[#13A89E]/10 ${isDark ? 'text-slate-400' : 'text-[#020210]'}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.99889 9C2.25377 9.00028 2.49892 9.09788 2.68426 9.27285C2.8696 9.44782 2.98113 9.68695 2.99606 9.94139C3.011 10.1958 2.92822 10.4464 2.76463 10.6418C2.60104 10.8373 2.36899 10.9629 2.11589 10.993L1.99889 11H0.998892C0.744012 10.9997 0.49886 10.9021 0.313524 10.7272C0.128188 10.5522 0.0166572 10.313 0.00172004 10.0586C-0.0132171 9.80416 0.0695667 9.55362 0.233157 9.35817C0.396747 9.16271 0.628796 9.0371 0.881892 9.007L0.998892 9H1.99889ZM9.99889 0C10.2438 3.23106e-05 10.4802 0.0899562 10.6633 0.252715C10.8463 0.415475 10.9632 0.639749 10.9919 0.883L10.9989 1V2C10.9986 2.25488 10.901 2.50003 10.726 2.68537C10.5511 2.8707 10.3119 2.98223 10.0575 2.99717C9.80306 3.01211 9.55251 2.92933 9.35706 2.76574C9.16161 2.60214 9.036 2.3701 9.00589 2.117L8.99889 2V1C8.99889 0.734784 9.10425 0.48043 9.29179 0.292893C9.47932 0.105357 9.73368 0 9.99889 0ZM18.9989 9C19.2538 9.00028 19.4989 9.09788 19.6843 9.27285C19.8696 9.44782 19.9811 9.68695 19.9961 9.94139C20.011 10.1958 19.9282 10.4464 19.7646 10.6418C19.601 10.8373 19.369 10.9629 19.1159 10.993L18.9989 11H17.9989C17.744 10.9997 17.4989 10.9021 17.3135 10.7272C17.1282 10.5522 17.0167 10.313 17.0017 10.0586C16.9868 9.80416 17.0696 9.55362 17.2332 9.35817C17.3967 9.16271 17.6288 9.0371 17.8819 9.007L17.9989 9H18.9989ZM2.89189 2.893C3.06409 2.72082 3.29318 2.61739 3.53621 2.60211C3.77924 2.58683 4.01949 2.66075 4.21189 2.81L4.30589 2.893L5.00589 3.593C5.18524 3.77296 5.28937 4.01443 5.29712 4.26838C5.30488 4.52233 5.21568 4.76971 5.04764 4.96028C4.87961 5.15084 4.64534 5.27031 4.39242 5.2944C4.13949 5.31849 3.88688 5.24541 3.68589 5.09L3.59189 5.007L2.89189 4.307C2.70442 4.11947 2.59911 3.86516 2.59911 3.6C2.59911 3.33484 2.70442 3.08053 2.89189 2.893ZM15.6919 2.893C15.8719 2.71365 16.1133 2.60953 16.3673 2.60177C16.6212 2.59402 16.8686 2.68322 17.0592 2.85125C17.2497 3.01928 17.3692 3.25355 17.3933 3.50647C17.4174 3.7594 17.3443 4.01201 17.1889 4.213L17.1059 4.307L16.4059 5.007C16.2259 5.18635 15.9845 5.29047 15.7305 5.29823C15.4766 5.30598 15.2292 5.21678 15.0386 5.04875C14.848 4.88072 14.7286 4.64645 14.7045 4.39353C14.6804 4.1406 14.7535 3.88799 14.9089 3.687L14.9919 3.593L15.6919 2.893ZM11.9989 16C12.2641 16 12.5185 16.1054 12.706 16.2929C12.8935 16.4804 12.9989 16.7348 12.9989 17C12.9989 17.7956 12.6828 18.5587 12.1202 19.1213C11.5576 19.6839 10.7945 20 9.99889 20C9.20324 20 8.44018 19.6839 7.87757 19.1213C7.31496 18.5587 6.99889 17.7956 6.99889 17C6.99892 16.7551 7.08885 16.5187 7.25161 16.3356C7.41437 16.1526 7.63864 16.0357 7.88189 16.007L7.99889 16H11.9989ZM9.99889 4C11.2582 4 12.4856 4.39622 13.5072 5.13255C14.5287 5.86887 15.2928 6.90796 15.691 8.10263C16.0892 9.29731 16.1015 10.587 15.726 11.789C15.3505 12.991 14.6063 14.0444 13.5989 14.8C13.4611 14.9035 13.2988 14.9697 13.1279 14.992L12.9989 15H6.99889C6.78252 15 6.57199 14.9298 6.39889 14.8C5.39146 14.0444 4.64729 12.991 4.27181 11.789C3.89633 10.587 3.90857 9.29731 4.30679 8.10263C4.70502 6.90796 5.46904 5.86887 6.49063 5.13255C7.51222 4.39622 8.7396 4 9.99889 4Z" fill="#13A89E" />
              </svg>

              <span>{footnote.text}</span>
              {footnote.linkUrl && footnote.linkLabel && (
                <Link
                  href={footnote.linkUrl}
                  className={`font-medium underline underline-offset-2 transition-colors ${isDark ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'}`}
                >
                  {footnote.linkLabel}
                </Link>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
