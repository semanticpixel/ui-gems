import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    series: z.string().default("UI Gems"),
    issue: z.number().optional(),
    cover: z
      .object({
        src: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = { posts };
