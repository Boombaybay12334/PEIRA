# Sprint 3 execution log

## Run D — P-017, P-018, P-020

- **Status:** Complete; merged through [PR #24](https://github.com/Boombaybay12334/PEIRA/pull/24) after CI and the Pages deployment passed.
- **Tickets:** P-017 module contract and data loading; P-018 map with timeline; P-020 lazy loading and fallbacks.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test` (6 files, 28 tests), `pnpm build`, and Prettier checks passed. A deliberately broken demo file failed the build with `Module data demo/demo-points.v1.json: points.0.time: points.time: provide a valid date`. No-module output contained zero map references; the map page emitted a 1,106,497-byte MapLibre chunk and a 7,980-byte island chunk.
- **Assumptions:** Run D uses synthetic demo points only; scenario analysis and real Essay 001 exports remain for later runs. The current module frame slot is the extension point for future modules.
- **Deviations:** P-017 through P-020 were delivered in one integration PR so the shared contract, map, and fallback behavior could be verified together. Real-phone rendering, tile availability on the owner's network, and browser-console output remain owner checks.

## Run E — P-019, P-021

- **Status:** Complete; merged through [PR #26](https://github.com/Boombaybay12334/PEIRA/pull/26) and [PR #27](https://github.com/Boombaybay12334/PEIRA/pull/27) after CI and the Pages deployments passed.
- **Tickets:** P-019 scenario layers; P-021 Lab sandbox page.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test` (6 files, 30 tests), `pnpm build`, and targeted Prettier checks passed. The built `/lab` output contains the synthetic-data notice, the module-data-format link, the map section, and hydrated historical/alternative scenario data. Scenario changes use native radios, update filtered points and assumptions/limitations, announce through `aria-live="polite"`, and show "Exploration, not a prediction" for alternatives.
- **Assumptions:** Run E has one built module, so the Lab contains one module section; optional Run K/L modules remain out of scope. The historical baseline is now required whenever a points dataset declares scenarios.
- **Deviations:** A repository-wide `pnpm exec prettier --check .` still reports pre-existing formatting issues in unrelated files; all changed files pass targeted Prettier checks. Real-phone rendering, tile availability, and browser-console output remain owner checks.
