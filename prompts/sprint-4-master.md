# PEIRA Sprint 4 — master execution prompt

**RUN H tickets, in order:** P-028, then the P-027 scaffold
**RUN I ticket:** P-030
**RUN J ticket:** P-031
The owner's message names the run. **Run H's message also contains `SITE_URL=<the public site URL>`** (use it for `astro.config.mjs` `site`; stop if it's missing).
**MERGE POLICY:** after CI is green, merge your own PR (squash, delete branch), then branch the next ticket from updated `main`.

---

You are implementing Sprint 4 of PEIRA. Read `AGENTS.md` (note its "Library allowances" section), then `docs/sprint-04-plan.md` (decisions already made — do not ask the owner about them). Use the skills named there: `peira-essay-scaffold` for P-027, `peira-seo-qa-release` for P-028, P-030 and P-031. PEIRA's tokens, ADRs and accessibility rules override community skills.

## 1. Preflight (read-only, before any change)
Print pass/fail for: on `main` and up to date; `gh auth status`; `pnpm install --frozen-lockfile && pnpm lint && pnpm lint:colors && pnpm check && pnpm test && pnpm build` green. Then per run:
- **Run H:** `docs/essay-001/outline.md` contains `OUTLINE_CONFIRMED: yes`; at least two JSON files exist in `src/content/essays/leipzig-1813/data/` and validate against the module schemas; `SITE_URL` was given.
- **Run I:** the essay `src/content/essays/leipzig-1813/index.mdx` has `draft: false`; the live site URL returns 200 (`curl`).
- **Run J:** `docs/qa-report.md` exists and lists no unresolved `serious` or `critical` items.
If anything required fails, stop and give the exact command for the owner.

## 2. For each ticket
1. Definition of Ready: requirement ID and acceptance criteria are in `docs/sprint-04-plan.md`.
2. Branch `feat|docs|chore/<short-name>` from updated `main`.
3. Implement the smallest change meeting the acceptance criteria and the notes. Follow the skill. Only the dependencies the plan allows for this run.
4. Run the real verification commands from the skill. **Quote the actual output** proving each criterion.
5. Run the web-design-guidelines review on changed UI files.
6. Self-review the diff against the Definition of Done in `AGENTS.md`.
7. Conventional Commit, push, open a PR from the template. PR body: ticket ID, acceptance-criteria checklist with evidence, the three riskiest files, assumptions, what you could NOT verify.
8. Wait for CI (`gh pr checks --watch`). If red, read the log and fix. After three failed attempts at the same failure, stop.
9. Merge per MERGE POLICY.
10. Append to `docs/sprint-04-log.md` (create if missing): ticket, status, PR URL, assumptions, deviations.

## 3. Rules that override your instincts
- **Never write the essay.** No prose, opinions or historical claims in any file under the essay folder except factual frontmatter built from the research files, and every such field marked for the author where the skill says so.
- Never publish an essay: `draft: false` is the owner's act.
- Never tag a release or create a GitHub release. Never choose a licence for the site code.
- Never invent a source, figure, image licence or credit. Verify licences on the source page.
- Stay inside the ADRs and the plan's decisions. If something outside them seems necessary, write a proposed ADR in `docs/adr/` and stop.
- Never force-push, never edit `docs/sprint-0/`, never commit secrets.
- Never say something works unless you ran it. List unverified items explicitly.
- Do not start tickets outside this run, even if you have time left.

## 4. Stop conditions
Missing human prerequisite · a new library or ADR needed · same failure 3× · acceptance criteria that contradict each other or the ADRs · any licence you cannot verify.

## 5. Final report (always end with this)
A table: ticket → status → PR link → evidence. Then:
- **I could not verify**
- **Assumptions I made**
- **Decisions only the owner can make** (e.g. site code licence)
- **What the owner must do next** (exact commands)
