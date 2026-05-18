/**
 * PHILLY BLINDS — SHIPPING REFERENCE CHART
 * Origin: Huntingdon Valley, PA 19006
 * Carrier: UPS Ground / FedEx Home Delivery (comparable rates)
 * Strategy: OVER-ESTIMATE — all figures include buffer so customer is never surprised
 * Last updated: 2026-05
 *
 * HOW DIMENSIONAL WEIGHT WORKS:
 *   Dim weight (lbs) = (L × W × H) / 139
 *   Billable weight = MAX(actual weight, dim weight)
 *   Packages over 48" L incur Additional Handling surcharge (~$14)
 *   Packages over 108" (L + 2×W + 2×H) are "Oversize" (~$57 extra)
 *
 * ZONE MAP from 19006:
 *   Zone 2: PA, NJ, DE, MD            (0–150 mi)
 *   Zone 3: NY, CT, VA, WV, OH        (150–300 mi)
 *   Zone 4: NC, SC, KY, IN, MI        (300–600 mi)
 *   Zone 5: GA, FL, TN, AL, IL, WI    (600–1000 mi)
 *   Zone 6: TX, AR, MO, KS, NE, CO    (1000–1400 mi)
 *   Zone 7: AZ, NM, CA (near)         (1400–1800 mi)
 *   Zone 8: WA, OR, ID, NV, HI, AK    (1800+ mi)
 */

// ── ZONE LOOKUP BY STATE ──────────────────────────────────────────────────────
const STATE_ZONES = {
  // Zone 2 — local
  PA:2, NJ:2, DE:2, MD:2,
  // Zone 3
  NY:3, CT:3, VA:3, WV:3, OH:3, RI:3, MA:3, NH:3, VT:3, ME:3,
  // Zone 4
  NC:4, SC:4, KY:4, IN:4, MI:4, DC:4,
  // Zone 5
  GA:5, FL:5, TN:5, AL:5, IL:5, WI:5, MN:5, IA:5, MO:5,
  // Zone 6
  TX:6, LA:6, AR:6, KS:6, NE:6, SD:6, ND:6, OK:6, CO:6, WY:6, MT:6,
  // Zone 7
  AZ:7, NM:7, CA:7, UT:7, ID:7, NV:7,
  // Zone 8
  WA:8, OR:8, AK:8, HI:8
};

// ── BASE GROUND RATE TABLE (billable weight × zone) ──────────────────────────
// Over-estimated by ~15% buffer. Includes residential surcharge.
// Rows = billable weight (lbs), Cols = zones 2-8
const GROUND_RATES = {
  //       Z2    Z3    Z4    Z5    Z6    Z7    Z8
  1:     [12,   14,   16,   19,   22,   25,   28],
  2:     [13,   15,   17,   21,   24,   27,   31],
  3:     [14,   16,   19,   23,   26,   30,   34],
  4:     [15,   17,   21,   25,   29,   33,   37],
  5:     [16,   19,   23,   27,   32,   36,   41],
  6:     [17,   20,   25,   29,   34,   39,   44],
  7:     [18,   22,   27,   32,   37,   42,   48],
  8:     [19,   23,   29,   34,   40,   46,   52],
  10:    [21,   26,   32,   38,   44,   51,   58],
  12:    [23,   29,   36,   43,   50,   57,   65],
  15:    [26,   33,   41,   49,   57,   65,   74],
  20:    [31,   39,   49,   58,   68,   78,   89],
  25:    [36,   46,   57,   68,   80,   92,   104],
  30:    [41,   52,   65,   78,   91,   105,  119],
  40:    [51,   65,   81,   97,   114,  131,  149],
  50:    [61,   78,   97,   116,  137,  157,  178],
  70:    [81,   103,  129,  154,  181,  208,  236],
  100:   [111,  141,  176,  211,  248,  285,  323],
};

// ── SURCHARGES ────────────────────────────────────────────────────────────────
const SURCHARGES = {
  residential:          5.50,  // per package, residential delivery
  additionalHandling:   14.00, // packages > 48" on longest side
  oversize:             57.00, // girth+length > 108"
  signatureRequired:    5.50,  // optional, recommended for large orders
};

// ── PRODUCT WEIGHT & DIMENSION REFERENCE ─────────────────────────────────────
// These are OVER-ESTIMATES (add 20% buffer to real weights)
// Format: { weightLbs, lengthIn, widthIn, heightIn, notes }
const PRODUCT_DIMS = {

  // ── ROLLER SHADES ─────────────────────────────────────────────────────
  'roller-shade-small':   { w:3,  l:36,  d:6,  h:6,  label:'Roller Shade under 36"W',   notes:'Standard headrail, fabric rolled up' },
  'roller-shade-medium':  { w:5,  l:60,  d:7,  h:7,  label:'Roller Shade 36"–60"W',     notes:'Typical bedroom/office roller' },
  'roller-shade-large':   { w:8,  l:84,  d:8,  h:8,  label:'Roller Shade 60"–84"W',     notes:'Wide window roller, may need extra handling' },
  'roller-shade-xlarge':  { w:12, l:108, d:9,  h:9,  label:'Roller Shade 84"–108"W',    notes:'Oversize — additional handling likely' },

  // ── CELLULAR / HONEYCOMB SHADES ───────────────────────────────────────
  'cellular-small':       { w:2,  l:36,  d:5,  h:5,  label:'Cellular Shade under 36"W', notes:'Light, compact headrail' },
  'cellular-medium':      { w:4,  l:60,  d:6,  h:6,  label:'Cellular Shade 36"–60"W',   notes:'Standard cellular' },
  'cellular-large':       { w:6,  l:84,  d:7,  h:7,  label:'Cellular Shade 60"–84"W',   notes:'Wide cellular' },
  'cellular-xlarge':      { w:9,  l:108, d:8,  h:8,  label:'Cellular Shade 84"–96"W',   notes:'Additional handling likely' },

  // ── ZEBRA / DUAL SHEER SHADES ─────────────────────────────────────────
  'zebra-small':          { w:4,  l:36,  d:6,  h:6,  label:'Zebra Shade under 36"W',    notes:'Cassette adds weight vs standard roller' },
  'zebra-medium':         { w:7,  l:60,  d:8,  h:8,  label:'Zebra Shade 36"–60"W',      notes:'Typical zebra/dual sheer' },
  'zebra-large':          { w:10, l:84,  d:9,  h:9,  label:'Zebra Shade 60"–84"W',      notes:'Heavy cassette + fabric' },
  'zebra-xlarge':         { w:14, l:108, d:10, h:10, label:'Zebra Shade 84"–108"W',     notes:'Oversize — additional handling' },

  // ── ROMAN SHADES ──────────────────────────────────────────────────────
  'roman-small':          { w:4,  l:36,  d:6,  h:8,  label:'Roman Shade under 36"W',    notes:'Fabric folded, headrail' },
  'roman-medium':         { w:7,  l:60,  d:8,  h:10, label:'Roman Shade 36"–60"W',      notes:'Standard roman' },
  'roman-large':          { w:11, l:84,  d:9,  h:11, label:'Roman Shade 60"–84"W',      notes:'Wide roman, heavier fabric' },
  'roman-xlarge':         { w:15, l:100, d:10, h:12, label:'Roman Shade 84"–96"W',      notes:'Large roman, oversize likely' },

  // ── VERTICAL BLINDS ───────────────────────────────────────────────────
  'vertical-small':       { w:6,  l:36,  d:8,  h:8,  label:'Vertical Blind under 48"W', notes:'Headrail + loose vanes in separate box' },
  'vertical-medium':      { w:10, l:60,  d:8,  h:8,  label:'Vertical Blind 48"–72"W',   notes:'Two boxes common (headrail + vanes)' },
  'vertical-large':       { w:15, l:84,  d:10, h:10, label:'Vertical Blind 72"–96"W',   notes:'Two boxes, additional handling likely' },
  'vertical-xlarge':      { w:20, l:108, d:10, h:10, label:'Vertical Blind 96"–120"W',  notes:'Oversize — special freight may apply' },

  // ── PLANTATION SHUTTERS ───────────────────────────────────────────────
  'shutter-panel-small':  { w:8,  l:36,  d:4,  h:36, label:'Shutter Panel under 24"W',  notes:'Single panel, tall box' },
  'shutter-panel-medium': { w:14, l:48,  d:5,  h:48, label:'Shutter Panel 24"–36"W',    notes:'Standard panel box' },
  'shutter-panel-large':  { w:20, l:60,  d:6,  h:60, label:'Shutter Panel 36"–48"W',    notes:'Wide panel, heavy box' },
  'shutter-full-window':  { w:30, l:72,  d:36, h:6,  label:'Full Shutter Set (window)',  notes:'Panels laid flat — freight-only above 72W' },

  // ── DRAPERY HARDWARE ──────────────────────────────────────────────────
  'rod-6ft':              { w:3,  l:74,  d:4,  h:4,  label:'Drapery Rod 6ft (72")',      notes:'In tube box, additional handling likely' },
  'rod-8ft':              { w:4,  l:98,  d:4,  h:4,  label:'Drapery Rod 8ft (96")',      notes:'Additional handling — over 48"' },
  'rod-12ft':             { w:6,  l:146, d:5,  h:5,  label:'Drapery Rod 12ft (144")',    notes:'Oversize — girth+length > 108"' },
  'hardware-brackets':    { w:3,  l:18,  d:12, h:8,  label:'Brackets & Hardware Kit',    notes:'Small box, no surcharges typical' },
  'hardware-rings-acc':   { w:2,  l:12,  d:10, h:6,  label:'Rings, Rings & Accessories', notes:'Small box' },

  // ── WOVEN WOOD SHADES ─────────────────────────────────────────────────
  'woven-small':          { w:4,  l:36,  d:7,  h:7,  label:'Woven Wood under 36"W',     notes:'Natural fiber, similar to roller' },
  'woven-medium':         { w:6,  l:60,  d:8,  h:8,  label:'Woven Wood 36"–60"W',       notes:'Standard woven' },
  'woven-large':          { w:9,  l:84,  d:9,  h:9,  label:'Woven Wood 60"–84"W',       notes:'Wide woven' },

  // ── FAUX/REAL WOOD BLINDS ─────────────────────────────────────────────
  'wood-blind-small':     { w:4,  l:36,  d:5,  h:5,  label:'Wood Blind under 36"W',     notes:'Standard slat box' },
  'wood-blind-medium':    { w:7,  l:60,  d:6,  h:6,  label:'Wood Blind 36"–60"W',       notes:'Multiple slats, heavier' },
  'wood-blind-large':     { w:11, l:84,  d:7,  h:7,  label:'Wood Blind 60"–84"W',       notes:'Wide blind' },
};

// ── CALCULATION ENGINE ────────────────────────────────────────────────────────

function dimWeight(l, w, h) {
  return Math.ceil((l * w * h) / 139);
}

function billableWeight(actualLbs, l, w, h) {
  const dw = dimWeight(l, w, h);
  return Math.max(actualLbs, dw);
}

function girthPlusLength(l, w, h) {
  const shortSide = Math.min(w, h);
  const longSide  = Math.max(w, h);
  return l + (2 * shortSide) + (2 * longSide);
}

function lookupRate(billableLbs, zone) {
  const weights = Object.keys(GROUND_RATES).map(Number).sort((a,b)=>a-b);
  // Find the bracket that covers this weight
  let bracket = weights[weights.length - 1];
  for (let i = 0; i < weights.length; i++) {
    if (billableLbs <= weights[i]) { bracket = weights[i]; break; }
  }
  const row = GROUND_RATES[bracket];
  return row[zone - 2]; // zone 2 = index 0
}

function estimateShipping(productKey, zone, qty = 1) {
  const p = PRODUCT_DIMS[productKey];
  if (!p || !zone) return null;

  const results = [];
  for (let i = 0; i < qty; i++) {
    const bw    = billableWeight(p.w, p.l, p.d, p.h);
    const gpl   = girthPlusLength(p.l, p.d, p.h);
    const base  = lookupRate(bw, zone);
    let   surcharge = SURCHARGES.residential;
    const flags = [];

    if (p.l > 48) {
      surcharge += SURCHARGES.additionalHandling;
      flags.push('Additional handling (L > 48")');
    }
    if (gpl > 108) {
      surcharge += SURCHARGES.oversize;
      flags.push('Oversize (girth+length > 108")');
    }

    results.push({
      package:      i + 1,
      product:      p.label,
      actualWeight: p.w,
      dimWeight:    dimWeight(p.l, p.d, p.h),
      billableWt:   bw,
      baseRate:     base,
      surcharges:   surcharge,
      total:        base + surcharge,
      flags
    });
  }

  const grandTotal = results.reduce((s, r) => s + r.total, 0);
  return { packages: results, grandTotal };
}

// ── QUICK REFERENCE CHART ─────────────────────────────────────────────────────
// Pre-computed estimates by product type and zone for the most common sizes
// All figures OVER-ESTIMATED with 15% buffer. Residential delivery included.

const QUICK_CHART = {
  header: ['Product', 'Zone 2 (PA/NJ/MD)', 'Zone 3 (NY/VA/OH)', 'Zone 4 (NC/IN/MI)', 'Zone 5 (FL/GA/IL)', 'Zone 6 (TX/CO)', 'Zone 7 (CA/AZ)', 'Zone 8 (WA/OR)'],
  rows: [
    // Roller shades
    ['Roller Shade <36"W',          '$17–20',   '$19–23',   '$22–27',   '$25–31',   '$28–35',   '$31–39',   '$35–44'],
    ['Roller Shade 36"–60"W',       '$22–27',   '$25–31',   '$29–36',   '$34–42',   '$39–48',   '$44–54',   '$49–61'],
    ['Roller Shade 60"–84"W',       '$29–36',   '$34–42',   '$40–49',   '$47–57',   '$54–66',   '$61–75',   '$70–85'],
    ['Roller Shade 84"–108"W',      '$40–50',   '$47–58',   '$56–68',   '$65–80',   '$75–92',   '$86–105',  '$97–119'],
    // Cellular
    ['Cellular Shade <36"W',        '$17–20',   '$19–23',   '$21–26',   '$25–30',   '$28–34',   '$31–38',   '$35–43'],
    ['Cellular Shade 36"–60"W',     '$21–26',   '$24–30',   '$28–35',   '$33–40',   '$38–46',   '$43–52',   '$48–58'],
    ['Cellular Shade 60"–84"W',     '$27–33',   '$32–39',   '$37–46',   '$43–53',   '$50–61',   '$57–70',   '$64–79'],
    // Zebra/Dual Sheer
    ['Zebra/Dual Sheer <36"W',      '$21–26',   '$24–29',   '$28–34',   '$32–39',   '$37–45',   '$42–51',   '$48–58'],
    ['Zebra/Dual Sheer 36"–60"W',   '$27–33',   '$31–38',   '$36–44',   '$42–51',   '$49–59',   '$55–67',   '$62–76'],
    ['Zebra/Dual Sheer 60"–84"W',   '$33–40',   '$39–47',   '$45–55',   '$52–64',   '$61–74',   '$69–84',   '$78–95'],
    ['Zebra/Dual Sheer 84"–108"W',  '$47–57',   '$55–67',   '$65–79',   '$76–92',   '$88–107',  '$101–123', '$114–139'],
    // Roman shades
    ['Roman Shade <36"W',           '$22–27',   '$25–30',   '$29–35',   '$33–40',   '$38–46',   '$43–52',   '$48–58'],
    ['Roman Shade 36"–60"W',        '$27–33',   '$31–38',   '$36–44',   '$42–51',   '$49–59',   '$55–67',   '$62–76'],
    ['Roman Shade 60"–84"W',        '$34–41',   '$40–48',   '$46–56',   '$54–65',   '$62–75',   '$70–85',   '$79–96'],
    // Verticals
    ['Vertical Blind <48"W',        '$27–33',   '$31–38',   '$36–44',   '$42–51',   '$49–59',   '$55–67',   '$62–76'],
    ['Vertical Blind 48"–72"W',     '$33–40',   '$39–47',   '$45–55',   '$52–64',   '$60–73',   '$68–83',   '$77–94'],
    ['Vertical Blind 72"–96"W',     '$45–55',   '$53–65',   '$62–75',   '$72–88',   '$83–102',  '$95–116',  '$107–131'],
    // Plantation shutters
    ['Shutters — single panel',     '$33–40',   '$38–46',   '$44–54',   '$51–62',   '$59–72',   '$67–82',   '$76–92'],
    ['Shutters — full window set',  '$85–104',  '$100–122', '$117–143', '$136–166', '$157–192', '$180–220', '$203–248'],
    // Drapery rods
    ['Drapery Rod 6ft (72")',        '$27–33',   '$31–38',   '$36–44',   '$42–51',   '$49–59',   '$55–67',   '$62–76'],
    ['Drapery Rod 8ft (96")',        '$33–40',   '$39–47',   '$45–55',   '$52–64',   '$61–74',   '$69–84',   '$78–95'],
    ['Drapery Rod 12ft (144")',      '$55–67',   '$65–79',   '$76–92',   '$88–107',  '$101–123', '$116–141', '$131–160'],
    ['Hardware / Brackets Only',    '$17–21',   '$19–24',   '$22–27',   '$26–31',   '$30–36',   '$34–41',   '$38–46'],
  ]
};

// ── FLAT RATE ESTIMATES (what to show customers) ──────────────────────────────
// Simpler table — use this for site display. Rounds up generously.
const FLAT_RATE_DISPLAY = {
  label: 'Estimated shipping from Huntingdon Valley, PA',
  note:  'Estimates only. Actual rate calculated at order. Oversize or multi-box orders may be higher.',
  tiers: [
    { label: 'Small shade/blind (under 36"W)',    estimate: '$18–25',  heavy: false },
    { label: 'Standard shade/blind (36"–60"W)',  estimate: '$25–40',  heavy: false },
    { label: 'Large shade/blind (60"–84"W)',      estimate: '$35–60',  heavy: false },
    { label: 'Extra-wide (84"–108"W)',            estimate: '$50–80',  heavy: true  },
    { label: 'Drapery rod 6ft or 8ft',            estimate: '$28–45',  heavy: false },
    { label: 'Drapery rod 12ft',                  estimate: '$55–80',  heavy: true  },
    { label: 'Plantation shutters — single panel', estimate: '$35–60', heavy: false },
    { label: 'Plantation shutters — full window',  estimate: '$85–150', heavy: true },
    { label: 'Hardware/brackets only',             estimate: '$18–28',  heavy: false },
  ]
};

// ── EXAMPLE USAGE ─────────────────────────────────────────────────────────────
// estimateShipping('roller-shade-medium', STATE_ZONES['FL'], 2)
// → estimate for 2 medium roller shades shipped to Florida

module.exports = {
  STATE_ZONES, GROUND_RATES, SURCHARGES, PRODUCT_DIMS,
  QUICK_CHART, FLAT_RATE_DISPLAY,
  dimWeight, billableWeight, girthPlusLength, lookupRate, estimateShipping
};
