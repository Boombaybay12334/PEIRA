import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";

import { essaySchema } from "./content/essay-schema";

const essays = defineCollection({
  loader: glob({ base: "./src/content/essays", pattern: "**/*.{md,mdx}" }),
  schema: essaySchema,
});

export const collections = { essays };
