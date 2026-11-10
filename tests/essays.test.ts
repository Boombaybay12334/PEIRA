import { describe, expect, it } from "vitest";

import { filterByTopic, groupByYear, sortNewestFirst } from "../src/lib/essays";

const essay = (date: string, title: string) => ({
  data: { publishDate: new Date(date), title, topics: ["wars" as const] },
});

describe("sortNewestFirst", () => {
  it("returns a new array ordered by descending publish date", () => {
    const older = essay("2026-01-01", "Older");
    const newer = essay("2026-03-01", "Newer");
    const middle = essay("2026-02-01", "Middle");
    const entries = [older, newer, middle];

    expect(sortNewestFirst(entries).map((entry) => entry.data.title)).toEqual([
      "Newer",
      "Middle",
      "Older",
    ]);
    expect(entries).toEqual([older, newer, middle]);
  });
});

describe("filterByTopic", () => {
  it("returns only essays containing the requested topic", () => {
    const wars = essay("2026-01-01", "Wars");
    const artifacts = { data: { ...essay("2026-02-01", "Artifacts").data, topics: ["artifacts"] as const } };

    expect(filterByTopic([wars, artifacts], "artifacts")).toEqual([artifacts]);
  });
});

describe("groupByYear", () => {
  it("groups newest-first essays by UTC publication year", () => {
    const entries = [
      essay("2025-12-01", "Older"),
      essay("2026-03-01", "Newest"),
      essay("2026-01-01", "Earlier"),
    ];

    expect([...groupByYear(entries)].map(([year, group]) => [year, group.map((item) => item.data.title)])).toEqual([
      [2026, ["Newest", "Earlier"]],
      [2025, ["Older"]],
    ]);
  });
});
