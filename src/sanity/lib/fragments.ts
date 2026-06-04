/**
 * Reusable GROQ projection fragments.
 * These are partial projections composed inside document-level queries in queries.ts.
 * They are NOT full GROQ queries (no leading `*[...]`).
 */

export const breadcrumbFragment = `
  breadcrumb{
    items[]{
      title,
      "href": "/" + link->slug.current
    }
  }
`

export const buttonFragment = `
  "label": text,
  "url": select(
    defined(link->slug.current) && link->_type == "conversionPages" => "/" + link->slug.current,
    defined(link->slug.current) => "/" + link->slug.current,
    defined(link.slug.current) && link._type == "conversionPages" => "/" + link.slug.current,
    defined(link.slug.current) => "/" + link.slug.current,
    defined(link.current) => "/" + link.current,
    defined(link) && link match "https?://*" => link,
    null
  ),
  buttonType
`

// Consolidated single asset dereference (avoids two separate joins for width + height)
export const homeHeroSectionFragment = `
  _type == "homeHeroSection" => {
    _type,
    heading,
    description,
    image{
      ...,
      "dimensions": asset->metadata.dimensions
    },
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    }
  }
`

export const homeRolesSectionFragment = `
  _type == "homeRolesSection" => {
    _type,
    heading,
    cards[]{
      tag,
      heading,
      description,
      linkText,
      "_linkType": linkUrl->_type,
      "_linkSlug": linkUrl->slug.current,
      icon{
        alt,
        "url": asset->url
      }
    }
  }
`

export const homeStatsSectionFragment = `
  _type == "homeStatsSection" => {
    _type,
    eyebrow,
    heading,
    description,
    background,
    stats[]{
      value,
      label
    }
  }
`

export const productHeroSectionFragment = `
  _type == "productHeroSection" => {
    _type,
    badge,
    heading,
    description,
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    },
    image
  }
`

export const featuresHeroSectionFragment = `
  _type == "featuresHeroSection" => {
    _type,
    badge,
    heading,
    description,
    ${breadcrumbFragment},
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    },
    image
  }
`

export const featuresCapabilitiesSectionFragment = `
  _type == "featuresCapabilitiesSection" => {
    _type,
    heading,
    subHeading,
    features{
      heading,
      layout,
      image,
      capabilities[]{
        _key,
        title,
        image,
        description
      }
    }
  }
`

export const ctaSectionDarkFragment = `
  _type == "ctaSectionDark" => {
    _type,
    heading,
    description,
    sideContent,
    primaryButton{
      ${buttonFragment}
    }
  }
`

export const featureGridSectionFragment = `
  _type == "featureGridSection" => {
    _type,
    eyebrow,
    heading,
    subHeading,
    headingAlignment,
    items[]{
      _key,
      eyebrow,
      title,
      description,
      "icon": icon{
        alt,
        "url": asset->url
      },
      link{
        label,
        "url": url->{
          _type,
          "slug": slug.current
        }
      }
    },
    footnote{text, linkLabel, linkUrl},
    theme
  }
`

export const clientLogosSectionFragment = `
  _type == "clientLogosSection" => {
    _type,
    logos[]{
      link,
      logo{
        alt,
        "url": asset->url
      }
    }
  }
`

export const caseStudiesSectionFragment = `
  _type == "caseStudiesSection" => {
    _type,
    heading,
    layout,
    caseStudies[]{
      _key,
      desc,
      quote,
      statistics[]{
        label,
        value
      },
      company,
      image{
        ...,
        alt
      },
      logoimage{
        ...,
        alt
      },
    }
  }
`

export const noMiddlemenSectionFragment = `
  _type == "noMiddlemenSection" => {
    _type,
    layout,
    headline,
    image,
    bodyContent
  }
`

export const ctaSectionFragment = `
  _type == "ctaSection" => {
    _type,
    theme,
    headline,
    description,
    buttons[]{
      ${buttonFragment}
    },
    buttonPosition,
    sideContent
  }
`

export const mediaContentSectionFragment = `
  _type == "mediaContentSection" => {
    _type,
    title,
    theme,
    items[]{
      _type,
      eyebrow,
      title,
      description,
      image,
      alt,
      imagePosition,
      linkText,
      "linkUrl": linkUrl->slug.current
    }
  }
`

export const platformDeepDiveSectionFragment = `
  _type == "platformDeepDiveSection" => {
    _type,
    heading,
    subheading,
    tabs[]{
      _key,
      label,
      image,
      items[]{
        _key,
        title,
        description,
        link{label, url}
      }
    }
  }
`

export const faqSectionFragment = `
  _type == "faqSection" => {
    _type,
    heading,
    "faqs": faqs[]->{
      _id,
      question,
      answer
    }
  }
`

export const pageHeroSectionFragment = `
  _type == "pageHeroSection" => {
    _type,
    heading,
    subheading,
    ${breadcrumbFragment},
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    }
  }
`

export const contentImageSectionFragment = `
  _type == "contentImageSection" => {
    _type,
    image,
    imagePosition,
    sectionTag,
    heading,
    content,
    primaryButton{
      ${buttonFragment},
    },
    theme
  }
`

export const problemSectionFragment = `
  _type == "problemSection" => {
    _type,
    sectionTag,
    heading,
    columns[]{
      _key,
      body
    },
    backgroundStyle
  }
`

export const statementSectionFragment = `
  _type == "statementSection" => {
    _type,
    sectionTag,
    heading,
    columns[]{
      _key,
      body
    }
  }
`

export const quoteBannerSectionFragment = `
  _type == "quoteBannerSection" => {
    _type,
    quote
  }
`

export const featureHighlightSectionFragment = `
  _type == "featureHighlightSection" => {
    _type,
    heading,
    subheading,
    content,
    image,
    primaryButton{
      ${buttonFragment}
    },
    buildSystems{
      heading,
      description,
      primaryButton{
        ${buttonFragment}
      },
      image{
        alt,
        asset,
        crop,
        hotspot
      }
    }
  }
`

export const careersSectionFragment = `
  _type == "careersSection" => {
    _type,
    sectionTag,
    heading,
    subheading
  }
`

export const teamSectionFragment = `
  _type == "teamSection" => {
    _type,
    heading,
    subheading,
    members[]->{
      _id,
      name,
      jobTitle,
      linkedinUrl,
      profileImage{
        alt,
        "url": asset->url
      }
    }
  }
`

export const centeredCalloutSectionFragment = `
  _type == "centeredCalloutSection" => {
    _type,
    heading,
    body,
    textLink{
      label,
      url
    }
  }
`

export const soc2Type2SectionFragment = `
  _type == "soc2Type2Section" => {
    _type,
    sectionTag,
    heading,
    body,
    image
  }
`

export const comparisonSectionFragment = `
  _type == "comparisonSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    items[]{
      _key,
      beforeText,
      afterText
    },
    primaryButton{
      ${buttonFragment}
    }
  }
`

export const splitContentSectionFragment = `
  _type == "splitContentSection" => {
    _type,
    sectionTag,
    heading,
    description,
    content,
    primaryButton{
      ${buttonFragment}
    },
    theme
  }
`

export const howItWorksSectionFragment = `
  _type == "howItWorksSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    steps[]{
      _key,
      title,
      description
    },
    primaryButton{
      ${buttonFragment}
    },
    theme
  }
`

export const featureCardsSectionFragment = `
  _type == "featureCardsSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    cards[]{
      _key,
      icon,
      title,
      description
    },
    primaryButton{
      ${buttonFragment}
    },
    image{
      ...,
      alt
    },
    theme
  }
`

export const integrationsSectionFragment = `
  _type == "integrationsSection" => {
    _type,
    sectionTag,
    heading,
    description
  }
`

export const videoTestimonialsSectionFragment = `
  _type == "videoTestimonialsSection" => {
    _type,
    heading,
    subheading,
    "testimonials": *[_type == "videoTestimonials" && !(_id in path("drafts.**"))] | order(_createdAt desc){
      _id,
      title,
      description,
      playtime,
      youtubeEmbedUrl,
      category
    }
  }
`

export const pageImageHeroSectionFragment = `
  _type == "pageImageHeroSection" => {
    _type,
    heading,
    subheading,
    ${breadcrumbFragment},
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    },
    image{
      ...,
      alt
    }
  }
`

export const coreCapabilitiesSectionFragment = `
  _type == "coreCapabilitiesSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    cards[]{
      _key,
      icon,
      title,
      description
    },
    primaryButton{
      ${buttonFragment}
    },
    theme
  }
`

export const outcomeSplitSectionFragment = `
  _type == "outcomeSplitSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    columns[]{
      _key,
      body
    }
  }
`

export const whoItsForSectionFragment = `
  _type == "whoItsForSection" => {
    _type,
    sectionTag,
    heading,
    subheading,
    items[]{
      _key,
      bestFor,
      notFor
    },
    primaryButton{
      ${buttonFragment}
    },
    theme
  }
`

export const imageOnlySectionFragment = `
  _type == "imageOnlySection" => {
    _type,
    heading,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    }
  }
`

export const industriesHeroSectionFragment = `
  _type == "industriesHeroSection" => {
    _type,
    heading,
    image{
      ...,
      alt
    },
    primaryButton{
      ${buttonFragment}
    },
    secondaryButton{
      ${buttonFragment}
    },
    content
  }
`

export const builtForRemoteSectionFragment = `
  _type == "builtForRemoteSection" => {
    _type,
    heading,
    description,
    tags[]{
      icon{
        alt,
        "url": asset->url
      },
      label
    },
    primaryButton{
      ${buttonFragment}
    },
    statementLines
  }
`

export const contactSectionFragment = `
  _type == "contactSection" => {
    _type,
    heading,
    address,
    phone,
    email,
    badge{
      image{
        ...,
        alt,
        "url": asset->url
      },
      label
    }
  }
`

export const scheduleDemoSectionFragment = `
  _type == "scheduleDemoSection" => {
    _type,
    sectionTag,
    heading,
    description,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    },
    bottomLineContent,
    badge{
      label,
      image{
        ...,
        alt,
        "url": asset->url
      }
    }
  }
`

export const whitePaperHeroSectionFragment = `
  _type == "whitePaperHeroSection" => {
    _type,
    heading,
    description,
    image{
      ...,
      alt,
      "lqip": asset->metadata.lqip,
      "dimensions": asset->metadata.dimensions
    }
  }
`

export const roiCalculatorSectionFragment = `
  _type == "roiCalculatorSection" => {
    _type,
    sectionTag,
    heading,
    description
  }
`
