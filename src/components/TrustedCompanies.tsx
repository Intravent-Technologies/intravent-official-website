"use client";

import { motion } from "framer-motion";
import { useSiteData } from "@/context/SiteDataContext";

export default function TrustedCompanies() {
  const { clients } = useSiteData();
  const activeClients = clients.filter((c) => c.active !== false);

  return (
    <section className="py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
            Trusted By
          </span>
        </motion.div>
        <div className="flex flex-wrap justify-center gap-4">
          {activeClients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.75rem)] lg:w-48"
            >
              <div className="p-6 rounded-2xl bg-white border border-border-light flex items-center justify-center h-24 transition-all duration-300 hover:border-brand-purple/20 hover:shadow-md hover:-translate-y-1">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-all duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
