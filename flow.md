# Raizel Product & User Flow

## 1. Landing Page Experience (Phase 1 — Current Scope)
1. **Top Navigation**: Fixed obsidian glass header with Raizel Constellation Mark, anchor links (`#quests-section`, `#attributes-section`, `#streaks-section`, `#constellation-section`), "Sign In", and "Start your ascent" CTA.
2. **Hero Stage**:
   - Headline: *"Every action you take lights the dark."*
   - Subtitle: Value proposition turning real effort into light.
   - Primary Action: *"Start your ascent"*
   - Secondary Action: *"View constellation"*
3. **Quests & Progression Preview**:
   - 4 interactive demo quests across Intellect, Discipline, Vitality, and Strength.
   - Real-time SVG constellation filament lighting and resonance percentage update.
4. **Attribute Matrix**:
   - Breakdown of Intellect, Strength, Discipline, and Vitality with active level meters and XP ratios.
5. **Living Constellation Cluster**:
   - SVG constellation cluster with harmonic filaments, hoverable star nodes, and satellite stars.
6. **Streaks & Economy**:
   - 42-day active streak showcase, 1,840 Stardust treasury counter, and zero-noise privacy pledge.
7. **Final Ascent Call-to-Action**:
   - *"Your universe is waiting to be built."*
8. **Footer**:
   - Navigation links, brand mark, and copyright.

## 2. Authentication Flow (`/auth`)
- **Route**: `/auth` with mode preselection via query parameter (`/auth?mode=signin` or `/auth?mode=signup`).
- **Visual Environment**: Fixed obsidian header with brand mark and "Back to Raizel" navigation (`/`), centered stage with celestial ambient underlay.
- **Card Features**:
  - Segmented sliding switcher pill between **Sign in** and **Create account**.
  - Adaptive headings: *"Welcome back. Your universe is waiting."* vs *"Begin your journey. Shape your telemetry universe."*
  - Interactive password visibility toggle (Eye/EyeOff).
  - Dynamic 3-stage password strength metric gauge with color feedback (Red/Weak → Amber/Moderate → Cyan/Secure).
  - Social authentication trigger: Google OAuth button with official brand iconography.
  - Contextual bottom link switching between modes.

---

## 3. Subsequent App Flows (Phase 3+)
- **Onboarding / Character Genesis**: Choosing starting attributes and defining first questline.
- **Quest Hub / Main Dashboard**: Full CRUD task management with XP, Stardust, and attribute gains.
- **Constellation View**: Full dynamic celestial chart rendered from historical activity.
- **Analytics & Consistency**: Heatmaps, active streak protection, and weekly resonance telemetry.
- **The Vault**: Shop/customization studio using earned Stardust for themes, badges, and titles.
- **Profile & Settings**: Character summary, rank badges, encrypted data controls.
