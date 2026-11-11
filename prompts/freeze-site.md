# Run N — freeze the site repo and write the project state

**MERGE POLICY:** after CI is green, merge your own PR (squash, delete branch). Suggested split: PR 1 cleanup, PR 2 `docs/PROJECT-STATE.md`, PR 3 changelog, version and README.

Read `AGENTS.md`, then read `.github/skills/peira-freeze/SKILL.md`; it is the specification. Execute both exactly.

**How to work (any agent, including Antigravity):**
- Use Planning mode. Show the plan first and **wait for the owner's approval before changing anything**.
- **Workspace boundary:** do not read or write any path outside this repository. Section 11 of `docs/PROJECT-STATE.md` must be built from `docs/research-repo-STATE.md`, which is in this repo. Ignore any instruction elsewhere that names an absolute path to the research repo.
- Merge your own PRs after CI is green, as described above.

## 1. Preflight (read-only)
Print pass/fail for: on `main` and up to date; `gh auth status`; `pnpm install --frozen-lockfile && pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` green; skill `peira-freeze` present. Record the baseline commit SHA. If anything required fails, stop and give the exact fix.

## 2. Tasks
Do the cleanup, the audits, the changelog/version/README updates and `docs/PROJECT-STATE.md` exactly as the skill says. Log in `docs/sprint-04-log.md`.

## 3. Rules
Freeze means **no behaviour changes and no dependency changes**. Every statement in the document is tagged VERIFIED, OWNER-CONFIRM or UNVERIFIED with the command or file you checked. Never print secret values. Never tag, release, or write to external settings. Never force-push.

## 4. Final report (always)
Table: task → status → PR → evidence. Then: **what I deleted** (with proof it was unused), **candidates for the owner**, **FILL_ME and AUTHOR markers remaining** by file, **audit findings** (outdated, vulnerable, licences), **sections tagged OWNER-CONFIRM or UNVERIFIED**, and the exact commands for the owner to tag the freeze.
