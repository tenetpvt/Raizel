"use client";

import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/app/AppLayout";
import {
  Shield,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  Unlock,
  Layers,
  Flame,
  X,
  Sliders,
  Eye,
  RefreshCw,
  Target,
  Award,
  Zap,
  Check,
  Compass,
  CircleDot,
  Gem,
  Activity,
  ArrowRight,
  Filter,
} from "lucide-react";

type VaultCategory =
  | "all"
  | "themes"
  | "constellations"
  | "particles"
  | "interface"
  | "identity"
  | "utility";

interface VaultItem {
  id: string;
  name: string;
  category: "themes" | "constellations" | "particles" | "interface" | "identity" | "utility";
  categoryLabel: string;
  tag: string;
  cost: number;
  description: string;
  specs?: string;
  previewType: string;
  lockedGate?: string;
  currentCount?: number;
  maxCount?: number;
}

export default function VaultPage() {
  const [activeCategory, setActiveCategory] = useState<VaultCategory>("all");
  const [stardustBalance, setStardustBalance] = useState(1840);
  const [infoOpen, setInfoOpen] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState<VaultItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Equipped loadout state
  const [equipped, setEquipped] = useState({
    theme: "aurora",
    constellation: "fine-lines",
    particle: "comet-trace",
    interface: "card-material",
    identity: "adept",
  });

  // Unlocked items collection
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(
    new Set([
      "midnight",
      "aurora",
      "fine-lines",
      "soft-trail",
      "comet-trace",
      "card-material",
      "adept",
      "apprentice",
      "streak-shield",
      "quest-token",
    ])
  );

  // Utility armed counts
  const [utilities, setUtilities] = useState({
    streakShield: 2,
    questToken: 1,
    focusPass: 0,
  });

  // Show transient toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Catalog of Vault Items
  const items: VaultItem[] = [
    // --- THEMES ---
    {
      id: "midnight",
      name: "Midnight",
      category: "themes",
      categoryLabel: "Interface Theme",
      tag: "Deep Obsidian",
      cost: 0,
      description: "Default deep Obsidian atmosphere. Pure black negative space with precision hairlines.",
      specs: "1px Hairlines // Pure Dark",
      previewType: "theme-midnight",
    },
    {
      id: "aurora",
      name: "Aurora",
      category: "themes",
      categoryLabel: "Interface Theme",
      tag: "Violet & Cyan",
      cost: 0,
      description: "Subtle violet → cyan atmospheric accents. Soft ambient radiance on card edges.",
      specs: "Bioluminescent // Gradient",
      previewType: "theme-aurora",
    },
    {
      id: "ember",
      name: "Ember",
      category: "themes",
      categoryLabel: "Interface Theme",
      tag: "Amber Radiance",
      cost: 360,
      description: "Warmer dark interface with restrained orange/amber accents and soothing late-night glow.",
      specs: "Restorative Warmth",
      previewType: "theme-ember",
    },
    {
      id: "moonlit",
      name: "Moonlit",
      category: "themes",
      categoryLabel: "Interface Theme",
      tag: "Silver Sapphire",
      cost: 360,
      description: "Cooler silver/cyan interface with celestial clarity and razor-sharp contrast.",
      specs: "High Contrast Sapphire",
      previewType: "theme-moonlit",
    },

    // --- CONSTELLATIONS ---
    {
      id: "fine-lines",
      name: "Fine Lines",
      category: "constellations",
      categoryLabel: "Constellation Skin",
      tag: "Geometric Nodes",
      cost: 0,
      description: "Minimal geometric star connections and razor-sharp coordinates for clear navigational focus.",
      specs: "Minimal Vectors // Hairline",
      previewType: "constellation-fine-lines",
    },
    {
      id: "aurora-veil",
      name: "Aurora Veil",
      category: "constellations",
      categoryLabel: "Constellation Atmosphere",
      tag: "Season 04 Exclusive",
      cost: 480,
      description: "A living atmospheric light that gently unfurls behind constellation stars as quests complete.",
      specs: "Reactive Bioluminescence",
      previewType: "constellation-aurora-veil",
    },
    {
      id: "orbit",
      name: "Orbit",
      category: "constellations",
      categoryLabel: "Constellation Skin",
      tag: "Elliptic Harmonics",
      cost: 380,
      description: "Delicate orbital traces and celestial harmonics surrounding major milestone skill nodes.",
      specs: "Elliptic Harmonic Paths",
      previewType: "constellation-orbit",
    },
    {
      id: "solaris",
      name: "Solaris",
      category: "constellations",
      categoryLabel: "Constellation Skin",
      tag: "Corona Filaments",
      cost: 420,
      description: "Warmer celestial accents and golden corona filaments that brighten upon streak milestones.",
      specs: "Corona Filaments // Amber",
      previewType: "constellation-solaris",
    },

    // --- PARTICLES ---
    {
      id: "soft-trail",
      name: "Soft Trail",
      category: "particles",
      categoryLabel: "Particle Trail",
      tag: "Luminous Mist",
      cost: 0,
      description: "Subtle luminous mist following completed quests directly toward your active skill node.",
      specs: "Subtle Kinetic Drift",
      previewType: "particle-soft-trail",
    },
    {
      id: "comet-trace",
      name: "Comet Trace",
      category: "particles",
      categoryLabel: "Particle Trail",
      tag: "Kinetic Ember",
      cost: 0,
      description: "Directional kinetic pulse traveling from quest toward attribute node with lingering embers.",
      specs: "Directional Kinetic Pulse",
      previewType: "particle-comet-trace",
    },
    {
      id: "dustfall",
      name: "Dustfall",
      category: "particles",
      categoryLabel: "Particle Trail",
      tag: "Crystalline Scatter",
      cost: 260,
      description: "Soft crystalline cyan micro-burst radiating symmetrically whenever a daily quota is fulfilled.",
      specs: "Radial Crystalline Scatter",
      previewType: "particle-dustfall",
    },
    {
      id: "pulse",
      name: "Pulse",
      category: "particles",
      categoryLabel: "Particle Trail",
      tag: "Concentric Shockwave",
      cost: 300,
      description: "Concentric shockwave of pure lucent light echoing outward across the constellation plane.",
      specs: "Concentric Lucent Wave",
      previewType: "particle-pulse",
    },

    // --- INTERFACE ---
    {
      id: "card-material",
      name: "Card Material",
      category: "interface",
      categoryLabel: "Interface Cosmetic",
      tag: "Etched Obsidian",
      cost: 0,
      description: "Soft-etched obsidian container with 1px lucent hairline borders and delicate top edge illumination.",
      specs: "1px Lucent Hairlines",
      previewType: "interface-card-material",
    },
    {
      id: "accent-pack",
      name: "Accent Pack",
      category: "interface",
      categoryLabel: "Interface Cosmetic",
      tag: "Color System",
      cost: 220,
      description: "Customizes secondary interface highlights to celestial rose, deep cyan, or stardust amber.",
      specs: "Tri-Chromatic Accents",
      previewType: "interface-accent-pack",
    },
    {
      id: "cursor-trail",
      name: "Cursor Trail",
      category: "interface",
      categoryLabel: "Interface Cosmetic",
      tag: "Whisper Trail",
      cost: 280,
      description: "Whisper-thin light trail following pointer movement smoothly across dark workstation canvas.",
      specs: "Sub-pixel Pointer Feedback",
      previewType: "interface-cursor-trail",
    },

    // --- IDENTITY ---
    {
      id: "adept",
      name: "Adept",
      category: "identity",
      categoryLabel: "Operative Title",
      tag: "Proven Discipline",
      cost: 0,
      description: "Reflects proven consistency across multiple core skill constellations. Currently active moniker.",
      specs: "Constellation Moniker",
      previewType: "identity-adept",
    },
    {
      id: "apprentice",
      name: "The Apprentice",
      category: "identity",
      categoryLabel: "Operative Title",
      tag: "Archetype Moniker",
      cost: 0,
      description: "Reflects the humility of lifelong practice and structured beginning under your operative glyph.",
      specs: "Archetype Moniker",
      previewType: "identity-apprentice",
    },
    {
      id: "ascendant",
      name: "Ascendant",
      category: "identity",
      categoryLabel: "Honorary Title",
      tag: "Mastery Gate",
      cost: 0,
      lockedGate: "LVL 25 REQUIRED (CURRENT: 18)",
      description: "Reserved for operatives sustaining deep longitudinal commitment across multiple skill spheres.",
      specs: "Mastery Threshold // Level 25",
      previewType: "identity-ascendant",
    },
    {
      id: "nova-glyph",
      name: "Nova Glyph",
      category: "identity",
      categoryLabel: "Identity Emblem",
      tag: "Radial Starburst",
      cost: 180,
      description: "Minimal geometric starburst glyph crafted with precision radial lines for your operative badge.",
      specs: "Precision Radial Vector",
      previewType: "identity-nova-glyph",
    },

    // --- UTILITY ---
    {
      id: "streak-shield",
      name: "Streak Shield",
      category: "utility",
      categoryLabel: "Consistency Safeguard",
      tag: "Protected Cycle",
      cost: 250,
      currentCount: 2,
      maxCount: 3,
      description: "Protects one missed day without breaking your streak chain. Automatically deploys if emergency life obligations intervene. Max 3 armed at once.",
      specs: "Automated Chain Shield",
      previewType: "utility-shield",
    },
    {
      id: "quest-token",
      name: "Quest Token",
      category: "utility",
      categoryLabel: "Consistency Safeguard",
      tag: "History Telemetry",
      cost: 180,
      currentCount: 1,
      description: "Restores a mistakenly deleted quest within a 24-hour window along with all historical telemetry and timestamped notes.",
      specs: "24h Temporal Restoration",
      previewType: "utility-token",
    },
    {
      id: "focus-pass",
      name: "Focus Pass",
      category: "utility",
      categoryLabel: "Consistency Safeguard",
      tag: "Deep Work",
      cost: 150,
      currentCount: 0,
      description: "Temporarily highlights one priority quest in your daily view with dedicated quiet mode, hiding non-essential telemetry until completed.",
      specs: "Quiet Mode Focal State",
      previewType: "utility-focus",
    },
  ];

  // Compute unlocked progress
  const unlockedCount = items.filter((i) => unlockedIds.has(i.id)).length;
  const totalCount = items.length;
  const unlockPercentage = Math.round((unlockedCount / totalCount) * 100);

  // Equip handler
  const handleEquip = (item: VaultItem) => {
    if (item.category === "themes") setEquipped((p) => ({ ...p, theme: item.id }));
    if (item.category === "constellations") setEquipped((p) => ({ ...p, constellation: item.id }));
    if (item.category === "particles") setEquipped((p) => ({ ...p, particle: item.id }));
    if (item.category === "interface") setEquipped((p) => ({ ...p, interface: item.id }));
    if (item.category === "identity") setEquipped((p) => ({ ...p, identity: item.id }));

    triggerToast(`Equipped ${item.name} to active loadout`);
  };

  // Unlock confirmation handler
  const handleConfirmUnlock = (item: VaultItem) => {
    if (stardustBalance < item.cost) {
      triggerToast("Insufficient Stardust. Complete daily quests to earn more!");
      setActiveModalItem(null);
      return;
    }

    setStardustBalance((b) => b - item.cost);
    setUnlockedIds((prev) => new Set([...Array.from(prev), item.id]));

    if (item.id === "streak-shield") {
      setUtilities((u) => ({ ...u, streakShield: Math.min(3, u.streakShield + 1) }));
    } else if (item.id === "quest-token") {
      setUtilities((u) => ({ ...u, questToken: u.questToken + 1 }));
    } else if (item.id === "focus-pass") {
      setUtilities((u) => ({ ...u, focusPass: u.focusPass + 1 }));
    }

    setActiveModalItem(null);
    triggerToast(`Unlocked ${item.name} · -${item.cost} ✦ Stardust`);
  };

  // Filtered items
  const filteredItems = items.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  return (
    <AppLayout breadcrumb="Personalization Archive">
      <div className="flex flex-col w-full text-on-surface select-none pb-28 max-w-6xl mx-auto">
        {/* Ambient Atmospheric Radiance */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[140px] pointer-events-none -z-10" />
          <div className="absolute -top-20 right-1/4 w-[420px] h-[420px] bg-[#f6ad55]/8 rounded-full blur-[120px] pointer-events-none -z-10" />

          {/* 1. Header Area & Economy Micro-system */}
          <section className="relative z-10 pt-4 pb-8 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-xs text-[#f6ad55] uppercase tracking-widest font-semibold">
                    Personalization & Utility Archive
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="font-mono text-xs text-on-surface-variant">Lucent Studio</span>
                </div>
                <h1 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight leading-none">
                  The Vault
                </h1>
                <p className="font-sans text-sm md:text-base text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                  Spend the Stardust you've earned to shape how your Raizel universe looks, feels, and protects your consistency.
                </p>
              </div>

              {/* Balance Pill & Info Popover */}
              <div className="flex items-center gap-3 self-start md:self-auto">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setInfoOpen((o) => !o)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-white text-xs font-mono transition-colors border border-white/[0.06] cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-primary" />
                    <span>How Stardust works</span>
                  </button>

                  {/* Popover Card */}
                  {infoOpen && (
                    <div className="absolute right-0 top-full mt-2 w-80 p-4 rounded-xl bg-[#14161f]/95 backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.7)] z-50 transition-all">
                      <div className="flex items-center justify-between pb-2 border-b border-white/[0.05] mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#f6ad55]">✦</span>
                          <span className="font-display text-xs font-semibold text-white">
                            The Stardust Economy
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setInfoOpen(false)}
                          className="text-on-surface-variant hover:text-white p-0.5 rounded cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
                        Complete daily quests → earn Stardust → personalize your interface & protect consistency. Progression (XP, levels, attributes) is 100% earned and never sold.
                      </p>
                      <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10px] text-primary">
                        <span>STRICT MERIT ARCHIVE</span>
                        <span>NO COMMERCE</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stardust Reserve Pill */}
                <div className="flex items-center gap-2.5 bg-surface-container-low px-4 py-2 rounded-xl border border-white/[0.06] shadow-sm">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-container text-[#f6ad55] text-xs font-bold">
                    ✦
                  </span>
                  <div className="flex flex-col pr-1">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display text-base font-bold text-white leading-none">
                        {stardustBalance.toLocaleString()}
                      </span>
                      <span className="font-sans text-xs text-[#f6ad55]">Stardust</span>
                    </div>
                    <span className="font-mono text-[9px] text-on-surface-variant/70 uppercase tracking-wider mt-0.5">
                      Earned through quests
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ethical Rule Banner */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 rounded-xl bg-surface-container-low border border-white/[0.06] shadow-sm">
              <div className="flex items-center gap-2.5 text-xs text-on-surface-variant">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                <span>
                  <strong className="text-white font-semibold">Ethical Rule:</strong> Cosmetics change how Raizel looks and feels. Utilities protect your consistency. Progression remains 100% earned through real-world actions.
                </span>
              </div>
              <span className="hidden lg:inline-block font-mono text-[10px] text-on-surface-variant/60 tracking-widest whitespace-nowrap">
                ARCHIVE SECURE // LUCENT SPEC
              </span>
            </div>

            {/* 2. Currently Equipped Loadout Strip */}
            <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low border border-white/[0.06]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sliders className="w-3.5 h-3.5 text-primary" />
                  <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                    Currently Equipped Loadout
                  </span>
                </div>
                <span className="font-mono text-[10px] text-on-surface-variant/70 hidden sm:inline">
                  Active across workstation & mobile clients
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
                {/* Slot 1: Theme */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-primary/30 hover:border-primary/60 transition-colors">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-400 to-primary shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-none">
                      Theme
                    </span>
                    <span className="font-sans text-xs font-medium text-white truncate mt-1">
                      {equipped.theme === "aurora" ? "Aurora (Cyan Aura)" : "Midnight (Obsidian)"}
                    </span>
                  </div>
                </div>

                {/* Slot 2: Constellation */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-primary/30 hover:border-primary/60 transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-primary shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-none">
                      Constellation
                    </span>
                    <span className="font-sans text-xs font-medium text-white truncate mt-1">
                      {equipped.constellation === "fine-lines" ? "Fine Lines" : "Aurora Veil"}
                    </span>
                  </div>
                </div>

                {/* Slot 3: Particle */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-[#f6ad55]/30 hover:border-[#f6ad55]/60 transition-colors">
                  <Zap className="w-3.5 h-3.5 text-[#f6ad55] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-none">
                      Particle
                    </span>
                    <span className="font-sans text-xs font-medium text-white truncate mt-1">
                      {equipped.particle === "comet-trace" ? "Comet Trace" : "Soft Trail"}
                    </span>
                  </div>
                </div>

                {/* Slot 4: Interface */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  <Layers className="w-3.5 h-3.5 text-on-surface-variant shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-none">
                      Interface
                    </span>
                    <span className="font-sans text-xs font-medium text-white truncate mt-1">
                      Card Material
                    </span>
                  </div>
                </div>

                {/* Slot 5: Title */}
                <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-surface-container-lowest border border-white/[0.08] hover:border-white/[0.15] transition-colors">
                  <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider leading-none">
                      Title
                    </span>
                    <span className="font-sans text-xs font-medium text-white truncate mt-1">
                      {equipped.identity === "adept" ? "Adept" : "The Apprentice"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Category Navigation Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto py-2 border-b border-white/[0.06] scrollbar-none">
              {[
                { id: "all" as VaultCategory, label: "Featured" },
                { id: "themes" as VaultCategory, label: "Themes", count: 4 },
                { id: "constellations" as VaultCategory, label: "Constellations", count: 4 },
                { id: "particles" as VaultCategory, label: "Particles", count: 4 },
                { id: "interface" as VaultCategory, label: "Interface", count: 3 },
                { id: "identity" as VaultCategory, label: "Identity", count: 4 },
                { id: "utility" as VaultCategory, label: "Utility", count: 3, isSpecial: true },
              ].map((tab) => {
                const isActive = activeCategory === tab.id;
                const isSpecial = Boolean("isSpecial" in tab && tab.isSpecial);
                const count = "count" in tab ? tab.count : undefined;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveCategory(tab.id)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "bg-surface-container-high text-primary border border-primary/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] font-medium"
                        : isSpecial
                        ? "text-[#f6ad55] bg-[#f6ad55]/10 border border-[#f6ad55]/20 hover:bg-[#f6ad55]/15"
                        : "text-on-surface-variant hover:text-white hover:bg-surface-container-low border border-transparent"
                    }`}
                  >
                    {isSpecial && <Shield className="w-3 h-3 text-[#f6ad55]" />}
                    <span>{tab.label}</span>
                    {count !== undefined && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                          isSpecial
                            ? "bg-[#f6ad55]/20 text-[#f6ad55] font-semibold"
                            : "bg-surface-container text-on-surface-variant"
                        }`}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Featured Hero: Aurora Veil */}
          {(activeCategory === "all" || activeCategory === "constellations") && (
            <section className="relative z-10 mb-12 rounded-2xl bg-surface-container-low border border-white/[0.06] shadow-xl overflow-hidden group">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -right-20 -top-32 w-[600px] h-[450px] bg-gradient-to-bl from-primary/20 via-cyan-400/10 to-transparent rounded-full blur-[90px] opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute right-40 bottom-0 w-[400px] h-[300px] bg-gradient-to-t from-purple-900/20 via-transparent to-transparent rounded-full blur-[80px]" />
              </div>

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 lg:p-8 items-center">
                <div className="lg:col-span-7 flex flex-col gap-4 z-10">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-xs uppercase tracking-wider border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Featured Constellation Atmosphere
                    </span>
                    <span className="font-mono text-xs text-on-surface-variant/70">
                      Season 04 Exclusive
                    </span>
                  </div>

                  <div>
                    <h2 className="font-display text-3xl font-bold text-white tracking-tight">
                      Aurora Veil
                    </h2>
                    <p className="font-sans text-sm text-on-surface-variant mt-2 max-w-lg leading-relaxed">
                      A living atmospheric light that gently unfurls behind your constellation stars as daily quests are completed. Adapts softly to unbroken streaks.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-5 pt-1 text-xs text-on-surface-variant">
                    <div className="flex items-center gap-1.5">
                      <CircleDot className="w-3.5 h-3.5 text-primary" />
                      <span>Infinite reactive loops</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      <span>Calm ambient depth</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Gem className="w-3.5 h-3.5 text-[#f6ad55]" />
                      <span>Archival edition</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <div className="flex items-baseline gap-1.5 bg-surface-container px-3.5 py-2 rounded-xl border border-white/[0.06]">
                      <span className="text-[#f6ad55] text-sm">✦</span>
                      <span className="font-display text-base font-bold text-white">480</span>
                      <span className="font-mono text-[10px] text-on-surface-variant uppercase">
                        Stardust
                      </span>
                    </div>

                    {unlockedIds.has("aurora-veil") ? (
                      <button
                        type="button"
                        onClick={() =>
                          handleEquip(items.find((i) => i.id === "aurora-veil")!)
                        }
                        className="px-5 py-2.5 rounded-xl bg-primary text-[#0a0a0f] font-sans text-sm font-semibold hover:shadow-[0_0_20px_rgba(74,214,253,0.4)] transition-all cursor-pointer"
                      >
                        {equipped.constellation === "aurora-veil" ? "Equipped" : "Equip"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setActiveModalItem(items.find((i) => i.id === "aurora-veil")!)
                        }
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-[#0a0a0f] font-sans text-sm font-semibold hover:shadow-[0_0_20px_rgba(74,214,253,0.4)] transition-all cursor-pointer"
                      >
                        <Unlock className="w-4 h-4" />
                        <span>Unlock Cosmetic</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        setActiveModalItem(items.find((i) => i.id === "aurora-veil")!)
                      }
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-white font-sans text-xs hover:bg-surface-container-high transition-colors border border-white/[0.06] cursor-pointer"
                    >
                      <Sliders className="w-3.5 h-3.5 text-on-surface-variant" />
                      <span>Live Interactive Preview</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Miniature Constellation Canvas */}
                <div className="lg:col-span-5 relative w-full h-64 lg:h-72 rounded-xl bg-surface-container-lowest overflow-hidden border border-white/[0.08] shadow-inner flex items-center justify-center group/card">
                  <div className="absolute inset-0 bg-[radial-gradient(#4ad6fd_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                  <div className="absolute w-72 h-48 bg-gradient-to-r from-primary/20 via-cyan-300/30 to-purple-500/20 rounded-full filter blur-[40px] transform -rotate-12 group-hover/card:scale-110 transition-transform duration-700" />
                  <svg className="relative z-10 w-full h-full p-4" fill="none" viewBox="0 0 300 200">
                    <circle cx="60" cy="140" fill="#baecff" r="4" className="drop-shadow-[0_0_8px_rgba(74,214,253,0.7)]" />
                    <circle cx="150" cy="60" fill="#4ad6fd" r="5" className="drop-shadow-[0_0_12px_rgba(74,214,253,0.7)]" />
                    <circle cx="240" cy="110" fill="#baecff" r="4" />
                    <circle cx="190" cy="160" fill="#ffb7a7" r="3.5" />
                    <line x1="60" y1="140" x2="150" y2="60" stroke="#4ad6fd" strokeOpacity="0.7" strokeWidth="1.5" />
                    <line x1="150" y1="60" x2="240" y2="110" stroke="#4ad6fd" strokeOpacity="0.7" strokeWidth="1.5" />
                    <line x1="240" y1="110" x2="190" y2="160" stroke="#baecff" strokeDasharray="2 2" strokeOpacity="0.5" strokeWidth="1" />
                    <line x1="60" y1="140" x2="190" y2="160" stroke="#ffb7a7" strokeDasharray="3 3" strokeOpacity="0.4" strokeWidth="1" />
                  </svg>
                  <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 font-mono text-[10px] text-primary px-2 py-0.5 rounded bg-surface-container/80 backdrop-blur-md border border-white/[0.06]">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span>TELEMETRY: STABLE DRIFT // 60 FPS</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* 5. Main Catalog Grid (Grouped by Category or Filtered) */}
          <div className="flex flex-col gap-12">
            {(["themes", "constellations", "particles", "interface", "identity", "utility"] as const).map(
              (category) => {
                if (activeCategory !== "all" && activeCategory !== category) return null;

                const categoryItems = items.filter((i) => i.category === category);
                if (categoryItems.length === 0) return null;

                const titles: Record<string, { title: string; subtitle: string; tag: string }> = {
                  themes: {
                    title: "Interface Themes",
                    subtitle: "Full workspace environment styling and atmospheric chromatics",
                    tag: "Atmospheric Chromatics",
                  },
                  constellations: {
                    title: "Constellation Skins",
                    subtitle: "Alters star node links, orbital filament paths, and coordinate systems",
                    tag: "Star Map Geometries",
                  },
                  particles: {
                    title: "Particle Completion Trails",
                    subtitle: "Visual trails that travel from completed quest toward constellation nodes",
                    tag: "Kinetic Rewards",
                  },
                  interface: {
                    title: "Interface Cosmetics",
                    subtitle: "Subtle interaction feedback, card materials, and pointer trails",
                    tag: "Subtle UI Personalization",
                  },
                  identity: {
                    title: "Titles & Emblems",
                    subtitle: "Earned monikers and radial badges displayed on profile and HUD",
                    tag: "Operative Identity",
                  },
                  utility: {
                    title: "Quality-of-Life & Consistency Safeguards",
                    subtitle: "Functional safeguards designed strictly to protect consistency. Never pay-to-win.",
                    tag: "Consistency Utilities",
                  },
                };

                const meta = titles[category];

                return (
                  <section key={category} className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 border-b border-white/[0.04] pb-3">
                      <div>
                        <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                          {meta.tag}
                        </span>
                        <h3 className="font-display text-2xl font-semibold text-white tracking-tight mt-0.5">
                          {meta.title}
                        </h3>
                      </div>
                      <span className="font-sans text-xs text-on-surface-variant/70">
                        {meta.subtitle}
                      </span>
                    </div>

                    {/* Cards Grid */}
                    <div
                      className={`grid gap-4 ${
                        category === "interface" || category === "utility"
                          ? "grid-cols-1 md:grid-cols-3"
                          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                      }`}
                    >
                      {categoryItems.map((item) => {
                        const isUnlocked = unlockedIds.has(item.id);
                        const isEquipped =
                          (category === "themes" && equipped.theme === item.id) ||
                          (category === "constellations" && equipped.constellation === item.id) ||
                          (category === "particles" && equipped.particle === item.id) ||
                          (category === "interface" && equipped.interface === item.id) ||
                          (category === "identity" && equipped.identity === item.id);

                        return (
                          <div
                            key={item.id}
                            className={`flex flex-col justify-between p-4 rounded-xl transition-all shadow-md group ${
                              isEquipped
                                ? "bg-surface-container-low border border-primary/40 shadow-[0_0_12px_rgba(74,214,253,0.06)]"
                                : item.lockedGate
                                ? "bg-surface-container-low/70 border border-white/[0.04] opacity-80"
                                : "bg-surface-container-low border border-white/[0.06] hover:border-white/10 hover:bg-surface-container"
                            }`}
                          >
                            <div>
                              {/* Top Bar inside Card */}
                              <div className="flex items-center justify-between mb-3 text-xs">
                                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider">
                                  {item.tag}
                                </span>

                                {isEquipped ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary font-mono text-[10px] uppercase font-semibold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    Equipped
                                  </span>
                                ) : isUnlocked ? (
                                  <span className="inline-flex items-center gap-1 font-mono text-[10px] text-primary">
                                    <CheckCircle2 className="w-3 h-3" />
                                    Owned
                                  </span>
                                ) : item.lockedGate ? (
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container font-mono text-[10px] text-on-surface-variant">
                                    <Lock className="w-3 h-3" /> Gate
                                  </span>
                                ) : (
                                  <span className="font-mono text-xs text-[#f6ad55] font-medium">
                                    ✦ {item.cost}
                                  </span>
                                )}
                              </div>

                              {/* Preview Area inside Card */}
                              <div className="w-full h-32 rounded-lg bg-surface-container-lowest border border-white/[0.04] overflow-hidden flex items-center justify-center p-3 relative shadow-inner">
                                {item.previewType === "theme-midnight" && (
                                  <div className="w-full h-full flex gap-1.5 overflow-hidden">
                                    <div className="w-6 h-full bg-[#0a0a0f] rounded-xs flex flex-col gap-1 p-1">
                                      <div className="w-2 h-2 rounded-full bg-primary/40" />
                                      <div className="w-full h-1 bg-white/10 rounded" />
                                      <div className="w-full h-1 bg-white/10 rounded" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1.5">
                                      <div className="w-full h-4 bg-[#141420] rounded-xs flex items-center px-1.5 justify-between">
                                        <div className="w-8 h-1 bg-white/20 rounded" />
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-1 flex-1">
                                        <div className="bg-[#1b1b27] rounded-xs border border-white/[0.04]" />
                                        <div className="bg-[#1b1b27] rounded-xs border border-white/[0.04]" />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "theme-aurora" && (
                                  <div className="w-full h-full flex gap-1.5 overflow-hidden relative">
                                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/20 rounded-full blur-lg" />
                                    <div className="w-6 h-full bg-[#120f1f] rounded-xs flex flex-col gap-1 p-1">
                                      <div className="w-2 h-2 rounded-full bg-purple-400" />
                                      <div className="w-full h-1 bg-purple-300/30 rounded" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1.5 relative z-10">
                                      <div className="w-full h-4 bg-purple-900/20 rounded-xs flex items-center px-1.5 justify-between border border-purple-500/20">
                                        <div className="w-8 h-1 bg-purple-300 rounded" />
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-1 flex-1">
                                        <div className="bg-surface-container-high rounded-xs border border-purple-500/10" />
                                        <div className="bg-surface-container-high rounded-xs border border-purple-500/10" />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "theme-ember" && (
                                  <div className="w-full h-full flex gap-1.5 overflow-hidden relative">
                                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#ff7556]/20 rounded-full blur-lg" />
                                    <div className="w-6 h-full bg-[#1b1210] rounded-xs flex flex-col gap-1 p-1">
                                      <div className="w-2 h-2 rounded-full bg-[#ff7556]" />
                                      <div className="w-full h-1 bg-[#ff7556]/30 rounded" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1.5 relative z-10">
                                      <div className="w-full h-4 bg-[#ff7556]/15 rounded-xs flex items-center px-1.5 justify-between border border-[#ff7556]/20">
                                        <div className="w-8 h-1 bg-[#ff7556] rounded" />
                                        <div className="w-2 h-2 rounded-full bg-[#ff7556]" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-1 flex-1">
                                        <div className="bg-surface-container-high rounded-xs border border-[#ff7556]/10" />
                                        <div className="bg-surface-container-high rounded-xs border border-[#ff7556]/10" />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "theme-moonlit" && (
                                  <div className="w-full h-full flex gap-1.5 overflow-hidden relative">
                                    <div className="absolute -left-4 -top-4 w-16 h-16 bg-primary/20 rounded-full blur-lg" />
                                    <div className="w-6 h-full bg-[#0c1418] rounded-xs flex flex-col gap-1 p-1">
                                      <div className="w-2 h-2 rounded-full bg-primary" />
                                      <div className="w-full h-1 bg-primary/30 rounded" />
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1.5 relative z-10">
                                      <div className="w-full h-4 bg-primary/15 rounded-xs flex items-center px-1.5 justify-between border border-primary/20">
                                        <div className="w-8 h-1 bg-primary rounded" />
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                      </div>
                                      <div className="grid grid-cols-2 gap-1 flex-1">
                                        <div className="bg-surface-container-high rounded-xs border border-primary/10" />
                                        <div className="bg-surface-container-high rounded-xs border border-primary/10" />
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "constellation-fine-lines" && (
                                  <svg className="w-24 h-20" fill="none" viewBox="0 0 100 80">
                                    <circle cx="20" cy="60" fill="#baecff" r="2.5" />
                                    <circle cx="50" cy="20" fill="#4ad6fd" r="3.5" />
                                    <circle cx="80" cy="50" fill="#baecff" r="2.5" />
                                    <line x1="20" y1="60" x2="50" y2="20" stroke="#4ad6fd" strokeWidth="1" />
                                    <line x1="50" y1="20" x2="80" y2="50" stroke="#4ad6fd" strokeWidth="1" />
                                  </svg>
                                )}

                                {item.previewType === "constellation-aurora-veil" && (
                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-purple-500/20 blur-md" />
                                    <svg className="relative z-10 w-24 h-20" fill="none" viewBox="0 0 100 80">
                                      <circle cx="25" cy="55" fill="#4ad6fd" r="3.5" className="drop-shadow-[0_0_6px_#4ad6fd]" />
                                      <circle cx="75" cy="25" fill="#baecff" r="3" className="drop-shadow-[0_0_6px_#baecff]" />
                                      <line x1="25" y1="55" x2="75" y2="25" stroke="#baecff" strokeOpacity="0.8" strokeWidth="1.5" />
                                    </svg>
                                  </div>
                                )}

                                {item.previewType === "constellation-orbit" && (
                                  <svg className="w-24 h-20" fill="none" viewBox="0 0 100 80">
                                    <ellipse cx="50" cy="40" rx="35" ry="18" stroke="#baecff" strokeDasharray="2 2" strokeOpacity="0.4" />
                                    <circle cx="50" cy="40" fill="#4ad6fd" r="3.5" />
                                    <circle cx="75" cy="28" fill="#baecff" r="2" />
                                  </svg>
                                )}

                                {item.previewType === "constellation-solaris" && (
                                  <div className="relative w-full h-full flex items-center justify-center">
                                    <div className="absolute w-20 h-20 rounded-full bg-[#f6ad55]/15 blur-lg" />
                                    <svg className="relative z-10 w-24 h-20" fill="none" viewBox="0 0 100 80">
                                      <circle cx="50" cy="40" fill="#ffb7a7" r="4" className="drop-shadow-[0_0_8px_#ffb7a7]" />
                                      <circle cx="25" cy="30" fill="#ffdad2" r="2" />
                                      <circle cx="75" cy="55" fill="#ffdad2" r="2" />
                                      <line x1="50" y1="40" x2="25" y2="30" stroke="#ffb7a7" strokeOpacity="0.6" />
                                      <line x1="50" y1="40" x2="75" y2="55" stroke="#ffb7a7" strokeOpacity="0.6" />
                                    </svg>
                                  </div>
                                )}

                                {item.previewType === "particle-soft-trail" && (
                                  <div className="w-full flex items-center justify-between px-2">
                                    <div className="w-10 h-6 rounded bg-surface-container flex items-center justify-center text-[10px] font-mono text-on-surface-variant">
                                      Quest
                                    </div>
                                    <div className="flex items-center gap-1 opacity-60">
                                      <span className="w-1 h-1 rounded-full bg-primary" />
                                      <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                      <span className="w-2 h-2 rounded-full bg-primary/80" />
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px]">
                                      ✦
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "particle-comet-trace" && (
                                  <div className="w-full flex items-center justify-between px-2">
                                    <div className="w-10 h-6 rounded bg-surface-container flex items-center justify-center text-[10px] font-mono text-on-surface-variant">
                                      Quest
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                      <span className="w-2.5 h-2.5 rounded-full bg-[#f6ad55] animate-pulse shadow-[0_0_8px_#f6ad55]" />
                                      <span className="w-2 h-2 rounded-full bg-[#f6ad55]/70" />
                                      <span className="w-1.5 h-1.5 rounded-full bg-[#f6ad55]/40" />
                                    </div>
                                    <div className="w-5 h-5 rounded-full bg-[#f6ad55]/20 flex items-center justify-center text-[#f6ad55] text-[10px]">
                                      ✦
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "particle-dustfall" && (
                                  <div className="flex flex-col items-center gap-1">
                                    <Sparkles className="w-6 h-6 text-primary drop-shadow-[0_0_8px_rgba(74,214,253,0.7)]" />
                                    <span className="font-mono text-[9px] text-primary/80">
                                      CRYSTALLINE
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "particle-pulse" && (
                                  <div className="relative flex items-center justify-center">
                                    <div className="w-14 h-14 rounded-full border border-primary/30 animate-ping duration-1000" />
                                    <div className="absolute w-8 h-8 rounded-full border border-primary/60" />
                                    <div className="absolute w-2.5 h-2.5 rounded-full bg-primary" />
                                  </div>
                                )}

                                {item.previewType === "interface-card-material" && (
                                  <div className="w-full p-2.5 rounded bg-surface-container border border-white/[0.08] flex items-center justify-between">
                                    <span className="font-sans text-xs text-white">Etched Obsidian</span>
                                    <span className="font-mono text-[10px] text-primary">1px Lucent</span>
                                  </div>
                                )}

                                {item.previewType === "interface-accent-pack" && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-400 flex items-center justify-center text-purple-300 text-xs font-bold">
                                      ✦
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary text-xs font-bold">
                                      ✦
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#f6ad55]/20 border border-[#f6ad55] flex items-center justify-center text-[#f6ad55] text-xs font-bold">
                                      ✦
                                    </div>
                                  </div>
                                )}

                                {item.previewType === "interface-cursor-trail" && (
                                  <div className="flex items-center gap-2">
                                    <Compass className="w-5 h-5 text-primary" />
                                    <span className="w-12 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                                  </div>
                                )}

                                {item.previewType === "identity-adept" && (
                                  <div className="flex flex-col items-center">
                                    <span className="font-mono text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-1">
                                      Proven Discipline
                                    </span>
                                    <span className="font-display text-base text-primary tracking-wider px-3 py-1 rounded bg-surface-container-high border border-primary/30">
                                      Adept
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "identity-apprentice" && (
                                  <div className="flex flex-col items-center">
                                    <span className="font-mono text-[9px] text-on-surface-variant/60 uppercase tracking-widest mb-1">
                                      Archetype Moniker
                                    </span>
                                    <span className="font-display text-base text-white tracking-wider px-3 py-1 rounded bg-surface-container-high border border-white/[0.08]">
                                      The Apprentice
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "identity-ascendant" && (
                                  <div className="flex flex-col items-center">
                                    <Lock className="w-5 h-5 text-outline mb-1 opacity-60" />
                                    <span className="font-display text-base text-outline tracking-wider">
                                      Ascendant
                                    </span>
                                    <span className="font-mono text-[9px] text-[#f6ad55]/80 mt-1">
                                      LVL 25 REQUIRED
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "identity-nova-glyph" && (
                                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center border border-primary/20 group-hover:scale-105 transition-transform">
                                    <Sparkles className="w-7 h-7 text-primary" />
                                  </div>
                                )}

                                {item.previewType === "utility-shield" && (
                                  <div className="flex flex-col items-center gap-1 text-[#f6ad55]">
                                    <div className="w-10 h-10 rounded-lg bg-[#f6ad55]/10 flex items-center justify-center">
                                      <Shield className="w-6 h-6" />
                                    </div>
                                    <span className="font-mono text-[10px] text-white">
                                      {utilities.streakShield} of 3 Armed
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "utility-token" && (
                                  <div className="flex flex-col items-center gap-1 text-primary">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                      <RefreshCw className="w-6 h-6" />
                                    </div>
                                    <span className="font-mono text-[10px] text-white">
                                      {utilities.questToken} Available
                                    </span>
                                  </div>
                                )}

                                {item.previewType === "utility-focus" && (
                                  <div className="flex flex-col items-center gap-1 text-purple-400">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                      <Target className="w-6 h-6" />
                                    </div>
                                    <span className="font-mono text-[10px] text-white">
                                      Deep Work Mode
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Title & Desc */}
                              <div className="mt-3">
                                <h4 className="font-display text-base font-semibold text-white">
                                  {item.name}
                                </h4>
                                <p className="font-sans text-xs text-on-surface-variant mt-1 leading-relaxed line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            </div>

                            {/* Card Footer Actions */}
                            <div className="flex items-center justify-between pt-3 mt-3 border-t border-white/[0.06]">
                              {item.lockedGate ? (
                                <>
                                  <span className="font-mono text-[10px] text-on-surface-variant/80">
                                    7 LEVELS REMAINING
                                  </span>
                                  <button
                                    type="button"
                                    disabled
                                    className="px-3 py-1.5 rounded-lg bg-surface-container font-mono text-xs text-outline opacity-60 cursor-not-allowed"
                                  >
                                    Locked
                                  </button>
                                </>
                              ) : isEquipped ? (
                                <>
                                  <span className="font-mono text-[10px] text-primary">
                                    ACTIVE IN PROFILE
                                  </span>
                                  <button
                                    type="button"
                                    disabled
                                    className="px-3 py-1.5 rounded-lg bg-surface-container font-mono text-xs text-on-surface-variant opacity-70 cursor-default"
                                  >
                                    Equipped
                                  </button>
                                </>
                              ) : isUnlocked ? (
                                <>
                                  <span className="font-mono text-[10px] text-on-surface-variant">
                                    IN INVENTORY
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleEquip(item)}
                                    className="px-3.5 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-bright text-white font-sans text-xs font-medium transition-colors shadow-sm cursor-pointer"
                                  >
                                    Equip
                                  </button>
                                </>
                              ) : (
                                <>
                                  <span className="font-mono text-xs text-[#f6ad55] font-semibold">
                                    ✦ {item.cost}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => setActiveModalItem(item)}
                                    className="px-3.5 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-[#0a0a0f] font-sans text-xs font-semibold transition-all shadow-sm cursor-pointer"
                                  >
                                    Unlock
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                );
              }
            )}
          </div>

          {/* 6. Archival Stats / Footer Telemetry */}
          <section className="relative z-10 mt-14 p-6 rounded-2xl bg-surface-container-low border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary border border-white/[0.06]">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display text-sm font-semibold text-white">
                  Archival Synchronized
                </span>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                  Cosmetics and armed utilities sync seamlessly across all workstation clients and mobile companions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="text-right">
                <span className="font-mono text-[10px] text-on-surface-variant uppercase tracking-wider block">
                  Collection Index
                </span>
                <span className="font-display text-xs font-semibold text-white">
                  {unlockedCount} of {totalCount} Unlocked ({unlockPercentage}%)
                </span>
              </div>
              <div className="w-28 h-2 rounded-full bg-surface-container overflow-hidden border border-white/[0.06]">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${unlockPercentage}%` }}
                />
              </div>
            </div>
          </section>
        </div>

        {/* Slide-out / Modal Detail Panel: Inspection & Confirmation */}
        {activeModalItem && (
          <div className="fixed inset-0 bg-[#0a0a0f]/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all">
            <div className="relative w-full max-w-md rounded-2xl bg-[#131318] border border-white/[0.08] shadow-[0_24px_64px_rgba(0,0,0,0.8)] p-6 overflow-hidden">
              <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/20 rounded-full blur-[60px] pointer-events-none" />

              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
                    {activeModalItem.categoryLabel}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="p-1 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Item Showcase Banner inside Modal */}
              <div className="relative w-full h-36 rounded-xl bg-surface-container-lowest border border-white/[0.06] overflow-hidden my-3 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-transparent animate-pulse duration-1000" />
                <div className="relative z-10 flex flex-col items-center">
                  <Gem className="w-10 h-10 text-primary drop-shadow-[0_0_16px_rgba(74,214,253,0.7)]" />
                  <span className="font-display text-lg font-bold text-white mt-1">
                    {activeModalItem.name}
                  </span>
                  <span className="font-mono text-[10px] text-[#f6ad55] tracking-wider mt-0.5">
                    {activeModalItem.specs || "CALIBRATED TELEMETRY"}
                  </span>
                </div>
              </div>

              {/* Cost & Balance Breakdown */}
              <div className="flex flex-col gap-2 py-3">
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Stardust Cost</span>
                  <span className="font-mono text-white font-semibold">
                    ✦ {activeModalItem.cost}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <span>Current Reserve</span>
                  <span className="font-mono text-white">
                    ✦ {stardustBalance.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 mt-1 bg-surface-container rounded-lg text-xs border border-white/[0.04]">
                  <span className="text-white font-medium">Resulting Balance</span>
                  <span className="font-mono text-[#f6ad55] font-semibold">
                    ✦ {(stardustBalance - activeModalItem.cost).toLocaleString()} Stardust
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 py-1 text-on-surface-variant/80 text-xs">
                <CircleDot className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Permanent unlock · Usable across all active workstation clients</span>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 mt-3 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="px-4 py-2 rounded-lg text-on-surface-variant hover:text-white hover:bg-surface-container text-xs font-mono transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmUnlock(activeModalItem)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-[#0a0a0f] font-sans text-xs font-semibold hover:shadow-[0_0_20px_rgba(74,214,253,0.4)] transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Unlock</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transient Feedback Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-[#14161f]/95 backdrop-blur-md border border-primary/40 shadow-[0_16px_32px_rgba(0,0,0,0.6)] text-white text-xs font-sans animate-in fade-in slide-in-from-bottom-2">
            <Sparkles className="w-4 h-4 text-primary shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
