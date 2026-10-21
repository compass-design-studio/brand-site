# PROTOTYPE: Brand resources

Throwaway. This is not the production site, and none of its code should be copied into it.

**The question:** what should Brand resources (brand.compass-design.studio) look like? Every open choice in [`docs/prototype-options.md`](../../docs/prototype-options.md) can be switched on one page, so Canyon can pick one option for each. The baseline is the Claude Design prototype "Brand Page — Monograph v2".

## Run it

From the repo root:

```bash
python3 -m http.server 4310 --bind 127.0.0.1
```

Then open http://localhost:4310/prototype/brand-resources/. It loads the real marks from `public/logos/`, so it has to be served from the repo root. Opening the HTML file directly won't work.

## Canyon's picks

Canyon picked one option for every choice on 21 October 2026. The page now opens on those picks (`PICKS` in `data.js`), and they're recorded in [`docs/prototype-options.md`](../../docs/prototype-options.md) under "Decisions from the prototype". After the picks, Logo files gained a "Two-tone and reversed · For special moments" section (`twoColorFeature()` in `logos.js`).

## Switching options

- **The bar at the bottom** shows the current choice. ‹ and › (or the ← and → keys) flip its options; [ and ] move to the previous or next choice. The current choice follows the section you're looking at.
- **All choices** lists all 15 choices with their options. "Copy my picks" copies the current set as text, and "Reset to Canyon's picks" goes back to the chosen set.
- **Dashed tags on the page** (⇄ Choice …) mark what's switchable there. Click one to jump to that choice. You can hide the tags from the panel.
- **Every choice is a URL param**, so a copied link reopens the same mix. For example, `?logos=B&rules=plates&form=C`.

| Param | Item | Choice | Options |
|---|---|---|---|
| `nav` | 2 | Navigation | `pills` · `bar` |
| `dl` | 9 | Hero download button | `all` · `form` · `see` |
| `logos` | 5 | Logo files layout | `A` paired plates · `B` background tabs |
| `pair` | 5 (Q23) | Main pair for the lockups | `mono` navy ink + light gold · `twotone` two-tone + reversed |
| `usage` | 1 | Usage guidance | `inline` disclosure · `popup` |
| `rules` | 22 | Usage rules section | `pairs` · `plates` · `guide` |
| `minsize` | 7, 22 | Minimum sizes | `proposed` · `provisional` |
| `labels` | 13 | Small labels | `tick` · `navy` · `darkgold` |
| `cmyk` | 12 | CMYK values | `approx` · `off` |
| `s06` | 4 | Spacing, radius & shadows | `last` · `drawer` · `inplace` |
| `site` | 16 | Website example | `rebuilt` · `screenshot` |
| `sig` | 18 | Email signature | `people` · `fields` |
| `trigger` | 14 | Request trigger | `arrow` · `outline` · `filled` |
| `topbar` | 14 | Second entry in the top bar | `on` · `off` |
| `form` | 15 | Request form | `A` full · `B` short · `C` type first |

## What's stubbed

- **Downloads:** SVG links download the real files. PNG, PDF and every zip show a message instead, because those files don't exist yet.
- **The request form** sends nothing. On submit it shows the confirmation, and below it, what Resend would send: from `brand@compass-design.studio`, to both founders, with the reply-to set to the sender, plus the spam checks.
- **Copy signature** copies rich text, but its images point at PNGs on brand.compass-design.studio that don't exist yet.

## Drafts for the design system

These are proposals. Under [ADR 0001](../../docs/adr/0001-design-system-artifact-is-the-master.md) they go into the design system before the site uses them.

- **"Use it for" lines** for each form, tile and bar (`data.js`, `FORMS` and `TILES`).
- **Final minimum sizes** (`data.js`, `MIN_SIZES.proposed`). The lockup numbers keep the descriptor's capitals at least about 5 px or 1.2 mm tall. The descriptor's cap height is 2.5% of the horizontal lockup's width and 4.4% of the stacked lockup's, measured from the SVGs.

## Images

All files are in `images/`. They come from `canyon-onehouse/compass-marketing-v1` (`public/images/`), except the live-site screenshots, which were taken on 21 October 2026. The full candidate list is in the session notes.

| Slot | File | Source |
|---|---|---|
| Photography, lead | `hurricane-ranch-exterior.jpg` | `hurricane-exterior.webp` (render) |
| Photography | `hickerson-home-exterior.jpg`, `widner-residence-exterior.jpg` | renders |
| Watercolor | `harbor-line-exterior-watercolor.jpg`, `stone-meadow-exterior-watercolor.jpg`, `studio-drafting-table-watercolor.jpg` | `harbor-exterior.webp`, `stone-exterior.webp`, `studio-office.webp` |
| Website mock | `home-gallery-1/2/3-watercolor.jpg` | the live home gallery, in order (Hollis House, Lantern House, Keel Cabin) |
| Usage: calm and busy photo areas | `hurricane-ranch-exterior.jpg` (sky), `widner-residence-exterior.jpg` (porch) | measured on the page |
| Instagram post | `hurricane-ranch-exterior.jpg` | |

Canyon prefers the renders to the Aubrey Place photo, so Aubrey Place isn't used.
