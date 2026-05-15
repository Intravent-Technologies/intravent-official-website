"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteDataContext";
import TeamCard from "@/components/TeamCard";
import TrustedCompanies from "@/components/TrustedCompanies";
import {
  services,
  testimonials,
  portfolioProjects,
  stats,
  heroStats,
  whyIntravent,
  faqs,
  contactInfo,
} from "@/data/site";

function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {children}
      </div>
    </section>
  );
}

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-16">
      {subtitle && (
        <p className="text-sm font-semibold tracking-[0.15em] uppercase text-brand-purple mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="heading-lg text-brand-navy">{title}</h2>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustedCompanies />
      <MissionSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FounderSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-navy pt-16">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.35 }}
      >
        <source src="/videos/tech-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy via-brand-navy to-brand-purple/30" style={{ opacity: 0.9 }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex items-center gap-12 lg:gap-16">
          <div className="flex-1 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-[-0.03em]"
            >
              Building Technology, Talent, and Infrastructure for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-300 to-accent-blue">the Modern World</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-lg md:text-xl text-brand-navy-200 max-w-2xl leading-relaxed"
            >
              A global technology ecosystem designing digital systems, developing human capital, and delivering smart infrastructure for enterprises, governments, and emerging markets.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <a href="/contact" className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:opacity-90 transition-all">
                Contact Us
              </a>
              <a href="#about" className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all">
                Learn more
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 grid grid-cols-2 gap-8 max-w-sm"
            >
              {heroStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white">{s.value}</div>
                  <div className="text-sm text-brand-navy-200 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="hidden lg:block flex-1 max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
                  <defs>
                    <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#6F4FE8" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#2F75F2" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2F75F2" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#6F4FE8" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="g3" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#6F4FE8" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2F75F2" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <motion.circle cx="250" cy="250" r="180" stroke="url(#g1)" strokeWidth="1" animate={{ rotate: 360 }} style={{ transformOrigin: "250px 250px" }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
                  <motion.circle cx="250" cy="250" r="140" stroke="url(#g2)" strokeWidth="0.5" animate={{ rotate: -360 }} style={{ transformOrigin: "250px 250px" }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
                  <motion.circle cx="250" cy="250" r="100" stroke="url(#g3)" strokeWidth="0.5" animate={{ rotate: 360 }} style={{ transformOrigin: "250px 250px" }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
                  <motion.circle cx="250" cy="250" r="60" fill="#6F4FE8" fillOpacity="0.08" animate={{ scale: [1, 1.1, 1] }} style={{ transformOrigin: "250px 250px" }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
                  <circle cx="250" cy="250" r="8" fill="#6F4FE8" fillOpacity="0.4" />
                  {[[120,100],[380,100],[100,250],[400,250],[150,380],[350,380],[250,70],[250,430],[70,250],[430,250]].map(([cx,cy],i) => (
                    <motion.circle key={i} cx={cx} cy={cy} r="3" fill="#2F75F2" fillOpacity="0.6" animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }} />
                  ))}
                  <line x1="120" y1="100" x2="250" y2="250" stroke="#6F4FE8" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="380" y1="100" x2="250" y2="250" stroke="#6F4FE8" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="100" y1="250" x2="250" y2="250" stroke="#2F75F2" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="400" y1="250" x2="250" y2="250" stroke="#2F75F2" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="150" y1="380" x2="250" y2="250" stroke="#6F4FE8" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="350" y1="380" x2="250" y2="250" stroke="#6F4FE8" strokeOpacity="0.12" strokeWidth="1" />
                  <line x1="250" y1="70" x2="250" y2="250" stroke="#2F75F2" strokeOpacity="0.1" strokeWidth="1" />
                  <line x1="250" y1="430" x2="250" y2="250" stroke="#2F75F2" strokeOpacity="0.1" strokeWidth="1" />
                  <rect x="80" y="80" width="340" height="340" rx="40" stroke="#6F4FE8" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="8 8" />
                  <path d="M160 180 L180 160 L200 180 L220 160 L240 180" stroke="#6F4FE8" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M260 320 L280 300 L300 320 L320 300 L340 320" stroke="#2F75F2" strokeOpacity="0.15" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-bg-primary">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-brand-navy leading-[1.2]"
        >
          At Intravent, we are building the systems, talent, and infrastructure{" "}
          <span className="text-gradient">shaping the future of Africa</span>{" "}
          and the global digital economy.
        </motion.p>
      </div>
    </section>
  );
}

const techServiceIds = ["web-development", "software-development", "mobile-app-development", "cybersecurity", "product-design", "java-development"];
const consultingServiceIds = ["solar-installation", "professional-training"];

const techIcons: Record<string, React.ReactNode> = {
  "web-development": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />,
  "software-development": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />,
  "mobile-app-development": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
  "cybersecurity": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
  "product-design": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />,
  "java-development": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
};

const consultingIcons: Record<string, React.ReactNode> = {
  "solar-installation": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />,
  "professional-training": <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m0 0a6.023 6.023 0 01-2.77-.896m0 0a6.023 6.023 0 01-2.77-.896" />,
};

const techServices = services.filter((s) => techServiceIds.includes(s.id));
const consultingServices = services.filter((s) => consultingServiceIds.includes(s.id));

function CategoryCard({
  title,
  tagline,
  services,
  iconMap,
  href,
  delay = 0,
}: {
  title: string;
  tagline: string;
  services: { id: string; title: string }[];
  iconMap: Record<string, React.ReactNode>;
  href: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="group block h-full">
        <div className={`relative rounded-3xl overflow-hidden h-full transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-1`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${title === "Intravent Tech Services" ? "from-brand-purple to-accent-blue" : "from-emerald-600 to-teal-600"} opacity-95`} />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.12),transparent_60%)]" />
          <div className="relative p-8 md:p-10 h-full flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center shrink-0 border border-white/10`}>
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {title === "Intravent Tech Services" ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
                  )}
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <p className="text-sm text-white/60">{tagline}</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {services.map((s) => (
                <div key={s.id} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-white/5 border border-white/5 group/item hover:bg-white/10 transition-colors">
                  <svg className="w-5 h-5 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {iconMap[s.id]}
                  </svg>
                  <span className="text-sm text-white/80 group-hover/item:text-white transition-colors">{s.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{services.length} offering{services.length !== 1 ? "s" : ""}</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-full group-hover:bg-white/20 transition-all">
                Explore {title === "Intravent Tech Services" ? "tech" : "consulting"}
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ServicesSection() {
  return (
    <section className="py-24 md:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">What We Offer</span>
          <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mt-4 tracking-tight">Everything We Do</h2>
          <p className="text-text-secondary mt-4 max-w-lg mx-auto">From custom software to professional certification — we cover the full spectrum.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <CategoryCard
            title="Intravent Tech Services"
            tagline="Digital products &amp; engineering"
            services={techServices}
            iconMap={techIcons}
            href="/services/tech"
          />
          <CategoryCard
            title="Intravent Consulting"
            tagline="Training, certification &amp; advisory"
            services={consultingServices}
            iconMap={consultingIcons}
            href="/services/consulting"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader subtitle="Why we're the right choice" title="At Intravent, we don't just deliver services—we create solutions that drive real impact." />
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-center p-8 rounded-2xl bg-bg-secondary border border-border-light"
            >
              <div className="text-4xl md:text-5xl font-bold text-brand-purple mb-2">{s.value}</div>
              <div className="text-sm text-text-secondary font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section className="py-24 md:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader subtitle="Success You Can See" title="A glimpse into our most impactful projects and success stories." />
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {portfolioProjects.slice(0, 2).map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl bg-white border border-border-light overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img src={project.image || project.gallery?.[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-base font-bold text-brand-navy mb-2">{project.title}</h3>
                <p className="text-xs text-text-tertiary mb-3 line-clamp-2">{project.description}</p>
                {project.gallery && project.gallery.length > 0 && (
                  <div className="flex gap-1.5 mb-3">
                    {project.gallery.slice(0, 2).map((g, gi) => (
                      <div key={gi} className="w-full h-14 rounded-lg overflow-hidden bg-bg-secondary">
                        <img src={g} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {project.results.map((r) => (
                    <span key={r} className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ backgroundColor: (project.color || "#6F4FE8") + "15", color: project.color || "#6F4FE8" }}>
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all"
          >
            View All Case Studies
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="py-24 md:py-28">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader subtitle="Why Intravent Stands Out" title="Here's how Intravent delivers more value, clarity, and results." />
        <div className="grid md:grid-cols-2 gap-8">
          {whyIntravent.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, x: i === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`p-8 rounded-2xl ${
                col.highlighted
                  ? "bg-brand-navy text-white"
                  : "bg-bg-secondary border border-border-light"
              }`}
            >
              <h3 className={`text-xl font-bold mb-6 ${col.highlighted ? "text-white" : "text-brand-navy"}`}>
                {col.title}
              </h3>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${col.highlighted ? "bg-brand-purple-300" : "bg-brand-purple"}`} />
                    <span className={col.highlighted ? "text-brand-navy-200" : "text-text-secondary"}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-28 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <SectionHeader subtitle="What Our Clients Say" title="Our clients' words reflect our commitment to excellence." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="p-8 rounded-2xl bg-white border border-border-light"
            >
              <p className="text-text-secondary text-sm leading-relaxed mb-6 italic">&ldquo;{t.content}&rdquo;</p>
              <div>
                <div className="font-bold text-brand-navy text-sm">{t.name}</div>
                <div className="text-text-tertiary text-xs">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FounderSection() {
  const { team } = useSiteData();
  return (
    <section id="team" className="py-24 md:py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,79,232,0.04),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Leadership</span>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-navy mt-3">Meet Our Group Chairman</h2>
          <p className="text-text-secondary mt-3 max-w-lg mx-auto">Leading Intravent with vision, purpose, and decades of experience.</p>
        </motion.div>
        <div className="max-w-6xl mx-auto">
          {team.filter((m) => m.role === "Group Chairman").map((m) => (
            <TeamCard key={m.id} member={m} featured />
          ))}
          {team.filter((m) => m.role !== "Group Chairman").length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {team.filter((m) => m.role !== "Group Chairman").map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                >
                  <TeamCard member={m} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-28 bg-bg-secondary">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <SectionHeader subtitle="Your questions, answered." title="Find quick answers to common queries." />
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-2xl bg-white border border-border-light overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-brand-navy text-sm pr-4">{faq.question}</span>
                <svg
                  className={`w-5 h-5 shrink-0 text-text-tertiary transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-6 pb-6 text-text-secondary text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,79,232,0.12),transparent_60%)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mb-6">
          Ready to elevate your brand and unlock sustainable growth?
        </h2>
        <p className="text-brand-navy-200 text-lg mb-10">
          With years of experience, we&apos;ve helped businesses generate millions. Partner with us to scale confidently.
        </p>
        <a
          href="/contact"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:opacity-90 transition-all"
        >
          Get started
        </a>
      </div>
    </section>
  );
}
