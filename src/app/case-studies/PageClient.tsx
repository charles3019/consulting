"use client";

import React from "react";
import type { CaseStudyDetails } from "@/lib/caseStudies";
import Link from "next/link";
import {
  ArrowLeft,

  ShieldCheck,

  Workflow,
  Network
} from "lucide-react";

function CaseStudyContent({ study, projectKey }: { study: CaseStudyDetails; projectKey: string }) {
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

export default function CaseStudies({ study, projectKey }: { study: CaseStudyDetails; projectKey: string }) {
  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-12">
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-10 right-10" />

      <CaseStudyContent study={study} projectKey={projectKey} />
    </div>
  );
}
