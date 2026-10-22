# Filled buttons at the page close

Research for one line of the design system's page anatomy. The README says a page close is "A short display line (optionally an eyebrow above) and a single arrow link, never a filled button." Canyon Browning thinks "never" is too strong for the web: a filled button is too useful to ban, so he would keep a preference for the quieter editorial styles instead. This note checks his view against platform, accessibility and editorial design systems and against live sites, then proposes new README wording. Every page was read on **21 October 2026**.

Related: [prototype-options.md](../prototype-options.md) (item 14, the request trigger, and the decisions table), [ADR 0001](../adr/0001-design-system-artifact-is-the-master.md) (brand rules change in the design system artifact first) and [ADR 0002](../adr/0002-page-text-meets-wcag-aa.md) (page text contrast).

## How to read this

- **Sources.** First-party only: platform design guidelines, W3C documents, publishers' own design systems and the brands' own live sites. Each claim links to a numbered source in §6. Sentences marked *(judgment)* are recommendations, not findings.
- **Method.**
  - Design-system pages were downloaded as HTML or read in a browser. Their wording is paraphrased here, with one short quotation.
  - Live sites were opened in a browser at desktop width. A script read every visible link and button and sorted it by computed style: **filled** (a solid background that differs from what's behind it), **outline** (a visible border, no fill) or **text**. Cookie banners were excluded and left alone. Hover states and phone layouts were not checked. Each site is a snapshot from one day.
  - Compass's own facts come from a local copy of the design system README and its `tokens.json` (read as data; the artifact is the master), the Brand resources prototype in `prototype/brand-resources/`, and the live site at compass-design.studio.
- **Could not be used.**
  - FT Origami's GitHub repositories for `o-buttons` and `o3-button` returned 404, and `registry.origami.ft.com` didn't connect. The FT's own README for `o-buttons` was read from its published npm package instead [9], along with the FT's current guidelines site [10].
  - `polaris-react.shopify.com` closed the connection. Shopify's current Polaris page on shopify.dev was used instead [6].
  - Amber Interiors' home page rendered no readable controls. The Row's home page had none outside the footer.

---

## 1. Summary

- **Canyon's view holds up. No system I read bans the filled button. They all ration it.**
  - Every platform system and every publisher system has a filled, highest-emphasis button.
  - Most cap it at about one: one per page (GOV.UK [1], IBM Carbon [2], Material 3 [4]), one per page or area (Atlassian [3], Financial Times [9], [10]), or one or two per view (Apple [5]). Polaris and the Guardian say to use it sparingly [6], [7]; the Washington Post states no limit [11].
  - Carbon and the FT don't count the site header, a modal or a side panel toward that limit [2], [9].
- **The filled button is tied to actions, not to navigation.**
  - Material reserves the filled style for important actions that finish a task, such as saving or confirming [4].
  - Carbon and Atlassian say buttons act and links navigate, and not to use a button just to go to another page [2], [3].
  - The W3C's button pattern lists opening a dialog as a button's job. When something looks like a link but acts like a button, it says the better fix is to "adjust the visual design so it matches the function" [12].
  - The Brand resources page close opens a request form. That is an action, so under the current rule it has to look like a link while doing a button's job.
- **WCAG doesn't settle it either way.**
  - Neither style is required. A control whose text makes it recognizable needs no visible boundary [14].
  - The same document recommends showing the boundary of every control anyway, as best practice for people with cognitive disabilities [14].
  - Targets must be at least 24 × 24 px or well spaced [15]. 44 × 44 px is the stricter AAA level [16]. A 44 px filled button meets both outright; an arrow link at the page close passes on spacing.
- **Quiet brands use links for navigation. Filled shows up only when there is an action, and the quietest sites have none.**
  - [Aesop][s-aesop] is the clearest example: every link to another page is an outline button, and filled buttons appear only on actions ("Add to cart", the newsletter "Submit").
  - The architecture and interiors studios (John Pawson, Olson Kundig, Norm Architects, Jake Arnold) have no buttons at all. They also have no forms: inquiries go by email link.
  - When a page ends in a form, most sites use a filled submit (Aesop, Workstead, Monocle, and Compass's own contact page). Studio McGee is the exception: it keeps even its inquiry submit outlined.
- **Compass already breaks the rule.** None of the four live page closes uses an arrow link. Home and Work use filled buttons; Studio and Process use outline buttons (§4).
- **Recommendation *(judgment)*.** Replace "never" with a default and one condition: an arrow link by default, and a filled button only when the close starts something, like a form. Add one general line limiting filled buttons to one per view, not counting the nav. Exact wording is in §5.

---

## 2. What platform and accessibility guidance says

| Source | How many of the strongest style | What it's for | Links and buttons |
|---|---|---|---|
| **GOV.UK** [1] | Avoid more than one default (main) button on a page; more than one reduces their impact and makes the next step unclear. | The main call to action on a page. | Its "start" button is a link styled as a button, because it navigates rather than submits. |
| **IBM Carbon** [2] | One primary button per page; once per screen, not counting the application header, a modal or a side panel. Never two high-emphasis buttons in one group. | The principal call to action. Everything else gets lower emphasis. | Don't use buttons as navigation; use links to take people to a new page. |
| **Atlassian** [3] | One primary button or call to action per page or area; several compete for attention. | The most important action in a group or area. | Buttons act on the current page (submit a form, close a modal). Links go to a new page or anchor. Don't swap them: screen readers treat them differently. |
| **Material 3** [4] | Filled should be used sparingly, ideally for one action on a page. Too many buttons break the visual hierarchy. | Important, final actions that complete a flow (its examples are save, join and confirm). Extra actions can be text links instead. | Outline and text buttons depend on color to be recognized, so use them with care next to similar elements. |
| **Apple HIG** [5] | One or two prominent buttons per view; more adds cognitive load. | The most likely action in a view. | n/a |
| **Shopify Polaris** [6] | The primary variant is high emphasis, for the main action on the page, and should be used sparingly. | Main actions, with secondary and tertiary for the rest. | Buttons may navigate (they take an `href`); links are for navigation within text. |
| **W3C APG, Button** [12] | n/a | Triggering an action: submitting a form, **opening a dialog**, cancelling, deleting. | A button's look and role should both match what it does. A link-styled control that acts like a button should get the button role, but restyling it is the better fix. |
| **W3C APG, Link** [13] | n/a | A link is a reference to a resource, on this page or another. | Use a real `<a href>`. |

**WCAG 2.2.**

- **Identifying a control (1.4.11 Non-text Contrast) [14].** WCAG doesn't require a visible boundary when the control's text already shows it is there; a text-only button can pass. Even so, the Understanding document recommends delineating every control's boundary as best practice for people with cognitive disabilities. It also notes that some users are likely to recognize a button more easily when it has an outline that meets contrast. Where a boundary *is* the only cue, it needs 3:1.
- **Target size (2.5.8, AA) [15].** At least 24 × 24 CSS px, unless the target is spaced well apart from other targets. The inline exception covers links inside sentences, not a stand-alone arrow link. For important controls, the document suggests aiming for **2.5.5 (AAA): 44 × 44 px** [16].
- **Takeaway *(judgment)*.** Accessibility guidance permits both styles. It leans slightly toward a visible boundary for the one control a page most wants people to find.

---

## 3. What editorial and quiet-brand systems do

### 3.1 Publishers' design systems

| System | Filled button? | Limit | Notes |
|---|---|---|---|
| **The Guardian, Source** [7], [8] | Yes: four priorities (primary, secondary, tertiary, subdued). | Primary is for the main call to action on a page, and the guidance says the fewer primaries there are, the stronger they look. | Source asks for contrasting pairs, so color isn't the only thing that sets the main button apart. Links are described as navigational aids with their own primary and secondary priorities. Source's code also has a `LinkButton` (a link styled as a button) next to `Button` [8b]. |
| **Financial Times, Origami** [9], [10] | Yes: primary (filled), secondary (outline), ghost. | No more than one primary per page or product area: a form, a modal, or within an article. Other calls to action are secondary or ghost. The header, modals, on-site messaging and side panels don't count [9]. The current guidelines agree: primary is kept for a view's most important action, and each context gets one [10]. | Observed in the FT's o3 Storybook: primary is a teal fill (#0d7680) with white text; secondary is a teal outline [10b]. Buttons may be `<button>` or `<a>`. All buttons get at least a 44 px target [10]. |
| **Washington Post, WPDS** [11] | Yes: primary, secondary and a dedicated `cta` variant, each optionally outlined. | None stated on the button page. | Guidance covers width (avoid buttons narrower than 120 px) and consistent density, not emphasis. |

All three publishers keep a filled button. The two that write usage rules both cap it at one per page or area.

### 3.2 Live sites of restrained brands

Observed 21 October 2026, home page unless stated. "Filled for actions" means a filled `<button>` that does something on the page, such as adding to a cart or submitting a form.

| Site | Kind | Links to other pages | How the page ends | Filled buttons seen |
|---|---|---|---|---|
| [John Pawson][s-pawson] | Architecture | None on the home page (name only) | Image | None |
| [Olson Kundig][s-ok] | Architecture | Underlined text sentences ("View our projects.", "See how we work.") | Text links, then footer. The [contact page][s-ok-contact] lists email addresses; no form | None |
| [Norm Architects][s-norm] | Architecture, interiors | Small text links ("View") | Project list | None |
| [Jake Arnold][s-jake] | Interiors | One email link | Email link | None |
| [Studio McGee][s-mcgee] | Interiors | Outline buttons ("See more projects", "About") | Outline "Shop new arrivals". The [full-service page][s-mcgee-fs] ends in an inquiry form whose "Send inquiry" submit is **outline** | Only the newsletter "Submit" in the footer (grey) |
| [Workstead][s-workstead] | Interiors, lighting | Text links | A "Join our community" sign-up form | Its submit, "Subscribe & Join Us" (white on dark) |
| [Aesop][s-aesop] | Luxury retail | **Outline** buttons on every link to another page ("Explore the story", "Learn more", "Find a nearby store") | Outline "Find a nearby store", then footer | **Only on actions:** "Add to cart", "Join waiting list", the footer newsletter "Submit" |
| [Kinfolk][s-kinfolk] | Editorial magazine | Text links | A subscribe block with outline "Subscribe now" and "Learn more" | Only a "Checkout" link that appears to belong to the cart panel |
| [Monocle][s-monocle] | Editorial magazine | Mostly text links | A newsletter sign-up form with a filled "Subscribe" submit | Several: yellow "Subscribe" (a link), "Listen live", black "View full programme" (a link) |
| [The Row][s-row] | Luxury fashion | None outside the footer | Footer | None |

**What the sample shows.**

- **Links to other pages are text or outline buttons at 9 of the 10 sites.** Monocle is the only one that fills navigation buttons.
- **A filled button usually means "do something here."** Aesop is the cleanest case: outline buttons for going somewhere, filled ones for doing something. Workstead and Monocle end their pages with a form and a filled submit, and so does Compass's contact page (§4).
- **The quietest sites avoid the question rather than answer it.** Pawson, Olson Kundig, Norm and Jake Arnold have no forms and no buttons. A rule against filled buttons costs them nothing. Compass has an intake form and now a request form, so it does have actions to style.
- **Studio McGee is the strongest support for the current rule.** It outlines even its inquiry submit. A fully quiet treatment of actions is a real choice, not just an oversight.

---

## 4. What Compass does today

**The rule.** Page anatomy in the README: "A short display line (optionally an eyebrow above) and a single arrow link, never a filled button." The paired examples are "Have a site in mind? / Begin a project →" and "See what the studio has built. / View projects →".

**The tokens** (`tokens.json`):
- `ink` is the primary button fill.
- `light-gold` is the fill of the gold button and the nav CTA.
- `gold-deep` is listed for arrow links. It measures 3.18:1 on Paper, so it passes text contrast only at 24 px and up, or 19 px bold ([ADR 0002](../adr/0002-page-text-meets-wcag-aa.md)'s floor is 4.5:1 for smaller text).

**The live site** (observed 21 October 2026; each close is a `section.nextband`, and the home page's is `section.cta-work`):

| Page | Page close | Style | Goes to |
|---|---|---|---|
| Home | "Selected work / A few places we've shaped. / View projects →" | **Filled** (`btn btn-primary`) | /projects |
| Work | "Have a site in mind? / Begin a project →" | **Filled** (`btn btn-primary`) | /contact |
| Studio | "See what the studio has built. / View projects →" | Outline (`btn btn-outline`) | /projects |
| Process | "See where this process leads. / View projects →" | Outline (`btn btn-outline`) | /projects |
| Every page | Nav "Begin a project", in a sticky header | **Filled** | /contact |
| Contact | Form submit "Send inquiry →" | **Filled** `<button type="submit">` | (submits) |

- **No live page close uses an arrow link.** Two of the four use a filled button.
- **On Work, two filled buttons share the screen at the bottom of the page:** the sticky nav's "Begin a project" and the close's "Begin a project →". Carbon and the FT would count only the close, because they exclude the header [2], [9].
- **Two side findings, outside this question:**
  - The live filled buttons use `gold` (#ad9a4c), not `ink` or `light-gold` as the tokens say.
  - Button labels render in uppercase with wide tracking, though the README says buttons are sentence case.

**Brand resources** (prototype, Canyon's picks in prototype-options.md item 14):
- **Page close:** "Need a file that isn't here?" with a filled Ink `<button>` that opens the request form.
- **Top bar:** an outline "Request a file" button.
- **Elsewhere:** the hero has a filled light-gold "Download logos" on the Ink plate, so the page has two filled buttons, though never in the same view. The mobile menu sheet has a filled light-gold "Request a file".
- **The arrow-link variant** marks up its trigger as `<a href="#" role="button">`. That is the mismatch the W3C pattern says to fix by changing the look, not the role [12].
- **Arrow link color:** the prototype sets it in `navy-deep` (8.58:1 on Paper), not `gold-deep`.

---

## 5. Recommendation

### 5.1 Proposed README wording *(judgment)*

**Page close** (replaces the current sentence; the pairs, padding and alignment stay as they are):

> **Page close.** A short display line (optionally an eyebrow above) and one call to action: an arrow link by default, a filled button only when it starts something, like a form.

**One line for general button guidance**, under Visual foundations next to Hover states:

> **Filled buttons.** One per view at most, for the main action, not counting the nav.

### 5.2 Why this wording

- **"By default" keeps the quiet style as the rule.** That matches the editorial sample (§3.2) and the drafting-plate look. It is the preference Canyon asked for, not a ban.
- **"Starts something, like a form" is the condition the evidence supports.** Material, Carbon, Atlassian and the W3C pattern all tie strong buttons to actions [2], [3], [4], [12], and Aesop draws the same line on a live site. It covers the Brand resources request form and the Work page's "Begin a project →", which starts an inquiry the way GOV.UK's start button starts a service [1]. It doesn't cover "View projects →", which only goes somewhere.
- **"One per view, not counting the nav" is the most common cap, measured in the unit that fits long scrolling pages.**
  - GOV.UK, Carbon and Material count per page [1], [2], [4]. Apple counts per view [5]; Atlassian and the FT count per area [3], [9].
  - Carbon and the FT exclude the header [2], [9]. Without that exclusion, the filled nav CTA would use up every page's allowance.
  - Counting per view lets Brand resources keep both its hero download and its close, which are never on screen together. A per-page count would force one of them to step down.
- **Both lines are one sentence each, in the README's voice:** sentence case, no exclamation points.

### 5.3 What changes if adopted *(judgment)*

| Where | Today | Under the new wording |
|---|---|---|
| Brand resources close | Filled Ink, opens the request form | **Allowed.** Keep it a real `<button>` that opens the dialog. |
| Live Work close, "Begin a project →" | Filled | **Allowed:** it starts an inquiry. |
| Live Home close, "View projects →" | Filled | Becomes an arrow link: it only navigates. |
| Live Studio and Process closes, "View projects →" | Outline | Become arrow links. |
| Nav "Begin a project" | Filled | Unchanged; the nav doesn't count. |
| Contact submit, "Send inquiry →" | Filled | Unchanged: it is the page's main action. |

- **Set the arrow link in `navy-deep`.** The token file names `gold-deep` for arrow links, which passes text contrast only at 24 px and up ([ADR 0002](../adr/0002-page-text-meets-wcag-aa.md)). The prototype already uses `navy-deep`. *(judgment)*
- **Record the change in the design system artifact first**, then here, per [ADR 0001](../adr/0001-design-system-artifact-is-the-master.md). Prototype-options.md item 14 already asks for this.

### 5.4 Alternatives considered

- **Keep "never".** This contradicts two live pages and the contact form, and it forces the Brand resources trigger to look like a link while doing a button's job [12]. Not recommended.
- **"Prefer an arrow link", with nothing more.** This is closest to Canyon's phrasing, but it doesn't say when a filled button is right or how many are allowed, so each page would decide for itself. Not recommended.
- **Allow an outline button as a middle option** ("an arrow link or outline button by default"). This would match the live Studio and Process closes, and Aesop and Studio McGee use outline buttons for navigation. It adds a third choice to a one-line rule. Worth it only if the studio wants to keep those two closes as they are.

---

## 6. Sources

All read on 21 October 2026.

**Platform and product design systems**

1. GOV.UK Design System, Button: https://design-system.service.gov.uk/components/button/
2. IBM Carbon Design System, Button (usage guidelines; `/components/button/usage/` redirects here): https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines
3. Atlassian Design System, Button, Usage: https://atlassian.design/components/button/usage
4. Material Design 3, Buttons, Guidelines: https://m3.material.io/components/buttons/guidelines
5. Apple Human Interface Guidelines, Buttons: https://developer.apple.com/design/human-interface-guidelines/buttons (read from its data file: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/buttons.json)
6. Shopify Polaris, Button (web components): https://shopify.dev/docs/api/app-home/latest/web-components/actions/button

**Publishers' design systems**

7. The Guardian, Source, Button: https://theguardian.design/2a1e5182b/p/435225-button
8. The Guardian, Source, Link: https://theguardian.design/2a1e5182b/p/43c26b-link
   - 8b. Source code, button directory (`Button.tsx`, `LinkButton.tsx`): https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/button
9. Financial Times, `o-buttons` README v7.11.1, from the FT's published npm package: https://unpkg.com/@financial-times/o-buttons@7.11.1/README.md
10. Financial Times, Origami, Buttons (design guidelines, linked from the `o3-button` README): https://origami-beta.ft.com/components/buttons/
    - 10b. FT o3 Storybook, Button: https://o3.origami.ft.com/?path=/docs/components-button--docs
11. Washington Post Design System, Button: https://build.washingtonpost.com/components/button

**W3C**

12. WAI-ARIA Authoring Practices Guide, Button Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/button/
13. WAI-ARIA Authoring Practices Guide, Link Pattern: https://www.w3.org/WAI/ARIA/apg/patterns/link/
14. Understanding WCAG 2.2, SC 1.4.11 Non-text Contrast: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
15. Understanding WCAG 2.2, SC 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
16. Understanding WCAG 2.2, SC 2.5.5 Target Size (Enhanced): https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html

**Live sites, observed 21 October 2026**

- John Pawson: https://www.johnpawson.com/
- Olson Kundig: https://olsonkundig.com/ and https://olsonkundig.com/contact/
- Norm Architects: https://normcph.com/
- Jake Arnold: https://jakearnold.com/
- Studio McGee: https://www.studio-mcgee.com/ and https://www.studio-mcgee.com/work-with-us/full-service
- Workstead: https://workstead.com/
- Aesop: https://www.aesop.com/ (`/us/` redirects here)
- Kinfolk: https://www.kinfolk.com/
- Monocle: https://monocle.com/
- The Row: https://www.therow.com/
- Compass Design Studio: https://www.compass-design.studio/ and its `/projects`, `/studio`, `/process` and `/contact` pages

**Compass's own files**

- Design system README and `tokens.json` (local copy of the artifact's export; the artifact is the master, per ADR 0001)
- Brand resources prototype: `prototype/brand-resources/app.js` (`requestTrigger`, `renderClose`) and `styles.css` (`.btn-*`, `.arrow-link`, `.page-close`)
- [prototype-options.md](../prototype-options.md), item 14 and the decisions table

[s-pawson]: https://www.johnpawson.com/
[s-ok]: https://olsonkundig.com/
[s-ok-contact]: https://olsonkundig.com/contact/
[s-norm]: https://normcph.com/
[s-jake]: https://jakearnold.com/
[s-mcgee]: https://www.studio-mcgee.com/
[s-mcgee-fs]: https://www.studio-mcgee.com/work-with-us/full-service
[s-workstead]: https://workstead.com/
[s-aesop]: https://www.aesop.com/
[s-kinfolk]: https://www.kinfolk.com/
[s-monocle]: https://monocle.com/
[s-row]: https://www.therow.com/
[1]: https://design-system.service.gov.uk/components/button/
[2]: https://www.carbondesignsystem.com/building-blocks/core/components/button/guidelines
[3]: https://atlassian.design/components/button/usage
[4]: https://m3.material.io/components/buttons/guidelines
[5]: https://developer.apple.com/design/human-interface-guidelines/buttons
[6]: https://shopify.dev/docs/api/app-home/latest/web-components/actions/button
[7]: https://theguardian.design/2a1e5182b/p/435225-button
[8]: https://theguardian.design/2a1e5182b/p/43c26b-link
[8b]: https://github.com/guardian/csnx/tree/main/libs/@guardian/source/src/react-components/button
[9]: https://unpkg.com/@financial-times/o-buttons@7.11.1/README.md
[10]: https://origami-beta.ft.com/components/buttons/
[10b]: https://o3.origami.ft.com/?path=/docs/components-button--docs
[12]: https://www.w3.org/WAI/ARIA/apg/patterns/button/
[13]: https://www.w3.org/WAI/ARIA/apg/patterns/link/
[14]: https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[15]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[16]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html
[11]: https://build.washingtonpost.com/components/button
