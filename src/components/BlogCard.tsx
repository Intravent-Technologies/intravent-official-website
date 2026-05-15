import Link from "next/link";
import { motion } from "framer-motion";

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  index?: number;
}

export default function BlogCard({
  id, title, excerpt, category, author, date, readTime, image, index = 0,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/blog/${id}`} className="group block h-full">
        <article className="card-premium overflow-hidden h-full flex flex-col relative">
          <div className="aspect-[16/9] overflow-hidden relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-brand-purple shadow-sm">
                {category}
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-text-secondary shadow-sm">
                {readTime}
              </span>
            </div>
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-brand-navy mb-2 group-hover:text-brand-purple transition-colors leading-snug line-clamp-2">
              {title}
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-3 mb-4">
              {excerpt}
            </p>
            <div className="flex items-center gap-3 pt-4 border-t border-border-light">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-accent-blue flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {author.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div className="flex items-center gap-2 text-xs text-text-tertiary min-w-0">
                <span className="truncate font-medium text-text-secondary">{author}</span>
                <span className="w-1 h-1 rounded-full bg-border-medium shrink-0" />
                <span className="shrink-0">{date}</span>
              </div>
              <div className="ml-auto">
                <svg className="w-4 h-4 text-brand-purple -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
