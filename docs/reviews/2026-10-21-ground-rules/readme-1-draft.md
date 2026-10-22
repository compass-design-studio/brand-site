# README agent 1 of 3: current state and draft updates

**Date:** 21 October 2026
**Task:** Assess the design system README against the owner's ground-rule decisions, and draft the exact changes.
**Read in full:** the design system copy at `ds-current/project` (README.md, tokens.json, assets/Logos/README.md, assets/Tiles/README.md, all 11 component READMEs), docs/GLOSSARY.md, ADRs 0001–0003, docs/research/brand-kit-ground-rules.md and docs/prototype-options.md. I also checked parts of brand-kit-naming.md and logo-display-patterns.md, and the 28 SVGs in `public/logos/`.
**Nothing else was changed.** This report is the only file written. Line numbers refer to the current README.md (128 lines).

Contrast ratios below use the WCAG 2.2 relative-luminance formula on the hex values in tokens.json. They match every ratio given in the brief and in the research (11.40, 3.18, 3.49, 2.91, 13.39, 9.02, 7.68).

---

## Summary

- **Where logo use is covered today:** the README's **Marks** section, **Iconography › The glyph**, two casing lines, plus the Logos, Tiles, Glyph and Wordmark READMEs. Between them they cover naming, the inventory, light or dark colorways, "most used" and "never redraw or recolor". The README has no rule on clear space, minimum size, who may use the marks, co-branding, photos, approval, retirement, black or white versions, exact approved backgrounds, the glyph used as a letter, or "use it for".
- **Proposed shape:**
  - A new `## Using the marks` section at the end of the README, right after `## Marks`. It has 13 short bulleted rules.
  - In **Marks**, an **Approved backgrounds** list (the Contrast rule depends on it), a change record and a retired list.
  - Five small edits elsewhere in the README to keep it consistent.
- **Three direct conflicts the drafts have to resolve:**
  1. **"For light backgrounds" over-promises.** Two-tone and gold-deep marks fail 3:1 on `paper-2` (2.91:1) and `tan` (2.74:1), both light brand backgrounds.
  2. **`fill="currentColor"` recolors the glyph.** The README allows it for "another color", and the Glyph README lists `navy-deep` on tan and `ink` on gold. That breaks "never recolor".
  3. **The design system tells people to retype the wordmark and lockup.** The Wordmark README sets them in type, which breaks "don't retype the wordmark or descriptor". Its type-set descriptor in `gold` on paper is 2.55:1, which also fails Contrast. And that type-set lockup doesn't match the lockup files, which have no hairlines.
- **One thing to check against the real images:** the README's own Home page puts the light-gold wordmark over light watercolors under a 30% ink scrim. Over paper-toned washes that measures about 1.2–1.4:1.

---

## 1. Assessment of the current README

### 1.1 Where logo use is covered today

| Where | What it says now | Bearing on the ground rules |
|---|---|---|
| README L19 (Casing) | ALL CAPS only in the wordmark and Roman-numeral capstones | Leaves out the descriptor, which is set in capitals in the artwork |
| README L54 (Visual foundations › Contrast) | Text contrast only. Gold-deep on paper 3.18:1, "large text only" | Says nothing about marks. A reader could take "large text only" to rule out the two-tone descriptor |
| README L56 (Type) | "uppercase belongs to the wordmark only" | Same gap as L19 |
| README L93 (Page anatomy › Home) | Light-gold wordmark centered over a watercolor gallery under a 30% ink scrim | Falls under the new Contrast and Photos rules (see C4) |
| README L95 (Studio signature) | Glyph over "Compass Design Studio" over the service line | A glyph-plus-type composition defined by the design system (see C6) |
| README L113 (Iconography › The glyph) | "the only proprietary mark: brand monogram, app icon, favicon and section-end ornament" | Clashes with glossary terms; needs a pointer to the glyph-as-letter rule |
| README L117–128 (Marks) | Naming; the inventory; colorways for light or dark backgrounds; **Most used**; "Never redraw or recolor a mark" plus the `currentColor` escape hatch | The natural neighbor for the new rules. Two of its lines conflict (C1, C2) |
| assets/Logos/README.md | "Copy them, never redraw or recolor them"; colorways; navy-ink and light-gold wordmarks are the most used | Same "light backgrounds" over-promise (C1) |
| assets/Tiles/README.md | "Copy them, never redraw or recolor them"; favicon and app icon; email tile | Consistent |
| components/Glyph/README.md | Inline with `currentColor`: `navy-ink` on paper, `light-gold` on navy and ink, `navy-deep` on tan, `ink` on gold | Recolors (C2) |
| components/Wordmark/README.md | Type-set wordmark and stacked lockup; descriptor in `gold` on paper, between hairlines | Retyping, plus a contrast failure (C3) |
| components/Iconography/README.md | "the only proprietary mark" | Clashes with glossary terms (C8) |
| tokens.json | `navy-ink` "wordmark and glyph color on light grounds"; `wordmark` style "The type-set lockup only" | Leftover terms (section 3) |

**Not covered anywhere:** clear space, minimum size, who may use the marks, other companies' logos, photos and busy backgrounds, who approves a mark, retirement, black and white one-color versions, approved backgrounds by color, the glyph as a letter, and "use it for".

### 1.2 What each decision adds or changes

| # | Decision | Current README | Change drafted |
|---|---|---|---|
| 1 | Contrast | Nothing for marks. Colorways say only "light" or "dark" | Contrast rule (R6) and an **Approved backgrounds** list in Marks (R5). The two-tone size clause goes in Minimum size |
| 1 | Colors | "Never redraw or recolor a mark", with a `currentColor` exception for "another color" | Colors rule (R6). `currentColor` limited to the glyph's four colorways (R3). The old line is removed (R5) |
| 1 | New marks | Nothing | New and changed marks rule (R6), plus a change record and retired list in Marks (R5) |
| 1 | Use it for | Nothing per mark | Use it for rule (R6). Where the lines themselves are kept is open question 4 |
| 2 | Don't alter | Only "never redraw or recolor" | "Use them as supplied" rule (R6) |
| 2 | Clear space, minimum size | Nothing | Two rules with the provisional values (R6) |
| 2 | Photos and busy backgrounds | Nothing for marks (L74 covers text over images) | Photos rule (R6) |
| 2 | The glyph is the A in COMPASS only | L113 lists the glyph's stand-alone uses | Glyph rule (R6), worded so the stand-alone uses stay allowed. L113 gets a pointer (R2) |
| 2 | Retired marks | Nothing | Retired rule (R6) and a list in Marks (R5) |
| 3 | Approver | Nothing | Named in the New and changed marks and Colors rules. "Who approved it" goes in the change record (R5) |
| 4 | Start here | "**Most used:** …" bullet in Marks | Moved to the top of the new section as **Start here**, keeping "most used" and avoiding "primary" and "default" (R5, R6) |
| 5 | Who may use; other logos | Nothing | Two rules (R6) |
| 6 | Provisional numbers | Nothing | Marked "For now" in Clear space and Minimum size, with one sentence saying the prototype sets them (R6) |
| 7 | Visual section on the site | n/a | The section intro says Brand resources shows each rule in pictures (R6) |
| 8 | Voice | n/a | Sentence case, "we", no exclamation points, short bullets with bold lead-ins, as in the Marks section |

### 1.3 Contradictions with the ground rules

**Direct (the README or other design system files say the opposite of a rule):**

- **C1 · "For light backgrounds" is broader than Contrast allows.** README L124, Logos README L3, and the glossary's Colorway entry (a repo file I didn't touch) all put two-tone and gold-deep "for light backgrounds". Measured against each light brand background:

  | Colorway (limiting color) | paper | white | paper-2 | tan |
  |---|---|---|---|---|
  | two-tone and gold-deep (`gold-deep` #9c8842) | 3.18 | 3.49 | **2.91** | **2.74** |
  | navy-ink (#133558) | 11.40 | 12.52 | 10.44 | 9.82 |

  | Colorway (limiting color) | ink | navy-deep | navy |
  |---|---|---|---|
  | reversed and light-gold (`light-gold` #e1c982) | 9.02 | 5.78 | 4.34 |
  | paper (#f7f4ee) | 13.39 | 8.58 | 6.45 |

  So "light backgrounds" must narrow to paper and white for two-tone and gold-deep. Fixed by R4 and R5, with an optional Logos README fix (L1 in section 3).
- **C2 · `currentColor` recolors the glyph.** README L128 says "For a single-ink glyph in another color, inline the glyph path with `fill="currentColor"`". The Glyph README L3 names `navy-deep` on tan and `ink` on gold, neither of which is a glyph colorway. Under "Never recolor a mark; pick the version that fits", both are recolors. Fixed by R3 and R5, plus G2 in section 3. Keeping those two colors instead is open question 2.
- **C3 · The type-set wordmark and lockup.** Three problems:
  - **Retyping.** The Wordmark README says to "build the lockup in type only where a live element is needed (the top nav, the hero)". tokens.json has a `wordmark` type style for "the type-set lockup", and README L19 and L56 assume it exists. The new rule says don't "retype the wordmark or descriptor".
  - **Contrast.** The type-set descriptor is in `gold` on paper, at 2.55:1, under the 3:1 rule.
  - **A different design.** The lockup SVGs have 19 paths each: 6 letters, the glyph and 12 descriptor letters. They have no hairlines and use no `gold`; the two-tone descriptor is `gold-deep` and the reversed descriptor is `paper`. The type-set lockup, with hairlines and a gold descriptor, matches none of the six colorways. In effect it is a homemade version.

  The draft keeps a narrow, named exception for the type-set **wordmark** only, and drops the type-set lockup (R6, W1, W2, T8). Retiring type-set entirely is the alternative in open question 1.

**Indirect (a rule casts doubt on something the README describes):**

- **C4 · Home page hero (README L93).** The light-gold wordmark sits over watercolors ("warm loose washes on a paper ground, navy and tan leaning", L62) under a 30% ink scrim. Light gold measures:

  | Wash under the 30% ink scrim | Light gold |
  |---|---|
  | Paper-toned | 1.24:1 |
  | Tan-toned | 1.41:1 |
  | Navy-toned | 5.44:1 |
  | Paper-toned, under a 72% scrim (the nav's) | 3.78:1 |

  Whether it passes depends on what is under the mark in each of the three plates. I couldn't see the images. This is open question 7, not an edit.
- **C5 · "Our bearing" eyebrow (Glyph README L3, README L93).** If the glyph sits inside the eyebrow's line of text, that conflicts with "don't set any mark inside a line of text". This needs a look at the live page.
- **C6 · Studio signature (README L95).** The glyph over a type-set "Compass Design Studio" reads like a stacked lockup made outside the kit. It is defined by the design system, so it isn't a one-off. But contractors may copy it as a logo. See open question 8.
- **C7 · "For dark backgrounds and photography" (README L124, Logos README L3, glossary).** The Photos and Contrast rules choose the version with the most contrast over a calm area. Over a light area of a photo, that is a navy-ink mark. The current phrase suggests photos always take the light colorways. This is minor; optional fix O5.
- **C8 · Glossary terms.** "The only proprietary mark" (README L113, Glyph README L1, Iconography README L3) conflicts with the glossary's definition of **mark**, where every logo artwork is a mark. "Brand monogram" (README L113, Glyph README L3) is a term the glossary says to avoid for the glyph. Fixed by R2, G1, G2 and I1.
- **C9 · "service descriptor … lockup caption" (README L18).** This uses "descriptor" and "lockup" in a different sense from the glossary, which defines them as "Design Studio" and the wordmark-plus-descriptor arrangement. Optional fix O1.

---

## 2. Draft README changes

### 2.1 The new section: title, placement, why

- **Title: `## Using the marks`.** It echoes the glossary's own "Using marks" group (Background, Clear space, Minimum size), reads plainly, and is in sentence case. I avoided "Ground rules" as a heading: the glossary avoids "ground" because printers read it literally, and these rules are written for printers and sign shops among others.
- **Placement: the last section, directly after `## Marks`.** Marks stays the inventory (what exists, what it's called, where each colorway goes). Using the marks holds the rules for using it. That split mirrors decision 7, where the site gets its own usage section. Putting the rules inside Marks would make that section long and mix the inventory with the rules. Visual foundations is about styling the studio's pages, not about third parties using marks.
- **Format:** one bullet per rule with a bold lead-in, like the Marks bullets. The order runs from the most common need (which mark) to the least (retirement): choosing a mark, then who may use it, keeping it whole, placing it, and governance.
- **Length:** about 585 words across 13 bullets. The pictures live on Brand resources. If it needs to be shorter, the Contrast and Minimum size bullets are the longest.

### 2.2 Edits, in file order

Labels: **required** means the README contradicts a decision or a rule without it. **Recommended** means consistency or a cross-reference. **Optional** is the owner's call. Each "current" string below appears exactly once in the file, and all the text uses straight quotes and apostrophes, as the file does.

#### R1 · Visual foundations › Contrast (L54) · recommended
Without this, the text-contrast paragraph ("gold-deep … large text only") reads as the marks' rule.

Current (end of L54):
```text
keep `fg-3` to captions and placeholders.
```
New:
```text
keep `fg-3` to captions and placeholders. Marks have their own contrast rule; see Using the marks.
```

#### R2 · Iconography › The glyph (L113) · recommended
Fixes C8, makes clear that the stand-alone uses survive the glyph-as-letter rule, and points to the rules.

Current:
```text
**The glyph.** The compass-A glyph (Logos: `compass-glyph-navy-ink.svg` and its colorways) is the only proprietary mark: brand monogram, app icon, favicon and section-end ornament. Never substitute Phosphor's compass icon for it.
```
New:
```text
**The glyph.** The compass-A glyph (Logos: `compass-glyph-navy-ink.svg` and its colorways) is the studio's own symbol: the stand-alone mark, the favicon and app icon (on a tile) and the section-end ornament. Never substitute Phosphor's compass icon for it. Its rules are under Using the marks.
```

#### R3 · Marks › Glyph bullet (L121) · required (C2)
Keeps the code technique but limits it to existing versions (decision 1, Colors). It replaces the escape hatch removed in R5.

Current:
```text
- **Glyph:** the compass-A on its own, in `navy-ink`, `gold-deep`, `paper` and `light-gold` (`compass-glyph-navy-ink.svg` and so on).
```
New:
```text
- **Glyph:** the compass-A on its own, in `navy-ink`, `gold-deep`, `paper` and `light-gold` (`compass-glyph-navy-ink.svg` and so on). In code, the Glyph component inlines its path with `fill="currentColor"`; set it only to one of these four colors.
```

#### R4 · Marks › Colorways bullet (L124) · required (C1)
Adds the descriptor colors, which the Logos README and the SVGs already have, because the two-tone size clause turns on the gold-deep descriptor. It also points to the exact backgrounds.

Current:
```text
- **Colorways:** `two-tone` (navy-ink letters, gold-deep glyph), `navy-ink` and `gold-deep` for light backgrounds; `reversed` (paper letters, light-gold glyph), `paper` and `light-gold` for dark backgrounds and photography. The glyph has no two-tone or reversed version.
```
New:
```text
- **Colorways:** `two-tone` (navy-ink letters, gold-deep glyph and descriptor), `navy-ink` and `gold-deep` for light backgrounds; `reversed` (paper letters and descriptor, light-gold glyph), `paper` and `light-gold` for dark backgrounds and photography. The glyph has no two-tone or reversed version. Each colorway's approved backgrounds are listed below.
```

#### R5 · Marks › replace the last two bullets (L127–128) · required
- **Most used** moves to **Start here** in the new section, so it lives in one place.
- **Never redraw or recolor** moves into the "Use them as supplied" and "Colors" rules.
- **The `currentColor` escape hatch** is replaced by R3.
- **Added:** the approved-background lists the Contrast rule refers to, the record of who approved each change (decision 3), and the retired list (decision 1).

Current (the last two lines of the file):
```text
- **Most used:** `compass-wordmark-navy-ink.svg` on light backgrounds and `compass-wordmark-light-gold.svg` on dark ones.
- Never redraw or recolor a mark. For a single-ink glyph in another color, inline the glyph path with `fill="currentColor"` as the Glyph component does.
```
New:
```text
- **Approved backgrounds:** every color in the mark reaches at least 3:1 on these.
  - `two-tone` and `gold-deep`: `paper` and `white` only. On `paper-2` (2.91:1) and `tan` (2.74:1) their gold-deep parts fall under 3:1.
  - `navy-ink`: `paper`, `paper-2`, `white`, `tan` and `light-gold`.
  - `reversed`, `paper` and `light-gold`: `ink`, `navy-deep` and `navy`.
  - Tiles and wordmark bars carry their own background, so they work on any background.
- **Change record:** each new, changed or retired mark is noted here as `date · mark · what changed · approved by`. None yet.
- **Retired marks:** none yet.
```
Notes:
- **Every listed pair passes.** The lowest is light-gold on navy, at 4.34:1.
- **Tiles and bars.** The glyph or wordmark is measured against its own square or bar, following the research's reading of WCAG's "only the parts needed for understanding" ([Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)). The tile and bar ratios are 13.39, 9.02, 7.68 and 5.78:1.
- **Owner check.** Open question 3 asks the owner to confirm the lists.

#### R6 · New section, appended after R5 at the end of the file · required
Insert one blank line after `- **Retired marks:** none yet.`, then:

```text
## Using the marks

How we, and anyone working with us, use the marks. Brand resources shows each rule in pictures.

- **Start here.** Not sure which mark to use? Use `compass-wordmark-navy-ink` on light backgrounds and `compass-wordmark-light-gold` on dark ones; they're our most used.
- **Use it for.** Every mark on Brand resources says what it's for and which backgrounds it goes on. Marks that do the same job share the wording.
- **Who may use them.** Employees and contractors, for studio work. Trade partners, only to identify work done with or for the studio. Ask us before putting a mark on anything sold, and never use one in a way that suggests we endorse another business.
- **Use them as supplied.** Don't stretch, squash, rotate, recolor, outline, add shadows or effects, rearrange the parts, or retype the wordmark or descriptor. The one exception is the type-set wordmark, for live elements on our own websites (see the Wordmark component).
- **Colors.** Brand palette colors only, plus pure black or pure white for one-color jobs such as single-color printing, embroidery and vinyl. Never recolor a mark; pick the version that fits. Any other color, including a material's own finish, needs Allison's or Canyon's approval for that job. Black files are on the way; until then, ask us.
- **Contrast.** Every color in a mark needs at least 3:1 contrast with what's directly behind it (the WCAG formula, from hex values). WCAG exempts logos, so this is our own rule. Keep to the approved backgrounds listed under Marks. Anywhere else, such as a photo or a partner's sign, use the approved version with the most contrast and check it against the lightest or darkest part of the area it covers. If none reaches 3:1, move the mark or use a tile.
- **Photos and busy backgrounds.** Place a mark only over a calm, even area. If there isn't one, use a tile.
- **Clear space.** For now, leave space on every side at least as tall as the mark's glyph. Nothing enters it: no text, rules, photo or page edges, or other logos.
- **Minimum size.** For now, the wordmark is at least 120px or 32mm wide and the glyph at least 24px or 6mm tall. Two-tone marks get a larger minimum; below it, use a one-color version. If a lockup won't fit, use the wordmark; if the wordmark won't, use the glyph or a tile. We'll set final sizes, in px and mm, and clear space in the Brand resources prototype.
- **With other logos.** Beside another company's logo, such as on a builder's job-site sign: about the same visual size, at least our clear space between them, and never merged into one logo. We approve every joint layout.
- **The glyph is the A in COMPASS only.** Don't use it as a letter in any other word, and don't set any mark inside a line of text. On its own it's still a mark, as in the tiles and section-end ornaments.
- **New and changed marks.** Only Allison Browning or Canyon Browning approves a new or changed mark, and we note who approved it under Marks. It goes into this design system first, then onto Brand resources. Nobody else makes, edits or redraws a mark, including one-off versions for a project, event, partner or campaign; ask us instead.
- **Retired marks.** A retired mark comes off Brand resources and is listed as retired under Marks. Don't use a mark that's no longer on Brand resources.
```

Drafting choices to review:
- **Wording follows research section 1 and section 2**, shortened for the README's voice. Three deliberate departures:
  - **Minimum size.** The research says "below the smallest lockup size, use the glyph or a tile". I added the wordmark as the first step down, since the wordmark has a smaller minimum than a lockup.
  - **"Use them as supplied" carries the type-set exception.** Without it, the rule contradicts the Wordmark component (C3; open question 1).
  - **Color exceptions.** Where the research says "the owner", the draft says "Allison's or Canyon's approval", mapping the research's placeholder to decision 3.
- **Start here.** It uses neither "primary" nor "default" (decision 4). File names drop `.svg` because the rule covers every format (ADR 0003: one base name across `.svg`, `.png` and `.pdf`).
- **Who approves what.** "We approve every joint layout" leaves the approver as the studio, per decision 5. If joint layouts should also need a named founder, see open question 9.
- **Retired marks.** "No longer on Brand resources" follows the research. It avoids "isn't on Brand resources", which would wrongly cover the type-set wordmark and inline glyphs.
- **Pure white.** tokens.json already has `white` (#ffffff) as a surface color, so "pure white" is already in the palette. The research said the palette has no pure white, which is true only of the colors the marks themselves use. The phrase still reads clearly to a printer, so I kept it.

#### Optional README edits (owner's call)

**O1 · Casing, L18 (C9).** "Descriptor" and "lockup" are glossary terms with other meanings.

Current:
```text
- One codified exception: the service descriptor **"Residential Design · Interiors"** is Title Case wherever it appears as a lockup caption (footer meta, studio signature block).
```
New:
```text
- One codified exception: the service line **"Residential Design · Interiors"** is Title Case wherever it stands alone as a caption (footer meta, studio signature block).
```

**O2 · Casing, L19.** The descriptor is set in capitals in the artwork; the glossary says "spaced capitals".

Current:
```text
- ALL CAPS survives in exactly two places: the wordmark (`wordmark`, tracked `track-mark`) and Roman-numeral capstones ("Est MMXXV").
```
New:
```text
- ALL CAPS survives in exactly two places: the marks (the wordmark, set in `wordmark` and tracked `track-mark`, and the descriptor) and Roman-numeral capstones ("Est MMXXV").
```

**O3 · Type, L56.** Same point as O2.

Current: `uppercase belongs to the wordmark only.`
New: `uppercase belongs to the marks only.`

**O4 · Imagery, L62.** This is the last "ground" in the README. Here it is a painting term (the paper a watercolor is painted on), so it's the lowest priority.

Current: `Warm loose washes on a paper ground,`
New: `Warm loose washes on paper,`

**O5 · Colorways (applies after R4) (C7).** If you take it, make the same change in the Logos README (L1 below). The glossary's Colorway entry says "for dark backgrounds and photos" and would need the same treatment in the repo.

Current: `` `paper` and `light-gold` for dark backgrounds and photography. The glyph has no two-tone ``
New: `` `paper` and `light-gold` for dark backgrounds, including dark areas of photos. The glyph has no two-tone ``

### 2.3 Check of the drafts

I applied R1–R6 and O1–O5 to the README in memory (no file was written):
- **Anchors:** every "current" string matched exactly once.
- **Length:** the README grows from about 2,160 to about 2,850 words.
- **Voice:** the new text has no exclamation points, no "primary" and no "ground".

---

## 3. Related inconsistencies in other design system files (all optional)

Each "old" string appears exactly once in its file, and tokens.json still parses as JSON with T1–T8 applied. **G1, G2, W1 and W2 are recommended** because they resolve direct conflicts (C2, C3). The rest are clean-up.

### tokens.json: "ground" replaced by "background" (glossary)

| ID | Token | Old | New |
|---|---|---|---|
| T1 | `navy-ink` | `The wordmark and glyph color on light grounds;` | `The wordmark and glyph color on light backgrounds;` |
| T2 | `ink` | `As a ground: the footer` | `As a background: the footer` |
| T3 | `paper` | `"The page ground. Also` | `"The page background. Also` |
| T4 | `paper-2` | `Alternate section ground;` | `Alternate section background;` |
| T5 | `light-gold` | `Accent on dark grounds:` | `Accent on dark backgrounds:` |
| T6 | `fg-on-dark` | `Text on ink and navy grounds.` | `Text on ink and navy backgrounds.` |
| T7 | `rule-on-dark` | `Hairlines on ink grounds.` | `Hairlines on ink backgrounds.` |

### tokens.json: the `wordmark` type style (glossary "lockup"; C3)

T8. Old:
```text
The type-set lockup only, uppercase, in navy-ink. Prefer the wordmark SVGs under Logos.
```
New:
```text
The type-set wordmark only, for live elements on our own websites; uppercase, in one of the wordmark's colorways. Prefer the wordmark SVGs under Logos.
```

### components/Button/README.md

B1. Old: `on ink grounds;` New: `on ink backgrounds;`

### components/Glyph/README.md (recommended: C2, C8)

G1 (line 1). Old:
```text
The compass-A glyph across the brand backgrounds; the only proprietary mark.
```
New:
```text
The compass-A glyph across the brand backgrounds; the studio's own symbol.
```

G2 (line 3). Old:
```text
Use it as the brand monogram, app icon, favicon and section-end ornament (the studio signature, the "Our bearing" eyebrow, the intake thank-you). Inline its path with `fill="currentColor"` to color it: `navy-ink` on paper, `light-gold` on navy and ink, `navy-deep` on tan, `ink` on gold. The files are `compass-glyph-{colorway}.svg` under Logos.
```
New:
```text
Use it as the stand-alone mark, the section-end ornament (the studio signature, the "Our bearing" eyebrow, the intake thank-you) and, on a tile, the app icon and favicon. Inline its path with `fill="currentColor"` only to set one of its four colorways on an approved background: `navy-ink` on paper and tan, `light-gold` on navy and ink. Never use it as a letter outside COMPASS. The files are `compass-glyph-{colorway}.svg` under Logos.
```
Effect: the intake thank-you glyph on tan moves from `navy-deep` (7.39:1) to `navy-ink` (9.82:1), and "ink on gold" is dropped. If the glyph sits on a gold fill anywhere, `navy-ink` on gold measures 4.47:1. See open question 2.

### components/Wordmark/README.md (recommended: C3)

W1 (line 1). Old:
```text
The type-set wordmark: COMPASS with the glyph standing in for the A, shown here over the descriptor as a stacked lockup.
```
New:
```text
The type-set wordmark: COMPASS with the glyph standing in for the A, for live elements on our own websites.
```

W2 (line 3). Old:
```text
Set in `--font-display` at `track-mark`, uppercase, `navy-ink` on paper and `paper` on ink. The descriptor ("Design Studio") is 9 to 10px body text tracked 0.5em, between two short hairlines, in `gold` on paper and `light-gold` on ink. Prefer the wordmark and lockup SVGs under Logos; build the lockup in type only where a live element is needed (the top nav, the hero).
```
New:
```text
Set in `--font-display` at `track-mark`, uppercase, in one of the wordmark's colorways: `navy-ink` on paper; `paper`, `light-gold` or `reversed` on ink. Use it only where a live element is needed (the top nav, the hero); everywhere else, use the wordmark and lockup SVGs under Logos. The descriptor is never set in type: for a lockup, use the SVG.
```
- **The preview card needs updating too.** The component's preview shows the type-set stacked lockup with a gold descriptor and hairlines. Its HTML isn't in the copy I read, so I can't give exact text for it.
- **This matches the live site.** Per prototype-options items 16 and 6, the live site shows the light-gold wordmark with no descriptor.

### components/Iconography/README.md (C8)

I1. Old:
```text
The compass-A glyph is the only proprietary mark; never use Phosphor's compass in its place.
```
New:
```text
The compass-A glyph is the studio's own symbol; never use Phosphor's compass in its place.
```

### assets/Logos/README.md (C1)

L1 (line 3). Old:
```text
**Colorways.** For light backgrounds: `two-tone` (`navy-ink` #133558 letters, `gold-deep` #9c8842 glyph and descriptor), `navy-ink` and `gold-deep`. For dark backgrounds and photography: `reversed` (`paper` #f7f4ee letters and descriptor, `light-gold` #e1c982 glyph), `paper` and `light-gold`.
```
New:
```text
**Colorways.** For light backgrounds: `two-tone` (`navy-ink` #133558 letters, `gold-deep` #9c8842 glyph and descriptor), `navy-ink` and `gold-deep`; two-tone and gold-deep go on `paper` and `white` only. For dark backgrounds and photography: `reversed` (`paper` #f7f4ee letters and descriptor, `light-gold` #e1c982 glyph), `paper` and `light-gold`. Approved backgrounds and the rules for using the marks are in the main README, under Marks and Using the marks.
```
If O5 is taken, change "For dark backgrounds and photography" here to "For dark backgrounds, including dark areas of photos".

### components/Select/README.md (low priority)

S1. The glossary says to avoid "brand book" and say "design system".
Old: `from the intake vocabulary in the brand book`
New: `from the intake vocabulary in the main README`

### Outside the design system (for information only; not edited)

- **The glossary's Colorway entry** says "for dark backgrounds and photos" (C7), and its two-tone and gold-deep "for light backgrounds" carries the same over-promise as C1. These are repo changes, separate from this publish.

---

## 4. Open questions for the owner

1. **The type-set wordmark: keep a narrow exception, or retire it?**
   - **The draft keeps the exception:** the type-set wordmark is allowed for live elements on our own websites, the type-set lockup is dropped, and the descriptor is never typed (R6, W1, W2, T8).
   - **The alternative is to retire type-set entirely** and inline the SVG in the nav and hero. Then:
     - delete the exception sentence from "Use them as supplied";
     - set W1 and W2 to "The wordmark for live elements (the top nav, the hero): inline the wordmark SVG from Logos, in one of its colorways. It's never set in type.";
     - set T8 to "Retired: the wordmark is never set in type. Use the wordmark SVGs under Logos.";
     - skip O2 and O3, or reword them.
   - **Either way,** someone should check whether the live type-set wordmark matches the SVG letterforms and spacing. If it doesn't, the exception lets a near-copy stand.
2. **Glyph colors outside its colorways.** Today the Glyph README uses `navy-deep` on tan and `ink` on gold. The draft (G2) switches the tan case to `navy-ink`, at 9.82:1, and drops gold. Or Allison or Canyon could approve those as glyph versions. They would then become marks, with files and a change-record entry.
3. **Confirm the approved-background lists (R5).**
   - **Gold-deep on `ink`:** it measures 4.21:1 but isn't listed, because gold-deep is a light-background colorway. Approve it?
   - **Navy-ink on `light-gold`:** it is listed, at 7.68:1, since the navy-ink tile already uses the pair. The palette, though, says light gold is never a fill for primary surfaces. Keep it?
4. **Where do the "use it for" lines live?** ADR 0001 says the site never invents a brand rule. The per-mark "what it's for" lines should therefore be kept in the design system. One option is a short clause on each Marks bullet, added once the captions are settled in the prototype (prototype-options items 5 and 8). Until then, the Use it for rule points at lines that exist only in prototype drafts.
5. **Black and white files.**
   - **Black:** the rule says "Black files are on the way" without linking [issue #2](https://github.com/compass-design-studio/brand-site/issues/2), since the README has no repo links today. Add the link?
   - **White:** will white files exist? If not, should the README tell printers to print the `paper` file in white ink?
6. **Change record and retired marks.**
   - **A baseline entry?** Should the record start with an entry for the current 28 marks (date, approver)?
   - **Older versions?** Should older versions people may still have go in the retired list? Examples are the files renamed under ADR 0003, such as `compass-wordmark-alt.svg` and `compass_wordmark_light.svg`, and the favicon with the wrong navy. Listing them would tell people with old downloads to stop using them.
7. **Home hero contrast (C4).** Check the three gallery plates where the light-gold wordmark sits. If any area under the mark is paper- or tan-toned, the hero falls below 3:1 (1.24–1.41:1 at a 30% scrim). Ways to fix it:
   - a stronger scrim under the mark (72% gives 3.78:1 over paper);
   - placing the mark over darker washes;
   - a different hero treatment.

   Because README L93 describes the page "as shipped", a fix touches both the live site and this line.
8. **"Our bearing" and the studio signature (C5, C6).**
   - **"Our bearing":** is the glyph set inside the eyebrow's line of text? If so, move it above or beside the line.
   - **The studio signature:** should its glyph over type-set "Compass Design Studio" stay a page layout? Or should Brand resources say it's not a logo to copy?
9. **Who approves color exceptions and joint layouts?** The draft names Allison or Canyon for color exceptions, mapping the research's "the owner". Joint layouts are left to "we" (the studio), per decision 5. Should joint layouts also name a founder?
10. **Clear space for the glyph alone and the tiles.** "At least as tall as the mark's glyph" gives the glyph on its own a clear space equal to its full height (the glyph is about 1.6 times taller than wide). Is that intended, or should the prototype set a separate value for the glyph and tiles?
11. **The section title.** Is "Using the marks" right, or would you prefer the glossary's exact "Using marks", or something else?

---

## Sources

- docs/research/brand-kit-ground-rules.md: section 1 (rewordings), section 2 (missing rules), section 4.1 (Compass contrast table; reading of the tile and logo exemptions).
- W3C, WCAG 2.2 (logotype exception, SC 1.4.3): https://www.w3.org/TR/WCAG22/
- W3C, Understanding SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C, Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- docs/GLOSSARY.md; docs/adr/0001, 0002, 0003; docs/prototype-options.md (items 5, 6, 7, 8, 16, 22).
- Design system copy at `/private/tmp/claude-501/-Users-canyonbrowning-Documents-brand-site/d667b172-9ed1-496f-8873-398d701531b1/scratchpad/ds-current/project` (read only).
- `public/logos/*.svg`: fill colors and path counts checked to confirm descriptor colors and that the lockups have no hairlines.
