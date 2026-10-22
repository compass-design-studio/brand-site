# Glyph clear space

This note sets the clear space for Compass Design Studio's glyph when it appears without the wordmark: as a section-end ornament, in the studio signature, in email signatures, and inside tiles (the favicon, the app icon and the social profile picture). "Clear space" is the [glossary](../GLOSSARY.md) term for what the brief calls padding. The note follows the glossary's other terms too: glyph, tile, colorway, background.

Every page was read on **21 October 2026**. All sources are first-party: the brand owner's own guidelines, or the platform's own documentation. Section 5 lists them.

**Two facts about the glyph, from the studio's own files** (`public/logos/compass-glyph-navy-ink.svg` and the four tile SVGs):
- The glyph is 0.616 times as wide as it is tall (836 × 1358).
- The artwork touches all four edges of its file, so the file has no margin of its own. The height you give the file is the glyph's height.

---

## 1. Recommendation

> **Glyph clear space.** Measure the glyph's clear space in glyph heights: the full height of the artwork, from the top of the handle to the tips of the legs. On its own, the glyph needs at least **¼ of its height** clear on every side, and never less than **8 px on screen or 2 mm in print**. Nothing may enter that space: no text, lines, edges, images or other marks. Next to another company's logo, double it to ½ of the glyph's height.
>
> **In a tile.** The glyph is **two-thirds of the tile's height**, centered both ways. That leaves ¼ of the glyph's height above and below it: the same clear space, filled with the tile's color. The glyph is never more than 68% of the tile's height. In a frame made for it (favicon, app icon, profile picture), a tile fills the frame edge to edge, as a square with square corners and no transparent areas; the platform rounds or crops it. Anywhere else, leave ¼ of the glyph's height clear around the tile as well.

| Glyph height | Glyph width | Clear space on each side (glyph on its own) | Total space the glyph takes up | Tile for a glyph this tall |
|---|---|---|---|---|
| 24 px | 15 px | **8 px** (the floor; ¼ would be 6 px) | 31 × 40 px | 36 px square |
| 48 px | 30 px | **12 px** | 54 × 72 px | 72 px square |
| 120 px | 74 px | **30 px** | 134 × 180 px | 180 px square (or 180 px tall for the email tile) |

Two notes for whoever applies the rule:
- **The 8 px floor applies only below 32 px**, and only to the glyph on its own. Inside a tile, keep two-thirds at every size, down to a 16 px favicon: there, the tile's edge does the job of clear space.
- **In print the rule is the same.** A 20 mm glyph needs 5 mm on each side. A 6 mm glyph gets the 2 mm floor.

---

## 2. Why

### 2.1 What brand guidelines do for a symbol on its own

Six organizations give a measurement for their symbol standing alone. The last column converts each rule to a fraction of the symbol's height, so the six can be compared.

| Org | Symbol | Measured from | Multiplier | As a fraction of the symbol's height | Changes with size or use? |
|---|---|---|---|---|---|
| [GitHub][gh] | Invertocat (round) | the symbol's height | 25% | 0.25 | No; "all placements" |
| [Meta][fb] | Facebook "f" (round) | the logo's width | ¼ | 0.25 | Use: other content stays half a logo away |
| [Shopify][shp] | Shopping Bag | the height of the S on the bag | ½ | about 0.26 (my measurement of Shopify's diagram) | No; "at all times" |
| [Red Hat][rh-hat] | the hat | the height of the hat's brim | about 1 | about 0.28 (my measurement of Red Hat's diagram) | No; "even more space is better" |
| [Discord][dis] | Clyde symbol (wide) | the symbol's width (diagram only) | ⅓ | about 0.44 (0.32 of its width) | Not stated |
| [Spotify][spo] | icon (round) | the icon's height | ½ | 0.5 | No |

**Tallies (of these 6):**
- **What the unit is measured from:** the whole mark in 4 (GitHub and Spotify by height, Meta and Discord by width); a part of the mark in 2 (Shopify's S, Red Hat's brim).
- **How big it is:** the six values, as fractions of the symbol's height, are 0.25, 0.25, 0.26, 0.28, 0.44 and 0.5. The median is about 0.27. Four of the six fall between 0.25 and 0.28.
- **Changes with size:** 0 of 6.
- **Changes with use:** 1 of 6. Meta keeps other content half a logo away, on top of its quarter-width clear space.

**No number for the symbol on its own** (on the pages read): LinkedIn, Slack, GitLab, MIT, Atlassian, Dropbox, Mailchimp, UC Berkeley, Apple, X, Instagram, WhatsApp, Figma, Pinterest and Twitch. Section 4.1 has the detail.

**Related precedents:**
- **Measuring a full logo from its symbol,** as Compass's provisional lockup rule does (1 × glyph height): LinkedIn uses one [in] logo ([LinkedIn][li]), and Slack uses one pill shape from its symbol ([Slack][slack]).
- **Clear space that changes with use:**
  - Apple's App Store badge needs ¼ of its height, or 1/10 in very limited layouts ([Apple][apple-mkt]).
  - Red Hat doubles it for logo C, its large-sign logo ([Red Hat logo][rh-logo]).
  - MIT asks for more space next to other logos ([MIT][mit-logo]).
- **A fixed size:** Mastodon asks for 36 px on all sides, whatever the logo's size ([Mastodon][masto]).

### 2.2 What platforms ask of a symbol inside a container

| Platform | Container | What the documentation says | What it means for the glyph in a tile |
|---|---|---|---|
| Web app manifest, "maskable" icons ([W3C][w3c-manifest]) | square icon; the device may crop it to any shape | The safe zone is a circle at the center with a radius of 40% of the icon's size. Pixels outside it may be cut off. | Every part of the glyph must stay within 40% of the tile's width from its center. |
| Android adaptive icons ([Android][android]) | 108 dp layers; the outer 18 dp on each side is reserved, leaving a 72 dp visible icon (dp is Android's screen unit) | The 66 dp safe zone is never clipped. Use a logo at least 48 dp and no more than 66 dp across. | If the tile is the 72 dp icon, the glyph's height should be 48 to 66 dp: 67% to 92% of the tile. |
| Apple app icons ([Apple HIG][apple-hig]) | 1024 px square; the system rounds the corners (a circle on watchOS and visionOS) | Supply square, unmasked layers. Keep primary content centered so masking doesn't cut it off. You don't need to fill the whole canvas. Any imported background must be full-bleed and opaque. | No fixed fraction. Centered, opaque and square-cornered is what Apple asks. |
| Google Play store icon ([Google Play][gplay]) | 512 px square; Play rounds the corners (radius 30% of the icon's size) | Full square. Use the keylines to position logos, and don't force a logo to fill the whole square. Old icons were scaled to a 384 px keyline grid (75%). | Glyph within 75% of the tile. |
| Material product icons ([Material][material]) | 192-unit grid (48 dp at 100%) | Keyline shapes: square 152, circle 176 across, and a vertical rectangle 128 wide × 176 tall. | This applies when a mark is the icon's whole outline (a tall mark may fill 92% of the height). It doesn't apply to a glyph inside a full-bleed tile. |
| Facebook Page profile picture ([Facebook Help][fb-help]) | circle | Shown at 176 × 176 px on computers and 196 × 196 px on phones, cropped to a circle. Upload 320 × 320 px. | The corners of the tile are cut off; the glyph must fit inside the circle. |
| YouTube channel picture ([YouTube Help][yt-brand], [tips][yt-tips]) | renders at 98 × 98 px | Square or round images work best. | Small: the glyph must read at under 100 px. |
| X profile photo ([X Help][x-help]) | 400 × 400 px recommended | The page gives no shape. | Square upload. |
| LinkedIn Page logo ([LinkedIn Help][li-help]) | 400 × 400 px (minimum 268 px) | Transparent logos are shown on white. The logo appears on both light and dark backgrounds. | Use an opaque tile, not a bare glyph. |
| Google Search favicon ([Google Search Central][g-favicon]) | square | At least 8 × 8 px; larger than 48 × 48 px is recommended. | No margin rule. |

**Tallies:**
- **A fraction for how much of the container the symbol should fill:** only Android gives one (48 to 66 dp of a 72 dp icon). Google Play implies a 75% grid for logos.
- **A safe area that sets the largest size:** W3C (a circle 80% across), Android (66 dp) and, by cropping, Facebook (the inscribed circle). YouTube and X don't state a shape.
- **Edge to edge, opaque and square:** Apple, Google Play and the W3C all expect a full square with no transparency. The platform applies the mask or rounding itself. LinkedIn puts transparent logos on white.

### 2.3 How the recommendation follows

1. **The unit is the glyph's height.** For round symbols (GitHub, Spotify, Meta), height and width are the same, so the sources only settle "the whole mark or a part of it." Compass's glyph is tall and narrow, so it has to pick one. Height wins for three reasons:
   - People size the glyph by its height, and the file has no built-in margin.
   - It is the unit the provisional lockup rule already uses.
   - The glyph's parts, such as the handle or the hinge circle, are hard for non-designers to measure.
2. **The multiplier is ¼.** It is the most common value and close to the median of the six sources. At the sides, ¼ of the height equals 0.41 of the glyph's width, so the narrow glyph still has generous room.
3. **The same number sets the tile.** With ¼ of the glyph's height above and below, the box is 1.5 glyph heights tall, so the glyph is 1 ÷ 1.5 = two-thirds of it. One rule covers both uses. Two-thirds also passes every platform check in section 3:
   - It is exactly Android's minimum logo size: 48 dp of a 72 dp icon.
   - It keeps the glyph inside the maskable-icon safe circle.
   - It leaves plenty of room inside circle crops.
4. **Why not the lockup's 1 × glyph height?** No symbol-alone source goes past ½. In a tile it would shrink the glyph to one-third of the tile. That is below Android's minimum logo size, and small in a profile picture.
5. **Why not Spotify's ½?** It is the highest of the six. In a tile it would make the glyph half the tile: below Android's 48 dp minimum, and a quarter smaller than today's tiles.
6. **Why the 68% ceiling?** Above 68%, the corners of the glyph's outer rectangle (the box that just touches its top, bottom and sides) leave the maskable safe circle. The glyph's actual ink could reach 73% before leaving it. The ceiling keeps a margin in case the drawing is ever adjusted.
7. **Why double it next to another logo?** Meta keeps other content half a logo away, and MIT asks for more space next to other logos. The [ground rules](./brand-kit-ground-rules.md) co-branding rule already asks for at least Compass's clear space between marks. Doubling is the simple version. This is a judgment, not a tally.
8. **Why clear space around a tile placed in a layout?** Apple's badge, which is also artwork on its own colored shape, still asks for clear space around it ([Apple][apple-mkt]). Using the glyph's ¼ (which is 1/6 of the tile) keeps a single unit.

### 2.4 Small sizes

- **No source makes clear space grow at small sizes,** except Mastodon, whose 36 px is fixed at every size. Instead, sources set a minimum size for the mark itself:
  - Meta's "f": 16 px wide ([Meta][fb]).
  - Red Hat's hat: 16 px tall ([Red Hat][rh-hat]).
  - UC Berkeley's favicon: 16 × 16 px ([Berkeley][ucb-icons]).
  - GitLab: 20 px ([GitLab][gl-core]).
  - Spotify's icon: 21 px ([Spotify][spo]).
  - LinkedIn's [in]: 21 px tall ([LinkedIn][li]).
- **Some draw simpler artwork for tiny sizes.** MIT has a separate micro logo for 15 to 30 px ([MIT][mit-logo]).
- **Platforms warn about fine detail at small sizes.** Apple warns that very thin lines lose detail at small sizes ([Apple HIG][apple-hig]). Microsoft asks for separate icon files at 16, 24, 32, 48 and 256 px, so Windows rarely has to scale them ([Microsoft][ms-construct]).
- **Apple's badge goes the other way:** it allows less clear space (1/10 of its height) in very limited layouts ([Apple][apple-mkt]).
- **So the 8 px floor is the studio's own choice, not a sourced rule.**
  - **Where 8 px comes from:** the glyph may be a link, for example in an email signature or the studio signature. WCAG 2.2 asks for a pointer target of at least 24 × 24 CSS px, or enough empty space around a smaller one (success criterion 2.5.8, Level AA; [WCAG 2.2][wcag-258]). If the 8 px on every side is part of the link, any glyph 16 px tall or more gives a target of at least 26 × 32 px.
  - **Why 2 mm in print:** CSS defines 1 px as 1/96 of an inch ([CSS Values][css-values]), so 8 px is 2.1 mm.
- **The floor is not a minimum size.** The glyph's thinnest line is about 1.4% of its height, which is 0.3 px on a 24 px glyph. Its minimum size still needs the print and screen test the [ground rules](./brand-kit-ground-rules.md) call for.

---

## 3. Check against the current tiles

The three square tiles (`compass-tile-ink-on-paper`, `compass-tile-light-gold-on-ink` and `compass-tile-navy-ink-on-light-gold`) all have the same geometry. I measured it from the SVG files.

| | Current 500 × 500 tiles | Under the rule |
|---|---|---|
| Glyph size | 209.0 × 339.5 px (¼ of the master file) | 205.2 × 333.3 px |
| Glyph height as a share of the tile | 67.9% | 66.7% (two-thirds) |
| Top and bottom margins | 80.25 px each (16.0% of the tile; 0.236 glyph heights) | 83.3 px each (16.7%; 0.25 glyph heights) |
| Side margins | 145.5 px each (29.1%) | 147.4 px each (29.5%) |
| **Maskable safe circle** (radius 200 px) | farthest ink 185.8 px from the center; outer-rectangle corner 199.3 px. **Passes, by 0.7 px at the corner** | 182.4 px; 195.7 px. Passes, by 4.3 px |
| **Android** (tile = 72 dp icon; logo 48 to 66 dp) | glyph 48.9 dp; farthest ink 26.8 dp from the center (limit 33). **Passes** | 48.0 dp; 26.3 dp. Passes |
| **Circle crop** (Facebook; radius 250 px) | outer-rectangle corner 199.3 px. **Passes** with room | 195.7 px. Passes |
| **Rounded corners** (Google Play's radius of 30% is the largest stated) | the leg tips stay inside the rounded shape. **Passes** | Passes |
| **Google Play 75% keyline grid** | 67.9%. **Passes** | 66.7%. Passes |
| Opaque, square corners, edge to edge | yes (a full 500 × 500 rectangle, no rounding) | same |

A note on the Android row: Android's figure draws the 66 dp safe zone as a square, but a round mask on a 72 dp icon would trim that square's corners. To be safe, I also checked against a 66 dp circle (radius 33 dp); that is my inference, not Android's wording.

**Verdict:** the current tiles pass every platform safe zone and stay under the 68% ceiling. They are 1.2 percentage points above the two-thirds target, which makes the glyph 6 px taller on a 500 px tile. The margin that matters most, between the glyph's outer-rectangle corners and the maskable safe circle, is under 1 px.

**What would change:** re-export the three square tiles with the glyph 333 px tall, centered. That means scaling the master glyph by 0.2455 instead of 0.25, which gives margins of 83.3 px top and bottom and 147.4 px at the sides. Nothing is broken today, so this isn't urgent. But it makes the files match the rule exactly, and it widens the tightest margin from under 1 px to about 4 px. Favicon and app-icon sizes rendered from these tiles follow automatically.

**Email tile** (`compass-tile-email-light-gold-on-ink`, 350 × 180): the glyph is 118.8 px tall, 66.0% of the tile's height, with 30.6 px margins top and bottom (0.257 glyph heights). The rule asks for 120 px and 30 px. It meets the rule, on the safe side, so no change is needed.

---

## 4. Evidence

### 4.1 Stand-alone symbols

**GitHub, Invertocat** ([logo page][gh]; [clear-space diagram][gh-diagram])
- **Rule:** the diagram text asks for 25% clear space "for all placements." It labels the mark's height 1.0X and the clear space 0.25X.
- **Circle crops:** GitHub notes that the Invertocat shouldn't be centered purely by measurement in a circle crop. This is a note on placement, not a number.
- **When the symbol is used alone:** only in GitHub-owned settings, or where the brand is already clearly established.
- **Minimum size:** none on the page.

**Spotify, icon** ([design guidelines][spo])
- **Rule:** the exclusion zone is half the icon's height. The same rule covers the full logo.
- **Minimum size:** 21 px on screen or 6 mm in print (70 px or 20 mm for the full logo).
- **When the icon is used alone:** as an app icon on a device, when the full logo doesn't fit, or where the brand is established.

**Shopify, Shopping Bag** ([brand assets][shp])
- **Rule:** keep ½ S around the bag at all times. The diagram labels the height of the S on the bag as x and the clear space as ½x. By my measurement of the diagram, that is about a quarter of the bag's height.
- **Full logo, for comparison:** its clear space is the wordmark's x-height.
- **When the bag is used alone:** when the wordmark would be illegible, or when space is very limited, for example inside a square or circle.
- **Minimum size:** 80 px or 28 mm, given for "our logo".

**Meta, Facebook "f" logo** ([Facebook logo][fb])
- **Rule:** clear space is the logo's width divided by four, and it applies everywhere. Separately, the logo should be at least half a logo away from any other content.
- **Minimum size:** 16 px wide on screen, 6 mm in print.

**Red Hat, the hat** ([the hat][rh-hat]; [diagram][rh-diagram]; [logo page][rh-logo])
- **Rule:** clear space of about the brim's height; more is better. In the diagram, the brim unit measures about 0.28 of the hat's height (my measurement).
- **Minimum size:** 16 px tall (5.5 mm).
- **Uses:** the hat appears alone as the favicon, as the social media profile image, and on business cards.
- **Full logos, for comparison:** clear space is the height of the letter "e", doubled for logo C.

**Discord, Clyde symbol** ([branding][dis]; [symbol diagram][dis-diagram])
- **Rule:** the Clearspace section has no text measurement, only diagrams.
- **What the diagram shows:** it marks the clear space as x, labeled ⅓. Measured from the diagram, x is 0.32 of the symbol's width, or 0.44 of its height; the symbol is wider than it is tall.
- **Minimum size:** none on the page.

**LinkedIn, [in] logo** ([LinkedIn logo][li])
- **Full logo:** clear space is one [in] logo (its height or width), in all uses.
- **[in] on its own:** no separate rule.
- **Minimum size:** 21 px tall on screen, or 0.25 in in print, measured on the [in].

**Slack, octothorpe** ([brand terms][slack])
- **Full logo:** clear space of at least one pill shape from the octothorpe.
- **Symbol on its own:** no separate rule. No minimum size.

**GitLab, tanuki** ([logomark][gl-mark]; [core logo][gl-core])
- **Rule:** the tanuki on its own takes its clear space from the wordmark: the height of the lowercase "a". Because the unit belongs to another mark, it isn't counted in the tally.
- **Minimum size:** 20 px or 11 mm, for the logo or the logomark.

**MIT** ([MIT logo][mit-logo]; [social media logos][mit-social])
- **Rule:** clear space is the width of the M in the MIT logo, with more where needed and next to department logos. The MIT logo has no separate symbol.
- **Small sizes:** a micro logo for 15 to 30 px.
- **Favicon:** black or white only.
- **Social icons:** shown on circles, with no stated proportion.

**UC Berkeley, "B" monogram** ([icons & secondary marks][ucb-icons])
- **Use:** the "B" is the website favicon, with a minimum of 16 × 16 px.
- **Clear space:** no rule.
- **Social icons:** lockups are supplied per platform (X 400 px, Facebook 200 px, Instagram 150 px, LinkedIn 400 px, YouTube 800 px), with no proportion stated.

**Atlassian, logomark** ([logos][atl]; [logo component][atl-comp])
- **Use:** logomarks on their own only when the context is very clear.
- **Clear space:** no rule, and no glyph-to-tile proportion, on the pages read.

**Dropbox, glyph** ([logo][dbx])
- No clear space, minimum size or container guidance on the page.

**Mailchimp, Freddie** ([brand assets][mc])
- "Plenty of space" around the logo and Freddie, with no unit.

**Apple** ([App Store marketing guidelines][apple-mkt])
- **Apple logo:** don't use it on its own; no clear space is published.
- **App Store badge:** clear space of ¼ of the badge's height, or 1/10 in very limited layouts. Minimum 40 px or 10 mm.
- **App icons in marketing:** no clear space rule.

**X** ([brand toolkit][x-toolkit])
- The page links its rules to a downloadable 2021 Twitter guidelines PDF, showing the bird. That PDF refused automated reading, and reading it would have meant downloading the file, so it isn't used.

**Others with no symbol rule on the pages read**
- Instagram and WhatsApp ([Instagram brand][ig-brand], [WhatsApp brand][wa-brand]).
- Figma: the page is truncated; its brand book is a Figma file ([Figma][figma]).
- Pinterest ([Pinterest][pin]).
- Twitch: its rules are inside a zip ([Twitch][twitch]).

**Mastodon** ([branding][masto])
- Clear space of at least 36 px on all sides, not tied to the logo's size. It is the only fixed-pixel rule found.

### 4.2 Symbols inside containers

**W3C, Web Application Manifest** ([spec][w3c-manifest]; Working Draft dated 16 October 2026)
- **Safe zone:** a circle at the icon's center, with a radius of 2/5 (40%) of the icon's size. That size is the smaller of width and height if the icon isn't square.
- **What the device may do:** it may make anything outside the safe zone transparent, but nothing inside it.
- **Transparency:** transparent pixels are composited onto a solid fill the device chooses, so the spec advises against transparent pixels.

**Android, adaptive icons** ([adaptive icons][android]; the page now redirects to a Compose path with the same text)
- **Layers:** all layers are 108 × 108 dp. The outer 18 dp on each side is reserved for masking and motion effects.
- **Logo size:** at least 48 × 48 dp, and no more than 66 × 66 dp.
- **Safe zone:** the 66 dp area is never clipped by a device maker's mask. The figures center the logo in it.

**Apple, Human Interface Guidelines: app icons** ([HIG][apple-hig]; read through the page's own data file, [JSON][apple-hig-json]; change log entry dated 8 June 2026)
- **Shape:** square layouts (1024 × 1024 px for iOS, iPadOS and macOS). The system masks them to rounded rectangles, or to circles on visionOS and watchOS.
- **Content:** keep primary content centered to avoid truncation, and use the grids in Apple's templates. A simple background is fine; you don't need to fill the canvas. Any imported background must be full-bleed and opaque.
- **Small sizes:** avoid very thin lines, because detail is lost at smaller sizes.

**Google Play, store icon** ([icon specifications][gplay])
- **Format:** a 512 × 512 px full square. Play applies the mask itself, with a corner radius of 30% of the icon's size, and adds the shadow.
- **Logos:** use the keylines as guides for positioning logos; don't force a logo to fill the whole space. Older icons were scaled to the keyline grid size of 384 px (75%).

**Material Design, product icons** ([product icons][material]; content read from the page's [data file][material-json])
- **Grid:** design at 192 × 192 dp, which is 400% of 48 dp.
- **Keyline shapes:** square 152 × 152, circle 176 across, vertical rectangle 128 wide × 176 tall, horizontal rectangle 176 × 128.

**Social profile pictures**
- **Facebook:** Page pictures show at 176 × 176 px on computers and 196 × 196 px on smartphones, cropped to a circle. Upload 320 × 320 px; PNG is suggested for logos ([Facebook Help][fb-help]).
- **YouTube:** the channel picture renders at 98 × 98 px ([YouTube Help][yt-brand]), and square or round images work best ([tips][yt-tips]).
- **X:** 400 × 400 px recommended, under 2 MB; the page gives no shape ([X Help][x-help]).
- **LinkedIn:** Page logos are 400 × 400 px, minimum 268 × 268 px. Transparent logos are shown on white, and logos appear on both light and dark backgrounds ([LinkedIn Help][li-help]).
- **Brand guides:** Red Hat uses the hat alone as its profile image ([Red Hat][rh-hat]). MIT shows its logo on circles ([MIT social][mit-social]). Berkeley supplies sized lockups for each platform ([Berkeley][ucb-icons]). None states a proportion.

**Favicons**
- **Google Search:** the favicon must be square, at least 8 × 8 px; larger than 48 × 48 px is recommended. No margin rule ([Google Search Central][g-favicon]).
- **Brand guides:** UC Berkeley sets 16 × 16 px as the minimum ([Berkeley][ucb-icons]). Red Hat uses the hat ([Red Hat][rh-hat]). MIT uses black or white only ([MIT][mit-logo]).

### 4.3 Small sizes

- **Clear space at small sizes:** no source surveyed scales clear space differently at small sizes. Mastodon's fixed 36 px is the only pixel rule ([Mastodon][masto]). Apple's badge reduces clear space in tight layouts ([Apple][apple-mkt]).
- **Minimum sizes for symbols on their own:** 16 px (Meta, Red Hat, Berkeley's favicon), 20 px (GitLab), 21 px (Spotify, LinkedIn). MIT switches to a micro logo below 30 px.
- **Detail at small sizes:**
  - Apple says fine features and very thin lines lose detail at small sizes ([Apple HIG][apple-hig]).
  - Microsoft says to keep detail legible at small sizes ([Microsoft design][ms-design]). It also asks for icon files at 16, 24, 32, 48 and 256 px, so Windows scales as little as possible ([Microsoft construction][ms-construct]).
- **Pointer targets:** WCAG 2.2 success criterion 2.5.8 (Level AA) asks for targets of at least 24 × 24 CSS px. Smaller targets pass if a 24 px circle centered on each doesn't overlap another target ([Understanding 2.5.8][wcag-258]).
- **Pixels to millimeters:** CSS defines 1 px as 1/96 of an inch ([CSS Values and Units Level 3][css-values], Candidate Recommendation Draft, 22 March 2024).

---

## 5. Sources

All accessed 21 October 2026.

**Brand owners' guidelines**

- GitHub, Brand Toolkit, Logo: https://brand.github.com/foundations/logo
  - Invertocat clear-space diagram: https://brand.github.com/_next/static/media/logo-02.94014ca5.png
- Spotify for Developers, Design & Branding Guidelines: https://developer.spotify.com/documentation/design
- Shopify, Using our brand: https://www.shopify.com/brand-assets
- Meta, Facebook logo: https://www.meta.com/brand/resources/facebook/logo/ (redirected from about.meta.com)
- Red Hat:
  - The hat: https://www.redhat.com/en/about/brand/standards/the-hat
  - Hat clear-space diagram: https://www.redhat.com/rhdc/managed-files/Brand_standards-Red_Hat-The_hat-Clear_space.svg
  - The Red Hat logo: https://www.redhat.com/en/about/brand/standards/logo
- Discord:
  - Brand Guidelines: https://discord.com/branding
  - Symbol clearspace diagram: https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6762812affa5eaf1bedc0c42_Symbol.svg
- LinkedIn Brand Guidelines, LinkedIn Logo: https://brand.linkedin.com/en-us/linkedin-logo
- Slack, Brand Terms of Service: https://slack.com/terms-of-service/slack-brand
- GitLab Pajamas:
  - Logomark: https://design.gitlab.com/brand-logo/logomark
  - Core logo: https://design.gitlab.com/brand-logo/core-logo
- MIT Brand Guide:
  - MIT Logo: https://brand.mit.edu/logos-marks/mit-logo
  - Social Media Logos: https://brand.mit.edu/logos-marks/social-media-logos
- UC Berkeley Brand, Icons & secondary marks: https://brand.berkeley.edu/visual-identity/icons-secondary-marks/
- Atlassian Design:
  - Logos: https://atlassian.design/foundations/logos
  - Logo component, usage: https://atlassian.design/components/logo/usage
- Dropbox Brand Guidelines, Logo: https://brand.dropbox.com/logo
- Mailchimp (Intuit), Brand Assets: https://mailchimp.com/about/brand-assets/
- Apple, App Store Marketing Guidelines: https://developer.apple.com/app-store/marketing/guidelines/
- X, Brand toolkit: https://about.x.com/en/who-we-are/brand-toolkit
- Mastodon, Branding: https://joinmastodon.org/branding
- Meta, Instagram brand: https://www.meta.com/brand/resources/instagram/instagram-brand/
- Meta, WhatsApp brand: https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/
- Figma, Logo & Brand Usage Guidelines: https://www.figma.com/using-the-figma-brand/
- Pinterest, Brand guidelines: https://business.pinterest.com/brand-guidelines/
- Twitch, Brand assets: https://brand.twitch.com/

**Platform documentation**

- W3C, Web Application Manifest (Working Draft, 16 October 2026), section on icon masks and the safe zone: https://www.w3.org/TR/appmanifest/
- Android Developers, Adaptive icons: https://developer.android.com/develop/ui/views/launch/icon_design_adaptive
- Apple:
  - Human Interface Guidelines, App icons: https://developer.apple.com/design/human-interface-guidelines/app-icons
  - The same page's data file: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/app-icons.json
- Google Play, Icon design specifications: https://developer.android.com/distribute/google-play/resources/icon-design-specifications
- Material Design 2:
  - Product icons: https://m2.material.io/design/iconography/product-icons.html
  - The same page's data file: https://m2.material.io/page-data/Guidelines/5895955235995648.json
- Google Search Central, Favicon in search results: https://developers.google.com/search/docs/appearance/favicon-in-search
- Facebook Help Center, Page profile picture and cover photo dimensions: https://www.facebook.com/help/125379114252045
- YouTube Help:
  - Manage your channel branding: https://support.google.com/youtube/answer/10456525
  - Channel banner & profile picture tips: https://support.google.com/youtube/answer/12950272
- X Help Center, Help with uploading a profile photo: https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo
- LinkedIn Help, Page logo and cover image: https://www.linkedin.com/help/linkedin/answer/a563309
- Microsoft Learn:
  - Construct your Windows app's icon: https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-construction
  - Design guidelines for Windows app icons: https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design

**Standards**

- W3C, Understanding SC 2.5.8 Target Size (Minimum): https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- W3C, WCAG 2.2: https://www.w3.org/TR/WCAG22/
- W3C, CSS Values and Units Module Level 3 (Candidate Recommendation Draft, 22 March 2024): https://www.w3.org/TR/css-values-3/

**Studio files measured**

- `public/logos/compass-glyph-navy-ink.svg`, `compass-tile-ink-on-paper.svg`, `compass-tile-light-gold-on-ink.svg`, `compass-tile-navy-ink-on-light-gold.svg`, `compass-tile-email-light-gold-on-ink.svg`

**Tried but not usable (21 October 2026)**

- X/Twitter brand guidelines PDF (HTTP 402 to automated reading; reading it would mean downloading the file): https://about.x.com/content/dam/about-twitter/en/brand-toolkit/downloads/twitter-external-brand-guidelines-01272021.pdf
- Mozilla, Firefox logo usage (HTTP 403): https://mozilla.design/firefox/logos-usage/
- Reddit brand (automated reading blocked): https://redditinc.com/brand
- Meta, Instagram icons (HTTP 404): https://www.meta.com/brand/resources/instagram/icons/
- Microsoft, logo usage (HTTP 404): https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/logo
- Ubuntu logo page (no clear-space text; rules are in downloads): https://design.ubuntu.com/brand/ubuntu-logo
- YouTube brand site (images only, no readable text): https://brand.youtube/
- Instagram Help, profile picture (no size or shape given): https://help.instagram.com/557544397610546
- Third-party social-media size guides: excluded, because they aren't first-party.

[gh]: https://brand.github.com/foundations/logo
[gh-diagram]: https://brand.github.com/_next/static/media/logo-02.94014ca5.png
[spo]: https://developer.spotify.com/documentation/design
[shp]: https://www.shopify.com/brand-assets
[fb]: https://www.meta.com/brand/resources/facebook/logo/
[rh-hat]: https://www.redhat.com/en/about/brand/standards/the-hat
[rh-diagram]: https://www.redhat.com/rhdc/managed-files/Brand_standards-Red_Hat-The_hat-Clear_space.svg
[rh-logo]: https://www.redhat.com/en/about/brand/standards/logo
[dis]: https://discord.com/branding
[dis-diagram]: https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/6762812affa5eaf1bedc0c42_Symbol.svg
[li]: https://brand.linkedin.com/en-us/linkedin-logo
[slack]: https://slack.com/terms-of-service/slack-brand
[gl-mark]: https://design.gitlab.com/brand-logo/logomark
[gl-core]: https://design.gitlab.com/brand-logo/core-logo
[mit-logo]: https://brand.mit.edu/logos-marks/mit-logo
[mit-social]: https://brand.mit.edu/logos-marks/social-media-logos
[ucb-icons]: https://brand.berkeley.edu/visual-identity/icons-secondary-marks/
[atl]: https://atlassian.design/foundations/logos
[atl-comp]: https://atlassian.design/components/logo/usage
[dbx]: https://brand.dropbox.com/logo
[mc]: https://mailchimp.com/about/brand-assets/
[apple-mkt]: https://developer.apple.com/app-store/marketing/guidelines/
[x-toolkit]: https://about.x.com/en/who-we-are/brand-toolkit
[masto]: https://joinmastodon.org/branding
[ig-brand]: https://www.meta.com/brand/resources/instagram/instagram-brand/
[wa-brand]: https://www.meta.com/brand/resources/whatsapp/whatsapp-brand/
[figma]: https://www.figma.com/using-the-figma-brand/
[pin]: https://business.pinterest.com/brand-guidelines/
[twitch]: https://brand.twitch.com/
[w3c-manifest]: https://www.w3.org/TR/appmanifest/
[android]: https://developer.android.com/develop/ui/views/launch/icon_design_adaptive
[apple-hig]: https://developer.apple.com/design/human-interface-guidelines/app-icons
[apple-hig-json]: https://developer.apple.com/tutorials/data/design/human-interface-guidelines/app-icons.json
[gplay]: https://developer.android.com/distribute/google-play/resources/icon-design-specifications
[material]: https://m2.material.io/design/iconography/product-icons.html
[material-json]: https://m2.material.io/page-data/Guidelines/5895955235995648.json
[g-favicon]: https://developers.google.com/search/docs/appearance/favicon-in-search
[fb-help]: https://www.facebook.com/help/125379114252045
[yt-brand]: https://support.google.com/youtube/answer/10456525
[yt-tips]: https://support.google.com/youtube/answer/12950272
[x-help]: https://help.x.com/en/managing-your-account/common-issues-when-uploading-profile-photo
[li-help]: https://www.linkedin.com/help/linkedin/answer/a563309
[ms-construct]: https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-construction
[ms-design]: https://learn.microsoft.com/en-us/windows/apps/design/style/iconography/app-icon-design
[wcag-258]: https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[css-values]: https://www.w3.org/TR/css-values-3/
