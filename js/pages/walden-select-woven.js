let wsDelivery = 'ship';
function wsSetDelivery(val) {
  wsDelivery = val;
  document.getElementById('ws-del-ship').classList.toggle('sel', val === 'ship');
  document.getElementById('ws-del-pickup').classList.toggle('sel', val === 'pickup');
}

function submitWSQuote() {
  const name = document.getElementById('ws-name').value.trim();
  const phone = document.getElementById('ws-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }
  const subject = encodeURIComponent('Walden Select Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN SELECT WOVEN SHADE QUOTE REQUEST',
    '=========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('ws-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('ws-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('ws-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('ws-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('ws-width').value ? document.getElementById('ws-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('ws-height').value ? document.getElementById('ws-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('ws-qty').value || '1'),
    'Control: ' + (document.getElementById('ws-control').value || 'Not selected'),
    'Mount: ' + (document.getElementById('ws-mount').value || 'Not selected'),
    'Delivery: ' + (wsDelivery === 'ship' ? 'Ship via UPS/FedEx' : 'Customer pickup'),
    '',
    'NOTES',
    document.getElementById('ws-notes').value || '(none)',
  ].join('\n'));
  window.location.href = 'mailto:justin@phillyblinds.com?subject=' + subject + '&body=' + body;
}

function addWaldenSelectToCart() {
  const type = document.getElementById('ws-type').value || 'Roman Shade';
  const pattern = document.getElementById('ws-pattern').value || '—';
  const w = document.getElementById('ws-width').value || '—';
  const h = document.getElementById('ws-height').value || '—';
  const qty = parseInt(document.getElementById('ws-qty').value) || 1;
  const control = document.getElementById('ws-control').value || '—';
  const lines = [
    { label: 'Product', value: 'Walden Select Natural Woven Shade' },
    { label: 'Type', value: type },
    { label: 'Pattern', value: pattern },
    { label: 'Size', value: w + '″ × ' + h + '″' },
    { label: 'Control', value: control },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Walden Select Natural Woven Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}
