# PEIRA Sprint 3 — master execution prompt

**RUN D tickets, in order:** P-017, P-018, P-020
**RUN E tickets, in order:** P-019, P-021
**RUN K tickets (optional, after v1.0.0):** P-022, P-023, P-024
**RUN L ticket (optional, after Run K):** P-025
The owner's message names the run. Do only that run's tickets.
**MERGE POLICY:** after CI is green, merge your own PR (squash, delete branch), then branch the next ticket from updated `main`.

---

You are implementing Sprint 3 of PEIRA. Read `AGENTS.md` (note its "Library allowances" section), then `docs/sprint-03-plan.md` (it lists decisions already made — do not ask the owner about them). Use skill `peira-modules`, plus `frontend-design` for taste and `web-design-guidelines` for the pre-PR review. PEIRA's tokens, ADRs and accessibility rules override both community skills.

## 1. Preflight (read-only, before any change)
Print pass/fail for: on `main` and up to date; `gh auth status`; `node -v`, `pnpm -v`; `pnpm install --frozen-lockfile && pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` green; skill `peira-modules` present. **Run E:** `docs/sprint-03-plan.md` and `docs/sprint-03-log.md` show Run D's tickets merged. If anything required fails, stop and give the exact command for the owner.

## 2. For each ticket
1. Definition of Ready: requirement ID and acceptance criteria are in `docs/sprint-03-plan.md`.
2. Branch `feat|docs|chore/<short-name>` from updated `main`.
3. Implement the smallest change meeting the acceptance criteria and the notes. Follow the skill. Only the dependencies the plan allows for this run.
4. Run the real verification commands from the skill. **Quote the actual output** proving each criterion.
5. Run the web-design-guidelines review on changed UI files; fix findings or report them.
6. Self-review the diff against the Definition of Done in `AGENTS.md`.
7. Conventional Commit, push, open a PR from the template. PR body: ticket ID, acceptance-criteria checklist with evidence, the three riskiest files, assumptions, what you could NOT verify.
8. Wait for CI (`gh pr checks --watch`). If red, read the log and fix. After three failed attempts at the same failure, stop.
9. Merge per MERGE POLICY.
10. Append to `docs/sprint-03-log.md` (create if missing): ticket, status, PR URL, assumptions, deviations.

## 3. Rules that override your instincts
- Stay inside the ADRs and the plan's decisions. **No GSAP, no three.js, no React Three Fiber, no whole-`d3` bundle, no UI component library.** If something outside the plan seems necessary, write a proposed ADR in `docs/adr/` and stop.
- Never present demo or candidate data as verified history. Demo data is synthetic and labelled.
- Never hide or cover map attribution.
- Never force-push, never edit `docs/sprint-0/`, never commit secrets.
- Never say something works unless you ran it. List unverified items explicitly.
- Do not start tickets outside this run, even if you have time left.

## 4. Stop conditions
Missing human prerequisite · a new library or ADR needed · same failure 3× · acceptance criteria that contradict each other or the ADRs.

## 5. Final report (always end with this)
A table: ticket → status → PR link → evidence for each criterion. Then three lists:
- **I could not verify**
- **Assumptions I made** that the owner should confirm
- **What the owner must do next** (exact commands, including the phone check: `pnpm dev --host`, then open `/lab` on the phone)
