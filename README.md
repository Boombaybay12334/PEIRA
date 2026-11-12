# PEIRA

PEIRA is a personal research-and-writing publication for long-form essays with embedded interactive toolkit modules (maps, timelines, data visualizations, and scenario models). The site is built with Astro and publishes static content through Cloudflare Pages.

- **Production URL:** [https://peira.in](https://peira.in)
- **Preview / default Cloudflare URL:** [https://peira.pages.dev](https://peira.pages.dev)
- **Version:** `0.9.0` (Foundation Freeze)

---

## Documentation

- **[Project State (Foundation Freeze)](docs/PROJECT-STATE.md)** — Complete, verified single-document snapshot of repository architecture, routes, content model, components, CI/CD, and operating procedures. Start here when returning after a break.
- **[Author Handbook](docs/AUTHOR-HANDBOOK.md)** — Practical guide for writing, reviewing, testing, and publishing essays using the PEIRA author workflow.
- **[Documentation Index](docs/README.md)** — Full index of all documentation files, architectural decision records, and sprint histories.
- **[Credits & Licensing](docs/credits.md)** — Licenses and attributions for bundled fonts, map services, and third-party media assets.

---

## Development

### Prerequisites
- Node.js `>=22.23.4` (see `.nvmrc`)
- pnpm `12.15.0` (managed via Corepack: `corepack enable`)

### Setup and Development Server
```sh
pnpm install --frozen-lockfile
pnpm dev
```

Visit `http://localhost:4321` in your browser.

### Quality and Foundation Checks
```sh
pnpm lint           # Run ESLint
pnpm lint:colors    # Ensure no hardcoded color literals outside tokens.css
pnpm check          # Run Astro TypeScript diagnostics
pnpm test           # Run Vitest test suite
pnpm build          # Generate production static build in dist/
```

### Author Commands
```sh
pnpm new:essay <slug> "<Title>"       # Scaffold a new essay
pnpm essay:status [slug]             # Check word count, reading time, and placeholder status
pnpm preview:phone [slug]            # Start LAN dev server for phone testing
pnpm sync:data <slug> <repo-path>    # Sync exports from research repository
pnpm essay:check [slug]              # Run full pre-publish verification suite
```

---

## Deployment & Hosting

PEIRA deploys static HTML/CSS/JS to **Cloudflare Pages** automatically on push to `main` via GitHub Actions (`.github/workflows/ci.yml`). Pull requests generate isolated preview deployments.
