"use client";

import { useEffect, useState } from "react";

interface Subscriber {
  email: string;
  date: string;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    load();
  }, []);

  function load() {
    fetch("/api/admin/newsletter")
      .then((r) => r.json())
      .then(setSubscribers)
      .catch(() => {});
  }

  function downloadCSV() {
    const headers = "Email,Date\n";
    const rows = subscribers.map((s) => `${s.email},${s.date}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "newsletter-subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadSingle(s: Subscriber) {
    const blob = new Blob([`Email,Date\n${s.email},${s.date}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${s.email.split("@")[0]}-subscription.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function remove(email: string) {
    if (!confirm(`Remove ${email}?`)) return;
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) load();
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Newsletter Subscribers</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-text-tertiary bg-white px-4 py-2 rounded-xl border border-border-light">
            {subscribers.length} subscribers
          </span>
          {subscribers.length > 0 && (
            <button
              onClick={downloadCSV}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-navy text-white text-sm font-medium hover:bg-brand-navy-600 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download All
            </button>
          )}
        </div>
      </div>
      <div className="card-premium overflow-hidden">
        {subscribers.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary">No subscribers yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border-light bg-brand-navy-50">
                <th className="text-left p-4 font-medium text-text-secondary">Email</th>
                <th className="text-left p-4 font-medium text-text-secondary">Date</th>
                <th className="text-right p-4 font-medium text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s, i) => (
                <tr key={i} className="border-b border-border-light last:border-0 hover:bg-brand-navy-50/50">
                  <td className="p-4 text-brand-navy">{s.email}</td>
                  <td className="p-4 text-text-tertiary">{new Date(s.date).toLocaleDateString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => downloadSingle(s)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple hover:underline"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download
                      </button>
                      <button
                        onClick={() => remove(s.email)}
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-700"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
