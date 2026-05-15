"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface Field {
  key: string;
  label: string;
  editable?: boolean;
  wide?: boolean;
  type?: "text" | "boolean";
}

interface FormField {
  key: string;
  label: string;
  type: "text" | "textarea" | "checkbox";
  required?: boolean;
  render?: (value: string | string[], onChange: (val: string | string[]) => void) => React.ReactNode;
}

interface CrudPageProps {
  title: string;
  endpoint: string;
  fields: Field[];
  formFields: FormField[];
  defaultItem?: Record<string, unknown>;
  onSave?: (item: Record<string, unknown>) => Record<string, unknown>;
}

export default function CrudPage({ title, endpoint, fields, formFields, defaultItem = {}, onSave }: CrudPageProps) {
  const router = useRouter();
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  function authFetch(url: string, opts: RequestInit = {}) {
    const token = sessionStorage.getItem("admin_token");
    return fetch(url, {
      ...opts,
      headers: {
        ...opts.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }

  const load = useCallback(async () => {
    try {
      const res = await authFetch(endpoint);
      if (!res.ok) { router.push("/admin/login"); return; }
      setItems(await res.json());
    } catch {
      router.push("/admin/login");
    }
  }, [endpoint, router]);

  useEffect(() => { load(); }, [load]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    const form = e.target as HTMLFormElement;
    const data: Record<string, unknown> = { ...editing };
    for (const field of formFields) {
      if (field.render) {
        data[field.key] = editing[field.key];
      } else {
        const input = form.elements.namedItem(field.key) as HTMLInputElement | HTMLTextAreaElement;
        if (input) {
          data[field.key] = field.type === "checkbox" ? (input as HTMLInputElement).checked : input.value;
        }
      }
    }
    const processed = onSave ? onSave(data) : data;
    const method = data.id && items.find((i) => i.id === data.id) ? "PUT" : "POST";
    await authFetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(processed),
    });
    setSaving(false);
    setShowForm(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await authFetch(endpoint, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">{title}</h1>
        <button
          onClick={() => { setEditing({ ...defaultItem, id: "" }); setShowForm(true); }}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-br from-brand-purple to-accent-blue text-white text-sm font-medium hover:from-brand-purple-600 hover:to-blue-600 transition-all"
        >
          + Add {title.slice(0, -1)}
        </button>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-brand-navy mb-4">{editing.id ? "Edit" : "New"} {title.slice(0, -1)}</h2>
            <form onSubmit={handleSave} className="space-y-4">
              {formFields.map((field) => (
                <div key={field.key}>
                  <label className="block text-sm font-medium text-text-secondary mb-1">{field.label}</label>
                  {field.render ? (
                    field.render(
                      editing[field.key] as string | string[] | undefined ?? "",
                      (val) => setEditing({ ...editing, [field.key]: val })
                    )
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.key}
                      defaultValue={(editing[field.key] as string) || ""}
                      required={field.required}
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                    />
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={field.key}
                        defaultChecked={!!editing[field.key]}
                        className="w-4 h-4 rounded border-border-medium text-brand-purple focus:ring-brand-purple/30"
                      />
                      <span className="text-sm text-text-secondary">Active</span>
                    </label>
                  ) : (
                    <input
                      type="text"
                      name={field.key}
                      defaultValue={(editing[field.key] as string) || ""}
                      required={field.required}
                      className="w-full px-4 py-3 rounded-xl border border-border-light text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple"
                    />
                  )}
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-brand-purple to-accent-blue text-white text-sm font-medium hover:from-brand-purple-600 hover:to-blue-600 transition-all disabled:opacity-50">
                  {saving ? "Saving..." : "Save"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 rounded-xl border border-border-light text-text-secondary text-sm font-medium hover:bg-brand-navy-50 transition-all">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card-premium overflow-hidden">
        {items.length === 0 ? (
          <div className="p-8 text-center text-text-tertiary">No items yet. Click "Add" to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-light bg-brand-navy-50">
                  {fields.map((f) => (
                    <th key={f.key} className={`text-left p-4 font-medium text-text-secondary ${f.wide ? "w-full" : "whitespace-nowrap"}`}>
                      {f.label}
                    </th>
                  ))}
                  <th className="text-right p-4 font-medium text-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-border-light last:border-0 hover:bg-brand-navy-50/50">
                    {fields.map((f) => (
                      <td key={f.key} className={`p-4 ${f.type === "boolean" ? "" : "text-brand-navy"}`}>
                        {f.type === "boolean" ? (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${item[f.key] ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                            {item[f.key] ? "Yes" : "No"}
                          </span>
                        ) : (
                          <span className="line-clamp-1">{String(item[f.key] ?? "—")}</span>
                        )}
                      </td>
                    ))}
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => { setEditing(item); setShowForm(true); }}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-brand-purple hover:bg-brand-purple-50 transition-all mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id as string)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
