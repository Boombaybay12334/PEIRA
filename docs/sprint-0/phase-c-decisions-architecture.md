202610242338

Status: #PEIRA 
Tags: [[PEIRA Sprint 0 Phase B]]

# PEIRA Sprint 0 Phase C

Phase C is where your lack of web background hurts most, so I did more here than in A and B. I picked defaults, gave the options I rejected, and wrote the reasoning in your voice. Verify the items I flag before you finalize, because free-tier terms and licenses change and I can't confirm today's versions.

## First: what these tools actually are

|Tool|What it is|Role in PEIRA|
|---|---|---|
|**Astro**|A site framework that builds fast static pages and only adds JavaScript where you ask for it ("islands")|The foundation|
|**React**|A UI library for interactive pieces|Powers the interactive modules inside Astro pages|
|**GSAP**|Industry-standard animation library, strongest for scroll-linked and timeline animation|The one animation library|
|**anime.js**|A lighter animation library that overlaps with GSAP|Not used (two libraries doing one job is waste)|
|**three.js**|Browser 3D|Module 07 (3D viewer) and later 3D scenes|
|**MapLibre GL JS**|Open-source interactive map engine|Module 01 (map with timeline)|
|**D3 / Observable Plot**|Data visualization libraries|Embedding explorer, network graph, charts|

The key idea: **Astro serves fast static pages, and the heavy visual modules load only when a reader scrolls to them.** That's how you get a cinematic site on free hosting without it feeling slow.

## Two corrections to be aware of

1. **Hosting changes from Phase A.** Doc 02 says "Render or Vercel." I recommend **Cloudflare Pages** instead (reasons in ADR-009). It still satisfies the Must (free, public, custom domain), but update doc 02 if you agree.
2. **"AI agents write the code" is true but doesn't remove the risk.** Someone still has to run it, spot when it's broken on a phone, and keep the structure clean. That's what risk R-06 covers, and why the architecture below is built around small, isolated modules that an agent can build or replace one at a time.

---

# 06 · Information Architecture and Content Model

## Pages and navigation

|Page|URL|Purpose|
|---|---|---|
|Home|`/`|Featured essay plus latest essays|
|Essay|`/essays/[slug]`|The essay with embedded modules, Lab panel, sources, corrections|
|Archive|`/archive`|All essays, filter by topic|
|Topic|`/topics/[topic]`|Essays in one pillar (wars, artifacts, paleo/bio, ML lens)|
|Lab / sandbox|`/lab`|All toolkit modules running on demo data (FR-10)|
|About|`/about`|Who I am, what PEIRA is, contact|
|Feed and sitemap|`/rss.xml`, `/sitemap.xml`|Machine-readable|

Main navigation: Essays, Archive, Lab, About. **Why this URL structure (proposed):** short, readable, stable URLs that won't change when the site grows. Series can be added later as `/series/[name]` without breaking anything.

## Essay fields (frontmatter)

|Field|Required|Notes|
|---|---|---|
|title, slug, description|Yes|Description also feeds SEO and social previews|
|publishDate, updatedDate|Yes / optional||
|topics|Yes|One or more of: wars, artifacts, paleo-bio|
|lens|Yes **[CONFIRM]**|ML/AI/security, since your charter says every essay carries analysis|
|heroImage (src, alt, caption, credit, license)|Yes|Build fails if credit/license missing (FR-05)|
|sources|Yes|Build fails if empty (FR-06)|
|repoUrl|Yes|Link to the essay's own GitHub repo (DR-04)|
|lab (method, limitations, reproducibility checklist, data sources)|Yes|Feeds the Lab panel (FR-09)|
|corrections|Optional|Dated notes (FR-07)|
|draft|Yes, default true|Drafts never ship (FR-02)|
|series|Optional|Reserved for later|

## Where files live

```
src/content/essays/leipzig-1813/
  index.mdx              <- the essay
  data/                  <- exported JSON from the research repo
  images/
```

The research work (notebooks, models) lives in a **separate repo per essay**, as your charter says. Only the exported results are copied into the site.

---

# 07 · Design Brief

This is the document where you most need to decide. I wrote a proposed direction based on your words ("sexy, aesthetic, cool"). Change anything that doesn't feel like you.

## Look and feel

**Three words (proposed):** archival, analytical, cinematic.  
**Concept:** a digital archive crossed with a research lab. Think old maps and manuscripts treated with modern data overlays. Dark, rich surfaces with warm paper tones and glowing data accents. Reading comes first, spectacle second.  
**What it reacts against:** generic blog themes, flat white pages with a grey sans-serif, and dashboards that look like corporate analytics.

**Collect 8-10 references yourself** (this is the moodboard, and nobody else can do it): sites that gave you the "this is cool" feeling, old map illustrations, game or film UI you like. Save them in `docs/moodboard/` with one line about what you like in each.

## Typography (proposed)

- **Body:** a readable serif, built for long text (candidates: Newsreader, Source Serif).
- **Headings:** a distinctive display face with some character (candidates: Fraunces, or a classic engraved-style serif).
- **Data and labels:** a monospace (candidates: JetBrains Mono, IBM Plex Mono).
- Self-host fonts (fewer external requests and no tracking). Verify each font's license (most of these are open).
- Reading width capped near 65 characters per line.

## Color and tokens (proposed starting point)

- **Dark theme default** with a light "paper" theme later.
- Token groups: background layers, text (primary, secondary, muted), accent (one warm "ember" accent), data colors (a small ordered set for armies, scenarios, categories), and borders.
- Rule: **colors live only as tokens** (CSS variables), never hardcoded. That's what lets you retheme the whole site in an afternoon.
- **Data color rule:** never rely on color alone (accessibility), so pair color with shape or label.

## Motion rules

- Motion must **explain**, not decorate: scrolling advances the timeline, a map moves because time moves.
- Every animation respects the reduced-motion setting (NFR-03).
- Animation library: GSAP only. Small hover effects use plain CSS.

## Accessibility commitments

WCAG AA contrast, full keyboard use, visible focus states, a text or table alternative for every map and graph, no content that exists only in a canvas.

## Wireframes needed before building (sketch on paper or Figma, one page each)

Home, essay page (with a map module embedded mid-text), archive, Lab page, and the mobile version of the essay page.

---

# 08 · High-Level Architecture

```
 RESEARCH SIDE (offline, per essay repo)           SITE SIDE (this repo)
 ─────────────────────────────────────           ───────────────────────────────
 Python notebooks, ML, scenarios                  src/content/essays/<slug>/
        │                                          ├─ index.mdx   (text)
        ▼                                          └─ data/*.json (copied results)
 Export versioned JSON                                   │
 (schemaVersion, source, range)  ── copy ──▶  Build-time validation (schemas)
                                                         │
                                                         ▼
                                              Astro builds static HTML
                                              + island components (React)
                                                         │
                                                         ▼
                                  Cloudflare Pages (static hosting, custom domain)
                                                         │
                                                         ▼
                                  Reader's browser: page loads fast;
                                  map / 3D / graph load only when scrolled into view
```

**The module contract (the most important design idea here).** Every toolkit module is a self-contained component that follows the same rules: it takes a data file path and a small config, it supports a **text/table fallback**, and it can optionally be **controlled by an external value like "current time."** That last rule is what lets you add scroll-driven storytelling later without rewriting anything, because the map is already controllable.

**Data flow:** research happens offline in Python and never runs on the server. The site only displays exported results, so hosting stays free and there is no backend to maintain. **Where ML plugs in later:** (a) new exported data files, (b) in-browser models for small interactive demos, or (c) a small API service if a feature needs it. The architecture leaves a clean place for each.

---

# 09 · Architecture Decision Records

Each ADR follows the same template. **Verify before finalizing** any claim marked with ⚑.

### ADR-001 · Core framework: Astro

- **Context:** I need fast, content-heavy pages, now, with rich interactive pieces later.
- **Options:** Astro; Next.js; SvelteKit; plain HTML/CSS/JS.
- **Decision:** Astro.
- **Consequences:** + Static output, near-zero JS by default, first-class MDX and content collections, islands for interactivity. − A smaller ecosystem than Next.js, and if I ever need a full dynamic app I'd add a service rather than stretch Astro. Rejected Next.js as heavier than a content site needs, and plain HTML as unable to scale into my content model.

### ADR-002 · Content format and schema: MDX with typed content collections

- **Context:** Total writing freedom plus enforceable publishing rules (sources, credits, limitations).
- **Options:** MDX + Astro content collections (with Zod schema); plain Markdown; a headless CMS.
- **Decision:** MDX with schema-validated frontmatter. Headless CMS deferred.
- **Consequences:** + Components can sit anywhere in prose, and the build fails if I break my own rules. − Authoring is in files (fine for me); a CMS can be added later without changing the content model.

### ADR-003 · Interactivity: React islands, lazy-loaded

- **Context:** Modules need real interactivity, but pages must stay fast.
- **Options:** React islands; Svelte or Solid islands; vanilla JS.
- **Decision:** React, hydrated with the "load when visible" directive.
- **Consequences:** + Biggest ecosystem (maps, 3D, charts) and the best AI-agent fluency. − Slightly heavier than Svelte, offset by lazy loading.

### ADR-004 · Styling: Tailwind CSS with design tokens as CSS variables

- **Context:** Fast iteration and consistent design that can be re-themed.
- **Options:** Tailwind + tokens; plain CSS modules; a component library.
- **Decision:** Tailwind with tokens in CSS variables.
- **Consequences:** + Fast to build and easy for agents to work with; tokens keep the identity consistent. − Class-heavy markup, so the rule "no hardcoded colors" must be enforced.

### ADR-005 · Animation: GSAP (with ScrollTrigger); anime.js not used

- **Context:** I want scroll-linked and timeline-driven animation, such as a map advancing as the reader scrolls.
- **Options:** GSAP; anime.js; Motion (Framer Motion); CSS only.
- **Decision:** GSAP for anything sequenced or scroll-driven; plain CSS for micro-interactions.
- **Consequences:** + One robust tool, and scroll-sync is what makes the essays feel cinematic. − Learning curve, and bundle size, so load it only on pages that need it. ⚑ Check GSAP's current license terms for your use before installing.

### ADR-006 · 3D: three.js, via React Three Fiber, lazy-loaded

- **Context:** Module 07 and future 3D scenes.
- **Options:** three.js through React Three Fiber; plain three.js; model-viewer web component; Babylon.js.
- **Decision:** three.js via React Three Fiber, loaded only when the module is visible. If time is short, a **model-viewer** component is the fallback for a basic rotate-and-zoom viewer.
- **Consequences:** + Matches the React islands setup and scales to complex scenes. − Largest library in the stack, hence the strict lazy loading, and it's first in the cut order.

### ADR-007 · Maps and data visualization: MapLibre GL JS, D3 and Observable Plot

- **Context:** Timeline maps, scenario layers, embedding plots, network graphs.
- **Options:** MapLibre; Leaflet; deck.gl; Mapbox. For charts: D3 / Observable Plot; Chart.js.
- **Decision:** MapLibre for maps (open source, no account, supports terrain and animated layers later); D3 and Plot for the rest.
- **Consequences:** + A path to 3D terrain and large movement layers. − More setup than Leaflet; Leaflet is the fallback if MapLibre slows me down. ⚑ **Map tiles:** choose a free tile source and read its usage terms and attribution rules before launch (risk R-07, R-12). Historical map overlays need their own license check (R-11).

### ADR-008 · Research pipeline: Python offline, exported versioned JSON

- **Context:** ML work happens in Python, and the site is static.
- **Options:** Offline export to JSON; a live backend API; in-browser Python or ML.
- **Decision:** Offline export, one research repo per essay. Every file has `schemaVersion`, source, and range. Tools: uv for environments, fixed seeds, pinned dependencies.
- **Consequences:** + Reproducible, free to host, no server. − No live computation for readers in V1. In-browser models and a small API are the later upgrade paths.

### ADR-009 · Hosting and deployment: Cloudflare Pages with GitHub Actions

- **Context:** Free, public, custom domain, push-to-publish (NFR-08, NFR-09).
- **Options:** Cloudflare Pages; Vercel; Netlify; Render static.
- **Decision:** Cloudflare Pages, deploying from the main branch, with preview deployments for pull requests.
- **Consequences:** + Free static hosting, simple custom domain, fast global delivery, no commercial-use ambiguity. − A different dashboard from what you named in Phase A. ⚑ Verify current free-tier limits and terms for all four before committing; Vercel's free plan in particular has usage conditions you should read.

### ADR-010 · Quality and testing: Vitest, Playwright with axe, Lighthouse CI

- **Context:** The definition of done requires tests, accessibility, and performance.
- **Options:** Vitest + Playwright + axe + Lighthouse CI; manual testing only.
- **Decision:** The automated set, kept small: schema and utility tests (Vitest), a few end-to-end and accessibility checks (Playwright + axe), and a Lighthouse budget in CI.
- **Consequences:** + Catches regressions when agents change code. − Setup time in Sprint 1, so keep the test list short.

### ADR-011 · Repository, branching, and versioning

- **Decision:** Trunk-based development on `main` with short-lived feature branches and pull requests, Conventional Commits, and SemVer with the release tagged `v1.0.0`.
- **Consequences:** + Clean history, easy rollbacks, and release notes can be generated. − Slight overhead for a solo project, but it's the habit that's valued.

### ADR-012 · Containerization: multi-stage Dockerfile

- **Decision:** A Dockerfile that builds the site and serves it from a small web server, kept working from Sprint 1 (a Should in doc 02).
- **Consequences:** + A clean path to AWS or any container host later. − Not needed for Cloudflare Pages, so don't let it block V1.

---

# 10 · Growth Pathway ("if I get a free week")

This is the answer to your "incase I'm holding something out" question. Every V1 decision above was made so these upgrades are **additions, not rewrites**. Effort numbers are rough estimates; treat them as planning guesses.

|Upgrade|What it adds|Depends on (built in V1)|Rough effort|
|---|---|---|---|
|**Scrollytelling**|Scrolling the essay advances the map and animations|Module contract's controllable "time" input, GSAP ScrollTrigger|3-4 days|
|**3D terrain battlefield**|Tilted terrain view of the battlefield|MapLibre (ADR-007), terrain data|4-5 days|
|**Richer scenario simulation**|A real simulation model behind the "what if"|Data export format (ADR-008)|Own project, separate essay|
|**Search**|Fast search across essays with no backend|Static site|1 day|
|**Comments (no backend)**|GitHub-based comments (Giscus)|Public GitHub repo|1 day|
|**Headless CMS**|Write in a browser editor|Content schema (ADR-002)|2-3 days|
|**Newsletter and analytics**|Subscribers and privacy-friendly stats|Static site|1 day each|
|**Light theme and theme switcher**|Paper theme|Design tokens (ADR-004)|1-2 days|
|**In-browser ML demos**|Small models running in the reader's browser|Island architecture|3-5 days|
|**Accounts and backend**|Logins, user content|Containerization (ADR-012)|1-2 weeks, a different architecture|
|**AWS deployment**|Container hosting|Dockerfile|2-3 days|

**What to install when:** I'd install the core (Astro, React, Tailwind, MapLibre) in Sprint 1-2, and bring in **GSAP and three.js only when a module needs them** (Sprint 3). Installing them on day one adds weight and learning load with no payoff.

---

## What I added or changed (please check)

**Added by me, so confirm or edit:** all twelve ADR decisions (they're my recommendations, with the rejected options listed); the design direction (archival, analytical, cinematic) and the font candidates; Cloudflare Pages in place of Render/Vercel; the lens-required question; and the growth table.

**You must do yourself:** the moodboard and wireframes, since the look has to come from your taste. Also check the ⚑ items (hosting terms, GSAP license, map tile terms) before locking the ADRs.

**Still open:** whether the lens tag is required (carried over from Phase B), and the V1 scenario size.

Next is **Phase D: working agreement, product backlog, and the Sprint 1 plan.** That's where these decisions turn into tickets. Want me to write it in the same format?












---

# References

