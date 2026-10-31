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
