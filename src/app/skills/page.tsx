"use client";

import React, { useState, useEffect } from "react";
import { Cpu,
  Cloud, 
  Terminal, 
  Brackets, 
  Award ,  
  Lightbulb,
  Users,    
  MonitorCog,
  Globe,    
  Headphones,
  Network,   
  CreditCard} from "lucide-react";
import page_content_json from "../../data/db_fallback.json";
import { getDefaultPageContent } from "@/lib/contentDefaults";
import { useManagedPageContent } from "@/lib/useManagedPageContent";

interface SkillItem {
  name: string;
  rating: number; // out of 12
  details: string;
  tools: string[];
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [animate, setAnimate] = useState(false);
  const pageContent = useManagedPageContent("skills", getDefaultPageContent("skills"));

  useEffect(() => {
    // trigger width animations
    // setAnimate(true);
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 top-20 right-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 left-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          SKILL MATRIX
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {pageContent.hero_title}
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          {pageContent.body_text}
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {page_content_json.page_content_Skill.skillCategories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveCategory(idx);
            }}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all duration-300 ${
              activeCategory === idx
                ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                : "bg-slate-900/30 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/60"
            }`}
          >
            
            
            
             {{
                MonitorCog: <MonitorCog className="w-8 h-8 text-cyan-400" />,
                Network:       <Network className="w-8 h-8 text-emerald-400" />,
                Cloud: <MonitorCog className="w-8 h-8 text-blue-400" />,
                CreditCard:      <CreditCard className="w-8 h-8 text-purple-400" />,
                Globe:      <Cloud className="w-8 h-8 text-pink-400" />,
                Terminal: <Terminal className="w-8 h-8 text-amber-400" />,
                Activity:    <Network className="w-8 h-8 text-amber-400" />,
                Users: <Users className="w-8 h-8 text-amber-400" />
              
                              }[cat.icon]}
            <span>{cat.title}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Left Skills bars, Right Detailed inspect board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Columns (Skill Bars) */}
        <div className="lg:col-span-7 space-y-6">
          {page_content_json.page_content_Skill.skillCategories[activeCategory].skills.map((skill, idx) => {
            const pct = (skill.rating / 12) * 100;
            return (
              <div key={idx} className="space-y-2 text-left">
                <div className="flex justify-between items-end text-sm">
                  <span className="font-bold text-white tracking-wide">{skill.name}</span>
                  <span className="font-mono text-cyan-400 text-xs font-semibold">
                    {skill.rating} / 12
                  </span>
                </div>
                
                {/* Progress bar container */}
                <div className="h-3.5 w-full bg-slate-950 rounded-full border border-white/5 overflow-hidden p-[2px]">
                  <div
                    style={{ width: animate ? `${pct}%` : "0%" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-1000 ease-out"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Columns (Inspect Panel Card) */}
        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between text-left">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Award className="w-4.5 h-4.5 text-cyan-400 animate-pulse" />
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  Diagnostic Report
                </span>
              </div>
              <span className="font-mono text-[10px] text-cyan-400">
                CLASS: {page_content_json.page_content_Skill.skillCategories[activeCategory].title.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-400 leading-relaxed">
                Click details inside this matrix represent verified capabilities, deployed across production workloads over {new Date().getFullYear() - 2016} years of systems engineering history.
              </p>
              
              <div className="space-y-4 pt-2">
                {page_content_json.page_content_Skill.skillCategories[activeCategory].skills.map((s, idx) => (
                  <div key={idx} className="space-y-1.5 border-l-2 border-cyan-500/30 pl-3">
                    <h4 className="text-xs font-bold text-white">{s.name}</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{s.details}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {s.tools.map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 text-[9px] font-mono rounded bg-slate-900 border border-white/5 text-cyan-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/5 text-[9px] font-mono text-slate-500">
            METRICS CODE: SYS_CAP_VERIFIED_SECURE
          </div>
        </div>

      </div>

    </div>
  );
}
