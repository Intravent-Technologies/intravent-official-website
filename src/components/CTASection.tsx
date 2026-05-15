"use client";

import { motion } from "framer-motion";
import Button from "./Button";

interface CTASectionProps {
  title?: string;
  description?: string;
}

export default function CTASection({
  title = "Ready to Build Something Great?",
  description = "Let's discuss how we can help bring your vision to life with our enterprise expertise.",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-bg-secondary border-b border-border-light">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.02]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/[0.03] to-transparent" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-purple/[0.04] blur-[100px]" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full bg-brand-navy/[0.02] blur-[80px]" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full border border-brand-purple/[0.06] animate-float-slow" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          <div className="max-w-2xl text-center">
            <div className="flex items-center gap-3 mb-5 justify-center">
              <span className="h-px w-6 bg-brand-purple/40" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                Let&apos;s Work Together
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-tight">
              {title}
            </h2>
            <p className="mt-5 text-lg md:text-xl text-text-secondary leading-relaxed max-w-xl mx-auto">
              {description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
              >
                Start a Project
              </Button>
              <Button
                href="/portfolio"
                variant="outline"
                size="lg"
              >
                View Portfolio
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex flex-col gap-3 items-end">
            <div className="text-right">
              <div className="text-4xl font-bold text-brand-navy">200+</div>
              <div className="text-sm text-text-tertiary">Projects Delivered</div>
            </div>
            <div className="h-px w-20 bg-border-light" />
            <div className="text-right">
              <div className="text-4xl font-bold text-brand-purple">50+</div>
              <div className="text-sm text-text-tertiary">Happy Clients</div>
            </div>
            <div className="h-px w-20 bg-border-light" />
            <div className="text-right">
              <div className="text-4xl font-bold text-brand-navy">99%</div>
              <div className="text-sm text-text-tertiary">Satisfaction Rate</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
