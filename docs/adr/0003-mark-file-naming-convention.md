# One naming convention for marks, everywhere

Every Compass mark has one name, used unchanged as the Figma frame name, the design system asset name, the file name people download from Brand resources, and the file name in the marketing site. Until now the same artwork carried three different names (for example `compass-wordmark-alt.svg`, `compass-lockup-horizontal-two-tone`, `compass-wordmark-gold-glyph.svg`), which is how the wrong navy ended up in the favicon. The convention below combines the Figma file's existing pattern with an audit of 13 published brand kits (`docs/research/brand-kit-naming.md`).

## The pattern

```
compass-{mark}[-{layout}]-{colorway}.{svg|png|pdf}
```

- **Lowercase, hyphens only.** No underscores, spaces or capitals.
- **`{mark}`** is the glossary term: `glyph`, `wordmark`, `lockup` or `tile`.
- **`{layout}`** only where a mark has more than one arrangement:
  - `lockup`: `horizontal` or `stacked`
  - `wordmark`: `bar` (the wordmark on a solid bar)
  - `tile`: `email` (the wide email tile); a plain tile is square
- **`{colorway}`** is one of six words: `two-tone`, `navy-ink`, `gold-deep`, `reversed`, `paper`, `light-gold`.
- **Marks with a built-in background** (tiles and bars) name the art color, then the background color: `light-gold-on-ink`.
- **One base name per mark** across `.svg`, `.png` and `.pdf`. A color-space suffix (`-cmyk`, `-pantone`) is added only if print files are ever made outside Figma.
- **In Figma,** the frame name is `Logos/{file name}` or `Tiles/{file name}`. Figma names an exported file after its frame, and the slash puts it in a folder.

## Examples

`compass-glyph-navy-ink`, `compass-wordmark-light-gold`, `compass-lockup-stacked-two-tone`, `compass-lockup-horizontal-reversed`, `compass-tile-navy-ink-on-light-gold`, `compass-wordmark-bar-light-gold-on-navy-deep`, `compass-tile-email-light-gold-on-ink`. Favicon files are generated from `compass-tile-navy-ink-on-light-gold` and keep the familiar `compass-favicon` name.

## Considered options

- **Keep the design system's original names** (`compass_wordmark_light.svg`, `compass-wordmark-alt.svg`). Rejected: mixed separators, and "light" and "alt" don't say what the file is.
- **Name two-color art by its colors** (`navy-gold-glyph`) or call it `color`, as some kits do. Rejected in favor of `two-tone`, which the Figma file already used.
