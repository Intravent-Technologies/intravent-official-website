"use client";

import CrudPage from "../crud";

export default function BlogAdmin() {
  return (
    <CrudPage
      title="Blog Posts"
      endpoint="/api/admin/blog"
      fields={[
        { key: "title", label: "Title", editable: true },
        { key: "category", label: "Category", editable: true },
        { key: "author", label: "Author", editable: true },
        { key: "date", label: "Date", editable: true },
        { key: "readTime", label: "Read Time" },
      ]}
      formFields={[
        { key: "id", label: "ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text" },
        { key: "author", label: "Author", type: "text" },
        { key: "readTime", label: "Read Time", type: "text" },
        { key: "excerpt", label: "Excerpt", type: "textarea" },
        { key: "date", label: "Date", type: "text" },
        { key: "image", label: "Cover Image URL", type: "text" },
        { key: "content", label: "Content (Markdown)", type: "textarea" },
      ]}
    />
  );
}
