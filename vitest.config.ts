import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["node_modules/**", "dist/**", "dist-qa/**", "tests/e2e/**"],
  },
});
