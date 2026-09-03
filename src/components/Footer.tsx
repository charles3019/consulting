"use client";

import React from "react";
import Link from "next/link";
import { Mail, Calendar, Clock } from "lucide-react";
import LogoMark from "@/components/LogoMark";
import SocialLinks from "@/components/SocialLinks";

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950/80 border-t border-white/5 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand & Mission */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <LogoMark compact />
            <p className="text-xs text-slate-400 leading-relaxed">
              Secure networks, modern digital products, and practical automation built for growing organisations.
            </p>
            <SocialLinks compact />
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Services</h3>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Network Engineering
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  Automation Consulting
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cyan-400 transition-colors">
                  App Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Consultation Availability */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Office Details</h3>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Mon–Fri, 09:00–18:00 UK Time</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>Bookings: 24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>Use our secure contact form</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Stay Updated</h3>
            <p className="text-xs text-slate-400">
              Get modern  guides and automation tips.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex space-x-2 pt-1">
              <input
                type="email"
                placeholder="you@company.com"
                className="w-full px-3 py-2 text-xs rounded bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="px-3 py-2 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
              >
                Join
              </button>
            </form>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} ConnectForge Technologies Ltd. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
