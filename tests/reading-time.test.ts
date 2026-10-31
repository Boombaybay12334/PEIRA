import { describe, expect, it } from "vitest";

import { readingTime } from "../src/lib/reading-time";

describe("readingTime", () => {
  it("returns one minute for empty and short content", () => {
    expect(readingTime("")).toBe(1);
    expect(readingTime("A short paragraph.")).toBe(1);
  });

  it("rounds long content up at 220 words per minute", () => {
    expect(readingTime(`${"word ".repeat(220)}word`)).toBe(2);
  });

  it("ignores frontmatter, imports, JSX, and fenced code", () => {
    const body = `---
title: Ignored
---

import Figure from "./Figure.astro";

<Figure />

Visible words.

\`\`\`
ignored code words
\`\`\`
`;

    expect(readingTime(body)).toBe(1);
  });
});
