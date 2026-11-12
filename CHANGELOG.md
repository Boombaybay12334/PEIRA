# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.9.0] - 2026-11-12 — Foundation Freeze

Milestone freeze locking site foundation, design tokens, author tooling, content schema,
and CI/CD pipelines before publication of Essay 001 and `v1.0.0` release.

### Added
- **Core Site Architecture & Content Collections:**
  - Astro static site architecture with strict TypeScript and React island integration (P-001).
  - Schema-validated MDX content collection (`src/content/essay-schema.ts`) enforcing required metadata: title, kebab-case slug, description (50–200 chars), date validation, topic and lens enums, image credits, sources bibliography, repo link, and Lab panel metadata (P-005, PR #6).
  - Base responsive layout (`SiteLayout`), header navigation, skip-link, and footer (P-006, PR #8).
  - Homepage (`/`) with chronological essay feed and draft isolation (P-009, PR #15).
  - Essay page template (`/essays/[slug]`) with dynamic reading-time calculation, author metadata, footnotes, and bibliography rendering (P-010, PR #14).
  - Semantic `Figure` component enforcing caption, credit, and license attribution (P-011, PR #13).
  - Archive (`/archive`) and topic archive pages (`/topics/[topic]`) for `wars`, `artifacts`, and `paleo-bio` (P-012, PR #17).
  - About page (`/about`) with owner bio, publication manifesto, and contact links (P-013, PR #18).
  - Collapsible `LabPanel` component disclosing methodology, limitations, external data sources, and an interactive reproducibility checklist (P-014, PR #19).
  - Reverse-chronological `Corrections` errata section on essays (P-015, PR #20).
  - Interactive Lab sandbox page (`/lab`) showcasing module components with synthetic demo data (P-021, PR #27).
  - Multi-stage `Dockerfile` with Node 22 build and Nginx Alpine static serving (P-007, PR #9).

- **Interactive Module Toolkit (Sprint 3):**
  - Versioned module data schema contract (`schemaVersion: 1`, `points` format) with build-time Zod validation and static JSON loading (P-017, PR #24).
  - Interactive `MapTimeline` island powered by MapLibre GL JS, featuring an interactive date scrubber, play/pause controls, popup cards, and OpenFreeMap Liberty public vector tiles (P-018, PR #24).
  - Scenario layer switching with dynamically updated assumptions notes and explicit exploratory labeling (P-019, PR #26).
  - `ModuleFrame` fallback container rendering an explicit "Demo data — not historical" badge, noscript alerts, and server-rendered table fallback (P-020, PR #24).
  - `ModuleErrorBoundary` React component preventing island execution faults from breaking page layouts (PR #24).
  - Reduced-motion accessibility detection (`prefers-reduced-motion`) disabling map panning transitions in favor of instant coordinates jumps (PR #24).

- **SEO, Syndication, and Publishing Pipeline (Sprint 4):**
  - Canonical URL management, Open Graph cards, Twitter metadata, and structured data in `SEO.astro` (P-028, PR #33).
  - XML Sitemap (`@astrojs/sitemap`) and RSS 2.0 feed endpoint (`/rss.xml`) listing published non-draft essays (P-028, PR #33).
  - Static 404 page (`/404.html`) and `robots.txt` pointing to sitemap (P-028, PR #33).
  - Default token-generated social card image in `public/social-card.png` (P-028, PR #33).
  - Leipzig Essay 001 draft scaffold (`leipzig-1813`) with module embeds, initial source bibliography, and candidate data (P-027, PR #33).

- **Author Workflow Tooling (Sprint 4):**
  - `pnpm new:essay <slug> "<title>"`: Scaffolds essay folder, frontmatter, images, and data directories (PR #37).
  - `pnpm essay:status` / `pnpm author`: Reports word count, reading time, and placeholder marker counts (PR #37).
  - `pnpm essay:check`: Runs pre-publish verification suite (placeholders, lint, check, test, build) (PR #37).
  - `pnpm preview:phone`: Binds Astro development server to LAN IP for immediate mobile browser verification (PR #37).
  - `pnpm sync:data`: Copies exported JSON files from research repository into essay data folder, printing SHA-256 and candidate vs verified counts (PR #37).
  - `pnpm check:placeholders`: Fails build if published essays (`draft: false`) contain `AUTHOR:`, `FILL_ME`, or `AUTHOR-REPLACE` markers (PR #33, PR #37).

- **Comprehensive Project Documentation (Run N):**
  - `docs/PROJECT-STATE.md`: 20-section self-contained foundation specification and architecture reference (PR #41).
  - `docs/README.md`: Central document index classifying project files and marking historical sprint logs (PR #40).
  - `docs/AUTHOR-HANDBOOK.md`: Detailed authoring and publishing guide (PR #37).
  - `docs/credits.md`: Attributions and licenses for fonts, map tiles, and images (PR #33).
  - `docs/adr/ADR-013-v1-module-libraries.md`: Architectural record formalizing V1 module library constraints (PR #23).
  - `docs/qa-report.md`: Complete QA audit results from Playwright, axe-core, and Lighthouse CI (PR #35).

### Changed
- Production custom domain attached to Cloudflare Pages at `https://peira.in` with full HTTPS (P-029).
- Separated deploy build (`pnpm build` output to `dist/`, excluding drafts) from QA build (`pnpm build:qa` output to `dist-qa/`, including drafts) (P-030, PR #35).
- Package version bumped to `0.9.0`.

### Fixed
- Fixed nested interactive element violation in `LabPanel` summary disclosure discovered during axe accessibility audit (PR #35).
- Resolved duplicate module heading IDs across map timelines and fallback tables (PR #35).
- Improved inline-link contrast in prose to satisfy WCAG AA requirements (PR #35).
- Corrected site-mark accessibility label mismatch in `SiteHeader` (PR #35).
- Overrode transitive `basic-ftp` high vulnerability to patched version `^6.2.1` in `pnpm-lock.yaml` (PR #35).

### Removed
- Removed dead template directory `src/content/essays/_sample/` (PR #40).
- Pruned 34 merged remote branches from repository history (PR #40).

---

## [0.0.1] - 2026-10-31

Initial repository bootstrap (Sprint 1).
