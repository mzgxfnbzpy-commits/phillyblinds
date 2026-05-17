// patch_info_links.js — add request-more-info links to all missed pages
const fs = require('fs');
let ok=[], miss=[];

function rep(file, old, neo, label) {
  let h = fs.readFileSync(file,'utf-8');
  if(!h.includes(old)){ miss.push(label); return; }
  h = h.replace(old, neo);
  fs.writeFileSync(file, h, 'utf-8');
  ok.push(label);
}

const LINK = (product) =>
  `<button onclick="reqMoreInfo('${product}')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about ${product} →</button>\n        `;

// ── norman-sheers.html ────────────────────────────────────────────────────
rep('pages/norman-sheers.html',
  `<button class="btn-gold" onclick="submitQuote()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Submit Specification`,
  LINK('Norman PerfectSheer™ / SmartDrape™') + `<button class="btn-gold" onclick="submitQuote()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Submit Specification`,
  'norman-sheers submit link'
);

// ── soft-treatments.html — drapery, roman, valance, cornice ──────────────
rep('pages/soft-treatments.html',
  `<button class="btn-gold" onclick="submitDrape()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Drapery Quote`,
  LINK('Custom Drapery') + `<button class="btn-gold" onclick="submitDrape()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Drapery Quote`,
  'soft-treatments drapery link'
);
rep('pages/soft-treatments.html',
  `<button class="btn-gold" onclick="submitRoman()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Roman Shade`,
  LINK('Custom Roman Shades') + `<button class="btn-gold" onclick="submitRoman()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Roman Shade`,
  'soft-treatments roman link'
);
rep('pages/soft-treatments.html',
  `<button class="btn-gold" onclick="submitValance()" style="width:100%;padding:13px;font-size:14px;margin-top:4px">Request Valance Quote`,
  LINK('Custom Valance') + `<button class="btn-gold" onclick="submitValance()" style="width:100%;padding:13px;font-size:14px;margin-top:4px">Request Valance Quote`,
  'soft-treatments valance link'
);

// ── shutters.html ─────────────────────────────────────────────────────────
rep('pages/shutters.html',
  `<button class="btn-gold" onclick="submitShutterForm()" style="width:100%;padding:13px">Submit request</button>`,
  LINK('Norman Plantation Shutters') + `<button class="btn-gold" onclick="submitShutterForm()" style="width:100%;padding:13px">Submit request</button>`,
  'shutters link'
);

// ── hardware.html ─────────────────────────────────────────────────────────
rep('pages/hardware.html',
  `<button class="btn-gold" onclick="submitHardware()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Hardware`,
  LINK('Drapery Hardware') + `<button class="btn-gold" onclick="submitHardware()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Hardware`,
  'hardware link'
);

// ── shades.html ───────────────────────────────────────────────────────────
rep('pages/shades.html',
  `<button class="btn-gold" onclick="rnSubmitForm()" style="width:100%;padding:13px">Send quote request</button>`,
  LINK('Norman Roller Shades') + `<button class="btn-gold" onclick="rnSubmitForm()" style="width:100%;padding:13px">Send quote request</button>`,
  'shades Norman roller link'
);
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitShadeForm()" style="width:100%;padding:13px">Send quote request</button>`,
  LINK('Norman Cellular / Zebra / Woven Wood Shades') + `<button class="btn-gold" onclick="submitShadeForm()" style="width:100%;padding:13px">Send quote request</button>`,
  'shades cellular/zebra/woven link'
);
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitPBForm()" style="width:100%;padding:13px;margin-top:4px">Send custom fabrication request`,
  LINK('Custom Roller Shades') + `<button class="btn-gold" onclick="submitPBForm()" style="width:100%;padding:13px;margin-top:4px">Send custom fabrication request`,
  'shades custom roller link'
);
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitQuoteForm()" style="width:100%;padding:13px">Request custom quote</button>`,
  LINK('Hunter Douglas Silhouette / Pirouette Shadings') + `<button class="btn-gold" onclick="submitQuoteForm()" style="width:100%;padding:13px">Request custom quote</button>`,
  'shades Hunter Douglas link'
);
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitPSForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request`,
  LINK('Norman PerfectSheer™ Shades') + `<button class="btn-gold" onclick="submitPSForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request`,
  'shades PerfectSheer link'
);

// ─────────────────────────────────────────────────────────────────────────────
console.log('\nOK (' + ok.length + '):');
ok.forEach(l=>console.log('  ✓',l));
if(miss.length){ console.log('\nMISSED (' + miss.length + '):'); miss.forEach(l=>console.log('  ✗',l)); }
