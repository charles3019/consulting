"use client";

import React, { useState } from "react";
import page_content_json from "../../data/db_fallback.json";
import Link from "next/link";
import {
  FolderCode,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  BarChart,
  Cloud
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: "Infrastructure" | "Cloud" | "Automation" | "Power Apps" | "Reporting";
  desc: string;
  technologies: string[];
  results: string;
  caseStudyLink: string;
  icon: React.ReactNode;
}


const categories = ["All", "Infrastructure", "Cloud", "Automation", "Power Apps", "Reporting"];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = page_content_json.page_content_portfolio.projectsData.filter((project) => {
    if (activeCategory === "All") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 -top-10 right-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 left-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          PORTFOLIO ARCHIVE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Delivered Engagements
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          A showcase of real-world infrastructure builds, custom line-of-business applications, and metrics-driven dashboard platforms that helped client operations scale.
        </p>
      </div>

      {/* Filter Menu */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider border transition-all duration-300 ${
              activeCategory === cat
                ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "bg-slate-900/30 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
          >
            {/* Corner hover glow hint */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform" />
            
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-slate-900 rounded border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                    {project.icon}
                  </div>
                  <span className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </span>
                </div>
                <span className="font-mono text-[9px] text-cyan-400 uppercase bg-cyan-950/30 border border-cyan-500/20 px-2 py-0.5 rounded">
                  {project.category}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {project.desc}
              </p>

              {/* Outcome Highlight Box */}
              <div className="p-4 rounded-lg bg-emerald-950/10 border border-emerald-500/25 flex items-start space-x-2 text-left">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                    Operational Impact:
                  </h4>
                  <p className="text-xs text-emerald-300 leading-relaxed font-medium">
                    {project.results}
                  </p>
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="pt-2">
                <h4 className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-950 border border-white/5 text-slate-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>

            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[9px] font-mono text-slate-500">
                DIAGNOSTIC: SUCCESSFUL_BUILD
              </span>
              <Link
                href={project.caseStudyLink}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
              >
                <span>View Case Study</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
