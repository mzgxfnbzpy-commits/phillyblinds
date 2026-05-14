// ============================================================
// Philly Blinds — Shared Components
// ============================================================

function _injectHead(isHome) {
  const prefix = isHome ? '' : '../';

  // Canonical — derived from og:url already set per-page
  if (!document.querySelector('link[rel="canonical"]')) {
    const og = document.querySelector('meta[property="og:url"]');
    if (og) {
      const c = document.createElement('link');
      c.rel = 'canonical'; c.href = og.content;
      document.head.appendChild(c);
    }
  }

  // Theme color (mobile browser chrome)
  if (!document.querySelector('meta[name="theme-color"]')) {
    const m = document.createElement('meta');
    m.name = 'theme-color'; m.content = '#1C1510';
    document.head.appendChild(m);
  }

  // Favicon
  if (!document.querySelector('link[rel="icon"]')) {
    const l = document.createElement('link');
    l.rel = 'icon'; l.type = 'image/svg+xml';
    l.href = prefix + 'favicon.svg';
    document.head.appendChild(l);
  }

  // Local Business JSON-LD schema
  if (!document.querySelector('script[data-pb-schema]')) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-pb-schema', '1');
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": "https://phillyblinds.com/#business",
      "name": "Philly Blinds",
      "alternateName": "Michael J. Healy Installations LLC",
      "description": "Custom window treatments — roller shades, cellular shades, roman shades, drapery, and plantation shutters. Fabrication and installation serving Philadelphia and surrounding area.",
      "url": "https://phillyblinds.com",
      "telephone": "+16097421720",
      "email": "justin@phillyblinds.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Huntingdon Valley",
        "addressRegion": "PA",
        "postalCode": "19006",
        "addressCountry": "US"
      },
      "geo": {"@type": "GeoCoordinates", "latitude": 40.1162, "longitude": -75.0652},
      "areaServed": [
        {"@type": "City", "name": "Philadelphia"},
        {"@type": "AdministrativeArea", "name": "Philadelphia County, PA"},
        {"@type": "AdministrativeArea", "name": "Montgomery County, PA"},
        {"@type": "AdministrativeArea", "name": "Bucks County, PA"},
        {"@type": "AdministrativeArea", "name": "Delaware County, PA"},
        {"@type": "AdministrativeArea", "name": "South Jersey, NJ"}
      ],
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00", "closes": "21:00"
      },
      "hasMap": "https://maps.google.com/?q=Huntingdon+Valley+PA+19006",
      "makesOffer": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roller Shade Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Cellular Honeycomb Shade Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roman Shade Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Drapery Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Norman Plantation Shutter Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Motorized Window Treatment Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Free In-Home Window Treatment Consultation"}}
      ],
      "sameAs": []
    });
    document.head.appendChild(s);
  }
}

function renderNav(activePage) {
  const pages = [
    { href: '../pages/shades.html', label: 'Shades & blinds' },
    { href: '../pages/soft-treatments.html', label: 'Soft treatments' },
    { href: '../pages/hardware.html', label: 'Hardware' },
    { href: '../pages/shutters.html', label: 'Shutters' },
    { href: '../pages/gallery.html', label: 'Our work' },
    { href: '../pages/upholstery.html', label: 'Custom upholstery' },
    { href: '../pages/installation.html', label: 'Installation' },
    { href: '../pages/measure.html', label: 'How to measure' },
    { href: '../pages/about.html', label: 'About' },
    { href: '../pages/fabric-calculator.html', label: 'Fabric calculator' },
    { href: '../pages/catalogs.html', label: 'Catalogs' },
  ];
  const isHome = activePage === 'home';
  const prefix = isHome ? 'pages/' : '../pages/';

  const root = isHome ? 'index.html' : '../index.html';
  const consultHref = isHome ? 'pages/consult.html' : '../pages/consult.html';

  document.getElementById('site-nav').innerHTML = `
    <div class="nav-identity">
      <span class="nav-company">Michael J. Healy Installations LLC</span>
      <div class="nav-brand-row">
        <a class="nav-brand-active" href="${root}">Philly Blinds</a>
        <span class="nav-brand-sep">·</span>
        <span class="nav-brand-other">Blindznation</span>
      </div>
    </div>
    <div class="nav-main">
      <a class="nav-logo" href="${root}">
        <svg width="28" height="16" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:7px;flex-shrink:0">
          <path d="M20 130 C60 140, 120 50, 200 20 C230 8, 255 12, 265 30 C275 48, 260 68, 238 62 C220 58, 215 68, 240 72 C260 76, 270 90, 250 110 C230 130, 200 128, 180 115" stroke="#2DE0C1" stroke-width="22" fill="none" stroke-linecap="round"/>
        </svg>Philly<em>Blinds</em>
      </a>
      <div class="nav-links">
        ${pages.map(p => {
          const href = isHome ? p.href.replace('../', '') : p.href;
          const active = p.label === activePage ? ' active' : '';
          return `<a href="${href}" class="${active}">${p.label}</a>`;
        }).join('')}
      </div>
      <div class="nav-right">
        <button class="nav-cart-btn" onclick="pbOpenCart()" aria-label="Open cart">
          🛒 Cart<span class="nav-cart-count" id="pb-nav-cart-count" style="display:none">0</span>
        </button>
        <a class="nav-phone" href="tel:6097421720">
          📞 (609) 742-1720 <span class="badge-24">24/7</span>
        </a>
        <a class="nav-cta" href="${consultHref}">Free consultation</a>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" onclick="_toggleDrawer()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-drawer" id="nav-drawer">
      ${pages.map(p => {
        const href = isHome ? p.href.replace('../', '') : p.href;
        const active = p.label === activePage ? ' active' : '';
        return `<a href="${href}" class="${active}">${p.label}</a>`;
      }).join('')}
      <a class="nav-drawer-phone-link" href="tel:6097421720">&#128222;&nbsp;&nbsp;(609) 742-1720 &mdash; call or text 24/7</a>
      <a class="nav-drawer-cta" href="${consultHref}">Free consultation</a>
    </div>
  `;
  _injectHead(isHome);
  _initCart();
  _initMotorModal();
  _initChatbot();
  _initMobileBar(consultHref);
}

function renderFooter(isHome) {
  const pre = isHome ? 'pages/' : '../pages/';
  // Shipping estimators are injected after footer renders (deferred so all form HTML is in DOM)
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <svg width="22" height="13" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;flex-shrink:0">
            <path d="M20 130 C60 140, 120 50, 200 20 C230 8, 255 12, 265 30 C275 48, 260 68, 238 62 C220 58, 215 68, 240 72 C260 76, 270 90, 250 110 C230 130, 200 128, 180 115" stroke="#2DE0C1" stroke-width="22" fill="none" stroke-linecap="round"/>
          </svg>Philly<em>Blinds</em>
        </div>
        <div class="footer-brand-alt">Blindznation</div>
        <div class="footer-company">Michael J. Healy Installations LLC</div>
        <div class="footer-tagline">Professional window treatment installation across Philadelphia &amp; surrounding areas.</div>
        <a href="tel:6097421720" style="display:block;font-size:15px;font-weight:600;color:var(--gold);text-decoration:none;margin-bottom:2px">(609) 742-1720</a>
        <div style="font-size:11px;color:var(--text-faint);margin-bottom:6px">Justin Healy &mdash; call or text 24/7</div>
        <a href="mailto:justin@phillyblinds.com" style="font-size:12px;color:var(--text-muted);text-decoration:none">justin@phillyblinds.com</a>
      </div>
      <div class="footer-col">
        <h4>Shades</h4>
        <a href="${pre}shades.html">Roller shades</a>
        <a href="${pre}shades.html">Cellular shades</a>
        <a href="${pre}shades.html">Zebra shades</a>
        <a href="${pre}shades.html">Woven wood</a>
        <a href="${pre}shades.html">Faux wood blinds</a>
        <a href="${pre}shades.html">Silhouette / Pirouette / Luminette</a>
      </div>
      <div class="footer-col">
        <h4>Soft treatments</h4>
        <a href="${pre}soft-treatments.html">Custom drapery</a>
        <a href="${pre}soft-treatments.html">Roman shades</a>
        <a href="${pre}hardware.html">Drapery hardware</a>
      </div>
      <div class="footer-col">
        <h4>Premium</h4>
        <a href="${pre}shutters.html">Plantation shutters</a>
        <a href="${pre}shades.html">Hunter Douglas</a>
      </div>
      <div class="footer-col">
        <h4>Help</h4>
        <a href="${pre}upholstery.html">Custom upholstery</a>
        <a href="${pre}installation.html">Installation services</a>
        <a href="${pre}measure.html">Measure: shades &amp; blinds</a>
        <a href="${pre}measure-shutters.html">Measure: shutters</a>
        <a href="${pre}measure-drapes.html">Measure: drapery</a>
        <a href="${pre}gallery.html">Our work</a>
        <a href="${pre}consult.html">Book consultation</a>
        <a href="${pre}about.html">About us</a>
        <a href="${pre}privacy.html">Privacy policy</a>
      </div>
    </div>
    <div class="footer-disc">Blindznation is an independent business providing professional installation and consulting services. Product names, logos, and trademarks are the property of their respective owners and are used for identification purposes only. Blindznation is not affiliated with, endorsed by, or sponsored by any manufacturer. &nbsp;·&nbsp; <a href="${pre}privacy.html" style="color:inherit;text-decoration:underline">Privacy Policy</a></div>
  `;
  setTimeout(function(){ _initShippingEstimators(); _initFileUploads(); }, 0);
}

function _toggleDrawer() {
  var btn    = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;
  var open = drawer.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

// Close mobile drawer when clicking a link inside it
document.addEventListener('click', function(e) {
  var drawer = document.getElementById('nav-drawer');
  var btn    = document.getElementById('nav-hamburger');
  if (!drawer || !drawer.classList.contains('open')) return;
  if (e.target.closest('.nav-drawer a') && !e.target.classList.contains('nav-drawer-cta')) {
    drawer.classList.remove('open');
    if (btn) btn.classList.remove('open');
  }
});

// Opt button toggle helper
function selOpt(el, groupId) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}
function getOpt(groupId) {
  const s = document.querySelector('#' + groupId + ' .opt-btn.sel');
  return s ? s.textContent.trim() : '—';
}

// ============================================================
// GLOBAL CART ENGINE
// ============================================================
var _PB_CART_KEY = 'pb_cart_v1';

function pbGetCart() {
  try { return JSON.parse(localStorage.getItem(_PB_CART_KEY) || '[]'); } catch(e) { return []; }
}
function _pbSaveCart(cart) {
  try { localStorage.setItem(_PB_CART_KEY, JSON.stringify(cart)); } catch(e) {}
  _updateCartBadge();
}
function pbAddToCart(item) {
  item.cartId = Date.now() + '-' + Math.floor(Math.random()*9999);
  var cart = pbGetCart();
  cart.push(item);
  _pbSaveCart(cart);
  _pbCartToast(item.product || 'Item');
}
function pbRemoveCartItem(cartId) {
  _pbSaveCart(pbGetCart().filter(function(i){ return i.cartId !== cartId; }));
  _renderCartBody();
}
function pbClearCart() { _pbSaveCart([]); _renderCartBody(); }

function _updateCartBadge() {
  var n = pbGetCart().length;
  var b = document.getElementById('pb-nav-cart-count');
  if (b) { b.textContent = n; b.style.display = n ? 'flex' : 'none'; }
}
function _pbCartToast(name) {
  var t = document.getElementById('pb-cart-toast');
  if (!t) return;
  t.textContent = '✓ ' + name + ' added to cart';
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2600);
}

// ── Cart drawer ──────────────────────────────────────────────
function pbOpenCart() {
  document.getElementById('pb-cart-overlay').classList.add('open');
  document.getElementById('pb-cart-drawer').classList.add('open');
  _renderCartBody();
}
function pbCloseCart() {
  document.getElementById('pb-cart-overlay').classList.remove('open');
  document.getElementById('pb-cart-drawer').classList.remove('open');
}
function _renderCartBody() {
  var cart = pbGetCart();
  var body = document.getElementById('pb-cart-body');
  if (!body) return;
  _updateCartBadge();
  var foot = document.getElementById('pb-cart-foot');
  if (!cart.length) {
    body.innerHTML = '<div class="pb-cart-empty"><div class="pb-cart-empty-icon">🛍️</div>Your cart is empty.<br><span style="font-size:12px">Configure a product and click Add to Cart.</span></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  if (foot) foot.style.display = 'block';
  body.innerHTML = cart.map(function(item, idx) {
    var motorHtml = '';
    if (item.motorized && item.motorOptions) {
      var mo = item.motorOptions;
      var lines = ['Power: ' + mo.power];
      if (mo.power === 'Rechargeable' && mo.chargers) lines.push('Chargers: ' + mo.chargers);
      if (mo.power === 'Hardwire') {
        lines.push('Wiring: ' + mo.wiring);
        if (mo.cord) lines.push('Cord: ' + mo.cord);
      }
      if (mo.remote === 'Yes') lines.push('Remote: ' + mo.channel + ' × ' + mo.remotes);
      else lines.push('Remote: No');
      motorHtml = '<div class="pb-ci-motor">⚡ ' + lines.join(' · ') + '</div>';
    }
    return '<div class="pb-ci">' +
      '<button class="pb-ci-remove" onclick="pbRemoveCartItem(\'' + item.cartId + '\')" aria-label="Remove">×</button>' +
      '<div class="pb-ci-name">' + (item.product || 'Item') + (item.qty > 1 ? ' ×' + item.qty : '') + '</div>' +
      (item.specs ? '<div class="pb-ci-specs">' + item.specs + '</div>' : '') +
      motorHtml +
      '</div>';
  }).join('');
}

// ── Quote submit from cart ───────────────────────────────────
function pbSubmitCartQuote() {
  var name  = (document.getElementById('pb-cq-name')  || {}).value || '';
  var phone = (document.getElementById('pb-cq-phone') || {}).value || '';
  var email = (document.getElementById('pb-cq-email') || {}).value || '';
  if (!name.trim() || !phone.trim()) { alert('Please enter your name and phone number.'); return; }
  var cart = pbGetCart();
  var lines = cart.map(function(item, i) {
    var s = (i+1) + '. ' + (item.product || 'Item');
    if (item.qty > 1) s += ' ×' + item.qty;
    if (item.specs) s += '\n   ' + item.specs;
    if (item.motorized && item.motorOptions) {
      var mo = item.motorOptions;
      s += '\n   Motorized: Power=' + mo.power;
      if (mo.chargers) s += ', Chargers=' + mo.chargers;
      if (mo.wiring)   s += ', Wiring=' + mo.wiring;
      if (mo.cord)     s += ', Cord=' + mo.cord;
      if (mo.remote === 'Yes') s += ', Remote=' + mo.channel + ' ×' + mo.remotes;
      else s += ', Remote=No';
    }
    return s;
  }).join('\n\n');
  var body = 'CART QUOTE REQUEST\n' +
    '==================================\n' +
    'Name:  ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || '—') + '\n\n' +
    'ITEMS:\n\n' + lines + '\n\n' +
    'Notes:\n' + ((document.getElementById('pb-cq-notes') || {}).value || 'None');
  window.location.href = 'mailto:justin@phillyblinds.com' +
    '?subject=' + encodeURIComponent('Quote Request — ' + name) +
    '&body=' + encodeURIComponent(body);
  document.getElementById('pb-cart-quote-form').classList.remove('open');
  document.getElementById('pb-cart-quote-sent').style.display = 'block';
}

// ── Inject cart DOM ─────────────────────────────────────────
function _initCart() {
  if (document.getElementById('pb-cart-overlay')) return;

  // Toast
  var toast = document.createElement('div');
  toast.id = 'pb-cart-toast'; toast.className = 'pb-cart-toast';
  document.body.appendChild(toast);

  // Overlay
  var overlay = document.createElement('div');
  overlay.id = 'pb-cart-overlay'; overlay.className = 'pb-cart-overlay';
  overlay.addEventListener('click', pbCloseCart);
  document.body.appendChild(overlay);

  // Drawer
  var drawer = document.createElement('div');
  drawer.id = 'pb-cart-drawer'; drawer.className = 'pb-cart-drawer';
  drawer.innerHTML =
    '<div class="pb-cart-drawer-head">' +
      '<div><div class="pb-cart-drawer-title">Your cart</div></div>' +
      '<button class="pb-cart-close" onclick="pbCloseCart()">×</button>' +
    '</div>' +
    '<div class="pb-cart-body" id="pb-cart-body"></div>' +
    '<div id="pb-cart-foot" style="padding:16px;border-top:1px solid #e8e8e4;display:none">' +
      '<button class="btn-gold" style="width:100%;padding:12px;font-size:14px;margin-bottom:10px" ' +
        'onclick="document.getElementById(\'pb-cart-quote-form\').classList.toggle(\'open\')">Request quote for all items →</button>' +
      '<div class="pb-cart-quote-form" id="pb-cart-quote-form">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
          '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Name *</label>' +
            '<input id="pb-cq-name" type="text" placeholder="Jane Smith" style="width:100%;padding:8px 10px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
          '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Phone *</label>' +
            '<input id="pb-cq-phone" type="tel" placeholder="(215) 555-0100" style="width:100%;padding:8px 10px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '</div>' +
        '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Email</label>' +
          '<input id="pb-cq-email" type="email" placeholder="jane@example.com" style="width:100%;padding:8px 10px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '<div style="margin-bottom:12px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Notes</label>' +
          '<textarea id="pb-cq-notes" placeholder="Room names, timeline, questions..." rows="2" style="width:100%;padding:8px 10px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit;resize:vertical"></textarea></div>' +
        '<button class="btn-gold" onclick="pbSubmitCartQuote()" style="width:100%;padding:12px;font-size:14px">Send quote →</button>' +
      '</div>' +
      '<div id="pb-cart-quote-sent" style="display:none;text-align:center;padding:16px;background:#EAF3DE;border-radius:10px;font-size:13px;color:#27500A">' +
        '<strong>Quote sent!</strong><br>Justin will follow up shortly.<br>' +
        '<a href="tel:6097421720" style="color:#27500A;font-weight:600">(609) 742-1720</a>' +
      '</div>' +
      '<button onclick="pbClearCart()" style="display:block;width:100%;margin-top:8px;background:none;border:none;font-size:11px;color:#ccc;cursor:pointer;font-family:inherit">Clear cart</button>' +
    '</div>';
  document.body.appendChild(drawer);

  _updateCartBadge();
}

// ============================================================
// MOTOR OPTIONS MODAL
// ============================================================
var _pmmCallback = null;

function pbAddToCartWithMotor(item, isMotorized) {
  if (!isMotorized) { pbAddToCart(item); return; }
  _pmmCallback = function(opts) {
    item.motorized = true;
    item.motorOptions = opts;
    pbAddToCart(item);
  };
  var ov = document.getElementById('pb-motor-overlay');
  if (ov) {
    // reset
    ov.querySelectorAll('.pmm-opt').forEach(function(b){ b.classList.remove('sel'); });
    ['pmm-rechargeable-opts','pmm-hardwire-opts','pmm-cord-opts','pmm-remote-detail'].forEach(function(id){
      var el = document.getElementById(id); if(el) el.style.display='none';
    });
    ov.classList.add('open');
  }
}

function _pmmSel(btn, grpId) {
  document.querySelectorAll('#' + grpId + ' .pmm-opt').forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
}
function _pmmGet(grpId) {
  var s = document.querySelector('#' + grpId + ' .pmm-opt.sel');
  return s ? s.textContent.trim() : '';
}
function _pmmPower(type) {
  document.getElementById('pmm-rechargeable-opts').style.display = type==='rechargeable' ? 'block':'none';
  document.getElementById('pmm-hardwire-opts').style.display     = type==='hardwire'     ? 'block':'none';
}
function _pmmWiring(type) {
  document.getElementById('pmm-cord-opts').style.display = type==='plugin' ? 'block':'none';
}
function _pmmRemote(val) {
  document.getElementById('pmm-remote-detail').style.display = val==='yes' ? 'block':'none';
}
function _pmmConfirm() {
  var power = _pmmGet('pmm-grp-power');
  if (!power) { alert('Please select a power type.'); return; }
  var remote = _pmmGet('pmm-grp-remote');
  if (!remote) { alert('Please choose whether you need a remote.'); return; }
  var opts = { power: power };
  if (power === 'Rechargeable') opts.chargers = _pmmGet('pmm-grp-chargers') || '1';
  if (power === 'Hardwire') {
    opts.wiring = _pmmGet('pmm-grp-wiring');
    if (opts.wiring === 'Line voltage (plug-in)') opts.cord = _pmmGet('pmm-grp-cord') || '6 ft';
  }
  opts.remote = remote === 'Yes' ? 'Yes' : 'No';
  if (remote === 'Yes') {
    opts.channel = _pmmGet('pmm-grp-channel') || 'Single channel';
    opts.remotes = _pmmGet('pmm-grp-remotes') || '1';
  }
  document.getElementById('pb-motor-overlay').classList.remove('open');
  if (_pmmCallback) { _pmmCallback(opts); _pmmCallback = null; }
}

function _initMotorModal() {
  if (document.getElementById('pb-motor-overlay')) return;
  var ov = document.createElement('div');
  ov.id = 'pb-motor-overlay'; ov.className = 'pb-motor-overlay';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('open'); });
  ov.innerHTML =
    '<div class="pb-motor-modal">' +
      '<div class="pb-motor-modal-head">⚡ Motorization options</div>' +
      '<div class="pb-motor-modal-sub">Tell us how you want this shade powered and controlled.</div>' +

      // Power type
      '<div class="pmm-section"><div class="pmm-label">Power type</div>' +
        '<div class="pmm-row" id="pmm-grp-power">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-power\');_pmmPower(\'rechargeable\')">Rechargeable</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-power\');_pmmPower(\'hardwire\')">Hardwire</button>' +
        '</div></div>' +

      // Rechargeable sub
      '<div id="pmm-rechargeable-opts" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Number of chargers</div>' +
        '<div class="pmm-row" id="pmm-grp-chargers">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-chargers\')">1</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">2</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">3</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">4+</button>' +
        '</div></div>' +

      // Hardwire sub
      '<div id="pmm-hardwire-opts" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Wiring type</div>' +
        '<div class="pmm-row" id="pmm-grp-wiring">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-wiring\');_pmmWiring(\'lowv\')">Low voltage</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-wiring\');_pmmWiring(\'plugin\')">Line voltage (plug-in)</button>' +
        '</div>' +
        '<div id="pmm-cord-opts" style="display:none;margin-top:12px">' +
          '<div class="pmm-sub-label">Cord length</div>' +
          '<div class="pmm-row" id="pmm-grp-cord">' +
            '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-cord\')">6 ft</button>' +
            '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-cord\')">10 ft</button>' +
          '</div></div></div>' +

      // Remote
      '<div class="pmm-section"><div class="pmm-label">Do you want a remote?</div>' +
        '<div class="pmm-row" id="pmm-grp-remote">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remote\');_pmmRemote(\'yes\')">Yes</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remote\');_pmmRemote(\'no\')">No</button>' +
        '</div></div>' +

      // Remote detail
      '<div id="pmm-remote-detail" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Channel type</div>' +
        '<div class="pmm-row" id="pmm-grp-channel">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-channel\')">Single channel</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-channel\')">Multi channel</button>' +
        '</div>' +
        '<div class="pmm-note" style="margin-bottom:8px">Single: one remote for all shades together. Multi: control each shade independently.</div>' +
        '<div class="pmm-sub-label" style="margin-top:8px">Number of remotes</div>' +
        '<div class="pmm-row" id="pmm-grp-remotes">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-remotes\')">1</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">2</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">3</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">4+</button>' +
        '</div></div>' +

      // Confirm
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px">' +
        '<button onclick="document.getElementById(\'pb-motor-overlay\').classList.remove(\'open\')" ' +
          'style="padding:11px;border:1.5px solid #e8e8e4;border-radius:8px;background:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit">Cancel</button>' +
        '<button onclick="_pmmConfirm()" class="btn-gold" style="padding:11px;font-size:14px">Add to cart →</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
}

// ---- FILE UPLOAD — auto-injects into every quote form ----
function pbGetFileNames(inputId) {
  var el = document.getElementById(inputId);
  if (!el || !el.files || !el.files.length) return '';
  return Array.from(el.files).map(function(f){ return f.name; }).join(', ');
}
function pbShowFileNames(input, displayId) {
  var el = document.getElementById(displayId);
  if (!el) return;
  var names = Array.from(input.files).map(function(f){ return '📄 ' + f.name; }).join('<br>');
  el.innerHTML = names;
}
function _initFileUploads() {
  // Inject into forms that have a delivery section (all main quote forms)
  document.querySelectorAll('.delivery-section').forEach(function(del) {
    var parent = del.parentElement;
    if (!parent || parent.querySelector('.pb-fu-wrap')) return;
    var btn = parent.querySelector('.btn-gold');
    if (!btn) return;
    var id = 'fu-' + Math.random().toString(36).slice(2, 8);
    var wrap = document.createElement('div');
    wrap.className = 'pb-fu-wrap';
    wrap.style.cssText = 'border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:14px;background:#fafaf8';
    wrap.innerHTML =
      '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
      '<input type="file" id="' + id + '" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
        'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" ' +
        'onchange="pbShowFileNames(this,\'' + id + '-names\')">' +
      '<div id="' + id + '-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
      '<div style="font-size:11px;color:#aaa;margin-top:5px;line-height:1.5">Window photos, room photos, measurements, inspiration — anything that helps. ' +
        'After submitting, email files directly to <a href="mailto:justin@phillyblinds.com" style="color:inherit">justin@phillyblinds.com</a> if needed.</div>';
    btn.before(wrap);
    btn.setAttribute('data-fu-id', id);
  });

  // Also inject into Formspree quick-quote forms (no delivery section)
  document.querySelectorAll('form[id$="-quote-form"],form[id$="-form"]').forEach(function(form) {
    if (form.querySelector('.pb-fu-wrap')) return;
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    var id = 'fu-' + Math.random().toString(36).slice(2, 8);
    var wrap = document.createElement('div');
    wrap.className = 'pb-fu-wrap';
    wrap.style.cssText = 'border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:14px;background:#fafaf8';
    wrap.innerHTML =
      '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
      '<input type="file" name="attachments" id="' + id + '" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
        'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" ' +
        'onchange="pbShowFileNames(this,\'' + id + '-names\')">' +
      '<div id="' + id + '-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
      '<div style="font-size:11px;color:#aaa;margin-top:5px;line-height:1.5">Window photos, room photos, measurements, inspiration — anything that helps.</div>';
    btn.before(wrap);
  });
}

// ---- SHIPPING ESTIMATOR ----
function _calcShipping(zip) {
  var p = parseInt(String(zip).replace(/\D/g,'').padStart(5,'0').substring(0,3));
  if (isNaN(p)) return null;
  var zone = 6;
  if      ((p>=70&&p<=89)||(p>=190&&p<=199))                              zone=1; // PA, NJ, DE
  else if ((p>=10&&p<=69)||(p>=200&&p<=269)||(p>=430&&p<=458)||(p>=400&&p<=427)) zone=2; // NY, NE, MD, VA, OH
  else if ((p>=270&&p<=349)||(p>=460&&p<=499)||(p>=600&&p<=629))          zone=3; // SE, Midwest near
  else if ((p>=350&&p<=399)||(p>=500&&p<=599)||(p>=630&&p<=679))          zone=4; // South, Midwest
  else if ((p>=700&&p<=849))                                               zone=5; // TX, Mountain
  // else zone = 6 — West Coast / HI / AK
  var rates = {
    1:{low:14,high:28,region:'PA / NJ / DE'},
    2:{low:22,high:40,region:'NY / New England / MD / OH'},
    3:{low:32,high:52,region:'Southeast / Midwest'},
    4:{low:42,high:65,region:'South / Midwest'},
    5:{low:55,high:80,region:'Mountain West / TX'},
    6:{low:68,high:98,region:'West Coast / HI / AK'}
  };
  return rates[zone] || rates[6];
}

function _initShippingEstimators() {
  document.querySelectorAll('[id$="-s"].delivery-note').forEach(function(el) {
    if (el.querySelector('.pb-ship-est')) return;
    var wrap = document.createElement('div');
    wrap.className = 'pb-ship-est';
    wrap.style.cssText = 'margin-top:10px;padding:12px 14px;background:#f5f5f3;border-radius:8px;border:1px solid #e0e0dc';
    wrap.innerHTML =
      '<div style="font-size:11px;font-weight:600;color:#444;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">&#128230; Estimate shipping</div>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<input type="text" class="pb-zip-input" inputmode="numeric" maxlength="5" placeholder="Your ZIP code" ' +
          'style="width:130px;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font-size:13px;font-family:inherit;background:#fff">' +
        '<span class="pb-zip-result" style="font-size:13px;color:#555;min-width:140px"></span>' +
      '</div>' +
      '<div style="font-size:10px;color:#aaa;margin-top:6px;line-height:1.5">UPS / FedEx Ground estimate from Huntingdon Valley PA 19006 &nbsp;&middot;&nbsp; Actual rate confirmed at order</div>';
    el.appendChild(wrap);
    var input = wrap.querySelector('.pb-zip-input');
    var result = wrap.querySelector('.pb-zip-result');
    input.addEventListener('input', function() {
      var zip = this.value.replace(/\D/g,'');
      if (zip.length === 5) {
        var est = _calcShipping(zip);
        if (est) result.innerHTML = '<strong style="color:#1C1510">~$'+est.low+' – $'+est.high+'</strong> <span style="font-size:11px;color:#888">('+est.region+')</span>';
      } else {
        result.textContent = '';
      }
    });
  });
}

// ============================================================
// CONTACT / CONSULTATION PANEL
// ============================================================
function _initContactPanel() {
  if (document.getElementById('pb-contact-overlay')) return;
  var s = document.createElement('style');
  s.textContent =
    '.pb-co{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:700;align-items:center;justify-content:center;padding:16px}' +
    '.pb-co.open{display:flex}' +
    '.pb-cp{background:#fff;border-radius:16px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;padding:28px 24px;position:relative}' +
    '.pb-cp-close{position:absolute;top:14px;right:14px;background:none;border:none;font-size:24px;cursor:pointer;color:#aaa;line-height:1;font-family:inherit}.pb-cp-close:hover{color:#333}' +
    '.pb-cp-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--gold);background:var(--espresso);padding:4px 10px;border-radius:20px;margin-bottom:12px}' +
    '.pb-cp-title{font-size:20px;font-weight:700;color:#1C1510;margin-bottom:6px;line-height:1.2}' +
    '.pb-cp-note{font-size:13px;color:#666;line-height:1.6;margin-bottom:18px}' +
    '.pb-cp-phone-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:#1C1510;color:#2DE0C1;text-decoration:none;font-size:22px;font-weight:700;padding:14px;border-radius:10px;margin-bottom:8px;transition:opacity .15s}.pb-cp-phone-btn:hover{opacity:.85}' +
    '.pb-cp-sub{text-align:center;font-size:11px;color:#888;margin-bottom:10px}' +
    '.pb-cp-email-link{display:block;text-align:center;font-size:14px;color:#1C1510;font-weight:600;text-decoration:none;margin-bottom:18px}.pb-cp-email-link:hover{text-decoration:underline}' +
    '.pb-cp-or{text-align:center;font-size:12px;color:#bbb;margin-bottom:14px;display:flex;align-items:center;gap:8px}.pb-cp-or::before,.pb-cp-or::after{content:"";flex:1;height:1px;background:#e8e8e4}';
  document.head.appendChild(s);
  var ov = document.createElement('div');
  ov.id = 'pb-contact-overlay'; ov.className = 'pb-co';
  ov.addEventListener('click', function(e){ if(e.target===ov) pbCloseContact(); });
  ov.innerHTML =
    '<div class="pb-cp">' +
      '<button class="pb-cp-close" onclick="pbCloseContact()">&#215;</button>' +
      '<div class="pb-cp-badge">Free &middot; No obligation</div>' +
      '<div class="pb-cp-title">Free Consultation &amp; Custom Quote</div>' +
      '<div class="pb-cp-note" id="pb-cp-hint">Tell us what you need &mdash; we\'ll measure, advise, and quote at no charge.</div>' +
      '<a href="tel:6097421720" class="pb-cp-phone-btn">&#128222; (609) 742-1720</a>' +
      '<div class="pb-cp-sub">Justin Healy &mdash; call or text 24/7</div>' +
      '<a href="mailto:justin@phillyblinds.com" class="pb-cp-email-link">justin@phillyblinds.com</a>' +
      '<div class="pb-cp-or">or send a message</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Name *</label>' +
          '<input id="pb-cp-name" type="text" placeholder="Jane Smith" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Phone *</label>' +
          '<input id="pb-cp-phone-inp" type="tel" placeholder="(215) 555-0100" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '</div>' +
      '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">What are you interested in?</label>' +
        '<input id="pb-cp-product" type="text" placeholder="e.g. Pirouette shadings, specialty shutters, oversized shade..." style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Approx. width (inches)</label>' +
          '<input id="pb-cp-width" type="number" placeholder="e.g. 48" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Approx. height (inches)</label>' +
          '<input id="pb-cp-height" type="number" placeholder="e.g. 72" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '</div>' +
      '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Notes</label>' +
        '<textarea id="pb-cp-notes" rows="2" placeholder="Window sizes, room, timeline, questions..." style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit;resize:vertical"></textarea></div>' +
      '<div style="border:1.5px dashed #ddd;border-radius:9px;padding:12px 14px;margin-bottom:14px;background:#fafaf8">' +
        '<div style="font-size:11px;font-weight:600;color:#444;margin-bottom:6px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
        '<input type="file" id="pb-cp-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
          'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer" ' +
          'onchange="pbCpShowFiles()">' +
        '<div id="pb-cp-file-names" style="font-size:11px;color:#555;margin-top:5px;line-height:1.7"></div>' +
        '<div style="font-size:10px;color:#aaa;margin-top:4px">Photos of your windows, room, inspiration — anything that helps.</div>' +
      '</div>' +
      '<button onclick="pbSubmitContact()" style="width:100%;background:#1C1510;color:#2DE0C1;border:none;border-radius:8px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Request free consultation &#8594;</button>' +
      '<div id="pb-cp-sent" style="display:none;text-align:center;padding:16px;background:#EAF3DE;border-radius:10px;margin-top:10px;font-size:13px;color:#27500A">' +
        '<strong>Request sent!</strong> Justin will be in touch soon.<br>' +
        'Urgent? <a href="tel:6097421720" style="color:#27500A;font-weight:700">(609) 742-1720</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
}
function pbShowContact(productHint) {
  _initContactPanel();
  var hint = document.getElementById('pb-cp-hint');
  var prod = document.getElementById('pb-cp-product');
  var sent = document.getElementById('pb-cp-sent');
  if (productHint && hint) hint.textContent = productHint + ' — we\'ll measure, advise, and quote at no charge.';
  if (productHint && prod)  prod.value = productHint;
  if (sent) sent.style.display = 'none';
  document.getElementById('pb-contact-overlay').classList.add('open');
}
function pbCloseContact() {
  var ov = document.getElementById('pb-contact-overlay');
  if (ov) ov.classList.remove('open');
}
function pbCpShowFiles() {
  var inp = document.getElementById('pb-cp-files');
  var disp = document.getElementById('pb-cp-file-names');
  if (!inp || !disp) return;
  var names = Array.from(inp.files).map(function(f){ return '📄 '+f.name; }).join('<br>');
  disp.innerHTML = names;
}
function pbSubmitContact() {
  var name  = (document.getElementById('pb-cp-name')      || {}).value || '';
  var phone = (document.getElementById('pb-cp-phone-inp') || {}).value || '';
  if (!name.trim() || !phone.trim()) { alert('Please enter your name and phone number.'); return; }
  var prod  = (document.getElementById('pb-cp-product') || {}).value || '';
  var notes = (document.getElementById('pb-cp-notes')   || {}).value || '';
  var filesEl = document.getElementById('pb-cp-files');
  var fileNames = filesEl && filesEl.files.length ?
    '\n\nFiles to send: '+Array.from(filesEl.files).map(function(f){return f.name;}).join(', ')+
    '\n(Please email these to justin@phillyblinds.com)' : '';
  var w = (document.getElementById('pb-cp-width')  || {}).value || '';
  var h = (document.getElementById('pb-cp-height') || {}).value || '';
  var dims = (w || h) ? '\nApprox. size: '+(w?w+'"W ':'')+' '+(h?h+'"H':'') : '';
  var body  = 'CONSULTATION REQUEST\n\nName: '+name+'\nPhone: '+phone+
    '\n\nInterested in: '+(prod||'—')+dims+'\n\nNotes:\n'+(notes||'None')+fileNames;
  window.location.href='mailto:justin@phillyblinds.com?subject='+
    encodeURIComponent('Free Consultation — '+name)+'&body='+encodeURIComponent(body);
  document.getElementById('pb-cp-sent').style.display='block';
}

// ---- MEASURE HELP MODAL ----
function _initMeasureHelp(htmlContent, measurePageUrl) {
  if (document.getElementById('pb-help-btn')) return;
  measurePageUrl = measurePageUrl || '../pages/measure.html';

  const style = document.createElement('style');
  style.textContent = `
    #pb-help-btn{position:fixed;bottom:90px;right:20px;z-index:400;width:44px;height:44px;border-radius:50%;background:var(--espresso);border:2px solid var(--gold);color:var(--gold);font-size:18px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(0,0,0,0.3);transition:transform 0.15s}
    #pb-help-btn:hover{transform:scale(1.1)}
    #pb-help-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:410;align-items:flex-end;justify-content:center}
    #pb-help-overlay.open{display:flex}
    @media(min-width:600px){#pb-help-overlay{align-items:center}}
    #pb-help-modal{background:#fff;width:100%;max-width:520px;border-radius:16px 16px 0 0;max-height:82vh;overflow-y:auto;padding:24px;position:relative}
    @media(min-width:600px){#pb-help-modal{border-radius:16px;max-height:80vh}}
    #pb-help-close{position:absolute;top:14px;right:14px;background:none;border:none;font-size:22px;cursor:pointer;color:#999;line-height:1}
    #pb-help-close:hover{color:#333}
    .pb-help-heading{font-size:17px;font-weight:600;color:var(--espresso);margin-bottom:4px}
    .pb-help-sub{font-size:12px;color:#888;margin-bottom:20px}
    .pb-help-section{margin-bottom:18px}
    .pb-help-section h4{font-size:13px;font-weight:600;color:var(--espresso);margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #f0f0ec}
    .pb-help-section ol,.pb-help-section ul{padding-left:18px;font-size:13px;color:#444;line-height:1.8}
    .pb-help-tip{background:#FBF7F0;border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:10px 13px;font-size:12px;color:#555;line-height:1.6;margin-top:10px}
    .pb-help-full-link{display:block;text-align:center;margin-top:16px;font-size:13px;color:var(--gold);text-decoration:none;font-weight:500}
    .pb-help-full-link:hover{text-decoration:underline}
    .pb-help-call{display:flex;align-items:center;gap:10px;background:var(--espresso);border-radius:10px;padding:14px 16px;margin-top:16px}
    .pb-help-call a{color:var(--gold);font-weight:700;text-decoration:none;font-size:14px}
    .pb-help-call span{font-size:12px;color:#9A8570}
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'pb-help-btn';
  btn.setAttribute('aria-label', 'Measuring help');
  btn.innerHTML = '?';
  document.body.appendChild(btn);

  const overlay = document.createElement('div');
  overlay.id = 'pb-help-overlay';
  overlay.innerHTML = `
    <div id="pb-help-modal" role="dialog" aria-modal="true" aria-label="Measuring guide">
      <button id="pb-help-close" aria-label="Close help">&times;</button>
      ${htmlContent}
      <a class="pb-help-full-link" href="${measurePageUrl}">View full measuring guide &rarr;</a>
      <div class="pb-help-call">
        <div>
          <a href="tel:6097421720">&#128222; (609) 742-1720</a>
          <div><span>Call or text Justin — he'll walk you through it, 24/7</span></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  btn.addEventListener('click', () => overlay.classList.add('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.getElementById('pb-help-close').addEventListener('click', () => overlay.classList.remove('open'));
}

// ---- MOBILE STICKY CALL BAR ----
function _initMobileBar(consultHref) {
  if (document.getElementById('pb-mobile-bar')) return;
  var bar = document.createElement('div');
  bar.id = 'pb-mobile-bar';
  bar.className = 'pb-mobile-bar';
  bar.innerHTML =
    '<a href="tel:6097421720" class="pb-mb-call" aria-label="Call (609) 742-1720">&#128222; Call Justin</a>' +
    '<a href="' + consultHref + '" class="pb-mb-book" aria-label="Book free consultation">Book free visit</a>';
  document.body.appendChild(bar);
}

// ---- CHATBOT ----
function _initChatbot() {
  if (document.getElementById('pb-chat')) return;

  const widget = document.createElement('div');
  widget.id = 'pb-chat';
  widget.innerHTML = `
    <button class="pb-chat-bubble" id="pb-chat-bubble" aria-label="Chat with Philly Blinds support">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <span class="pb-chat-badge" id="pb-chat-badge">1</span>
    </button>
    <div class="pb-chat-panel" id="pb-chat-panel" hidden>
      <div class="pb-chat-header">
        <div class="pb-chat-header-info">
          <div class="pb-chat-avatar">PB</div>
          <div>
            <div class="pb-chat-name">Philly Blinds Support</div>
            <div class="pb-chat-status">&#9679; Online now</div>
          </div>
        </div>
        <a href="tel:6097421720" class="pb-chat-human-btn">&#128222; Talk to Justin</a>
      </div>
      <div class="pb-chat-messages" id="pb-chat-messages"></div>
      <div class="pb-chat-footer">
        <input type="text" id="pb-chat-input" placeholder="Ask about shades, pricing, installation..." autocomplete="off" />
        <button id="pb-chat-send" aria-label="Send">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  const bubble  = document.getElementById('pb-chat-bubble');
  const panel   = document.getElementById('pb-chat-panel');
  const badge   = document.getElementById('pb-chat-badge');
  const msgsEl  = document.getElementById('pb-chat-messages');
  const input   = document.getElementById('pb-chat-input');
  const sendBtn = document.getElementById('pb-chat-send');
  const history = [];

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'pb-msg pb-msg-' + role;
    div.textContent = text;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return div;
  }

  addMsg('Hi! I\'m the Philly Blinds assistant. Ask me about shades, drapery, shutters, motorization, or pricing — or tap Talk to Justin above to reach a real person right away.', 'bot');

  bubble.addEventListener('click', function() {
    if (panel.hasAttribute('hidden')) {
      panel.removeAttribute('hidden');
      badge.style.display = 'none';
      input.focus();
    } else {
      panel.setAttribute('hidden', '');
    }
  });

  async function send() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    input.value = '';
    sendBtn.disabled = true;

    addMsg(text, 'user');
    history.push({ role: 'user', content: text });

    const typing = addMsg('Typing…', 'typing');

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await resp.json();
      typing.remove();
      const reply = data.content || 'Sorry, something went wrong. Please call (609) 742-1720.';
      addMsg(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch (e) {
      typing.remove();
      addMsg('Sorry, I had a connection issue. Call or text Justin at (609) 742-1720 — available 24/7!', 'bot');
    }

    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') send(); });
}
