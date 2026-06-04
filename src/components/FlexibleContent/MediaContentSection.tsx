
import Link from 'next/link'
import Image from 'next/image'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { TypedObject } from '@portabletext/types'
import { urlForImage } from '@/src/sanity/lib/utils';

type SanityImage = {
  asset?: {
    _ref?: string
  }
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed">{children}</p>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? ''
      const newTab: boolean = value?.openInNewTab ?? true
      return (
        <Link
          href={href}
          className="text-[#13A89E] underline underline-offset-2 hover:text-[#0d9488] transition-colors"
        >
          {children}
        </Link>
      )
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 space-y-3">
        {children}
      </ul>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-white/80 leading-relaxed">
        <span className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
        <span>{children}</span>
      </li>
    ),
  },
}

type Item = {
  _key?: string
  eyebrow?: string
  title?: string
  description?: TypedObject[]
  image?: SanityImage
  alt?: string
  imagePosition?: 'auto' | 'left' | 'right'
  linkText?: string
  linkUrl?: string
}

type Props = {
  data?: {
    title?: string
    theme?: 'dark' | 'light'
    items?: Item[]
  }
}


const getPosition = (
  item: Item,
  index: number
): 'left' | 'right' => {
  if (item.imagePosition && item.imagePosition !== 'auto') {
    return item.imagePosition
  }
  return index % 2 === 0 ? 'left' : 'right'
}

export default function MediaContentSection({ data }: Props) {
  const isDark = data?.theme === 'dark'



  return (
    <section
      className={`${isDark ? 'bg-brand text-white py-10 md:py-24 ' : 'bg-white text-slate-900 py-16'
        }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        {data?.title && (
          <header className={`text-center mb-20`}>
            <h2 className={`text-[32px] sm:text-[42px] font-semibold leading-[110%]  ${isDark ? 'text-white' : 'text-[#020210]'}`}>
              {data?.title}
            </h2>
          </header>
        )}

        <div className="md:space-y-40 space-y-20">
          {data?.items?.map((item: Item, index: number) => {
            const position = getPosition(item, index)
            const isLeft = position === 'left'

            const imageUrl = (item?.image &&
              urlForImage(item.image)
                ?.width(780)
                ?.format('webp')
                ?.fit('crop')
                ?.quality(85)
                ?.url()) || "/images/middlemen-img.webp";

            const blurImageUrl = item?.image &&
              urlForImage(item.image)
                ?.width(30)
                ?.blur(20)
                .format('webp')
                ?.fit('crop')?.url();

            return (
              <article
                key={item._key || `${item.title}-${index}`}
                className="grid items-center md:gap-12 gap-8 md:grid-cols-1 md:flex"
              >
                {/* Image */}
                {imageUrl && (
                  <div
                    className={`relative md:w-[54%] max-w-195 w-full ${isLeft ? 'md:order-1' : 'md:order-2'
                      }`}
                  >
                    <Image
                      src={imageUrl}
                      alt={item?.alt || "media-content-image"}
                      width={780}
                      height={0}
                      placeholder={blurImageUrl ? "blur" : "empty"}
                      blurDataURL={blurImageUrl || undefined}
                      className="z-20 w-full rounded-[14px]"
                      style={{ height: 'auto' }}
                      quality={80}
                      sizes="(max-width: 640px) 100vw,
                             (max-width: 768px) 100vw,
                             (max-width: 1024px) 90vw,
                             780px"
                    />
                  </div>
                )}

                {/* Content */}
                <div
                  className={`md:w-[46%] ${isLeft ? 'md:order-2 md:ml-8' : 'md:order-1 md:mr-8'
                    }`}
                >
                  {/* LIGHT MODE → Title first */}
                  {!isDark && (
                    <>
                      <h3 className="text-2xl font-bold text-black">
                        {item.title}
                      </h3>

                      {item.eyebrow && (
                        <p className="mt-2 text-base font-normal text-[#13A89E] leading-[130%]">
                          {item.eyebrow}
                        </p>
                      )}
                    </>
                  )}

                  {isDark && (
                    <>
                      {item.eyebrow && (
                        <p className="mb-2 text-base font-normal text-[#13A89E] leading-[130%]">
                          {item.eyebrow}
                        </p>
                      )}

                      <h3 className="text-2xl font-bold text-white">
                        {item.title}
                      </h3>
                    </>
                  )}

                  {item.description && (
                    <div
                      className={`mt-4 prose max-w-none text-base  media_content ${isDark ? 'prose-invert text-white/70' : 'text-black'
                        }`}
                    >
                      <PortableText value={item.description} components={ptComponents} />
                    </div>
                  )}

                  {item.linkText && (
                    <Link
                      href={item.linkUrl ? `/${item.linkUrl}` : '#'}
                      className="mt-2 inline-flex text-base flex-row gap-3 items-center text-[#13A89E] underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                    >
                      {item.linkText}
                      <span><svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.75 6H13.875" stroke="#13A89E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9 11.25L14.25 6L9 0.75" stroke="#13A89E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg></span>
                      <span className="sr-only ">
                        {' '}
                        - {item.title}
                      </span>
                    </Link>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
