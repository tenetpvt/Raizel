"use client";

import React, { useState, useRef } from "react";
import { AppLayout } from "@/components/app/AppLayout";
import { Plus, Minus, Focus, Sparkles } from "lucide-react";

type SphereFilter = "all" | "intellect" | "strength" | "discipline" | "vitality";

interface NodeData {
  name: string;
  action: string;
  color: string;
  x: number;
  y: number;
}

export default function ConstellationPage() {
  const [activeFilter, setActiveFilter] = useState<SphereFilter>("all");
  const [currentScale, setCurrentScale] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const [activeNode, setActiveNode] = useState<NodeData | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - pan.x,
      y: e.clientY - pan.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const zoomIn = () => setCurrentScale((s) => Math.min(s + 0.2, 2.2));
  const zoomOut = () => setCurrentScale((s) => Math.max(s - 0.2, 0.7));
  const resetZoom = () => {
    setCurrentScale(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <AppLayout breadcrumb="Constellation Ledger">
      <div className="flex flex-col w-full text-on-surface select-none pb-16">
        {/* Top Header & Metas */}
        <div className="flex flex-col xl:flex-row items-start xl:items-end justify-between gap-4 pt-2 pb-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
              Your constellation
            </h1>
            <p className="font-sans text-sm text-on-surface-variant max-w-xl">
              Every completed quest leaves a permanent trace across your psychic horizon.
            </p>
          </div>

          <div className="flex items-center gap-4 self-stretch xl:self-auto justify-between xl:justify-end font-mono text-xs text-on-surface-variant">
            <div className="flex items-center gap-1.5">
              <span className="text-outline">Tier</span>
              <span className="text-white font-semibold">Level 12</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-outline">Total</span>
              <span className="text-white font-semibold">14,840 XP</span>
            </div>
            <span className="text-outline-variant">•</span>
            <div className="flex items-center gap-1.5">
              <span className="text-outline">Kindled</span>
              <span className="text-primary font-semibold">34 Stars</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs & Color Legend */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6">
          {/* Filter Pills */}
          <div className="inline-flex items-center p-1 rounded-xl bg-surface-container-low border border-white/[0.04]">
            {(["all", "intellect", "strength", "discipline", "vitality"] as SphereFilter[]).map(
              (filter) => {
                const isActive = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-lg font-mono text-[11px] uppercase transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-surface-container-high text-primary shadow-[inset_0_0_12px_rgba(77,216,255,0.08)] border border-primary/20 font-semibold"
                        : "text-on-surface-variant hover:text-white"
                    }`}
                  >
                    {filter === "all" ? "ALL SPHERES" : filter}
                  </button>
                );
              }
            )}
          </div>

          {/* Spheres Legend */}
          <div className="flex items-center gap-4 text-on-surface-variant font-mono text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Intellect
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-ember" />
              Strength
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Discipline
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald" />
              Vitality
            </span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* LEFT: Interactive Celestial Canvas Stage (8-cols) */}
          <div className="lg:col-span-8 flex flex-col relative">
            <div
              id="viewport-stage"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              className="relative w-full rounded-xl overflow-hidden bg-[#09090E] border border-white/[0.06] shadow-xl flex items-center justify-center select-none h-[640px] lg:h-[720px] cursor-grab active:cursor-grabbing"
            >
              {/* Dot Matrix & Radial Atmosphere */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-[#09090E] via-transparent to-surface-container-low/20" />

              {/* Top-left Indicator */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-2 pointer-events-none text-outline font-mono text-[11px] uppercase tracking-wider opacity-60">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span>Harmonic Sky</span>
              </div>

              {/* Interactive SVG Constellation Canvas */}
              <svg
                id="constellation-canvas"
                viewBox="0 0 1000 700"
                className="w-full h-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${currentScale})`,
                }}
              >
                <defs>
                  <radialGradient id="halo-cyan" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#4dd8ff" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#4dd8ff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="halo-ember" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ffb7a7" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#ffb7a7" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="halo-violet" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#cebdff" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#cebdff" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="halo-emerald" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Inter-Cluster Links */}
                <g className="opacity-15 stroke-white" strokeDasharray="2 4" strokeWidth="0.5">
                  <line x1="250" y1="210" x2="720" y2="200" />
                  <line x1="250" y1="210" x2="320" y2="480" />
                  <line x1="720" y1="200" x2="760" y2="500" />
                  <line x1="320" y1="480" x2="760" y2="500" />
                </g>

                {/* CLUSTER 1: INTELLECT */}
                <g
                  className="transition-opacity duration-300"
                  style={{
                    opacity: activeFilter === "all" || activeFilter === "intellect" ? 1 : 0.15,
                  }}
                >
                  <circle cx="250" cy="210" r="90" fill="url(#halo-cyan)" />
                  <g className="stroke-[#4dd8ff]/40" strokeWidth="0.75">
                    <line x1="250" y1="210" x2="190" y2="150" />
                    <line x1="250" y1="210" x2="290" y2="130" />
                    <line x1="250" y1="210" x2="330" y2="210" />
                    <line x1="250" y1="210" x2="180" y2="250" />
                    <line x1="250" y1="210" x2="240" y2="290" />
                    <line x1="190" y1="150" x2="140" y2="180" />
                    <line x1="290" y1="130" x2="350" y2="140" />
                    <line x1="330" y1="210" x2="380" y2="240" />
                    <line x1="180" y1="250" x2="130" y2="280" />
                  </g>
                  {/* Intellect Star Nodes */}
                  <g>
                    {[
                      { cx: 140, cy: 180, r: 2.5, name: "Intellect · Star #1", action: "Analytical synthesis (+30 XP)" },
                      { cx: 190, cy: 150, r: 3, name: "Intellect · Star #2", action: "Algorithmic modeling (+50 XP)" },
                      { cx: 290, cy: 130, r: 3, name: "Intellect · Star #3", action: "Systems breakdown reading (+40 XP)" },
                      { cx: 350, cy: 140, r: 2, name: "Intellect · Star #4", action: "Knowledge retrieval map (+35 XP)" },
                      { cx: 330, cy: 210, r: 3.5, name: "Intellect · Star #5", action: "Proof of technical concept (+55 XP)" },
                      { cx: 380, cy: 240, r: 2.5, name: "Intellect · Star #6", action: "Refactored logic core (+45 XP)" },
                      { cx: 240, cy: 290, r: 3, name: "Intellect · Star #7", action: "Statistical profiling (+30 XP)" },
                      { cx: 180, cy: 250, r: 2, name: "Intellect · Star #8", action: "Domain taxonomy update (+25 XP)" },
                      { cx: 130, cy: 280, r: 2, name: "Intellect · Star #9", action: "Cognitive benchmark sprint (+40 XP)" },
                    ].map((node, i) => (
                      <circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        className="cursor-pointer fill-[#f5f5f7] hover:fill-[#4dd8ff] transition-colors"
                        onMouseEnter={() =>
                          setActiveNode({ ...node, color: "#4dd8ff", x: node.cx, y: node.cy })
                        }
                      />
                    ))}
                    {/* Anchor Node */}
                    <circle
                      cx="250"
                      cy="210"
                      r="5.5"
                      className="cursor-pointer fill-[#4dd8ff] filter drop-shadow-[0_0_8px_#4dd8ff]"
                      onMouseEnter={() =>
                        setActiveNode({
                          name: "Intellect · Anchor Node",
                          action: "Tier Apex: Level 18 Catalyst (+100 XP)",
                          color: "#4dd8ff",
                          x: 250,
                          y: 210,
                        })
                      }
                    />
                  </g>
                  <text
                    x="250"
                    y="325"
                    textAnchor="middle"
                    className="fill-[#4dd8ff] font-mono text-[11px] font-semibold tracking-widest"
                  >
                    INTELLECT // 18
                  </text>
                </g>

                {/* CLUSTER 2: STRENGTH */}
                <g
                  className="transition-opacity duration-300"
                  style={{
                    opacity: activeFilter === "all" || activeFilter === "strength" ? 1 : 0.15,
                  }}
                >
                  <circle cx="720" cy="200" r="80" fill="url(#halo-ember)" />
                  <g className="stroke-[#ff6b4a]/40" strokeWidth="0.75">
                    <line x1="720" y1="200" x2="660" y2="150" />
                    <line x1="720" y1="200" x2="780" y2="140" />
                    <line x1="720" y1="200" x2="790" y2="240" />
                    <line x1="720" y1="200" x2="670" y2="260" />
                    <line x1="660" y1="150" x2="610" y2="180" />
                    <line x1="780" y1="140" x2="830" y2="170" />
                  </g>
                  {/* Strength Star Nodes */}
                  <g>
                    {[
                      { cx: 660, cy: 150, r: 3, name: "Strength · Star #1", action: "Heavy compound session (+65 XP)" },
                      { cx: 780, cy: 140, r: 3, name: "Strength · Star #2", action: "Zone 4 threshold run (+50 XP)" },
                      { cx: 830, cy: 170, r: 2.5, name: "Strength · Star #3", action: "Grip & load integrity (+40 XP)" },
                      { cx: 790, cy: 240, r: 3, name: "Strength · Star #4", action: "Sprint intervals mastery (+55 XP)" },
                      { cx: 670, cy: 260, r: 2, name: "Strength · Star #5", action: "Isometric core baseline (+35 XP)" },
                      { cx: 610, cy: 180, r: 2.5, name: "Strength · Star #6", action: "Explosive pull volume (+45 XP)" },
                    ].map((node, i) => (
                      <circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        className="cursor-pointer fill-[#f5f5f7] hover:fill-[#ff6b4a] transition-colors"
                        onMouseEnter={() =>
                          setActiveNode({ ...node, color: "#ff6b4a", x: node.cx, y: node.cy })
                        }
                      />
                    ))}
                    <circle
                      cx="720"
                      cy="200"
                      r="5.5"
                      className="cursor-pointer fill-[#ff6b4a] filter drop-shadow-[0_0_8px_#ff6b4a]"
                      onMouseEnter={() =>
                        setActiveNode({
                          name: "Strength · Anchor Node",
                          action: "Tier Apex: Level 14 Stature (+90 XP)",
                          color: "#ff6b4a",
                          x: 720,
                          y: 200,
                        })
                      }
                    />
                  </g>
                  <text
                    x="720"
                    y="295"
                    textAnchor="middle"
                    className="fill-[#ff6b4a] font-mono text-[11px] font-semibold tracking-widest"
                  >
                    STRENGTH // 14
                  </text>
                </g>

                {/* CLUSTER 3: DISCIPLINE */}
                <g
                  className="transition-opacity duration-300"
                  style={{
                    opacity: activeFilter === "all" || activeFilter === "discipline" ? 1 : 0.15,
                  }}
                >
                  <circle cx="760" cy="500" r="95" fill="url(#halo-violet)" />
                  <g className="stroke-[#9d7bff]/40" strokeWidth="0.75">
                    <line x1="760" y1="500" x2="690" y2="450" />
                    <line x1="760" y1="500" x2="810" y2="430" />
                    <line x1="760" y1="500" x2="840" y2="520" />
                    <line x1="760" y1="500" x2="720" y2="570" />
                    <line x1="760" y1="500" x2="790" y2="580" />
                    <line x1="690" y1="450" x2="640" y2="480" />
                    <line x1="810" y1="430" x2="860" y2="460" />
                    <line x1="840" y1="520" x2="890" y2="560" />
                    <line x1="720" y1="570" x2="670" y2="590" />
                    <line x1="790" y1="580" x2="820" y2="630" />
                  </g>
                  {/* Discipline Star Nodes */}
                  <g>
                    {[
                      { cx: 690, cy: 450, r: 3, name: "Discipline · Star #1", action: "Dawn protocol execution (+40 XP)" },
                      { cx: 810, cy: 430, r: 3.5, name: "Discipline · Star #2", action: "Zero-distraction isolation (+60 XP)" },
                      { cx: 860, cy: 460, r: 2.5, name: "Discipline · Star #3", action: "Structured sleep cadence (+35 XP)" },
                      { cx: 840, cy: 520, r: 3, name: "Discipline · Star #4", action: "Cold outreach session (+60 XP)" },
                      { cx: 890, cy: 560, r: 2, name: "Discipline · Star #5", action: "Continuous reading marathon (+40 XP)" },
                      { cx: 790, cy: 580, r: 3, name: "Discipline · Star #6", action: "Unbroken audit checklist (+50 XP)" },
                      { cx: 820, cy: 630, r: 2, name: "Discipline · Star #7", action: "Deep workspace cleanup (+20 XP)" },
                      { cx: 720, cy: 570, r: 3, name: "Discipline · Star #8", action: "Screen-free threshold (+45 XP)" },
                      { cx: 670, cy: 590, r: 2.5, name: "Discipline · Star #9", action: "Uncompromising budget log (+30 XP)" },
                      { cx: 640, cy: 480, r: 3, name: "Discipline · Star #10", action: "No-skip nutritional rule (+50 XP)" },
                    ].map((node, i) => (
                      <circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        className="cursor-pointer fill-[#f5f5f7] hover:fill-[#9d7bff] transition-colors"
                        onMouseEnter={() =>
                          setActiveNode({ ...node, color: "#9d7bff", x: node.cx, y: node.cy })
                        }
                      />
                    ))}
                    <circle
                      cx="760"
                      cy="500"
                      r="6"
                      className="cursor-pointer fill-[#9d7bff] filter drop-shadow-[0_0_8px_#9d7bff]"
                      onMouseEnter={() =>
                        setActiveNode({
                          name: "Discipline · Anchor Node",
                          action: "Tier Apex: Level 22 Willpower (+120 XP)",
                          color: "#9d7bff",
                          x: 760,
                          y: 500,
                        })
                      }
                    />
                  </g>
                  <text
                    x="760"
                    y="620"
                    textAnchor="middle"
                    className="fill-[#9d7bff] font-mono text-[11px] font-semibold tracking-widest"
                  >
                    DISCIPLINE // 22
                  </text>
                </g>

                {/* CLUSTER 4: VITALITY */}
                <g
                  className="transition-opacity duration-300"
                  style={{
                    opacity: activeFilter === "all" || activeFilter === "vitality" ? 1 : 0.15,
                  }}
                >
                  <circle cx="320" cy="480" r="85" fill="url(#halo-emerald)" />
                  <g className="stroke-[#34d399]/40" strokeWidth="0.75">
                    <line x1="320" y1="480" x2="270" y2="430" />
                    <line x1="320" y1="480" x2="380" y2="440" />
                    <line x1="320" y1="480" x2="370" y2="530" />
                    <line x1="320" y1="480" x2="250" y2="530" />
                    <line x1="320" y1="480" x2="320" y2="560" />
                  </g>
                  {/* Vitality Star Nodes */}
                  <g>
                    {[
                      { cx: 270, cy: 430, r: 2.5, name: "Vitality · Star #1", action: "Circadian sunlight sync (+25 XP)" },
                      { cx: 230, cy: 480, r: 3, name: "Vitality · Star #2", action: "Electrolyte balance routine (+30 XP)" },
                      { cx: 380, cy: 440, r: 3, name: "Vitality · Star #3", action: "HRV recovery optimization (+45 XP)" },
                      { cx: 370, cy: 530, r: 3, name: "Vitality · Star #5", action: "Therapeutic sauna session (+40 XP)" },
                      { cx: 320, cy: 560, r: 2.5, name: "Vitality · Star #6", action: "Mobility spine decompression (+35 XP)" },
                      { cx: 250, cy: 530, r: 3, name: "Vitality · Star #7", action: "Cold shower conditioning (+35 XP)" },
                    ].map((node, i) => (
                      <circle
                        key={i}
                        cx={node.cx}
                        cy={node.cy}
                        r={node.r}
                        className="cursor-pointer fill-[#f5f5f7] hover:fill-[#34d399] transition-colors"
                        onMouseEnter={() =>
                          setActiveNode({ ...node, color: "#34d399", x: node.cx, y: node.cy })
                        }
                      />
                    ))}
                    <circle
                      cx="320"
                      cy="480"
                      r="5.5"
                      className="cursor-pointer fill-[#34d399] filter drop-shadow-[0_0_8px_#34d399]"
                      onMouseEnter={() =>
                        setActiveNode({
                          name: "Vitality · Anchor Node",
                          action: "Tier Apex: Level 16 Equilibrium (+85 XP)",
                          color: "#34d399",
                          x: 320,
                          y: 480,
                        })
                      }
                    />
                  </g>
                  <text
                    x="320"
                    y="595"
                    textAnchor="middle"
                    className="fill-[#34d399] font-mono text-[11px] font-semibold tracking-widest"
                  >
                    VITALITY // 16
                  </text>
                </g>
              </svg>

              {/* Floating Node Telemetry Card */}
              {activeNode && (
                <div className="absolute top-4 right-4 pointer-events-none z-30 bg-[#141420]/90 border border-white/[0.08] backdrop-blur-md px-4 py-3 rounded-lg shadow-xl animate-in fade-in duration-200">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeNode.color }}
                    />
                    <span className="font-mono text-xs text-white font-semibold">
                      {activeNode.name}
                    </span>
                  </div>
                  <div className="font-sans text-xs text-on-surface-variant mt-1 max-w-[240px]">
                    {activeNode.action}
                  </div>
                </div>
              )}

              {/* Bottom Right Zoom Controls */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1 bg-surface-container-high/80 backdrop-blur-md p-1 rounded-lg border border-white/[0.04]">
                <button
                  type="button"
                  onClick={zoomIn}
                  aria-label="Zoom in"
                  className="p-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={zoomOut}
                  aria-label="Zoom out"
                  className="p-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  aria-label="Reset viewport"
                  className="p-1.5 text-on-surface-variant hover:text-white hover:bg-surface-container-highest rounded transition-colors cursor-pointer"
                >
                  <Focus className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom Left Gesture Hint */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 text-outline font-mono text-[10px]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>CLICK NODES OR DRAG CANVAS TO EXPLORE</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Registry & Awakenings (4-cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Constellation Registry / Spheres */}
            <div className="bg-surface-container-low/70 border border-white/[0.05] p-5 rounded-xl flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    Constellation Registry
                  </span>
                  <h2 className="font-display text-base text-white font-medium">Spheres</h2>
                </div>
                <span className="font-mono text-[11px] text-outline">4 Bound</span>
              </div>

              <div className="flex flex-col gap-3">
                {/* Intellect Progress */}
                <div className="p-3 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4dd8ff] shadow-[0_0_8px_rgba(77,216,255,0.8)]" />
                      <span className="font-sans text-xs font-medium text-white">Intellect</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#4dd8ff]">LVL 18</span>
                  </div>
                  <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#4dd8ff] h-full rounded-full" style={{ width: "74%" }} />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-outline">
                    <span>74% KINDLED</span>
                    <span>180 / 250 XP</span>
                  </div>
                </div>

                {/* Strength Progress */}
                <div className="p-3 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b4a] shadow-[0_0_8px_rgba(255,107,74,0.8)]" />
                      <span className="font-sans text-xs font-medium text-white">Strength</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#ff6b4a]">LVL 14</span>
                  </div>
                  <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#ff6b4a] h-full rounded-full" style={{ width: "42%" }} />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-outline">
                    <span>42% KINDLED</span>
                    <span>125 / 300 XP</span>
                  </div>
                </div>

                {/* Discipline Progress */}
                <div className="p-3 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9d7bff] shadow-[0_0_8px_rgba(157,123,255,0.8)]" />
                      <span className="font-sans text-xs font-medium text-white">Discipline</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#9d7bff]">LVL 22</span>
                  </div>
                  <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#9d7bff] h-full rounded-full" style={{ width: "88%" }} />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-outline">
                    <span>88% KINDLED</span>
                    <span>352 / 400 XP</span>
                  </div>
                </div>

                {/* Vitality Progress */}
                <div className="p-3 rounded-lg bg-surface-container/60 hover:bg-surface-container transition-colors flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                      <span className="font-sans text-xs font-medium text-white">Vitality</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#34d399]">LVL 16</span>
                  </div>
                  <div className="w-full bg-surface-container-highest/60 h-1 rounded-full overflow-hidden">
                    <div className="bg-[#34d399] h-full rounded-full" style={{ width: "30%" }} />
                  </div>
                  <div className="flex justify-between font-mono text-[10px] text-outline">
                    <span>30% KINDLED</span>
                    <span>75 / 250 XP</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chronicle / Recent Awakenings Timeline */}
            <div className="bg-surface-container-low/70 border border-white/[0.05] p-5 rounded-xl flex flex-col gap-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    Chronicle
                  </span>
                  <h2 className="font-display text-base text-white font-medium">Recent awakenings</h2>
                </div>
                <Sparkles className="w-4 h-4 text-outline" />
              </div>

              <div className="flex flex-col gap-4 relative pl-4 before:content-[''] before:absolute before:left-1 before:top-2 before:bottom-2 before:w-[1px] before:bg-surface-container-highest">
                <div className="flex flex-col gap-0.5 relative">
                  <div className="absolute -left-[17px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#4dd8ff] shadow-[0_0_6px_rgba(77,216,255,0.8)]" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      Intellect Star Ignited
                    </span>
                    <span className="font-mono text-[10px] text-outline">09:42</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Writing Sprint · Deep focus draft
                  </p>
                  <span className="font-mono text-[10px] text-[#4dd8ff]">+45 XP</span>
                </div>

                <div className="flex flex-col gap-0.5 relative">
                  <div className="absolute -left-[17px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#9d7bff] shadow-[0_0_6px_rgba(157,123,255,0.8)]" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      Discipline Star Ignited
                    </span>
                    <span className="font-mono text-[10px] text-outline">Yesterday</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    Cold outreach · 12 dispatches
                  </p>
                  <span className="font-mono text-[10px] text-[#9d7bff]">+60 XP</span>
                </div>

                <div className="flex flex-col gap-0.5 relative">
                  <div className="absolute -left-[17px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#ff6b4a] shadow-[0_0_6px_rgba(255,107,74,0.8)]" />
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-medium">
                      Strength Apex Kindled
                    </span>
                    <span className="font-mono text-[10px] text-outline">2d ago</span>
                  </div>
                  <p className="font-sans text-xs text-on-surface-variant">
                    HIIT &amp; recovery session
                  </p>
                  <span className="font-mono text-[10px] text-[#ff6b4a]">+70 XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
