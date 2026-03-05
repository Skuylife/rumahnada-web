import { defineType, defineField } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [

    defineField({
      name: "clientName",
      title: "Client Name",
      type: "string",
    }),

    defineField({
      name: "eventType",
      title: "Event Type",
      type: "string",
    }),

    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (Rule) => Rule.min(1).max(5),
    }),

    defineField({
      name: "review",
      title: "Review",
      type: "text",
    }),

    defineField({
      name: "photo",
      title: "Client Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

  ],
});