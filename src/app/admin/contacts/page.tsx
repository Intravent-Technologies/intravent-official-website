"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  date: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    fetch("/api/admin/contacts")
      .then((r) => r.json())
      .then(setContacts)
      .catch(() => {});
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Contact Messages</h1>
        <span className="text-sm text-text-tertiary bg-white px-4 py-2 rounded-xl border border-border-light">{contacts.length} messages</span>
      </div>
      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="card-premium p-8 text-center text-text-tertiary">No messages yet.</div>
        ) : (
          contacts.map((c) => (
            <div key={c.id} className="card-premium p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-brand-navy">{c.name}</h3>
                  <p className="text-sm text-text-tertiary">{c.email}{c.company ? ` · ${c.company}` : ""}</p>
                </div>
                <span className="text-xs text-text-tertiary">{new Date(c.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-text-secondary">{c.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
