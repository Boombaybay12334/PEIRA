---
name: peira-ci-cloudflare
description: Set up GitHub Actions CI and Cloudflare Pages deployment for PEIRA — lint/check/build workflow, production deploy on main, PR preview deploys, repository secrets, and branch protection. Use for anything involving .github/workflows, wrangler, .pages.dev, deployment, or branch protection.
---

# CI and deployment (P-003)

Decision: **Cloudflare Pages** deployed from GitHub Actions (ADR-009). Do not switch to Vercel, Netlify, Render, or Cloudflare Workers on your own. If Pages project creation or the deploy command no longer works as described below, **stop and report** what the current Cloudflare docs say — that needs a new ADR.

## Preflight (read-only; stop if anything fails)
- `gh auth status` shows the `workflow` scope (without it, pushing workflow files fails; owner fixes with `gh auth refresh -s workflow`).
- `gh secret list` shows `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`. If missing, print the exact `gh secret set` commands for the owner; never ask for the values in chat and never write them to a file.
- A Cloudflare Pages project named `peira` exists (owner creates it with `npx wrangler pages project create peira --production-branch main`). You can't check this without credentials; if the first deploy says the project doesn't exist, stop and tell the owner.

## Workflow design (`.github/workflows/ci.yml`)
- Triggers: `push` to `main`, and `pull_request`.
- `permissions:` minimal (`contents: read`; add `pull-requests: write` only if you post a preview comment).
- Job `ci`: checkout → pnpm setup → Node from `.nvmrc` with pnpm cache → `pnpm install --frozen-lockfile` → `pnpm lint` → `pnpm check` → `pnpm build` (+ `pnpm test` once it exists) → upload `dist` artifact.
- Job `deploy` (needs `ci`): download `dist`, deploy with `cloudflare/wrangler-action` running `pages deploy dist --project-name=peira --branch=<branch>`. Production = `main`; every other branch becomes a preview. Surface the deployment URL in the job summary.
- Pin actions to a current major version (or commit SHA). Look up current majors; don't trust memory.
- Never echo secrets. No `pull_request_target`.
- Build order: **first deploy a bare page with just the build, confirm the `.pages.dev` URL works, then add lint/check steps.**

## Branch protection (do this last, after the first green run)
Public repos can use free branch protection. Require the `ci` status check on `main`, require PRs, **do not** enforce for admins (owner needs an escape hatch), no force pushes. Use `gh api` or the rulesets API; print the command you ran. If you lack permission, print it for the owner.

## Evidence for the PR
- Run URL of a green workflow; the preview URL from a PR; the production `.pages.dev` URL after merge.
- A deliberately failing lint on a throwaway branch blocks the merge (show the red check, then close that PR/branch).
- Note anything you could not verify (e.g. couldn't view the live site without a browser).
