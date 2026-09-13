"use client";

import React from "react";
import { Flame, Diamond, Shield } from "lucide-react";

export const StreaksSection: React.FC = () => {
  return (
    <section
      id="streaks-section"
      className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-10 py-20 flex flex-col gap-12"
    >
      <div className="max-w-2xl flex flex-col gap-3">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">
          Consistency ignites the aurora.
        </h2>
        <p className="text-base text-on-surface-variant leading-relaxed">
          Daily streaks generate Stardust. Keep your momentum unbroken, and the night sky around
          your constellation begins to glow.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Streak Card */}
        <div className="flex flex-col justify-between p-7 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-primary/30 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
              <Flame size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Unbroken Streak</h3>
              <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Consistent daily quest completions multiply the light emitted by your constellation.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-on-surface">
              42 <span className="text-base text-primary font-normal font-sans">Days</span>
            </span>
            <span className="font-mono text-xs text-primary bg-primary/10 px-2.5 py-1 rounded-full font-medium">
              Active Streak
            </span>
          </div>
        </div>

        {/* Stardust Treasury */}
        <div className="flex flex-col justify-between p-7 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-amber/30 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-amber">
              <Diamond size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Stardust Earned</h3>
              <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Earned strictly through completed quests and disciplined physical execution.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-on-surface">
              1,840 <span className="text-base text-amber font-normal font-sans">✦</span>
            </span>
            <span className="font-mono text-xs text-amber bg-amber/10 px-2.5 py-1 rounded-full font-medium">
              Stardust
            </span>
          </div>
        </div>

        {/* Focused Simplicity */}
        <div className="flex flex-col justify-between p-7 rounded-2xl bg-surface-container-low border border-outline-variant/30 hover:border-secondary/30 transition-all duration-300">
          <div className="flex flex-col gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg font-semibold text-on-surface">Private &amp; Ad-Free</h3>
              <p className="text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Zero social noise, zero vanity feeds. A calm sanctuary dedicated purely to your own ascent.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-outline-variant/30 flex items-baseline justify-between">
            <span className="font-display text-3xl font-bold text-on-surface">
              100% <span className="text-base text-secondary font-normal font-sans">Private</span>
            </span>
            <span className="font-mono text-xs text-secondary bg-secondary/10 px-2.5 py-1 rounded-full font-medium">
              Encrypted
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
