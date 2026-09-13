import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport = {
  themeColor: "#0A0A0F",
};

export const metadata: Metadata = {
  title: "Raizel — Every Action Lights the Dark | Life RPG",
  description:
    "Turn real-world habits and focused effort into personal light. Complete quests, level up your attributes, and watch your personal constellation awaken.",
  keywords: ["Life RPG", "Gamified Productivity", "Habit Tracker", "Personal Constellation", "Raizel"],
  authors: [{ name: "Raizel" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark lenis ${syne.variable} ${GeistSans.variable} ${GeistMono.variable} ${inter.variable}`}
    >
      <body className="bg-background font-sans text-on-surface antialiased selection:bg-primary selection:text-primary-on-container">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
