# Prototype options

Options to try when we prototype the final design of Brand resources. The baseline is the Claude Design prototype **Brand Page — Monograph v2**. Each option says what v2 does today, what to try instead, and why. Nothing here is decided until the prototype session settles it.

Related: [GLOSSARY.md](./GLOSSARY.md) for names, [adr/](./adr/) for decisions already made.

**The prototype** lives on the throwaway branch `prototype/brand-resources`, in `prototype/brand-resources/` (its README explains it). Every open choice below can be switched from its floating bar. To run it, check out that branch, run `python3 -m http.server 4310 --bind 127.0.0.1` from the repo root, and open http://localhost:4310/prototype/brand-resources/. The picks are recorded under "Decisions from the prototype" at the end.

## Structure and navigation

1. **Where the rules and usage guidance live.** Round 3: keep the page uncluttered and put guidance (contrast and readability, "use it for", clear space) behind a clickable element rather than adding text. Prototype a few versions, or swappable options, for approval:
    - v2's ⓘ button, rebuilt as a click-to-open toggletip (not a hover tooltip, which touch and keyboard users can miss).
    - A small "Usage" link on each card that opens a light panel.
    - For comparison, one short visible lead per section (v1's wording, trimmed).

    Decided in Round 4: prototype the inline "Usage" panel plus one short caption per version, and a second version (a click-to-open pop-up) to compare. You'll pick one. Make it look airy and on-brand: hairline borders, Paper sheet, a gold tick. Research (`docs/research/logo-display-patterns.md`, section 4) recommends an inline "Usage" disclosure (`<details>`) per card. It opens on click, works with keyboard and touch, and Ctrl-F still finds it when closed. Keep one caption of eight words or fewer visible per version. Use a toggletip only for optional one-line asides, and open every disclosure when printing.
2. **One navigation, not two.** v2 has a sticky top bar with eight section links *and* a row of eight index pills under the hero. Try keeping one: the pills, with the top bar cut down to the wordmark, "Logo files" and the request trigger; or the top bar, with the pills dropped.
3. **Which drawers start open.** Every collapsible panel starts closed (Usage rules, Pairings, Status colors, Type scale, Spacing scale, Corner radii, Shadows & rules, Text over images, Casing & punctuation). Try opening **Usage rules** by default; it's the most-needed detail on the page.
4. **Place of section 06.** Spacing, radius and shadows mostly serve web contractors. Try it as the last section, or folded into a single drawer, so employees reach imagery and examples sooner.

## Logo files

5. **Lay out a large kit without looking busy.** Decided in Rounds 2 and 3: the kit shows all 28 marks (Figma Brand assets; `public/logos/`). The main requirement is an airy page, not a busy one. The research (`docs/research/logo-display-patterns.md`, sections 2 and 3) found no brand portal that uses a logo background toggle. It pressure-tested your toggle idea against nine failure modes and wrote up four layouts:
    - **A · Paired plates** (recommended). Each form once, as one plate with its main light version on Paper beside its main dark version on Ink. Other colorways and usage sit in disclosures. Tiles and bars get their own row.
    - **B · Background tabs.** Your toggle, with the fixes: it swaps files, not just the backdrop; a "Most used" pair stays above it; tiles and bars sit outside it; each card has its own download links.
    - **C · One card per form** with colorway swatches.
    - **D · Most-used pair plus a file index.**

    Decided in Round 4: prototype A and B; you'll choose between them."

    In every layout, lead with the two most-used marks, the navy ink wordmark and the light gold wordmark (Round 3), and give each card a "use it for" note behind the guidance control (option 1).
6. **Add the light gold wordmark.** It's on the live site's home page, but the package has no card or files for it.
7. **Restore the print minimums.** v1 gave 32mm (wordmark) and 6mm (glyph) next to the pixel minimums, plus "Nothing — type, rules, photo edges — enters it" for clear space. v2 dropped both; printers and sign shops need them.
8. **Fix the stacked lockup caption.** It's captioned "Square formats, social, stamps," but the art is about 3.6 times wider than tall. Try "Signage, stationery, covers."
9. **Make "Download logos" download.** The hero button only scrolls to section 01. Try a zip of every mark, a zip per form, or relabel it "See logo files."
10. **Even out the tile card.** Today the SVGs download by clicking the tiles and the PNGs by buttons. Every mark will have SVG, PNG and PDF, so try the same download control on every card.

## Usage rules

22. **A visual usage section** (decided in Round 4). The ground rules get their own section on Brand resources, shown visually rather than as a block of text: do and don't pictures, clear-space and minimum-size diagrams, the approved backgrounds for each mark, and how to sit next to another company's logo. Prototype a few versions. Once one is chosen, build a matching usage section in the Figma file. Decided in Round 4 (ADR 0004): the design system README holds the wording and numbers. The site draws most do-and-don't pictures from the mark files. The Figma file mirrors them and is the master only for realistic scenes. The approved backgrounds are on the Figma Playground board "For approval · Approved backgrounds (D4)". Also show one gold deep on Ink example for a visual check; it stays off the approved list for now.

## Color

11. **Add a role to each swatch.** Borrow the Spec Sheet's role column ("Navy deep: headings, link color"). Roles are what a contractor needs to apply the palette correctly.
12. **Label unverified CMYK values.** The CMYK values come from a straight formula, not a printer's proof. Until [issue #2](https://github.com/compass-design-studio/brand-site/issues/2) settles print values, try marking them "approximate," or leave CMYK off the page.
13. **Accessible labels** ([ADR 0002](./adr/0002-page-text-meets-wcag-aa.md)). Options for small eyebrows and captions now set in Gold or the pale caption grey:
    - Navy deep text.
    - Ink text with a short gold tick before it (the live site already draws a tick before eyebrows).
    - A darker gold kept for the site only, such as `#756833` (5.06:1 on Paper).

    Captions move from the pale grey to the mid grey on white cards (4.51:1).

## Request flow

14. **Trigger style.** The page close is meant to be "a short line and a single arrow link, never a filled button," but we want a button that opens a request form. The live site's own home close already uses a filled "View projects →" button, so it departs from that rule too. Options:
    - An arrow link ("Tell us what's missing →").
    - An outline button.
    - A filled button.

    Also try a second entry point in the top bar.
15. **The form: show several versions** (decided in Round 2: the prototype shows a few and you approve one). All three use a white sheet over an Ink scrim at 60% with no blur (the design system's modal scrim) and the design system's field and select styling. Each sends through Resend from `brand@compass-design.studio` (no mailbox needed) to both founders, with the reply address set to the sender (Round 3).
    - **A · Full form** (the Round 2 proposal). Name, Email, "I'm a…" (Employee / Contractor / Trade partner), Company (optional), "What do you need?" (A missing file / A correction / A question), Details. No uploads. Spam handled by a hidden trap field, a minimum fill time and server checks. No email back to the sender; an on-screen confirmation with "No newsletter, no spam — just a reply from the studio."
    - **B · Short form.** Name, Email, a message box, and three optional chips for the request type. The fewest fields; the studio sorts it out in the reply.
    - **C · Request type first.** Step 1 picks "A missing file," "A correction" or "A question." Step 2 asks only what that type needs: which file and what it's for, which section and what's wrong, or a free question.

## In situ

16. **Match the live site.** v2's website mock puts a paper wordmark over the gallery with "Design Studio" under it. The live site uses the light gold wordmark with no descriptor. Try matching it exactly, or use a real screenshot instead of a rebuilt mock.
17. **Instagram mock.** Use the real handle `compass_design.studio` (the mock says `compassdesignstudio`) and the avatar actually in use.
18. **Copyable email signature.** Employees are the main visitors. Try a "Copy signature" action that copies the signature as rich text for Gmail and Outlook, for each person or from name and title fields.

## Phones

19. **Responsive layout.** v2's grids don't adapt: the logo grid stays three columns and the type and icon splits don't stack. Try one column on phones, the design system's mobile menu (two-bar button at 900px and below, full-screen Ink sheet), and the drafting plate's top corners at 32px on phones (the design system's mobile value) instead of 60px.

## Imagery

20. **Real images.** The photography and watercolor frames are empty drop zones. For the prototype, pull candidates from the main site repo (`canyon-onehouse/compass-marketing-v1`, 83 images under `public/images/`, including the Hurricane Ranch exterior and the three home-gallery watercolors) and from the studio's second-brain repo (`compass-design-studio/org-brain-v1`), then propose a set for approval. v1 shows examples only, no downloads (Round 2).

## Footer

21. **No version number** (decided in Round 2). Drop "Brand resources · v1.0" from the hero and footer. If we keep a changelog, it lives in `docs/` on GitHub, not on the site.

## Decisions from the prototype

Canyon picked these on 21 October 2026 in the prototype (branch `prototype/brand-resources`), which now opens on them. Under [ADR 0001](./adr/0001-design-system-artifact-is-the-master.md), anything below that is brand wording or a brand number goes into the design system before the production site uses it. That covers the minimum sizes, the "use it for" lines and the two-tone and reversed notes.

| Item | Choice | Pick |
|---|---|---|
| 1 | Usage guidance | **Inline "Usage" disclosure** per plate (`<details>`), plus one visible caption of eight words or fewer per version. |
| 2 | Navigation | **Top bar with section links; no index pills.** With nine links, the bar folds into the two-bar menu below about 1080 px rather than the design system's 900 px; the label "Brand resources" beside the wordmark hides below 1240 px. |
| 4 | Spacing, radius & shadows | **Folded into one drawer**, "Spacing, radius & shadows · for web contractors", with no section number. |
| 5 | Logo files layout | **A · Paired plates.** |
| 5 (Q23) | Main pair for the lockups | **Navy ink + light gold**, the same as the wordmark and glyph. Two-tone and reversed get their own section (below). |
| 7, 22 | Minimum sizes | **The proposed final sizes** (table below). |
| 9 | Hero download button | **A zip per form**, from a "Download logos" menu: all 28 marks, wordmarks, horizontal lockups, stacked lockups, glyphs, tiles and bars. |
| 12 | CMYK values | **Left off the page** until [issue #2](https://github.com/compass-design-studio/brand-site/issues/2) settles print values. The page says print values come once proofed, and to ask the studio. |
| 13 | Small labels | **Ink with a short gold tick** before eyebrows and small labels. |
| 14 | Request trigger | **A filled button** (Ink) at the page close, **plus a second entry in the top bar** ("Request a file", outline). The design system's page anatomy says a page close is "never a filled button", so the design system needs updating first, or an ADR recording this page-level difference (ADR 0001). The 1080 px menu breakpoint in item 2 is the same kind of difference. |
| 15 | Request form | **C · Request type first.** Step 1: a missing file, a correction or a question. Step 2 asks only what that type needs, then name and email. |
| 16 | Website example | **A real screenshot** of compass-design.studio (desktop and phone). It needs retaking when the live site changes. |
| 18 | Email signature | **Fill in name and title**, with a live preview and "Copy signature" (rich text for Gmail and Outlook). |
| 22 | Usage rules section | **2 · Spec plates**: numbered plates for start here, clear space, minimum size, approved backgrounds (with the gold deep on Ink check), photos, other companies' logos (diagram and drawn job-site sign), don'ts, and colors and who may use the marks. |

**Minimum sizes (proposed, for the design system):**

| Mark | Navy ink, paper, light gold, reversed | Two-tone, gold deep |
|---|---|---|
| Wordmark | 120 px · 32 mm wide | 160 px · 40 mm wide |
| Horizontal lockup | 200 px · 50 mm wide | 260 px · 65 mm wide |
| Stacked lockup | 140 px · 36 mm wide | 180 px · 45 mm wide |
| Glyph | 24 px · 6 mm tall | 32 px · 8 mm tall (gold deep) |

The lockup sizes keep the descriptor's capitals at least about 5 px or 1.2 mm tall. Inside a tile there's no glyph minimum; a tile may fill a frame made for it, down to a 16 px favicon.

### Two-tone and reversed: a section for special moments

Canyon wants the two-tone and reversed marks on the site for special uses, especially flat designs with little imagery. Recommendation, now built into the prototype:

- **Where:** a "Two-tone and reversed · For special moments" section inside Logo files, after the four form plates and before tiles and bars. It's drawn on the full drafting plate (60/60/16 corners) so it reads as a feature, not a fifth form.
- **What it shows:** the two-tone stacked lockup on Paper beside the reversed one on Ink, three flat examples (a proposal cover, a title slide on Ink, a typographic social post), the notes below, and all six files with "All 6 · zip". The form plates' "more colorways" disclosures now list only gold deep and paper, and point to this section, so each file appears once.
- **Draft notes, for the design system:**
  - **Use them for** covers, title pages and slides, stationery, signage panels and typographic social posts: flat, type-led layouts where the gold glyph can carry the page.
  - **One per piece**, as its main mark. Running heads, footers and small repeats use navy ink or light gold.
  - **Two-tone on Paper or white. Reversed on solid Ink.** This narrows reversed, which the design system also approves on dark areas of photos; keep photos for light gold and paper.
  - **Large:** at or above the two-tone minimums above. Smaller, use navy ink.
  - **In print, proof two-tone first:** gold deep is only 3.18:1 on Paper (ADR 0004).
  - **Not for** photos, textures or watercolors behind the mark, Paper 2 or Tan (2.91:1 and 2.74:1), or everyday documents and small sizes.

### Settled without a choice

- **Item 3 (which drawers start open):** settled by item 22. The usage rules are now a visible section, not a drawer; the remaining drawers (pairings, status colors, type scale, casing, text over images) start closed.
- **Item 6:** the light gold wordmark has its own files and leads the logo section with navy ink.
- **Item 7:** the print minimums are back, in mm beside px, and the clear-space line "Nothing enters it" is restored.
- **Item 8:** the stacked lockup's use line is "Signage, stationery, covers." Its descriptor is still left-aligned in the files ([issue #3](https://github.com/compass-design-studio/brand-site/issues/3)).
- **Item 10:** every card has the same SVG · PNG · PDF links. The PNG and PDF files still need exporting.
- **Item 11:** each swatch shows its role.
- **Item 17:** the Instagram mock uses the real handle, `compass_design.studio`. **Still open:** which avatar the account uses. Neither repo records it, so the mock uses the light gold on Ink tile as a stand-in.
- **Item 19:** one column on phones, the two-bar menu with a full-screen Ink sheet, and 32 px drafting-plate corners on phones.
- **Item 20:** the imagery set is the Hurricane Ranch, Hickerson Home and Widner Residence renders (Hurricane Ranch first) for photography, and Harbor Line, Stone Meadow and the studio's drafting table for watercolor. Aubrey Place is left out, at Canyon's request.
- **Item 21:** no version number anywhere on the page.
