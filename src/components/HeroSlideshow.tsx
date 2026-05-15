"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

interface Slide {
  image: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  cardIcon: "chart" | "network" | "checklist";
  cardBadge: string;
}

const slides: Slide[] = [
  {
    image: "",
    badge: "Enterprise Digital Solutions",
    title: "Building Scalable Digital Products for",
    highlight: "Modern Businesses",
    description:
      "We partner with enterprises and high-growth startups to design, build, and scale digital products that drive measurable business impact.",
    ctaLabel: "Schedule a Consultation",
    ctaHref: "/contact",
    secondaryLabel: "Explore Our Services",
    secondaryHref: "/services",
    cardIcon: "chart",
    cardBadge: "Analytics Dashboard",
  },
  {
    image: "/images/hero-ai.jpg",
    badge: "AI & Automation",
    title: "Intelligent Automation for",
    highlight: "Tomorrow's Enterprise",
    description:
      "Harness the power of AI and machine learning to automate workflows, unlock insights, and accelerate your digital transformation journey.",
    ctaLabel: "Discover AI Solutions",
    ctaHref: "/services/ai-automation",
    secondaryLabel: "View Case Studies",
    secondaryHref: "/portfolio",
    cardIcon: "network",
    cardBadge: "Neural Network",
  },
  {
    image: "/images/hero-consulting.jpg",
    badge: "PMP Certification Training",
    title: "Accelerate Your Career with",
    highlight: "World-Class Training",
    description:
      "Join thousands of professionals who transformed their careers with our PMP certification training and project management excellence programs.",
    ctaLabel: "Start Your Journey",
    ctaHref: "/services/pmp-training",
    secondaryLabel: "Learn More",
    secondaryHref: "/about",
    cardIcon: "checklist",
    cardBadge: "Certification Progress",
  },
];

function ChartIcon() {
  return (
    <svg className="w-6 h-6 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function NetworkIcon() {
  return (
    <svg className="w-6 h-6 text-brand-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 11-12.728 0m12.728 0a9 9 0 00-12.728 0m12.728 0l-3.536 3.536m-9.192-3.536l3.536 3.536M12 12l3 3m-3-3l-3 3m3-3V3" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function CardIcon({ type }: { type: Slide["cardIcon"] }) {
  switch (type) {
    case "chart": return <ChartIcon />;
    case "network": return <NetworkIcon />;
    case "checklist": return <ChecklistIcon />;
  }
}

function CardContent({ s }: { s: Slide }) {
  if (s.cardIcon === "chart") {
    return (
      <div className="flex-1 grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-24 rounded bg-brand-purple-100" />
              <div className="h-2 w-8 rounded bg-brand-navy-50" />
            </div>
            <div className="h-24 rounded-xl bg-white border border-border-light p-3 space-y-2.5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-brand-purple-100" />
                <div className="h-2 flex-1 rounded bg-brand-purple-100" />
              </div>
              <div className="flex gap-1.5">
                <div className="h-10 flex-1 rounded bg-gradient-to-t from-brand-purple-200 to-brand-purple-50" />
                <div className="h-8 flex-1 rounded bg-gradient-to-t from-brand-purple-100 to-brand-purple-50" />
                <div className="h-12 flex-1 rounded bg-gradient-to-t from-brand-purple-300 to-brand-purple-100" />
                <div className="h-6 flex-1 rounded bg-gradient-to-t from-brand-purple-100 to-brand-purple-50" />
              </div>
            </div>
            <div className="h-16 rounded-xl bg-white border border-border-light p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-2 w-16 rounded bg-brand-navy-50" />
                <div className="h-2 w-12 rounded bg-emerald-100" />
              </div>
              <div className="h-2 w-full rounded bg-brand-navy-50" />
              <div className="h-2 w-3/4 rounded bg-brand-navy-50" />
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="h-3 w-16 rounded bg-brand-navy-100" />
          <div className="h-32 rounded-xl bg-brand-purple-50/50 border border-brand-purple-200/30 p-3 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-brand-purple-200" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-full rounded bg-brand-purple-100" />
                <div className="h-2 w-2/3 rounded bg-brand-purple-100" />
              </div>
            </div>
            <div className="h-2 w-full rounded bg-brand-navy-50" />
            <div className="h-2 w-4/5 rounded bg-brand-navy-50" />
            <div className="h-2 w-3/5 rounded bg-brand-navy-50" />
          </div>
          <div className="h-12 rounded-xl bg-gradient-to-r from-brand-purple to-brand-purple-600 flex items-center justify-center shadow-md">
            <div className="h-3 w-24 rounded bg-white/30" />
          </div>
        </div>
      </div>
    );
  }

  if (s.cardIcon === "network") {
    return (
      <div className="flex-1 grid grid-cols-5 gap-4">
        <div className="col-span-3 space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-3 w-20 rounded bg-brand-purple-200" />
              <div className="h-2 w-8 rounded bg-brand-navy-50" />
            </div>
            <div className="h-24 rounded-xl bg-white border border-border-light p-3 relative overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, #5B2D8E 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="relative w-full h-full">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-brand-purple-300" />
                  <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-brand-purple-400" />
                  <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-brand-purple-300" />
                  <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-brand-purple-300" />
                  <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-brand-purple-400" />
                  <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100">
                    <line x1="25" y1="25" x2="50" y2="50" stroke="#5B2D8E" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="75" y2="25" stroke="#5B2D8E" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="75" y2="75" stroke="#5B2D8E" strokeWidth="0.5" />
                    <line x1="50" y1="50" x2="25" y2="75" stroke="#5B2D8E" strokeWidth="0.5" />
                    <line x1="25" y1="75" x2="50" y2="50" stroke="#5B2D8E" strokeWidth="0.5" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="h-16 rounded-xl bg-white border border-border-light p-3 space-y-2">
              <div className="h-2 w-3/4 rounded bg-brand-navy-50" />
              <div className="h-2 w-full rounded bg-brand-navy-50" />
            </div>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <div className="h-3 w-16 rounded bg-brand-purple-100" />
          <div className="h-32 rounded-xl bg-gradient-to-br from-brand-purple-100/30 to-brand-purple-50/50 border border-brand-purple-200/30 p-3 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-purple-400 animate-pulse-soft" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-full rounded bg-brand-purple-100" />
                <div className="h-2 w-2/3 rounded bg-brand-purple-100" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-purple-300" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-full rounded bg-brand-purple-100" />
                <div className="h-2 w-1/2 rounded bg-brand-purple-100" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-purple-400 animate-pulse-soft" />
              <div className="space-y-1.5 flex-1">
                <div className="h-2 w-full rounded bg-brand-purple-100" />
                <div className="h-2 w-3/4 rounded bg-brand-purple-100" />
              </div>
            </div>
          </div>
          <div className="h-12 rounded-xl bg-gradient-to-r from-brand-purple-500 to-brand-purple-700 flex items-center justify-center shadow-md">
            <div className="h-3 w-20 rounded bg-white/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 grid grid-cols-5 gap-4">
      <div className="col-span-3 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-emerald-100" />
            <div className="h-2 w-8 rounded bg-brand-navy-50" />
          </div>
          <div className="h-24 rounded-xl bg-white border border-border-light p-3 space-y-2.5">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="h-2 flex-1 rounded bg-emerald-100" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-brand-purple-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="h-2 flex-1 rounded bg-brand-purple-100" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div className="h-2 flex-1 rounded bg-amber-100" />
            </div>
          </div>
          <div className="h-16 rounded-xl bg-white border border-border-light p-3 space-y-2">
            <div className="flex items-center justify-between">
              <div className="h-2 w-20 rounded bg-brand-navy-50" />
              <div className="h-2 w-12 rounded bg-emerald-200 rounded-full" />
            </div>
            <div className="relative h-2 w-full rounded-full bg-brand-navy-50 overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-2 space-y-4">
        <div className="h-3 w-16 rounded bg-emerald-100" />
        <div className="h-32 rounded-xl bg-gradient-to-br from-emerald-50/50 to-brand-navy-50/50 border border-emerald-200/30 p-3 space-y-3">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1">
              <div className="w-5 h-5 rounded-full bg-emerald-200 border border-white" />
              <div className="w-5 h-5 rounded-full bg-brand-purple-200 border border-white" />
              <div className="w-5 h-5 rounded-full bg-amber-200 border border-white" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="h-2 w-full rounded bg-emerald-100" />
              <div className="h-2 w-2/3 rounded bg-emerald-100" />
            </div>
          </div>
          <div className="h-2 w-full rounded bg-brand-navy-50" />
          <div className="h-2 w-4/5 rounded bg-brand-navy-50" />
        </div>
        <div className="h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center shadow-md">
          <div className="h-3 w-24 rounded bg-white/30" />
        </div>
      </div>
    </div>
  );
}

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, [next]);

  const s = slides[index];

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-primary">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: "url(/images/bg.jpeg)" }} />
        <div className="absolute inset-0 bg-cover bg-center opacity-35" style={{ backgroundImage: "url(/images/net.jpeg)" }} />
        <AnimatePresence>
          {s.image && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-8 lg:px-12 py-28 md:py-36 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-7 lg:max-w-lg xl:max-w-xl"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-brand-purple-50 border border-brand-purple-200/50">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inset-0 rounded-full bg-brand-purple animate-pulse-soft" />
                  <span className="relative inset-0 rounded-full bg-brand-purple" />
                </span>
                <span className="text-xs font-semibold text-brand-purple tracking-wide">
                  {s.badge}
                </span>
              </div>

              <h1 className="heading-xl text-brand-navy">
                {s.title}{" "}
                <span className="text-gradient">{s.highlight}</span>
              </h1>

              <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
                {s.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button href={s.ctaHref} size="lg" variant="primary">
                  {s.ctaLabel}
                </Button>
                <Button href={s.secondaryHref} size="lg" variant="outline">
                  {s.secondaryLabel}
                </Button>
              </div>

              <div className="flex items-center gap-2.5 pt-1 flex-wrap">
                {["AWS Partner", "Microsoft Gold", "ISO 27001 Certified"].map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-tertiary border border-border-light rounded-full px-3 py-1.5"
                  >
                    <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={index + "-card"}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block relative"
            >
              <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-white border border-border-light shadow-xl">
                <div className="absolute inset-0 opacity-60" style={{
                  background: s.cardIcon === "chart"
                    ? "linear-gradient(135deg, #f0f2f6 0%, #d6dbe7 100%)"
                    : s.cardIcon === "network"
                    ? "linear-gradient(135deg, #e9ddf5 0%, #f5f0fa 50%, #ffffff 100%)"
                    : "linear-gradient(135deg, #ecfdf5 0%, #f0f2f6 50%, #ffffff 100%)"
                }} />
                <div className="p-6 h-full flex flex-col relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400/70" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/70" />
                      <div className="w-3 h-3 rounded-full bg-emerald-400/70" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-brand-purple-100" />
                      <div className="w-5 h-5 rounded-md bg-brand-purple-100 flex items-center justify-center">
                        <CardIcon type={s.cardIcon} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-6 w-1 rounded-full bg-brand-purple" />
                    <span className="text-xs font-medium text-text-tertiary">{s.cardBadge}</span>
                  </div>

                  <CardContent s={s} />

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border-light">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                      <div className="text-[10px] text-text-tertiary font-medium">All systems operational</div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-5 h-5 rounded bg-brand-navy-50" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === index
                ? "w-8 h-1.5 bg-brand-purple shadow-sm shadow-brand-purple/30"
                : "w-1.5 h-1.5 bg-border-medium hover:bg-text-tertiary"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
