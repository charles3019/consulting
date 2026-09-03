"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Server,
  Code,
  Cloud,
  Layers,
  BarChart3,
  Users,
  X,
  Play,
  Terminal,
  Cpu,
  CheckCircle2
} from "lucide-react";

interface Scene {
  id: number;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  techUsed: string[];
  metrics: string;
  projectTitle: string;
}

const scenes: Scene[] = [
  {
    id: 1,
    title: "Configuring Linux Servers",
    icon: <Server className="w-6 h-6 text-emerald-400" />,
    subtitle: "Enterprise OS Hardening & Performance",
    shortDesc: "Tuning kernels, setting up secure load balancing, and configuring web clusters.",
    fullDesc: "Deploying and managing highly secure, high-performance RedHat, CentOS, and Ubuntu server networks. Focus lies on kernel optimization, firewalls, and proxy systems like HAProxy and Nginx to handle high-traffic workflows.",
    deliverables: [
      "OS hardening & security auditing (CIS benchmarks)",
      "High-availability clustering and replication",
      "Automated system monitoring & log aggregation",
      "Virtualization environment setup (KVM, VMware)"
    ],
    techUsed: ["RHEL/Ubuntu", "Nginx/HAProxy", "Prometheus & Grafana", "VMware ESXi"],
    metrics: "99.99% system uptime achieved for critical applications",
    projectTitle: "Enterprise Web Cluster Consolidation"
  },
  {
    id: 2,
    title: "Building Terraform Automation",
    icon: <Code className="w-6 h-6 text-purple-400" />,
    subtitle: "Infrastructure as Code (IaC) & CI/CD Pipelines",
    shortDesc: "Declaring immutable cloud architectures and deploying through automated pipelines.",
    fullDesc: "Writing modular, testable Infrastructure as Code to deploy consistent environments. State-locking setups and automated validation checking prevent drift, ensuring changes undergo secure CI/CD checks before applying.",
    deliverables: [
      "Modular Terraform libraries with multi-provider integrations",
      "GitOps pipelines using GitHub Actions & GitLab CI",
      "Configuration management via Ansible playbooks",
      "Infrastructure testing and linting (tflint, tfsec)"
    ],
    techUsed: ["Terraform", "Ansible", "GitHub Actions", "Python/Bash"],
    metrics: "Reduced deployment cycles from 5 days to 12 minutes",
    projectTitle: "Multi-Region Cloud Infrastructure Automation"
  },
  {
    id: 3,
    title: "Designing Cloud Architecture",
    icon: <Cloud className="w-6 h-6 text-blue-400" />,
    subtitle: "AWS & Azure Hybrid Networks",
    shortDesc: "Architecting serverless ecosystems and secure, hybrid-network configurations.",
    fullDesc: "Creating scalable, fault-tolerant infrastructure maps on AWS and Azure. Implementing hub-spoke routing, VPC peering, and secure VPN links to bridge on-premises databases with modern cloud microservices.",
    deliverables: [
      "Serverless architecture design (Lambda, API Gateway, DynamoDB)",
      "Secure hub-spoke networks with Next-Gen Firewalls",
      "Kubernetes cluster setup and ingress controls",
      "Disaster recovery planning with multi-region backups"
    ],
    techUsed: ["AWS", "Azure", "Kubernetes", "IAM & VPC Routing"],
    metrics: "Saved $120,000 annually through infrastructure optimization",
    projectTitle: "Legacy Datacenter to AWS Cloud Migration"
  },
  {
    id: 4,
    title: "Creating Power Apps",
    icon: <Layers className="w-6 h-6 text-pink-400" />,
    subtitle: "Rapid Business Application Development",
    shortDesc: "Crafting custom low-code tools that digitize complex manual office processes.",
    fullDesc: "Leveraging the Microsoft Power Platform to build tailored business interfaces. Integrating SharePoint, Dataverse, and SQL backends alongside automated logic paths to remove paperwork and streamline approvals.",
    deliverables: [
      "Canvas & Model-Driven Power Apps with complex formula logic",
      "Automated multi-stage approval flows via Power Automate",
      "SharePoint List and Microsoft Dataverse structure design",
      "Custom connector integration for external APIs"
    ],
    techUsed: ["Power Apps", "Power Automate", "SharePoint", "SQL Server"],
    metrics: "Automated timesheet processes, saving 40+ admin hours/month",
    projectTitle: "Enterprise Timesheet & Scheduling Platform"
  },
  {
    id: 5,
    title: "Presenting Dashboards",
    icon: <BarChart3 className="w-6 h-6 text-cyan-400" />,
    subtitle: "Real-time Metrics & Business Intelligence",
    shortDesc: "Aggregating raw infrastructure and financial data into interactive dashboards.",
    fullDesc: "Translating telemetry streams and operational data into clear, actionable graphs. Creating custom Power BI models and optimized spreadsheet tools to help executives understand cost and efficiency.",
    deliverables: [
      "Power BI reports with complex DAX calculations",
      "Interactive executive dashboards for business metrics",
      "Infrastructure cost-monitoring spreadsheets with automated ingestion",
      "Prometheus & Grafana dashboarding for systems health"
    ],
    techUsed: ["Power BI", "Excel VBA", "SQL", "Grafana"],
    metrics: "Enabled instant monthly financial-reconciliation reporting",
    projectTitle: "Operational KPI & Cloud Spend Dashboard"
  },
  {
    id: 6,
    title: "Helping Clients Succeed",
    icon: <Users className="w-6 h-6 text-emerald-400" />,
    subtitle: "Strategic IT Consulting & Training",
    shortDesc: "Advising stakeholders, resolving outages, and upskilling dev teams.",
    fullDesc: "Partnering with leadership to define cloud and automation roadmaps. Running technical audits, debugging production systems, and coaching developer teams on DevOps best practices.",
    deliverables: [
      "Detailed technology audits and cloud cost reports",
      "Production post-incident root-cause analysis (RCA)",
      "Coaching workshops on Terraform and CI/CD tools",
      "Technical vendor selection and architectural reviews"
    ],
    techUsed: ["ITIL", "Cost Audit Tools", "Diagramming", "Technical Writing"],
    metrics: "Guided 6 enterprise clients through cloud modernization",
    projectTitle: "DevOps Transformation Roadmap"
  }
];

export default function InsideMyLab() {
  const [activeScene, setActiveScene] = useState<Scene | null>(null);
  const [terminalLog, setTerminalLog] = useState<string[]>([
    "system init: lab active",
    "status: listening for diagnostics request..."
  ]);

  const runDiagnostics = (scene: Scene) => {
    setActiveScene(scene);
    setTerminalLog((prev) => [
      ...prev,
      `diagnostics: loading scene ${scene.id} [${scene.title}]`,
      `telemetry: fetch complete, metrics parsed successfully`
    ].slice(-8)); // keep last 8 lines
  };

  return (
    <section className="py-20 relative tech-grid border-y border-white/5 bg-slate-950/40">
      
      {/* Background glow */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/10 top-1/4 left-1/4" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-1/4 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Special Feature
          </h2>
          <p className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Inside Our Studio
          </p>
          <p className="mt-4 text-sm text-slate-400">
            A look behind the scenes. Click on any lab module to run system diagnostics, check configurations, and view real-world delivery details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Terminal Console */}
          <div className="lg:col-span-5 glass-panel p-4 rounded-xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-cyan-400">
                <Terminal className="w-3 h-3 animate-pulse" />
                <span>diag-console.sh</span>
              </div>
            </div>
            
            <div className="bg-black/60 p-4 rounded-lg font-mono text-xs text-emerald-400 min-h-64 flex flex-col justify-between space-y-2">
              <div className="space-y-1">
                <p className="text-slate-500"># connectforge-studio --capabilities</p>
                {terminalLog.map((log, idx) => (
                  <p key={idx} className={log.includes("loading") ? "text-cyan-400" : "text-emerald-400"}>
                    <span className="text-slate-600">&gt;</span> {log}
                  </p>
                ))}
              </div>
              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                <span>LATENCY: 14ms</span>
                <span>STATUS: READY</span>
              </div>
            </div>
          </div>

          {/* Right: Grid of Scenes */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {scenes.map((scene) => (
              <div
                key={scene.id}
                onClick={() => runDiagnostics(scene)}
                className="glass-panel glass-panel-hover p-5 rounded-xl cursor-pointer group text-left relative overflow-hidden"
              >
                {/* Glow hint */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
                
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-white/10 group-hover:border-cyan-500/50 group-hover:bg-cyan-950/20 transition-all">
                    {scene.icon}
                  </div>
                  <span className="text-xs font-mono text-cyan-400">SCENE_0{scene.id}</span>
                </div>
                
                <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {scene.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {scene.shortDesc}
                </p>

                <div className="mt-4 flex items-center justify-between text-xs font-semibold text-cyan-400 group-hover:text-cyan-300">
                  <span>Run Diagnostics</span>
                  <Play className="w-3.5 h-3.5 fill-cyan-500/20 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Diagnostic Detail Modal */}
      <AnimatePresence>
        {activeScene && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveScene(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="glass-panel w-full max-w-2xl rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl relative z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-slate-900/60">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded bg-slate-950 border border-white/10">
                    {activeScene.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      Active Diagnostic Mode
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {activeScene.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveScene(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    System Description
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {activeScene.fullDesc}
                  </p>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Deliverables & Hardening Actions
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeScene.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Case Project */}
                <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-2">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                    Telemetry: Project Outcome
                  </span>
                  <h5 className="text-sm font-bold text-white">
                    {activeScene.projectTitle}
                  </h5>
                  <p className="text-xs text-emerald-400 font-semibold flex items-center space-x-1">
                    <Cpu className="w-4 h-4" />
                    <span>Result: {activeScene.metrics}</span>
                  </p>
                </div>

                {/* Tech Badges */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Lab Infrastructure Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeScene.techUsed.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 text-xs rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end px-6 py-4 border-t border-white/10 bg-slate-900/40">
                <button
                  onClick={() => setActiveScene(null)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                >
                  Close Console
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
