# Where the logo usage rules should be mastered

Usage rules are getting their own visual section on Brand resources. It will be designed first in the high-fidelity prototype, then built as a matching usage section in the Figma file. This document answers one question: where should the master copy of those rules live? The options are the Figma file, markdown in this repo, the design system README, or somewhere else. It also covers how the rule text and the do and don't pictures reach the site and stay in step. Every web page was read on **21 October 2026**.

Related: [ADR 0001][adr1] (the design system is the master), [issue #1][issue1] (the planned sync), [prototype-options.md][proto] item 22 (the visual usage section), [brand-kit-ground-rules.md][ground] (the rules being adopted), [logo-display-patterns.md][display] section 4 (the "Usage" disclosure) and the [glossary][glossary].

## How to read this

- **Sources.** All first-party: Figma's Help Center, blog and developer docs; the Primer, Polaris and GitLab docs and repos; the zeroheight, Frontify, Brandfolder and Supernova help pages; GitHub's and Red Hat's brand pages; Write the Docs. Every claim links to its source in section 8. Guideline wording is paraphrased, with one direct quote (Figma's).
- **Status of two examples.** The public `primer/design` repo was archived in July 2025, and Primer's contribution guide now links to a staff-only docs repo. Shopify's `Shopify/polaris` repo is archived, and it describes the React library as deprecated. Their documentation practice is still readable and still applies.
- **Could not be used:**
  - zeroheight's Help Center refuses automated page reads (HTTP 403). Its articles were read through the Help Center's public article API, which returns the same article text.
  - Atlassian's Figma library page rendered no text without scripts.
  - No official GOV.UK statement on its Figma kit was found. Its resources page lists only a community-made Figma library that the team doesn't support.
  - Carbon's design resources page has no guidance on documentation images.
- **Local facts** come from the design system copy in the session scratchpad (`ds-current/project`), the prototype export in `tmp/uploads/`, `public/logos/` and `gh issue view 1`.
- *(judgment)* marks a recommendation rather than a finding.
- **Terms** follow the [glossary][glossary]. "Master" means the copy that wins when two copies disagree, as in [ADR 0001][adr1].

---

## 1. Recommendation

**The words live in the design system. The pictures are drawn from the marks. Figma draws only the scenes and keeps a working mirror.**

| What | Mastered in | Reaches Brand resources by | Kept in step by |
|---|---|---|---|
| **Rule wording**: the four ground rules, the missing rules, who may use the marks, other companies' logos, "Start here" | The design system README, in one "Using the marks" section | Claude copies it by hand in v1. Later, the [issue #1][issue1] sync opens a pull request | One direction only ([ADR 0001][adr1]); a stable ID for each rule; the sync diff |
| **Numbers and per-colorway facts**: minimum sizes, the clear-space unit, approved backgrounds, the "use it for" lines | The same README section, as a table with fixed columns | Copied, or converted by the sync, into one data file the site reads | One value per fact. Change it once and every diagram and caption follows |
| **Diagrams drawn from the marks**: each "don't" applied to a real mark, clear space, minimum size, approved backgrounds, the "Start here" pair | **No picture master.** The site's code draws them from the mark SVGs in `public/logos/` plus the numbers | Built with the site | They can't drift: change the art or a number and they redraw |
| **Scenes**: realistic mockups that can't be drawn from a mark alone, such as a builder's job-site sign or embroidery, if the prototype chooses mockups over diagrams | The Figma usage section | Exported from Figma, recorded in the design system's asset store, then copied to the repo. This is the path marks already take | Frame and file names carry the rule ID; a checklist in the sync |
| **The Figma usage section** as a whole | A mirror of the site's section for design work, and the home of the scenes | Not published | Built from instances of the mark components and the Brand variables. Short labels only, never the full rule sentences. A note at the top says the wording is mastered in the design system |

**Is it best practice to master usage rules in the Figma file?** For the pictures, often yes: Primer and zeroheight both draw do and don't pictures in Figma (section 2). For the words, no. Figma's own guidance sends longer documentation to a separate file or an external site. Every documentation platform checked writes the rule text in its documentation layer, and every published brand guide checked sets the rule sentence as page text beside its picture. Compass has one extra advantage: almost every planned diagram can be drawn straight from the mark files, so most pictures need no master at all.

---

## 2. What the sources do

### 2.1 Figma's own guidance

- **Descriptions plus a link out.** Short descriptions go on components, styles and variables. A component can also link to design system documentation kept in an external tool ([Figma: descriptions][figma-desc]).
- **Long documentation goes in its own file.** Figma's file-organization guide puts short usage notes and status in the component description and says: "Keep longer documentation in a separate file so docs and components version independently" ([Figma: file organization][figma-org]).
- **No single required home.** Figma's design systems course lists formats from notes on the canvas to dedicated websites. It says to choose by audience, timing and access, warns that people won't use documentation they can't find, and recommends documenting decisions as you go ([Figma Learn, lesson 2][figma-l2]).
- **Teams mix tools.** Figma's 2025 article on documentation says large organizations often build custom sites, smaller teams often start in Notion or Confluence, and many combine approaches. It warns that out-of-date documentation leads to inconsistent work and costs the system credibility ([Figma blog, Design systems 103][figma-103]).
- **Figma's own AI reads rules as markdown.** Guidelines for Figma Make kits are `.md` files in a `guidelines/` folder. Figma recommends many short files over a few long ones, with overview files that point to the detailed ones ([Figma: Make kit guidelines][figma-make]).
- **Live embeds follow the file's sharing.** If a file is shared only within an organization, people must sign in to see an embed. Otherwise, access follows the file's link-sharing settings, and Figma advises reviewing those before embedding a file in a website ([Figma: embeds][figma-embed]). So a public page can't show live frames from a private file without opening the file to the public.
- **Frames can be exported by API.** The REST API renders any frame as SVG, PNG, PDF or JPG. It needs a token with file-read scope, and the returned image links expire after 30 days, so anything that uses it must download and keep the files ([Figma REST API: images][figma-api]).

**Takeaway:** Figma positions itself as the place where things are drawn, with short notes attached. Longer guidance lives in a separate file or an external site that components link to.

### 2.2 Documentation-as-code design systems

- **The idea.** Write the Docs defines "docs as code" as writing documentation with the same tools as code: issue trackers, Git, plain-text markup, code review and automated tests ([Write the Docs][wtd]).
- **GitHub Primer: words in the repo, do and don't pictures in Figma.** Primer's guidance is written in `.mdx` files ([Primer: documentation][primer-docs]). Most examples are live code. Do and don't examples are the stated exception: they're static images, because a working "don't" would teach people to hack a component. Those images are drawn in a dedicated "Interface guidelines" Figma file and pulled in when the site builds. A `FigmaImage` component in the MDX takes the frame link, and a build script exports the frames with a Figma API token. The caption and alt text are set in the MDX, outside the picture. Primer also says GitHub's design teams treat Figma as the single source of truth for design work ([Primer: Figma][primer-figma]). That covers drawing, not the guidance text.
- **Shopify Polaris: words in the repo, Figma follows.** The polaris.shopify.com content is markdown in the `Shopify/polaris` repo, and every change goes through a pull request. Inaccurate pages are to be removed quickly, to keep trust in the site as the source of guidance ([Polaris: documenting][polaris-docs]). Do, don't and caution tiles are MDX components on the page ([Polaris: layout][polaris-layout]). The Figma UI Kit is kept in step with the code: nothing goes into Figma that has no counterpart in code ([Polaris: Figma UI Kit][polaris-figma]).
- **GitLab: one master, formatted by automation.** GitLab keeps its design tokens in one place and generates every other format from them automatically ([GitLab: design tokens][gl-tokens]).

**Takeaway:** the words live in plain text under version control. Figma files follow them. Where pictures are drawn in Figma, the build pulls them in by reference, and nobody pastes screenshots.

### 2.3 Brand-portal and documentation platforms

- **zeroheight.** Pages are built from blocks that combine design, code and written guidance. The writing happens in zeroheight. Designs are synced from Figma and re-synced when the file changes, so there are no manual screenshots ([zeroheight 101][zh-101]). Its Rules block holds do's, don'ts and cautions. Each picture is uploaded or synced from a design file. Captions are capped at about 52 characters, and zeroheight says explanations belong in the block's main text, not the caption ([zeroheight: Rules block][zh-rules]). It also recommends a separate Figma file for documentation pictures, built from instances of the library's components, so the pictures stay current when components change ([zeroheight: organizing files][zh-files]). If a synced file is deleted, the pictures stay on the page but can no longer update ([zeroheight: updating][zh-update]).
- **Frontify.** Its Do & Don't block pairs each picture with a title and description written in Frontify. Pictures come from Frontify's own asset libraries, an upload or the asset chooser ([Frontify: Do and Don't block][frontify]).
- **Brandfolder.** Brandguide is its product for writing guides to how brand assets are used ([Brandfolder help][bf-help]). Embedded asset links update wherever they're placed when the asset changes ([Brandfolder: Smart CDN][bf-cdn]).
- **Supernova.** Its Figma frame block embeds a frame that updates automatically when the file changes, and it advises against screenshots ([Supernova: content blocks][sn-blocks], 2023). Written guidance can also be pulled as markdown from a GitHub repo ([Supernova: documentation][sn-docs]).

**Takeaway:** all four write the rule text in the documentation layer. Pictures come from Figma or the asset library by reference. For Compass, the design system and Brand resources already fill the documentation and asset-library roles, so a portal would add a third place to keep in step *(judgment)*.

### 2.4 How published brand guides pair words with pictures

- **GitHub.** Each "don't" is a picture with a one-line rule set as page text under it (for example, no shadows or gradients), and the picture's alt text repeats the rule ([GitHub logo][gh]).
- **Red Hat.** Misuse pictures sit under a short "not this" label in page text. Each picture's alt text names it as an example of misuse and describes it, and the image files are named by section and number ([Red Hat logo][rh]).
- **Platforms.** zeroheight, Frontify and Primer all keep the caption and alt text as fields next to the picture (section 2.3, [Primer: documentation][primer-docs]).

**Takeaway:** the rule sentence is text, not part of the picture. For Compass *(judgment)*:
- Pictures carry no wording, so a Figma frame never holds the master sentence.
- Captions come from the master text.
- The rules stay findable with Ctrl-F and readable by screen readers. The [display research][display] already relies on this for its "Usage" disclosure.

---

## 3. What this means for Compass

### 3.1 Who reads each copy

| Copy | Who can open it | Who reads it | What it's good at |
|---|---|---|---|
| **Design system** (private claude.ai artifact) | The founders and Claude, after signing in | Claude and Claude Design, whenever they design for the studio | The declared master ([ADR 0001][adr1]). The prototype export in `tmp/uploads/` bundles the design system's main `README.md` and no other design system markdown, so the main README is the one text known to travel with designs. Rules placed only in `assets/Logos/README.md` may not reach them |
| **Figma file** | People with access to the file | The owner and Claude, through the Figma connector, when drawing or exporting | The master artwork and the Brand variables. The best tool for drawing realistic scenes |
| **Brand resources** (this repo, built on Vercel) | Anyone | Employees, contractors and trade partners | The only public copy. Plain text under Git, so every change has a reviewable diff |

[Issue #1][issue1] already lists logo usage among the "rules and copy" to sync from the design system's `README.md`. The planned sync assumes the rules live in the README, and decision 7 puts them there for now.

### 3.2 Most planned pictures can be drawn from the marks

The visual section in [prototype-options.md][proto] item 22 calls for do and don't pictures, clear-space and minimum-size diagrams, approved backgrounds for each mark, and how to sit next to another company's logo. The mark SVGs are outlined paths with the brand colors as fills. For example, `compass-wordmark-two-tone.svg` is six letter paths in `#133558` and one glyph path in `#9C8842`. That means the site can apply each "don't" to the real file:

| Picture | Drawn from the mark? | How |
|---|---|---|
| Stretched or squashed, rotated | Yes | Scale or rotate the real SVG |
| Recolored | Yes | Swap a fill for a color outside the palette |
| Outlined, shadowed, with effects | Yes | SVG stroke or filter on the real SVG |
| Parts rearranged | Yes | Move the glyph path (it's a separate path in the files) |
| Retyped wordmark or descriptor | Yes | "COMPASS" set in a stand-in typeface |
| The glyph used as a letter in another word, or a mark set inside a sentence | Yes | Page text with the glyph inline |
| Low contrast | Yes | For example, the gold deep wordmark on Paper 2 (2.91:1) |
| Clear space | Yes | The mark's bounds plus the clear-space unit (provisionally 1 × the glyph's height) |
| Minimum size | Yes | The mark at its minimum (provisionally wordmark 120px / 32mm, glyph 24px / 6mm), labeled in px and mm |
| Approved backgrounds | Yes | Brand colors from the tokens, with each ratio computed from the hex values |
| "Start here" pair | Yes | The two files themselves |
| On photos (calm area, busy area) | Yes | A real project photo with the SVG placed over it |
| Next to another company's logo | Yes as a diagram (a neutral placeholder logo, the clear space between them); **no** as a realistic sign mockup | A diagram is drawn in code. A mockup is a scene for Figma |
| Embroidery, vinyl, single-color printing | No | Scenes or photos, if the prototype wants them |

So the Figma file only has to master the few realistic scenes, if the prototype chooses any *(judgment)*.

---

## 4. Options weighed

### A · The Figma file masters the words and the pictures

The usage section in Figma holds the rule sentences, numbers and pictures. The site and the README are copied from it.

- **For:** words and pictures sit side by side, where the artwork is drawn. It's how many agency brand books are made.
- **Against:**
  - Text on a Figma canvas has no diff a person can review, and no plain-text form a sync can read without the API.
  - It would make the README (what Claude Design reads) a copy, and it contradicts [ADR 0001][adr1].
  - Figma's own guidance moves long documentation out of the library file ([Figma: file organization][figma-org]).
  - Every change of wording becomes a canvas edit plus two copies.
- **Verdict:** use Figma to master the scenes only.

### B · Markdown in this repo masters the words

The usage rules are written in `docs/` or the site's content files, and the design system README links to them.

- **For:** this is the docs-as-code practice of Primer and Polaris. It's public, has Git history and pull-request review, and the site reads it directly. No sync is needed for rules.
- **Against:**
  - It reverses [ADR 0001][adr1] ("this repo never invents a brand rule") and needs a superseding ADR.
  - Claude Design would no longer see the rules unless they were copied back up, making a sync in both directions, which issue #1 leaves open.
  - Primer and Polaris master in a repo because their product ships from that repo. Compass's brand master isn't code *(judgment)*.
- **Verdict:** the strongest alternative. Revisit it if the design system → repo sync never gets built and hand copies start to drift (section 5.6).

### C · The design system masters everything, pictures included

The README holds the words, and every picture is an image in the design system's asset store, copied to the site.

- **For:** one place for everything, fully within [ADR 0001][adr1].
- **Against:** diagrams stored as images go stale as soon as a mark or a number changes, and someone has to re-export them by hand. With no dedicated designer, that's the step most likely to be skipped *(judgment)*. Supernova and zeroheight both design their products to avoid pasted screenshots ([sn-blocks], [zh-101]).
- **Verdict:** right for the words and for the few scenes, wrong for diagrams that can be drawn from the marks.

### D · A brand-portal platform (zeroheight, Frontify, Brandfolder, Supernova)

- **For:** ready-made do and don't blocks, Figma sync and hosting.
- **Against:**
  - It would duplicate both the design system and Brand resources, and add a paid tool and another sign-in.
  - Its Figma sync needs the Figma file connected to a third party.
  - The platforms' own pattern (words written in the documentation layer, pictures referenced from Figma or the asset library) can be followed without one.
- **Verdict:** not for a two-founder studio today *(judgment)*.

### E · Recommended: words in the design system, pictures drawn from the marks, scenes in Figma

As in section 1.

- **For:**
  - It keeps [ADR 0001][adr1] and the issue #1 plan unchanged.
  - The rules travel with Claude Design's designs.
  - Most pictures can't drift.
  - Figma does only what it's best at.
  - The public repo copy gives every rule change a visible diff.
- **Against:**
  - The site's code becomes the drawing of the diagrams, so the Figma mirror can drift from the site in look (not in content).
  - Realistic mockups still need a manual export.
  - Until issue #1 lands, the wording is copied by hand.

### Comparison

| | A · Figma | B · Repo | C · Design system, all | D · Portal | **E · Split** |
|---|---|---|---|---|---|
| Fits ADR 0001 as written | No | No (needs a new ADR) | Yes | No | **Yes** |
| Claude Design sees the rules | No | Only with a sync back up | Yes | No | **Yes** |
| Public copy without extra work | No | Yes | Through the sync | Yes | **Through the sync** |
| Reviewable diff for every change | No | Yes | Through the sync PR | Varies | **Through the sync PR** |
| Pictures stay current when a mark or number changes | Only if built from components | Only if drawn in code | No (re-export) | With sync | **Yes (drawn in code)** |
| Upkeep for the owner and Claude | High | Low | Medium–high | Medium, plus cost | **Low–medium** |

---

## 5. The recommended arrangement in detail

### 5.1 The words

- **One home.** A "Using the marks" section in the design system's main `README.md`, under or beside the existing "Marks" section. It holds the ground rules, the missing rules, "Start here", who may use the marks and other companies' logos (decisions 1–5).
- **Other design system files point to it.** `assets/Logos/README.md`, `assets/Tiles/README.md` and the Glyph and Wordmark component notes keep their file lists and point to the section instead of restating rules. Today, logo rules appear in five design system files, and they already disagree (section 6).
- **A table with fixed columns for the facts**, one row per colorway group (plus tiles and bars): approved backgrounds, use it for, minimum size (px and mm). A fixed shape lets the sync turn it into data without guesswork *(judgment)*. Numbers stay marked provisional until the high-fidelity prototype settles them (decision 6).
- **A stable ID for each rule**, used unchanged everywhere, as [ADR 0003][adr3] does for marks. For example: `contrast`, `colors`, `new-marks`, `use-it-for`, `dont-alter`, `clear-space`, `minimum-size`, `photos`, `glyph-is-the-a`, `retired-marks`, `who-may-use`, `with-other-logos`, `start-here`. The ID becomes the README anchor, the site anchor (`#usage-clear-space`), the Figma frame name and any scene file name.
- **Voice.** The README's own voice rules apply: sentence case, "we", no exclamation points, short lines (decision 8). Figma's advice to keep guidance short and to point to detail elsewhere fits too ([figma-make]).

### 5.2 The pictures drawn on the site

- **Inputs.** The mark SVGs (`public/logos/`), the tokens and the rule data synced from the README.
- **No picture files.** The site draws each "don't", the clear-space and minimum-size diagrams, the background swatches and the "Start here" pair at build time.
- **Captions** come from the rule text. Pictures carry no words (section 2.4).
- **A build check** *(judgment)*: compute the contrast of every approved background from the hex values and fail the build if any falls under 3:1. Docs-as-code includes automated tests ([wtd]). This would catch, for example, gold deep on Paper 2 (2.91:1) being listed as approved.
- **The look is site design.** The prototype chooses the layout, and the repo masters it like the rest of the page. It's presentation, not a brand rule, in the same spirit as [ADR 0002][adr2].

### 5.3 The Figma usage section

- **Built after the prototype choice,** to match it (the owner's sequence).
- **Built from instances** of the mark components, with Brand variables for the backgrounds, so a change to the artwork reaches the section by itself. zeroheight recommends exactly this for documentation pictures ([zh-files]). If the marks aren't yet components in the Figma file, make them components first.
- **Frames named by rule ID:** `Usage/clear-space`, `Usage/with-other-logos-do-1`. As with `Logos/` in [ADR 0003][adr3], the slash makes a folder on export.
- **Short labels only,** such as "Don't stretch" or "Clear space · 1 × glyph height". No full rule sentences, so Figma never holds a second copy of the wording.
- **A note at the top:** "Wording is mastered in the design system README. Last checked {date}." Optionally, a link to the site's usage section in each mark component's description ([figma-desc]).
- **Scenes** (realistic mockups) are drawn here, and this is the only place they're mastered.

### 5.4 How scenes reach the site

Scenes take the same path as marks: drawn in Figma, recorded in the design system, published on Brand resources.

1. Export the frame as SVG or PNG, named by rule ID, for example `usage-with-other-logos-do-1.png`. The `compass-` prefix is left off so a scene is never mistaken for a downloadable mark.
2. Upload it to the design system's asset store and note who approved it there (decision 3 asks the design system to record approvals).
3. Copy it to `public/usage/` by hand in v1, or through the issue #1 sync later.

If scenes ever become numerous, export them automatically through the Figma API as Primer does. Download and commit the files, because the API's image links expire after 30 days ([figma-api]), and keep the Figma token in the sync's environment, not in the public build *(judgment)*.

### 5.5 Keeping everything in step

**When a rule changes:**
1. An approver (either founder) agrees to the change.
2. Edit the README section: wording, table or both. The design system's history records it.
3. If a scene changes, update the Figma frame, export it and replace the file in the design system's asset store.
4. Bring the change to the repo: by hand in v1, through the issue #1 pull request later. The diff shows the new wording, data and scene files. The drawn diagrams update themselves.
5. Update the Figma mirror's labels and numbers. A drift check *(judgment)* can be part of the sync: list the rule IDs in the README, the `Usage/` frames in Figma (readable through the Figma connector) and the site's `#usage-` anchors, and report any that are missing or extra in the pull request.

**Never:** change wording on the site or in Figma first, or keep a rule sentence inside a picture.

### 5.6 When to revisit

- **The sync never gets built and hand copies drift.** Move the words to the repo (option B), with an ADR that supersedes [ADR 0001][adr1] for rules. Copy them up to the README for Claude Design.
- **The usage section needs many realistic scenes.** Automate the Figma export (section 5.4).
- **A dedicated designer joins.** A separate Figma documentation file built from components, as zeroheight describes, could take over more of the pictures. The words would stay where they are.

---

## 6. Things noticed for the README workflow

These belong to the README drafting and review agents, but they bear on the "one home" recommendation.

- **Recoloring the glyph.** The README's "Marks" section says never to recolor a mark, but then allows a single-ink glyph "in another color" through `fill="currentColor"`. `components/Glyph/README.md` lists Navy deep on Tan and Ink on Gold, neither of which is a glyph colorway. Both conflict with the adopted Colors rule (never recolor; pick an existing version). One option is to limit `currentColor` to the site's own interface ornaments, not marks that people download or reproduce. The owner decides.
- **Descriptor color.** `components/Wordmark/README.md` gives the descriptor as Gold on Paper. `assets/Logos/README.md` and the lockup files use Gold deep.
- **Rules only in sub-READMEs may not travel.** The prototype export carried only the main README, so put the rules there (section 3.1).
- **Keep usage numbers out of `tokens.json`** *(judgment)*. Its `meta` records it as a Claude Design export, so keys added by hand may be lost at the next export. The README table is safer.

## 7. Open questions for the owner

1. Should the Figma usage section carry only short labels (recommended), or the full rule sentences too, at the cost of a second copy to maintain?
2. For other companies' logos and photos, does the prototype show diagrams (drawn in code, nothing to export) or realistic mockups (scenes mastered in Figma)? Item 22 can include both, and you'll choose.
3. Should this arrangement get its own short ADR, or a line in the consequences of the ground-rules ADR being drafted now?

---

## 8. Sources

All read 21 October 2026.

**Figma**
- [figma-desc] Figma Help Center, Add descriptions to styles, components, and variables: https://help.figma.com/hc/en-us/articles/7938814091287-Add-descriptions-to-styles-components-and-variables
- [figma-org] Figma Best Practices, Team, folder, and file organization: https://www.figma.com/best-practices/team-file-organization/
- [figma-l2] Figma Learn, Lesson 2: Define your design system: https://help.figma.com/hc/en-us/articles/14552740206743-Lesson-2-Define-your-design-system
- [figma-103] Figma blog, Design system 103: Design system documentation that drives adoption (23 January 2025): https://www.figma.com/blog/design-systems-103-documentation-that-drives-adoption/
- [figma-make] Figma Help Center, Write design system guidelines for Make kits: https://help.figma.com/hc/articles/43602393097239 (redirected from https://developers.figma.com/docs/code/write-design-system-guidelines/)
- [figma-embed] Figma Help Center, Embed files and prototypes: https://help.figma.com/hc/en-us/articles/360039827134
- [figma-api] Figma REST API, File endpoints (GET /v1/images/:key): https://developers.figma.com/docs/rest-api/file-endpoints/

**Documentation as code**
- [wtd] Write the Docs, Docs as code: https://www.writethedocs.org/guide/docs-as-code/
- [primer-docs] Primer, Contributing: Documentation: https://primer.style/guides/contribute/documentation
- [primer-figma] Primer, Figma libraries: https://primer.style/guides/figma
- Primer docs repo (archived July 2025): https://github.com/primer/design
- [polaris-docs] Polaris, Documenting in Polaris (repo source): https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/documentation/index.mdx
- [polaris-layout] Polaris, Creating layout (repo source): https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/documentation/creating-layout.mdx
- [polaris-figma] Polaris, Contributing to the Figma UI Kit (repo source): https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/figma-ui-kit.mdx
- [gl-tokens] GitLab Docs, Design tokens: https://docs.gitlab.com/development/fe_guide/design_tokens/

**Platforms**
- [zh-101] zeroheight Help Center, zeroheight 101 (updated 25 August 2026): https://help.zeroheight.com/hc/en-us/articles/35886881667739-zeroheight-101
- [zh-rules] zeroheight Help Center, Rules block (updated 8 September 2025): https://help.zeroheight.com/hc/en-us/articles/35887014373787-Rules-block
- [zh-files] zeroheight Help Center, Tips on organizing your design files for zeroheight (updated 9 June 2025): https://help.zeroheight.com/hc/en-us/articles/36444632029595-Tips-on-organizing-your-design-files-for-zeroheight
- [zh-update] zeroheight Help Center, Figma: How to update your Figma files and design items (updated 1 December 2025): https://help.zeroheight.com/hc/en-us/articles/35886994402203-Figma-How-to-update-your-Figma-files-and-design-items
- [frontify] Frontify Help Center, Do and Don't Block (updated 26 March 2026): https://help.frontify.com/en/articles/2388957-dos-and-don-ts
- [bf-help] Brandfolder by Smartsheet, help center (Brandguide category): https://help.smartsheet.com/brandfolder
- [bf-cdn] Smartsheet Learning Center, Embed assets with Smart CDN: https://help.smartsheet.com/360005174134-Embedding-Assets-with-Smart-CDN
- [sn-blocks] Supernova blog, Unlock the Power of Supernova's Content Blocks for Design System Documentation (1 June 2023): https://supernova.io/blog/unlocking-the-power-of-supernovas-content-blocks-for-design-system-documentation
- [sn-docs] Supernova, Documentation: https://supernova.io/documentation

**Brand guides**
- [gh] GitHub, Logo: https://brand.github.com/foundations/logo
- [rh] Red Hat, Logo standards: https://www.redhat.com/en/about/brand/standards/logo

**Compass**
- [adr1] ADR 0001, The design system artifact is the master: ../adr/0001-design-system-artifact-is-the-master.md
- [adr2] ADR 0002, Page text meets WCAG 2.2 AA: ../adr/0002-page-text-meets-wcag-aa.md
- [adr3] ADR 0003, One naming convention for marks: ../adr/0003-mark-file-naming-convention.md
- [issue1] Issue #1, Keep Brand resources in sync with the Compass Design System artifact: https://github.com/compass-design-studio/brand-site/issues/1
- [proto] Prototype options: ../prototype-options.md
- [ground] Logo kit ground rules: evidence check: ./brand-kit-ground-rules.md
- [display] Showing about 30 logo versions without a busy page: ./logo-display-patterns.md
- [glossary] Glossary: ../GLOSSARY.md

[figma-desc]: https://help.figma.com/hc/en-us/articles/7938814091287-Add-descriptions-to-styles-components-and-variables
[figma-org]: https://www.figma.com/best-practices/team-file-organization/
[figma-l2]: https://help.figma.com/hc/en-us/articles/14552740206743-Lesson-2-Define-your-design-system
[figma-103]: https://www.figma.com/blog/design-systems-103-documentation-that-drives-adoption/
[figma-make]: https://help.figma.com/hc/articles/43602393097239
[figma-embed]: https://help.figma.com/hc/en-us/articles/360039827134
[figma-api]: https://developers.figma.com/docs/rest-api/file-endpoints/
[wtd]: https://www.writethedocs.org/guide/docs-as-code/
[primer-docs]: https://primer.style/guides/contribute/documentation
[primer-figma]: https://primer.style/guides/figma
[polaris-docs]: https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/documentation/index.mdx
[polaris-layout]: https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/documentation/creating-layout.mdx
[polaris-figma]: https://github.com/Shopify/polaris/blob/main/polaris.shopify.com/content/contributing/figma-ui-kit.mdx
[gl-tokens]: https://docs.gitlab.com/development/fe_guide/design_tokens/
[zh-101]: https://help.zeroheight.com/hc/en-us/articles/35886881667739-zeroheight-101
[zh-rules]: https://help.zeroheight.com/hc/en-us/articles/35887014373787-Rules-block
[zh-files]: https://help.zeroheight.com/hc/en-us/articles/36444632029595-Tips-on-organizing-your-design-files-for-zeroheight
[zh-update]: https://help.zeroheight.com/hc/en-us/articles/35886994402203-Figma-How-to-update-your-Figma-files-and-design-items
[frontify]: https://help.frontify.com/en/articles/2388957-dos-and-don-ts
[bf-help]: https://help.smartsheet.com/brandfolder
[bf-cdn]: https://help.smartsheet.com/360005174134-Embedding-Assets-with-Smart-CDN
[sn-blocks]: https://supernova.io/blog/unlocking-the-power-of-supernovas-content-blocks-for-design-system-documentation
[sn-docs]: https://supernova.io/documentation
[gh]: https://brand.github.com/foundations/logo
[rh]: https://www.redhat.com/en/about/brand/standards/logo
[adr1]: ../adr/0001-design-system-artifact-is-the-master.md
[adr2]: ../adr/0002-page-text-meets-wcag-aa.md
[adr3]: ../adr/0003-mark-file-naming-convention.md
[issue1]: https://github.com/compass-design-studio/brand-site/issues/1
[proto]: ../prototype-options.md
[ground]: ./brand-kit-ground-rules.md
[display]: ./logo-display-patterns.md
[glossary]: ../GLOSSARY.md
