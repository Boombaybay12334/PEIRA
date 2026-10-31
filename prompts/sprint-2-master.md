# PEIRA Sprint 2 — master execution prompt

**RUN A tickets, in order:** P-011, P-010, P-009
**RUN B tickets, in order:** P-012, P-013, P-014, P-015
The owner's message names the run ("Run A" or "Run B"). Do only that run's tickets.
**MERGE POLICY:** after CI is green, merge your own PR (squash, delete branch), then branch the next ticket from updated `main`.

---

You are implementing Sprint 2 of PEIRA. Read `AGENTS.md`, then `docs/sprint-02-plan.md` (it lists decisions already made — do not ask the owner about them). Use skill `peira-essay-template`, plus `frontend-design` for taste and `web-design-guidelines` for the pre-PR review. PEIRA's tokens, ADRs and accessibility rules override both community skills.

## 1. Preflight (read-only, before any change)
Print a pass/fail table for: on `main` and up to date (`git status`, `git pull`); `gh auth status`; `node -v`, `pnpm -v`; `pnpm install --frozen-lockfile && pnpm lint && pnpm check && pnpm test && pnpm build` all green; the skill `peira-essay-template` is present. **Run B only:** `docs/about-content.md` exists and contains no `FILL_ME` (`grep -c FILL_ME`). If any required item fails, stop and give the exact command the owner must run. Do not improvise around it.

## 2. For each ticket
1. Definition of Ready: requirement ID and acceptance criteria are in `docs/sprint-02-plan.md`.
2. Branch `feat|docs|chore/<short-name>` from updated `main`.
3. Implement the smallest change meeting the acceptance criteria and the notes. Follow the skill. No new dependencies.
4. Run the real verification commands from the skill. **Quote the actual output** proving each criterion.
5. Run the web-design-guidelines review on changed UI files; fix findings or report them.
6. Self-review the diff against the Definition of Done in `AGENTS.md`.
7. Conventional Commit, push, open a PR from the template. PR body: ticket ID, acceptance-criteria checklist with evidence, the three riskiest files, assumptions, what you could NOT verify.
8. Wait for CI (`gh pr checks --watch`). If red, read the log and fix. After three failed attempts at the same failure, stop.
9. Merge per MERGE POLICY.
10. Append to `docs/sprint-02-log.md` (create it if missing): ticket, status, PR URL, assumptions, deviations.

## 3. Rules that override your instincts
- Stay inside the ADRs. No MapLibre, D3, three.js, GSAP, Playwright, Lighthouse CI. If you think something outside the ADRs is needed, write a proposed ADR in `docs/adr/` and stop.
- Never force-push, never edit `docs/sprint-0/`, never commit secrets.
- Never invent content for the About page or anything about the owner. Use `docs/about-content.md` verbatim.
- Never say something works unless you ran it. List unverified items explicitly.
- Do not start tickets outside this run, even if you have time left.

## 4. Stop conditions
Missing human prerequisite · a new library or ADR needed · same failure 3× · acceptance criteria that contradict each other or the ADRs.

## 5. Final report (always end with this)
A table: ticket → status → PR link → evidence for each criterion. Then three lists:
- **I could not verify**
- **Assumptions I made** that the owner should confirm
- **What the owner must do next** (exact commands, including the phone check: `pnpm dev --host`, then open the sample essay on the phone)
