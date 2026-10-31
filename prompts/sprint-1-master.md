# PEIRA Sprint 1 — master execution prompt

**TICKETS THIS RUN:** P-001, P-002, P-003
**MERGE POLICY:** After CI is green, merge your own PR (squash, delete branch). *(Change this line to "Leave the PR open for me to review and merge" if you want to review first.)*

---

You are implementing Sprint 1 of the PEIRA project. Read `AGENTS.md` first, then `docs/sprint-01-plan.md`. Relevant skills in `.github/skills/` apply per ticket — use them. Do only the tickets listed above, in order.

## 1. Preflight (read-only, before any change)
Check and print a pass/fail table for: `git remote -v` points at a GitHub repo; `gh auth status` (and the `workflow` scope); `node -v`, `pnpm -v`; `gh secret list` (needed from P-003: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`); `docker`/`podman` presence (only if P-007 is in this run). If a *required* item for the listed tickets is missing, **stop** and give the exact command I must run. Do not improvise around it.

## 2. For each ticket
1. Confirm Definition of Ready: requirement ID, acceptance criteria, size are in `docs/sprint-01-plan.md`.
2. Branch `feat|chore|docs/<short-name>` from up-to-date `main` (**exception:** P-001 may be committed directly to `main` as the bootstrap, because no CI or protection exists yet; say so in the commit body).
3. Implement the smallest change that meets the acceptance criteria. Follow the matching skill.
4. Run the real verification commands. **Quote the actual output** that proves each acceptance criterion; "it should work" is not evidence.
5. Self-review your diff against the Definition of Done in `AGENTS.md`. Fix what you find.
6. Commit with Conventional Commits, push, open a PR from `.github/PULL_REQUEST_TEMPLATE.md` (once it exists). The PR body must contain: ticket ID, AC checklist with evidence, "what to review" (the 3 riskiest files), assumptions you made, what you could NOT verify.
7. Wait for CI (`gh pr checks --watch`). If red: read the log, fix, push. After three failed attempts at the same failure, stop.
8. Apply the MERGE POLICY above.
9. Append to `docs/sprint-01-log.md`: ticket, status, PR URL, assumptions, deviations from the docs.

## 3. Rules that override your instincts
- No libraries, tools, or structure outside the ADRs. If you think one is needed, write a proposed ADR in `docs/adr/` and stop.
- Never force-push; never touch `docs/sprint-0/`; never commit secrets or `.env` files.
- Never say something works unless you ran it. List unverified items explicitly.
- Anything about the Battle of Leipzig must come from pages you actually fetched (see `peira-research-file`).
- Don't continue into tickets that aren't in this run, even if you have time.

## 4. Stop conditions
Missing human prerequisite · a new library/ADR needed · same failure 3× · acceptance criteria that contradict each other or the ADRs.

## 5. Final report (always end with this)
A table: ticket → status → PR link → evidence for each AC. Then three short lists:
- **I could not verify** (e.g. live site on a phone, Docker if absent)
- **Assumptions I made** that the owner should confirm
- **What the owner must do next** (exact commands/links, including the phone checks for any visual ticket)
