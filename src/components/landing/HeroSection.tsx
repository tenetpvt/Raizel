"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative z-10 w-full min-h-[88vh] flex flex-col items-center justify-center px-6 sm:px-10 py-16 sm:py-24 text-center">
      <div className="max-w-3xl flex flex-col items-center gap-7 my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold text-on-surface tracking-tight leading-[1.08]"
        >
          Every action you take{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet to-emerald">
            lights the dark
          </span>
          .
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg text-on-surface-variant max-w-xl leading-relaxed"
        >
          Turn real-world habits and focused effort into personal light. Complete quests. Level up
          your attributes. Watch your constellation awaken.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3.5 font-semibold text-base text-primary-on-container shadow-[0_0_32px_-4px_rgba(77,216,255,0.5)] hover:shadow-[0_0_42px_rgba(77,216,255,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            Start your ascent
          </Link>
          <a
            href="#constellation-section"
            className="inline-flex items-center gap-2 rounded-full bg-surface-container-high px-7 py-3.5 font-semibold text-base text-on-surface hover:bg-surface-bright hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-[18px] h-[18px] text-primary" />
            View constellation
          </a>
        </motion.div>
      </div>

      <motion.a
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        href="#quests-section"
        className="flex flex-col items-center gap-2 text-on-surface-variant hover:text-primary transition-colors mt-12 group"
      >
        <span className="font-mono text-[11px] tracking-widest uppercase">Scroll to explore</span>
        <div className="w-[1px] h-9 bg-gradient-to-b from-outline-variant via-primary/50 to-transparent relative overflow-hidden">
          <span className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-pulse" />
        </div>
      </motion.a>
    </section>
  );
};
