import { describe, expect, it } from "vitest";

import { sortNewestFirst } from "../src/lib/essays";

const essay = (date: string, title: string) => ({
  data: { publishDate: new Date(date), title },
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
