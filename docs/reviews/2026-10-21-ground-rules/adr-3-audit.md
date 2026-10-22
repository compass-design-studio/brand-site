# ADR agent 3 of 3: audit of the ADR 0004 draft

21 October 2026 · for Canyon · audits `adr-2-draft.md` against `adr-1-brief.md`

**Read in full:** the brief (`adr-1-brief.md`), the draft (`adr-2-draft.md`), `docs/research/brand-kit-ground-rules.md`, ADRs 0001–0003, `docs/GLOSSARY.md`, the ADR format guide (`mattpocock-skills/1.2.3/.../domain-modeling/ADR-FORMAT.md`) and the README chain's first draft (`readme-1-draft.md`). I also checked `docs/prototype-options.md` (items 22 and the logo display options), the opening of `docs/research/usage-rules-source-of-truth.md`, the design system copy's `README.md` (Casing, Contrast, Marks) and `tokens.json`, and GitHub issues #1 and #2 (`gh issue view`).

**Checked by hand:** every relative link resolves from `docs/adr/`; the WCAG anchor `#contrast-minimum` exists on https://www.w3.org/TR/WCAG22/ and that section carries the logotype exception (fetched 21 October 2026); the repo remote is `compass-design-studio/brand-site`, so both issue links are right; contrast ratios recomputed with the WCAG formula from `tokens.json` hex values (gold deep on paper 3.18, white 3.49, paper 2 2.91, tan 2.74; navy ink on paper 11.40; light gold on ink 9.02).

Nothing else was changed. This report is the only file written.

---

## Verdict: approve with edits

The draft is a good ADR. It records one decision with its reasons, keeps the rule wording out, cites the research sparingly and correctly, names two honest downsides, and leaves out every provisional number. Every tally and ratio I spot-checked matches the research.

It needs edits in three areas before it's saved:

1. **What it adopts by reference.** "The four as reworded in the research" pulls in research wording you changed or didn't adopt. That includes the material-finish color exception, which you didn't decide and which the README draft includes anyway.
2. **Two consequences that don't hold together.** "The design system wins where they differ" sits beside "changing the 3:1 floor takes a new ADR". And "not yet built" is already false once the README lands.
3. **Small fidelity gaps.** "Retired" is added to what a founder approves. "Approved" is dropped from the contrast fallback. The two-tone minimum and Tan are missing. "Brand resources starts with" commits to a page layout you haven't chosen yet.

All of these are fixed in section 7. That text is ready to save as `docs/adr/0004-mark-usage-rules.md`.

**Three owner decisions have to be settled first,** or the ADR and the README will disagree. All three come from the README draft (section 6).

---

## 1. Decisions 1–8

| # | Decision | In the draft | Verdict |
|---|---|---|---|
| 1 | Contrast: 3:1 per color, approved backgrounds, check off-list, move or tile, two-tone gets a larger minimum | 3:1 ✓, approved backgrounds ✓, fallback ✓. Says "the highest-contrast version", not the *approved* one (F5). The two-tone minimum is missing (F6) | Edit |
| 1 | Colors: palette plus pure black and pure white for one-color jobs, never recolor, black files pending #2 | ✓ as worded. But "the four as reworded in the research" also brings in the research's last Colors sentence (material finishes need approval), which decision 1 leaves out (F1, B1) | Edit |
| 1 | New marks: only an approver; design system first, then Brand resources; no one-off versions; retired marks come off and are listed | ✓, except the approver now also covers *retired* marks (F4) | Edit |
| 1 | Use it for: every downloadable mark says what it's for and which backgrounds | ✓ | OK |
| 2 | Missing rules (don't alter, clear space, minimum size, photos, glyph as the A only, retired) | Adopted by reference ("plus the ones it found missing") without restating them, as the brief asked ✓ | OK |
| 3 | Either founder approves; the design system records who | ✓ | OK |
| 4 | Start here: the most used pair, not "primary" | ✓ in substance. "Brand resources starts with" fixes a page layout that's still being chosen in the prototype (F8). "A default" in the curated-kit option reintroduces the word you passed over (F13) | Edit |
| 5 | Who may use; beside other logos | ✓. "About equal size" should be "about equal visual size" (F12). Clear space between the logos is rightly left to the README | Nit |
| 6 | Numbers not final | No px, mm or clear-space unit ✓. "Not decided here" covers it ✓ | OK |
| 7 | Visual section on Brand resources; long-term master being researched | ✓. The research file now exists, so it can be linked (F16) | Nit |
| 8 | Voice | Sentence case ✓, "we" ✓, no exclamation points ✓. No ranges or separators needed | OK |

**Nothing undecided has been added,** apart from "retired" in the approver clause (F4) and the material-finish exception, which comes in by reference (F1).

---

## 2. Evidence spot-check

| Claim in the draft | Research | Match |
|---|---|---|
| Contrast in words: 8 of 12; "none we read gives a number" | 4.1 tallies: 8 in words, 0 with a number. "None we read" keeps the research's "silent ≠ no rule" caveat | ✓ |
| No co-branding: 3 of 12 | 4.5 item 4: Spotify, Stanford, LinkedIn | ✓ |
| WCAG 2.2 exempts logos | 4.1 quotes the 1.4.3 logotype exception; confirmed live at the linked anchor | ✓ |
| Paper 2 2.91:1, Gold deep 3.18:1 on Paper | 4.1 table; recomputed | ✓ |
| The four drafts left out the approver, photos and other logos | Section 1, rule 3 ("says nothing about who approves a mark"); rule 1 ("a way to handle photos"); section 2, row 4 | ✓ |
| One approver "as the research proposed" | Rule 3 wording: "Only [the owner] approves". A singular placeholder, so fair | ✓ |
| Job-site signs are trade partners' most likely use | Section 2, row 4: "this is their most likely use" | ✓ |
| A default, stated uses and a tiebreaker keep large kits usable | Section 3, habits 1–3. Also: no source warns against many versions | ✓ |

No tally from the naming audit (the "9 of 13 offer black" sample) is mixed in. ✓

---

## 3. ADR quality

- **One clear decision.** Yes: adopt one set of usage rules. The title joins two clauses, but the approver choice is the most surprising part of the decision, so putting it in the title earns its place.
- **The reason.** Stated in the opening: a public kit used mostly by non-designers, plus the gaps in the four drafts.
- **Considered options.** All four were really on the table, so none is a dummy alternative. "Contrast in words only" is the important one, because it's the deliberate departure from common practice. "A short curated kit" is the weakest, but it stops "trim the kit" from coming back.
- **Consequences.** Non-obvious, and two are honest downsides: stricter than WCAG, and the founders as a bottleneck. Two need fixing (F2, F3).
- **House style.** Statement title in sentence case, one plain paragraph, short sections with bold lead-ins, no frontmatter, links in the same form as 0001 and 0002. The `<!-- … -->` file-name line is not house style (F15).
- **Length.** 496 words. That's within the brief's 500 cap but above its 350–450 target, and well above 0003 (306). The recommended text is the same length (497), while adding Tan, the two-tone minimum and one link. Cutting further would mean dropping a decision. Accepted (F17).
- **Number and file name.** 0004 is next (the highest is 0003). `0004-mark-usage-rules.md` matches `0003-mark-file-naming-convention.md` and the site's "Usage rules" term. ✓
- **Anti-patterns (Zimmermann).** No "you must" lists, so it isn't a policy in disguise. It isn't a mega-ADR, and it isn't a sales pitch. ✓

---

## 4. Consistency

| Against | Finding |
|---|---|
| ADR 0001 | "The design system holds the wording" and "goes first" ✓. But "wins where they differ" next to "takes a new ADR" leaves a gap: a README edit lowering the floor would "win" with no new ADR, and "takes a new ADR" reads as if the repo gates the master (F2) |
| ADR 0002 | Page text stays at AA; nothing suggests 3:1 for text ✓. "The brand palette doesn't change" is right but vague, because `tokens.json` already has a `white` surface value. Say that pure black and pure white don't join the palette (F10) |
| ADR 0003 | Black and white files are pending and not named as if they exist ✓ |
| Glossary | Brand resources, design system, mark, background, clear space and trade partner are used correctly ✓. Gold deep (color) is capitalized and gold deep (colorway) lowercase, which matches the glossary's own usage ✓. "Pure black" and "pure white", never "Ink" or "Paper" as black or white ✓ |
| README draft (R5, R6) | **Agrees on:** Start here, who may use, joint layouts approved by the studio, the 3:1 rule and its off-list check, the change record, retirement and provisional numbers. **Disagrees on:** (a) R6 Colors adds "Any other color, including a material's own finish, needs Allison's or Canyon's approval", which wasn't decided (B1). (b) R6 "Use them as supplied" adds a type-set wordmark exception the ADR doesn't record (B2). (c) R6 says "a new or changed mark", while the draft ADR says "new, changed or retired" (F4). (d) R5 excludes Tan as well as Paper 2 for two-tone and gold deep marks; the draft names only Paper 2 (F7). (e) R5 adds the change record, so the draft's "not yet built" is false at acceptance (F3) |

---

## 5. Durability and tone

- **Dates quickly:**
  - "28 marks": the count changes when a mark is added or retired (F14).
  - "not yet built" (F3).
  - "Its README update lands before or with this ADR": a one-time step, and it names a file rather than the design system (folded into F2).
- **Holds up:** no provisional numbers, no tool names (no Figma, claude.ai or Vercel), and WCAG 2.2 is cited as the version that applies today. "Set in the high-fidelity prototype" names a project phase, but it will still read correctly as history.
- **Legal register:** no "shall", "license", "authorized" or trademark claims ✓. "No use may imply" leans toward contract language. "Suggest" is plainer and matches the README (F11).

---

## 6. Findings

Severity: **Blocking** means the owner must decide before approving. **Medium** means it's wrong or contradictory as written. **Low** means a fidelity or clarity gap. **Nit** means polish. Every "old" string is copied from `adr-2-draft.md`.

### Owner decisions (blocking for approving the ADR and README together)

**B1 · The material-finish color exception.** Decision 1 leaves out the research's last Colors sentence. The draft ADR leaves it out too, correctly. But README R6 Colors includes it: "Any other color, including a material's own finish, needs Allison's or Canyon's approval for that job." Pick one:
- **Drop it** (recommended, because it matches decision 1). Remove that sentence from README R6. The ADR in section 7 needs no change.
- **Keep it.** Add add-in A (section 8) to the ADR.

**B2 · The type-set wordmark exception (README open question 1).** README R6 "Use them as supplied" says: "The one exception is the type-set wordmark, for live elements on our own websites." That's a deliberate exception to an adopted rule, and it's not among decisions 1–8. A future reader would wonder why the site retypes a mark the rules say never to retype. Pick one:
- **Retire type-set:** no ADR change.
- **Keep the exception:** add add-in B (section 8).

Either way, the type-set descriptor in `gold` (2.55:1) has to go, because it fails the 3:1 floor (README W2).

**B3 · The glyph recolored in code (README open question 2).** The Glyph component README sets the glyph in `navy-deep` on tan and `ink` on gold. Neither is one of the glyph's four colorways, so both break "no recoloring". README G2, which drops them, is labeled only "recommended". Pick one:
- **Approve G2** together with the ADR.
- **Approve those two colors as new glyph versions.** They then become marks, with files and change-record entries.

Either way, no ADR change is needed. But if neither happens, the design system contradicts the ADR on the day it's accepted.

### Medium

**F1 · Imports research wording you changed or didn't adopt.** The research's section 1 wording includes three things you changed or left out:
- "[the owner]", a single approver;
- "One mark per background is labeled the default";
- the Colors exception for materials.

Section 2's co-branding wording also adds "unless the studio agrees otherwise".
- Old: `We adopt one set of usage rules: the four as reworded in [the research](../research/brand-kit-ground-rules.md), plus the ones it found missing.`
- New: `We adopt one set of usage rules: [the research's](../research/brand-kit-ground-rules.md) rewording of the four, plus the rules it found missing, adapted as below.`

**F2 · "Wins where they differ" against "takes a new ADR"; the README step dates; where the "use it for" lines live.** Both consequences are rewritten so that the design system's wording wins (0001), and a change to the fixed choices also gets an ADR. The new text also says outright that the "use it for" lines and backgrounds are kept in the design system, not invented on the site (README open question 4).
- Old: `- **The design system goes first here too.** Its README update lands before or with this ADR, and wins where they differ. The sync ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)) must carry each mark's "use it for" line and backgrounds.`
- New: `- **The design system leads.** It gets every change first and keeps each mark's "use it for" line and backgrounds for the sync ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)) to carry. Its wording wins over this record.`
- Old: `- **Changing the 3:1 floor, the approvers or who may use the marks takes a new ADR.** Sizes, wording and pictures change in the design system.`
- New: `- **Changing the 3:1 floor, the approvers or who may use the marks** also needs a new ADR. Sizes, wording and pictures change in the design system alone.`

**F3 · "Not yet built" is false at acceptance, and the bottleneck line contradicts the rejected option.** README R5 adds the change record, and the README lands first or together with the ADR. Separately, "A founder is a bottleneck" sits awkwardly beside "so requests don't wait on one person".
- Old: `- **A founder is a bottleneck** for one-off requests, and with two approvers the design system's approval record, not yet built, is the only guard against inconsistent calls.`
- New: `- **The founders are a bottleneck** for one-off requests, and with two approvers, the design system's approval record is the only guard against inconsistent calls.`

### Low

**F4 · "Retired" goes beyond decision 3, and README R6 says "a new or changed mark".**
- Old: `approves a new, changed or retired mark.`
- New: `approves a new or changed mark.`
- If you want retirements to need a founder too, use add-in C in both files.

**F5 · The contrast fallback drops "approved".** Decision 1 says "the approved version with the most contrast". That rules out homemade higher-contrast versions.
- Old: `Elsewhere, the highest-contrast version is checked, and below 3:1 a tile is used or the mark moves.`
- New: `Elsewhere, the approved version with the most contrast is checked; below 3:1, the mark moves or a tile replaces it.`

**F6 · The two-tone larger minimum (decision 1) is missing.** This also adds the link from F16.
- Old: `- **Not decided here:** minimum sizes and the clear-space unit (set in the high-fidelity prototype), the black and white files and their names ([issue #2](https://github.com/compass-design-studio/brand-site/issues/2), [0003](./0003-mark-file-naming-convention.md)), and where the rules are mastered long-term.`
- New: `- **Not decided here:** minimum sizes (larger for two-tone marks) and the clear-space unit, set in the high-fidelity prototype; the black and white files ([issue #2](https://github.com/compass-design-studio/brand-site/issues/2), [0003](./0003-mark-file-naming-convention.md)); and where the rules are mastered long-term ([research](../research/usage-rules-source-of-truth.md)).`

**F7 · Tan is missing.** Gold deep on Tan is 2.74:1 (recomputed), and README R5 excludes it.
- Old: `Two-tone and gold deep marks can't sit on Paper 2 (2.91:1), and two-tone print needs a proof, since Gold deep is only 3.18:1 on Paper.`
- New: `Two-tone and gold deep marks can't sit on Paper 2 (2.91:1) or Tan (2.74:1), and two-tone print needs a proof (Gold deep is 3.18:1 on Paper).`

**F8 · Fixes a page layout that isn't decided.** The logo display options are still to be chosen in the prototype.
- Old: `Brand resources starts with the most used pair, not a "primary" mark.`
- New: `"Start here" is the most used pair, not a "primary" mark.`

**F9** is folded into F2: the "use it for" lines are kept in the design system.

**F10 · "The brand palette doesn't change" is vague,** because `tokens.json` already has a `white` surface value.
- Old: `for one-color jobs, and no recoloring. The brand palette doesn't change ([0002](./0002-page-text-meets-wcag-aa.md)).`
- New: `for one-color jobs; no recoloring. Neither joins the brand palette ([0002](./0002-page-text-meets-wcag-aa.md)).`

### Nit

**F11 · Register.**
- Old: `Anything sold needs our approval; no use may imply we endorse another business.`
- New: `Anything sold needs our approval, and no use may suggest we endorse another business.`

**F12 · Decision 5's wording.**
- Old: `about equal size, never merged`
- New: `about equal visual size, never merged`

**F13 · "Default" comes back in.**
- Old: `Rejected: a default, stated uses and a contrast tiebreaker keep large kits usable.`
- New: `Rejected: a starting pair, stated uses and a contrast tiebreaker keep large kits usable.`

**F14 · The count dates.**
- Old: `Brand resources offers 28 marks publicly, mostly to people who aren't designers.`
- New: `Brand resources offers nearly 30 marks, mostly to non-designers.`

**F15 · Not house style.** Delete the first line, `<!-- docs/adr/0004-mark-usage-rules.md -->`.

**F16 · Link the mastering research.** The brief said to link it only if it existed. It does now, as of 21 October 2026. Included in F6.

**F17 · Length.** Accepted; see section 3.

**Owner check (not blocking).** "Rejected so requests don't wait on one person" is the brief's guess at your reason. Your Q30 answer ("Either Allison or myself") gave none. Confirm it, or give the real reason.

---

## 7. Final recommended ADR text

Save as `docs/adr/0004-mark-usage-rules.md`. All fixes F1–F16 are applied. It assumes B1 is "drop the exception" and B2 is "retire type-set". If you decide either the other way, apply add-in A or B from section 8. Following 0001, publish the README update to the design system before or together with this file.

```md
# Marks follow one set of usage rules; only a founder adds or changes a mark

Brand resources offers nearly 30 marks, mostly to non-designers. Our four draft ground rules left out who approves a mark, photos and other companies' logos. We adopt one set of usage rules: [the research's](../research/brand-kit-ground-rules.md) rewording of the four, plus the rules it found missing, adapted as below. The design system holds the wording ([0001](./0001-design-system-artifact-is-the-master.md)), and Brand resources shows the rules visually.

## What this decides

- **3:1 contrast, approved backgrounds.** Every color in a mark keeps at least 3:1 against what's directly behind it, our own rule since WCAG 2.2 [exempts logos](https://www.w3.org/TR/WCAG22/#contrast-minimum). Each mark lists its approved backgrounds. Elsewhere, the approved version with the most contrast is checked; below 3:1, the mark moves or a tile replaces it.
- **Brand colors only, plus pure black and pure white** for one-color jobs; no recoloring. Neither joins the brand palette ([0002](./0002-page-text-meets-wcag-aa.md)).
- **Either founder,** Allison Browning or Canyon Browning, approves a new or changed mark. The design system gets it first and records who approved it. Nobody else makes one-off versions.
- **Who may use the marks:** employees and contractors for studio work; trade partners only to identify work with or for the studio. Anything sold needs our approval, and no use may suggest we endorse another business. Beside another company's logo: about equal visual size, never merged, joint layouts approved by the studio.
- **Every mark is labeled** with what it's for and its backgrounds. "Start here" is the most used pair, not a "primary" mark.
- **Not decided here:** minimum sizes (larger for two-tone marks) and the clear-space unit, set in the high-fidelity prototype; the black and white files ([issue #2](https://github.com/compass-design-studio/brand-site/issues/2), [0003](./0003-mark-file-naming-convention.md)); and where the rules are mastered long-term ([research](../research/usage-rules-source-of-truth.md)).

## Considered options

- **Contrast in words only,** as 8 of 12 brand guides do; none we read gives a number. Rejected: a sign shop can't check "enough contrast".
- **One approver,** as the research proposed. Rejected so requests don't wait on one person.
- **No co-branding,** as 3 of 12 guides require. Rejected: job-site signs are the use trade partners most likely need.
- **A short curated kit.** Rejected: a starting pair, stated uses and a contrast tiebreaker keep large kits usable.

## Consequences

- **The design system leads.** It gets every change first and keeps each mark's "use it for" line and backgrounds for the sync ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)) to carry. Its wording wins over this record.
- **Changing the 3:1 floor, the approvers or who may use the marks** also needs a new ADR. Sizes, wording and pictures change in the design system alone.
- **Stricter than WCAG.** Two-tone and gold deep marks can't sit on Paper 2 (2.91:1) or Tan (2.74:1), and two-tone print needs a proof (Gold deep is 3.18:1 on Paper).
- **The founders are a bottleneck** for one-off requests, and with two approvers, the design system's approval record is the only guard against inconsistent calls.
```

497 words by `wc -w`, about the same as the draft's 496.

---

## 8. Add-ins, if an owner decision goes the other way

**A · Keep the material-finish exception (B1).** Replace the Colors bullet with:
```md
- **Brand colors only, plus pure black and pure white** for one-color jobs; no recoloring. Neither joins the brand palette ([0002](./0002-page-text-meets-wcag-aa.md)). Any other color, such as a material's own finish, needs a founder's approval for that job.
```
Then make README R6 say "a founder's approval" or "Allison's or Canyon's approval" (it already does) and leave it in.

**B · Keep the type-set wordmark exception (B2).** Insert after the Colors bullet:
```md
- **One exception to using marks as supplied:** the wordmark may be set in live type on our own websites, in one of its colorways. The descriptor is never set in type.
```

**C · Retirements need a founder too (owner check on F4).** In the ADR, change `approves a new or changed mark.` to `approves a new, changed or retired mark.`. In README R6, change `Only Allison Browning or Canyon Browning approves a new or changed mark` to `Only Allison Browning or Canyon Browning approves a new, changed or retired mark`.

---

## 9. Follow-ups outside the ADR (not edited)

- **Glossary, Colorway entry.** It puts two-tone and gold deep "for light backgrounds" and the light colorways "for dark backgrounds and photos". Under the approved backgrounds, neither is quite right (Paper 2 and Tan fail; light areas of photos take navy ink). Align it once the README's approved-background lists are confirmed (README open question 3).
- **Glossary, "usage rules".** The term isn't defined. The brief proposed adding it, mentioning once that the research calls them "ground rules".
- **When black and white files exist (issue #2).** ADR 0003's six colorway words and the glossary's "six color treatments" each need one more word.
- **If the mastering research leads to Figma mastering anything** (its current recommendation is Figma for scenes only), that needs its own ADR, because 0001 names the design system as master.
- **"Use it for" lines.** Until they exist in the design system (README open question 4), the first consequence describes a target, not the current state. Add them when the prototype settles the captions.

---

## Sources

- W3C, WCAG 2.2, SC 1.4.3 and the logotype exception (anchor checked 21 October 2026): https://www.w3.org/TR/WCAG22/#contrast-minimum
- Olaf Zimmermann, "How to review Architectural Decision Records (ADRs) — and how not to", 5 April 2023, review criteria, as summarized in the brief: https://www.ozimmer.ch/practices/2023/04/05/ADRReview.html
- GitHub issues, read with `gh issue view`: #1 "Keep Brand resources in sync with the Compass Design System artifact" (https://github.com/compass-design-studio/brand-site/issues/1); #2 "Research: print-ready brand files and a print-friendly brand kit", which covers black one-color versions and print minimums (https://github.com/compass-design-studio/brand-site/issues/2)
- Local: `docs/research/brand-kit-ground-rules.md` (sections 1, 2, 3, 4.1, 4.5), `docs/research/usage-rules-source-of-truth.md` (section 1), `docs/adr/0001`–`0003`, `docs/GLOSSARY.md`, `docs/prototype-options.md`, `docs/reviews/2026-10-21-ground-rules/adr-1-brief.md`, `adr-2-draft.md` and `readme-1-draft.md`, plus the design system copy's `README.md` and `tokens.json` (read only)
