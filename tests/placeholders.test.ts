import { describe, expect, it } from "vitest";

import { hasPublishedPlaceholder } from "../scripts/check-placeholders.mjs";

describe("published essay placeholder guard", () => {
  it("rejects markers in published essays", () => {
    expect(hasPublishedPlaceholder("---\ndraft: false\n---\n{/* AUTHOR: write this */}")).toBe(
      true,
    );
    expect(hasPublishedPlaceholder("---\ndraft: false\n---\nFILL_ME")).toBe(true);
    expect(
      hasPublishedPlaceholder(
        '---\ndraft: false\nrepoUrl: "https://github.com/Boombaybay12334/AUTHOR-REPLACE"\n---',
      ),
    ).toBe(true);
  });

  it("allows markers in drafts", () => {
    expect(hasPublishedPlaceholder("---\ndraft: true\n---\n{/* AUTHOR: write this */}")).toBe(
      false,
    );
  });
});
