import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const pages = ["/", "/archive/", "/about/", "/lab/", "/topics/wars/", "/essays/leipzig-1813/"];

test.beforeEach(async ({ page }) => {
  await page.route("**/*", async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === "127.0.0.1" || url.hostname === "localhost") {
      await route.continue();
    } else {
      await route.abort();
    }
  });
});

for (const path of pages) {
  test(`${path} has no overflow or serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("title")).toHaveCount(1);
    await expect(page.locator('meta[name="description"]')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    );

    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      ),
    ).toEqual([]);
  });
}

test("navigation is reachable and operable by keyboard", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator('nav[aria-label="Main navigation"] a').first()).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/$/);
});

test("module fallback remains available and island mounts after scrolling", async ({ page }) => {
  await page.goto("/essays/leipzig-1813/");
  const module = page.locator(".module-frame").first();
  await module.scrollIntoViewIfNeeded();
  await expect(module.locator("summary", { hasText: "Text and table version" })).toBeVisible();
  await expect(module.locator("table")).toBeAttached();
  await expect(module.locator(".map-timeline")).toBeVisible();
  await expect(module.locator(".map-timeline__canvas")).toBeVisible();
});
