"use client";

import Card from "./Card";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export default function TestimonialCard({
  name,
  role,
  content,
  rating,
}: TestimonialCardProps) {
  return (
    <Card className="p-8 flex flex-col relative">
      <svg
        className="absolute top-6 right-6 w-10 h-10 text-brand-purple-100"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <div className="flex gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <blockquote className="text-sm text-text-secondary leading-relaxed flex-1 relative z-10">
        &ldquo;{content}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-5 mt-5 border-t border-border-light">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple-100 to-brand-navy-100 flex items-center justify-center">
          <span className="text-xs font-semibold text-brand-purple">
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-navy">{name}</p>
          <p className="text-xs text-text-tertiary">{role}</p>
        </div>
      </div>
    </Card>
  );
}
