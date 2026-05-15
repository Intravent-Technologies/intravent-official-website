import Link from "next/link";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  label?: string;
}

export default function ServiceCard({ id, title, description, icon, label }: ServiceCardProps) {
  return (
    <Link href={`/services/${id}`} className="group block h-full">
      <div className="relative rounded-2xl bg-white border border-border-light h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden bg-brand-navy">
          {icon && (
            <img
              src={icon}
              alt={title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6 flex-1 flex flex-col">
          {label && (
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
              <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-brand-purple">
                {label}
              </span>
            </div>
          )}
          <h3 className="text-lg font-bold text-brand-navy mb-2 group-hover:text-brand-purple transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-text-secondary leading-relaxed flex-1 line-clamp-3">
            {description}
          </p>
          <div className="mt-5 pt-4 border-t border-border-light flex items-center justify-between">
            <span className="text-sm font-semibold text-brand-purple group-hover:gap-2 transition-all inline-flex items-center gap-1.5">
              Learn more
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
            <span className="text-xs text-text-tertiary">Explore →</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
