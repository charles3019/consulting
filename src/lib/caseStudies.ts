export interface CaseStudyDetails {
  title: string;
  category: string;
  challenge: string;
  solution: string;
  diagramTitle: string;
  diagramNodes: { id: string; label: string; sub: string; status: string }[];
  diagramConnections: { from: string; to: string; label: string }[];
  technologies: string[];
  metrics: { label: string; val: string; desc: string }[];
}

export const caseStudiesData: Record<string, CaseStudyDetails> = {
  "infra-auto": {
    title: "Enterprise Infrastructure Automation",
    category: "Internal Lab",
    challenge: "An internal lab exploring how to provision and configure infrastructure consistently using version-controlled automation.",
    solution: "The example combines Terraform modules, Ansible configuration and a GitHub Actions pipeline to illustrate repeatable infrastructure provisioning.",
    diagramTitle: "GitOps Infrastructure Pipeline Architecture",
    diagramNodes: [
      { id: "1", label: "Local Git Commit", sub: "Developer Push", status: "Trigger" },
      { id: "2", label: "GitHub Actions", sub: "tfsec & lint check", status: "Verify" },
      { id: "3", label: "Terraform Engine", sub: "State locking via S3", status: "Provision" },
      { id: "4", label: "Ansible Playbooks", sub: "OS configuration", status: "Hardening" },
      { id: "5", label: "Target VMs", sub: "RHEL Cluster", status: "Lab" }
    ],
    diagramConnections: [
      { from: "1", to: "2", label: "Push Event" },
      { from: "2", to: "3", label: "Pass Tests" },
      { from: "3", to: "4", label: "Deploy VMs" },
      { from: "4", to: "5", label: "Configure OS" }
    ],
    technologies: ["Terraform", "Ansible", "RedHat Linux", "GitHub Actions", "Prometheus"],
    metrics: [{ label: "Technical outcome", val: "Internal Lab", desc: "Demonstrates automated infrastructure provisioning and repeatable configuration." }]
  },
  "timesheet": {
    title: "Power Apps Timesheet System",
    category: "Demonstration Project",
    challenge: "A demonstration of timesheet entry, validation and approval workflows using a business application.",
    solution: "The demonstration links a Power Apps interface to approval workflows and database records. It illustrates application validation and approval handling.",
    diagramTitle: "Power Platform Process Flow",
    diagramNodes: [
      { id: "1", label: "Contractor Device", sub: "Power Apps Client", status: "User Input" },
      { id: "2", label: "Power Automate", sub: "Workflow engine", status: "Orchestrate" },
      { id: "3", label: "MS Teams Card", sub: "Manager Approval", status: "Authorize" },
      { id: "4", label: "SQL Database", sub: "Enterprise tables", status: "Data Storage" }
    ],
    diagramConnections: [
      { from: "1", to: "2", label: "Submit Log" },
      { from: "2", to: "3", label: "Send Card" },
      { from: "3", to: "4", label: "On Approve" }
    ],
    technologies: ["Power Apps", "Power Automate", "SharePoint API", "SQL Server"],
    metrics: [{ label: "Technical outcome", val: "Demonstration Project", desc: "Demonstrates workflow automation and approval handling." }]
  },
  "dashboard": {
    title: "Operational Dashboard System",
    category: "Engineering Example",
    challenge: "An engineering example exploring how operational information from several sources can be brought into one dashboard.",
    solution: "The example combines data ingestion, relational storage and dashboard views to illustrate reporting across multiple sources.",
    diagramTitle: "Data Analytics Pipeline",
    diagramNodes: [
      { id: "1", label: "Cloud APIs", sub: "Billing telemetry", status: "Data Source" },
      { id: "2", label: "SQL DB Sync", sub: "ETL scheduled run", status: "Staging" },
      { id: "3", label: "Power BI Engine", sub: "DAX calculations", status: "Modeling" },
      { id: "4", label: "Grafana Panel", sub: "Live servers feed", status: "Real-time" },
      { id: "5", label: "Executive Report", sub: "Unified display", status: "KPI Output" }
    ],
    diagramConnections: [
      { from: "1", to: "2", label: "Sync API" },
      { from: "2", to: "3", label: "Model Data" },
      { from: "3", to: "5", label: "Publish UI" },
      { from: "4", to: "5", label: "Live Stats" }
    ],
    technologies: ["Power BI", "SQL Server", "Excel DAX", "Grafana API", "Python Scripts"],
    metrics: [{ label: "Technical outcome", val: "Engineering Example", desc: "Demonstrates dashboard integration across multiple data sources." }]
  }
};

