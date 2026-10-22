# brand-site

Brand resources: the public site at brand.compass-design.studio where the studio's employees, contractors and trade partners download Compass marks and read the brand rules. It's the published copy of the Compass design system ([ADR 0001](docs/adr/0001-design-system-artifact-is-the-master.md)).

Next.js (App Router) on Vercel, with Vercel Analytics and a request form that sends through Resend.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run build && npm start` serves the production build. Checks: `npm test` (unit tests), `npm run lint`, `npm run typecheck`.

## Where things live

- `content/brand.ts`: brand wording and values from the design system README (version 16) and tokens. Keep in step by hand until [issue #1](https://github.com/compass-design-studio/brand-site/issues/1). If the site needs wording the design system doesn't have, it goes into the design system first ([ADR 0001](docs/adr/0001-design-system-artifact-is-the-master.md)).
- `content/site.ts`: page copy that isn't a brand rule (section names, hero, request wording).
- `public/logos/`: the 28 SVG masters under their [ADR 0003](docs/adr/0003-mark-file-naming-convention.md) names. Drop PNG and PDF exports in beside them with the same base name; every card links a format only once its file exists, and the zips pick them up on the next build.
- `app/downloads/[zip]/route.ts`: builds the zips (all marks, one per form, tiles and bars, two-tone and reversed) at build time.
- `app/api/request/route.ts`: the request form's server route (spam checks, then one email to both founders).
- `assets/images/`: example images, served through `next/image`.

## Request form

Copy `.env.example` to `.env.local`. Keys live only in environment variables, never in the repo.

| Variable | What it does |
|---|---|
| `RESEND_API_KEY` | From the marketing site's Resend account. Without it, the form says it isn't connected yet and points people to the founders' email. |
| `REQUEST_FROM_EMAIL` | Optional. Default `Brand resources <brand@send.compass-design.studio>`; the domain must be verified in Resend (send.compass-design.studio is). |
| `REQUEST_TO_EMAIL` | Optional, comma-separated. Default allison@ and canyon@compass-design.studio. |
| `REQUEST_FORM_SECRET` | Optional. Signs the fill-time token; falls back to `RESEND_API_KEY`. |
| `REQUEST_DRY_RUN` | `1` logs the email instead of sending it. |

Spam checks: a hidden trap field, a signed token that must be at least 3 seconds old when the form is sent, an origin check, field and link limits, and a per-instance rate limit. Trapped or too-fast posts are told they worked and nothing is sent. Nothing is emailed back to the sender.
