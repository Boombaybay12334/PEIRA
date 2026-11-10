---
name: peira-seo-qa-release
description: PEIRA's finishing work — SEO metadata, sitemap and RSS, social cards, Playwright + axe end-to-end tests, Lighthouse CI budgets, dependency audit, QA report, credits audit, changelog and release notes for v1.0.0. Use for P-028, P-030 and P-031.
---

# SEO, QA and release (P-028, P-030, P-031)

Check current docs for `@astrojs/sitemap`, `@astrojs/rss`, Playwright, `@axe-core/playwright` and Lighthouse CI before configuring them.

## P-028 SEO, sitemap, RSS
- Set `site` in `astro.config.mjs` to the URL the owner gave in the run message (one place only).
- Every page: unique `<title>` and meta description, canonical URL, Open Graph and Twitter tags. A shared `SEO` component in the base layout takes the page's title/description/image.
- Social card: a default 1200×630 image in `public/`, built from a token-based design, produced with `sharp` (already a dependency) or a checked-in static file; essays use their hero image when present (absolute URL).
- `@astrojs/sitemap` and `@astrojs/rss` only. RSS lists **published** essays only (title, link, date, description). `public/robots.txt` with the sitemap URL. A `404` page in the site's voice (plain, token-styled).
- Verify: parse `sitemap-index.xml` and the feed as XML (Python or `xmllint`) and print the URLs; confirm drafts are absent; check every built page has exactly one `<title>` and one meta description (script over `dist/`).
- The owner checks link previews after deploy.

## P-030 QA pass
- Install `@playwright/test`, `@axe-core/playwright`, `@lhci/cli` as dev dependencies. `tests/e2e/`, `pnpm test:e2e`.
- **QA build:** a second build into `dist-qa` with `PEIRA_INCLUDE_DRAFTS=1` (drafts included, so the essay template and sample essays are testable). Add this env flag to `getPublishedEssays()` only; default off. **The deploy build never sets it**, and a test asserts the deploy `dist` has no draft pages.
- e2e at **360, 768 and 1280 px** for `/`, `/archive/`, `/about/`, `/lab/`, a topic page, and an essay page: no horizontal scroll (`scrollWidth ≤ innerWidth`), no axe violations of `serious` or `critical` impact, the nav reachable and operable by keyboard, a module shows its table fallback and its island mounts when scrolled into view — **block all external network requests** in tests so tile servers never make CI flaky.
- Lighthouse CI against `pnpm preview` (and the QA build for a no-module essay): accessibility ≥ 0.95 on every page; performance ≥ 0.9 on pages **without modules** (NFR-02); the **essay-with-map page is measured and reported, not asserted**. Mobile emulation.
- CI: add a `qa` job (Playwright browsers installed with caching) that runs e2e + LHCI; leave the required status check as `CI` until the owner decides. Add `pnpm audit --audit-level=high`; if a high-severity finding is a transitive dependency, try a clean upgrade or a pnpm override and explain; if you can't fix it, report it, don't hide it.
- Write `docs/qa-report.md`: a table of results (page × width × checks), Lighthouse numbers, page weights, audit result, and a **"needs a real phone"** list for the owner.
- Fix accessibility defects you find inside this ticket's scope. Anything needing a redesign goes in the report, not in code.

## P-031 Release
- `docs/credits.md`: audit that it lists **every** image (credit + licence), font, dataset, library of note, and the map attribution (OpenFreeMap, OpenMapTiles, OpenStreetMap contributors). Run `pnpm licenses list` and flag anything that isn't permissive (GPL/AGPL/unknown).
- `CHANGELOG.md` (Keep a Changelog style, from the merged PRs and the sprint logs), final `README.md` (what PEIRA is, how to run, test and build, Docker, deploy, repo layout, credits link), `docs/release-notes-v1.0.0.md`, `package.json` version `1.0.0`.
- **Do not tag or create the release.** Print the exact `gh release create` command from `docs/release-checklist.md` for the owner.
- **Do not choose a licence for the site code.** List it under "decisions for the owner".
