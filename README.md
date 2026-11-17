# Portfolio

Personal portfolio for a senior software engineer: one home page, three case
studies, English only for the first launch. Next.js 16 (App Router), Tailwind
CSS 4, TypeScript. Built to deploy on Vercel with no configuration.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## What is still placeholder

Everything below is sample content, clearly marked in the UI by the banner from
`components/dev-notice.tsx`. Nothing here should be published as-is.

| What | Where |
| --- | --- |
| Email, LinkedIn, GitHub, CV link | `lib/site.ts` |
| Name, headline, intro, approach, contact and 404 copy | `lib/i18n/messages/en.ts` |
| The three case studies (story, metrics, links) | `content/projects.ts` |

Checklist before launch:

1. Replace every `[bracketed]` line. Set `placeholder: false` on each project in
   `content/projects.ts` once it is real.
2. Drop your CV at `public/cv.pdf`, then set `cvUrl: "/cv.pdf"` in `lib/site.ts`.
   While it is `null` no download button is rendered, so there is no dead link.
3. Never publish a metric you cannot explain in an interview.
4. Delete the `<DevNotice>` lines in `app/[locale]/page.tsx` and
   `app/[locale]/work/[slug]/page.tsx`.

## Structure

```
app/layout.tsx                 html shell + fonts
app/[locale]/layout.tsx        metadata, header, footer
app/[locale]/page.tsx          home: hero, work, approach, contact
app/[locale]/work/[slug]/      case study template
app/[locale]/not-found.tsx     404 inside the site shell
app/not-found.tsx              404 outside the locale routes
components/                    header, footer, reveal, dev notice, locale switcher
content/projects.ts            typed project data
lib/i18n/                      locale config + English messages
lib/site.ts                    contact links
```

Routes are static (`dynamicParams = false`), so a case study that does not exist
in `content/projects.ts` returns a 404 instead of rendering an empty page.

## Blog

Deliberately absent. There is no route and no link until real writing exists —
an empty blog is worse than no blog. When you have two or three posts, add
`app/[locale]/writing/` and a nav entry in `components/site-header.tsx`.

## Adding Indonesian

The routing is already locale-aware:

1. Add `"id"` to `locales` in `lib/i18n/config.ts`.
2. Create `lib/i18n/messages/id.ts` with the same shape as `en.ts`
   (`satisfies Messages` keeps it honest) and register it in `lib/i18n/index.ts`.
3. Move the `<html>` shell from `app/layout.tsx` into `app/[locale]/layout.tsx`
   so `lang` follows the locale.
4. `hreflang` alternates and the language switcher then work on their own.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In Vercel: **Add New → Project**, import the repository. Framework preset is
   detected as Next.js; leave the build settings alone.
3. Environment variable (recommended): set
   `NEXT_PUBLIC_SITE_URL=https://your-domain.com` under
   **Settings → Environment Variables** so canonical, `hreflang` and social
   previews use your own domain.

   Without it the origin falls back to Vercel's `VERCEL_PROJECT_PRODUCTION_URL`
   and then `VERCEL_URL`, so deployments still advertise the right host. If no
   origin can be determined at all, canonical and `hreflang` are omitted — they
   are never written as `http://localhost:3000`.
4. Deploy, then add your custom domain under **Settings → Domains**.

No `vercel.json` is needed and no secrets are committed — `.env*.local` is
ignored by git.

### If the deployment answers with a Vercel 404

A body of `The page could not be found` with the header
`x-vercel-error: NOT_FOUND` comes from Vercel's edge, not from this app: that
hostname is not attached to a successful deployment. In order:

1. **Deployments** — is the latest one `Ready`, or did the build fail? The log
   is in that deployment.
2. **Settings → Git** — connected to this repository and the `main` branch, with
   **Root Directory** left empty.
3. `vercel.json` pins `framework: "nextjs"`, so a wrong framework preset can no
   longer publish an empty deployment. Delete that file only if you replace it
   with the correct project setting.

## Not included

Contact form (a mailto link is used instead, so nothing can silently fail),
analytics, CMS, auth, dark mode.
