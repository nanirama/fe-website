"use client";

import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

type Suggestion = {
  id: string;
  label: string;
};

type Props = {
  value: string;
  onChange: (value: string) => void;
  suggestions: Suggestion[];
  /** Called when user commits a suggestion (click or Enter) */
  onCommitSearch?: () => void;
};

export default function BlogSearchAutocomplete({
  value,
  onChange,
  suggestions,
  onCommitSearch,
}: Props) {
  const baseId = useId();
  const listboxId = `${baseId}-listbox`;
  const inputId = `${baseId}-input`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showList = open && suggestions.length > 0 && value.trim().length > 0;

  useEffect(() => {
    if (!showList) setActiveIndex(-1);
  }, [showList, suggestions]);

  const scrollActiveIntoView = useCallback((index: number) => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-option-index="${index}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showList) {
      if (e.key === "ArrowDown" && suggestions.length > 0) {
        setOpen(true);
        setActiveIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      e.preventDefault();
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = i < suggestions.length - 1 ? i + 1 : 0;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => {
        const next = i > 0 ? i - 1 : suggestions.length - 1;
        scrollActiveIntoView(next);
        return next;
      });
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      scrollActiveIntoView(0);
    } else if (e.key === "End") {
      e.preventDefault();
      const last = suggestions.length - 1;
      setActiveIndex(last);
      scrollActiveIntoView(last);
    } else if (e.key === "Enter") {
      if (activeIndex >= 0 && activeIndex < suggestions.length) {
        e.preventDefault();
        onChange(suggestions[activeIndex].label);
        setOpen(false);
        onCommitSearch?.();
      }
    }
  };

  const pick = (label: string) => {
    onChange(label);
    setOpen(false);
    onCommitSearch?.();
    inputRef.current?.focus();
  };

  const memoSuggestions = useMemo(() => suggestions, [suggestions]);

  return (
    <div className="relative w-full min-w-0 lg:max-w-md lg:flex-shrink-0">
      <label htmlFor={inputId} className="sr-only">
        Search blog topics
      </label>
      <div className="relative flex items-end justify-end">
        <input
          ref={inputRef}
          id={inputId}
          type="search"
          name="blog-search"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls={listboxId}
          aria-activedescendant={showList && activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => value.trim() && memoSuggestions.length > 0 && setOpen(true)}
          onBlur={() => {
            window.setTimeout(() => setOpen(false), 180);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search topics"
          className="w-full md:max-w-xs rounded-full border-0 bg-[#F3F4F6] py-3 pl-4 pr-12 text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#14B8A6] sm:py-3.5 sm:text-base"
        />
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#14B8A6]"
          aria-hidden
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      {showList ? (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          className="absolute right-0 z-20 mt-2 max-h-60 w-[73%] border overflow-y-auto rounded-xl border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5"
        >
          {memoSuggestions.map((s, index) => {
            const selected = index === activeIndex;
            return (
              <li
                key={s.id}
                id={`${listboxId}-opt-${index}`}
                role="option"
                aria-selected={selected}
                data-option-index={index}
                className={[
                  "cursor-pointer px-4 py-2.5 text-sm",
                  selected ? "bg-[#14B8A6]/10 text-[#0f766e]" : "text-[#111827]",
                ].join(" ")}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => pick(s.label)}
              >
                {s.label}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
