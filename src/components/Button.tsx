"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-medium transition-all duration-300 tracking-tight";

  const sizes = {
    sm: "px-4 py-2 text-sm rounded-lg gap-1.5",
    md: "px-6 py-3 text-sm rounded-xl gap-2",
    lg: "px-8 py-4 text-base rounded-xl gap-2.5",
  };

  const variants = {
    primary:
      "bg-gradient-to-br from-brand-purple to-accent-blue text-white hover:from-brand-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg hover:shadow-brand-purple/20",
    secondary:
      "bg-brand-navy text-white hover:bg-brand-navy-600 shadow-md hover:shadow-lg hover:shadow-brand-navy/20",
    outline:
      "border border-border-medium text-text-secondary hover:border-brand-purple hover:text-brand-purple hover:bg-brand-purple-50/60",
    ghost:
      "text-text-secondary hover:text-brand-navy hover:bg-brand-navy-50/60",
    white:
      "bg-white text-black hover:bg-white/90 shadow-md hover:shadow-lg",
  };

  const content = (
    <>
      {children}
      {(variant === "primary" || variant === "secondary") && (
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      )}
    </>
  );

  const classes = `${base} ${sizes[size]} ${variants[variant]} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <Link href={disabled ? "" : href} className={classes} onClick={disabled ? (e) => e.preventDefault() : undefined}>
        {content}
      </Link>
    );
  }

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </motion.button>
  );
}
