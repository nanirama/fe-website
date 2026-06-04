'use client'

import React from 'react'
import HubSpotForm from '../FlexibleContent/HubSpotForm'
const BlogNewsletterSection = () => {
  return (
    <section className="w-full px-4 pt-10 pb-20">
      <div className="mx-auto max-w-7xl bg-[#ebeff4] rounded-2xl p-6 sm:px-10 lg:px-20 sm:py-10 lg:py-8">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          
          {/* ── Left Content ── */}
          <div>
            <h2 className="font-manrope text-balance text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.25rem] lg:leading-[1.12] xl:text-[42px]">
              Get Insights That Actually{' '}
              <span className="text-[#14b8a6]">Improve Operations</span>
            </h2>

            <p className="mt-4 line-clamp-4 text-base leading-relaxed text-[#4B5563] sm:text-lg">
              Short, focused ideas on reducing delays, improving billing
              accuracy, and running field service without friction.
            </p>
          </div>

          <HubSpotForm formId="3ea9cb9b-9bc4-424c-9249-fdee365febec" minHeight="150px" />

          {/* ── Right Form ── */}
          {/* <form className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Pritchett"
                  className="w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#13A89E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="johnpritchett@company.com"
                  className="w-full rounded-md border border-transparent bg-white px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#13A89E]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-md bg-[#020210] text-white py-3 text-base font-medium hover:bg-[#020617]/90 transition"
            >
              Subscribe to Our Newsletter
            </button>
          </form> */}

        </div>
      </div>
    </section>
  )
}

export default BlogNewsletterSection