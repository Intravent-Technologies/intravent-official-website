"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  shortBio: string;
  tags: string[];
  linkedin: string;
  displayOrder: number;
}

function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 backdrop-blur-md pt-16 md:pt-24 px-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
      >
        <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-md rounded-t-3xl border-b border-border-light px-8 md:px-10 py-4 flex items-center justify-between">
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-brand-navy truncate">{member.name}</h2>
            <p className="text-xs text-brand-purple font-semibold uppercase tracking-wider">{member.role}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-bg-secondary flex items-center justify-center hover:bg-border-light transition-colors shrink-0 ml-4">
            <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 md:p-10">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="w-full max-w-xs mx-auto aspect-square rounded-full overflow-hidden shadow-lg ring-2 ring-brand-purple/10">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="md:col-span-3">
              {member.shortBio && (
                <p className="text-xs text-text-tertiary mb-5">{member.shortBio}</p>
              )}
              <div className="space-y-3 text-sm text-text-secondary leading-relaxed">
                {member.bio.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {member.tags && member.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6">
                  {member.tags.map((t) => (
                    <span key={t} className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-purple/5 text-brand-purple border border-brand-purple/10">
                      {t}
                    </span>
                  ))}
                </div>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-full bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy-700 transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  View on LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TeamCardInner({ member, featured, onViewProfile }: { member: TeamMember; featured?: boolean; onViewProfile: (m: TeamMember) => void }) {
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid lg:grid-cols-5 gap-10 items-start bg-gradient-to-br from-brand-purple/[0.03] to-accent-blue/[0.03] rounded-3xl p-8 md:p-10 border border-brand-purple/10">
          <div className="lg:col-span-2">
            <div className="w-full max-w-xs mx-auto aspect-square rounded-full overflow-hidden shadow-xl ring-2 ring-brand-purple/10">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="inline-block px-3 py-1 rounded-full bg-brand-purple/10 text-brand-purple text-xs font-semibold uppercase tracking-wider mb-4">Group Chairman</div>
            <h3 className="text-3xl font-bold text-brand-navy mb-2">{member.name}</h3>
            <p className="text-xs text-text-tertiary mb-6">{member.shortBio || member.tags?.join(" | ")}</p>
            <div className="space-y-4 text-text-secondary leading-relaxed line-clamp-6">
              {member.bio.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <button
                onClick={() => onViewProfile(member)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-brand-purple to-accent-blue text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-purple/20 hover:-translate-y-0.5 transition-all"
              >
                View Full Profile
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border-light text-text-secondary text-sm font-medium hover:bg-brand-navy-50 hover:text-brand-navy transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="group rounded-2xl bg-white border border-border-light overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="p-6 pb-0">
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-md ring-2 ring-brand-purple/10">
          <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      </div>
      <div className="p-5 text-center">
        <p className="text-xs font-semibold text-brand-purple uppercase tracking-wider mb-1">{member.role}</p>
        <h3 className="text-lg font-bold text-brand-navy mb-2">{member.name}</h3>
        {member.tags && member.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4 justify-center">
            {member.tags.slice(0, 2).map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded-full bg-brand-purple/5 text-brand-purple border border-brand-purple/10">{t}</span>
            ))}
          </div>
        )}
        <button
          onClick={() => onViewProfile(member)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple group-hover:gap-2.5 transition-all"
        >
          View Full Profile
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function TeamCard({ member, featured }: { member: TeamMember; featured?: boolean }) {
  const [selected, setSelected] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selected]);

  return (
    <>
      <TeamCardInner member={member} featured={featured} onViewProfile={setSelected} />
      {selected && <ProfileModal member={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
