"use client";

import CrudPage from "../crud";

export default function TeamAdmin() {
  return (
    <CrudPage
      title="Team Members"
      endpoint="/api/admin/team"
      fields={[
        { key: "name", label: "Name", editable: true },
        { key: "role", label: "Role", editable: true },
        { key: "displayOrder", label: "Order", editable: true },
      ]}
      formFields={[
        { key: "id", label: "ID", type: "text", required: true },
        { key: "name", label: "Full Name", type: "text", required: true },
        { key: "role", label: "Role / Title", type: "text", required: true },
        { key: "image", label: "Photo URL", type: "text" },
        { key: "shortBio", label: "Short Bio / Tagline", type: "text" },
        { key: "bio", label: "Full Biography", type: "textarea" },
        { key: "tags", label: "Tags (comma separated)", type: "text" },
        { key: "linkedin", label: "LinkedIn URL", type: "text" },
        { key: "displayOrder", label: "Display Order", type: "text" },
      ]}
      onSave={(item) => ({
        ...item,
        tags: typeof item.tags === "string" ? item.tags.split(",").map((s: string) => s.trim()) : item.tags,
        displayOrder: item.displayOrder ? Number(item.displayOrder) : 99,
      })}
    />
  );
}
