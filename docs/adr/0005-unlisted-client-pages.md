# Brand resources may host unlisted pages for clients

Brand resources was built for the studio's employees, contractors and trade partners. We now want to send clients a link instead of a PDF, starting with the testimonial page: it asks a client for a selfie video, has them sign off on how we'll use it, and takes the upload. Client pages live on this site under their own routes, unlisted: they aren't in the sitemap or the site menu, they're marked `noindex` in the page and its headers, and people find them only through a link we send. Like every other page, they follow the design system, meet WCAG 2.2 AA ([0002](./0002-page-text-meets-wcag-aa.md)) and keep their copy in `content/site.ts`. They leave out the brand rules' top bar and request form.

The testimonial page was chosen in a prototype on 23 October 2026 (branch `prototype/testimonial-flows`, research in [selfie-video-page.md](../research/selfie-video-page.md)): a stepped guide, one thing per screen, with three short prompts. Its upload works like this:

- **Sign first.** The client chooses and previews the video on their phone, but nothing uploads until they sign. The sign-off is one light yes covering our website, social media and paid ads, plus a choice of how they're named. Its wording is versioned in `content/site.ts`, and each video keeps a record of the exact words, the version and the time.
- **Phone to private Blob.** The video goes straight from the phone to a private Vercel Blob store, never through the site's server. Up to 1 GB and three minutes.
- **Then Drive.** Once Blob has it, the server copies the video and a text file of the sign-off to a Google Drive folder, deletes the Blob copy once Drive's matches it in size, emails both founders, and emails the client a copy of what they agreed to.

## Considered options

- **Listed and open to search engines.** Rejected: the page only helps someone we've asked, and an open upload form invites junk.
- **A personal link per client.** Deferred to [issue #8](https://github.com/compass-design-studio/brand-site/issues/8): one shared page is enough to start.
- **A PDF sent as an attachment, with the video texted or emailed back** (the 22 October 2026 version). Replaced: texts compress video, and email caps attachments near 25 MB.
- **Uploading straight from the browser to Drive.** Rejected: Google doesn't document browser uploads into an upload session that a server started, and a failed upload would leave no copy.
- **Keeping videos in Blob.** Rejected: the studio keeps client material in Drive, and an empty Blob store keeps the site within Vercel Hobby's included storage.

## Consequences

- The site has a second audience. The README and glossary say so, and a new client page follows this record instead of needing its own.
- Anyone with the link can reach the upload route. So it takes video files only, up to 1 GB, from a signed sign-off, behind the signed fill-time token and the rate limit the request form uses.
- The Drive copy needs Google credentials in the environment. Without them, or if a copy fails, the video and a sign-off text file stay in Blob and the founders' email says so, with a 7-day download link.
- Changing the sign-off's wording means a new version in `content/site.ts`, so older records still say what each client agreed to.
