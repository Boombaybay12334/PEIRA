import { z } from "astro/zod";

const requiredString = (field: string, minimum = 1) =>
  z.preprocess(
    (value) => (value == null ? "" : value),
    z.string().min(minimum, `${field}: provide at least ${minimum} character(s)`),
  );

const requiredArray = <T>(field: string, schema: z.ZodType<T>, minimum = 1) =>
  z.preprocess(
    (value) => (value == null ? [] : value),
    z.array(schema).min(minimum, `${field}: provide at least ${minimum} item(s)`),
  );

const date = (field: string) =>
  z.preprocess(
    (value) => (value == null ? "invalid-date" : value),
    z.coerce.date({ message: `${field}: provide a valid date` }),
  );

const sourceSchema = z.object({
  title: requiredString("sources.title"),
  url: z.url({ error: "sources.url: provide a valid URL" }).optional(),
  author: z.string().optional(),
  year: z.coerce.number().int("sources.year: provide a whole year").optional(),
  kind: z.enum(["paper", "primary", "dataset", "book", "web"], {
    message: "sources.kind: use paper, primary, dataset, book, or web",
  }),
});

const heroImageSchema = z.preprocess(
  (value) => (value == null ? {} : value),
  z.object({
    src: requiredString("heroImage.src"),
    alt: requiredString("heroImage.alt"),
    caption: requiredString("heroImage.caption"),
    credit: requiredString("heroImage.credit"),
    license: requiredString("heroImage.license"),
  }),
);

const labSchema = z.preprocess(
  (value) => (value == null ? {} : value),
  z.object({
    method: requiredString("lab.method"),
    limitations: requiredString("lab.limitations"),
    dataSources: requiredArray("lab.dataSources", requiredString("lab.dataSources.item")),
    reproducibility: requiredArray(
      "lab.reproducibility",
      z.object({
        item: requiredString("lab.reproducibility.item"),
        done: z.boolean({ message: "lab.reproducibility.done: provide true or false" }),
      }),
    ),
  }),
);

export const essaySchema = z
  .object({
    title: requiredString("title"),
    slug: z.preprocess(
      (value) => (value == null ? "" : value),
      z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug: use lowercase kebab-case"),
    ),
    description: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .string()
        .min(50, "description: write 50–200 characters for SEO")
        .max(200, "description: keep this to 50–200 characters for SEO"),
    ),
    publishDate: date("publishDate"),
    updatedDate: date("updatedDate").optional(),
    topics: requiredArray(
      "topics",
      z.enum(["wars", "artifacts", "paleo-bio"], {
        message: "topics: use wars, artifacts, or paleo-bio",
      }),
    ),
    lens: requiredArray(
      "lens",
      z.enum(["ml", "ai", "security"], {
        message: "lens: use ml, ai, or security",
      }),
    ),
    heroImage: heroImageSchema,
    sources: requiredArray("sources", sourceSchema),
    repoUrl: z.preprocess(
      (value) => (value == null ? "" : value),
      z
        .url({ error: "repoUrl: provide a valid GitHub repository URL" })
        .refine((value) => URL.canParse(value) && new URL(value).hostname === "github.com", {
          message: "repoUrl: host must be github.com",
        }),
    ),
    lab: labSchema,
    corrections: z
      .array(
        z.object({
          date: date("corrections.date"),
          note: requiredString("corrections.note"),
        }),
      )
      .optional(),
    draft: z.boolean().default(true),
    series: z.string().optional(),
  })
  .superRefine((essay, context) => {
    if (essay.updatedDate && essay.updatedDate < essay.publishDate) {
      context.addIssue({
        code: "custom",
        path: ["updatedDate"],
        message: "updatedDate: must be on or after publishDate",
      });
    }
  });
