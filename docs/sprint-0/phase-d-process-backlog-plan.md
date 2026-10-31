202610250013

Status: #PEIRA 
Tags: [[PEIRA Sprint 0 Phase D]]

# PEIRA Sprint 0 Phase D

Here's Phase D in the same format. It's a document for you to paste into your notes, with **(proposed)** or **[CONFIRM]** where I added something you should check. Your decision on the lens tag is applied (it's now required, so FR-04 in the SRS changes accordingly).

One honest finding before the documents: when I added up the Must tickets, they use almost all of your 40 hours by themselves. The Should modules (embedding explorer, network graph, text lens, 3D viewer) will probably not fit in V1. That's what the cut order was designed for, but you should know now, not on 20 November. Details are in the capacity check at the end of doc 10.

---

# 11 · Working Agreement

## Cadence

- **Sprint length:** 1 week, Monday to Sunday.
- **Calendar:** Sprint 0 ends Fri 30 Oct. Sprint 1: 2-8 Nov. Sprint 2: 9-15 Nov. Sprint 3: 16-22 Nov. Sprint 4 and release: 23-29 Nov (deadline Sun 29 Nov).
- **Weekly hours:** 10, split **7 build / 3 write** (proposed). The writing hours go to Essay 001 research and drafting, so the essay doesn't get crowded out by site work (risk R-03).

## Ceremonies (kept light for a solo project)

|Ceremony|When|Length|Output|
|---|---|---|---|
|Sprint planning|Monday|20-30 min|`sprint-NN-plan.md`: goal, committed tickets, stretch tickets|
|Daily check|Each working session|5 min|One line in the log: done, doing next, blocked|
|Sprint review|Sunday|20 min|Demo to yourself on the live URL; tick tickets against acceptance criteria|
|Retrospective|Sunday|15 min|Three lines: what worked, what hurt, what to change. Also record **actual hours**|

## Board

- **Columns:** Backlog → Sprint (To do) → In progress → Review → Done.
- **WIP limit:** 2 tickets in progress at once.
- **Hours check (the rule from R-05):** at the end of every sprint, compare actual to planned hours. If you're behind, apply the cut order _that same day_. Don't carry the problem into the next sprint.

## Definition of Ready (a ticket can start only if)

- It has a linked requirement ID.
- It has written, testable acceptance criteria.
- It has a size estimate (S/M/L).
- Its dependencies are done or not needed.

## Definition of Done (a ticket is finished only if)

Keep this honest and small.

- [ ] Acceptance criteria all met
- [ ] Works at 360px and 1280px
- [ ] Keyboard-usable (where it has UI)
- [ ] Lint, type check, and build pass in CI
- [ ] Tests added where logic exists (schemas, utilities)
- [ ] No console errors
- [ ] Merged to `main` through a pull request and visible on the preview or live URL
- [ ] If it uses third-party assets or libraries: license and attribution recorded

## Git rules

- **Branches:** `feat/short-name`, `fix/short-name`, `docs/short-name`, `chore/short-name`. Short-lived, merged within a sprint.
- **Commits:** Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`).
- **Pull requests:** every change goes through a PR, even solo. The PR template carries the Definition of Done as a checklist. You review your own PR line by line before merging.
- **`main` is always deployable.** Protect it so the CI check must pass first.
- **Versioning:** SemVer. The release is tagged `v1.0.0`.

## Rules for working with AI agents (proposed)

These turn section 9 of your original document into practice:

1. AI writes code; **you** own the decisions. If an agent proposes a library or structure not in an ADR, stop and write a new ADR first.
2. Give agents one ticket at a time, with its acceptance criteria pasted in.
3. Read every diff before merging. If you can't explain what a piece does, ask the agent to explain it or simplify it.
4. Test on a real phone before closing any visual ticket (risk R-06).
5. Never paste secrets or API keys into a prompt or commit them.
6. Keep an `AGENTS.md` (or equivalent) in the repo with the stack, ADR summary, folder structure, and the module contract, so every agent session starts with the same rules.

## Decision rule for scope

At each sprint review: **cut from Should and Could first, never from Must.** The cut order in doc 02 is binding.

---

# 12 · Product Backlog

**Size key:** S ≈ 1 hour, M ≈ 2 hours, L ≈ 4 hours of focused build time with AI assistance. These are guesses. You'll recalibrate after Sprint 1 using your actual hours.  
**Priority:** M = Must, S = Should, C = Could. **Type:** B = build hours, W = write/research hours.

## Sprint 1: Foundation

| ID    | Title                            | Description                                                                                                                       | Req                                       | Acceptance criteria                                                                                                                                                                                | Size      | Pri         |
| ----- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- |
| P-001 | Initialize project               | Astro project with strict TypeScript, React, Tailwind, and MDX configured; repo created with README.                              | NFR-06                                    | `pnpm dev` serves a page; `pnpm build` succeeds; TypeScript strict mode on; one MDX file renders.                                                                                                  | S         | M           |
| P-002 | Code quality tooling             | ESLint, Prettier, commit hooks, Conventional Commits check, PR and issue templates (with the DoD checklist).                      | NFR-06                                    | A bad commit message is rejected; a lint error blocks the commit; PR template shows the DoD.                                                                                                       | S         | S           |
| P-003 | CI and deployment pipeline       | GitHub Actions runs lint, type check, and build on every push; Cloudflare Pages deploys `main` and creates PR previews.           | NFR-09, NFR-06                            | Pushing to a branch shows a preview URL; merging to `main` updates the live `.pages.dev` site; a failing check blocks the merge.                                                                   | M         | M           |
| P-004 | Design tokens and fonts          | Tokens (backgrounds, text, accent, data colors, spacing, type scale) as CSS variables; fonts self-hosted; a token reference page. | Design brief, NFR-03                      | No hardcoded colors in components; a token page renders all tokens; body text contrast meets AA.                                                                                                   | S         | M           |
| P-005 | Essay content schema             | Content collection with the full frontmatter schema from doc 06 (lens required) and clear build errors.                           | FR-01, FR-04, FR-05, FR-06, FR-09, NFR-10 | A valid sample essay builds; essays missing sources, image credit/license, lens, repo URL, or lab fields each fail the build with a message naming the field; drafts are excluded from production. | M         | M           |
| P-006 | Base layout and routing skeleton | Global layout, header/nav (Essays, Archive, Lab, About), footer, and empty route pages.                                           | NFR-01                                    | All routes resolve; layout works at 360px and 1280px; nav is keyboard-usable.                                                                                                                      | M         | M (stretch) |
| P-007 | Dockerfile                       | Multi-stage Dockerfile that builds and serves the site.                                                                           | NFR-07                                    | `docker build` and `docker run` serve the site locally.                                                                                                                                            | S         | S (stretch) |
| P-008 | Essay 001 research file          | Source list, timeline of the battle days, first draft of the disputed figures sheet (ranges and sources).                         | DR-02, X2                                 | A document listing at least 10 sources; a figures sheet where no number lacks a source or range.                                                                                                   | M (write) | M           |

## Sprint 2: Core product

|ID|Title|Req|Acceptance criteria|Size|Pri|
|---|---|---|---|---|---|
|P-009|Homepage|FR-02|Lists published essays newest first; drafts absent in the production build.|S|M|
|P-010|Essay page template|FR-01, FR-06|Renders MDX, metadata, reading time, footnotes and bibliography.|M|M|
|P-011|Image component|FR-05|Caption, credit, license displayed; build fails when credit or license is missing.|S|M|
|P-012|Archive and topic pages|FR-03, FR-04|Archive lists all essays; filter by topic returns correct sets.|M|M|
|P-013|About page|FR-08|Page reachable from the nav; states who I am, what PEIRA is, and contact.|S|M|
|P-014|Lab panel|FR-09, DR-04|Shows repo link, data sources, method, limitations, reproducibility checklist from frontmatter.|M|M|
|P-015|Corrections section|FR-07|Dated correction notes display from metadata.|S|S|
|P-016|Essay 001: research repo and first data export|DR-03, DR-04, X1|Public repo with README, pinned environment, seeded run, and one exported JSON file in the module format.|L (write)|M|

## Sprint 3: Toolkit and data

|ID|Title|Req|Acceptance criteria|Size|Pri|
|---|---|---|---|---|---|
|P-017|Module contract and data loading|MOD-08, DR-01|Every module takes a data file reference; malformed data fails the build naming the file; modules support a text or table fallback.|M|M|
|P-018|Map with timeline|MOD-01, MOD-02|Slider filters dated points; play and pause work; popups show source and range.|L|M|
|P-019|Scenario layers|MOD-03, DR-05|Toggle between historical and at least one alternative scenario; assumptions text changes with it; labeled as exploration.|M|M|
|P-020|Lazy loading and fallbacks|NFR-02, NFR-03|Modules load only when scrolled into view; every module has a text or table alternative; reduced motion respected.|M|M|
|P-021|Lab (sandbox) page|FR-10|Shows each built module with demo data.|S|S|
|P-022|Network graph|MOD-05|Reads nodes and edges; hover and click work.|M|S|
|P-023|Embedding explorer|MOD-04|Reads precomputed coordinates; hover and click show details.|M|S|
|P-024|Analysis lens|MOD-06|Toggle highlights pre-annotated terms.|M|S|
|P-025|3D artifact viewer|MOD-07|Loads one open-licensed model with rotate, zoom, one annotation.|M|S|
|P-026|Essay 001: scenario analysis|DR-03, DR-05|2-3 scenarios defined by explicit parameters; reproducible with fixed seeds; exported as module data.|L (write)|M|

## Sprint 4: Release

|ID|Title|Req|Acceptance criteria|Size|Pri|
|---|---|---|---|---|---|
|P-027|Write and publish Essay 001|Charter|Essay meets every item in the minimum standard and passes validation.|L (write)|M|
|P-028|SEO, sitemap, RSS|NFR-04|Unique title and description per page; social card; valid sitemap and feed.|M|S|
|P-029|Custom domain and HTTPS|NFR-05, NFR-08|Site loads on the custom domain over HTTPS; costs match the budget.|S|M|
|P-030|QA pass|NFR-01, NFR-02, NFR-03, NFR-05|Checked at 360/768/1280px; Lighthouse accessibility ≥ 95 and performance targets measured; dependency audit has no high-severity issues.|M|M|
|P-031|Release|Release notes|Release notes written; `v1.0.0` tagged and deployed.|S|M|
|P-032|Analytics and newsletter|Growth pathway|Privacy-friendly analytics installed.|S|C|

## Coverage check

Every requirement maps to a ticket:

- **FR-01..10:** P-005, P-009, P-010, P-011, P-012, P-013, P-014, P-015, P-021.
- **MOD-01..08:** P-018, P-019, P-022, P-023, P-024, P-025, P-017.
- **DR-01..05:** P-017, P-008, P-016, P-026.
- **NFR-01..10:** P-006, P-020, P-030, P-028, P-029, P-001/002/003, P-007, P-003, P-005.

---

# 13 · Sprint 1 Plan

**Dates:** Mon 2 Nov to Sun 8 Nov. **Hours:** 10 (7 build, 3 write).

## Sprint goal

By Sunday, pushing to `main` automatically checks, builds, and deploys an empty but styled PEIRA site, and the essay schema rejects any essay that breaks my publishing rules.

## Committed

|Ticket|Hours|
|---|---|
|P-001 Initialize project|1|
|P-002 Code quality tooling|1|
|P-003 CI and deployment pipeline|2|
|P-004 Design tokens and fonts|1|
|P-005 Essay content schema|2|
|P-008 Essay 001 research file (write)|3|

## Stretch (only if committed work finishes early)

P-006 Base layout and routing skeleton, then P-007 Dockerfile.

## "Sprint complete" and demo

1. Push a small change and show it live on the `.pages.dev` URL without a manual step.
2. Add a deliberately broken essay (no sources, no image credit) and show the build failing with a readable message. Then fix it and show it passing.
3. Open the token reference page on your phone.
4. Show the research file with at least 10 sources.

## Risks for this sprint

|Risk|Plan|
|---|---|
|Setup and deployment take longer than 2 hours (first time with Cloudflare and GitHub Actions)|Deploy a bare Astro page first, then add checks. If stuck for more than an hour, move P-004 or P-005 to stretch and note it in the retro.|
|The schema is too strict or too loose|Write three sample essays: valid, missing sources, missing credit. Test each.|
|Research eats the build hours|The 3 write hours are fixed. Don't borrow them for build, and don't spend them on anything else.|

---

## Capacity check (read this one)

||Hours|
|---|---|
|Total capacity (4 sprints × 10h)|40|
|Estimated build hours for **Must** tickets|about 31|
|Estimated write hours (research repo, scenario analysis, the essay itself)|about 12-14|
|Total needed for Musts alone|about 43-45|

That is already over budget, and the Should modules (P-022 to P-025) would add about 8 more. My honest recommendation is:

1. **Ship v1.0.0 on 29 Nov with the Musts**, meaning Lab panel, map with timeline, scenario layers, and the first essay.
2. **Treat modules 04-07 as v1.1**, built in your first free weeks in December, using the growth pathway. They are already designed to plug in, so nothing gets rewritten.
3. **Make the call at the end of Sprint 2.** If your actual hours show you ahead, pull Should tickets in. If behind, the cut is already decided.

If you'd rather ship all modules in V1, the options are more hours per week or a later date. Cutting quality isn't one of them.

## What I changed or added

- **FR-04 in the SRS:** the lens is now required (update the SRS table and the schema ticket P-005 already reflects it).
- **Sprint 1 scope:** I deliberately pushed layout (P-006) to stretch, so the first sprint stays achievable with a first-time deployment setup.
- **Added by me (confirm or edit):** the 7/3 build/write split, ticket sizes, the AI-agent rules, and the DoD checklist.
- **Still open [CONFIRM]:** the V1 size of the scenario analysis. I assumed "historical plus 2 alternatives, each defined by a few explicit parameters" in P-026.

## Sprint 0 finish line (by Fri 30 Oct)

Move the three updated Phase A items (deadline, hours, hosting) into your notes, then complete:

- [ ] Moodboard (8-10 references) and wireframes (home, essay with map, archive, Lab, mobile essay)
- [ ] GitHub repo created with `main` protected, plus the board with these tickets
- [ ] Cloudflare account created
- [ ] **Domain bought now.** DNS and verification can take time, and P-029 is much safer if it's done early
- [ ] Verify the ⚑ items: hosting free-tier terms, GSAP license, map tile terms
- [ ] Essay 001 brief saved in the repo's docs folder

When those are done, you're ready for Sprint 1 on 2 November. If you'd like, paste your board or moodboard notes and I'll review them, or we can start preparing the Sprint 1 kickoff steps (repo creation, the `AGENTS.md` file, and the first agent prompts).












---

# References

