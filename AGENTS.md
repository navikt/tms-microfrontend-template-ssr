# tms-microfrontend-template-ssr

Template for new server-side rendered Min side microfrontends. Astro 6 SSR app: each page is an HTML fragment in nb, nn or en that `tms-min-side` fetches from inside the cluster. React 19, Aksel 8 (`--ax-*` tokens), TypeScript 5, pnpm 10, Node 24.

## Commands

- Install: `pnpm install`. The `@navikt` packages need a GitHub token with `read:packages` in `~/.npmrc`; if install fails on auth, stop and ask.
- Dev: `pnpm run dev` starts the Hono mock (`mock/server.ts`, port 3000) and `astro dev` (page at `http://localhost:4321/nb/`). The mock route must equal the path of the `EXAMPLE_API_URL` default in `astro.config.mjs`; restart the mock after editing `mock/`.
- Before you say a change is done: `pnpm run verify` (`astro check`). There are no tests and no test runner here; adding one means new dependencies, so ask first.
- The husky pre-commit hook runs `astro check`, then Biome on staged JS, TS, JSON and Astro files. For CSS, run `pnpm exec biome check --write <file>` yourself. Do not run Biome on the whole repo.

## Rules

- Use the `astro` skill before editing `.astro`, `.tsx`, `.ts` or `.css` files. If `/astro` or `/commit` is missing, tell the developer to trust this folder in Copilot CLI and start a new session.
- Astro here is 6, not the 7 the skill is written for: skip its rules marked **(7)**. The browser never reaches this app in the cluster: `nais/` has no ingress and admits only `tms-min-side`, and `deploy.yaml` uploads only `dist/client/_astro` to the CDN. So do not use `server:defer`, `<Image />` from `astro:assets`, files in `public/` or browser calls to this app's endpoints. Fetch on the server in `.astro` frontmatter, as `src/pages/[locale]/index.astro` does.
- Ask first before changing authentication (`src/middleware.ts`, `@navikt/oasis`), TokenX token exchange and its local bypass (`src/utils/token.ts`, `isLocal` and `isInternal` in `src/utils/environment.ts`, `Astro.locals.token`), `astro.config.mjs`, `nais/` or `.github/workflows/deploy.yaml`, or anything that logs personal data, and before adding a dependency.
- A new env value is the exception: add an `env.schema` entry in `astro.config.mjs` with a `default` that works in dev, and a value in both `nais/dev-gcp/nais.yaml` and `nais/prod-gcp/nais.yaml`; a cluster without one silently uses the default. Read it from `astro:env/server` as `index.astro` does.
- A page is an HTML fragment: no layout, `<html>` or `<head>`. It imports `@src/styles/aksel.css` and wraps its markup in `<div class="tms-microfrontend-template-ssr">`; PostCSS scopes all non-module CSS to that class.
- `src/styles/aksel.css` imports Aksel's CSS per component (typography, button, link, loader). Before using another Aksel component or a layout primitive, add its file from `@navikt/ds-css/dist/component/` there; without it the component renders unstyled and `astro check` still passes.
- `src/pages/[locale]/fallback.astro` is the static version shown when the microfrontend fails (the `fallback:` path in `deploy.yaml`). Keep it free of fetches and change it together with `index.astro`.
