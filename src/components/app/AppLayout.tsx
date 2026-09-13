"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RaizelLogo } from "@/components/ui/RaizelLogo";
import {
  LayoutGrid,
  Sparkles,
  Flame,
  Diamond,
  User,
  Terminal,
  Sliders,
  Bell,
  PanelLeftClose,
  Coins,
} from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
  breadcrumb?: string;
}

export function AppLayout({ children, breadcrumb = "Operative Core" }: AppLayoutProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutGrid },
    { name: "Constellation", href: "/constellation", icon: Sparkles },
    { name: "Streaks", href: "/streaks", icon: Flame },
    { name: "Vault", href: "/vault", icon: Diamond },
    { name: "Profile", href: "/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#e4e1e9] flex selection:bg-primary selection:text-primary-on-container">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0E0E13] border-r border-white/[0.04] z-50 flex flex-col justify-between select-none transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col">
          {/* Brand */}
          <div className="h-16 px-4 flex items-center justify-between border-b border-white/[0.04]">
            <Link href="/dashboard" className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-lg bg-surface-container border border-white/[0.08] flex items-center justify-center shrink-0">
                <RaizelLogo className="w-5 h-5 object-contain text-primary" />
              </div>
              {!collapsed && (
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg font-bold tracking-tight text-white">
                    Raizel
                  </span>
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    v1.0
                  </span>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4">
            {!collapsed && (
              <div className="font-mono text-[10px] uppercase text-outline px-3 mb-2 tracking-wider">
                Operative Core
              </div>
            )}
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#242435] text-primary shadow-[inset_0_0_12px_rgba(77,216,255,0.08)] border border-primary/20"
                        : "text-on-surface-variant hover:bg-surface-container-low hover:text-white"
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Tools & Controls */}
        <div className="p-3 border-t border-white/[0.04] bg-[#0A0A0F]/60 flex flex-col gap-2">
          {!collapsed && (
            <button
              type="button"
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-white transition-colors text-xs"
            >
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" />
                <span className="font-mono text-[11px]">Quick Command</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant">
                ⌘K
              </span>
            </button>
          )}

          <div className="flex items-center justify-between pt-1 text-on-surface-variant">
            {!collapsed && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Settings"
                  className="p-1.5 rounded-lg hover:bg-surface-container hover:text-white transition-colors"
                >
                  <Sliders className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Notifications"
                  className="p-1.5 rounded-lg hover:bg-surface-container hover:text-white transition-colors"
                >
                  <Bell className="w-4 h-4" />
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={() => setCollapsed(!collapsed)}
              aria-label="Toggle Navigation"
              className="p-1.5 rounded-lg hover:bg-surface-container hover:text-white transition-colors ml-auto"
            >
              <PanelLeftClose className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          collapsed ? "pl-16" : "pl-64"
        }`}
      >
        {/* Top Floating App Header */}
        <header
          className={`fixed top-0 right-0 h-16 bg-[#0A0A0F]/85 backdrop-blur-xl z-40 px-6 sm:px-8 flex items-center justify-between border-b border-white/[0.04] transition-all duration-300 ${
            collapsed ? "left-16" : "left-64"
          }`}
        >
          <div className="flex items-center gap-3 font-mono text-xs text-outline">
            <span className="tracking-wider uppercase text-on-surface-variant/80">
              {breadcrumb}
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* Streak Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-white/[0.05] hover:bg-surface-container transition-colors">
                <Flame className="w-3.5 h-3.5 text-ember" />
                <span className="font-mono text-xs font-semibold text-ember">18D</span>
              </div>

              {/* XP Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-white/[0.05] hover:bg-surface-container transition-colors">
                <Coins className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-xs font-semibold text-primary">2,480 XP</span>
              </div>
            </div>

            {/* Profile Avatar */}
            <Link
              href="/profile"
              className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
              title="Profile"
            >
              <User className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="w-full pt-20 px-6 sm:px-8 pb-12 flex-1">{children}</main>
      </div>
    </div>
  );
}
