import { SITE_NAME, SITE_URL } from "@/lib/seo";

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
