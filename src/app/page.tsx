"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Calendar,
  MessageCircle,
  Sparkles,
  Share2
} from "lucide-react";
import InteractiveNetwork from "@/components/InteractiveNetwork";
import InsideMyLab from "@/components/InsideMyLab";
import LogoMark from "@/components/LogoMark";
import SocialLinks from "@/components/SocialLinks";






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
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-16 md:py-24 border-b border-white/5 bg-[radial-gradient(circle_at_top_left,rgba(22,139,224,0.16),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(9,36,82,0.32),transparent_30%),linear-gradient(to_bottom,#061735,#092452,#030f26)]">
        {/* Animated Network canvas */}
        <InteractiveNetwork />

        {/* Global glowing blobs */}
        <div className="glow-glow w-[500px] h-[500px] bg-cyan-500/10 -top-40 -left-40" />
        <div className="glow-glow w-[500px] h-[500px] bg-purple-500/10 -bottom-40 -right-40" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Company information */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <LogoMark />

              <div className="text-center sm:text-left space-y-2">
                <span className="px-3 py-1 text-xs font-mono font-semibold tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 rounded-full">
                  {page_content_json.page_content_home.home.tagline}
                </span>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-[-0.04em] text-white leading-[1.03] text-balance">
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
                <span>Explore Our Work</span>
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
                href="#social"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-emerald-500/50 hover:bg-emerald-950/20 text-white font-semibold text-sm text-center tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <Share2 className="w-4 h-4 text-emerald-400" />
                <span>Follow Our Journey</span>
              </a>
            </div>

          </div>

          {/* Hero Right: Rotating Tech/Role Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="w-full max-w-sm glass-panel p-7 rounded-3xl border border-white/10 shadow-[0_30px_100px_rgba(6,182,212,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-bl-full" />
              
              <div className="flex items-center space-x-2 pb-4 border-b border-white/5 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  What we build
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
                <span>UK-BASED • GLOBAL DELIVERY</span>
                <span>LET&apos;S CONNECT</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SOCIAL AWARENESS & COMMUNITY */}
      <section id="social" className="relative py-24 border-y border-white/5 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/25 via-slate-950 to-purple-950/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-cyan-400 uppercase">
                <Sparkles className="w-4 h-4" /> Connect. Learn. Build.
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white text-balance">
                Follow the ideas behind the technology.
              </h2>
              <p className="text-slate-300 leading-relaxed max-w-xl">
                We share practical engineering insights, project stories, automation tips, and honest lessons from building digital systems for real organisations.
              </p>
              <SocialLinks />
              <p className="text-xs text-slate-500">Follow our latest projects, practical tips, and service updates.</p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                ["Build in public", "Behind-the-scenes updates from networks, websites, automations, and apps."],
                ["Practical insights", "Short, useful guidance that business owners and technical teams can apply."],
                ["Founder stories", "The people, decisions, and lessons shaping ConnectForge Technologies."],
                ["Community first", "Conversations, questions, and collaborations—not one-way corporate broadcasts."],
              ].map(([title, description], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-xs font-mono text-cyan-400">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                </motion.div>
              ))}
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

      {/* 3. BROCHURE-INSPIRED SERVICE MAP */}
      <section className="relative overflow-hidden bg-[#f5f8fc] py-20 text-[#071b43]">
        <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-[#071b43] via-sky-500 to-[#071b43]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-sky-600">Connect. Build. Secure. Grow.</p>
              <h2 className="text-3xl font-black tracking-tight sm:text-5xl">Reliable IT solutions for stronger businesses.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">From the first cable to the final dashboard, we connect the systems your team depends on every day.</p>
            </div>
            <Link href="/services" className="inline-flex w-fit items-center gap-2 border-b-2 border-sky-500 pb-2 text-sm font-bold uppercase tracking-wider text-[#071b43] transition-colors hover:text-sky-600">
              Explore all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "Website Solutions", "Websites, e-commerce, CMS, SEO, and ongoing maintenance."],
              ["02", "Application Development", "Custom web, mobile, API, and business application delivery."],
              ["03", "Network Engineering", "LAN, Wi-Fi, VPN, firewall, and secure connectivity."],
              ["04", "CCTV & Surveillance", "Site surveys, camera installation, remote viewing, and monitoring."],
              ["05", "Network Installations", "Structured cabling, cabinets, patch panels, and office setups."],
              ["06", "Field Engineering", "On-site installation, configuration, troubleshooting, and support."],
            ].map(([number, title, description]) => (
              <Link key={number} href="/services" className="group flex min-h-48 flex-col justify-between border border-[#c9d5e5] bg-white p-6 transition-all hover:-translate-y-1 hover:border-sky-500 hover:shadow-[0_18px_35px_rgba(7,27,67,0.12)]">
                <div>
                  <span className="font-mono text-xs font-bold text-sky-600">{number} / SERVICE</span>
                  <h3 className="mt-7 text-xl font-black text-[#071b43] group-hover:text-sky-700">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600">{description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-4 grid gap-4 bg-[#071b43] p-6 text-white sm:grid-cols-3 sm:p-8">
            {[["SECURE", "Security-first systems built to protect your business."], ["RELIABLE", "Dependable support and infrastructure you can count on."], ["CLIENT FOCUSED", "Clear advice, practical delivery, and care after launch."]].map(([title, description]) => (
              <div key={title} className="border-l-2 border-sky-400 pl-4">
                <p className="text-xs font-bold tracking-[0.2em] text-sky-300">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES SNAPSHOT: 6 CARDS */}
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
            Why Clients Trust Us
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

      {/* 5. SPECIAL CREATIVE FEATURE */}
      <InsideMyLab />

    </div>
  );
}
