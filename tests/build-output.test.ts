import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const outputDirectory = process.env.PEIRA_BUILD_DIR ?? "dist";
const essayRoute = join(outputDirectory, "essays", "leipzig-1813", "index.html");

describe("static build output", () => {
  it("contains the expected draft route state", () => {
    if (!existsSync(join(outputDirectory, "index.html"))) {
      return;
    }

    expect(existsSync(essayRoute)).toBe(process.env.PEIRA_EXPECT_DRAFTS === "1");
  });
});
