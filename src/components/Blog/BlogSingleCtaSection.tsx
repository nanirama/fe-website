'use client'

import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const BlogSingleCtaSection = () => {
  return (
    <section className="w-full px-4 py-10 sm:pt-14">
      <div className="relative mx-auto max-w-7xl bg-[#E9EDF2] rounded-2xl px-6 pt-10 sm:px-10 lg:px-12 lg:pt-16">
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:gap-10 gap-6 lg:grid-cols-2 lg:items-end relative">
          
          {/* ── Left Content ── */}
          <div className="z-10 pb-10">
            <h2 className="font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-[42px]">
              <span className="text-[#14b8a6]">A Clearer Way</span> to Run Field
              <br className="hidden sm:block" />
              Service Operations
            </h2>

            <p className="mt-4 line-clamp-4 text-base leading-relaxed text-[#4B5563] sm:text-lg max-w-xl">
              Field service challenges are not just operational. They directly
              affect cash flow, billing accuracy, and scalability.
            </p>

            <Link href="/demo" className="inline-flex mt-6 items-center justify-center rounded-[31px] px-5 py-3 cursor-pointer text-sm font-semibold leading-[140%] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none bg-[#162A4A] text-white hover:bg-neutral-800 focus-visible:ring-black w-full shrink-0 sm:w-auto">
              Schedule a Demo
            </Link>
          </div>

          {/* ── Right Image Card ── */}
          <div className="relative flex justify-center lg:justify-end">
            
            <div className="w-[300px] lg:w-[400px] lg:absolute right-0 -bottom-0 shadow-2xl">
              <Image
                src={`/images/blogsingle-ctaimg.webp`} 
                alt="Field Service Whitepaper"
                width={400}
                height={500}
                className="w-full h-auto object-cover rounded-t-xl"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default BlogSingleCtaSection