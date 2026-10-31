202610241148

Status: #PEIRA 
Tags: [[PEIRA Sprint 0 Phase A]]

# PEIRA Sprint 0 Phase B

---

# 03 · User Stories

## Essay 001 brief (your original stories, cleaned up)

These two stories describe the _content_ of the first essay, so they live here as the research brief. The system stories further down are derived from them.

**Author/researcher story.** As the researcher and author, I want to explore the three days of fighting at Leipzig in detail, including how Napoleon's losses in the 1812 Russian campaign shaped this battle and how the battle contributed to the fall of his empire. I want to examine how, despite many weaknesses (especially his lack of cavalry strength), Napoleon's strategy still gave the Sixth Coalition a hard fight. To bring in the ML side, I want to explore multiple strategic possibilities confined to the three days of the battle: routes taken, positions of guns and cavalry, how, why, and when units moved, and the constraints on each side.

**Reader story.** As a reader, I want to understand the battle in full: the backstory of how events led here, how earlier battles shaped it, how a weakened Napoleon withstood the coalition for so long, how the Sixth Coalition managed multinational armies, why they feared him so much even when he was weakened, and what would have happened if Napoleon had won.

**Research questions this implies:**

1. How did the 1812 campaign and earlier 1813 battles shape what happened at Leipzig?
2. How did Napoleon hold on for so long despite a cavalry shortage?
3. How did the Coalition coordinate multinational armies?
4. Why was a weakened Napoleon still feared?
5. What alternative strategic outcomes were plausible within the three days, and what constraints made them possible or impossible?

## System stories (derived)

**Reader**

- R1: As a reader, I want to read essays comfortably on phone or laptop, so that the writing is enjoyable anywhere.
- R2: As a reader, I want to follow the battle across its days on a map with a timeline, so that I can see what moved where and when.
- R3: As a reader, I want to see sources, the code repository, and limitations, so that I can judge how much to trust the claims.
- R4: As a reader, I want to explore "what could have happened" scenarios and see how the outcomes differ, so that I understand the choices and constraints.
- R5: As a reader, I want the backstory in context (1812, earlier 1813 battles), so that the battle makes sense.
- R6: As a reader, I want to find essays by topic and browse an archive, so that I can explore the site.
- R7: As a reader, I want to use the site by keyboard and with reduced motion, so that it works for me.

**Author**

- A1: As the author, I want to write with full formatting freedom, so that each essay can look and sound the way I want.
- A2: As the author, I want to embed visual modules anywhere inside an essay, so that visuals are part of the writing and not an afterthought.
- A3: As the author, I want to add sources, images, and credits without friction, so that I can meet my own publishing standard easily.
- A4: As the author, I want to preview locally and publish by pushing to git, so that publishing stays simple.
- A5: As the author, I want to correct an error with a visible note, so that I follow my corrections policy.

**Researcher**

- X1: As the researcher, I want to export Python analysis results as data files the modules read, so that the ML work flows straight into the site.
- X2: As the researcher, I want to record the source and range for every disputed figure, so that conflicting historical numbers are handled honestly.
- X3: As the researcher, I want to re-run scenarios reproducibly, so that results can be verified by anyone.

**Priority:** the Must/Should/Could split for each story follows the SRS table below.

---

# 04 · Software Requirements Specification

**Priority key:** M = Must, S = Should, C = Could, matching doc 02. Requirements are stack-neutral on purpose, since the tools are chosen in the Phase C decision records.

## Functional: essays and site

|ID|Requirement|How I'll verify|Traces to|Pri|
|---|---|---|---|---|
|FR-01|An essay page renders long-form content with title, publish date, updated date, topics, and computed reading time.|Open the sample essay; all fields display.|R1, A1|M|
|FR-02|The homepage lists published essays, newest first. Drafts never appear in production.|Mark an essay as draft; confirm it's absent from the production build.|R6|M|
|FR-03|An archive page lists all essays and filters by topic.|Add 3 essays across 2 topics; filters return the correct sets.|R6|M|
|FR-04|Each essay has one or more topic pillars (wars, artifacts, paleo/bio) plus an optional lens tag (ML/AI/security). Only defined values are accepted.|Enter an invalid topic; validation fails.|R6|S|
|FR-05|Images carry caption, credit, and license. The build fails if credit or license is missing.|Remove a credit; build fails with a clear message.|A3, licensing rule|M|
|FR-06|Citations or footnotes render with a bibliography at the end. An essay with no sources fails validation.|Publish with an empty source list; validation fails.|R3|M|
|FR-07|A corrections section shows dated notes from the essay's metadata.|Add a correction entry; it appears with a date.|A5|S|
|FR-08|An About page states who I am, what PEIRA is, and how to contact me, and is reachable from the main navigation.|Click through from the nav.|Portfolio goal|M|
|FR-09|A **Lab panel** on every essay shows repo link, data sources, method summary, limitations, and a reproducibility checklist, filled from essay metadata. Missing required fields fail validation.|Open an essay; every field renders.|R3, X2|M|
|FR-10|A sandbox/demo page shows every toolkit module working with sample data.|Visit the page; all modules render.|Phase A first-essay rule|S|

## Functional: toolkit modules

|ID|Requirement|How I'll verify|Traces to|Pri|
|---|---|---|---|---|
|MOD-01|**Map with timeline.** Reads a data file of dated points/paths (id, lat, lon, time, label, unit, source, confidence). A slider filters by time, with play and pause.|Load the Leipzig sample data; the slider changes what's visible.|R2, R5|M|
|MOD-02|Map popups show the source and uncertainty range for each figure.|Click a unit; popup shows source and range.|R3, X2|M|
|MOD-03|**Scenario layers.** The map accepts multiple scenario datasets (historical vs. alternatives). A toggle switches between them, and each scenario's assumptions are shown.|Toggle between 2 scenarios; map and assumptions both change.|R4, reader story|M|
|MOD-04|**Embedding explorer.** Reads precomputed 2D coordinates with labels; hover/click shows details.|Load demo dataset; hover shows detail.|Phase A toolkit|S|
|MOD-05|**Network graph.** Reads nodes and edges (e.g. command structure); hover and click work.|Load Leipzig command-structure data; nodes respond.|Phase A toolkit|S|
|MOD-06|**Analysis lens.** A toggle highlights pre-annotated terms in an essay passage, using an annotation file.|Toggle on; annotated terms highlight.|Phase A toolkit|S|
|MOD-07|**3D artifact viewer.** Loads one open-licensed model; rotate, zoom, and one annotation point.|Load model; rotate and see the annotation.|Phase A toolkit|S|
|MOD-08|Modules are embeddable anywhere in an essay and take their data by file reference only.|Embed MOD-01 mid-essay with a single line.|A2, X1|M|

## Data and research

|ID|Requirement|How I'll verify|Traces to|Pri|
|---|---|---|---|---|
|DR-01|All module data lives in versioned files with a documented format. A malformed file fails the build with a clear error.|Break a field; build fails and names the file.|X1|M|
|DR-02|Every disputed figure (troop numbers, casualties) stores a range and a source, never a bare number.|Review the dataset; no figure lacks a source.|X2|M|
|DR-03|Analyses are reproducible: fixed random seeds, pinned dependencies, and a README with run steps in the essay's repo.|Re-run from a clean checkout; results match published figures.|X3, charter|M|
|DR-04|Each essay links to a public GitHub repo.|Link resolves from the Lab panel.|Charter|M|
|DR-05|The scenario analysis states its assumptions and is labeled as an exploration, not a prediction.|Read the scenario section; assumptions and label are present.|R4, X3|M|

## Non-functional

|ID|Requirement|How I'll verify|Pri|
|---|---|---|---|
|NFR-01 Responsive|Usable at 360px, 768px, and 1280px widths with no horizontal scroll.|Check at all three widths.|M|
|NFR-02 Performance|Essay pages without modules reach Lighthouse mobile performance ≥ 90. Modules load only when the reader scrolls to them.|Run Lighthouse; check the network tab on a module essay.|S|
|NFR-03 Accessibility|Full keyboard navigation; WCAG AA contrast; reduced-motion respected; every map/graph has a text or table alternative; Lighthouse accessibility ≥ 95.|Keyboard-only walkthrough; automated check.|M|
|NFR-04 SEO|Unique title and description per page, social preview card, sitemap, and RSS feed.|Inspect page source; validate sitemap and feed.|S|
|NFR-05 Security|HTTPS on the custom domain; no secrets in the repo; dependency audit shows no high-severity issues at release.|Run the audit; scan the repo.|M|
|NFR-06 Maintainability|Strict typing, linting, and an automated check on every push.|CI passes on main.|S|
|NFR-07 Portability|A container image builds and serves the site locally.|Build and run the container.|S|
|NFR-08 Cost|Hosting costs ₹0 per month; the only yearly cost is the domain.|Review bills at release.|M|
|NFR-09 Publishing workflow|A new essay goes live with a git push and no manual deploy steps.|Push a test essay; it appears live.|M|
|NFR-10 Content integrity|No essay is publishable without sources, image credits, and a limitations note.|Covered by FR-05, FR-06, FR-09.|M|

**Coverage check:** every system story (R1-R7, A1-A5, X1-X3) is covered by at least one requirement.  
**[CONFIRM]** In FR-04, "optional lens tag" assumes each essay may or may not tag ML/AI. Your charter says every essay carries some analysis, so you may want to make the lens **required**.

---

# 05 · Risk Register

**L** = likelihood, **I** = impact (Low / Medium / High).

| ID   | Category | Risk                                                                                              | L   | I   | Mitigation                                                                                                                                       |
| ---- | -------- | ------------------------------------------------------------------------------------------------- | --- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| R-01 | Scope    | Seven modules plus an essay is far more than 40 hours allows.                                     | H   | H   | The cut order in doc 02 is binding: 07, 06, 05, 04 are cut first. Decide at the end of each sprint, not at the end of the project.               |
| R-02 | Scope    | The ML scenario analysis grows without bound (trying to simulate all of Leipzig).                 | H   | H   | Define the minimum now: 2-3 scenarios, a small set of explicit assumptions, labeled as exploration. Anything beyond goes into a follow-up essay. |
| R-03 | Time     | Essay research and writing compete with site-building for the same hours.                         | H   | H   | Split each week's hours between "build" and "write." Start the research file in Sprint 0 and write the essay across all four sprints.            |
| R-04 | Time     | Sprint 0 overruns into Sprint 1.                                                                  | M   | M   | Fixed end of 30 Oct. Remaining docs (decisions, design, working agreement) stay short.                                                           |
| R-05 | Time     | Work commitments reduce available hours again (it already happened once).                         | M   | H   | Check actual hours at the end of each sprint and apply the cut order. A second slip means cutting scope, not moving the date again.              |
| R-06 | Tech     | AI-generated visual code works in demos but breaks, bloats the page, or is hard to maintain.      | M   | M   | Keep modules small and isolated, review generated code, test each on a phone. Fallback: static images with captions.                             |
| R-07 | Tech     | Free tier limits (map tiles, build minutes, bandwidth) are hit.                                   | L   | M   | Use open map tile options with attribution, check limits in the hosting decision, and avoid runtime services.                                    |
| R-08 | Tech     | Large visualization libraries slow every page.                                                    | M   | M   | Lazy-load modules (NFR-02) and measure page weight early.                                                                                        |
| R-09 | Content  | Sources conflict on troop numbers, casualties, and timings for Leipzig.                           | H   | M   | Store ranges and sources (DR-02), say so in the essay, and treat the disagreement as part of the analysis.                                       |
| R-10 | Content  | Over-claiming from ML on sparse, uncertain historical data.                                       | M   | H   | Required limitations section (FR-09), explicit assumptions (DR-05), and wording like "exploration" instead of "proves."                          |
| R-11 | Legal    | Modern map scans, tiles, or datasets carry licenses even though 1813 originals are public domain. | M   | M   | Record a license for each asset (FR-05), prefer open-access collections and Wikimedia Commons, and keep a credits list in the repo.              |
| R-12 | Legal    | Missing attribution for map tiles or libraries.                                                   | M   | L   | Attribution line on every map; check library licenses during Sprint 1.                                                                           |

**[CONFIRM]** The V1 scope of the "what if Napoleon had won" scenario (R-02) is the most important decision in this phase. Write down in one sentence how small the V1 version is. My suggestion: a few parameter changes to the historical situation, shown as map layers.

---

## What I changed or added (please check)

**Changes from your draft:**

- **Added a third persona (researcher)** and split your two stories into the essay brief and system stories, because the SRS needs _system_ behavior and your stories described _essay content_. Nothing you wrote was discarded.
- **Pulled five research questions** out of your two stories so the essay has a clear spine.

**Added by me (confirm or delete):**

- The system stories R1-R7, A1-A5, X1-X3, and the whole SRS and risk register, since you asked me to fill those in.
- Specific numbers: Lighthouse targets of 90 and 95, three test widths, and the ₹0 hosting rule. Adjust them if they feel wrong.
- Priority levels, built to match doc 02's Must/Should split.

**Update in Phase A (new deadline):**

- Deadline becomes **29 November 2026** everywhere it appears.
- The vision brief's "V1 ships on 10 November" becomes 29 November.
- Time available stays 10 hours/week, about 40 hours over 4 weeks.

**Still only you can answer:** the V1 size of the scenario analysis, and whether the lens tag is required.

Once those two are settled, Phase B is done. Next is **Phase C: decisions** (the decision records, information architecture, design brief, and architecture diagram). It helps to look into two or three options for your site framework, hosting, and map library ahead of time, because each decision record needs real alternatives.












---

# References

https://claude.ai/share/873e5d7d-61a5-40a9-a652-585af2e5e209