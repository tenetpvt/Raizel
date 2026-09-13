"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RaizelLogo } from "@/components/ui/RaizelLogo";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Quests", href: "#quests-section" },
    { label: "Attributes", href: "#attributes-section" },
    { label: "Streaks", href: "#streaks-section" },
    { label: "Constellation", href: "#constellation-section" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-outline-variant/40 transition-colors">
      <div className="h-16 max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-6 h-6 flex items-center justify-center shrink-0">
              <RaizelLogo className="w-6 h-6 object-contain" />
            </span>
            <span className="font-display text-[20px] font-bold tracking-tight text-on-surface">
              Raizel
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden sm:flex items-center gap-5">
          <Link
            href="/auth?mode=signin"
            className="text-sm text-on-surface-variant hover:text-on-surface transition-colors px-2 py-1"
          >
            Sign In
          </Link>
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-on-container shadow-cyan-glow hover:shadow-cyan-glow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            Start your ascent
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/auth?mode=signup"
            className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-on-container shadow-cyan-glow"
          >
            Ascent
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-on-surface-variant hover:text-on-surface rounded-lg border border-outline-variant/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-outline-variant/40 bg-[#0a0a0f]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-on-surface-variant hover:text-on-surface py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-outline-variant/40 flex flex-col gap-3">
            <Link
              href="/auth?mode=signin"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-on-surface-variant hover:text-on-surface py-1"
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=signup"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center rounded-full bg-primary py-2.5 text-sm font-semibold text-primary-on-container shadow-cyan-glow text-center"
            >
              Start your ascent
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
