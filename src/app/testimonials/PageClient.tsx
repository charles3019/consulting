"use client";

import React, { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User, Terminal } from "lucide-react";

interface Testimonial {
  id: number;
  author: string;
  role: string;
  company: string;
  stars: number;
  review: string;
  project: string;
}

const testimonialsData: Testimonial[] = [
  {
    id: 1,
    author: "Sarah Jenkins",
    role: "Director of Operations",
    company: "Apex Logistics Ltd",
    stars: 5,
    review: "Ammayu automated our deployment process and reduced operational overhead significantly. What used to take our systems team days of manual configuration now runs in 15 minutes via pipelines.",
    project: "Enterprise Infrastructure Automation"
  },
  {
    id: 2,
    author: "David Vance",
    role: "Chief Technology Officer",
    company: "Symphony Consulting",
    stars: 5,
    review: "The custom Power Apps timesheet system built by Ammayu transformed our weekly contractor billing. It completely removed spreadsheet delays and automated our manager approval workflow.",
    project: "Power Apps Timesheet System"
  },
  {
    id: 3,
    author: "Pastor Thomas G.",
    role: "Administrative Director",
    company: "Grace Community Church",
    stars: 5,
    review: "We needed an easy-to-use registration and donation tracker for our parish events. Ammayu built a highly reliable forms tool that simplified our logistics and saved our staff dozens of hours.",
    project: "Church Event Platform"
  },
  {
    id: 4,
    author: "Elena Rostova",
    role: "VP of Engineering",
    company: "Grid Analytics Group",
    stars: 5,
    review: "Ammayu audited our AWS account and designed an interactive dashboard tracking our live hosting spend. We decommissioned underutilized servers and saved $15,000 in our first month.",
    project: "Operational KPI Dashboard"
  }
];

export default function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 top-10 right-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 left-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          CLIENT TELEMETRY
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Client Testimonials
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Read verified reviews from enterprise technology directors, business leaders, and community managers who optimized their systems with my services.
        </p>
      </div>

      {/* Sliding Card Showcase */}
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Active Testimonial Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-white/10 relative text-left min-h-64 flex flex-col justify-between overflow-hidden">
          {/* Top Quote Icon decorations */}
          <div className="absolute top-6 right-8 text-slate-800 opacity-20 pointer-events-none">
            <Quote className="w-24 h-24 stroke-[1]" />
          </div>

          <div className="space-y-6 relative z-10">
            {/* Stars */}
            <div className="flex space-x-1">
              {Array.from({ length: testimonialsData[activeIdx].stars }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
              ))}
            </div>

            {/* Review content */}
            <p className="text-base sm:text-lg text-slate-200 italic leading-relaxed">
              &ldquo;{testimonialsData[activeIdx].review}&rdquo;
            </p>
          </div>

          {/* Author footer */}
          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-slate-900 border border-white/10 rounded-full">
                <User className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight">
                  {testimonialsData[activeIdx].author}
                </h4>
                <p className="text-xs text-slate-400">
                  {testimonialsData[activeIdx].role}, <span className="font-semibold text-slate-300">{testimonialsData[activeIdx].company}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-[10px] font-mono text-cyan-500">
              <Terminal className="w-3.5 h-3.5" />
              <span>PROJECT: {testimonialsData[activeIdx].project.toUpperCase()}</span>
            </div>

          </div>
        </div>

        {/* Carousel Slide Controls */}
        <div className="flex items-center justify-between px-2">
          <span className="font-mono text-xs text-slate-500">
            RECORD {activeIdx + 1} OF {testimonialsData.length}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 hover:text-white hover:border-cyan-500/50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
