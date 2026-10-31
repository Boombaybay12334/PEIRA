---
name: peira-content-schema
description: Define and test PEIRA's essay content collection — Zod frontmatter schema, publishing-rule validation (sources, image credit/license, lens, repo URL, lab fields, drafts), sample essay, broken-essay fixtures, and Vitest tests. Use for anything touching src/content, content.config, or essay frontmatter.
---

# Essay content schema (P-005)

The schema enforces PEIRA's publishing rules at build time (FR-04/05/06/09, NFR-10, DR-04). The field list below is from doc 06 of `docs/sprint-0/phase-c-decisions-architecture.md` — if they differ, doc 06 wins.

**Check the current Astro content-collections docs first** (config file location and loader API changed between Astro versions). Use the Astro-recommended loader for local MDX.

## Fields
| Field | Required | Rule |
|---|---|---|
| title, slug, description | yes | slug: lowercase-kebab regex; description 50–200 chars (feeds SEO) |
| publishDate | yes | date |
| updatedDate | no | date, ≥ publishDate |
| topics | yes | array, min 1, enum `wars` · `artifacts` · `paleo-bio` |
| lens | **yes** | array, min 1, enum `ml` · `ai` · `security` *(agent assumption: array of these three — flag in log)* |
| heroImage | yes | `{src, alt, caption, credit, license}` — **all five non-empty** (FR-05) |
| sources | yes | array, **min 1**: `{title, url?, author?, year?, kind: paper\|primary\|dataset\|book\|web}` (FR-06) |
| repoUrl | yes | valid URL, host `github.com` (DR-04) |
| lab | yes | `{method: string, limitations: string (non-empty), dataSources: array min 1, reproducibility: array min 1 of {item, done: boolean}}` (FR-09) |
| corrections | no | array of `{date, note}` (FR-07) |
| draft | yes | boolean, **default true** |
| series | no | string, reserved |

## Error messages
Every constraint gets a custom message that **names the field and the fix**, e.g. `sources: an essay must list at least one source`. The build must fail with that text visible, not a raw stack trace.

## Drafts
Drafts validate in every build but are excluded from production listings. Provide one helper, e.g. `getPublishedEssays()`, that filters `draft` when `import.meta.env.PROD`; later tickets reuse it. Do not build the homepage or archive here.

## Fixtures and tests
- Sample valid essay: `src/content/essays/_sample/index.mdx`, `draft: true`, placeholder values clearly marked as sample. Needs a small local hero image with a real credit/license (generate a plain image yourself; don't download anything).
- Broken essays live in `tests/fixtures/essays/` (**not** in `src/content`): missing sources · missing image credit · missing image license · missing lens · missing repoUrl · missing lab.limitations · empty lab.dataSources · invalid topic.
- Vitest: export the Zod schema from a plain module (not inside Astro-only code) so tests can import it. One test per fixture asserting failure + that the message names the field; one test for the valid sample.
- Add `pnpm test` and a `test` step to the CI workflow in the same PR.
- Add `docs/essay-frontmatter.md`: one table, how to run the fixtures, how to try a broken essay manually (the owner's demo step 2).

Verify with real output: `pnpm test`, `pnpm build` (passes), then copy one fixture into `src/content/essays/`, run `pnpm build` (fails with a readable message), remove it, rebuild (passes). Paste that evidence into the PR.
