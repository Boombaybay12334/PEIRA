# AGENTS.md — PEIRA

PEIRA is a personal research-and-writing site: long-form essays with embedded interactive "toolkit" modules (maps, graphs, 3D). The owner is a solo author who owns every decision. You are the implementer.

## Source of truth (read in this order when unsure)
1. This file
2. `docs/sprint-01-plan.md` — what to do now, with acceptance criteria
3. `docs/sprint-0/phase-c-decisions-architecture.md` — ADR-001..012, information architecture, design brief, architecture
4. `docs/sprint-0/phase-b-requirements-risks.md` — SRS (FR/MOD/DR/NFR IDs) and risk register
5. `docs/sprint-0/phase-d-process-backlog-plan.md` — working agreement, backlog, DoD
6. `docs/sprint-0/phase-a-vision-editorial-scope.md` — vision, charter, scope

## Overrides: later decisions beat older text
- V1 deadline is **29 Nov 2026** (Phase A still says 10 Nov — ignore that).
- Hosting is **Cloudflare Pages** (ADR-009), not Render/Vercel.
- `lens` is **required** in essay frontmatter (FR-04 updated in Phase D).
- Phase B/C/D docs describe Sprint 0 inputs; do not edit `docs/sprint-0/`. Record deviations in `docs/sprint-01-log.md`.

## Stack (locked by ADRs — do not add to it)
Astro (static output, strict TypeScript) · MDX + content collections with Zod · React islands (`client:visible`) · Tailwind with design tokens as CSS variables · pnpm · Vitest · ESLint + Prettier · GitHub Actions → Cloudflare Pages · multi-stage Dockerfile.
**Not in Sprint 1:** GSAP, three.js, React Three Fiber, MapLibre, D3, Observable Plot, Playwright, Lighthouse CI. Do not install them.
If a task seems to need a library or structure that no ADR covers: **stop and write `docs/adr/ADR-0NN-*.md` proposing it, then ask the owner.** Never decide silently.

## Layout
```
src/content/essays/<slug>/{index.mdx,data/,images/}
src/components/   src/layouts/   src/pages/   src/styles/tokens.css
tests/            tests/fixtures/essays/   (deliberately broken essays live here, NOT in src/content)
docs/             docs/adr/   docs/essay-001/
.github/          workflows/  skills/  PULL_REQUEST_TEMPLATE.md
```

## Commands (create these scripts in P-001/P-002; keep the names)
`pnpm dev` · `pnpm build` · `pnpm check` (astro check) · `pnpm lint` · `pnpm format` · `pnpm test`

## Git rules
- Branches: `feat/…`, `fix/…`, `docs/…`, `chore/…` — one ticket per branch, short-lived.
- Commits: Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`). Reference the ticket ID in the body or PR title, e.g. `feat: essay content schema (P-005)`.
- Every change goes through a PR using `.github/PULL_REQUEST_TEMPLATE.md`. The only exception is the P-001 bootstrap commit on an empty project.
- `main` must always build. Never force-push. Never rewrite history on `main`.

## Definition of Done (every ticket)
- [ ] All acceptance criteria met, each checked with real command output
- [ ] Works at 360px and 1280px (when it has UI)
- [ ] Keyboard-usable (when it has UI)
- [ ] `pnpm lint`, `pnpm check`, `pnpm build` pass (and `pnpm test` once tests exist)
- [ ] Tests added where logic exists (schemas, utilities)
- [ ] No console errors
- [ ] Merged to `main` via PR
- [ ] Third-party assets/libraries: license and attribution recorded in `docs/credits.md`

## Working rules
1. One ticket at a time, in the order given. Do not start tickets that weren't assigned to this run.
2. Smallest thing that meets the acceptance criteria. No speculative features, no extra pages.
3. Colors only as tokens (CSS variables). No hardcoded hex/rgb in components.
4. Never put secrets in the repo, logs, or PR text. If a secret is missing, stop and tell the owner the exact command to run.
5. Never present unverified facts as verified. This matters most in anything about the Battle of Leipzig (see the `peira-research-file` skill).
6. Say what you did not verify. A short honest report beats a confident wrong one.
7. Visual tickets can't be fully closed by you: list what the owner must check on a real phone.

## Stop and ask when
- A required human step is missing (secrets, Cloudflare project, auth scopes).
- You'd need a library/approach no ADR covers.
- The same check fails three times in a row.
- An instruction here conflicts with a ticket's acceptance criteria.
