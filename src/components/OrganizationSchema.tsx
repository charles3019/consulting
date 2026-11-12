import { SITE_NAME, SITE_URL } from "@/lib/seo";
import { BUSINESS } from "@/lib/business";

export default function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/connectforge-logo.png`,
        description: "Websites, applications, network engineering, network installations, CCTV, IT support and field engineering services for UK businesses.",
        telephone: BUSINESS.phoneE164,
        areaServed: [
          ...BUSINESS.areaList.map((name) => ({ "@type": "Place", name })),
          { "@type": "Country", name: "United Kingdom" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: BUSINESS.phoneE164,
          contactType: "customer service",
          areaServed: "GB",
          availableLanguage: "en-GB",
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
        founder: [
          { "@type": "Person", name: "Charles Agyemang" },
          { "@type": "Person", name: "Ammayu Waktole" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-GB",
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
