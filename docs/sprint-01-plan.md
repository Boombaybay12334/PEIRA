# Sprint 1 — execution plan (2–8 Nov 2026)

**Goal:** pushing to `main` automatically checks, builds, and deploys an empty but styled PEIRA site, and the essay schema rejects any essay that breaks the publishing rules.

Tickets are copied from `docs/sprint-0/phase-d-process-backlog-plan.md` (doc 12). Acceptance criteria are verbatim; the "Notes" column is execution detail.

## Execution order and human gates

| Run | Tickets | Human must have done first | Human checks afterwards |
|---|---|---|---|
| 1 | P-001, P-002, P-003 | Repo created, `workflow` scope on `gh`, Cloudflare Pages project `peira` created, repo secrets `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` set | Live `.pages.dev` URL loads; a PR gets a preview URL |
| 2 | P-004, P-005 | Run 1 merged and green | `/tokens` on a real phone; broken-essay fixtures fail with readable messages |
| 3 | P-006, P-007, P-008 (stretch) | Run 2 merged | Nav by keyboard; `docker run` serves site; research file reviewed — **every source and figure verified by the author** |

## Tickets

### P-001 Initialize project — S — Must — NFR-06
Astro project with strict TypeScript, React, Tailwind, and MDX configured; repo has README.
**AC:** `pnpm dev` serves a page; `pnpm build` succeeds; TypeScript strict mode on; one MDX file renders.
**Notes:** use skill `peira-astro-foundation`. Bootstrap commit may go straight to `main`.

### P-002 Code quality tooling — S — Should — NFR-06
ESLint, Prettier, commit hooks, Conventional Commits check, PR and issue templates (with the DoD checklist).
**AC:** A bad commit message is rejected; a lint error blocks the commit; PR template shows the DoD.
**Notes:** commitlint + husky (or lefthook) — pick one, keep it small. PR template = the DoD checklist from `AGENTS.md`.

### P-003 CI and deployment pipeline — M — Must — NFR-09, NFR-06
GitHub Actions runs lint, type check, and build on every push; Cloudflare Pages deploys `main` and creates PR previews.
**AC:** Pushing to a branch shows a preview URL; merging to `main` updates the live `.pages.dev` site; a failing check blocks the merge.
**Notes:** use skill `peira-ci-cloudflare`. Deploy a bare page first, then add checks. Enable branch protection last.

### P-004 Design tokens and fonts — S — Must — Design brief, NFR-03
Tokens (backgrounds, text, accent, data colors, spacing, type scale) as CSS variables; fonts self-hosted; a token reference page.
**AC:** No hardcoded colors in components; a token page renders all tokens; body text contrast meets AA.
**Notes:** use skill `peira-design-tokens`. Token page at `/tokens`, `noindex`.

### P-005 Essay content schema — M — Must — FR-01, FR-04, FR-05, FR-06, FR-09, NFR-10
Content collection with the full frontmatter schema from doc 06 (lens required) and clear build errors.
**AC:** A valid sample essay builds; essays missing sources, image credit/license, lens, repo URL, or lab fields each fail the build with a message naming the field; drafts are excluded from production.
**Notes:** use skill `peira-content-schema`. Add Vitest and a `test` step to CI.

### P-006 Base layout and routing skeleton — M — Stretch — NFR-01
Global layout, header/nav (Essays, Archive, Lab, About), footer, and empty route pages.
**AC:** All routes resolve; layout works at 360px and 1280px; nav is keyboard-usable.
**Notes:** routes per doc 06: `/`, `/essays/[slug]`, `/archive`, `/topics/[topic]`, `/lab`, `/about`. Empty pages only.

### P-007 Dockerfile — S — Stretch — NFR-07
Multi-stage Dockerfile that builds and serves the site.
**AC:** `docker build` and `docker run` serve the site locally.
**Notes:** details in skill `peira-astro-foundation`. Use `podman` if `docker` is absent.

### P-008 Essay 001 research file — M (write) — Must — DR-02, X2
Source list, timeline of the battle days, first draft of the disputed figures sheet (ranges and sources).
**AC:** A document listing at least 10 sources; a figures sheet where no number lacks a source or range.
**Notes:** use skill `peira-research-file`. Output is a *candidate* file for the author to verify, not finished research.

## Sprint complete means (demo script)
1. Push a small change; show it live on `.pages.dev` with no manual step.
2. Drop a broken essay from `tests/fixtures/essays/` into `src/content/essays/`; show the build failing with a readable message; remove it; show it passing.
3. Open `/tokens` on a phone.
4. Show the research file with ≥10 sources.
