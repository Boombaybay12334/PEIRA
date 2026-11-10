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

## P-012 — Archive and topic pages

- **Status:** Complete; merged through [PR #17](https://github.com/Boombaybay12334/PEIRA/pull/17) after CI and the Pages deployment passed.
- **Requirements:** FR-03, FR-04.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed with 23 tests. `filterByTopic()` and `groupByYear()` have synthetic-entry coverage; production builds emitted no draft essay paths.
- **Assumptions:** Topic pages remain limited to `wars`, `artifacts`, and `paleo-bio`; archive filtering is link-based so it works without JavaScript.
- **Deviations:** Web Interface Guidelines review found no new issues in the changed archive/topic UI. Real-device rendering remains an owner check.

## P-013 — About page

- **Status:** Complete; merged through [PR #18](https://github.com/Boombaybay12334/PEIRA/pull/18) after CI and the Pages deployment passed.
- **Requirement:** FR-08.
- **Evidence:** `docs/about-content.md` contains zero `FILL_ME` markers; the page renders its three owner-authored sections and links from the main navigation. `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed.
- **Assumptions:** The existing uncommitted owner edit was the approved prerequisite and was committed unchanged with P-013.
- **Deviations:** Web Interface Guidelines review found no new issues. Real-device rendering remains an owner check.

## P-014 — Lab panel

- **Status:** Complete; merged through [PR #19](https://github.com/Boombaybay12334/PEIRA/pull/19) after CI and the Pages deployment passed.
- **Requirements:** FR-09, DR-04.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed. Dev HTML for `/essays/sample-one/` contained the Lab summary, repository link, method, data source, limitation, checklist state, and figure caption.
- **Assumptions:** Schema validation guarantees all Lab fields are present and non-empty; native `<details>` is sufficient for the no-JavaScript requirement.
- **Deviations:** Web Interface Guidelines review found no new issues. Real-device keyboard and mobile rendering remain owner checks.

## P-015 — Corrections section

- **Status:** Complete; merged through [PR #20](https://github.com/Boombaybay12334/PEIRA/pull/20) after CI and the Pages deployment passed.
- **Requirement:** FR-07.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed. Dev HTML for `sample-three` contained the dated “Corrections and updates” section; `sample-two` rendered zero correction headings.
- **Assumptions:** Content collection validation supplies Date instances for correction dates.
- **Deviations:** Web Interface Guidelines review found no new issues. Real-device rendering remains an owner check.
