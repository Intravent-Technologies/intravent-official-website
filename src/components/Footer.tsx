"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, contactInfo } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="bg-brand-navy text-white/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href="/" className="inline-block mb-5 group">
              <div className="w-[120px] h-[120px] transition-transform duration-300 group-hover:scale-105 shrink-0">
                <img src="/images/logo.png" alt={site.name} className="w-full h-full object-contain" />
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-sm mb-6">
              {site.description}
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/40">
              <span>{contactInfo.email}</span>
              <span>{contactInfo.phone}</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white/90 mb-4 tracking-wide">Sections</h3>
            <ul className="space-y-3">
              <li><Link href="/services" className="text-sm text-white/50 hover:text-white transition-colors">Services</Link></li>
              <li><a href="/#team" className="text-sm text-white/50 hover:text-white transition-colors">Team</a></li>
              <li><a href="/#testimonials" className="text-sm text-white/50 hover:text-white transition-colors">Testimonials</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white/90 mb-4 tracking-wide">Information</h3>
            <ul className="space-y-3">
              <li><a href="/#faq" className="text-sm text-white/50 hover:text-white transition-colors">FAQ</a></li>
              <li><Link href="/contact" className="text-sm text-white/50 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-white/50 hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/refund" className="text-sm text-white/50 hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-semibold text-sm text-white/90 mb-4 tracking-wide">Stay Connected</h3>
            <p className="text-xs text-white/40 mb-4">Subscribe to our newsletter for tech insights, trends, &amp; growth strategies.</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const email = new FormData(form).get("email");
                if (!email) return;
                try {
                  await fetch("/api/admin/newsletter", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
                  });
                  form.reset();
                  alert("Subscribed!");
                } catch {
                  alert("Something went wrong.");
                }
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="Your email"
                required
                className="flex-1 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-brand-purple/50"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-brand-purple to-accent-blue text-white text-xs font-medium hover:opacity-90 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Developed by INTRAVENT TEAM
          </p>
        </div>
      </div>
    </footer>
  );
}
