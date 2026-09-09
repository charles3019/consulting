"use client";

import type { PageContent } from "@/lib/contentDefaults";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Calendar, Sparkles } from "lucide-react";
import InteractiveNetwork from "@/components/InteractiveNetwork";
import ServiceCards from "@/components/ServiceCards";
import { services, PRICING_DISCLAIMER } from "@/lib/services";
import LogoMark from "@/components/LogoMark";
import SocialLinks from "@/components/SocialLinks";

export default function Home({
  page_content_json,
  pageContent,
}: {
  page_content_json: Pick<
    typeof import("@/data/db_fallback.json"),
    "page_content_home" | "services_catalog" | "valueProps"
  >;
  pageContent: PageContent;
}) {
  const [skillIdx, setSkillIdx] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const timer = setInterval(() => {
      setSkillIdx(
        (prev) =>
          (prev + 1) %
          page_content_json.page_content_home.rotatingSkills.length,
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [
    page_content_json.page_content_home.rotatingSkills.length,
    reducedMotion,
  ]);

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
                  {pageContent.hero_title}
                </h1>
                <p className="text-sm sm:text-base text-slate-400 font-mono font-semibold">
                  {pageContent.hero_subtitle}
                </p>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              {pageContent.body_text}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="px-6 py-3 rounded-lg bg-cyan-500 text-black font-bold text-sm text-center tracking-wider hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center justify-center space-x-2"
              >
                <span>Get a Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="px-6 py-3 rounded-lg border border-slate-700 bg-slate-900/60 hover:border-cyan-500/50 hover:bg-cyan-950/20 text-white font-semibold text-sm text-center tracking-wider transition-all flex items-center justify-center space-x-2"
              >
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Explore Our Services</span>
              </Link>
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
                      SERVICE 0{skillIdx + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-white tracking-wide">
                      {
                        page_content_json.page_content_home.rotatingSkills[
                          skillIdx
                        ].text
                      }
                    </h2>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {
                        page_content_json.page_content_home.rotatingSkills[
                          skillIdx
                        ].desc
                      }
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span>UK-BASED • UK-WIDE SUPPORT</span>
                <span>LET&apos;S CONNECT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-cyan-400 text-sm font-semibold">Our Services</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Digital technology. Physical infrastructure.
          </h2>
          <p className="text-slate-300">
            Seven connected services for small businesses and growing
            organisations across the UK.
          </p>
        </div>
        <ServiceCards />
      </section>
      <section className="border-y border-white/5 bg-slate-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why ConnectForge
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {page_content_json.valueProps.map((value) => (
              <article
                key={value.title}
                className="glass-panel p-6 rounded-xl border border-white/10 space-y-3"
              >
                <h3 className="text-xl font-bold text-white">{value.title}</h3>
                <p className="text-sm leading-relaxed text-slate-300">
                  {value.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Starting prices, tailored quotations
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="glass-panel rounded-xl p-5 flex flex-wrap justify-between gap-3 border border-white/10"
            >
              <h3 className="font-semibold text-white">{service.title}</h3>
              <p className="text-cyan-300 font-bold">{service.price}</p>
            </div>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-slate-300">
          {PRICING_DISCLAIMER}
        </p>
      </section>
      <section className="border-y border-white/5 bg-slate-950/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-sm text-cyan-400">Our Work</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Engineering Projects &amp; Solutions
          </h2>
          <p className="max-w-2xl text-slate-300 leading-relaxed">
            Explore internal labs, demonstration applications and engineering
            examples. These illustrate technical approaches and are not
            presented as completed customer engagements.
          </p>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-cyan-300 font-semibold"
          >
            Explore Our Work <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Technology Solutions for Growing Organisations
        </h2>
        <p className="text-slate-300 max-w-2xl">
          We can support a wide range of organisations, with software,
          connectivity and on-site infrastructure planned around how each
          business works.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Small Businesses",
            "Offices",
            "Retail",
            "Restaurants & Hospitality",
            "Churches & Community Organisations",
            "Warehouses",
            "Professional Services",
            "Start-ups",
            "Property Businesses",
          ].map((industry) => (
            <h3
              key={industry}
              className="rounded-xl border border-white/10 p-5 text-white font-semibold"
            >
              {industry}
            </h3>
          ))}
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-cyan-500/30 space-y-6">
          <h2 className="text-3xl font-bold text-white">
            Tell us what you need.
          </h2>
          <p className="text-slate-300 max-w-2xl">
            Planning a technology project or need technical support? We will
            help you find the right solution, with a free, no-obligation quote.
          </p>
          <Link
            href="/contact"
            className="inline-flex rounded-lg bg-cyan-500 px-6 py-3 font-bold text-black hover:bg-cyan-400"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
      {/* SOCIAL AWARENESS & COMMUNITY */}
      <section
        id="social"
        className="relative py-24 border-y border-white/5 overflow-hidden"
      >
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
                We share practical engineering insights, project stories,
                automation tips, and ideas from our internal engineering
                projects.
              </p>
              <SocialLinks />
              <p className="text-xs text-slate-500">
                Follow our latest projects, practical tips, and service updates.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                [
                  "Build in public",
                  "Behind-the-scenes updates from networks, websites, automations, and apps.",
                ],
                [
                  "Practical insights",
                  "Short, useful guidance that business owners and technical teams can apply.",
                ],
                [
                  "Founder stories",
                  "The people, decisions, and lessons shaping ConnectForge IT Services.",
                ],
                [
                  "Community first",
                  "Conversations, questions, and collaborations—not one-way corporate broadcasts.",
                ],
              ].map(([title, description], index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 hover:border-cyan-500/30 transition-colors"
                >
                  <span className="text-xs font-mono text-cyan-400">
                    0{index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
