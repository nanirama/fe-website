"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  title: string;
  youtubeUrl?: string;
  fallbackImageUrl?: string;
  fallbackImageAlt?: string;
  duration?: string;
  description?: string;
  priority?: boolean;
  className?: string;
  showTitleAndDescription?: boolean;
};

function toEmbedUrl(rawUrl?: string): string {
  if (!rawUrl) return "";

  const value = rawUrl.trim();
  const embedMatch = value.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{6,})/i)?.[1];
  if (embedMatch) return `https://www.youtube.com/embed/${embedMatch}`;

  const watchMatch = value.match(/[?&]v=([a-zA-Z0-9_-]{6,})/i)?.[1];
  if (watchMatch) return `https://www.youtube.com/embed/${watchMatch}`;

  const shortMatch = value.match(/youtu\.be\/([a-zA-Z0-9_-]{6,})/i)?.[1];
  if (shortMatch) return `https://www.youtube.com/embed/${shortMatch}`;

  return "";
}

function getYoutubeThumbnail(embedUrl?: string): string {
  const fallback = "/images/globe.png";
  const normalizedEmbed = toEmbedUrl(embedUrl);
  if (!normalizedEmbed) return fallback;
  const matchedId = normalizedEmbed.match(/\/embed\/([^?&/]+)/i)?.[1];
  if (!matchedId) return fallback;
  return `https://img.youtube.com/vi/${matchedId}/hqdefault.jpg`;
}

function getVideoHref(embedUrl?: string): string {
  const normalizedEmbed = toEmbedUrl(embedUrl);
  if (!normalizedEmbed) return "#";
  const matchedId = normalizedEmbed.match(/\/embed\/([^?&/]+)/i)?.[1];
  if (!matchedId) return normalizedEmbed;
  return `https://www.youtube.com/watch?v=${matchedId}`;
}

function getPlayerEmbedUrl(embedUrl?: string): string {
  const normalizedEmbed = toEmbedUrl(embedUrl);
  if (!normalizedEmbed) return "";
  const hasQuery = normalizedEmbed.includes("?");
  const joiner = hasQuery ? "&" : "?";
  return `${normalizedEmbed}${joiner}autoplay=1&controls=0&disablekb=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`;
}

export default function ReusableVideoCard({
  title,
  youtubeUrl,
  fallbackImageUrl,
  fallbackImageAlt,
  duration,
  description,
  priority = false,
  className = "",
  showTitleAndDescription = true,
}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const isMounted = typeof window !== "undefined";
  const safeTitle = title.trim() || "Untitled video";
  const safeDescription = description?.trim() || "";
  const safeDuration = duration?.trim() || "";
  const href = getVideoHref(youtubeUrl);
  const playerEmbedUrl = getPlayerEmbedUrl(youtubeUrl);
  const fallbackThumb = fallbackImageUrl || "/images/globe.png";
  const defaultThumbnailSrc = youtubeUrl ? getYoutubeThumbnail(youtubeUrl) : fallbackThumb;
  const [thumbnailSrc, setThumbnailSrc] = useState(defaultThumbnailSrc);
  const canPlay = Boolean(youtubeUrl && playerEmbedUrl);

  useEffect(() => {
    setThumbnailSrc(defaultThumbnailSrc);
  }, [defaultThumbnailSrc]);

  useEffect(() => {
    if (!isModalOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
        setIsVideoPlaying(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEsc);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [isModalOpen]);

  const postPlayerCommand = (command: "playVideo" | "pauseVideo") => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: [],
      }),
      "*",
    );
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setIsVideoPlaying(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsVideoPlaying(false);
  };

  const handleToggleVideo = () => {
    if (isVideoPlaying) {
      postPlayerCommand("pauseVideo");
      setIsVideoPlaying(false);
      return;
    }

    postPlayerCommand("playVideo");
    setIsVideoPlaying(true);
  };

  const handleThumbnailError = () => {
    // If YouTube thumbnail fails in production, immediately fall back to local/Sanity image.
    if (thumbnailSrc !== fallbackThumb) {
      setThumbnailSrc(fallbackThumb);
    }
  };

  return (
    <article className={className}>
      {canPlay ? (
        <button
          type="button"
          onClick={handleOpenModal}
          className="group relative block w-full overflow-hidden rounded-[10px] text-left"
          aria-label={`Play video: ${safeTitle}`}
        >
          <Image
            src={thumbnailSrc}
            alt={safeTitle}
            width={660}
            height={380}
            priority={priority}
            onError={handleThumbnailError}
            className="aspect-video w-full rounded-[10px] object-cover"
          />
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <span
              aria-hidden
              className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg"
            >
              <span className="ml-1 text-2xl leading-none">▶</span>
            </span>
          </span>
        </button>
      ) : (
        <Image
          src={thumbnailSrc}
          alt={fallbackImageAlt?.trim() || safeTitle}
          width={660}
          height={380}
          priority={priority}
          onError={handleThumbnailError}
          className="aspect-video w-full rounded-[10px] object-cover"
        />
      )}

      {showTitleAndDescription ? (
        <>
          <h4 className="mt-4 line-clamp-2 font-manrope text-[24px] font-semibold leading-[1.08] text-[#2B2F33]">{safeTitle}</h4>
          {safeDescription ? <p className="mt-3 line-clamp-4 text-[16px] leading-[1.45] text-[#4B5563]">{safeDescription}</p> : null}
        </>
      ) : null}

      <div className="mx-2 flex items-center gap-2 text-[16px] text-[#4B5563]">
        {canPlay ? (
          <button
            type="button"
            onClick={handleOpenModal}
            className="text-[#14B8A6] transition-opacity hover:opacity-80 my-2 "
            aria-label={`Play video: ${safeTitle}`}
          >
            ▶
          </button>
        ) : (
          <span aria-hidden className="text-[#14B8A6]">
            ▶
          </span>
        )}
        <span>Play Youtube Video</span>
        {safeDuration ? (
          <>
            <span aria-hidden>•</span>
            <span>{safeDuration}</span>
          </>
        ) : null}
      </div>

      {!isModalOpen && canPlay ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="sr-only">
          Open on YouTube
        </a>
      ) : null}

      {isMounted && isModalOpen && canPlay
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-gray-300/90 via-gray-350 to-gray-300/90 p-2 sm:p-4"
              role="dialog"
              aria-modal="true"
              aria-label={safeTitle}
            >
          <div className="relative w-[96%] max-w-[640px]">
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/45 text-white transition hover:bg-black/60"
              aria-label="Close video popup"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            </button>

            <div className="relative w-full overflow-hidden rounded-[10px]">
              <iframe
                ref={iframeRef}
                src={playerEmbedUrl}
                title={safeTitle}
                className="pointer-events-none aspect-video w-full rounded-[10px] border-0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen={false}
              />
              <button
                type="button"
                onClick={handleToggleVideo}
                className="absolute inset-0 z-10 block h-full w-full bg-transparent"
                aria-label={isVideoPlaying ? "Pause video" : "Play video"}
              />
            </div>
          </div>
            </div>,
            document.body,
          )
        : null}
    </article>
  );
}
