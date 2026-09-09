export interface PageContent {
  page_key: string;
  title: string;
  meta_description: string;
  keywords: string;
  hero_title: string;
  hero_subtitle: string;
  body_text: string;
}

export const staticDefaults: Record<string, PageContent> = {
  home: {
    page_key: "home",
    title: "ConnectForge IT Services | IT Support, Networks, Websites & CCTV",
    meta_description:
      "ConnectForge IT Services provides website development, applications, network engineering, structured cabling, CCTV installation, IT support and field engineering services across the UK.",
    keywords:
      "Website Solutions, Application Development, Network Engineering, Network Installations, CCTV Installation & Surveillance, IT Support, Field Engineering Services",
    hero_title: "Reliable IT Solutions for Stronger Businesses",
    hero_subtitle:
      "Websites • Applications • Networks • Installations • CCTV • IT Support • Field Engineering",
    body_text:
      "ConnectForge IT Services helps businesses build reliable digital and physical technology infrastructure. From websites and applications to business networks, CCTV, IT support and on-site engineering, we provide practical technology solutions from one trusted team.",
  },
  services: {
    page_key: "services",
    title: "IT Services | Networks, Websites, CCTV & Support | ConnectForge",
    meta_description:
      "Explore websites, applications, network engineering, structured cabling, CCTV, IT support and field engineering for UK businesses.",
    keywords:
      "Website Solutions, Application Development, Network Engineering, Network Installations, CCTV Installation & Surveillance, IT Support, Field Engineering Services",
    hero_title: "Practical IT services. One trusted team.",
    hero_subtitle: "Our Services",
    body_text:
      "We help growing organisations connect their digital technology and physical IT infrastructure. Explore our seven core services and request a free, no-obligation quote tailored to your requirements.",
  },
  skills: {
    page_key: "skills",
    title: "Core Technical Capabilities & Toolsets",
    meta_description:
      "Interactive proficiency metrics across Infrastructure, AWS/Azure Cloud, Terraform/Ansible automation, and Low-Code development.",
    keywords:
      "Linux expertise rating, Terraform competency, PowerShell scripts, SQL queries database",
    hero_title: "Technologies & Capabilities",
    hero_subtitle: "Skill Matrix",
    body_text:
      "Explore our team’s tools and technical capabilities across software, networking and infrastructure.",
  },
  about: {
    page_key: "about",
    title: "About ConnectForge IT Services | UK Technology Team",
    meta_description:
      "Meet Charles Agyemang and Ammayu Waktole, co-founders of ConnectForge IT Services.",
    keywords:
      "Charles Agyemang, Ammayu Waktole, ConnectForge IT Services, technology company",
    hero_title: "Many specialists. One technology partner.",
    hero_subtitle:
      "We make powerful technology practical, dependable, and valuable.",
    body_text:
      "ConnectForge brings software, networks and physical IT infrastructure together for growing UK organisations. Founded by Charles Agyemang and Ammayu Waktole, our team focuses on clear advice, practical delivery and support as your business develops.",
  },
};

export function getDefaultPageContent(pageKey: string): PageContent {
  return (
    staticDefaults[pageKey] || {
      page_key: pageKey,
      title: "ConnectForge IT Services",
      meta_description:
        "Websites, applications, networks, installations, CCTV, IT support and field engineering.",
      keywords:
        "ConnectForge IT Services, networks, web development, automation, apps",
      hero_title: "ConnectForge IT Services",
      hero_subtitle: "Your technology delivery partner",
      body_text: "Network, web, automation, and application solutions.",
    }
  );
}

const legacyDefaultValues: Record<
  string,
  Partial<Record<keyof PageContent, string[]>>
> = {
  home: {
    title: ["ConnectForge Technologies Ltd | Networks, Web, Automation & Apps"],
    meta_description: [
      "ConnectForge Technologies Ltd delivers secure networks, modern websites, business automation, and custom application development.",
    ],
    keywords: [
      "ConnectForge Technologies Ltd, Network Engineer, Web Developer, Automation Consultant, App Developer, Charles Agyemang, Ammayu Waktole",
    ],
    hero_title: ["Technology that moves your business forward."],
    hero_subtitle: ["Connected technology for growing businesses"],
    body_text: [
      "We design secure networks, build high-performing websites and applications, and automate the repetitive work that slows teams down\u2014from strategy and architecture through delivery and ongoing support.",
    ],
  },
  services: {
    title: ["Consulting Services | Cloud & Infrastructure Audits"],
    meta_description: [
      "Explore professional consulting services spanning Linux administration, DevOps, AWS/Azure hybrid networks, and custom Power Platform applications.",
    ],
    keywords: [
      "DevOps retainer, cloud cost audit, Linux web cluster, custom Power Apps developer",
    ],
    hero_title: ["One partner for your digital foundation"],
    hero_subtitle: ["Technology Services"],
    body_text: [
      "We provide focused, practical services that solve real technology bottlenecks. Engage us for a defined project, an expert review, or ongoing technical support.",
    ],
  },
  about: {
    title: ["About ConnectForge Technologies Ltd | Our Founders & Mission"],
    meta_description: [
      "Meet Charles Agyemang and Ammayu Waktole, co-founders of ConnectForge Technologies Ltd.",
    ],
    keywords: [
      "Charles Agyemang, Ammayu Waktole, ConnectForge Technologies Ltd, technology company",
    ],
    hero_title: [
      "Many specialists. One technology partner.",
      "Two specialists. One technology partner.",
    ],
    hero_subtitle: [
      "We make powerful technology practical, dependable, and valuable.",
    ],
    body_text: [
      "a UK-based technology company providing software development, network engineering, IT infrastructure, CCTV, field engineering and technical support services to businesses and organisations. We bring digital and physical technology services together under one roof, helping customers with website and application development, business systems, API integrations and automation, network design and configuration, Wi-Fi, LAN/WAN, routers, switches, VLANs and VPNs, structured Cat5e, Cat6 and Cat6a cabling, network cabinets and data points, CCTV and surveillance systems, remote and on-site IT support, and field engineering services. What makes ConnectForge different is our ability to bridge software, networking and physical IT infrastructure, giving customers one trusted technology partner throughout their technology journey. We take time to understand each customer's requirements and focus on delivering reliable, professional, secure and practical solutions that provide long-term value.",
    ],
  },
  skills: {
    title: ["Core Technical Capabilities & Toolsets"],
    meta_description: [
      "Interactive proficiency metrics across Infrastructure, AWS/Azure Cloud, Terraform/Ansible automation, and Low-Code development.",
    ],
    keywords: [
      "Linux expertise rating, Terraform competency, PowerShell scripts, SQL queries database",
    ],
    hero_title: ["Technologies & Capabilities"],
    hero_subtitle: ["Skill Matrix"],
    body_text: [
      "Explore the platforms, languages, and engineering tools our team uses to deliver reliable client solutions.",
    ],
  },
};

/** Upgrade known seed copy on read without overwriting stored CMS edits. */
export function resolvePageContent(
  pageKey: string,
  stored: Partial<PageContent>,
): PageContent {
  const defaults = getDefaultPageContent(pageKey);
  const content = { ...defaults, ...stored, page_key: pageKey };
  for (const field of [
    "title",
    "meta_description",
    "keywords",
    "hero_title",
    "hero_subtitle",
    "body_text",
  ] as const) {
    const value = stored[field];
    content[field] =
      !value || legacyDefaultValues[pageKey]?.[field]?.includes(value)
        ? defaults[field]
        : value.replaceAll(
            "ConnectForge Technologies Ltd",
            "ConnectForge IT Services",
          );
  }
  return content;
}
