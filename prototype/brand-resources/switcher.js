// PROTOTYPE: throwaway. The floating switcher: one bar to flip the current choice's options,
// a panel listing every open choice, and the picks as copyable text. Not part of the design.

let activeKey = CHOICES[0].key;
let pinnedUntil = 0; // after a manual pick, don't let scrolling change the active choice for a moment

function choiceTarget(key) {
  const c = CHOICES.find(x => x.key === key);
  return c.target === 'top' ? $('#top') : c.target === 'close' ? $('#close') : document.getElementById(c.target);
}
function picksText() {
  const lines = CHOICES.map(c => `item ${c.item.padEnd(8)} ${c.title}: ${c.options.find(o => o.v === S[c.key]).label}`);
  return `Brand resources prototype · picks\n${lines.join('\n')}\n\n${location.href}`;
}
function urlFor() {
  const u = new URL(location);
  for (const c of CHOICES) u.searchParams.set(c.key, S[c.key]);
  return u;
}

function setChoice(key, v, { scroll = false } = {}) {
  if (S[key] === v) return;
  const anchor = choiceTarget(key);
  const before = anchor ? anchor.getBoundingClientRect().top : 0;
  S[key] = v;
  history.replaceState(null, '', urlFor());
  activeKey = key;
  pinnedUntil = Date.now() + 1200;
  const reqOpen = $('#req').open;
  renderAll();
  if (reqOpen && key === 'form') { reqStepType = null; renderReq(); }
  const after = choiceTarget(key);
  if (after && !scroll) window.scrollBy(0, after.getBoundingClientRect().top - before);
  if (after && scroll) after.scrollIntoView({ block: 'start' });
  updateBar();
  const c = CHOICES.find(x => x.key === key);
  const live = $('#proto-live');
  if (live) live.textContent = `${c.title}: ${c.options.find(o => o.v === v).label}`;
}
function cycle(dir) {
  const c = CHOICES.find(x => x.key === activeKey);
  const i = c.options.findIndex(o => o.v === S[c.key]);
  setChoice(c.key, c.options[(i + dir + c.options.length) % c.options.length].v);
}
function moveChoice(dir) {
  const i = CHOICES.findIndex(c => c.key === activeKey);
  activeKey = CHOICES[(i + dir + CHOICES.length) % CHOICES.length].key;
  pinnedUntil = Date.now() + 1500;
  const t = choiceTarget(activeKey);
  if (t) t.scrollIntoView({ block: 'start' });
  updateBar();
}

function updateBar() {
  const c = CHOICES.find(x => x.key === activeKey);
  const i = CHOICES.indexOf(c);
  const o = c.options.find(x => x.v === S[c.key]);
  $('#proto-t').textContent = `${i + 1}/${CHOICES.length} · item ${c.item} · ${c.title}`;
  $('#proto-v').textContent = o.label;
  const panel = $('#proto-panel');
  if (!panel.hidden) renderPanel();
}
function renderPanel() {
  const panel = $('#proto-panel');
  panel.innerHTML = `<div class="ph"><h2 id="proto-panel-title">Open choices · ${CHOICES.length}</h2><button type="button" class="x" data-proto-close>Close</button></div>
    <p class="intro">Pick one option for each. Your picks live in the URL, so a copied link reopens this exact mix.</p>
    ${CHOICES.map(c => `<div class="ch ${c.key === activeKey ? 'active' : ''}" data-ch="${c.key}">
      <div class="ct"><a href="#" data-proto-go="${c.key}">${esc(c.title)}</a><span class="it">item ${esc(c.item)}</span></div>
      <div class="seg" role="group" aria-label="${esc(c.title)}">${c.options.map(o => `<button type="button" aria-pressed="${S[c.key] === o.v}" data-proto-set="${c.key}" data-v="${o.v}">${esc(o.label)}</button>`).join('')}</div></div>`).join('')}
    <div class="tools">
      <button type="button" data-proto-copy>Copy my picks</button>
      <label><input type="checkbox" data-proto-tags ${document.body.classList.contains('hide-tags') ? '' : 'checked'}> Show choice tags on the page</label>
      <button type="button" data-proto-reset>Reset to Canyon's picks</button>
    </div>
    <pre aria-label="Current picks">${esc(picksText())}</pre>
    <p class="keys">Keys: ← → switch the current choice's option · [ ] move between choices · Esc closes this panel</p>`;
}
function togglePanel(open, focusKey) {
  const panel = $('#proto-panel');
  const btn = $('#proto-open');
  const show = open ?? panel.hidden;
  if (focusKey) activeKey = focusKey;
  panel.hidden = !show;
  btn.setAttribute('aria-expanded', String(show));
  if (show) {
    renderPanel();
    const cur = $(`[data-ch="${activeKey}"] button[aria-pressed="true"]`, panel) || $('button', panel);
    cur.focus();
    cur.closest('.ch')?.scrollIntoView({ block: 'nearest' });
  }
  updateBar();
}

function initSwitcher() {
  const bar = document.createElement('div');
  bar.className = 'proto-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Prototype switcher');
  bar.innerHTML = `<span class="tag">PROTOTYPE</span>
    <button type="button" id="proto-prev" aria-label="Previous option">‹</button>
    <div class="lbl"><span class="t" id="proto-t"></span><span class="v" id="proto-v"></span></div>
    <button type="button" id="proto-next" aria-label="Next option">›</button>
    <span class="sep" aria-hidden="true"></span>
    <button type="button" id="proto-open" aria-expanded="false" aria-controls="proto-panel">All choices</button>
    <span class="sr-only" id="proto-live" role="status" aria-live="polite"></span>`;
  document.body.appendChild(bar);
  const panel = document.createElement('div');
  panel.className = 'proto-panel';
  panel.id = 'proto-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'proto-panel-title');
  document.body.appendChild(panel);

  $('#proto-prev').onclick = () => cycle(-1);
  $('#proto-next').onclick = () => cycle(1);
  $('#proto-open').onclick = () => togglePanel();
  panel.addEventListener('click', e => {
    const set = e.target.closest('[data-proto-set]');
    if (set) { setChoice(set.dataset.protoSet, set.dataset.v); renderPanel(); $(`[data-proto-set="${set.dataset.protoSet}"][data-v="${set.dataset.v}"]`, panel).focus(); return; }
    const go = e.target.closest('[data-proto-go]');
    if (go) { e.preventDefault(); activeKey = go.dataset.protoGo; pinnedUntil = Date.now() + 1500; choiceTarget(activeKey)?.scrollIntoView({ block: 'start' }); updateBar(); return; }
    if (e.target.closest('[data-proto-close]')) { togglePanel(false); $('#proto-open').focus(); return; }
    if (e.target.closest('[data-proto-copy]')) { copyText(picksText(), 'Picks copied'); return; }
    if (e.target.closest('[data-proto-reset]')) { Object.assign(S, DEFAULTS); history.replaceState(null, '', urlFor()); renderAll(); renderPanel(); updateBar(); }
  });
  panel.addEventListener('change', e => { if (e.target.matches('[data-proto-tags]')) document.body.classList.toggle('hide-tags', !e.target.checked); });

  // Tags on the page open the panel at their choice; inside the modal form they cycle in place
  document.addEventListener('click', e => {
    const tag = e.target.closest('[data-proto-open]');
    if (!tag) return;
    e.preventDefault();
    if (tag.closest('#req')) { activeKey = tag.dataset.protoOpen; cycle(1); return; }
    togglePanel(true, tag.dataset.protoOpen);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !panel.hidden) { togglePanel(false); $('#proto-open').focus(); return; }
    const el = document.activeElement;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if ($('#req').open || $('#mobile-sheet').hidden === false) return;
    if (el && (el.matches('input, textarea, select, [contenteditable], [role="tab"], [role="radio"]') || el.closest('[role="tablist"], [role="radiogroup"], .seg'))) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); cycle(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); cycle(-1); }
    if (e.key === ']') { e.preventDefault(); moveChoice(1); }
    if (e.key === '[') { e.preventDefault(); moveChoice(-1); }
  });

  // The current choice follows the section in view
  const onScroll = () => {
    if (Date.now() < pinnedUntil) return;
    const y = innerHeight * 0.35;
    let best = null;
    for (const c of CHOICES) {
      const t = choiceTarget(c.key);
      if (!t) continue;
      const r = t.getBoundingClientRect();
      if (r.top <= y && r.bottom > y) { best = c.key; break; }
    }
    if (best && best !== activeKey && CHOICES.find(c => c.key === activeKey).target !== CHOICES.find(c => c.key === best).target) { activeKey = best; updateBar(); }
  };
  addEventListener('scroll', () => { cancelAnimationFrame(onScroll._r); onScroll._r = requestAnimationFrame(onScroll); }, { passive: true });
  updateBar();
}
