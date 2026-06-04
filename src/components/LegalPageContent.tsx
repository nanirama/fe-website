import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText, type PortableTextComponents } from "next-sanity";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-manrope text-lg font-semibold tracking-tight text-[#51423e] first:mt-0 sm:mt-10 sm:text-xl">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="leading-relaxed text-[#554743] mb-2 sm:text-base">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-3 list-disc space-y-2 pl-5 text-[#374151] sm:pl-6">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="my-3 list-decimal space-y-2 pl-5 text-[#374151] marker:text-[#374151] sm:pl-6">
        {children}
      </ol>
    ),
    alpha: ({ children }) => (
      <ol className="my-3 list-[lower-alpha] space-y-2 pl-5 text-[#374151] marker:text-[#374151] sm:pl-6">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="leading-relaxed">{children}</li>,
    alpha: ({ children }) => <li className="leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-lg text-[#42312d]">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href) return <>{children}</>;
      const external = /^https?:\/\//i.test(href);
      return (
        <Link
          href={href}
          className="font-medium text-[#374151] underline underline-offset-2 hover:text-[#14B8A6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14B8A6]"
          {...(value?.blank || external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </Link>
      );
    },
  },
};

type Props = {
  title: string;
  content: PortableTextBlock[] | undefined;
};

export default function LegalPageContent({ title, content }: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24 lg:pt-36">
      <h1 className="font-manrope text-3xl font-semibold tracking-tight text-[#020210] text-3xl lg:text-5xl">
        {title}
      </h1>
      {content?.length ? (
        <div className="mt-10">
          <PortableText value={content} components={components} />
        </div>
      ) : null}
    </div>
  );
}
