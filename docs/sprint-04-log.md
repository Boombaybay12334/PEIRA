# Sprint 4 execution log

## Run H — P-028 and P-027

- **Status:** Complete; merged in PR #33.
- **PR:** https://github.com/Boombaybay12334/PEIRA/pull/33
- **P-028:** Added the `https://peira.in` site URL, shared SEO metadata, sitemap,
  RSS endpoint, robots file, social cards, hero image, and 404 page.
- **P-027:** Added the draft-only Leipzig essay scaffold, validated module
  embeds, placeholder guard, publish checklist, and credits entries. No essay
  prose was written.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`,
  `pnpm test` (7 files, 32 tests), `pnpm build`, and CI passed. The deploy
  build contains no `/essays/leipzig-1813/` route; the QA build with
  `PEIRA_INCLUDE_DRAFTS=1` renders it. Sitemap and RSS parse as XML, and every
  deploy HTML page has exactly one title and description.
- **Assumptions:** Existing research and module exports remain candidate
  material for the owner to verify. The essay remains `draft: true`.
- **Deviations:** Existing Leipzig exports contained nullable point fields,
  structured `omitted` records, and a historical scenario ID different from
  `"historical"`; the module schema and UI now support those documented export
  shapes without inventing values.
- **Could not verify:** Real-phone layout, deployed link previews, and the
  research repository's source/figure verification.

## Run I — P-030

- **Status:** Complete; merged in PR #35.
- **PR:** https://github.com/Boombaybay12334/PEIRA/pull/35
- **P-030:** Added separate deploy and draft-inclusive QA builds, build-output
  assertions, Playwright + axe checks at 360/768/1280px with external requests
  blocked, Lighthouse CI for deploy and QA previews, cached Chromium in CI,
  and the high-severity dependency audit.
- **Evidence:** `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm test`
  (8 files, 33 tests), deploy and QA build guards, `pnpm test:e2e` (24
  passed), deploy and QA Lighthouse CI, and `pnpm audit --audit-level=high`
  passed. Deploy Lighthouse pages scored 1.00 accessibility and 1.00
  performance; the QA essay-with-map page scored 1.00 accessibility and 1.00
  performance with a 464 KiB transfer.
- **Assumptions:** RUN I covered P-030 only. The Leipzig essay remains
  `draft: true`; draft and live-site preflight checks were intentionally
  skipped, and QA used `dist-qa` with `PEIRA_INCLUDE_DRAFTS=1`.
- **Deviations:** The QA pass fixed scoped accessibility defects found by axe:
  nested interactive lab summary content, duplicate module heading IDs,
  insufficient inline-link contrast/distinction, and the site-mark label
  mismatch. A transitive `basic-ftp` high finding was overridden to the
  patched `^6.2.1` line; one moderate audit finding remains.
- **Could not verify:** Real-phone behavior, deployed link previews, and the
  live essay page. `docs/qa-report.md` records that the live essay page must
  be re-checked after publication.
