/* ─── DATA ──────────────────────────────────────────────── */
const SHUTTER_LINES = {
  'Normandy': {
    label: 'Normandy® — Real Wood',
    material: 'Hardwood (paint) or Phoenix wood (stain)',
    louvers: ['1⅞"','2½"','3"','3½"','4½"'],
    maxPanelW: {'1⅞"':30,'2½"':36,'3"':36,'3½"':42,'4½"':42},
    bifoldMaxW: 26, maxPanelH: 132, dividerRailOver: 78,
    colorTypes: ['Paint','Stain','OSMO'],
    invisibleTiltExclude: ['1⅞"'],
    notes: ['Panel widths up to 42″ available (3½″/4½″ louvers)', 'Stain & OSMO not available with Astragal stile']
  },
  'Woodlore': {
    label: 'Woodlore® — Composite',
    material: 'Composite wood + polypropylene coating',
    louvers: ['1⅞"','2½"','3"','3½"','4½"'],
    maxPanelW: {'1⅞"':24,'2½"':30,'3"':36,'3½"':36,'4½"':36},
    bifoldMaxW: 24, maxPanelH: 120, dividerRailOver: 74,
    colorTypes: ['Solid (6 colors)'],
    invisibleTiltExclude: ['1⅞"'],
    notes: ['36″ panels (3″–4½″) require bottom support']
  },
  'Woodlore Plus': {
    label: 'Woodlore® Plus — Composite+',
    material: 'Composite frame + ABS louvers; waterproof option',
    louvers: ['1⅞"','2½"','3"','3½"','4½"'],
    maxPanelW: {'1⅞"':24,'2½"':36,'3"':36,'3½"':36,'4½"':36},
    bifoldMaxW: 24, maxPanelH: 120, dividerRailOver: 78,
    colorTypes: ['Solid (24 colors)'],
    invisibleTiltExclude: ['1⅞"'],
    notes: ['Waterproof option: stainless steel hinges, full ABS construction', 'Specialty shapes available', 'Custom colors available on request']
  }
};

const ND_PAINT = [
  {id:'001',name:'Pure White',css:'#f5f4f0'},{id:'002',name:'Extra White',css:'#f8f7f3'},
  {id:'003',name:'Silk White',css:'#f3f1eb'},{id:'004',name:'Bright White',css:'#f9f9f7'},
  {id:'006',name:'Pearl',css:'#ede8de'},{id:'007',name:'Ivory Lace',css:'#e8dfc8'},
  {id:'009',name:'Creamy',css:'#e8dbbf'},{id:'012',name:'Crisp Linen',css:'#d4c9a8'},
  {id:'013',name:'Bisque',css:'#d8c9a4'},{id:'017',name:'Gray Black',css:'#4a4a4a',surcharge:true},
  {id:'019',name:'String',css:'#b8a888'},{id:'032',name:'Sea Mist',css:'#a8b8a0'},
  {id:'046',name:'Ice',css:'#d8e8f0'},{id:'053',name:'Clay',css:'#c8a888'},
  {id:'063',name:"Decorator's White",css:'#f0eee6'},{id:'066',name:'Winchester White',css:'#e4ddd0'},
  {id:'076',name:'Aura White',css:'#f0ece4'},{id:'080',name:'Taupe Gray',css:'#9a9088'},
  {id:'836',name:'Classic Black',css:'#2a2a2a',surcharge:true},{id:'090',name:'TS White',css:'#f4f3ef'},
  {id:'600',name:'True White',css:'#f6f5f1'},{id:'601',name:'Chiffon',css:'#e8dfc8'},
  {id:'603',name:'Natural Linen',css:'#c8b890'},{id:'609',name:'Chateau Brown',css:'#7a5c3a',surcharge:true}
];
const ND_STAIN = [
  {id:'101',name:'Natural',css:'#c8a870'},{id:'102',name:'Honey Oak',css:'#c89840'},
  {id:'103',name:'Harvest Gold',css:'#b88830'},{id:'104',name:'Antique White',css:'#e8dcc0'},
  {id:'105',name:'Cider',css:'#b06030'},{id:'106',name:'Sable',css:'#6a4030'},
  {id:'107',name:'Espresso',css:'#3a2010'},{id:'108',name:'Walnut',css:'#5a3818'},
  {id:'109',name:'Ebony',css:'#282018'},{id:'110',name:'Pecan',css:'#8a5828'},
  {id:'111',name:'Cherry',css:'#7a2818'},{id:'112',name:'Mahogany',css:'#6a2010'},
  {id:'113',name:'Golden Oak',css:'#b87830'},{id:'114',name:'Fruitwood',css:'#9a5820'},
  {id:'115',name:'Dark Walnut',css:'#4a2810'},{id:'116',name:'Medium Oak',css:'#a07030'},
  {id:'117',name:'Rustic Oak',css:'#906040'},{id:'246',name:'Matte Black ★',css:'#1e1e1e',surcharge:true}
];
const ND_OSMO = [
  {id:'O1',name:'OSMO White',css:'#f0eeea',surcharge:true},{id:'O2',name:'OSMO Linen',css:'#d4c8a8',surcharge:true},
  {id:'O3',name:'OSMO Sand',css:'#c8b888',surcharge:true},{id:'O4',name:'OSMO Driftwood',css:'#a89878',surcharge:true},
  {id:'O5',name:'OSMO Stone',css:'#888078',surcharge:true},{id:'O6',name:'OSMO Noir',css:'#302820',surcharge:true}
];
const WL_COLORS = [
  {id:'001',name:'Pure White',css:'#f5f4f0'},{id:'002',name:'Extra White',css:'#f8f7f3'},
  {id:'003',name:'Silk White',css:'#f3f1eb'},{id:'006',name:'Pearl',css:'#ede8de'},
  {id:'032',name:'Sea Mist',css:'#a8b8a0'},{id:'063',name:"Decorator's White",css:'#f0eee6'}
];
const WLP_COLORS = [
  {id:'001',name:'Pure White',css:'#f5f4f0'},{id:'002',name:'Extra White',css:'#f8f7f3'},
  {id:'003',name:'Silk White',css:'#f3f1eb'},{id:'004',name:'Bright White',css:'#f9f9f7'},
  {id:'006',name:'Pearl',css:'#ede8de'},{id:'007',name:'Ivory Lace',css:'#e8dfc8'},
  {id:'009',name:'Creamy',css:'#e8dbbf'},{id:'012',name:'Crisp Linen',css:'#d4c9a8'},
  {id:'013',name:'Bisque',css:'#d8c9a4'},{id:'017',name:'Gray Black',css:'#4a4a4a',surcharge:true},
  {id:'019',name:'String',css:'#b8a888'},{id:'032',name:'Sea Mist',css:'#a8b8a0'},
  {id:'046',name:'Ice',css:'#d8e8f0'},{id:'053',name:'Clay',css:'#c8a888'},
  {id:'063',name:"Decorator's White",css:'#f0eee6'},{id:'066',name:'Winchester White',css:'#e4ddd0'},
  {id:'076',name:'Aura White',css:'#f0ece4'},{id:'080',name:'Taupe Gray',css:'#9a9088'},
  {id:'836',name:'Classic Black',css:'#2a2a2a',surcharge:true},{id:'090',name:'TS White',css:'#f4f3ef'},
  {id:'600',name:'True White',css:'#f6f5f1'},{id:'601',name:'Chiffon',css:'#e8dfc8'},
  {id:'603',name:'Natural Linen',css:'#c8b890'},{id:'609',name:'Chateau Brown',css:'#7a5c3a',surcharge:true}
];
const LAYOUTS = {
  single: [{code:'L',desc:'1 panel — hinges left'},{code:'R',desc:'1 panel — hinges right'}],
  two: [{code:'LR',desc:'2 panels — meet center'},{code:'LL',desc:'2 panels — both hinge left'},{code:'RR',desc:'2 panels — both hinge right'}],
  three: [{code:'LLR',desc:'3 panels — 2 left + 1 right'},{code:'LRR',desc:'3 panels — 1 left + 2 right'},{code:'LTLTL',desc:'3 panels — alternating T-posts'},{code:'LTRR',desc:'3 — L + T-post + RR'},{code:'LLTR',desc:'3 — LL + T-post + R'}],
  four: [{code:'LLRR',desc:'4 panels — 2 each side'},{code:'LLTRR',desc:'4 — LL + T-post + RR'},{code:'RRTLL',desc:'4 — RR + T-post + LL'},{code:'LTLRTR',desc:'4 with multiple T-posts'}]
};

/* ─── STATE ─────────────────────────────────────────────── */
const S = {
  line:'', count:0,
  opentype:'', mount:'', dims:[],
  layout:'', tpostV:'', tpostH:'',
  louver:'', tilt:'', frame:'', divider:'',
  colorType:'', color:'',
  specs:[], delivery:'',
  room:'', notes:''
};

/* ─── STEP SYSTEM ───────────────────────────────────────── */
function pbAdv(fromId, num, toId, summary) {
  var el = document.getElementById(fromId);
  if (el) {
    el.classList.remove('active');
    el.classList.add('done');
    var body = el.querySelector('.step-body');
    if (body) body.style.display = 'none';
  }
  var badge = document.getElementById('badge-' + num);
  if (badge) badge.textContent = '✓';
  var shv = document.getElementById('shv-' + num);
  if (shv) shv.textContent = summary || '';
  var next = document.getElementById(toId);
  if (next) {
    next.classList.add('active');
    var nb = next.querySelector('.step-body');
    if (nb) nb.style.display = '';
    setTimeout(function() { next.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, 80);
  }
}

function pbToggleStep(secId) {
  var el = document.getElementById(secId);
  if (!el || !el.classList.contains('done')) return;
  var body = el.querySelector('.step-body');
  if (!body) return;
  if (body.style.display === 'none') {
    body.style.display = '';
    el.classList.add('active');
  } else {
    body.style.display = 'none';
    el.classList.remove('active');
  }
}

/* ─── CONTINUE FUNCTIONS ────────────────────────────────── */
function continueStep1() {
  if (!S.line) { alert('Please select a shutter line.'); return; }
  pbAdv('sec-line', 1, 'sec-count', S.line);
}
function continueStep2() {
  var n = parseInt(document.getElementById('count-input').value) || 0;
  if (n < 1) { alert('Please enter at least 1 opening.'); return; }
  S.count = n;
  buildDims(n);
  updateQuote();
  pbAdv('sec-count', 2, 'sec-opentype', n + ' opening' + (n !== 1 ? 's' : ''));
}
function continueStep3() {
  if (!S.opentype) { alert('Please select an opening type.'); return; }
  pbAdv('sec-opentype', 3, 'sec-mount', S.opentype.split(' (')[0].split(',')[0]);
}
function continueStep4() {
  if (!S.mount) { alert('Please select a mount type.'); return; }
  pbAdv('sec-mount', 4, 'sec-dims', S.mount.split(' (')[0]);
}
function continueStep5() {
  pbAdv('sec-dims', 5, 'sec-layout', S.count + ' opening' + (S.count !== 1 ? 's' : ''));
}
function continueStep6() {
  if (!S.layout) { alert('Please select a panel layout.'); return; }
  pbAdv('sec-layout', 6, 'sec-tpost', S.layout);
}
function continueStep7() {
  var v = S.tpostV || 'None', h = S.tpostH || 'None';
  var sum = (v === 'None' && h === 'None') ? 'None' : (v !== 'None' ? v.split(' (')[0] : '') + (h !== 'None' ? (v !== 'None' ? ', H-post' : 'H-post') : '');
  pbAdv('sec-tpost', 7, 'sec-louver', sum);
}
function continueStep8() {
  if (!S.louver) { alert('Please select a louver size.'); return; }
  pbAdv('sec-louver', 8, 'sec-tilt', S.louver);
}
function continueStep9() {
  if (!S.tilt) { alert('Please select a tilt type.'); return; }
  var short = S.tilt.split(' (')[0];
  pbAdv('sec-tilt', 9, 'sec-frame', short);
}
function continueStep10() {
  if (!S.frame) { alert('Please select a frame style.'); return; }
  pbAdv('sec-frame', 10, 'sec-divider', S.frame.split(' (')[0].substring(0, 22));
}
function continueStep11() {
  if (!S.divider) { alert('Please select a divider rail option.'); return; }
  pbAdv('sec-divider', 11, 'sec-color', S.divider.split(' (')[0].substring(0, 20));
}
function continueStep12() {
  if (!S.color) { alert('Please choose a color.'); return; }
  pbAdv('sec-color', 12, 'sec-special', (S.colorType ? S.colorType + ': ' : '') + S.color.split(' (')[0].substring(0, 18));
}
function continueStep13() {
  pbAdv('sec-special', 13, 'sec-notes', S.specs.length ? S.specs.length + ' add-on' + (S.specs.length !== 1 ? 's' : '') : 'None');
}
function continueStep14() {
  var room = (document.getElementById('field-room').value || '').trim();
  pbAdv('sec-notes', 14, 'sec-delivery', room || 'No room entered');
}
function continueStep15() {
  if (!S.delivery) { alert('Please select delivery or pickup.'); return; }
  pbAdv('sec-delivery', 15, 'sec-contact', S.delivery.startsWith('Ship') ? 'Ship to me' : 'I\'ll pick up');
}

/* ─── HELPERS ───────────────────────────────────────────── */
function qs(id) { return document.getElementById(id); }
function setText(id, v) { var e = qs(id); if (e) e.textContent = v || '—'; }
function adjCount(d) {
  var el = qs('count-input');
  el.value = Math.max(1, Math.min(30, (parseInt(el.value) || 1) + d));
  S.count = parseInt(el.value);
  updateQuote();
  clearTimeout(window._qtyTimer);
  window._qtyTimer = setTimeout(continueStep2, 500);
}
function selOpt(btn, group) {
  var row = btn.parentElement;
  row.querySelectorAll('.opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  S[group] = btn.dataset.val || btn.textContent.trim().split('\n')[0].trim();
  updateQuote();
}

/* ─── LINE SELECTION ────────────────────────────────────── */
function selLine(name, card) {
  document.querySelectorAll('.line-card').forEach(function(c) { c.classList.remove('sel'); });
  card.classList.add('sel');
  S.line = name;
  var ln = SHUTTER_LINES[name];
  var note = qs('line-note');
  note.innerHTML = '<strong>' + ln.label + '</strong> — ' + ln.material +
    (ln.notes ? '<br><small style="color:#888">' + ln.notes.join(' · ') + '</small>' : '');
  note.style.display = 'block';
  qs('wlp-waterproof').style.display = (name === 'Woodlore Plus') ? 'block' : 'none';
  buildLouverOpts();
  buildColorSection();
  updateQuote();
  setTimeout(continueStep1, 400);
}

/* ─── DIMS ──────────────────────────────────────────────── */
function buildDims(n) {
  var container = qs('dim-openings');
  container.innerHTML = '';
  S.dims = Array.from({length: n}, function(_, i) { return {w:'', h:'', label:'Opening '+(i+1)}; });
  for (var i = 0; i < n; i++) {
    (function(idx) {
      var div = document.createElement('div');
      div.className = 'opening-card';
      div.innerHTML = '<div class="opening-title"><span class="opening-num">' + (idx+1) + '</span>Opening ' + (idx+1) + '</div>' +
        '<div class="dim-row">' +
        '<div class="form-group" style="margin:0"><label>Width (inches)</label>' +
        '<input type="text" placeholder=\'e.g. 36⅛"\' id="dim-w-' + idx + '" oninput="S.dims[' + idx + '].w=this.value;updateQuote();checkDimWarn(' + idx + ',this.value)"></div>' +
        '<div class="form-group" style="margin:0"><label>Height (inches)</label>' +
        '<input type="text" placeholder=\'e.g. 60½"\' id="dim-h-' + idx + '" oninput="S.dims[' + idx + '].h=this.value;updateQuote();checkDimHWarn(' + idx + ',this.value)"></div>' +
        '</div><div id="dim-warn-' + idx + '" class="warn-note"></div>' +
        '<div class="form-group" style="margin:6px 0 0"><label>Opening label (optional)</label>' +
        '<input type="text" placeholder="e.g. Master bedroom left" oninput="S.dims[' + idx + '].label=this.value;updateQuote()"></div>';
      container.appendChild(div);
    })(i);
  }
}
function checkDimWarn(i, val) {
  var w = parseFloat(val), warn = qs('dim-warn-'+i);
  if (!S.line || !S.louver || isNaN(w)) { warn.classList.remove('show'); return; }
  var maxW = SHUTTER_LINES[S.line].maxPanelW[S.louver] || 36;
  if (w > maxW) {
    warn.textContent = '⚠ Width ' + w + '″ exceeds the ' + S.louver + ' louver max panel width of ' + maxW + '″ for ' + S.line + '. A T-post or additional panels will be required.';
    warn.classList.add('show');
  } else { warn.classList.remove('show'); }
}
function checkDimHWarn(i, val) {
  var h = parseFloat(val), warn = qs('dim-warn-'+i);
  if (!S.line || isNaN(h)) return;
  var reqH = SHUTTER_LINES[S.line].dividerRailOver;
  if (h > reqH) {
    var msg = '⚠ Height ' + h + '″ exceeds ' + reqH + '″ — a divider rail is required for ' + S.line + '.';
    warn.textContent = warn.textContent ? warn.textContent + ' ' + msg : msg;
    warn.classList.add('show');
    qs('divider-req-note').textContent = 'Required: Panel height over ' + reqH + '″ needs a divider rail for ' + S.line + '. Please select one below.';
    qs('divider-req-note').style.display = 'block';
  }
}

/* ─── PANEL LAYOUTS ─────────────────────────────────────── */
(function buildLayoutGrids() {
  function makeBtn(l) {
    return '<div class="layout-btn" onclick="selLayout(\'' + l.code + '\',this)"><span class="lbl">' + l.code + '</span><span class="sub">' + l.desc + '</span></div>';
  }
  var grids = {1:'layout-grid-1',2:'layout-grid-2',3:'layout-grid-3',4:'layout-grid-4'};
  var keys = ['single','two','three','four'];
  Object.values(grids).forEach(function(id, i) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = LAYOUTS[keys[i]].map(makeBtn).join('');
  });
})();

function selLayout(code, btn) {
  document.querySelectorAll('.layout-btn, .opt-row .opt-btn[data-layout]').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  S.layout = code;
  var trackLayouts = ['Bi-fold 180° (opens 180°)','Bi-fold 90° (folds into wall)','2020 Bypass (sliding panels)','Frame Hinged Bifold'];
  var note = qs('layout-note');
  if (trackLayouts.includes(code)) {
    note.textContent = 'Track systems require specific frame components and measurements. We will confirm all track specifications at the measuring visit.';
    note.style.display = 'block';
  } else { note.style.display = 'none'; }
  updateQuote();
  setTimeout(continueStep6, 400);
}

/* ─── LOUVER OPTS ───────────────────────────────────────── */
function buildLouverOpts() {
  var container = qs('louver-opts');
  container.innerHTML = '';
  if (!S.line) return;
  SHUTTER_LINES[S.line].louvers.forEach(function(l) {
    var btn = document.createElement('button');
    btn.className = 'opt-btn';
    btn.dataset.val = l;
    var maxW = SHUTTER_LINES[S.line].maxPanelW[l];
    btn.innerHTML = '<strong>' + l + '</strong> <span style="font-size:10px;color:#999">max ' + maxW + '″ panel</span>';
    btn.onclick = function() { selLouver(l, this); };
    container.appendChild(btn);
  });
}
function selLouver(size, btn) {
  document.querySelectorAll('#louver-opts .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  S.louver = size;
  if (S.tilt && S.tilt.includes('InvisibleTilt') && SHUTTER_LINES[S.line].invisibleTiltExclude.includes(size)) {
    qs('tilt-warn').classList.add('show');
  } else { qs('tilt-warn').classList.remove('show'); }
  var maxW = SHUTTER_LINES[S.line].maxPanelW[size];
  var note = qs('louver-maxw-note');
  note.textContent = 'Max single-panel width for ' + size + ' louver on ' + S.line + ': ' + maxW + '″. For wider openings, T-posts or additional panels are required.';
  note.style.display = 'block';
  updateQuote();
  setTimeout(continueStep8, 400);
}

/* ─── TILT ──────────────────────────────────────────────── */
function selTilt(btn) {
  document.querySelectorAll('#sec-tilt .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  S.tilt = btn.dataset.val;
  var warn = qs('tilt-warn');
  if (S.line && S.louver && SHUTTER_LINES[S.line].invisibleTiltExclude.includes(S.louver)) {
    warn.classList.add('show');
  } else { warn.classList.remove('show'); }
  updateQuote();
  setTimeout(continueStep9, 400);
}

/* ─── OPEN TYPE CHECK ───────────────────────────────────── */
function checkOpenType(btn) {
  selOpt(btn, 'opentype');
  var val = btn.dataset.val;
  var note = qs('opentype-note');
  var msgs = {
    'Slider / bypass door': '⚠ Bypass/slider doors use a 2020 Bypass track system. Select the track layout in Step 6.',
    'Bi-fold door': '⚠ Bi-fold doors use bi-fold track hardware (180° or 90°). Select the appropriate track layout in Step 6.',
    'French door': '⚠ French door shutters require special cutouts. Be sure to note glass cutout type (flush, offset, arch) in your special instructions.',
    'Bay / corner window': '⚠ Bay and corner windows require matching specifications across all panels. All openings must share the same louver size, frame type, mount type, stile, and height.',
    'Specialty shape (arch, circle, etc.)': '⚠ Specialty shapes are hand-crafted solid wood with a standard lead time of 8 weeks from order confirmation. Templates may be required for imperfect arches.'
  };
  if (msgs[val]) { note.textContent = msgs[val]; note.classList.add('show'); }
  else { note.classList.remove('show'); }
  setTimeout(continueStep3, 500);
}

/* ─── MOUNT CHECK ───────────────────────────────────────── */
function checkMount(btn) {
  selOpt(btn, 'mount');
  var note = qs('mount-note');
  note.textContent = '⚠ Direct mount hinges directly to the existing window frame and is NOT suitable for drywall installations.';
  note.classList.add('show');
  setTimeout(continueStep4, 500);
}

/* ─── COLOR SECTION ─────────────────────────────────────── */
function buildColorSection() {
  var inner = qs('color-inner');
  if (!S.line) { inner.innerHTML = ''; return; }
  if (S.line === 'Woodlore') {
    inner.innerHTML = '<p class="step-subhead">Woodlore is available in 6 classic colors.</p>' +
      '<div class="color-grid">' + WL_COLORS.map(function(c) { return colorSwatchHTML(c,'WL'); }).join('') + '</div>';
  } else if (S.line === 'Woodlore Plus') {
    inner.innerHTML = '<p class="step-subhead">24 solid colors. ★ = surcharge.</p>' +
      '<div class="color-grid">' + WLP_COLORS.map(function(c) { return colorSwatchHTML(c,'WLP'); }).join('') + '</div>';
  } else {
    inner.innerHTML = '<p class="step-subhead">Select finish type, then choose a color. ★ = surcharge applies.</p>' +
      '<div class="finish-tabs">' +
      '<div class="finish-tab active" onclick="switchFinish(\'paint\',this)">Paint (24)</div>' +
      '<div class="finish-tab" onclick="switchFinish(\'stain\',this)">Stain (18)</div>' +
      '<div class="finish-tab" onclick="switchFinish(\'osmo\',this)">OSMO (6, all surcharge)</div>' +
      '</div>' +
      '<div class="finish-panel active" id="fp-paint"><div class="info-note" style="margin-bottom:10px">Paint colors → Hardwood material. Astragal stile available.</div>' +
      '<div class="color-grid">' + ND_PAINT.map(function(c) { return colorSwatchHTML(c,'ND-paint'); }).join('') + '</div></div>' +
      '<div class="finish-panel" id="fp-stain"><div class="info-note" style="margin-bottom:10px">Stain colors → Phoenix wood material. Astragal stile NOT available with stain.</div>' +
      '<div class="color-grid">' + ND_STAIN.map(function(c) { return colorSwatchHTML(c,'ND-stain'); }).join('') + '</div></div>' +
      '<div class="finish-panel" id="fp-osmo"><div class="info-note" style="margin-bottom:10px">OSMO is a premium natural oil-wax finish. All OSMO colors carry a surcharge.</div>' +
      '<div class="color-grid">' + ND_OSMO.map(function(c) { return colorSwatchHTML(c,'ND-osmo'); }).join('') + '</div></div>';
    S.colorType = 'Paint';
  }
}
function colorSwatchHTML(c, group) {
  return '<div class="color-swatch' + (c.surcharge ? ' surcharge' : '') + '" onclick="selColor(\'' + c.id + '\',\'' + c.name.replace(/'/g,"\\'") + '\',this,\'' + group + '\')">' +
    '<div class="color-dot" style="background:' + c.css + '"></div>' +
    '<div class="color-name">' + c.name + '</div></div>';
}
function selColor(id, name, el, group) {
  document.querySelectorAll('.color-swatch').forEach(function(s) { s.classList.remove('sel'); });
  el.classList.add('sel');
  S.color = name + ' (' + id + ')';
  updateQuote();
  setTimeout(continueStep12, 400);
}
function switchFinish(type, tab) {
  document.querySelectorAll('.finish-tab').forEach(function(t) { t.classList.remove('active'); });
  tab.classList.add('active');
  document.querySelectorAll('.finish-panel').forEach(function(p) { p.classList.remove('active'); });
  var panel = qs('fp-' + type);
  if (panel) panel.classList.add('active');
  S.colorType = type.charAt(0).toUpperCase() + type.slice(1);
  S.color = '';
  document.querySelectorAll('.color-swatch').forEach(function(s) { s.classList.remove('sel'); });
  updateQuote();
}

/* ─── SPECIALTY TOGGLES ─────────────────────────────────── */
function toggleSpec(btn, val) {
  btn.classList.toggle('sel');
  if (btn.classList.contains('sel')) {
    if (!S.specs.includes(val)) S.specs.push(val);
  } else {
    S.specs = S.specs.filter(function(v) { return v !== val; });
  }
  // Warn if Woodlore Plus waterproof + specialty shape (continuous arch not available)
  var archWarn = document.getElementById('wlp-waterproof-arch-warn');
  if (archWarn) {
    var hasWaterproof = S.specs.some(function(v) { return v.indexOf('Waterproof') >= 0; });
    var hasSpecialty  = S.specs.some(function(v) { return v.indexOf('Specialty shape') >= 0; });
    archWarn.style.display = (hasWaterproof && hasSpecialty) ? 'block' : 'none';
  }
  updateQuote();
}

/* ─── DELIVERY ──────────────────────────────────────────── */
function selDelivery(type, card) {
  document.querySelectorAll('.delivery-opt-card').forEach(function(c) { c.classList.remove('sel'); });
  card.classList.add('sel');
  S.delivery = type === 'ship' ? 'Ship (UPS/FedEx from Huntingdon Valley PA)' : 'Pickup (Huntingdon Valley PA — address provided after order confirmation)';
  qs('ship-note').style.display = type === 'ship' ? 'block' : 'none';
  updateQuote();
  setTimeout(continueStep15, 400);
}

/* ─── QUOTE SUMMARY ─────────────────────────────────────── */
function updateQuote() {
  setText('qs-line', S.line || '—');
  setText('qs-count', S.count ? S.count + ' opening' + (S.count !== 1 ? 's' : '') : '—');
  setText('qs-opentype', S.opentype || '—');
  setText('qs-mount', S.mount || '—');
  setText('qs-layout', S.layout || '—');
  var tpost = [S.tpostV, S.tpostH].filter(Boolean).join(' · ');
  setText('qs-tpost', tpost || '—');
  setText('qs-louver', S.louver || '—');
  setText('qs-tilt', S.tilt || '—');
  setText('qs-frame', S.frame || '—');
  setText('qs-divider', S.divider || '—');
  setText('qs-color', S.color ? (S.colorType ? S.colorType + ': ' : '') + S.color : '—');
  var list = qs('qs-openings');
  list.innerHTML = '';
  S.dims.forEach(function(d, i) {
    if (d.w || d.h) {
      var li = document.createElement('li');
      li.className = 'q-opening-item';
      li.textContent = (d.label || 'Opening '+(i+1)) + ': ' + (d.w || '?') + '″W × ' + (d.h || '?') + '″H';
      list.appendChild(li);
    }
  });
}

/* ─── SUBMIT ─────────────────────────────────────────────── */
async function submitQuote() {
  var name  = qs('field-name').value.trim();
  var phone = qs('field-phone').value.trim();
  var email = qs('field-email').value.trim();
  if (!name || !phone || !email) { alert('Please fill in your name, phone, and email.'); return; }
  if (!S.line) { alert('Please select a shutter line first.'); return; }
  var btn = document.querySelector('.btn-submit-quote') || document.querySelector('[onclick*="submitQuote"]');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  var dimsText = S.dims.map(function(d, i) {
    return 'Opening '+(i+1)+(d.label?' ('+d.label+')':'')+': '+(d.w||'?')+'″ W × '+(d.h||'?')+'″ H';
  }).join('; ');
  var selections = [
    { label: 'Line', value: S.line },
    { label: 'Openings', value: S.count+' opening'+(S.count!==1?'s':'') },
    { label: 'Opening type', value: S.opentype||'—' },
    { label: 'Mount', value: S.mount||'—' },
    { label: 'Dimensions', value: dimsText||'—' },
    { label: 'Panel layout', value: S.layout||'—' },
    { label: 'Louver size', value: S.louver||'—' },
    { label: 'Tilt type', value: S.tilt||'—' },
    { label: 'Frame style', value: S.frame||'—' },
    { label: 'Divider rail', value: S.divider||'None' },
    { label: 'T-post vertical', value: S.tpostV||'None' },
    { label: 'T-post horizontal', value: S.tpostH||'None' },
    { label: 'Color / Finish', value: (S.colorType?S.colorType+' — ':'')+S.color },
    { label: 'Specialty options', value: S.specs&&S.specs.length?S.specs.join(', '):'None' },
    { label: 'Delivery', value: S.delivery||'Not specified' },
    { label: 'Room', value: qs('field-room').value||'—' },
    { label: 'City / ZIP', value: qs('field-zip').value||'—' },
  ];
  try {
    var resp = await fetch('/api/quote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, phone: phone,
        product: 'Norman Plantation Shutters — '+S.line,
        selections: selections, notes: qs('field-notes').value.trim()||'',
        sourceUrl: window.location.href })
    });
    var data = {}; try { data = await resp.json(); } catch(ex) {}
    if (!resp.ok) throw new Error(data.error||'Server error');
    qs('success-box').classList.add('show');
  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Request Quote →'; }
    alert('Something went wrong. Please call (609) 742-1720 or email justin@phillyblinds.com');
  }
}
