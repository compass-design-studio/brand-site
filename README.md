# brand-site

Brand resources: the public site at brand.compass-design.studio where the studio's employees, contractors and trade partners download Compass marks and read the brand rules. It's the published copy of the Compass design system ([ADR 0001](docs/adr/0001-design-system-artifact-is-the-master.md)). It also hosts unlisted pages for clients, starting with the testimonial page at `/testimonial` ([ADR 0005](docs/adr/0005-unlisted-client-pages.md)).

Next.js (App Router) on Vercel, with Vercel Analytics, a request form that sends through Resend, and a video upload that goes to private Vercel Blob and on to Google Drive.

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
- `app/testimonial/` and `components/testimonial/`: the unlisted testimonial page, a stepped guide that asks a client for a selfie video. Its copy is `TESTIMONIAL` in `content/site.ts`, and the words clients sign are `TESTIMONIAL_SIGN_OFF` there.
- `app/api/testimonial/route.ts`, `lib/testimonial.ts` and `lib/testimonial-server.ts`: the upload (a token for the browser once the client has signed, then the Drive copy and the emails once Blob has the video).
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

## Testimonial uploads

The client signs first, then the phone uploads the video straight to a private Vercel Blob store; it never passes through the site's server. When Blob has it, the server copies the video and a text file of the sign-off to Google Drive, deletes the Blob copy once Drive's matches it in size, and sends two emails through Resend (as above): one to both founders with the Drive link and the sign-off, and one to the client with a copy of what they agreed to. Videos only, up to 1 GB and three minutes, with the request form's token, origin check and rate limit.

| Variable | What it does |
|---|---|
| `BLOB_READ_WRITE_TOKEN` | Added by Vercel when a Blob store is connected to the project. Without it, the page says uploads aren't on yet and asks clients to reply to our email with their video instead. |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` | Turn on the Drive copy. Without them, videos and their sign-offs stay in Blob and the founders' email carries a 7-day download link. |
| `RESEND_API_KEY` | The same key as the request form. Without it, the emails are logged, not sent. |

**Staying on Vercel Hobby.** Hobby includes 1 GB of Blob storage, measured as the month's average, and locks Blob for 30 days if a month goes over. Deleting each video once Drive has it keeps the store nearly empty, so only connect Blob once the Drive copy is set up, or clear Blob by hand after each video. The upload route needs up to 300 seconds for a 1 GB Drive copy, which is Hobby's ceiling. Note that Vercel's fair use guidelines limit Hobby to non-commercial use.

**Blob store, once:** in Vercel, open the brand-site project, then Storage, Create, Blob. Set access to **Private**, and connect it to Production and Preview (and Development, to test locally with `vercel env pull`).

**Drive copy, once,** signed in to Google as the Workspace account that should own the videos (for example canyon@compass-design.studio):

1. In the [Google Cloud console](https://console.cloud.google.com/), create a project (for example "Brand resources") and turn on the **Google Drive API**.
2. Under **Google Auth Platform**, fill in the branding, then set the audience to **Internal** (Workspace accounts only; an External app in testing loses its token after 7 days). Under Data Access, add the scope `https://www.googleapis.com/auth/drive.file`, which reaches only the files the site creates.
3. Under Clients, create an OAuth client of type **Web application**, with `https://developers.google.com/oauthplayground` as an authorized redirect URI. Copy its client ID and secret.
4. In the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground), open the settings (the gear), tick **Use your own OAuth credentials** and paste the client ID and secret. In step 1, type the `drive.file` scope above and authorize it as the same Workspace account. In step 2, exchange the code for tokens and copy the **refresh token**.
5. Add `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` and `GOOGLE_REFRESH_TOKEN` in Vercel (Production and Preview), then redeploy.

The first upload creates a folder called "Client selfie videos" in that account's My Drive. Share it with Allison, rename it or move it anywhere in My Drive; the site finds it by a tag, not by its name or place. The token stops working if that account revokes the app's access or the app goes unused for six months; repeat step 4 to get a new one.

**Test it** on the production domain, or on a preview deployment with **Protection Bypass for Automation** turned on (Vercel adds `VERCEL_AUTOMATION_BYPASS_SECRET`, and the route passes it to Blob's callback). Blob only reports a finished upload to a public URL, so `npm run dev` uploads to Blob but makes no Drive copy and sends no email.
