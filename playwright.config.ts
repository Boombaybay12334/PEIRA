import { defineConfig } from "@playwright/test";

const baseURL = "http://127.0.0.1:4321";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
    navigationTimeout: 30_000,
  },
  webServer: {
    command: "pnpm preview:qa --host 127.0.0.1 --port 4321",
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [360, 768, 1280].map((width) => ({
    name: `${width}px`,
    use: { viewport: { width, height: 900 } },
  })),
});
