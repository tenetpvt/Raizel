"use client";

import React from "react";
import Link from "next/link";
import { RaizelLogo } from "@/components/ui/RaizelLogo";
import { User } from "lucide-react";

interface OnboardingHeaderProps {
  currentStep: 1 | 2 | 3;
  onStepChange?: (step: 1 | 2 | 3) => void;
}

export function OnboardingHeader({ currentStep, onStepChange }: OnboardingHeaderProps) {
  const steps = [
    { num: 1, label: "01 Discovery", shortLabel: "Discovery" },
    { num: 2, label: "02 Alignment", shortLabel: "Alignment" },
    { num: 3, label: "03 Ignition", shortLabel: "03 Ignition" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#08080c]/85 backdrop-blur-md border-b border-white/[0.05]">
      <div className="max-w-6xl mx-auto h-16 px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 text-white tracking-tight group">
          <div className="w-7 h-7 rounded-lg bg-surface-container border border-white/[0.08] flex items-center justify-center transition-colors group-hover:border-white/20">
            <RaizelLogo className="w-4 h-4 object-contain text-primary" />
          </div>
          <span className="font-display font-semibold text-[17px] tracking-tight text-white">
            Raizel
          </span>
        </Link>

        {/* Minimal Steps Nav (from Screen 3) */}
        <nav
          aria-label="Onboarding Progress"
          className="hidden md:flex items-center gap-1.5 px-2 py-1 rounded-full bg-surface-container/60 border border-white/[0.05]"
        >
          {steps.map((step, idx) => {
            const isActive = currentStep === step.num;
            return (
              <React.Fragment key={step.num}>
                {idx > 0 && <span className="text-white/10 text-xs">·</span>}
                <button
                  type="button"
                  onClick={() => onStepChange?.(step.num as 1 | 2 | 3)}
                  className={`px-3 py-1 text-[12px] font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "text-white bg-white/[0.06] rounded-full border border-white/[0.08]"
                      : "text-on-surface-variant/70 hover:text-white"
                  }`}
                >
                  {isActive ? step.label : step.shortLabel}
                </button>
              </React.Fragment>
            );
          })}
        </nav>

        {/* Restrained Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-[13px] text-on-surface-variant hover:text-white transition-colors"
          >
            Save &amp; exit
          </Link>
          <div className="h-3.5 w-[1px] bg-white/[0.08]"></div>
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-surface-container border border-white/[0.08] hover:border-white/20 flex items-center justify-center transition-colors focus:outline-none"
            title="Account"
          >
            <User className="w-3.5 h-3.5 text-on-surface-variant" />
          </button>
        </div>
      </div>
    </header>
  );
}
