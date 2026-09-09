import type { Metadata } from "next";

export const SITE_URL = "https://connectforge.co.uk";
export const SITE_NAME = "ConnectForge Technologies Ltd";

export const publicPages = {
  home: { path: "/", title: "Networks, Web Development & Automation", description: "ConnectForge Technologies Ltd builds secure networks, modern websites, business automations and custom applications for growing organisations." },
  about: { path: "/about", title: "About Our Team", description: "Meet Charles Agyemang and Ammayu Waktole, the founders of ConnectForge Technologies Ltd, and explore our engineering experience and mission." },
  services: { path: "/services", title: "Network, Web & Automation Services", description: "Explore network engineering, web development, cloud infrastructure, business automation and application development services from ConnectForge." },
  skills: { path: "/skills", title: "Technical Skills & Capabilities", description: "Explore ConnectForge's capabilities in networks, Linux, cloud platforms, automation, web development and Microsoft Power Platform." },
  portfolio: { path: "/portfolio", title: "Technology Project Portfolio", description: "Explore ConnectForge projects covering infrastructure automation, cloud engineering, business applications and operational reporting." },
  testimonials: { path: "/testimonials", title: "Client Testimonials", description: "Read client feedback on ConnectForge's infrastructure, cloud, automation and application development work." },
  contact: { path: "/contact", title: "Contact ConnectForge", description: "Discuss your network, website, automation or application project with ConnectForge Technologies Ltd. Contact our team to plan your next step." },
  "book-consultation": { path: "/book-consultation", title: "Book a Technology Consultation", description: "Book a consultation with ConnectForge to discuss infrastructure, network engineering, web development, automation or custom business applications." },
  blog: { path: "/blog", title: "Engineering Blog", description: "Engineering article previews covering Linux, cloud, DevOps and automation.", index: false },
  resources: { path: "/resources", title: "Engineering Resources", description: "Explore planned engineering checklists, templates and technical resources.", index: false },
} satisfies Record<string, { path: string; title: string; description: string; index?: boolean }>;

export function createPageMetadata(path: string, title: string, description: string, index = true): Metadata {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const url = new URL(path, SITE_URL).href;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: { index, follow: true },
    openGraph: {
      type: "website", locale: "en_GB", siteName: SITE_NAME,
      title: fullTitle, description, url,
      images: [{ url: `${SITE_URL}/connectforge-logo.png`, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary", title: fullTitle, description,
      images: [`${SITE_URL}/connectforge-logo.png`],
    },
  };
}

export function getStaticPageMetadata(key: keyof typeof publicPages): Metadata {
  const page = publicPages[key];
  return createPageMetadata(page.path, page.title, page.description, !("index" in page) || page.index);
}
