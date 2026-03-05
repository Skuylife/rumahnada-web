// schemas/package.ts
export default {
  name: "package",
  title: "Package",
  type: "document",
  fields: [
    { name: "title", type: "string" },
    { name: "slug", type: "slug", options: { source: "title" } },
    { name: "price", type: "number" },
    { name: "category", type: "string" },
    { name: "description", type: "text" },
    { name: "duration", type: "string" },

    {
      name: "features",
      title: "Members Included",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      name: "baseIncludes",
      title: "What’s Included",
      type: "array",
      of: [{ type: "string" }],
    },

    {
      name: "coverImage",
      type: "image",
      options: { hotspot: true },
    },

    {
      name: "gallery",
      type: "array",
      of: [{ type: "image" }],
    },

    {
      name: "isFeatured",
      type: "boolean",
      initialValue: false,
    },
  ],
}