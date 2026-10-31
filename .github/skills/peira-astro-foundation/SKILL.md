---
name: peira-astro-foundation
description: Scaffold and configure the PEIRA site foundation — Astro with strict TypeScript, React, Tailwind, MDX, pnpm, plus the multi-stage Dockerfile. Use for project initialization, dependency setup, tsconfig/Node/pnpm pinning, or containerizing the site.
---

# PEIRA foundation (P-001, P-007)

## Before you write code
Astro, Tailwind, and the pnpm CLI change quickly. **Fetch the current Astro install and "add integration" docs first** and follow them over anything remembered here. If the docs contradict an ADR (e.g. Astro no longer supports static output), stop and ask.

## P-001 steps
1. Check tools: `node -v`, `pnpm -v`, `git status`. Stop and report if Node or pnpm is missing.
2. Scaffold in the repo root (the repo already contains `docs/`, `AGENTS.md`, `.github/`; do NOT overwrite them). If the scaffolder refuses a non-empty directory, scaffold into a temp dir and move files in.
3. Template: minimal. TypeScript: **strict** (`extends: astro/tsconfigs/strict`).
4. Add integrations with the official command: `pnpm astro add react mdx tailwind`. Use whatever Tailwind setup the current docs prescribe (v4 uses the Vite plugin, not the old integration).
5. Pin the toolchain: `"packageManager"` in package.json, `engines.node`, and `.nvmrc`.
6. pnpm may block dependency build scripts (esbuild, sharp). Allow only what's needed via `pnpm.onlyBuiltDependencies` — do not blanket-approve.
7. Add scripts: `dev`, `build`, `preview`, `check` (`astro check`). Lint/format/test scripts arrive in P-002/P-005.
8. Prove it: `src/pages/index.astro` renders; add `src/pages/mdx-smoke.mdx` that renders. Keep it `noindex` or remove it; note the choice in the log.
9. README: what PEIRA is (2 lines), how to run, link to `docs/`.
10. `.gitignore` covers `node_modules`, `dist`, `.astro`, `.env*`.

Verify with real output: `pnpm install --frozen-lockfile && pnpm check && pnpm build`.

## P-007 Dockerfile
- Stage 1: `node:<pinned-lts>-alpine`, enable corepack, `pnpm install --frozen-lockfile`, `pnpm build`.
- Stage 2: small static server (`nginx:alpine` or Caddy), copy `dist/`, run as non-root if the image supports it.
- Add `.dockerignore` (`node_modules`, `dist`, `.git`, `.astro`).
- nginx needs `try_files $uri $uri/ $uri.html =404;` so clean URLs work; include a minimal `nginx.conf`.
- Verify: `docker build -t peira .` then `docker run --rm -p 8080:80 peira` and `curl -sI localhost:8080`. If `docker` is absent use `podman` — same commands. If neither exists, write the Dockerfile, say it is **untested**, and list the commands for the owner to run.
- This must never block the Cloudflare deploy; CI does not depend on Docker in Sprint 1.
