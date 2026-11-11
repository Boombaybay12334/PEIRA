import { describe, expect, it } from "vitest";

import { essayTemplate, isValidSlug } from "../scripts/new-essay.mjs";
import { renderStatus } from "../scripts/essay-status.mjs";
import { checks } from "../scripts/essay-check.mjs";
import { previewUrls } from "../scripts/preview-phone.mjs";
import { exportFiles } from "../scripts/sync-data.mjs";
import { parseEssay, readingMinutes, wordCount } from "../scripts/author-utils.mjs";
import { essaySchema } from "../src/content/essay-schema";

describe("author tooling pure logic", () => {
  it("accepts lowercase kebab slugs and rejects invalid ones", () => {
    expect(isValidSlug("battle-of-leipzig")).toBe(true);
    expect(isValidSlug("Battle_of_Leipzig")).toBe(false);
  });

  it("creates schema-shaped draft frontmatter with placeholders", () => {
    const result = parseEssay(essayTemplate("new-essay", "New Essay", "2026-11-11"));
    expect(result.data.draft).toBe(true);
    expect(result.data.repoUrl).toContain("AUTHOR-REPLACE");
    expect(result.data.heroImage.license).toContain("AUTHOR:");
    expect(result.body).toContain("## Introduction");
    expect(essaySchema.safeParse(result.data).success).toBe(true);
  });

  it("counts words and reading time", () => {
    expect(wordCount("One two three")).toBe(3);
    expect(readingMinutes("One two three")).toBe(1);
  });

  it("renders blockers and ready status", () => {
    expect(
      renderStatus([
        {
          slug: "draft",
          state: "draft",
          words: 3,
          readingTime: 1,
          markers: 1,
          sources: 1,
          reproducibility: "0/1",
          modules: [],
          heroLicense: false,
          blockers: ["draft is true"],
        },
        {
          slug: "ready",
          state: "published",
          words: 3,
          readingTime: 1,
          markers: 0,
          sources: 1,
          reproducibility: "1/1",
          modules: [],
          heroLicense: true,
          blockers: [],
        },
      ]),
    ).toContain("READY TO PUBLISH");
  });

  it("builds home and essay LAN URLs", () => {
    expect(previewUrls("leipzig-1813", ["192.168.1.2"], 4321)).toEqual([
      "http://192.168.1.2:4321/essays/leipzig-1813/",
    ]);
  });

  it("defines the complete essay check pipeline", () => {
    expect(checks).toEqual(["check:placeholders", "lint", "check", "test", "build", "essay:status"]);
  });

  it("finds JSON exports in the supplied research repository", async () => {
    await expect(exportFiles("/home/abhinav/Desktop/peira-essay-001-leipzig")).resolves.toEqual([
      "/home/abhinav/Desktop/peira-essay-001-leipzig/exports/leipzig-points.v1.json",
      "/home/abhinav/Desktop/peira-essay-001-leipzig/exports/leipzig-scenarios.v1.json",
    ]);
  });
});
