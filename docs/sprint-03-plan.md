# Sprint 3 — execution plan (the toolkit)

**Goal (proposed):** the PEIRA Visual Toolkit works at its basic level: a reusable module contract, a map with a timeline slider and scenario layers, lazy loading with fallbacks, a Lab page proving it, and Essay 001's scenario analysis exported as module data.

Tickets and acceptance criteria are verbatim from `docs/sprint-0/phase-d-process-backlog-plan.md`. Use skill `peira-modules` for P-017 to P-025, and `peira-scenario-analysis` (research repo) for P-026.

## Runs

| Run | Where | Tickets (in order) | Human gate before | Human check after |
|---|---|---|---|---|
| D | PEIRA repo | P-017, P-018, P-020 | Sprint 2 verified; this kit merged | Map works on your phone; slider and popups; fallback table |
| E | PEIRA repo | P-019, P-021 | Run D merged | `/lab` page; scenario toggle changes the assumptions text |
| F | `peira-essay-001-leipzig` repo | P-026 | `docs/scenario-brief.md` edited and set to `CONFIRMED: yes` | You have read the model code; fresh clone reproduces |
| K *(optional, do after v1.0.0)* | PEIRA repo | P-022, P-023, P-024 | v1.0.0 released | Each module on `/lab` |
| L *(optional, do after v1.0.0)* | PEIRA repo | P-025 | Run K merged | 3D viewer on a phone |

Modules 04 to 07 (P-022 to P-025) are Should tickets. Phase D's recommendation, and the cut order in your scope doc (07, 06, 05, 04 are cut first), is to ship v1.0.0 without them and build them as v1.1. Runs K and L exist so that's a decision, not a scramble.

## Decisions already made — do not ask the owner about these
- **Map library:** `maplibre-gl` (ADR-007). **Tiles:** OpenFreeMap public style (free, commercial use allowed, attribution required and added automatically by MapLibre). Its terms say the service may change or end, so the style URL lives in **one config constant** (`src/lib/modules/config.ts`), and the map must still show its points on a plain background if tiles fail to load. Attribution stays visible, always.
- **No GSAP and no three.js in V1.** Scrollytelling is on the growth path, not V1. Play/pause uses timers/`requestAnimationFrame`. This follows ADR-005/006's own "install only when a module needs it".
- **3D (Run L only):** `@google/model-viewer`, the fallback ADR-006 names. It provides rotate, zoom and hotspot annotations, exactly the acceptance criteria, without React Three Fiber's weight.
- **Charts and graphs (Run K only):** modular D3 packages only (`d3-force`, `d3-scale`, `d3-selection`, `d3-zoom` if needed), not the whole `d3` bundle.
- Record these choices in **`docs/adr/ADR-013-v1-module-libraries.md`** in the P-017 PR (Status: Accepted on merge).
- **Module data lives next to its essay:** `src/content/essays/<slug>/data/*.json`. Demo data for the Lab page lives in `src/data/demo/*.json` and is **synthetic and labelled "Demo data — not historical"**. Never put unverified historical figures into demos.
- **Embedding in MDX is one line, with no imports:** the essay page passes the module components to MDX, e.g. `<MapTimeline data="leipzig-1813/leipzig-points.v1.json" title="…" />`.
- **No new dependencies** beyond those listed above for each run.
- Sample/demo dates and strengths are fake and labelled. A module shows a **badge** whenever data has `demo: true` or `status: "candidate"`.

## Tickets

### P-017 Module contract and data loading — M — Must — MOD-08, DR-01
Every module takes a data file reference; malformed data fails the build naming the file; modules support a text or table fallback.
**Notes:** Zod schemas for each data kind in `src/lib/modules/`, versioned by `schemaVersion`. First schema: `points` v1 = the format in the research repo's `docs/data-format.md` (copy it to `docs/module-data-format.md`), extended with two **optional** fields: top-level `scenarios[]` and per-point `scenario` (default `"historical"`). A `ModuleFrame.astro` wrapper loads and validates data at build time, renders the island with `client:visible`, a `<noscript>` notice, and an always-present `<details>` text/table alternative built server-side from the same data. Add `docs/modules.md` (how to add a module). Add ADR-013.

### P-018 Map with timeline — L — Must — MOD-01, MOD-02
Slider filters dated points; play and pause work; popups show source and range.
**Notes:** `MapTimeline` island. Points shown up to the selected date, latest day emphasised. Keyboard-usable slider with `aria-valuetext` giving the date; Play/Pause and step buttons. Popups (click or Enter) show label, place, source ids, strength low–high, confidence, status. Marker shape differs by side (not colour alone); colours read from tokens at runtime, never hardcoded. `cooperativeGestures: true` so a phone page can still scroll. Map fits the points' bounds. Tests for the pure functions (date filtering, bounds). **Expose the demo map on `/lab`** (a minimal section is fine; P-021 completes the page) so the owner can check it on a phone straight after Run D.

### P-020 Lazy loading and fallbacks — M — Must — NFR-02, NFR-03
Modules load only when scrolled into view; every module has a text or table alternative; reduced motion respected.
**Notes:** under `prefers-reduced-motion` there is no autoplay and no animated camera moves. An error boundary shows a message when an island fails, and the table remains. Record page weight: a page with no module ships **no** map JS (check built output), and report the JS size of a page with the map (R-08).

### P-019 Scenario layers — M — Must — MOD-03, DR-05
Toggle between historical and at least one alternative scenario; assumptions text changes with it; labeled as exploration.
**Notes:** a radio group (keyboard-usable) in the map module. Choosing an alternative changes the visible points, the assumptions list, and shows a persistent banner "Exploration, not a prediction". Announce changes with `aria-live="polite"`. Uses a synthetic demo dataset until P-026's real export exists.

### P-021 Lab (sandbox) page — S — Should — FR-10
Shows each built module with demo data.
**Notes:** replaces the empty `/lab` page. One section per built module: what it is, the demo, link to the data format. Labelled demo data. Lazy loading applies.

### P-026 Essay 001: scenario analysis — L (write) — Must — DR-03, DR-05
2–3 scenarios defined by explicit parameters; reproducible with fixed seeds; exported as module data.
**Notes:** research repo, Run F. Modest by design (risk R-02): an uncertainty exploration, **not** a battle simulation. See `peira-scenario-analysis` and `docs/scenario-brief.md` there.

### P-022 Network graph — M — Should — MOD-05 *(optional, Run K)*
Reads nodes and edges; hover and click work.
**Notes:** SVG + `d3-force`, layout settled once (no endless animation), nodes focusable, table of edges as the fallback. Data kind `network` v1.

### P-023 Embedding explorer — M — Should — MOD-04 *(optional, Run K)*
Reads precomputed coordinates; hover and click show details.
**Notes:** SVG scatter with d3 scale/zoom, up to 2,000 points, details panel on hover/focus/click, table fallback. Data kind `embedding` v1.

### P-024 Analysis lens — M — Should — MOD-06 *(optional, Run K)*
Toggle highlights pre-annotated terms.
**Notes:** no framework island needed: a server-rendered `LensText` that wraps matched terms in `<mark>` with a type and note, plus a tiny toggle script. Highlights differ by underline style and colour; notes appear on hover and focus. Data kind `annotations` v1.

### P-025 3D artifact viewer — M — Should — MOD-07 *(optional, Run L)*
Loads one open-licensed model with rotate, zoom, one annotation.
**Notes:** `model-viewer` with one hotspot annotation. The model must be CC0, public domain or CC-BY, **under 5 MB**, with the licence confirmed on the page you got it from; record credit and licence in `docs/credits.md`. If no suitable model can be verified, stop and ask the owner to choose one.

## Sprint 3 complete means (demo script)
1. On your phone: open `/lab`, move the map slider, press play, tap a point and read the popup.
2. Toggle a scenario and watch the assumptions text and the "Exploration" banner change.
3. Break a data file (delete a required field) → the build fails naming the file.
4. Research repo: a fresh clone reproduces the scenario export byte for byte.
5. Retro written, actual hours recorded.
