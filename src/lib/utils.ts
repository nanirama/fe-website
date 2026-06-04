export function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function getSlugUrl(type: string, slug?: string): string {
  switch (type) {
    // Catch-all [slug] route — slug is the full path segment
    case "pages":
    case "page":
    case "product":
    case "industries":
    case "legalPages":
    case "conversionPages":
    case "post":
      return slug ? `/${slug}` : "/"

    // Prefixed slug routes
    case "integrations":
      return slug ? `/integrations/${slug}` : "/integrations"
    case "caseStudy":
      return slug ? `/case-study/${slug}` : "/case-studies"
    case "whitePapers":
      return slug ? `/whitepaper/${slug}` : "/whitepaper"

    // Singletons — slug unused
    case "integrationsPage":
      return "/integrations"
    case "caseStudiesPage":
      return "/case-studies"
    case "whitePapersPage":
      return "/whitepaper"
    case "blogPage":
      return "/blog"
    case "videoTestimonialsPage":
      return "/videos-testimonials"

    default:
      return slug ? `/${slug}` : "/"
  }
}