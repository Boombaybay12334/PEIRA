---
name: peira-essay-scaffold
description: Scaffold PEIRA Essay 001 (Battle of Leipzig) as a draft — essay folder, validated frontmatter, module data, module embeds, hero image with verified licence, and a CI guard that blocks any published essay still containing placeholder markers. Use for P-027 and any new-essay scaffolding. The agent never writes the essay prose.
---

# Essay scaffold (P-027, scaffold only)

The essay is the owner's own writing. Your job is everything around it. **Never write essay prose, opinions, or historical claims.**

## Preflight
- `docs/essay-001/outline.md` contains `OUTLINE_CONFIRMED: yes` (else stop).
- The data files exist in `src/content/essays/leipzig-1813/data/` (the owner copies them from the research repo before the run). Validate each against the module schemas; report any failure.
- Read `docs/essay-001/research.md` (and `figures.csv`) from this repo for sources.

## Create `src/content/essays/leipzig-1813/`
- `index.mdx`: valid frontmatter, **`draft: true`**.
  - `title`, `slug: leipzig-1813`, `description` (50–200 chars): factual, describing the essay's subject only, no claims. Mark it with a comment for the author to rewrite.
  - `publishDate`: today's date (author changes at publication).
  - `topics: [wars]`; `lens`: those from the outline/brief that apply (`ml`, `ai`).
  - `repoUrl`: `https://github.com/Boombaybay12334/peira-essay-001-leipzig`.
  - `sources`: every source in `research.md`'s table, mapped to the schema `kind` field, with a comment above the list: `# AUTHOR: delete any source you did not actually read and use`.
  - `lab`: `method` summarised from the research repo README and scenario brief; `dataSources` from the research file; `limitations` drafted from the scenario brief's limitations, marked `# AUTHOR: rewrite in your own words`; `reproducibility` items with `done: false` unless you proved them (e.g. "fresh clone reproduces the export" can be `true` only if the research repo's CI is green).
- **Body:** the outline's section headings as `##` headings. Under each, a single MDX comment `{/* AUTHOR: write this section — <the outline's one-line prompt> */}`. Place `<MapTimeline …/>` (and the scenario map) in the sections the outline names, using the data files present. No prose, no placeholder lorem.
- **Hero image:** find one on Wikimedia Commons (or an equivalent open archive) whose **file page states public domain or an open licence**; store it in `images/`, resized to under 1 MB with the `sharp` already in the tree; frontmatter `heroImage` has alt text, caption, credit, licence (all non-empty). Quote the licence statement and URL in the PR. If you cannot verify a licence, stop and ask.
- Add the image and any dataset to `docs/credits.md`.

## Placeholder guard
Add `scripts/check-placeholders.mjs` and `pnpm check:placeholders`: scans `src/content/essays/**/*.mdx` and **fails if any essay with `draft: false` contains `AUTHOR:` or `FILL_ME`**. Add it to the CI workflow and to the Vitest suite (a fixture with `draft: false` and a marker must fail; a draft with a marker must pass). Document it in `docs/essay-frontmatter.md`.

## Publish checklist
Add `docs/essay-001/publish-checklist.md` mapping each item of the Editorial charter's minimum standard to a checkbox the owner ticks, plus: every listed source was read; every figure used was checked against its page; nothing says "proves"; modules look right on a phone; `draft: false` set only when ready.

## Verification (quoted output)
Build passes with the essay as a draft · `find dist -path '*leipzig*'` prints nothing · `pnpm dev` serves the essay and the map renders · the placeholder guard's tests pass · temporarily flip `draft: false` on a throwaway branch, show `pnpm check:placeholders` **failing**, then discard the change (never merge it).
