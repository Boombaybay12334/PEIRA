202610131931

Status: #PEIRA 
Tags: [[Peira SDLC agile 1 Month Sprint]]

# PEIRA Sprint 0 Phase A


---

# 00 · Vision Brief

## Why PEIRA exists

PEIRA is a personal platform for researching and writing about the things I'm drawn to: history, wars, archaeology, paleontology, and the odd corners in between. It sits at the intersection of those subjects and my work in machine learning and AI, which I use as a lens to look at old subjects from a new angle.

It is a place where I can think in public, write in my own way, and build things around my writing (maps, visualizations, experiments) that a normal blog can't hold.

## Goals, in priority order

1. **Personal expression and freedom (primary).** I write what I want, in the tone I want, with the visual presentation I want. No platform rules, no template limits.
2. **Portfolio (secondary).** PEIRA shows my curiosity, analytical ability, and engineering skill to anyone who lands on it.
3. **Audience and community (not a starting point).** PEIRA isn't built to grow an audience. If the way I write builds a recognizable brand over time, the foundation should let me serve a community later. That is a possible outcome, not a V1 target.

## Who it's for

- **Primarily me.** Publishing should be smooth and enjoyable enough that I keep doing it.
- **A curious visitor,** likely arriving from my portfolio, a shared link, or a search for an unusual topic. They enjoy history or technology and stay because the site feels different and the work is credible.
- **The person I most want to impress (proposed):** an engineer, researcher, or recruiter who lands from my portfolio and sees someone who can research seriously _and_ build.

## What success looks like in 6 months

- PEIRA is live on a custom domain and runs reliably.
- I've published 2-3 essays.
- Writing and publishing is smooth for me, with no painful workflow.
- Development doesn't drag on: V1 ships on **10 November 2026**.

## What PEIRA is not

- Not a basic blog or simple article platform.
- Not a themed template. It has its own visual identity, with maps, assets, animation, and a distinctive design.
- Not a text-only site. AI and mathematical analysis are part of how subjects get explored, not decoration.
- Not a social platform. It's personal first.

---

# 01 · Editorial Charter

## Content pillars

**Topics** (what I write about):

1. **World wars:** events, logistics, decisions, aftermath.
2. **Historical artifacts and civilizations:** objects, sites, and what they tell us.
3. **Paleontology and biology-related subjects.**

**Lens** (how I look at them):  
4. **Machine learning, AI, and security.** Both a subject and the method I apply to the three topics above. Every essay carries some analysis or ML, even where it doesn't look natural at first, because the goal is to show an angle people don't usually see.

## What a PEIRA essay looks like

Length, structure, and tone depend on the subject and my mood while researching and writing. Some essays will be casual, some formal. That flexibility is deliberate and part of the freedom PEIRA exists for. It does not apply to the standards below.

## Minimum standard for every essay

Whatever the tone, each published essay must have:

- A list of sources (papers, primary sources, datasets).
- A linked **GitHub repository** with code, data references, and what's needed to follow or reproduce the analysis.
- Claims backed by evidence and traceable to a source or experiment.
- A stated **limitations** note for any analysis or ML result.
- Credit and license recorded for every image and dataset.

## Sources and citations

I rely on research papers, primary sources, and my own experiments. The repository tracks everything around an essay so it can be checked. Legitimacy comes from being open, not from sounding authoritative.

## Handling data and ML claims

- Everything is open source wherever possible: code, methodology, and (where licensing allows) data.
- I defend claims with evidence and state their limitations.
- Claims are always open to challenge. **Readers can raise questions or corrections via GitHub issues on the essay's repo, or by email (proposed).**

## Corrections policy (proposed)

If I find or am shown an error after publishing, I fix it, update the "last updated" date, and add a short visible note on what changed. I don't silently edit published claims.

## Image and data licensing (proposed)

I use public-domain or openly licensed material (museum open-access collections, Wikimedia Commons, and similar). I always credit the source and record the license when I add the asset.

## Publishing cadence

Realistically **one to two essays per month.** Quality and rigor matter more than frequency.

---

# 02 · Scope and Constraints

## V1 deadline

**Hard deadline: 10 November 2026.** V1 is done on that day if the site is live on its custom domain, my first essay is published on it, and the PEIRA Visual Toolkit (below) is working at its basic level.

## The signature feature: the PEIRA Visual Toolkit

Instead of one feature, PEIRA's identity is a **toolkit of reusable visual and analytical modules**, built into the foundation from V1 so that no essay is ever limited to plain text. Each module exists at a **basic level** in V1 and gets better over time.

|#|Module|Definition of "basic" for V1|
|---|---|---|
|1|**Lab panel**|A drawer or section on each essay showing repo link, data sources, method summary, limitations, and a reproducibility checklist, filled from the essay's metadata.|
|2|**Interactive map with timeline slider**|A 2D map that takes a JSON file of dated points and animates or filters them with a slider. Works with a small sample dataset.|
|3|**Embedding explorer**|A 2D scatter of precomputed embedding coordinates from a JSON file, with hover/click details. One working demo dataset.|
|4|**Entity network graph**|A force-directed or static graph from a nodes/edges JSON, with hover and click. One demo dataset.|
|5|**Analysis lens on text**|A toggle that highlights pre-annotated entities or terms in an essay passage, using annotations stored in a file. Manual or precomputed annotations are fine.|
|6|**3D artifact viewer**|Loads one open-licensed 3D model, lets the reader rotate and zoom, and shows one or two annotation points.|

**How the modules work:** the heavy work (ML, NLP, embeddings) runs offline in Python and exports static files. The site only renders the results, so hosting stays free and no backend is needed.

**First-essay rule (proposed):** my first essay uses **at least two** modules, chosen to fit its topic. Remaining modules are shown on a demo/sandbox page so all six are proven working.

**Cut order if time runs short** (dropped first to last): 6 (3D viewer), 5 (text lens), 4 (network graph), 3 (embedding explorer). Modules 1 and 2, plus a basic essay publishing workflow, are the floor. They are never cut.

## MoSCoW

**Must (V1 fails without these)**

- Write and publish essays, with the full workflow working properly on localhost.
- Deployed publicly on free hosting (Render or Vercel).
- Custom domain connected.
- Toolkit modules 1 and 2 (Lab panel, map with timeline) at basic level.
- At least one real essay published.

**Should (important, V1 survives without)**

- Toolkit modules 3, 4, 5, 6 at basic level, following the cut order above.
- A containerized setup (Docker) kept working from the start, so later deployment elsewhere is easy.
- Responsive layout that works well on mobile.
- Basic accessibility and SEO fundamentals.

**Could (only if time allows)**

- Polish and extra visual assets: more maps, animations, richer interactions beyond the basic modules.
- A "buy me a coffee" link.

**Won't (V1)**

- User accounts, comments, or any community features (possible after V1 if a niche community forms).
- AWS or other cloud deployment (planned for later).
- Monetization beyond a donation link.
- Anything requiring a paid backend or recurring spend beyond the budget below.

## Time available

**Proposed: 10 hours per week**, so about **40 hours** over the 4 weeks to the deadline.

## Budget (proposed)

Minimal. I'm not trying to earn money back; the only revenue possibility is a donation link.

- **Monthly cap:** about ₹0, using free tiers only.
- **Yearly cap:** about the cost of the domain (a one-time yearly purchase), plus nothing else.

## Assumptions

1. AI tools will make it reasonably easy to build the aesthetics and modules I want. **If wrong:** modules ship in the simplest working form (static images or basic charts as a fallback), and polish moves past V1. The cut order applies.
2. Free hosting tiers are enough for V1 size and traffic.
3. I can sustain 1-2 essays a month alongside development.
4. If any assumption turns out false, I cut from Should and Could first, never from Must.

---

First Essay topic:
**The Battle of Leipzig(1813): Strategy, Chaos, and the Fate of an Empire**


---

# References

https://www.worldhistory.org/article/2287/battle-of-leipzig/

https://www.britannica.com/event/Battle-of-Leipzig