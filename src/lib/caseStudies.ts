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
    category: "Automation & Infrastructure",
    challenge: "A mid-sized logistics firm faced major bottlenecks provisioning servers. Deploying a new environment took 2 weeks of manual steps across multiple portals. System drift occurred frequently as engineers ran ad-hoc configurations, leading to production outages and mismatched staging environments.",
    solution: "We declared the entire system blueprint as code. Using Terraform, we structured reusable modules to spin up network subnets, VMs, and security groups. Ansible roles were written to install and harden Linux environments. Finally, we linked the setup to a GitHub Actions GitOps pipeline.",
    diagramTitle: "GitOps Infrastructure Pipeline Architecture",
    diagramNodes: [
      { id: "1", label: "Local Git Commit", sub: "Developer Push", status: "Trigger" },
      { id: "2", label: "GitHub Actions", sub: "tfsec & lint check", status: "Verify" },
      { id: "3", label: "Terraform Engine", sub: "State locking via S3", status: "Provision" },
      { id: "4", label: "Ansible Playbooks", sub: "OS configuration", status: "Hardening" },
      { id: "5", label: "Target VMs", sub: "RHEL Cluster", status: "Production" }
    ],
    diagramConnections: [
      { from: "1", to: "2", label: "Push Event" },
      { from: "2", to: "3", label: "Pass Tests" },
      { from: "3", to: "4", label: "Deploy VMs" },
      { from: "4", to: "5", label: "Configure OS" }
    ],
    technologies: ["Terraform", "Ansible", "RedHat Linux", "GitHub Actions", "Prometheus"],
    metrics: [
      { label: "Deployment Speed", val: "80% Faster", desc: "Provisioning cut from 14 days to 15 minutes." },
      { label: "Manual Work", val: "50% Less", desc: "Configuration managed entirely by code repository." },
      { label: "Uptime SLA", val: "99.9% Uptime", desc: "System environments remain completely identical." }
    ]
  },
  "timesheet": {
    title: "Power Apps Timesheet System",
    category: "Power Platform Solutions",
    challenge: "A consultancy tracking 200+ contractors relied on emailed Excel timesheets. Project managers spent days verifying records, tracking approvals, and copying data into accounting software. This caused payroll delays, billing errors, and lost audits.",
    solution: "We constructed a canvas-based Microsoft Power App for mobile and desktop screens. Contractors input task logs, and the app runs validation formulas. Power Automate triggers approval card requests directly inside managers' Teams channels. Approved records are synced instantly with SQL Server database tables.",
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
    technologies: ["Power Apps", "Power Automate", "SharePoint API", "SQL Server Server"],
    metrics: [
      { label: "Admin Savings", val: "40 Hours/Mo", desc: "Removed manual validation and copy-pasting." },
      { label: "Error Rate", val: "0% Discrepancy", desc: "Strict formula parsing prevents incorrect totals." },
      { label: "Approval Cycle", val: "Same Day", desc: "Decisions made via Microsoft Teams cards." }
    ]
  },
  "dashboard": {
    title: "Operational Dashboard System",
    category: "Reporting & Analytics",
    challenge: "Management struggled to track team SLAs, hardware CPU metrics, and cloud spending across three separate platforms. Decisions on server sizing were based on guesswork, resulting in over-provisioning and wasted budget.",
    solution: "We designed a data ETL ingestion pipeline to fetch cloud bills and telemetry logs. We structured a relational SQL database and created a comprehensive Power BI dashboard. DAX formulas analyze hosting spend per application, alerting teams to underutilized VMs.",
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
    metrics: [
      { label: "Cost Savings", val: "$15k / Month", desc: "Decommissioned idle instances discovered in audit." },
      { label: "Data Latency", val: "10 Minutes", desc: "Real-time feeds replace monthly reports." },
      { label: "SLA Visibility", val: "100% Clear", desc: "Unified dashboards reveal host downtime instantly." }
    ]
  }
};

