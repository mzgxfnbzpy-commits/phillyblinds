// ============================================================
// Philly Blinds — Shared Components
// ============================================================

function renderNav(activePage) {
  const pages = [
    { href: '../pages/shades.html', label: 'Shades & blinds' },
    { href: '../pages/drapery.html', label: 'Drapery & hardware' },
    { href: '../pages/roman-shades.html', label: 'Roman shades' },
    { href: '../pages/shutters.html', label: 'Shutters' },
    { href: '../pages/gallery.html', label: 'Our work' },
    { href: '../pages/measure.html', label: 'How to measure' },
    { href: '../pages/about.html', label: 'About' },
    { href: '../pages/fabric-calculator.html', label: 'Fabric calculator' },
  ];
  const isHome = activePage === 'home';
  const prefix = isHome ? 'pages/' : '../pages/';

  document.getElementById('site-nav').innerHTML = `
    <a class="nav-logo" href="${isHome ? 'index.html' : '../index.html'}">Philly<em>Blinds</em></a>
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
      <a class="nav-cta" href="${isHome ? 'pages/consult.html' : '../pages/consult.html'}">Free consultation</a>
    </div>
  `;
}

function renderFooter(isHome) {
  const pre = isHome ? 'pages/' : '../pages/';
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">Philly<em>Blinds</em></div>
        <div class="footer-tagline">Professional window treatment installation across Philadelphia &amp; surrounding areas.</div>
        <div class="footer-phone">(609) 742-1720</div>
      </div>
      <div class="footer-col">
        <h4>Shades</h4>
        <a href="${pre}shades.html">Roller shades</a>
        <a href="${pre}shades.html">Cellular shades</a>
        <a href="${pre}shades.html">Zebra shades</a>
        <a href="${pre}shades.html">Woven wood</a>
        <a href="${pre}shades.html">Silhouette / Pirouette</a>
      </div>
      <div class="footer-col">
        <h4>Drapery</h4>
        <a href="${pre}drapery.html">Custom drapery</a>
        <a href="${pre}drapery.html">Drapery hardware</a>
        <a href="${pre}roman-shades.html">Roman shades</a>
      </div>
      <div class="footer-col">
        <h4>Premium</h4>
        <a href="${pre}shutters.html">Plantation shutters</a>
        <a href="${pre}shades.html">Hunter Douglas</a>
      </div>
      <div class="footer-col">
        <h4>Help</h4>
        <a href="${pre}measure.html">How to measure</a>
        <a href="${pre}gallery.html">Our work</a>
        <a href="${pre}consult.html">Book consultation</a>
        <a href="${pre}about.html">About us</a>
      </div>
    </div>
    <div class="footer-disc">Blindznation is an independent business providing professional installation and consulting services. Product names, logos, and trademarks are the property of their respective owners and are used for identification purposes only. Blindznation is not affiliated with, endorsed by, or sponsored by any manufacturer.</div>
  `;
}

// Opt button toggle helper
function selOpt(el, groupId) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}
function getOpt(groupId) {
  const s = document.querySelector('#' + groupId + ' .opt-btn.sel');
  return s ? s.textContent.trim() : '—';
}
