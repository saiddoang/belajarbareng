# Speech & Language Development Hub — Deployment Guide

The module is part of the existing Next.js portfolio. There is no separate service, no database, no account system and no environment variable to set. It deploys exactly like the rest of the site.

## 1. Stack

| Item | Value |
| --- | --- |
| Framework | Next.js 16.4.6 (App Router, Turbopack build) |
| Language | TypeScript 5.9.3 |
| Styling | Tailwind CSS 4.3.5 (`@theme` tokens in `app/globals.css`) |
| State | React context + `localStorage` (`speech-delay:v1`) |
| Tests | Vitest 3.2.7 (`lib/**/*.test.ts`) |
| Hosting | Vercel, via the existing `vercel.json` (`{"framework":"nextjs"}`) |
| Node | `engines.node: 22.x` |

## 2. Local commands

```bash
npm ci                 # install from package-lock.json (do not upgrade deps)
npm run dev            # http://localhost:3000  →  /speech-delay
npm run typecheck      # tsc --noEmit
npm test               # vitest run  (34 tests)
npm run build          # next build  (57 routes)
npm run start          # serve the production build (default port 3000)
```

If port 3000 is busy: `npx next start -p 3100`.

## 3. Routes produced

| Route | Rendering |
| --- | --- |
| `/speech-delay` | Static — dashboard (personalises on the client from local data) |
| `/speech-delay/onboarding` | Static — profile + baseline flow |
| `/speech-delay/education` | Static — 10 articles |
| `/speech-delay/education/[slug]` | SSG, 10 paths, `dynamicParams = false` |
| `/speech-delay/programs` | Static — L0–L5 + 7-day plan |
| `/speech-delay/exercises` | Static — activity library with client filters |
| `/speech-delay/exercises/[slug]` | SSG, 30 paths, `dynamicParams = false` |
| `/speech-delay/milestones` | Static — CDC checklists |
| `/speech-delay/progress` | Static — charts, goals, reflections |
| `/speech-delay/report` | Static — printable report |
| `/speech-delay/safety` | Static — referral guide |
| `/speech-delay/resources` | Static — glossary + full source registry |
| `/speech-delay/settings` | Static — profiles, preferences, export/import, delete |
| unknown module URL | module-level `not-found.tsx` → 404 |

`/` still redirects to `/en` via `next.config.ts`; `/speech-delay` is outside `[locale]` and is not affected by that redirect.

## 4. Vercel deployment

1. Push the branch to the repository.
2. Vercel's existing project picks up the build automatically — `vercel.json` needs no change.
3. Build command `next build`, output handled by the Next.js framework preset. No environment variables, secrets or paid services are needed.
4. After the deployment, check:
   - `https://<domain>/en` still renders the portfolio,
   - `https://<domain>/speech-delay` renders the Indonesian dashboard,
   - `https://<domain>/speech-delay/exercises/ikuti-minat-anak` renders an activity,
   - an unknown module URL returns the custom 404.

Cold build on Vercel is roughly 1–2 minutes for this project.

## 5. Data and privacy notes for operations

- All child data stays in the visitor's browser (`localStorage`, key `speech-delay:v1`). Nothing is sent to Vercel, to a database or to a third party.
- Consequently there is **nothing to back up server-side** and no per-user data to delete on the server. A user deletes their own data from `/speech-delay/settings` (per child, or "Hapus semua data").
- Export produces an unencrypted JSON file on the user's device; the UI warns about this.
- No analytics, ad SDK or tracking script is introduced by this module. If site-wide analytics is added later, it must not capture the module's note fields.

## 6. Updating content safely

| File | Purpose |
| --- | --- |
| `lib/speech-delay/sources.ts` | Source registry + `MEDICAL_CONTENT_REVIEWED_AT` |
| `lib/speech-delay/milestones.ts` | CDC items (Indonesian text + verbatim `sourceText`) |
| `lib/speech-delay/education.ts` | 10 education articles |
| `lib/speech-delay/activities-a.ts`, `activities-b.ts` | 30 activities |
| `lib/speech-delay/programs.ts`, `weekly-plan.ts` | Levels and the 7-day routine |
| `lib/speech-delay/baseline.ts` | Baseline questions, level gates, red flags |

After any content edit run `npm test`. The suite fails on duplicate ids/slugs, unregistered `sourceIds`, an activity missing dialogue/steps/observations, a slug in programs or the weekly plan that no longer exists, or a milestone that stops quoting a CDC source. Then run `npm run build`.

When new medical content is added, update `accessedAt`/`reviewedAt` and `MEDICAL_CONTENT_REVIEWED_AT`, and mirror the claim in `SPEECH_DELAY_CONTENT_SOURCES.md`.

## 7. Rollback

The module is additive: reverting the merge commit removes the routes and the footer link, and leaves the rest of the portfolio untouched. No migration is involved, and no server-side data exists to roll back.
