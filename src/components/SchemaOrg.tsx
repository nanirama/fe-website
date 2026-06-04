const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.fieldequip.com/#organization",
  name: "FieldEquip",
  url: "https://www.fieldequip.com",
  logo: {
    "@type": "ImageObject",
    url: "https://www.fieldequip.com/images/logowhite.svg",
    width: 300,
    height: 60,
  },
  image: "https://www.fieldequip.com/images/logowhite.svg",
  description:
    "FieldEquip is a cloud-based field service management (FSM) SaaS platform that connects field technicians, back-office teams, customers, and equipment through intelligent digital workflows — improving operational efficiency, accelerating cash flow, and enhancing customer satisfaction.",
  foundingDate: "2016",
  founder: {
    "@type": "Person",
    name: "Prat Gupta",
    jobTitle: "Founder & CEO",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 51,
    maxValue: 200,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1011 S. Hwy. 6, Suite 117",
    addressLocality: "Houston",
    addressRegion: "TX",
    postalCode: "77077",
    addressCountry: "US",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+1-281-815-4314",
      contactType: "sales",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      url: "https://www.fieldequip.com/demo/",
      contactType: "sales",
      description: "Schedule a Demo",
    },
  ],
  sameAs: [
    "https://www.linkedin.com/company/fieldequip",
    "https://www.facebook.com/fieldequip/",
    "https://x.com/fieldequip",
    "https://www.youtube.com/channel/UC1u9YvUmQ3mqvfVTKg4BApQ",
    "https://www.instagram.com/fieldequipfsm/",
  ],
  knowsAbout: [
    "Field Service Management",
    "Work Order Management",
    "Asset Service Management",
    "Field Ticketing",
    "Mobile Field Service",
    "Preventive Maintenance",
    "Parts Inventory Management",
    "Scheduling and Dispatch",
    "Service Contract Management",
    "Equipment Rental Management",
    "Workflow Automation",
    "Field Service Invoicing",
    "AI-Powered Field Documentation",
  ],
  areaServed: "Worldwide",
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
