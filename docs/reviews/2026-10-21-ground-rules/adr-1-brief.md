# ADR 0004 brief: usage rules for marks

ADR agent 1 of 3 · 21 October 2026 · for the drafting agent (2), the auditing agent (3) and Canyon

**Read in full:** `docs/research/brand-kit-ground-rules.md`; ADRs 0001–0003; `docs/GLOSSARY.md`; `docs/prototype-options.md`; the ADR format guide (`mattpocock-skills/.../domain-modeling/ADR-FORMAT.md`); the design system copies of `README.md`, `tokens.json`, `assets/Logos/README.md`, `assets/Tiles/README.md`, `components/Glyph/README.md` and `components/Wordmark/README.md`; GitHub issues #1 and #2. ADR practice sources are listed at the end, all read 21 October 2026.

---

## Summary

- **Fit:** The rules as a whole are reference material and belong in the design system README. The *decision to adopt them*, and a handful of choices inside them, pass all three ADR tests: hard to reverse, surprising without context, and a real trade-off. ADR 0004 should record that decision and those choices. It should point to the design system for the wording, not repeat it.
- **Decision in two sentences:** see section 3.
- **Shape:** `0004-mark-usage-rules.md`. A title that states the decision, one opening paragraph, a short "What this decides" list, then "Considered options" and "Consequences". 350–450 words, no more than 500. That is a little longer than 0003 (306 words) because the ADR covers more ground.
- **Before the ADR can be final,** Canyon needs to settle four open points (section 9). Two of them are places where the design system's own components already break the new rules.

---

## 1. What ADR practice says

| Source | What it says that applies here |
|---|---|
| Michael Nygard, "Documenting Architecture Decisions" (Cognitect, 15 Nov 2011) | One decision per short record, with its forces and consequences. The sections are Title, Context, Decision, Status and Consequences. Use full sentences in active voice ("We will…"), written as a conversation with a future reader. Keep it to one or two pages. List every consequence: positive, negative and neutral. A reversed decision isn't edited; a new record supersedes it. The reason to write one: so nobody has to wonder what the team was thinking. |
| Martin Fowler, "Architecture Decision Record" (bliki; the page was dated 24 March 2026 when read) | Lead with the decision and put the detail after it. Ideally about a page. Record the serious alternatives with their pros and cons, your confidence, and what would prompt a rethink. Don't edit an accepted ADR; supersede it. Short decision records are useful beyond software. ADRs that span more than one codebase sit awkwardly in a single repo. ADR 0003 already accepted that trade-off for brand-wide decisions. |
| adr.github.io (the ADR organization) | An ADR records one decision and why it was made. ADR use can extend to design decisions and others. The project's set of ADRs is its decision log. |
| MADR 4.0.0 (adr.github.io/madr, released 17 Sep 2024) | The title names the problem and the chosen solution. The sections are context, considered options, decision outcome and consequences. "Confirmation" (how compliance is checked) and "More information" (when to revisit) are optional. Files are named `NNNN-title-with-dashes.md`. Status values: proposed, accepted, rejected, deprecated, superseded. |
| Olaf Zimmermann, "How to create ADRs — and how not to" (ozimmer.ch, 3 Apr 2023) | Anti-patterns that matter here. **Blueprint or Policy in Disguise:** the ADR reads like a law or a cookbook rather than a factual record. **Mega-ADR** and **Novel/Epic:** a whole design document squeezed into one ADR. **Free Lunch Coupon:** only harmless consequences are listed. **Dummy Alternative:** an option invented to lose. **Sales Pitch:** adjectives in place of evidence. Keep the length in proportion to the decision, and say how confident you are. |
| Olaf Zimmermann, "How to review ADRs — and how not to" (ozimmer.ch, 5 Apr 2023) | The review checklist asks: Are the options realistic? Are both good and bad consequences stated objectively? Can the decision be acted on and traced to a need? Is there a validity period or a review date? Is the wording free of vague, subjective terms? |
| House style (ADR-FORMAT.md and ADRs 0001–0003) | Write an ADR only when the decision is hard to reverse, surprising without context and a real trade-off. Include "Considered options" only when the rejected choices are worth remembering. Include "Consequences" only when they aren't obvious. "The explicit no-s are as valuable as the yes-s." 0001–0003 have no Status or date frontmatter. Their titles are statements, written in sentence case. Each has one plain opening paragraph, then two to four short sections. |

**What this means for 0004:** a factual record of what we chose and why, written in "we" and the present tense like 0001–0003. Not a rulebook: the rules themselves, written to "you", go in the design system README. Include at least two honest downsides, and record only alternatives that were really on the table.

---

## 2. Is a set of brand rules a good fit for an ADR?

**Partly. As a whole, no.** A full rule set is the "policy in disguise" Zimmermann warns about, and most of its lines are ordinary practice. For example, 12 of 12 guides forbid altering the logo, and 11 of 12 cover clear space. Nobody will wonder why we have those. They also change easily: the don'ts pictures, the wording and the size values will all be adjusted.

**The adoption decision and six choices inside it do qualify.** Canyon sees an ADR as concrete and mostly irreversible, and these choices fit that view:

| Choice | Hard to reverse | Surprising without context | Real trade-off |
|---|---|---|---|
| **A number for contrast:** 3:1 for every color in a mark against what's directly behind it | It decides which colorways exist and which backgrounds each of the 28 marks is approved for. | WCAG 2.2 exempts logos from contrast, and 0 of 12 guides publish a number. | 8 of 12 require contrast in words only. |
| **Approved backgrounds plus a check** for off-list places (photos, a trade partner's sign), with a tile as the fallback | It is printed on every mark's card. | Sources split between a fixed list and a contrast test; we use both. | List versus test (research 4.1). |
| **Brand colors only, plus pure black and pure white** for one-color jobs; never recolor | Once trade partners embroider and print in black or white, it can't be called back. | Black isn't a brand color (issue #2), and the glossary says Ink is "not black". | Keeping one-color work in Ink versus allowing black. Issue #2 left this open. |
| **Either founder approves** a new, changed or retired mark; the design system first; the design system records who approved it; nobody else makes one-off versions | It sets the workflow for every future mark, and trade partners will rely on it. | The research proposed a single owner. | One approver versus two. |
| **Who may use the marks, and beside other logos:** trade partners only to identify work with or for the studio; about equal size beside another company's logo, never merged, joint layouts approved | Permission published on a public site is hard to withdraw once signs are printed. | 3 of 12 forbid co-branding outright. | Forbid it versus allow it with rules. |
| **Every mark says what it's for and which backgrounds it goes on;** the page leads with the most used pair, not a "primary" mark | It is the reason the full set of 28 marks stays. | Most kits name a primary (8 of 12). | A curated short kit versus the full kit with labels. |

**Reference material for the design system README, not the ADR:**
- The exact wording of each rule, written to "you".
- The list of don'ts and their pictures.
- Clear-space unit and values, and minimum sizes in px and mm, including the larger one for two-tone marks.
- Each mark's approved backgrounds and "use it for" line.
- The contrast table.
- Detail on photos and busy backgrounds.
- "The glyph is the A in COMPASS only."
- The co-branding specifics (how much clear space goes between the logos).
- The list of retired marks.

A test for the drafter: if a sentence would need editing whenever the README wording changes, it belongs in the README.

---

## 3. What ADR 0004 should decide

> Compass marks follow one set of usage rules, worded in the design system and shown visually on Brand resources: every color in a mark keeps at least 3:1 contrast with what's directly behind it, marks use brand colors only (plus pure black and pure white for one-color jobs), and every mark says what it's for and which backgrounds it goes on. Only a founder, Allison Browning or Canyon Browning, adds, changes or retires a mark; it goes into the design system first, which records who approved it, and nobody else makes one-off versions.

Who may use the marks, and the stance on other companies' logos, go in the "What this decides" list rather than in this core sentence.

---

## 4. What it should cite

Keep citations few, like 0003 (which cites its research file once).

- **`docs/research/brand-kit-ground-rules.md`**, once, as the evidence. Cite no more than four tallies, and give each with its sample ("of 12 brand guides"):
  - 0 of 12 publish a contrast number; 8 of 12 require contrast in words.
  - 12 of 12 forbid altering a logo or making your own.
  - 8 of 12 name a default mark.
  - 8 of 12 cover co-branding, and they disagree: 3 forbid it.
  - Optional: 8 of 12 offer black.
- **WCAG 2.2's logotype exception,** one clause with one link (https://www.w3.org/TR/WCAG22/#contrast-minimum). The point is that 3:1 is the studio's own rule, not a WCAG or legal requirement. The Understanding document for 1.4.11 (https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) recommends offering a logo version with enough contrast, which is why a rule helps. Link one of these, not both.
- **ADR 0001:** the design system holds the wording, gets the change first, and wins when the two disagree.
- **ADR 0002:** page text still follows WCAG AA, and the brand palette itself doesn't change.
- **ADR 0003:** mark names, and the six colorway words that black and white files would add to.
- **Issue #1** (the sync must carry the rules) and **issue #2** (the black and white files, and print minimums).
- **`docs/prototype-options.md`, item 22,** only if the drafter needs to point to the visual usage section. Link `docs/research/usage-rules-source-of-truth.md` only if that file exists when the ADR is drafted. Today it doesn't.

**Don't cite:**
- The naming audit's "9 of 13 offer black" (used in issue #2) beside the ground-rules research's "8 of 12". They are different samples.
- Any provisional size or clear-space number.

---

## 5. Considered options worth recording

Record four, one or two lines each. All four were genuinely on the table, so none is a dummy alternative.

1. **Contrast in words only,** as most guides do (8 of 12; none publishes a number). Rejected: "enough contrast" isn't something a sign shop or contractor can check, and a number makes each mark's list of backgrounds testable. *The most important one: it is the deliberate departure from common practice.*
2. **One approver,** as the research wording ("[the owner]") proposed. Rejected in favor of either founder, so requests don't wait on one person. The approval record in the design system keeps the history clear.
3. **No co-branding at all,** as Spotify, Stanford and LinkedIn require (3 of 12). Rejected: a builder's job-site sign is the use trade partners are most likely to need.
4. **A short curated kit instead of rules.** Rejected: the full 28 marks stay. No source warns against offering many colorways, and the sources keep large sets usable with a default, stated uses and a contrast tiebreaker (research section 3).

Optional fifth: **keep one-color work in Ink** (issue #2's alternative). Rejected because single-color printing, embroidery and vinyl usually call for black or white. Include it only if Canyon agrees that this settles the rule part of issue #2.

Skip:
- "Primary" versus "most used": a naming preference. The design system README already says "Most used".
- A list of backgrounds versus a test: fold it into option 1.
- Splitting the rules across several ADRs: Canyon asked for one, and the choices were made together.

---

## 6. Non-obvious consequences

Rank them and keep five or six. Include at least two downsides so the ADR doesn't become a Free Lunch Coupon.

1. **The design system first applies to these rules too.** The README update is published to the design system before or together with this ADR. If the ADR's summary and the README's wording ever differ, the design system wins. The sync in issue #1 must carry the rules, plus each mark's "use it for" line and approved backgrounds. In practice that means keeping them per mark in the design system, not only as prose.
2. **What needs a new ADR, and what doesn't.** A new ADR is needed to change the 3:1 floor, the approvers, or who may use the marks. A design system edit is enough to change minimum sizes, the clear-space unit, wording or pictures. This matches Canyon's view of an ADR as the fixed part, and it keeps the provisional numbers out of the ADR.
3. **Downside: stricter than WCAG in practice.** Two-tone and gold-deep marks aren't approved on Paper 2 (2.91:1), so Brand resources' own Paper 2 bands use navy ink versions. Gold deep clears 3:1 on Paper by only 0.18, so printed two-tone pieces need a proof. The site's header mark is a link, so it uses a high-contrast version, as the W3C advises (research 4.1).
4. **Downside: a founder is now a bottleneck** for every one-off request. With two approvers, the design system's record of who approved what is the only guard against inconsistent decisions. That record and a retired-marks list don't exist in the design system today.
5. **Black and white are allowed, but no files exist yet** (issue #2). When they're made, ADR 0003's six colorway words and the glossary's "six color treatments" each need one more word. Pure black and pure white are not added to the brand palette, which keeps ADR 0002 intact.
6. **Existing design system guidance has to be brought into line** (section 9, items 2 and 3). Today it recolors the glyph in code and sets the type-built wordmark's descriptor in gold at 2.55:1.

Optional, after MADR's "More information" and Fowler's "what would prompt a rethink": one line on when to revisit. For example: once the high-fidelity prototype sets the numbers, or if the studio hires someone to look after the brand. Leave it out if it pushes the ADR past 500 words.

---

## 7. File name, title, structure and length

- **File:** `docs/adr/0004-mark-usage-rules.md`. It parallels `0003-mark-file-naming-convention.md`. Alternative: `0004-usage-rules-for-marks.md`.
- **Term:** "usage rules", as on the site ("Usage rules" drawer, prototype item 22) and in Canyon's Q31. Mention once that the research calls them "ground rules". The glossary has neither term; adding one is a follow-up for Canyon, not part of this ADR.
- **Title:** state the decision, in sentence case.
  - Recommended: **"Marks follow one set of usage rules; only a founder adds or changes a mark"**
  - Alternative: "Usage rules for marks: 3:1 contrast, brand colors only, founder approval"
- **No frontmatter.** 0001–0003 have no Status or date line. Because Canyon approves before merge, the ADR lands as accepted.
- **Structure:**

```md
# Marks follow one set of usage rules; only a founder adds or changes a mark

One paragraph, 4–6 sentences:
- Context: 28 marks used by people who aren't designers, on a public site. The four draft rules
  didn't say who approves a mark, or how to handle photos and other companies' logos.
- Decision: the core sentences from section 3.
- Where the wording lives: the design system, for now its README, shown visually on Brand resources,
  with links to the research and to 0001.

## What this decides
6–8 one-line bullets, one per choice in the section 2 table. Last bullet:
"Not decided here: minimum sizes and the clear-space unit (set in the high-fidelity prototype),
the black and white files (#2), and where the rules are mastered long-term (being researched)."

## Considered options
4 bullets (section 5).

## Consequences
5–6 bullets (section 6).
```

- **Length:** 350–450 words; stop at 500.
- **Voice:** "we" and the present tense, plain and factual. Sentence case, middle dot as the separator, en dashes for ranges, no exclamation points. These match the design system's voice rules and 0001–0003.

---

## 8. Pitfalls

**Scope and form**
- **Restating the README.** Don't copy rule wording, the don'ts list, the backgrounds for each mark, the contrast table or the co-branding details. Link to the design system instead.
- **Locking in numbers that aren't final.** Leave out every px and mm value and "1 × the glyph's height". The ADR may say that minimum sizes are given in both px and mm and that two-tone marks get a larger one. The values themselves come later. 3:1 is final and belongs in the ADR. Cite one or two contrast ratios at most, as reasons.
- **Legal-sounding language.** Avoid "shall", "hereby", "license", "authorized in writing", "infringe", "sole discretion", and ™ or ®. Don't claim trademark status. Write permission in plain words, for example "Trade partners may use them only to…". The ADR records a studio decision; it is not a contract.
- **Policy in disguise.** No "you must" lists in the ADR. Rules written to "you" go in the README.

**Contradicting other decisions**
- **ADR 0001.** The repo "never invents a brand rule." Present the design system as the holder of the wording, updated first. Don't name the repo or Figma as the master. If the separate research on where to master the rules ends up recommending Figma, that needs its own ADR.
- **ADR 0002.** Don't suggest page text can drop to 3:1; page text stays at WCAG AA. Don't add pure black or pure white to the brand palette, since "the brand palette itself isn't changing."
- **ADR 0003.** The colorway list has six words. Don't name black or white files (for example `compass-wordmark-black`) as if they exist.
- **Issue #2.** The ADR settles only whether black and white are allowed. The files, their names and print minimums stay with #2.

**Glossary terms**

| Use | Not |
|---|---|
| Brand resources | "brand hub", "brand kit", "brand portal" |
| design system | "brand book", "style guide", "source of truth" |
| mark | "logo", when you mean one of ours |
| colorway | "variant", "color version" |
| background | "ground" |
| clear space | "padding", "exclusion zone" |
| trade partner | "partner" on its own, "vendor" |
| most used | "primary" (Canyon's preference) |

Ink is not "black" and Paper is not "white"; say "pure black" and "pure white" for the one-color exception.

**Facts**
- **3:1 is not a WCAG or legal rule.** WCAG exempts logos, and the 2010 ADA Standards exempt logos on signs. 3:1 is the studio's choice.
- **The design system does have a white.** Its tokens include `white` #ffffff, used as a card surface, though it isn't one of the ten brand colors the glossary names. Don't repeat the research's line that the palette "has no pure black or white". Just say "pure black and pure white".
- **"0 of 12" means none on the pages read.** "Silent" in the research doesn't mean the organization has no rule. Don't overstate it.

---

## 9. Open questions for Canyon before the ADR is final

1. **Exceptions for colors outside the palette.** The research wording for the Colors rule ends: any other color, including a material's own finish, needs the owner's approval for that job. Decision 1 in the task summary leaves that sentence out. For a residential studio (brass, engraved wood, etched glass, stone) this will come up. Keep it, with either founder approving, or drop it so the rule is strictly brand colors plus pure black and pure white?
2. **The glyph recolored in code.** The design system README's Marks section and the Glyph component allow a one-color glyph "in another color" with `fill="currentColor"`. Examples: navy deep on tan, ink on gold, light gold on navy. All pass 3:1 (7.39, 5.25 and 4.34:1), but none is one of the glyph's four colorways, and none of those backgrounds is on an approved list. That conflicts with "never recolor". Allow it as an exception for the studio's own web components, or move those components to existing colorways?
3. **The type-built wordmark's descriptor.** The Wordmark component sets "Design Studio" in gold on paper, which is 2.55:1 and below the new 3:1 floor. The SVG files use gold deep (3.18:1). Switch the type-built descriptor to gold deep, or record an exception for live type in the top nav and hero?
4. **Where retired marks are listed.** "Listed as retired" could mean only in the design system (the research wording) or also on Brand resources, where GitHub, for example, shows its deprecated logos so visitors can recognize them. The ADR only needs one clause, but it should be the right one.

Items 2 and 3 also belong to the README review agents, because the README update has to resolve them either way.

---

## Sources

**ADR practice** (read 21 October 2026)
- Michael Nygard, "Documenting Architecture Decisions", Cognitect, 15 November 2011: https://www.cognitect.com/blog/2011/11/15/documenting-architecture-decisions
- Martin Fowler, "Architecture Decision Record" (bliki): https://martinfowler.com/bliki/ArchitectureDecisionRecord.html
- ADR GitHub organization, home page: https://adr.github.io/
- MADR, Markdown Architectural Decision Records, version 4.0.0: https://adr.github.io/madr/
- ADR GitHub organization, AD practices index: https://adr.github.io/ad-practices/
- Olaf Zimmermann, "How to create Architectural Decision Records (ADRs) — and how not to", 3 April 2023: https://www.ozimmer.ch/practices/2023/04/03/ADRCreation.html
- Olaf Zimmermann, "How to review Architectural Decision Records (ADRs) — and how not to", 5 April 2023: https://www.ozimmer.ch/practices/2023/04/05/ADRReview.html
- Tried but not readable: Olaf Zimmermann, "ADR = Any Decision Record?" on Medium (HTTP 403): https://medium.com/olzzio/adr-any-decision-record-916d1b64b28d. The ADR organization's home page makes the same point, that ADRs extend beyond architecture.

**Standards** (for the ADR to cite)
- WCAG 2.2, SC 1.4.3 and the logotype exception: https://www.w3.org/TR/WCAG22/#contrast-minimum
- Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html

**Local**
- `docs/research/brand-kit-ground-rules.md` (sections 1, 2, 3 and 4.1–4.5)
- `docs/adr/0001-design-system-artifact-is-the-master.md`, `0002-page-text-meets-wcag-aa.md`, `0003-mark-file-naming-convention.md`
- `docs/GLOSSARY.md`, `docs/prototype-options.md` (items 5 and 22)
- Design system copies: `README.md` (Marks, Contrast), `tokens.json` (`white`, `gold`, `gold-deep`), `components/Glyph/README.md`, `components/Wordmark/README.md`, `assets/Logos/README.md`
- GitHub issues #1 (sync) and #2 (print files; black one-color versions)
- Contrast ratios for the component colorings were computed with the WCAG formula from `tokens.json` hex values.
