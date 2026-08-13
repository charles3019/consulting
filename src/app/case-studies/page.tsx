"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Workflow,
  Network
} from "lucide-react";

interface CaseStudyDetails {
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

const caseStudiesData: Record<string, CaseStudyDetails> = {
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

function CaseStudyContent() {
  const searchParams = useSearchParams();
  const projectKey = searchParams.get("project") || "infra-auto";
  const study = caseStudiesData[projectKey] || caseStudiesData["infra-auto"];

  return (
    <div className="space-y-16">
      
      {/* Back to Portfolio Link */}
      <div className="text-left">
        <Link
          href="/portfolio"
          className="inline-flex items-center space-x-2 text-xs font-mono font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>BACK TO PORTFOLIO ARCHIVE</span>
        </Link>
      </div>

      {/* Title Header */}
      <div className="text-left space-y-4">
        <div className="flex items-center space-x-2">
          <Workflow className="w-5 h-5 text-cyan-400" />
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
            {study.category}
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          {study.title}
        </h1>
        <p className="text-xs text-slate-500 font-mono">
          CONSULTING RECORD // PROJECT ID: {projectKey.toUpperCase()}
        </p>
      </div>

      {/* Metrics Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {study.metrics.map((m, idx) => (
          <div
            key={idx}
            className="p-6 rounded-xl bg-slate-900/30 border border-white/5 text-left relative overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent" />
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
              {m.label}
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white block mt-1 tracking-tight">
              {m.val}
            </span>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {m.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Challenge & Solution Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <h2 className="text-sm font-bold uppercase tracking-wider">The Challenge</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {study.challenge}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-wider">The Solution</h2>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed">
            {study.solution}
          </p>
        </div>
      </div>

      {/* Interactive Architecture Diagram */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-8">
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center space-x-2">
            <Network className="w-4 h-4 text-cyan-400" />
            <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              {study.diagramTitle}
            </span>
          </div>
          <span className="font-mono text-[9px] text-cyan-400">SYSTEM: ACTIVE</span>
        </div>

        {/* Nodes Grid */}
        <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-6 md:gap-4 pt-4 relative">
          
          {study.diagramNodes.map((node, index) => (
            <React.Fragment key={node.id}>
              {/* Connector line (desktop only) */}
              {index > 0 && (
                <div className="hidden md:block h-0.5 bg-gradient-to-r from-cyan-500/30 to-cyan-500/80 flex-grow max-w-16 self-center relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-500 whitespace-nowrap">
                    {study.diagramConnections[index - 1]?.label}
                  </span>
                </div>
              )}

              {/* Node Card */}
              <div className="w-44 p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col justify-between items-center text-center shadow-lg relative group hover:border-cyan-500/50 transition-colors">
                <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                  {node.status}
                </span>
                <span className="font-bold text-xs text-white mt-2 mb-1">
                  {node.label}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {node.sub}
                </span>
              </div>
            </React.Fragment>
          ))}
          
        </div>
      </div>

      {/* Technologies Deployed */}
      <div className="text-left pt-6 border-t border-white/5 space-y-4">
        <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
          Integrated Technologies Stack
        </h3>
        <div className="flex flex-wrap gap-2">
          {study.technologies.map((t) => (
            <span
              key={t}
              className="px-3 py-1 text-xs rounded bg-slate-950 border border-slate-800 text-slate-300 font-mono flex items-center space-x-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}

export default function CaseStudies() {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-10 right-10" />

      {/* Suspense boundary for searchParams in App Router */}
      <Suspense
        fallback={
          <div className="text-center text-slate-400 font-mono py-20">
            Running system diagnostics...
          </div>
        }
      >
        <CaseStudyContent />
      </Suspense>
    </div>
  );
}
