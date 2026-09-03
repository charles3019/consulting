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
    title: "ConnectForge Technologies Ltd | Networks, Web, Automation & Apps",
    meta_description:
      "Secure network engineering, modern web development, business automation, and custom applications.",
    keywords:
      "ConnectForge Technologies Ltd, Network Engineer, Web Developer, Automation Consultant, App Developer",
    hero_title: "Technology that moves your business forward.",
    hero_subtitle:
      "Connected technology for growing businesses",
    body_text:
      "We design secure networks, build modern websites and applications, and automate work so organisations can operate and grow with confidence.",
  },
  about: {
    page_key: "about",
    title: "About ConnectForge Technologies Ltd | Our Founders & Mission",
    meta_description:
      "Meet Charles Agyemang and Ammayu Waktole, the founders of a practical, multidisciplinary technology company.",
    keywords:
      "Ammayu Waktole history, DevOps timeline, IT certifications, AWS architect, RHCSA Linux",
    hero_title: "Two specialists. One technology partner.",
    hero_subtitle: "We combine network engineering, software development, automation, and business thinking to create technology that works in the real world.",
    body_text:
      "Charles Agyemang and Ammayu Waktole founded ConnectForge Technologies Ltd to give organisations one trusted team for infrastructure and digital product delivery.",
  },
  services: {
    page_key: "services",
    title: "Consulting Services | Cloud & Infrastructure Audits",
    meta_description:
      "Explore professional consulting services spanning Linux administration, DevOps, AWS/Azure hybrid networks, and custom Power Platform applications.",
    keywords:
      "DevOps retainer, cloud cost audit, Linux web cluster, custom Power Apps developer",
    hero_title: "How We Optimize Your Infrastructure",
    hero_subtitle: "Consulting Services",
    body_text:
      "I provide structured, high-value consulting services designed to solve concrete IT bottlenecks. Select a services pillar below to learn more about deliverables and schedule a diagnostic review.",
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
      "An interactive catalog of my operating stacks. Select a category below to filter the skill bars, inspect tool libraries, and read operation descriptions.",
  },
};

export function getDefaultPageContent(pageKey: string): PageContent {
  return (
    staticDefaults[pageKey] || {
      page_key: pageKey,
      title: "ConnectForge Technologies Ltd",
      meta_description:
        "IT Infrastructure, DevOps Automation, and Cloud Consulting.",
      keywords: "ConnectForge Technologies, networks, web development, automation, apps",
      hero_title: "ConnectForge Technologies Ltd",
      hero_subtitle: "Your technology delivery partner",
      body_text: "Network, web, automation, and application solutions.",
    }
  );
}
