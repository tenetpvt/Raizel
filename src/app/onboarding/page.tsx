"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { OnboardingHeader } from "@/components/onboarding/OnboardingHeader";
import { WelcomeStep } from "@/components/onboarding/WelcomeStep";
import { ChooseAttributesStep } from "@/components/onboarding/ChooseAttributesStep";
import { AddFirstQuestStep } from "@/components/onboarding/AddFirstQuestStep";
import { motion, AnimatePresence } from "framer-motion";

function OnboardingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const stepParam = searchParams.get("step");
  const initialStep = stepParam === "2" ? 2 : stepParam === "3" ? 3 : 1;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(initialStep);
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([
    "intellect",
    "strength",
    "discipline",
    "vitality",
  ]);

  useEffect(() => {
    const s = searchParams.get("step");
    if (s === "1" || s === "2" || s === "3") {
      setCurrentStep(parseInt(s) as 1 | 2 | 3);
    }
  }, [searchParams]);

  const setStep = (step: 1 | 2 | 3) => {
    setCurrentStep(step);
    router.push(`/onboarding?step=${step}`, { scroll: false });
  };

  const toggleAttribute = (id: string) => {
    setSelectedAttributes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#08080C] text-[#f2f0f7] flex flex-col justify-between selection:bg-primary/20 selection:text-primary pt-16">
      {/* Header from Screen 3 across all 3 steps */}
      <OnboardingHeader currentStep={currentStep} onStepChange={setStep} />

      {/* Main Content with Animated Transitions */}
      <main className="w-full flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              <WelcomeStep onContinue={() => setStep(2)} />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              <ChooseAttributesStep
                selectedAttributes={selectedAttributes}
                onToggleAttribute={toggleAttribute}
                onContinue={() => setStep(3)}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1 flex flex-col"
            >
              <AddFirstQuestStep
                initialAttribute={selectedAttributes[0] || "intellect"}
                onComplete={() => router.push("/dashboard")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08080C] flex items-center justify-center text-primary font-mono text-xs">
          Aligning celestial engine...
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
