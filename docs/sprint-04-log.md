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
