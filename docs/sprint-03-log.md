# Sprint 3 execution log

## Run D — P-017, P-018, P-020

- **Status:** Complete; merged through [PR #24](https://github.com/Boombaybay12334/PEIRA/pull/24) after CI and the Pages deployment passed.
- **Tickets:** P-017 module contract and data loading; P-018 map with timeline; P-020 lazy loading and fallbacks.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test` (6 files, 28 tests), `pnpm build`, and Prettier checks passed. A deliberately broken demo file failed the build with `Module data demo/demo-points.v1.json: points.0.time: points.time: provide a valid date`. No-module output contained zero map references; the map page emitted a 1,106,497-byte MapLibre chunk and a 7,980-byte island chunk.
- **Assumptions:** Run D uses synthetic demo points only; scenario analysis and real Essay 001 exports remain for later runs. The current module frame slot is the extension point for future modules.
- **Deviations:** P-017 through P-020 were delivered in one integration PR so the shared contract, map, and fallback behavior could be verified together. Real-phone rendering, tile availability on the owner's network, and browser-console output remain owner checks.
