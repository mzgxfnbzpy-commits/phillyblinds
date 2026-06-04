// Philly Blinds — Quote Request API
// POST /api/quote
// Required Vercel env vars:
//   RESEND_API_KEY  — from resend.com (free account)
// RESEND_FROM is now hardcoded — no env var needed
//                     If domain not yet verified, use any @resend.dev address as temp:
//                     "Philly Blinds <onboarding@resend.dev>"
// Domain verification: resend.com → Domains → Add phillyblinds.com → add the DNS records.

const TEAM_EMAILS = [
  'justin@phillyblinds.com',
  'sarah@phillyblinds.com',
  'mike@phillyblinds.com',
  'tarin@phillyblinds.com'
];
// Strip any accidental surrounding quotes Vercel may store (e.g. "Name <email>" → Name <email>)
const _rawFrom    = (process.env.RESEND_FROM || 'Philly Blinds <noreply@phillyblinds.com>').trim().replace(/^["']|["']$/g, '');
const FROM_QUOTES  = _rawFrom;
const FROM_CONFIRM = _rawFrom;
const PHONE        = '(609) 742-1720';
const BRAND        = 'Philly Blinds';
const SITE_URL     = 'phillyblinds.com';
const EMAIL_DIRECT = 'justin@phillyblinds.com';

const ALLOWED_ORIGINS = [
  'https://www.phillyblinds.com',
  'https://phillyblinds.com',
  'https://phillyblinds.vercel.app'
];

function isAllowedOrigin(origin) {
  if (!origin) return true; // same-origin / non-browser requests
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https:\/\/[a-z0-9-]+-[a-z0-9]+-[a-z0-9]+\.vercel\.app$/.test(origin)) return true; // preview URLs
  return false;
}

// ── Rate limiting (in-memory, per IP, 5 requests / 10 min) ──────────────────
const _rateMap = new Map();
function _checkRate(ip) {
  const now = Date.now();
  const WINDOW = 10 * 60 * 1000;
  const LIMIT  = 5;
  // Purge entries older than 2× the window to prevent unbounded growth
  if (_rateMap.size > 500) {
    for (const [k, v] of _rateMap) { if (now - v.t > WINDOW * 2) _rateMap.delete(k); }
  }
  const entry = _rateMap.get(ip);
  if (!entry || now - entry.t > WINDOW) { _rateMap.set(ip, { t: now, n: 1 }); return true; }
  if (entry.n >= LIMIT) return false;
  entry.n++;
  return true;
}

// ── Per-field length limits ───────────────────────────────────────────────────
const FIELD_LIMITS = { name: 200, email: 254, phone: 30, product: 200, notes: 5000, sourceUrl: 500 };
function _truncate(val, key) { return val ? String(val).slice(0, FIELD_LIMITS[key]) : val; }

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsOrigin = isAllowedOrigin(origin) ? (origin || ALLOWED_ORIGINS[0]) : ALLOWED_ORIGINS[0];
  res.setHeader('Access-Control-Allow-Origin', corsOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Vary', 'Origin');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit by IP
  const ip = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  if (!_checkRate(ip)) return res.status(429).json({ error: 'Too many requests. Please wait a few minutes.' });

  const _b = req.body || {};
  const name       = _truncate(_b.name,      'name');
  const email      = _truncate(_b.email,     'email');
  const phone      = _truncate(_b.phone,     'phone');
  const product    = _truncate(_b.product,   'product');
  const notes      = _truncate(_b.notes,     'notes');
  const _rawSourceUrl = _truncate(_b.sourceUrl, 'sourceUrl');
  // Only allow http/https URLs — blocks javascript: scheme injection in email hrefs
  const sourceUrl = (_rawSourceUrl && /^https?:\/\//i.test(_rawSourceUrl.trim())) ? _rawSourceUrl : null;
  const selections = Array.isArray(_b.selections) ? _b.selections.slice(0, 60) : [];
  const estimate   = _b.estimate;
  const { _hp, _t } = _b;

  // Honeypot — bots fill hidden fields, humans don't
  if (_hp && _hp.trim().length > 0) return res.status(200).json({ ok: true }); // silent reject

  // Timing check — reject if _t missing or form submitted in under 2 seconds (bot speed)
  if (typeof _t !== 'number' || _t < 2000) return res.status(200).json({ ok: true }); // silent reject

  // Basic payload size guard
  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > 20000) return res.status(413).json({ error: 'Request too large.' });

  if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required.' });
  const hasValidEmail = email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[quote] RESEND_API_KEY not set in Vercel env vars.');
    return res.status(503).json({
      error: `Email service not yet configured. Please contact us directly at ${EMAIL_DIRECT} or call ${PHONE}.`
    });
  }

  const safeName    = String(name).trim().replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const safeEmail   = String(email || '').trim().replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const safePhone   = phone ? String(phone).trim().replace(/</g,'&lt;') : null;
  const safeProduct = product ? String(product).trim().replace(/</g,'&lt;') : 'Custom Window Treatment';
  const safeNotes   = notes ? String(notes).trim().replace(/</g,'&lt;').replace(/\n/g,'<br>') : null;
  const firstName   = safeName.split(' ')[0];

  const now     = new Date();
  const dateStr = now.toLocaleString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit', hour12: true
  });

  const rows = selections.map(function(s) {
    var lbl = String(s.label || '').slice(0, 100).replace(/</g,'&lt;').replace(/>/g,'&gt;');
    var val = String(s.value || '').slice(0, 500).replace(/</g,'&lt;').replace(/>/g,'&gt;');
    return '<tr><td style="padding:6px 14px 6px 0;color:#666;font-size:13px;white-space:nowrap;vertical-align:top">' + lbl + '</td>' +
            '<td style="padding:6px 0;font-weight:600;font-size:13px;color:#1a1a1a">' + val + '</td></tr>';
  }).join('');

  const teamHtml = `<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f5f4f1">
<div style="max-width:600px;margin:24px auto">
  <div style="background:#1C1510;padding:20px 26px;border-radius:10px 10px 0 0">
    <div style="color:#2DE0C1;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">New Quote Request</div>
    <div style="color:#F5ECD7;font-size:21px;font-weight:700">${BRAND}</div>
    <div style="color:#9A8570;font-size:12px;margin-top:2px">${dateStr}</div>
  </div>
  <div style="background:#fff;padding:26px;border:1px solid #e5e5e3;border-top:none">

    <div style="background:#E8FDFB;border-left:4px solid #2DE0C1;padding:16px 18px;border-radius:0 8px 8px 0;margin-bottom:22px">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#2DE0C1;margin-bottom:12px">Customer Information</div>
      <table style="border-collapse:collapse">
        <tr><td style="padding:4px 14px 4px 0;color:#888;font-size:13px;white-space:nowrap">Name</td>   <td style="font-size:15px;font-weight:700;color:#1C1510">${safeName}</td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#888;font-size:13px;white-space:nowrap">Email</td>  <td><a href="mailto:${safeEmail}" style="font-size:14px;color:#1C1510">${safeEmail}</a></td></tr>
        <tr><td style="padding:4px 14px 4px 0;color:#888;font-size:13px;white-space:nowrap">Phone</td>  <td style="font-size:14px;font-weight:600;color:#1C1510">${safePhone || '<em style="color:#aaa;font-weight:400">Not provided</em>'}</td></tr>
      </table>
    </div>

    <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#888;margin-bottom:8px">Product</div>
    <div style="font-size:19px;font-weight:700;color:#1C1510;margin-bottom:18px">${safeProduct}</div>

    ${rows ? `<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#888;margin-bottom:8px">Full Configuration</div>
    <div style="border:1px solid #e8e8e4;border-radius:8px;overflow:hidden;margin-bottom:18px">
      <table style="border-collapse:collapse;width:100%">${rows}</table>
    </div>` : ''}

    ${estimate ? `<div style="background:#FBF7F0;border:1.5px solid #C8973F;border-radius:10px;padding:16px 18px;margin-bottom:18px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#C8973F">Customer's Estimate</div>
      <div style="font-size:11px;color:#aaa;margin-top:3px">Estimate only — confirm final price before invoicing</div></div>
      <div style="font-size:26px;font-weight:700;color:#1C1510">${String(estimate).replace(/</g,'&lt;')}</div>
    </div>` : ''}

    ${safeNotes ? `<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#888;margin-bottom:8px">Customer Notes</div>
    <div style="background:#f9f9f7;padding:12px 16px;border-radius:8px;font-size:13px;color:#333;line-height:1.7;margin-bottom:18px">${safeNotes}</div>` : ''}

    <div style="border-top:1px solid #e8e8e4;padding-top:14px;font-size:11px;color:#bbb">
      Submitted via ${SITE_URL} &nbsp;·&nbsp; Reply-To: <a href="mailto:${safeEmail}" style="color:#bbb">${safeEmail}</a>
      ${sourceUrl ? `&nbsp;·&nbsp; Page: <a href="${String(sourceUrl).replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}" style="color:#bbb">${String(sourceUrl).replace(/</g,'&lt;').replace(/>/g,'&gt;')}</a>` : ''}
    </div>
  </div>
</div></body></html>`;

  const customerHtml = `<!DOCTYPE html><html><body style="margin:0;padding:0;font-family:system-ui,sans-serif;background:#f5f4f1">
<div style="max-width:580px;margin:24px auto">
  <div style="background:#1C1510;padding:20px 26px;border-radius:10px 10px 0 0">
    <div style="color:#2DE0C1;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px">Quote Request Received</div>
    <div style="color:#F5ECD7;font-size:21px;font-weight:700">${BRAND}</div>
  </div>
  <div style="background:#fff;padding:26px;border:1px solid #e5e5e3;border-top:none">
    <p style="font-size:17px;font-weight:600;color:#1C1510;margin:0 0 14px">Hi ${firstName}, we received your quote request!</p>
    <p style="font-size:14px;color:#444;line-height:1.7;margin:0 0 20px">Our team has your full configuration for <strong>${safeProduct}</strong> and we're preparing your custom quote now.</p>
    ${estimate ? `<div style="background:#FBF7F0;border-radius:10px;padding:14px 18px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center">
      <div><div style="font-size:11px;font-weight:700;color:#C8973F;text-transform:uppercase;letter-spacing:1px">Your Estimate</div>
      <div style="font-size:11px;color:#aaa;margin-top:2px">Estimate only — subject to final measurement</div></div>
      <div style="font-size:22px;font-weight:700;color:#1C1510">${String(estimate).replace(/</g,'&lt;')}</div>
    </div>` : ''}

    <div style="background:#E8FDFB;border-left:4px solid #2DE0C1;padding:16px 18px;border-radius:0 8px 8px 0;margin-bottom:22px">
      <div style="font-size:13px;font-weight:700;color:#1C1510;margin-bottom:10px">What happens next:</div>
      <ul style="margin:0;padding-left:18px;font-size:13px;color:#555;line-height:2.1">
        <li>We review your specifications and build your custom quote</li>
        <li>You'll hear back by email${safePhone ? ' and phone' : ''} — typically within a few hours</li>
        <li>If anything needs clarification, we'll reach out directly</li>
      </ul>
    </div>

    <div style="background:#f9f9f7;border-radius:8px;padding:14px 16px;margin-bottom:22px">
      <div style="font-size:12px;font-weight:700;color:#1C1510;margin-bottom:6px">Need to reach us sooner?</div>
      <div style="font-size:13px;color:#444;line-height:1.8">
        Call or text Justin: <a href="tel:6097421720" style="color:#2DE0C1;font-weight:700">${PHONE}</a> — 24/7<br>
        Email: <a href="mailto:${EMAIL_DIRECT}" style="color:#2DE0C1">${EMAIL_DIRECT}</a>
      </div>
    </div>

    <p style="font-size:12px;color:#999;line-height:1.7;margin:0">
      <strong>Privacy note:</strong> We will <u>not</u> send you marketing emails, spam your phone, or share your contact information with any third party.
      This email is a one-time confirmation of your quote request.
    </p>
  </div>
  <div style="padding:14px 26px;font-size:11px;color:#aaa;text-align:center">
    ${BRAND} &nbsp;·&nbsp; Michael J. Healy Installations LLC &nbsp;·&nbsp; ${PHONE}<br>
    Huntingdon Valley, PA &nbsp;·&nbsp; Serving Philadelphia, South Jersey, Salt Lake City &amp; beyond
  </div>
</div></body></html>`;

  async function sendEmail(payload) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!r.ok) {
      const txt = await r.text();
      throw new Error('Resend error ' + r.status + ': ' + txt);
    }
    return r.json();
  }

  try {
    await sendEmail({
      from: FROM_QUOTES,
      to: TEAM_EMAILS,
      reply_to: hasValidEmail ? safeEmail : undefined,
      subject: `📋 Quote Request — ${safeName} — ${safeProduct} — ${dateStr}`,
      html: teamHtml
    });

    if (hasValidEmail) {
      await sendEmail({
        from: FROM_CONFIRM,
        to: [safeEmail],
        subject: `We received your quote request — ${BRAND}`,
        html: customerHtml
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[quote] Send error:', err.message);
    return res.status(500).json({
      error: 'Email send failed.',
      fallback: `Please email ${EMAIL_DIRECT} or call ${PHONE}.`
    });
  }
};
