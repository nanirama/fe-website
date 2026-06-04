"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Ref,
} from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

type SanityImage = {
  asset?: { _ref?: string };
  alt?: string;
};

export type CapabilityItem = {
  _key: string;
  title: string;
  image?: SanityImage;
  description?: PortableTextBlock[];
};

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-2xl font-semibold text-[#020210] dark:text-neutral-100">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-neutral-700 dark:text-neutral-300">{children}</em>
    ),
    link: ({ children, value }) => {
      const href: string = value?.href ?? "";
      const newTab: boolean = value?.openInNewTab ?? true;
      return (
        <Link
          href={href}
          {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="text-[#13A89E] underline underline-offset-2 hover:text-[#0d9488] transition-colors"
        >
          {children}
        </Link>
      );
    },
  },
};

/** Long smooth ease-out */
const easeOut = [0.16, 1, 0.3, 1] as const;
/** Close: quick fade then collapse */
const easeIn = [0.4, 0, 0.58, 1] as const;

const panelVariantsSmooth: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        type: "spring",
        bounce: 0,
        stiffness: 200,
        damping: 30,
        mass: 0.9,
      },
      opacity: {
        duration: 0.5,
        ease: easeOut,
        delay: 0.02,
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.22,
        ease: easeIn,
      },
      height: {
        type: "spring",
        bounce: 0,
        stiffness: 420,
        damping: 36,
        mass: 0.72,
        delay: 0.08,
      },
    },
  },
};

const panelVariantsReduced: Variants = {
  open: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.18 },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

function CapabilityAccordionItem({
  item,
  itemId,
  itemIndex,
  isOpen,
  onSelect,
  reduceMotion,
  listItemRef,
}: {
  item: CapabilityItem;
  itemId: string;
  itemIndex: number;
  isOpen: boolean;
  onSelect: () => void;
  reduceMotion: boolean;
  listItemRef?: Ref<HTMLLIElement>;
}) {
  const headerId = `${itemId}-header`;
  const panelId = `${itemId}-panel`;
  const hasBody = Boolean(item.description && item.description.length > 0);
  const variants = reduceMotion ? panelVariantsReduced : panelVariantsSmooth;

  return (
    <motion.li
      ref={listItemRef}
      className="py-2 sm:py-3 pl-5"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 32,
        mass: 0.92,
        delay: reduceMotion ? 0 : itemIndex * 0.05,
      }}
    >
      <h4 className="m-0">
        <motion.button
          type="button"
          id={headerId}
          tabIndex={0}
          className="w-full cursor-pointer text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#13A89E]"
          aria-expanded={isOpen}
          aria-controls={hasBody ? panelId : undefined}
          onClick={onSelect}
          whileTap={reduceMotion ? undefined : { scale: 0.992 }}
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        >
          <span
            className={`block text-2xl font-semibold ${
              isOpen
                ? "text-[#020210] dark:text-neutral-100"
                : "text-neutral-800 dark:text-neutral-200"
            }`}
          >
            {item.title}
          </span>
        </motion.button>
      </h4>
      <AnimatePresence initial={false} mode="sync">
        {isOpen && hasBody && (
          <motion.div
            key={`${itemId}-panel`}
            id={panelId}
            role="region"
            aria-labelledby={headerId}
            variants={variants}
            initial={false}
            animate="open"
            exit="collapsed"
            className="overflow-hidden"
          >
            <div className="mt-3 text-base leading-relaxed text-[#020210]/70 dark:text-neutral-400">
              <PortableText value={item.description!} components={ptComponents} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

type Props = {
  capabilities: CapabilityItem[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
};

export default function CapabilitiesAccordion({ capabilities, activeIndex, onSelect }: Props) {
  const [internalIndex, setInternalIndex] = useState(0);
  const openIndex = activeIndex !== undefined ? activeIndex : internalIndex;
  const handleSelect = (idx: number) => {
    setInternalIndex(idx);
    onSelect?.(idx);
  };
  const reduceMotion = useReducedMotion() ?? false;
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<number, HTMLLIElement>>(new Map());
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });

  const updateIndicator = useCallback(() => {
    const ul = listRef.current;
    const li = itemRefs.current.get(openIndex);
    if (!ul || !li) return;

    const ulRect = ul.getBoundingClientRect();
    const liRect = li.getBoundingClientRect();
    setIndicator({
      top: liRect.top - ulRect.top + ul.scrollTop,
      height: liRect.height,
    });
  }, [openIndex]);

  useLayoutEffect(() => {
    updateIndicator();
  }, [updateIndicator, capabilities]);

  useLayoutEffect(() => {
    const ul = listRef.current;
    if (!ul) return;

    const scheduleUpdate = () => {
      requestAnimationFrame(updateIndicator);
    };

    const ro = new ResizeObserver(scheduleUpdate);
    ro.observe(ul);
    itemRefs.current.forEach((li) => {
      ro.observe(li);
    });

    window.addEventListener("resize", scheduleUpdate);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [updateIndicator, openIndex, capabilities.length]);

  /* Panel height animates over ~400ms; re-measure a few times so the teal track catches up */
  useEffect(() => {
    const delays = [0, 80, 200, 380, 550];
    const ids = delays.map((ms) => window.setTimeout(updateIndicator, ms));
    return () => ids.forEach(clearTimeout);
  }, [openIndex, updateIndicator]);

  const setItemRef = useCallback(
    (index: number) => (el: HTMLLIElement | null) => {
      if (el) itemRefs.current.set(index, el);
      else itemRefs.current.delete(index);
      requestAnimationFrame(updateIndicator);
    },
    [updateIndicator],
  );

  if (!capabilities.length) return null;

  return (
    <div className="relative">
      {/* Single continuous track — full list height, including gaps */}
      <span
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-px bg-neutral-200 dark:bg-neutral-600"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 z-[1] w-[3px] bg-[#13A89E] dark:bg-[#75E8E0]"
        initial={false}
        animate={{
          top: indicator.height > 0 ? indicator.top : 0,
          height: indicator.height,
          opacity: indicator.height > 0 ? 1 : 0,
        }}
        transition={
          reduceMotion
            ? { duration: 0.2, ease: easeOut }
            : {
                type: "spring",
                bounce: 0,
                stiffness: 280,
                damping: 34,
              }
        }
      />
      <ul
        ref={listRef}
        className="relative z-[2] m-0 list-none space-y-6 p-0 sm:space-y-7"
        role="list"
      >
        {capabilities.map((cap, idx) => (
          <CapabilityAccordionItem
            key={cap._key || `cap-fallback-${idx}`}
            item={cap}
            itemId={`cap-${cap._key ?? idx}`}
            itemIndex={idx}
            isOpen={openIndex === idx}
            onSelect={() => handleSelect(idx)}
            reduceMotion={reduceMotion}
            listItemRef={setItemRef(idx)}
          />
        ))}
      </ul>
    </div>
  );
}
