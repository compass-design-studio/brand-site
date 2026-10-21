// PROTOTYPE: throwaway. The request form (item 15) in three versions. Nothing is sent:
// on submit the sheet shows the confirmation and, below it, what Resend would send.

const REQ_TYPES = [
  { v: 'file', label: 'A missing file', icon: 'file-plus', hint: 'A format, size or version that isn\'t here.' },
  { v: 'correction', label: 'A correction', icon: 'pencil-simple-line', hint: 'Something on this page is wrong or out of date.' },
  { v: 'question', label: 'A question', icon: 'chat-circle-text', hint: 'How to use a mark, a color or a file.' },
];
const ROLES = ['Employee', 'Contractor', 'Trade partner'];
let reqOpenedAt = 0;
let reqReturnFocus = null;
let reqStepType = null;

const field = (id, label, input, { optional = false, help = '' } = {}) => `<div class="field" data-field="${id}">
  <label for="${id}">${label}${optional ? ' <span class="opt">(optional)</span>' : ''}</label>
  ${help ? `<span class="help" id="${id}-help">${help}</span>` : ''}${input}
  <span class="err" id="${id}-err"><i class="ph-fill ph-warning-circle" aria-hidden="true"></i><span></span></span></div>`;
const text = (id, ac = '', req = true) => `<input type="text" id="${id}" name="${id}" ${ac ? `autocomplete="${ac}"` : ''} ${req ? 'required' : ''} aria-describedby="${id}-err">`;
const email = id => `<input type="email" id="${id}" name="${id}" autocomplete="email" required aria-describedby="${id}-err">`;
const area = (id, ph = '', req = true) => `<textarea id="${id}" name="${id}" ${req ? 'required' : ''} aria-describedby="${id}-err" placeholder="${esc(ph)}"></textarea>`;
const chips = (name, legend, opts, { required = true, optional = false } = {}) => `<fieldset class="field" data-field="${name}" ${required ? 'data-required' : ''}><legend>${legend}${optional ? ' <span class="opt">(optional)</span>' : ''}</legend>
  <div class="chips">${opts.map((o, i) => `<input type="radio" name="${name}" id="${name}-${i}" value="${esc(o)}"><label for="${name}-${i}">${esc(o)}</label>`).join('')}</div>
  <span class="err" id="${name}-err"><i class="ph-fill ph-warning-circle" aria-hidden="true"></i><span></span></span></fieldset>`;
const trap = `<div class="trap" aria-hidden="true"><label for="website">Leave this empty</label><input type="text" id="website" name="website" tabindex="-1" autocomplete="off"></div>`;
const foot = label => `<div class="form-foot"><button type="submit" class="btn btn-ink">${label}<i class="ph ph-arrow-right" aria-hidden="true"></i></button><span class="trust">No newsletter, no spam — just a reply from the studio.</span></div>`;

function formA() {
  return `<form novalidate data-form="A">
    <p class="small muted" style="margin:-12px 0 20px">All fields are required unless marked optional.</p>
    <div class="form-grid">
      ${field('name', 'Name', text('name', 'name'))}
      ${field('email', 'Email', email('email'))}
      <div class="full">${chips('role', 'I\'m a…', ROLES)}</div>
      ${field('company', 'Company', text('company', 'organization', false), { optional: true })}
      <div></div>
      <div class="full">${chips('type', 'What do you need?', REQ_TYPES.map(t => t.label))}</div>
      <div class="full">${field('details', 'Details', area('details', 'Which file or section, and what it\'s for.'))}</div>
    </div>${trap}${foot('Send request')}</form>`;
}
function formB() {
  return `<form novalidate data-form="B">
    <div class="form-grid">
      ${field('name', 'Name', text('name', 'name'))}
      ${field('email', 'Email', email('email'))}
      <div class="full">${field('details', 'Message', area('details', 'Tell us what you need.'))}</div>
      <div class="full">${chips('type', 'It\'s about', REQ_TYPES.map(t => t.label), { required: false, optional: true })}</div>
    </div>${trap}${foot('Send')}</form>`;
}
function formC() {
  if (!reqStepType) {
    return `<div data-form="C1"><p class="small muted" style="margin:-12px 0 16px">Step 1 of 2</p>
      <div class="type-cards">${REQ_TYPES.map(t => `<button type="button" data-req-type="${t.v}"><i class="ph ph-${t.icon}" aria-hidden="true"></i><b>${t.label}</b><span>${t.hint}</span></button>`).join('')}</div>
      <p class="trust small muted" style="margin-top:20px">No newsletter, no spam — just a reply from the studio.</p></div>`;
  }
  const t = REQ_TYPES.find(x => x.v === reqStepType);
  let specific = '';
  if (t.v === 'file') {
    const opts = ['A mark in another format or size', 'A black or white version', 'A mark that isn\'t in the kit', 'Something else'];
    specific = `${field('which', 'Which file?', `<select id="which" name="which" required aria-describedby="which-err"><option value="">Select one</option>${opts.map(o => `<option>${esc(o)}</option>`).join('')}</select>`)}
      ${field('details', 'What\'s it for?', area('details', 'For example: a job-site sign, 1.2 m wide, printed on vinyl.'))}`;
  } else if (t.v === 'correction') {
    specific = `${field('which', 'Which section?', `<select id="which" name="which" required aria-describedby="which-err"><option value="">Select one</option>${numbered().map(id => `<option>${esc(SECTION_NAMES[id])}</option>`).join('')}<option>Somewhere else</option></select>`)}
      ${field('details', 'What\'s wrong?', area('details'))}`;
  } else {
    specific = `${field('details', 'Your question', area('details'))}`;
  }
  return `<form novalidate data-form="C2">
    <div class="stepline"><button type="button" class="back" data-req-back><i class="ph ph-arrow-left" aria-hidden="true"></i>Change</button><span>Step 2 of 2 · ${t.label}</span></div>
    <div class="form-grid"><div class="full" style="display:flex;flex-direction:column;gap:22px">${specific}</div>
      ${field('name', 'Name', text('name', 'name'))}${field('email', 'Email', email('email'))}</div>${trap}${foot('Send request')}</form>`;
}

function reqTitle() {
  if (S.form === 'C' && reqStepType) return REQ_TYPES.find(t => t.v === reqStepType).label;
  return S.form === 'C' ? 'What do you need?' : 'Ask the studio';
}
function renderReq() {
  const d = $('#req');
  const body = S.form === 'A' ? formA() : S.form === 'B' ? formB() : formC();
  d.innerHTML = `<div class="sheet">
    <button type="button" class="icon-btn close" data-req-close aria-label="Close"><i class="ph ph-x" aria-hidden="true" style="font-size:20px"></i></button>
    ${protoTag('form')}
    <span class="eyebrow">Brand resources · requests</span>
    <h2 id="req-title">${reqTitle()}</h2>
    <p class="intro">It goes to Allison and Canyon. We reply within the week.</p>
    ${body}</div>`;
}
function openReq(trigger) {
  reqReturnFocus = trigger || document.activeElement;
  reqStepType = null;
  reqOpenedAt = Date.now();
  renderReq();
  const d = $('#req');
  d.showModal();
  const first = $('input:not([tabindex="-1"]), textarea, select, .type-cards button', d);
  if (first) first.focus();
}
function closeReq() { $('#req').close(); }

function setErr(name, msg) {
  const f = $(`#req [data-field="${name}"]`);
  if (!f) return;
  f.classList.toggle('invalid', !!msg);
  $('.err span', f).textContent = msg || '';
  $$('input:not([type=radio]), textarea, select', f).forEach(i => i.setAttribute('aria-invalid', msg ? 'true' : 'false'));
}
function validate(form) {
  const errs = [];
  const v = n => (form.elements[n] ? (form.elements[n].value || '').trim() : '');
  if ('name' in form.elements && !v('name')) errs.push(['name', 'Enter your name.']);
  if ('email' in form.elements) {
    if (!v('email')) errs.push(['email', 'Enter your email, so we can reply.']);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) errs.push(['email', 'Enter an email address like name@company.com.']);
  }
  $$('fieldset[data-required]', form).forEach(fs => {
    const n = fs.dataset.field;
    if (!$(`input[name="${n}"]:checked`, form)) errs.push([n, n === 'role' ? 'Choose the one that fits best.' : 'Choose one.']);
  });
  if (form.elements.which && !v('which')) errs.push(['which', 'Select one.']);
  if (form.elements.details && form.elements.details.required && !v('details')) errs.push(['details', 'Add a few words, so we know what you need.']);
  ['name', 'email', 'role', 'type', 'which', 'details'].forEach(n => setErr(n, null));
  errs.forEach(([n, m]) => setErr(n, m));
  return errs;
}

function submitReq(form) {
  const errs = validate(form);
  if (errs.length) {
    const f = $(`#req [data-field="${errs[0][0]}"] input, #req [data-field="${errs[0][0]}"] textarea, #req [data-field="${errs[0][0]}"] select`);
    if (f) f.focus();
    return;
  }
  const val = n => (form.elements[n] ? (form.elements[n].value || '').trim() : '');
  const radio = n => { const r = $(`input[name="${n}"]:checked`, form); return r ? r.value : ''; };
  const type = S.form === 'C' ? REQ_TYPES.find(t => t.v === reqStepType).label : radio('type');
  const role = radio('role');
  const secs = ((Date.now() - reqOpenedAt) / 1000).toFixed(1);
  const trapEmpty = !val('website');
  const tooFast = secs < 3;
  const subject = `Brand resources · ${type || 'A message'} · ${val('name')}${role ? ` (${role})` : ''}`;
  const lines = [
    `From ${val('name')} <${val('email')}>${role ? `, ${role.toLowerCase()}` : ''}${val('company') ? ` at ${val('company')}` : ''}`,
    type ? `Request: ${type}` : null,
    val('which') ? `${reqStepType === 'correction' ? 'Section' : 'File'}: ${val('which')}` : null,
    '', val('details'), '', 'Sent from brand.compass-design.studio. Reply to answer them directly.',
  ].filter(l => l !== null);
  const first = val('name').split(' ')[0];
  const sheet = $('#req .sheet');
  sheet.innerHTML = `<button type="button" class="icon-btn close" data-req-close aria-label="Close"><i class="ph ph-x" aria-hidden="true" style="font-size:20px"></i></button>
    <div class="confirm" role="status">
      <span class="tick" aria-hidden="true"><i class="ph ph-check"></i></span>
      <h2 id="req-title" tabindex="-1">Thanks, ${esc(first)}.</h2>
      <p>It's on its way to Allison and Canyon. We'll reply to ${esc(val('email'))} within the week.</p>
      <p class="small muted">No newsletter, no spam — just a reply from the studio.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px"><button type="button" class="btn btn-ink" data-req-close>Done</button><button type="button" class="btn btn-outline" data-req-again>Send another</button></div>
    </div>
    <div class="proto-debug"><b>Prototype · what Resend would send (nothing was sent)</b>from: Brand resources &lt;brand@compass-design.studio&gt;
to: allison@compass-design.studio, canyon@compass-design.studio
reply_to: ${esc(val('email'))}
subject: ${esc(subject)}

${esc(lines.join('\n'))}

<b style="margin-top:10px">Spam checks</b>hidden trap field: ${trapEmpty ? 'empty ✓' : 'filled ✗ (dropped silently)'}
fill time: ${secs}s (minimum 3s) ${tooFast ? '✗ (dropped silently)' : '✓'}
server: rate limit per IP, link count, Resend's own checks
no email back to the sender</div>`;
  $('#req-title').focus();
}

document.addEventListener('click', e => {
  const open = e.target.closest('[data-open-req]');
  if (open) { e.preventDefault(); openReq(open); return; }
  if (e.target.closest('[data-req-close]')) { closeReq(); return; }
  if (e.target.closest('[data-req-again]')) { reqStepType = null; reqOpenedAt = Date.now(); renderReq(); const f = $('#req input:not([tabindex="-1"]), #req .type-cards button'); if (f) f.focus(); return; }
  const t = e.target.closest('[data-req-type]');
  if (t) { reqStepType = t.dataset.reqType; renderReq(); const f = $('#req select, #req textarea'); if (f) f.focus(); return; }
  if (e.target.closest('[data-req-back]')) { reqStepType = null; renderReq(); const f = $('#req .type-cards button'); if (f) f.focus(); }
});
document.addEventListener('submit', e => {
  if (!e.target.closest('#req')) return;
  e.preventDefault();
  submitReq(e.target);
});
document.addEventListener('change', e => {
  if (!e.target.closest('#req')) return;
  const f = e.target.closest('[data-field]');
  if (f && f.classList.contains('invalid')) setErr(f.dataset.field, null);
});
$('#req').addEventListener('close', () => { if (reqReturnFocus && document.contains(reqReturnFocus)) reqReturnFocus.focus(); });
