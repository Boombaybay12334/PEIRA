import { describe, expect, it } from "vitest";

import { contrastRatio, hexToRgb } from "../src/lib/contrast";

describe("contrastRatio", () => {
  it("calculates the WCAG ratio for black and white", () => {
    expect(contrastRatio(hexToRgb("#ffffff"), hexToRgb("#000000"))).toBeCloseTo(21);
  });

  it("supports the P-004 text and accent contrast thresholds", () => {
    const bg0 = hexToRgb("#151311");
    const bg1 = hexToRgb("#211d1a");

    expect(contrastRatio(hexToRgb("#f2e8d5"), bg0)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(hexToRgb("#c9bda9"), bg0)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(hexToRgb("#f2e8d5"), bg1)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(hexToRgb("#c9bda9"), bg1)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(hexToRgb("#e07a45"), bg0)).toBeGreaterThanOrEqual(3);
  });
});
