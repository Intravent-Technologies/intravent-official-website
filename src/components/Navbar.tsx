"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/data/site";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
];

const serviceSubLinks = [
  { label: "Intravent Tech Services", href: "/services/tech" },
  { label: "Intravent Consulting", href: "/services/consulting" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) return null;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out bg-white ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobile}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-[200px] h-[200px] shrink-0 pl-4 md:pl-6"
            >
              <img src="/images/logo.png" alt={site.name} className="w-full h-full object-contain" />
            </motion.div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`nav-link text-sm font-medium px-0 py-2 ${
                  pathname === link.href ? "active" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative group">
              <button
                className={`nav-link text-sm font-medium px-0 py-2 flex items-center gap-1.5 ${
                  pathname.startsWith("/services") ? "active" : ""
                }`}
              >
                Services
                <svg className="w-3.5 h-3.5 mt-0.5 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <div className="bg-white rounded-xl shadow-xl border border-border-light py-2 min-w-[220px]">
                  {serviceSubLinks.map((sub) => (
                    <Link
                      key={sub.href}
                      href={sub.href}
                      className="block px-4 py-2.5 text-sm text-text-secondary hover:text-brand-purple hover:bg-brand-navy-50 transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-brand-purple text-white text-sm font-medium overflow-hidden transition-all duration-300 hover:bg-brand-purple-600 hover:shadow-lg hover:shadow-brand-purple/20 active:scale-[0.97]"
            >
              Contact Us
            </Link>
          </div>

          <button
            className="lg:hidden relative z-50 w-12 h-12 rounded-full flex items-center justify-center text-text-secondary hover:text-brand-navy hover:bg-brand-navy-50 active:scale-90 transition-all duration-200"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-[22px] h-[18px]">
              <span
                className={`absolute right-0 block w-full h-[3px] rounded-full bg-current origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  mobileOpen
                    ? "top-1/2 -translate-y-1/2 rotate-[225deg] scale-x-[1.15]"
                    : "top-0"
                }`}
              />
              <span
                className={`absolute right-0 block w-[14px] h-[3px] rounded-full bg-current origin-center transition-all duration-[350ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  mobileOpen
                    ? "top-1/2 -translate-y-1/2 opacity-0 scale-x-0"
                    : "top-1/2 -translate-y-1/2"
                }`}
              />
              <span
                className={`absolute right-0 block w-full h-[3px] rounded-full bg-current origin-center transition-all duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                  mobileOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-[225deg] scale-x-[1.15]"
                    : "bottom-0"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden border-t border-border-light bg-white/98 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`block py-3 text-sm font-medium transition-colors ${
                    pathname === link.href ? "text-brand-purple" : "text-text-primary hover:text-brand-purple"
                  }`}
                  onClick={closeMobile}
                >
                  {link.label}
                </Link>
              ))}
              <div className="py-2">
                <p className="text-xs font-semibold tracking-wider uppercase text-text-tertiary mb-1">Services</p>
                {serviceSubLinks.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`block py-2.5 pl-4 text-sm font-medium transition-colors border-l-2 ${
                      pathname === sub.href ? "text-brand-purple border-brand-purple" : "text-text-secondary border-transparent hover:text-brand-purple hover:border-brand-purple/30"
                    }`}
                    onClick={closeMobile}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/contact"
                className="block mt-6 text-center px-5 py-3.5 rounded-xl bg-brand-purple text-white text-sm font-medium hover:bg-brand-purple-600 transition-colors"
                onClick={closeMobile}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
