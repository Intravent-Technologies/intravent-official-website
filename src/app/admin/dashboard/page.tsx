"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    function authFetch(url: string) {
      const token = sessionStorage.getItem("admin_token");
      return fetch(url, {
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
    }
    const token = sessionStorage.getItem("admin_token");
    if (!token) { router.push("/admin/login"); return; }
    Promise.all([
      authFetch("/api/admin/services").then((r) => r.json()).then((d) => ({ key: "Services", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Services", count: 0 })),
      authFetch("/api/admin/clients").then((r) => r.json()).then((d) => ({ key: "Clients", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Clients", count: 0 })),
      authFetch("/api/admin/portfolio").then((r) => r.json()).then((d) => ({ key: "Portfolio", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Portfolio", count: 0 })),
      authFetch("/api/admin/blog").then((r) => r.json()).then((d) => ({ key: "Blog Posts", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Blog Posts", count: 0 })),
      authFetch("/api/admin/newsletter").then((r) => r.json()).then((d) => ({ key: "Subscribers", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Subscribers", count: 0 })),
      authFetch("/api/admin/contacts").then((r) => r.json()).then((d) => ({ key: "Messages", count: Array.isArray(d) ? d.length : 0 })).catch(() => ({ key: "Messages", count: 0 })),
    ]).then((results) => {
      const s: Record<string, number> = {};
      results.forEach((r) => { s[r.key] = r.count; });
      setStats(s);
    });
  }, [router]);

  const cards = [
    { label: "Services", value: stats["Services"] ?? "—", color: "from-brand-purple to-accent-blue", href: "/admin/services" },
    { label: "Clients", value: stats["Clients"] ?? "—", color: "from-accent-blue to-blue-600", href: "/admin/clients" },
    { label: "Portfolio", value: stats["Portfolio"] ?? "—", color: "from-emerald-500 to-emerald-600", href: "/admin/portfolio" },
    { label: "Blog Posts", value: stats["Blog Posts"] ?? "—", color: "from-amber-500 to-orange-600", href: "/admin/blog" },
    { label: "Subscribers", value: stats["Subscribers"] ?? "—", color: "from-brand-purple-600 to-brand-purple-800", href: "/admin/newsletter" },
    { label: "Messages", value: stats["Messages"] ?? "—", color: "from-red-500 to-red-600", href: "/admin/contacts" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy mb-6">Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <button key={card.label} onClick={() => router.push(card.href)} className="card-premium p-6 text-left group cursor-pointer">
            <p className="text-sm text-text-tertiary mb-2">{card.label}</p>
            <p className={`text-4xl font-bold bg-gradient-to-br ${card.color} bg-clip-text text-transparent`}>
              {card.value}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
