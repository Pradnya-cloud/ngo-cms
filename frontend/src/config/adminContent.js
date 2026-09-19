export const contentResources = {
  banners: {
    label: "Image Slider",
    endpoint: "/content/banners/",
    fields: [
      { name: "image_url", label: "Image URL", type: "url", required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "order", label: "Display Order", type: "number", default: 0 },
      { name: "status", label: "Active", type: "checkbox", default: true },
    ],
    columns: ["title", "order", "status"],
  },
  "vision-mission": {
    label: "Vision & Mission",
    singular: true,
    endpoint: "/content/vision-mission/",
    fields: [
      { name: "vision_title", label: "Vision Title", type: "text", required: true },
      { name: "vision_description", label: "Vision Description", type: "textarea" },
      { name: "mission_title", label: "Mission Title", type: "text", required: true },
      { name: "mission_description", label: "Mission Description", type: "textarea" },
    ],
    columns: ["vision_title", "mission_title", "last_updated"],
  },
  statistics: {
    label: "Statistics",
    endpoint: "/content/statistics/",
    fields: [
      { name: "label", label: "Label", type: "text", required: true },
      { name: "value", label: "Value", type: "text", required: true },
      { name: "order", label: "Display Order", type: "number", default: 0 },
      { name: "status", label: "Active", type: "checkbox", default: true },
    ],
    columns: ["label", "value", "order", "status"],
  },
  initiatives: {
    label: "Initiatives",
    endpoint: "/content/initiatives/",
    fields: [
      { name: "title", label: "Title", type: "text", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL", type: "url" },
      { name: "order", label: "Display Order", type: "number", default: 0 },
      { name: "status", label: "Active", type: "checkbox", default: true },
    ],
    columns: ["title", "order", "status"],
  },
  "page-content": {
    label: "Page Content (Text)",
    endpoint: "/content/page-content/",
    fields: [
      { name: "page_type", label: "Page", type: "text", required: true },
      { name: "section", label: "Section", type: "text", required: true },
      { name: "title", label: "Title", type: "text" },
      { name: "content", label: "Content", type: "textarea" },
      { name: "image", label: "Image URL", type: "url" },
      { name: "sort_order", label: "Sort Order", type: "number", default: 0 },
      { name: "status", label: "Status", type: "text", default: "published" },
    ],
    columns: ["page_type", "section", "title", "status"],
  },
};

export function getResourceConfig(resource) {
  const cfg = contentResources[resource];
  if (!cfg) throw new Error(`Unknown admin content resource: ${resource}`);
  return cfg;
}
