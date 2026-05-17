// patch_remove_catalogs.js
// 1. Remove catalogs nav link from shared.js
// 2. Add reqMoreInfo() function to shared.js
// 3. Add .req-info-link CSS to global.css
// 4. Add "Request more information" links to all product pages
// 5. Delete catalogs.html

const fs = require('fs');
let ok=[], miss=[];

function rep(file, old, neo, label) {
  let h = fs.readFileSync(file,'utf-8');
  if(!h.includes(old)){ miss.push(label+' in '+file); return; }
  h = h.replace(old, neo);
  fs.writeFileSync(file, h, 'utf-8');
  ok.push(label);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. Remove Catalogs nav link from shared.js
// ─────────────────────────────────────────────────────────────────────────────
rep('js/shared.js',
  `{ href: '../pages/catalogs.html', label: 'Catalogs' },`,
  ``,
  'Remove Catalogs nav link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 2. Add reqMoreInfo() function to shared.js (after renderFooter or at end)
// ─────────────────────────────────────────────────────────────────────────────
{
  let h = fs.readFileSync('js/shared.js','utf-8');
  if(!h.includes('function reqMoreInfo')) {
    h = h + `
// ── Request more information ──────────────────────────────────────────────
function reqMoreInfo(product) {
  var subj = product ? 'Request for more information: ' + product : 'Request for more information';
  var body = 'Hi, I would like to request more information about ' + (product || 'your products') + '.\\n\\nName:\\nPhone:\\nBest time to call:';
  window.location.href = 'mailto:blindznation@gmail.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
}
`;
    fs.writeFileSync('js/shared.js', h, 'utf-8');
    ok.push('Add reqMoreInfo() to shared.js');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. Add .req-info-link CSS to global.css
// ─────────────────────────────────────────────────────────────────────────────
{
  let h = fs.readFileSync('css/global.css','utf-8');
  if(!h.includes('req-info-link')) {
    // Append to end of file
    h += `
/* ── Request more information link ───────────────────────────────────────── */
.req-info-link{display:inline-block;font-size:12px;color:#2563eb;text-decoration:underline;cursor:pointer;background:none;border:none;padding:0;font-family:inherit;margin-top:6px;line-height:1.5}
.req-info-link:hover{color:#1d4ed8}
`;
    fs.writeFileSync('css/global.css', h, 'utf-8');
    ok.push('Add .req-info-link CSS to global.css');
  }
}

// Helper: add link before a submit button
function addInfoLink(file, beforeStr, product, label) {
  rep(file, beforeStr,
    `<button onclick="reqMoreInfo('${product}')" class="req-info-link">Request more information about ${product} →</button>\n        ${beforeStr}`,
    label
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. norman-sheers.html — add before the quote submit button
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/norman-sheers.html',
  `<button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  `<button onclick="reqMoreInfo('Norman PerfectSheer™ / SmartDrape™ Shadings')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about these products →</button>
        <button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  'norman-sheers.html info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 5. soft-treatments.html — add before the quote submit button
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/soft-treatments.html',
  `<button type="submit" class="btn-gold" style="width:100%;padding:13px;font-size:14px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Custom Drapery &amp; Roman Shades')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about our soft treatments →</button>
        <button type="submit" class="btn-gold" style="width:100%;padding:13px;font-size:14px">Send quote request →</button>`,
  'soft-treatments.html info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 6. shutters.html — add before the shutters submit button
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/shutters.html',
  `<button class="btn-gold" onclick="submitShutterForm()" style="width:100%;padding:13px">Submit request →</button>`,
  `<button onclick="reqMoreInfo('Norman Plantation Shutters')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Norman shutters →</button>
        <button class="btn-gold" onclick="submitShutterForm()" style="width:100%;padding:13px">Submit request →</button>`,
  'shutters.html info link (configurator)'
);

rep('pages/shutters.html',
  `<button type="submit" class="btn-gold" style="width:100%;padding:13px;font-size:14px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Norman Plantation Shutters')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Norman shutters →</button>
        <button type="submit" class="btn-gold" style="width:100%;padding:13px;font-size:14px">Send quote request →</button>`,
  'shutters.html info link (simple form)'
);

// ─────────────────────────────────────────────────────────────────────────────
// 7. kirsch-rods.html — add in step 7 above submit
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/kirsch-rods.html',
  `<button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  `<button onclick="reqMoreInfo('Kirsch Drapery Hardware')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Kirsch hardware →</button>
      <button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  'kirsch-rods.html info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 8. paris-texas-rods.html — add in step 8 above submit
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/paris-texas-rods.html',
  `<button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  `<button onclick="reqMoreInfo('Paris Texas Hardware')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Paris Texas Hardware →</button>
      <button class="btn-submit" onclick="submitQuote()">Send Quote Request →</button>`,
  'paris-texas-rods.html info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 9. hardware.html — add in quote form above submit
// ─────────────────────────────────────────────────────────────────────────────
rep('pages/hardware.html',
  `<button class="btn-gold" onclick="submitHardware()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:16px">Request Hardware Quote →</button>`,
  `<button onclick="reqMoreInfo('Drapery Hardware')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about our hardware options →</button>
        <button class="btn-gold" onclick="submitHardware()" style="width:100%;padding:14px;font-size:14px;font-weight:600;margin-top:6px">Request Hardware Quote →</button>`,
  'hardware.html info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 10. faux-wood-blinds.html — add above quote button
// ─────────────────────────────────────────────────────────────────────────────
{
  let h = fs.readFileSync('pages/faux-wood-blinds.html','utf-8');
  const anchor = 'submitFWB()';
  if(h.includes(anchor) && !h.includes('reqMoreInfo')) {
    // Find the submit button line
    const btnStr = `onclick="submitFWB()"`;
    if(h.includes(btnStr)) {
      // Add link before whatever line has submitFWB
      const lines = h.split('\n');
      const idx = lines.findIndex(l=>l.includes(btnStr));
      if(idx>0) {
        lines.splice(idx, 0, `        <button onclick="reqMoreInfo('Norman SmartPrivacy® Faux Wood Blinds')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about these blinds →</button>`);
        fs.writeFileSync('pages/faux-wood-blinds.html', lines.join('\n'), 'utf-8');
        ok.push('faux-wood-blinds.html info link');
      }
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 11. shades.html — add before the main Norman quote submit and custom roller submit
// ─────────────────────────────────────────────────────────────────────────────
// Norman roller (rnSubmitForm)
rep('pages/shades.html',
  `<button class="btn-gold" onclick="rnSubmitForm()" style="width:100%;padding:13px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Norman Roller Shades')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Norman roller shades →</button>
          <button class="btn-gold" onclick="rnSubmitForm()" style="width:100%;padding:13px">Send quote request →</button>`,
  'shades.html Norman roller info link'
);

// Custom Roller (submitPBForm)
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitPBForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Custom Roller Shades')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about custom roller shades →</button>
        <button class="btn-gold" onclick="submitPBForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request →</button>`,
  'shades.html custom roller info link'
);

// Cellular/Zebra/Woven (submitShadeForm)
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitShadeForm()" style="width:100%;padding:13px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Norman Cellular / Zebra / Woven Wood Shades')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about these shades →</button>
        <button class="btn-gold" onclick="submitShadeForm()" style="width:100%;padding:13px">Send quote request →</button>`,
  'shades.html cellular/zebra/woven info link'
);

// PerfectSheer (submitPSForm)
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitPSForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request →</button>`,
  `<button onclick="reqMoreInfo('Norman PerfectSheer™ Shades')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about PerfectSheer shades →</button>
        <button class="btn-gold" onclick="submitPSForm()" style="width:100%;padding:13px;margin-top:4px">Send quote request →</button>`,
  'shades.html PerfectSheer info link'
);

// Hunter Douglas / custom quote (submitQuoteForm)
rep('pages/shades.html',
  `<button class="btn-gold" onclick="submitQuoteForm()" style="width:100%;padding:13px">Request custom quote →</button>`,
  `<button onclick="reqMoreInfo('Hunter Douglas Silhouette / Pirouette Shadings')" class="req-info-link" style="display:block;margin-bottom:10px">Request more information about Hunter Douglas →</button>
        <button class="btn-gold" onclick="submitQuoteForm()" style="width:100%;padding:13px">Request custom quote →</button>`,
  'shades.html Hunter Douglas info link'
);

// ─────────────────────────────────────────────────────────────────────────────
// 12. Delete catalogs.html
// ─────────────────────────────────────────────────────────────────────────────
try {
  fs.unlinkSync('pages/catalogs.html');
  ok.push('Deleted catalogs.html');
} catch(e) {
  miss.push('Delete catalogs.html: ' + e.message);
}

// ─────────────────────────────────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────────────────────────────────
console.log('\nOK (' + ok.length + '):');
ok.forEach(l=>console.log('  ✓',l));
if(miss.length){ console.log('\nMISSED (' + miss.length + '):'); miss.forEach(l=>console.log('  ✗',l)); }
