"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
  glow?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
  delay = 0,
  glow = false,
}: CardProps) {
  if (glow) {
    return <div className={`card-glow ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover
          ? {
              y: -3,
              boxShadow:
                "0 8px 32px -8px rgba(91,45,142,0.12), 0 0 0 1px rgba(91,45,142,0.08)",
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      className={`card-premium ${className}`}
    >
      {children}
    </motion.div>
  );
}
