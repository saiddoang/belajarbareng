# Speech & Language Development Hub — QA Report

Environment: Node 26.13.0 (project declares `engines.node 22.x`; npm prints `EBADENGINE` as a warning only), npm 11.20.0, Next.js 16.4.6 (Turbopack), React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.5, headless Linux runner.

## 1. Result summary

| Area | Status | Evidence |
| --- | --- | --- |
| Type safety | **DONE** | `npx tsc --noEmit` → exit 0, no output. |
| Unit/content tests | **DONE** | `npm test` (Vitest 3.2.7) → 2 files, **34 tests passed**, exit 0. |
| Production build | **DONE** | `npm run build` → exit 0, 57 routes prerendered (10 education SSG, 30 activity SSG). |
| Production server smoke test | **DONE** | `next start -p 3100`; 17 checked URLs (see §3). |
| Existing portfolio intact | **DONE** | `/` → 307 `/en`; `/en`, `/en/work/<slug>` → 200; footer now links to `/speech-delay`. |
| Browser interaction testing (click-through) | **NOT VERIFIED** | No interactive browser was driven. See §6. |
| Visual/mobile review | **NOT VERIFIED** | No screenshots taken; responsive classes are implemented but not visually reviewed. |
| Audio/video capture on a real device | **NOT VERIFIED** | Headless runner has no audio device or screen reader. |
| Clinical review of content | **BLOCKED** | No clinician available. Every page states this. |

## 2. Test coverage (34 assertions)

`lib/speech-delay/content.test.ts` (15 tests)
- ≥30 activities exist, and the two source files add up to the registry length.
- Activity ids and slugs are unique; titles, `setup` and `objective` are all distinct (guards against one shell with changed titles).
- Every activity has ≥3 parent–child dialogues, ≥3 steps, ≥2 observations, materials, prerequisites, a disengagement tip and a low-pressure alternative.
- Every `sourceIds` entry resolves in the source registry — a typo fails the build of the test suite.
- Filters by level, domain and free text work, including an empty result.
- Every slug referenced by programs, baseline suggestions and the 7-day plan resolves.
- Milestones cover exactly 24/30/36/48/60 months, ids unique, every item quotes a CDC source, cumulative age filtering behaves.
- 10 education articles, unique slugs, each with ≥2 sections, references, reading time and substantial body text.
- Source registry has https URLs, ISO access/review dates, scope and statement for all 11 sources.

`lib/speech-delay/logic.test.ts` (19 tests)
- `suggestedLevel`: 0 on unknown answers; capped at 1 without functional words; capped at 2 without word combinations; 5 only when all gates are met; concerns do not change the level.
- `redFlagsFor`: only the four concern questions, and "kadang"/"tidak yakin" never raise a flag.
- `buildBaselineResult`: no diagnosis wording, suggested slugs all valid, unanswered questions and red flags reported in the summary.
- `parseState`: rejects non-objects and unknown versions; accepts own state; drops records for unknown children; fills default settings; export→parse round-trip.
- `startOfWeek`/`toISODate` Monday anchoring; `sessionsByWeek` bucketing; `uniqueDaysPracticed`; `goalStatusCounts`; `goalMovementPercent` (incl. empty); `domainBreakdown` ignoring unknown activity ids.

## 3. Route verification (`next start`, port 3100)

All checks returned the expected status:

```
200 /en
200 /speech-delay
200 /speech-delay/onboarding
200 /speech-delay/education
200 /speech-delay/education/bicara-bahasa-komunikasi
200 /speech-delay/programs
200 /speech-delay/exercises
200 /speech-delay/exercises/ikuti-minat-anak
200 /speech-delay/exercises/kartu-komunikasi-aku-mau
200 /speech-delay/milestones
200 /speech-delay/progress
200 /speech-delay/report
200 /speech-delay/safety
200 /speech-delay/resources
200 /speech-delay/settings
404 /speech-delay/tidak-ada      (custom module not-found)
200 /en/work/ledger-dashboard    (existing portfolio page)
307 / -> /en                     (existing redirect preserved)
```

Additional checks: `<title>Beranda — Ruang Wicara</title>` present in `/speech-delay` HTML; hashed CSS asset returns 200; `/en` HTML contains `href="/speech-delay"` (footer integration).

## 4. Multimedia asset inventory (truthful)

| Asset type | What actually ships | Honest label |
| --- | --- | --- |
| Illustrations | 10 original inline SVGs in `components/speech-delay/illustration.tsx` (book, car, ball, blocks, doll, kitchen, meal, body, animal, cards). No stock art, no external requests, no copyrighted characters. | Indonesian `aria-label` on every SVG. |
| Audio | Browser `speechSynthesis` with `id-ID`, rate control, stop/mute, always-visible transcript. | Labelled "Suara sintetis dari peramban, bukan rekaman terapis"; when no Indonesian voice exists the limitation is displayed. |
| Video | **None.** No footage was produced or licensed. | `DemoPlayer` is a step-through illustration of the activity's own instructions, labelled **"Ilustrasi animasi — bukan rekaman video"**, with a full transcript, previous/next controls and `prefers-reduced-motion` handling (autoplay disabled, message shown). |
| Child voice recording | **Not implemented by design.** | No microphone access, no upload, no automatic scoring anywhere in the codebase. |

**Missing assets, stated plainly:** there are no Indonesian human-speech recordings and no filmed demonstrations. The MD allows this provided a functional illustrated+text alternative exists and the gap is reported — that is what ships.

## 5. Privacy and data handling

- Persistence: `localStorage` under key `speech-delay:v1` (see §6 for why not IndexedDB).
- Stored: nickname, age in months, home languages, optional caregiver note, practice sessions, milestone observations, goals, reflections, goal reviews, baseline results, three settings. **No** legal name, birth date, raw audio or device identifiers.
- Export: JSON download, unencrypted — the settings page says so.
- Import: validated by `parseState` before replacing state; unknown children's records are discarded.
- Deletion: per-child delete and full reset both call `localStorage.removeItem`, confirmed by typing `HAPUS`.
- No third-party scripts, analytics, ad SDKs or network calls to external services in the module. Fonts are the site's existing `next/font` setup.

## 6. Known limitations (honest)

1. **`<html lang="en">` on the Indonesian module (NOT VERIFIED / documented).** The portfolio root layout owns a static `lang="en"` because the site is English-only; moving the `<html>` shell would risk the existing pages. `LangSync` sets `document.documentElement.lang = "id"` on mount, so assistive technology sees the correct language after hydration, but the server HTML and any pre-hydration snapshot still say `en`. A permanent fix is to move the `<html>` element into `app/[locale]/layout.tsx`, which is a portfolio-wide refactor and was deliberately not done in this change.
2. **`localStorage` instead of IndexedDB.** The MD prefers IndexedDB. `localStorage` was chosen because it is synchronous, trivially exportable and adequate for the data volume (text notes only), at the cost of a ~5 MB ceiling and no binary storage. `saveState` returns an explicit error string on quota failure, which the settings page displays. If recordings or images are ever added, this must move to IndexedDB.
3. **No click-through browser testing.** Tab switching in the activity player, baseline submission, milestone buttons, goal creation, reflection submission, JSON export/import and print output were type-checked and unit-tested at the logic layer, but were **not** exercised in a real browser in this environment. This is the largest untested surface.
4. **Print/PDF output not visually verified.** `@media print` rules hide nav, header, footer and `.no-print`, and style `.report-sheet`; the PDF is produced by the browser's own print dialog (no PDF library), so pagination and page breaks depend on the browser and were not visually inspected.
5. **Audio depends on the device.** Firefox/Chrome expose Indonesian voices inconsistently; the component detects absence and tells the user. Nothing here guarantees a specific pronunciation.
6. **No server, no accounts, no sync.** Data does not follow the user across devices or browsers, and clearing site data deletes it. This is stated in the UI.
7. **No clinician review.** `MEDICAL_CONTENT_REVIEWED_AT = 2026-11-19` records an editorial re-check against primary sources, not clinical sign-off.
8. **`requires_clinician_guidance` label unused.** No activity teaches a clinician-led protocol, so no activity carries that label; articulation and complex AAC are routed to a therapist in text instead.
9. **Node engine mismatch on this runner.** Node 26 was used; `package.json` declares 22.x. Build and tests pass, but Vercel will use a supported runtime.
10. **Accessibility verified by construction, not by audit.** Semantic landmarks, skip link, breadcrumbs, `aria-current`, `aria-pressed`, `aria-live`, `<table class="sr-only">` data alternatives, focus-visible outline and ≥44 px touch targets are implemented; no automated axe/Lighthouse run was performed.

## 7. Requirement traceability

| MD requirement | Where it is implemented | Status |
| --- | --- | --- |
| `/speech-delay` + nested routes | `app/speech-delay/**` (14 route files) | DONE |
| Parent dashboard personalised to profile | `components/speech-delay/dashboard.tsx` | DONE |
| 10 education topics | `lib/speech-delay/education.ts` | DONE |
| Reference section per article | `SourceList` on every article | DONE |
| "Dasar penelitian" drawer per intervention | `EvidenceDrawer` (`#dasar-penelitian`) on every activity page | DONE |
| ≥30 distinct activities with ≥3 dialogues | 30 in `activities-a.ts` + `activities-b.ts`, enforced by tests | DONE |
| Functional level assignment, not age | `suggestedLevel` + guards; age bands are browsing hints only | DONE |
| 7-day starter routine | `lib/speech-delay/weekly-plan.ts`, rendered on `/programs` | DONE |
| CDC 2y/30m/3y/4y/5y with original text | `milestones.ts` (23 items) + `/milestones` | DONE |
| Milestone statuses incl. "Belum diamati" | `ObservationStatus`, `MilestoneBoard` | DONE |
| Child profile create/edit/delete | `ChildSetup`, `SettingsPanel` | DONE |
| Non-diagnostic baseline with "not sure" | `baseline.ts` (12 questions, 4 options incl. `tidak_yakin`) | DONE |
| Distinct red-flag referral alert | `redFlagsFor` → dashboard, baseline result, report | DONE |
| Weekly reflection / monthly goal review | `ReflectionForms`, `/progress#refleksi` | DONE |
| Goals: baseline, criterion, situations, status, next idea | `GoalManager` | DONE |
| Practice participation vs observed change separated | Dashboard + `/progress` copy and separate metrics | DONE |
| Charts: sessions/week, domains, goal status, milestones | `progress-charts.tsx`, `progress-view.tsx` | DONE |
| Printable report with limitations | `/report`, `report-view.tsx`, print CSS | DONE (print rendering not visually verified) |
| JSON export/import + real deletion | `SettingsPanel`, `storage.ts` | DONE |
| Safety/referral guide + appointment checklist | `/safety` | DONE |
| AAC/gesture support | Activity 18, 30, education article 8, `kartu` illustration | DONE |
| Keyboard, reduced motion, captions/transcripts | All components; `DemoPlayer` motion handling | DONE (not audited) |
| Loading/empty/error states | `ready` gates, `EmptyState`, storage error strings | DONE |
| No fake media, no diagnosis, no cure promises, no auto scoring | No microphone/upload code; copy reviewed; no score UI | DONE |
| Vercel readiness | `vercel.json` unchanged; build passes; no new env vars | DONE |

## 8. How to reproduce

```bash
npm ci
npm run typecheck   # exit 0
npm test            # 34 tests
npm run build       # 57 routes
npx next start -p 3100   # then curl the routes in §3
```
