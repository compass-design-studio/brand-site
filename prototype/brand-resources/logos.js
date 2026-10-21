// PROTOTYPE: throwaway. 01 Logo files: layout A (paired plates) and B (background tabs),
// with the usage guidance as an inline disclosure or a click-to-open pop-up (choice 1).

// Art bounds measured from the SVG paths (headless Chrome getBBox, 2026-10-21), in file units.
const ART = {
  wordmark: { vb: [1800, 330], box: [0, 0, 1800, 329.5], glyphH: 329.5 },
  'wordmark-wide': { vb: [1855, 340], box: [0, 0, 1854.4, 339.5], glyphH: 339.5 }, // two-tone and reversed files
  'lockup-horizontal': { vb: [3301, 400], box: [45, 30.3, 3211.1, 339.5], glyphH: 339.5 },
  'lockup-stacked': { vb: [1800, 451], box: [0, 0, 1800, 450.4], glyphH: 329.5 },
  glyph: { vb: [836, 1358], box: [0, 0, 836, 1358], glyphH: 1358 },
};
const GLYPH_PATH_FILE = 'compass-glyph-navy-ink';

function mainPair(formKey) {
  if (formKey.startsWith('lockup') && S.pair === 'twotone') return ['two-tone', 'reversed'];
  return ['navy-ink', 'light-gold'];
}
function cwCaption(cw) {
  const c = COLORWAYS[cw];
  return c.side === 'light' ? `${c.name} · for light backgrounds` : `${c.name} · for dark backgrounds & photos`;
}
function innerSvg(file) {
  // The file's markup without the outer <svg> wrapper, for nesting in diagrams
  const t = SVG[file] || '';
  return t.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

// A clear-space diagram drawn from the real mark file and the design system's numbers.
function clearSpaceSVG(file, formKey, { beside = false, compact = false } = {}) {
  const wide = /wordmark-(two-tone|reversed)$/.test(file);
  const a = ART[wide ? 'wordmark-wide' : formKey];
  const [bx, by, bw, bh] = a.box;
  const isGlyph = formKey === 'glyph';
  const u = isGlyph ? a.glyphH * (beside ? 0.5 : 0.25) : a.glyphH;
  const pad = u * (compact ? 0.15 : 0.35);
  const vx = bx - u - pad, vy = by - u - pad, vw = bw + 2 * (u + pad), vh = bh + 2 * (u + pad);
  const sw = Math.max(vw, vh) / 260;
  const glyphMarker = (x, y, h) => {
    const w = h * 836 / 1358;
    return `<svg x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" viewBox="0 0 836 1358" opacity=".55">${innerSvg(GLYPH_PATH_FILE).replace(/fill="#133558"/g, 'fill="none" stroke="#9C8842" stroke-width="40"')}</svg>`;
  };
  const markers = isGlyph ? '' : [
    glyphMarker(bx - u / 2, by + bh / 2, u * 0.8),
    glyphMarker(bx + bw + u / 2, by + bh / 2, u * 0.8),
    glyphMarker(bx + bw / 2, by - u / 2, u * 0.8),
    glyphMarker(bx + bw / 2, by + bh + u / 2, u * 0.8),
  ].join('');
  const tick = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1A2A36" stroke-width="${sw}"/>`;
  const dim = isGlyph ? `${tick(bx - u, by + bh + u * 0.5, bx, by + bh + u * 0.5)}${tick(bx - u, by + bh + u * 0.3, bx - u, by + bh + u * 0.7)}${tick(bx, by + bh + u * 0.3, bx, by + bh + u * 0.7)}` : '';
  return `<svg viewBox="${vx} ${vy} ${vw} ${vh}" role="img" aria-label="Clear space around the ${esc(altFor(file).replace('Compass ', ''))}: ${isGlyph ? (beside ? 'half' : 'a quarter') + ' of the glyph\'s height' : 'the glyph\'s height'} on every side">
    <rect x="${bx - u}" y="${by - u}" width="${bw + 2 * u}" height="${bh + 2 * u}" fill="rgba(225,201,130,.28)" stroke="#9C8842" stroke-width="${sw}" stroke-dasharray="${sw * 4} ${sw * 3}"/>
    <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" fill="#F7F4EE"/>
    ${markers}${dim}
    <svg x="0" y="0" width="${a.vb[0]}" height="${a.vb[1]}" viewBox="0 0 ${a.vb[0]} ${a.vb[1]}">${innerSvg(file)}</svg>
  </svg>`;
}

function minSizeLine(formKey) {
  const set = MIN_SIZES[S.minsize];
  const row = set.rows.find(r => r.form === formKey);
  if (!row.std) return 'Not set yet (provisional sizes cover the wordmark and glyph only).';
  const ax = row.axis === 'tall' ? 'tall' : 'wide';
  let s = `${row.std[0]} px or ${row.std[1]} mm ${ax}`;
  if (row.strong) s += `; two-tone and gold deep ${row.strong[0]} px or ${row.strong[1]} mm`;
  else if (formKey !== 'glyph' || S.minsize === 'provisional') s += '; two-tone and gold deep larger (to be set)';
  return s + '.';
}
function bgList(cw) {
  const c = COLORWAYS[cw];
  const names = { paper: 'Paper', 'paper-2': 'Paper 2', white: 'White', tan: 'Tan', ink: 'Ink', photo: 'Dark areas of photos' };
  return c.approved.map(b => {
    const sw = b === 'photo' ? `background:url(${IMG}hurricane-ranch-exterior.jpg) 60% 85% / 400%` : `background:${COLORS[b]}`;
    const r = b === 'photo' ? 'check it' : fmt(weakest(cw, b));
    return `<li class="bgchip"><i class="sw" style="${sw}" aria-hidden="true"></i>${names[b]} <span class="muted">${r}</span></li>`;
  }).join('');
}

function usageSheet(formKey) {
  const f = FORMS.find(x => x.key === formKey);
  const [l, d] = mainPair(formKey);
  const file = f.file('navy-ink');
  const cs = formKey === 'glyph'
    ? 'Leave a quarter of its height clear on every side: at least 8 px on screen or 2 mm in print. Beside another logo, half its height.'
    : 'Leave the height of the glyph clear on every side. Nothing enters it: text, rules, photo or page edges, other logos.';
  return `<div class="usage-sheet">
    <div class="u-item"><h4>Use it for</h4><p>${esc(f.useFor)}</p></div>
    <div class="u-item"><h4>Backgrounds</h4>
      <p><b style="font-weight:500">${COLORWAYS[l].name}</b></p><ul>${bgList(l)}</ul>
      <p style="margin-top:6px"><b style="font-weight:500">${COLORWAYS[d].name}</b></p><ul>${bgList(d)}</ul>
      ${f.colorways.includes('two-tone') && l !== 'two-tone' ? '<p class="muted small" style="margin-top:6px">Two-tone and gold deep: Paper and white only.</p>' : ''}
    </div>
    <div class="u-item"><h4>Clear space</h4><div class="mini-diagram">${clearSpaceSVG(file, formKey, { compact: true })}</div><p>${cs}</p></div>
    <div class="u-item"><h4>Minimum size</h4><p>${minSizeLine(formKey)}</p>
      <p class="muted">If it won't fit, step down: lockup, then wordmark, then glyph or tile.</p></div>
    <p class="u-foot">Contrast: every color in the mark keeps 3:1 on what's behind it. <a class="text-link" href="#rules">All usage rules</a></p>
  </div>`;
}

// Usage control: inline disclosure (1a) or pop-up (1b)
let popId = 0;
function usageControl(formKey, title) {
  if (S.usage === 'inline') {
    return `<details class="disc"><summary><span class="tog" aria-hidden="true"></span><span class="lbl">Usage</span><span class="what">use it for, backgrounds, clear space, minimum size</span></summary>
      <div class="disc-body">${usageSheet(formKey)}</div></details>`;
  }
  const id = `usage-pop-${++popId}`;
  return `<button type="button" class="usage-btn" popovertarget="${id}" aria-label="Usage: ${esc(title)}"><i class="ph ph-info" aria-hidden="true"></i>Usage</button>
    <div popover id="${id}" class="usage-pop" role="dialog" aria-label="Usage: ${esc(title)}">
      <div class="pop-head"><span class="h4">Usage · ${esc(title)}</span><button type="button" class="icon-btn" popovertarget="${id}" popovertargetaction="hide" aria-label="Close"><i class="ph ph-x" aria-hidden="true"></i></button></div>
      ${usageSheet(formKey)}
    </div>`;
}

function moreColorways(f) {
  const main = mainPair(f.key);
  const featured = S.logos === 'A' ? ['two-tone', 'reversed'] : [];
  const rest = f.colorways.filter(c => !main.includes(c) && !featured.includes(c));
  const pointer = featured.some(c => f.colorways.includes(c)) && !featured.some(c => main.includes(c))
    ? '<p class="disc-foot small muted">Two-tone and reversed are under <a class="text-link" href="#two-color">Two-tone and reversed</a>, for special moments.</p>' : '';
  const names = rest.map(c => COLORWAYS[c].name.toLowerCase()).join(', ');
  return `<details class="disc"><summary><span class="tog" aria-hidden="true"></span><span class="lbl">${rest.length} more colorways</span><span class="what">${names}</span></summary>
    <div class="disc-body"><div class="cw-list">${rest.map(c => {
      const cw = COLORWAYS[c];
      return `<div class="cw-row"><div class="cw-thumb ${cw.side}">${markImg(f.file(c), altFor(f.file(c)))}</div>
        <div><b>${cw.name}</b><span class="small">for ${cw.side === 'light' ? 'light backgrounds' : 'dark backgrounds & photos'} · ${cw.bgNote}</span>${formats(f.file(c))}</div></div>`;
    }).join('')}</div>
    ${pointer}<p class="disc-foot">${zipLink(`All ${f.colorways.length} ${f.name.toLowerCase()} colorways · zip`, f.colorways.map(c => f.file(c)))}</p></div></details>`;
}

function pairedPlate(f, startHere) {
  const [l, d] = mainPair(f.key);
  return `<div class="plate-block" id="plate-${f.key}">
    <div class="plate-title">${startHere ? '<span class="eyebrow">Start here · our most used</span>' : ''}
      <h3>${f.name}</h3>${S.usage === 'popup' ? `<span style="margin-left:auto">${usageControl(f.key, f.name)}</span>` : ''}</div>
    <div class="pp form-${f.key}">
      <div class="half light" style="grid-area:l">${markImg(f.file(l), altFor(f.file(l)))}</div>
      <div class="half dark" style="grid-area:d">${markImg(f.file(d), altFor(f.file(d)))}</div>
      <div class="cap" style="grid-area:cl"><b>${cwCaption(l)}</b>${formats(f.file(l))}</div>
      <div class="cap" style="grid-area:cd"><b>${cwCaption(d)}</b>${formats(f.file(d))}</div>
    </div>
    <div class="plate-discs">${moreColorways(f)}${S.usage === 'inline' ? usageControl(f.key, f.name) : ''}</div>
  </div>`;
}

function tilesRow() {
  const card = t => `<div class="tile-card ${t.shape === 'email' ? 'email' : ''}">
      <div class="art ${t.shape === 'square' ? 'square' : ''} ${t.file.endsWith('on-paper') ? 'paper-edge' : ''}">${markImg(t.file, altFor(t.file))}</div>
      <div><b>${esc(t.name)}</b><span class="small">${esc(t.useFor)}</span></div>${formats(t.file)}</div>`;
  const tiles = TILES.filter(t => t.shape !== 'bar');
  const bars = TILES.filter(t => t.shape === 'bar');
  return `<div class="subhead"><h3>Tiles and wordmark bars</h3><span class="small muted">They carry their own background, so they work anywhere. ${zipLink('All 6 · zip', TILES.map(t => t.file))}</span></div>
    <div class="tiles-row">${tiles.map(card).join('')}<div class="bars">${bars.map(card).join('')}</div></div>`;
}

// Two-tone and reversed: our two-color marks, kept for special moments (Canyon, 2026-10-21).
// The "use them for" wording is a draft for the design system (ADR 0001).
function twoColorFeature() {
  const forms = FORMS.filter(f => f.colorways.includes('two-tone'));
  const fileRow = f => ['two-tone', 'reversed'].map(c => {
    const cw = COLORWAYS[c];
    return `<div class="cw-row"><div class="cw-thumb ${cw.side}">${markImg(f.file(c), altFor(f.file(c)))}</div>
      <div><b>${f.name} · ${cw.name}</b><span class="small">${c === 'two-tone' ? 'On Paper or white' : 'On Ink'}</span>${formats(f.file(c))}</div></div>`;
  }).join('');
  const files = forms.flatMap(f => [f.file('two-tone'), f.file('reversed')]);
  const min = MIN_SIZES[S.minsize].rows;
  const strong = k => { const r = min.find(x => x.form === k); return r && r.strong ? `${r.strong[0]} px · ${r.strong[1]} mm` : 'larger, not set yet'; };
  return `<div class="two-color" id="two-color">
    <div class="plate-title"><span class="eyebrow">For special moments</span><h3>Two-tone and reversed</h3></div>
    <p class="lead tc-lead">Our two-color marks: navy ink letters with a gold deep glyph, and their reversed pair on Ink. Save them for flat, type-led layouts with little or no imagery, where the gold glyph can carry the page.</p>
    <div class="tc-plate">
      <div class="tc-half light">${markImg('compass-lockup-stacked-two-tone', 'Compass stacked lockup, two-tone')}<span class="tc-cap">Two-tone · on Paper or white</span></div>
      <div class="tc-half dark on-dark">${markImg('compass-lockup-stacked-reversed', 'Compass stacked lockup, reversed')}<span class="tc-cap">Reversed · on Ink</span></div>
    </div>
    <div class="tc-scenes">
      <figure class="tc-scene"><div class="tc-cover" role="img" aria-label="A proposal cover on Paper with the two-tone stacked lockup">
          ${markImg('compass-lockup-stacked-two-tone', '', 'class="tc-cover-mark"')}<i class="tc-rule"></i>
          <span class="tc-title">Hurricane Ranch</span><span class="tc-meta">Design proposal · New Market · 2026</span></div>
        <figcaption class="figcap"><span class="do"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>A proposal cover</span><span class="muted">Flat Paper, one mark, generous space</span></figcaption></figure>
      <figure class="tc-scene"><div class="tc-slide on-dark" role="img" aria-label="A title slide on Ink with the reversed horizontal lockup">
          ${markImg('compass-lockup-horizontal-reversed', '', 'class="tc-slide-mark"')}
          <span class="tc-slide-line">Small on purpose.</span></div>
        <figcaption class="figcap"><span class="do"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>A title slide</span><span class="muted">Solid Ink, type only</span></figcaption></figure>
      <figure class="tc-scene"><div class="tc-square" role="img" aria-label="A typographic social post on white with the two-tone wordmark">
          ${markImg('compass-wordmark-two-tone', '', 'class="tc-square-mark"')}
          <span class="tc-square-line">Ready-to-build plans,<br>coming this winter.</span></div>
        <figcaption class="figcap"><span class="do"><i class="ph-fill ph-check-circle" aria-hidden="true"></i>A typographic post</span><span class="muted">No photo behind the mark</span></figcaption></figure>
    </div>
    <div class="tc-notes">
      <div><h4 class="tc-h">Use them for</h4><ul class="tc-list ok">
        <li>Covers, title pages and slides, stationery, signage panels and typographic social posts.</li>
        <li>One per piece, as its main mark. Running heads, footers and small repeats use navy ink or light gold.</li>
        <li>Two-tone on Paper or white. Reversed on solid Ink.</li>
        <li>Large: wordmark at least ${strong('wordmark')}, horizontal lockup ${strong('lockup-horizontal')}, stacked lockup ${strong('lockup-stacked')}. Smaller, use navy ink.</li>
        <li>In print, proof two-tone first: gold deep is only 3.18:1 on Paper.</li></ul></div>
      <div><h4 class="tc-h">Not for</h4><ul class="tc-list no">
        <li>Photos, textures or watercolors behind the mark. Use light gold or paper there.</li>
        <li>Paper 2 or Tan: the gold deep glyph drops to 2.91:1 and 2.74:1.</li>
        <li>Everyday documents and small sizes, where the navy ink wordmark does the job.</li></ul></div>
    </div>
    <div class="cw-list tc-files">${forms.map(fileRow).join('')}</div>
    <p class="disc-foot">${zipLink('All 6 two-tone and reversed files · zip', files)}</p>
  </div>`;
}

function logosA() {
  const [wm, hz, st, gl] = FORMS;
  return `${pairedPlate(wm, true)}${pairedPlate(hz)}
    <div class="plate-row2">${pairedPlate(st)}${pairedPlate(gl)}</div>
    ${twoColorFeature()}
    ${tilesRow()}`;
}

// ---------- Layout B ----------
let bTab = new URLSearchParams(location.search).get('bg') === 'dark' ? 'dark' : 'light';
function logosB() {
  const mu = (cw, side) => {
    const file = `compass-wordmark-${cw}`;
    return `<div class="mu ${side} ${side === 'dark' ? 'on-dark' : ''}"><div class="art">${markImg(file, altFor(file))}</div>
      <div class="meta"><div><b>${COLORWAYS[cw].name} wordmark</b><span class="small">${side === 'light' ? 'For light backgrounds' : 'For dark backgrounds & photos'}</span></div>${formats(file)}</div></div>`;
  };
  const panel = side => {
    const order = side === 'light' ? LIGHT_ORDER : DARK_ORDER;
    const lockMain = mainPair('lockup-horizontal')[side === 'light' ? 0 : 1];
    const files = FORMS.flatMap(f => order.filter(c => f.colorways.includes(c)).map(c => f.file(c)));
    const rows = FORMS.map(f => {
      const star = f.key.startsWith('lockup') ? lockMain : order[0];
      const cells = order.map(c => f.colorways.includes(c)
        ? `<div class="cardb ${f.key === 'glyph' ? 'glyphc' : ''}"><div class="art ${f.key === 'glyph' ? 'glyph' : ''}">${markImg(f.file(c), altFor(f.file(c)))}</div>
            <div class="cw"><span class="cw-name">${COLORWAYS[c].name}</span>${c === star ? '<span class="star" title="Most used">★ most used</span>' : ''}</div>${formats(f.file(c))}</div>`
        : '<div aria-hidden="true"></div>').join('');
      return `<div class="rowhead">${f.name}</div>${cells}`;
    }).join('');
    const usage = S.usage === 'inline'
      ? `<details class="disc"><summary><span class="tog" aria-hidden="true"></span><span class="lbl">Usage for marks on ${side} backgrounds</span><span class="what">use it for, backgrounds, clear space, minimum size</span></summary>
          <div class="disc-body">${usageSheet('wordmark')}</div></details>`
      : `<div style="margin-top:8px">${usageControl('wordmark', `marks on ${side} backgrounds`)}</div>`;
    return `<div class="tabpanel ${side} ${side === 'dark' ? 'on-dark' : ''}" role="tabpanel" id="panel-${side}" aria-labelledby="tab-${side}" ${bTab === side ? '' : 'hidden'} data-files="${files.join(',')}">
      <div class="grid-b"><div></div>${order.map(c => `<div class="colhead">${COLORWAYS[c].name}<span class="small">${COLORWAYS[c].bgNote}</span></div>`).join('')}${rows}</div>
      <div class="panel-foot">${usage}</div></div>`;
  };
  const count = side => FORMS.flatMap(f => (side === 'light' ? LIGHT_ORDER : DARK_ORDER).filter(c => f.colorways.includes(c))).length;
  return `<div class="subhead" style="margin-top:0"><h3>Most used</h3><span class="small muted">Not sure which mark? Start with these two.</span></div>
    <div class="most-used">${mu('navy-ink', 'light')}${mu('light-gold', 'dark')}</div>
    <div class="tabbar">
      <div style="display:flex;align-items:center;flex-wrap:wrap"><span class="tl-label" id="tl-label">Show marks for</span>
      <div role="tablist" aria-labelledby="tl-label">
        <button role="tab" id="tab-light" aria-controls="panel-light" aria-selected="${bTab === 'light'}" tabindex="${bTab === 'light' ? 0 : -1}">Light backgrounds<span class="cnt">3 colorways · ${count('light')} files</span></button>
        <button role="tab" id="tab-dark" aria-controls="panel-dark" aria-selected="${bTab === 'dark'}" tabindex="${bTab === 'dark' ? 0 : -1}">Dark backgrounds & photos<span class="cnt">3 colorways · ${count('dark')} files</span></button>
      </div></div>
      <span id="b-zip">${zipLink(`Download these ${count(bTab)} · zip`, [])}</span>
    </div>
    ${panel('light')}${panel('dark')}
    <div style="margin-top:8px">${tilesRow()}</div>`;
}

function wireTabs() {
  const tabs = $$('[role="tab"]');
  if (!tabs.length) return;
  const select = (tab, focus) => {
    bTab = tab.id === 'tab-dark' ? 'dark' : 'light';
    tabs.forEach(t => { const on = t === tab; t.setAttribute('aria-selected', on); t.tabIndex = on ? 0 : -1; });
    $$('[role="tabpanel"]').forEach(p => { p.hidden = p.id !== `panel-${bTab}`; if (!p.hidden) { p.classList.remove('fade-in'); void p.offsetWidth; p.classList.add('fade-in'); } });
    const p = $(`#panel-${bTab}`);
    const files = p.dataset.files.split(',');
    $('#b-zip').innerHTML = zipLink(`Download these ${files.length} · zip`, files);
    const u = new URL(location); u.searchParams.set('bg', bTab); history.replaceState(null, '', u);
    if (focus) tab.focus();
  };
  tabs.forEach((t, i) => {
    t.onclick = () => select(t);
    t.onkeydown = e => {
      const k = e.key;
      let j = null;
      if (k === 'ArrowRight') j = (i + 1) % tabs.length;
      if (k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      if (k === 'Home') j = 0;
      if (k === 'End') j = tabs.length - 1;
      if (j !== null) { e.preventDefault(); e.stopPropagation(); select(tabs[j], true); }
    };
  });
  select(tabs.find(t => t.getAttribute('aria-selected') === 'true'));
}

// Pop-ups: position next to their button (no CSS anchor positioning needed)
function wirePopovers() {
  $$('.usage-pop').forEach(pop => {
    pop.addEventListener('beforetoggle', e => {
      if (e.newState !== 'open') return;
      const btn = document.querySelector(`[popovertarget="${pop.id}"]:not(.icon-btn)`);
      if (!btn || innerWidth <= 640) return;
      const r = btn.getBoundingClientRect();
      const w = Math.min(560, innerWidth - 32);
      const left = Math.max(16, Math.min(r.right - w, innerWidth - w - 16));
      const below = r.bottom + 8;
      pop.style.left = `${left}px`;
      pop.style.top = `${below + 400 > innerHeight ? Math.max(16, r.top - 8 - Math.min(640, innerHeight * 0.8)) : below}px`;
    });
  });
}

RENDER.logos = () => {
  popId = 0;
  const aside = zipLink('Download all 28 marks · zip', ALL_MARK_FILES, 'btn btn-outline btn-sm');
  return `<section class="section" id="logos" aria-labelledby="logos-title">
    ${sectionHead('logos', 'Logo files', '28 marks · SVG · PNG · PDF', 'Start with the wordmark: navy ink on light backgrounds, light gold on dark ones. SVG for screens, PNG for documents, PDF for print.', aside)}
    ${protoTag('logos')} ${protoTag('pair')} ${protoTag('usage')}
    ${S.logos === 'A' ? logosA() : logosB()}
  </section>`;
};
AFTER.push(wireTabs, wirePopovers);
// A fixed pop-up would drift away from its button, so scrolling closes it (except the phone bottom sheet)
addEventListener('scroll', () => { if (innerWidth > 640) $$('.usage-pop').forEach(p => { if (p.matches(':popover-open')) p.hidePopover(); }); }, { passive: true });
