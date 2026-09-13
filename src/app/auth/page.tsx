"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { RaizelLogo } from "@/components/ui/RaizelLogo";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function AuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const [mode, setMode] = useState<"signin" | "signup">(initialMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  useEffect(() => {
    const urlMode = searchParams.get("mode");
    if (urlMode === "signup" || urlMode === "signin") {
      setMode(urlMode);
    }
  }, [searchParams]);

  // Evaluate password strength
  const getPasswordScore = (val: string) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val) && val.length >= 10) score++;
    return score;
  };

  const passwordScore = getPasswordScore(password);

  const getStrengthLabel = () => {
    if (!password) return { text: "Require entry", color: "text-on-surface-variant" };
    if (passwordScore === 1) return { text: "Weak", color: "text-red-400" };
    if (passwordScore === 2) return { text: "Moderate", color: "text-amber" };
    return { text: "Secure", color: "text-primary" };
  };

  const strengthInfo = getStrengthLabel();

  const handleModeChange = (newMode: "signin" | "signup") => {
    setMode(newMode);
    setErrors({});
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; email?: string; password?: string; general?: string } = {};

    if (mode === "signup" && !name.trim()) {
      newErrors.name = "Please provide your name.";
    }

    if (!email || !email.includes("@") || !email.includes(".")) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitStatus(mode === "signin" ? "Authenticating..." : "Initializing...");

      try {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();

        if (mode === "signup") {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: name,
              },
            },
          });

          if (error) {
            setErrors({ general: error.message });
            setIsSubmitting(false);
            setSubmitStatus(null);
            return;
          }
        } else {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) {
            setErrors({ general: error.message });
            setIsSubmitting(false);
            setSubmitStatus(null);
            return;
          }
        }

        setSubmitStatus("Aligned");
        setTimeout(() => {
          setIsSubmitting(false);
          setSubmitStatus(null);
          router.push("/onboarding");
        }, 600);
      } catch (err: unknown) {
        setErrors({ general: err instanceof Error ? err.message : "Authentication failed." });
        setIsSubmitting(false);
        setSubmitStatus(null);
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary selection:text-primary-on-container">
      {/* Top Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-outline-variant/30">
        <div className="h-16 w-full max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity">
            <span className="w-6 h-6 flex items-center justify-center shrink-0">
              <RaizelLogo className="w-6 h-6 object-contain" />
            </span>
            <span className="font-display text-[20px] font-bold tracking-tight text-on-surface">
              Raizel
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding"
              className="flex items-center gap-1.5 font-mono text-xs text-primary/80 hover:text-primary transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container"
            >
              <span>Skip for now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="h-3 w-px bg-outline-variant/40 hidden sm:block" />
            <Link
              href="/"
              className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant hover:text-on-surface transition-colors py-1.5 px-3 rounded-lg hover:bg-surface-container"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Raizel</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Authentication Section */}
      <main className="w-full pt-16 flex-1 flex flex-col justify-center items-center px-6 py-12 relative overflow-hidden">
        {/* Whisper-thin Constellation Celestial Ambient Underlay */}
        <div className="absolute inset-0 pointer-events-none select-none overflow-hidden flex items-center justify-center opacity-30">
          <div className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
          <svg
            className="w-[720px] h-[720px] text-surface-tint opacity-20"
            fill="none"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="400"
              cy="400"
              r="320"
              stroke="#4DD8FF"
              strokeDasharray="2 8"
              strokeWidth="0.5"
              opacity="0.2"
            />
            <circle cx="400" cy="400" r="180" stroke="#9D7BFF" strokeWidth="0.5" opacity="0.15" />
            <circle cx="400" cy="170" fill="#4DD8FF" opacity="0.4" r="2" />
            <circle cx="630" cy="400" fill="#4DD8FF" opacity="0.4" r="2" />
            <circle cx="400" cy="630" fill="#4DD8FF" opacity="0.4" r="2" />
            <circle cx="170" cy="400" fill="#4DD8FF" opacity="0.4" r="2" />
            <circle cx="563" cy="237" fill="#F2B84B" opacity="0.3" r="2" />
            <circle cx="237" cy="563" fill="#CEBDFF" opacity="0.3" r="2" />
          </svg>
        </div>

        {/* Central Authentication Stage */}
        <div className="relative z-10 w-full max-w-[420px] flex flex-col items-center">
          {/* Brand Emblem & Title */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-11 h-11 rounded-full bg-surface-container-high border border-outline-variant/40 flex items-center justify-center mb-3 shadow-md">
              <RaizelLogo className="w-6 h-6 object-contain" />
            </div>

            <motion.h1
              key={mode + "-heading"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display text-2xl sm:text-3xl text-on-surface font-bold tracking-tight"
            >
              {mode === "signin" ? "Welcome back." : "Begin your journey."}
            </motion.h1>

            <motion.p
              key={mode + "-subtitle"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-sm text-on-surface-variant mt-1"
            >
              {mode === "signin"
                ? "Your universe is waiting."
                : "Shape your telemetry universe."}
            </motion.p>
          </div>

          {/* Main Auth Card */}
          <div className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-6 sm:p-7 shadow-[0_16px_36px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {/* Segmented Switcher Pill Track */}
            <div className="relative bg-surface-container-lowest p-1 rounded-lg flex items-center mb-6 select-none">
              <div
                className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-surface-container rounded transition-transform duration-300 ease-out shadow-sm"
                style={{
                  transform: mode === "signin" ? "translateX(0%)" : "translateX(100%)",
                }}
              />
              <button
                type="button"
                onClick={() => handleModeChange("signin")}
                className={`relative z-10 w-1/2 py-1.5 text-xs font-medium text-center rounded transition-colors duration-200 ${
                  mode === "signin" ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                Sign in
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("signup")}
                className={`relative z-10 w-1/2 py-1.5 text-xs font-medium text-center rounded transition-colors duration-200 ${
                  mode === "signup" ? "text-on-surface" : "text-on-surface-variant"
                }`}
              >
                Create account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.general && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errors.general}
                </div>
              )}
              {/* Full Name Field (Sign Up only) */}
              <AnimatePresence initial={false}>
                {mode === "signup" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col space-y-1 overflow-hidden"
                  >
                    <label
                      htmlFor="name-input"
                      className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider"
                    >
                      Full Name
                    </label>
                    <input
                      id="name-input"
                      type="text"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aria Thorne"
                      className="w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm px-3.5 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:border-primary/60 transition-all"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-400 pt-0.5">{errors.name}</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email-input"
                    className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <span className="font-mono text-[10px] text-outline opacity-60">ID // 01</span>
                </div>
                <input
                  id="email-input"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm px-3.5 py-2.5 rounded-lg placeholder:text-outline/60 focus:outline-none focus:border-primary/60 transition-all"
                />
                {errors.email && (
                  <p className="text-xs text-red-400 pt-0.5">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password-input"
                    className="font-mono text-[11px] text-on-surface-variant uppercase tracking-wider"
                  >
                    Password
                  </label>
                  {mode === "signin" && (
                    <a
                      href="#"
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </a>
                  )}
                </div>
                <div className="relative flex items-center">
                  <input
                    id="password-input"
                    type={showPassword ? "text" : "password"}
                    autoComplete={mode === "signin" ? "current-password" : "new-password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-surface-container-lowest border border-outline-variant/40 text-on-surface text-sm px-3.5 py-2.5 pr-10 rounded-lg placeholder:text-outline/60 focus:outline-none focus:border-primary/60 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                    className="absolute right-3 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>

                {/* Password Strength Gauge (Sign Up only) */}
                {mode === "signup" && (
                  <div className="pt-1 space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5 h-1">
                      <div
                        className={`h-full rounded-full transition-colors duration-300 ${
                          passwordScore >= 1
                            ? passwordScore === 1
                              ? "bg-red-400"
                              : passwordScore === 2
                              ? "bg-amber"
                              : "bg-primary"
                            : "bg-surface-container-highest"
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-colors duration-300 ${
                          passwordScore >= 2
                            ? passwordScore === 2
                              ? "bg-amber"
                              : "bg-primary"
                            : "bg-surface-container-highest"
                        }`}
                      />
                      <div
                        className={`h-full rounded-full transition-colors duration-300 ${
                          passwordScore >= 3 ? "bg-primary" : "bg-surface-container-highest"
                        }`}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-outline uppercase">Min 8 characters</span>
                      <span className={`font-medium ${strengthInfo.color}`}>
                        {strengthInfo.text}
                      </span>
                    </div>
                  </div>
                )}

                {errors.password && (
                  <p className="text-xs text-red-400 pt-0.5">{errors.password}</p>
                )}
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-2 py-2.5 px-4 bg-primary text-primary-on-container font-semibold text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-primary/90 hover:shadow-cyan-glow transition-all duration-200 active:scale-[0.985] disabled:opacity-75"
              >
                <span>
                  {submitStatus
                    ? submitStatus
                    : mode === "signin"
                    ? "Sign in"
                    : "Create account"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Separator */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="w-full h-px bg-outline-variant/30" />
              <span className="absolute px-3 bg-surface-container-low font-mono text-[10px] text-outline uppercase tracking-widest">
                or
              </span>
            </div>

            {/* Google Social Button */}
            <button
              type="button"
              className="w-full py-2.5 px-4 bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-medium rounded-lg flex items-center justify-center gap-3 transition-colors duration-150 active:scale-[0.99]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"
                  fill="#EA4335"
                />
                <path
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
                  fill="#4285F4"
                />
                <path
                  d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.4l3.7-3z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"
                  fill="#34A853"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Guest / Skip CTA */}
            <div className="mt-2.5">
              <button
                type="button"
                onClick={() => router.push("/onboarding")}
                className="w-full py-2.5 px-4 bg-surface-container/40 hover:bg-surface-container border border-outline-variant/30 hover:border-outline-variant/60 text-on-surface-variant hover:text-white text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-all duration-150 active:scale-[0.99] cursor-pointer"
              >
                <span>Continue as Guest (Demo Mode)</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-70" />
              </button>
            </div>

            {/* Bottom Toggle Prompt */}
            <div className="mt-6 text-center">
              <p className="text-xs text-on-surface-variant">
                <span>
                  {mode === "signin"
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <button
                  type="button"
                  onClick={() => handleModeChange(mode === "signin" ? "signup" : "signin")}
                  className="ml-1.5 text-xs text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
                >
                  {mode === "signin" ? "Create one" : "Sign in"}
                </button>
              </p>
            </div>
          </div>

          {/* Compliance Meta Links */}
          <div className="mt-6 flex items-center justify-center gap-4 text-outline text-xs">
            <Link href="#" className="hover:text-on-surface-variant transition-colors">
              Privacy Policy
            </Link>
            <span className="opacity-40">·</span>
            <Link href="#" className="hover:text-on-surface-variant transition-colors">
              Terms of Service
            </Link>
            <span className="opacity-40">·</span>
            <Link href="#" className="hover:text-on-surface-variant transition-colors">
              Help
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-surface flex items-center justify-center text-primary font-mono text-xs">
          Loading...
        </div>
      }
    >
      <AuthContent />
    </Suspense>
  );
}
