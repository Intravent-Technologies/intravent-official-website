"use client";

import { useRouter } from "next/navigation";
import CrudPage from "../crud";

export default function ServicesAdmin() {
  const router = useRouter();
  return (
    <CrudPage
      title="Services"
      endpoint="/api/admin/services"
      fields={[
        { key: "id", label: "ID", editable: true },
        { key: "title", label: "Title", editable: true },
        { key: "shortDesc", label: "Short Description", editable: true, wide: true },
        { key: "icon", label: "Image URL", editable: true },
      ]}
      formFields={[
        { key: "id", label: "ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "shortDesc", label: "Short Description", type: "textarea", required: true },
        { key: "description", label: "Full Description", type: "textarea", required: true },
        { key: "icon", label: "Image URL", type: "text" },
        { key: "features", label: "Features (comma separated)", type: "text" },
      ]}
      onSave={(item) => ({
        ...item,
        features: typeof item.features === "string" ? item.features.split(",").map((s: string) => s.trim()) : item.features,
      })}
    />
  );
}
