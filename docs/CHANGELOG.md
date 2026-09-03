# CHANGELOG

One entry per session, newest first: date · what · why · files · verify result.

## 2026-09-03 — bootstrap I0, then I1–I3

**What.** Brought the repo up from empty to the definition of done for the first
run: a Vite + TypeScript static site on Netlify carrying the Strata dashboard, the
environment doc-of-record, and the canonical Contracts v1 mocks.

- I0 — `SEED.md` saved verbatim; Vite vanilla-ts scaffold; `netlify.toml` (build
  `npm run build`, publish `dist`); header reads `clvi-infrastructure · <build
  timestamp>`, stamped at build time by `vite.config.ts`; `CLAUDE.md` and `docs/`.
- I1 — the dashboard: a thumb-sized tile per sibling repo linking its `loop--`
  deploy, prod deploy, and Actions page, plus a live `/health` probe on
  clvi-backend. Tiles without a CORS-readable endpoint say "link only".
- I2 — `docs/ENVIRONMENT.md`: sites table, backend endpoints, Supabase slots, and
  the backend + GitHub secret names. Names only, no values, ever.
- I3 — `public/mock/audit.json` and `public/mock/map-events.json`, matching
  Contracts v1 key-for-key, served with `Access-Control-Allow-Origin: *`.

**Why.** The relay has no memory, so the first session's job is to make the second
one cheap: one screen that reaches every other piece of Strata from a phone, one
document that says how things are wired, and one canonical copy of the fixtures so
the frontend and the game client cannot drift apart.

**Files.** `SEED.md`, `CLAUDE.md`, `.gitignore`, `package.json`, `package-lock.json`,
`tsconfig.json`, `vite.config.ts`, `netlify.toml`, `index.html`, `src/main.ts`,
`src/sites.ts`, `src/health.ts`, `src/style.css`, `src/vite-env.d.ts`,
`public/mock/audit.json`, `public/mock/map-events.json`, `docs/VISION.md`,
`docs/LOOP.md`, `docs/ENVIRONMENT.md`, `docs/STATE.md`, `docs/CHANGELOG.md`.

**Verify.** `npm run build` green (tsc + vite build, 6 modules). Mock shape check
passes: 7 audit fields in contract order, 6 map events, every `kind` `"restored"`.
`dist/` contains `mock/audit.json` and `mock/map-events.json`. Dashboard rendered
in headless Chromium at 390×844: tiles two-up, no horizontal overflow, all 21
links ≥ 44px tall, no console errors other than the health probe failing (the
sandbox has no route to the backend, which is exactly the degradation path — the
tile went red and said so).
Not verified: the `loop--` URLs (no `loop` branch deploy exists yet) and every row
marked `assumed` in `docs/ENVIRONMENT.md`.
