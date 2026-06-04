import 'server-only'

import * as queryStore from '@sanity/react-loader'
import { draftMode } from 'next/headers'

import { client } from '@/src/sanity/lib/client'
import {
  homeQuery,
  integrationsQuery,
  integrationsSlugsQuery,
  allIntegrationsQuery,
  integrationsPageQuery,
  blogPageQuery,
  blogPostsQuery,
  blogCategoriesQuery,
  blogPostBySlugQuery,
  blogPostSlugsQuery,
  caseStudiesQuery,
  caseStudiesAllQuery,
  caseStudiesPageQuery,
  whitePapersPageQuery,
  whitePapersListQuery,
  whitePaperBySlugQuery,
  whitePaperSlugsQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  videoTestimonialsPageQuery,
  pageQuery,
  pageSlugsQuery,
  legalPageQuery,
  legalPageSlugsQuery,
  legalLandingPageQuery,
  legalLandingPageSlugsQuery,
  industriesQuery,
  industriesSlugsQuery,
  productQuery,
  productSlugsQuery,
  conversionPagesQuery,
  conversionPagesSlugsQuery,
  settingsQuery,
} from '@/src/sanity/lib/queries'
import type { CaseStudyListDocument } from '@/src/sanity/lib/mapCaseStudiesForSection'
import { token } from '@/src/sanity/lib/token'

const serverClient = client.withConfig({
  token,
  // Enable stega in Vercel preview deployments.
  stega: process.env.VERCEL_ENV === 'preview',
})

/**
 * Ensure server-side fetching for production data loading.
 */
queryStore.setServerClient(serverClient)

const usingCdn = serverClient.config().useCdn

type LoadQueryOptions = NonNullable<Parameters<typeof queryStore.loadQuery>[2]> & {
  /**
   * Set true when calling from `generateStaticParams` or other build-time code.
   * Avoids `draftMode()`, which Next.js does not allow outside a request.
   */
  staticGeneration?: boolean
}

export async function loadQuery(
  query: string,
  params: Parameters<typeof queryStore.loadQuery>[1] = {},
  options: LoadQueryOptions = {},
) {
  const { staticGeneration, ...loaderOptions } = options

  const draft = staticGeneration ? { isEnabled: false as const } : await draftMode()

  const perspective =
    loaderOptions.perspective ?? (draft.isEnabled ? 'previewDrafts' : 'published')

  const stega = loaderOptions.stega !== undefined ? loaderOptions.stega : draft.isEnabled

  // CDN mode (no webhook secret): short time-based ISR – CDN provides freshness.
  // Webhook mode (no CDN): cache indefinitely and rely on revalidateTag from the
  // /api/revalidate route handler to purge stale entries on content changes.
  // Fall back to 3600s if no tags are present so we never serve infinitely-stale content.
  const hasTags =
    Array.isArray(loaderOptions.next?.tags) && loaderOptions.next.tags.length > 0
  const revalidate: NextFetchRequestConfig['revalidate'] = usingCdn
    ? 60
    : hasTags
      ? false
      : 3600

  return queryStore.loadQuery(query, params, {
    ...loaderOptions,
    next: {
      revalidate,
      ...(loaderOptions.next || {}),
    },
    perspective,
    stega,
  })
}

/**
 * Home singleton loader.
 */
export function loadHome() {
  return loadQuery(homeQuery, {}, { next: { tags: ['home'] } })
}

export function loadProduct(slug: string) {
  return loadQuery(productQuery, { slug }, { next: { tags: ['product', `product:${slug}`] } })
}

export function loadProductSlugs() {
  return loadQuery(productSlugsQuery, {}, {
    next: { tags: ['product'] },
    staticGeneration: true,
  })
}

export function loadPage(slug: string) {
  return loadQuery(pageQuery, { slug }, { next: { tags: ['page', `page:${slug}`] } })
}

export function loadPageSlugs() {
  return loadQuery(pageSlugsQuery, {}, {
    next: { tags: ['page'] },
    staticGeneration: true,
  })
}

export function loadLegalPage(slug: string) {
  return loadQuery(legalPageQuery, { slug }, { next: { tags: ['legalPage', `legalPage:${slug}`] } })
}

export function loadLegalPageSlugs() {
  return loadQuery(legalPageSlugsQuery, {}, {
    next: { tags: ['legalPage'] },
    staticGeneration: true,
  })
}

export function loadLegalLandingPage(slug: string) {
  return loadQuery(
    legalLandingPageQuery,
    { slug },
    { next: { tags: ['legalLandingPages', `legalLandingPages:${slug}`] } },
  )
}

export function loadLegalLandingPageSlugs() {
  return loadQuery(legalLandingPageSlugsQuery, {}, {
    next: { tags: ['legalLandingPages'] },
    staticGeneration: true,
  })
}

export function loadIndustry(slug: string) {
  return loadQuery(industriesQuery, { slug }, { next: { tags: ['industries', `industries:${slug}`] } })
}

export function loadIndustrySlugs() {
  return loadQuery(industriesSlugsQuery, {}, {
    next: { tags: ['industries'] },
    staticGeneration: true,
  })
}

export function loadIntegrationsPage() {
  return loadQuery(integrationsPageQuery, {}, { next: { tags: ['integrationsPage'] } })
}

export function loadIntegration(slug: string) {
  return loadQuery(integrationsQuery, { slug }, { next: { tags: ['integrations', `integrations:${slug}`] } })
}

export function loadIntegrationSlugs() {
  return loadQuery(integrationsSlugsQuery, {}, {
    next: { tags: ['integrations'] },
    staticGeneration: true,
  })
}

export function loadAllIntegrations() {
  return loadQuery(allIntegrationsQuery, {}, { next: { tags: ['integrations'] } })
}

export function loadVideoTestimonialsPage() {
  return loadQuery(videoTestimonialsPageQuery, {}, { next: { tags: ['videoTestimonialsPage'] } })
}

export function loadBlogPage() {
  return loadQuery(blogPageQuery, {}, { next: { tags: ['blogPage'] } })
}

export function loadCaseStudiesPage() {
  return loadQuery(caseStudiesPageQuery, {}, { next: { tags: ['caseStudiesPage'] } })
}

export function loadWhitePapersPage() {
  return loadQuery(whitePapersPageQuery, {}, { next: { tags: ['whitePapersPage'] } })
}

export function loadWhitePapersList() {
  return loadQuery(whitePapersListQuery, {}, { next: { tags: ['whitePapers'] } })
}

export function loadWhitePaper(slug: string) {
  return loadQuery(
    whitePaperBySlugQuery,
    { slug },
    { next: { tags: ['whitePapers', `whitePapers:${slug}`] } },
  )
}

export function loadWhitePaperSlugs() {
  return loadQuery(whitePaperSlugsQuery, {}, {
    next: { tags: ['whitePapers'] },
    staticGeneration: true,
  })
}

export function loadCaseStudies() {
  return loadQuery(caseStudiesQuery, {}, { next: { tags: ['caseStudy'] } })
}

export function loadCaseStudiesall() {
  return loadQuery(caseStudiesAllQuery, {}, { next: { tags: ['caseStudy'] } })
}

/** Published `caseStudy` documents for listings and flexible sections (same query as `loadCaseStudies`). */
export async function getAllCaseStudies(): Promise<CaseStudyListDocument[]> {
  const { data } = await loadCaseStudies()
  return (data as CaseStudyListDocument[] | null | undefined) ?? []
}

export function loadCaseStudy(slug: string) {
  return loadQuery(caseStudyBySlugQuery, { slug }, { next: { tags: ['caseStudy', `caseStudy:${slug}`] } })
}

export function loadCaseStudySlugs() {
  return loadQuery(caseStudySlugsQuery, {}, {
    next: { tags: ['caseStudy'] },
    staticGeneration: true,
  })
}

export function loadBlogPosts() {
  return loadQuery(blogPostsQuery, {}, { next: { tags: ['post'] } })
}

export function loadBlogCategories() {
  return loadQuery(blogCategoriesQuery, {}, { next: { tags: ['category'] } })
}

export function loadBlogPost(slug: string) {
  return loadQuery(blogPostBySlugQuery, { slug }, { next: { tags: ['post', `post:${slug}`] } })
}

export function loadPostSlugs() {
  return loadQuery(blogPostSlugsQuery, {}, {
    next: { tags: ['post'] },
    staticGeneration: true,
  })
}

export function loadConversionPage(slug: string) {
  return loadQuery(conversionPagesQuery, { slug }, { next: { tags: ['conversionPages', `conversionPages:${slug}`] } })
}

export function loadConversionPageSlugs() {
  return loadQuery(conversionPagesSlugsQuery, {}, {
    next: { tags: ['conversionPages'] },
    staticGeneration: true,
  })
}

export function loadSettings() {
  return loadQuery(settingsQuery, {}, { next: { tags: ['settings'] } })
}
