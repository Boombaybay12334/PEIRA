import { describe, expect, it } from "vitest";

import { assertFigureProps } from "../src/lib/figure";

const completeFigure = {
  page: "/essays/example",
  src: "/images/example.svg",
  alt: "An example figure",
  caption: "An example caption.",
  credit: "PEIRA",
  license: "CC BY 4.0",
};

describe("assertFigureProps", () => {
  it("accepts complete figure props", () => {
    expect(() => assertFigureProps(completeFigure)).not.toThrow();
  });

  for (const prop of ["alt", "caption", "credit", "license"] as const) {
    it(`names a missing ${prop}`, () => {
      expect(() =>
        assertFigureProps({ ...completeFigure, [prop]: "  " }),
      ).toThrow(`Figure on /essays/example: missing ${prop}`);
    });
  }

  it("names a missing source", () => {
    expect(() =>
      assertFigureProps({ ...completeFigure, src: "" }),
    ).toThrow("Figure on /essays/example: missing src");
  });
});
