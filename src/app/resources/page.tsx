"use client";

import React from "react";
import {
  FileText,
  FileCode,
  Download,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface Resource {
  id: number;
  title: string;
  type: string; // PDF, ZIP, YAML, JSON
  size: string;
  desc: string;
  icon: React.ReactNode;
}

const resourcesData: Resource[] = [
  {
    id: 1,
    title: "Ammayu Waktole Resume / CV",
    type: "PDF",
    size: "180 KB",
    desc: "Comprehensive curriculum vitae detailing professional systems engineering, cloud architecture certifications, and client case study list.",
    icon: <FileText className="w-6 h-6 text-cyan-400" />
  },
  {
    id: 2,
    title: "Linux Server Hardening Checklist",
    type: "PDF",
    size: "350 KB",
    desc: "A comprehensive checklist covering kernel parameters, firewalls configurations, SSH security settings, and logging audits for production.",
    icon: <FileText className="w-6 h-6 text-emerald-400" />
  },
  {
    id: 3,
    title: "Terraform Base VPC Module Template",
    type: "ZIP",
    size: "45 KB",
    desc: "A modular, plug-and-play Terraform template to spin up a secure, multi-AZ VPC on AWS with public/private subnets and NAT Gateways.",
    icon: <FileCode className="w-6 h-6 text-blue-400" />
  },
  {
    id: 4,
    title: "Power Apps Canvas Design Blueprints",
    type: "ZIP",
    size: "1.2 MB",
    desc: "Pre-styled Microsoft Power Apps canvas templates featuring responsive navigation headers, grid alignments, and popup dialog flows.",
    icon: <FileCode className="w-6 h-6 text-pink-400" />
  },
  {
    id: 5,
    title: "Ansible Server Baseline Hardening Role",
    type: "YAML",
    size: "12 KB",
    desc: "Ansible playbook role to automatically enforce SSH key-only access, configure UFW/IPTables, disable unused protocols, and set up automatic security patches.",
    icon: <FileCode className="w-6 h-6 text-purple-400" />
  },
  {
    id: 6,
    title: "System Engineer Technical Interview Guide",
    type: "PDF",
    size: "420 KB",
    desc: "A curated list of core Linux administration, network troubleshooting, and Docker container scheduling interview questions with detailed answers.",
    icon: <FileText className="w-6 h-6 text-amber-400" />
  }
];

export default function Resources() {
  const triggerDownload = (resource: Resource) => {
    alert(`[Lab Diagnostics] Initiating mock secure download for: ${resource.title}\nFormat: ${resource.type} (${resource.size})`);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 top-20 right-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 left-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          DIAGNOSTIC RESOURCES
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Free Downloads & Templates
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Access reusable codebase configuration templates, server hardening checklists, low-code apps blueprints, and technical interview preparation sheets.
        </p>
      </div>

      {/* Warning Box */}
      <div className="max-w-4xl mx-auto p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-start space-x-3 text-left">
        <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <p className="text-xs text-cyan-300 leading-relaxed">
          <strong>Notice:</strong> These resources are intended as baseline engineering starting points. Ensure you review and customize all scripts and variables (specifically passwords and secrets) in test configurations before applying to production clusters.
        </p>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {resourcesData.map((res) => (
          <div
            key={res.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all duration-300 text-left group"
          >
            <div className="space-y-4">
              
              {/* Type tag & size */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-900 border border-white/5 text-cyan-400 uppercase tracking-widest">
                  {res.type}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  SIZE: {res.size}
                </span>
              </div>

              {/* Title & Desc */}
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-slate-900 rounded border border-white/5 group-hover:border-cyan-500/30 transition-colors">
                  {res.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {res.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {res.desc}
                  </p>
                </div>
              </div>

            </div>

            {/* Action Download */}
            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500 flex items-center space-x-1">
                <CheckCircle className="w-3 h-3 text-emerald-400" />
                <span>SHA-256 Verified</span>
              </span>
              <button
                onClick={() => triggerDownload(res)}
                className="px-3 py-2 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center space-x-1 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
