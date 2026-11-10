# Adding a module

1. Add a versioned Zod schema and inferred TypeScript types in
   `src/lib/modules/schemas.ts`.
2. Add a build-time loader in `src/lib/modules/load.ts`. References are
   workspace-relative keys such as `demo/demo-points.v1.json` or
   `leipzig-1813/leipzig-points.v1.json`.
3. Keep pure transforms in `src/lib/modules/` and test them with synthetic
   inputs.
4. Put essay data in `src/content/essays/<slug>/data/`; put synthetic Lab data
   in `src/data/demo/`.
5. Wrap the island with `ModuleFrame.astro`. It provides a badge for demo or
   candidate data, a noscript notice, and a server-rendered table fallback.
6. Hydrate React islands with `client:visible`. Heavy libraries belong inside a
   dynamic import in the island.
7. Keep colours token-driven and preserve keyboard access, reduced motion, and
   visible source/licence information.
