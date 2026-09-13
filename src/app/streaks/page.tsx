"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AppLayout } from "@/components/app/AppLayout";
import {
  Flame,
  Shield,
  History,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";

type ActivityFilter = "all" | "intellect" | "strength" | "discipline" | "vitality";

interface DayCellData {
  id: string;
  date: string;
  attr: "none" | "intellect" | "strength" | "discipline" | "vitality" | "all";
  quests: number;
  level: number; // 0: void, 1: low, 2: med, 3: high, 4: peak
  isShielded?: boolean;
  isToday?: boolean;
  isShowcase?: boolean;
  streakIdx?: number;
}

// Generate sample cells covering 6 months (26 weeks x 7 days)
function generateSampleDays(): DayCellData[] {
  const days: DayCellData[] = [];
  const attrs: Array<"intellect" | "strength" | "discipline" | "vitality"> = [
    "intellect",
    "strength",
    "discipline",
    "vitality",
  ];

  for (let i = 0; i < 182; i++) {
    // Current 18-day streak spans roughly the last 18 active days
    const isRecentStreak = i >= 155 && i <= 172;
    const isToday = i === 173;
    const isShowcase = i === 172; // Sep 12
    const isShielded = i === 120; // Aug 09

    if (isToday) {
      days.push({
        id: `day-${i}`,
        date: "Today",
        attr: "discipline",
        quests: 2,
        level: 3,
        isToday: true,
      });
    } else if (isShowcase) {
      days.push({
        id: `day-${i}`,
        date: "Sep 12",
        attr: "intellect",
        quests: 4,
        level: 4,
        isShowcase: true,
        streakIdx: 18,
      });
    } else if (isShielded) {
      days.push({
        id: `day-${i}`,
        date: "Aug 09",
        attr: "all",
        quests: 0,
        level: 0,
        isShielded: true,
      });
    } else if (isRecentStreak) {
      const attr = attrs[i % 4];
      days.push({
        id: `day-${i}`,
        date: `Day ${i - 154}`,
        attr,
        quests: (i % 3) + 2,
        level: (i % 3) + 2,
        streakIdx: i - 154,
      });
    } else if (i > 173) {
      // Future days
      days.push({
        id: `day-${i}`,
        date: "Upcoming",
        attr: "none",
        quests: 0,
        level: 0,
      });
    } else {
      // Past sporadic days
      const hasActivity = (i * 7 + 3) % 5 > 1;
      const attr = attrs[(i * 3) % 4];
      const quests = hasActivity ? ((i % 4) + 1) : 0;
      days.push({
        id: `day-${i}`,
        date: `Day ${i}`,
        attr: hasActivity ? attr : "none",
        quests,
        level: hasActivity ? Math.min(4, quests) : 0,
      });
    }
  }

  return days;
}

export default function StreaksPage() {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");
  const [hoveredCell, setHoveredCell] = useState<DayCellData | null>(null);
  const [shieldCount, setShieldCount] = useState(2);
  const [streakDays, setStreakDays] = useState(18);
  const [longestStreak, setLongestStreak] = useState(27);
  const [isGuest, setIsGuest] = useState(true);

  const days = React.useMemo(() => generateSampleDays(), []);

  // Supabase session check for real user
  useEffect(() => {
    async function loadUser() {
      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          setIsGuest(false);
          const { data: profile } = await supabase
            .from("profiles")
            .select("streak_count")
            .eq("id", session.user.id)
            .single();

          if (profile && profile.streak_count > 0) {
            setStreakDays(profile.streak_count);
            setLongestStreak(Math.max(profile.streak_count, longestStreak));
          }
        }
      } catch (e) {
        console.warn("Guest mode fallback for streaks:", e);
      }
    }
    loadUser();
  }, [longestStreak]);


  return (
    <AppLayout breadcrumb="Cadence of Light">
      <div className="flex flex-col w-full text-on-surface select-none pb-24 max-w-6xl mx-auto">
        {/* 1. STREAK HERO SECTION */}
        <section className="relative pt-4 pb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/[0.04]">
          {/* Subtle Ambient Aurora Radiance */}
          <div className="absolute -top-16 -left-20 w-[38rem] h-[22rem] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
          <div className="absolute top-8 right-16 w-80 h-64 bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10" />

          {/* Left Column: Metric & Subtitle */}
          <div className="relative z-10 flex flex-col max-w-2xl">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#4ad6fd]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-on-surface-variant font-medium">
                Cadence of Light
              </span>
              {isGuest && (
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.06] text-outline ml-1">
                  Demo Showcase
                </span>
              )}
            </div>

            <div className="flex items-baseline gap-4 tracking-tighter">
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tight">
                {streakDays}
                <span className="text-primary font-display text-3xl sm:text-4xl font-normal ml-3 tracking-normal">
                  day streak
                </span>
              </h1>
            </div>

            <p className="font-sans text-base sm:text-lg text-on-surface-variant mt-4 leading-relaxed font-light max-w-xl">
              Every day you show up makes the universe a little brighter. Consistency leaves visible traces of light across your journey.
            </p>

            <div className="flex items-center flex-wrap gap-4 mt-6 text-xs font-mono text-on-surface-variant">
              <span className="flex items-center gap-1.5 text-white">
                <History className="w-3.5 h-3.5 text-primary" />
                Longest streak · {longestStreak} days
              </span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-on-surface-variant">Achieved Oct 14</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-primary/90 font-medium">Top 4% of observers</span>
            </div>
          </div>

          {/* Right Column: Recent 10 Days Dots & World Brightness */}
          <div className="relative z-10 flex flex-col items-start lg:items-end gap-5">
            {/* Recent 10 Days Stream */}
            <div className="flex flex-col gap-2 items-start lg:items-end">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Recent 10 days
                </span>
                <span className="font-mono text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded-full font-medium">
                  All active
                </span>
              </div>
              <div className="flex items-center gap-2 py-1">
                {[0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9].map((op, i) => (
                  <span
                    key={i}
                    className="w-2.5 h-2.5 rounded-full bg-primary"
                    style={{ opacity: op }}
                  />
                ))}
                <span className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(74,214,253,0.8)]" />
                <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_12px_#ffffff] ring-2 ring-primary/40" />
              </div>
            </div>

            {/* World Brightness */}
            <div className="w-full sm:w-64 flex flex-col gap-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-on-surface-variant flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  World Brightness
                </span>
                <span className="text-white font-medium">66%</span>
              </div>
              <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-secondary/60 to-primary rounded-full w-[66%]" />
              </div>
            </div>

            {/* Shield Token Status */}
            <div className="flex items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
                <Shield className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-white font-medium">{shieldCount} Shields ready</span>
              </div>
              <button
                type="button"
                className="text-on-surface-variant hover:text-white font-mono text-xs transition-colors underline underline-offset-4 decoration-white/20 cursor-pointer"
              >
                Manage
              </button>
            </div>
          </div>
        </section>

        {/* 2. LUCENT ACTIVITY MAP (Calendar Grid) */}
        <section className="py-14 flex flex-col">
          {/* Calendar Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                Lucent Activity Map
              </h2>
              <div className="flex items-center gap-1 text-on-surface-variant text-xs font-mono">
                <span>2026</span>
                <div className="flex items-center ml-2 border border-white/[0.06] rounded-md overflow-hidden">
                  <button
                    type="button"
                    aria-label="Previous month"
                    className="px-1.5 py-0.5 hover:bg-white/[0.05] text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-2 py-0.5 text-[11px] text-white">Current</span>
                  <button
                    type="button"
                    aria-label="Next month"
                    className="px-1.5 py-0.5 hover:bg-white/[0.05] text-on-surface-variant hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Attribute Filter Pills */}
            <div className="flex items-center gap-1 shrink-0">
              {(["all", "intellect", "strength", "discipline", "vitality"] as ActivityFilter[]).map(
                (filter) => {
                  const isActive = activeFilter === filter;
                  return (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`px-2.5 py-1 rounded-full text-xs font-mono capitalize transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? "text-white bg-white/[0.08] border border-white/10 font-medium"
                          : "text-on-surface-variant hover:text-white hover:bg-white/[0.03] border border-transparent"
                      }`}
                    >
                      {filter === "all" ? "All Activity" : filter}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Matrix Canvas Container */}
          <div className="w-full overflow-x-auto py-2 bg-surface-container-lowest border border-white/[0.04] p-5 rounded-2xl">
            <div className="min-w-[840px] flex flex-col gap-3">
              {/* Months Timeline Header */}
              <div className="grid grid-cols-6 text-[11px] font-mono text-on-surface-variant/70 pl-10 pr-2 select-none">
                <span>JUL</span>
                <span>AUG</span>
                <span className="text-primary font-medium">SEP (CURRENT)</span>
                <span>OCT</span>
                <span>NOV</span>
                <span>DEC</span>
              </div>

              {/* Grid with Weekday Labels */}
              <div className="flex gap-3 items-center">
                {/* Weekday labels (Mon, Tue, Wed, Thu, Fri, Sat, Sun) aligned 1-to-1 with rows */}
                <div className="grid grid-rows-7 gap-2 text-[10px] font-mono text-on-surface-variant/60 select-none pr-1">
                  <span className="h-3.5 flex items-center leading-none">Mon</span>
                  <span className="h-3.5 flex items-center leading-none">Tue</span>
                  <span className="h-3.5 flex items-center leading-none">Wed</span>
                  <span className="h-3.5 flex items-center leading-none">Thu</span>
                  <span className="h-3.5 flex items-center leading-none">Fri</span>
                  <span className="h-3.5 flex items-center leading-none">Sat</span>
                  <span className="h-3.5 flex items-center leading-none">Sun</span>
                </div>

                {/* Day Cells Matrix */}
                <div className="grid grid-flow-col grid-rows-7 gap-2 flex-1 relative">
                  {days.map((cell) => {
                    const isFilteredOut =
                      activeFilter !== "all" &&
                      cell.attr !== activeFilter &&
                      cell.quests > 0;

                    let bgClass = "bg-white/[0.03]";
                    let style: React.CSSProperties = {};
                    let zIndexClass = "";

                    if (cell.isToday) {
                      bgClass = "bg-[#4ad6fd] ring-1 ring-white";
                      zIndexClass = "z-10";
                      if (!isFilteredOut) {
                        style.boxShadow = "0 0 6px rgba(74, 214, 253, 0.6)";
                      }
                    } else if (cell.isShowcase) {
                      bgClass = "bg-[#4ad6fd] ring-1 ring-cyan-200";
                      zIndexClass = "z-10";
                      if (!isFilteredOut) {
                        style.boxShadow = "0 0 8px 1px #4ad6fd";
                      }
                    } else if (cell.isShielded) {
                      bgClass = "bg-[#f6ad55]/15 ring-1 ring-[#f6ad55]/70";
                    } else if (cell.quests > 0) {
                      // Consistent celestial blue palette - clean and crisp without cloudy blur
                      const level = Math.min(4, Math.max(1, cell.level || 1));
                      if (level === 1) {
                        style.backgroundColor = "rgba(74, 214, 253, 0.22)";
                      } else if (level === 2) {
                        style.backgroundColor = "rgba(74, 214, 253, 0.45)";
                      } else if (level === 3) {
                        style.backgroundColor = "rgba(74, 214, 253, 0.72)";
                      } else {
                        // Level 4 (peak completion): solid radiant blue with a tight, focused glow
                        style.backgroundColor = "#4ad6fd";
                        if (!isFilteredOut) {
                          style.boxShadow = "0 0 6px rgba(74, 214, 253, 0.5)";
                        }
                      }
                    }

                    if (isFilteredOut) {
                      style.opacity = 0.08;
                      style.boxShadow = "none";
                    }

                    return (
                      <div
                        key={cell.id}
                        onMouseEnter={() => setHoveredCell(cell)}
                        onMouseLeave={() => setHoveredCell(null)}
                        className={`w-3.5 h-3.5 rounded-sm transition-all duration-150 cursor-pointer ${bgClass} ${zIndexClass} ${
                          isFilteredOut
                            ? "opacity-10 pointer-events-none"
                            : "hover:scale-125 hover:z-20 hover:brightness-125"
                        }`}
                        style={style}
                      />
                    );
                  })}

                  {/* Showcase / Hover Tooltip */}
                  {hoveredCell && (
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 p-3 bg-[#14161f]/95 backdrop-blur-md rounded-xl border border-white/[0.08] shadow-[0_16px_32px_rgba(0,0,0,0.6)] pointer-events-none z-30 transition-all text-xs min-w-[200px]">
                      <div className="flex items-center justify-between border-b border-white/[0.05] pb-1.5 mb-1.5">
                        <span className="font-display font-semibold text-white">
                          {hoveredCell.date}
                        </span>
                        {hoveredCell.streakIdx ? (
                          <span className="font-mono text-[10px] text-primary px-2 py-0.5 rounded-full bg-primary/10">
                            Streak day {hoveredCell.streakIdx}
                          </span>
                        ) : null}
                      </div>
                      <div className="text-on-surface-variant font-sans text-xs">
                        {hoveredCell.isShielded ? (
                          <span className="text-[#f6ad55]">Streak protected by Shield Token</span>
                        ) : hoveredCell.quests > 0 ? (
                          <span>
                            <strong className="text-white">{hoveredCell.quests} quests completed</strong> ·{" "}
                            <span className="text-primary font-mono">{hoveredCell.attr.toUpperCase()}</span>
                          </span>
                        ) : (
                          <span>Quiet restful void</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Minimal Legend */}
              <div className="flex items-center justify-between pt-5 text-[11px] font-mono text-on-surface-variant/70 border-t border-white/[0.03]">
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-white/[0.03]" />
                    Void
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-primary/40" />
                    Soft glow
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-primary shadow-[0_0_6px_#4ad6fd]" />
                    Radiant light
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm bg-[#f6ad55]/20 ring-1 ring-[#f6ad55]/70" />
                    Shielded
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>Faint</span>
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-xs bg-white/[0.04]" />
                    <span className="w-2.5 h-2.5 rounded-xs bg-primary/25" />
                    <span className="w-2.5 h-2.5 rounded-xs bg-primary/50" />
                    <span className="w-2.5 h-2.5 rounded-xs bg-primary/75" />
                    <span className="w-2.5 h-2.5 rounded-xs bg-primary shadow-[0_0_6px_#4ad6fd]" />
                  </div>
                  <span>Lucent</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CONSISTENCY INSIGHTS: "YOUR RHYTHM" */}
        <section className="py-14 border-t border-white/[0.04] flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-2">
            <div>
              <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                Your rhythm
              </h2>
              <p className="font-sans text-sm text-on-surface-variant/80 mt-1">
                Reflections drawn across 180 continuous days
              </p>
            </div>
            <span className="font-mono text-xs text-on-surface-variant">Natural equilibrium</span>
          </div>

          {/* 4 De-Boxed Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Metric 1 */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Best Day
                </span>
                <div className="font-display text-2xl font-medium text-white mt-1.5">Tuesday</div>
                <div className="text-xs text-on-surface-variant mt-1 font-sans">
                  94% completion · 4.2 quests average
                </div>
              </div>
              <div className="w-full h-0.5 bg-white/[0.04] mt-5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[94%]" />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Peak Time
                </span>
                <div className="font-display text-2xl font-medium text-white mt-1.5">Morning</div>
                <div className="text-xs text-on-surface-variant mt-1 font-sans">
                  08:30 GMT · calm morning focus
                </div>
              </div>
              <div className="w-full h-0.5 bg-white/[0.04] mt-5 rounded-full overflow-hidden">
                <div className="bg-secondary h-full w-[82%]" />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Current Streak
                </span>
                <div className="font-display text-2xl font-medium text-white mt-1.5">
                  {streakDays} days
                </div>
                <div className="text-xs text-on-surface-variant mt-1 font-sans">
                  +9 days until next constellation tier
                </div>
              </div>
              <div className="w-full h-0.5 bg-white/[0.04] mt-5 rounded-full overflow-hidden">
                <div className="bg-ember h-full w-[66%]" />
              </div>
            </div>

            {/* Metric 4 */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                  Active Cycles
                </span>
                <div className="font-display text-2xl font-medium text-white mt-1.5">142 days</div>
                <div className="text-xs text-on-surface-variant mt-1 font-sans">
                  78.8% year ratio · steady presence
                </div>
              </div>
              <div className="w-full h-0.5 bg-white/[0.04] mt-5 rounded-full overflow-hidden">
                <div className="bg-primary h-full w-[78%]" />
              </div>
            </div>
          </div>

          {/* Weekly Equilibrium Reflection & Distribution Bar Chart */}
          <div className="pt-4 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div className="max-w-md">
              <span className="font-mono text-[11px] uppercase tracking-wider text-on-surface-variant">
                Weekly Cadence
              </span>
              <h3 className="font-display text-lg font-medium text-white mt-1">Flow gathers mid-week</h3>
              <p className="font-sans text-sm text-on-surface-variant/80 mt-2 leading-relaxed">
                Elevated clarity emerges on Tuesdays and Thursdays, tapering naturally into quiet regenerative pauses on Sundays.
              </p>
            </div>

            {/* Weekly Bars */}
            <div className="w-full max-w-sm">
              <div className="flex items-end justify-between h-20 gap-3">
                {[
                  { day: "M", h: "68%", peak: false },
                  { day: "T", h: "94%", peak: true },
                  { day: "W", h: "75%", peak: false },
                  { day: "T", h: "88%", peak: false },
                  { day: "F", h: "80%", peak: false },
                  { day: "S", h: "52%", peak: false },
                  { day: "S", h: "40%", peak: false, rest: true },
                ].map((item, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                    <div
                      className={`w-full rounded-t-sm transition-colors ${
                        item.peak
                          ? "bg-primary shadow-[0_0_10px_rgba(74,214,253,0.3)]"
                          : item.rest
                          ? "bg-white/[0.05] group-hover:bg-secondary/40"
                          : "bg-white/[0.05] group-hover:bg-primary/40"
                      }`}
                      style={{ height: item.h }}
                    />
                    <span
                      className={`font-mono text-[10px] ${
                        item.peak
                          ? "text-primary font-semibold"
                          : item.rest
                          ? "text-secondary/70"
                          : "text-on-surface-variant"
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. REFINED STREAK PROTECTION */}
        <section className="py-12 border-t border-white/[0.04] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-1.5">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-display text-base font-medium text-white">Streak Protection</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-primary ml-1 font-medium">
                {shieldCount} Armed
              </span>
            </div>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed">
              Protects one missed day without breaking your streak. Seamlessly absorbed if life takes you away from your practice.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setShieldCount((c) => Math.max(0, c - 1))}
              className="px-4 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-white text-xs font-mono transition-all border border-white/[0.06] hover:border-white/10 cursor-pointer"
            >
              Use Shield Reserve
            </button>
            <button
              type="button"
              onClick={() => setShieldCount((c) => c + 1)}
              className="px-4 py-2 rounded-lg bg-transparent hover:bg-white/[0.02] text-on-surface-variant hover:text-primary text-xs font-mono transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Acquire for 250 Stardust</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </button>
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
