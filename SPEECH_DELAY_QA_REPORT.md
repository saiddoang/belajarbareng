# Speech & Language Development Hub — QA Report

Environment: Node 26.13.0 (project declares `engines.node 22.x`; npm prints `EBADENGINE` as a warning only), npm 11.20.0, Next.js 16.4.6 (Turbopack), React 19.3.1, TypeScript 5.9.3, Tailwind CSS 4.3.5, headless Linux runner.

## 1. Result summary

| Area | Status | Evidence |
| --- | --- | --- |
| Type safety | **DONE** | `npx tsc --noEmit` → exit 0, no output. |
| Unit/content tests | **DONE** | `npm test` (Vitest 3.2.7) → 2 files, **34 tests passed**, exit 0. |
| Production build | **DONE** | `npm run build` → exit 0, 56 routes prerendered (10 education SSG, 30 activity SSG). |
| Production server smoke test | **DONE** | `next start -p 3100`; 18 checked URLs (see §3). |
| Existing portfolio intact | **DONE** | `/` → 307 `/en`; `/en`, `/en/work/<slug>` → 200. |
| Discoverable from the portfolio | **DONE** | Home page has a dedicated `#ruang-wicara` feature card with two CTAs plus a hero button; the sticky header carries a "Ruang Wicara" pill on every portfolio page; the footer links it; the hub links back to the site. Rendered and checked in the live deployment. |
| Clean production console | **DONE** | The missing `/favicon.ico` (404 on every page) is fixed by `app/icon.svg`, served live and linked in the document head; a reload shows no console errors. |
| Browser interaction testing (click-through) | **DONE for core flow** | Cloud browser: profile, 12-question baseline, activity and illustrated demo, session, milestone, goal, reflection, progress, report, JSON export and reset. See §3. |
| Visual/mobile review | **PARTIAL** | Mobile viewport screenshot of report inspected; horizontal navigation scrolls as designed. Other pages and screen sizes were not visually reviewed. |
| Touch targets on the home → hub path | **DONE (390×844)** | Every control in the home header, the home card and the sticky hub nav has an effective ≥44×44 CSS px hit area, measured by `elementFromPoint` hit-testing (see §3b). Locked by a Playwright smoke test. |
| Colour contrast on `/en` and `/speech-delay` | **DONE (light theme)** | 21 unique text/background pairs on `/en` and 18 on `/speech-delay` measured from composited pixels; lowest 4.83:1, all ≥4.5:1 (≥3:1 for large text). No dark theme exists, so there is nothing to measure there (see §3b). |
| Ruang Wicara card visible on the first screen | **DONE (390×844)** | Card panel starts at 442 px; headline 478–580 px, explanation 588–704 px, and both card buttons (716–760 px and 772–818 px) sit inside an 844 px viewport with 26 px to spare at `scrollY = 0`. Locked by a Playwright smoke test. |
| Audio/video capture on a real device | **NOT VERIFIED** | Headless runner has no audio device or screen reader. |
| Clinical review of content | **BLOCKED** | No clinician available. Every page states this. |
| Recheck against original goals file | **NOT VERIFIED** | `FREEBUFF_GOALS_SPEECH_DELAY.md` is absent from this checkout; this audit used the prior requirement trace and implemented files. |

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
200 /en/work/ruang-wicara       (the only case study)
404 /en/work/<unknown-slug>     (dynamicParams = false; no stub studies are routable)
307 / -> /en                     (existing redirect preserved)
```

Re-checked on the current build (production server, port 3000): `/en` 200,
`/en/work/ruang-wicara` 200, an unknown case-study slug 404s (stub studies are
removed, and `dynamicParams = false` keeps them unroutable), `/speech-delay` 200,
`/` 307 → `/en`.

Additional checks: `<title>Beranda — Ruang Wicara</title>` present in `/speech-delay` HTML; hashed CSS asset returns 200; `/en` HTML contains `id="ruang-wicara"`, three "Ruang Wicara" occurrences and the header pill link; `/speech-delay` HTML contains `lang="id"` on the hub container.

## 3a. Interactive browser verification

Re-verified in the live Vercel deployment after the discovery changes: the Settings panel's "Tambah profil" button now opens the create form inline (it previously linked to onboarding, which shows only the baseline once a profile exists, so a second child could not be added). Two children were created in sequence, the newest was made active automatically, the form closed and the state persisted in `localStorage`. Test data was deleted afterwards. The initial run of this check showed a 404 console error on every page for the missing favicon; `app/icon.svg` was added and the console is clean after reload.

Earlier, using the local production server through the Cloud browser, a test profile was created and all 12 baseline questions answered. One activity session was saved, and the progress chart and report both reflected it after navigation. A milestone observation, one family goal and one weekly reflection persisted. JSON export produced a completed download. Print media hid the controls and showed the report sheet. The first reset check exposed that an empty state was being written back to localStorage; `store.tsx` was fixed. After rebuilding and restarting the production server, `HAPUS` left the storage key absent (`null`). An age of 1 year 11 months was rejected by native form validity and created no profile; 2 years was accepted. A mobile viewport screenshot of the report was inspected.

## 3b. Accessibility pass on the home → Ruang Wicara path

Measured on the local production build (`npm run build` + `next start -p 3100`) in Chromium 141 at a 390×844 viewport, with `prefers-reduced-motion: reduce` so the reveal animation does not hide sections. Sizes are the *effective* hit area found by probing `document.elementFromPoint` around each control, not the CSS box.

### Contrast (composited colour vs composited background)

| Pair | Ratio | Required |
| --- | --- | --- |
| `text-paper/70` (12px) on `bg-paper/5` over `bg-accent` | **4.83:1** | 4.5 |
| `text-muted` (11–16px) on `paper` | 5.17:1 | 4.5 |
| `text-paper/70` (11px) on `bg-accent` | 5.43:1 | 4.5 |
| `text-paper/75` (11px) on `bg-accent` | 5.92:1 | 4.5 |
| `text-paper/80` (14px) on `bg-accent` | 6.53:1 | 4.5 |
| `text-accent` (14px) on `bg-accent/10` | 7.73:1 | 4.5 |
| `text-accent` (14px) on `bg-accent/5` | 8.45:1 | 4.5 |
| `text-ink` on `paper` / `paper` on `bg-accent` | 17.81:1 / 9.18:1 | 4.5 |

21 unique pairs on `/en`, 18 on `/speech-delay`; **none below its threshold**, so no colour token was changed. There is no dark theme in the project (no `dark:` variants and no `prefers-color-scheme` rules), so dark-mode contrast does not apply.

### Touch targets (390×844)

| Control | Hit area | Visible text |
| --- | --- | --- |
| Home header: “Belajar Bareng” | 96×44 | 20 px |
| Home header: “Ruang Wicara” pill | 109×44 | 28 px |
| Home header: Work / Approach / Contact | 45×44 / 69×44 / 61×44 | 17 px |
| Home card: “Open Ruang Wicara” | 172×45 | 44 px |
| Home card: “See the education library” | 181×47 | 46 px |
| Hub header: brand, “Pengaturan” | 135×44, 93×44 | 32 px, 34 px |
| Hub chips (7) | 54–112 × 44 | 28 px |
| Footer / “← All work” / hub footer links | 84×45, 44×45, 89×44, 140×45, 115×45 | 14–20 px (unchanged) |

The small secondary links keep the `tap-target` utility (a transparent `::after` overlay) added earlier, so their text boxes are still 14–20 px tall. Header rows were re-spaced so adjacent 44 px hit bands do not overlap: the site header is 93 px tall on phones (was 85) and the sticky hub header 132 px (was 120), with 16 px between the two chip rows. No horizontal overflow on either page (`scrollWidth - clientWidth = 0`).

### First screen

The Ruang Wicara card, its headline, its explanation and **both** of its buttons are inside the 844 px first screen at `scrollY = 0`: panel top 442 px, headline 478–580 px, explanation 588–704 px, `Open Ruang Wicara` 716–760 px, `See the education library` 772–818 px, leaving 26 px below the last button. The card also starts above the reveal observer's trigger line (93 px header + 8% bottom margin = 777 px), so it fades in on load without any scrolling. This needed mobile-only spacing and line-height changes (hero padding, headline/intro/card margins, card section and panel padding, `leading-snug` on the two body paragraphs); no font size was reduced and every value keeps its original desktop value behind `sm:` prefixes — measured at 1440×900 the card still starts at 841 px, the intro line-height is still 29.25 px, and at 768×1024 the card starts at 714 px. At 1280×900 the layout is unchanged from before this pass: site header 61 px, `h1` 76 px, card `h2` 40 px, hero bottom padding 96 px, card section padding 80 px, hub header 61 px with the desktop chip row shown and the mobile chip row hidden, no horizontal overflow.

### Automated guard

`tests/smoke.spec.ts` (Playwright, 390×844) fails when any control in the home header, the home card or the hub header measures under 44×44, when the card headline or explanation leaves the first screen, when a secondary link's hit area drops under 44 px or its visible text grows, or when any text pair falls below WCAG AA. It also clicks the card CTA and asserts it lands on `/speech-delay`.

```bash
npm run build
npx playwright test        # 7 tests (needs @playwright/test and a browser)
npm test                   # 34 unit tests, unchanged
```

Runner note: this headless Linux image ships without the X/NSS libraries Chromium needs and without root to install them, so the browser libraries were extracted into `~/.local/pw-deps` from the Ubuntu archive and `LD_LIBRARY_PATH` pointed at them for the test run. That is an environment workaround only; a normal machine needs just `npx playwright install chromium`.

Status of the changes described in this section: they are working-tree changes only. Nothing was committed or pushed in this run, so the live Vercel deployment still serves the previous build, and `@playwright/test` plus the `test:e2e` script are added to `package.json`/`package-lock.json` as uncommitted changes that a commit would need to include for `npx playwright test` to work on a fresh clone.

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
- Deletion: per-child delete removes that child's records and persists the remaining state. Full reset calls `localStorage.removeItem` after typing `HAPUS`.
- No third-party scripts, analytics, ad SDKs or network calls to external services in the module. Fonts are the site's existing `next/font` setup.

## 6. Known limitations (honest)

1. **`<html lang="en">` on the Indonesian module (mitigated, not fully fixed).** The portfolio root layout owns a static `lang="en"` because the site is English-only; moving the `<html>` shell would risk the existing pages. Two measures are in place: the hub renders everything inside `<div lang="id">` (so the server HTML already declares Indonesian for the module region, screen readers included), and `LangSync` sets `document.documentElement.lang = "id"` on mount and restores it on unmount. Still wrong before hydration is only the document-level element itself. A full fix means moving `<html>` into `app/[locale]/layout.tsx`, a portfolio-wide refactor that was deliberately not done.
2. **`localStorage` instead of IndexedDB.** The MD prefers IndexedDB. `localStorage` was chosen because it is synchronous, trivially exportable and adequate for the data volume (text notes only), at the cost of a ~5 MB ceiling and no binary storage. `saveState` returns an explicit error string on quota failure, which the settings page displays. If recordings or images are ever added, this must move to IndexedDB.
3. **Browser coverage is partial.** After the deploy, the home feature card and header pill were seen rendering, `/speech-delay` showed the three-step guide and back link, and creating a profile from Settings was exercised twice (one child, then a second child). Other widths, keyboard-only operation and screen-reader output were not audited. The core flow was exercised in a Cloud browser: profile, all 12 baseline answers, activity tabs and illustrated demo, session save, milestone save, goal and reflection save, progress, report, JSON export, and full reset. JSON import, monthly review, real audio playback, keyboard and screen-reader operation, and every one of the 30 activity flows were not individually exercised. They remain unverified in a browser.
4. **Print/PDF output partially verified.** Browser print-media emulation hid the print button and displayed the report sheet with saved goal data. A PDF file and its pagination were not visually inspected; page breaks still depend on the browser.
5. **Audio depends on the device.** Firefox/Chrome expose Indonesian voices inconsistently; the component detects absence and tells the user. Nothing here guarantees a specific pronunciation.
6. **No server, no accounts, no sync.** Data does not follow the user across devices or browsers, and clearing site data deletes it. This is stated in the UI.
7. **No clinician review.** `MEDICAL_CONTENT_REVIEWED_AT = 2026-11-19` records an editorial re-check against primary sources, not clinical sign-off.
8. **`requires_clinician_guidance` label unused.** No activity teaches a clinician-led protocol, so no activity carries that label; articulation and complex AAC are routed to a therapist in text instead.
9. **Node engine mismatch on this runner.** Node 26 was used; `package.json` declares 22.x. Build and tests pass; the exact Vercel Node 22 runtime was not tested here.
10. **Accessibility verified for the home → hub path only; no full audit.** Semantic landmarks, skip link, breadcrumbs, `aria-current`, `aria-pressed`, `aria-live`, `<table class="sr-only">` data alternatives and a focus-visible outline are implemented. Colour contrast and ≥44 px touch targets were measured on `/en` and `/speech-delay` at 390×844 and are covered by a Playwright smoke test (§3b), but no axe/Lighthouse run exists, the other hub routes and other viewports were not measured, and screen-reader output is still unverified.
11. **Original requirements file unavailable.** `FREEBUFF_GOALS_SPEECH_DELAY.md` was provided to the previous runner but is not present in this checkout. This run could verify the recorded requirement trace and working implementation, but could not re-read the full source document independently.

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
npm run build       # 56 routes
npx playwright test # 7 smoke tests at 390x844 (starts its own server on :3100)
npx next start -p 3100   # then curl the routes in §3
```
