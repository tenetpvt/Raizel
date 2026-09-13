"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface AttributeData {
  name: string;
  dotColor: string;
  dotShadow: string;
  textColor: string;
  hoverBorder: string;
  description: string;
  level: number;
  currentXp: number;
  maxXp: number;
  progressPercent: number;
  barColor: string;
  barShadow: string;
}

const ATTRIBUTES: AttributeData[] = [
  {
    name: "Intellect",
    dotColor: "bg-primary",
    dotShadow: "shadow-[0_0_10px_#4dd8ff]",
    textColor: "text-primary",
    hoverBorder: "hover:border-primary/40",
    description: "Deep work sprints, structured learning, and complex problem resolution.",
    level: 18,
    currentXp: 4820,
    maxXp: 5000,
    progressPercent: 92,
    barColor: "bg-primary",
    barShadow: "shadow-[0_0_8px_#4dd8ff]",
  },
  {
    name: "Strength",
    dotColor: "bg-ember",
    dotShadow: "shadow-[0_0_10px_#ff6b4a]",
    textColor: "text-ember",
    hoverBorder: "hover:border-ember/40",
    description: "Resistance progression, compound loading, and physical resilience.",
    level: 14,
    currentXp: 3120,
    maxXp: 4000,
    progressPercent: 78,
    barColor: "bg-ember",
    barShadow: "shadow-[0_0_8px_#ff6b4a]",
  },
  {
    name: "Discipline",
    dotColor: "bg-violet",
    dotShadow: "shadow-[0_0_10px_#9d7bff]",
    textColor: "text-violet",
    hoverBorder: "hover:border-violet/40",
    description: "Unbroken morning routines, fasting windows, and conscious habit design.",
    level: 22,
    currentXp: 6400,
    maxXp: 6500,
    progressPercent: 98,
    barColor: "bg-violet",
    barShadow: "shadow-[0_0_8px_#9d7bff]",
  },
  {
    name: "Vitality",
    dotColor: "bg-emerald",
    dotShadow: "shadow-[0_0_10px_#34d399]",
    textColor: "text-emerald",
    hoverBorder: "hover:border-emerald/40",
    description: "Zone 2 endurance, restorative sleep, and nutritional mindfulness.",
    level: 16,
    currentXp: 3980,
    maxXp: 4500,
    progressPercent: 88,
    barColor: "bg-emerald",
    barShadow: "shadow-[0_0_8px_#34d399]",
  },
];

export const AttributesSection: React.FC = () => {
  return (
    <section
      id="attributes-section"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-14"
    >
      <div className="max-w-2xl flex flex-col gap-3">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Four attributes. One personal constellation.
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Intellect, Strength, Discipline, Vitality. As you level each attribute, your constellation
          expands into an intricate map of your growth.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ATTRIBUTES.map((attr) => (
          <div
            key={attr.name}
            className={cn(
              "flex flex-col justify-between p-6 rounded-2xl bg-surface-container-low border border-outline-variant/30 transition-all duration-300",
              attr.hoverBorder
            )}
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className={cn("font-mono text-xs font-medium", attr.textColor)}>
                  Attribute
                </span>
                <span className={cn("w-2.5 h-2.5 rounded-full", attr.dotColor, attr.dotShadow)} />
              </div>
              <div>
                <h3 className="font-display text-xl text-on-surface font-semibold">{attr.name}</h3>
                <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                  {attr.description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-8 pt-4 border-t border-outline-variant/30">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-on-surface font-semibold">Level {attr.level}</span>
                <span className="text-on-surface-variant tnum">
                  {attr.currentXp.toLocaleString()} / {attr.maxXp.toLocaleString()} XP
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className={cn("h-full rounded-full transition-all duration-700", attr.barColor, attr.barShadow)}
                  style={{ width: `${attr.progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
