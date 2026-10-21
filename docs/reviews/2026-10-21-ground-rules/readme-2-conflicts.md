# README agent 2 of 3: conflict review of the proposed updates

**Date:** 21 October 2026
**Task:** Check every change in `readme-1-draft.md` against the current design system for direct conflicts, indirect conflicts and fidelity to the owner's decisions 1–8. Check agent 1's current-state assessment and its "other files" list.
**Read in full:** `readme-1-draft.md`; the design system copy at `ds-current/project` (README.md, tokens.json, assets/Logos/README.md, assets/Tiles/README.md, all 11 component READMEs); docs/GLOSSARY.md; ADRs 0001–0003; docs/research/brand-kit-ground-rules.md; docs/prototype-options.md. I also read GitHub [issue #2](https://github.com/compass-design-studio/brand-site/issues/2), skimmed `adr-1-brief.md` to find places where the two drafts disagree, and checked the 28 SVGs in `public/logos/`.
**Checks I re-ran myself:**
- All 29 contrast ratios in the draft, using the WCAG 2.2 relative-luminance formula on the tokens.json hex values. Every one matches.
- Every "current" or "old" anchor string, grepped in its file. Each appears exactly once.
- SVG fills and path counts. The lockups have 19 paths each: two-tone has 6 `#133558` and 13 `#9C8842`, and reversed has 18 `#F7F4EE` and 1 `#E1C982`. None has a hairline or uses `gold`.
- The glyph's bounding box inside `compass-tile-navy-ink-on-light-gold.svg`: y 80–420 of 500, so 68% of the tile's height.

**Nothing else was changed.** This report is the only file written. README line numbers refer to the current 128-line README.md.

---

## Verdict

The draft follows decisions 1–8 closely. Its numbers, file facts and anchors are all correct. Agent 1 found the three biggest existing conflicts (C1 to C3), and it flagged most of its own judgment calls as open questions.

It shouldn't be published as written, though. Four findings are **blocking**:
- **K1:** an exception to "don't retype" that the owner never decided.
- **K2:** a direct conflict that the draft says it fixes but doesn't.
- **K3:** a new size and clear-space rule that the favicon tile breaks.
- **K4:** a README line agent 1 missed, which tells people to recreate the Glyph and Wordmark.

There are also 12 **should fix** findings and 14 **nits**. Most fixes are a sentence or less, and section 5 gives the amended new-section text.

| Severity | Count | Findings |
|---|---|---|
| Blocking | 4 | K1 type-set wordmark exception · K2 "for light backgrounds" · K3 tiles vs minimum size and clear space · K4 README L103 "recreate" |
| Should fix | 12 | K5 to K16 |
| Nit | 14 | N1 to N14 |

---

## 1. Blocking

### K1 · The type-set wordmark exception wasn't decided, and its scope differs in three places · blocking (owner decision)

**Where:** R6 "Use them as supplied"; W1 and W2 (Wordmark README); T8 (tokens.json); O2 and O3; and indirectly README L99 (Footer) and MobileNav README L3.

**Conflicting texts:**
- Decision 2 adopts the research's don't-list, which ends "or retype the wordmark or descriptor". It makes no exception.
- R6: "The one exception is the type-set wordmark, for live elements on our own websites (see the Wordmark component)."
- W2: "in one of the wordmark's colorways: `navy-ink` on paper; `paper`, `light-gold` or `reversed` on ink. Use it only where a live element is needed (the top nav, the hero)"
- T8: "The type-set wordmark only, for live elements on our own websites; uppercase, in one of the wordmark's colorways."
- README L99: "**Footer.** Wordmark and blurb". MobileNav README L3: "The wordmark and a two-bar menu button". Both are live elements outside "the top nav, the hero".

**Why it blocks:**
- **It adds a rule the owner didn't decide.** Agent 1 is open about this (open question 1), but the draft writes the exception into the rule text itself.
- **The scope differs.** R6 and T8 allow "live elements on our own websites", while W2 allows only "the top nav, the hero". Under W2 the footer and the mobile nav would be out of bounds; under R6 they'd be fine.
- **So do the colorways.** W2 allows four (navy-ink, paper, light-gold, reversed). T8 allows "one of the wordmark's colorways", which is all six.

**Fix:** the owner chooses one.
- **Keep the narrow exception.** Use one scope and one colorway list everywhere:
  - **R6:** keep as drafted.
  - **W2:** replace "Use it only where a live element is needed (the top nav, the hero)" with "Use it only for live elements on our own websites, such as the top nav, the mobile nav, the hero and the footer".
  - **T8:** replace "in one of the wordmark's colorways" with "in a colorway the Wordmark component lists". The color list then lives in one place.
  - **Before publishing,** check that the live type-set letters match the SVG wordmark, as agent 1's open question 1 also says.
- **Retire type-set.** Use agent 1's open question 1 alternative as written, and add the K4 change.
- **Either way,** drop O2 and O3 (K14).

### K2 · R4 still says two-tone and gold-deep are "for light backgrounds" · blocking

**Where:** R4 (README L124). Agent 1's summary and its C1 say this is "Fixed by R4 and R5". It isn't.

**Conflicting texts:**
- R4 new: "`two-tone` (navy-ink letters, gold-deep glyph and descriptor), `navy-ink` and `gold-deep` for light backgrounds;"
- R5 new: "`two-tone` and `gold-deep`: `paper` and `white` only. On `paper-2` (2.91:1) and `tan` (2.74:1) their gold-deep parts fall under 3:1."
- Paper 2 and Tan are light backgrounds: the glossary describes backgrounds "as light or dark", and tokens.json calls them a "section ground" and an "Accent surface".
- Agent 1's own L1 for the Logos README does narrow it: "two-tone and gold-deep go on `paper` and `white` only". So after the edits, the main README would be looser than the Logos README.

**Fix:** replace R4's "New" with this (it also takes O5; see K6):
```text
- **Colorways:** `two-tone` (navy-ink letters, gold-deep glyph and descriptor), `navy-ink` and `gold-deep` for light backgrounds (two-tone and gold-deep on `paper` and `white` only); `reversed` (paper letters and descriptor, light-gold glyph), `paper` and `light-gold` for dark backgrounds, including dark areas of photos. The glyph has no two-tone or reversed version. Each colorway's approved backgrounds are listed below.
```

### K3 · The glyph minimum and the clear-space rule rule out the favicon and app-icon tile · blocking

**Where:** R6 "Minimum size" and "Clear space", against README L125, Tiles README L5 and R2.

**Conflicting texts:**
- R6: "the glyph at least 24px or 6mm tall … if the wordmark won't, use the glyph or a tile."
- R6: "Nothing enters it: no text, rules, photo or page edges, or other logos."
- README L125: "`compass-tile-navy-ink-on-light-gold.svg` (the favicon and app icon)". Tiles README L5: "the website favicon and app icon". R2: "the favicon and app icon (on a tile)".

**Why it blocks:**
- **The favicon falls under the minimum.** The glyph is 68% of the tile's height, so at the usual 16px and 32px favicon sizes it is about 11px and 22px tall. Both are under 24px.
- **Tiles fill their frame.** An app icon or social avatar runs the tile to the frame's edge, which is a "page edge" inside the clear space.
- **Nothing says whether the rules apply inside a tile.** Read literally, the README's own favicon breaks two of the new rules.

**Fix:** two short clauses that settle scope without setting numbers (decision 6):
- Minimum size: add "The glyph minimum doesn't apply inside a tile; tiles get their own minimums with the rest."
- Clear space: add "A tile or wordmark bar carries its own clear space, so it can fill its frame, as the app icon does."

Owner check: the section-end ornament and the "Our bearing" glyph may also render under 24px. Check them on the live page with K11.

### K4 · README L103 says to recreate the Glyph and Wordmark in HTML and CSS · blocking (missed by agent 1)

**Where:** README L103 (Components). Neither agent 1's assessment nor its edits mention it.

**Conflicting texts:**
- L103: "The other components (Badge, Card, Input, Select, Nav, MobileNav, PageClose, Iconography, Glyph, Wordmark) are reference previews: recreate them in HTML and CSS from their preview and README, using the tokens above."
- R6: "Nobody else makes, edits or redraws a mark" and "Don't … retype the wordmark or descriptor."

**Fix (if the type-set exception is kept):** after "using the tokens above.", add:
```text
Glyph and Wordmark are the exception: use the SVGs under Logos, inline the glyph's path only as the Glyph README allows, and set the wordmark in type only as the Wordmark README allows.
```
If type-set is retired, end the sentence after "as the Glyph README allows".

---

## 2. Should fix

### K5 · The two-tone fallback, "a one-color version", can mean gold-deep, which has the same weak gold

**Where:** R6 "Minimum size".

**Conflicting texts:**
- R6: "Two-tone marks get a larger minimum; below it, use a one-color version."
- Research 4.1: the larger minimum exists because the "gold deep parts sit at 3.18:1".
- The gold-deep lockups are one-color, and their descriptor is the same `#9C8842` at the same 3.18:1: all 19 paths in `compass-lockup-*-gold-deep.svg` are `#9C8842`.

So the fallback can lead straight back to the problem. Two smaller points:
- **No provisional value.** The draft gives no number for the larger minimum, so "below it" can't be applied today.
- **A term to avoid.** "One-color version" is close to the glossary's avoided "color version".

**Fix:**
- Replace the sentence with: "Two-tone marks get a larger minimum, which we'll set in the prototype; below it, use the navy-ink version."
- Ask the owner whether the gold-deep lockups should share the larger minimum. That wasn't decided, so don't add it without a yes.

### K6 · Photography is promised in R4 but missing from R5's list, and the Contrast rule treats it as off-list

**Where:** R4 (README L124), R5, R6 "Contrast" and "Photos", Logos README L3.

**Conflicting texts:**
- R4: "`paper` and `light-gold` for dark backgrounds and photography".
- R5: "`reversed`, `paper` and `light-gold`: `ink`, `navy-deep` and `navy`". Photography isn't listed.
- R6: "Anywhere else, such as a photo …, use the approved version with the most contrast and check it". Over a light area of a photo, that is a navy-ink mark.

Agent 1 found this (C7) but left it as optional O5. With R5 and R6 in place, the colorway bullet contradicts both, so the fix is now required.

**Fix:**
- Take O5, which is already folded into the K2 text above.
- Make the same change in L1 (Logos README): "For dark backgrounds, including dark areas of photos".
- Record the glossary's Colorway entry ("for dark backgrounds and photos") as a follow-up repo change.

### K7 · `light-gold` as an approved background for navy-ink clashes with the palette rule

**Where:** R5 "Approved backgrounds", against README L52.

**Conflicting texts:**
- R5: "`navy-ink`: `paper`, `paper-2`, `white`, `tan` and `light-gold`."
- README L52: "`gold` and `light-gold` carry accents, used like a fine pen line, never as fills for primary surfaces."

The pair already exists as a mark, `compass-tile-navy-ink-on-light-gold`. Listing light-gold as a background invites people to build homemade tiles and gold panels. Agent 1 asks about this in open question 3.

**Fix (recommended):** drop light-gold from the list and point to the tile:
```text
  - `navy-ink`: `paper`, `paper-2`, `white` and `tan`. On `light-gold`, use the `compass-tile-navy-ink-on-light-gold` tile.
```
Keep it only if the owner says yes to open question 3.

### K8 · The color-exception sentence wasn't in decision 1's summary, and it collides with "New and changed marks"

**Where:** R6 "Colors" and R6 "New and changed marks".

**Conflicting texts:**
- R6 Colors: "Any other color, including a material's own finish, needs Allison's or Canyon's approval for that job."
- R6 New and changed marks: "Only Allison Browning or Canyon Browning approves a new or changed mark, and we note who approved it under Marks. It goes into this design system first, then onto Brand resources."

**Problems:**
- **Fidelity.** Decision 1's summary of Colors leaves this sentence out. The research's section 1 wording includes it, so it's arguably adopted, but `adr-1-brief.md` (open point 1) asks Canyon whether to keep it. Agent 1's open question 9 asks only who approves it, not whether to keep it.
- **Collision.** Is a one-job brass sign a "changed mark"?
  - If it is, every one-job approval has to go into the design system and onto Brand resources first.
  - If it isn't, nothing says so, and the change record misses it.

**Fix:**
- The owner confirms keep or drop, the same way for both drafts.
- If kept, add after "for that job": "That approval covers the one job; it doesn't make a new mark."

### K9 · Pure white has no file and no fallback, and "Black files are on the way" overstates issue #2

**Where:** R6 "Colors".

**Conflicting texts:**
- R6: "plus pure black or pure white for one-color jobs … Never recolor a mark; pick the version that fits. … Black files are on the way; until then, ask us."
- [Issue #2](https://github.com/compass-design-studio/brand-site/issues/2) is open research. It asks "Black one-color versions: offer them, or use Ink as the darkest one-color version?" and doesn't mention white files.
- Glossary: Ink, "_Avoid_: black"; Paper, "_Avoid_: white".

**The gap:** a printer cutting white vinyl is allowed pure white but has no white file and no "ask us", so the only way to comply is to recolor, which the same bullet forbids.

**Fix:** use exact values, which also keeps them apart from Ink and Paper, and cover both files:
```text
- **Colors.** Brand palette colors only, plus pure black (#000000) or pure white (#ffffff) for one-color jobs such as single-color printing, embroidery and vinyl. Never recolor a mark; pick the version that fits. … Black and white files aren't in the kit yet; until they are, ask us.
```

### K10 · The home page hero breaks the new Photos and Contrast rules (README L93)

**Where:** README L93, against R6 "Photos and busy backgrounds" and "Contrast". Agent 1 raised this as C4 and open question 7 but proposed no edit.

**Conflicting texts:**
- L93: "a full-height three-plate watercolor gallery (slow 1.2s cross-fade, ink 30% scrim) with the light-gold wordmark centered over it … no copy over the gallery beyond the mark."
- R6: "Place a mark only over a calm, even area. If there isn't one, use a tile." and "If none reaches 3:1, move the mark or use a tile."

**How light gold measures under the 30% ink scrim:**

| Wash under the mark | Ratio |
|---|---|
| Paper-toned | 1.24:1 |
| Tan-toned | 1.41:1 |
| White highlights | 1.14:1 |
| Navy-toned | 5.44:1 |

The README would describe its own home page breaking two rules it introduces.

**Fix:** before publishing, the owner checks what is under the mark in each of the three plates.
- **If any plate fails:** either strengthen the scrim under the mark on the live site (72% gives 3.78:1 over paper and 3.62:1 over white) and update L93's figure, or move the mark over a darker wash.
- **Whatever the result:** note it as a follow-up for the marketing site, since L93 describes the site "as shipped".

### K11 · G2 keeps the glyph "in the 'Our bearing' eyebrow" while R6 bans marks inside a line of text

**Where:** G2 (Glyph README L3), against R6 "The glyph is the A in COMPASS only".

**Conflicting texts:**
- G2 new: "the section-end ornament (the studio signature, the "Our bearing" eyebrow, the intake thank-you)".
- R6: "don't set any mark inside a line of text."

README L93 describes the same spot as "'Our bearing' (glyph and statement)", which suggests the glyph sits above the line rather than in it. Agent 1 flagged it (C5) but still restated "eyebrow" in G2.

**Fix:**
- In G2, change "the "Our bearing" eyebrow" to "the "Our bearing" statement".
- Confirm on the live page that the glyph isn't set in the line of text.

### K12 · The required asterisk is called a "mark" · missed by agent 1

**Where:** README L96, Select README L1, tokens.json `gold`.

**Conflicting texts:**
- README L96: "All fields required; the mark is a `gold-deep` `*` after the label."
- Select README L1: "with the required mark and helper copy".
- tokens.json `gold`: "required marks. On paper it measures 2.55:1".
- Glossary: "**Mark**: Any of the studio's logo artworks". The new section applies its rules to every "mark", for example "Every color in a mark needs at least 3:1".

**Why it matters:** "required marks" in gold at 2.55:1 now reads like a mark failing the rule.

**Fix:**
- README L96: change "; the mark is a `gold-deep` `*` after the label." to ", shown by a `gold-deep` `*` after the label."
- Select README L1: "with the required asterisk and helper copy".
- tokens.json `gold`: "required asterisks".

### K13 · The section is called "Using the marks"; the owner, the site and the ADR draft say "usage rules"

**Where:** R6 heading, plus the pointers in R1, R2 and L1.

**Conflicting texts:**
- R6: `## Using the marks`.
- The owner's own words (Q31): "Usage rules should go in a section of it's own".
- prototype-options items 3 and 22: the "Usage rules" drawer and the visual usage section.
- `adr-1-brief.md`: term "usage rules"; proposed ADR 0004 title "Marks follow one set of usage rules…".
- ADR 0003's principle is one name everywhere, and the design system and site should name this section the same way.

**Fix:** retitle it `## Usage rules`, and change "see Using the marks", "under Using the marks" and "Using the marks" in R1, R2 and L1 to match. This also settles agent 1's open question 11.

### K14 · O2 and O3 contradict W2 and "Use them as supplied"

**Where:** O2 (README L19) and O3 (README L56).

**Conflicting texts:**
- O2: "ALL CAPS survives in exactly two places: the marks (the wordmark, set in `wordmark` and tracked `track-mark`, and the descriptor) …"
- O3: "uppercase belongs to the marks only."
- W2: "The descriptor is never set in type".
- R6: "Don't … retype the wordmark or descriptor".

**Why it matters:** L19 and L56 are casing rules for typed text. Adding the descriptor, and "the marks", implies the descriptor may be typed in capitals.

**Fix:** reject O2 and O3.
- If type-set is kept, L19 and L56 are already right, since the type-set wordmark is the only typed uppercase.
- If type-set is retired, reword both to drop the wordmark from typed caps.

### K15 · "Use it for" promises lines the design system doesn't hold (ADR 0001)

**Where:** R6 "Use it for".

**Conflicting texts:**
- R6: "Every mark on Brand resources says what it's for and which backgrounds it goes on."
- ADR 0001: the repo "never invents a brand rule. A brand change or correction goes into the artifact first".
- Today the Marks section has "what it's for" only for the tiles ("the favicon and app icon", "for email signatures"). Nothing exists for the glyph, the wordmark or either lockup.

Agent 1 raised this (open question 4) but left the rule pointing at the site.

**Fix:** point the rule at the master. Change the sentence to "Every mark says what it's for and which backgrounds it goes on, here under Marks and on its card on Brand resources." Then add each mark's line to its Marks bullet once the prototype settles the captions. The backgrounds are already covered by R5.

### K16 · The Contrast bullet is the longest in the section and the hardest for non-designers

**Where:** R6 "Contrast". It is 82 words; the README's existing bullets run about 20–40.

**Problems:**
- "(the WCAG formula, from hex values)" is jargon for a sign shop.
- "check it against the lightest or darkest part" doesn't say which part applies when.
- "a partner's sign" breaks the glossary ("Trade partner … _Avoid_: partner (alone)").
- "the approved version with the most contrast" reads oddly, because off-list means no version is approved for that background.

**Fix:**
```text
- **Contrast.** Every color in a mark needs at least 3:1 contrast with what's directly behind it. That's our own rule; WCAG exempts logos. Keep to the approved backgrounds listed under Marks. Anywhere else, such as a photo or a trade partner's sign, use the version with the most contrast, and check a light mark against the lightest part of the area it covers and a dark mark against the darkest. If none reaches 3:1, move the mark or use a tile.
```

---

## 3. Nits

| ID | Where | Text | Fix |
|---|---|---|---|
| N1 | R6 New and changed marks | "one-off versions for a project, event, partner or campaign" | "…event, trade partner or campaign" (glossary: avoid "partner" on its own) |
| N2 | R6 Colors and New and changed marks | "Allison's or Canyon's approval" here, "Allison Browning or Canyon Browning" there | Full names at first mention (Colors comes first): "approval from Allison Browning or Canyon Browning". Then "Allison or Canyon". |
| N3 | R6 New and changed marks | "approves a new or changed mark" | The change record (R5) covers "new, changed or retired", and `adr-1-brief.md` says "a new, changed or retired mark". Retitle the bullet "New, changed and retired marks" and say "approves a new, changed or retired mark". |
| N4 | R6 Use it for | "Marks that do the same job share the wording." | The research says "can share". It's an option, not a mandate: "can share". |
| N5 | R6 Photos | "Place a mark only over a calm, even area. If there isn't one, use a tile." | A tile is a mark (glossary), so the rule catches its own fallback. Use "Place a glyph, wordmark or lockup only over…". Adding "or wordmark bar" to the fallback is optional; decision 1 says only "use a tile". |
| N6 | R6 Minimum size | "If a lockup won't fit, use the wordmark; if the wordmark won't, use the glyph or a tile." | The wordmark step wasn't decided (the research goes straight to the glyph or a tile). Agent 1 flagged it, and it's logical. Accept, and the owner notes it. |
| N7 | R6 Minimum size | "We'll set final sizes … in the Brand resources prototype." | Add "and record them here first", per ADR 0001: the prototype proposes and the design system holds. |
| N8 | R6 Retired marks | "Don't use a mark that's no longer on Brand resources." | Fine for outsiders. Since the site is synced by hand ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)), optionally add "If in doubt, the retired list here wins." |
| N9 | README L60 | "**Backgrounds.** Solid `paper` or solid `ink`, never gradients." | Same heading word as R5's six-color "Approved backgrounds". Optional: add "Marks have their own approved backgrounds; see Marks." |
| N10 | README L74 | "Text over images sits in a protection capsule" | Someone may put a mark in a capsule over a photo, which is a homemade tile. Optional, for the owner: add "Don't put a mark in a text capsule; use a tile" to Photos. |
| N11 | R5 Change record | "`date · mark · what changed · approved by`. None yet." | Give a date format ("21 October 2026"). Decide whether the record syncs to Brand resources: prototype-options item 21 keeps changelogs off the site. "None yet" sits oddly beside agent 1's open question 6 (the ADR 0003 renames, the wrong-navy favicon); settle that first. |
| N12 | tokens.json `gold-deep`, `light-gold` | gold-deep: "passes only at 24px+ or bold 19px+"; neither note mentions its role in the marks | Add "In marks: see Usage rules." to each. Otherwise someone checking the two-tone descriptor against the token note will think it fails. |
| N13 | tokens.json `navy-deep` (outside the draft) | "on paper (8.58:1), white and tan (7.39:1)" | An existing error: navy-deep on white is 9.42:1, and 7.39:1 is tan only. Not a ground-rules conflict; for clean-up. |
| N14 | R6 Colors | "Brand palette colors only" | The README's palette tokens include the status colors (`success`, `warning`, `danger`). "Never recolor" already blocks them, but a printer may not see that. Optional: "Brand palette colors only (not the status colors)". |

**Accepted as is.** "Recolor" appears in both "Use them as supplied" and "Colors". Decisions 1 and 2 each include it, so I recommend keeping both.

---

## 4. Fidelity to decisions 1–8

| # | Decision | In the draft | Verdict |
|---|---|---|---|
| 1 | Contrast | R6 Contrast; the two-tone clause moved to Minimum size; R5 list | Faithful. The list contents are new (K7, open question 3), and the two-tone fallback needs K5. |
| 1 | Colors | R6 Colors | Faithful, apart from the white gap (K9). The exception sentence needs the owner's confirmation (K8). |
| 1 | New marks | R6 New and changed marks; R5 record and retired list | Faithful. Retirement approval is missing (N3). |
| 1 | Use it for | R6 Use it for | Faithful, but the lines aren't in the master (K15). "Share" was "can share" (N4). |
| 2 | Don't alter, shown in pictures | R6 Use them as supplied; intro "shows each rule in pictures" | Faithful apart from the **undecided type-set exception (K1)**. |
| 2 | Clear space, minimum size (px and mm) | R6 | Faithful. Tile scope is missing (K3). "Rules" and "page edges" come from prototype-options item 7, not the decision; they're fine once K3 is fixed. |
| 2 | Photos and busy backgrounds | R6 | Faithful. Wording N5; the home hero conflicts (K10). |
| 2 | Glyph is the A in COMPASS only | R6 | Faithful; G2 conflicts (K11). |
| 2 | Retired marks | R6 and R5 | Faithful. |
| 3 | Either founder; the design system records the approver | R6, R5 change record | Faithful. Name forms differ (N2). |
| 4 | Start here: navy-ink and light-gold wordmarks, "most used", not "primary" | R6 Start here | Faithful. |
| 5 | Who may use; other logos | R6 | Faithful, including the dropped "unless the studio agrees otherwise". |
| 6 | Numbers provisional | "For now" twice, plus the prototype sentence | Faithful. The two-tone value is missing (K5); N7. |
| 7 | Visual section on the site; README for now | Intro sentence | Faithful. Section name: K13. |
| 8 | Voice | No exclamation points, sentence case, "we", middle dot in the record | Mostly. "Partner" on its own (N1, K16); length: the Contrast bullet is 82 words (K16). The whole section is 585 words, and R5 adds 95 more. |

**Added but not decided:** the type-set exception (K1); light-gold as a background (K7); the wordmark step in Minimum size (N6); "rules" and "page edges" in Clear space; the G2 color changes to the live intake thank-you glyph (agent 1's open question 2; it changes the shipped site); the `currentColor` limit in R3, which follows from "never recolor" and is fine.

---

## 5. New section with the fixes applied (for agent 3 and the owner)

This is R6 with K1 (keep option), K3, K5, K8, K9, K13, K15, K16 and N1 to N5 applied. Lines that depend on an owner decision are marked ‹K1› and ‹K8›. Delete the markers before publishing.

```text
## Usage rules

How we, and anyone working with us, use the marks. Brand resources shows each rule in pictures.

- **Start here.** Not sure which mark to use? Use `compass-wordmark-navy-ink` on light backgrounds and `compass-wordmark-light-gold` on dark ones; they're our most used.
- **Use it for.** Every mark says what it's for and which backgrounds it goes on, here under Marks and on its card on Brand resources. Marks that do the same job can share the wording.
- **Who may use them.** Employees and contractors, for studio work. Trade partners, only to identify work done with or for the studio. Ask us before putting a mark on anything sold, and never use one in a way that suggests we endorse another business.
- **Use them as supplied.** Don't stretch, squash, rotate, recolor, outline, add shadows or effects, rearrange the parts, or retype the wordmark or descriptor. ‹K1› The one exception is the type-set wordmark, for live elements on our own websites (see the Wordmark component).
- **Colors.** Brand palette colors only, plus pure black (#000000) or pure white (#ffffff) for one-color jobs such as single-color printing, embroidery and vinyl. Never recolor a mark; pick the version that fits. ‹K8› Any other color, including a material's own finish, needs approval from Allison Browning or Canyon Browning for that job; that approval covers the one job and doesn't make a new mark. Black and white files aren't in the kit yet; until they are, ask us.
- **Contrast.** Every color in a mark needs at least 3:1 contrast with what's directly behind it. That's our own rule; WCAG exempts logos. Keep to the approved backgrounds listed under Marks. Anywhere else, such as a photo or a trade partner's sign, use the version with the most contrast, and check a light mark against the lightest part of the area it covers and a dark mark against the darkest. If none reaches 3:1, move the mark or use a tile.
- **Photos and busy backgrounds.** Place a glyph, wordmark or lockup only over a calm, even area. If there isn't one, use a tile.
- **Clear space.** For now, leave space on every side at least as tall as the mark's glyph. Nothing enters it: no text, rules, photo or page edges, or other logos. A tile or wordmark bar carries its own clear space, so it can fill its frame, as the app icon does.
- **Minimum size.** For now, the wordmark is at least 120px or 32mm wide and the glyph at least 24px or 6mm tall. The glyph minimum doesn't apply inside a tile; tiles get their own minimums with the rest. Two-tone marks get a larger minimum, which we'll set in the prototype; below it, use the navy-ink version. If a lockup won't fit, use the wordmark; if the wordmark won't, use the glyph or a tile. We'll set final sizes, in px and mm, and clear space in the Brand resources prototype, and record them here first.
- **With other logos.** Beside another company's logo, such as on a builder's job-site sign: about the same visual size, at least our clear space between them, and never merged into one logo. We approve every joint layout.
- **The glyph is the A in COMPASS only.** Don't use it as a letter in any other word, and don't set any mark inside a line of text. On its own it's still a mark, as in the tiles and section-end ornaments.
- **New, changed and retired marks.** Only Allison or Canyon approves a new, changed or retired mark, and we note who approved it under Marks. It goes into this design system first, then onto Brand resources. Nobody else makes, edits or redraws a mark, including one-off versions for a project, event, trade partner or campaign; ask us instead.
- **Retired marks.** A retired mark comes off Brand resources and is listed as retired under Marks. Don't use a mark that's no longer on Brand resources.
```

It comes to about 660 words, against 585. The scope clauses in K3 and K5 add more than K16 trims. To get back under 585, cut the Minimum size step-down sentence (N6) or the second sentence of "Use it for".

---

## 6. Accuracy of agent 1's assessment

**Confirmed:**
- The README has 128 lines, and the line references (L18, L19, L54, L56, L62, L93, L95, L113, L117–128) are right.
- There are 11 component READMEs.
- Every contrast ratio is correct. I recomputed 29, including 2.74 (gold-deep on tan), 9.82, 10.44, 12.52, 5.78, 4.34, 4.47, 7.39, and the scrim figures 1.24, 1.41, 5.44 and 3.78.
- The SVG facts hold: 19 paths, no hairlines, no `gold`, a gold-deep descriptor in two-tone and a paper descriptor in reversed. The tile and bar ratios (13.39, 9.02, 7.68, 5.78) are right too.
- Every "current" or "old" anchor (R1–R5, O1, O2, O4, T1–T8, B1, G1, G2, W1, W2, I1, L1, S1) appears exactly once.
- The README has about 2,160 words (I count 2,158), and R6 is 585 words.
- C1, C2, C3, C8 and C9 are real conflicts. C4 to C7 are fair indirect ones.

**Inaccurate:**
- **C1 is not fixed by R4.** "Fixed by R4 and R5" is wrong: R4 keeps "for light backgrounds" (K2).
- **The edit count.** "Five small edits elsewhere in the README" doesn't match the drafts. Only R1 and R2 fall outside Marks; R3 to R5 are inside Marks, and O1 to O5 are optional.
- **Voice check.** "Voice: … no 'ground'" passes, but the check missed "partner" used on its own, twice (N1, K16).

**Missed in the current state (table 1.1):**
- README L103, Components: "recreate" the Glyph and Wordmark (K4).
- README L96, Select README L1 and tokens.json `gold`: "mark" used for the required asterisk (K12).
- README L52, Palette: light-gold never a fill. It's raised only inside open question 3 (K7).
- README L60, Backgrounds, and L74, Capsules (N9, N10).
- README L99 Footer and MobileNav README L3: live wordmarks outside "the top nav, the hero" (K1).
- tokens.json: the `gold-deep` and `light-gold` notes lack their mark roles (N12), and `navy-deep` has a wrong ratio (N13).

**The "other files" list (section 3):**

| Edit | Verdict |
|---|---|
| T1–T7, B1, G1, I1, S1 | Correct and safe. |
| G2 | Accept, with K11 ("statement" rather than "eyebrow"). Its color change edits the live intake thank-you glyph (open question 2). |
| W1, W2, T8 | Depend on K1, and W2 and T8 must agree. |
| L1 | Accept, with K6 and K13 wording. |

The list is missing:
- the README L103 edit (K4);
- the README L96, Select README L1 and tokens.json `gold` edits (K12);
- an optional pointer in the tokens.json `gold-deep` and `light-gold` notes (N12).

**Open questions.** All 11 of agent 1's are real. Two of them, 1 (type-set) and 3 (the background lists), should be settled before publishing, not after (K1, K7).

---

## 7. Recommended disposition of each edit

| Edit | Recommendation |
|---|---|
| R1 | Accept; rename the pointer if K13 is taken |
| R2 | Accept; rename the pointer if K13 is taken |
| R3 | Accept |
| R4 | **Replace** with the K2 text |
| R5 | Accept, with K7 (drop light-gold) and N11 |
| R6 | Accept the section 5 version after the owner settles K1 and K8 |
| O1, O4 | Accept (optional) |
| O2, O3 | **Reject** (K14) |
| O5 | **Make required**; folded into K2 |
| T1–T7, B1, G1, I1, S1 | Accept |
| T8, W1, W2 | Per the owner's K1 choice; make W2 and T8 agree |
| G2 | Accept with K11; the owner confirms the live-site color change (open question 2) |
| L1 | Accept, with "including dark areas of photos" (K6) and the K13 name |
| New: README L103 | Add (K4) |
| New: README L96, Select README L1, tokens.json `gold` | Add (K12) |
| New: tokens.json `gold-deep`, `light-gold` | Optional (N12) |

## Sources

- Repo and design system files as listed at the top. All were read on 21 October 2026, and none was changed.
- GitHub issue #2, "Research: print-ready brand files and a print-friendly brand kit" (open): https://github.com/compass-design-studio/brand-site/issues/2
- W3C, WCAG 2.2 (relative-luminance and contrast-ratio definitions; logotype exception): https://www.w3.org/TR/WCAG22/
