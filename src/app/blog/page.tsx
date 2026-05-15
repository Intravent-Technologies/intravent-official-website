"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import { useSiteData } from "@/context/SiteDataContext";

export default function Blog() {
  const { blog: blogPosts } = useSiteData();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))],
    [blogPosts]
  );
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    let posts = active === "All" ? blogPosts : blogPosts.filter((p) => p.category === active);
    if (search.trim()) {
      const q = search.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [blogPosts, active, search]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.04]" />
        <div className="absolute top-16 right-[-5rem] w-72 h-72 border border-brand-purple/10 rounded-full animate-float-slow" />
        <div className="absolute bottom-16 left-[-3rem] w-48 h-48 border border-brand-purple/10 rounded-full animate-float" />
        <div className="absolute top-1/3 right-[25%] w-40 h-40 border border-brand-navy/5 rounded-full animate-float-slow" />
        <div className="absolute top-1/3 right-[10%] w-72 h-72 bg-glow-purple opacity-20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-[5%] w-64 h-64 bg-glow-navy opacity-15 rounded-full blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-pulse" />
              Our Insights
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-tight mb-4">
              Latest Thinking in <span className="text-brand-purple">Tech & Engineering</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-2xl">
              Expert perspectives on AI, cloud architecture, mobile development, and digital transformation from the Intravent team.
            </p>
          </motion.div>
        </div>
      </section>

      <Section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  active === cat
                    ? "bg-brand-purple text-white shadow-md shadow-brand-purple/20"
                    : "text-text-secondary hover:text-brand-navy bg-bg-secondary hover:bg-bg-tertiary border border-border-light"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-light bg-white text-sm text-brand-navy placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple/50 transition-all"
            />
          </div>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-10"
          >
            <a href={`/blog/${featured.id}`} className="group block">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-brand-navy to-brand-purple-700">
                <div className="aspect-[21/9] md:aspect-[3/1] relative">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-sm">
                      {featured.category}
                    </span>
                    <span className="text-xs text-white/70">{featured.readTime}</span>
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-white mb-2 group-hover:underline decoration-white/30 underline-offset-4">
                    {featured.title}
                  </h2>
                  <p className="text-sm md:text-base text-white/80 max-w-2xl line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 mt-4 text-xs text-white/60">
                    <span>{featured.author}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span>{featured.date}</span>
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={active + search}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {rest.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post, i) => (
                  <BlogCard key={post.id} {...post} index={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-purple-50 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-brand-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-text-tertiary">No articles found matching your criteria.</p>
                <button
                  onClick={() => { setActive("All"); setSearch(""); }}
                  className="mt-3 text-sm text-brand-purple hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </Section>

    </>
  );
}
