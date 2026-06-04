// components/sections/FaqSection.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Faq {
  _id: string
  question: string
  answer: PortableTextBlock[]
}

interface FaqSectionProps {
  data?: {
    heading?: string
    faqs?: Faq[]
  }
}

// ─── PortableText ─────────────────────────────────────────────────────────────

const answerComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-sm leading-relaxed text-white/70">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-2 space-y-1 text-sm text-slate-300 sm:text-base">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mt-2 list-decimal space-y-1 pl-4 text-sm text-slate-300 sm:text-base">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-2">
        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-400" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      return (
        <Link
          href={href}
          className="text-teal-400 underline underline-offset-2 hover:text-teal-300 transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: Faq
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`rounded-[8px] transition-colors duration-200 ${isOpen
          ? 'border-none bg-white/5'
          : 'border-none bg-white/5'
        }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
      >
        <span
          className={`text-sm font-normal leading-[140%] transition-colors sm:text-base ${isOpen ? 'text-white' : 'text-slate-200'
            }`}
        >
          {faq.question}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 rounded-md p-1 transition-all duration-300 ${isOpen ? 'text-teal-400' : 'text-slate-500'
            } ${isOpen ? 'rotate-180' : ''}`}
        >
          <svg width="16" height="9" viewBox="0 0 16 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.75 0.750113L6.9954 6.99521C7.12076 7.12057 7.26958 7.22002 7.43337 7.28786C7.59716 7.35571 7.77271 7.39062 7.95 7.39062C8.12728 7.39062 8.30283 7.35571 8.46663 7.28786C8.63042 7.22002 8.77924 7.12057 8.9046 6.99521L15.15 0.749813" stroke="#13A89E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Animated answer */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1">
            {faq.answer?.length ? (
              <PortableText value={faq.answer} components={answerComponents} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FaqSection({ data }: FaqSectionProps) {
  const heading = data?.heading ?? 'Frequently asked questions'
  const faqs = (data?.faqs ?? []).filter((f) => f?._id && f?.question)
  const [openId, setOpenId] = useState<string | null>(() => faqs[0]?._id ?? null)

  const toggle = (id: string) => setOpenId((prev) => (prev === id ? null : id))

  if (!faqs.length) {
    return null
  }

  // Split into two columns
  const mid = Math.ceil(faqs.length / 2)
  const leftFaqs = faqs.slice(0, mid)
  const rightFaqs = faqs.slice(mid)

  return (
    <section className="bg-brand md:pt-24 pt-10 pb-10 text-white">
      <div className="mx-auto max-w-7xl px-4">

        {/* ── Heading ────────────────────────────────────────────────────── */}
        <h2 className="md:mb-16 mb-10 text-center text-3xl font-semibold tracking-tight text-white sm:text-[42px] leading-[110%]">
          {heading}
        </h2>

        {/* ── Two-column grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3">

          {/* Left column */}
          <div className="flex flex-col gap-3">
            {leftFaqs.map((faq) => (
              <FaqItem
                key={faq._id}
                faq={faq}
                isOpen={openId === faq._id}
                onToggle={() => toggle(faq._id)}
              />
            ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-3">
            {rightFaqs.map((faq) => (
              <FaqItem
                key={faq._id}
                faq={faq}
                isOpen={openId === faq._id}
                onToggle={() => toggle(faq._id)}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
