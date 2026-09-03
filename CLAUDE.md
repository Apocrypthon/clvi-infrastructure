# CLAUDE.md — clvi-infrastructure

The connective tissue of **STRATA** (browser MMO-tycoon, Paradise NV). Not a game
repo: this one holds the status dashboard, the environment doc-of-record, the
canonical Contracts v1 mocks, the cross-repo smoke script, and the promote guide.

Sessions have no memory of each other. **The docs are the memory.**

## Boot order

1. This file
2. `docs/LOOP.md` — the protocol, and how to change the protocol
3. `docs/STATE.md` — where the relay left off, and what is next
4. The last 3 entries of `docs/CHANGELOG.md`

`SEED.md` is the original brief, kept verbatim. It is history, not a to-do list;
`docs/STATE.md` is the live one.

## Frozen rules

- TypeScript + Vite, static `dist/` on Netlify. No framework, no SSR.
- **iPhone Safari first.** Every tap target ≥ 44px tall; tiles sit two-up at
  390px and collapse to one column on narrower phones. Nothing scrolls sideways.
- This repo documents secret **names** and where they live. It never contains a
  secret value — not in code, not in docs, not in a commit message.
- Contracts v1 is frozen; it changes only via clvi-architecture. The mocks in
  `public/mock/` must match it exactly.

## Layout

```
src/sites.ts    the map of Strata — repo → Netlify site → URLs. Edit here, not in main.ts.
src/health.ts   CORS-aware health probe; failure degrades to a plain link.
src/main.ts     renders the dashboard.
public/mock/    canonical Contracts v1 fixtures, served with CORS for sibling repos.
docs/           the memory. See boot order.
```

## Commands

```
npm run build   tsc + vite build — must pass before every commit
npm run dev     local dev server
```
