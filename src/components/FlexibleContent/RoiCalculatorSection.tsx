'use client'

import { useState } from 'react'
import Link from 'next/link'

type RoiCalculatorSectionData = {
  sectionTag?: string
  heading?: string
  description?: string
}

type Props = {
  data?: RoiCalculatorSectionData
  page?: string
}

export default function RoiCalculatorSection({ data }: Props) {
  const [value, setValue] = useState(0)

  const sectionTag = data?.sectionTag?.trim()
  const heading = data?.heading?.trim()
  const description = data?.description?.trim()

  const [submittedValue, setSubmittedValue] = useState<number | null>(null)

  const isZero = value === 0
  const isSmall = submittedValue !== null && submittedValue > 0 && submittedValue <= 50
  const isLarge = submittedValue !== null && submittedValue > 50

  return (
    <section className="w-full pt-28 pb-12 sm:py-16 lg:pt-40 lg:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14 sm:pb-20 pb-10">
          <div className="min-w-0">
            {sectionTag && (
              <p className="mb-3 text-sm font-medium text-[#13a89e]">
                {sectionTag}
              </p>
            )}
            {heading && (
              <h2 className="text-balance text-3xl font-semibold leading-[1.06] tracking-tight text-[#020210] sm:text-4xl lg:text-5xl">
                {heading}
              </h2>
            )}
            {description && (
              <p className="mt-5 text-base leading-relaxed text-[#020210]/60">
                {description}
              </p>
            )}
            <hr className="mt-8 border-slate-200" />
          </div>


          {/* Right - Slider */}
          <div className="min-w-0 flex items-center justify-center">
            <div className="w-full max-w-[720px] bg-[#ebeff4] rounded-2xl px-6 pt-8 pb-6">
              <h2 className="text-[22px] font-bold text-[#0f172a] leading-[1.4] mb-6">How many field technicians does your organization manage?</h2>
              <div className="bg-white rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[16px] font-extrabold text-[#1f2937]">Total Technician</p>
                  <div className="flex items-center justify-between w-[138px] bg-[#ebeff4] px-4 py-2 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                    <span className="text-[16px] text-[#111827]">
                      {value}
                    </span>
                  </div>
                </div>
                <input type="range" min={0} max={100} value={value} onChange={(e) => setValue(Number(e.target.value))} aria-label="Technician count"
                  className="w-full h-[8px] rounded-full appearance-none cursor-pointer "
                  style={{ background: `linear-gradient(to right, #ebeff4 ${value}%, #ebeff4 ${value}%)` }}>
                </input>
              </div>
              

              <button
                disabled={isZero}
                onClick={() => setSubmittedValue(value)}
                className={`w-full mt-8 py-2 rounded-full font-medium text-sm text-white transition
    ${isZero
                    ? 'bg-[#162A4A]/30 cursor-not-allowed'
                    : 'bg-[#13a89e] hover:bg-[#168f87]/90'
                  }`}
              >
                Submit
              </button>

            </div>
          </div>
        </div>
        {isSmall && (

          <section className="relative overflow-hidden rounded-2xl roi_bg sm:p-12 p-6 bg-[#24467a] text-white ">
            <div className="grid lg:grid-cols-2 z-40 relative grid-cols-1 items-end gap-5 lg:gap-10 text-white w-full">
              <div className="flex flex-col gap-3 justify-end">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">For Smaller Teams</h2>
                <p className="text-xl lg:text-2xl font-light text-white/70">Under 10 Technicians</p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-2">Your savings report is ready</h4>
                <p className="text-white/70 text-sm leading-[140%]">Based on your team size, we have prepared a standard ROI estimate highlighting potential improvements.</p>
                <div className="mt-8">
                  <Link href="/" className="text-black bg-white text-sm mt-5 px-4 py-2.5 rounded-full font-semibold">Download Your ROI Report (PDF)</Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {isLarge && (
          <section className="relative overflow-hidden rounded-2xl roi_bg p-12 bg-[#24467a] text-white ">
            <div className="grid lg:grid-cols-2 z-40 relative grid-cols-1 items-end gap-5 lg:gap-10 text-white w-full">
              <div className="flex flex-col gap-3 justify-end">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium">For Larger Teams</h2>
                <p className="text-xl lg:text-2xl font-light text-white/70">50+ Technicians</p>
              </div>
              <div>
                <h4 className="text-base font-semibold mb-2">Get a Custom ROI Analysis</h4>
                <p className="text-white/70 text-sm leading-[140%]">For organizations with more complex operations, a tailored ROI analysis provides a more accurate view of financial impact across field service, repair workflows, and billing systems.</p>
                <div className="mt-8">
                  <Link href="/" className="text-black bg-white text-sm mt-5 px-4 py-2.5 rounded-full font-semibold">Book ROI Consultation</Link>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>
    </section>
  )
}