import { z } from "astro/zod";

const sourceId = z.string().min(1, "source: provide a source id");

const strengthSchema = z.object({
  low: z.number({ message: "strength.low: provide a number" }),
  high: z.number({ message: "strength.high: provide a number" }),
  unit: z.string().min(1, "strength.unit: provide a unit"),
});

const pointSchema = z
  .object({
    id: z.string().min(1, "points.id: provide an id"),
    time: z.coerce.date({ message: "points.time: provide a valid date" }),
    label: z.string().min(1, "points.label: provide a label"),
    place: z.string().min(1, "points.place: provide a place"),
    lat: z.number().min(-90, "points.lat: must be between -90 and 90").max(90),
    lon: z.number().min(-180, "points.lon: must be between -180 and 180").max(180),
    unit: z.string().min(1, "points.unit: provide a unit"),
    side: z.string().min(1, "points.side: provide a side"),
    strength: strengthSchema,
    source: z.array(sourceId).min(1, "points.source: provide at least one source id"),
    confidence: z.string().min(1, "points.confidence: provide a confidence label"),
    status: z.enum(["verified", "candidate", "omitted"], {
      message: "points.status: use verified, candidate, or omitted",
    }),
    scenario: z.string().min(1, "points.scenario: provide a scenario id").default("historical"),
  })
  .superRefine((point, context) => {
    if (point.strength.high < point.strength.low) {
      context.addIssue({
        code: "custom",
        path: ["strength", "high"],
        message: "strength.high: must be greater than or equal to strength.low",
      });
    }
  });

const scenarioSchema = z.object({
  id: z.string().min(1, "scenarios.id: provide an id"),
  label: z.string().min(1, "scenarios.label: provide a label"),
  kind: z.enum(["historical", "alternative"], {
    message: "scenarios.kind: use historical or alternative",
  }),
  assumptions: z.array(z.string().min(1)).min(1, "scenarios.assumptions: provide at least one"),
  parameters: z.record(z.string(), z.unknown()),
  limitations: z.array(z.string().min(1)).min(1, "scenarios.limitations: provide at least one"),
  exploration: z.boolean(),
  summary: z.string().optional(),
});

export const pointsSchema = z
  .object({
    kind: z.literal("points"),
    schemaVersion: z.literal(1),
    demo: z.boolean().default(false),
    figures: z.array(z.record(z.string(), z.unknown())).default([]),
    omitted: z.array(z.string()).default([]),
    seed: z.union([z.string(), z.number()]).optional(),
    inputs: z.record(z.string(), z.unknown()).default({}),
    points: z.array(pointSchema).min(1, "points: provide at least one point"),
    scenarios: z.array(scenarioSchema).optional(),
  })
  .superRefine((data, context) => {
    if (data.scenarios && !data.scenarios.some((scenario) => scenario.id === "historical")) {
      context.addIssue({
        code: "custom",
        path: ["scenarios"],
        message: "scenarios: provide a historical scenario as the default baseline",
      });
    }
  });

export type PointsData = z.infer<typeof pointsSchema>;
export type Point = PointsData["points"][number];
export type Scenario = NonNullable<PointsData["scenarios"]>[number];

export const moduleSchemas = {
  points: {
    1: pointsSchema,
  },
} as const;
