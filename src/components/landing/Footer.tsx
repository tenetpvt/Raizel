"use client";

import React from "react";
import Link from "next/link";
import { RaizelLogo } from "@/components/ui/RaizelLogo";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 flex items-center justify-center">
            <RaizelLogo className="w-5 h-5 object-contain" />
          </div>
          <span className="font-display text-base font-bold text-on-surface">Raizel</span>
          <span className="text-xs text-on-surface-variant ml-2 hidden sm:inline">
            Every action lights the dark.
          </span>
        </div>

        <div className="flex items-center gap-8 text-xs text-on-surface-variant">
          <a href="#quests-section" className="hover:text-on-surface transition-colors">
            Quests
          </a>
          <a href="#attributes-section" className="hover:text-on-surface transition-colors">
            Attributes
          </a>
          <Link href="#" className="hover:text-on-surface transition-colors">
            Privacy
          </Link>
          <Link href="#" className="hover:text-on-surface transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};
