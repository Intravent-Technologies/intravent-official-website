"use client";

import { motion } from "framer-motion";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "secondary" | "tertiary" | "gradient";
}

export default function Section({
  children,
  className = "",
  id,
  variant = "default",
}: SectionProps) {
  const variants = {
    default: "bg-bg-primary",
    secondary: "bg-bg-secondary",
    tertiary: "bg-bg-tertiary",
    gradient: "bg-gradient-subtle",
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-28 lg:py-32 ${variants[variant]} relative ${className}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  className = "",
  center = true,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${center ? "mx-auto text-center" : ""} mb-14 lg:mb-18 ${className}`}
    >
      {label && (
        <div className="flex items-center gap-3 mb-4 justify-center">
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-purple">
            {label}
          </span>
          <span className="h-px w-8 bg-gradient-to-r from-transparent via-brand-purple/50 to-transparent" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy tracking-tight leading-[1.08]">
        {title}
      </h2>
      {description && (
        <p className={`mt-5 text-lg text-text-secondary leading-relaxed ${center ? "mx-auto max-w-2xl" : ""}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
