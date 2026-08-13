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
    title: "Ammayu Waktole | Infrastructure Engineer & DevOps Consultant",
    meta_description:
      "Professional IT infrastructure engineering, cloud architecture, CI/CD DevOps automation, and Power Platform consulting services. Architecting reliable enterprise systems.",
    keywords:
      "Ammayu Waktole, Infrastructure Engineer, DevOps Specialist, Automation Consultant, Cloud Architecture, Linux Systems Administrator, Power Apps, Terraform, Ansible, AWS, Azure",
    hero_title: "Ammayu Waktole",
    hero_subtitle:
      "Infrastructure Engineer | DevOps Specialist | Automation Consultant",
    body_text:
      "I architect self-healing cloud networks, engineer reliable server environments, and build custom business automations. Let's eliminate manual labor and secure your digital core.",
  },
  about: {
    page_key: "about",
    title: "About Ammayu | Systems & Automation Journey",
    meta_description:
      "Learn about Ammayu Waktole's systems engineering journey, background, core values, and verified IT certifications.",
    keywords:
      "Ammayu Waktole history, DevOps timeline, IT certifications, AWS architect, RHCSA Linux",
    hero_title: "Engineering Systems That Work",
    hero_subtitle: "About Ammayu Waktole",
    body_text:
      "Hi, I'm Ammayu Waktole. My technology journey began in local IT support, working directly with copper ethernet cables and core server hardware. Troubleshooting physical routers taught me to value simple, robust structures over complex, fragile ones.",
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
      title: "Ammayu Waktole Consulting",
      meta_description:
        "IT Infrastructure, DevOps Automation, and Cloud Consulting.",
      keywords: "Ammayu Waktole, DevOps, Infrastructure",
      hero_title: "Ammayu Waktole",
      hero_subtitle: "IT Consultant",
      body_text: "Systems engineering and automation solutions.",
    }
  );
}
