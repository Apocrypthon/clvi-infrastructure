# SEED — clvi-infrastructure

You are one session in a relay building **STRATA** (browser MMO-tycoon; Paradise,
NV). This repo is the **connective tissue**: the status dashboard, the environment
doc-of-record, the canonical mocks the other repos point at, the cross-repo smoke
script, and the promote guide.

No memory between sessions; docs are the memory.

## Stack rules (frozen)

- TypeScript + Vite, static `dist/` on Netlify. iPhone Safari first.
- This repo documents secret NAMES and locations; it never contains a value.

## If this repo is empty → BOOTSTRAP (I0)

1. Save this entire prompt verbatim as `SEED.md`.
2. Scaffold Vite vanilla-ts + `netlify.toml` (build `npm run build`, publish
   `dist`) + index "clvi-infrastructure · <build timestamp>".
3. Create CLAUDE.md + docs/ (VISION, ENVIRONMENT, STATE with milestones as Next,
   CHANGELOG, LOOP = protocol below). Build green, commit "loop: bootstrap I0",
   push `origin loop`.

## The Loop Protocol (identical in all CLVI repos)

- BOOT: read CLAUDE.md → docs/LOOP.md → docs/STATE.md → last 3 CHANGELOG entries.
- WORK: take the single smallest next improvement from STATE's Next list (or the
  first unmet milestone). Implement it completely. One increment per session.
- VERIFY: `npm run build` passes; run the smoke checks listed in STATE.md#Verify.
- RECORD: rewrite STATE.md so a stranger could continue; append one CHANGELOG entry
  (date · what · why · files · verify result). If you learned a better way to run
  this loop, revise LOOP.md itself — **LOOP.md governs its own revision**. The docs
  must never describe a repo that no longer exists.
- SHIP: `git add -A && git commit -m "loop: <summary>" && git push origin loop`.
- STOP: leave the repo green. If blocked > 2 attempts, write the blocker at the top
  of STATE.md and improve tests or docs instead.

## Milestones

- **I1 — Dashboard.** One screen of tiles: clvi-frontend, clvi-game-client,
  clvi-backend, clvi-testing — each tile links its `loop--` Netlify URL and its
  Actions page, and shows last-fetched status where CORS allows (backend /health
  is the reliable one; others degrade to plain links). Thumb-sized tiles.
- **I2 — Environment doc-of-record.** docs/ENVIRONMENT.md: table of repo → Netlify
  site name → loop URL → prod URL; Supabase project reference; the three backend
  secret NAMES and where they live (Netlify env); the GitHub secret names for the
  loop (see claude-scheduler). Names only, values never.
- **I3 — Canonical mocks.** `public/mock/audit.json` and
  `public/mock/map-events.json` matching Contracts v1 exactly, served from this
  site so frontend and game-client mocks can share one canonical shape.
- **I4 — Smoke.** `npm run smoke`: node script curling each loop deploy + backend
  /health and /audit/latest (signature shape check), writing results into
  docs/SMOKE.md with timestamps. Sessions run it in VERIFY.
- **I5 — Promote guide.** docs/PROMOTE.md: exact GitHub-mobile steps to PR
  loop → main per repo after the phone check, and how Netlify prod follows main.

## Contracts v1 (frozen; change only via clvi-architecture)

```
MapEvent    { cellId, ts, kind:"restored" }
AuditReport { rangeStart, rangeEnd, entryCount, totalEstKwh, chainOk, tokenCount, signature }
```

## Definition of done for this run

I1–I3 on the `loop` deploy: one page on the iPhone that jumps to every other piece
of Strata, and canonical mocks the sibling repos can point at.
