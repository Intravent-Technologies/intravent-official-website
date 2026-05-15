"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";
import ServiceCard from "@/components/ServiceCard";

const techServiceIds = ["web-development", "software-development", "mobile-app-development", "cybersecurity", "product-design", "java-development"];

export default function TechServices() {
  const { services } = useSiteData();
  const filtered = services.filter((s) => techServiceIds.includes(s.id));

  return (
    <>
      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden bg-brand-navy">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.3 }}>
          <source src="/videos/tech-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-navy to-brand-purple/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(111,79,232,0.15),transparent_60%)]" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm text-brand-purple-300 hover:text-white transition-colors mb-8 group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All Services
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-brand-purple-300/50" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Tech Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight">
              Technology{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-300 to-accent-blue">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">
              Digital products, platforms, and engineering solutions built for performance and scale.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Engineering Excellence Across the Stack</h2>
            <p className="text-text-secondary mt-4 max-w-xl">From front-end to infrastructure, we deliver end-to-end technology solutions tailored to your business.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <ServiceCard
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  label="Tech Service"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
