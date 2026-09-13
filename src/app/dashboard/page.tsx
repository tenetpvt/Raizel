"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/app/AppLayout";
import {
  Flame,
  Star,
  Plus,
  Check,
  Clock,
  Calendar,
  Timer,
  Terminal,
  ArrowRight,
  Sparkles,
  X,
} from "lucide-react";

interface Quest {
  id: string;
  title: string;
  attribute: "intellect" | "strength" | "discipline" | "vitality";
  intensity: "Low" | "Medium" | "High";
  timeHint: string;
  xp: number;
  stardust: number;
  isCompleted: boolean;
  completedAt?: string;
}

const INITIAL_QUESTS: Quest[] = [
  {
    id: "q1",
    title: "Complete 45-minute focused writing sprint",
    attribute: "intellect",
    intensity: "Medium",
    timeHint: "Morning",
    xp: 45,
    stardust: 12,
    isCompleted: false,
  },
  {
    id: "q2",
    title: "Morning strength session",
    attribute: "strength",
    intensity: "High",
    timeHint: "10:00 AM",
    xp: 70,
    stardust: 18,
    isCompleted: false,
  },
  {
    id: "q3",
    title: "Read 20 pages",
    attribute: "intellect",
    intensity: "Low",
    timeHint: "Anytime",
    xp: 20,
    stardust: 6,
    isCompleted: false,
  },
  {
    id: "q4",
    title: "15-minute mindful breathwork",
    attribute: "vitality",
    intensity: "Low",
    timeHint: "2:00 PM",
    xp: 20,
    stardust: 6,
    isCompleted: false,
  },
  {
    id: "qc1",
    title: "Deep architecture review",
    attribute: "discipline",
    intensity: "Medium",
    timeHint: "Completed at 08:30 AM",
    xp: 50,
    stardust: 15,
    isCompleted: true,
    completedAt: "08:30 AM",
  },
];

const ATTR_CONFIG = {
  intellect: { label: "Intellect", color: "#4dd8ff", dotClass: "bg-[#4dd8ff]" },
  strength: { label: "Strength", color: "#ff6b4a", dotClass: "bg-[#ff6b4a]" },
  discipline: { label: "Discipline", color: "#9d7bff", dotClass: "bg-[#9d7bff]" },
  vitality: { label: "Vitality", color: "#34d399", dotClass: "bg-[#34d399]" },
};

export default function DashboardPage() {
  const [isGuest, setIsGuest] = useState(true);
  const [userName, setUserName] = useState("TenET");
  const [level, setLevel] = useState(12);
  const [streakDays, setStreakDays] = useState(18);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [currentXP, setCurrentXP] = useState(1840);
  const [currentStardust, setCurrentStardust] = useState(1840);
  const maxXP = 2400;

  // Add Quest Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newAttr, setNewAttr] = useState<"intellect" | "strength" | "discipline" | "vitality">(
    "intellect"
  );
  const [newIntensity, setNewIntensity] = useState<"Low" | "Medium" | "High">("Medium");

  // Check Supabase session & fetch real user data if authenticated
  React.useEffect(() => {
    async function loadUserData() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setIsGuest(false);

          // Fetch profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUserName(profile.full_name || "Adventurer");
            setLevel(profile.level || 1);
            setCurrentXP(profile.xp || 0);
            setCurrentStardust(profile.stardust || 0);
            setStreakDays(profile.streak_count || 0);
          }

          // Fetch user's real quests
          const { data: dbQuests } = await supabase
            .from("quests")
            .select("*")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false });

          if (dbQuests && dbQuests.length > 0) {
            setQuests(
              dbQuests.map((q: any) => ({
                id: q.id,
                title: q.title,
                attribute: q.attribute_type,
                intensity: q.intensity,
                timeHint: "Today",
                xp: q.xp_reward,
                stardust: q.stardust_reward,
                isCompleted: q.is_completed,
                completedAt: q.completed_at ? new Date(q.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
              }))
            );
          }
        }
      } catch (err) {
        console.warn("Using guest demo mode fallback:", err);
      }
    }

    loadUserData();
  }, []);

  const activeQuests = quests.filter((q) => !q.isCompleted);
  const completedQuests = quests.filter((q) => q.isCompleted);
  const totalQuests = quests.length;

  const toggleQuest = async (id: string, e: React.MouseEvent) => {
    // Trigger photon spark effect
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const spark = document.createElement("div");
    spark.className = "fixed pointer-events-none rounded-full z-50 transition-all duration-700 ease-out";
    spark.style.left = rect.left + rect.width / 2 + "px";
    spark.style.top = rect.top + rect.height / 2 + "px";
    spark.style.width = "8px";
    spark.style.height = "8px";
    spark.style.backgroundColor = "#4dd8ff";
    spark.style.boxShadow = "0 0 16px 4px #4dd8ff";
    spark.style.transform = "translate(-50%, -50%) scale(1)";
    document.body.appendChild(spark);

    requestAnimationFrame(() => {
      spark.style.transform = "translate(-50%, -80px) scale(0)";
      spark.style.opacity = "0";
    });
    setTimeout(() => spark.remove(), 750);

    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === id) {
          const nextCompleted = !q.isCompleted;
          if (nextCompleted) {
            setCurrentXP((xp) => xp + q.xp);
            setCurrentStardust((s) => s + q.stardust);
          } else {
            setCurrentXP((xp) => Math.max(0, xp - q.xp));
            setCurrentStardust((s) => Math.max(0, s - q.stardust));
          }
          return {
            ...q,
            isCompleted: nextCompleted,
            completedAt: nextCompleted ? "Just now" : undefined,
          };
        }
        return q;
      })
    );
  };

  const handleCreateQuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const xpMap = { Low: 20, Medium: 45, High: 75 };
    const stardustMap = { Low: 6, Medium: 12, High: 20 };

    const newQuest: Quest = {
      id: "q_" + Date.now(),
      title: newTitle.trim(),
      attribute: newAttr,
      intensity: newIntensity,
      timeHint: "Today",
      xp: xpMap[newIntensity],
      stardust: stardustMap[newIntensity],
      isCompleted: false,
    };

    setQuests((prev) => [newQuest, ...prev]);
    setNewTitle("");
    setIsAddModalOpen(false);
  };

  const xpPercent = Math.min(100, Math.round((currentXP / maxXP) * 100));
  const diffXP = maxXP - currentXP;

  return (
    <AppLayout breadcrumb="Alex's Orbit">
      <div className="flex flex-col w-full text-on-surface select-none pb-16">
        {/* Top Greeting & Contextual Metas */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-2 pb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-3xl sm:text-4xl text-white font-bold tracking-tight">
                Good morning, {userName}
              </h1>
              {isGuest && (
                <Link
                  href="/auth"
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/25 text-primary hover:bg-primary/20 transition-colors uppercase font-medium tracking-wider"
                >
                  Guest Mode · Sign in
                </Link>
              )}
            </div>
            <p className="font-sans text-sm text-on-surface-variant">
              Your universe grows one disciplined action at a time.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer group border border-white/[0.04]">
              <Flame className="w-4 h-4 text-ember" />
              <span className="font-mono text-xs font-semibold text-white">{streakDays}d Streak</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer group border border-white/[0.04]">
              <Star className="w-4 h-4 text-amber" />
              <span className="font-mono text-xs font-semibold text-on-surface-variant">
                {currentStardust.toLocaleString()} Stardust
              </span>
            </div>
          </div>
        </div>

        {/* Primary Two-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Quests & Operational Stream (8-cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Section Header with Quick Keybinds */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-xl text-white font-semibold tracking-tight">
                    Today&apos;s quests
                  </h2>
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-surface-container-highest text-primary font-semibold tracking-wider">
                    {activeQuests.length} PENDING
                  </span>
                </div>
                <p className="font-sans text-xs text-on-surface-variant mt-0.5">
                  Small actions. Visible progress.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-white transition-all text-xs border border-white/[0.04]"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span className="font-mono uppercase text-[11px]">⌘K</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-primary text-[#002b36] font-semibold hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_16px_rgba(77,216,255,0.18)] text-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add quest</span>
                  <span className="font-mono text-[10px] opacity-75 ml-1">⌘N</span>
                </button>
              </div>
            </div>

            {/* ACTIVE QUEST LIST CONTAINER */}
            <div className="flex flex-col gap-3">
              {activeQuests.length === 0 ? (
                <div className="p-8 rounded-xl bg-surface-container-low/40 border border-white/[0.05] text-center">
                  <p className="text-sm text-on-surface-variant">
                    All quests completed for today! Your constellation shines bright.
                  </p>
                </div>
              ) : (
                activeQuests.map((quest) => {
                  const attr = ATTR_CONFIG[quest.attribute];
                  return (
                    <div
                      key={quest.id}
                      className="group relative flex items-start gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 border border-white/[0.04]"
                    >
                      <button
                        type="button"
                        aria-label="Toggle quest"
                        onClick={(e) => toggleQuest(quest.id, e)}
                        className="mt-0.5 w-5 h-5 rounded flex items-center justify-center bg-surface-container-lowest border border-white/[0.1] hover:border-primary/50 transition-all hover:scale-105 cursor-pointer shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 text-primary opacity-0 group-hover:opacity-40 transition-opacity" />
                      </button>

                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="font-sans text-sm text-white font-medium transition-colors">
                            {quest.title}
                          </div>
                          <div className="flex items-center flex-wrap gap-2 text-xs">
                            <span
                              className="inline-flex items-center gap-1.5 font-mono text-[11px]"
                              style={{ color: attr.color }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: attr.color }}
                              />
                              {attr.label}
                            </span>
                            <span className="text-outline/40">·</span>
                            <span className="font-mono text-[11px] text-on-surface-variant">
                              {quest.intensity}
                            </span>
                            <span className="text-outline/40">·</span>
                            <span className="font-mono text-[11px] text-outline flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {quest.timeHint}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-container-lowest text-primary tracking-wide border border-white/[0.04]">
                            +{quest.xp} XP · +{quest.stardust} Stardust
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* SECTION: COMPLETED TODAY */}
            <div className="mt-4">
              <div className="flex items-center justify-between pb-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-outline">
                  COMPLETED TODAY
                </span>
                <span className="font-mono text-[10px] text-outline">
                  {completedQuests.length} / {totalQuests}
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {completedQuests.map((quest) => {
                  const attr = ATTR_CONFIG[quest.attribute];
                  return (
                    <div
                      key={quest.id}
                      className="group relative flex items-start gap-4 p-4 rounded-xl bg-surface-container-low/50 hover:bg-surface-container-low transition-all duration-200 border border-white/[0.02] opacity-75"
                    >
                      <button
                        type="button"
                        aria-label="Toggle quest"
                        onClick={(e) => toggleQuest(quest.id, e)}
                        className="mt-0.5 w-5 h-5 rounded flex items-center justify-center bg-primary text-[#002b36] transition-all hover:scale-105 cursor-pointer shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>

                      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-1">
                          <div className="font-sans text-sm text-on-surface-variant line-through decoration-outline/50">
                            {quest.title}
                          </div>
                          <div className="flex items-center flex-wrap gap-2 text-xs">
                            <span
                              className="inline-flex items-center gap-1.5 font-mono text-[11px]"
                              style={{ color: attr.color }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ backgroundColor: attr.color }}
                              />
                              {attr.label}
                            </span>
                            <span className="text-outline/40">·</span>
                            <span className="font-mono text-[11px] text-outline">
                              {quest.completedAt || "Completed today"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                          <span className="font-mono text-[11px] px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant tracking-wide opacity-80">
                            +{quest.xp} XP · +{quest.stardust} Stardust
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Telemetry, Progression & Constellation (4-cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Rank & Progress Card */}
            <div className="p-6 rounded-xl bg-surface-container-low/70 border border-white/[0.05] flex flex-col gap-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div className="space-y-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-outline">
                    Rank &amp; Progress
                  </span>
                  <div className="font-display text-xl text-white font-semibold tracking-tight">
                    Level {level}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-on-surface-variant font-medium">
                    {currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP
                  </span>
                  <div className="font-mono text-[10px] text-outline">
                    {diffXP > 0 ? `${diffXP} XP to Level ${level + 1}` : `Level ${level + 1} Threshold Met!`}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_#4dd8ff]"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4 border-t border-white/[0.04]">
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] text-outline uppercase">Streak</span>
                  <span className="font-sans text-sm font-semibold text-white flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-ember" /> {streakDays} days
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] text-outline uppercase">Stardust</span>
                  <span className="font-sans text-sm font-semibold text-white flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber" /> {currentStardust.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Constellation Link Card */}
            <Link
              href="/constellation"
              className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low/70 hover:bg-surface-container border border-white/[0.05] text-on-surface-variant hover:text-primary transition-all group shadow-sm"
            >
              <div className="flex items-center gap-2.5 font-mono text-xs text-outline group-hover:text-white transition-colors">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Cygnus Constellation (9 nodes)</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Add Quest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-[#101017] border border-white/[0.08] rounded-xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-lg text-white font-semibold">Create Daily Quest</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-on-surface-variant hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateQuest} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-outline uppercase">Quest Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 30-minute cardio sprint"
                  className="w-full bg-surface-container-lowest border border-white/[0.08] rounded-lg px-3.5 py-2 text-sm text-white placeholder:text-outline/50 focus:outline-none focus:border-primary/60"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-outline uppercase">
                  Governing Attribute
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["intellect", "strength", "discipline", "vitality"] as const).map((attrKey) => {
                    const attr = ATTR_CONFIG[attrKey];
                    const isSelected = newAttr === attrKey;
                    return (
                      <button
                        key={attrKey}
                        type="button"
                        onClick={() => setNewAttr(attrKey)}
                        className={`flex items-center gap-2 p-2.5 rounded-lg border text-xs text-left transition-colors ${
                          isSelected
                            ? "bg-surface-container border-primary/50 text-white"
                            : "bg-surface-container-lowest border-white/[0.05] text-on-surface-variant hover:text-white"
                        }`}
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: attr.color }}
                        />
                        <span>{attr.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-[11px] text-outline uppercase">
                  Reward Intensity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Low", "Medium", "High"] as const).map((level) => {
                    const isSelected = newIntensity === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setNewIntensity(level)}
                        className={`py-1.5 text-center rounded text-xs transition-colors ${
                          isSelected
                            ? "bg-primary text-[#002b36] font-semibold"
                            : "bg-surface-container-lowest border border-white/[0.05] text-on-surface-variant hover:text-white"
                        }`}
                      >
                        {level}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="w-1/2 py-2 rounded-lg bg-surface-container text-xs text-on-surface-variant hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2 rounded-lg bg-primary text-[#002b36] text-xs font-semibold hover:brightness-105"
                >
                  Create Quest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
