# LOOP — the protocol

Identical in every CLVI repo. **LOOP.md governs its own revision:** if a session
learns a better way to run the loop, it edits this file as its increment.

## BOOT

Read, in order: `CLAUDE.md` → this file → `docs/STATE.md` → the last 3 entries of
`docs/CHANGELOG.md`. Then `git log --oneline -5`, to check the docs against what
the repo actually is.

## WORK

Take the **single smallest next improvement** from STATE's Next list, or the first
unmet milestone if Next is empty. Implement it completely — a half-finished
increment costs the next session more than an unstarted one. One increment per
session.

If STATE.md opens with a **BLOCKER**, that is the increment.

## VERIFY

- `npm run build` passes (this is `tsc` + `vite build`; a type error is a red build).
- Run every check listed under `docs/STATE.md#Verify`.
- For anything touching the dashboard: check it at 390px wide, and confirm every
  tap target is still ≥ 44px.
- For anything touching `public/mock/`: re-validate against Contracts v1 in
  `SEED.md`. Key names and order are part of the contract.

## RECORD

- Rewrite `docs/STATE.md` so a **stranger** could continue with no other context.
  Rewrite, not append — a stale line in STATE is worse than a missing one.
- Append exactly one `docs/CHANGELOG.md` entry: date · what · why · files ·
  verify result.
- The docs must never describe a repo that no longer exists. If you deleted it,
  delete its documentation in the same commit.

## SHIP

```
git add -A && git commit -m "loop: <summary>" && git push -u origin <branch>
```

The branch is normally `loop`. When a session is handed a different branch by its
harness, that instruction wins and STATE.md records which branch actually carries
the work, so the next session can find it.

## STOP

Leave the repo green. If blocked after **2 attempts**, stop attempting: write the
blocker at the top of STATE.md — what you tried, what happened, what you would try
next — and spend the rest of the session improving tests or docs instead.

## Standing rules

- Never commit a secret value. This repo carries names and locations only.
- Never widen the increment because it was easy. The next session gets the rest.
- Prefer editing a data file (`src/sites.ts`) over editing render code.
- Unknowns get written down as unknowns. A confidently wrong doc-of-record is the
  most expensive thing this repo can produce.
