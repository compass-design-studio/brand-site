# Search wording for Brand resources

How to get Brand resources found by people who search for "logos" or "brand guidelines" without renaming it. This note gives the exact words to paste and the files search engines read. Each recommendation is checked against Google's, Bing's and the HTML standard's own documentation. Every source was read on **22 October 2026**.

Related: [brand-kit-naming.md §2.1](brand-kit-naming.md#21-brand-resources-the-sites-name) (where the "logos" and "brand guidelines" advice comes from), [GLOSSARY.md](../GLOSSARY.md), [ADR 0001](../adr/0001-design-system-artifact-is-the-master.md) (rule wording changes in the design system first), [ADR 0002](../adr/0002-page-text-meets-wcag-aa.md) (page text meets WCAG 2.2 AA) and [ADR 0003](../adr/0003-mark-file-naming-convention.md) (mark file names).

## How to read this

- **What was checked.** Two earlier notes, one of search rules and one auditing the built site, were checked line by line against the sources in §5 and against the site code. The code is the same on `main` (45c4cdf) and on `origin/claude/quirky-fermi-fe6f61`, so the line numbers here match both.
- **Sources.** First-party only: Google Search Central, Bing Webmaster Tools and the Bing Webmaster Blog, the WHATWG HTML Standard, the Open Graph protocol, and the Next.js 16.4.2 and Vercel docs. Each claim points to a numbered source in §5. Lines marked *(judgment)* are recommendations, not findings.
- **Who owns the words.** Everything this note changes is site copy (`app/layout.tsx`, `content/site.ts`) or new site files. No brand rule changes, so nothing has to go through the design system first (README, "Where things live"; ADR 0001).
- **Corrections to the two input notes.**
  - **Title length.** The audit says Google cuts titles at about 60 characters. Google gives no character limit. It shortens a title to fit the screen width [1]. The 60-character figure is only a rough guide.
  - **Dropping the site name.** Google may leave the site name out of a title link when the result already shows it. Google says this only for domain-level site names [1], and brand.compass-design.studio is a subdomain, so expect the full title to show.
  - **WebPage markup (audit row 8).** I don't recommend it. Its only job here would be to carry search terms. Google documents `WebSite` markup as the way to state a site name [3], and the visible text already carries the terms.
  - **Blocking `/api/`.** The search-rules note called this optional. It is worth doing: a plain GET to `/api/request` hands out a form token (`app/api/request/route.ts:16`), and Bing asks sites to keep crawlers off paths like that [18 §21].
  - **Sitemap date.** Don't copy the `lastModified: new Date()` line from the Next.js example [22]. It stamps every build with a new date, and Bing asks sites not to use the sitemap's build time as `lastmod` [19].
  - **Instagram handle.** The live profile is at `instagram.com/compass_design.studio`, with an underscore. Its page title names @compass_design.studio. The hyphen spelling, `instagram.com/compass-design.studio`, shows no profile [25]. The site's spelling is right (`content/brand.ts:226`, `components/sections/ImageryAndInSitu.tsx:167`), and the hyphen in the request looks like a typo. Leave the site as it is.

---

## 1. Recommendation

### 1.1 In order

1. **Words** (§1.2): change the `<title>`, the meta description, the Open Graph title and description, and the hero lead. Land this before the site is submitted to search engines, so the first crawl sees the final words. Google can take days to weeks to pick up changes [3].
2. **Search files in code** (§1.3): add a canonical link, `WebSite` structured data, `robots.txt` and a sitemap. This is code only, with no new artwork.
3. **Two images** (§1.4): a PNG/ICO favicon and an Open Graph image. Both come from Figma, so add them to the Figma export session.
4. **After launch** (§1.6): add the site to Google Search Console and Bing Webmaster Tools, and submit the sitemap.
5. **Marketing site, not a blocker** (§1.5): `Organization` markup belongs on compass-design.studio, not here.

### 1.2 Words, ready to paste

**`<title>`** (`app/layout.tsx:17`), 68 characters:

```
Brand resources · logos and brand guidelines · Compass Design Studio
```

- "Brand resources" leads, so the decided name comes first.
- "logos" stays lowercase after the dot because it continues the phrase, as the site already does in "Brand resources · requests" and "Start here · our most used". "Compass Design Studio" is a name, so it keeps its capitals (CASING, `content/brand.ts:204–211`).
- On a narrow phone, Google may cut the end of the title. Only the studio name would be lost, and Google usually shows it on the line above the title anyway (§1.3).

**Meta description** (`app/layout.tsx:18`), 151 characters:

```
Download Compass Design Studio logos and read our brand guidelines: usage rules, colors, type and voice. For our staff, contractors and trade partners.
```

**Open Graph title** (`app/layout.tsx:20`), 44 characters. This is the headline on a link shared in email or chat:

```
Brand resources · logos and brand guidelines
```

**Open Graph description** (`app/layout.tsx:21`), 70 characters:

```
Logos and brand guidelines: colors, type and the rules for using them.
```

So `app/layout.tsx` lines 15–26 read:

```ts
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Brand resources · logos and brand guidelines · Compass Design Studio',
  description: 'Download Compass Design Studio logos and read our brand guidelines: usage rules, colors, type and voice. For our staff, contractors and trade partners.',
  openGraph: {
    title: 'Brand resources · logos and brand guidelines',
    description: 'Logos and brand guidelines: colors, type and the rules for using them.',
    url: SITE_URL,
    siteName: 'Compass Design Studio',
    type: 'website',
  },
}
```

**Hero lead** (`content/site.ts:29`), the paragraph right under the H1. Only the opening changes, from "Logos," to "Logos and brand guidelines:":

```ts
  lead: "Logos and brand guidelines: colors, type and the rules for using them, for the studio's staff, contractors and trade partners.",
```

This is the only new visible text. With it, "brand guidelines" appears once on the page, near the top. "Logos" already appears in this lead, the "Download logos" button and the "Logo files" heading and nav label, which is enough.

**H1:** no change. **Section headings, labels and alt text:** no change. §3 explains why.

### 1.3 Search files in code

**Canonical link and `WebSite` structured data**, both in `app/page.tsx`. The canonical goes in the page, not the layout, so no future page points its canonical at the home page by mistake [23].

```tsx
import type { Metadata } from 'next'
import { STUDIO } from '@/content/brand'
import { SITE_URL } from '@/content/site'
// ...the existing imports stay as they are...

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/** Tells search engines which site name to show for brand.compass-design.studio. Home page only. */
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: STUDIO.name,
  alternateName: [new URL(SITE_URL).hostname],
  url: `${SITE_URL}/`,
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, '\\u003c') }} />
      <Providers>
        {/* ...unchanged... */}
      </Providers>
    </>
  )
}
```

With the default `SITE_URL`, this renders the canonical link and the structured data below:

```html
<link rel="canonical" href="https://brand.compass-design.studio" />
```

```json
{"@context":"https://schema.org","@type":"WebSite","name":"Compass Design Studio","alternateName":["brand.compass-design.studio"],"url":"https://brand.compass-design.studio/"}
```

- **`name` is "Compass Design Studio", not "Brand resources".** This is the publisher line Google shows above the title, next to the favicon. It is not a rename. "Brand resources" is still the page's name in the title, the hero and the top bar. Google rarely picks a generic name such as "Brand resources" as a site name [3]. "Compass Design Studio" already matches `og:site_name`, the end of the title and the footer.
- **`alternateName` is the subdomain, in lowercase.** Google may decline to give two sites the same name [3]. If it does, it falls back to "brand.compass-design.studio", which is still clear. Google treats a lowercase hostname in `alternateName` as a fallback the site has asked for [3].
- **No `Organization` here.** See §1.5.
- The `.replace(/</g, '\\u003c')` comes from the Next.js JSON-LD guide, which uses it to keep the script tag safe [22].

**`app/robots.ts`** (new file):

```ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', disallow: '/api/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
```

It serves:

```
User-Agent: *
Disallow: /api/

Sitemap: https://brand.compass-design.studio/sitemap.xml
```

- Without this file the site works the same for Google [13]. It adds two things: it points crawlers to the sitemap, and it keeps them off the form's token endpoint.
- It doesn't block `/downloads/` or `/logos/`. The logo SVGs should stay crawlable so they can appear in image search [8].

**`app/sitemap.ts`** (new file):

```ts
import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/content/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/` }]
}
```

It serves:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>https://brand.compass-design.studio/</loc>
</url>
</urlset>
```

- It has no `lastmod`, on purpose. Google uses `lastmod` only when it is reliably accurate [11]. Bing wants the date the content really changed, not the date the sitemap was built [19].
- If someone will update a date each time the page content changes, add `lastModified: '<that date>'`. Otherwise leave it out *(judgment)*.

### 1.4 Two images, from the Figma session

**Favicon that Google Search can show.** The site ships only `app/icon.svg`, and Google Search doesn't accept SVG favicons [17].

- `app/apple-icon.png`, 180 × 180 px. This is the one Google can use: it is a supported format, square and larger than 48 px [17].
- `app/favicon.ico`, containing 16, 32 and 48 px sizes, for browsers and tools that ask for `/favicon.ico`.
- Keep `app/icon.svg`. Next.js writes a `<link>` tag for each of the three files [22].
- Export both from `compass-tile-navy-ink-on-light-gold` (ADR 0003). Fill the frame edge to edge, with square corners and no transparent areas ([glyph-clear-space.md](glyph-clear-space.md)).

**Open Graph image** for link previews. The Open Graph protocol requires an image [21], and previews have none today.

- Add `app/opengraph-image.png`, 1200 × 630 px [22].
- *(judgment)* Design it like the hero: an Ink background, the `compass-wordmark-paper` master with its clear space, and "Brand resources" beneath in Tenor Sans, in Paper.
- Add `app/opengraph-image.alt.txt` with one line [22]:

```
Compass wordmark in paper on Ink, above the words “Brand resources”
```

- The alt text describes the picture and nothing else. It contains no search terms, following WCAG 1.1.1 and Google's alt-text rule [8].
- Next.js gives this file priority over the `openGraph` settings in `app/layout.tsx` [22], so the layout needs no other change.

### 1.5 For the marketing site: `Organization` markup (not a blocker)

Google wants `Organization` markup on the organization's home page, or on one page that describes the organization [16]. For Compass that is compass-design.studio, not Brand resources. Hand this to whoever edits the marketing site:

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Compass Design Studio",
  "url": "https://compass-design.studio/",
  "logo": "https://brand.compass-design.studio/logos/compass-tile-navy-ink-on-light-gold.svg",
  "sameAs": ["https://www.instagram.com/compass_design.studio/"]
}
```

- **Logo.** It must be at least 112 × 112 px, crawlable, in a format Google Images supports, and look right on white [16]. The navy-ink-on-light-gold tile meets all four, and Google Images supports SVG [8]. Switch to the `.png` once it's exported.
- **Type.** Google suggests the most specific type that fits [16]. Whether a type more specific than `Organization` suits the studio is a call for the marketing site.

### 1.6 After launch

- Add brand.compass-design.studio to Google Search Console and to Bing Webmaster Tools, and submit `https://brand.compass-design.studio/sitemap.xml` to both [11], [19].
- Check the structured data with the Schema Markup Validator (validator.schema.org) [22]. Google's Rich Results Test covers only rich-result types, so it may not list `WebSite`.
- **Production smoke test.** Open `/robots.txt` and `/sitemap.xml`. View the page source and check the title, the description, the canonical link and the JSON-LD.
- **The vercel.app address.** Production is also reachable at the project's vercel.app address, and Vercel adds `noindex` only to preview and superseded deployments [24]. The canonical link covers this [14], [23]. If you'd rather send people from that address to the real domain, Vercel's guide gives a hostname redirect for `vercel.json` [23]. That is optional *(judgment)*.

---

## 2. Why

| Recommendation | Rule it follows |
|---|---|
| Put "logos" and "brand guidelines" in the title, description and lead | Use the words people search with, in prominent places such as the title and main heading, and in alt text and link text [4]. Expect experts and newcomers to use different words; there's no need to cover every variation [5]. Bing wants the title, headings and content to agree [18 §17]. |
| Say each term once, in visible text, near the top | Repeating words until they sound unnatural is keyword stuffing [6], [18 "Keyword Stuffing"]. A title that doesn't match the page gets rewritten [1]. Put key information early [18 §18]. |
| A descriptive title on the home page, with the site name at the end | The home page's title is a fine place for a little extra description. Brand titles briefly, with the site name at the start or end after a separator; Google's list of separators is only examples, so a middle dot works. Avoid repeating words [1]. A title should make sense out of context, for example in search results or bookmarks [20]. |
| A rewritten meta description | Google writes snippets mostly from page content. It uses the description when that describes the page better. Write it like a pitch, not a keyword list, and expect it to be cut to fit the screen [2]. It must describe the page well enough for a search listing [20]. Missing or very short titles and descriptions can hurt indexing on Bing [18 §13]. |
| Use "logos", not "marks", in the description | "Mark" is the internal umbrella term. Non-designers search for "logo" (GLOSSARY.md; brand-kit-naming.md §2.2). |
| Open Graph title and description that match | Google reads `og:title` as one of its sources for the title link [1]. `og:site_name` carries the studio name, so `og:title` doesn't repeat it [21]. |
| Keep the H1 | Google builds the title link from many sources, the `<title>` among them [1]. Google's "no clear main title" problem comes from several equally prominent headings, and this page has one H1 [1]. A title is often different from the first heading [20]. The lead right under the H1 carries both terms [18 §18]. |
| `WebSite` markup named "Compass Design Studio" | This markup is the strongest way to state a site name, and it goes on the home page of the domain or subdomain. Avoid generic names, and use the same name across the home page. A lowercase hostname in `alternateName` works as a fallback [3]. Markup must match what's visible [15], [18 §14]. |
| Canonical link | Google recommends a canonical link with an absolute URL [14]. Next.js makes it absolute from `metadataBase` [22]. Bing asks sites to combine duplicate URLs [18 §6]. Vercel recommends this for vercel.app duplicates [23]. |
| `robots.txt` that names the sitemap and blocks `/api/` | robots.txt controls crawling, not indexing [12], [18 §10]. A missing file means no restrictions [13]. Bing asks sites to block crawl paths that add nothing [18 §21] and finds sitemaps through robots.txt [19]. Never block Bingbot [18 §8]. |
| One-URL sitemap | Google may not need it for a small site, but lists new sites with few links pointing to them as a reason to have one [10]. Bing asks for sitemaps [18 §2–3]. |
| No `lastmod` unless it's real | Google uses `lastmod` only when it is reliably accurate [11]. Bing wants the real change date, not the build time [19]. |
| PNG and ICO favicons | Google shows one favicon per hostname. It must be square, at least 8 px (larger than 48 px recommended), and BMP, GIF, ICO, PNG, JPEG, PPM or TIFF; SVG isn't listed [17]. |
| Open Graph image | `og:image` is one of the four properties the Open Graph protocol requires on every page [21]. |
| `Organization` only on the marketing site | It belongs on the home page or a page that describes the organization, not on every page [16]. |

---

## 3. What not to change, and why

- **The name "Brand resources" and the hero kicker.** The name is decided. The search terms go around the name, not into it (brand-kit-naming.md §2.1). Leave the kicker a `<span>`: turning it into a heading would give the hero two competing headings, which can make Google pick the wrong one as the title [1].
- **The H1, "Everything you need to put the studio's name on something."** Changing it is a voice decision, not a search need (see §2).
- **The "Logo files" nav label and heading, and the `#logos` anchor** (`content/site.ts:10`, `LogoFiles.tsx:20–23`). They already match "logo files" word for word. The research's alternative, "Logos & marks", adds the internal word. Renaming the anchor would break any link that already points to `#logos`.
- **"Using the marks" and "Usage rules"** (`UsageRules.tsx:336`). The glossary avoids "logo guidelines". "Brand guidelines" describes the whole page, which is why it goes in the lead and title, not on section 02.
- **Mark names, plate headings, colorway captions and every mark's alt text** (`lib/mark-names.ts:77–83`; hero `alt="Compass"`; top bar `"Compass, Brand resources, back to top"`). Alt text describes the image or says where the link goes. Adding "logo" for search would be keyword stuffing [8] and breaks WCAG 1.1.1. The glossary also avoids "logo" for one version.
- **Per-file format links** (`components/ui.tsx:39–45`). Each link's accessible name starts with its visible "SVG", "PNG" or "PDF", as WCAG 2.5.3 requires.
- **"All 28 marks" and "Download all 28 marks · zip."** These links point at zip files, so their wording does nothing for how the page ranks. Making them say "logos" to match the hero button is a copy choice, not a search fix. The glossary allows "logos" for the whole set.
- **Mark file names, the `/logos/` folder and the SVG masters.** ADR 0003 fixes the names, and ADR 0001 forbids editing the masters, so no `<title>` goes inside them. File names give search engines only very light clues [8], and words in URLs matter very little for ranking [5].
- **Zip names and URLs** (`lib/downloads.ts:11–21`). Same reasons as file names, and renaming them would change the download links.
- **No meta keywords tag.** Google ignores it [7].
- **No hidden or screen-reader-only search text.** Text placed off-screen to manipulate search is hidden-text spam [6]. Screen-reader-only text is fine only when it helps people using screen readers [6].
- **No `Organization` or `WebPage` markup on this page.** See §1.3 and the corrections in "How to read this".
- **No X (Twitter) card tags for now.** Nothing in the brief points at X. The Open Graph image is enough for link previews *(judgment)*.
- **The Instagram handle `compass_design.studio`.** It matches the live profile [25].

---

## 4. Before and after

| File | Line | Current text | New text |
|---|---|---|---|
| `app/layout.tsx` | 17 | `Brand resources · Compass Design Studio` | `Brand resources · logos and brand guidelines · Compass Design Studio` |
| `app/layout.tsx` | 18 | `Compass Design Studio marks, colors, type and the rules for using them, for the studio’s staff, contractors and trade partners.` | `Download Compass Design Studio logos and read our brand guidelines: usage rules, colors, type and voice. For our staff, contractors and trade partners.` |
| `app/layout.tsx` | 20 | `Brand resources · Compass Design Studio` | `Brand resources · logos and brand guidelines` |
| `app/layout.tsx` | 21 | `Logos, colors, type and the rules for using them.` | `Logos and brand guidelines: colors, type and the rules for using them.` |
| `content/site.ts` | 29 | `Logos, colors, type and the rules for using them, for the studio's staff, contractors and trade partners.` | `Logos and brand guidelines: colors, type and the rules for using them, for the studio's staff, contractors and trade partners.` |
| `app/page.tsx` | 1–13 | No page metadata, no structured data | `export const metadata = { alternates: { canonical: '/' } }` and the `WebSite` JSON-LD script (§1.3) |
| `app/robots.ts` | new | None (`/robots.txt` returns 404) | `User-Agent: *` · `Disallow: /api/` · `Sitemap: https://brand.compass-design.studio/sitemap.xml` |
| `app/sitemap.ts` | new | None | One URL: `https://brand.compass-design.studio/` |
| `app/apple-icon.png`, `app/favicon.ico` | new | Only `app/icon.svg` | 180 × 180 PNG and a 16/32/48 px ICO, from `compass-tile-navy-ink-on-light-gold` |
| `app/opengraph-image.png`, `app/opengraph-image.alt.txt` | new | No `og:image` | 1200 × 630 PNG; alt `Compass wordmark in paper on Ink, above the words “Brand resources”` |
| compass-design.studio home page | n/a | Not checked | `Organization` JSON-LD from §1.5 |

---

## 5. Sources

All read on 22 October 2026. The dates in brackets are each page's own "last updated" date.

1. Google Search Central, "Influence your title links in search results": https://developers.google.com/search/docs/appearance/title-link (2025-12-10)
2. Google Search Central, "Control your snippets in search results": https://developers.google.com/search/docs/appearance/snippet (2026-04-20)
3. Google Search Central, "Provide a site name to Google Search": https://developers.google.com/search/docs/appearance/site-names (2025-12-10)
4. Google Search Central, "Google Search Essentials": https://developers.google.com/search/docs/essentials (2025-12-10)
5. Google Search Central, "SEO Starter Guide": https://developers.google.com/search/docs/fundamentals/seo-starter-guide (2025-12-10)
6. Google Search Central, "Spam policies for Google web search": https://developers.google.com/search/docs/essentials/spam-policies (2026-08-28)
7. Google Search Central, "Meta tags and attributes that Google supports": https://developers.google.com/search/docs/crawling-indexing/special-tags (2025-12-10)
8. Google Search Central, "Image SEO best practices": https://developers.google.com/search/docs/appearance/google-images (2026-03-02)
9. Google Search Central, "Link best practices for Google": https://developers.google.com/search/docs/crawling-indexing/links-crawlable (2025-12-10)
10. Google Search Central, "Learn about sitemaps": https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview (2025-12-10)
11. Google Search Central, "Build and submit a sitemap": https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap (2026-07-08)
12. Google Search Central, "Introduction to robots.txt": https://developers.google.com/search/docs/crawling-indexing/robots/intro (2025-12-10)
13. Google Search Central, "How Google interprets the robots.txt specification": https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt (2026-08-31)
14. Google Search Central, "How to specify a canonical URL": https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls (2026-07-10)
15. Google Search Central, "General structured data guidelines": https://developers.google.com/search/docs/appearance/structured-data/sd-policies (2026-07-10)
16. Google Search Central, "Organization structured data": https://developers.google.com/search/docs/appearance/structured-data/organization (2026-09-08)
17. Google Search Central, "Define a favicon to show in search results": https://developers.google.com/search/docs/appearance/favicon-in-search (2026-08-28)
18. Bing Webmaster Tools, "Bing Webmaster Guidelines": https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a (no date shown; the page needs scripts, so it was read in a browser). Section numbers are the page's own.
19. Bing Webmaster Blog, "Keeping Content Discoverable with Sitemaps in AI Powered Search": https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search (published 2025-07-31)
20. WHATWG HTML Living Standard, the `title` element and standard metadata names: https://html.spec.whatwg.org/multipage/semantics.html#the-title-element and https://html.spec.whatwg.org/multipage/semantics.html#standard-metadata-names
21. The Open Graph protocol: https://ogp.me/
22. Next.js docs (v16.4.2, the version in `package.json`):
    - robots.txt: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
    - sitemap.xml: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
    - opengraph-image: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
    - App icons: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/app-icons
    - generateMetadata (alternates, merging, file-based metadata taking priority): https://nextjs.org/docs/app/api-reference/functions/generate-metadata
    - JSON-LD guide (the `<` replacement, the Rich Results Test and the Schema Markup Validator): https://nextjs.org/docs/app/guides/json-ld
23. Vercel Knowledge Base, "Avoiding duplicate-content SEO with vercel.app URLs and custom domains": https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls (2026-09-18)
24. Vercel Knowledge Base, "Are Vercel Preview Deployments indexed by search engines?": https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines (2026-10-02)
25. Instagram profile URLs, both opened directly:
    - https://www.instagram.com/compass_design.studio/ opens a profile whose page title names @compass_design.studio.
    - https://www.instagram.com/compass-design.studio/ shows no profile.

Internal: [brand-kit-naming.md](brand-kit-naming.md) §2.1–2.2, [GLOSSARY.md](../GLOSSARY.md), [glyph-clear-space.md](glyph-clear-space.md), ADRs [0001](../adr/0001-design-system-artifact-is-the-master.md), [0002](../adr/0002-page-text-meets-wcag-aa.md) and [0003](../adr/0003-mark-file-naming-convention.md), and the voice and casing rules in `content/brand.ts:204–211` and `components/sections/Foundations.tsx:148`.
