---
name: peira-freeze
description: Clean up and freeze the PEIRA site repository at a milestone — conservative cleanup, consistency fixes, dependency/licence/credit audits, and one complete project document (docs/PROJECT-STATE.md) verified against the code. Use for a freeze, handover, audit, or "document the whole project" request.
---

# Freeze and project state (Run N)

Goal: a repo the owner can leave for months and return to, plus **one complete document** explaining the project's current state, structure, and every mechanism. **Freeze means no behaviour changes.** You may delete verified-dead files and fix wording; you must not change features, versions, schemas or styles.

## Evidence rule (applies to every statement in the document)
Every section ends with a line `Evidence:` naming how you verified it: **VERIFIED** (read in code or ran a command; quote the command), **OWNER-CONFIRM** (can't be checked from here: dashboards, registrar, phone behaviour), or **UNVERIFIED** (couldn't check; say why). Never document a command, prop, field, route, setting or error message you did not read or run. Never fill a gap with a plausible guess.

## Allowed read-only external queries
`gh pr list`, `gh run list`, `gh release list`, `gh repo view`, `gh secret list` (names only), `gh api` GET calls (branch protection, workflows, repo settings), `git` history commands, `curl -I` on the live URLs, `dig`, and read-only `wrangler` listing commands if already authenticated. **No writes** to GitHub settings, Cloudflare, DNS or the registrar. Never print secret values.

## Cleanup (conservative, each item with evidence)
1. Branches: list merged local and remote branches that are safe to delete; delete only merged ones. Report anything unmerged.
2. Dead files: files not imported, referenced or documented anywhere (prove with `rg`/`git grep`). Known candidate: `src/content/essays/_sample/` (Astro's glob ignores underscore folders) — remove it only if confirmed unused by tests and docs. Do not remove fixtures, samples used by tests, or demo data.
3. Dependencies: **report only** — `pnpm outdated`, `pnpm audit`, `pnpm licenses list` flagging non-permissive licences, and any dependency with no import (evidence). Do not change versions.
4. Docs consistency: fix stale statements (old deadlines, "Sprint N" instructions that no longer apply, wrong file paths). Mark sprint plans, retros and `docs/sprint-0/` as historical in a `docs/README.md` index; do not edit `docs/sprint-0/` content.
5. Markers: `grep -rn "FILL_ME\|AUTHOR:" docs src` — list every hit by file. Do not fill owner-owned ones (retros, About); report them.
6. Secrets scan: regex scan the working tree and git history for key/token patterns; report hits (never print values).
7. `docs/credits.md`: audit that it lists every image (credit and licence), font, dataset, notable library and the map attribution (OpenFreeMap, OpenMapTiles, OpenStreetMap contributors). Fill gaps only from facts you can verify.
8. `CHANGELOG.md` (Keep a Changelog), entry `0.9.0 — foundation freeze` built from merged PRs and the sprint logs; `package.json` version `0.9.0`; `README.md` accurate and linking `docs/PROJECT-STATE.md` and `docs/AUTHOR-HANDBOOK.md`.
9. Run `pnpm install --frozen-lockfile && pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` (and `pnpm test:e2e` if present) before and after cleanup and quote both results. They must match.

## `docs/PROJECT-STATE.md` — one self-contained document
Plain, short sentences, copy-pasteable fish commands, a table of contents at the top, Mermaid diagrams where they help. Build it section by section, appending. Sections:

0. **Snapshot** — date, commit SHA, version `0.9.0`, tool versions (`node`, `pnpm`, `astro`, key libraries), live URLs (custom domain and `.pages.dev`), CI status, page count, test count, what "frozen" means.
1. **What PEIRA is** — purpose, audience, what it is not (from the vision brief, condensed).
2. **Status against the plan** — every ticket P-001 to P-032: Done / Partial / Not started / Cut, with PR numbers from the logs; what remains for v1.0.0 (Essay 001 written and published, Run I re-check on the live essay, release run, tag); the Should/Could items not built.
3. **How it works end to end** — Mermaid diagram plus prose: draft essay → research repo → exports → site data → build → CI → Cloudflare → reader; where research plugs in.
4. **Repository map** — every top-level file and folder and what it's for, then `src/` annotated.
5. **Content model** — the full frontmatter schema as implemented (read from the code), validation rules, the exact error messages, drafts, the placeholder guard.
6. **Routes** — table: route, file, data source, in sitemap?, notes.
7. **Components and modules** — every component with its real props; module data formats (schemaVersion 1) with required/optional fields; fallbacks; lazy loading; the map provider config; scenario layers; reduced-motion behaviour.
8. **Design system** — the actual tokens, fonts, accessibility commitments, and how each is enforced (tests, guards).
9. **Tooling** — every `pnpm` script (what it does, when to use it), git hooks, commit conventions, lint rules.
10. **CI/CD and hosting** — each workflow, job and step; secret names (not values); Cloudflare project and domain; branch protection as reported by `gh api`; preview URLs; the QA build; the Docker image.
11. **Research repository** — layout, inputs and their status, exports and schemas, the scenario model in plain words, reproducibility, candidate-data status with counts, known issues. Build it from `docs/research-repo-STATE.md`, a snapshot the owner copied into this repo. **Do not read any path outside this workspace.** If that file is missing, tag the section OWNER-CONFIRM.
12. **Author operating manual** — a condensed day-in-the-life plus a decision table for common situations ("I want to… → run…"), pointing to `docs/AUTHOR-HANDBOOK.md` for detail.
13. **Agent workflow** — AGENTS.md summary, every skill in `.github/skills` and `.agents/skills`, the prompts in `prompts/`, how a run works, guardrails, how to start a future sprint or run.
14. **Decisions and deviations** — ADR index with statuses; every deviation from the Sprint 0 plan (e.g. no GSAP or three.js in V1, `model-viewer` for 3D, Cloudflare project naming, the 29 Nov deadline, scope changes) with the reason.
15. **Known issues, risks and technical debt** — status of the risk register; anything you found while auditing; the unverified scenario results; unresolved licence decisions.
16. **External settings not in git** — what lives only in dashboards or on the owner's machine (Cloudflare Pages settings, DNS, registrar, GitHub settings, secrets by name, local tool installs), how to check each, and how to restore it.
17. **Recovery runbook** — rebuild from scratch on a new machine; roll back a bad deploy; restore from the git bundles; what is NOT recoverable from git.
18. **Coming back after a break** — a 10-minute re-onboarding checklist.
19. **Glossary** and an **index of every doc** in the repo.

## Hard limits
No behaviour changes. No dependency changes. No new features. Never tag or create a release. Never write essay prose. Never force-push. If a cleanup action is uncertain, don't do it; list it under "Candidates for the owner".
