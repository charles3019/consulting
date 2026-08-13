"use client";

import React, { useState } from "react";
import {
  Mail,
  Clock,
  Send,
  CheckCircle,
  Terminal
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    details: ""
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 -top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 right-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          CONTACT CENTRE
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Initiate Connection
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Need an emergency systems repair, custom script migration, or seeking a DevOps retainer contract? Send your details below to establish contact.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        
        {/* Left Side: Contact Form (7 Columns) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          {isSent ? (
            /* Sent Success Panel */
            <div className="space-y-6 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">Message Dispatched</h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  STATUS CODE: 200 OK // ROUTE_SUCCESS
                </p>
              </div>

              {/* Console Logs style receipt */}
              <div className="bg-black/60 p-4 rounded-lg font-mono text-xs text-emerald-400 max-w-md mx-auto space-y-1.5 border border-white/5">
                <p><span className="text-slate-600">&gt;</span> connection established</p>
                <p><span className="text-slate-600">&gt;</span> packaging message parameters...</p>
                <p><span className="text-slate-600">&gt;</span> payload size: {JSON.stringify(formData).length} bytes</p>
                <p><span className="text-slate-600">&gt;</span> dispatching to: contact@ammayu.com</p>
                <p className="text-cyan-400"><span className="text-slate-600">&gt;</span> message queued in outbound buffer</p>
              </div>

              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-2">
                Thank you for reaching out. I usually review diagnostics payloads and respond within 12–24 business hours.
              </p>

              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ name: "", email: "", company: "", phone: "", details: "" });
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                Send New Message
              </button>
            </div>
          ) : (
            /* Active Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex items-center space-x-2 pb-3 border-b border-white/5 mb-4">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">
                  Outbound Transmission Form
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="company" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    placeholder="Optional"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    placeholder="Optional"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="details" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block font-semibold">
                  Project Details / Transmission Payload
                </label>
                <textarea
                  id="details"
                  required
                  rows={5}
                  placeholder="Tell me about your systems, the technologies you are using, and the goals you want to achieve..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Transmit Payload</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Side: Professional Card (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Contacts Details Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-4">
            <h3 className="text-base font-bold text-white">Contact Information</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              If you prefer direct routes, reach out via email or connect on professional registries:
            </p>
            
            <div className="space-y-3 pt-2">
              <a
                href="mailto:contact@ammayu.com"
                className="flex items-center space-x-3 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded bg-slate-900 border border-white/5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>contact@ammayu.com</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded bg-slate-900 border border-white/5">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <span>linkedin.com/in/ammayu-waktole</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded bg-slate-900 border border-white/5">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-cyan-400"
                  >
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                    <path d="M9 18c-4.51 2-5-2-7-2" />
                  </svg>
                </div>
                <span>github.com/ammayu-waktole</span>
              </a>
            </div>
          </div>

          {/* Availability Card */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5 text-left space-y-3">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>Availability Diagnostics</span>
            </h3>
            
            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                Currently taking on new consulting contracts, infrastructure audits, and custom Power Platform setups.
              </p>
              <div className="flex items-center space-x-2 pt-2 text-slate-400 font-mono text-[10px]">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Mon–Fri, 09:00–18:00 UK Time</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
