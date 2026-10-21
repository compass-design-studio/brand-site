// PROTOTYPE: throwaway. Data for the Brand resources prototype.
// Marks, colors and usage numbers come from the design system README and tokens
// (https://claude.ai/artifact/Rw1w5LKT3xh6SJpoXojNnV, read 2026-10-21) and public/logos/.
// "Use it for" lines and the proposed minimum sizes are DRAFTS for Canyon to approve;
// they go into the design system first (ADR 0001), never straight to the site.

const LOGO_DIR = '../../public/logos/';

const COLORS = {
  navy: '#2A5D7E', 'navy-deep': '#1F4A66', 'navy-ink': '#133558', ink: '#1A2A36',
  paper: '#F7F4EE', 'paper-2': '#EFEAE0', tan: '#E9E3DB', white: '#FFFFFF',
  gold: '#AD9A4C', 'gold-deep': '#9C8842', 'light-gold': '#E1C982',
};

// Brand swatches, shown exactly (ADR 0002). CMYK is a straight formula, not a proof (issue #2).
const SWATCHES = [
  { key: 'navy', name: 'Navy', hex: '#2A5D7E', rgb: '42 93 126', cmyk: 'C67 M26 Y0 K51', role: 'Icons, the info state, navy badges.' },
  { key: 'navy-deep', name: 'Navy deep', hex: '#1F4A66', rgb: '31 74 102', cmyk: 'C70 M27 Y0 K60', role: 'Headings and link text.' },
  { key: 'navy-ink', name: 'Navy ink', hex: '#133558', rgb: '19 53 88', cmyk: 'C78 M40 Y0 K65', role: 'The wordmark and glyph on light backgrounds.' },
  { key: 'ink', name: 'Ink', hex: '#1A2A36', rgb: '26 42 54', cmyk: 'C52 M22 Y0 K79', role: 'Body text. Dark backgrounds, the footer, buttons.' },
  { key: 'paper', name: 'Paper', hex: '#F7F4EE', rgb: '247 244 238', cmyk: 'C0 M1 Y4 K3', role: 'The page background. Text on Ink.' },
  { key: 'paper-2', name: 'Paper 2', hex: '#EFEAE0', rgb: '239 234 224', cmyk: 'C0 M2 Y6 K6', role: 'Alternate bands and hovers.' },
  { key: 'tan', name: 'Tan', hex: '#E9E3DB', rgb: '233 227 219', cmyk: 'C0 M3 Y6 K9', role: 'Quiet panels and cards.' },
  { key: 'gold', name: 'Gold', hex: '#AD9A4C', rgb: '173 154 76', cmyk: 'C0 M11 Y56 K32', role: 'A fine pen line: rules, eyebrows, hovers. Never a fill.' },
  { key: 'gold-deep', name: 'Gold deep', hex: '#9C8842', rgb: '156 136 66', cmyk: 'C0 M13 Y58 K39', role: 'The glyph and descriptor in two-tone marks.' },
  { key: 'light-gold', name: 'Light gold', hex: '#E1C982', rgb: '225 201 130', cmyk: 'C0 M11 Y42 K12', role: 'Accents on Ink. The light gold wordmark.' },
];

const STATUS = [
  { name: 'Success', hex: '#3D8064', cmyk: 'C52 M0 Y22 K50' },
  { name: 'Warning', hex: '#C99A2E', cmyk: 'C0 M23 Y77 K21' },
  { name: 'Danger', hex: '#B04A3A', cmyk: 'C0 M58 Y67 K31' },
  { name: 'Info', hex: '#2A5D7E', cmyk: 'Navy' },
];

// Colorways: which mark colors they use and which backgrounds are approved (design system "Marks").
const COLORWAYS = {
  'two-tone':   { name: 'Two-tone',   side: 'light', colors: ['navy-ink', 'gold-deep'],  approved: ['paper', 'white'], bgNote: 'Paper and white only' },
  'navy-ink':   { name: 'Navy ink',   side: 'light', colors: ['navy-ink'],               approved: ['paper', 'paper-2', 'white', 'tan'], bgNote: 'Paper, Paper 2, white, Tan' },
  'gold-deep':  { name: 'Gold deep',  side: 'light', colors: ['gold-deep'],              approved: ['paper', 'white'], bgNote: 'Paper and white only' },
  'reversed':   { name: 'Reversed',   side: 'dark',  colors: ['paper', 'light-gold'],    approved: ['ink', 'photo'], bgNote: 'Ink and dark areas of photos' },
  'paper':      { name: 'Paper',      side: 'dark',  colors: ['paper'],                  approved: ['ink', 'photo'], bgNote: 'Ink and dark areas of photos' },
  'light-gold': { name: 'Light gold', side: 'dark',  colors: ['light-gold'],             approved: ['ink', 'photo'], bgNote: 'Ink and dark areas of photos' },
};
const LIGHT_ORDER = ['navy-ink', 'two-tone', 'gold-deep'];
const DARK_ORDER = ['light-gold', 'reversed', 'paper'];

const FORMS = [
  { key: 'wordmark', name: 'Wordmark', file: c => `compass-wordmark-${c}`, colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'],
    useFor: 'Everyday use: documents, slides, web pages and social posts.', ratio: 1800 / 330 },
  { key: 'lockup-horizontal', name: 'Horizontal lockup', file: c => `compass-lockup-horizontal-${c}`, colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'],
    useFor: 'Wide formats that introduce the studio: signage, covers, proposals.', ratio: 3301 / 400 },
  { key: 'lockup-stacked', name: 'Stacked lockup', file: c => `compass-lockup-stacked-${c}`, colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'],
    useFor: 'Signage, stationery, covers.', ratio: 1800 / 451 },
  { key: 'glyph', name: 'Glyph', file: c => `compass-glyph-${c}`, colorways: ['navy-ink', 'gold-deep', 'light-gold', 'paper'],
    useFor: 'Where the name already appears or space is tight: ornaments, stamps.', ratio: 836 / 1358 },
];

const TILES = [
  { file: 'compass-tile-navy-ink-on-light-gold', name: 'Tile · navy ink on light gold', useFor: 'Favicon and app icon.', shape: 'square' },
  { file: 'compass-tile-light-gold-on-ink', name: 'Tile · light gold on Ink', useFor: 'Profile pictures on dark layouts.', shape: 'square' },
  { file: 'compass-tile-ink-on-paper', name: 'Tile · Ink on Paper', useFor: 'Profile pictures on light layouts.', shape: 'square' },
  { file: 'compass-tile-email-light-gold-on-ink', name: 'Email tile · light gold on Ink', useFor: 'Email signatures.', shape: 'email' },
  { file: 'compass-wordmark-bar-navy-deep-on-light-gold', name: 'Wordmark bar · navy deep on light gold', useFor: 'Headers and merch that need their own background.', shape: 'bar' },
  { file: 'compass-wordmark-bar-light-gold-on-navy-deep', name: 'Wordmark bar · light gold on navy deep', useFor: 'Headers and merch that need their own background.', shape: 'bar' },
];

const ALL_MARK_FILES = [
  ...FORMS.flatMap(f => f.colorways.map(c => f.file(c))),
  ...TILES.map(t => t.file),
];

// Minimum sizes. "provisional" is what the design system says today; "proposed" is the
// prototype's suggestion for the final numbers (design system: "We'll set every final size,
// in px and mm, in the Brand resources prototype"). Lockup numbers keep the descriptor's
// capitals at least ~5 px / 1.2 mm tall (measured from the SVGs: descriptor cap height is
// 2.5% of the horizontal lockup's width and 4.4% of the stacked lockup's).
const MIN_SIZES = {
  provisional: {
    note: 'What the design system says today. Two-tone and gold deep "get a larger minimum", not yet set.',
    rows: [
      { form: 'wordmark', label: 'Wordmark', std: [120, 32], strong: null, axis: 'wide' },
      { form: 'lockup-horizontal', label: 'Horizontal lockup', std: null, strong: null, axis: 'wide' },
      { form: 'lockup-stacked', label: 'Stacked lockup', std: null, strong: null, axis: 'wide' },
      { form: 'glyph', label: 'Glyph', std: [24, 6], strong: null, axis: 'tall' },
    ],
  },
  proposed: {
    note: 'Proposed final sizes. Two-tone and gold deep marks are a third larger, because their gold deep parts have the least contrast.',
    rows: [
      { form: 'wordmark', label: 'Wordmark', std: [120, 32], strong: [160, 40], axis: 'wide' },
      { form: 'lockup-horizontal', label: 'Horizontal lockup', std: [200, 50], strong: [260, 65], axis: 'wide' },
      { form: 'lockup-stacked', label: 'Stacked lockup', std: [140, 36], strong: [180, 45], axis: 'wide' },
      { form: 'glyph', label: 'Glyph', std: [24, 6], strong: [32, 8], axis: 'tall' },
    ],
  },
};

// The open choices. Each one maps to an item in docs/prototype-options.md.
const CHOICES = [
  { key: 'nav', item: '2', title: 'Navigation', target: 'top',
    options: [
      { v: 'pills', label: 'Index pills · short top bar' },
      { v: 'bar', label: 'Top bar links · no pills' },
    ] },
  { key: 'dl', item: '9', title: 'Hero download button', target: 'top',
    options: [
      { v: 'all', label: 'One zip of every mark' },
      { v: 'form', label: 'A zip per form (menu)' },
      { v: 'see', label: 'Relabel "See logo files"' },
    ] },
  { key: 'logos', item: '5', title: 'Logo files layout', target: 'logos',
    options: [
      { v: 'A', label: 'A · Paired plates' },
      { v: 'B', label: 'B · Background tabs' },
    ] },
  { key: 'pair', item: '5 (Q23)', title: 'Main pair for the lockups', target: 'logos',
    options: [
      { v: 'mono', label: 'Navy ink + light gold' },
      { v: 'twotone', label: 'Two-tone + reversed' },
    ] },
  { key: 'usage', item: '1', title: 'Usage guidance', target: 'logos',
    options: [
      { v: 'inline', label: 'Inline "Usage" disclosure' },
      { v: 'popup', label: 'Click-to-open pop-up' },
    ] },
  { key: 'rules', item: '22', title: 'Usage rules section', target: 'rules',
    options: [
      { v: 'pairs', label: '1 · Do and don\'t pairs' },
      { v: 'plates', label: '2 · Spec plates' },
      { v: 'guide', label: '3 · Question by question' },
    ] },
  { key: 'minsize', item: '7, 22', title: 'Minimum sizes', target: 'rules',
    options: [
      { v: 'proposed', label: 'Proposed final sizes' },
      { v: 'provisional', label: 'Today\'s provisional sizes' },
    ] },
  { key: 'labels', item: '13', title: 'Small labels (AA)', target: 'color',
    options: [
      { v: 'tick', label: 'Ink with a gold tick' },
      { v: 'navy', label: 'Navy deep' },
      { v: 'darkgold', label: 'Site-only dark gold #756833' },
    ] },
  { key: 'cmyk', item: '12', title: 'CMYK values', target: 'color',
    options: [
      { v: 'approx', label: 'Shown, marked approximate' },
      { v: 'off', label: 'Left off the page' },
    ] },
  { key: 's06', item: '4', title: 'Spacing, radius & shadows', target: 'spacing',
    options: [
      { v: 'last', label: 'Moved to the last section' },
      { v: 'drawer', label: 'Folded into one drawer' },
      { v: 'inplace', label: 'Kept in place (v2 order)' },
    ] },
  { key: 'site', item: '16', title: 'Website example', target: 'insitu',
    options: [
      { v: 'rebuilt', label: 'Rebuilt to match the live site' },
      { v: 'screenshot', label: 'Real screenshot' },
    ] },
  { key: 'sig', item: '18', title: 'Email signature', target: 'insitu',
    options: [
      { v: 'people', label: 'One card per founder' },
      { v: 'fields', label: 'Fill in name and title' },
    ] },
  { key: 'trigger', item: '14', title: 'Request trigger', target: 'close',
    options: [
      { v: 'arrow', label: 'Arrow link' },
      { v: 'outline', label: 'Outline button' },
      { v: 'filled', label: 'Filled button' },
    ] },
  { key: 'topbar', item: '14', title: 'Second entry in the top bar', target: 'top',
    options: [
      { v: 'on', label: 'Yes, in the top bar too' },
      { v: 'off', label: 'No, page close only' },
    ] },
  { key: 'form', item: '15', title: 'Request form', target: 'close',
    options: [
      { v: 'A', label: 'A · Full form' },
      { v: 'B', label: 'B · Short form' },
      { v: 'C', label: 'C · Request type first' },
    ] },
];

// Canyon's picks (2026-10-21). The page opens on these; the switcher still shows every option.
const PICKS = {
  nav: 'bar', dl: 'form', logos: 'A', pair: 'mono', usage: 'inline', rules: 'plates', minsize: 'proposed',
  labels: 'tick', cmyk: 'off', s06: 'drawer', site: 'screenshot', sig: 'fields', trigger: 'filled', topbar: 'on', form: 'C',
};
