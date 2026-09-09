"use client";

import Link from "next/link";
import SocialLinks from "@/components/SocialLinks";
import { services } from "@/lib/services";
import React, { useState } from "react";
import { submitContactInquiry } from "@/app/actions/public";
import { Mail, Clock, Send, CheckCircle, Terminal } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    location: "",
    preferredContact: "",
    website: "",
    details: "",
  });
  const [isSent, setIsSent] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);
    setError("");
    try {
      const result = await submitContactInquiry(formData);
      if (result.success) setIsSent(true);
      else setError(result.message);
    } catch {
      setError("We couldn't send your message. Please try again.");
    } finally {
      setPending(false);
    }
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
          Let&apos;s Talk About Your Project
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Need a website, business application, network installation, CCTV
          system or reliable IT support? Tell us what you need and our team will
          help you find the right solution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start text-left">
        {/* Left Side: Contact Form (7 Columns) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
          {isSent ? (
            /* Sent Success Panel */
            <div role="status" className="space-y-6 text-center py-12">
              <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-pulse">
                <Send className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  Message Received
                </h2>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  THANK YOU FOR CONTACTING CONNECTFORGE
                </p>
              </div>

              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed pt-2">
                Thank you for contacting ConnectForge IT Services. Our team will
                review your enquiry and normally respond within one business
                day.
              </p>

              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    phone: "",
                    service: "",
                    location: "",
                    preferredContact: "",
                    website: "",
                    details: "",
                  });
                }}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                Send New Message
              </button>
            </div>
          ) : (
            /* Active Form */
            <form
              id="contact-form"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {error && (
                <p role="alert" className="text-sm text-red-300">
                  {error}
                </p>
              )}
              <div className="flex items-center space-x-2 pb-3 border-b border-white/5 mb-4">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h2 className="text-lg font-semibold text-white">
                  Tell Us What You Need
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-300 block"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    autoComplete="name"
                    maxLength={100}
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-300 block"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    maxLength={150}
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label
                    htmlFor="company"
                    className="text-sm font-medium text-slate-300 block"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    autoComplete="organization"
                    maxLength={150}
                    placeholder="Optional"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-medium text-slate-300 block"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    autoComplete="tel"
                    maxLength={50}
                    placeholder="Optional"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="service"
                  className="block text-sm text-slate-300"
                >
                  Service Required
                </label>
                <select
                  id="service"
                  required
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full rounded bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                >
                  <option value="">Choose a service</option>
                  {services.map((service) => (
                    <option key={service.id}>{service.title}</option>
                  ))}
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="location"
                  className="block text-sm text-slate-300"
                >
                  Postcode / Location
                </label>
                <input
                  id="location"
                  autoComplete="postal-code"
                  maxLength={150}
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full rounded bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                  placeholder="Your postcode or town (optional)"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="preferredContact"
                  className="block text-sm text-slate-300"
                >
                  Preferred Contact Method (optional)
                </label>
                <select
                  id="preferredContact"
                  value={formData.preferredContact}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      preferredContact: e.target.value,
                    })
                  }
                  className="w-full rounded bg-slate-900 border border-slate-700 p-3 text-sm text-white"
                >
                  <option value="">No preference</option>
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="details"
                  className="text-sm font-medium text-slate-300 block"
                >
                  Project Details
                </label>
                <textarea
                  id="details"
                  maxLength={10000}
                  required
                  rows={5}
                  placeholder="Tell us what service you need, your location and a brief description of the project or issue."
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-base sm:text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                />
              </div>

              <p className="text-xs text-slate-400">
                We use your information to respond to your enquiry and prepare a
                quotation. Read our{" "}
                <Link href="/privacy" className="text-cyan-300 underline">
                  Privacy Policy
                </Link>
                .
              </p>
              <div className="pt-4 border-t border-white/5 flex justify-end">
                <button
                  type="submit"
                  disabled={pending}
                  className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{pending ? "Sending..." : "Request a Quote"}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Right Side: Professional Card (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Contacts Details Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/10 text-left space-y-4">
            <h2 className="text-base font-bold text-white">
              Contact Information
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Use our enquiry form or the existing contact profiles below.
            </p>

            <div className="space-y-3 pt-2">
              <a
                href="#contact-form"
                className="flex items-center space-x-3 text-xs text-slate-300 hover:text-cyan-400 transition-colors"
              >
                <div className="p-2 rounded bg-slate-900 border border-white/5">
                  <Mail className="w-4 h-4 text-cyan-400" />
                </div>
                <span>Send a secure enquiry</span>
              </a>
              <SocialLinks />
            </div>
          </div>

          {/* Availability Card */}
          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/5 text-left space-y-3">
            <h2 className="text-base font-bold text-white flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span>How We Can Help</span>
            </h2>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                Contact us for websites, applications, networks, installations,
                CCTV, IT support and on-site engineering.
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
