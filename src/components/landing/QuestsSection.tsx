"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Quest {
  id: number;
  attribute: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  hoverBorder: string;
  checkActiveBg: string;
  checkActiveBorder: string;
  title: string;
  xp: string;
  xpColor: string;
  stardust: string;
}

const QUESTS: Quest[] = [
  {
    id: 1,
    attribute: "Intellect",
    badgeBg: "bg-primary/10",
    badgeText: "text-primary",
    borderColor: "border-primary/60",
    hoverBorder: "hover:border-primary/20",
    checkActiveBg: "bg-primary",
    checkActiveBorder: "border-primary",
    title: "Complete deep-work sprint on architectural review",
    xp: "+45 XP",
    xpColor: "text-primary-fixed",
    stardust: "+12 Stardust",
  },
  {
    id: 2,
    attribute: "Discipline",
    badgeBg: "bg-violet/15",
    badgeText: "text-violet",
    borderColor: "border-violet/60",
    hoverBorder: "hover:border-violet/20",
    checkActiveBg: "bg-violet",
    checkActiveBorder: "border-violet",
    title: "Morning fasting & 5 AM deliberate reading",
    xp: "+30 XP",
    xpColor: "text-secondary",
    stardust: "+8 Stardust",
  },
  {
    id: 3,
    attribute: "Vitality",
    badgeBg: "bg-emerald/15",
    badgeText: "text-emerald",
    borderColor: "border-emerald/60",
    hoverBorder: "hover:border-emerald/20",
    checkActiveBg: "bg-emerald",
    checkActiveBorder: "border-emerald",
    title: "Zone 2 endurance run: 45 minutes continuous",
    xp: "+60 XP",
    xpColor: "text-emerald",
    stardust: "+15 Stardust",
  },
  {
    id: 4,
    attribute: "Strength",
    badgeBg: "bg-ember/15",
    badgeText: "text-ember",
    borderColor: "border-ember/60",
    hoverBorder: "hover:border-ember/20",
    checkActiveBg: "bg-ember",
    checkActiveBorder: "border-ember",
    title: "Heavy compound lift progression",
    xp: "+50 XP",
    xpColor: "text-ember",
    stardust: "+14 Stardust",
  },
];

export const QuestsSection: React.FC = () => {
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const toggleQuest = (id: number) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const completedCount = completed.size;
  const harmonyPercent = (completedCount / 4) * 100;

  const skyStatus =
    harmonyPercent === 100
      ? "Full Constellation Ignited"
      : harmonyPercent > 0
      ? "Aligning Stars"
      : "Awaiting Light";

  return (
    <section
      id="quests-section"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-12"
    >
      <div className="max-w-2xl flex flex-col gap-3">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Real effort. Measured in light.
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Your daily focus, physical training, and quiet discipline aren&apos;t just checkboxes. Every
          completed quest adds a star to your personal sky.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Quest List Column */}
        <div className="lg:col-span-7 flex flex-col gap-3.5">
          {QUESTS.map((quest) => {
            const isCompleted = completed.has(quest.id);
            return (
              <div
                key={quest.id}
                onClick={() => toggleQuest(quest.id)}
                className={cn(
                  "group relative flex items-center justify-between p-4 sm:p-5 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 border cursor-pointer select-none",
                  isCompleted
                    ? cn("bg-surface-container", quest.borderColor)
                    : cn("border-transparent", quest.hoverBorder)
                )}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={cn(
                      "w-5 h-5 rounded-[4px] border flex items-center justify-center transition-all",
                      isCompleted
                        ? cn(quest.checkActiveBg, quest.checkActiveBorder)
                        : "border-outline-variant bg-surface-container-lowest group-hover:border-primary/60"
                    )}
                  >
                    <Check
                      className={cn(
                        "w-3.5 h-3.5 text-black stroke-[3] transition-opacity",
                        isCompleted ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded-full text-[11px] font-medium",
                          quest.badgeBg,
                          quest.badgeText
                        )}
                      >
                        {quest.attribute}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-medium text-on-surface truncate">
                      {quest.title}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 pl-3">
                  <span
                    className={cn(
                      "font-mono text-xs px-2 py-1 rounded bg-surface-container-highest",
                      quest.xpColor
                    )}
                  >
                    {quest.xp}
                  </span>
                  <span className="font-mono text-xs px-2 py-1 rounded bg-surface-container-highest text-amber">
                    {quest.stardust}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="flex items-center justify-between px-2 pt-1 text-on-surface-variant">
            <span className="text-xs">Complete quests to illuminate stars</span>
            <span className="font-mono text-xs text-primary font-medium">
              {completedCount} of 4 Completed
            </span>
          </div>
        </div>

        {/* Constellation Preview Column */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="relative w-full aspect-square rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span>Personal Constellation</span>
              <span
                className={cn(
                  "transition-colors",
                  harmonyPercent === 100 ? "text-secondary font-semibold" : "text-primary"
                )}
              >
                {skyStatus}
              </span>
            </div>

            {/* SVG Interactive Constellation Preview */}
            <div className="w-full h-full flex items-center justify-center py-2">
              <svg className="w-full h-full max-w-[270px] max-h-[270px]" viewBox="0 0 300 300">
                {/* Background Orbit Guide Rings */}
                <circle
                  cx="150"
                  cy="150"
                  r="115"
                  fill="none"
                  stroke="#2a2d38"
                  strokeDasharray="3 5"
                  strokeWidth="1"
                  opacity="0.6"
                />
                <circle
                  cx="150"
                  cy="150"
                  r="65"
                  fill="none"
                  stroke="#2a2d38"
                  strokeDasharray="2 4"
                  strokeWidth="1"
                  opacity="0.4"
                />

                {/* Connecting Constellation Filaments */}
                {/* Line 1: Intellect (150, 55) -> Discipline (235, 145) */}
                <line
                  className="constellation-line"
                  stroke="#4dd8ff"
                  strokeDasharray="160"
                  strokeDashoffset={completed.has(1) && completed.has(2) ? "0" : "160"}
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                  x1="150"
                  y1="55"
                  x2="235"
                  y2="145"
                />
                {/* Line 2: Discipline (235, 145) -> Vitality (185, 245) */}
                <line
                  className="constellation-line"
                  stroke="#9d7bff"
                  strokeDasharray="160"
                  strokeDashoffset={completed.has(2) && completed.has(3) ? "0" : "160"}
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                  x1="235"
                  y1="145"
                  x2="185"
                  y2="245"
                />
                {/* Line 3: Vitality (185, 245) -> Strength (65, 185) */}
                <line
                  className="constellation-line"
                  stroke="#34d399"
                  strokeDasharray="160"
                  strokeDashoffset={completed.has(3) && completed.has(4) ? "0" : "160"}
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                  x1="185"
                  y1="245"
                  x2="65"
                  y2="185"
                />
                {/* Line 4: Strength (65, 185) -> Intellect (150, 55) */}
                <line
                  className="constellation-line"
                  stroke="#ff6b4a"
                  strokeDasharray="160"
                  strokeDashoffset={completed.has(4) && completed.has(1) ? "0" : "160"}
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                  x1="65"
                  y1="185"
                  x2="150"
                  y2="55"
                />

                {/* Node 1: Intellect */}
                <g
                  className={cn(
                    "transition-all duration-500",
                    completed.has(1) ? "opacity-100" : "opacity-40"
                  )}
                >
                  <circle
                    className={completed.has(1) ? "animate-pulse" : ""}
                    cx="150"
                    cy="55"
                    fill="#4dd8ff"
                    fillOpacity="0.25"
                    r="12"
                  />
                  <circle cx="150" cy="55" fill="#4dd8ff" r="4.5" />
                  <text
                    fill="#4dd8ff"
                    fontFamily="inherit"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    x="150"
                    y="36"
                  >
                    Intellect
                  </text>
                </g>

                {/* Node 2: Discipline */}
                <g
                  className={cn(
                    "transition-all duration-500",
                    completed.has(2) ? "opacity-100" : "opacity-40"
                  )}
                >
                  <circle
                    className={completed.has(2) ? "animate-pulse" : ""}
                    cx="235"
                    cy="145"
                    fill="#9d7bff"
                    fillOpacity="0.25"
                    r="13"
                  />
                  <circle cx="235" cy="145" fill="#9d7bff" r="5.5" />
                  <text
                    fill="#9d7bff"
                    fontFamily="inherit"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    x="235"
                    y="172"
                  >
                    Discipline
                  </text>
                </g>

                {/* Node 3: Vitality */}
                <g
                  className={cn(
                    "transition-all duration-500",
                    completed.has(3) ? "opacity-100" : "opacity-40"
                  )}
                >
                  <circle
                    className={completed.has(3) ? "animate-pulse" : ""}
                    cx="185"
                    cy="245"
                    fill="#34d399"
                    fillOpacity="0.25"
                    r="12"
                  />
                  <circle cx="185" cy="245" fill="#34d399" r="4.5" />
                  <text
                    fill="#34d399"
                    fontFamily="inherit"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    x="185"
                    y="268"
                  >
                    Vitality
                  </text>
                </g>

                {/* Node 4: Strength */}
                <g
                  className={cn(
                    "transition-all duration-500",
                    completed.has(4) ? "opacity-100" : "opacity-40"
                  )}
                >
                  <circle
                    className={completed.has(4) ? "animate-pulse" : ""}
                    cx="65"
                    cy="185"
                    fill="#ff6b4a"
                    fillOpacity="0.25"
                    r="11"
                  />
                  <circle cx="65" cy="185" fill="#ff6b4a" r="4" />
                  <text
                    fill="#ff6b4a"
                    fontFamily="inherit"
                    fontSize="10"
                    fontWeight="500"
                    textAnchor="middle"
                    x="65"
                    y="206"
                  >
                    Strength
                  </text>
                </g>
              </svg>
            </div>

            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span>Constellation Harmony</span>
              <span className="text-on-surface font-semibold tnum">{harmonyPercent}%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
