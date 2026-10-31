---
name: peira-essay-template
description: Build PEIRA's reader-facing pages — homepage, essay page template (MDX, reading time, footnotes, bibliography), Figure image component, archive and topic pages, About page, Lab panel, and corrections section. Use for anything rendering essays or their metadata, or testing sorting/filtering of essays.
---

# Essay pages and components (P-009 to P-015)

Spec sources: `docs/sprint-02-plan.md` (tickets and decisions already made), doc 06 (IA and fields) and doc 07 (design brief) in `docs/sprint-0/phase-c-decisions-architecture.md`.

**Check the current Astro docs before using content-collection rendering APIs** (the way to render an MDX entry has changed between Astro versions). If the docs and the existing code disagree, follow the code already merged on `main` for the collection and schema.

## Architecture rules
- **Static HTML, zero client JS** on essay pages, homepage, archive, topics, About in this sprint. No React islands. Check the build output for stray scripts.
- **Logic lives in pure functions** in `src/lib/` (`essays.ts`, `reading-time.ts`, `figure.ts`): `sortNewestFirst`, `filterByTopic`, `groupByYear`, `formatDate`, `readingTime`, `assertFigureProps`. They take plain data, so Vitest tests use **synthetic entries**, never the real content.
- Always get essays through the existing `getPublishedEssays()` helper (drafts are excluded when `import.meta.env.PROD`). Do not re-implement the draft filter.
- **Tokens only** for colour, type and spacing; `pnpm lint:colors` must pass. Use the heading/body/mono fonts already defined. Reading width `var(--measure)`.
- **No new dependencies.** If something seems to need one (reading time, footnotes, date formatting), write the small function or use what Astro/MDX already provide, or stop and propose an ADR.

## Page conventions
- One `h1` per page; heading levels don't skip. Landmarks come from the base layout from P-006.
- Dates always in `<time datetime="YYYY-MM-DD">`, formatted with `Intl.DateTimeFormat("en-GB", { dateStyle: "long", timeZone: "UTC" })` so timezones can't shift a day.
- Every list page has an **empty state** in plain words (e.g. "The first essay is on its way."). No placeholder lorem.
- Links are visibly links (not colour alone); focus styles come from tokens; layouts work at 360px with no sideways scroll.
- Unique `<title>` and meta description per page, built from frontmatter or page copy.

## Essay page order
header (title, description, dates, topics, lens, reading time) → hero `Figure` → MDX body (prose + footnotes) → **Lab panel** → **Sources / Bibliography** → **Corrections**.
Lab panel and Corrections arrive in P-014/P-015: in P-010 leave a clearly commented slot for each.

## Reading time (`src/lib/reading-time.ts`)
Words of the **MDX body** ÷ 220, rounded up, minimum 1. Strip frontmatter, `import`/`export` lines, JSX tags and fenced code before counting. Tests: empty, short, long, MDX with imports/code.

## Footnotes and bibliography
Footnotes use standard GFM footnote syntax if the MDX setup supports it (check; Astro's MDX integration normally applies GFM). If it doesn't, enable the official remark GFM plugin through the Astro MDX config only if that adds no new package; otherwise stop and ask. Style the footnote section with tokens. The Bibliography renders every `sources` entry: title, author, year, kind, and the URL as a link when present.

## Figure component (`src/components/Figure.astro`)
Props: `src`, `alt`, `caption`, `credit`, `license`, optional `licenseUrl`, `sourceUrl`. **alt, caption, credit, license are all required**; empty or whitespace-only counts as missing. `assertFigureProps` throws `Error("Figure on <page/id>: missing <prop>")`, which fails the build. Render `<figure>` + `<figcaption>` with credit and license visible. Local images go through Astro's image handling with explicit dimensions; `loading="lazy"` except the hero.
**Important:** a draft essay's page is never rendered in production, so a broken Figure in a draft only fails when the essay is published or in dev. That's fine, but the *fixture* for the failure test must have `draft: false`.

## Lab panel
Native `<details>`/`<summary>`. Summary line shows "Lab" and the **repo link**. Inside: method, data sources, limitations, reproducibility checklist. Each checklist item: text state ("Done"/"Open") plus a symbol. Content is in the DOM even when collapsed, so it works without JS and in print.

## Corrections
Newest first, each with a `<time>` and the note. Not rendered when the array is missing or empty. If `updatedDate` exists, the essay header shows "Updated <date>".

## Sample essays
Create three under `src/content/essays/sample-one/`, `sample-two/`, `sample-three/` (**no leading underscore** — Astro's glob loader ignores `_` names; if the Sprint 1 sample lives in `_sample/`, check it's actually loaded and rename it). All `draft: true`, different dates, at least two different topics, one with a `corrections` entry, all with valid frontmatter (use the repo URL `https://github.com/Boombaybay12334/PEIRA` as a placeholder `repoUrl`). The body text must be obviously placeholder, with a footnote and at least one `Figure`.

## Verification (real output required in each PR)
- `pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build`
- `find dist -path '*essays*'` prints **nothing** (no draft leaks); homepage/archive/topics built with empty states.
- `pnpm dev`: curl the sample essay URL and grep for its title, the reading time, the footnote, the Lab summary, a `<figcaption>`.
- Figure failure: copy `tests/fixtures/essays/figure-missing-credit.mdx` into `src/content/essays/`, `pnpm build` must fail and name the Figure, then remove it and rebuild.
- Run the web-design-guidelines review on changed UI files before each PR.
- List what the owner must check on a phone: `pnpm dev --host`, open the sample essay at 360px.
