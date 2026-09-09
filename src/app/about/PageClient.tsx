"use client";

import type { PageContent } from "@/lib/contentDefaults";

import React, { useState } from "react";
import Image from "next/image";
import {
  Award,
  ChevronRight,
  ExternalLink,
  GitCommit,
  Milestone,
  ShieldCheck,
  Zap
} from "lucide-react";



export default function About({ page_content_json, pageContent }: { page_content_json: Pick<typeof import("@/data/db_fallback.json"), "page_content_about">; pageContent: PageContent }) {
  const [activeEvent, setActiveEvent] = useState<number>(0);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-24">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-purple-500/5 -top-10 right-10" />
      <div className="glow-glow w-96 h-96 bg-cyan-500/10 top-1/2 left-10" />

      {/* 1. HERO / INTRODUCTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side: Illustration of Workstation */}
        <div className="lg:col-span-5 relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden border border-white/10 bg-slate-900/60 p-2 shadow-2xl">
          <div className="w-full h-full relative rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/ammayu_workstation.png"
              alt="ConnectForge Technologies engineering workstation"
              fill
              sizes="(max-width: 640px) 100vw, 448px"
              priority
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Side: Text Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
            ABOUT OUR COMPANY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {pageContent.hero_title}
          </h1>
          
          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              {pageContent.body_text}
            </p>
            <p>
             {page_content_json.page_content_about.about.body_text_2}    </p>
          </div>

          {/* Journey Steps Breadcrumb */}
          <div className="pt-4 border-t border-white/5">
            <h3 className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Career Trajectory Path
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/40 p-3 rounded-lg border border-white/5">
              {page_content_json.page_content_about.Careerpath.c1}
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
              {page_content_json.page_content_about.Careerpath.c2}
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
              <span>{page_content_json.page_content_about.Careerpath.c3}</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
              <span>{page_content_json.page_content_about.Careerpath.c4}</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
              <span>{page_content_json.page_content_about.Careerpath.c5}</span>
              <ChevronRight className="w-3.5 h-3.5 text-cyan-500" />
              <span className="text-cyan-400 font-bold">{page_content_json.page_content_about.Careerpath.c6}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR PEOPLE */}
      <section className="space-y-10">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-400">The team behind the work</p>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Two specialists. One dependable partner.</h2>
          <p className="text-sm leading-7 text-slate-400">ConnectForge brings infrastructure discipline and product thinking together, so clients get technology that works from the rack to the browser.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          <article className="glass-panel rounded-2xl border border-cyan-500/25 p-7 shadow-[0_18px_50px_rgba(9,36,82,0.2)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">Infrastructure & operations</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Ammayu Waktole</h3>
                <p className="mt-1 text-sm text-slate-400">IT Support & Network Engineer</p>
              </div>
              <Award className="h-7 w-7 shrink-0 text-cyan-400" />
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">Enterprise support, banking technology, payment systems, Microsoft 365, Azure, and dependable network operations for organisations that cannot afford avoidable downtime.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Network operations", "Cloud platforms", "Banking technology", "Technical support"].map((skill) => <span key={skill} className="rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs text-cyan-200">{skill}</span>)}
            </div>
          </article>

          <article className="glass-panel rounded-2xl border border-cyan-500/25 p-7 shadow-[0_18px_50px_rgba(9,36,82,0.2)]">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-cyan-400">Software & network engineering</p>
                <h3 className="mt-3 text-2xl font-bold text-white">Charles Agyemang</h3>
                <p className="mt-1 text-sm text-slate-400">Software Engineer & Network Engineer</p>
              </div>
              <GitCommit className="h-7 w-7 shrink-0 text-cyan-400" />
            </div>
            <p className="mt-6 text-sm leading-7 text-slate-300">Enterprise infrastructure delivery at BT, with hands-on experience configuring Cisco and Meraki devices, deploying operating systems, troubleshooting connectivity, and building React, Node.js, and Python solutions.</p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {["BT enterprise delivery", "React & Node.js", "Python automation", "Cisco & Meraki"].map((skill) => <span key={skill} className="rounded-full border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 text-xs text-cyan-200">{skill}</span>)}
            </div>
            <a href="https://charlesportofolio.netlify.app/" target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:text-cyan-300">
              View Charles&apos;s portfolio <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </article>
        </div>
      </section>

      {/* 3. MISSION STATEMENT */}
      <section className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="max-w-2xl mx-auto space-y-4">
          <Zap className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Our Mission
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-relaxed">
            &ldquo;{pageContent.hero_subtitle}&rdquo;
          </p>
        </div>
      </section>

     


      {/* 4. CERTIFICATIONS */}
      <section className="space-y-12 pb-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Verification
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional Credentials
          </p>
          <p className="text-sm text-slate-400">
            Validated capabilities from industry leaders in systems engineering and service management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {page_content_json.page_content_about.certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-slate-900/30 border border-white/5 text-left flex flex-col justify-between space-y-4 hover:border-cyan-500/30 transition-all group"
            >
              <div className="space-y-2">
                <div className="p-2.5 rounded bg-slate-900 border border-white/5 w-fit group-hover:bg-cyan-950/20 group-hover:border-cyan-500/25 transition-all">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white tracking-wide pt-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-slate-400">{cert.issuer}</p>
              </div>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Verified</span>
                </span>
                <span>{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
