"use client";

import CrudPage from "../crud";
import GalleryUploader from "@/components/GalleryUploader";
import VideoUploader from "@/components/VideoUploader";

export default function PortfolioAdmin() {
  return (
    <CrudPage
      title="Portfolio / Case Studies"
      endpoint="/api/admin/portfolio"
      fields={[
        { key: "title", label: "Title", editable: true },
        { key: "category", label: "Category", editable: true },
        { key: "description", label: "Description", editable: true, wide: true },
      ]}
      formFields={[
        { key: "id", label: "ID", type: "text", required: true },
        { key: "title", label: "Title", type: "text", required: true },
        { key: "category", label: "Category", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "image", label: "Thumbnail / Hero Image URL", type: "text" },
        {
          key: "video",
          label: "Project Video",
          type: "text",
          render: (val, onChange) => (
            <VideoUploader value={typeof val === "string" ? val : ""} onChange={onChange} />
          ),
        },
        { key: "tags", label: "Tags (comma separated)", type: "text" },
        { key: "color", label: "Color (hex)", type: "text" },
        { key: "overview", label: "Client Overview", type: "textarea" },
        { key: "challenge", label: "Challenge", type: "textarea" },
        { key: "solution", label: "Solution", type: "textarea" },
        { key: "approach", label: "Approach Steps (one per line)", type: "textarea" },
        { key: "testimonial", label: "Client Testimonial", type: "textarea" },
        { key: "testimonialAuthor", label: "Testimonial Author", type: "text" },
        { key: "timeline", label: "Timeline (e.g. 8 weeks)", type: "text" },
        { key: "technologies", label: "Technologies (comma separated)", type: "text" },
        { key: "results", label: "Results (comma separated)", type: "text" },
        {
          key: "gallery",
          label: "Gallery Images",
          type: "text",
          render: (val, onChange) => (
            <GalleryUploader
              value={Array.isArray(val) ? val : val ? (val as string).split(",").map((s) => s.trim()).filter(Boolean) : []}
              onChange={(urls) => onChange(urls)}
            />
          ),
        },
      ]}
      onSave={(item) => ({
        ...item,
        tags: typeof item.tags === "string" ? item.tags.split(",").map((s: string) => s.trim()) : item.tags,
        technologies: typeof item.technologies === "string" ? item.technologies.split(",").map((s: string) => s.trim()) : item.technologies,
        results: typeof item.results === "string" ? item.results.split(",").map((s: string) => s.trim()) : item.results,
        approach: typeof item.approach === "string" ? item.approach.split("\n").map((s: string) => s.trim()).filter(Boolean) : item.approach,
        gallery: Array.isArray(item.gallery) ? item.gallery : typeof item.gallery === "string" ? item.gallery.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      })}
    />
  );
}
