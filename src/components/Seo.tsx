import { Metadata } from "next";
import Head from "next/head";

import { toAbsoluteUrl } from "@/src/utils/siteUrl";

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  imageUrl?: string;
}

export function seoGenerateMetadata({ title, description, url, imageUrl }: SeoProps): Metadata {
  let metaImageurl = "/og-image.png";
  if (imageUrl) {
    metaImageurl = imageUrl;
  }

  const absoluteImage = toAbsoluteUrl(metaImageurl);
  const absolutePageUrl = url ? toAbsoluteUrl(url) : undefined;

  return {
    ...(absolutePageUrl
      ? {
          alternates: {
            canonical: absolutePageUrl,
            languages: {
              "en-US": absolutePageUrl,
              "x-default": absolutePageUrl,
            },
          },
        }
      : {}),
    title,
    description,
    openGraph: {
      title,
      description,
      images: absoluteImage,
      ...(absolutePageUrl ? { url: absolutePageUrl } : {}),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: absoluteImage,
    },
  };
}

const Seo = ({ title, description, image, url, imageUrl }: SeoProps) => {
  let metaImageurl = "/og-image.png";
  if (imageUrl) {
    metaImageurl = imageUrl;
  }
  const absoluteUrl = url ? toAbsoluteUrl(url) : undefined;
  const absoluteOgImage = toAbsoluteUrl(metaImageurl);
  return (
    <Head>
      <title>{title}</title>
      {absoluteUrl && (
        <>
          <link rel="alternate" hrefLang="en-US" href={absoluteUrl} />
          <link rel="alternate" hrefLang="x-default" href={absoluteUrl} />
        </>
      )}
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {absoluteUrl && <link rel="canonical" href={absoluteUrl} />}

      {image && <meta property="og:image" content={absoluteOgImage} />}
      {absoluteUrl && <meta property="og:url" content={absoluteUrl} />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;

// Organization Schema JSON-LD data
