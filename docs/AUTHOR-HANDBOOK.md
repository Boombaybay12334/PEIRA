# Author handbook

## 1. The one-page version

```fish
pnpm install --frozen-lockfile
pnpm new:essay my-essay "My essay title"
pnpm sync:data my-essay /path/to/research-repo
# write src/content/essays/my-essay/index.mdx
pnpm essay:status my-essay
pnpm preview:phone my-essay
pnpm essay:check my-essay
# set draft: false only after every blocker is resolved
pnpm check:placeholders
```

## 2. Setup on a new machine

Install Node `>=22.23.4`, pnpm `12.15.0`, Git, and GitHub CLI. Authenticate with
`gh auth login`, then clone the repository and install its locked dependencies:

```fish
git clone https://github.com/Boombaybay12334/PEIRA.git
cd PEIRA
pnpm install --frozen-lockfile
gh auth status
pnpm lint
pnpm lint:colors
pnpm check
pnpm test
pnpm build
```

## 3. Start a new essay

The generator refuses an existing slug and requires lowercase kebab-case:

```fish
pnpm new:essay battle-of-leipzig "The Battle of Leipzig"
```

It creates `index.mdx`, `data/`, and `images/`, copies a placeholder hero, and
leaves `draft: true` with `AUTHOR:` markers. Create a separate research
repository, then copy its export data into the essay:

```fish
mkdir ../peira-essay-002-research
cd ../peira-essay-002-research
git init
mkdir exports
cd ../PEIRA
pnpm sync:data battle-of-leipzig ../peira-essay-002-research
```

The research repository's JSON files belong in its `exports/` folder. `sync:data`
copies only `exports/*.json` into the essay's `data/` folder, prints a SHA-256
hash and candidate/verified counts, and then tells you to run `essay:check`.

## 4. Write

An essay lives at `src/content/essays/<slug>/index.mdx`. Its module files live
in `data/`; local images belong in `images/`. Frontmatter is YAML and is
validated by `src/content/essay-schema.ts`.

| Field | Required? | Example | If missing |
|---|---|---|---|
| `title` | yes | `"A Field Note"` | schema error |
| `slug` | yes | `a-field-note` | schema error |
| `description` | yes | a 50–200 character sentence | schema error |
| `publishDate` | yes | `"2026-11-11"` | schema error |
| `updatedDate` | no | `"2026-11-12"` | omitted |
| `topics` | yes | `[wars]` | schema error |
| `lens` | yes | `[ai]` | schema error |
| `heroImage` | yes | `src`, `alt`, `caption`, `credit`, `license` | schema error |
| `sources` | yes | a list with `title` and `kind` | schema error |
| `repoUrl` | yes | a GitHub URL | schema error |
| `lab` | yes | method, limitations, data sources, reproducibility | schema error |
| `corrections` | no | dated notes | omitted |
| `draft` | no | `true` | defaults to `true` |

Use ordinary MDX headings, links, and footnotes:

```mdx
## A section

Read [the research repository](https://github.com/Boombaybay12334/PEIRA).

The note has a source.[^note]

[^note]: The source note belongs at the end of the document.
```

The essay page supplies `MapTimeline` to MDX. Its props are:
`data` (a data reference), `title`, optional `caption`, and optional
`sourceLicense`.

```mdx
<MapTimeline
  data="leipzig-1813/leipzig-points.v1.json"
  title="Leipzig timeline"
  caption="Candidate research export."
  sourceLicense="Source and licence information."
/>
```

`Figure`, `LabPanel`, and `Corrections` are page-template components, not MDX
body components. `Figure` requires `src`, `alt`, `caption`, `credit`, and
`license`; it also accepts optional `licenseUrl`, `sourceUrl`, `page`, and
`loading`. The page uses frontmatter `heroImage` for the figure. `updatedDate`
is displayed when present. Corrections are dated metadata and render after the
sources list.

## 5. Research loop

Keep a source list, then mark data as `candidate` until you have read and
checked the source. Only the owner changes a row to `verified`. Module points
carry source IDs, confidence, and status; the research notes and figures sheet
hold the supporting context. Re-run the research repository exports, copy them
with `sync:data`, and inspect the printed hashes and counts. For a
single-source figure, treat the figure as a lead to verify, not as proof.

## 6. Preview and check

Use `pnpm dev` for desktop work. Use the phone helper to print the home and
essay LAN URLs before starting Astro:

```fish
pnpm preview:phone battle-of-leipzig
pnpm essay:status battle-of-leipzig
pnpm essay:check battle-of-leipzig
pnpm check:placeholders
```

`essay:check` runs the placeholder guard, lint, Astro check, tests, build, and
status report, then prints `PASS` or `FAIL`. A published essay containing
`AUTHOR:`, `FILL_ME`, or `AUTHOR-REPLACE` fails the placeholder guard.

## 7. Publish

Before publishing, confirm every source was read, every claim is traceable,
the research repository is linked, limitations are your own words, image and
dataset credits are complete, module records are verified, and the modules
work on a real phone. Then set `draft: false`, run the checks, and use the
repository's normal PR flow:

```fish
function shipit
  git add .
  git commit -m $argv[1]
  git push -u origin (git branch --show-current)
  gh pr create --fill
end

shipit "feat: publish battle of leipzig"
```

Define the function once in your fish configuration. It stages, commits,
pushes the current branch, and opens a filled PR. After merge, verify the live
essay URL, sitemap, RSS, and social card manually.

## 8. After publishing

Add a dated correction note when a published claim changes. Update
`updatedDate` on substantive changes, keep the original publish date, rerun the
checks, and record the change in the changelog habit used by the project.

## 9. Using the Copilot agent as a research and editing assistant

Ask for source discovery, fact checks, citation checks, or an evidence table.
The agent never invents sources or numbers. It does not write your prose unless
you explicitly ask. It proposes edits as a list, not rewrites, and everything
it finds remains `candidate` until you verify it.

```text
Find candidate sources on [topic]. For each, give the URL, source type, a short
paraphrase, and the source ID. Do not invent sources or numbers.
```

```text
Fact-check this paragraph against these source URLs. For each factual sentence,
say supported, contradicted, or not found, quote at most one short phrase, and
give the URL. Do not rewrite the paragraph.
```

```text
Check the citations in this draft. List claims without a source, mismatched
source IDs, and numbers that need a range. Treat every finding as candidate.
```

```text
Suggest edits to improve clarity and uncertainty in this passage. Return a
bulleted list with line references; do not rewrite my prose.
```

```text
Produce a figures table from these sources with figure ID, claim, low/high
range, unit, source ID, confidence, and candidate/verified status. Do not
invent missing values.
```

## 10. Maintenance

Update dependencies deliberately, run the full checks, and fix CI from the
first failing command. Roll back a bad deployment with `git revert` and push a
new PR. The Git repositories are the backup for tracked source and research
files; ignored dependencies, build output, local environment files, and
secrets are not in Git. Run the Docker image using the repository's Docker
instructions when that image is added or changed.

## 11. Troubleshooting

| Message | Cause | Fix |
|---|---|---|
| `Published essays contain placeholders:` | A non-draft essay still has an author marker or `AUTHOR-REPLACE`. | Finish it or set `draft: true`. |
| `Module data missing/missing-points.v1.json: file not found` | An MDX module reference does not resolve. | Copy the export into the essay `data/` folder and use the correct reference. |
| `Figure on figure-missing-credit: missing credit` | A figure has no credit. | Supply the required `credit` prop. |
| `sources: provide at least 1 item(s)` | Required source metadata is empty. | Add a source you have read. |

## 12. Cheat sheet

| Command | Use |
|---|---|
| `pnpm dev` | Start local development. |
| `pnpm build` | Build the deploy site. |
| `pnpm check` | Run Astro diagnostics. |
| `pnpm lint` | Run ESLint. |
| `pnpm lint:colors` | Check for hardcoded colors. |
| `pnpm test` | Run Vitest. |
| `pnpm new:essay <slug> "<Title>"` | Create a draft essay scaffold. |
| `pnpm essay:status [slug]` | Report essay readiness. |
| `pnpm author [slug]` | Alias for status. |
| `pnpm essay:check [slug]` | Run the author check pipeline. |
| `pnpm preview:phone [slug]` | Print LAN URLs and start Astro. |
| `pnpm sync:data <slug> <path>` | Copy research exports. |
| `pnpm check:placeholders` | Guard published essays. |

The main folders are `src/content/essays/`, `src/components/`, `src/pages/`,
`src/styles/`, `tests/`, `docs/`, `docs/adr/`, and `.github/skills/`.
Architecture and requirements live in `docs/`; ADRs live in `docs/adr/`; the
author workflow skill lives in `.github/skills/peira-author-workflow/`.

## 13. What isn't built yet

There is no research-repository template for Essay 2, newsletter, or additional
essay module family in this workflow. The author still verifies historical
sources, figures, licences, real-phone layout, deployed links, and publication
readiness.
