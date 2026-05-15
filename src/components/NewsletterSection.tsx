"use client";
import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { usePathname } from "next/navigation";

export default function NewsletterSection() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (pathname.startsWith("/admin")) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-brand-navy">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/95 via-brand-navy/80 to-brand-navy/60" />
        <div className="absolute inset-0 bg-soft-grid opacity-[0.04]" />
        <div className="absolute top-1/2 left-1/4 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl" />
      </div>
      <div className="relative z-10 mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/80 text-xs font-semibold tracking-[0.15em] uppercase mb-6">
            Newsletter
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Stay Ahead of the Curve
          </h2>
          <p className="mt-5 text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mx-auto">
            Get weekly insights on tech, digital strategy, and industry
            trends — straight from our experts.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-lg mx-auto"
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 p-1.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  required
                  disabled={status === "success"}
                  className="w-full px-5 py-4 bg-transparent text-white placeholder-white/40 text-sm focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-brand-purple to-accent-blue text-white text-sm font-semibold hover:shadow-lg hover:shadow-brand-purple/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 shrink-0"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </div>
            {message && (
              <p
                className={`mt-4 text-sm text-center ${
                  status === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
          </form>
          <p className="mt-4 text-xs text-white/30 text-center">
            No spam. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
