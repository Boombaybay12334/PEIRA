# Sprint 2 — execution plan (core product)

**Goal (proposed):** a published essay renders end to end — homepage, essay page with Lab panel, sources and corrections, archive and topic pages, About — and Essay 001 has its own public, reproducible research repo with one exported data file.

Tickets and acceptance criteria are verbatim from `docs/sprint-0/phase-d-process-backlog-plan.md` (doc 12). "Notes" are execution detail. Use skill `peira-essay-template` for P-009 to P-015 and `peira-research-repo` for P-016.

## Runs

| Run | Where | Tickets (in this order) | Human gate before | Human check after |
|---|---|---|---|---|
| A | PEIRA repo | P-011, P-010, P-009 | Sprint 2 kit merged to `main` | Preview a draft essay on your phone with `pnpm dev --host` |
| B | PEIRA repo | P-012, P-013, P-014, P-015 | `docs/about-content.md` filled in (no `FILL_ME` left) | About text is yours; Lab panel and corrections look right |
| C | **separate repo** `peira-essay-001-leipzig` | P-016 | Repo created, inputs copied, `uv` installed | Fresh-clone reproduction passes |

## Decisions already made — do not ask the owner about these
- There are **no published essays yet**. Every sample essay is `draft: true`. Production build therefore has no `/essays/...` pages, and the homepage/archive/topic pages show a clear **empty state**. Drafts are visible only in `pnpm dev`.
- Sample essays used to exercise the templates live in `src/content/essays/sample-*/` (names must **not** start with `_` — Astro's glob loader ignores those). Three samples, all drafts, across at least two topics and with different dates; one has a `corrections` entry.
- Essay pages are **static HTML with zero client JavaScript** in Sprint 2 (no React islands).
- **No new dependencies.** Reading time, date formatting, sorting and filtering are small functions in `src/lib/`, unit-tested with synthetic entries.
- Topic pages exist for `wars`, `artifacts`, `paleo-bio` only. No lens pages in Sprint 2.
- Topic "filter" on the archive = links to the topic pages (works without JS).
- Dates: UTC, `Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" })`, always wrapped in `<time datetime="…">`.
- `Figure` requires **alt, caption, credit, license** (all four). A missing one throws an error naming the prop and the page, which fails the build.

## Tickets

### P-011 Image component — S — Must — FR-05
Caption, credit, license displayed; build fails when credit or license is missing.
**Notes:** `src/components/Figure.astro` + pure `assertFigureProps()` in `src/lib/` (unit-tested). Use Astro's image handling for local images, with width/height set. The hero image of an essay renders through the same component. Add `tests/fixtures/essays/figure-missing-credit.mdx` with `draft: false` (otherwise its page is never rendered and the error never fires).

### P-010 Essay page template — M — Must — FR-01, FR-06
Renders MDX, metadata, reading time, footnotes and bibliography.
**Notes:** `src/pages/essays/[slug].astro` + `src/layouts/EssayLayout.astro`. Shows title (single `h1`), description, publish and updated dates, topic links, lens tags, reading time, hero figure, MDX body (token-styled prose, 65ch measure), footnotes, then a Sources/Bibliography list built from the `sources` frontmatter. Leave clearly-marked slots for the Lab panel and corrections (P-014, P-015). Set unique `<title>` and meta description from frontmatter. Reading time = `src/lib/reading-time.ts`, tested.

### P-009 Homepage — S — Must — FR-02
Lists published essays newest first; drafts absent in the production build.
**Notes:** featured = newest published essay, then the rest as cards (`EssayCard`: title, description, date, topics, reading time). Empty state when there are none. Sorting = `sortNewestFirst()` in `src/lib/essays.ts`, tested. Prove drafts are absent: `pnpm build` then `find dist -path '*essays*'` prints nothing.

### P-012 Archive and topic pages — M — Must — FR-03, FR-04
Archive lists all essays; filter by topic returns correct sets.
**Notes:** `filterByTopic()` + `groupByYear()` as pure functions. Test with **three synthetic essays across two topics** (the exact acceptance test in the SRS). Archive shows topic links with counts; topic pages show only their essays; both have empty states.

### P-013 About page — S — Must — FR-08
Page reachable from the nav; states who I am, what PEIRA is, and contact.
**Notes:** content comes **only** from `docs/about-content.md`. Do not invent any biographical detail. Render it as written; do not paraphrase "Who I am" or "Contact".

### P-014 Lab panel — M — Must — FR-09, DR-04
Shows repo link, data sources, method, limitations, reproducibility checklist from frontmatter.
**Notes:** `src/components/LabPanel.astro`, native `<details>`/`<summary>` (works without JS, keyboard-usable). Repo link must be visible in the summary line. Checklist items show text state ("Done" / "Open") plus a symbol — never colour alone. Placed after the essay body and before Sources.

### P-015 Corrections section — S — Should — FR-07
Dated correction notes display from metadata.
**Notes:** `src/components/Corrections.astro`; newest first; not rendered when empty; heading "Corrections and updates". Dated with `<time>`. Placed after Sources.

### P-016 Essay 001: research repo and first data export — L (write) — Must — DR-03, DR-04, X1
Public repo with README, pinned environment, seeded run, and one exported JSON file in the module format.
**Notes:** separate repo, run C. Everything exported is `status: "candidate"` until the owner verifies it. See `peira-research-repo`.

## Sprint complete means (demo script)
1. `pnpm build` → no `/essays/` pages, homepage shows the empty state, live site updated.
2. `pnpm dev --host`: open a draft essay on your phone — dates, reading time, footnote, Lab panel, sources, correction all there.
3. Break a `Figure` (remove its credit) → build fails naming it; restore → passes.
4. Open the research repo; fresh clone → `uv run` reproduces the exported JSON byte for byte.
5. Retro written, **actual hours recorded**, and the "pull Should modules into V1?" decision made (see `docs/sprint-02-retro.md`).
