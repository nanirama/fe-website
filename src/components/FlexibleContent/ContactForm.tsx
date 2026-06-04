"use client";

import { useEffect, useId } from "react";
import { useHubSpotForm } from "../../utils/useHubSpotForm";
type ContactFormProps = {
  submitLabel?: string;
  heading?: string;
};

const inputClass =
  "w-full rounded-lg bg-white px-4 py-3 text-sm text-[#020210] placeholder-[#020210]/40 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-[#13A89E]";

const selectClass =
  "w-full appearance-none rounded-lg bg-white px-4 py-3 text-sm text-[#020210]/60 outline-none ring-1 ring-slate-200 transition focus:ring-2 focus:ring-[#13A89E] cursor-pointer";

function ChevronIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#020210]/40"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SelectWrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}

export default function ContactForm({heading, submitLabel = "Drop Us a Line" }: ContactFormProps) {
  return (
    <div className="min-w-0 rounded-2xl bg-[#F0F2F5] p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-[#020210] sm:text-3xl">
              {heading || "Schedule Your Demo"}
            </h3>
    <form className="mt-7 space-y-5" action="#" method="POST">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sds-first-name" className="mb-1.5 block text-sm font-medium text-[#020210]">
            First Name<span className="text-red-500">*</span>
          </label>
          <input
            id="sds-first-name"
            type="text"
            name="firstName"
            placeholder="John"
            required
            autoComplete="given-name"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sds-last-name" className="mb-1.5 block text-sm font-medium text-[#020210]">
            Last Name<span className="text-red-500">*</span>
          </label>
          <input
            id="sds-last-name"
            type="text"
            name="lastName"
            placeholder="Pritchett"
            required
            autoComplete="family-name"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="sds-email" className="mb-1.5 block text-sm font-medium text-[#020210]">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          id="sds-email"
          type="email"
          name="email"
          placeholder="johnpritchett@company.com"
          required
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="sds-company" className="mb-1.5 block text-sm font-medium text-[#020210]">
          Company Name
        </label>
        <input
          id="sds-company"
          type="text"
          name="company"
          placeholder="Your company name"
          autoComplete="organization"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sds-users" className="mb-1.5 block text-sm font-medium text-[#020210]">
            Number of Users
          </label>
          <input
            id="sds-users"
            type="text"
            name="numUsers"
            placeholder="Min 10 Users Required"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sds-employees" className="mb-1.5 block text-sm font-medium text-[#020210]">
            Number of employees
          </label>
          <SelectWrapper>
            <select id="sds-employees" name="numEmployees" defaultValue="" className={selectClass}>
              <option value="" disabled>
                Please Select
              </option>
              <option value="1-10">1 - 10</option>
              <option value="11-50">11 - 50</option>
              <option value="51-200">51 - 200</option>
              <option value="201-500">201 - 500</option>
              <option value="500+">500+</option>
            </select>
            <ChevronIcon />
          </SelectWrapper>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sds-job" className="mb-1.5 block text-sm font-medium text-[#020210]">
            Job Function
          </label>
          <SelectWrapper>
            <select id="sds-job" name="jobFunction" defaultValue="" className={selectClass}>
              <option value="" disabled>
                Please Select
              </option>
              <option value="operations">Operations</option>
              <option value="sales">Sales</option>
              <option value="it">IT</option>
              <option value="finance">Finance</option>
              <option value="executive">Executive</option>
              <option value="other">Other</option>
            </select>
            <ChevronIcon />
          </SelectWrapper>
        </div>
        <div>
          <label htmlFor="sds-inquiry" className="mb-1.5 block text-sm font-medium text-[#020210]">
            Select Inquiry Type
          </label>
          <SelectWrapper>
            <select
              id="sds-inquiry"
              name="inquiryType"
              defaultValue="sales"
              className={`${selectClass} text-[#020210]`}
            >
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="general">General</option>
              <option value="partnership">Partnership</option>
            </select>
            <ChevronIcon />
          </SelectWrapper>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-[#020210] py-4 text-sm font-semibold text-white transition hover:bg-[#020210]/85 active:scale-[0.98]"
      >
        {submitLabel}
      </button>
    </form>
    </div>
  );
}