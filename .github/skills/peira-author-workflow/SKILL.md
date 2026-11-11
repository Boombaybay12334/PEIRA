---
name: peira-author-workflow
description: Build and document PEIRA's author workflow — scripts to create an essay, check it, preview it on a phone, sync research data, and report publish-readiness, plus the AUTHOR-HANDBOOK. Also governs how the agent assists the owner as research and editing helper. Use for author tooling, the handbook, or any request to help write, research, fact-check or publish an essay.
---

# Author workflow (Run M)

The owner is a solo researcher/author. The goal: after this run, creating, writing, checking, previewing and publishing an essay takes a handful of memorable commands, and one document explains everything. **Every command and claim in the handbook must come from the repo as it is, verified by running it.** Never document a command, prop, field or error message you haven't confirmed.

## Scripts to add (plain Node `.mjs` in `scripts/`, wired in `package.json`)
The only new dependency allowed is the `yaml` package as a devDependency, if not already a direct one. No TypeScript runner, no CLI framework.

1. **`pnpm new:essay <slug> "<Title>"`** (`scripts/new-essay.mjs`). Refuse if the slug exists or isn't lowercase-kebab. Create `src/content/essays/<slug>/` with `index.mdx`, `data/`, `images/`. Frontmatter must **pass the existing schema** (the build must succeed right after creation) with `draft: true` and every unfinished value written as `AUTHOR: …` text, so the placeholder guard blocks publication. Use a shared placeholder hero image copied into the folder (generate a plain one if none exists). Placeholder repo URL: `https://github.com/Boombaybay12334/AUTHOR-REPLACE`. Body: the standard sections from `docs/essay-001/outline.md` as a reusable skeleton, or a neutral skeleton (Introduction, Evidence, Analysis, Limitations), each with an `{/* AUTHOR: … */}` comment. Extend `scripts/check-placeholders.mjs` to also fail a **non-draft** essay containing `AUTHOR-REPLACE`. Add tests for the generator's output (valid slug, schema-valid, guard behaviour).
2. **`pnpm essay:status [slug]`** (alias `pnpm author`): a table per essay — slug, draft/published, words, reading time, `AUTHOR:` markers remaining, number of sources, `lab.reproducibility` items done/total, module data files and how many records in them are still `status: "candidate"` or `demo: true`, hero image licence filled?, and a final line "READY TO PUBLISH" or the list of blockers. Parse frontmatter with `yaml`. Read-only, fast.
3. **`pnpm essay:check [slug]`**: runs `check:placeholders`, `lint`, `check`, `test`, `build`, then `essay:status`, and prints one clear PASS or FAIL summary at the end.
4. **`pnpm preview:phone [slug]`**: starts `pnpm dev --host` and first prints the LAN URLs (home and the essay page) using `os.networkInterfaces()`.
5. **`pnpm sync:data <slug> <research-repo-path>`**: copies `exports/*.json` from the research repo into the essay's `data/`, refusing if the path or folder is missing; prints each file with sha256 and counts of candidate vs verified records; then runs the module-data validation (a build is fine) and says what to do next. Never touches anything outside `src/content/essays/<slug>/data/`.

Each script prints usage when called without arguments, exits non-zero on failure, and has a Vitest test for its pure logic.

## `docs/AUTHOR-HANDBOOK.md` (link it from the README)
Plain, short sentences. Every command in a code block, copy-pasteable in **fish**. Sections:
1. **The one-page version** — the whole loop in about ten lines.
2. **Setup on a new machine** — tools, auth, clone, install, verify.
3. **Start a new essay** — `new:essay`, create its research repo (list the exact commands and what to copy), `sync:data`.
4. **Write** — file anatomy; a frontmatter table (field, required?, example, what happens if missing); MDX cheatsheet with real working snippets for headings, links, footnotes, `Figure` (all four required props), every module component and its props (read them from the code); the lens/other components only if they exist; how corrections and `updatedDate` work.
5. **Research loop** — sources → candidate → verified; where figures live; re-running exports; copying data in; how to mark a row verified; a rule of thumb for single-source figures.
6. **Preview and check** — desktop, phone, `essay:status`, `essay:check`, the placeholder guard.
7. **Publish** — checklist, the PR flow with `shipit` (describe the fish function, include its definition), flipping `draft: false`, verifying the live page, sitemap and RSS, social card.
8. **After publishing** — the corrections policy in practice, updating an essay, changelog habit.
9. **Using the Copilot agent as a research and editing assistant** — what to ask for, **copy-pasteable prompt templates** (find sources on a topic, fact-check a paragraph against its sources, check citations, suggest edits without rewriting, produce a figures table from sources), and the rules: it never invents sources or numbers; it never writes your prose unless you explicitly ask; it proposes edits as a list, not as rewrites; everything it finds is `candidate` until you verify it.
10. **Maintenance** — updating dependencies, what to do when CI is red, rolling back a bad deploy (git revert; mention the Cloudflare dashboard's rollback only if you can confirm it exists), running the Docker image, backups (the repos are the backup; say what is NOT in git).
11. **Troubleshooting table** — real error messages you reproduce (e.g. a missing frontmatter field, a bad module data file, a missing Figure credit, a leftover `AUTHOR:` marker) with cause and fix. Reproduce each, quote the actual message.
12. **Cheat sheet** — every `pnpm` script with one line each; the folder map; where each doc lives (`docs/`, ADRs, skills).
13. **What isn't built yet** — an honest list (e.g. a research-repo template for essay 2, newsletter, extra modules).

## Editorial assistant mode (when the owner asks for help with an essay)
- Do not write or rewrite the owner's prose unless explicitly asked. Prefer a bulleted list of suggestions with line references.
- Research: fetch pages, record URL, paraphrase, give a range and source id for any number. Never state a historical claim you didn't read on a fetched page. If a source can't be fetched, say so.
- Fact-check mode: for each factual sentence, say supported / contradicted / not found, quoting at most one short phrase per source and giving the URL.
- Anything found is `candidate`; only the owner sets `verified`.
- Keep the Editorial charter: sources list, repo link, limitations note, credit and licence for every image and dataset.

## Verification (quoted output in the PR)
`pnpm test`, `pnpm lint`, `pnpm lint:colors`, `pnpm check`, `pnpm build` green · create a throwaway essay with `new:essay`, show the build passes, `essay:status` lists its blockers, and flipping it to `draft: false` makes `check:placeholders` fail; then delete it · run `sync:data` against the research repo's exports in a temp copy of an essay folder (the research repo path is given by the owner in the run message; if you cannot read that path, say so and test with a fixture) · run every command in the handbook that can be run and say which you could not run.
