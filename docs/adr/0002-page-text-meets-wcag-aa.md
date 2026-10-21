# Page text meets WCAG 2.2 AA; brand colors shown on the page stay exact

The design system deliberately keeps some text colors that fall below WCAG contrast on its own backgrounds: Gold on Paper is 2.55:1 and the tertiary caption grey is 2.26:1, against a 4.5:1 floor for small text. Brand resources is a public page whose small labels carry real information (file names, color values, usage notes), so the page's own text meets WCAG 2.2 AA even where that means using a different color than the design system names for that role. The brand palette shown on the page (swatches, hex, RGB and CMYK values, the copyable CSS) stays exactly as defined in the design system. Any darker text color the page needs is a site-only value, never added to the brand palette.

## Considered options

- **Match the design system exactly.** Rejected: on a public reference page, too much small text fails contrast.
- **Add a darker gold to the brand palette and fix it upstream.** Rejected: the brand palette itself isn't changing.

## Consequences

- A future sync from the artifact ([issue #1](https://github.com/compass-design-studio/brand-site/issues/1)) must update the palette without undoing these page-level text colors.
- Gold stays in use for rules, hairlines and ornaments, which are exempt from text contrast. Any gold-colored text that remains must meet the floor for its size: 3:1 at 24px and above (Gold deep passes on Paper at 3.18:1; Gold doesn't at 2.55:1), 4.5:1 below.
