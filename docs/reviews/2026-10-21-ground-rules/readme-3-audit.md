# README agent 3 of 3: audit and final proposal

**Date:** 21 October 2026
**Task:** Audit agent 1's draft (`readme-1-draft.md`) and agent 2's conflict review (`readme-2-conflicts.md`) against the sources, then give the final README change set for approval.
**Read in full:** both reports; the design system copy at `ds-current/project` (README.md, tokens.json, assets/Logos/README.md, assets/Tiles/README.md, all 11 component READMEs); docs/GLOSSARY.md; ADRs 0001–0003; docs/research/brand-kit-ground-rules.md; docs/prototype-options.md. I also read GitHub [issue #2](https://github.com/compass-design-studio/brand-site/issues/2), sections 1, 5 and 6 of `docs/research/usage-rules-source-of-truth.md`, and the ADR brief and draft in this folder, to check they agree.
**Checks I ran myself:**
- **Contrast.** I recomputed all 24 pairs the change set relies on, using the WCAG 2.2 formula on the tokens.json hex values, plus the scrim figures. All of agent 1's and agent 2's numbers are right.
- **The kit.** I checked the 28 SVGs in `public/logos/`: fills and path counts match both reports.
- **The live site.** Neither agent looked at it. I read the marketing site's source (`canyon-onehouse/compass-marketing-v1`: `Nav.tsx`, `Footer.tsx`, `HeroRotator.tsx`, the home page, `ContactForm.tsx` and the CSS) and the page at https://compass-design.studio. I also sampled the three home-gallery plates behind the hero wordmark in the browser. This settles four questions the earlier reports left open (section 2).
- **Anchors.** I applied the whole final change set (section 4) to an in-memory copy of the README. Every "current" string matched exactly once, in order. The other-file edits matched too, and tokens.json still parses.

**Nothing else was changed.** This report is the only file written. README line numbers refer to the current 128-line README.md.

---

## Summary

- **Overall verdict: approve with edits.** Agent 1's draft is accurate and faithful in substance. Agent 2's review holds up: 15 of its 16 main findings are real. I'd lower the severity of four, and three of its fixes need adjusting. The final change set in section 4 merges them. It's ready to publish as written once you confirm the three defaults below.
- **New evidence changes one call.** The live site never sets the wordmark in type. The top nav, footer and home hero all use the wordmark SVGs (`<img src="/images/compass_wordmark.svg">` and `compass_wordmark_light.svg`). Agent 1's exception for a type-set wordmark would allow something nobody uses, and it's the one change that goes against decision 2 ("don't retype the wordmark"). **The final set retires the type-set wordmark** (agent 1's own alternative) rather than keeping the exception.
- **Three confirmations, with defaults already in the text:**
  1. **Retire the type-set wordmark** (default) or keep it as a narrow exception (alternative A1).
  2. **Keep the one-job color exception** (default), which comes from the research's section 1 wording that decision 1 adopts. Or drop it (alternative A2). ADR 0004 should match whichever you pick.
  3. **Approved backgrounds:** light gold is dropped as a background for navy-ink marks (default), and gold deep on ink isn't approved. Alternative A3 restores light gold.
- **The live site breaks the new rules in two places.** The home hero's wordmark has a CSS drop shadow and sits over light parts of the watercolors (section 2). These are follow-ups for the marketing site, not README edits, and they don't block this publish.

---

## 1. Agent 2's findings, checked

"Real" means the conflict exists in the texts as quoted. "Mine" is my severity: **must fix** (in the final set before publishing), **should fix**, or **nit**.

| ID | Real? | Severity (agent 2 → mine) | Fix right? | Notes |
|---|---|---|---|---|
| K1 type-set exception | Yes | Blocking → **must fix** | **Partly.** Its "owner chooses" framing is right, but the facts favor retiring | The live site uses SVG wordmarks in the nav, footer and hero, and no wordmark in the mobile drawer. The scope clash agent 2 describes (footer and mobile nav "outside the top nav, the hero") is real in the design system's text but not on the live site. Retiring costs nothing live. Adopted: retire (E1, E3, E5, W1, W2, T8, T9). |
| K2 R4 "for light backgrounds" | Yes | Blocking → **must fix** | Yes | Less severe than "blocking": R4 already points to the list two bullets below. But agent 1's claim "fixed by R4 and R5" is wrong, and the fix is one clause. Adopted as E8. |
| K3 tiles vs minimum and clear space | Yes | Blocking → **should fix** | **Partly** | The favicon conflict is real: the glyph is 68% of the tile's height, so about 11px in a 16px favicon. But "A tile … carries its own clear space" could be read as "no clear space around a tile anywhere", and a tile on a page next to text should still get it. Adopted with tighter wording: "may fill a frame made for it, such as a favicon, app icon or profile picture". The minimum-size clause is adopted. The owner check on small glyphs is resolved: live ornaments are 46px ("Our bearing") and 42px (studio signature), both over 24px. |
| K4 README L103 "recreate" | Yes | Blocking → **should fix** | Yes, retire version | It follows from K1: once the Glyph and Wordmark READMEs are fixed, "recreate them … from their preview and README" points to the right rules. But the bare word "recreate", next to the Glyph and Wordmark, invites a contractor to redraw the glyph in CSS. Adopted as E5. |
| K5 two-tone fallback | Yes | Should fix → should fix | Yes | All 19 paths of the gold-deep lockups are `#9C8842`, so "a one-color version" can lead straight back to the weak gold. Adopted ("use the navy-ink version"). Whether gold-deep marks share the larger minimum stays an open question; it wasn't decided. |
| K6 photography | Yes | Should fix → should fix | Yes | Folded into E8 and L1. The glossary's Colorway entry needs the same change in the repo (section 6). |
| K7 light gold as a background | Yes | Should fix → should fix | Yes | It goes against README L52 ("never as fills for primary surfaces"), and it invites homemade tiles. Adopted: light gold dropped. I left out agent 2's pointer to the tile for brevity; the list's last line already says tiles and bars work on any background. |
| K8 color exception | **Partly** | Should fix → owner confirmation | Yes (the clarifier) | On fidelity: decision 1 adopts the research's section 1 wording, which includes the sentence, so it is within the decision. The parenthetical summary just leaves it out. On the collision with new and changed marks: real. Adopted with the clarifier ("the approval doesn't create a new mark"). Note that the ADR draft (`adr-2-draft.md`) leaves the exception out. |
| K9 white, and "on the way" | Yes | Should fix → should fix | Yes | Issue #2 confirms it: black files are an open question ("offer them, or use Ink …?"), and white isn't mentioned. Adopted. |
| K10 home hero | Yes, worse than reported | Should fix → **follow-up (live site)** | Partly | The live veil is 34% ink, not 30%. On the real plates, a large share of the area behind the wordmark is under 3:1 (section 2). That needs a site fix, not a README edit, so it doesn't block this publish. |
| K11 "Our bearing" | Wording only | Should fix → nit | Yes | Live: the glyph is a separate image above the eyebrow, not inside the line of text, so no rule is broken. Adopted "statement" in G2. |
| K12 asterisk called a "mark" | Yes | Should fix → nit | **Partly** | README L96 and Select L1 fixes adopted. The tokens.json `gold` fix isn't: `gold` says "required marks" while `gold-deep` says "required asterisk", and the README and Select say gold deep. Renaming one leaves two tokens both claiming the asterisk; that needs a fact check, not a rename. |
| K13 section name | Yes | Should fix → should fix | Yes | "Usage rules" is your word, prototype-options item 3's drawer, and the ADR draft's term. It also fits the README's other noun-phrase headings. Adopted. |
| K14 O2 and O3 | Yes | Should fix → should fix | Yes | Rejected as drafted. With type-set retired, L19 and L56 still name the retired `wordmark` style, so E1 and E3 reword them to say the marks' lettering is artwork and never typed. That avoids K14's problem. |
| K15 "use it for" master | Yes | Should fix → should fix | **No, as worded** | Its fix says the lines exist "here under Marks", but today only the tiles have one. That statement would be false on the day of publishing. Adopted as a process sentence instead: "We record both under Marks first, then show them on the mark's card on Brand resources." |
| K16 Contrast bullet | Yes | Should fix → should fix | Mostly | I kept a short "by the WCAG formula", because 3:1 can't be checked without a method. I said "colorway" instead of "version" (glossary), and "check it where it's weakest" to make the light and dark cases plain. |

**Nits:**
- **Adopted:** N1 (trade partner), N2 (full names first), N3 (retirement needs an approver, matching the ADR draft), N4 ("can share"), N5 (Photos names the glyph, wordmark or lockup), N6 (the wordmark step, which is logical and disclosed), N7 ("record them here first").
- **Rejected:**
  - N8: the README is private, so "here" means nothing to outsiders, and ADR 0001 already makes the design system win.
  - N9: L60 is about page backgrounds, and a pointer there adds noise.
  - N10: not decided. It's a good candidate for the prototype's "don't" pictures.
  - N11 date format: cosmetic.
  - N12: tokens.json is a Claude Design export, and hand edits risk being lost at the next export (usage-rules research, section 6).
  - N14: "never recolor" already covers the status colors.
- **N13:** it misleads rather than errs ("white and tan (7.39:1)": navy deep is 9.42:1 on white). It's a real defect but outside this change. Listed as optional cleanup.

**Errors in agent 2's report:**
- **G2 doesn't change the live site.** Agent 2 says G2 "edits the live intake thank-you glyph". The live thank-you (`ContactForm.tsx`) shows only a heading and text, with no glyph. The live site also never inlines the glyph with `currentColor`: every glyph is an `<img>` of the navy-ink file.
- **K10 used 30%.** The live scrim is `rgba(26,42,54,.34)`.
- **The K1 footer example.** The live footer and the closed mobile nav use the SVG wordmark, not type.

**Agent 1's assessment.** I confirm agent 2's checks: the line numbers, the 28 files, the ratios, the anchors and the SVG facts are all correct. The errors agent 2 found (C1 not fixed by R4, the edit count, "partner" on its own) are real.

---

## 2. What both agents missed

1. **The hero wordmark has a drop shadow.** `pages.css` gives `.hg .logo` the rule `filter: drop-shadow(0 2px 18px rgba(26,42,54,.4))`. The new "Use them as supplied" rule forbids shadows and effects. The README text doesn't mention the shadow, so nothing in the README changes, but the site breaks the rule. **Follow-up for the marketing site.**
2. **The hero's contrast, measured.** I sampled the area behind the light-gold wordmark on each real plate, with the live 34% veil and the slides' `brightness(.97) saturate(.9)` filter. These are approximations: I modeled two viewports, sampled the wordmark's bounding box and left out the shadow.

   | Plate | Viewport | Median ratio | Share of the box under 3:1 | Lightest point |
   |---|---|---|---|---|
   | Cottage | 1440×900 | 3.51:1 | 40% | 1.33:1 |
   | Cottage | 390×844 | 5.05:1 | 20% | 1.58:1 |
   | Mid-century ranch | 1440×900 | 5.13:1 | 12% | 1.37:1 |
   | Cabin | 1440×900 | 6.27:1 | 4% | 1.37:1 |

   Under the new Contrast rule ("check a light mark against the lightest part"), the hero fails on all three plates, and badly on the cottage. The fixes are agent 1's: a stronger veil under the mark (72% gives 3.78:1 over paper), a darker part of each plate, or another treatment. README L93 also says "ink 30% scrim" where the site has 34%. **Follow-up for the marketing site, and then L93.**
3. **The live glyphs are faded.** The "Our bearing" glyph (`.motto .glyph`) and the studio signature glyph (`.studio .sig img`) are both at `opacity: .9`, which changes the mark's color. It's minor. It falls under "effects" or "recolor", and Slack's guide, which the research cites, bans changing transparency. **Follow-up for the marketing site.** Consider a "don't fade it" picture among the prototype's don'ts.
4. **The nav wordmark is exactly at the provisional minimum.** The CSS sets the nav wordmark 22px tall, and the art is 1800 × 330, so it is 120px wide. That's exactly the provisional 120px minimum. If the prototype raises the wordmark minimum (decision 6), the live nav will be below it. Worth knowing when the numbers are set.
5. **The live studio signature is a glyph beside type.** README L95 says the glyph sits "over" the name, but the live signature is a glyph beside a typed "Compass Design Studio", with an all-caps service line. It looks like a homemade horizontal lockup. Agent 1 asked about this (open question 8); the live layout makes the question sharper. No README edit until you decide.
6. **tokens.json is an export.** Its `meta.source` is "claude design export". Agent 2 called T1–T7 "correct and safe", but hand edits there may be overwritten at the next export unless they're repeated in Claude Design. That's why T1–T7 are optional below, and T8 and T9 carry a note.
7. **Old file names on the live site.** The live site still serves pre-ADR 0003 names (`compass_wordmark.svg`, `compass_wordmark_light.svg`, `compass_glyph.svg`). They are the same artwork under old names, not retired marks, so "Retired marks: none yet" is right. Renaming them is an ADR 0003 follow-up on the marketing site.

---

## 3. Agent 1's text against decisions 1–8

| # | Decision | Verdict | Reason |
|---|---|---|---|
| 1 | Contrast | **Fail** (fixed in E8, E9, E10) | The rule text is faithful. But R4 still puts two-tone and gold deep on all light backgrounds, against its own R5 list (K2). R5 lists light gold as a background, against README L52 (K7). And the two-tone fallback can be gold deep (K5). |
| 1 | Colors | **Fail, minor** (fixed in E10) | Faithful, apart from two gaps. "Black files are on the way" overstates issue #2, which is still open. And pure white has no file and no "ask us" (K9). Keeping the one-job exception is within decision 1, because the section 1 wording is adopted. |
| 1 | New marks | **Pass** | It names the approver, sets the order (design system first, then Brand resources), bans one-off versions, and has the retired list and change record. Retirement approval is added (N3). |
| 1 | Use it for | **Fail** (fixed in E10) | It pointed only to Brand resources, not the master (ADR 0001; K15). |
| 2 | Missing rules | **Fail** (fixed in E10) | It added an undecided exception to "don't retype" (K1). Clear space, minimum size (px and mm), photos, glyph-as-A and retired marks all pass. The tile scope was missing (K3). |
| 3 | Approver | **Pass** | Allison Browning or Canyon Browning, with the change record holding "approved by". The name forms were evened out (N2). |
| 4 | Start here | **Pass** | Navy-ink and light-gold wordmarks, "most used", no "primary". |
| 5 | Who may use; other logos | **Pass** | It matches the decision word for word in substance. It rightly drops the research's "unless the studio agrees otherwise". |
| 6 | Provisional numbers | **Pass** | The values are exactly 120px / 32mm, 24px / 6mm and 1 × the glyph's height, each marked "for now". |
| 7 | Visual section; README for now | **Pass, with an edit** | "Brand resources shows each rule in pictures" is right. The section name changes to "Usage rules" (K13). |
| 8 | Voice | **Pass, with edits** | Sentence case, "we", no exclamation points, middle dot. But "partner" on its own appears twice, and the Contrast bullet was 82 words of jargon (K16, N1). |

---

## 4. Final README change set (for approval)

Apply these to the design system's `README.md`, in this order. Each "current" string appears exactly once. I checked this by applying the whole set to a copy. The result:
- **Length:** 128 → 151 lines, and about 2,160 → 2,960 words.
- **The new section:** 13 bullets, about 650 words. The longest bullets are Contrast (91 words) and Minimum size (84).
- **Text:** straight quotes and apostrophes throughout, as in the file.

**Each change, with my recommendation:**
- **Approve:** E2, E4, E6, E7, E8, E9 and E10 (the last three are required).
- **Approve if the type-set wordmark is retired (default):** E1, E3 and E5. E5 changes under A1.
- **Approve (recommended clean-up):** O1.
- **Optional:** O4.

#### O1 · Casing, L18 · approve (recommended)
"Descriptor" and "lockup" are glossary terms for parts of the marks. As written, this line calls a typed caption a "descriptor" in a "lockup", which the new "don't retype the descriptor" rule would forbid.

Current:
```text
- One codified exception: the service descriptor **"Residential Design · Interiors"** is Title Case wherever it appears as a lockup caption (footer meta, studio signature block).
```
New:
```text
- One codified exception: the service line **"Residential Design · Interiors"** is Title Case wherever it stands alone as a caption (footer meta, studio signature block).
```

#### E1 · Casing, L19 · approve (retire default)
This removes the reference to the retired `wordmark` type style. Saying "never typed" also covers K14's worry.

Current:
```text
- ALL CAPS survives in exactly two places: the wordmark (`wordmark`, tracked `track-mark`) and Roman-numeral capstones ("Est MMXXV").
```
New:
```text
- ALL CAPS survives in exactly two places: the marks' own lettering, which is artwork and never typed (see Usage rules), and Roman-numeral capstones ("Est MMXXV").
```

#### E2 · Visual foundations › Contrast, L54 · approve
Current:
```text
keep `fg-3` to captions and placeholders.
```
New:
```text
keep `fg-3` to captions and placeholders. Marks have their own contrast rule; see Usage rules.
```

#### E3 · Type, L56 · approve (retire default)
Current:
```text
uppercase belongs to the wordmark only.
```
New:
```text
uppercase belongs to the marks' own lettering only.
```

#### O4 · Imagery, L62 · optional
"Ground" is a painting term here. It's the last one left in the README.

Current:
```text
Warm loose washes on a paper ground,
```
New:
```text
Warm loose washes on paper,
```

#### E4 · Contact intake, L96 · approve
The glossary reserves "mark" for logo artwork (K12).

Current:
```text
All fields required; the mark is a `gold-deep` `*` after the label.
```
New:
```text
All fields required, shown by a `gold-deep` `*` after the label.
```

#### E5 · Components, L103 · approve
Fixes K4. This wording assumes the type-set wordmark is retired; A1 gives the text for keeping it.

Current:
```text
recreate them in HTML and CSS from their preview and README, using the tokens above.
```
New:
```text
recreate them in HTML and CSS from their preview and README, using the tokens above. Glyph and Wordmark are the exception: use the SVGs under Logos, and inline the glyph's path only as the Glyph README allows.
```

#### E6 · Iconography › The glyph, L113 · approve
Fixes C8: it drops "the only proprietary mark" and "brand monogram", and points to the rules.

Current:
```text
**The glyph.** The compass-A glyph (Logos: `compass-glyph-navy-ink.svg` and its colorways) is the only proprietary mark: brand monogram, app icon, favicon and section-end ornament. Never substitute Phosphor's compass icon for it.
```
New:
```text
**The glyph.** The compass-A glyph (Logos: `compass-glyph-navy-ink.svg` and its colorways) is the studio's own symbol: the stand-alone mark, the favicon and app icon (on a tile) and the section-end ornament. Never substitute Phosphor's compass icon for it. Its rules are under Usage rules.
```

#### E7 · Marks › Glyph, L121 · approve (required)
Fixes C2: `currentColor` is limited to the glyph's four colorways, on their approved backgrounds.

Current:
```text
- **Glyph:** the compass-A on its own, in `navy-ink`, `gold-deep`, `paper` and `light-gold` (`compass-glyph-navy-ink.svg` and so on).
```
New:
```text
- **Glyph:** the compass-A on its own, in `navy-ink`, `gold-deep`, `paper` and `light-gold` (`compass-glyph-navy-ink.svg` and so on). In code, the Glyph component inlines its path with `fill="currentColor"`; set it only to one of these four colors, on a background approved for that colorway.
```

#### E8 · Marks › Colorways, L124 · approve (required)
Fixes C1, K2 and K6.

Current:
```text
- **Colorways:** `two-tone` (navy-ink letters, gold-deep glyph), `navy-ink` and `gold-deep` for light backgrounds; `reversed` (paper letters, light-gold glyph), `paper` and `light-gold` for dark backgrounds and photography. The glyph has no two-tone or reversed version.
```
New:
```text
- **Colorways:** `two-tone` (navy-ink letters, gold-deep glyph and descriptor), `navy-ink` and `gold-deep` for light backgrounds (two-tone and gold-deep on `paper` and `white` only); `reversed` (paper letters and descriptor, light-gold glyph), `paper` and `light-gold` for dark backgrounds, including dark areas of photos. The glyph has no two-tone or reversed version. Each colorway's approved backgrounds are listed below.
```

#### E9 · Marks › replace the last two bullets, L127–128 · approve (required)
- **Most used** moves to Start here.
- **"Never redraw or recolor"** moves to the Use them as supplied and Colors rules.
- **The `currentColor` escape hatch** is replaced by E7.
- **Light gold** is dropped from the navy-ink list (K7).

Every pair listed passes 3:1. The lowest is light gold on navy, at 4.34:1.

Current:
```text
- **Most used:** `compass-wordmark-navy-ink.svg` on light backgrounds and `compass-wordmark-light-gold.svg` on dark ones.
- Never redraw or recolor a mark. For a single-ink glyph in another color, inline the glyph path with `fill="currentColor"` as the Glyph component does.
```
New:
```text
- **Approved backgrounds:** every color in the mark reaches at least 3:1 on these.
  - `two-tone` and `gold-deep`: `paper` and `white` only. On `paper-2` (2.91:1) and `tan` (2.74:1) their gold-deep parts fall under 3:1.
  - `navy-ink`: `paper`, `paper-2`, `white` and `tan`.
  - `reversed`, `paper` and `light-gold`: `ink`, `navy-deep` and `navy`.
  - Tiles and wordmark bars carry their own background, so they work on any background.
- **Change record:** each new, changed or retired mark is noted here as `date · mark · what changed · approved by`. None yet.
- **Retired marks:** none yet.
```

#### E10 · New section at the end of the file · approve (required)
Insert one blank line after `- **Retired marks:** none yet.`, then:

```text
## Usage rules

How we, and anyone working with us, use the marks. Brand resources shows each rule in pictures.

- **Start here.** Not sure which mark to use? Use `compass-wordmark-navy-ink` on light backgrounds and `compass-wordmark-light-gold` on dark ones; they're our most used.
- **Use it for.** Every mark says what it's for and which backgrounds it goes on. We record both under Marks first, then show them on the mark's card on Brand resources. Marks that do the same job can share the wording.
- **Who may use them.** Employees and contractors, for studio work. Trade partners, only to identify work done with or for the studio. Ask us before putting a mark on anything sold, and never use one in a way that suggests we endorse another business.
- **Use them as supplied.** Don't stretch, squash, rotate, recolor, outline, add shadows or effects, rearrange the parts, or retype the wordmark or descriptor.
- **Colors.** Brand palette colors only, plus pure black (#000000) or pure white (#ffffff) for one-color jobs such as single-color printing, embroidery and vinyl. Never recolor a mark; pick the version that fits. Any other color, such as a material's own finish, needs approval from Allison Browning or Canyon Browning for that one job; the approval doesn't create a new mark. Black and white files aren't in the kit yet; until they are, ask us.
- **Contrast.** Every color in a mark needs at least 3:1 contrast, by the WCAG formula, with what's directly behind it. WCAG exempts logos, so this is our own rule. Keep to the approved backgrounds listed under Marks. Anywhere else, such as a photo or a trade partner's sign, use the colorway with the most contrast and check it where it's weakest: a light mark against the lightest part of the area it covers, a dark mark against the darkest. If none reaches 3:1, move the mark or use a tile.
- **Photos and busy backgrounds.** Place a glyph, wordmark or lockup only over a calm, even area. If there isn't one, use a tile.
- **Clear space.** For now, leave space on every side at least as tall as the mark's glyph. Nothing enters it: no text, rules, photo or page edges, or other logos. A tile or wordmark bar may fill a frame made for it, such as a favicon, app icon or profile picture.
- **Minimum size.** For now, the wordmark is at least 120px or 32mm wide and the glyph at least 24px or 6mm tall; the glyph minimum doesn't apply inside a tile. Two-tone marks get a larger minimum; below it, use the navy-ink version. If a lockup won't fit, use the wordmark; if the wordmark won't, use the glyph or a tile. We'll set every final size, in px and mm, and the clear space in the Brand resources prototype, and record them here first.
- **With other logos.** Beside another company's logo, such as on a builder's job-site sign: about the same visual size, at least our clear space between them, and never merged into one logo. We approve every joint layout.
- **The glyph is the A in COMPASS only.** Don't use it as a letter in any other word, and don't set any mark inside a line of text. On its own it's still a mark, as in the tiles and section-end ornaments.
- **New, changed and retired marks.** Only Allison or Canyon approves a new, changed or retired mark, and we note who approved it under Marks. It goes into this design system first, then onto Brand resources. Nobody else makes, edits or redraws a mark, including one-off versions for a project, event, trade partner or campaign; ask us instead.
- **Retired marks.** A retired mark comes off Brand resources and is listed as retired under Marks. Don't use a mark that's no longer on Brand resources.
```

**How it differs from agent 2's section 5:**
- **Type-set wordmark:** retired rather than excepted (K1).
- **Use it for:** a process sentence, not a false "here" (K15).
- **Clear space:** the tile clause is narrowed (K3).
- **Contrast:** keeps "by the WCAG formula" and says "colorway".
- **Colors:** the clarifier is folded into one sentence.
- **Length:** about 650 words, against 666.

### If you choose differently

**A1 · Keep the type-set wordmark as a narrow exception.**
- **Use them as supplied:** after "or retype the wordmark or descriptor.", add: `The one exception is the type-set wordmark, for live elements on our own websites (see the Wordmark component).`
- **E1, E3, T8 and T9:** skip all four. L19 and L56 are right as they stand.
- **E5:** replace its new text with: `recreate them in HTML and CSS from their preview and README, using the tokens above. Glyph and Wordmark are the exception: use the SVGs under Logos, inline the glyph's path only as the Glyph README allows, and set the wordmark in type only as the Wordmark README allows.`
- **W1, W2 and T8:** use agent 1's W1, W2 and T8, with agent 2's K1 changes:
  - W2's scope reads "live elements on our own websites, such as the top nav, the mobile nav, the hero and the footer";
  - T8 reads "in a colorway the Wordmark component lists".
- **Before publishing,** check that the type-set letterforms and spacing match the SVG.

**A2 · Drop the one-job color exception.**
- **Colors:** delete `Any other color, such as a material's own finish, needs approval from Allison Browning or Canyon Browning for that one job; the approval doesn't create a new mark. `
- **New, changed and retired marks:** change "Only Allison or Canyon approves" to `Only Allison Browning or Canyon Browning approves`, so the full names still appear at first mention.

**A3 · Keep light gold as a background for navy-ink marks.** In E9, change the navy-ink line to:
```text
  - `navy-ink`: `paper`, `paper-2`, `white`, `tan` and `light-gold`.
```

---

## 5. Related changes in other design system files

Each "old" string appears exactly once in its file, and tokens.json still parses with T1–T9 applied.

| ID | File | Recommendation |
|---|---|---|
| W1, W2 | components/Wordmark/README.md | **Recommended** (retire default). Without them, the component tells people to retype the wordmark and descriptor, and its descriptor color (`gold`, 2.55:1) breaks Contrast. |
| G1, G2 | components/Glyph/README.md | **Recommended.** G2 removes the recolors (`navy-deep` on tan, `ink` on gold). It has no live effect: the live site has no glyph on the thank-you and never inlines the glyph. |
| L1 | assets/Logos/README.md | **Recommended.** It keeps the colorway line in step with E8. |
| I1 | components/Iconography/README.md | **Recommended** (glossary). |
| T8, T9 | tokens.json | **Recommended** with the retire default. Repeat them in Claude Design if the tokens are ever re-exported from there. |
| K12-S | components/Select/README.md | **Optional** (glossary). |
| S1 | components/Select/README.md | **Optional** (glossary: "brand book"). |
| T1–T7, B1 | tokens.json, components/Button/README.md | **Optional** ("ground" → "background"). These are harmless, but the tokens.json ones may be lost at the next export. |
| N13 | tokens.json `navy-deep` | **Not in this change.** It's a real misstatement (navy deep is 9.42:1 on white, not 7.39:1), but it's separate clean-up. |
| N12, tokens `gold` "required marks" | tokens.json | **Not recommended** (export risk; the asterisk color needs a fact check first). |
| Wordmark preview card | the Wordmark component preview | **Required with W1 and W2, but no text given.** The preview shows a type-set stacked lockup with a gold descriptor and hairlines, and its HTML isn't in the copy. Replace it with the wordmark SVG when publishing W1 and W2. |

**W1** (line 1). Old:
```text
The type-set wordmark: COMPASS with the glyph standing in for the A, shown here over the descriptor as a stacked lockup.
```
New:
```text
The wordmark in live pages: COMPASS with the glyph standing in for the A, always used from the SVGs under Logos.
```

**W2** (line 3). Old:
```text
Set in `--font-display` at `track-mark`, uppercase, `navy-ink` on paper and `paper` on ink. The descriptor ("Design Studio") is 9 to 10px body text tracked 0.5em, between two short hairlines, in `gold` on paper and `light-gold` on ink. Prefer the wordmark and lockup SVGs under Logos; build the lockup in type only where a live element is needed (the top nav, the hero).
```
New:
```text
Use the wordmark SVGs under Logos for live elements such as the top nav, the footer and the home hero, in a colorway approved for the background (see Marks in the main README). The wordmark and descriptor are never set in type; for a lockup, use the lockup SVG.
```

**G1** (line 1). Old:
```text
The compass-A glyph across the brand backgrounds; the only proprietary mark.
```
New:
```text
The compass-A glyph across the brand backgrounds; the studio's own symbol.
```

**G2** (line 3). Old:
```text
Use it as the brand monogram, app icon, favicon and section-end ornament (the studio signature, the "Our bearing" eyebrow, the intake thank-you). Inline its path with `fill="currentColor"` to color it: `navy-ink` on paper, `light-gold` on navy and ink, `navy-deep` on tan, `ink` on gold. The files are `compass-glyph-{colorway}.svg` under Logos.
```
New:
```text
Use it as the stand-alone mark, the section-end ornament (the studio signature, the "Our bearing" statement, the intake thank-you) and, on a tile, the app icon and favicon. Inline its path with `fill="currentColor"` only to set one of its four colorways on a background approved for it (see Marks in the main README), such as `navy-ink` on paper or tan and `light-gold` on navy or ink. Never use it as a letter outside COMPASS. The files are `compass-glyph-{colorway}.svg` under Logos.
```

**L1** (line 3). Old:
```text
**Colorways.** For light backgrounds: `two-tone` (`navy-ink` #133558 letters, `gold-deep` #9c8842 glyph and descriptor), `navy-ink` and `gold-deep`. For dark backgrounds and photography: `reversed` (`paper` #f7f4ee letters and descriptor, `light-gold` #e1c982 glyph), `paper` and `light-gold`.
```
New:
```text
**Colorways.** For light backgrounds: `two-tone` (`navy-ink` #133558 letters, `gold-deep` #9c8842 glyph and descriptor), `navy-ink` and `gold-deep`; two-tone and gold-deep go on `paper` and `white` only. For dark backgrounds, including dark areas of photos: `reversed` (`paper` #f7f4ee letters and descriptor, `light-gold` #e1c982 glyph), `paper` and `light-gold`. Approved backgrounds and the rules for using the marks are in the main README, under Marks and Usage rules.
```

**I1.** Old:
```text
The compass-A glyph is the only proprietary mark; never use Phosphor's compass in its place.
```
New:
```text
The compass-A glyph is the studio's own symbol; never use Phosphor's compass in its place.
```

**T8** (tokens.json, the `wordmark` type style `usage`). Old:
```text
The type-set lockup only, uppercase, in navy-ink. Prefer the wordmark SVGs under Logos.
```
New:
```text
Retired: the wordmark is artwork and is never set in type. Use the wordmark SVGs under Logos.
```

**T9** (tokens.json, `track-mark` `usage`). Old: `"The wordmark only."` New: `"Retired with the type-set wordmark; the wordmark is artwork."`

**K12-S** (Select README line 1). Old: `with the required mark and helper copy` New: `with the required asterisk and helper copy`

**S1** (Select README line 5). Old: `from the intake vocabulary in the brand book` New: `from the intake vocabulary in the main README`

**T1–T7, B1:** use agent 1's table (readme-1-draft.md, section 3), unchanged.

---

## 6. Follow-ups outside this publish

- **Marketing site:**
  - Fix the hero's contrast (section 2, item 2) and remove the wordmark's drop shadow.
  - Remove the 90% opacity on the two glyphs.
  - Rename the files to ADR 0003 names.
  - Then correct README L93's scrim figure to match whatever ships.
- **Glossary (repo):** the Colorway entry says two-tone and gold deep are "for light backgrounds", and the light colorways are "for dark backgrounds and photos". Bring it in line with E8 after publishing.
- **ADR 0004 draft:**
  - **The color exception:** if it stays (the default), add one clause to the Colors bullet, such as "a founder can approve another color, such as a material's finish, for one job".
  - **Retirement:** if the type-set wordmark is retired, the ADR needs nothing, because it doesn't mention type.
  - **The name:** "usage rules" already matches.
- **Later (usage-rules research, section 5.1):** stable rule IDs and a fixed-column table for the per-colorway facts, once the prototype settles the "use it for" lines and the numbers. The bullets above map one to one to that research's rule IDs.

## 7. Open questions that remain (none block publishing)

1. **The studio signature.** On the live site it's a glyph beside typed "Compass Design Studio" (section 2, item 5). Should it stay a page layout, or should Brand resources say it isn't a logo to copy?
2. **The larger minimum.** Should gold-deep marks share the two-tone marks' larger minimum (K5)? Their descriptor has the same 3.18:1 gold.
3. **The change record.** Should it start with a baseline entry for the current 28 marks? That needs a real date and approver, so I didn't invent one.
4. **Gold deep on ink (4.21:1).** Approve it as a background, or leave it off as now?
5. **Clear space for the glyph alone** (agent 1's open question 10). One glyph height around the glyph is generous; the prototype can set a separate value.

---

## Sources

- **Repo and design system files** as listed at the top, all read 21 October 2026 and none changed.
- **The marketing site's source,** read-only via the GitHub API: `canyon-onehouse/compass-marketing-v1`.
  - Components: `src/components/Nav.tsx`, `Footer.tsx`, `HeroRotator.tsx` and `ContactForm.tsx`.
  - Pages: `src/app/(site)/page.tsx`.
  - Styles: `src/styles/home.css` and `pages.css`.
- **The live site:** https://compass-design.studio. The plate sampling ran in the browser on `/images/home-gallery-{mcm-ranch,cottage,cabin}.webp`.
- **GitHub issue #2** (open): https://github.com/compass-design-studio/brand-site/issues/2
- **W3C, WCAG 2.2** (relative luminance, contrast ratio, the logotype exception): https://www.w3.org/TR/WCAG22/
- **W3C, Understanding SC 1.4.11 Non-text Contrast** (logos; "only the parts needed for understanding"): https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
