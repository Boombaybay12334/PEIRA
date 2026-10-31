---
name: peira-design-tokens
description: Create PEIRA's design tokens (CSS variables), self-hosted fonts, Tailwind mapping, contrast checks, a no-hardcoded-colors guard, and the /tokens reference page. Use for colors, typography, spacing, theme, or font work.
---

# Design tokens and fonts (P-004)

Direction from the design brief (doc 07): **archival · analytical · cinematic.** Dark, rich surfaces; warm paper-toned text; one warm "ember" accent; glowing data colors. Reading first, spectacle second. The owner hasn't done the moodboard yet, so every value you choose is a **placeholder**, and that's fine — the whole point of tokens is cheap re-theming. Say so in the PR.

## Tokens (`src/styles/tokens.css`, CSS variables on `:root`)
- Background layers: `--bg-0` (page), `--bg-1` (raised), `--bg-2` (overlay)
- Text: `--text-primary`, `--text-secondary`, `--text-muted`
- Accent: `--accent` (ember), `--accent-hover`, `--accent-contrast`
- Borders: `--border`, `--border-strong`
- Data colors: `--data-1` … `--data-6` (ordered; for armies, scenarios, categories)
- Focus ring: `--focus`
- Spacing scale and type scale (fluid `clamp()` sizes), reading width `--measure: 65ch`
- Map the tokens into Tailwind's theme per the current Tailwind docs so utility classes like `bg-bg-1` / `text-text-primary` work.

## Fonts (self-hosted — no Google Fonts requests)
- Body: Newsreader · Headings: Fraunces · Data/labels: JetBrains Mono. Substitute only if unavailable, and note it.
- Install the Fontsource variable packages (`@fontsource-variable/…`), import them in the base stylesheet, and give each stack a real fallback (`Georgia, serif` / `ui-monospace, monospace`).
- Record each font and its license in `docs/credits.md` (these are SIL OFL; confirm from the package).

## Rules to enforce
1. **No hardcoded colors outside `tokens.css`.** Add `pnpm lint:colors` (a small script or test) that fails if a hex/rgb/hsl literal appears in `src/` anywhere except `tokens.css`. Add it to CI if the workflow exists.
2. **Contrast:** write a tiny WCAG contrast function in `src/lib/contrast.ts`, unit-test it, and assert: `text-primary`, `text-secondary` on `bg-0`/`bg-1` ≥ 4.5:1; `accent` on `bg-0` ≥ 3:1 for large/UI use. Muted text must also pass 4.5:1 if it's ever used at body size.
3. **Never rely on color alone** for data: the token page shows each data color with a distinct shape/label.
4. Respect `prefers-reduced-motion`: any CSS transition in the base styles is wrapped accordingly. No animation library in Sprint 1.

## `/tokens` page
`src/pages/tokens.astro`, `<meta name="robots" content="noindex">`. Shows: every color swatch with its token name, value, and contrast ratio vs. its background; the type scale with live samples in all three fonts; spacing steps; the data-color set with shapes. Must be readable at 360px (no horizontal scroll).

Verify with real output: `pnpm test`, `pnpm lint:colors`, `pnpm build`. List what the owner must check on a phone.
