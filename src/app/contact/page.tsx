"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Section, { SectionHeader } from "@/components/Section";
import Button from "@/components/Button";
import AnimatedSection from "@/components/AnimatedSection";
import { contactInfo } from "@/data/site";

const inputClass = "w-full px-4 py-3.5 rounded-xl bg-white border border-border-light text-brand-navy placeholder-text-tertiary text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple/40 transition-all";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/admin/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-soft-grid opacity-[0.02]" />
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute bottom-10 right-20 w-48 h-48 rounded-full border border-brand-navy/10 animate-float" />
        <div className="absolute top-40 right-1/4 w-32 h-32 rounded-full border border-brand-purple/10 animate-float-slow" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-glow-purple opacity-20" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
          <AnimatedSection>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-brand-purple/40" />
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                  Contact Us
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-navy tracking-tight leading-tight mb-6">
                Let&apos;s Start a{" "}
                <span className="text-brand-purple">Conversation</span>
              </h1>
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-2xl">
                Whether you have a project in mind, a partnership opportunity, or
                just want to learn more — we&apos;d love to hear from you.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Section>
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="p-6 rounded-2xl bg-white border border-border-light shadow-sm">
              <h3 className="text-sm font-semibold text-brand-navy mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                Contact Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Email</p>
                    <p className="text-sm font-medium text-brand-navy">{contactInfo.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-text-tertiary">Phone</p>
                    <p className="text-sm font-medium text-brand-navy">{contactInfo.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-border-light shadow-sm">
              <h3 className="text-sm font-semibold text-brand-navy mb-5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                Office Hours
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-border-light last:border-0">
                  <span className="text-text-secondary">Monday - Friday</span>
                  <span className="font-medium text-brand-navy">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light last:border-0">
                  <span className="text-text-secondary">Saturday</span>
                  <span className="font-medium text-brand-navy">10:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border-light last:border-0">
                  <span className="text-text-secondary">Sunday</span>
                  <span className="font-medium text-red-500">Closed</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-brand-purple/5 to-accent-blue/5 border border-brand-purple/10">
              <h3 className="text-sm font-semibold text-brand-navy mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
                Our Offices
              </h3>
              <div className="space-y-5">
                {contactInfo.offices.map((office) => (
                  <div key={office.city} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">{office.city}, {office.country}</p>
                      {office.lines.map((line, j) => (
                        <p key={j} className="text-xs text-text-tertiary">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            <div className="rounded-2xl bg-white border border-border-light shadow-sm p-8 lg:p-10">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-brand-navy mb-3">Message Sent!</h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="h-px w-6 bg-brand-purple/40" />
                    <span className="text-xs font-semibold tracking-[0.15em] uppercase text-brand-purple">
                      Send us a message
                    </span>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Full name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-1.5">Email address *</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Company</label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={inputClass}
                      placeholder="Your Company Ltd."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1.5">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  <div className="flex items-center gap-4 pt-2">
                    <Button type="submit" variant="primary" size="md" disabled={sending}>
                      {sending ? "Sending..." : "Send Message"}
                    </Button>
                    <p className="text-xs text-text-tertiary">We typically respond within 24 hours</p>
                  </div>
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </Section>

      <AnimatedSection>
        <Section variant="secondary">
          <SectionHeader
            label="Global Presence"
            title="Where to Find Us"
            center
          />
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-border-light h-[420px] md:h-[500px]">
            <iframe
              src="https://www.google.com/maps/embed?q=Lagos+Nigeria+Ibadan+Nigeria&z=9&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Map showing Lagos and Ibadan offices"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 md:p-8">
              <div className="flex flex-wrap gap-4">
                {contactInfo.offices.map((office) => (
                  <div
                    key={office.city}
                    className="flex items-center gap-3 bg-white/95 backdrop-blur-md rounded-xl px-5 py-3.5 shadow-lg"
                  >
                    <span className="relative flex w-3 h-3">
                      <span className="absolute inline-flex w-full h-full rounded-full bg-red-400 opacity-75 animate-ping" />
                      <span className="relative inline-flex w-3 h-3 rounded-full bg-red-500" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-navy">{office.city}</p>
                      <p className="text-xs text-text-tertiary">{office.country}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>
      </AnimatedSection>

      <AnimatedSection>
        <Section variant="gradient">
          <div className="text-center max-w-2xl mx-auto">
            <SectionHeader
              title="Ready to Get Started?"
              description="Book a free discovery call with our team to discuss your project."
              center
            />
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button href="/contact" variant="primary" size="lg">
                Schedule a Call
              </Button>
              <Button href="/services" variant="outline" size="lg">
                Explore Services
              </Button>
            </div>
          </div>
        </Section>
      </AnimatedSection>
    </>
  );
}
