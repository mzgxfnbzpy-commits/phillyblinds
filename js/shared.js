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
      <a class="nav-drawer-cta" href="${consultHref}">Free consultation</a>
    </div>
  `;
  _injectHead(isHome);
  _initChatbot();
}

function renderFooter(isHome) {
  const pre = isHome ? 'pages/' : '../pages/';
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
