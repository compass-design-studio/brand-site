// PROTOTYPE: throwaway. Core state, helpers and page frame (top bar, hero, page close, footer).

const DEFAULTS = { ...Object.fromEntries(CHOICES.map(c => [c.key, c.options[0].v])), ...PICKS };
const S = { ...DEFAULTS };
const params = new URLSearchParams(location.search);
for (const c of CHOICES) {
  const v = params.get(c.key);
  if (v && c.options.some(o => o.v === v)) S[c.key] = v;
}

const SVG = {};               // file name -> SVG text, fetched once
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const logo = f => `${LOGO_DIR}${f}.svg`;
const IMG = 'images/';

// ---------- Contrast (WCAG 2.x) ----------
function lum(hex) {
  const n = hex.replace('#', '');
  return [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255)
    .map(c => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4))
    .reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
}
function ratio(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}
const fmt = r => `${(Math.floor(r * 100) / 100).toFixed(2)}:1`;
// Weakest color in a colorway against a background
function weakest(colorway, bgKey) {
  const cw = COLORWAYS[colorway];
  const bg = COLORS[bgKey];
  return Math.min(...cw.colors.map(c => ratio(COLORS[c], bg)));
}

// ---------- Small builders ----------
function markImg(file, alt, attrs = '') {
  return `<img src="${logo(file)}" alt="${esc(alt)}" ${attrs}>`;
}
function altFor(file) {
  // "compass-lockup-horizontal-light-gold" -> "Compass horizontal lockup, light gold"
  const f = file.replace('compass-', '');
  const formsByPrefix = [
    ['wordmark-bar-', 'wordmark bar'], ['tile-email-', 'email tile'], ['tile-', 'tile'],
    ['lockup-horizontal-', 'horizontal lockup'], ['lockup-stacked-', 'stacked lockup'],
    ['wordmark-', 'wordmark'], ['glyph-', 'glyph'],
  ];
  for (const [p, name] of formsByPrefix) {
    if (f.startsWith(p)) return `Compass ${name}, ${f.slice(p.length).replace(/-/g, ' ')}`;
  }
  return 'Compass mark';
}
function formats(file, shortName) {
  const n = shortName || altFor(file).replace('Compass ', '');
  return `<div class="formats">
    <a href="${logo(file)}" download="${file}.svg" aria-label="SVG, ${esc(n)}">SVG</a><span class="sep" aria-hidden="true">·</span>
    <a href="#" data-stub="png" data-file="${file}" aria-label="PNG, ${esc(n)}">PNG</a><span class="sep" aria-hidden="true">·</span>
    <a href="#" data-stub="pdf" data-file="${file}" aria-label="PDF, ${esc(n)}">PDF</a>
  </div>`;
}
function zipLink(label, files, cls = 'arrow-link small') {
  return `<a href="#" class="${cls}" data-zip="${esc(files.join(','))}" data-zip-label="${esc(label)}">${esc(label)}</a>`;
}
function sectionHead(id, title, meta, lead, aside = '') {
  return `<div class="section-head">
    <span class="num" data-num="${id}"></span>
    <div class="titles">
      ${meta ? `<span class="eyebrow">${meta}</span>` : ''}
      <h2 id="${id}-title">${title}</h2>
      ${lead ? `<p class="lead">${lead}</p>` : ''}
    </div>
    <div class="aside">${aside}</div>
  </div>`;
}
function protoTag(key) {
  const c = CHOICES.find(x => x.key === key);
  const o = c.options.find(x => x.v === S[key]);
  return `<button type="button" class="proto-tag" data-proto-open="${key}" title="Prototype choice: click to switch">
    ⇄ Choice ${esc(c.item)} · ${esc(c.title)}: <b>${esc(o.label)}</b></button>`;
}
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('on');
  clearTimeout(toast._t);
  toast._t = setTimeout(() => t.classList.remove('on'), 3200);
}
async function copyText(text, msg) {
  try { await navigator.clipboard.writeText(text); toast(msg || 'Copied'); }
  catch { toast('Copy failed: your browser blocked the clipboard'); }
}

// ---------- Section order (choice 4) ----------
const SECTION_NAMES = {
  logos: 'Logo files', rules: 'Using the marks', color: 'Color', type: 'Typography & fonts',
  voice: 'Voice & copy', icons: 'Iconography', spacing: 'Spacing, radius & shadows',
  imagery: 'Imagery', insitu: 'In situ',
};
function sectionOrder() {
  const base = ['logos', 'rules', 'color', 'type', 'voice', 'icons', 'spacing', 'imagery', 'insitu'];
  if (S.s06 === 'last') return [...base.filter(s => s !== 'spacing'), 'spacing'];
  return base;
}
function numbered() {
  // The folded drawer has no number
  return sectionOrder().filter(s => !(s === 'spacing' && S.s06 === 'drawer'));
}
function applyNumbers() {
  const list = numbered();
  $$('[data-num]').forEach(el => {
    const i = list.indexOf(el.dataset.num);
    el.textContent = i >= 0 ? String(i + 1).padStart(2, '0') : '';
  });
}

// ---------- Top bar and mobile menu (choice 2, choice 14 top-bar entry) ----------
function requestTrigger(where) {
  const label = where === 'top' ? 'Request a file' : 'Tell us what\'s missing';
  if (where === 'top') return `<button type="button" class="btn btn-outline btn-sm" data-open-req>${label}</button>`;
  if (S.trigger === 'arrow') return `<a href="#" class="arrow-link trigger-arrow" data-open-req role="button">${label} →</a>`;
  if (S.trigger === 'outline') return `<button type="button" class="btn btn-outline" data-open-req>${label}<i class="ph ph-arrow-right" aria-hidden="true"></i></button>`;
  return `<button type="button" class="btn btn-ink" data-open-req>${label}<i class="ph ph-arrow-right" aria-hidden="true"></i></button>`;
}
function renderTopbar() {
  const links = S.nav === 'bar'
    ? numbered().map(id => `<a class="navlink" href="#${id}">${SECTION_NAMES[id].replace('Typography & fonts', 'Type').replace('Spacing, radius & shadows', 'Spacing').replace('Voice & copy', 'Voice').replace('Using the marks', 'Usage')}</a>`).join('')
    : `<a class="navlink" href="#logos">Logo files</a>`;
  $('#topbar').innerHTML = `<div class="wrap">
    <a class="brand" href="#top" aria-label="Compass, Brand resources, back to top">${markImg('compass-wordmark-navy-ink', 'Compass', 'class="wm-light"')}${markImg('compass-wordmark-paper', 'Compass', 'class="wm-dark"')}<span>Brand resources</span></a>
    <nav aria-label="Sections">${links}${S.topbar === 'on' ? requestTrigger('top') : ''}</nav>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-sheet" aria-label="Menu"><span></span><span></span></button>
  </div>`;
  const sheet = $('#mobile-sheet');
  sheet.innerHTML = `<ol>${numbered().map((id, i) => `<li style="animation-delay:${i * 40}ms"><a class="sheet-link" href="#${id}"><span class="n">${String(i + 1).padStart(2, '0')}</span>${SECTION_NAMES[id]}</a></li>`).join('')}</ol>
    <div class="sheet-foot">
      <button type="button" class="btn btn-gold" data-open-req>Request a file</button>
      <p class="meta">Compass Design Studio · Northern Alabama</p>
    </div>`;
  const btn = $('.menu-btn');
  const close = () => { sheet.hidden = true; btn.setAttribute('aria-expanded', 'false'); document.body.classList.remove('sheet-open'); };
  btn.onclick = () => {
    const open = sheet.hidden;
    sheet.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    document.body.classList.toggle('sheet-open', open);
  };
  sheet.onclick = e => { if (e.target.closest('a, [data-open-req]')) close(); };
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !sheet.hidden) { close(); btn.focus(); } });
}

// ---------- Hero (choice 9) ----------
function renderHero() {
  let dl;
  if (S.dl === 'all') {
    dl = `<div><a href="#" class="btn btn-gold" data-zip="${ALL_MARK_FILES.join(',')}" data-zip-label="All 28 marks"><i class="ph ph-download-simple" aria-hidden="true"></i>Download all marks</a>
      <span class="hint">28 marks · SVG, PNG and PDF · one zip</span></div>`;
  } else if (S.dl === 'form') {
    const groups = [
      ['All 28 marks', ALL_MARK_FILES],
      ...FORMS.map(f => [`${f.name}s`, f.colorways.map(c => f.file(c))]),
      ['Tiles and wordmark bars', TILES.map(t => t.file)],
    ];
    dl = `<details class="dl-menu"><summary class="btn btn-gold"><i class="ph ph-download-simple" aria-hidden="true"></i>Download logos<i class="ph ph-caret-down" aria-hidden="true"></i></summary>
      <div class="menu">${groups.map(([l, files]) => `<a href="#" data-zip="${files.join(',')}" data-zip-label="${esc(l)}">${esc(l)}<span>${files.length} · zip</span></a>`).join('')}</div></details>`;
  } else {
    dl = `<a href="#logos" class="btn btn-gold"><i class="ph ph-arrow-down" aria-hidden="true"></i>See logo files</a>`;
  }
  $('#hero').innerHTML = `<div class="hero" id="top">
    <div class="hero-plate on-dark">
      <img class="hero-mark" src="${logo('compass-wordmark-paper')}" alt="Compass">
      <span class="kicker">Brand resources</span>
      <h1>Everything you need to put the studio's name on something.</h1>
      <p class="hero-lead">Logos, colors, type and the rules for using them, for the studio's staff, contractors and trade partners.</p>
      <div class="hero-actions">${dl}
        <button type="button" class="btn btn-ghost-dark" data-copy-css><i class="ph ph-copy" aria-hidden="true"></i>Copy palette as CSS</button>
      </div>
    </div>
  </div>
  ${S.nav === 'pills' ? `<nav class="wrap pills" aria-label="On this page"><span class="eyebrow">On this page</span>${numbered().map((id, i) => `<a href="#${id}"><span class="num">${String(i + 1).padStart(2, '0')}</span>${SECTION_NAMES[id]}</a>`).join('')}</nav>` : ''}`;
  const dm = $('.dl-menu');
  if (dm) document.addEventListener('click', e => { if (!dm.contains(e.target)) dm.open = false; });
}

// ---------- Page close and footer ----------
function renderClose() {
  $('#close').innerHTML = `<section class="page-close" aria-labelledby="close-title"><div class="wrap"><div class="inner">
    ${protoTag('trigger')}
    <span class="eyebrow">Requests</span>
    <h2 id="close-title">Need a file that isn't here?</h2>
    <p>A missing format, a correction, or a question about using a mark. It goes to Allison and Canyon.</p>
    ${requestTrigger('close')}
  </div></div></section>`;
  $('#footer').innerHTML = `<div class="wrap">
    ${markImg('compass-wordmark-paper', 'Compass')}
    <div class="meta"><span>© MMXXVI Compass Design Studio · Northern Alabama · Residential Design · Interiors</span>
    <span><a href="https://compass-design.studio">compass-design.studio</a></span></div>
  </div>`;
}

// ---------- Global delegated actions ----------
document.addEventListener('click', e => {
  const stub = e.target.closest('[data-stub]');
  if (stub) {
    e.preventDefault();
    toast(`${stub.dataset.stub.toUpperCase()} of ${stub.dataset.file} gets exported from Figma before launch (prototype: SVG only)`);
    return;
  }
  const zip = e.target.closest('[data-zip]');
  if (zip) {
    e.preventDefault();
    const n = zip.dataset.zip.split(',').length;
    toast(`Prototype: would download "${zip.dataset.zipLabel}" · ${n} marks × SVG, PNG, PDF in one zip`);
    const dm = zip.closest('details'); if (dm && dm.classList.contains('dl-menu')) dm.open = false;
    return;
  }
  if (e.target.closest('[data-copy-css]')) {
    const css = ':root {\n' + SWATCHES.map(s => `  --${s.key}: ${s.hex};`).join('\n') + '\n}';
    copyText(css, 'Palette copied as CSS custom properties');
    return;
  }
  const hex = e.target.closest('[data-copy-hex]');
  if (hex) { copyText(hex.dataset.copyHex, `${hex.dataset.name} ${hex.dataset.copyHex} copied`); return; }
});

// ---------- Render all ----------
function renderAll() {
  document.body.dataset.labels = S.labels;
  document.body.dataset.nav = S.nav;
  renderTopbar();
  renderHero();
  const order = sectionOrder();
  $('#sections').innerHTML = order.map(id => RENDER[id]()).join('');
  renderClose();
  applyNumbers();
  AFTER.forEach(fn => fn());
}
const RENDER = {};   // filled by logos.js, rules.js, sections.js
const AFTER = [];    // post-render hooks (wire up widgets)

async function boot() {
  await Promise.all(ALL_MARK_FILES.map(async f => {
    try { SVG[f] = await (await fetch(logo(f))).text(); } catch { SVG[f] = ''; }
  }));
  renderAll();
  if (location.hash) { const t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
  if (window.initSwitcher) initSwitcher();
}
document.addEventListener('DOMContentLoaded', boot);
