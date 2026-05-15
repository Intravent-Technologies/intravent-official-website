"use client";

import CrudPage from "../crud";

export default function ClientsAdmin() {
  return (
    <CrudPage
      title="Clients"
      endpoint="/api/admin/clients"
      fields={[
        { key: "name", label: "Name", editable: true },
        { key: "logo", label: "Logo URL", editable: true, wide: true },
        { key: "active", label: "Active", type: "boolean" },
      ]}
      formFields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "logo", label: "Logo URL", type: "text" },
        { key: "active", label: "Active", type: "checkbox" },
      ]}
      defaultItem={{ active: true }}
    />
  );
}
