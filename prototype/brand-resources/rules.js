// PROTOTYPE: throwaway. 02 Using the marks (item 22), in three versions.
// Every picture is drawn from the mark files in public/logos/ and the design system's numbers.
// Wording follows the design system README "Usage rules" section (2026-10-21), shortened.

const BG_NAMES = { paper: 'Paper', 'paper-2': 'Paper 2', white: 'White', tan: 'Tan', ink: 'Ink', photo: 'Dark photo' };
const PHOTO_CALM = { img: 'hurricane-ranch-exterior.jpg', pos: '50% 0%', label: 'Hurricane Ranch · New Market' };
const PHOTO_BUSY = { img: 'widner-residence-exterior.jpg', pos: '50% 50%', label: 'Widner Residence · New Market' };
const PHOTO_DARK = { img: 'hurricane-ranch-exterior.jpg', pos: '35% 100%', label: 'Hurricane Ranch, the lawn' };

// ---------- Pictures drawn from the marks ----------
function svgMod(file, fn, style = 'width:100%;height:auto') {
  let t = SVG[file] || '';
  t = fn ? fn(t) : t;
  return t.replace(/<svg([^>]*?)width="[^"]*"\s*height="[^"]*"/, `<svg$1 style="${style}" aria-hidden="true" focusable="false"`);
}
function rearranged() {
  // Two-tone wordmark: paths are C, O, M, P, S, S, glyph. Move the glyph to the front.
  let i = -1;
  const shifts = [264, 264, 264, 264, 0, 0, -1173.3];
  return svgMod('compass-wordmark-two-tone', t => t.replace(/<path /g, () => { i++; return `<path transform="translate(${shifts[i] || 0} 0)" `; }));
}
function partnerLogo() {
  // A neutral placeholder for another company's logo. Not a real company.
  return `<g fill="#3D4247"><path d="M0 150 L150 20 L300 150 L270 150 L270 330 L30 330 L30 150 Z M110 330 L110 230 L190 230 L190 330 Z" fill-rule="evenodd"/>
    <text x="360" y="215" font-family="DM Sans, system-ui, sans-serif" font-weight="700" font-size="150" letter-spacing="8">EXAMPLE</text>
    <text x="362" y="320" font-family="DM Sans, system-ui, sans-serif" font-weight="500" font-size="78" letter-spacing="30">BUILDERS</text></g>`;
}
const PARTNER_W = 1250;
const PARTNER_SCALE = 1.2; // roughly equal visual weight to the 1800 × 330 wordmark

const DONTS = {
  stretch: { label: 'Don\'t stretch', html: () => `<div class="wm" style="transform:scaleX(1.35)">${markImg('compass-wordmark-navy-ink', 'Compass wordmark stretched wider (wrong)')}</div>` },
  squash: { label: 'Don\'t squash', html: () => `<div class="wm" style="transform:scaleY(.6)">${markImg('compass-wordmark-navy-ink', 'Compass wordmark squashed (wrong)')}</div>` },
  rotate: { label: 'Don\'t rotate', html: () => `<div class="wm" style="transform:rotate(-12deg)">${markImg('compass-wordmark-navy-ink', 'Compass wordmark rotated (wrong)')}</div>` },
  recolor: { label: 'Don\'t recolor', html: () => `<div class="wm" role="img" aria-label="Compass wordmark recolored orange (wrong)">${svgMod('compass-wordmark-navy-ink', t => t.replace(/#133558/g, '#C0562F'))}</div>` },
  outline: { label: 'Don\'t outline', html: () => `<div class="wm" role="img" aria-label="Compass wordmark as an outline (wrong)">${svgMod('compass-wordmark-navy-ink', t => t.replace(/fill="#133558"/g, 'fill="none" stroke="#133558" stroke-width="5"'))}</div>` },
  shadow: { label: 'Don\'t add shadows or effects', html: () => `<div class="wm" style="filter:drop-shadow(6px 8px 4px rgba(0,0,0,.45))">${markImg('compass-wordmark-navy-ink', 'Compass wordmark with a drop shadow (wrong)')}</div>` },
  rearrange: { label: 'Don\'t rearrange the parts', html: () => `<div class="wm" role="img" aria-label="Compass wordmark with the glyph moved to the front (wrong)">${rearranged()}</div>` },
  retype: { label: 'Don\'t retype it', html: () => `<span role="img" aria-label="COMPASS typed in another typeface (wrong)" style="font-family:Georgia,'Times New Roman',serif;font-size:26px;letter-spacing:.14em;color:#133558">COMPASS</span>` },
  contrast: { label: 'Don\'t go under 3:1', note: 'Gold deep on Paper 2 is 2.91:1', bg: 'p2', html: () => `<div class="wm">${markImg('compass-wordmark-gold-deep', 'Gold deep wordmark on Paper 2, too little contrast (wrong)')}</div>` },
  busy: { label: 'Don\'t place it on a busy area', bg: 'photo', photo: PHOTO_BUSY, html: () => `<div class="wm" data-measure="light-gold" style="width:52%">${markImg('compass-wordmark-light-gold', 'Light gold wordmark over a busy porch (wrong)')}</div>` },
  letter: { label: 'Don\'t use the glyph as a letter', note: 'It is the A in COMPASS only', html: () => `<span role="img" aria-label="The glyph used as the A in another word (wrong)" style="display:inline-flex;align-items:flex-end;gap:2px;font-family:var(--font-display);font-size:28px;letter-spacing:.12em;color:#133558;line-height:1">H<img src="${logo('compass-glyph-navy-ink')}" alt="" style="height:34px;width:auto;margin-bottom:-1px">RBOR</span>` },
  inline: { label: 'Don\'t set a mark in a sentence', bg: 'white', html: () => `<p style="font-size:15px;color:var(--ink);text-align:left">Designed with care by <img src="${logo('compass-wordmark-navy-ink')}" alt="Compass" style="display:inline;height:.8em;width:auto;vertical-align:baseline"> in New Market.</p>` },
  stock: { label: 'Don\'t swap in a stock compass', html: () => `<span role="img" aria-label="A stock compass icon used instead of the glyph (wrong)" style="display:inline-flex;align-items:center;gap:10px;color:#133558"><i class="ph ph-compass" style="font-size:54px"></i><span style="font-family:var(--font-display);font-size:24px;letter-spacing:.14em">COMPASS</span></span>` },
  crowd: { label: 'Don\'t crowd it', note: 'Text inside the clear space', bg: 'white', html: () => `<div style="text-align:left;width:90%"><div style="width:70%">${markImg('compass-wordmark-navy-ink', 'Compass wordmark with text too close (wrong)')}</div><p style="font-size:13px;line-height:1.3;margin-top:2px;color:var(--ink)">Hurricane Ranch · Project update · Week 14</p></div>` },
};

function pic(inner, { bg = 'paper', dont = false, photo = null, cls = '' } = {}) {
  const style = photo ? `style="background-image:url(${IMG}${photo.img});background-position:${photo.pos};background-size:cover"` : '';
  return `<div class="pic ${bg} ${dont ? 'dont-pic' : ''} ${cls}" ${style} ${photo ? `data-photo="${photo.img}" data-photo-pos="${photo.pos}"` : ''}>${inner}</div>`;
}
function verdict(ok, text, note) {
  return `<div class="figcap"><span class="${ok ? 'do' : 'dont'}"><i class="ph-fill ${ok ? 'ph-check-circle' : 'ph-x-circle'}" aria-hidden="true"></i>${esc(text)}</span>${note ? `<span class="muted">${note}</span>` : ''}</div>`;
}
function dontFig(key) {
  const d = DONTS[key];
  return `<figure style="margin:0">${pic(d.html(), { bg: d.bg || 'paper', dont: true, photo: d.photo })}${verdict(false, d.label, d.note || (d.photo ? '<span data-ratio-out>Weakest point: measuring…</span>' : ''))}</figure>`;
}
function doFig(inner, label, note, opts = {}) {
  return `<figure style="margin:0">${pic(inner, opts)}${verdict(true, label, note)}</figure>`;
}

// ---------- Shared rule blocks ----------
function startHere() {
  return `<div class="pair">
    ${doFig(`<div class="wm">${markImg('compass-wordmark-navy-ink', 'Compass wordmark, navy ink')}</div>`, 'Navy ink wordmark', 'On light backgrounds')}
    ${doFig(`<div class="wm">${markImg('compass-wordmark-light-gold', 'Compass wordmark, light gold')}</div>`, 'Light gold wordmark', 'On dark backgrounds and photos', { bg: 'ink' })}
  </div>`;
}

function backgroundsMatrix() {
  const cols = ['paper', 'paper-2', 'white', 'tan', 'ink', 'photo'];
  const rows = [...LIGHT_ORDER, ...DARK_ORDER];
  const cell = (cw, b) => {
    const file = `compass-wordmark-${cw}`;
    const approved = COLORWAYS[cw].approved.includes(b);
    const isCheck = cw === 'gold-deep' && b === 'ink';
    const bgStyle = b === 'photo' ? `background:url(${IMG}${PHOTO_DARK.img}) ${PHOTO_DARK.pos} / cover` : `background:${COLORS[b]};${b === 'paper' || b === 'white' ? 'box-shadow:inset 0 0 0 1px var(--rule-strong)' : ''}`;
    const r = b === 'photo' ? null : weakest(cw, b);
    let v;
    if (isCheck) v = `<div class="bg-verdict check"><i class="ph ph-eye" aria-hidden="true"></i>Visual check · ${fmt(r)} · not approved</div>`;
    else if (approved) v = `<div class="bg-verdict ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${b === 'photo' ? 'Yes · check it' : `Yes · ${fmt(r)}`}</div>`;
    else v = `<div class="bg-verdict no"><i class="ph ph-minus-circle" aria-hidden="true"></i>${b === 'photo' ? 'No' : `No · ${fmt(r)}`}</div>`;
    return `<td><div class="bg-cell ${isCheck ? 'check-cell' : ''}" style="${bgStyle}"><img src="${logo(file)}" alt="${esc(altFor(file))} on ${BG_NAMES[b]}${approved ? '' : isCheck ? ', for a visual check only' : ', not approved'}"></div>${v}</td>`;
  };
  return `<div class="bg-matrix-wrap"><table class="bg-matrix">
    <caption class="sr-only">Approved backgrounds for each colorway, with the weakest contrast of the mark's colors on that background</caption>
    <thead><tr><td></td>${cols.map(b => `<th scope="col">${BG_NAMES[b]}${b !== 'photo' ? `<span class="small mono">${COLORS[b]}</span>` : '<span class="small">Weakest spot</span>'}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(cw => `<tr><th scope="row">${COLORWAYS[cw].name}</th>${cols.map(b => cell(cw, b)).join('')}</tr>`).join('')}</tbody>
  </table></div>
  <p class="small muted" style="margin-top:12px">Ratios are the weakest color in the mark against the background, by the WCAG formula. Tiles and wordmark bars carry their own background, so they work on any of these.</p>`;
}

function goldDeepCheck() {
  return `<div class="check-card on-dark">
    <div class="cc"><span class="check-tag"><i class="ph ph-eye" aria-hidden="true"></i>For a visual check · not approved</span>
      <div class="art"><img class="wm" src="${logo('compass-wordmark-gold-deep')}" alt="Compass wordmark, gold deep, on Ink"><img class="gl" src="${logo('compass-glyph-gold-deep')}" alt="Compass glyph, gold deep, on Ink"></div>
      <div><b>Gold deep on Ink · ${fmt(ratio(COLORS['gold-deep'], COLORS.ink))}</b><p>It passes our 3:1 floor, but it stays off the approved list for now. Use light gold on Ink.</p></div></div>
    <div class="cc"><span class="check-tag" style="border-style:solid"><i class="ph ph-check" aria-hidden="true"></i>Approved, for comparison</span>
      <div class="art"><img class="wm" src="${logo('compass-wordmark-light-gold')}" alt="Compass wordmark, light gold, on Ink"><img class="gl" src="${logo('compass-glyph-light-gold')}" alt="Compass glyph, light gold, on Ink"></div>
      <div><b>Light gold on Ink · ${fmt(ratio(COLORS['light-gold'], COLORS.ink))}</b><p>The approved gold for dark backgrounds.</p></div></div>
  </div>`;
}

function tileGeometrySVG() {
  // The tile as drawn: glyph 339.5 of 500 (67.9%), centered. The rule: two-thirds, never over 68%.
  const g = innerSvg('compass-tile-ink-on-paper');
  return `<svg viewBox="-40 -40 760 580" role="img" aria-label="Tile geometry: the glyph is two-thirds of the tile's height, centered, leaving a quarter of the glyph's height above and below">
    <svg x="0" y="0" width="500" height="500" viewBox="0 0 500 500">${g}</svg>
    <rect x="0" y="0" width="500" height="500" fill="none" stroke="rgba(26,42,54,.35)" stroke-width="2"/>
    <g stroke="#1A2A36" stroke-width="2" fill="none">
      <line x1="540" y1="80.3" x2="540" y2="419.8"/><line x1="530" y1="80.3" x2="550" y2="80.3"/><line x1="530" y1="419.8" x2="550" y2="419.8"/>
      <line x1="600" y1="0" x2="600" y2="80.3"/><line x1="590" y1="0" x2="610" y2="0"/><line x1="590" y1="80.3" x2="610" y2="80.3"/>
      <line x1="145" y1="80.3" x2="355" y2="80.3" stroke-dasharray="6 6" stroke="#9C8842"/><line x1="145" y1="419.8" x2="355" y2="419.8" stroke-dasharray="6 6" stroke="#9C8842"/>
    </g>
    <g font-family="JetBrains Mono, monospace" font-size="22" fill="#1A2A36">
      <text x="556" y="245">⅔ tile</text><text x="556" y="272">max 68%</text>
      <text x="616" y="48">¼ glyph</text>
    </g>
  </svg>`;
}

function clearSpaceBlock(big = false) {
  const wm = `<figure style="margin:0">${pic(`<div style="width:100%">${clearSpaceSVG('compass-wordmark-navy-ink', 'wordmark')}</div>`, { bg: 'white' })}
      <figcaption class="figcap"><b style="font-weight:500">Wordmark and lockups</b><span class="muted">The glyph's height clear on every side</span></figcaption></figure>`;
  const gl = `<figure style="margin:0">${pic(`<div style="width:${big ? 62 : 70}%">${clearSpaceSVG('compass-glyph-navy-ink', 'glyph')}</div>`, { bg: 'white' })}
      <figcaption class="figcap"><b style="font-weight:500">Glyph alone</b><span class="muted">¼ of its height · at least 8 px or 2 mm · ½ beside another logo</span></figcaption></figure>`;
  const tile = `<figure style="margin:0">${pic(`<div style="width:100%">${tileGeometrySVG()}</div>`, { bg: 'white' })}
      <figcaption class="figcap"><b style="font-weight:500">In a tile</b><span class="muted">Glyph ⅔ of the tile, centered</span></figcaption></figure>`;
  if (big) return `<div class="spec-grid">${wm}<div class="pair">${gl}${tile}</div></div>`;
  return `<div class="pair three cs-row">${wm}${gl}${tile}</div>`;
}

function minSizeBlock() {
  const set = MIN_SIZES[S.minsize];
  const stdFile = { wordmark: 'compass-wordmark-navy-ink', 'lockup-horizontal': 'compass-lockup-horizontal-navy-ink', 'lockup-stacked': 'compass-lockup-stacked-navy-ink', glyph: 'compass-glyph-navy-ink' };
  const strongFile = { wordmark: 'compass-wordmark-two-tone', 'lockup-horizontal': 'compass-lockup-horizontal-two-tone', 'lockup-stacked': 'compass-lockup-stacked-two-tone', glyph: 'compass-glyph-gold-deep' };
  // An image's px size must be the mark's own size, so lockups (whose files carry a little margin) are sized by their art.
  const artScale = f => (f.startsWith('compass-lockup-horizontal') ? 3301 / 3211.1 : 1);
  const actual = (file, n, axis) => {
    const style = axis === 'tall' ? `height:${n}px` : `width:${(n * artScale(file)).toFixed(1)}px`;
    return `<div class="actual">${markImg(file, `${altFor(file)} at ${n} px ${axis === 'tall' ? 'tall' : 'wide'}`, `style="${style}"`)}</div>`;
  };
  const cell = (row, which) => {
    const v = row[which];
    const file = (which === 'std' ? stdFile : strongFile)[row.form];
    if (!v) return `<td data-label="${which === 'std' ? 'Navy ink, paper, light gold, reversed' : 'Two-tone, gold deep'}"><span class="na">${which === 'strong' && row.std ? 'Larger · not set yet' : 'Not set yet'}</span></td>`;
    return `<td data-label="${which === 'std' ? 'Navy ink, paper, light gold, reversed' : 'Two-tone, gold deep'}">${actual(file, v[0], row.axis)}<span class="mono">${v[0]} px · ${v[1]} mm ${row.axis === 'tall' ? 'tall' : 'wide'}</span></td>`;
  };
  return `<p class="small muted" style="margin-bottom:12px">${esc(set.note)} Marks are shown at actual size at 100% zoom.</p>
    <table class="minsize-table"><thead><tr><th>Mark</th><th>Navy ink, paper, light gold, reversed</th><th>Two-tone, gold deep</th></tr></thead>
    <tbody>${set.rows.map(r => `<tr><td><b style="font-weight:500">${r.label}</b></td>${cell(r, 'std')}${cell(r, 'strong')}</tr>`).join('')}
    <tr><td><b style="font-weight:500">Tiles</b></td><td colspan="2"><span class="small">No glyph minimum inside a tile. A tile may fill a frame made for it, down to a 16 px favicon.</span></td></tr></tbody></table>
    <p class="small" style="margin-top:12px">Too small? Step down: lockup, then wordmark, then glyph or tile.</p>`;
}

function otherLogosSVG(kind) {
  const u = 330; // glyph height of the navy ink wordmark, in its own units
  const ours = `<svg x="0" y="0" width="1800" height="330" viewBox="0 0 1800 330">${innerSvg('compass-wordmark-navy-ink')}</svg>`;
  if (kind === 'do') {
    const px = 1800 + u * 1.5;
    const W = px + PARTNER_W * PARTNER_SCALE;
    return `<svg viewBox="${-u * 1.15} ${-u * 1.25} ${W + u * 1.75} ${330 + u * 2.4}" role="img" aria-label="Our wordmark beside a builder's logo: about the same visual size, with at least the glyph's height of clear space between them">
      <rect x="${-u}" y="${-u}" width="${1800 + 2 * u}" height="${330 + 2 * u}" fill="rgba(225,201,130,.25)" stroke="#9C8842" stroke-width="6" stroke-dasharray="24 18"/>
      ${ours}<g transform="translate(${px} ${-330 * (PARTNER_SCALE - 1) / 2}) scale(${PARTNER_SCALE})">${partnerLogo()}</g>
      <line x1="${px - 60}" y1="-40" x2="${px - 60}" y2="370" stroke="rgba(26,42,54,.4)" stroke-width="4"/>
      <g stroke="#1A2A36" stroke-width="5"><line x1="1800" y1="${330 + u * 0.55}" x2="${px}" y2="${330 + u * 0.55}"/><line x1="1800" y1="${330 + u * 0.4}" x2="1800" y2="${330 + u * 0.7}"/><line x1="${px}" y1="${330 + u * 0.4}" x2="${px}" y2="${330 + u * 0.7}"/></g>
      <text x="${(1800 + px) / 2}" y="${330 + u * 1.05}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="78" fill="#1A2A36">≥ 1 glyph</text>
    </svg>`;
  }
  if (kind === 'merged') {
    return `<svg viewBox="-80 -420 2200 900" role="img" aria-label="Our wordmark merged with a builder's logo into one (wrong)">
      <rect x="-60" y="-400" width="2160" height="860" rx="40" fill="none" stroke="#3D4247" stroke-width="10"/>
      <g transform="translate(750 -380) scale(1)"><path d="M0 150 L150 20 L300 150 L270 150 L270 330 L30 330 L30 150 Z" fill="#3D4247"/></g>
      ${ours}<text x="900" y="440" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif" font-weight="500" font-size="78" letter-spacing="30" fill="#3D4247">BUILDERS</text></svg>`;
  }
  // unequal
  return `<svg viewBox="-60 -60 ${1800 * 0.35 + 330 + PARTNER_W * 1.3 + 120} ${330 * 1.3 + 120}" role="img" aria-label="Our wordmark much smaller than a builder's logo (wrong)">
    <g transform="translate(0 ${330 * 1.3 - 330 * 0.35})"><svg x="0" y="0" width="${1800 * 0.35}" height="${330 * 0.35}" viewBox="0 0 1800 330">${innerSvg('compass-wordmark-navy-ink')}</svg></g>
    <g transform="translate(${1800 * 0.35 + 330} 0) scale(1.3)">${partnerLogo()}</g></svg>`;
}
function otherLogosBlock(withScene = false) {
  return `<div class="pair ${withScene ? '' : 'three'}" style="${withScene ? 'grid-template-columns:1fr' : 'grid-template-columns:1.4fr 1fr 1fr'}">
    ${doFig(`<div style="width:100%">${otherLogosSVG('do')}</div>`, 'Side by side, about the same size', 'Our clear space between them. We approve every joint layout.', { bg: 'white' })}
    ${withScene ? `<div class="pair">` : ''}
    <figure style="margin:0">${pic(`<div style="width:100%">${otherLogosSVG('merged')}</div>`, { bg: 'white', dont: true })}${verdict(false, 'Never merged into one logo')}</figure>
    <figure style="margin:0">${pic(`<div style="width:100%">${otherLogosSVG('unequal')}</div>`, { bg: 'white', dont: true })}${verdict(false, 'Not much smaller or larger')}</figure>
    ${withScene ? '</div>' : ''}
  </div>
  <p class="small muted" style="margin-top:12px">"Example Builders" is a placeholder for a trade partner's logo.</p>`;
}
function signScene() {
  // A drawn scene, not a photo: a builder's job-site sign. Realistic scenes are mastered in Figma (ADR 0004).
  const u = 330;
  return `<figure style="margin:0"><div class="pic" style="background:linear-gradient(#cfd8dc 0 62%, #8a9a6c 62%);min-height:260px;padding:28px 20px 0;align-items:flex-end">
    <div style="width:min(520px,92%);display:flex;flex-direction:column;align-items:center">
      <div style="background:#fff;border:6px solid #3D4247;width:100%;padding:22px 22px 18px;display:flex;flex-direction:column;gap:14px;align-items:center">
        <span style="font:600 13px/1.2 'DM Sans',sans-serif;letter-spacing:.12em;color:#3D4247">HURRICANE RANCH · NEW MARKET</span>
        <svg viewBox="-60 -80 ${1800 + u * 1.5 + PARTNER_W * PARTNER_SCALE + 120} 500" style="width:100%" role="img" aria-label="Sign with our wordmark and a builder's logo side by side">
          <svg x="0" y="0" width="1800" height="330" viewBox="0 0 1800 330">${innerSvg('compass-wordmark-navy-ink')}</svg>
          <line x1="${1800 + u * 0.75}" y1="-20" x2="${1800 + u * 0.75}" y2="350" stroke="#9aa6b0" stroke-width="5"/>
          <g transform="translate(${1800 + u * 1.5} ${-330 * (PARTNER_SCALE - 1) / 2}) scale(${PARTNER_SCALE})">${partnerLogo()}</g></svg>
        <span style="font:400 12px/1.2 'DM Sans',sans-serif;color:#3D4247">Design · Compass Design Studio &nbsp;·&nbsp; Build · Example Builders</span>
      </div>
      <div style="display:flex;justify-content:space-between;width:70%"><i style="display:block;width:10px;height:44px;background:#6b5a45"></i><i style="display:block;width:10px;height:44px;background:#6b5a45"></i></div>
    </div></div>
    <figcaption class="figcap"><span class="do"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>A job-site sign</span><span class="muted">Drawn scene. Realistic scenes are drawn in Figma.</span></figcaption></figure>`;
}

function photosBlock() {
  return `<div class="pair three">
    ${doFig(`<div class="wm" data-measure="navy-ink" style="position:absolute;right:7%;top:5%;width:34%">${markImg('compass-wordmark-navy-ink', 'Navy ink wordmark over a calm, even sky')}</div>`, 'Over a calm, even area', `${PHOTO_CALM.label} · <span data-ratio-out>measuring…</span>`, { bg: 'photo', photo: PHOTO_CALM, cls: 'tall' })}
    ${doFig(`<div style="position:absolute;right:6%;bottom:8%;width:22%">${markImg('compass-tile-light-gold-on-ink', 'Light gold on Ink tile over a busy photo')}</div>`, 'No calm area? Use a tile', PHOTO_BUSY.label, { bg: 'photo', photo: PHOTO_BUSY, cls: 'tall' })}
    ${dontFig('busy')}
  </div>`;
}
function asSupplied(keys = ['stretch', 'squash', 'rotate', 'recolor', 'outline', 'shadow', 'rearrange', 'retype']) {
  return `<div class="dont-grid">${keys.map(dontFig).join('')}</div>`;
}
function colorsBlock() {
  const sw = (hex, name, ring) => `<span style="display:inline-flex;flex-direction:column;gap:4px;align-items:flex-start;font-size:11px"><i style="width:36px;height:36px;border-radius:4px;background:${hex};${ring ? 'box-shadow:inset 0 0 0 1px var(--rule-strong)' : ''}"></i>${name}</span>`;
  return `<div style="display:flex;flex-wrap:wrap;gap:10px 12px;align-items:flex-start">
      ${SWATCHES.map(s => sw(s.hex, s.name, ['paper', 'paper-2', 'tan'].includes(s.key))).join('')}
      <span style="width:1px;align-self:stretch;background:var(--rule-strong);margin:0 6px"></span>
      ${sw('#000000', 'Black')}${sw('#FFFFFF', 'White', true)}
    </div>
    <p class="small muted" style="margin-top:12px">Pure black and white are for one-color jobs only: single-color printing, embroidery, vinyl. Black and white files aren't in the kit yet, so ask us. Any other color, such as a material's own finish, needs Allison's or Canyon's approval for that one job.</p>`;
}
function whoBlock() {
  return `<ul style="margin:0;padding-left:18px;display:flex;flex-direction:column;gap:6px;font-size:14px">
    <li><b style="font-weight:500">Employees and contractors</b>, for studio work.</li>
    <li><b style="font-weight:500">Trade partners</b>, only to identify work done with or for the studio.</li>
    <li>Ask us before putting a mark on anything sold, and never suggest we endorse another business.</li>
    <li>Only Allison or Canyon approves a new, changed or retired mark. Nobody else makes one-off versions.</li>
  </ul>`;
}

// ---------- Version 1: do and don't pairs ----------
function rulesPairs() {
  const row = (id, title, text, body, extra = '') => `<div class="rule-row" id="usage-${id}">
    <div class="rule-text"><h3>${title}</h3><p>${text}</p>${extra}</div><div>${body}</div></div>`;
  return `<div class="rule-rows">
    ${row('start-here', 'Start here', 'Not sure which mark to use? These two are our most used.', startHere())}
    ${row('contrast', 'Backgrounds and contrast', 'Every color in a mark keeps at least 3:1 against what\'s behind it. Keep to each mark\'s approved backgrounds. Anywhere else, check it where it\'s weakest.',
      `<div class="pair">${doFig(`<div class="wm">${markImg('compass-wordmark-navy-ink', 'Navy ink wordmark on Tan')}</div>`, 'Navy ink on Tan', fmt(weakest('navy-ink', 'tan')), { bg: 'tan' })}${dontFig('contrast')}</div>
       <details class="disc" style="margin-top:16px"><summary><span class="tog" aria-hidden="true"></span><span class="lbl">Every colorway on every background</span><span class="what">with the gold deep on Ink check</span></summary><div class="disc-body">${backgroundsMatrix()}<div style="margin-top:20px">${goldDeepCheck()}</div></div></details>`)}
    ${row('photos', 'Photos and busy backgrounds', 'Place a glyph, wordmark or lockup only over a calm, even area. If there isn\'t one, use a tile.', photosBlock())}
    ${row('clear-space', 'Clear space', 'Nothing enters it: no text, rules, photo or page edges, or other logos.', clearSpaceBlock(), `<div style="margin-top:16px;max-width:220px">${dontFig('crowd')}</div>`)}
    ${row('minimum-size', 'Minimum size', 'Below these sizes the fine lines close up.', minSizeBlock())}
    ${row('with-other-logos', 'Next to another company\'s logo', 'About the same visual size, at least our clear space between them, never merged into one logo.', otherLogosBlock())}
    ${row('dont-alter', 'Use them as supplied', 'Don\'t stretch, squash, rotate, recolor, outline, add effects, rearrange the parts, or retype the wordmark.', asSupplied())}
    ${row('glyph-is-the-a', 'The glyph is the A in COMPASS only', 'Don\'t use it as a letter in another word, and don\'t set any mark inside a line of text. On its own it\'s still a mark.',
      `<div class="pair three">${doFig(`<img src="${logo('compass-glyph-navy-ink')}" alt="The glyph alone as an ornament" style="height:72px;width:auto">`, 'On its own, as a mark', 'Section ends, tiles, stamps')}${dontFig('letter')}${dontFig('inline')}</div><div style="max-width:33%;margin-top:20px;min-width:200px">${dontFig('stock')}</div>`)}
    ${row('colors', 'Colors', 'Brand colors only. Never recolor a mark; pick the version that fits.', colorsBlock())}
    ${row('who-may-use', 'Who may use them', 'The marks are for work done by, with or for the studio.', whoBlock())}
  </div>`;
}

// ---------- Version 2: spec plates ----------
function rulesPlates() {
  let n = 0;
  const plate = (id, title, text, body) => `<div class="spec-plate" id="usage-${id}"><div class="sp-head"><span class="num">${String(++n).padStart(2, '0')}</span><h3>${title}</h3><p>${text}</p></div>${body}</div>`;
  return `${plate('start-here', 'Start here', 'Not sure which mark to use? Use the navy ink wordmark on light backgrounds and the light gold one on dark backgrounds. They\'re our most used.', startHere())}
    ${plate('clear-space', 'Clear space', 'Around the wordmark and lockups, leave the glyph\'s height on every side. Around the glyph alone, a quarter of its height, never less than 8 px or 2 mm, and half its height beside another logo.', clearSpaceBlock(true))}
    ${plate('minimum-size', 'Minimum size', 'The smallest each mark may be reproduced at, in px for screens and mm for print.', minSizeBlock())}
    ${plate('contrast', 'Approved backgrounds', 'Every color in the mark keeps at least 3:1 on these. Anywhere else, use the colorway with the most contrast and check it where it\'s weakest; under 3:1, move the mark or use a tile.', `${backgroundsMatrix()}<div style="margin-top:24px">${goldDeepCheck()}</div>`)}
    ${plate('photos', 'Photos', 'Only over a calm, even area. If there isn\'t one, use a tile.', `<div class="rule-row" style="display:block;padding:0;border:0">${photosBlock()}</div>`)}
    ${plate('with-other-logos', 'Next to another company\'s logo', 'About the same visual size, at least our clear space between them, never merged. We approve every joint layout.', `<div class="rule-row" style="display:block;padding:0;border:0">${otherLogosBlock(true)}<div style="margin-top:24px">${signScene()}</div></div>`)}
    ${plate('dont-alter', 'Please don\'t', 'Use the marks as supplied, and keep the glyph as the A in COMPASS only.', asSupplied(['stretch', 'squash', 'rotate', 'recolor', 'outline', 'shadow', 'rearrange', 'retype', 'contrast', 'letter', 'inline', 'stock']))}
    ${plate('colors', 'Colors and who may use them', 'Brand colors only, plus pure black and white for one-color jobs.', `<div class="spec-grid"><div>${colorsBlock()}</div><div>${whoBlock()}</div></div>`)}`;
}

// ---------- Version 3: question by question ----------
let guideStep = 0;
let guideBg = 'paper';
const GUIDE_STEPS = [
  { id: 'which-mark', q: 'Which mark?', render: () => `<h3>Which mark do I use?</h3><p class="lead">Start with the wordmark. Step down only when it won't fit.</p>
      <div class="pair three" style="display:grid">
        ${doFig(`<div style="width:90%">${markImg('compass-lockup-horizontal-navy-ink', 'Horizontal lockup')}</div>`, 'Room to introduce us', 'Lockup: signage, covers, proposals')}
        ${doFig(`<div class="wm">${markImg('compass-wordmark-navy-ink', 'Wordmark')}</div>`, 'Most jobs', 'Wordmark: documents, slides, web, social')}
        ${doFig(`<div style="display:flex;gap:16px;align-items:center"><img src="${logo('compass-glyph-navy-ink')}" alt="Glyph" style="height:64px;width:auto"><img src="${logo('compass-tile-navy-ink-on-light-gold')}" alt="Tile" style="height:64px;width:auto"></div>`, 'Tight spaces, or the name is already there', 'Glyph or tile: favicon, stamps, ornaments')}
      </div>` },
  { id: 'contrast', q: 'What\'s behind it?', render: () => {
      const opts = [['paper', 'Paper', COLORS.paper], ['paper-2', 'Paper 2', COLORS['paper-2']], ['white', 'White', COLORS.white], ['tan', 'Tan', COLORS.tan], ['ink', 'Ink', COLORS.ink], ['photo', 'Dark photo', null]];
      return `<h3>What's behind the mark?</h3><p class="lead">Pick a background to see which versions are approved on it.</p>
      <div class="bg-picker" role="radiogroup" aria-label="Background">${opts.map(([k, n, hex]) => `<input type="radio" name="gbg" id="gbg-${k}" value="${k}" ${guideBg === k ? 'checked' : ''}><label for="gbg-${k}"><i class="sw" style="${hex ? `background:${hex}` : `background-image:url(${IMG}${PHOTO_DARK.img});background-position:${PHOTO_DARK.pos}`}"></i>${n}</label>`).join('')}</div>
      <div class="bg-results" id="bg-results" aria-live="polite"></div>
      <details class="disc" style="margin-top:20px"><summary><span class="tog" aria-hidden="true"></span><span class="lbl">See every combination</span><span class="what">and the gold deep on Ink check</span></summary><div class="disc-body">${backgroundsMatrix()}<div style="margin-top:20px">${goldDeepCheck()}</div></div></details>`;
    } },
  { id: 'photos', q: 'Is it on a photo?', render: () => `<h3>Is it going on a photo?</h3><p class="lead">Only over a calm, even area, checked where it's weakest. If there isn't one, use a tile.</p><div class="rule-row" style="display:block;padding:0;border:0">${photosBlock()}</div>` },
  { id: 'clear-space', q: 'How much space?', render: () => `<h3>How much space around it?</h3><p class="lead">Nothing enters the clear space: text, rules, photo or page edges, other logos.</p>${clearSpaceBlock(true)}<div style="max-width:260px;margin-top:20px">${dontFig('crowd')}</div>` },
  { id: 'minimum-size', q: 'How small?', render: () => `<h3>How small can it go?</h3><p class="lead">Below these sizes the fine lines close up.</p>${minSizeBlock()}` },
  { id: 'with-other-logos', q: 'Next to another logo?', render: () => `<h3>Is it next to another company's logo?</h3><p class="lead">About the same visual size, our clear space between them, never merged. We approve every joint layout.</p><div class="rule-row" style="display:block;padding:0;border:0">${otherLogosBlock()}</div>` },
  { id: 'dont-alter', q: 'What not to do', render: () => `<h3>What not to do</h3><p class="lead">Use the marks as supplied. The glyph is the A in COMPASS only.</p>${asSupplied(['stretch', 'squash', 'rotate', 'recolor', 'outline', 'shadow', 'rearrange', 'retype', 'contrast', 'letter', 'inline', 'stock'])}` },
  { id: 'who-may-use', q: 'Who can use it?', render: () => `<h3>Who can use the marks, and in which colors?</h3><p class="lead">Work done by, with or for the studio, in brand colors.</p><div class="spec-grid"><div>${whoBlock()}</div><div>${colorsBlock()}</div></div>` },
];
function rulesGuide() {
  return `<div class="guide">
    <nav class="guide-steps" aria-label="Questions">${GUIDE_STEPS.map((s, i) => `<button type="button" data-step="${i}" ${i === guideStep ? 'aria-current="step"' : ''}><span class="n">${String(i + 1).padStart(2, '0')}</span>${s.q}</button>`).join('')}</nav>
    <div class="guide-panel" id="guide-panel" tabindex="-1">${GUIDE_STEPS[guideStep].render()}
      <div style="display:flex;justify-content:space-between;margin-top:32px;padding-top:16px;border-top:1px solid var(--rule)">
        ${guideStep > 0 ? `<button type="button" class="btn btn-outline btn-sm" data-step="${guideStep - 1}">← ${GUIDE_STEPS[guideStep - 1].q}</button>` : '<span></span>'}
        ${guideStep < GUIDE_STEPS.length - 1 ? `<button type="button" class="btn btn-ink btn-sm" data-step="${guideStep + 1}">${GUIDE_STEPS[guideStep + 1].q} →</button>` : ''}
      </div></div>
  </div>`;
}
function renderBgResults() {
  const box = $('#bg-results');
  if (!box) return;
  const b = guideBg;
  const bgStyle = b === 'photo' ? `background:url(${IMG}${PHOTO_DARK.img}) ${PHOTO_DARK.pos} / cover` : `background:${COLORS[b]};${['paper', 'white'].includes(b) ? 'box-shadow:inset 0 0 0 1px var(--rule-strong)' : ''}`;
  const rank = cw => (COLORWAYS[cw].approved.includes(b) ? 0 : cw === 'gold-deep' && b === 'ink' ? 1 : 2);
  box.innerHTML = [...LIGHT_ORDER, ...DARK_ORDER].sort((x, y) => rank(x) - rank(y)).map(cw => {
    const ok = COLORWAYS[cw].approved.includes(b);
    const check = cw === 'gold-deep' && b === 'ink';
    const r = b === 'photo' ? null : weakest(cw, b);
    const label = check ? `<span class="bg-verdict check"><i class="ph ph-eye" aria-hidden="true"></i>${COLORWAYS[cw].name} · ${fmt(r)} · visual check, not approved</span>`
      : ok ? `<span class="bg-verdict ok"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>${COLORWAYS[cw].name} · ${r ? fmt(r) : 'check it'}</span>`
      : `<span class="bg-verdict no"><i class="ph ph-minus-circle" aria-hidden="true"></i>${COLORWAYS[cw].name} · not approved${r ? ` · ${fmt(r)}` : ''}</span>`;
    return `<div class="r"><div class="bg-cell ${check ? 'check-cell' : ''}" style="${bgStyle};${ok || check ? '' : 'opacity:.5'}"><img src="${logo(`compass-wordmark-${cw}`)}" alt="${esc(altFor(`compass-wordmark-${cw}`))}"></div>${label}</div>`;
  }).join('');
}
function wireGuide() {
  const g = $('.guide');
  if (!g) return;
  g.onclick = e => {
    const b = e.target.closest('[data-step]');
    if (!b) return;
    guideStep = +b.dataset.step;
    const y = $('#rules').getBoundingClientRect().top;
    $('#rules').outerHTML = RENDER.rules();
    applyNumbers(); wireGuide(); measurePhotos();
    if (y < 0) $('#rules .guide').scrollIntoView({ block: 'start' });
    $('#guide-panel').focus({ preventScroll: true });
  };
  g.onchange = e => { if (e.target.name === 'gbg') { guideBg = e.target.value; renderBgResults(); } };
  renderBgResults();
}

// Measure the real contrast under a mark placed on a photo (the "check it where it's weakest" rule)
function measurePhotos() {
  $$('.pic[data-photo]').forEach(p => {
    const mark = $('[data-measure]', p);
    const out = $('[data-ratio-out]', p.closest('figure'));
    if (!mark || !out) return;
    const img = new Image();
    img.onload = () => {
      const pr = p.getBoundingClientRect(), mr = mark.getBoundingClientRect();
      if (!pr.width) return;
      const s = Math.max(pr.width / img.width, pr.height / img.height);
      const [px, py] = p.dataset.photoPos.split(' ').map(v => parseFloat(v) / 100);
      const ox = (pr.width - img.width * s) * px, oy = (pr.height - img.height * s) * py;
      const sx = (mr.left - pr.left - ox) / s, sy = (mr.top - pr.top - oy) / s, sw = mr.width / s, sh = mr.height / s;
      const c = document.createElement('canvas'); c.width = 64; c.height = 24;
      const x = c.getContext('2d'); x.drawImage(img, sx, sy, sw, sh, 0, 0, 64, 24);
      let d; try { d = x.getImageData(0, 0, 64, 24).data; } catch { out.textContent = 'check it where it\'s weakest'; return; }
      const markHex = COLORS[mark.dataset.measure];
      let worst = 99;
      for (let i = 0; i < d.length; i += 4) {
        const hex = '#' + [d[i], d[i + 1], d[i + 2]].map(v => v.toString(16).padStart(2, '0')).join('');
        worst = Math.min(worst, ratio(markHex, hex));
      }
      out.textContent = `weakest point ${fmt(worst)}`;
    };
    img.src = IMG + p.dataset.photo;
  });
}

RENDER.rules = () => `<section class="section" id="rules" aria-labelledby="rules-title">
  ${sectionHead('rules', 'Using the marks', 'Usage rules', 'How we, and anyone working with us, use the marks. The wording lives in our design system; these pictures are drawn from the files above.')}
  ${protoTag('rules')} ${protoTag('minsize')}
  ${S.rules === 'pairs' ? rulesPairs() : S.rules === 'plates' ? rulesPlates() : rulesGuide()}
</section>`;
AFTER.push(wireGuide, () => { setTimeout(measurePhotos, 300); setTimeout(measurePhotos, 1500); });
addEventListener('resize', () => { clearTimeout(measurePhotos._t); measurePhotos._t = setTimeout(measurePhotos, 400); });
