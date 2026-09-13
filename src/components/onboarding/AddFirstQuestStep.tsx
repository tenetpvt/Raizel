"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Sparkles, Edit3, ArrowRight, Check } from "lucide-react";

interface AddFirstQuestStepProps {
  initialAttribute?: string;
  onComplete?: () => void;
}

interface AttributeOption {
  id: string;
  name: string;
  sublabel: string;
  color: string;
  core: string;
  r: number;
  g: number;
  b: number;
}

const ATTRIBUTE_OPTIONS: AttributeOption[] = [
  {
    id: "intellect",
    name: "Intellect",
    sublabel: "Acuity & craft",
    color: "#4dd8ff",
    core: "#baecff",
    r: 77,
    g: 216,
    b: 255,
  },
  {
    id: "strength",
    name: "Strength",
    sublabel: "Resilience",
    color: "#ff7556",
    core: "#ffd1c7",
    r: 255,
    g: 117,
    b: 86,
  },
  {
    id: "discipline",
    name: "Discipline",
    sublabel: "Habit & will",
    color: "#a688ff",
    core: "#e2d9ff",
    r: 166,
    g: 136,
    b: 255,
  },
  {
    id: "vitality",
    name: "Vitality",
    sublabel: "Energy & body",
    color: "#42d99d",
    core: "#a7f3d0",
    r: 66,
    g: 217,
    b: 157,
  },
];

type IntensityLevel = "Low" | "Medium" | "High";

const INTENSITY_CONFIG: Record<IntensityLevel, { xp: number; stardust: number }> = {
  Low: { xp: 25, stardust: 6 },
  Medium: { xp: 45, stardust: 12 },
  High: { xp: 80, stardust: 24 },
};

export function AddFirstQuestStep({ initialAttribute, onComplete }: AddFirstQuestStepProps) {
  const [questTitle, setQuestTitle] = useState("Complete 45-minute focused writing sprint");
  const [selectedAttrId, setSelectedAttrId] = useState<string>(
    initialAttribute && ATTRIBUTE_OPTIONS.some((a) => a.id === initialAttribute)
      ? initialAttribute
      : "intellect"
  );
  const [intensity, setIntensity] = useState<IntensityLevel>("Medium");
  const [isIgnited, setIsIgnited] = useState(false);

  const activeAttr =
    ATTRIBUTE_OPTIONS.find((a) => a.id === selectedAttrId) || ATTRIBUTE_OPTIONS[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animStateRef = useRef({
    ignited: false,
    contracting: false,
    contractionProgress: 0,
    rippleRadius: 0,
    rippleAlpha: 0,
    neighborAwakenProgress: 0,
    filamentProgress: 0,
  });

  const activeThemeRef = useRef({
    name: activeAttr.name,
    color: activeAttr.color,
    core: activeAttr.core,
    r: activeAttr.r,
    g: activeAttr.g,
    b: activeAttr.b,
  });

  // Update theme ref when active attribute changes
  useEffect(() => {
    activeThemeRef.current = {
      name: activeAttr.name,
      color: activeAttr.color,
      core: activeAttr.core,
      r: activeAttr.r,
      g: activeAttr.g,
      b: activeAttr.b,
    };
  }, [activeAttr]);

  // Constellation interactive canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationFrameId: number;

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const stars = [
      { id: "active", relX: -20, relY: -15, isPrimary: true, baseR: 2.5 },
      { id: "neighbor", relX: 85, relY: -70, isNeighbor: true, baseR: 1.6 },
      { id: "dormant1", relX: -110, relY: 65, baseR: 1.2 },
      { id: "dormant2", relX: 95, relY: 85, baseR: 1.3 },
      { id: "dormant3", relX: -75, relY: -95, baseR: 1.1 },
    ];

    const staticBonds = [
      [0, 2], // active -> dormant1
      [1, 3], // neighbor -> dormant2
      [2, 4], // dormant1 -> dormant3
    ];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.targetX = ((e.clientX - r.left) / r.width - 0.5) * 2;
      pointer.targetY = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const handleMouseLeave = () => {
      pointer.targetX = 0;
      pointer.targetY = 0;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.012;
      const theme = activeThemeRef.current;
      const anim = animStateRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      const originX = width * 0.5;
      const originY = height * 0.5;

      const nodes = stars.map((s, idx) => {
        const driftX = Math.sin(time * 0.4 + idx * 1.5) * 1.0;
        const driftY = Math.cos(time * 0.35 + idx * 1.8) * 1.0;
        const parallaxX = pointer.x * (4 + idx * 1.2);
        const parallaxY = pointer.y * (3 + idx * 1.2);

        return {
          ...s,
          x: originX + s.relX + driftX + parallaxX,
          y: originY + s.relY + driftY + parallaxY,
        };
      });

      const activeNode = nodes[0];
      const neighborNode = nodes[1];

      // 1. Static faint bonds
      staticBonds.forEach(([i, j]) => {
        const nA = nodes[i];
        const nB = nodes[j];
        ctx.beginPath();
        ctx.moveTo(nA.x, nA.y);
        ctx.lineTo(nB.x, nB.y);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // 2. Awakening filament between active & neighbor when ignited
      if (anim.filamentProgress > 0) {
        const p = anim.filamentProgress;
        const curX = activeNode.x + (neighborNode.x - activeNode.x) * p;
        const curY = activeNode.y + (neighborNode.y - activeNode.y) * p;

        ctx.beginPath();
        ctx.moveTo(activeNode.x, activeNode.y);
        ctx.lineTo(curX, curY);
        ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, ${0.15 + p * 0.45})`;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }

      // 3. Ripple pulse from active node
      if (anim.rippleAlpha > 0.01) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(activeNode.x, activeNode.y, anim.rippleRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${theme.r}, ${theme.g}, ${theme.b}, ${anim.rippleAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.restore();

        anim.rippleRadius += 1.2;
        anim.rippleAlpha *= 0.96;
      }

      // 4. Dormant stars
      nodes.slice(2).forEach((node) => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseR * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.baseR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fill();
      });

      // 5. Neighbor star
      const nProgress = anim.neighborAwakenProgress;
      if (nProgress > 0) {
        const haloRad = 6 + nProgress * 4;
        const haloGrad = ctx.createRadialGradient(
          neighborNode.x,
          neighborNode.y,
          0,
          neighborNode.x,
          neighborNode.y,
          haloRad
        );
        haloGrad.addColorStop(0, `rgba(${theme.r}, ${theme.g}, ${theme.b}, ${0.3 * nProgress})`);
        haloGrad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(neighborNode.x, neighborNode.y, haloRad, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(neighborNode.x, neighborNode.y, 1.6 + nProgress * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = theme.color;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(neighborNode.x, neighborNode.y, 1.0, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.arc(neighborNode.x, neighborNode.y, neighborNode.baseR * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(neighborNode.x, neighborNode.y, neighborNode.baseR, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
        ctx.fill();
      }

      // 6. Active star node
      let contractScale = 1.0;
      if (anim.contracting) {
        anim.contractionProgress += 0.08;
        if (anim.contractionProgress < 0.5) {
          contractScale = 1.0 - anim.contractionProgress * 0.4;
        } else {
          contractScale = 0.8 + (anim.contractionProgress - 0.5) * 0.4;
        }
        if (anim.contractionProgress >= 1) {
          anim.contracting = false;
          anim.contractionProgress = 0;
        }
      }

      const falloffRad = (8 + Math.sin(time * 1.5) * 0.8) * contractScale;
      const coreGrad = ctx.createRadialGradient(
        activeNode.x,
        activeNode.y,
        0,
        activeNode.x,
        activeNode.y,
        falloffRad
      );
      coreGrad.addColorStop(0, `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.4)`);
      coreGrad.addColorStop(0.5, `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.1)`);
      coreGrad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(activeNode.x, activeNode.y, falloffRad, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(activeNode.x, activeNode.y, 2.5 * contractScale, 0, Math.PI * 2);
      ctx.fillStyle = theme.color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(activeNode.x, activeNode.y, 1.2 * contractScale, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      if (anim.ignited) {
        if (anim.filamentProgress < 1) {
          anim.filamentProgress = Math.min(1, anim.filamentProgress + 0.02);
        }
        if (anim.neighborAwakenProgress < 1) {
          anim.neighborAwakenProgress = Math.min(1, anim.neighborAwakenProgress + 0.016);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleIgnite = (e: React.FormEvent) => {
    e.preventDefault();
    if (isIgnited) return;

    // Trigger canvas star contraction and ripple
    const anim = animStateRef.current;
    anim.contracting = true;
    anim.contractionProgress = 0;
    anim.rippleRadius = 4;
    anim.rippleAlpha = 0.6;

    setTimeout(() => {
      anim.ignited = true;
      setIsIgnited(true);
    }, 200);
  };

  const currentRewards = INTENSITY_CONFIG[intensity];

  return (
    <div className="w-full flex-1 flex flex-col justify-between items-center relative overflow-hidden">
      {/* Subtle Atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-1/4 right-1/3 w-[550px] h-[550px] blur-[150px] rounded-full transition-colors duration-700"
          style={{ backgroundColor: `${activeAttr.color}08` }}
        />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-white/[0.012] blur-[120px] rounded-full" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-5xl mx-auto flex-1 flex flex-col justify-center px-6 lg:px-8 py-8 relative z-10">
        <div className="flex flex-col gap-6">
          {/* Quiet Step Metadata */}
          <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 text-xs">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="font-medium text-white/80">Step 3 of 3</span>
              <span className="text-white/20">/</span>
              <span>Your first quest</span>
            </div>
            <span className="text-on-surface-variant/60 hidden sm:inline font-mono text-[11px] uppercase tracking-wider">
              Initialization
            </span>
          </div>

          {/* Form & Celestial Star Chart Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Form */}
            <div className="lg:col-span-6 flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <h1 className="font-display text-2xl sm:text-3xl lg:text-[34px] font-bold tracking-tight text-white leading-tight">
                  Add your first quest
                </h1>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                  One single intentional act is enough to kindle your celestial sky and awaken the core constellation.
                </p>
              </div>

              <form onSubmit={handleIgnite} className="flex flex-col gap-5 pt-1">
                {/* Field 1: Daily Quest Title */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="quest-title" className="text-xs text-on-surface-variant font-medium">
                    Daily quest
                  </label>
                  <div className="relative">
                    <input
                      id="quest-title"
                      type="text"
                      required
                      value={questTitle}
                      onChange={(e) => setQuestTitle(e.target.value)}
                      placeholder="e.g. 30 min deep focus reading"
                      className="w-full bg-[#101017] text-white text-sm pl-3.5 pr-10 py-2.5 rounded-lg outline-none transition-all border border-white/[0.07] hover:border-white/15 focus:border-primary/60 focus:bg-surface-container placeholder:text-white/20"
                    />
                    <Edit3 className="w-4 h-4 text-white/25 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Field 2: Governing Attribute */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant font-medium">
                      Governing attribute
                    </span>
                    <span
                      className="text-xs font-medium transition-colors"
                      style={{ color: activeAttr.color }}
                    >
                      {activeAttr.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2" role="radiogroup">
                    {ATTRIBUTE_OPTIONS.map((attr) => {
                      const isSelected = selectedAttrId === attr.id;
                      return (
                        <button
                          key={attr.id}
                          type="button"
                          onClick={() => setSelectedAttrId(attr.id)}
                          role="radio"
                          aria-checked={isSelected}
                          className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-left transition-all cursor-pointer group ${
                            isSelected
                              ? "bg-surface-container border"
                              : "bg-surface-container-low/60 border border-white/[0.06] text-on-surface-variant hover:text-white hover:border-white/15 hover:bg-surface-container"
                          }`}
                          style={{
                            borderColor: isSelected ? `${attr.color}66` : undefined,
                          }}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                              style={{
                                backgroundColor: attr.color,
                                boxShadow: isSelected ? `0 0 6px ${attr.color}` : "none",
                                opacity: isSelected ? 1 : 0.6,
                              }}
                            />
                            <div className="flex flex-col">
                              <span
                                className={`text-[13px] font-medium leading-tight ${
                                  isSelected ? "text-white" : "text-white/90"
                                }`}
                              >
                                {attr.name}
                              </span>
                              <span className="text-[11px] text-on-surface-variant/75">
                                {attr.sublabel}
                              </span>
                            </div>
                          </div>
                          {isSelected && (
                            <Check
                              className="w-3.5 h-3.5"
                              style={{ color: attr.color }}
                            />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Field 3: Reward Intensity */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-on-surface-variant font-medium">
                      Reward intensity
                    </span>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-primary font-medium">+{currentRewards.xp} XP</span>
                      <span className="text-white/20">·</span>
                      <span className="text-on-surface-variant font-medium">
                        +{currentRewards.stardust} Stardust
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 p-1 rounded-lg bg-surface-container-low border border-white/[0.06] select-none">
                    {(["Low", "Medium", "High"] as IntensityLevel[]).map((level) => {
                      const isActive = intensity === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setIntensity(level)}
                          className={`py-1.5 text-center rounded text-xs transition-all cursor-pointer ${
                            isActive
                              ? "bg-surface-container text-white font-medium border border-white/[0.08] shadow-sm"
                              : "text-on-surface-variant hover:text-white"
                          }`}
                        >
                          {level}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={isIgnited}
                    className={`w-full relative overflow-hidden bg-primary text-[#002b36] font-medium text-sm tracking-wide py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-[0_2px_16px_rgba(77,216,255,0.25)] ${
                      isIgnited
                        ? "opacity-90 cursor-default"
                        : "hover:brightness-105 active:scale-[0.985]"
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isIgnited ? "Star awakened" : "Ignite first star"}</span>
                  </button>

                  {/* Inline quiet confirmation message (Appears post-ignition) */}
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      isIgnited ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="p-3 rounded-lg bg-surface-container border border-primary/30 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        <span className="text-white font-medium">Your first light is awake.</span>
                        <span className="text-primary font-medium">+{currentRewards.xp} XP</span>
                      </div>
                      <Link
                        href="/"
                        onClick={onComplete}
                        className="text-primary hover:text-white transition-colors font-medium flex items-center gap-1 group"
                      >
                        <span>Enter your universe</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Organic Deep Obsidian Constellation Sky */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="relative w-full h-[440px] sm:h-[480px] bg-[#09090e] rounded-2xl overflow-hidden border border-white/[0.07] shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                {/* Background Grid Subtle Rings */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                  <div className="w-[320px] h-[320px] rounded-full border border-white/[0.04]" />
                  <div className="absolute w-[200px] h-[200px] rounded-full border border-white/[0.03]" />
                </div>

                {/* Canvas */}
                <canvas
                  ref={canvasRef}
                  className="w-full h-full absolute inset-0 z-10 cursor-default"
                />

                {/* Canvas footer hint */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none text-[11px] font-mono text-white/30">
                  <span>Interactive Celestial Sky</span>
                  <span>{activeAttr.name} Primary Node</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restrained Minimal Footer */}
      <footer className="w-full py-4 border-t border-white/[0.04] bg-[#08080c] relative z-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 flex items-center justify-between text-on-surface-variant/50 font-mono text-[11px]">
          <div className="flex items-center gap-2">
            <span>Raizel Engine</span>
            <span className="text-white/10">·</span>
            <span>Celestial Calibration</span>
          </div>
          <span>Step 3 of 3</span>
        </div>
      </footer>
    </div>
  );
}
