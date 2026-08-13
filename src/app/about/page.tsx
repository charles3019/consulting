"use client";

import React, { useState } from "react";
import Image from "next/image";
import page_content_json from "../../data/db_fallback.json";
import { motion } from "framer-motion";
import {
  Award,
  ChevronRight,
  GitCommit,
  Milestone,
  ShieldCheck,
  Zap
} from "lucide-react";
import { getDefaultPageContent } from "@/lib/contentDefaults";
import { useManagedPageContent } from "@/lib/useManagedPageContent";

interface TimelineEvent {
  year: string;
  role: string;
  company: string;
  desc: string;
  actions: string[];
}
/* 
const timelineData: TimelineEvent[] = [
  {
    year: "2024 - Present",
    role: "Independent Technical Consultant",
    company: "Freelance",
    desc: "Helping global clients deploy reliable multi-cloud systems, automate configuration updates via Ansible and Terraform, and transition manual workflows to clean Power Platform solutions.",
    actions: [
      "Designed secure hybrid VPN links for multi-national logistics clients",
      "Audited cloud bills, saving up to 40% on monthly computing fees",
      "Conducted developer bootcamps on IaC best practices"
    ]
  },
  {
    year: "2021 - 2024",
    role: "Automation Specialist & Systems Engineer",
    company: "Enterprise Cloud Provider",
    desc: "Focused on infrastructure-as-code scalability and automated testing environments. Standardized developer server clusters.",
    actions: [
      "Wrote custom Terraform modules reducing provisioning overhead by 80%",
      "Constructed automated backup scripts using Bash/Python and S3 APIs",
      "Maintained zero-drift configurations across RHEL server environments"
    ]
  },
  {
    year: "2018 - 2021",
    role: "Systems Administrator",
    company: "Regional IT Solutions",
    desc: "Managed high-availability Linux servers, Active Directory systems, corporate subnets, and local virtualization hypervisors.",
    actions: [
      "Migrated legacy hardware to VMware ESXi virtual clusters",
      "Configured secure local firewalls, HAProxy load balancers, and DNS paths",
      "Managed databases and automated backup restoration runs"
    ]
  },
  {
    year: "2016 - 2018",
    role: "IT Support Engineer",
    company: "Local Technology Corp",
    desc: "Diagnosed hardware faults, deployed office workstations, and configured primary network routers and access points.",
    actions: [
      "Assembled and provisioned initial CentOS fileservers",
      "Resolved support tickets, maintaining a 98% client-satisfaction rating",
      "Constructed local network layouts and physical cable runs"
    ]
  }
]; */

/* const certifications = [
  { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2024" },
  { name: "Microsoft Certified: Power Platform Developer", issuer: "Microsoft", date: "2023" },
  { name: "Red Hat Certified System Administrator (RHCSA)", issuer: "Red Hat", date: "2022" },
  { name: "ITIL Foundation - IT Service Management", issuer: "AXELOS", date: "2021" }
]; */

export default function About() {
  const [activeEvent, setActiveEvent] = useState<number>(0);
  const pageContent = useManagedPageContent("about", getDefaultPageContent("about"));

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
              alt="Ammayu sitting at tech workstation"
              fill
              sizes="(max-w-720px) 100vw, 400px"
              priority
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Right Side: Text Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
            ABOUT ME
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {pageContent.hero_title}
          </h1>
          
          <div className="text-sm text-slate-300 space-y-4 leading-relaxed">
            <p>
              {page_content_json.page_content_about.about.body_text}
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

      {/* 2. MISSION STATEMENT */}
      <section className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        <div className="max-w-2xl mx-auto space-y-4">
          <Zap className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            My Mission
          </h2>
          <p className="text-xl sm:text-2xl font-bold text-white tracking-wide leading-relaxed">
            &ldquo;{pageContent.hero_subtitle}&rdquo;
          </p>
        </div>
      </section>

      {/* 3. INTERACTIVE VERTICAL TIMELINE */}
      <section className="space-y-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Experience History
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Career Timeline
          </p>
          <p className="text-sm text-slate-400">
            Select a milestone point to run system check logs and read my detailed project inputs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline Node List (Left 5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2 space-y-4">
            {page_content_json.page_content_about.timelineData.map((ev, idx) => (
              <div
                key={idx}
                onClick={() => setActiveEvent(idx)}
                className={`flex items-start gap-4 p-4 rounded-xl cursor-pointer transition-all border ${
                  activeEvent === idx
                    ? "bg-cyan-950/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.1)]"
                    : "bg-slate-900/30 border-white/5 hover:bg-slate-900/60"
                }`}
              >
                <div className="mt-1 flex flex-col items-center shrink-0">
                  <GitCommit
                    className={`w-5 h-5 ${
                      activeEvent === idx ? "text-cyan-400 scale-125" : "text-slate-500"
                    } transition-all`}
                  />
                </div>
                <div className="text-left">
                  <span className={`text-xs font-mono ${activeEvent === idx ? "text-cyan-400" : "text-slate-500"}`}>
                    {ev.year}
                  </span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{ev.role}</h3>
                  <p className="text-xs text-slate-400">{ev.company}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Timeline Diagnostics Output (Right 7 Cols) */}
          <div className="lg:col-span-7 glass-panel p-6 rounded-xl border border-white/10 flex flex-col justify-between">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <Milestone className="w-4 h-4 text-cyan-400" />
                  <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                    Milestone Details
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cyan-400">
                  STAMP: {page_content_json.page_content_about.timelineData[activeEvent].year.split(" ")[0]}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  {page_content_json.page_content_about.timelineData[activeEvent].role}
                </h3>
                <p className="text-xs font-semibold text-cyan-400 font-mono">
                  @{page_content_json.page_content_about.timelineData[activeEvent].company}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-2">
                  {page_content_json.page_content_about.timelineData[activeEvent].desc}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono font-semibold text-slate-500 uppercase">
                  Key Achievements / Operations:
                </h4>
                <ul className="space-y-1.5">
                  {page_content_json.page_content_about.timelineData[activeEvent].actions.map((act, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start space-x-2">
                      <span className="text-cyan-500 mt-0.5 font-bold">-</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
              <span>SYSTEM DIAGNOSTIC CODE: 0x0{activeEvent + 1}F</span>
              <span>VERIFIED: PASS</span>
            </div>
          </div>

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
