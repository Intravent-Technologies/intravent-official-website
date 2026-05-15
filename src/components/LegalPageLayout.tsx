"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface Section {
  title: string;
  content: React.ReactNode;
}

export default function LegalPageLayout({
  label,
  title,
  lastUpdated,
  sections,
}: {
  label: string;
  title: string;
  lastUpdated: string;
  sections: Section[];
}) {
  const [activeSection, setActiveSection] = useState(0);

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.02]" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-brand-navy/10 animate-float" />
        <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-glow-purple opacity-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-6 bg-brand-purple/40" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                {label}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight mb-4">
              {title}
            </h1>
            <p className="text-text-secondary">{lastUpdated}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-28 space-y-2">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-text-tertiary mb-4">
                  On this page
                </p>
                {sections.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveSection(i);
                      document.getElementById(`section-${i}`)?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-xl transition-all ${
                      activeSection === i
                        ? "bg-brand-purple/10 text-brand-purple font-semibold"
                        : "text-text-secondary hover:text-brand-navy hover:bg-brand-navy-50"
                    }`}
                  >
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3 order-1 lg:order-2 space-y-10">
              {sections.map((s, i) => (
                <motion.div
                  key={i}
                  id={`section-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="scroll-mt-28"
                >
                  <div className="flex items-start gap-5">
                    <span className="hidden md:flex w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-accent-blue text-white text-sm font-bold items-center justify-center shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl md:text-2xl font-bold text-brand-navy mb-4">
                        {s.title}
                      </h2>
                      <div className="text-text-secondary leading-relaxed space-y-3">
                        {s.content}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
