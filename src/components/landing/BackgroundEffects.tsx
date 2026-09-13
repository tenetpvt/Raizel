"use client";

import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export const BackgroundEffects: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollY } = useScroll();

  const yLayer1 = useTransform(scrollY, [0, 2000], [0, 300]);
  const yLayer2 = useTransform(scrollY, [0, 2000], [0, 600]);
  const auroraOpacity = useTransform(scrollY, [0, 1800], [0.25, 0.65]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 - Slow Parallax Stars */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: prefersReduced ? 0 : yLayer1 }}
      >
        <span className="absolute top-[14%] left-[12%] w-1.5 h-1.5 rounded-full bg-primary opacity-60 shadow-[0_0_8px_#4dd8ff]" />
        <span className="absolute top-[28%] right-[18%] w-1 h-1 rounded-full bg-violet opacity-50 shadow-[0_0_6px_#9d7bff]" />
        <span className="absolute top-[54%] left-[22%] w-1 h-1 rounded-full bg-white opacity-40" />
        <span className="absolute top-[72%] right-[28%] w-1.5 h-1.5 rounded-full bg-amber opacity-60 shadow-[0_0_8px_#f2b84b]" />
        <span className="absolute top-[86%] left-[48%] w-1 h-1 rounded-full bg-primary opacity-50" />
      </motion.div>

      {/* Layer 2 - Medium Parallax Stars */}
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: prefersReduced ? 0 : yLayer2 }}
      >
        <span className="absolute top-[20%] left-[42%] w-1 h-1 rounded-full bg-white opacity-30" />
        <span className="absolute top-[38%] left-[78%] w-1.5 h-1.5 rounded-full bg-emerald opacity-50 shadow-[0_0_8px_#34d399]" />
        <span className="absolute top-[62%] left-[10%] w-1 h-1 rounded-full bg-ember opacity-50 shadow-[0_0_6px_#ff6b4a]" />
        <span className="absolute top-[48%] right-[12%] w-1.5 h-1.5 rounded-full bg-primary opacity-40" />
        <span className="absolute top-[78%] left-[68%] w-1 h-1 rounded-full bg-white opacity-40" />
      </motion.div>

      {/* Ambient Horizon Aurora Glow */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[1100px] h-[650px] rounded-full blur-[140px] pointer-events-none bg-gradient-to-tr from-violet/20 via-primary/15 to-emerald/10 transition-opacity duration-700"
        style={{ opacity: prefersReduced ? 0.35 : auroraOpacity }}
      />
    </div>
  );
};
