# Logo kit ground rules: evidence check

This document tests four proposed ground rules for Compass Design Studio's logo kit against the W3C accessibility guidelines and against brand guidelines that organizations publish about themselves. The kit is the expansive one, with about 30 marks. Every page was read on **20 October 2026**. The earlier [naming audit](./brand-kit-naming.md) covered terms, file names and Figma export, so this document doesn't repeat that work. It uses the brief's terms "lockup" and "tile".

## How to read this

- **Core sample (12 organizations):** GitHub, Atlassian, Shopify, Spotify, Dropbox, Mailchimp, Slack, MIT, UC Berkeley, Stanford, IBM and LinkedIn. Every "x of 12" count covers only these 12. For most of them I read more than one page; section 5 lists them all.
- **Supplementary sources:** Red Hat and GitLab publish unusually complete logo and governance pages, so they fill gaps. They never count toward a tally.
- **Standards:** WCAG 2.2 (a W3C Recommendation dated 12 December 2024) and its Understanding documents. For physical signs, I used the US Access Board's copy of the 2010 ADA Standards.
- **"Silent"** means I didn't find the point on the pages I read. It doesn't mean the organization has no rule. Dropbox and Slack publish little readable logo guidance (Slack's Brand Center logo page returned 404), so both are silent on many counts.
- **Quoting:** guideline wording is paraphrased, with a link for every claim. The one direct quote is WCAG's logo exception.
- **Compass contrast ratios** come from the WCAG formula applied to the hex values in the brief. They match the four ratios the brief gives (3.18, 2.91, 9.02 and 13.39).

---

## 1. Verdict

### Rule 1, contrast: modify

> **Contrast.** Every color in a mark has at least 3:1 contrast with the background directly behind it, measured with the WCAG formula from the colors' hex values. Each mark's card lists the backgrounds it is approved for. On any other background, such as a photo or a partner's sign color, use the approved version with the most contrast, and check it against the lightest or darkest part of the area the mark covers. If no version reaches 3:1 there, move the mark or use a tile. Two-tone marks have their own, larger minimum size; below it, use a one-color version.

**Evidence:**
- **WCAG doesn't require it.** WCAG 2.2 exempts logos from all of its contrast rules ([1.4.3][wcag], [1.4.11][u1411]), so 3:1 is the studio's own choice, not a WCAG or legal requirement.
- **But the W3C recommends having one.** Its Understanding documents advise offering a logo version with enough contrast ([1.4.3][u143], [1.4.11][u1411]), and 3:1 is WCAG's own floor for large text and meaningful graphics.
- **Peers set it in words, not numbers.** 8 of 12 brand guides require contrast or legibility in words; 0 of 12 publish a number.
- **What needs adding:** a way to handle photos and backgrounds that aren't on any list, and a size limit for the gold deep parts. At 3.18:1 they fall short of the 4.5:1 WCAG asks of ordinary-size text.

### Rule 2, palette colors: modify

> **Colors.** Marks use only brand palette colors, plus pure black and pure white for one-color jobs such as single-color printing, embroidery and vinyl. Never recolor a mark; pick the existing version that fits. Any other color, including a material's own finish, needs the owner's approval for that job.

**Evidence:**
- **Peers restrict logo colors.** 10 of 12 explicitly limit logo colors or forbid recoloring. The other 2 (Shopify, Mailchimp) forbid altering the files or making your own version.
- **Peers offer black.** 8 of 12 offer or allow a black version.
- **Compass's palette has no pure black or white.** Ink and Paper are both tinted, so the rule as written would forbid the black one-color version the naming audit recommends, and white ink on dark surfaces.
- **One exception exists.** MIT is the only source that allows other colors, and only for merchandise that goes through review ([MIT brand architecture][mit-arch]).

### Rule 3, design system first: modify

> **New marks.** Only [the owner] approves a new or changed mark. It goes into the design system first and appears on Brand resources only after that. Nobody else makes, edits or redraws a mark. That includes one-off versions for a project, an event, a partner or a campaign; ask the studio instead. When a mark is retired, it comes off Brand resources and the design system lists it as retired.

**Evidence:**
- **Nobody may alter or make their own.** 12 of 12 forbid altering the logo or making your own version, or require permission first.
- **Most name who to ask.** 8 of 12 name a team or a request route for anything new.
- **Old versions are banned.** 5 of 12 forbid old or retired versions.
- **No one documents the order.** No source says that a private master record must be updated before a public site; that part is the studio's own [ADR 0001](../adr/0001-design-system-artifact-is-the-master.md). It fits the "official files only" rule that 3 of 12 state.
- **The current rule's gap:** it says nothing about who approves a mark, and it doesn't stop anyone from making a mark outside the system. Those are the two things the sources guard hardest.

### Rule 4, "use it for": keep, with two additions

> **Use it for.** Every downloadable mark shows two short lines: what it's for, and which backgrounds it goes on. Marks that do the same job can share the wording. One mark per background is labeled the default, to use when unsure.

**Evidence:**
- **Purpose statements are common.** 11 of 12 say what at least some versions are for, and 6 of 12 do it for every version.
- **Backgrounds are the usual purpose.** 7 of 12 express a version's purpose as the background it goes on.
- **Labels on the download itself are rare.** Only MIT puts the line on each download card, and Shopify puts it beside each download group.
- **So:** Rule 4 is already ahead of most sources. The additions fold in backgrounds (which Rule 1 also needs) and a default (8 of 12 name a primary mark).

---

## 2. Rules we're missing

Ranked by how many of the 12 core organizations include the rule. Bracketed values are for the studio to fill in. Section 4.5 has the evidence.

| Rank | Rule | How common | Suggested wording | Why it matters for Compass |
|---|---|---|---|---|
| 1 | Don't alter the mark | 12 of 12 have at least one "don't"; 9 of 12 list specific misuses | **Use marks exactly as supplied.** Don't stretch, squash, rotate, recolor, outline, add shadows or effects, rearrange the parts, or retype the wordmark or descriptor. | Contractors and sign shops redraw and retype logos. A picture of each "don't" helps non-designers most. |
| 2 | Clear space | 11 of 12 address it; 9 of 12 give a measurement | **Leave clear space on every side** of at least [one unit, measured from the glyph]. Nothing enters it: no text, edges or other logos. | Builder site signs and printed pieces crowd logos. |
| 3 | Who may use the marks, and when to ask | 10 of 12 | **Who may use them.** Employees and contractors may use the marks for studio work. Trade partners may use them only to identify work done with or for the studio. Ask before putting a mark on merchandise or anything sold, and never use it in a way that suggests the studio endorses your business. | The site is public and trade partners are expected to become the main visitors. |
| 4 | Next to another company's logo (co-branding) | 8 of 12 (they disagree; see 4.5) | **With other logos.** When a Compass mark appears beside another company's logo, for example on a builder's sign, keep the two at about the same visual size unless the studio agrees otherwise. Keep at least our clear space between them, and never join them into one combined logo. Joint layouts are approved by the studio. | Builders and sign shops are named users, and this is their most likely use. |
| 5 | A default (primary) mark | 8 of 12 | **Start here.** If you're unsure, use [default mark] on light backgrounds and [default reversed mark] on dark ones. | It is the main way sources keep a large set usable (section 3). |
| 6 | Minimum size | 7 of 12 | **Minimum size.** Don't use a mark smaller than its listed minimum, which is given for screen (px) and print (mm). Below the smallest lockup size, use the glyph or a tile. | The glyph has fine lines, and the descriptor is small text. |
| 7 | Photos and busy backgrounds | 6 of 12 | **On photos.** Place a mark only over a calm, even area, in the version with the most contrast there. If no area works, use a tile. | Photography is already one of the listed dark backgrounds. |
| 8 | Retired versions | 5 of 12 | **Retired marks.** Don't use a mark that is no longer on Brand resources. | Already folded into the new Rule 3 wording. |
| 9 | Not used as a letter or in a sentence | 2 of 12 (plus GitLab) | **The glyph is the A in COMPASS only.** Don't use it as a letter in any other word, and don't set any mark inside a line of text. | The glyph is drawn as a letter A, so this misuse is likely. |

Two less common items are worth a line on the site but probably not a ground rule:
- **Which file format is for which job.** Only MIT explains it (CMYK for print, PMS for exact color match, RGB for screens) ([MIT downloads][mit-dl]). The naming audit covers formats.
- **Alt text.** Only Atlassian asks for alt text on logos ([Atlassian][atl]).

---

## 3. Large kits

**Is about 30 marks unusual?** No. Several sources publish sets of similar size:
- [MIT's downloads page][mit-dl] offers five logo forms, each in five colors (25 variants), plus social media logos in 15 colors and black or white favicons.
- [UC Berkeley][ucb-sig] issues each unit lockup in every applicable style and five colorways.
- [Atlassian][atl] lists dozens of app and property logos. Each download bundles the color and layout variations, in three color options for different backgrounds.
- [Red Hat][rh-logo] has three layouts plus the hat on its own, each in full color and one-color versions.

**Does any source warn against offering many versions?** Not in so many words. No source I read tells organizations to offer fewer color or layout versions of one logo. The warnings I found are about multiplying separate logos:
- [UC Berkeley][ucb-sig] says a unique logo for each unit causes confusion and dilutes the brand, and that not every program needs a lockup.
- [MIT][mit-arch] says that using different logos for different purposes creates visual confusion. In context, this is about a department mixing two branding strategies.
- [Red Hat][rh-event] bans custom event logos (except its flagship conference) and warns against filling event venues with logos. It also notes that [initiative logos][rh-init] need more design support over their life than its other logo types. Red Hat describes its 2019 logo update as a simplification ([Red Hat logo][rh-logo]).

These warnings support Rule 3 (no one-off marks) more than they argue for a smaller kit.

**How large sets are kept usable.** Six habits recur:

1. **Name a default.** 8 of 12 do, as do Red Hat and GitLab. Examples: GitHub's primary logo, Shopify's version to use "whenever possible", Spotify's green logo, GitLab's full-color default ([GitHub][gh], [Shopify][shp], [Spotify][spo], [GitLab][gl]).
2. **Reserve the other versions for stated situations.**
   - Red Hat keeps logo C for large signs only, and the hat alone for when the brand is already clear ([Red Hat logo][rh-logo]).
   - Spotify allows the icon alone only when the full logo doesn't fit or the brand is already established ([Spotify][spo]).
   - Shopify lists the conditions for its one-color logos ([Shopify][shp]).
   - Atlassian uses its attribution logos only where the Atlassian context isn't clear ([Atlassian][atl]).
   - GitLab allows one-color versions only in listed cases ([GitLab][gl]).
3. **Give a tiebreaker.**
   - GitHub: when in doubt, use the highest-contrast option ([GitHub][gh]).
   - Shopify: use the one-color logo with the most contrast ([Shopify][shp]).
   - Red Hat: choose the version with the best contrast ([Red Hat logo][rh-logo]).
4. **Bundle the variants.**
   - Atlassian puts all color and layout variations in one download per logo ([Atlassian][atl]).
   - MIT gives one zip per logo form, with print and screen subfolders ([MIT downloads][mit-dl]).
   - Shopify uses three downloads ([Shopify][shp]), and Spotify two ([Spotify][spo]).
5. **Provide a one-page cheat sheet.** Stanford's logo art sheet shows the correct colors and backgrounds ([Stanford][su-logos]).
6. **Keep retired versions out of the way.** GitHub lists its deprecated logos in their own section ([GitHub][gh]).

**What this suggests for Compass** (an inference from the habits above, not a sourced rule):
- Keep the expansive kit.
- Open the logo page with a "Start here" pair: the default mark for light backgrounds and the default for dark ones.
- Group the rest by form.
- Put the "use it for" and background lines on every card.
- Bundle each form's colorways in one zip, alongside the individual files.

---

## 4. Rule-by-rule evidence

### 4.1 Rule 1: contrast

#### What WCAG 2.2 says about logos

- **SC 1.4.3 Contrast (Minimum), Level AA.** Text needs 4.5:1, and large text 3:1. The Logotypes exception reads: "Text that is part of a logo or brand name has no contrast requirement." ([WCAG 2.2][wcag])
- **SC 1.4.6 Contrast (Enhanced), Level AAA,** has the same logo exception ([WCAG 2.2][wcag]).
- **SC 1.4.5 Images of Text** treats logotypes as essential, so a wordmark may be an image ([WCAG 2.2][wcag]).
- **The Understanding document for 1.4.3** ([Understanding 1.4.3][u143]) adds:
  - **Why logos are exempt:** the W3C assumes logos must follow stricter color choices set by brand guidelines.
  - **When it becomes a problem:** when a logo acts as a link or button. Authors should then consider a logo version with enough contrast, if the brand guidelines allow one, or provide an equivalent control.
  - **Author choices aren't exempt:** if a logo normally has enough contrast but an author chooses a low-contrast presentation, that presentation is not exempt.
  - **Brand rules don't exempt other text:** text that is low-contrast because of brand guidelines, beyond the logo itself, is not exempt.

#### Does SC 1.4.11 Non-text Contrast apply to logos?

**In short, no, with the same two caveats as 1.4.3.** Here is how the [Understanding document for 1.4.11][u1411] gets there:

- **The requirement.** 1.4.11 requires 3:1 for controls, and for the parts of graphics a person needs in order to understand the content.
- **The logo exemption.** Logos have their own subsection, under Graphical Objects, which exempts them on the same brand-guidelines assumption. It carries the same caveats:
  - Logos that act as controls are a problem.
  - A low-contrast presentation chosen by an author, rather than set by brand guidelines, is not exempt.
- **The essential exception.** It is meant for graphics that cannot be shown with enough contrast; flags are the example. For logos, the document says authors may choose a version with enough contrast if the brand guidelines allow versions.
- **Only some parts need contrast.** Not every part of a graphic needs to contrast with its surroundings, only the parts needed for understanding.
- **Text inside a graphic** falls under 1.4.3, not 1.4.11. Heavily stylized characters count as non-text content.
- **Thin lines.** The browser may draw very thin lines and shapes much fainter than their set color, so the best practice is to avoid them.

**What this means for Compass:**
- **The site's header logo needs a high-contrast version.** It is a link, which is the case where the W3C advises using such a version. Rule 1 guarantees one exists.
- **Off-list placements aren't protected.** Putting the two-tone mark on Paper 2 (2.91:1), when the guidelines approve it only for Paper and white, would count as an author's choice under WCAG, and so would not be exempt. Approved-background lists protect the site as well as the brand.

#### Why 3:1, and why 4.5:1 for small text

From the [Understanding document for 1.4.3][u143]:
- **Where 3:1 comes from.** It is the minimum an ANSI standard recommends for people with normal vision.
- **Where 4.5:1 comes from.** It is 3 × 1.5. The 1.5 makes up for the loss of contrast sensitivity that typically comes with 20/40 vision.
- **Why large text gets the lower number.** Larger text with thicker strokes is easier to read at lower contrast. 18 pt and 14 pt bold work out to about 24 px and 18.5 px.
- **Thin fonts.** Very thin or unusual fonts can render fainter than their set color.

From the [WCAG 2.2 glossary][wcag]:
- Contrast is measured against the background the text normally sits on.
- Fonts with extremely thin strokes are harder to read at lower contrast.

For non-text graphics, [Understanding 1.4.11][u1411] ties its 3:1 to the large-text requirement and says to treat it as a threshold: 2.99:1 fails.

#### What the brand guidelines require

| Org | What it says about logo contrast | Number? | Tied to accessibility? |
|---|---|---|---|
| [GitHub][gh] | Like text, the logo should be legible and meet accessibility requirements; when in doubt, use the highest-contrast option; avoid backgrounds with too little contrast | no | yes |
| [Atlassian][atl] | Brand, inverse and neutral color options for different backgrounds; don't place logos where clarity and legibility suffer; no unapproved color combinations; no complex backgrounds | no | no |
| [Shopify][shp] | Inverted version for legibility on dark or busy backgrounds; one-color version with the most contrast where backgrounds lack contrast; don't use on low-contrast backgrounds | no | no |
| [Spotify][spo] | Logo always legible; green logo only on black or white; black on light, white on dark; keep out of low-contrast areas | no | no (asks for high-contrast colors for accessibility in general communications) |
| [Dropbox][dbx] | silent | n/a | n/a |
| [Mailchimp][mc] | Use the reverse version on dark backgrounds | no | no |
| [Slack][slack-terms] | silent on contrast (forbids changing the logo's transparency) | n/a | n/a |
| [MIT][mit-logo] | Always check that the background gives enough contrast; points to a free contrast checker; logo black or white on colored backgrounds, except red-on-red | no | indirectly (checker tool) |
| [UC Berkeley][ucb] | Only four approved color pairings | no | no |
| [Stanford][su-wm] | Cardinal red on lighter backgrounds, white on darker; forbids Cardinal red on black because it fails contrast for accessibility | no | yes |
| [IBM][ibm] | Logo and background colors must be at least five steps apart on IBM's color scale; photos only with plenty of contrast. IBM's [color page][ibm-color] lists 3 to 5 steps for 3:1 and 4 to 6 steps for 4.5:1, so five steps clears 3:1 in every case listed | indirectly | yes |
| [LinkedIn][li] | Blue on white preferred; otherwise a solid light background that ensures contrast for legibility | no | no |

**Tallies (of 12):**
- **Contrast or legibility required in words:** 8 (GitHub, Atlassian, Shopify, Spotify, MIT, Stanford, IBM, LinkedIn).
- **Approved pairings only, with no general contrast statement:** 2 (Berkeley, Mailchimp).
- **Silent:** 2 (Dropbox, Slack).
- **A number on the logo page:** 0.
- **Logo contrast tied explicitly to accessibility:** 3 (GitHub, Stanford, IBM through its color page).

**Supplementary:**
- Red Hat says visibility comes first when anything is behind the logo, and links to its color page ([Red Hat logo][rh-logo]). There, graphics that convey information need 3:1, citing WCAG AA ([Red Hat color][rh-color]).
- GitLab is silent on contrast ([GitLab][gl]).

**Where sources disagree: a list of backgrounds or a contrast test?**
- **A fixed list:** Berkeley (four pairings), Spotify (green only on black or white), Stanford, Mailchimp, and Atlassian for its property logos.
- **Any background that passes a test:**
  - MIT puts no limits on background colors as long as the contrast check passes ([MIT brand architecture][mit-arch]).
  - IBM allows any palette background that is five steps away ([IBM][ibm]).
  - GitHub asks that the logo meet accessibility requirements ([GitHub][gh]).
- **Compass's draft mixes both,** with an "intended background" plus 3:1. The new wording keeps a list for everyday use, which is simpler for non-designers. It adds a test for backgrounds no list can cover, such as photos and partners' sign colors.

#### Compass's own numbers

WCAG contrast ratios, computed from the hex values in the brief:

| Mark color | Paper #F7F4EE | White | Paper 2 #EFEAE0 | Ink #1A2A36 | Light gold square #E1C982 |
|---|---|---|---|---|---|
| Navy ink #133558 | 11.40 | 12.52 | 10.44 | **1.17** | 7.68 |
| Gold deep #9C8842 | 3.18 | 3.49 | **2.91** | 4.21 | **2.14** |
| Paper #F7F4EE | **1.00** | **1.10** | **1.09** | 13.39 | **1.49** |
| Light gold #E1C982 | **1.49** | **1.63** | **1.36** | 9.02 | n/a |
| Black #000000 | 19.13 | 21.00 | 17.52 | **1.43** | 12.88 |
| White #FFFFFF | **1.10** | n/a | **1.20** | 14.70 | **1.63** |

Bold means below 3:1.

**What the rule does in practice:**
- **Two-tone marks** pass on Paper and white, but fail on Paper 2 (2.91). On the site's Paper 2 bands, use the navy ink version.
- **Gold deep parts never reach 4.5:1 on a light background.** If the descriptor is gold deep, as the [glossary](../GLOSSARY.md) says, it is small text below the level WCAG asks of ordinary-size text. Hence the separate minimum size for two-tone marks.
- **Light gold and paper marks** pass only on dark backgrounds.
- **Navy ink marks** pass only on light backgrounds (1.17 on Ink).
- **Tiles.** The navy ink glyph on a light gold square passes (7.68). By the W3C's "only the parts needed for understanding" idea ([Understanding 1.4.11][u1411]), the glyph should be measured against the tile's square, not the page. The square's edge doesn't need contrast with the page.
- **Thin margin.** Gold deep on Paper clears 3:1 by only 0.18. Printed on warm or textured stock, it could look weaker. That is an inference, so proof printed two-tone pieces.

#### Small sizes

- **No source raises its contrast floor at small sizes.** They handle small sizes in other ways:
  - **Minimum sizes:** 7 of 12 set them.
  - **Simpler artwork:** MIT draws a separate micro logo for 15 to 30 px ([MIT logo][mit-logo]), and Spotify uses the icon alone when space is short ([Spotify][spo]).
  - **Redrawn versions:** IBM redraws its reversed logo so it holds up on dark backgrounds ([IBM][ibm]).
  - **Larger sizes on screens:** Stanford warns that low-resolution media such as websites may need its wordmark larger than the stated minimum ([Stanford wordmarks][su-wm]).
- **The W3C's reasoning points the same way.** 3:1 is calibrated for large text and graphics, small text needs 4.5:1, and thin strokes render fainter ([Understanding 1.4.3][u143], [Understanding 1.4.11][u1411]).
- **So the floor needn't change by size.** Keep 3:1 for the mark's shapes and set minimum sizes. For the two-tone marks, whose gold deep parts sit at 3.18:1, set a larger minimum and switch to a one-color version below it. The threshold should come from a print and screen test.

#### Print and signs

- **WCAG covers web content only.** For physical signs in the US, the 2010 ADA Standards exempt company names and logos from the sign requirements (section 216.1, exception 1). Signs that are required must have characters that contrast with their background, light on dark or dark on light, but no ratio is given (section 703.5.1). The advisory note adds that glare, shadows from lighting and uneven color or texture also affect legibility ([ADA Standards][ada]).
- **So no legal ratio applies to Compass's logo on a sign or in print.** On paper, 3:1 is a brand choice measured from the screen color values. Proofs matter.

#### Assessment: too strict, too loose, or about right?

- **Stricter than WCAG,** which exempts logos entirely. But it matches what the W3C recommends: always having a version with enough contrast.
- **About right for the mark's shapes.** It is WCAG's own floor for large text and meaningful graphics, and it would have caught Stanford's forbidden pairing.
- **Too loose for small text inside a mark** (the descriptor at small sizes). The size clause fixes that.
- **Unusual among brand guides only in being a number.** The intent matches 8 of 12, which require contrast in words.

### 4.2 Rule 2: palette colors

| Org | Logo colors limited, or recoloring banned? | Black version? | Printing limits mentioned? |
|---|---|---|---|
| [GitHub][gh] | Yes: white, black, and in a few cases grey or green; don't change the color | yes | no |
| [Atlassian][atl] | Yes: three color options; no unapproved combinations | not stated (neutral option) | no |
| [Shopify][shp] | Implicit: don't create your own version | yes (monotone black and white) | yes: one-color logos for single-color printing budgets and where accurate color can't be reproduced |
| [Spotify][spo] | Yes: no new colors outside the palette; color as documented, no exceptions | yes | yes: avoid over-saturated colors in CMYK printing |
| [Dropbox][dbx2] | Yes: don't recolor | silent | no |
| [Mailchimp][mc] | Implicit: don't alter the files | no (reverse only) | no |
| [Slack][slack-terms] | Yes: don't use different colors or rearrange the colors | silent | no |
| [MIT][mit-logo] | Yes: core colors; black or white on colored backgrounds. Merchandise may use any color, after review ([brand architecture][mit-arch]) | yes | yes: downloads come in CMYK (print), PMS (exact color match) and RGB (screen) ([downloads][mit-dl]) |
| [UC Berkeley][ucb] | Yes: no colors beyond those specified | yes, for black-and-white and grayscale | yes: black for black-and-white and grayscale |
| [Stanford][su-wm] | Yes: no other colors or gradients | yes, for black-and-white and grayscale | yes: licensed vendors must match the Pantone colors ([logos][su-logos]) |
| [IBM][ibm] | Yes: only the blue and gray color families | yes (in examples) | no |
| [LinkedIn][li] | Yes: blue preferred; white or black otherwise | yes | yes: white or black in print when color isn't practical |

**Tallies (of 12):**
- **Explicitly limit logo colors or ban recoloring:** 10. The other 2 (Shopify, Mailchimp) ban altering the files or making your own version.
- **Offer or allow black:** 8 (GitHub, Shopify, Spotify, MIT, Berkeley, Stanford, IBM, LinkedIn).
- **Give a printing reason for one-color or color-matched versions:** 6 (Shopify, Spotify, MIT, Berkeley, Stanford, LinkedIn).
- **Allow off-palette logo colors:** 1 (MIT, merchandise only, after review).

**Supplementary:**
- Red Hat tells users not to change the logo's colors but to pick an approved colorway. It uses the one-color logo when printing costs or other constraints require it ([Red Hat logo][rh-logo]). Its color page forbids colors outside the Red Hat palette ([Red Hat color][rh-color]).
- GitLab forbids recoloring and allows one-color versions for single-color uses such as swag ([GitLab][gl]).

**Where sources disagree.**
- **Backgrounds, not marks, are where sources loosen up.** MIT ([brand architecture][mit-arch]) and IBM ([IBM][ibm]) allow a wide range of background colors, while Berkeley allows four pairings ([UC Berkeley][ucb]).
- **Rule 2 covers only the mark's own colors,** which matches all 12. Backgrounds are left to Rule 1.

**Why the wording changes.**
- **Black.** Compass's palette has no pure black. Ink is a near-black, and the glossary says to avoid calling it "black". Yet 8 of 12 offer black for single-color work, and the naming audit recommends adding it.
- **White.** Paper is not white either. A printer working on a dark shirt or sign uses white ink.
- **Exceptions.** MIT's merchandise review is the one first-party model for exceptions, so the new wording sends anything else to the owner, job by job.

### 4.3 Rule 3: who makes marks, and the single record

| Org | Making your own or altering | Route for anything new or not covered | Official files only | Old versions |
|---|---|---|---|---|
| [GitHub][gh] | Don't modify the logos; no use without written permission | Lockups need guidance and approval from GitHub Brand Studio ([cobranding][gh-co]) | silent | separate list of deprecated logos |
| [Atlassian][atl] | Never compose your own attribution logos or break apart the official files | silent | full set of app logos in its internal library | silent |
| [Shopify][shp] | Don't create your own version | Use must be authorized in writing (no route named) | silent | don't use the old logo |
| [Spotify][spo] | Orientation, color and composition as documented, no exceptions; don't make new shapes from the logo | silent | silent | silent |
| [Dropbox][dbx2] | Don't edit, recolor, rebuild or otherwise modify | Check with the brand team before using on websites, products or packaging (brand@dropbox.com) | silent | silent |
| [Mailchimp][mc] | Don't alter the files | Written consent needed to combine with other graphics | silent | silent |
| [Slack][slack-terms] | Don't modify the marks or recreate them in another typeface | Email a mockup for uses the guidelines don't cover | only use the logos Slack provides | don't use old versions |
| [MIT][mit-arch] | Don't build your own logos | The central communications office (IOC) creates sub-brand logos; request by email. Not for events or publications | silent | don't use the former logo ([MIT logo][mit-logo]) |
| [UC Berkeley][ucb-sig] | Never recreate or typeset the logo ([logos][ucb]) | All unit lockups are produced by Strategic Communications through a request form | only official logo files ([logos][ucb]) | silent |
| [Stanford][su-logos] | Don't alter the logos in any way | Contact the identity team; merchandise goes through Trademark Licensing | silent | don't use vintage marks |
| [IBM][ibm] | Don't alter; don't add your own taglines | Internal and third-party logo request forms; third-party requests judged one by one | silent | silent |
| [LinkedIn][li] | Don't combine with your logo | Trademark license through your LinkedIn contact | silent | silent |

**Tallies (of 12):**
- **Ban altering or making your own version:** 12.
- **Name a team or request route for anything new:** 8 (GitHub, Dropbox, Slack, MIT, Berkeley, Stanford, IBM, LinkedIn).
- **Have the central team make every new variant:** 2 (MIT, Berkeley). GitHub requires approval of any new lockup.
- **Address event or one-off versions:** 3, and they disagree:
  - GitHub gives time-bound events like Universe their own marks ([GitHub][gh]).
  - MIT doesn't allow sub-brand logos for events; it sends them to a different branding approach ([MIT brand architecture][mit-arch]).
  - Berkeley says not every program needs a lockup ([UC Berkeley][ucb-sig]).
- **Official files only (a single source):** 3 (Berkeley, Slack, Atlassian).
- **Ban old or retired versions:** 5 (GitHub, Shopify, Slack, MIT, Stanford).
- **Say a private master must be updated before a public site:** 0.

**Supplementary:**
- Red Hat says new initiative logos must be made with its Brand and Creative team; don't create your own ([Red Hat initiative logos][rh-init]).
- Red Hat's events don't get custom logos, apart from Red Hat Summit ([Red Hat event logos][rh-event]).
- Red Hat teams request a templated universal logo rather than designing one ([Red Hat universal logos][rh-univ]).
- GitLab keeps a single source of truth for design values and generates other formats from it automatically ([GitLab design tokens][gl-tokens]). That is the model behind the studio's planned sync from the design system to the site.

**Why the wording changes.** The proposed rule only fixes the order of publication: design system first, then the site. The sources' main concern is different: nobody outside the brand owner makes or changes a mark, and one-off versions are asked for, not improvised. The new wording keeps the order, which comes from ADR 0001, and adds:
- an owner who approves,
- a ban on homemade and one-off marks,
- a retirement step.

### 4.4 Rule 4: "use it for" on each mark

| Org | What it says each version is for | Where the line appears |
|---|---|---|
| [GitHub][gh] | Primary logo on all kinds of surfaces; the symbol alone where the brand is already clear; the wordmark lockup in most places; product lockups and event marks each with a stated use | guideline text |
| [Atlassian][atl] | Attribution logos only where the Atlassian context isn't clear; app logos where it is; symbols alone only when the context is very clear or clear space can't be kept; color options for different backgrounds | text beside the downloads; buttons show only the name and file size |
| [Shopify][shp] | Primary logo whenever possible; inverted version for dark or busy backgrounds; one-color logos under listed conditions; the bag alone in a few cases | a one-line purpose beside each download group |
| [Spotify][spo] | Icon alone only if the full logo doesn't fit or the brand is established; green only on black or white; black on light; white on dark | guideline text; buttons say "Full Logo" and "Icon" |
| [Dropbox][dbx] | Full logo for high-level uses like partnerships and video; the Tab version anchors a page layout | guideline text |
| [Mailchimp][mc] | Reverse version for dark backgrounds | guideline text |
| [Slack][slack] | silent | n/a |
| [MIT][mit-dl] | Each download card has a one-line description; format folders say what they're for (CMYK for print, PMS for exact color match, RGB for screens); the seal is reserved for ceremonies; the micro logo has a size range | on each download card |
| [UC Berkeley][ucb] | Black only for black-and-white and grayscale; expanded logo alongside the primary when space permits | guideline text |
| [Stanford][su-wm] | Cardinal red on lighter backgrounds, white on darker, black for black-and-white and grayscale; an art sheet shows colors and backgrounds | guideline text, plus the art sheet |
| [IBM][ibm] | Reversed logo is adjusted for dark backgrounds | guideline text |
| [LinkedIn][li] | Color preferred; white or black when color isn't practical | guideline text |

**Tallies (of 12):**
- **Say what every version is for:** 6 (GitHub, Atlassian, Shopify, Spotify, Dropbox, MIT).
- **Say what some versions are for:** 5 (Mailchimp, Berkeley, Stanford, IBM, LinkedIn).
- **Silent:** 1 (Slack).
- **Express purpose as a background:** 7 (Atlassian, Shopify, Spotify, Mailchimp, Stanford, IBM, LinkedIn).
- **Put the purpose on the download itself:** 1 per card (MIT), plus 1 per download group (Shopify). Most put it in nearby text and label the buttons with only a name.

**Supplementary:**
- Red Hat gives each of its three layouts a when-to-use line: logo A for most uses and wide spaces, logo B for squarer spaces, logo C only for large signs ([Red Hat logo][rh-logo]).
- GitLab names its full-color logo the default and lists when the one-color versions are acceptable ([GitLab][gl]).

**Why keep the rule, with additions.** Rule 4 already goes further than most sources by putting the line on every downloadable mark. The additions:
- **Backgrounds,** which is how most sources say what a version is for, and which Rule 1 needs on each card anyway.
- **A default,** so a visitor facing 30 cards knows where to start (8 of 12 name a primary; section 3).

Letting marks that do the same job share wording stops 30 lines from turning into filler.

### 4.5 Evidence for the missing rules

**1. Don't alter the mark.**
- **At least one "don't": 12 of 12.**
- **A specific list of misuses: 9 of 12.** GitHub ([logo][gh]), Atlassian ([logos][atl]), Shopify ([brand assets][shp]), Spotify ([design][spo]), Dropbox ([branding][dbx2]), Slack ([brand terms][slack-terms]), Berkeley ([logos][ucb]), Stanford ([wordmarks][su-wm]) and IBM ([8-bar][ibm]).
- **A general ban on altering the files only:** Mailchimp ([brand assets][mc]).
- **A few limits only:** MIT (no former logo, no color-on-color except red-on-red) ([MIT logo][mit-logo]) and LinkedIn (don't combine it with your logo or enlarge it past its native size) ([LinkedIn][li]).
- **The misuses most often named, among the 12:**
  - Recoloring: 9.
  - Stretching or distorting: 8 (GitHub, Shopify, Spotify, Dropbox, Slack, Berkeley, Stanford, IBM).
  - Shadows, gradients or other effects: 7 (GitHub, Atlassian, Shopify, Slack, Berkeley, Stanford, IBM).
  - Rearranging or breaking apart the elements: 7 (GitHub, Atlassian, Shopify, Dropbox, Slack, Berkeley, IBM).
  - Outlines: 5 (Atlassian, Slack, Berkeley, Stanford, IBM).
  - Rotating: 4 (Shopify, Spotify, Dropbox, Slack).
  - Retyping or recreating: 3 (Berkeley, Slack, Shopify).

**2. Clear space.**
- **11 of 12 address it.**
- **9 give a measurement:**
  - Atlassian: the capital A of its wordmark.
  - Shopify: the wordmark's x-height.
  - Spotify: half the icon's height.
  - Slack: one pill shape from its symbol ([brand terms][slack-terms]).
  - MIT: the width of the M.
  - Berkeley: the letter e.
  - Stanford: the x-height of "Stanford".
  - IBM: the logo's height.
  - LinkedIn: one [in] logo.
- **No measurement:** GitHub shows only a diagram, and Mailchimp asks for plenty of space.
- **Silent:** Dropbox.
- The naming audit recommends measuring Compass's clear space from the glyph.

**3. Who may use the marks, and when to ask: 10 of 12.**
- GitHub: written permission required ([logo][gh]); no merchandise without approval ([cobranding][gh-co]).
- Shopify: use must be authorized in writing ([brand assets][shp]).
- Spotify: licensing terms ([design][spo]).
- Dropbox: check in first before websites, products or packaging ([branding][dbx2]).
- Mailchimp: nothing that implies endorsement ([brand assets][mc]).
- Slack: limited circumstances only; no merchandise ([brand terms][slack-terms]).
- MIT: downloads for the MIT community; outsiders ask ([downloads][mit-dl]).
- Stanford: for university activities; merchandise licensed ([logos][su-logos]).
- IBM: third-party requests judged individually ([8-bar][ibm]).
- LinkedIn: license required ([LinkedIn][li]).
- **Silent on the pages read:** Atlassian and Berkeley.

**4. Next to another company's logo: 8 of 12 address it, and they disagree.**
- **Forbid it (3):**
  - Spotify forbids co-branded communications ([design][spo]).
  - Stanford: don't place its logos beside or inside another logo ([logos][su-logos]).
  - LinkedIn: don't combine its logo with yours ([LinkedIn][li]).
- **Allow it, with rules (4):**
  - GitHub: about the same size, and Brand Studio approves lockups ([cobranding][gh-co]).
  - MIT: equal prominence, in the same field of view ([brand architecture][mit-arch]).
  - Dropbox: the partner's name and logo should be more prominent ([branding][dbx2]).
  - IBM: judged case by case ([8-bar][ibm]).
- **Allow it with written consent (1):** Mailchimp ([brand assets][mc]).
- **Supplementary:** Red Hat lets the brand that leads the effort go first ([Red Hat logo][rh-logo]).
- **For Compass:** the suggested wording defaults to equal size because that is the most common size rule, and leaves room for the studio to agree to other arrangements, such as a builder's sign where the builder leads.

**5. A default mark: 8 of 12.**
- Named outright: GitHub ([logo][gh]), Shopify ([brand assets][shp]), Spotify ([design][spo]), MIT ([MIT logo][mit-logo]), Berkeley ([logos][ucb]) and Stanford ([logos][su-logos]).
- In other words: LinkedIn names a preferred color ([LinkedIn][li]), and Dropbox calls its full logo the foundational one ([logo][dbx]).
- IBM has only one logo, so the question doesn't arise ([8-bar][ibm]).

**6. Minimum size: 7 of 12.**
- Atlassian: 280 px for logos with app names beneath ([logos][atl]).
- Shopify: 80 px or 28 mm ([brand assets][shp]).
- Spotify: 70 px or 20 mm; the icon 21 px or 6 mm ([design][spo]).
- MIT: 30 px or 0.25 in, with a micro logo below that ([MIT logo][mit-logo]).
- Berkeley: 200 px or 1.75 in ([logos][ucb]).
- Stanford: 85 px or 0.85 in ([wordmarks][su-wm]).
- LinkedIn: 21 px or 0.25 in ([LinkedIn][li]).
- Supplementary: GitLab, 20 px or 11 mm ([GitLab][gl]).

**7. Photos and busy backgrounds: 6 of 12.**
- **Stated directly (5):**
  - GitHub: no busy backgrounds ([logo][gh]).
  - Atlassian: no complex backgrounds ([logos][atl]).
  - Shopify: no busy backgrounds; use the inverted or one-color version ([brand assets][shp]).
  - Spotify: keep out of busy image areas; the green logo goes only with black, white or non-duotone photos ([design][spo]).
  - IBM: a full section on photography, calling for clear, simple, high-contrast areas ([8-bar][ibm]).
- **Implied (1):** LinkedIn allows only solid backgrounds ([LinkedIn][li]).
- **Supplementary:**
  - Red Hat: choose an uncluttered spot and the version with the best contrast ([Red Hat logo][rh-logo]).
  - IBM's color page: over a gradient, check against the lowest-contrast part ([IBM color][ibm-color]). That is the basis for Rule 1's "lightest or darkest part" check.

**8. Retired versions: 5 of 12.** GitHub ([logo][gh]), Shopify ([brand assets][shp]), Slack ([brand terms][slack-terms]), MIT ([MIT logo][mit-logo]) and Stanford ([logos][su-logos]). Supplementary: Red Hat ([Red Hat logo][rh-logo]).

**9. Not used as a letter or in a sentence: 2 of 12.**
- Spotify: don't use the logo in a sentence or as a letter ([design][spo]).
- Stanford: don't use the wordmark in place of the word "Stanford" ([wordmarks][su-wm]).
- Supplementary: GitLab, don't use the logo in a line of text ([GitLab][gl]).

---

## 5. Sources

All accessed 20 October 2026.

**Standards**

- W3C, Web Content Accessibility Guidelines (WCAG) 2.2, W3C Recommendation 12 December 2024: https://www.w3.org/TR/WCAG22/
- W3C, Understanding SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
- W3C, Understanding SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
- US Access Board, ADA Accessibility Standards (2010 ADA Standards; sections 216.1 and 703.5.1): https://www.access-board.gov/ada/

**Core sample (brand owners' own pages)**

- GitHub:
  - Brand Toolkit, Logo: https://brand.github.com/foundations/logo
  - Brand Toolkit, Cobranding: https://brand.github.com/brand-identity/cobranding
- Atlassian Design, Logos: https://atlassian.design/foundations/logos
- Shopify, Using our brand: https://www.shopify.com/brand-assets
- Spotify for Developers, Design & Branding Guidelines: https://developer.spotify.com/documentation/design
- Dropbox:
  - Brand Guidelines, Logo: https://brand.dropbox.com/logo
  - Branding guidelines (use of Dropbox brand materials): https://www.dropbox.com/branding
- Mailchimp (Intuit), Brand Assets: https://mailchimp.com/about/brand-assets/
- Slack:
  - Media Kit: https://slack.com/media-kit
  - Slack Brand Terms of Service (logo use guidelines): https://slack.com/terms-of-service/slack-brand
- MIT Brand Guide:
  - MIT Logo: https://brand.mit.edu/logos-marks/mit-logo
  - Brand Architecture: https://brand.mit.edu/brand-architecture
  - Downloads: https://brand.mit.edu/downloads
- UC Berkeley Brand:
  - Logos: https://brand.berkeley.edu/visual-identity/logos/
  - Signature system: https://brand.berkeley.edu/visual-identity/signature-system/
- Stanford Identity Guide:
  - Stanford Logos: https://identity.stanford.edu/visual-identity/stanford-logos/
  - Wordmarks: https://identity.stanford.edu/visual-identity/stanford-logos/wordmarks/
  - Overview: https://identity.stanford.edu/visual-identity/overview
- IBM Design Language:
  - 8-Bar: https://www.ibm.com/design/language/ibm-logos/8-bar/
  - Color: https://www.ibm.com/design/language/color/
- LinkedIn Brand Guidelines, LinkedIn Logo: https://brand.linkedin.com/en-us/linkedin-logo

**Supplementary (brand owners' own pages and docs)**

- Red Hat Brand Standards:
  - The Red Hat logo: https://www.redhat.com/en/about/brand/standards/logo
  - Color (Overview and Accessibility tabs): https://www.redhat.com/en/about/brand/standards/color
  - Event logos: https://www.redhat.com/en/about/brand/standards/event-logos
  - Initiative logos: https://www.redhat.com/en/about/brand/standards/initiative-logos
  - Universal logos: https://www.redhat.com/en/about/brand/standards/universal-logos
- GitLab:
  - Pajamas, Core logo: https://design.gitlab.com/brand-logo/core-logo
  - GitLab Docs, Design tokens: https://docs.gitlab.com/development/fe_guide/design_tokens/

**Tried but not usable (20 October 2026)**

- Slack Brand Center (HTTP 404): https://brand.slackhq.com/logo and https://brand.slackhq.com/
- NHS Identity Guidelines (empty response to automated reading): https://www.england.nhs.uk/nhsidentity/identity-guidelines/organisational-logos/
- Stanford unit logo pages (Stanford login required): https://ucomm.stanford.edu/policies/unit-logos/ and https://identity.stanford.edu/visual-identity/stanford-logos/unit-personalized-mark
- GitLab design system direction page (redirects to an unrelated "What's new" page): https://about.gitlab.com/direction/manage/design_system/
- Google search results only (UK Government Communication Service branding guidance, third-party brand-guide copies): not used, because I couldn't read the first-party pages themselves.

[wcag]: https://www.w3.org/TR/WCAG22/
[u143]: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
[u1411]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[ada]: https://www.access-board.gov/ada/
[gh]: https://brand.github.com/foundations/logo
[gh-co]: https://brand.github.com/brand-identity/cobranding
[atl]: https://atlassian.design/foundations/logos
[shp]: https://www.shopify.com/brand-assets
[spo]: https://developer.spotify.com/documentation/design
[dbx]: https://brand.dropbox.com/logo
[dbx2]: https://www.dropbox.com/branding
[mc]: https://mailchimp.com/about/brand-assets/
[slack]: https://slack.com/media-kit
[slack-terms]: https://slack.com/terms-of-service/slack-brand
[mit-logo]: https://brand.mit.edu/logos-marks/mit-logo
[mit-arch]: https://brand.mit.edu/brand-architecture
[mit-dl]: https://brand.mit.edu/downloads
[ucb]: https://brand.berkeley.edu/visual-identity/logos/
[ucb-sig]: https://brand.berkeley.edu/visual-identity/signature-system/
[su-logos]: https://identity.stanford.edu/visual-identity/stanford-logos/
[su-wm]: https://identity.stanford.edu/visual-identity/stanford-logos/wordmarks/
[ibm]: https://www.ibm.com/design/language/ibm-logos/8-bar/
[ibm-color]: https://www.ibm.com/design/language/color/
[li]: https://brand.linkedin.com/en-us/linkedin-logo
[rh-logo]: https://www.redhat.com/en/about/brand/standards/logo
[rh-color]: https://www.redhat.com/en/about/brand/standards/color
[rh-event]: https://www.redhat.com/en/about/brand/standards/event-logos
[rh-init]: https://www.redhat.com/en/about/brand/standards/initiative-logos
[rh-univ]: https://www.redhat.com/en/about/brand/standards/universal-logos
[gl]: https://design.gitlab.com/brand-logo/core-logo
[gl-tokens]: https://docs.gitlab.com/development/fe_guide/design_tokens/
