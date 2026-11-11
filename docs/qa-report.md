# P-030 QA report

**Run:** Sprint 4 RUN I  
**Build under test:** `dist-qa`, built with `PEIRA_INCLUDE_DRAFTS=1`  
**Deploy-build guard:** `dist` was built without the flag and contains no
`/essays/leipzig-1813/` route.

## Browser and axe checks

Playwright ran against `pnpm preview:qa` with all external requests aborted.
Each page was checked at all three widths for exactly one title and
description, no horizontal overflow, and no serious or critical axe
violations. Navigation keyboard operation and the module fallback/island
behavior were also checked.

| Page | 360px | 768px | 1280px |
| --- | --- | --- | --- |
| `/` | Pass | Pass | Pass |
| `/archive/` | Pass | Pass | Pass |
| `/about/` | Pass | Pass | Pass |
| `/lab/` | Pass | Pass | Pass |
| `/topics/wars/` | Pass | Pass | Pass |
| `/essays/leipzig-1813/` | Pass | Pass | Pass |

**Playwright result:** 24 passed. The module test confirmed the text/table
fallback remains available and the `client:visible` island mounts after
scrolling into view.

## Lighthouse CI

Lighthouse used mobile emulation and one run per URL. Deploy-build pages
without modules asserted accessibility >= 0.95 and performance >= 0.90.
The QA-build essay-with-map page was measured and reported, but its
performance score was not used as a gate.

| Build | Page | Accessibility | Performance | Transfer |
| --- | --- | ---: | ---: | ---: |
| Deploy | `/` | 1.00 | 1.00 | 146 KiB |
| Deploy | `/archive/` | 1.00 | 1.00 | 146 KiB |
| Deploy | `/about/` | 1.00 | 1.00 | 146 KiB |
| Deploy | `/topics/wars/` | 1.00 | 1.00 | 146 KiB |
| QA | `/` | 1.00 | 1.00 | 146 KiB |
| QA | `/archive/` | 1.00 | 1.00 | 146 KiB |
| QA | `/about/` | 1.00 | 1.00 | 146 KiB |
| QA | `/topics/wars/` | 1.00 | 1.00 | 146 KiB |
| QA | `/essays/leipzig-1813/` | 1.00 | 1.00 | 464 KiB |

## Dependency audit

`pnpm audit --audit-level=high` passed after overriding the transitive
`basic-ftp` dependency to `^6.2.1`. One moderate finding remains outside this
ticket's high-severity gate and is not hidden.

## Needs a real phone

- Check the reading experience, module controls, and table fallback at 360px
  and on a real phone.
- Check deployed link previews and the custom-domain behavior after deployment.
- The live essay page must be re-checked after publication; this run
  intentionally tested the draft through the QA build and did not run the
  `draft: false` or live-site preflight checks.
