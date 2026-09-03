# VISION

## Strata

A browser MMO-tycoon set in Paradise, NV. Players restore cells of a real map;
the world keeps a tamper-evident audit chain of what was restored, when, and at
what estimated energy cost. It has to be good on a phone, because that is where
it will actually be played.

## What this repo is for

Strata is built by a relay of short, memoryless sessions across several repos.
That works only if there is one place that answers, without anyone having to
remember:

- **Where is everything?** Every piece of Strata, its loop deploy, its prod
  deploy, its CI — one screen, reachable from a phone.
- **How is it wired?** Which Netlify site, which Supabase project, which secret
  names live where. Names and locations only; never a value.
- **What shape is the data?** One canonical copy of the Contracts v1 fixtures,
  served over HTTP so the frontend and the game client cannot drift apart by
  each keeping their own.
- **Is it alive?** A smoke script any session can run, whose results land in a
  doc with timestamps.
- **How does it ship?** The exact steps to promote `loop` → `main` from a phone.

## What this repo is not

Not a game repo. No gameplay, no rendering, no API. If a change here would be
more at home in clvi-frontend, clvi-game-client, or clvi-backend, it belongs
there instead.

## The bar

A stranger picks up the phone, opens the loop deploy, and within one screen can
reach every other piece of Strata and tell whether the backend is answering.
