---
name: peira-research-file
description: Build the Essay 001 (Battle of Leipzig, 1813) research file — candidate source list, battle-day timeline, and a disputed-figures sheet with ranges and sources. Use for any historical research, source gathering, troop/casualty numbers, or fact handling about Leipzig or other essays.
---

# Essay 001 research file (P-008)

This is the one ticket where wrong output is worse than no output. Historical numbers for Leipzig are genuinely disputed (DR-02, risks R-09/R-10). Your job is to produce a **candidate** file the author will verify — not finished research.

## Hard rules
1. **Every source must be one you actually fetched** in this session (search, then open the page). Record the URL. Never cite from memory; never invent a book, page number, or quote.
2. **Every number needs a source and a range.** Format: `figure | low | high | source(s) | note on why they differ`. If only one source gives a number, mark it `single-source`. If you can't find a source, leave the cell blank — don't estimate.
3. **Paraphrase; don't copy.** No quotes over 15 words, and at most one short quote per source.
4. Status on every row: `candidate — author must verify`. Nothing is `verified` until the author sets it.
5. Prefer scholarly/primary-leaning works and institutional pages (museums, archives, encyclopedias, university pages) over blogs/forums. Note each source's tier: `A` scholarly/primary, `B` reputable reference, `C` popular/unknown.
6. Image and map candidates get a license/credit column; only list items whose license you saw on the page.

## Output: `docs/essay-001/research.md`
1. **Brief** — the five research questions from `docs/sprint-0/phase-b-requirements-risks.md` (copy them).
2. **Sources** — table, ≥ 10 rows: `id | title | author/org | url | tier | what it supports | status`. Seed with the owner's two references in `phase-a-vision-editorial-scope.md` (World History Encyclopedia, Britannica), then add scholarly or primary-leaning ones.
3. **Timeline** — Leipzig battle days (16–19 Oct 1813) plus the lead-up (1812 Russia, spring/summer/autumn 1813). Each entry: date, event, source id. Mark entries where sources disagree on date/time.
4. **Disputed figures** — troop strengths and casualties by side (and cavalry specifically, since the essay leans on Napoleon's cavalry shortage), with ranges and source ids. Also write `docs/essay-001/figures.csv` with the same columns for later export to module data (`schemaVersion: 1`).
5. **Gaps and doubts** — what you couldn't find, where sources conflict, what the author should read first.

## Verification you run
- Count sources (≥10) and print the count.
- Script check: no figures row has an empty source cell or a missing `low`/`high` (a single value is allowed only as `low = high` with `single-source` noted). Print the result.
- Report honestly: "N of M figures are single-source."
