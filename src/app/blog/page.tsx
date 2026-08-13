"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Calendar,
  Clock,
  Search,
  Tag,
  ArrowRight
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  category: "DevOps" | "Linux" | "Cloud" | "Power Platform" | "Infrastructure" | "Automation";
  summary: string;
  readTime: string;
  date: string;
  author: string;
}

const postsData: Post[] = [
  {
    id: 1,
    title: "Securing GitOps Pipelines: Hardening with tfsec & tflint",
    category: "DevOps",
    summary: "How to inject automatic security scans and configuration checks into GitHub Actions. Block unsafe resource definitions before they apply.",
    readTime: "6 min read",
    date: "Jun 12, 2026",
    author: "Ammayu Waktole"
  },
  {
    id: 2,
    title: "Tuning Nginx HA Clusters for High Concurrency Web Workloads",
    category: "Linux",
    summary: "A deep dive into sysctl configurations, I/O limits, workers bindings, and keepalive pools to optimize HAProxy/Nginx load balancing.",
    readTime: "8 min read",
    date: "May 28, 2026",
    author: "Ammayu Waktole"
  },
  {
    id: 3,
    title: "AWS Transit Gateway: Designing Secure Hub-and-Spoke Networks",
    category: "Cloud",
    summary: "Step-by-step architectural guide to connecting VPC networks, local data gateways, and security inspect stacks under a single router.",
    readTime: "10 min read",
    date: "May 15, 2026",
    author: "Ammayu Waktole"
  },
  {
    id: 4,
    title: "Connecting Canvas Power Apps to SQL Server Database Securely",
    category: "Power Platform",
    summary: "Avoid security leaks. How to leverage On-Premises Data Gateways and Service Principal auth to read database tables in custom apps.",
    readTime: "7 min read",
    date: "Apr 22, 2026",
    author: "Ammayu Waktole"
  },
  {
    id: 5,
    title: "Decommissioning Local Hardware: A Cloud Migration Checklist",
    category: "Infrastructure",
    summary: "De-risking migrations. A step-by-step guide to staging local VMs, syncing storage pools, and verifying virtual router setups.",
    readTime: "5 min read",
    date: "Apr 05, 2026",
    author: "Ammayu Waktole"
  },
  {
    id: 6,
    title: "Ansible Vault: Managing Environment Secrets in Source Control",
    category: "Automation",
    summary: "Keep database passwords out of raw Git histories. How to encrypt configuration variables safely in Ansible playbook setups.",
    readTime: "6 min read",
    date: "Mar 18, 2026",
    author: "Ammayu Waktole"
  }
];

const categories = ["All", "DevOps", "Linux", "Cloud", "Power Platform", "Infrastructure", "Automation"];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = postsData.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 -top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 right-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          ENGINEERING BLOG
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Systems & Automations Guide
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Sharing deep technical insights, step-by-step tutorials, and architectural checklists built from years of resolving infrastructure problems.
        </p>
      </div>

      {/* Search Bar & Categories Container */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Search tutorials, configs, and guides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold uppercase tracking-wider border transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-cyan-950/40 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                  : "bg-slate-900/30 border-white/5 text-slate-400 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300 text-left"
          >
            <div className="space-y-4">
              
              {/* Category & Date metadata */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center space-x-1.5 text-xs text-cyan-400 font-mono">
                  <Tag className="w-3.5 h-3.5" />
                  <span>{post.category}</span>
                </div>
                <div className="flex items-center space-x-1 text-[10px] text-slate-500 font-mono">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
              </div>

              {/* Title & Summary */}
              <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                {post.summary}
              </p>

            </div>

            {/* Footer metadata */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-[10px] text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </div>
              <button className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1">
                <span>Read Article</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </article>
        ))}
        
        {filteredPosts.length === 0 && (
          <div className="col-span-full text-center text-slate-500 font-mono py-12">
            No matching engineering guides found. Try adjusting your query.
          </div>
        )}
      </div>

    </div>
  );
}
