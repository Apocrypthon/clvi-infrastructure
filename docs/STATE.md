# STATE

_Last rewritten: 2026-09-03 · after the I0–I3 bootstrap session._

## Where the branch is

This session's harness assigned the branch
**`claude/strata-infrastructure-bootstrap-rpa3gk`**, so that is where the work is,
not on `loop`. `LOOP.md` says the harness branch wins and STATE records it — this
is that record. **The `loop` branch does not exist yet.** Before Netlify branch
deploys (and therefore every `loop--` URL in this repo) can work, someone must
open this branch's PR into `main`, or push/merge it to a branch named `loop`.
Until then the dashboard's own links are correct but not yet live.

## What exists

A Vite + TypeScript static site, built to `dist/`, deployed by Netlify
(`netlify.toml`: build `npm run build`, publish `dist`).

- **Dashboard (I1)** — `index.html` + `src/main.ts`. One screen: a tile per
  sibling repo (clvi-frontend, clvi-game-client, clvi-backend, clvi-testing), each
  linking its `loop--` deploy, its prod deploy, and its GitHub Actions page. Below
  that, direct links to the canonical mocks, to the docs, and to each repo. Build
  timestamp in the header. All 21 links are ≥ 44px tall; tiles sit two-up at 390px
  and collapse to one column on narrower phones.
- **Live status (I1)** — `src/health.ts` probes `clvi-backend`'s `/health` and
  paints the tile's dot green/red with latency. Only endpoints that send CORS
  headers are probed; the other three tiles say "link only" by design, which is the
  documented fallback, not a bug.
- **Environment doc-of-record (I2)** — `docs/ENVIRONMENT.md`. Sites table, backend
  endpoints, Supabase slots, and the backend + GitHub secret **names**. Rows that
  no session has verified against a provider console are marked `assumed`, with
  instructions for confirming them.
- **Canonical mocks (I3)** — `public/mock/audit.json` (an `AuditReport`) and
  `public/mock/map-events.json` (a `MapEvent[]`), matching Contracts v1 key-for-key.
  `netlify.toml` serves `/mock/*` with `Access-Control-Allow-Origin: *` so
  clvi-frontend and clvi-game-client can fetch them cross-origin instead of each
  keeping a drifting local copy.

`src/sites.ts` is the single source of truth for repo → site → URLs. Change it
there, and mirror the change in `docs/ENVIRONMENT.md` in the same commit.

## Verify

Run all of these before shipping. There is no `npm run smoke` yet — that is I4.

1. `npm install && npm run build` — must pass (`tsc` then `vite build`, so a type
   error is a red build).
2. `node -e` shape check on the mocks — key names **and order** must match
   Contracts v1:
   ```
   node -e 'const a=require("./public/mock/audit.json"),m=require("./public/mock/map-events.json");
   const want=["rangeStart","rangeEnd","entryCount","totalEstKwh","chainOk","tokenCount","signature"];
   if(JSON.stringify(Object.keys(a))!==JSON.stringify(want))throw new Error("audit drift");
   if(!Array.isArray(m))throw new Error("map-events must be an array");
   for(const e of m){if(JSON.stringify(Object.keys(e))!==JSON.stringify(["cellId","ts","kind"])||e.kind!=="restored")throw new Error("map event drift");}
   console.log("mocks ok");'
   ```
3. `npm run dev`, open at 390px wide: nothing clipped, no sideways scroll, every
   link ≥ 44px tall. The four tiles should fit above the fold.
4. On the deploy: `/mock/audit.json` and `/mock/map-events.json` both load and
   respond with `access-control-allow-origin: *`.

## Next

Smallest first. One per session.

1. **I4 — `npm run smoke`.** A plain node script (no new dependency; `fetch` is
   built in) that requests each `loop--` deploy plus the backend's `/health` and
   `/audit/latest`, shape-checks the `AuditReport` signature field, and writes a
   timestamped table into `docs/SMOKE.md`. Then add it to Verify above and to
   `docs/LOOP.md`.
2. **I5 — `docs/PROMOTE.md`.** The exact GitHub-mobile steps to PR `loop` → `main`
   per repo after the phone check, and how Netlify prod follows `main`.
3. **Confirm the `assumed` rows in `docs/ENVIRONMENT.md`** — Netlify site names
   first, since every URL in this repo depends on them. Instructions are in that
   file under "Confirming this document".
4. **Get a `loop` branch onto Netlify** so the `loop--` URLs resolve (see "Where
   the branch is"), then re-check the dashboard's links from a phone.
5. **Show the last smoke result on the dashboard** once I4 exists — read the JSON
   it writes rather than probing from the browser, which CORS mostly forbids.

## Blockers

None. Two things are unknown rather than blocked, and both are written down where
they matter:

- No session has confirmed the Netlify site names, the Supabase project ref, or the
  secret names. They are marked `assumed` in `docs/ENVIRONMENT.md` — do not treat
  them as fact.
- The `loop` branch does not exist yet, so no `loop--` URL resolves today.
