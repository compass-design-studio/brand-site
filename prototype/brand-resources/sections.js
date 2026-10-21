// PROTOTYPE: throwaway. Color, Typography, Voice, Iconography, Spacing, Imagery and In situ.

function drawer(title, meta, body, open = false) {
  return `<details class="drawer" ${open ? 'open' : ''}><summary><span><span class="h4">${title}</span>${meta ? ` <span class="small muted">· ${meta}</span>` : ''}</span><span class="tog" aria-hidden="true"></span></summary><div class="drawer-body">${body}</div></details>`;
}

// ---------- Color (items 11, 12, 13) ----------
RENDER.color = () => {
  const light = ['paper', 'paper-2', 'tan'];
  const sw = s => `<div class="swatch">
    <button type="button" class="chip ${light.includes(s.key) ? 'light-chip' : ''}" style="background:${s.hex}" data-copy-hex="${s.hex}" data-name="${s.name}" aria-label="Copy ${s.name} hex ${s.hex}"><span class="copied" aria-hidden="true">Copy hex</span></button>
    <div class="info"><b>${s.name}</b><span class="role">${s.role}</span>
      <span class="vals">${s.hex}<br>RGB ${s.rgb}${S.cmyk === 'approx' ? `<br><abbr title="approximate">CMYK ≈</abbr> ${s.cmyk.replace(/^C/, 'C')}` : ''}</span></div></div>`;
  const pair = (fg, bg, t, m) => `<div class="pg" style="background:${COLORS[bg]};color:${COLORS[fg]};${['paper', 'white'].includes(bg) ? 'box-shadow:inset 0 0 0 1px var(--rule-strong)' : ''}"><span class="t">${t}</span><span class="m">${m} · ${fmt(ratio(COLORS[fg], COLORS[bg]))}</span></div>`;
  return `<section class="section" id="color" aria-labelledby="color-title">
    ${sectionHead('color', 'Color', `10 colors · HEX · RGB${S.cmyk === 'approx' ? ' · CMYK' : ''}`, 'Navy and Ink carry weight. Paper and Tan carry surfaces. Gold is a fine pen line, never a fill. Select a swatch to copy its hex.', `<button type="button" class="btn btn-outline btn-sm" data-copy-css><i class="ph ph-copy" aria-hidden="true"></i>Copy CSS</button>`)}
    ${protoTag('cmyk')} ${protoTag('labels')}
    <div class="swatches">${SWATCHES.map(sw).join('')}</div>
    ${S.cmyk === 'approx' ? '<p class="approx-note">CMYK values are approximate until we\'ve proofed them with a printer. For print jobs, ask us.</p>' : '<p class="approx-note">Print values are coming once we\'ve proofed them with a printer. For print jobs, ask us.</p>'}
    <div style="margin-top:32px">
      ${drawer('Pairings', 'text and background', `<div class="pairings">
        ${pair('ink', 'paper', 'Ink on Paper', 'Body text')}${pair('navy-deep', 'paper', 'Navy deep on Paper', 'Headings, links')}
        ${pair('paper', 'ink', 'Paper on Ink', 'Hero, footer')}${pair('light-gold', 'ink', 'Light gold on Ink', 'Accents on dark')}
        ${pair('navy-deep', 'tan', 'Navy deep on Tan', 'Cards')}${pair('ink', 'light-gold', 'Ink on light gold', 'Gold button')}
        ${pair('paper', 'navy', 'Paper on Navy', 'Navy badge')}${pair('ink', 'white', 'Ink on white', 'Forms, cards')}</div>`)}
      ${drawer('Status colors', 'for status only, always with a word or icon', `<div class="swatches" style="grid-template-columns:repeat(4,minmax(0,1fr))">${STATUS.map(s => `<div class="swatch"><div class="chip" style="background:${s.hex};height:64px;cursor:default"></div><div class="info"><b>${s.name}</b><span class="vals">${s.hex}${S.cmyk === 'approx' && s.cmyk !== 'Navy' ? `<br>CMYK ≈ ${s.cmyk}` : ''}</span></div></div>`).join('')}</div>`)}
    </div>
  </section>`;
};

// ---------- Typography ----------
RENDER.type = () => `<section class="section" id="type" aria-labelledby="type-title">
  ${sectionHead('type', 'Typography & fonts', 'Tenor Sans · DM Sans · JetBrains Mono', 'Tenor Sans for display, lightly tracked. DM Sans for everything else. All three are free from Google Fonts.')}
  <div class="type-spec">
    <div><p class="meta">Tenor Sans 400 · 64 / 1.05 / 0.02em</p><p style="font-family:var(--font-display);font-size:clamp(34px,4.4vw,56px);line-height:1.08;letter-spacing:.02em;color:var(--navy-deep)">Designing your home should be the best part of having one.</p></div>
    <div><p class="meta">DM Sans 300 · lead · 21 / 1.65</p><p style="font-size:21px;font-weight:300;line-height:1.65">A place to listen first. We keep our project list short, so every home receives the founders' hands from first sketch to final walk-through.</p>
      <p class="meta" style="margin-top:20px">DM Sans 400 · body · 15 / 1.65</p><p>We work in warm, quiet materials (cedar, stone, lime plaster, brass that ages) and we build to last for generations, not seasons.</p></div>
  </div>
  <div class="fonts-row">
    <div class="font-card"><span class="sample" style="font-family:var(--font-display)">Aa</span><b style="font-weight:500">Tenor Sans</b><span class="small muted">Display and headings</span><a class="arrow-link small" href="https://fonts.google.com/specimen/Tenor+Sans">Get Tenor Sans →</a></div>
    <div class="font-card"><span class="sample" style="font-family:var(--font-body);font-weight:300">Aa</span><b style="font-weight:500">DM Sans</b><span class="small muted">300 · 400 · 500 · 600</span><a class="arrow-link small" href="https://fonts.google.com/specimen/DM+Sans">Get DM Sans →</a></div>
    <div class="font-card"><span class="sample" style="font-family:var(--font-mono)">Aa</span><b style="font-weight:500">JetBrains Mono</b><span class="small muted">Specs, hex values, numbers</span><a class="arrow-link small" href="https://fonts.google.com/specimen/JetBrains+Mono">Get JetBrains Mono →</a></div>
  </div>
  <div style="margin-top:32px">${drawer('Type scale', 'sizes and uses', `<table class="minsize-table"><tbody>
    ${[['Display', '64', 'Small on purpose.', 'display'], ['Heading 2', '36', 'Who you\'ll work with.', 'display'], ['Heading 3', '28', 'Hurricane Ranch', 'display'], ['Heading 4', '17', 'Ready-to-build plans', 'display'], ['Lead', '21', 'Kept small on purpose.', 'lead'], ['Body', '15', 'We respond to every serious inquiry within the week.', 'body'], ['Small', '13', 'No newsletter, no spam — just a reply from the studio.', 'small'], ['Eyebrow', '11', 'The studio · Est MMXXV', 'eyebrow']].map(([n, px, t, k]) => `<tr><td style="width:120px"><b style="font-weight:500">${n}</b><br><span class="mono">${px} px</span></td><td><span style="${k === 'display' ? `font-family:var(--font-display);color:var(--navy-deep);letter-spacing:.02em;font-size:${Math.min(+px, 40)}px;line-height:1.1` : k === 'lead' ? 'font-size:21px;font-weight:300' : k === 'small' ? 'font-size:13px' : k === 'eyebrow' ? '' : 'font-size:15px'}" ${k === 'eyebrow' ? 'class="eyebrow"' : ''}>${t}</span></td></tr>`).join('')}</tbody></table>`)}</div>
</section>`;

// ---------- Voice ----------
RENDER.voice = () => `<section class="section" id="voice" aria-labelledby="voice-title">
  ${sectionHead('voice', 'Voice & copy', 'Examples · casing · punctuation', 'Warm, plainspoken, personal. We, never I. Domestic words: home, porch, walk-through. Short sentences that may smile.')}
  <div class="voice-row">
    <div class="voice-card"><span class="eyebrow">Say</span><q>Have a site in mind?</q></div>
    <div class="voice-card not"><span class="eyebrow">Not</span><q>Transform your residential program!</q></div>
    <div class="voice-card"><span class="eyebrow">Promise</span><q>We respond to every serious inquiry within the week.</q></div>
  </div>
  <div style="margin-top:32px">${drawer('Casing & punctuation', 'sentence case, the middle dot, no exclamation points', `<dl class="casing">
    <dt>Sentence case</dt><dd>Small on purpose.</dd>
    <dt>Title Case, for names only</dt><dd>Hurricane Ranch · Allison Browning</dd>
    <dt>Roman numerals, capstones</dt><dd>Est MMXXV · © MMXXVI</dd>
    <dt>The separator</dt><dd>New Market · 2026</dd>
    <dt>Ranges take an en dash</dt><dd>$30,000 – $100,000 · 3–6 months</dd>
    <dt>Never</dt><dd>Exclamation points, emoji, "I", all caps in type</dd></dl>`)}</div>
</section>`;

// ---------- Iconography ----------
RENDER.icons = () => {
  const icons = ['house', 'ruler', 'pencil-simple', 'blueprint', 'map-pin', 'envelope-simple', 'phone', 'tree', 'arrow-right', 'instagram-logo', 'calendar-blank'];
  return `<section class="section" id="icons" aria-labelledby="icons-title">
    ${sectionHead('icons', 'Iconography', 'Phosphor · regular weight', '20 or 24 px, 1.5 px stroke. Navy on light, light gold on dark. Filled only for status.', `<a class="arrow-link small" href="https://phosphoricons.com">Browse the set →</a>`)}
    <div class="icons-grid">${icons.map(i => `<div class="icon-cell"><i class="ph ph-${i}" aria-hidden="true"></i>${i.replace(/-simple|-logo|-blank/, '').replace('-', ' ')}</div>`).join('')}
      <div class="icon-cell" style="border-color:var(--gold)"><img src="${logo('compass-glyph-navy-ink')}" alt="">The glyph, never a stock compass</div></div>
  </section>`;
};

// ---------- Spacing, radius & shadows (item 4) ----------
function spacingBody() {
  return `${drawer('Spacing scale', '4 → 112 px, on a 4-pt grid', `<div class="space-scale">${[4, 8, 12, 16, 24, 32, 48, 64, 80, 112].map((v, i) => `<div class="s"><span class="mono">${v}</span><i style="width:${v * 2.5}px;max-width:100%"></i><span class="mono muted">--space-${i + 1}</span></div>`).join('')}</div>`)}
    ${drawer('Corner radii', 'square by default', `<div class="radii">
      <div class="r"><div style="border-radius:0"></div><span>0 · sheets, cards</span></div>
      <div class="r"><div style="border-radius:8px 8px 8px 8px"></div><span>8–16 · buttons, inputs</span></div>
      <div class="r"><div style="border-radius:60px 60px 16px 16px;background:var(--ink);background-image:var(--texture)"></div><span>Drafting plate · 60 60 16 16 (32 on phones)</span></div>
      <div class="r"><div style="border-radius:999px;height:44px;margin-top:23px"></div><span>999 · pills only</span></div></div>`)}
    ${drawer('Shadows & rules', 'low, soft, never colored', `<div class="shadows">${[1, 2, 3, 4].map(n => `<div class="s" style="box-shadow:var(--shadow-${n})">--shadow-${n}</div>`).join('')}</div>`)}`;
}
RENDER.spacing = () => {
  if (S.s06 === 'drawer') {
    return `<section class="section" id="spacing" aria-label="Spacing, radius and shadows" style="padding-top:48px">
      ${protoTag('s06')}
      <details class="drawer" style="border-top:1px solid var(--gold)"><summary><span><span class="h4">Spacing, radius & shadows</span> <span class="small muted">· for web contractors</span></span><span class="tog" aria-hidden="true"></span></summary>
      <div class="drawer-body"><p class="small muted" style="margin-bottom:12px">Sections breathe 80–112 px; page gutters are 56–64 px. Hairlines over boxes.</p>${spacingBody()}</div></details>
    </section>`;
  }
  return `<section class="section" id="spacing" aria-labelledby="spacing-title">
    ${sectionHead('spacing', 'Spacing, radius & shadows', '4-pt grid · for web contractors', 'Sections breathe 80–112 px; page gutters are 56–64 px. Hairlines over boxes. Shadows low and never colored.')}
    ${protoTag('s06')}
    ${spacingBody()}
  </section>`;
};

// ---------- Imagery (item 20) ----------
RENDER.imagery = () => `<section class="section" id="imagery" aria-labelledby="imagery-title">
  ${sectionHead('imagery', 'Imagery', 'Photography · watercolor', 'A project moves from watercolor to photography once it\'s built. The two never mix within one project. Examples only; ask us for files.')}
  <div class="imagery">
    <div class="img-frame">
      <div class="ph wide" style="background-image:url(${IMG}hurricane-ranch-exterior.jpg)" role="img" aria-label="Hurricane Ranch, exterior at dusk"><span class="capsule">Hurricane Ranch · New Market · 2026</span></div>
      <div class="thumbs">
        <div class="ph" style="background-image:url(${IMG}hickerson-home-exterior.jpg)" role="img" aria-label="Hickerson Home, exterior"><span class="capsule">Hickerson Home · Cullman</span></div>
        <div class="ph" style="background-image:url(${IMG}widner-residence-exterior.jpg)" role="img" aria-label="Widner Residence, exterior at sunset"><span class="capsule">Widner Residence · New Market</span></div>
      </div>
      <div><span class="h4">Photography</span><p class="small muted">For finished and in-progress work. Warm, slightly desaturated, available light.</p></div>
      <div class="tags"><span>Warm</span><span>Available light</span><span>Slightly desaturated</span><span class="x">HDR</span></div>
    </div>
    <div class="img-frame">
      <div class="ph wide" style="background-image:url(${IMG}harbor-line-exterior-watercolor.jpg)" role="img" aria-label="Harbor Line, watercolor"><span class="capsule">Harbor Line · Coming soon</span></div>
      <div class="thumbs">
        <div class="ph" style="background-image:url(${IMG}stone-meadow-exterior-watercolor.jpg)" role="img" aria-label="Stone Meadow, watercolor"><span class="capsule">Stone Meadow</span></div>
        <div class="ph" style="background-image:url(${IMG}studio-drafting-table-watercolor.jpg)" role="img" aria-label="The studio's drafting table, watercolor"><span class="capsule">The studio</span></div>
      </div>
      <div><span class="h4">Watercolor</span><p class="small muted">For ready-to-build plans and the studio itself. Loose washes on paper, navy and tan with a little gold.</p></div>
      <div class="tags"><span>Loose wash</span><span>Paper ground</span><span>Hand-drawn line</span><span class="x">Clip art</span></div>
    </div>
  </div>
  <div style="margin-top:32px">${drawer('Text over images', 'a capsule or a solid panel, never a gradient', `<div class="pair three">
    <figure style="margin:0"><div class="ph" style="aspect-ratio:4/3;position:relative;background:url(${IMG}hurricane-ranch-exterior.jpg) center/cover;border-radius:4px"><span class="capsule">Hurricane Ranch · New Market · 2026</span></div>${verdict(true, 'Capsule', 'Ink at 85% with a blur')}</figure>
    <figure style="margin:0"><div style="aspect-ratio:4/3;position:relative;background:url(${IMG}home-gallery-2-watercolor.jpg) center/cover;border-radius:4px;display:flex;align-items:flex-end;padding:16px"><span style="background:var(--ink);color:var(--paper);padding:14px 18px;font-family:var(--font-display);font-size:18px">A few places we've shaped.</span></div>${verdict(true, 'Solid Ink panel')}</figure>
    <figure style="margin:0"><div style="aspect-ratio:4/3;position:relative;background:linear-gradient(transparent 30%, rgba(0,0,0,.75)), url(${IMG}home-gallery-2-watercolor.jpg) center/cover;border-radius:4px;display:flex;align-items:flex-end;padding:16px;box-shadow:inset 0 0 0 2px #9A3B2D"><span style="color:#fff;font-family:var(--font-display);font-size:18px">A few places we've shaped.</span></div>${verdict(false, 'Gradient scrim')}</figure>
  </div>`)}</div>
</section>`;

// ---------- In situ (items 16, 17, 18) ----------
const PEOPLE = [
  { name: 'Allison Browning', title: 'Founder · Principal Designer', email: 'allison@compass-design.studio' },
  { name: 'Canyon Browning', title: 'Co-Founder · Managing Partner', email: 'canyon@compass-design.studio' },
];
const PHONE = '256-384-3539';
// Email clients don't show SVG, so the copied signature points at PNGs on Brand resources (to be exported).
const SIG_HOST = 'https://brand.compass-design.studio/logos/';
function sigHTML(p, forCopy) {
  const tile = forCopy ? `${SIG_HOST}compass-tile-email-light-gold-on-ink.png` : logo('compass-tile-email-light-gold-on-ink');
  const wm = forCopy ? `${SIG_HOST}compass-wordmark-navy-ink.png` : logo('compass-wordmark-navy-ink');
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#1A2A36"><tr>
    <td style="padding-right:16px;vertical-align:top"><img src="${tile}" width="88" height="45" alt="Compass Design Studio" style="display:block;border:0"></td>
    <td style="vertical-align:top;font-size:13px;line-height:1.45">
      <div style="font-family:'Tenor Sans',Optima,Georgia,serif;font-size:18px;letter-spacing:.04em;color:#1A2A36">${esc(p.name)}</div>
      <div style="font-size:12px;letter-spacing:.04em;color:#1F4A66">${esc(p.title)}</div>
      <div style="padding:8px 0 4px"><img src="${wm}" width="130" alt="Compass" style="display:block;border:0;width:130px;height:auto"></div>
      <div><a href="mailto:${esc(p.email)}" style="color:#1F4A66">${esc(p.email)}</a> · ${esc(p.phone || PHONE)}</div>
      <div style="color:#5D6873;font-size:12px">Residential Design · Interiors · <a href="https://compass-design.studio" style="color:#1F4A66">compass-design.studio</a></div>
    </td></tr></table>`;
}
async function copySig(p) {
  const html = sigHTML(p, true);
  const text = `${p.name}\n${p.title}\nCompass Design Studio\n${p.email} · ${p.phone || PHONE}\ncompass-design.studio`;
  try {
    await navigator.clipboard.write([new ClipboardItem({ 'text/html': new Blob([html], { type: 'text/html' }), 'text/plain': new Blob([text], { type: 'text/plain' }) })]);
    toast(`Signature copied. Paste it into Gmail or Outlook's signature settings.`);
  } catch { copyText(text, 'Copied as plain text (your browser blocked rich text)'); }
}
function sigBlock() {
  if (S.sig === 'people') {
    return `<div class="sig-cards">${PEOPLE.map((p, i) => `<div class="sig-card"><div class="sig-preview-wrap">${sigHTML(p)}</div>
      <div class="sig-actions"><button type="button" class="btn btn-outline btn-sm" data-copy-sig="${i}"><i class="ph ph-copy" aria-hidden="true"></i>Copy ${esc(p.name.split(' ')[0])}'s signature</button></div></div>`).join('')}</div>`;
  }
  return `<div class="sig-card">
    <div class="sig-fields">
      <div class="field"><label for="sig-name">Name</label><input type="text" id="sig-name" value="Allison Browning" autocomplete="name"></div>
      <div class="field"><label for="sig-title">Title</label><input type="text" id="sig-title" value="Founder · Principal Designer"></div>
      <div class="field"><label for="sig-email">Email</label><input type="email" id="sig-email" value="allison@compass-design.studio" autocomplete="email"></div>
      <div class="field"><label for="sig-phone">Phone</label><input type="text" id="sig-phone" value="${PHONE}" autocomplete="tel"></div>
    </div>
    <div class="sig-preview-wrap" id="sig-live" aria-live="polite">${sigHTML(PEOPLE[0])}</div>
    <div class="sig-actions"><button type="button" class="btn btn-outline btn-sm" data-copy-sig="fields"><i class="ph ph-copy" aria-hidden="true"></i>Copy signature</button><span class="small muted">Copies as rich text for Gmail and Outlook.</span></div>
  </div>`;
}
function readSigFields() {
  return { name: $('#sig-name').value, title: $('#sig-title').value, email: $('#sig-email').value, phone: $('#sig-phone').value };
}
function wireSig() {
  $$('[data-copy-sig]').forEach(b => {
    b.onclick = () => copySig(b.dataset.copySig === 'fields' ? readSigFields() : PEOPLE[+b.dataset.copySig]);
  });
  const live = $('#sig-live');
  if (live) $$('.sig-fields input').forEach(i => { i.oninput = () => { live.innerHTML = sigHTML(readSigFields()); }; });
}

function siteMock() {
  if (S.site === 'screenshot') {
    return `<div style="display:grid;grid-template-columns:1fr 150px;gap:16px;align-items:end">
      <div class="browser"><div class="chrome"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="url">compass-design.studio</span></div><div class="site-shot"><img src="${IMG}live-site-home-screenshot.jpg" alt="Screenshot of the live home page: a watercolor of a house with the light gold wordmark centered"></div></div>
      <div class="browser" style="border-radius:18px"><div class="site-shot"><img src="${IMG}live-site-home-screenshot-phone.jpg" alt="Screenshot of the live home page on a phone"></div></div>
    </div><p class="mock-note">Screenshots of compass-design.studio, taken 21 October 2026. They go stale when the site changes.</p>`;
  }
  const g = [1, 2, 3].map((n, i) => `<div class="gal ${i === 0 ? 'on' : ''}" style="background-image:url(${IMG}home-gallery-${n}-watercolor.jpg);filter:saturate(.9) brightness(.97)"></div>`).join('');
  return `<div class="browser"><div class="chrome"><i class="dot"></i><i class="dot"></i><i class="dot"></i><span class="url">compass-design.studio</span></div>
    <div class="site-mock" id="site-mock" role="img" aria-label="The live home page, rebuilt: a three-plate watercolor gallery with the light gold wordmark centered">${g}<div class="scrim" style="background:rgba(26,42,54,.34)"></div>
      <div class="mock-top"><img src="${logo('compass-wordmark-navy-ink')}" alt=""><span class="links"><span>Work</span><span>Studio</span><span>Process</span><span>Contact</span></span><span class="cta">Begin a project</span></div>
      <img class="center-mark" src="${logo('compass-wordmark-light-gold')}" alt="" style="filter:drop-shadow(0 2px 12px rgba(0,0,0,.25))">
    </div></div>
    <p class="mock-note">Rebuilt to match the live home page: the same three watercolors (Hollis House, Lantern House, Keel Cabin), the light gold wordmark, no descriptor.</p>`;
}
function wireSiteMock() {
  const m = $('#site-mock');
  if (!m || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  clearInterval(wireSiteMock._t);
  let i = 0;
  wireSiteMock._t = setInterval(() => {
    const gs = $$('.gal', m); if (!gs.length) return;
    gs[i].classList.remove('on'); i = (i + 1) % gs.length; gs[i].classList.add('on');
  }, 6000);
}

RENDER.insitu = () => `<section class="section" id="insitu" aria-labelledby="insitu-title">
  ${sectionHead('insitu', 'In situ', 'Website · email · Instagram', 'The marks where people see them most.')}
  <div class="insitu">
    <div class="wide">${protoTag('site')}<div class="subhead" style="margin-top:0"><h3>Website</h3><span class="small muted">Light gold wordmark over the watercolor gallery</span></div>${siteMock()}</div>
    <div>${protoTag('sig')}<div class="subhead" style="margin-top:0"><h3>Email signature</h3><span class="small muted">Email tile, name, title, the wordmark, one line of contact</span></div>${sigBlock()}
      <p class="mock-note">The wordmark is 130 px here, above the 120 px minimum. Copied signatures load PNGs from Brand resources, so they work once the PNGs are exported.</p></div>
    <div><div class="subhead" style="margin-top:0"><h3>Instagram</h3><span class="small muted">One image, one capsule caption</span></div>
      <div class="ig"><div class="ig-head"><img src="${logo('compass-tile-light-gold-on-ink')}" alt=""><div><b>compass_design.studio</b><span class="small">New Market, Alabama</span></div><i class="ph ph-dots-three" style="margin-left:auto;font-size:20px" aria-hidden="true"></i></div>
        <div class="ig-img" style="background-image:url(${IMG}hurricane-ranch-exterior.jpg)" role="img" aria-label="Hurricane Ranch exterior"><span class="capsule">Hurricane Ranch · 2026</span></div>
        <div class="ig-body"><div class="icons" aria-hidden="true"><i class="ph ph-heart"></i><i class="ph ph-chat-circle"></i><i class="ph ph-paper-plane-tilt"></i></div>
          <b>compass_design.studio</b> Timber trusses over the entry and a porch that catches the last light. Hurricane Ranch, New Market.</div></div>
      <p class="mock-note">Avatar: the light gold on Ink tile, as a stand-in. Neither repo records which avatar the account uses.</p></div>
  </div>
</section>`;

AFTER.push(wireSig, wireSiteMock);
