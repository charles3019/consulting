"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import page_content_json from "../data/db_fallback.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Zap,
  TrendingUp,
  DollarSign,
  Server,
  Workflow,
  Cloud,
  Globe,
  Database,
  BarChart,
  Download,
  Calendar
} from "lucide-react";
import InteractiveNetwork from "@/components/InteractiveNetwork";
import InsideMyLab from "@/components/InsideMyLab";






export default function Home() {
  const [skillIdx, setSkillIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSkillIdx((prev) => (prev + 1) % page_content_json.page_content_home.rotatingSkills.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-12 md:py-20 border-b border-white/5 bg-gradient-to-b from-slate-950 via-slate-900 to-brand-bg">
        {/* Animated Network canvas */}
        <InteractiveNetwork />

        {/* Global glowing blobs */}
        <div className="glow-glow w-[500px] h-[500px] bg-cyan-500/10 -top-40 -left-40" />
        <div className="glow-glow w-[500px] h-[500px] bg-purple-500/10 -bottom-40 -right-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Caricature and Name info */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Caricature Image with animated pulse borders */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-cyan-500/30 p-1 bg-slate-900 shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <div className="w-full h-full rounded-full overflow-hidden relative">
                  <Image
                    src="/ammayu_avatar.png"
                    alt="Ammayu Waktole avatar"
                    fill
                    sizes="(max-w-720px) 128px, 160px"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-2">
                <span className="px-3 py-1 text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 rounded-full">
                  {page_content_json.page_content_home.home.tagline}
                </span>
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  {page_content_json.page_content_home.home.hero_title}
                </h1>
                <p className="text-sm sm:text-base text-slate-400 font-mono font-semibold">
                  {page_content_json.page_content_home.home.hero_subtitle}
                  
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {page_content_json.page_content_home.home.body_text}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/portfolio"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-bold text-sm text-center tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center space-x-2"
              >
                <span>View Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/book-consultation"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-white font-semibold text-sm text-center tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Book Consultation</span>
              </Link>
              <a
                href="/resources"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-white font-semibold text-sm text-center tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Download CV</span>
              </a>
            </div>

          </div>

          {/* Hero Right: Rotating Tech/Role Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-sm glass-panel p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
              
              <div className="flex items-center space-x-2 pb-4 border-b border-white/5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  Live Operations Deck
                </span>
              </div>

              <div className="min-h-36 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={skillIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-3"
                  >
                    <span className="text-xs font-mono font-semibold text-cyan-400">
                      SYS_CAPABILITY_0{skillIdx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                      {page_content_json.page_content_home.rotatingSkills[skillIdx].text}
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {page_content_json.page_content_home.rotatingSkills[skillIdx].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>VER: 4.1.0-STABLE</span>
                <span>STATUS: ONLINE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. TRUSTED TECHNOLOGIES: LOGO CAROUSEL */}
      <section className="py-10 border-b border-white/5 bg-slate-950/60 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-widest">
            ENGINEERING WORKHORSE & TRUSTED TECH STACK
          </span>
        </div>
        
        <div className="relative w-full flex items-center">
          {/* Shadow gradients for smooth fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          {/* Infinite horizontal scroll */}
          <div className="flex w-max animate-marquee space-x-12">
            {[...page_content_json.page_content_home.technologies, ...page_content_json.page_content_home.technologies, ...page_content_json.page_content_home.technologies].map((tech, idx) => (
              <span
                key={idx}
                className="text-base sm:text-lg font-mono font-bold tracking-wider text-slate-500 hover:text-cyan-400 transition-colors uppercase cursor-default select-none"
              >
                // {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SERVICES SNAPSHOT: 6 CARDS */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            {page_content_json.services_catalog[0].H1}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {page_content_json.services_catalog[0].H2}
          </p>
          <p className="text-sm text-slate-400">
           {page_content_json.services_catalog[0].H3}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {page_content_json.services_catalog.map((service_cat, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-hover p-6 rounded-xl border border-white/10 text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                     
                  <div className="p-3 rounded-lg bg-slate-900 border border-white/5 w-fit">
  {{
    Server: <Server className="w-8 h-8 text-cyan-400" />,
    Workflow: <Workflow className="w-8 h-8 text-emerald-400" />,
    Cloud: <Cloud className="w-8 h-8 text-blue-400" />,
    Globe: <Globe className="w-8 h-8 text-purple-400" />,
    Database: <Database className="w-8 h-8 text-pink-400" />,
    BarChart: <BarChart className="w-8 h-8 text-amber-400" />
  }[service_cat.icon]}
</div>
                  
                                 
                <h3 className="text-lg font-bold text-white">{service_cat.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{service_cat.desc}</p>
              </div>
              <div className="pt-6 mt-4 border-t border-white/5 flex justify-end">
                <Link
                  href="/services"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1"
                >
                  <span>Read Deliverables</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 4. WHY CLIENTS HIRE ME: 4 VALUE PROPOSITIONS */}
      <section className="py-24 border-t border-white/5 bg-slate-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
              Business Value
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Why Clients Trust Me
            </p>
            <p className="text-sm text-slate-400">
              Technical capability is only half the battle. Delivering clear business results, speed, and reliability is what counts.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page_content_json.valueProps.map((prop, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-slate-900/40 border border-white/5 text-left space-y-3 relative overflow-hidden"
              >
                {/* Subtle vertical glow stripe */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-transparent" />
                <div className="p-2 bg-slate-900 border border-white/5 rounded-lg w-fit">
                  {{
    Zap: <Zap className="w-8 h-8 text-cyan-400" />,
    DollarSign: <DollarSign className="w-8 h-8 text-emerald-400" />,
    Shield: <Shield className="w-8 h-8 text-blue-400" />,
    TrendingUp: <TrendingUp className="w-8 h-8 text-purple-400" />,
     }[prop.icon]}
                  
                </div>
                <h3 className="text-base font-bold text-white">{prop.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{prop.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. SPECIAL CREATIVE FEATURE: INSIDE MY LAB */}
      <InsideMyLab />

    </div>
  );
}
