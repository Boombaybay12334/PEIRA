---
name: peira-modules
description: Build PEIRA's Visual Toolkit modules — the module contract and data loading (Zod, ModuleFrame, fallbacks), the MapLibre map with timeline slider and scenario layers, lazy loading, reduced motion, the /lab page, and later the network graph, embedding explorer, analysis lens and 3D viewer. Use for anything under src/components/modules, module data files, or maps and charts in essays.
---

# PEIRA modules (P-017 to P-025)

Specs: `docs/sprint-03-plan.md` (decisions already made), SRS MOD-01 to MOD-08 and DR-01/DR-05 in `docs/sprint-0/phase-b-requirements-risks.md`, ADR-003/007/008/011 in `docs/sprint-0/phase-c-decisions-architecture.md`.

Check the current docs for MapLibre GL JS and Astro (islands, MDX `components`) before writing code. Follow existing code on `main` where it differs.

## Architecture
- **Heavy work is offline.** Modules only *render* static JSON. No runtime services, no fetches to your own APIs, no analytics.
- **Data files** are `src/content/essays/<slug>/data/<name>.v<N>.json` with `schemaVersion`. Demo data for the Lab page: `src/data/demo/*.json`, synthetic, `demo: true`, never real history.
- **`src/lib/modules/`**: `schemas.ts` (Zod per kind: `points`, later `network`, `embedding`, `annotations`), `load.ts`, `config.ts`, pure helpers (`filterPointsUpTo`, `boundsOf`, `scenarioPoints`, …). Pure helpers get Vitest tests with synthetic data.
- **Loading:** `import.meta.glob` for the two data folders, keyed `<slug>/<file>` (demo: `demo/<file>`). A bad or missing reference or a schema failure **throws an error that names the file and the failing field**, which fails the build. Add fixtures under `tests/fixtures/modules/` and a test per failure.
- **`ModuleFrame.astro`** wraps every module: `<figure>` with `aria-labelledby` title, optional caption, a **badge** when `demo: true` or any record has `status: "candidate"`, the island via `client:visible`, a `<noscript>` notice, and an always-in-DOM `<details>` titled "Text and table version" built server-side from the same validated data. A source/licence line shows under the figure.
- **MDX embedding is one line with no imports**: pass the module components to `<Content components={…} />` on the essay page, so authors write `<MapTimeline data="leipzig-1813/leipzig-points.v1.json" title="…" />`.
- **Islands are React**, hydrated `client:visible`; also dynamic-`import()` heavy libraries inside the island so nothing loads until it is visible. Wrap each island in an error boundary that shows a message while the table remains.
- Tokens only: read colours at runtime with `getComputedStyle` of the token CSS variables; **no hex/rgb literals in `src/`** (`pnpm lint:colors` must pass).

## Points data (schemaVersion 1)
The format is defined by the research repo's `docs/data-format.md` (fields `id, time, label, place, lat, lon, unit, side, strength{low,high,unit}, source[], confidence, status`, plus top-level `figures`, `omitted`, `seed`, `inputs`). Copy it to `docs/module-data-format.md` and keep field names exact. Sprint 3 adds two **optional** fields, backward compatible, so the P-016 export stays valid:
- top-level `scenarios[]`: `{id, label, kind: "historical"|"alternative", assumptions: string[], parameters: object, limitations: string[], exploration: boolean, summary?: string}`
- per-point `scenario` (string, default `"historical"`)

## Map with timeline (P-018)
- `maplibre-gl`, imported inside the island. Style URL from `config.ts` (default OpenFreeMap's public style, `https://tiles.openfreemap.org/styles/liberty`; check the provider's docs if it fails). **Attribution control stays visible; never hide or cover it.**
- If the style or tiles fail to load, **still render the points on a plain token-coloured background** and keep the table.
- Slider: native `<input type="range">` over the sorted distinct dates, `aria-valuetext` = the date; Play/Pause + Previous/Next buttons. Points up to the selected date are shown; the latest day is emphasised.
- Popups open on click or Enter/Space on a focused marker: label, place, sources, strength low–high with unit, confidence, status.
- Marker **shape differs by side**, not colour alone. `cooperativeGestures: true` so phone scrolling isn't hijacked. Fit bounds to the points. Min height ~320px, responsive at 360px.

## Scenario layers (P-019)
Radio group in the module header (keyboard-usable). Choosing an alternative: filters points by `scenario`, swaps the assumptions + limitations text, shows a **persistent banner "Exploration, not a prediction"**, and announces the change with `aria-live="polite"`. The historical scenario is always the default.

## Lazy loading, fallbacks, motion (P-020)
- Prove laziness: a built page with no module has no map JS; report the JS bytes of a page with the map (note them in the PR).
- `prefers-reduced-motion: reduce` → no autoplay, no animated camera moves, instant transitions.
- Error boundary + `<noscript>` + the table always present.

## Lab page (P-021)
Replace the empty `/lab` page. One section per built module: a sentence on what it is, the demo (demo data, badge visible), and a link to `docs/module-data-format.md` on GitHub. Lazy loading applies, so the page stays light.

## ADR-013
In the P-017 PR add `docs/adr/ADR-013-v1-module-libraries.md` recording: MapLibre + OpenFreeMap tiles with a swappable style URL; **no GSAP and no three.js in V1**; `model-viewer` for 3D if built; modular D3 only; reasons and consequences. Use the repo's ADR template.

## Optional modules (Runs K and L only)
- **Network graph (P-022):** `d3-force` + SVG, layout computed once (no perpetual animation), focusable nodes, hover/focus/click details, an edge table fallback. Data `network` v1: `nodes[{id,label,group,source[],confidence,status}]`, `edges[{source,target,label,source_ids[]}]`.
- **Embedding explorer (P-023):** SVG scatter, `d3-scale`/`d3-zoom`, ≤ 2,000 points, details on hover/focus/click, table fallback. Data `embedding` v1: `points[{id,x,y,label,group,detail,source[]}]` with a note that coordinates were precomputed offline.
- **Analysis lens (P-024):** server-rendered `LensText` wrapping matched terms in `<mark data-type>`, a tiny toggle script (no framework), highlight types distinguishable without colour, notes on hover and focus. Data `annotations` v1: `terms[{text,type,note,source[]}]`.
- **3D viewer (P-025):** `@google/model-viewer` (lazy), one hotspot, a text description as the fallback. Model must be CC0, public domain or CC-BY and **< 5 MB** (Cloudflare Pages caps single files at 25 MiB); confirm the licence on the source page, record it in `docs/credits.md`. If you cannot verify one, stop and ask.

## Verification (real output in each PR)
`pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` · break a demo data file → build fails naming the file → restore · `grep` the built output to show laziness · the web-design-guidelines review on changed UI files · list for the owner what to check on a phone: `pnpm dev --host`, open `/lab`.
