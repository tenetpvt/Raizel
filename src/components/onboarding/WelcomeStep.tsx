"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface WelcomeStepProps {
  onContinue: () => void;
}

export function WelcomeStep({ onContinue }: WelcomeStepProps) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center relative overflow-hidden select-none">
      {/* Ambient background glow & celestial particle underlay */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div
          className="w-[520px] h-[520px] rounded-full bg-primary/5 blur-[120px] opacity-70 animate-pulse"
          style={{ animationDuration: "8s" }}
        />
        <div className="absolute w-[280px] h-[280px] rounded-full bg-[#3D277D]/15 blur-[90px] -translate-y-8" />
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <circle
            className="animate-ping"
            cx="15%"
            cy="22%"
            fill="#baecff"
            r="1"
            style={{ animationDuration: "6s", animationIterationCount: "infinite", opacity: 0.35 }}
          />
          <circle
            className="animate-pulse"
            cx="82%"
            cy="18%"
            fill="#ffffff"
            r="0.75"
            style={{ animationDuration: "4s" }}
          />
          <circle cx="28%" cy="75%" fill="#baecff" opacity="0.4" r="0.5" />
          <circle
            className="animate-pulse"
            cx="74%"
            cy="68%"
            fill="#baecff"
            r="1"
            style={{ animationDuration: "5s" }}
          />
          <circle cx="48%" cy="14%" fill="#ffffff" opacity="0.3" r="0.75" />
          <circle cx="62%" cy="85%" fill="#ffffff" opacity="0.25" r="0.5" />
          <circle cx="12%" cy="58%" fill="#ffffff" opacity="0.3" r="0.5" />
          <circle cx="88%" cy="42%" fill="#baecff" opacity="0.35" r="0.75" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center items-center py-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-2xl w-full flex flex-col items-center text-center px-4 z-10"
        >
          {/* Central Sacred Geometry Emblem */}
          <div className="relative mb-6 flex items-center justify-center group cursor-default">
            <div
              className="absolute w-24 h-24 rounded-full bg-primary/20 blur-2xl animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <div className="relative w-14 h-14 rounded-full bg-surface-container-low border border-primary/25 flex items-center justify-center shadow-[0_0_24px_rgba(77,216,255,0.15)] transition-all duration-500 group-hover:scale-105 group-hover:border-primary/40 group-hover:shadow-[0_0_32px_rgba(77,216,255,0.28)]">
              <svg
                className="w-6 h-6 text-primary transition-transform duration-700 group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.25"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" fill="currentColor" r="2" />
                <line x1="12" x2="12" y1="3" y2="7" />
                <line x1="12" x2="12" y1="17" y2="21" />
                <line x1="3" x2="7" y1="12" y2="12" />
                <line x1="17" x2="21" y1="12" y2="12" />
                <circle cx="12" cy="12" opacity="0.4" r="7" strokeDasharray="2 3" />
              </svg>
            </div>
          </div>

          {/* Subheader badge */}
          <div className="flex items-center gap-2 mb-4 opacity-90">
            <span className="font-mono text-[11px] tracking-widest text-primary uppercase font-medium">
              Welcome
            </span>
            <span className="text-outline-variant">•</span>
            <span className="font-mono text-[11px] tracking-widest text-on-surface-variant uppercase font-medium">
              01 Discovery
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white font-bold tracking-tight max-w-xl leading-tight mb-4">
            Your universe begins in the quiet.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-lg text-on-surface-variant max-w-md font-normal leading-relaxed mb-8">
            Raizel turns your daily habits, deep work, and quiet effort into something you can see grow.
          </p>

          {/* CTA Box */}
          <div className="flex flex-col items-center gap-3 w-full max-w-xs">
            <button
              onClick={onContinue}
              className="group relative w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary text-[#003241] font-medium text-sm transition-all duration-300 shadow-[0_0_20px_rgba(77,216,255,0.25)] hover:shadow-[0_0_36px_rgba(77,216,255,0.45)] hover:brightness-105 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] text-center border border-white/20 overflow-hidden cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
                <span>Continue</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </span>
            </button>
            <span className="font-mono text-[11px] text-outline tracking-normal font-normal">
              Takes less than a minute.
            </span>
          </div>

          {/* Quiet Progress Segment */}
          <div className="mt-10 flex items-center gap-1.5 text-outline/60">
            <div className="w-8 h-0.5 rounded-full bg-primary" />
            <div className="w-2 h-0.5 rounded-full bg-white/10" />
            <div className="w-2 h-0.5 rounded-full bg-white/10" />
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 border-t border-white/[0.04] bg-[#08080c] relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between text-on-surface-variant/50 font-mono text-[11px] uppercase tracking-wider">
          <span>Step 1 of 3</span>
          <span>Welcome</span>
        </div>
      </footer>
    </div>
  );
}
