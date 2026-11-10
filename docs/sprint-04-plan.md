# Sprint 4 — execution plan (essay, polish, release)

**Goal (proposed):** Essay 001 is published on the custom domain over HTTPS, the site passes QA, and `v1.0.0` is tagged. Hard deadline: 29 Nov 2026.

Tickets and acceptance criteria are verbatim from `docs/sprint-0/phase-d-process-backlog-plan.md`. Use skills `peira-essay-scaffold` (P-027), `peira-seo-qa-release` (P-028, P-030, P-031).

## Runs and human steps, in order

| # | Who | What |
|---|---|---|
| 1 | You | **P-029:** buy the domain, attach it to the Cloudflare Pages project, confirm HTTPS (steps in the runbook) |
| 2 | You | Copy the research repo exports into the site, confirm `docs/essay-001/outline.md` |
| 3 | Agent, **Run H** | P-028 (SEO, sitemap, RSS) then P-027 scaffold (essay skeleton, data, module embeds, placeholder guard) |
| 4 | **You** | **Write Essay 001**, verify every source and figure you use, then set `draft: false` via a PR. No agent run can do this. |
| 5 | Agent, **Run I** | P-030 QA pass (Playwright, axe, Lighthouse CI, audit) on the published site |
| 6 | Agent, **Run J** | P-031 release prep (credits audit, changelog, README, release notes) |
| 7 | You | Tag `v1.0.0` |
| 8 | You | Optional: P-032 analytics (a dashboard toggle) |

## Decisions already made — do not ask the owner about these
- **The agent never writes the essay.** The scaffold leaves `AUTHOR:` markers where prose goes. A guard (`pnpm check:placeholders`, run in CI) **fails the build if any non-draft essay still contains `AUTHOR:` or `FILL_ME`.**
- **Frontmatter facts are not invented.** `sources` starts from the research file's fetched sources with a comment telling the author to delete any they did not read. `lab.reproducibility` items are `done: false` unless the research repo proves them. `lab.limitations` is drafted from the scenario brief and marked for the author to rewrite.
- **Hero image:** only an image whose Wikimedia Commons (or equivalent) page states a public-domain or open licence; credit and licence recorded; resized to under 1 MB.
- **Site URL** comes from the owner's message in the run prompt and lives in one place (`astro.config.mjs` `site`).
- **QA only:** an environment variable `PEIRA_INCLUDE_DRAFTS=1` makes the build include drafts, used by a separate QA build so Playwright and Lighthouse can test the essay template. The deploy build never sets it, and a test asserts the deployed build contains no draft pages.
- **P-031:** the agent prepares release notes and a changelog. **The owner tags and publishes the release.**

## Tickets

### P-028 SEO, sitemap, RSS — M — Should — NFR-04
Unique title and description per page; social card; valid sitemap and feed.
**Notes:** `@astrojs/sitemap` and `@astrojs/rss` (official Astro packages) only. `site` set in config. Canonical URL, Open Graph and Twitter tags on every page; default social card image in `public/` (generated once from a token-based SVG with the `sharp` already in the tree, or equivalent without a new dependency), per-essay card uses the hero image. `robots.txt`. A 404 page. RSS lists published essays only. Validate both documents parse as valid XML and list the expected URLs.

### P-027 Write and publish Essay 001 — L (write) — Must — Charter
Essay meets every item in the minimum standard and passes validation.
**Notes:** Run H builds the scaffold only. The owner writes and publishes. Minimum standard (Editorial charter): sources list, linked GitHub repo, claims traceable to a source or experiment, a limitations note, credit and licence for every image and dataset.

### P-029 Custom domain and HTTPS — S — Must — NFR-05, NFR-08
Site loads on the custom domain over HTTPS; costs match the budget.
**Notes:** human. Apex domains need the domain's DNS on Cloudflare (a CNAME alone is not enough for an apex); a subdomain such as `www` can use a CNAME.

### P-030 QA pass — M — Must — NFR-01, NFR-02, NFR-03, NFR-05
Checked at 360/768/1280px; Lighthouse accessibility ≥ 95 and performance targets measured; dependency audit has no high-severity issues.
**Notes:** Playwright + `@axe-core/playwright` end-to-end tests at three widths (no horizontal scroll, no serious/critical axe violations, nav reachable by keyboard, modules show fallbacks with external requests blocked). Lighthouse CI against `pnpm preview`: accessibility ≥ 0.95 on every page; performance ≥ 0.9 on pages **without** modules (NFR-02); the essay page's numbers are **measured and reported**, not asserted. `pnpm audit --audit-level=high` in CI. Write `docs/qa-report.md` with a results table and a list of what only a human on a real phone can check.

### P-031 Release — S — Must — Release notes
Release notes written; `v1.0.0` tagged and deployed.
**Notes:** credits audit (`docs/credits.md` covers every image, font, dataset, library and the map attribution; `pnpm licenses list` reviewed for anything unusual), `CHANGELOG.md`, final `README.md`, `docs/release-notes-v1.0.0.md`, version 1.0.0 in `package.json`. The owner tags.

### P-032 Analytics and newsletter — S — Could — Growth pathway
Privacy-friendly analytics installed.
**Notes:** optional, after release. Cloudflare Web Analytics is a dashboard setting for the Pages project; check the current dashboard for the exact toggle. No code changes unless the owner asks.

## Sprint 4 complete means
Essay 001 is live on the custom domain over HTTPS; QA report written; `v1.0.0` tagged; retro and actual hours recorded.
