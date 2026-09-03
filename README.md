# clvi-infrastructure

The connective tissue of **STRATA** — the status dashboard that jumps to every
other piece of the project, the environment doc-of-record, and the canonical
Contracts v1 mocks the sibling repos point at.

Static site: TypeScript + Vite, built to `dist/`, deployed by Netlify.

```
npm install
npm run dev     # local
npm run build   # tsc + vite build
```

- **Start here:** [`CLAUDE.md`](CLAUDE.md) — what this repo is and how to work in it.
- **The protocol:** [`docs/LOOP.md`](docs/LOOP.md)
- **Where things are:** [`docs/ENVIRONMENT.md`](docs/ENVIRONMENT.md) — names and
  locations only; this repo never contains a secret value.
- **Where the relay left off:** [`docs/STATE.md`](docs/STATE.md)

Canonical mocks are served from this site at `/mock/audit.json` and
`/mock/map-events.json`, with CORS open so the frontend and game client can share
one copy instead of each keeping their own.
