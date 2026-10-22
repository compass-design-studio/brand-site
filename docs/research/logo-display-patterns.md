# Showing about 30 logo versions without a busy page

Research for the **Logo files** section of Brand resources: how first-party brand portals show many logo versions, which accessible controls fit, and a pressure test of the owner's idea of switching the background so the page doesn't show every version at once. Every page was read on **20 October 2026**.

Related: [prototype-options.md](../prototype-options.md) (item 5 lists the layouts already noted, item 1 covers rules shown in pop-ups, item 9 the hero download), [brand-kit-naming.md](./brand-kit-naming.md) (the earlier audit), [GLOSSARY.md](../GLOSSARY.md) (colorways), [ADR 0002](../adr/0002-page-text-meets-wcag-aa.md) (page text contrast) and [ADR 0003](../adr/0003-mark-file-naming-convention.md) (file names).

## How to read this

- **Sources.** Only brand owners' own pages and W3C or WHATWG specifications. Each claim links to its source. Sentences marked *(judgment)* are design recommendations, not findings.
- **Method.**
  - Every portal page was downloaded as HTML so its controls, ARIA attributes and download links could be checked.
  - Shopify, Discord, Vercel, Tailwind, Dropbox, Twitch and Slack's asset library were also opened in a live browser to see hover states and what the downloads link to.
  - Hover and phone layouts were **not** tested on the other sites.
- **Core sample.** The 11 portals named in the brief: GitHub, Atlassian, Shopify, Spotify, Dropbox, Stripe, Slack, Mailchimp, Figma, MIT and UC Berkeley.
- **Supplementary.** Five more first-party pages added because they show something the core sample doesn't: Discord, IBM, Vercel, Tailwind CSS and Twitch.
- **Could not be used:**
  - OpenAI's brand page and GitLab's design site returned HTTP 403 (GitLab's redirected to a sign-in page).
  - These returned HTTP 404: Raycast press kit, Webflow brand, Notion brand, Wise Design logo, `brand.slackhq.com`, Dropbox `partner-info`, and the Lingo help article on asset background colors.
  - MIT's downloads need an MIT Touchstone login, so no MIT files were opened.
  - Slack's asset library opened with a cookie banner. It was left alone (nothing accepted or declined), and only the file list behind it was read.
- **Kit assumed** (from the [glossary][glossary]; check against the Figma inventory):
  - Four forms (glyph, wordmark, horizontal lockup, stacked lockup) in up to six colorways each, about 24 marks.
  - About 6 more marks that carry their own background: square tiles, wordmark bars and the email tile.
  - Each mark as SVG, PNG and PDF.

---

## 1. Summary

- **None of the 11 core portals uses a background or colorway toggle on its logos.** They do one of two things:
  - **Show each colorway on its intended background, all at once.** [Shopify][shp] pairs "Primary Logo" on light grey with "Inverted Primary Logo" on black. [MIT][mit-logo] groups its images under captions such as "White logo on the core palette background colors". [UC Berkeley][ucb] shows four captioned "color pairings".
  - **Show little and offer one zip.** [GitHub][gh], [Stripe][str] and [Figma][figma] each have a single download, and [Twitch][twitch]'s page is just a heading, one line of copy and a "Download ↓" button.
- **Light/dark switches do exist, but they switch the whole site, not the logos.** [GitHub][gh], [Atlassian][atl], [Vercel][vercel], [Tailwind][tw] and [Twitch][twitch] all have one. Tailwind ties its logo preview to that switch, and there the download breaks: in dark mode the page shows the white logotype, but clicking the preview downloads the dark-text SVG (checked in the page; see §5).
- **The dark-background version is separate artwork, not a recolored copy.**
  - [IBM][ibm] redraws its reversed 8-bar with thinner white stripes and blunter points.
  - [Mailchimp][mc] says its reverse version was designed specifically for dark backgrounds.
  - In Compass's own kit, "reversed" (Paper letters, Light gold glyph) is the dark counterpart of "two-tone" ([glossary][glossary]).
  - So a toggle must swap files, never just the color behind the same file.
- **Downloads are grouped by family more often than by file.**
  - **A zip per form:** [Shopify][shp] ("Download primary logos"), [MIT][mit-dl] (`MIT-logo.zip`, `Micro-MIT-logo.zip`), [Atlassian][atl] ("Download Atlassian (106.35KB)") and [Spotify][spo] ("Download Full Logo", "Download Icon").
  - **One zip for everything:** [Shopify][shp] ("Download all brand assets"), [GitHub][gh], [Stripe][str], [Vercel][vercel] and [Twitch][twitch].
  - **Formats labeled by use:** [UC Berkeley][ucb-kit] ("For Print", "For Digital") and [Mailchimp][mc] ("EPS or PNG files").
  - **Per-file buttons are rare.** The one example, [Discord][dis], shows them only on hover, and they have no accessible name.
- **Pick the control by what it changes** ([APG Tabs][apg-tabs], [APG Radio Group][apg-radio], [APG Switch][apg-switch], [APG Button][apg-button]):
  - **Tabs** if the switch shows a different set of files.
  - **A radio group** (it can be styled as a segmented control) if it changes how the same item is previewed.
  - **A switch** only for a single on/off setting.
  - **Not toggle buttons with `aria-pressed`** for a one-of-two choice.
  - **Never hover-only actions.** Discord's download links are hidden until hover and out of the keyboard's reach.
- **Put usage guidance in a disclosure, not a tooltip.**
  - The APG says tooltip widgets don't receive focus ([APG Tooltip][apg-tooltip]), and ARIA defines a tooltip as a description ([ARIA 1.2][aria-tooltip]).
  - The HTML Standard discourages relying on `title` tooltips because they leave out keyboard-only and touch-only users ([HTML title][html-title]).
  - A native `<details>` disclosure stays findable with Ctrl-F: the HTML Standard says find-in-page should search closed `<details>` and open the one that matches ([HTML find-in-page][html-fip]).
- **Logos are exempt from WCAG contrast minimums, but the page's controls are not.** Text that is part of a logo has no contrast requirement ([Understanding 1.4.3][u143]). A toggle's selected state is a user interface component, which needs 3:1 under [1.4.11][u1411]. By [ADR 0002][adr2]'s figures, Gold on Paper (2.55:1) can't be the only selected-state cue; Gold deep (3.18:1) passes.
- **Recommendation: prototype "Paired plates"** (Option A, §3). Each form appears once as a split plate: its main light-background version on Paper beside its main dark-background version on Ink. The other colorways are listed in a disclosure. This saves as much room as a toggle, hides nothing behind a mode, and both most-used marks are on screen from the start. Prototype the toggle itself (Option B, with the fixes in §2) next to it so the owner can compare directly.

---

## 2. Pressure test: the background toggle

**The idea, as understood.** A control above the logo grid switches between a light background and a dark one. Each lockup then shows in the version meant for that background, so the page shows half the kit at a time and teaches which version goes where.

### 2.1 Where it works

- **The colorways pair up cleanly.** Compass's six colorways split three and three by background ([glossary][glossary]):

  | For light backgrounds | For dark backgrounds and photos |
  |---|---|
  | Two-tone (Navy ink letters, Gold deep glyph) | Reversed (Paper letters, Light gold glyph) |
  | Navy ink | Paper |
  | Gold deep | Light gold |

  A switch can swap each light colorway for its dark counterpart with no gaps (for the four forms that come in all six).
- **The rule really is binary.** Brands state their color rule in two cases:
  - [Stripe][str]: slate and blurple on light backgrounds, white on dark.
  - [Spotify][spo]: black logo on light-colored backgrounds, white on dark.
  - [Shopify][shp]: the inverted logo is for "dark or busy backgrounds".

  A two-option control matches how people already think about it.
- **It teaches by showing.** The portals that show colorways put each one on the background it's meant for ([MIT][mit-logo], [UC Berkeley][ucb], [IBM][ibm], [Discord][dis], [Vercel][vercel], [Shopify][shp]). A switch does the same, one background at a time.
- **It halves what's visible.** About 12 colorway previews at once instead of about 24.

### 2.2 What breaks, and how to fix it

| # | Failure | Why it happens | Evidence | Fix |
|---|---|---|---|---|
| 1 | **Two-tone shows navy letters on Ink.** | If the switch only changes the color behind the artwork, a mark drawn for light backgrounds sits on a dark one. Two-tone has no dark version; reversed is a separate file. | IBM's reversed 8-bar is redrawn, not recolored ([IBM][ibm]). Mailchimp's reverse version was designed for dark backgrounds ([Mailchimp][mc]). | The switch swaps **which files** are shown (the table above), never just the backdrop. Each preview's background comes from its colorway, so a mark can't appear on the wrong one. |
| 2 | **A mark appears on a background it isn't meant for.** | Tiles, wordmark bars and the email tile carry their own background. Put them inside a switched grid and they sit on a page color that means nothing for them. Generic asset libraries make the opposite mistake. | Slack's asset library previews its "inverse" (white-wordmark) logos on light tiles, where the wordmark almost disappears (observed; [Slack DAM][slack-dam]). | Keep tiles, bars and the email tile in their own group outside the switch, always visible. Never preview a dark-background colorway on Paper or a transparency checkerboard. |
| 3 | **People don't realize more versions exist.** | Half the colorway marks are out of sight, and nothing says so. A visitor who lands on "Light" may never find light gold. Ctrl-F for "light gold" finds nothing while those cards are hidden. | Hidden content isn't searched: the HTML Standard's find-in-page section only reveals closed `<details>` and `hidden=until-found` ([HTML find-in-page][html-fip]). | Name both states in the control ("Light backgrounds", "Dark backgrounds & photos") and give counts ("3 colorways"). Keep a "Download all marks" zip outside the switch. Put the selected state in the URL (for example `#dark`) so a shared link opens the right set. |
| 4 | **The two most-used marks are never on screen together.** | The navy ink wordmark is for light backgrounds and the light gold wordmark for dark ones (brief), so any default state hides one of them. They also aren't counterparts: navy ink's counterpart is paper, and light gold's is gold deep. | Glossary pairing above. | Show a "Most used" pair above the switch, or order each state so its most-used mark comes first. |
| 5 | **What gets downloaded is unclear.** | A download control that sits outside the cards, or a preview that is itself a link, can deliver a file other than the one shown. | **Tailwind**, in dark mode: the visible image is `tailwindcss-logotype-white.svg`, but its link downloads `tailwindcss-logotype.svg`, whose text is dark `#0f172a` (checked in the page; [Tailwind][tw]). | Put the download links on each card, tied to that card's file. Use the colorway in each link's accessible name. Never make a switch change what a link downloads unless the link's visible label changes too. A set download says what it holds ("Download these 12 · zip"). |
| 6 | **The dark state is heavy.** | Twelve separate Ink cards on a Paper page read as a checkerboard of dark blocks: the "busy" the owner wants to avoid. *(judgment)* | n/a | In the dark state, draw the whole grid on one Ink plate, not 12 dark cards. Crossfade at the brand's 240ms, and swap instantly when `prefers-reduced-motion: reduce` is set ([Media Queries 5][mq5]; [Understanding 2.3.3][u233]). |
| 7 | **Photos are a third background.** | Dark colorways are "for dark backgrounds and photos" ([glossary][glossary]). A photo behind every mark is busy, and leaving photos out undersells the rule. | n/a | Keep two states. Show marks on photos in the existing In situ section ([prototype-options.md][proto] items 16–17), and mention photos in the dark state's label. |
| 8 | **Some forms don't come in all six colorways.** | A fixed three-by-four grid shows gaps if, say, the glyph has no two-tone version (unclear for the glyph on its own). | Inventory still to check. | Let rows hold fewer cards, with no placeholders. |
| 9 | **The control itself fails accessibility.** | Custom switches often rely on color alone, use the wrong role, or hide their state. | [APG Tabs][apg-tabs]; [APG Radio Group][apg-radio]; [Understanding 1.4.11][u1411]. | Use the patterns in §3, Option B. The selected state needs more than a color change and at least 3:1 contrast (Gold deep, not Gold, on Paper). |

### 2.3 Verdict

Keep the idea's goal: show each mark on the background it's meant for, and show less at once. Option A (Paired plates) gets there without the switch, and so avoids failures 3, 4, 5 and 6 by design. If the owner prefers the switch, build Option B, which adopts all nine fixes.

---

## 3. Prototype options

**How busy-ness is measured** (estimates for the logo section at desktop width, using the kit assumed above):
- **Previews:** mark images visible without clicking anything.
- **Controls:** controls always on screen.
- **Hidden state:** whether some marks are out of sight because of a mode the visitor must notice and change. Disclosures don't count, because their summary names what's inside.

### Option A: Paired plates ★ Recommended

```
LOGOS & MARKS                                    Download all marks · zip (size)
─────────────────────────────────────────────────────────────────────────────
Wordmark
┌─────────────────────────────────┬─────────────────────────────────┐
│                                 │█████████████████████████████████│
│        C O M P A S S            │██      C O M P A S S          ██│
│                                 │█████████████████████████████████│
└─────────────────────────────────┴─────────────────────────────────┘
 Navy ink · for light backgrounds   Light gold · for dark backgrounds & photos
 SVG · PNG · PDF                    SVG · PNG · PDF
 ▸ 4 more colorways: two-tone, gold deep, reversed, paper
 ▸ Usage: where to use it, contrast, clear space, minimum size
─────────────────────────────────────────────────────────────────────────────
Horizontal lockup     (same plate)
Stacked lockup        (same plate)
Glyph                 (same plate, narrower)
─────────────────────────────────────────────────────────────────────────────
Tiles & bars   [▣] [▣] [▣]  [▬▬▬] [▬▬▬]  [✉ ▭▭]   each with SVG · PNG · PDF
```

- **Visible by default:** each form once, as one plate split in two: on the left, its main light-background version on Paper; on the right, its main dark-background version on Ink. The wordmark plate comes first, so the two most-used marks (navy ink and light gold wordmarks) are the first thing on screen. Below the plates, one row of tiles, bars and the email tile, each shown as drawn.
- **Reaching the other versions:** a `<details>` under each plate, whose summary names what's inside ("4 more colorways: two-tone, gold deep, reversed, paper"). Opened, it lists one row per colorway: a small thumbnail on its correct background, the colorway name with "for light/dark backgrounds", and format links. Naming them in the summary keeps them discoverable, and Ctrl-F can find them even when closed ([HTML find-in-page][html-fip]).
- **Usage guidance:** a second `<details>` per plate, "Usage" (§4). Under each half, a caption of eight words or fewer naming the colorway and background, the way [Shopify][shp] captions each version.
- **What Download does:**
  - Each link downloads exactly the file it sits under, named per [ADR 0003][adr3] (for example `compass-wordmark-light-gold.svg`).
  - The plate's disclosure ends with "All 6 colorways · zip" (as [MIT][mit-dl] and [Shopify][shp] do per form).
  - The section header holds "Download all marks · zip" with its size (as [Shopify][shp] does; [Atlassian][atl] shows sizes on its buttons). The hero's "Download logos" uses the same zip ([prototype-options.md][proto] item 9).
- **On a phone:** each plate stacks, light half above dark half (as [Vercel][vercel] stacks its white and black panels). Format links stay visible with no hover needed. The tiles row wraps to three per line.
- **Accessibility:**
  - No custom widgets: headings, images, links and native `<details>`, which follows the [APG Disclosure][apg-disclosure] pattern with Enter and Space built in.
  - Image alt text names the mark and colorway ("Compass wordmark, light gold"; [Atlassian][atl] asks for the brand name in logo alt text).
  - Link names start with the visible text: "SVG, light gold wordmark" ([Understanding 2.5.3][u253] recommends putting the visible label at the start of the name).
  - Targets at least 24 × 24 px ([Understanding 2.5.8][u258]).
  - Give the Paper half a hairline frame so it reads as a plate on the Paper page *(judgment)*.
- **Busy-ness: low.**
  - Previews: about 8 plate halves plus about 6 tiles and bars, at modest size.
  - Controls: 3 quiet text links per half and 2 disclosures per plate.
  - Hidden state: none.
  - The repeating split plate gives the section one steady rhythm, which suits the drafting-plate motif *(judgment)*.

### Option B: Background tabs (the owner's toggle, with the fixes)

```
Show marks for  [ Light backgrounds ]  Dark backgrounds & photos   Download these 12 · zip
──────────────────────────────────────────────────────────────────────────────────────
             Navy ink ★          Two-tone             Gold deep
Wordmark     [ COMPASS ]         [ COMPASS ]          [ COMPASS ]
             SVG · PNG · PDF     SVG · PNG · PDF      SVG · PNG · PDF
Horiz. lockup  …                 …                    …
Stacked lockup …                 …                    …
Glyph          …                 …                    …
▸ Usage for marks on light backgrounds
──────────────────────────────────────────────────────────────────────────────────────
Tiles & bars (look the same on any page; not affected by the switch)
[▣] [▣] [▣]  [▬▬▬] [▬▬▬]  [✉ ▭▭]                              Download all marks · zip
```

- **Visible by default:** the Light tab. A grid of the four forms × the three light colorways (about 12 previews) on one Paper surface, with each row led by its most-used colorway (★). In the Dark tab the same grid sits on **one** Ink plate (failure 6). Tiles and bars sit below, outside the tabs (failure 2).
- **Reaching the other versions:** one click (or the arrow keys) on the other tab. The tab labels name both states, and the URL updates (`#light` / `#dark`) so links can be shared (failure 3). Optionally, put a "Most used" pair above the tabs so both most-used wordmarks are always visible (failure 4).
- **Usage guidance:** one `<details>` per tab panel ("Usage for marks on light backgrounds"), covering contrast and readability for that background, plus per-form clear space and minimum size.
- **What Download does:**
  - Each card's links download that card's file only (failure 5).
  - "Download these 12 · zip" sits in the tab row, and its label names the set.
  - "Download all marks · zip" sits outside the tabs and doesn't change with them.
- **On a phone:**
  - The tab row sticks to the top of the section while scrolling, so the current background stays in view *(judgment)*.
  - Cards drop to one column per row, or two for the glyph.
  - Tiles and bars follow the panel.
- **Accessibility:**
  - Use the [APG Tabs][apg-tabs] pattern, because the two states show different sets of files: `tablist` labeled "Show marks for"; each `tabpanel` labeled by its tab.
  - Selection can follow focus because both panels are already loaded (the APG recommends automatic activation when panels display without noticeable latency; see [APG Tabs][apg-tabs] and [selection follows focus][apg-kbd]). Give the panel `tabindex="0"` only if its first content isn't focusable.
  - Switching changes content, not context, so don't move focus or scroll ([Understanding 3.2.2][u322]).
  - The selected tab needs more than a color change, such as a Gold deep underline plus weight, at 3:1 or better ([Understanding 1.4.11][u1411]; Gold fails at 2.55:1 per [ADR 0002][adr2]).
  - **If the switch only changes how the same items are previewed** (not this option), use the [APG Radio Group][apg-radio] pattern. A segmented-control look is fine: the APG notes that radio buttons in toolbars are often styled like toggle buttons.
  - **Avoid** a switch ("Dark backgrounds: on/off") because its off state is unnamed, and avoid `aria-pressed` toggle buttons, which describe independent on/off states ([APG Switch][apg-switch], [APG Button][apg-button]).
- **Busy-ness: medium.**
  - Previews: about 12 colorway previews plus about 6 tiles and bars.
  - Controls: 1 tab list and about 36 format links.
  - Hidden state: **yes**, half the colorway marks.
  - It's the most "app-like" of the four options; the single Ink plate keeps the dark state from looking patchy.

### Option C: One card per form, with colorway swatches

From [prototype-options.md][proto] item 5 ("one card per form with a colorway switcher").

```
┌ Wordmark ─────────────────────────┐ ┌ Horizontal lockup ────────────────┐
│                                   │ │                                   │
│           C O M P A S S           │ │   C O M P A S S   DESIGN STUDIO   │
│                                   │ │                                   │
├───────────────────────────────────┤ ├───────────────────────────────────┤
│ Light (●)(○)(○)   Dark (○)(○)(○)  │ │ Light (●)(○)(○)   Dark (○)(○)(○)  │
│ Navy ink · for light backgrounds  │ │ Two-tone · for light backgrounds  │
│ SVG · PNG · PDF   All 6 · zip     │ │ SVG · PNG · PDF   All 6 · zip     │
│ ▸ Usage                           │ │ ▸ Usage                           │
└───────────────────────────────────┘ └───────────────────────────────────┘
┌ Stacked lockup ┐ ┌ Glyph ┐ ┌ Tiles (3) ┐ ┌ Wordmark bars ┐ ┌ Email tile ┐
```

- **Visible by default:** about 7 cards (four forms, tiles, wordmark bars, email tile), each showing one version. The forms open on their most-used colorway.
- **Reaching the other versions:** each card has six small swatches in two labeled groups, "Light" and "Dark". Choosing a swatch swaps the preview **and** flips the card's background to match (Paper for light colorways, Ink for dark), so a mark can't appear on the wrong background (failure 1). Tile and bar cards switch between their own versions.
- **Usage guidance:** a "Usage" `<details>` per card.
- **What Download does:**
  - The format links download the selected colorway. The line above them names it ("Navy ink · for light backgrounds"), and their accessible names change with it ("SVG, navy ink wordmark").
  - "All 6 · zip" per card ignores the selection.
  - "Download all marks · zip" in the section header.
- **On a phone:** one card per row. Six swatches at 32 px with 8 px gaps take 232 px, which fits a 375 px screen. Cards are tall, so 7 of them make a long scroll.
- **Accessibility:**
  - Each swatch row is an [APG Radio Group][apg-radio] labeled "Wordmark colorway", with arrow keys moving and selecting.
  - Each radio's name gives the colorway and background ("Light gold, for dark backgrounds"), because a swatch's color alone means nothing to a screen reader or to someone with color-vision deficiency.
  - Selected state: a ring plus a check, at 3:1 or better ([1.4.11][u1411]). Swatch targets at least 24 × 24 px ([2.5.8][u258]).
  - Changing a swatch is a change of content, not context ([3.2.2][u322]).
- **Busy-ness: low to medium.**
  - Previews: about 7, the fewest of any full-kit option.
  - Controls: about 7 swatch groups (around 30 swatches), so many small controls.
  - Hidden state: **yes**, five of six colorways per card.
  - Also the "which file did I just get" risk, softened by the visible colorway line.

### Option D: Most-used pair plus a file index

```
MOST USED
┌───────────────────────────────┐ ┌███████████████████████████████┐
│   C O M P A S S               │ │█  C O M P A S S              █│
│   Navy ink wordmark           │ │█  Light gold wordmark        █│
│   for light backgrounds       │ │█  for dark backgrounds       █│
│   SVG · PNG · PDF             │ │█  SVG · PNG · PDF            █│
└───────────────────────────────┘ └███████████████████████████████┘
EVERY MARK (30)                                   Download all marks · zip
▸ Wordmark · 6 colorways
▾ Horizontal lockup · 6 colorways                       All 6 · zip
   [thumb] Two-tone     light backgrounds        SVG · PNG · PDF
   [thumb] Navy ink     light backgrounds        SVG · PNG · PDF
   [thumb] Gold deep    light backgrounds        SVG · PNG · PDF
   [thumb] Reversed     dark backgrounds         SVG · PNG · PDF
   [thumb] Paper        dark backgrounds         SVG · PNG · PDF
   [thumb] Light gold   dark backgrounds         SVG · PNG · PDF
   ▸ Usage
▸ Stacked lockup · 6 colorways
▸ Glyph · 6 colorways
▸ Tiles, bars and email tile · 6
```

- **Visible by default:** the two most-used marks, large, with direct downloads. Below them, a quiet index of every mark grouped by form, with every group closed.
- **Reaching the other versions:** open a group. Each row has a small thumbnail on its correct background, the colorway, the background it's for, and format links. All names are plain text, so the index can be scanned and searched.
- **Usage guidance:** a "Usage" `<details>` at the end of each group.
- **What Download does:**
  - Each row downloads its own file.
  - "All 6 · zip" per group.
  - "Download all marks · zip" for the whole kit.
- **On a phone:** the pair stacks. Each index row becomes two lines (thumbnail and name, then format links).
- **Accessibility:**
  - Groups are native `<details>` ([APG Disclosure][apg-disclosure]).
  - An open group's rows can be a `<table>` with a caption and column headers (Mark, Colorway, For, Files) so screen readers announce what each value means *(judgment)*.
  - Thumbnail alt text names the mark and colorway.
- **Busy-ness: lowest by default, long when opened.**
  - Previews: 2 by default.
  - Controls: 6 format links and 5 group disclosures.
  - Hidden state: none (only disclosures, whose summaries name their contents).
  - The risk is the opposite of busy: it can feel like a spreadsheet and undersell the marks, and showing each lockup in use ends up in In situ.

### Comparison

| | A · Paired plates ★ | B · Background tabs | C · Card per form | D · Most used + index |
|---|---|---|---|---|
| Previews at first view | ~8 halves + ~6 tiles and bars | ~12 + ~6 tiles and bars | ~7 | 2 |
| Always-visible controls | 3 links per half, 2 disclosures per plate | 1 tab list, ~36 links | ~30 swatches, ~21 links | 6 links, 5 disclosures |
| Hidden by a mode | none | half the colorway marks | 5 of 6 per card | none |
| Both most-used marks visible at once | yes (wordmark plate) | only with an added "Most used" strip | no | yes |
| Download ambiguity | none (link under its file) | low, if fixes adopted | medium (depends on selection) | none |
| Custom widgets | none | tabs | 7 radio groups | none |
| Shows marks on their backgrounds | yes, light and dark side by side | yes, one background at a time | yes, one at a time per card | thumbnails only, until opened |
| Busy-ness | low | medium | low to medium | lowest (long when opened) |

### Why Option A

- **It saves the same room as the toggle without hiding anything behind a mode.** It shows the main version for each background and folds the other four colorways into a named disclosure. Failures 3, 4 and 5 can't happen.
- **Backgrounds are always right, by construction.** Each half's background is fixed to its colorway.
- **It follows the most common pattern.** The portals that show colorways lay them out together, each on its intended background, and none uses a switch:
  - [Shopify][shp] puts its primary and inverted logos side by side.
  - [Vercel][vercel] stacks white and black panels per logo.
  - [Discord][dis] gives each colorway its own matching tile.
  - [IBM][ibm] labels its rows "Positive logo" and "Reversed logo".
  - [UC Berkeley][ucb] captions each color pairing.
- **It has the lowest accessibility risk.** It uses only links and native disclosures, and it works without hover, so it holds up on touch.
- **It fits the brand.** The split plate echoes the drafting-plate hero. The only motion is a disclosure opening (240ms; instant under reduced motion).

Prototype B next to A so the owner can compare his idea, fixed, against the recommendation. C is worth keeping as a fallback if A's plates feel repetitive with four forms.

**Open question:** for the glyph and the two lockups, which colorway is the main one for each background? This is pending Q23 in [prototype-options.md][proto]. Option A needs one per background for each form.

---

## 4. The usage-guidance control

The brief wants usage guidance (contrast and readability, "use it for", clear space) behind a clickable element rather than as lots of text. [prototype-options.md][proto] item 1 notes that v2's ⓘ pop-ups are missed by Ctrl-F, printing and some screen readers.

| Control | How it behaves | Fits Compass? | Evidence |
|---|---|---|---|
| **Hover tooltip** (`title` or `role="tooltip"`) | Appears on hover or focus; can't be focused; can't hold links; on touch there may be no hover at all. | **No.** Fine for naming an icon, not for rules. | APG: tooltip widgets don't receive focus; content with focusable elements needs a non-modal dialog ([APG Tooltip][apg-tooltip], which is still marked as lacking task-force consensus). ARIA: a tooltip displays a description, and typical delays run one to five seconds ([ARIA 1.2][aria-tooltip]). HTML: relying on `title` excludes keyboard-only and touch-only users ([HTML title][html-title]). If something must be known first, put it in the link text, not `title` ([H33][h33]). Custom hover content must be dismissible, hoverable and persistent ([1.4.13][u1413]). |
| **Toggletip** (an ⓘ button that shows a small bubble on click) | Opens on click, Enter or Space; closes on Esc or a click outside. | **Only for one-line extras** ("Why two golds?"). | There is no W3C pattern called a toggletip. Build it from a button ([APG Button][apg-button]) with `aria-expanded` controlling the content ([APG Disclosure][apg-disclosure]), shown with the HTML `popover` attribute. `popover="auto"` closes on a click outside or Esc ([HTML popover][html-popover]). A `popovertarget` button exposes `aria-expanded` and a details relation to the popover ([HTML-AAM][html-aam]). |
| **Popover panel** (a larger anchored card with headings, a clear-space diagram and links) | Like a toggletip, but rich content. | **Possible, not preferred.** It floats over neighboring marks, and positioning on a phone is awkward *(judgment)*. | When a pop-up holds focusable content, the APG points to a non-modal dialog ([APG Tooltip][apg-tooltip]). Popover content isn't among what find-in-page reveals ([HTML find-in-page][html-fip]). |
| **Inline disclosure** (`<details>` with "Usage" as its `<summary>`) | Expands in place and pushes content down; native keyboard support; no positioning. | **Yes, recommended.** | `<details>` is defined as a disclosure widget for additional information ([HTML details][html-details]). Find-in-page should search closed `<details>` and open the match ([HTML find-in-page][html-fip]). Keyboard behavior: [APG Disclosure][apg-disclosure]. |
| **Modal sheet** (one "Usage guide" for the whole section) | Covers the page; focus trapped inside until closed. | **No.** Too heavy for a few lines per mark. | Content outside a modal dialog is inert, and focus moves into the dialog ([APG Dialog (Modal)][apg-dialog]). |

**Recommendation:**

1. **One inline `<details>` per plate (or card or group), labeled "Usage".** Inside, in this order:
   - Use it for (one line).
   - Contrast and readability: which backgrounds it's for, and what to avoid, such as busy photos.
   - Clear space, with a small diagram.
   - Minimum size, for print and screen.

   [prototype-options.md][proto] item 7 says printers need the print minimums. Keep the summary text specific ("Usage: contrast, clear space, minimum size") so people know what's inside before opening.
2. **Keep one short visible caption per version** (colorway and background, eight words or fewer). [Shopify][shp] shows a one-sentence use note under each version. This isn't "lots of text", and it means the most important fact never needs a click *(judgment)*.
3. **Use a toggletip only for an optional one-line aside,** never for contrast or clear space.
4. **Implementation notes:**
   - **Keep the guidance findable.** If a custom disclosure replaces `<details>`, hide its content with `hidden="until-found"` so find-in-page can still reveal it ([HTML hidden][html-hidden]). On 20 October 2026 the browser-support box beside the spec's hidden-attribute section read "Support in one engine only", so `<details>` is the safer choice.
   - **Printing:** add a print stylesheet that opens all disclosures *(judgment)*.
   - **Contrast as a brand rule:** contrast guidance is a brand rule, because logos are exempt from WCAG's text and non-text contrast minimums ([1.4.3][u143], [1.4.11][u1411]). The guidance text itself must still meet AA ([ADR 0002][adr2]).
   - **"Copy SVG"** (as on [Vercel][vercel] and [Discord][dis]) is optional and adds controls. If you add it, announce "Copied" through a status message without moving focus ([4.1.3][u413]).

---

## 5. Evidence

Per-site notes, all read 20 October 2026. Labels in quotes are the sites' own wording.

### Core sample

- **GitHub** ([brand.github.com/foundations/logo][gh])
  - About 16 static PNG images, one section per topic: Invertocat, wordmark lockup, color examples, product lockups, events, don'ts, deprecated logos.
  - One download, the link "Download the logo files", which gets `GitHub_Logos.zip`.
  - No per-logo controls. The header's "Switch to dark mode" changes the whole site.
  - Color guidance is prose: white or black, occasionally grey or green; when in doubt, use the highest-contrast option.
- **Atlassian** ([atlassian.design/foundations/logos][atl])
  - 75 download links: 1 company logo, 27 attribution logos, 14 property logos and 33 app logos.
  - Each link reads "Download {name} ({size})", for example "Download Atlassian (106.35KB)", and gets one zip per logo. Each zip "includes variations of color and layout".
  - Color options (Brand, inverse, neutral) are shown in a single image, not as a control.
  - Each heading has a "Copy link to '…'" button. The site has a "Theme" menu button.
- **Shopify** ([shopify.com/brand-assets][shp])
  - "Download all brand assets" at the top (`shopify-brand-assets.zip`).
  - Three sections; each shows its versions side by side with a title and a one-line use note. "Primary Logo" sits on a light grey panel, "Inverted Primary Logo" on black (seen in the browser).
  - One pill button per section: "Download primary logos", "Download monotone logos", "Download The Shopping Bag".
  - 7 previews in all.
- **Spotify** ([developer.spotify.com/documentation/design][spo])
  - Two buttons: "Download Full Logo" (`2024-spotify-full-logo.zip`) and "Download Icon" (`2024-spotify-logo-icon.zip`).
  - The colorway rule is prose under "Which color logo to use": green only on black or white, black logo on light backgrounds, white logo on dark.
  - Elsewhere, "Download Like icon" offers plain ".svg" and ".png" links, choosing by format.
- **Dropbox** ([brand.dropbox.com/logo][dbx], [dropbox.com/branding][dbx-legal])
  - The logo page explains two "expressions", "Version A: The full logo" and "Version B: The tab", with no downloads.
  - Files sit behind the "Brand Partner Toolkit" link, a shared Dropbox folder. The legal branding page has no downloads.
- **Stripe** ([stripe.com/newsroom/brand-assets][str], which redirects to `/newsroom/information`)
  - "The Stripe logo": one sentence (slate and blurple on light backgrounds, white on dark), then "Download logo kit" (`Stripe_logo_kit.zip`).
- **Slack** ([slack.com/media-kit][slack], [Salesforce asset library][slack-dam])
  - The Media Kit's "Logos" card has one image and a "View all" link to a Salesforce asset library, "Slack Media Kit Logos".
  - That library shows 19 files as one tile per file, with each format a separate tile (for example `SLA-Slack-from-Salesforce-logo-inverse-RGB.svg` and `…-inverse-RGB.png`).
  - The inverse (white-wordmark) tiles are previewed on light tiles, where the wordmark nearly vanishes (seen in the browser).
- **Mailchimp** ([mailchimp.com/about/brand-assets][mc])
  - Three logo images, and a sentence saying to use the reverse version, designed for dark backgrounds.
  - Downloads are inline links in a sentence, "You can download EPS or PNG files": one zip per format.
- **Figma** ([figma.com/using-the-figma-brand][figma])
  - A "Logos, to-go" card with "Download" gets a single 78 KB zip (checked from the response headers only).
  - "View the Brand Book" leads to the guidelines (a 2.2 MB PDF link is also on the page).
- **MIT**
  - **Logo page** ([brand.mit.edu/logos-marks/mit-logo][mit-logo]):
    - Static image sets under four captions: "MIT logo in the core palette colors", "White logo on the core palette background colors", "Red-on-red treatments" and "MIT logo on secondary palette colors".
    - "Download the MIT logo" links to the downloads library filtered by type.
    - The page points to WebAIM's contrast checker for custom backgrounds.
  - **Downloads** ([brand.mit.edu/downloads][mit-dl]):
    - A "Download Type" filter (checkboxes: MIT logo, Social media logos, Favicon, MIT seal, Tim the Beaver, Templates) with a "Filter" button.
    - One card per form: MIT logo, 3-line lock-up, 1-line lock-up, micro logo, micro lock-up.
    - Each card has one preview, a sentence listing its colors, a link to the guidelines, and the zip's file name as the link text (`MIT-logo.zip`).
    - Each zip has CMYK, PMS and RGB subfolders.
    - A Touchstone login is required.
- **UC Berkeley**
  - **Logos page** ([brand.berkeley.edu/visual-identity/logos][ucb]):
    - Under "Logo variations", four captioned tiles: "California Gold on Berkeley Blue", "Berkeley Blue on California Gold", "White on Berkeley Blue" and "Berkeley Blue on white".
    - "One-color logo" adds "Black on white" and "White on black".
    - No downloads on the page.
  - **Brand essentials toolkit** ([downloads][ucb-kit]):
    - Each asset has two links, "Download · For Print" and "Download · For Digital". Their accessible names add the asset ("Download B monogram for print").
    - Primary marks need permission ("Request access to primary marks").
    - Unit lockups come by request ("Request a logo lockup"), as a package "in all five colorways" in png, svg, eps and pdf ([signature system][ucb-sig]).

### Supplementary

- **Discord** ([discord.com/branding][dis])
  - "Our Logo" and "Symbol" each show three tiles: white logo on near-black, black on white, blurple on dark.
  - On hover, icon-only copy and download links appear. In the page's code, these links have no text, no `aria-label`, and images with empty alt text, so they have no accessible name. They are `display:none` until hover, which keeps them out of keyboard reach.
  - Each download is a zip, although the link's data attribute names an SVG.
- **IBM** ([ibm.com/design/language/ibm-logos/8-bar][ibm])
  - "Positive logo" and "Reversed logo" are different drawings: the white stripes are thinner and the points blunter, so the two look the same weight.
  - Color pairs are shown as labeled images ("Blue 50 on Black").
  - Contrast rule: keep foreground and background at least five steps apart in IBM's palette.
- **Vercel** ([vercel.com/geist/brands][vercel])
  - Each logo appears twice, on a white panel and on a black panel stacked below it, both always visible.
  - A "Copy code" icon button on each panel fades in on hover. It is invisible until then (opacity 0) but can still be reached with the keyboard.
  - One zip per brand ("Download Vercel Assets"). The site theme is set with light, dark and system radios.
- **Tailwind CSS** ([tailwindcss.com/brand][tw])
  - The logotype preview follows the site theme, set in the footer radio group ("System theme", "Light theme", "Dark theme").
  - In dark mode the visible image is `tailwindcss-logotype-white.svg`, but the link wrapping it downloads `tailwindcss-logotype.svg`, whose text fill is `#0f172a` (dark slate). The separate "Download logotype" link gets `tailwindcss-logotype.zip`.
  - The mark downloads as a single SVG.
- **Twitch** ([brand.twitch.com][twitch])
  - The page is a heading, one line of copy and a "Download ↓" button (`Twitch-Brand.zip`).
  - A "Darkmode" button switches the site theme. It has no `aria-pressed`.

---

## 6. Sources

All accessed 20 October 2026.

**Brand portals, core sample**

- GitHub, Brand Toolkit, Logo: https://brand.github.com/foundations/logo
- Atlassian Design, Logos: https://atlassian.design/foundations/logos
- Shopify, Using our brand: https://www.shopify.com/brand-assets
- Spotify for Developers, Design & Branding Guidelines: https://developer.spotify.com/documentation/design
- Dropbox Brand Guidelines, Logo: https://brand.dropbox.com/logo
- Dropbox Branding Guidelines (legal): https://www.dropbox.com/branding
- Stripe Newsroom, Information and assets: https://stripe.com/newsroom/brand-assets (redirects to https://stripe.com/newsroom/information)
- Slack, Media Kit: https://slack.com/media-kit
- Salesforce asset library, Slack Media Kit Logos (linked from Slack's "View all"): https://salesforce.widencollective.com/c/yn6bxnam
- Mailchimp, Brand Assets: https://mailchimp.com/about/brand-assets/
- Figma, Logo & Brand Usage Guidelines: https://www.figma.com/using-the-figma-brand/
- MIT Brand Guide, MIT Logo: https://brand.mit.edu/logos-marks/mit-logo
- MIT Brand Guide, Downloads: https://brand.mit.edu/downloads
- UC Berkeley Brand, Logos: https://brand.berkeley.edu/visual-identity/logos/
- UC Berkeley Brand, Signature system: https://brand.berkeley.edu/visual-identity/signature-system/
- UC Berkeley Brand, Brand essentials toolkit: https://brand.berkeley.edu/downloads/brand-essentials-toolkit/

**Brand portals, supplementary**

- Discord, Brand Guidelines: https://discord.com/branding
- IBM Design Language, 8-Bar: https://www.ibm.com/design/language/ibm-logos/8-bar/
- Vercel, Geist Brands: https://vercel.com/geist/brands
- Tailwind CSS, Brand: https://tailwindcss.com/brand
- Twitch, Brand Assets: https://brand.twitch.com/ (https://brand.twitch.tv/ redirects here)

**W3C: ARIA Authoring Practices Guide**

- Radio Group Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
- Tabs Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
- Button Pattern (toggle buttons): https://www.w3.org/WAI/ARIA/apg/patterns/button/
- Switch Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
- Disclosure (Show/Hide) Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
- Tooltip Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
- Dialog (Modal) Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
- Developing a Keyboard Interface, Deciding When to Make Selection Automatically Follow Focus: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_selection_follows_focus

**W3C: specifications and WCAG 2.2 documents**

- WAI-ARIA 1.2, tooltip, radiogroup and switch roles: https://www.w3.org/TR/wai-aria-1.2/#tooltip, https://www.w3.org/TR/wai-aria-1.2/#radiogroup, https://www.w3.org/TR/wai-aria-1.2/#switch
- HTML Accessibility API Mappings, popovertarget: https://www.w3.org/TR/html-aam-1.0/#att-popovertarget
- Media Queries Level 5, prefers-reduced-motion: https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion
- Understanding SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- Understanding SC 1.4.13 Content on Hover or Focus: https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
- Understanding SC 2.3.3 Animation from Interactions: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- Understanding SC 2.5.3 Label in Name: https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
- Understanding SC 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- Understanding SC 3.2.2 On Input: https://www.w3.org/WAI/WCAG22/Understanding/on-input.html
- Understanding SC 4.1.3 Status Messages: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
- Technique H33, Supplementing link text with the title attribute: https://www.w3.org/WAI/WCAG22/Techniques/html/H33

**WHATWG HTML Living Standard**

- The popover attribute: https://html.spec.whatwg.org/multipage/popover.html
- The title attribute: https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute
- The details element: https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element
- Find-in-page, interaction with details and hidden=until-found: https://html.spec.whatwg.org/multipage/interaction.html#interaction-with-details-and-hidden=until-found
- The hidden attribute: https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute

**Tried but not usable (20 October 2026)**

- OpenAI brand (HTTP 403): https://openai.com/brand/
- GitLab Pajamas, logo (redirected to sign-in, HTTP 403): https://design.gitlab.com/brand-logo/logo
- Raycast press kit (HTTP 404): https://www.raycast.com/press-kit
- Webflow brand (HTTP 404): https://webflow.com/brand
- Notion brand (HTTP 404): https://www.notion.com/about/brand
- Wise Design, logo (page not found): https://wise.design/foundations/logo
- Slack Brand Center (HTTP 404): https://brand.slackhq.com/
- Dropbox partner info (HTTP 404): https://brand.dropbox.com/partner-info
- Lingo help, changing an asset's background color (HTTP 404; seen only as a search-engine snippet, so not relied on): https://help.lingoapp.com/en/articles/1920102-how-to-change-the-background-color-of-an-asset
- W3C WAI Interest Group thread "Accessible Tool Tips" (a discussion, not guidance; not relied on): https://lists.w3.org/Archives/Public/w3c-wai-ig/2025OctDec/0052.html

[gh]: https://brand.github.com/foundations/logo
[atl]: https://atlassian.design/foundations/logos
[shp]: https://www.shopify.com/brand-assets
[spo]: https://developer.spotify.com/documentation/design
[dbx]: https://brand.dropbox.com/logo
[dbx-legal]: https://www.dropbox.com/branding
[str]: https://stripe.com/newsroom/brand-assets
[slack]: https://slack.com/media-kit
[slack-dam]: https://salesforce.widencollective.com/c/yn6bxnam
[mc]: https://mailchimp.com/about/brand-assets/
[figma]: https://www.figma.com/using-the-figma-brand/
[mit-logo]: https://brand.mit.edu/logos-marks/mit-logo
[mit-dl]: https://brand.mit.edu/downloads
[ucb]: https://brand.berkeley.edu/visual-identity/logos/
[ucb-sig]: https://brand.berkeley.edu/visual-identity/signature-system/
[ucb-kit]: https://brand.berkeley.edu/downloads/brand-essentials-toolkit/
[dis]: https://discord.com/branding
[ibm]: https://www.ibm.com/design/language/ibm-logos/8-bar/
[vercel]: https://vercel.com/geist/brands
[tw]: https://tailwindcss.com/brand
[twitch]: https://brand.twitch.com/
[apg-radio]: https://www.w3.org/WAI/ARIA/apg/patterns/radio/
[apg-tabs]: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
[apg-button]: https://www.w3.org/WAI/ARIA/apg/patterns/button/
[apg-switch]: https://www.w3.org/WAI/ARIA/apg/patterns/switch/
[apg-disclosure]: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
[apg-tooltip]: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
[apg-dialog]: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
[apg-kbd]: https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_selection_follows_focus
[aria-tooltip]: https://www.w3.org/TR/wai-aria-1.2/#tooltip
[html-aam]: https://www.w3.org/TR/html-aam-1.0/#att-popovertarget
[mq5]: https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion
[u143]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
[u1411]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[u1413]: https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html
[u233]: https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
[u253]: https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
[u258]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[u322]: https://www.w3.org/WAI/WCAG22/Understanding/on-input.html
[u413]: https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
[h33]: https://www.w3.org/WAI/WCAG22/Techniques/html/H33
[html-popover]: https://html.spec.whatwg.org/multipage/popover.html
[html-title]: https://html.spec.whatwg.org/multipage/dom.html#the-title-attribute
[html-details]: https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element
[html-fip]: https://html.spec.whatwg.org/multipage/interaction.html#interaction-with-details-and-hidden=until-found
[html-hidden]: https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute
[glossary]: ../GLOSSARY.md
[proto]: ../prototype-options.md
[adr2]: ../adr/0002-page-text-meets-wcag-aa.md
[adr3]: ../adr/0003-mark-file-naming-convention.md
