"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import PortfolioCard from "@/components/PortfolioCard";
import { useSiteData } from "@/context/SiteDataContext";

export default function Portfolio() {
  const { portfolio: portfolioProjects, services } = useSiteData();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const serviceTitles = services.map((s) => s.title);
    return ["All", ...serviceTitles];
  }, [services]);

  const filtered =
    activeCategory === "All"
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const aggregateMetrics = useMemo(() => {
    const allResults = portfolioProjects.flatMap((p) => p.results ?? []);
    const numPattern = /(\d+)%/g;
    const pcts: number[] = [];
    for (const r of allResults) {
      const matches = [...r.matchAll(numPattern)];
      for (const m of matches) pcts.push(parseInt(m[1]));
    }
    const avg = pcts.length > 0 ? Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length) : 0;
    return { projects: portfolioProjects.length, avgGrowth: avg, totalResults: allResults.length };
  }, [portfolioProjects]);

  return (
    <>
      <section className="relative pt-32 pb-28 md:pt-40 md:pb-36 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(111,79,232,0.12),transparent_60%)]" />
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full border border-white/5 animate-float-slow" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full border border-brand-purple/10 animate-float" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-brand-purple-300/50" />
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Our Work</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-[1.04] tracking-tight">
              Solutions That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-300 to-accent-blue">Deliver Results</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed mt-6 max-w-2xl">
              Explore our portfolio of successful projects that have helped businesses transform their digital capabilities and achieve measurable impact.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 flex flex-wrap gap-8"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">{aggregateMetrics.projects}+</span>
              <span className="text-sm text-white/50 max-w-[80px]">Projects delivered</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">{aggregateMetrics.avgGrowth}%</span>
              <span className="text-sm text-white/50 max-w-[80px]">Avg. growth achieved</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-white">{aggregateMetrics.totalResults}+</span>
              <span className="text-sm text-white/50 max-w-[80px]">Key results delivered</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple">Filter by</span>
              <h2 className="text-2xl md:text-3xl font-bold text-brand-navy mt-1">Case Studies</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "text-white"
                      : "text-text-secondary bg-white border border-border-light hover:border-brand-purple/30 hover:text-brand-navy"
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {activeCategory === category && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-purple to-accent-blue"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </motion.button>
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <PortfolioCard
                    id={project.id}
                    title={project.title}
                    category={project.category}
                    tags={project.tags}
                    description={project.description}
                    results={project.results}
                    color={project.color}
                    image={project.image}
                    gallery={project.gallery}
                    timeline={project.timeline}
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <p className="text-text-secondary mb-4">No projects found in this category.</p>
              <button onClick={() => setActiveCategory("All")} className="text-brand-purple font-medium hover:underline">
                View all projects
              </button>
            </motion.div>
          )}

          {portfolioProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-16 p-8 md:p-10 rounded-2xl bg-brand-navy relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(111,79,232,0.12),transparent_60%)]" />
              <div className="relative z-10 text-center">
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-brand-purple-300">Let&apos;s Build Together</span>
                <h3 className="text-2xl md:text-3xl font-bold text-white mt-3 mb-4">Have a Project in Mind?</h3>
                <p className="text-white/50 max-w-lg mx-auto mb-8">Let&apos;s discuss how we can help you achieve similar results for your business.</p>
                <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white font-semibold text-sm hover:shadow-xl hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all">
                  Start a Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
