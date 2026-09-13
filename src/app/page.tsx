import { Navbar } from "@/components/layout/Navbar";
import { BackgroundEffects } from "@/components/landing/BackgroundEffects";
import { HeroSection } from "@/components/landing/HeroSection";
import { QuestsSection } from "@/components/landing/QuestsSection";
import { AttributesSection } from "@/components/landing/AttributesSection";
import { ConstellationSection } from "@/components/landing/ConstellationSection";
import { StreaksSection } from "@/components/landing/StreaksSection";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      {/* Parallax Starfield & Ambient Horizon Aurora */}
      <BackgroundEffects />

      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 w-full pt-16">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: Quests & Interactive Constellation Preview */}
        <QuestsSection />

        {/* Section 3: Four Attributes Matrix */}
        <AttributesSection />

        {/* Section 4: Organic Celestial Constellation Map */}
        <ConstellationSection />

        {/* Section 5: Consistency, Streaks & Economy */}
        <StreaksSection />

        {/* Section 6: Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
