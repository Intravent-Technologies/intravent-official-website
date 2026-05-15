"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSiteData } from "@/context/SiteDataContext";

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

function CategoryCard({
  title,
  tagline,
  services,
  iconMap,
  href,
  gradientFrom,
  gradientTo,
  accentColor,
  delay = 0,
}: {
  title: string;
  tagline: string;
  services: { id: string; title: string }[];
  iconMap: Record<string, React.ReactNode>;
  href: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
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
          <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-95`} />
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
                  <svg className={`w-5 h-5 shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {iconMap[s.id]}
                  </svg>
                  <span className="text-sm text-white/80 group-hover/item:text-white transition-colors">{s.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-sm font-medium text-white/60 group-hover:text-white transition-colors">{services.length} offering{services.length !== 1 ? "s" : ""}</span>
              <span className={`inline-flex items-center gap-1.5 text-sm font-medium text-white bg-white/10 px-4 py-2 rounded-full group-hover:bg-white/20 transition-all`}>
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

export default function Services() {
  const { services } = useSiteData();
  const techServices = services.filter((s) => techServiceIds.includes(s.id));
  const consultingServices = services.filter((s) => consultingServiceIds.includes(s.id));

  const steps = [
    { num: "01", title: "Discover", desc: "We dive deep into your business goals, challenges, and vision to define the right strategy.", color: "from-brand-purple to-accent-blue" },
    { num: "02", title: "Build", desc: "Our team engineers solutions using modern architectures, rigorous testing, and agile delivery.", color: "from-accent-blue to-blue-600" },
    { num: "03", title: "Scale", desc: "We deploy, monitor, and optimize continuously ensuring your solution grows with your business.", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <>
      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden bg-brand-navy">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.3 }}>
          <source src="/videos/tech-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/90 via-brand-navy to-brand-purple/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(111,79,232,0.15),transparent_60%)]" />
        <div className="absolute top-20 right-1/4 w-64 h-64 rounded-full border border-white/5 animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-brand-purple/10 animate-float" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-brand-purple-300/50" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Our Services</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight">
              What We{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-300 via-purple-200 to-accent-blue">Deliver</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">
              End-to-end technology solutions designed to help businesses build, scale, and compete in the modern digital landscape.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 flex flex-wrap gap-8"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">200+</span>
              <span className="text-sm text-white/50 max-w-[80px]">Projects delivered</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">50+</span>
              <span className="text-sm text-white/50 max-w-[80px]">Enterprise clients</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">8</span>
              <span className="text-sm text-white/50 max-w-[80px]">Service offerings</span>
            </div>
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
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Two Pillars</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mt-4 tracking-tight">Everything We Do</h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto">From custom software to professional certification — we cover the full spectrum.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            <CategoryCard
              title="Intravent Tech Services"
              tagline="Digital products &amp; engineering"
              services={techServices}
              iconMap={techIcons}
              href="/services/tech"
              gradientFrom="from-brand-purple"
              gradientTo="to-accent-blue"
              accentColor="brand-purple"
            />
            <CategoryCard
              title="Intravent Consulting"
              tagline="Training, certification &amp; advisory"
              services={consultingServices}
              iconMap={consultingIcons}
              href="/services/consulting"
              gradientFrom="from-emerald-600"
              gradientTo="to-teal-600"
              accentColor="emerald"
              delay={0.1}
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(111,79,232,0.04),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Our Approach</span>
            <h2 className="text-3xl md:text-5xl font-bold text-brand-navy mt-4 tracking-tight">How We Deliver</h2>
            <p className="text-text-secondary mt-4 max-w-lg mx-auto">A proven three-phase methodology that ensures quality at every step.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-px bg-gradient-to-r from-brand-purple/20 via-brand-purple to-brand-purple/20" />
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <h3 className="text-xl font-bold text-brand-navy mb-3">{step.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,79,232,0.12),transparent_60%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Get Started</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mt-4 mb-6">
              Ready to Build Something Great?
            </h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
              Tell us about your project and we&apos;ll put together a tailored proposal.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all"
            >
              Start a Conversation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
