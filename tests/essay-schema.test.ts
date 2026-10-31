import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

import { essaySchema } from "../src/content/essay-schema";

const fixtureRoot = resolve("tests/fixtures/essays");

async function readFrontmatter(name: string) {
  const contents = await readFile(resolve(fixtureRoot, name), "utf8");
  const match = contents.match(/^---\n([\s\S]*?)\n---/);
  if (!match) throw new Error(`Missing frontmatter in ${name}`);
  return JSON.parse(match[1].replace(/,\s*([}\]])/g, "$1"));
}

describe("essay frontmatter schema", () => {
  it("accepts the valid fixture", async () => {
    expect(essaySchema.safeParse(await readFrontmatter("valid.mdx")).success).toBe(true);
  });

  for (const [fixture, field] of [
    ["missing-sources.mdx", "sources"],
    ["missing-image-credit.mdx", "heroImage.credit"],
    ["missing-image-license.mdx", "heroImage.license"],
    ["missing-lens.mdx", "lens"],
    ["missing-repo-url.mdx", "repoUrl"],
    ["missing-lab-limitations.mdx", "lab.limitations"],
    ["empty-lab-data-sources.mdx", "lab.dataSources"],
    ["invalid-topic.mdx", "topics"],
  ]) {
    it(`rejects ${fixture} with a message naming ${field}`, async () => {
      const result = essaySchema.safeParse(await readFrontmatter(fixture));
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues.map((issue) => issue.message).join(" ")).toContain(field);
      }
    });
  }
});
