"use client";

import React from "react";
import Link from "next/link";
import { RaizelLogo } from "@/components/ui/RaizelLogo";

export const FinalCtaSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-10 py-24 my-8 flex flex-col items-center text-center">
      {/* Starburst Brand Mark */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute w-36 h-36 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
        <div className="relative w-20 h-20 rounded-2xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-center p-3.5 shadow-xl">
          <RaizelLogo className="w-12 h-12 object-contain" />
        </div>
      </div>

      <h2 className="font-display text-3xl sm:text-5xl font-bold text-on-surface tracking-tight max-w-2xl leading-[1.12]">
        Your universe is waiting to be built.
      </h2>
      <p className="text-base sm:text-lg text-on-surface-variant max-w-lg mt-4 mb-8 leading-relaxed">
        Begin with a single quest and watch the night sky illuminate.
      </p>

      <Link
        href="/auth?mode=signup"
        className="inline-flex items-center justify-center rounded-full bg-primary px-9 py-4 font-semibold text-base text-primary-on-container shadow-[0_0_36px_rgba(77,216,255,0.45)] hover:shadow-[0_0_48px_rgba(77,216,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
      >
        Start your ascent
      </Link>
    </section>
  );
};
