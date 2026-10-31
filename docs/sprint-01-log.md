# Sprint 1 execution log

## P-001 — Initialize project

- **Status:** Complete; bootstrapped directly to `main` as allowed for the empty project.
- **Requirement:** NFR-06.
- **Evidence:** `pnpm check` completed with 0 errors, 0 warnings, and 0 hints; `pnpm build` completed with 2 pages built; the Astro dev server returned the PEIRA home page and the `/mdx-smoke/` page.
- **Assumptions:** The MDX smoke page remains available at `/mdx-smoke/` and is marked `noindex` until the content architecture is added.
- **Deviations:** Astro's current `astro check` requires explicit `@astrojs/check` and TypeScript 6 development dependencies; these were added to make the required `pnpm check` script non-interactive and supported.

## P-002 — Code quality tooling

- **Status:** Complete; ready for local commit, push, and PR review.
- **Requirement:** NFR-06.
- **Evidence:** `pnpm lint`, `pnpm check`, and `pnpm build` pass. An invalid commit message exited with status 1 through commitlint, and a staged lint error exited with status 1 through the Husky pre-commit hook.
- **Assumptions:** Husky is the selected lightweight hook manager; ESLint uses the flat config format and Prettier formats files touched by this ticket.
- **Deviations:** None.

## P-003 — CI and deployment pipeline

- **Status:** Complete; merged through PR #2 after the gated CI and deployment run passed.
- **Requirements:** NFR-09, NFR-06.
- **Evidence:** Preview workflow [41197520712](https://github.com/Boombaybay12334/PEIRA/actions/runs/41197520712) passed lint, type check, build, and Cloudflare Pages deployment; preview URL `https://feat-p-003-ci-cloudflare.peira-43h.pages.dev`. Post-merge production workflow [41197696441](https://github.com/Boombaybay12334/PEIRA/actions/runs/41197696441) passed and `https://peira-43h.pages.dev/` served the PEIRA page and `/mdx-smoke/` route. Throwaway PR #3 failed the required CI check and was blocked from merging.
- **Assumptions:** The Cloudflare Pages project is named `peira`; the branch alias URL is the stable preview URL surfaced by Wrangler.
- **Deviations:** Branch protection requires only the `CI` status check, with no approving reviews and admin enforcement disabled, per owner instruction.

## P-004 — Design tokens and fonts

- **Status:** Complete; merged through [PR #5](https://github.com/Boombaybay12334/PEIRA/pull/5) after CI passed.
- **Requirement:** Design brief, NFR-03.
- **Evidence:** `pnpm lint:colors`, `pnpm lint`, `pnpm check`, `pnpm test`, and `pnpm build` passed; the build produced `/`, `/mdx-smoke/`, and `/tokens/`. The token page is `noindex`, uses self-hosted Fontsource fonts, and the base stylesheet is imported by every current page.
- **Assumptions:** Token values are placeholders until the owner completes the moodboard. The requested base stylesheet intentionally adds only global typography, color, focus, and reduced-motion rules; no layout or components.
- **Deviations:** None. Web Interface Guidelines were fetched and reviewed before opening the PR; real-phone rendering remains an owner check.

## P-005 — Essay content schema

- **Status:** Complete; merged through [PR #6](https://github.com/Boombaybay12334/PEIRA/pull/6) after CI passed.
- **Requirements:** FR-01, FR-04, FR-05, FR-06, FR-09, NFR-10.
- **Evidence:** `pnpm test` passed with 2 files and 11 tests; `pnpm check` passed with 0 errors, 0 warnings, and 0 hints; `pnpm build` passed with the sample draft collection entry; copying the missing-sources fixture into `src/content/essays/` made `pnpm build` fail with `sources: sources: provide at least 1 item(s)`, then the temporary entry was removed.
- **Assumptions:** `lens` is a required array whose values are `ml`, `ai`, or `security`, as proposed by the content-schema skill and architecture notes.
- **Deviations:** None.
