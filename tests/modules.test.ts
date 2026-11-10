import { describe, expect, it } from "vitest";

import {
  boundsOf,
  filterPointsUpTo,
  scenarioPoints,
  sortedDates,
} from "../src/lib/modules/helpers";
import { loadPointsData } from "../src/lib/modules/load";
import { pointsSchema } from "../src/lib/modules/schemas";

const points = pointsSchema.parse({
  kind: "points",
  schemaVersion: 1,
  points: [
    {
      id: "a",
      time: "1813-10-17",
      label: "A",
      place: "North",
      lat: 51,
      lon: 12,
      unit: "people",
      side: "one",
      strength: { low: 1, high: 2, unit: "people" },
      source: ["x"],
      confidence: "high",
      status: "verified",
    },
    {
      id: "b",
      time: "1813-10-18",
      label: "B",
      place: "South",
      lat: 50,
      lon: 13,
      unit: "people",
      side: "two",
      strength: { low: 3, high: 4, unit: "people" },
      source: ["y"],
      confidence: "candidate",
      status: "candidate",
      scenario: "alternative",
    },
  ],
});

describe("module helpers", () => {
  it("sorts distinct dates and filters points through a selected date", () => {
    expect(sortedDates(points.points)).toEqual(["1813-10-17", "1813-10-18"]);
    expect(filterPointsUpTo(points.points, new Date("1813-10-17T23:59:59Z"))).toHaveLength(1);
  });

  it("calculates geographic bounds", () => {
    expect(boundsOf(points.points)).toEqual({ west: 12, south: 50, east: 13, north: 51 });
  });

  it("filters scenario points and defaults missing scenarios to historical", () => {
    expect(scenarioPoints(points.points)).toHaveLength(1);
    expect(scenarioPoints(points.points, "alternative")).toHaveLength(1);
  });
});

describe("points schema", () => {
  it("requires a historical baseline when scenarios are provided", () => {
    const result = pointsSchema.safeParse({
      ...points,
      scenarios: [
        {
          id: "alternative",
          label: "Alternative",
          kind: "alternative",
          assumptions: ["Synthetic assumption"],
          parameters: {},
          limitations: ["Synthetic limitation"],
          exploration: true,
        },
      ],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toContain("historical scenario");
    }
  });

  it("loads the Lab demo with historical and exploratory scenarios", () => {
    const demo = loadPointsData("demo/demo-points.v1.json");
    expect(demo.scenarios?.map((scenario) => scenario.id)).toEqual(["historical", "alternative"]);
    expect(demo.scenarios?.find((scenario) => scenario.id === "alternative")?.exploration).toBe(
      true,
    );
  });

  it("rejects a point whose strength range is reversed", () => {
    const result = pointsSchema.safeParse({
      ...points,
      points: [{ ...points.points[0], strength: { low: 5, high: 2, unit: "people" } }],
    });
    expect(result.success).toBe(false);
  });

  it("names a missing data reference", () => {
    expect(() => loadPointsData("missing/missing-points.v1.json")).toThrow(
      "Module data missing/missing-points.v1.json: file not found",
    );
  });
});
