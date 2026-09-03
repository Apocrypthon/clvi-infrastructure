# ENVIRONMENT — doc-of-record

Where every piece of Strata lives, and the **names** of the secrets it needs.

> **This file never contains a secret value.** Names and locations only. If you
> are about to paste something that looks like a key, a token, a JWT, or a
> connection string, stop — it belongs in the Netlify or GitHub secret store, and
> only its name belongs here.

Every row marked **assumed** has not been read off the provider's console by any
session yet. Confirm it, then change the marker to **confirmed** and note the date.
See [Confirming this document](#confirming-this-document).

## Sites

Netlify site names are assumed to equal the GitHub repo names. Branch deploys use
Netlify's `<branch>--<site>.netlify.app` form, so the `loop` branch is
`loop--<site>`; production follows `main`.

| Repo | Netlify site | Loop deploy (`loop` branch) | Prod deploy (`main`) | CI | Status |
| --- | --- | --- | --- | --- | --- |
| clvi-frontend | `clvi-frontend` | https://loop--clvi-frontend.netlify.app | https://clvi-frontend.netlify.app | [Actions](https://github.com/Apocrypthon/clvi-frontend/actions) | assumed |
| clvi-game-client | `clvi-game-client` | https://loop--clvi-game-client.netlify.app | https://clvi-game-client.netlify.app | [Actions](https://github.com/Apocrypthon/clvi-game-client/actions) | assumed |
| clvi-backend | `clvi-backend` | https://loop--clvi-backend.netlify.app | https://clvi-backend.netlify.app | [Actions](https://github.com/Apocrypthon/clvi-backend/actions) | assumed |
| clvi-testing | `clvi-testing` | https://loop--clvi-testing.netlify.app | https://clvi-testing.netlify.app | [Actions](https://github.com/Apocrypthon/clvi-testing/actions) | assumed |
| clvi-infrastructure | `clvi-infrastructure` | https://loop--clvi-infrastructure.netlify.app | https://clvi-infrastructure.netlify.app | [Actions](https://github.com/Apocrypthon/clvi-infrastructure/actions) | assumed |

The same table is data in `src/sites.ts`, which drives the dashboard. **The two
must never disagree** — change both in the same commit.

## Backend endpoints

| Endpoint | Path | Read by | Notes |
| --- | --- | --- | --- |
| Health | `/health` | dashboard tile, `npm run smoke` (I4) | Must send `Access-Control-Allow-Origin`, or the tile degrades to a plain link. This is the only endpoint the dashboard probes. |
| Latest audit | `/audit/latest` | `npm run smoke` (I4) | Returns an `AuditReport`; smoke checks the signature's shape, never its validity. |

## Supabase

| Item | Value | Status |
| --- | --- | --- |
| Project reference | _unrecorded_ — the `<ref>` in `https://<ref>.supabase.co` | **to fill in** |
| Region | _unrecorded_ | **to fill in** |

The project ref is public (it is in every API URL) and belongs here. The anon key
and the service role key do not — only their names, below.

## Secret names

### Backend — Netlify environment variables

Set on the `clvi-backend` Netlify site: **Site configuration → Environment
variables**. Scope them to all deploy contexts unless a row says otherwise, so the
`loop` branch deploy is configured the same as production.

| Name | What it is | Status |
| --- | --- | --- |
| `SUPABASE_URL` | Project API URL, `https://<ref>.supabase.co` | assumed |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase key. Server only — never shipped to a browser bundle. | assumed |
| `AUDIT_SIGNING_KEY` | Signs the `signature` field of an `AuditReport` | assumed |

These are the three the milestone refers to. The names are inferred from what the
backend must do (reach Supabase, sign audit reports) and have **not** been read off
the Netlify console — confirm before relying on them.

### Loop automation — GitHub Actions secrets

Set per repo: **Settings → Secrets and variables → Actions**. Consumed by the
scheduled workflow that drives the relay (see `claude-scheduler`).

| Name | What it is | Status |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | Authenticates the scheduled session | assumed |
| `CLAUDE_CODE_OAUTH_TOKEN` | Alternative to the API key, if the workflow uses OAuth | assumed |
| `GH_PAT` | Token with `contents: write` so the session can push `loop` | assumed |

`claude-scheduler` is the authority on this list. If it disagrees with this table,
**it wins** — update this file to match and mark the rows confirmed.

## Canonical mocks

Served from this site, with `Access-Control-Allow-Origin: *` set in `netlify.toml`
so sibling repos can fetch them cross-origin:

| Fixture | URL |
| --- | --- |
| `AuditReport` | https://loop--clvi-infrastructure.netlify.app/mock/audit.json |
| `MapEvent[]` | https://loop--clvi-infrastructure.netlify.app/mock/map-events.json |

Point frontend and game-client mocks at these rather than keeping local copies.
Shapes are frozen by Contracts v1 in `SEED.md`.

## Confirming this document

For each **assumed** row:

1. **Netlify site names and URLs** — open the Netlify dashboard, compare site
   names, then load a `loop--` URL. A 404 on the branch subdomain usually means
   branch deploys are off for that site, not that the name is wrong.
2. **Supabase** — the project ref is the subdomain of the project's API URL,
   visible in the Supabase project settings.
3. **Backend secret names** — Netlify site → Site configuration → Environment
   variables. Copy the *names* shown. Never the values.
4. **GitHub secret names** — the repo's Actions secrets list, or better, read the
   `env:` block of the scheduler workflow, which names exactly what it reads.

Then edit the row, set its status to `confirmed YYYY-MM-DD`, and log it in
`docs/CHANGELOG.md`.
