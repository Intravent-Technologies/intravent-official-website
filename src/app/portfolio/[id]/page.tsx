"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useSiteData } from "@/context/SiteDataContext";

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
    >
      <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.img
        key={index}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        src={images[index]}
        alt=""
        className="max-w-full max-h-[90vh] rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`w-2 h-2 rounded-full transition-all ${i === index ? "bg-white w-6" : "bg-white/40"}`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function MetricCard({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative p-5 rounded-xl bg-white border border-border-light"
    >
      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-br from-brand-purple to-accent-blue bg-clip-text text-transparent">{value}</div>
      <div className="text-xs text-text-tertiary mt-1 font-medium">{label}</div>
    </motion.div>
  );
}

export default function PortfolioDetail() {
  const params = useParams();
  const { portfolio: projects } = useSiteData();
  const project = projects.find((p) => p.id === params.id);
  const hero = project?.image;
  const approach = project?.approach ?? [];
  const gallery = project?.gallery ?? [];
  const technologies = project?.technologies ?? [];
  const metrics = project?.metrics ?? [];
  const video = project?.video;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroParallaxY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  const related = projects.filter((p) => p.id !== project?.id).slice(0, 3);

  const sections = [
    ...(project?.overview ? [{ id: "overview", label: "Overview" }] : []),
    ...(project?.challenge ? [{ id: "challenge", label: "Challenge" }] : []),
    ...(project?.solution ? [{ id: "solution", label: "Solution" }] : []),
    ...(approach.length > 0 ? [{ id: "approach", label: "Approach" }] : []),
    ...(project?.testimonial ? [{ id: "testimonial", label: "Testimonial" }] : []),
  ];

  if (!project) {
    return (
      <section className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold text-brand-navy">Project not found</h1>
        <Link href="/portfolio" className="text-brand-purple mt-4 inline-block underline">Back to portfolio</Link>
      </section>
    );
  }

  return (
    <>
      <section ref={heroRef} className="relative pt-32 pb-28 md:pt-44 md:pb-40 overflow-hidden bg-brand-navy">
        <motion.div style={{ y: heroParallaxY, backgroundImage: `url(${hero})` }} className="absolute inset-0 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/95 via-brand-navy/90 to-brand-purple/50" />
        <motion.div style={{ opacity: heroOpacity }} className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <Link href="/portfolio" className="inline-flex items-center gap-1.5 text-sm text-brand-purple-300 hover:text-white transition-colors mb-8 group">
              <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Portfolio
            </Link>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-brand-purple-300/50" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Case Study</span>
              {project.timeline && (
                <>
                  <span className="h-px w-4 bg-white/20" />
                  <span className="text-xs font-medium text-white/40">{project.timeline}</span>
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.04] tracking-tight">{project.title}</h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">{project.description}</p>
            <div className="flex flex-wrap gap-2 mt-8">
              {project.tags?.map((t) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/70 border border-white/10 font-medium">{t}</span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {metrics.length > 0 && (
        <section className="relative z-10 -mt-14 pb-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((m, i) => (
                <MetricCard key={i} value={m.value} label={m.label} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 space-y-16">

              {project.overview && (
                <motion.div id="overview" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple/10 to-accent-blue/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Client Overview</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed text-lg">{project.overview}</p>
                </motion.div>
              )}

              {project.challenge && (
                <motion.div id="challenge" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">The Challenge</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-5">What Problem Did We Solve?</h2>
                  <p className="text-text-secondary leading-relaxed text-lg">{project.challenge}</p>
                </motion.div>
              )}

              {project.solution && (
                <motion.div id="solution" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.05 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Our Solution</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-5">How We Delivered</h2>
                  <p className="text-text-secondary leading-relaxed text-lg">{project.solution}</p>
                </motion.div>
              )}

              {approach.length > 0 && (
                <motion.div id="approach" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.1 }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-brand-purple/10 flex items-center justify-center">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Our Approach</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mb-5">How We Made It Happen</h2>
                  <div className="space-y-0">
                    {approach.map((step, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.1 }}
                        className="flex gap-5 group"
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition-colors ${
                            i === approach.length - 1
                              ? "bg-gradient-to-br from-brand-purple to-accent-blue text-white"
                              : "bg-brand-purple/10 text-brand-purple group-hover:bg-brand-purple/20"
                          }`}>
                            {i + 1}
                          </div>
                          {i < approach.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gradient-to-b from-brand-purple/20 to-transparent min-h-[24px] group-last:hidden" />
                          )}
                        </div>
                        <div className="pb-8 flex-1">
                          <p className="text-text-secondary leading-relaxed">{step}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {project.testimonial && (
                <motion.div id="testimonial" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, delay: 0.15 }}>
                  <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-br from-brand-purple/5 to-accent-blue/5 border border-brand-purple/10">
                    <svg className="absolute top-6 right-8 w-12 h-12 text-brand-purple/10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.69 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.69 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.271 0-2.404-.655-2.917-1.179z" />
                    </svg>
                    <blockquote className="text-lg md:text-xl text-brand-navy font-medium leading-relaxed relative mb-6">
                      &ldquo;{project.testimonial}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-accent-blue flex items-center justify-center text-white text-sm font-bold">
                        {project.testimonialAuthor?.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-navy">{project.testimonialAuthor}</div>
                        <div className="text-xs text-text-tertiary">Client</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="sticky top-28 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="p-8 rounded-2xl bg-bg-secondary border border-border-light"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Results</span>
                  </div>
                  <div className="space-y-4">
                    {project.results?.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.08 }}
                        className="flex items-center gap-3"
                      >
                        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: project.color + "15" }}>
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: project.color }}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-brand-navy">{r}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {technologies.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="p-8 rounded-2xl bg-bg-secondary border border-border-light"
                  >
                    <div className="flex items-center gap-2 mb-5">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                      </svg>
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Technologies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1.5 rounded-lg font-medium"
                          style={{ backgroundColor: project.color + "10", color: project.color }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="p-8 rounded-2xl bg-bg-secondary border border-border-light"
                >
                  <div className="flex items-center gap-2 mb-5">
                    <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15a2.25 2.25 0 012.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
                    </svg>
                    <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Project Info</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-text-tertiary font-medium">Category</span>
                      <p className="text-sm font-semibold text-brand-navy mt-0.5">{project.category}</p>
                    </div>
                    {project.timeline && (
                      <div>
                        <span className="text-xs text-text-tertiary font-medium">Timeline</span>
                        <p className="text-sm font-semibold text-brand-navy mt-0.5">{project.timeline}</p>
                      </div>
                    )}
                    <div>
                      <span className="text-xs text-text-tertiary font-medium">Services Rendered</span>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {project.tags?.map((t) => (
                          <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-white border border-border-light text-text-secondary font-medium">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>

                {sections.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="p-6 rounded-2xl bg-bg-secondary border border-border-light hidden lg:block"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                      <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">On This Page</span>
                    </div>
                    <nav className="space-y-1">
                      {sections.map((s) => (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className="block px-3 py-2 text-sm text-text-secondary hover:text-brand-purple hover:bg-brand-purple/5 rounded-lg transition-colors"
                        >
                          {s.label}
                        </a>
                      ))}
                    </nav>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {(gallery.length > 0 || video) && (
        <section className="py-20 md:py-28 bg-bg-secondary">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-brand-purple/30" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Gallery</span>
                <span className="h-px w-8 bg-brand-purple/30" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Project Highlights</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">A visual walkthrough of the work delivered for {project.title}.</p>
            </motion.div>
            <div className="space-y-6">
              {video && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl overflow-hidden bg-black border border-border-light shadow-lg"
                >
                  {/youtube|youtu\.be/.test(video) ? (
                    <iframe
                      src={video.replace(/.*(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+).*/, "https://www.youtube.com/embed/$1")}
                      className="w-full aspect-video"
                      allowFullScreen
                      title="Project video"
                    />
                  ) : /vimeo\.com/.test(video) ? (
                    <iframe
                      src={video.replace(/.*vimeo\.com\/(\d+).*/, "https://player.vimeo.com/video/$1")}
                      className="w-full aspect-video"
                      allowFullScreen
                      title="Project video"
                    />
                  ) : (
                    <video src={video} controls className="w-full aspect-video" />
                  )}
                </motion.div>
              )}
              {gallery.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((img, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.08 }}
                      className={`rounded-2xl overflow-hidden group cursor-pointer ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}
                      onClick={() => setLightboxIndex(i)}
                    >
                      <div className="relative overflow-hidden h-full">
                        <img
                          src={img}
                          alt={`${project.title} - Image ${i + 1}`}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                          style={{ aspectRatio: i === 0 ? undefined : "4/3", minHeight: i === 0 ? "320px" : undefined }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                            <svg className="w-5 h-5 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {lightboxIndex !== null && (
        <Lightbox images={gallery} index={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}

      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center mb-14"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-brand-purple/30" />
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">More Case Studies</span>
                <span className="h-px w-8 bg-brand-purple/30" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-navy">Similar Success Stories</h2>
              <p className="text-text-secondary mt-3 max-w-lg mx-auto">Explore more projects where we delivered measurable results.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <Link href={`/portfolio/${p.id}`} className="group block h-full">
                    <div className="rounded-2xl overflow-hidden border border-border-light bg-white hover:shadow-xl hover:shadow-brand-purple/5 transition-all duration-300 h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden shrink-0">
                        <img
                          src={p.image || p.gallery?.[0]}
                          alt={p.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 font-medium">{p.category}</span>
                          {p.timeline && (
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/20 font-medium">{p.timeline}</span>
                          )}
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-bold text-brand-navy group-hover:text-brand-purple transition-colors">{p.title}</h3>
                        <p className="text-sm text-text-tertiary mt-1.5 line-clamp-2">{p.description}</p>
                        {p.gallery && p.gallery.length > 1 && (
                          <div className="flex gap-1.5 mt-4">
                            {p.gallery.slice(0, 3).map((g, gi) => (
                              <div key={gi} className="w-full h-16 rounded-lg overflow-hidden bg-bg-secondary">
                                <img src={g} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border-light mt-auto">
                          {p.results?.slice(0, 3).map((r, ri) => (
                            <span
                              key={ri}
                              className="text-[11px] font-semibold px-2 py-1 rounded-md"
                              style={{ backgroundColor: (p.color || "#6F4FE8") + "12", color: p.color || "#6F4FE8" }}
                            >
                              {r}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-purple group-hover:gap-2.5 transition-all">
                          View Case Study
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-32 bg-brand-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,79,232,0.12),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Let&apos;s Build Together</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-[1.1] mt-4 mb-6">Ready to Achieve Similar Results?</h2>
            <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">Tell us about your project and we&apos;ll create a tailored plan to drive real growth for your business.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all">
              Start Your Project
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
