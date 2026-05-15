"use client";

import Link from "next/link";

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  results: string[];
  color: string;
  image: string;
  gallery?: string[];
  timeline?: string;
}

export default function PortfolioCard({ id, title, category, tags, description, results, color, image, gallery, timeline }: PortfolioCardProps) {
  return (
    <Link href={`/portfolio/${id}`} className="group block h-full">
      <div className="relative rounded-2xl overflow-hidden h-full bg-white border border-border-light transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <span className="inline-block text-xs font-semibold text-white/80 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                {category}
              </span>
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            {timeline && (
              <span className="text-xs text-white/60 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full shrink-0">{timeline}</span>
            )}
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>
          {gallery && gallery.length > 1 && (
            <div className="flex gap-1.5 mb-4">
              {gallery.slice(0, 3).map((g, gi) => (
                <div key={gi} className="w-full h-16 rounded-lg overflow-hidden bg-bg-secondary">
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {results.map((r) => (
              <span
                key={r}
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: color + "15", color: color }}
              >
                {r}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border-light">
            <div className="flex gap-1.5">
              {tags.slice(0, 2).map((t) => (
                <span key={t} className="text-xs text-text-tertiary bg-bg-secondary px-2 py-0.5 rounded-md">
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-purple group-hover:gap-2 transition-all">
              View case study
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
