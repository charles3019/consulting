"use client";

import React from "react";
import Link from "next/link";
import page_content_json from "../../data/db_fallback.json";
import {
  Server,
  Workflow,
  Cloud,
  Layers,
  BarChart,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  Lightbulb,
  Cpu,      
  MonitorCog,
  Globe,    
  Headphones,
  Network,   
  CreditCard
} from "lucide-react";
import { getDefaultPageContent } from "@/lib/contentDefaults";
import { useManagedPageContent } from "@/lib/useManagedPageContent";

interface ServiceBlock {
  id: number;
  title: string;
  icon: React.ReactNode;
  subtitle: string;
  problemSolved: string;
  deliverables: string[];
  duration: string;
  link: string;
}



export default function Services() {
  const pageContent = useManagedPageContent("services", getDefaultPageContent("services"));

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-20">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 -top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 right-10" />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          CONSULTING SERVICES
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {pageContent.hero_title}
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
          {pageContent.body_text}
        </p>
      </div>

      {/* Services Loop */}
      <div className="space-y-16">
        {page_content_json.page_content_service.ServiceBlock.map((service, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={service.id}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-16 border-b border-white/5 last:border-b-0 last:pb-0`}
            >
              
              {/* Left Column (Details & Challenge) */}
              <div className={`lg:col-span-6 space-y-6 ${!isEven && "lg:order-last"}`}>
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-slate-900 border border-white/10 rounded-xl">
                  {{
    Lightbulb: <Lightbulb className="w-8 h-8 text-cyan-400" />,
    Cpu:       <Cpu className="w-8 h-8 text-emerald-400" />,
    MonitorCog: <MonitorCog className="w-8 h-8 text-blue-400" />,
    Globe:      <Globe className="w-8 h-8 text-purple-400" />,
    Cloud:      <Cloud className="w-8 h-8 text-pink-400" />,
    Headphones: <Headphones className="w-8 h-8 text-amber-400" />,
    Network:    <Network className="w-8 h-8 text-amber-400" />,
    CreditCard: <CreditCard className="w-8 h-8 text-amber-400" />
  
                  }[service.icon]}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block">
                      Service Pillar 0{service.id}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                      {service.title}
                    </h2>
                  </div>
                </div>

                <p className="text-xs font-mono text-slate-400 italic">
                  {service.subtitle}
                </p>

                {/* Problem Highlight */}
                <div className="p-4 rounded-xl bg-red-950/10 border border-red-500/20 flex items-start space-x-3 text-left">
                  <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider mb-0.5">
                      Common Pain Points Addressed:
                    </h4>
                    <p className="text-xs text-red-200/80 leading-relaxed">
                      {service.problemSolved}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-500 block">Typical Engagements:</span>
                  <span className="text-xs font-semibold text-slate-300">{service.duration}</span>
                </div>
              </div>

              {/* Right Column (Deliverables Table & CTA) */}
              <div className="lg:col-span-6 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between self-stretch">
                <div className="space-y-4">
                  <h3 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                    Core Project Deliverables
                  </h3>
                  
                  <div className="space-y-3">
                    {service.deliverables.map((del, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button inside the card */}
                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">
                    STATUS: READY FOR AUDIT
                  </span>
                  <Link
                    href={service.link}
                    className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)] flex items-center space-x-2"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Diagnostic</span>
                  </Link>
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
