"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "D" },
  { label: "Services", href: "/admin/services", icon: "S" },
  { label: "Clients", href: "/admin/clients", icon: "C" },
  { label: "Portfolio", href: "/admin/portfolio", icon: "P" },
  { label: "Blog", href: "/admin/blog", icon: "B" },
  { label: "Team", href: "/admin/team", icon: "T" },
  { label: "Newsletter", href: "/admin/newsletter", icon: "N" },
  { label: "Contacts", href: "/admin/contacts", icon: "M" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (pathname === "/admin/login") return <>{children}</>;

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    sessionStorage.removeItem("admin_token");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-brand-navy-50 flex">
      <button
        className="lg:hidden fixed top-3 left-3 z-50 p-2 rounded-xl bg-white border border-border-light shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle sidebar"
      >
        <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-40" onClick={() => setMobileOpen(false)} />
      )}

      <aside className={`${collapsed ? "w-16" : "w-56"} ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} fixed lg:static inset-y-0 left-0 z-40 bg-white border-r border-border-light flex flex-col shrink-0 transition-all duration-300`}>
        <div className="p-4 border-b border-border-light flex items-center justify-between">
          <span className={`font-bold text-brand-navy ${collapsed ? "hidden" : "block"}`}>Intravent CMS</span>
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded-lg hover:bg-brand-navy-50 text-text-tertiary hidden lg:block">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <button
                key={item.href}
                onClick={() => { router.push(item.href); setMobileOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-brand-purple-50 text-brand-purple" : "text-text-secondary hover:bg-brand-navy-50 hover:text-brand-navy"
                }`}
              >
                <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${active ? "bg-brand-purple text-white" : "bg-brand-navy-50 text-text-tertiary"}`}>
                  {item.icon}
                </span>
                <span className={collapsed ? "hidden" : "block"}>{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border-light">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-text-secondary hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="w-6 h-6 rounded-lg bg-red-50 text-red-500 flex items-center justify-center text-xs font-bold">L</span>
            <span className={collapsed ? "hidden" : "block"}>Logout</span>
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto pt-14 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}
