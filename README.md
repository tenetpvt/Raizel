# Raizel — The Life RPG
> *Every action you take lights the dark.*

Raizel transforms personal growth, deliberate practice, and real-world mastery into an elevated, technical RPG experience. It rejects high-saturation fantasy tropes, pixel-art clichés, and noisy gamification textures in favor of restrained obsidian minimalism, optical glass treatments, and razor-sharp data density.

Built with **Next.js 14**, **React**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

---

## ✦ Table of Contents
- [Design Philosophy: Lucent Arcana](#-design-philosophy-lucent-arcana)
- [Core Features & Screen Architecture](#-core-features--screen-architecture)
  - [1. Landing Page (`/`)](#1-landing-page-)
  - [2. Authentication (`/auth`)](#2-authentication-auth)
  - [3. Onboarding & Character Genesis (`/onboarding`)](#3-onboarding--character-genesis-onboarding)
  - [4. Operative Dashboard (`/dashboard`)](#4-operative-dashboard-dashboard)
  - [5. Interactive Constellation Chart (`/constellation`)](#5-interactive-constellation-chart-constellation)
  - [6. Cadence of Light / Streaks (`/streaks`)](#6-cadence-of-light--streaks-streaks)
  - [7. The Vault / Personalization Studio (`/vault`)](#7-the-vault--personalization-studio-vault)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Supabase Setup & Database Schema](#-supabase-setup--database-schema)
- [Guest / Demo Mode Auto-Fallback](#-guest--demo-mode-auto-fallback)
- [Ethical Architecture](#-ethical-architecture)

---

## ✦ Design Philosophy: Lucent Arcana

The interface acts as a silent mirror of personal momentum: default states remain deep, cold, and quiet, while achievements, kinetic streaks, and stat progressions radiate subtle, crystalline photonic energy (**"earned luminescence"**).

### Core Aesthetic Foundations
- **Obsidian Negative Space**: Pure obsidian dark backgrounds (`#0A0A0F`, `#0E0E13`) reduce visual fatigue and maximize focal clarity.
- **Earned Luminescence**: Stars, filaments, and cells ignite with light only upon real-world task completions.
- **Hairline Precision**: 1px borders (`border-white/[0.04]`), tabular numerical telemetry, and crisp typography.
- **Zero-Commerce Integrity**: Progression (XP, levels, attributes) is 100% earned through real-world actions and is never sold.

### Attribute Palette
- **Intellect** (`#4DD8FF` / Cyan) — Deep work sprints, learning, engineering, writing.
- **Discipline** (`#9D7BFF` / Violet) — Unbroken morning routines, fasting, habits, meditation.
- **Strength** (`#FF6B4A` / Ember Orange) — Resistance training, compound loading, high-output physical exertion.
- **Vitality** (`#34D399` / Emerald) — Zone 2 endurance, sleep, cold exposure, recovery.
- **Stardust** (`#F2B84B` / Stardust Amber) — Merited currency earned strictly through completing daily quests.

---

## ✦ Core Features & Screen Architecture

### 1. Landing Page (`/`)
- **Hero Stage**: Dynamic interactive quest demo that lights up SVG constellation filaments and recalculates resonance in real-time.
- **Attribute Matrix**: Interactive breakdown of the 4 core disciplines with level meters and XP telemetry.
- **Living Constellation Cluster**: Interactive harmonic celestial chart with hoverable star nodes.
- **Streaks & Treasury**: 42-day active streak showcase, 1,840 Stardust treasury counter, and zero-noise privacy pledge.
- **Smooth Scrolling**: Integrated Lenis smooth scrolling for a weighted, fluid feel.

### 2. Authentication (`/auth`)
- **Dual Flow**: Segmented switcher between **Sign in** and **Create account**.
- **Supabase Auth Integration**: Secure session creation with email/password and Google OAuth.
- **Guest / Demo Mode**: Instant access with `"Continue as Guest (Demo Mode)"` and `"Skip for now"` navigation.
- **Password Strength Gauge**: Live 3-stage security gauge (Weak → Moderate → Secure) with interactive visibility toggle.

### 3. Onboarding & Character Genesis (`/onboarding`)
- **3-Step Guided Journey**:
  1. *Welcome to Raizel* — Orientation and operative overview.
  2. *Choose Starting Attributes* — Interactive selection of primary disciplines (Intellect, Strength, Discipline, Vitality).
  3. *Add First Quest* — Crafting your genesis questline with difficulty and attribute affinity.
- **Interactive Star Chart**: Dynamic canvas with particle ripple physics responding to cursor proximity.
- **Direct Route to Dashboard**: Smooth transition to `/dashboard` upon completion.

### 4. Operative Dashboard (`/dashboard`)
- **Operative Core Layout**: Responsive navigation sidebar with quick access to Dashboard, Constellation, Streaks, Vault, and Profile.
- **Quest Hub**: Filter quests by attribute or view all active directives.
- **Interactive Completion**: Tactile checkboxes with photonic spark particles, XP awards, and instant attribute leveling.
- **Add Quest Modal (`⌘N`)**: Create custom quests with title, attribute tag, difficulty rating, and recurring cadence.
- **Rank & Progress Card**: Dynamic operative level, rank title (Adept, Sentinel, etc.), and next-level XP progress gauge.

### 5. Interactive Constellation Chart (`/constellation`)
- **Full Celestial Star Chart**: 34 interconnected stars clustered across 4 attribute quadrants.
- **Pan & Zoom Controls**: Smooth canvas zoom in, zoom out, and reset navigation.
- **Real-time Telemetry Tooltip**: Hover over any star node to inspect celestial coordinates, resonance magnitude, unlock state, and parent attribute.
- **Star Registry Drawer**: Expandable inspection drawer with cluster completion progress bars and attribute filtering.

### 6. Cadence of Light / Streaks (`/streaks`)
- **Hero Telemetry**: Active streak counter (18 days), longest record (27 days), and days remaining until the next constellation tier.
- **Lucent Activity Map**: 26-week calendar matrix with weekday labels (`Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`, `Sun`) aligned 1-to-1 with rows.
- **Graduated Blue Luminescence**: Activity cells use a consistent celestial blue palette (`#4ad6fd`) with graduated opacity and crisp, controlled radiant glows scaling directly with completion volume.
- **Shielded Day Indicators**: Amber outline cells indicating days protected by Shield Tokens.
- **Consistency Insights ("Your Rhythm")**: 4 de-boxed metrics (Best Day, Peak Time, Current Streak, Active Cycles) and weekly distribution cadence bars.
- **Streak Protection Utility**: Armed Shield Token management to prevent chain breaks.

### 7. The Vault / Personalization Studio (`/vault`)
- **Stardust Treasury**: Current balance (1,840 ✦) earned through daily quest completions.
- **Stardust Economy Popover**: Explains the merit-based economy and anti-commerce policy.
- **Currently Equipped Loadout Strip**: 5 active cosmetic slots (Theme, Constellation, Particle, Interface, Title).
- **Categorized Catalog**:
  - *Themes* — Midnight (Default Obsidian), Aurora (Violet-Cyan), Ember (Warm Amber), Moonlit (Silver Sapphire).
  - *Constellations* — Fine Lines (Geometric), Aurora Veil (Reactive Atmosphere), Orbit (Harmonics), Solaris (Corona).
  - *Particles* — Soft Trail (Mist), Comet Trace (Ember), Dustfall (Crystalline), Pulse (Shockwave).
  - *Interface* — Card Material (Etched Obsidian), Accent Pack, Cursor Trail.
  - *Identity* — Adept, The Apprentice, Ascendant (Level 25 Gate), Nova Glyph.
  - *Utility* — Streak Shield (Protect streak), Quest Token (Restore deleted quests), Focus Pass (Deep work quiet mode).
- **Featured Hero (Aurora Veil)**: Interactive mini constellation canvas with real-time telemetry.
- **Unlock & Equip Modal**: Inspection dialog with live cost breakdown, reserve verification, and instant loadout equipping.

---

## ✦ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Next.js 14+ (App Router) | High-performance full-stack React framework with SSR and Server Actions |
| **Language** | TypeScript | Strict type safety across quests, telemetry, profiles, and cosmetics |
| **Styling** | Tailwind CSS | Custom design tokens for obsidian surfaces, typography, and optical glows |
| **Animations** | Motion for React + Canvas | Photonic particle bursts, constellation canvas rendering, and smooth springs |
| **Smooth Scrolling** | Lenis | Weighted, fluid scrolling for narrative and landing experiences |
| **Database & Auth** | Supabase (PostgreSQL + Auth) | User profiles, real-time quest management, session persistence |
| **Icons** | Lucide React | Clean, razor-thin technical line iconography |
| **Typography** | Syne + Geist + Geist Mono | High-density technical headlines, clean body text, and tabular numerals |

---

## ✦ Project Directory Structure

```
Raizel/
├── public/                     # Static assets, brand marks, and icons
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts, metadata, and Lenis provider
│   │   ├── page.tsx            # Landing Page with interactive hero and features
│   │   ├── auth/
│   │   │   └── page.tsx        # Authentication (Sign in, Sign up, Google OAuth, Guest)
│   │   ├── onboarding/
│   │   │   └── page.tsx        # 3-step character genesis flow
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Operative Core dashboard with full quest management
│   │   ├── constellation/
│   │   │   └── page.tsx        # Interactive celestial star chart canvas with pan/zoom
│   │   ├── streaks/
│   │   │   └── page.tsx        # Cadence of Light, Lucent Activity Map, and rhythm metrics
│   │   └── vault/
│   │       └── page.tsx        # Personalization & Utility Studio (The Vault)
│   ├── components/
│   │   ├── app/
│   │   │   └── AppLayout.tsx   # Persistent sidebar navigation and status header
│   │   ├── onboarding/
│   │   │   └── OnboardingHeader.tsx # Unified step-based onboarding header
│   │   ├── ui/
│   │   │   └── RaizelLogo.tsx  # Geometric starburst SVG brand mark
│   │   └── providers/
│   │       └── SmoothScroll.tsx # Lenis smooth scrolling wrapper
│   └── lib/
│       ├── supabase/
│       │   ├── client.ts       # Browser-side Supabase client factory
│       │   └── server.ts       # Server-side Supabase client for Server Actions
│       └── utils.ts            # Class name merger (cn) and formatting helpers
├── supabase/
│   └── schema.sql              # PostgreSQL schema for profiles, quests, and cosmetics
├── design.md                   # Brand philosophy and Lucent Arcana design tokens
├── flow.md                     # Complete user journey and product flow documentation
├── techstack.md                # Architecture rationale and technology selection
├── tailwind.config.ts          # Tailwind theme extensions (colors, fonts, radii)
├── tsconfig.json               # TypeScript compiler configuration
└── package.json                # Project dependencies and build scripts
```

---

## ✦ Getting Started

### Prerequisites
- **Node.js** 18.17+ or higher
- **npm** or **pnpm** / **yarn**

### Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/raizel.git
cd raizel
npm install
```

### Environment Variables
Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Populate `.env.local` with your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note:** If Supabase environment variables are omitted or invalid, Raizel automatically operates in **Guest / Demo Mode**, providing full client-side interactivity without crashing.

### Running the Application

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To produce a production build:

```bash
npm run build
npm run start
```

---

## ✦ Supabase Setup & Database Schema

If you wish to enable persistent cloud synchronization across devices, execute the following SQL in your Supabase SQL Editor:

```sql
-- 1. Profiles Table
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT,
  level INT DEFAULT 1,
  xp INT DEFAULT 0,
  stardust INT DEFAULT 240,
  streak_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Quests Table
CREATE TABLE public.quests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  attribute TEXT NOT NULL CHECK (attribute IN ('intellect', 'strength', 'discipline', 'vitality')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('initiate', 'adept', 'ascendant')),
  xp_reward INT NOT NULL DEFAULT 50,
  stardust_reward INT NOT NULL DEFAULT 10,
  is_completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Equipped Loadout Table
CREATE TABLE public.equipped_loadout (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  theme TEXT DEFAULT 'midnight',
  constellation TEXT DEFAULT 'fine-lines',
  particle TEXT DEFAULT 'comet-trace',
  interface TEXT DEFAULT 'card-material',
  title TEXT DEFAULT 'adept',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipped_loadout ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can manage own quests" ON public.quests FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own loadout" ON public.equipped_loadout FOR ALL USING (auth.uid() = user_id);
```

---

## ✦ Guest / Demo Mode Auto-Fallback

Raizel is architected with a **zero-friction experience**:
- When visitors select **"Continue as Guest (Demo Mode)"** on the authentication page or skip onboarding, the app instantiates a rich, interactive demo profile.
- Quests can be added, completed with particle sparks, and filtered.
- The Lucent Activity Map renders historical consistency data.
- The Constellation Chart supports full zoom, pan, and hover telemetry.
- The Vault allows unlocking and equipping cosmetics with demo Stardust.
- Authenticating via Supabase immediately switches the workspace to cloud-synced persistence.

---

## ✦ Ethical Architecture

Raizel adheres strictly to ethical product principles:
1. **No Pay-To-Win**: Progression, XP, levels, and attribute mastery cannot be bought. They are earned strictly through real-world effort.
2. **Cosmetics & Utilities Only**: Stardust is spent solely on visual themes, constellation skins, particle trails, and consistency safeguards.
3. **Restorative Safeguards**: Shield tokens protect active streaks when emergency life events interrupt daily practice, eliminating punitive stress.
4. **Calm Technology**: No aggressive notifications, casino animations, or synthetic urgency loops.

---

## ✦ License

Crafted with precision. Distributed under the MIT License.
