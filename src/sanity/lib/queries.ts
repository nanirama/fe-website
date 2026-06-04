import { groq } from 'next-sanity'

import {
  buttonFragment,
  homeHeroSectionFragment,
  homeRolesSectionFragment,
  homeStatsSectionFragment,
  productHeroSectionFragment,
  featuresHeroSectionFragment,
  featuresCapabilitiesSectionFragment,
  ctaSectionDarkFragment,
  featureGridSectionFragment,
  clientLogosSectionFragment,
  caseStudiesSectionFragment,
  noMiddlemenSectionFragment,
  ctaSectionFragment,
  mediaContentSectionFragment,
  platformDeepDiveSectionFragment,
  faqSectionFragment,
  pageHeroSectionFragment,
  contentImageSectionFragment,
  problemSectionFragment,
  statementSectionFragment,
  quoteBannerSectionFragment,
  featureHighlightSectionFragment,
  careersSectionFragment,
  teamSectionFragment,
  centeredCalloutSectionFragment,
  soc2Type2SectionFragment,
  comparisonSectionFragment,
  splitContentSectionFragment,
  howItWorksSectionFragment,
  featureCardsSectionFragment,
  integrationsSectionFragment,
  videoTestimonialsSectionFragment,
  pageImageHeroSectionFragment,
  coreCapabilitiesSectionFragment,
  outcomeSplitSectionFragment,
  whoItsForSectionFragment,
  imageOnlySectionFragment,
  industriesHeroSectionFragment,
  builtForRemoteSectionFragment,
  contactSectionFragment,
  scheduleDemoSectionFragment,
  whitePaperHeroSectionFragment,
  roiCalculatorSectionFragment,
} from './fragments'

export const productQuery = groq`
  *[_type == "product" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    parent->{
      title,
      "slug": slug.current
    },
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${productHeroSectionFragment},
      ${featuresHeroSectionFragment},
      ${featureGridSectionFragment},
      ${featuresCapabilitiesSectionFragment},
      ${platformDeepDiveSectionFragment},
      ${clientLogosSectionFragment},
      ${caseStudiesSectionFragment},
      ${ctaSectionFragment},
      ${ctaSectionDarkFragment},
      ${faqSectionFragment},
      ${mediaContentSectionFragment},
      ${homeStatsSectionFragment},
      ${noMiddlemenSectionFragment}
    }
  }
`

export const productSlugsQuery = groq`
  *[_type == "product" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const pageQuery = groq`
  *[_type == "pages" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${featuresCapabilitiesSectionFragment},
      ${ctaSectionDarkFragment},
      ${mediaContentSectionFragment},
      ${homeStatsSectionFragment},
      ${faqSectionFragment},
      ${pageHeroSectionFragment},
      ${contentImageSectionFragment},
      ${problemSectionFragment},
      ${statementSectionFragment},
      ${quoteBannerSectionFragment},
      ${featureHighlightSectionFragment},
      ${careersSectionFragment},
      ${teamSectionFragment},
      ${centeredCalloutSectionFragment},
      ${soc2Type2SectionFragment},
      ${comparisonSectionFragment},
      ${howItWorksSectionFragment},
      ${whoItsForSectionFragment},
      ${splitContentSectionFragment},
      ${imageOnlySectionFragment},
      ${ctaSectionFragment},
      ${featureGridSectionFragment},
      ${featureCardsSectionFragment},
      ${caseStudiesSectionFragment},
    }
  }
`

export const pageSlugsQuery = groq`
  *[_type == "pages" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const legalPagesQuery = groq`
  *[_type == "legalPages" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          href,
          blank
        }
      }
    }
  }
`

export const legalPagesSlugsQuery = groq`
  *[_type == "legalPages" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const homeQuery = groq`
  *[_type == "home" && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${homeHeroSectionFragment},
      ${homeRolesSectionFragment},
      ${homeStatsSectionFragment},
      ${clientLogosSectionFragment},
      ${caseStudiesSectionFragment},
      ${noMiddlemenSectionFragment},
      ${ctaSectionFragment},
      ${mediaContentSectionFragment}
    }
  }
`

export const integrationsPageQuery = groq`
  *[_type == "integrationsPage" && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${pageHeroSectionFragment},
      ${featureGridSectionFragment},
      ${soc2Type2SectionFragment},
      ${integrationsSectionFragment},
      ${ctaSectionFragment},
      ${splitContentSectionFragment}
    }
  }
`

export const integrationsQuery = groq`
  *[_type == "integrations" && slug.current == $slug && listingOnly != true && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${pageImageHeroSectionFragment},
      ${coreCapabilitiesSectionFragment},
      ${howItWorksSectionFragment},
      ${ctaSectionFragment},
      ${splitContentSectionFragment},
      ${featureCardsSectionFragment},
      ${outcomeSplitSectionFragment}
    }
  }
`

export const integrationsSlugsQuery = groq`
  *[_type == "integrations" && defined(slug.current) && listingOnly != true && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const allIndustriesQuery = groq`
  *[_type == "industries" && defined(slug.current) && !(_id in path("drafts.**"))] | order(orderBy asc, title asc){
    title,
    "slug": slug.current,
    shortDescription,
    image{
      ...,
      alt
    }
  }
`

export const allIntegrationsQuery = groq`
  *[_type == "integrations" && !(_id in path("drafts.**"))] | order(title asc){
    _id,
    title,
    listingOnly,
    "slug": slug.current,
    shortDescription,
    image{
      ...,
      alt
    }
  }
`

export const videoTestimonialsPageQuery = groq`
  *[_type == "videoTestimonialsPage" && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${videoTestimonialsSectionFragment},
      ${ctaSectionFragment}
    }
  }
`

export const blogPageQuery = groq`
  *[_type == "blogPage" && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const caseStudiesPageQuery = groq`
  *[_type == "caseStudiesPage" && !(_id in path("drafts.**"))][0]{
    _id,
    name,
    description,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const whitePapersPageQuery = groq`
  *[_type == "whitePapersPage" && !(_id in path("drafts.**"))][0]{
    _id,
    name,
    description,
    image{
      ...,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
    content,
    ctaButton{
      ${buttonFragment}
    },
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const whitePapersListQuery = groq`
  *[_type == "whitePapers" && defined(slug.current) && !(_id in path("drafts.**"))] | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    }
  }
`

export const whitePaperSlugsQuery = groq`
  *[_type == "whitePapers" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`
export const caseStudiesAllQuery = groq`
  *[_type == "caseStudy" && !(_id in path("drafts.**"))] | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    tags,
    industry,
    image{
      ...,
      alt
    },
    logoimage{
      ...,
      alt
    },
    shortDescription,
    statistics[]{
      label,
      value
    },
    clientName,
    clientJobTitle,
    clientTestimonial,
    clientImage{
      ...,
      alt
    },
    youtubeVideoUrl,
    videoDuration
  }
`
export const caseStudiesQuery = groq`
  *[_type == "caseStudy" && defined(clientTestimonial) && !(_id in path("drafts.**"))] | order(_createdAt desc){
    _id,
    name,
    "slug": slug.current,
    tags,
    industry,
    image{
      ...,
      alt
    },
    logoimage{
      ...,
      alt
    },
    shortDescription,
    statistics[]{
      label,
      value
    },
    clientName,
    clientJobTitle,
    clientTestimonial,
    clientImage{
      ...,
      alt
    },
    youtubeVideoUrl,
    videoDuration
  }
`

/** Single case study document for /case-studies/[slug] (full content + SEO). */
export const caseStudyBySlugQuery = groq`
  *[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    _updatedAt,
    name,
    "slug": slug.current,
    tags,
    industry,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
    "caseStudyPdfUrl": caseStudyPdf.asset->url,
    logoimage{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
    statistics[]{
      label,
      value
    },
    metricHighlights{
      stats[]{
        _key,
        heading,
        description
      }
    },
    introduction{
      introContent
    },
    challenges{
      image{
        ...,
        alt,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      },
      challengesContent
    },
    solutions{
      image{
        ...,
        alt,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      },
      solutionsContent
    },
    results{
      image{
        ...,
        alt,
        "lqip": asset->metadata.lqip,
        "dimensions": asset->metadata.dimensions
      },
      resultsContent,
      primaryButton{
        ${buttonFragment}
      }
    },
    clientName,
    clientJobTitle,
    clientTestimonial,
    clientImage{
      ...,
      alt
    },
    youtubeVideoUrl,
    videoDuration,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const caseStudySlugsQuery = groq`
  *[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const blogPostsQuery = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    mainImage{
      ...,
      alt
    },
    author->{
      _id,
      name,
      title
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    }
  }
`

export const blogCategoriesQuery = groq`
  *[_type == "category" && defined(slug.current) && !(_id in path("drafts.**"))] | order(title asc) {
    _id,
    title,
    "slug": slug.current
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    readTime,
    mainImage{
      ...,
      alt
    },
    author->{
      name,
      title,
      image{
        ...,
        alt
      }
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current
    },
    body,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const blogPostSlugsQuery = groq`
  *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const legalPageQuery = groq`
  *[_type == "legalPages" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    content,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    }
  }
`

export const legalPageSlugsQuery = groq`
  *[_type == "legalPages" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const legalLandingPageQuery = groq`
  *[_type == "legalLandingPages" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    documentDetails,
    printDetails,
    contents[]{
      _key,
      title,
      description
    }
  }
`

export const legalLandingPageSlugsQuery = groq`
  *[_type == "legalLandingPages" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const industriesQuery = groq`
  *[_type == "industries" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${industriesHeroSectionFragment},
      ${contentImageSectionFragment},
      ${builtForRemoteSectionFragment},
      ${clientLogosSectionFragment},
      ${caseStudiesSectionFragment},
      ${imageOnlySectionFragment},
      ${featureCardsSectionFragment},
      ${faqSectionFragment},
      ${ctaSectionFragment},
      ${featureGridSectionFragment}
    }
  }
`

export const industriesSlugsQuery = groq`
  *[_type == "industries" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

export const whitePaperBySlugQuery = groq`
  *[_type == "whitePapers" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    name,
    "slug": slug.current,
    shortDescription,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${whitePaperHeroSectionFragment},
      ${scheduleDemoSectionFragment}
    }
  }
`

export const conversionPagesQuery = groq`
  *[_type == "conversionPages" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
    _id,
    title,
    "slug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      "metaImage": shareImage.asset->url + "?w=1200&h=630&fit=crop"
    },
    sections[]{
      _type,
      ${pageHeroSectionFragment},
      ${soc2Type2SectionFragment},
      ${featureGridSectionFragment},
      ${comparisonSectionFragment},
      ${clientLogosSectionFragment},
      ${caseStudiesSectionFragment},
      ${contactSectionFragment},
      ${scheduleDemoSectionFragment},
      ${roiCalculatorSectionFragment}
    }
  }
`

export const conversionPagesSlugsQuery = groq`
  *[_type == "conversionPages" && defined(slug.current) && !(_id in path("drafts.**"))]{
    "slug": slug.current
  }
`

// Minimal query for the Header — only the 4 nav sections it renders.
// settingsQuery also pulls footer fields (footerNote, socialLinks, copyright,
// footerMenu, legalNav) which the header never uses. This query skips them.
export const headerQuery = groq`
  *[_type == "settings"][0]{
    productsTitle,
    productsDescription,
    "productNav": productNav[]{
      title,
      "_type": link->_type,
      "slug": link->slug.current,
      "featuresNav": featuresNav[]{
        title,
        "_type": link->_type,
        "slug": link->slug.current
      }
    },
    industriesTitle,
    industriesDescription,
    "industriesNav": industriesNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current,
      image
    },
    companyTitle,
    companyDescription,
    "companyNav": companyNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current
    },
    resourcesTitle,
    resourcesDescription,
    "resourcesNav": resourcesNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current
    }
  }
`

// Minimal query for the Footer — only the 5 fields it actually renders.
// Using settingsQuery here would pull in the full header mega-menu data
// (productNav, industriesNav with images, companyNav, resourcesNav) which
// the footer never uses, adding unnecessary payload and parse time.
export const footerQuery = groq`
  *[_type == "settings"][0]{
    footerNote,
    "socialLinks": socialLinks[]{
      platform,
      url
    },
    copyright,
    "footerMenu": footerMenu[]{
      menuTitle,
      "navItems": navItems[]{
        title,
        "_type": link->_type,
        "slug": link->slug.current
      }
    },
    "legalNav": legalNav[]{
      title,
      "_type": link->_type,
      "slug": link->slug.current
    }
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    productsTitle,
    productsDescription,
    "productNav": productNav[]{
      title,
      "_type": link->_type,
      "slug": link->slug.current,
      "featuresNav": featuresNav[]{
        title,
        "_type": link->_type,
        "slug": link->slug.current
      }
    },
    industriesTitle,
    industriesDescription,
    "industriesNav": industriesNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current,
      image
    },
    companyTitle,
    companyDescription,
    "companyNav": companyNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current
    },
    resourcesTitle,
    resourcesDescription,
    "resourcesNav": resourcesNav[]{
      title,
      description,
      "_type": link->_type,
      "slug": link->slug.current
    },
    footerNote,
    "socialLinks": socialLinks[]{
      platform,
      url
    },
    copyright,
    "footerMenu": footerMenu[]{
      menuTitle,
      "navItems": navItems[]{
        title,
        "_type": link->_type,
        "slug": link->slug.current
      }
    },
    "legalNav": legalNav[]{
      title,
      "_type": link->_type,
      "slug": link->slug.current
    }
  }
`
