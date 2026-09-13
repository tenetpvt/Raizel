"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const ConstellationSection: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section
      id="constellation-section"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-10"
    >
      <div className="w-full rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden shadow-2xl">
        {/* Radial atmospheric nebula background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col gap-4 max-w-md z-10">
          <span className="font-mono text-xs text-primary font-medium tracking-wide">
            Constellation Map
          </span>
          <h3 className="font-display text-2xl sm:text-3xl text-on-surface font-bold leading-tight">
            An organic celestial cluster shaped by your habits
          </h3>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Each attribute radiates as an interconnected star. As you gain XP and level up, individual
            star brightness and focal pull expand, joining satellite stars into your permanent astral
            sky.
          </p>

          <div className="flex items-center gap-6 mt-2 font-mono text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-violet" />
              <span>Dominant: Discipline</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber" />
              <span>4 Linked Stars</span>
            </div>
          </div>
        </div>

        {/* The Living Constellation Cluster SVG */}
        <div className="relative z-10 w-full max-w-[420px] aspect-square flex items-center justify-center">
          <svg className="w-full h-full" fill="none" viewBox="0 0 400 400">
            {/* Background Constellation Filaments */}
            <path
              className="constellation-line"
              d="M190 70 L305 160"
              stroke="#4dd8ff"
              strokeDasharray="240"
              strokeDashoffset="0"
              strokeOpacity={hoveredNode === "intellect" || hoveredNode === "discipline" ? 0.9 : 0.45}
              strokeWidth={hoveredNode === "intellect" || hoveredNode === "discipline" ? 2 : 1.2}
            />
            <path
              className="constellation-line"
              d="M305 160 L240 310"
              stroke="#9d7bff"
              strokeDasharray="240"
              strokeDashoffset="0"
              strokeOpacity={hoveredNode === "discipline" || hoveredNode === "vitality" ? 0.9 : 0.5}
              strokeWidth={hoveredNode === "discipline" || hoveredNode === "vitality" ? 2 : 1.5}
            />
            <path
              className="constellation-line"
              d="M240 310 L95 240"
              stroke="#34d399"
              strokeDasharray="240"
              strokeDashoffset="0"
              strokeOpacity={hoveredNode === "vitality" || hoveredNode === "anchor" ? 0.9 : 0.45}
              strokeWidth={hoveredNode === "vitality" || hoveredNode === "anchor" ? 2 : 1.2}
            />
            <path
              className="constellation-line"
              d="M95 240 L80 130"
              stroke="#ff6b4a"
              strokeDasharray="240"
              strokeDashoffset="0"
              strokeOpacity={hoveredNode === "anchor" || hoveredNode === "strength" ? 0.9 : 0.4}
              strokeWidth={hoveredNode === "anchor" || hoveredNode === "strength" ? 2 : 1.2}
            />
            <path
              className="constellation-line"
              d="M80 130 L190 70"
              stroke="#4dd8ff"
              strokeDasharray="240"
              strokeDashoffset="0"
              strokeOpacity={hoveredNode === "strength" || hoveredNode === "intellect" ? 0.9 : 0.35}
              strokeWidth={hoveredNode === "strength" || hoveredNode === "intellect" ? 2 : 1.2}
            />

            {/* Internal Cross Filaments */}
            <path
              className="constellation-line"
              d="M190 70 L240 310"
              stroke="#baecff"
              strokeDasharray="320"
              strokeDashoffset="0"
              strokeOpacity="0.25"
              strokeWidth="0.8"
            />
            <path
              className="constellation-line"
              d="M80 130 L305 160"
              stroke="#9d7bff"
              strokeDasharray="320"
              strokeDashoffset="0"
              strokeOpacity="0.25"
              strokeWidth="0.8"
            />

            {/* Satellite Star Filaments */}
            <path d="M190 70 L230 40" stroke="#4dd8ff" strokeOpacity="0.3" strokeWidth="0.6" />
            <path d="M305 160 L350 200" stroke="#9d7bff" strokeOpacity="0.3" strokeWidth="0.6" />
            <path d="M240 310 L280 345" stroke="#f2b84b" strokeOpacity="0.3" strokeWidth="0.6" />
            <path d="M95 240 L50 270" stroke="#34d399" strokeOpacity="0.3" strokeWidth="0.6" />

            {/* Satellite Micro Stars */}
            <circle cx="230" cy="40" fill="#baecff" opacity="0.6" r="2" />
            <circle cx="350" cy="200" fill="#cebdff" opacity="0.6" r="2.5" />
            <circle cx="280" cy="345" fill="#f2b84b" opacity="0.7" r="2" />
            <circle cx="50" cy="270" fill="#34d399" opacity="0.6" r="2" />
            <circle cx="130" cy="180" fill="#ffffff" opacity="0.4" r="1.5" />
            <circle cx="240" cy="110" fill="#ffffff" opacity="0.35" r="1.5" />

            {/* 1. INTELLECT STAR (Level 18 - Cyan) */}
            <g
              onMouseEnter={() => setHoveredNode("intellect")}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <circle
                className="animate-pulse"
                cx="190"
                cy="70"
                fill="#4dd8ff"
                fillOpacity="0.2"
                r="14"
              />
              <circle cx="190" cy="70" fill="#4dd8ff" filter="url(#glow-cyan)" r="6" />
              <circle cx="190" cy="70" fill="#ffffff" r="2" />
              <text
                fill="#4dd8ff"
                fontFamily="inherit"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                x="190"
                y="48"
              >
                Intellect Lvl 18
              </text>
            </g>

            {/* 2. DISCIPLINE STAR (Level 22 - Apex Brightness - Violet) */}
            <g
              onMouseEnter={() => setHoveredNode("discipline")}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <circle
                className="animate-pulse"
                cx="305"
                cy="160"
                fill="#9d7bff"
                fillOpacity="0.25"
                r="18"
              />
              <circle cx="305" cy="160" fill="#9d7bff" filter="url(#glow-violet)" r="8" />
              <circle cx="305" cy="160" fill="#ffffff" r="3" />
              <text
                fill="#9d7bff"
                fontFamily="inherit"
                fontSize="11"
                fontWeight="600"
                textAnchor="start"
                x="320"
                y="190"
              >
                Discipline Lvl 22
              </text>
            </g>

            {/* 3. VITALITY STAR (Level 16 - Emerald) */}
            <g
              onMouseEnter={() => setHoveredNode("vitality")}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <circle
                className="animate-pulse"
                cx="240"
                cy="310"
                fill="#34d399"
                fillOpacity="0.2"
                r="13"
              />
              <circle cx="240" cy="310" fill="#34d399" filter="url(#glow-emerald)" r="5.5" />
              <circle cx="240" cy="310" fill="#ffffff" r="2" />
              <text
                fill="#34d399"
                fontFamily="inherit"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                x="240"
                y="338"
              >
                Vitality Lvl 16
              </text>
            </g>

            {/* 4. STRENGTH STAR (Level 14 - Ember) */}
            <g
              onMouseEnter={() => setHoveredNode("strength")}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <circle
                className="animate-pulse"
                cx="80"
                cy="130"
                fill="#ff6b4a"
                fillOpacity="0.2"
                r="12"
              />
              <circle cx="80" cy="130" fill="#ff6b4a" filter="url(#glow-ember)" r="5" />
              <circle cx="80" cy="130" fill="#ffffff" r="1.8" />
              <text
                fill="#ff6b4a"
                fontFamily="inherit"
                fontSize="11"
                fontWeight="600"
                textAnchor="middle"
                x="75"
                y="108"
              >
                Strength Lvl 14
              </text>
            </g>

            {/* STARDUST ANCHOR STAR (Amber) */}
            <g
              onMouseEnter={() => setHoveredNode("anchor")}
              onMouseLeave={() => setHoveredNode(null)}
              className="transition-transform duration-300 hover:scale-110 cursor-pointer"
            >
              <circle cx="95" cy="240" fill="#f2b84b" fillOpacity="0.18" r="9" />
              <circle cx="95" cy="240" fill="#f2b84b" r="3.5" />
              <text
                fill="#f2b84b"
                fontFamily="inherit"
                fontSize="10"
                fontWeight="500"
                textAnchor="middle"
                x="95"
                y="260"
              >
                Anchor
              </text>
            </g>

            <defs>
              <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-ember" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
};
