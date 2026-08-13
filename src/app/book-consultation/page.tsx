"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle,
  Server,
  Workflow,
  Cloud,
  Layers,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface ConsultType {
  id: string;
  title: string;
  duration: string;
  icon: React.ReactNode;
  desc: string;
}

const consultTypes: ConsultType[] = [
  {
    id: "infra",
    title: "Infrastructure Review",
    duration: "1 Hour",
    icon: <Server className="w-5 h-5 text-cyan-400" />,
    desc: "Review your current physical/virtual server configurations, monitoring alerts, and outline load balancing upgrades."
  },
  {
    id: "devops",
    title: "DevOps Assessment",
    duration: "2 Hours",
    icon: <Workflow className="w-5 h-5 text-emerald-400" />,
    desc: "Deep-dive into configuration pipelines, container deployment templates, secrets control, and developer workflows."
  },
  {
    id: "cloud",
    title: "Cloud Strategy Session",
    duration: "2 Hours",
    icon: <Cloud className="w-5 h-5 text-blue-400" />,
    desc: "Map your on-premises architecture to cloud, optimize multi-region server costs, and review VPC security groups."
  },
  {
    id: "power",
    title: "Power Platform Consultation",
    duration: "1 Hour",
    icon: <Layers className="w-5 h-5 text-pink-400" />,
    desc: "Discuss automating office spreadsheets, building customized Canvas Apps, and triggering approval workflows."
  }
];

const timeSlots = ["09:00", "10:30", "13:00", "14:30", "16:00"];

export default function BookConsultation() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    details: ""
  });
  const [isBooked, setIsBooked] = useState(false);

  // Calendar dates mock helper (current month mock)
  const currentMonthName = "June 2026";
  const daysInMonth = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDayPadding = 1; // starts on Tuesday

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  const activeTypeDetails = consultTypes.find((t) => t.id === selectedType);

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 space-y-16">
      
      {/* Background glow blobbies */}
      <div className="glow-glow w-96 h-96 bg-cyan-500/5 -top-10 left-10" />
      <div className="glow-glow w-96 h-96 bg-purple-500/5 bottom-20 right-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <span className="text-xs font-mono font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          BOOK SESSION
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Schedule A Consultation
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed">
          Select a session type, pick an open date slot on the lab calendar, and submit your project parameters to schedule a review.
        </p>
      </div>

      {isBooked ? (
        /* Success Screen */
        <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-cyan-500/30 max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
            <CheckCircle className="w-8 h-8" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Consultation Confirmed</h2>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              SCHEDULED IN DATABASE SYSTEM
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-white/5 space-y-3 text-left text-sm max-w-md mx-auto">
            <div className="flex justify-between text-xs font-mono text-slate-400 pb-2 border-b border-white/5">
              <span>PARAMETER</span>
              <span>VALUE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Type:</span>
              <span className="text-white font-bold">{activeTypeDetails?.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Duration:</span>
              <span className="text-white">{activeTypeDetails?.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="text-white">June {selectedDate}, 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Time:</span>
              <span className="text-white">{selectedTime} UK Time</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Contact:</span>
              <span className="text-white truncate max-w-xs">{formData.email}</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            A secure invite containing the video link and calendar blocker has been sent to your inbox. Let&apos;s automate your systems!
          </p>

          <button
            onClick={() => {
              setIsBooked(false);
              setStep(1);
              setSelectedType("");
              setSelectedDate(null);
              setSelectedTime("");
              setFormData({ name: "", email: "", company: "", details: "" });
            }}
            className="px-6 py-2.5 text-xs font-semibold rounded bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.15)]"
          >
            Schedule Another Session
          </button>
        </div>
      ) : (
        /* Steps Booking Flow */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Side (Step Indicators / Summary Card) (4 Columns) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Step Indicators */}
            <div className="glass-panel p-5 rounded-xl border border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step === 1 ? "bg-cyan-500 text-black" : step > 1 ? "bg-emerald-500/30 text-emerald-400" : "bg-slate-900 text-slate-500"
                }`}>
                  1
                </span>
                <span className={`text-xs font-semibold ${step === 1 ? "text-cyan-400" : step > 1 ? "text-emerald-400" : "text-slate-500"}`}>
                  Select Consultation Type
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step === 2 ? "bg-cyan-500 text-black" : step > 2 ? "bg-emerald-500/30 text-emerald-400" : "bg-slate-900 text-slate-500"
                }`}>
                  2
                </span>
                <span className={`text-xs font-semibold ${step === 2 ? "text-cyan-400" : step > 2 ? "text-emerald-400" : "text-slate-500"}`}>
                  Pick Date & Time
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                  step === 3 ? "bg-cyan-500 text-black" : "bg-slate-900 text-slate-500"
                }`}>
                  3
                </span>
                <span className={`text-xs font-semibold ${step === 3 ? "text-cyan-400" : "text-slate-500"}`}>
                  Run Diagnostics Details
                </span>
              </div>
            </div>

            {/* Selected Booking Info Preview */}
            {selectedType && (
              <div className="glass-panel p-5 rounded-xl border border-cyan-500/20 bg-cyan-950/5 text-left space-y-3">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Live Selection Data
                </span>
                <h3 className="font-bold text-white text-sm">{activeTypeDetails?.title}</h3>
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Duration: {activeTypeDetails?.duration}</span>
                  </div>
                  {selectedDate && (
                    <div className="flex items-center space-x-2">
                      <CalendarIcon className="w-4 h-4 text-cyan-400" />
                      <span>Date: June {selectedDate}, 2026</span>
                    </div>
                  )}
                  {selectedTime && (
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Time: {selectedTime} UK Time</span>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>

          {/* Right Side (Active Step Work Area) (8 Columns) */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 text-left">
            
            {/* STEP 1: Select Type */}
            {step === 1 && (
              <div className="space-y-6">
                <h3 className="text-base font-bold text-white">Select Consultation Service</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {consultTypes.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => {
                        setSelectedType(t.id);
                        setStep(2);
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedType === t.id
                          ? "bg-cyan-950/25 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                          : "bg-slate-900/40 border-white/5 hover:border-cyan-500/30 hover:bg-slate-900/80"
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-slate-900 border border-white/10 rounded">
                          {t.icon}
                        </div>
                        <h4 className="font-bold text-sm text-white">{t.title}</h4>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        {t.desc}
                      </p>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
                        <span>DURATION</span>
                        <span className="text-cyan-400 font-bold">{t.duration}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Pick Date & Time */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">Pick Lab Booking Time</h3>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    &lt; Change Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  
                  {/* Calendar Widget */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="font-mono text-xs text-white uppercase tracking-wider">
                        {currentMonthName}
                      </span>
                      <div className="flex space-x-1">
                        <button disabled className="p-1 rounded text-slate-600 cursor-not-allowed">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button disabled className="p-1 rounded text-slate-600 cursor-not-allowed">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-mono text-slate-500 font-semibold mb-2">
                      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {/* Empty padding blocks */}
                      {Array.from({ length: startDayPadding }).map((_, i) => (
                        <div key={`pad-${i}`} className="aspect-square" />
                      ))}
                      {/* Day blocks */}
                      {daysInMonth.map((day) => {
                        const isWeekend = (day + startDayPadding) % 7 === 0 || (day + startDayPadding) % 7 === 6;
                        const isSelected = selectedDate === day;
                        return (
                          <button
                            key={day}
                            onClick={() => !isWeekend && setSelectedDate(day)}
                            disabled={isWeekend}
                            className={`aspect-square rounded text-xs font-mono flex items-center justify-center transition-all ${
                              isWeekend
                                ? "text-slate-700 cursor-not-allowed bg-transparent"
                                : isSelected
                                ? "bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                : "bg-slate-900 border border-white/5 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-950"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Timeslots Widget */}
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-slate-500 uppercase tracking-wider block">
                      Available Time Slots
                    </span>

                    {selectedDate ? (
                      <div className="grid grid-cols-1 gap-2">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`w-full py-2.5 rounded-lg text-xs font-mono border transition-all ${
                              selectedTime === time
                                ? "bg-cyan-500 text-black font-bold border-cyan-500"
                                : "bg-slate-900 border-white/5 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-950"
                            }`}
                          >
                            {time} UK Time
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="h-48 rounded bg-slate-950/40 border border-white/5 flex items-center justify-center text-center p-4">
                        <p className="text-xs text-slate-500 font-mono">
                          Select a calendar date to run time availability diagnostics.
                        </p>
                      </div>
                    )}
                  </div>

                </div>

                {/* Next Button */}
                {selectedDate && selectedTime && (
                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-all flex items-center space-x-2 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                    >
                      <span>Input Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* STEP 3: Complete Details Form */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-white">Input Project Parameters</h3>
                  <button
                    onClick={() => setStep(2)}
                    className="text-xs font-mono text-slate-400 hover:text-white"
                  >
                    &lt; Change Schedule
                  </button>
                </div>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="name" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Full Name
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
                    <div className="space-y-1.5 text-left">
                      <label htmlFor="email" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                        Corporate Email
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

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="company" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      required
                      placeholder="Acme Logistics Inc"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="details" className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      System Diagnostics / Project Details
                    </label>
                    <textarea
                      id="details"
                      required
                      rows={4}
                      placeholder="Describe your current system bottlenecks, technology stack, and expectations..."
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      className="w-full px-3 py-2.5 rounded bg-slate-900 border border-white/5 text-white text-xs focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-4 border-t border-white/5 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-lg bg-cyan-500 text-black hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(6,182,212,0.2)] flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Confirm Appointment</span>
                    </button>
                  </div>
                </form>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
