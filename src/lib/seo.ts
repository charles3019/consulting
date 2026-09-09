import type { Metadata } from "next";

export const SITE_URL = "https://connectforge.co.uk";
export const BRAND_NAME = "ConnectForge IT Services";
export const SITE_NAME = BRAND_NAME;

export const publicPages = {
  home: {
    path: "/",
    title: "ConnectForge IT Services | IT Support, Networks, Websites & CCTV",
    description:
      "ConnectForge IT Services provides website development, applications, network engineering, structured cabling, CCTV installation, IT support and field engineering services across the UK.",
  },
  about: {
    path: "/about",
    title: "About ConnectForge IT Services | UK Technology Team",
    description:
      "Meet Charles Agyemang and Ammayu Waktole, co-founders of ConnectForge IT Services.",
  },
  services: {
    path: "/services",
    title: "IT Services | Networks, Websites, CCTV & Support | ConnectForge",
    description:
      "Explore websites, applications, network engineering, structured cabling, CCTV, IT support and field engineering for UK businesses.",
  },
  skills: {
    path: "/skills",
    title: "Technical Skills & Capabilities",
    description:
      "Explore ConnectForge's capabilities in networks, Linux, cloud platforms, automation, web development and Microsoft Power Platform.",
  },
  portfolio: {
    path: "/portfolio",
    title: "Our Work | Engineering Projects & Solutions",
    description:
      "Explore clearly labelled internal labs, demonstration applications and engineering examples from ConnectForge.",
  },
  testimonials: {
    path: "/testimonials",
    title: "Client Reviews Coming Soon",
    description:
      "We will publish verified customer feedback with permission as our portfolio grows.",
    index: false,
  },
  contact: {
    path: "/contact",
    title: "Get a Free IT Quote | ConnectForge IT Services",
    description:
      "Tell our UK technology team about your website, application, network, installation, CCTV, IT support or field engineering requirements.",
  },
  "book-consultation": {
    path: "/book-consultation",
    title: "Book a Technology Consultation",
    description:
      "Book a consultation with ConnectForge to discuss infrastructure, network engineering, web development, automation or custom business applications.",
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How ConnectForge IT Services handles enquiry information, quotations and service records, and how to contact us about your data.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Starter terms covering quotations, project scope, payment, equipment, support and customer responsibilities for ConnectForge services.",
  },
  cookies: {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "Information about essential administrator authentication cookies and the current use of cookies on the ConnectForge website.",
  },
  blog: {
    path: "/blog",
    title: "Engineering Blog",
    description:
      "Engineering article previews covering Linux, cloud, DevOps and automation.",
    index: false,
  },
  resources: {
    path: "/resources",
    title: "Engineering Resources",
    description:
      "Explore planned engineering checklists, templates and technical resources.",
    index: false,
  },
} satisfies Record<
  string,
  { path: string; title: string; description: string; index?: boolean }
>;

export function createPageMetadata(
  path: string,
  title: string,
  description: string,
  index = true,
): Metadata {
  const fullTitle =
    title.includes(SITE_NAME) || title.endsWith("| ConnectForge")
      ? title
      : `${title} | ${SITE_NAME}`;
  const url = new URL(path, SITE_URL).href;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      url,
      images: [{ url: `${SITE_URL}/connectforge-logo.png`, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary",
      title: fullTitle,
      description,
      images: [`${SITE_URL}/connectforge-logo.png`],
    },
  };
}

export function getStaticPageMetadata(key: keyof typeof publicPages): Metadata {
  const page = publicPages[key];
  return createPageMetadata(
    page.path,
    page.title,
    page.description,
    !("index" in page) || page.index,
  );
}
