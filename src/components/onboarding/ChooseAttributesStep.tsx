"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

export interface AttributeItem {
  id: string;
  name: string;
  tag: string;
  colorName: string;
  color: string;
  coreColor: string;
  description: string;
}

export const ATTRIBUTES: AttributeItem[] = [
  {
    id: "intellect",
    name: "Intellect",
    tag: "Focus & Reason",
    colorName: "Astral Cyan",
    color: "#4dd8ff",
    coreColor: "#baecff",
    description: "Deep problem-solving, quiet reflection, and deliberate lifelong curiosity.",
  },
  {
    id: "strength",
    name: "Strength",
    tag: "Form & Power",
    colorName: "Solar Ember",
    color: "#ff6b4a",
    coreColor: "#ffd1c7",
    description: "Physical vitality, movement resilience, and enduring functional energy.",
  },
  {
    id: "discipline",
    name: "Discipline",
    tag: "Rhythm & Will",
    colorName: "Deep Violet",
    color: "#9d7bff",
    coreColor: "#e2d9ff",
    description: "Quiet consistency, morning rituals, and mindful emotional mastery.",
  },
  {
    id: "vitality",
    name: "Vitality",
    tag: "Health & Harmony",
    colorName: "Emerald Light",
    color: "#34d399",
    coreColor: "#a7f3d0",
    description: "Restorative deep sleep, mindful nourishment, and vibrant renewal.",
  },
];

interface ChooseAttributesStepProps {
  selectedAttributes: string[];
  onToggleAttribute: (id: string) => void;
  onContinue: () => void;
}

export function ChooseAttributesStep({
  selectedAttributes,
  onToggleAttribute,
  onContinue,
}: ChooseAttributesStepProps) {
  const count = selectedAttributes.length;

  const isIntellect = selectedAttributes.includes("intellect");
  const isStrength = selectedAttributes.includes("strength");
  const isDiscipline = selectedAttributes.includes("discipline");
  const isVitality = selectedAttributes.includes("vitality");

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center relative overflow-hidden">
      {/* Atmosphere Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-primary/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#3D277D]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center px-6 lg:px-8 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-8 md:gap-10"
        >
          {/* Header */}
          <header className="flex flex-col items-center text-center space-y-3 max-w-2xl mx-auto px-4">
            <span className="font-mono text-[11px] text-primary uppercase tracking-widest font-semibold">
              Step 2 of 3
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-[40px] text-white font-bold tracking-tight">
              Shape your constellation
            </h1>
            <p className="font-sans text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-xl mx-auto">
              Choose the facets of living you wish to cultivate. Each attribute kindles a star node that connects into your personal constellation sky.
            </p>

            {/* Segment indicator */}
            <div className="flex items-center gap-2 pt-2">
              <span className="h-1 w-8 rounded-full bg-surface-container-highest" />
              <span className="h-1 w-12 rounded-full bg-primary shadow-[0_0_12px_rgba(77,216,255,0.4)]" />
              <span className="h-1 w-8 rounded-full bg-surface-container-highest" />
            </div>
          </header>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {/* Intellect Tile */}
            <button
              type="button"
              onClick={() => onToggleAttribute("intellect")}
              className={`attribute-card group relative text-left p-6 rounded-xl transition-all duration-300 flex flex-col justify-between h-[360px] cursor-pointer select-none overflow-hidden ${
                isIntellect
                  ? "bg-[#0A0A10] border border-[#4dd8ff]/40 shadow-[0_0_24px_rgba(77,216,255,0.15)]"
                  : "bg-surface-container-lowest border border-white/[0.06] opacity-60 hover:opacity-90 hover:border-white/20"
              }`}
            >
              <div
                className={`tile-halo absolute inset-0 rounded-xl bg-gradient-to-b from-[#4dd8ff]/15 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                  isIntellect ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="font-mono text-[11px] text-[#4dd8ff] tracking-wider uppercase font-semibold">
                  Focus &amp; Reason
                </span>
                <div
                  className={`check-badge w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isIntellect
                      ? "bg-[#4dd8ff] text-[#003542] shadow-[0_0_10px_rgba(77,216,255,0.5)] scale-100"
                      : "border border-white/20 bg-transparent text-transparent scale-90"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Geometry SVG */}
              <div className="relative w-full h-36 flex items-center justify-center my-auto">
                <div
                  className={`node-glow absolute w-24 h-24 rounded-full bg-[#4dd8ff]/20 blur-2xl transition-all duration-500 ${
                    isIntellect ? "scale-125 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
                <svg
                  className="node-svg w-28 h-28 text-[#4dd8ff] overflow-visible transition-transform duration-500 group-hover:scale-105"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    stroke="currentColor"
                    strokeDasharray="2 3"
                    strokeOpacity="0.35"
                    x1="50"
                    x2="50"
                    y1="12"
                    y2="88"
                  />
                  <line
                    stroke="currentColor"
                    strokeDasharray="2 3"
                    strokeOpacity="0.35"
                    x1="12"
                    x2="88"
                    y1="50"
                    y2="50"
                  />
                  <polygon
                    points="50,22 78,50 50,78 22,50"
                    stroke="currentColor"
                    strokeOpacity="0.55"
                    strokeWidth="1.2"
                  />
                  <circle cx="50" cy="50" fill="currentColor" fillOpacity="0.15" r="14" />
                  <circle
                    className="filter drop-shadow-[0_0_8px_#4dd8ff]"
                    cx="50"
                    cy="50"
                    fill={isIntellect ? "#4dd8ff" : "#4dd8ff66"}
                    r="5.5"
                  />
                  <circle cx="50" cy="22" fill="#baecff" r="2.5" />
                  <circle cx="78" cy="50" fill="#baecff" r="2.5" />
                  <circle cx="50" cy="78" fill="#baecff" r="2.5" />
                  <circle cx="22" cy="50" fill="#baecff" r="2.5" />
                </svg>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-semibold text-white">Intellect</h2>
                  <span className="node-color-label font-mono text-[10px] text-[#4dd8ff]">
                    Astral Cyan
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Deep problem-solving, quiet reflection, and deliberate lifelong curiosity.
                </p>
              </div>
            </button>

            {/* Strength Tile */}
            <button
              type="button"
              onClick={() => onToggleAttribute("strength")}
              className={`attribute-card group relative text-left p-6 rounded-xl transition-all duration-300 flex flex-col justify-between h-[360px] cursor-pointer select-none overflow-hidden ${
                isStrength
                  ? "bg-[#0A0A10] border border-[#ff6b4a]/40 shadow-[0_0_24px_rgba(255,107,74,0.15)]"
                  : "bg-surface-container-lowest border border-white/[0.06] opacity-60 hover:opacity-90 hover:border-white/20"
              }`}
            >
              <div
                className={`tile-halo absolute inset-0 rounded-xl bg-gradient-to-b from-[#ff6b4a]/15 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                  isStrength ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="font-mono text-[11px] text-[#ff6b4a] tracking-wider uppercase font-semibold">
                  Form &amp; Power
                </span>
                <div
                  className={`check-badge w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isStrength
                      ? "bg-[#ff6b4a] text-[#3d0600] shadow-[0_0_10px_rgba(255,107,74,0.5)] scale-100"
                      : "border border-white/20 bg-transparent text-transparent scale-90"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Geometry SVG */}
              <div className="relative w-full h-36 flex items-center justify-center my-auto">
                <div
                  className={`node-glow absolute w-24 h-24 rounded-full bg-[#ff6b4a]/20 blur-2xl transition-all duration-500 ${
                    isStrength ? "scale-125 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
                <svg
                  className="node-svg w-28 h-28 text-[#ff6b4a] overflow-visible transition-transform duration-500 group-hover:scale-105"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="34"
                    stroke="currentColor"
                    strokeDasharray="4 3"
                    strokeOpacity="0.35"
                  />
                  <polygon
                    points="50,16 84,68 16,68"
                    stroke="currentColor"
                    strokeOpacity="0.55"
                    strokeWidth="1.2"
                  />
                  <circle
                    className="filter drop-shadow-[0_0_8px_#ff6b4a]"
                    cx="50"
                    cy="50"
                    fill={isStrength ? "#ff6b4a" : "#ff6b4a66"}
                    r="5.5"
                  />
                  <circle cx="50" cy="16" fill="#ffdad2" r="3" />
                  <circle cx="84" cy="68" fill="#ffdad2" r="3" />
                  <circle cx="16" cy="68" fill="#ffdad2" r="3" />
                </svg>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-semibold text-white">Strength</h2>
                  <span className="node-color-label font-mono text-[10px] text-[#ff6b4a]">
                    Solar Ember
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Physical vitality, movement resilience, and enduring functional energy.
                </p>
              </div>
            </button>

            {/* Discipline Tile */}
            <button
              type="button"
              onClick={() => onToggleAttribute("discipline")}
              className={`attribute-card group relative text-left p-6 rounded-xl transition-all duration-300 flex flex-col justify-between h-[360px] cursor-pointer select-none overflow-hidden ${
                isDiscipline
                  ? "bg-[#0A0A10] border border-[#9d7bff]/40 shadow-[0_0_24px_rgba(157,123,255,0.15)]"
                  : "bg-surface-container-lowest border border-white/[0.06] opacity-60 hover:opacity-90 hover:border-white/20"
              }`}
            >
              <div
                className={`tile-halo absolute inset-0 rounded-xl bg-gradient-to-b from-[#9d7bff]/15 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                  isDiscipline ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="font-mono text-[11px] text-[#9d7bff] tracking-wider uppercase font-semibold">
                  Rhythm &amp; Will
                </span>
                <div
                  className={`check-badge w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDiscipline
                      ? "bg-[#9d7bff] text-[#21005e] shadow-[0_0_10px_rgba(157,123,255,0.5)] scale-100"
                      : "border border-white/20 bg-transparent text-transparent scale-90"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Geometry SVG */}
              <div className="relative w-full h-36 flex items-center justify-center my-auto">
                <div
                  className={`node-glow absolute w-24 h-24 rounded-full bg-[#9d7bff]/20 blur-2xl transition-all duration-500 ${
                    isDiscipline ? "scale-125 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
                <svg
                  className="node-svg w-28 h-28 text-[#9d7bff] overflow-visible transition-transform duration-500 group-hover:scale-105"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="16"
                    stroke="currentColor"
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                    transform="rotate(-30 50 50)"
                  />
                  <ellipse
                    cx="50"
                    cy="50"
                    rx="38"
                    ry="16"
                    stroke="currentColor"
                    strokeOpacity="0.4"
                    strokeWidth="1.2"
                    transform="rotate(30 50 50)"
                  />
                  <circle
                    className="filter drop-shadow-[0_0_8px_#9d7bff]"
                    cx="50"
                    cy="50"
                    fill={isDiscipline ? "#9d7bff" : "#9d7bff66"}
                    r="5.5"
                  />
                  <circle cx="24" cy="35" fill="#cebdff" r="2.5" />
                  <circle cx="76" cy="65" fill="#cebdff" r="2.5" />
                  <circle cx="76" cy="35" fill="#cebdff" r="2.5" />
                  <circle cx="24" cy="65" fill="#cebdff" r="2.5" />
                </svg>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-semibold text-white">Discipline</h2>
                  <span className="node-color-label font-mono text-[10px] text-[#9d7bff]">
                    Deep Violet
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Quiet consistency, morning rituals, and mindful emotional mastery.
                </p>
              </div>
            </button>

            {/* Vitality Tile */}
            <button
              type="button"
              onClick={() => onToggleAttribute("vitality")}
              className={`attribute-card group relative text-left p-6 rounded-xl transition-all duration-300 flex flex-col justify-between h-[360px] cursor-pointer select-none overflow-hidden ${
                isVitality
                  ? "bg-[#0A0A10] border border-[#34d399]/40 shadow-[0_0_24px_rgba(52,211,153,0.15)]"
                  : "bg-surface-container-lowest border border-white/[0.06] opacity-60 hover:opacity-90 hover:border-white/20"
              }`}
            >
              <div
                className={`tile-halo absolute inset-0 rounded-xl bg-gradient-to-b from-[#34d399]/15 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                  isVitality ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="font-mono text-[11px] text-[#34d399] tracking-wider uppercase font-semibold">
                  Health &amp; Harmony
                </span>
                <div
                  className={`check-badge w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isVitality
                      ? "bg-[#34d399] text-[#003822] shadow-[0_0_10px_rgba(52,211,153,0.5)] scale-100"
                      : "border border-white/20 bg-transparent text-transparent scale-90"
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              {/* Geometry SVG */}
              <div className="relative w-full h-36 flex items-center justify-center my-auto">
                <div
                  className={`node-glow absolute w-24 h-24 rounded-full bg-[#34d399]/20 blur-2xl transition-all duration-500 ${
                    isVitality ? "scale-125 opacity-100" : "scale-75 opacity-0"
                  }`}
                />
                <svg
                  className="node-svg w-28 h-28 text-[#34d399] overflow-visible transition-transform duration-500 group-hover:scale-105"
                  fill="none"
                  viewBox="0 0 100 100"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="50" cy="50" r="32" stroke="currentColor" strokeOpacity="0.3" />
                  <path
                    d="M50 18 C67.6 18 82 32.4 82 50 C82 67.6 67.6 82 50 82 C32.4 82 18 67.6 18 50"
                    stroke="currentColor"
                    strokeOpacity="0.5"
                    strokeWidth="1.2"
                  />
                  <circle
                    className="filter drop-shadow-[0_0_8px_#34d399]"
                    cx="50"
                    cy="50"
                    fill={isVitality ? "#34d399" : "#34d39966"}
                    r="5.5"
                  />
                  <circle cx="50" cy="18" fill="#a7f3d0" r="3" />
                  <circle cx="82" cy="50" fill="#a7f3d0" r="2.5" />
                  <circle cx="50" cy="82" fill="#a7f3d0" r="2.5" />
                  <circle cx="28" cy="28" fill="#a7f3d0" opacity="0.6" r="2" />
                </svg>
              </div>

              <div className="space-y-1 relative z-10">
                <div className="flex items-baseline justify-between">
                  <h2 className="font-display text-lg font-semibold text-white">Vitality</h2>
                  <span className="node-color-label font-mono text-[10px] text-[#34d399]">
                    Emerald Light
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                  Restorative deep sleep, mindful nourishment, and vibrant renewal.
                </p>
              </div>
            </button>
          </div>

          {/* Real-time Constellation Preview Bar */}
          <div className="w-full bg-[#0A0A10] border border-white/[0.08] p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-5 w-full md:w-auto">
              {/* Mini dynamic constellation sky map */}
              <div className="relative w-24 h-16 rounded-lg bg-surface-container-low border border-white/[0.06] flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
                <svg className="w-full h-full" viewBox="0 0 96 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Dynamic filament links */}
                  <g strokeLinecap="round">
                    {isIntellect && isStrength && (
                      <line
                        x1="22"
                        y1="20"
                        x2="44"
                        y2="16"
                        stroke="#4dd8ff"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                    {isStrength && isDiscipline && (
                      <line
                        x1="44"
                        y1="16"
                        x2="74"
                        y2="22"
                        stroke="#ff6b4a"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                    {isDiscipline && isVitality && (
                      <line
                        x1="74"
                        y1="22"
                        x2="50"
                        y2="46"
                        stroke="#9d7bff"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                    {isVitality && isIntellect && (
                      <line
                        x1="50"
                        y1="46"
                        x2="22"
                        y2="20"
                        stroke="#34d399"
                        strokeOpacity="0.6"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                    )}
                  </g>

                  {/* 4 Sky Star Nodes */}
                  <circle
                    cx="22"
                    cy="20"
                    r={isIntellect ? "3.5" : "2"}
                    fill={isIntellect ? "#4dd8ff" : "#ffffff22"}
                    className="transition-all duration-300 filter drop-shadow-[0_0_4px_#4dd8ff]"
                  />
                  <circle
                    cx="44"
                    cy="16"
                    r={isStrength ? "3.5" : "2"}
                    fill={isStrength ? "#ff6b4a" : "#ffffff22"}
                    className="transition-all duration-300 filter drop-shadow-[0_0_4px_#ff6b4a]"
                  />
                  <circle
                    cx="74"
                    cy="22"
                    r={isDiscipline ? "3.5" : "2"}
                    fill={isDiscipline ? "#9d7bff" : "#ffffff22"}
                    className="transition-all duration-300 filter drop-shadow-[0_0_4px_#9d7bff]"
                  />
                  <circle
                    cx="50"
                    cy="46"
                    r={isVitality ? "3.5" : "2"}
                    fill={isVitality ? "#34d399" : "#ffffff22"}
                    className="transition-all duration-300 filter drop-shadow-[0_0_4px_#34d399]"
                  />
                </svg>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm md:text-base text-white font-semibold">
                    Personal Constellation
                  </p>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase font-bold tracking-wider">
                    {count} {count === 1 ? "star connected" : "stars connected"}
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant transition-colors duration-200">
                  {count === 0
                    ? "No attributes selected. Choose at least one to shape your sky."
                    : count === 4
                    ? "All 4 astral paths kindled. Ready to ignite your first daily practices."
                    : `${count} star${count > 1 ? "s" : ""} anchored to your sky. Ready to chart your first daily practices.`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
              {count === 0 ? (
                <span className="font-mono text-[11px] text-outline tracking-wider uppercase">
                  Choose at least one star
                </span>
              ) : null}
              <button
                type="button"
                disabled={count === 0}
                onClick={onContinue}
                className="inline-flex items-center justify-center gap-2 bg-primary text-[#003241] px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-primary/95 transition-all duration-300 shadow-[0_0_20px_rgba(77,216,255,0.25)] hover:shadow-[0_0_28px_rgba(77,216,255,0.45)] cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="w-full py-4 border-t border-white/[0.04] bg-[#08080c] relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between text-on-surface-variant/50 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span>Raizel Engine</span>
            <span className="text-white/10">·</span>
            <span>Celestial Calibration</span>
          </div>
          <span>Step 2 of 3</span>
        </div>
      </footer>
    </div>
  );
}
