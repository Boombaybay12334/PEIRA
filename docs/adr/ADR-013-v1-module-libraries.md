# ADR-013: V1 module libraries

- **Status:** Proposed
- **Date:** 2026-11-10

## Context

PEIRA's modules need a small interactive map now and a path for later graphs
and 3D views without making every page pay the cost of every library.

## Decision

- Use MapLibre GL JS for the V1 map.
- Use OpenFreeMap's public Liberty style, with its URL in one swappable config
  constant and its attribution always visible.
- Do not use GSAP or three.js in V1.
- Use `@google/model-viewer` for a future 3D module if Run L is built.
- Use only modular D3 packages for future graph/embedding modules.

## Consequences

MapLibre provides the map controls and marker projection while allowing the
island to load it only when visible. The public tile service may change or end,
so the map must retain a plain-background point/table fallback. Avoiding broad
animation and visualization bundles keeps the static site lighter, but future
modules must remain within their explicitly allowed run.
