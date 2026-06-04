/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const isDev = process.env.NODE_ENV === "development";

const nextConfig = withBundleAnalyzer({
  logging: {
    browserToTerminal: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // Optimize initial page load by reducing redirects processing time
  trailingSlash: true,

  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 20, 32, 48, 60, 64, 96, 128, 256, 384],
    // Must include every `quality` passed to `next/image` and values Next may request for remote URLs.
    qualities: [20, 25, 50, 60, 65, 70, 72, 75, 78, 80, 82, 85, 86, 88, 90],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
    unoptimized: isDev, // 🚀 Disable optimization in dev to skip caching
    minimumCacheTTL: isDev ? 0 : 60 * 60 * 24, // 0 in dev, 1 day in prod
  },
  experimental: {
    // Enables "use cache" directive and component-level Data Cache in Next.js 16.
    cacheComponents: true,
    optimizeCss: isDev
      ? false
      : {
          pruneSource: true,
          mergeStylesheets: true,
          preload: 'swap',
        },
  },

  // Enable compression for faster response
  compress: true,
  poweredByHeader: false,
  output: "standalone",
  
  // Optimize build output
  productionBrowserSourceMaps: false,

  async headers() {
    return isDev
      ? [
          // 🚫 Disable caching for everything in development
          {
            source: "/(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "no-store, no-cache, must-revalidate, proxy-revalidate",
              },
            ],
          },
        ]
      : [
          // ✅ Catch-all first — specific rules below override it (last-match wins)
          {
            source: "/(.*)",
            headers: [
              { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
            ],
          },
          // Next.js image optimizer — 24 h browser, 7 d CDN, stale-while-revalidate
          {
            source: "/_next/image(.*)",
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
              },
            ],
          },
          // Hashed build assets — immutable forever
          {
            source: "/_next/static/(.*)",
            headers: [
              { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
          },
          // Public static assets: images (webp, avif, png, jpg, svg), fonts, PDFs
          {
            source: "/fonts/(.*)",
            headers: [
              { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
          },
          {
            source: "/images/(.*)",
            headers: [
              { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
            ],
          },
        ];
  },
});

export default nextConfig;
