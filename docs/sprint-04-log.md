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

## Run M — author tooling and handbook

- **Status:** Implemented; preflight passed on clean, up-to-date `main`.
- **Work:** Added the author scripts and tests, YAML parsing, placeholder guard
  coverage for `AUTHOR-REPLACE`, the fish-friendly handbook, README link,
  AGENTS guidance, and this log entry.
- **Evidence:** `pnpm install --frozen-lockfile`, `pnpm lint`,
  `pnpm lint:colors`, `pnpm check`, `pnpm test`, and `pnpm build` passed before
  implementation; focused author tests, generator/build lifecycle, published
  placeholder failure, and `sync:data` against the supplied Leipzig research
  repository passed after implementation.
- **Assumptions:** The repository has no `shipit` fish function, so the
  handbook documents the verified `gh pr create` flow and says so explicitly.
- **Could not verify:** Real-phone behavior, live deployment, social cards
  after publication, and a merged PR until the owner reviews and merges.


## Run N — foundation freeze and project state

- **Status:** Complete across 3 pull requests (PR #40 cleanup, PR #41 project state, PR #42 version and release prep).
- **PRs:**
  - PR #40: `chore: freeze cleanup — docs index, remove dead _sample dir (Run N)` (Merged)
  - PR #41: `docs: add docs/PROJECT-STATE.md foundation freeze specification (Run N)` (Merged)
  - PR #42: `chore: release prep — v0.9.0, changelog, and README updates (Run N)` (In progress)
- **Work:**
  - Deleted dead template directory `src/content/essays/_sample/` and confirmed zero imports/references across code and tests.
  - Pruned 34 remote branches from tracking cache that had been merged to main and deleted on GitHub.
  - Generated `docs/README.md` indexing all project documents and explicitly marking sprint records and Sprint 0 as historical.
  - Authored comprehensive 20-section `docs/PROJECT-STATE.md` specification verifying every statement against the code with `VERIFIED`, `OWNER-CONFIRM`, or `UNVERIFIED` evidence tags.
  - Section 11 built entirely from local `docs/research-repo-STATE.md` snapshot without reading any paths outside the workspace boundary.
  - Documented complete `CHANGELOG.md` adhering to Keep a Changelog format with `0.9.0` entry.
  - Bumped `package.json` version to `0.9.0`.
  - Updated `README.md` to reference `docs/PROJECT-STATE.md` and `docs/AUTHOR-HANDBOOK.md`.
- **Evidence:**
  - Preflight checks passed on baseline SHA `26ae6a78a0e2a18da559e0f91dfa397b3dd8fae7`.
  - Post-cleanup verification: `pnpm check` (60 files, 0 errors), `pnpm test` (9 files, 40 tests passed), `pnpm build` (10 static routes generated), `pnpm lint:colors` (clean).
  - Dependency audit: reported 11 minor/patch outdated packages, 1 moderate vulnerability (`minimatch` in ESLint dev tree), zero high/critical issues.
  - Secrets scan: zero secrets in working tree or git history.
  - Placeholders check: 28 markers cataloged across historical retros and draft essay; non-draft essays have zero markers.
- **Assumptions:**
  - Freeze rule strictly followed: no behavior changes, no dependency changes, no new features.
  - Essay 001 remains `draft: true` with `AUTHOR:` markers awaiting author prose.
- **Could not verify:**
  - External Cloudflare Pages dashboard configurations and registrar DNS records (tagged `OWNER-CONFIRM`).
  - Mobile rendering on physical devices.
