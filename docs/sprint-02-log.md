# Sprint 2 execution log

## P-011 — Figure image component

- **Status:** Complete; merged through [PR #13](https://github.com/Boombaybay12334/PEIRA/pull/13) after CI and the Pages deployment passed.
- **Requirement:** FR-05.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed; Figure tests reported 6 tests passing. Copying `tests/fixtures/essays/figure-missing-credit.mdx` into the collection caused the build to fail with `Figure on figure-missing-credit: missing credit`, then the temporary entry was removed.
- **Assumptions:** Existing frontmatter keeps `heroImage.src` as a string; Figure accepts URL strings or imported metadata and applies explicit dimensions.
- **Deviations:** None.

## P-010 — Essay page template

- **Status:** Complete; merged through [PR #14](https://github.com/Boombaybay12334/PEIRA/pull/14) after CI and the Pages deployment passed.
- **Requirements:** FR-01, FR-06.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed with 20 tests. Dev HTML for `/essays/sample-one/` contained the title, reading time, footnote, Lab slot, figcaption, and Sources. Production build printed no draft essay paths.
- **Assumptions:** Lab and Corrections are intentionally named slots until P-014/P-015; sample hero artwork uses the existing public favicon as placeholder content.
- **Deviations:** None.

## P-009 — Homepage

- **Status:** Complete; PR [#15](https://github.com/Boombaybay12334/PEIRA/pull/15) is ready for merge after its final CI run.
- **Requirement:** FR-02.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed with 21 tests. `find dist -path '*essays*'` printed nothing, and `dist/index.html` contains `The first essay is on its way.`.
- **Assumptions:** Drafts remain visible in dev through `getPublishedEssays()` and are excluded in production; the existing token-driven focus styles cover native homepage links.
- **Deviations:** Web Interface Guidelines review found no new issues in the changed homepage/card UI. Real-device rendering and browser-console checks remain owner checks.
