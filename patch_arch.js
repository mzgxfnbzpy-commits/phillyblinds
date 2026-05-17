// patch_arch.js — cord length, double rod, double brackets for Architrac
const fs = require('fs');
let h = fs.readFileSync('pages/hardware.html', 'utf-8');
let ok = [], miss = [];

function rep(old, neo, label) {
  if (!h.includes(old)) { miss.push(label); return; }
  h = h.replace(old, neo);
  ok.push(label);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. HTML: Add cord length section (after model note, before Exact width)
//    94001 only — cord draw is 94001's defining feature
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `        <!-- Exact width -->`,
  `        <!-- Cord length — 94001 only -->
        <div id="arch-cord-wrap" style="display:none;margin-bottom:14px">
          <div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">Cord length</div>
          <div style="font-size:11px;color:#666;margin-bottom:8px;line-height:1.6">Cord length = your panel drop (floor-to-top-of-pocket) + ~12" for operation. Measure ceiling-to-floor if unsure.</div>
          <div class="opt-row" id="grp-arch-cord">
            <button class="opt-btn sel" onclick="selOpt(this,'grp-arch-cord');archCalc()">36"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">48"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">60"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">72"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">84"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">96"</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-cord');archCalc()">Custom — note in quote</button>
          </div>
        </div>

        <!-- Exact width -->`,
  'Cord length HTML section'
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. HTML: Add double rod section (after draw type, before Color + Mount)
//    94001 and 94003 only
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `        <!-- Color + Mount -->`,
  `        <!-- Double rod — 94001 and 94003 only -->
        <div id="arch-double-rod-wrap" style="display:none;margin-top:14px">
          <div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">Rod configuration</div>
          <div class="opt-row" id="grp-arch-rod-config">
            <button class="opt-btn sel" onclick="selOpt(this,'grp-arch-rod-config');archToggleDouble(false)">Single rod</button>
            <button class="opt-btn" onclick="selOpt(this,'grp-arch-rod-config');archToggleDouble(true)">Double rod</button>
          </div>
          <div id="arch-double-note" style="display:none;margin-top:8px;padding:10px 13px;background:#fafaf8;border:1px solid #e8e8e4;border-radius:8px;font-size:11px;color:#555;line-height:1.65">
            Two tracks from one bracket point — typically a sheer track in front and a drapery track behind. Requires <strong>double brackets</strong> throughout. Front track projection ≈ 2¾", rear track projection ≈ 4¾". Quote will reflect double bracket count.
          </div>
        </div>

        <!-- Color + Mount -->`,
  'Double rod HTML section'
);

// ─────────────────────────────────────────────────────────────────────────────
// 3. JS: Add _archIsDouble state variable
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `var _archModel = '94003';
var _archSelectedBatons = [];`,
  `var _archModel = '94003';
var _archIsDouble = false;
var _archSelectedBatons = [];`,
  '_archIsDouble state var'
);

// ─────────────────────────────────────────────────────────────────────────────
// 4. JS: Update archSelModel() to show/hide cord and double rod sections
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `function archSelModel(model, el) {
  _archModel = model;
  ['94001','94003','94004','94005'].forEach(function(m) {
    var c = document.getElementById('arch-' + m + '-card');
    if (c) c.classList.toggle('sel', m === model);
  });
  var note = document.getElementById('arch-model-note');
  if (note) note.textContent = ARCH_MODEL_NOTES[model] || '';
  archCalc();
}`,
  `function archSelModel(model, el) {
  _archModel = model;
  ['94001','94003','94004','94005'].forEach(function(m) {
    var c = document.getElementById('arch-' + m + '-card');
    if (c) c.classList.toggle('sel', m === model);
  });
  var note = document.getElementById('arch-model-note');
  if (note) note.textContent = ARCH_MODEL_NOTES[model] || '';

  // Cord length: 94001 only (cord-draw model)
  var cordWrap = document.getElementById('arch-cord-wrap');
  if (cordWrap) cordWrap.style.display = model === '94001' ? 'block' : 'none';

  // Double rod: 94001 and 94003 only
  var dblWrap = document.getElementById('arch-double-rod-wrap');
  if (dblWrap) dblWrap.style.display = (model === '94001' || model === '94003') ? 'block' : 'none';

  // If switching to 94004/94005, reset double rod to single
  if (model !== '94001' && model !== '94003') {
    _archIsDouble = false;
    var rdBtns = document.querySelectorAll('#grp-arch-rod-config .opt-btn');
    rdBtns.forEach(function(b, i) { b.classList.toggle('sel', i === 0); });
    var dn = document.getElementById('arch-double-note');
    if (dn) dn.style.display = 'none';
  }

  archCalc();
}`,
  'archSelModel show/hide cord and double'
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. JS: Add archToggleDouble() function (after archTogglePleat)
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `function archTogglePleat(type) {
  var rippleOpts = document.getElementById('arch-ripple-opts');
  if (rippleOpts) rippleOpts.style.display = type === 'ripple' ? 'block' : 'none';
  archCalc();
}`,
  `function archTogglePleat(type) {
  var rippleOpts = document.getElementById('arch-ripple-opts');
  if (rippleOpts) rippleOpts.style.display = type === 'ripple' ? 'block' : 'none';
  archCalc();
}

function archToggleDouble(isDouble) {
  _archIsDouble = isDouble;
  var dn = document.getElementById('arch-double-note');
  if (dn) dn.style.display = isDouble ? 'block' : 'none';
  archCalc();
}`,
  'archToggleDouble function'
);

// ─────────────────────────────────────────────────────────────────────────────
// 6. JS: Update archCalc() bracket label and note for double rod
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `  var bCount = document.getElementById('arch-bracket-count');
  if (bCount) bCount.textContent = totalBrackets + ' brackets';
  var bNote = document.getElementById('arch-bracket-note');
  if (bNote) bNote.innerHTML = '<strong>' + feetBrackets + '</strong> brackets (1 per foot for ' + Math.ceil(w/12) + ' ft) + <strong>2 extra</strong> = <strong>' + totalBrackets + ' total</strong>. Edit the quantity below if needed.';`,
  `  var bracketType = _archIsDouble ? 'double brackets' : 'brackets';
  var bCount = document.getElementById('arch-bracket-count');
  if (bCount) bCount.textContent = totalBrackets + ' ' + bracketType;
  var bNote = document.getElementById('arch-bracket-note');
  if (bNote) bNote.innerHTML = '<strong>' + feetBrackets + '</strong> ' + bracketType + ' (1 per foot for ' + Math.ceil(w/12) + ' ft) + <strong>2 extra</strong> = <strong>' + totalBrackets + ' total</strong>.' + (_archIsDouble ? ' <span style="color:var(--gold);font-weight:600">Double brackets hold both tracks from one wall point.</span>' : '') + ' Edit the quantity below if needed.';`,
  'archCalc double bracket label'
);

// ─────────────────────────────────────────────────────────────────────────────
// 7. JS: Add cord length and double rod to arch summary
// ─────────────────────────────────────────────────────────────────────────────
rep(
  `  window._archSummary = [
    'Architrac model: ' + _archModel,
    'Track width: ' + w + '"',
    'Draw: ' + drawSel.split('—')[0].trim(),
    'Drapery style: ' + pleatSel.trim() + ripplePct,
    'Color: ' + color.trim(),
    'Mount: ' + mount,
    'Brackets: ' + totalBrackets + ' (1/ft + 2 extra, editable)',
    'Master carriers: ' + (mInp ? mInp.value : '1') + ' set(s) — 1 per pair',
    'Ball bearing carriers: ' + rawCarriers + ' (25 per 50", editable)',
    'Batons: ' + (bainp ? bainp.value : numPanels) + ' (1 per panel, sold individually)'
  ];`,
  `  var cordSel = _archModel === '94001'
    ? ((document.querySelector('#grp-arch-cord .opt-btn.sel') || {}).textContent || '').trim()
    : '';
  var rodConfig = _archIsDouble ? 'Double rod (two tracks, double brackets)' : 'Single rod';

  window._archSummary = [
    'Architrac model: ' + _archModel,
    'Rod configuration: ' + rodConfig,
    'Track width: ' + w + '"',
    'Draw: ' + drawSel.split('—')[0].trim(),
    'Drapery style: ' + pleatSel.trim() + ripplePct,
    'Color: ' + color.trim(),
    'Mount: ' + mount,
    (_archModel === '94001' && cordSel ? 'Cord length: ' + cordSel : ''),
    'Brackets: ' + totalBrackets + ' ' + (_archIsDouble ? 'DOUBLE brackets' : 'brackets') + ' (1/ft + 2 extra, editable)',
    'Master carriers: ' + (mInp ? mInp.value : '1') + ' set(s) — 1 per pair',
    'Ball bearing carriers: ' + rawCarriers + ' (25 per 50", editable)',
    'Batons: ' + (bainp ? bainp.value : numPanels) + ' (1 per panel, sold individually)'
  ].filter(Boolean);`,
  'archCalc summary with cord + double'
);

// ─────────────────────────────────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nOK (' + ok.length + '):');
ok.forEach(function(l) { console.log('  ✓', l); });
if (miss.length) {
  console.log('\nMISSED (' + miss.length + '):');
  miss.forEach(function(l) { console.log('  ✗', l); });
}
fs.writeFileSync('pages/hardware.html', h, 'utf-8');
console.log('\nFile written. Length:', h.length);
