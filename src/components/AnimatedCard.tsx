"use client";

import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
  hover = true,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: "0 20px 48px -8px rgba(15,29,58,0.1)",
              transition: { duration: 0.25, ease: "easeOut" },
            }
          : undefined
      }
      className={`bg-white rounded-xl border border-border-light transition-colors duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
