"use client";

import { useState, useCallback, useId } from "react";

const MIN = 0;
const MAX = 500;

function PersonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="h-5 w-5 text-[#020210]/40"
    >
      <path
        fillRule="evenodd"
        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function RoiCalculatorWidget() {
  const [technicians, setTechnicians] = useState(0);
  const sliderId = useId();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTechnicians(Number(e.target.value));
  }, []);

  const fillPct = ((technicians - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="rounded-2xl bg-[#F0F2F5] p-6 sm:p-8">
      <p className="text-lg font-bold leading-snug text-[#020210] sm:text-xl">
        How many field technicians does your organization manage?
      </p>

      {/* Counter card */}
      <div className="mt-5 rounded-xl bg-white px-5 pb-6 pt-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-sm font-bold text-[#020210]">Total Technician</span>
          <div className="flex items-center gap-2">
            <PersonIcon />
            <span
              aria-live="polite"
              aria-atomic="true"
              className="w-8 text-right text-sm font-semibold tabular-nums text-[#020210]"
            >
              {technicians}
            </span>
          </div>
        </div>

        {/* Range slider */}
        <div className="mt-4">
          <label htmlFor={sliderId} className="sr-only">
            Number of field technicians
          </label>
          {/*
            Cross-browser teal fill: background linear-gradient drives the filled
            portion in Firefox; accentColor drives the thumb in all browsers.
            WebKit track colour is set via global CSS in globals.css if needed.
          */}
          <input
            id={sliderId}
            type="range"
            min={MIN}
            max={MAX}
            step={1}
            value={technicians}
            onChange={handleChange}
            className="w-full cursor-pointer"
            style={{
              accentColor: "#13A89E",
              background: `linear-gradient(to right, #13A89E ${fillPct}%, #CBD5E1 ${fillPct}%)`,
              height: "6px",
              borderRadius: "9999px",
              outline: "none",
              appearance: "auto",
            }}
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        disabled={technicians === 0}
        className="mt-5 w-full rounded-full bg-slate-400 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        Submit
      </button>
    </div>
  );
}
