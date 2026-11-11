# Run M — author tooling and handbook

**MERGE POLICY:** after CI is green, merge your own PR (squash, delete branch).

You are building the owner's author workflow for PEIRA. Read `AGENTS.md`, then the skill `peira-author-workflow`; it is the specification. Work in as few PRs as sensible (suggested: 1 scripts + tests, 2 handbook).

## 1. Preflight (read-only)
Print pass/fail for: on `main` and up to date; `gh auth status`; `pnpm install --frozen-lockfile && pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` green; skill `peira-author-workflow` present; `scripts/check-placeholders.mjs` exists. If anything required fails, stop and print the exact fix.

## 2. Tasks
1. Add the five scripts and their tests exactly as the skill describes. Only the `yaml` devDependency may be added.
2. Write `docs/AUTHOR-HANDBOOK.md` per the skill, verifying every command and snippet against the repo. Link it from `README.md`.
3. Update `AGENTS.md` with a short "Author workflow" section: where the handbook is, the script names, and the editorial-assistant rules.
4. Log in `docs/sprint-04-log.md`.

## 3. Rules
- Never document a command, prop, field or message you did not run or read in the code.
- No other new dependencies. No edits to published content or `docs/sprint-0/`.
- Never invent a source or number; the handbook's examples use obviously fake placeholder values.
- Never force-push, never commit secrets.

## 4. Final report (always)
Table: task → status → PR → evidence. Then: **commands in the handbook I could not run**, **assumptions I made**, **what the owner must do next** (the first three commands to try).
