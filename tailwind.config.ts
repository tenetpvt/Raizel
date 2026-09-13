import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0A0A0F",
        surface: "#141420",
        "surface-dim": "#0E0E14",
        "surface-container-lowest": "#07070B",
        "surface-container-low": "#111118",
        "surface-container": "#171720",
        "surface-container-high": "#1E1E28",
        "surface-container-highest": "#282834",
        "surface-bright": "#323242",
        "elevated": "#1C1C2E",
        outline: "#78828E",
        "outline-variant": "#2A2D38",
        "on-surface": "#F5F5F7",
        "on-surface-variant": "#9B9BA8",
        primary: {
          DEFAULT: "#4DD8FF",
          container: "#4DD8FF",
          "on-container": "#003241",
          fixed: "#BAECFF",
        },
        secondary: {
          DEFAULT: "#9D7BFF",
          container: "#3D277D",
          "on-container": "#CEBDFF",
        },
        intellect: "#4DD8FF",
        strength: "#FF6B4A",
        discipline: "#9D7BFF",
        vitality: "#34D399",
        stardust: "#F2B84B",
        ember: "#FF6B4A",
        violet: "#9D7BFF",
        emerald: "#34D399",
        amber: "#F2B84B",
      },
      fontFamily: {
        display: ["var(--font-syne)", "Syne", "sans-serif"],
        sans: ["var(--font-geist)", "var(--font-inter)", "Geist", "Inter", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Geist Mono", "monospace"],
      },
      boxShadow: {
        "cyan-glow": "0 0 24px -4px rgba(77, 216, 255, 0.4)",
        "cyan-glow-lg": "0 0 36px rgba(77, 216, 255, 0.6)",
        "violet-glow": "0 0 24px -4px rgba(157, 123, 255, 0.4)",
        "ember-glow": "0 0 24px -4px rgba(255, 107, 74, 0.4)",
        "emerald-glow": "0 0 24px -4px rgba(52, 211, 153, 0.4)",
        "amber-glow": "0 0 24px -4px rgba(242, 184, 75, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
