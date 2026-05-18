/**
 * PHILLY BLINDS — SHIPPING REFERENCE
 * Origin: Huntingdon Valley, PA 19006
 * Last updated: 2026-05
 *
 * THREE-TIER SYSTEM:
 * ─────────────────────────────────────────────────────────────────────
 * TIER 1 — NORMAN PRODUCTS (exact rates from Norman PDFs)
 *   Standard: $25 first shade + $11 each additional
 *   Oversized (90"+ width): $80 first + $50 each additional
 *
 * TIER 2 — NON-NORMAN, UNDER 80"W (UPS/FedEx estimated)
 *   Box width  = shade width + 10"
 *   Box depth  = product-type dependent (soft + lined = much thicker)
 *   Box height = shade height + 4" (headrail/bottom rail clearance)
 *   Weight     = product-type dependent (lined romans & drapes are heavy)
 *   Dim weight = (L × W × H) / 139  →  use whichever is higher
 *   Surcharges: residential +$5.50, additional handling +$14 (L>48"),
 *               oversize +$57 (girth+length > 108")
 *
 * TIER 3 — ANY PRODUCT 80"W OR WIDER (LTL FREIGHT REQUIRED)
 *   UPS/FedEx ground is NOT appropriate for 80"+ wide shades.
 *   These require LTL (less-than-truckload) freight carriers.
 *   Freight cost varies widely — $150–$600+ depending on:
 *     - Total shipment weight and dimensions
 *     - Destination and zone
 *     - Carrier (FedEx Freight, R+L Carriers, Estes, etc.)
 *   ALWAYS quote freight separately for 80"+ products.
 *   Show customer: "Freight quoted separately — call or we'll email you."
 * ─────────────────────────────────────────────────────────────────────
 */

// ── TIER 1: NORMAN EXACT FREIGHT RATES (from Norman PDFs) ────────────────────
const NORMAN_FREIGHT = {
  standard: {
    perShadeFirst:      25,
    perShadeAdditional: 11,
    oversizeThresholdW: 90,   // inches — shades 90"+ width are oversized
    oversizeFirst:      80,
    oversizeAdditional: 50,
  },
  products: [
    'Norman Soluna Roller Shades',
    'Norman Portrait Cellular / Honeycomb',
    'Norman PerfectSheer Shadings',
    'Norman SmartDrape Shadings',
    'Norman SmartPrivacy Faux Wood Blinds',
    'Norman Synchrony Verticals',
    'Norman Plantation Shutters',
  ],
  note: 'Rates from Norman Feb 2026 price book. Confirmed accurate.'
};

function normanFreight(widthInches, qty) {
  const isOversize = widthInches >= NORMAN_FREIGHT.standard.oversizeThresholdW;
  if (isOversize) {
    return NORMAN_FREIGHT.standard.oversizeFirst
         + Math.max(0, qty - 1) * NORMAN_FREIGHT.standard.oversizeAdditional;
  }
  return NORMAN_FREIGHT.standard.perShadeFirst
       + Math.max(0, qty - 1) * NORMAN_FREIGHT.standard.perShadeAdditional;
}

// ── TIER 2/3 THRESHOLD ────────────────────────────────────────────────────────
const FREIGHT_THRESHOLD_W = 80; // inches — 80"+ = LTL freight, not UPS/FedEx

// ── PRODUCT BOX SIZING GUIDE (non-Norman) ────────────────────────────────────
// Box sizing formula: width = shadeW + 10", height = shadeH + 4"
// Depth depends on product type and weight class
//
// WEIGHT CLASSES:
//   light   = unlined sheers, solar screens, light fabrics
//   medium  = standard fabrics, light lining
//   heavy   = blackout lining, room darkening, thick fabrics
//   xheavy  = fully lined drapery, interlined romans, multiple panels
//
// DEPTH REFERENCE (how thick the rolled/folded product is):
const PRODUCT_BOX_GUIDE = {

  // ── ROLLER SHADES ─────────────────────────────────────────────────────
  'roller-light': {
    label:      'Roller Shade — Sheer / Light Filtering',
    depthIn:    5,
    weightCalc: (w) => Math.max(3, Math.ceil(w / 12 * 0.5)),  // ~0.5 lb/ft width
    notes:      'Sheer or 1-3% openness solar. Light roll diameter.'
  },
  'roller-standard': {
    label:      'Roller Shade — Standard Light Filtering / 5% Solar',
    depthIn:    6,
    weightCalc: (w) => Math.max(4, Math.ceil(w / 12 * 0.75)),
    notes:      'Typical LF roller. Moderate weight when rolled.'
  },
  'roller-blackout': {
    label:      'Roller Shade — Room Darkening / Blackout',
    depthIn:    8,
    weightCalc: (w) => Math.max(5, Math.ceil(w / 12 * 1.1)),  // heavier coating
    notes:      'Blackout coating adds significant weight. Wider roll diameter.'
  },

  // ── CELLULAR / HONEYCOMB ──────────────────────────────────────────────
  'cellular': {
    label:      'Cellular / Honeycomb Shade',
    depthIn:    6,
    weightCalc: (w) => Math.max(3, Math.ceil(w / 12 * 0.7)),
    notes:      'Compact fold. Relatively light for size. Headrail adds weight.'
  },

  // ── ZEBRA / DUAL SHEER ────────────────────────────────────────────────
  'zebra': {
    label:      'Zebra / Dual Sheer Banded Shade',
    depthIn:    7,
    weightCalc: (w) => Math.max(4, Math.ceil(w / 12 * 0.9)),
    notes:      'Cassette + two fabric layers. Heavier than single roller.'
  },

  // ── ROMAN SHADES ──────────────────────────────────────────────────────
  'roman-unlined': {
    label:      'Roman Shade — Unlined or Translucent Liner',
    depthIn:    8,
    weightCalc: (w, h) => Math.max(5, Math.ceil((w * h) / 144 * 0.8)),
    notes:      'Fabric folds add depth. Moderate weight. Light liner only.'
  },
  'roman-light-lining': {
    label:      'Roman Shade — Standard Light Filtering Lining',
    depthIn:    10,
    weightCalc: (w, h) => Math.max(6, Math.ceil((w * h) / 144 * 1.1)),
    notes:      'Lining doubles effective fabric weight. Box gets thick fast.'
  },
  'roman-blackout': {
    label:      'Roman Shade — Blackout / Room Darkening Lining',
    depthIn:    12,
    weightCalc: (w, h) => Math.max(8, Math.ceil((w * h) / 144 * 1.5)),
    notes:      'Blackout lining is heavy. 48"W × 60"H blackout roman ≈ 16–20 lbs.'
  },

  // ── DRAPERY PANELS ────────────────────────────────────────────────────
  'drape-light': {
    label:      'Drapery — Unlined / Light Fabric',
    depthIn:    12,
    weightCalc: (sqYds) => Math.max(6, Math.ceil(sqYds * 1.2)),
    notes:      'Sheer, voile, light linen. Still bulky when folded for shipping.'
  },
  'drape-lined': {
    label:      'Drapery — Lined (standard lining)',
    depthIn:    14,
    weightCalc: (sqYds) => Math.max(8, Math.ceil(sqYds * 2.0)),
    notes:      'HEAVY. Standard lined drape pair at 96"W × 108"L ≈ 18–25 lbs.'
  },
  'drape-interlined': {
    label:      'Drapery — Interlined / Blackout Lined',
    depthIn:    18,
    weightCalc: (sqYds) => Math.max(12, Math.ceil(sqYds * 2.8)),
    notes:      'VERY HEAVY. Interlining adds bulk and weight. Often needs freight.'
  },

  // ── WOVEN WOOD / NATURAL SHADES ───────────────────────────────────────
  'woven-wood': {
    label:      'Woven Wood Shade — Natural Fiber',
    depthIn:    6,
    weightCalc: (w) => Math.max(4, Math.ceil(w / 12 * 0.8)),
    notes:      'Natural fibers vary. Liner adds weight. Similar to standard roller.'
  },

  // ── VERTICAL BLINDS ───────────────────────────────────────────────────
  'vertical': {
    label:      'Vertical Blind — Headrail + Vanes (2 boxes)',
    depthIn:    8,
    weightCalc: (w, h) => Math.max(8, Math.ceil(w / 12 * 1.2 + h / 12 * 0.5)),
    notes:      'Often ships as 2 boxes — headrail + loose vanes. Both count.'
  },

  // ── HARDWARE ──────────────────────────────────────────────────────────
  'rod-6ft': {
    label:      'Drapery Rod — 6ft (72" tube)',
    depthIn:    4,
    weightCalc: () => 4,
    notes:      '72" L: additional handling surcharge. No oversize.'
  },
  'rod-8ft': {
    label:      'Drapery Rod — 8ft (96" tube)',
    depthIn:    4,
    weightCalc: () => 5,
    notes:      '96" L: additional handling + likely oversize surcharge.'
  },
  'rod-12ft': {
    label:      'Drapery Rod — 12ft (144" tube)',
    depthIn:    5,
    weightCalc: () => 7,
    notes:      '144" L: oversize surcharge guaranteed. Consider freight.'
  },
  'hardware-small': {
    label:      'Hardware Kit — Brackets, Rings, Accessories',
    depthIn:    8,
    weightCalc: () => 3,
    notes:      'Small box. No surcharges typical. Easy UPS/FedEx.'
  },
};

// ── ZONE LOOKUP ───────────────────────────────────────────────────────────────
const STATE_ZONES = {
  PA:2, NJ:2, DE:2, MD:2,
  NY:3, CT:3, VA:3, WV:3, OH:3, RI:3, MA:3, NH:3, VT:3, ME:3,
  NC:4, SC:4, KY:4, IN:4, MI:4, DC:4,
  GA:5, FL:5, TN:5, AL:5, IL:5, WI:5, MN:5, IA:5, MO:5,
  TX:6, LA:6, AR:6, KS:6, NE:6, SD:6, ND:6, OK:6, CO:6, WY:6, MT:6,
  AZ:7, NM:7, CA:7, UT:7, ID:7, NV:7,
  WA:8, OR:8, AK:8, HI:8
};

// ── GROUND RATE TABLE (billable weight × zone, over-estimated ~15%) ───────────
const GROUND_RATES = {
  //       Z2   Z3   Z4   Z5   Z6   Z7   Z8
  1:     [12,  14,  16,  19,  22,  25,  28],
  3:     [14,  16,  19,  23,  26,  30,  34],
  5:     [16,  19,  23,  27,  32,  36,  41],
  8:     [19,  23,  29,  34,  40,  46,  52],
  10:    [21,  26,  32,  38,  44,  51,  58],
  15:    [26,  33,  41,  49,  57,  65,  74],
  20:    [31,  39,  49,  58,  68,  78,  89],
  25:    [36,  46,  57,  68,  80,  92,  104],
  30:    [41,  52,  65,  78,  91,  105, 119],
  40:    [51,  65,  81,  97,  114, 131, 149],
  50:    [61,  78,  97,  116, 137, 157, 178],
  70:    [81,  103, 129, 154, 181, 208, 236],
  100:   [111, 141, 176, 211, 248, 285, 323],
  150:   [161, 205, 256, 307, 361, 414, 470],
};

const SURCHARGES = {
  residential:        5.50,
  additionalHandling: 14.00,  // L > 48"
  oversize:           57.00,  // girth+length > 108"
};

// ── TIER 2 CALCULATOR (non-Norman, under 80"W) ────────────────────────────────
function dimWeight(l, w, h)  { return Math.ceil((l * w * h) / 139); }
function girthPlusLength(l, w, h) {
  const s = Math.min(w, h), t = Math.max(w, h);
  return l + (2 * s) + (2 * t);
}
function lookupRate(lbs, zone) {
  const keys = Object.keys(GROUND_RATES).map(Number).sort((a,b)=>a-b);
  const bracket = keys.find(k => lbs <= k) || keys[keys.length-1];
  return GROUND_RATES[bracket][zone - 2];
}

function estimateUPSFedEx(shadeWidthIn, shadeHeightIn, productType, zone, qty = 1) {
  // 80"+ = freight, not parcel
  if (shadeWidthIn >= FREIGHT_THRESHOLD_W) {
    return {
      tier: 3,
      message: 'FREIGHT REQUIRED — width ' + shadeWidthIn + '" ≥ 80". Quoted separately.',
      freightEstimate: '~$200–$600+ depending on destination and weight.',
      grandTotal: null
    };
  }

  const guide = PRODUCT_BOX_GUIDE[productType];
  if (!guide) return null;

  const boxL = shadeWidthIn + 10;        // shade width + 10" — headrail/tube runs along length
  const boxW = guide.depthIn;            // rolled/folded product depth (square cross-section)
  const boxH = guide.depthIn;            // same as width — square tube shape
  const actualWt = typeof guide.weightCalc === 'function'
    ? guide.weightCalc(shadeWidthIn, shadeHeightIn)
    : guide.weightCalc;

  const dw  = dimWeight(boxL, boxW, boxH);
  const bw  = Math.max(actualWt, dw);
  const gpl = girthPlusLength(boxL, boxW, boxH);

  let surcharge = SURCHARGES.residential;
  const flags = [];
  if (boxL > 48)  { surcharge += SURCHARGES.additionalHandling; flags.push('Additional handling (L > 48")'); }
  if (gpl > 108)  { surcharge += SURCHARGES.oversize;           flags.push('Oversize surcharge (girth+L > 108")'); }

  const baseRate = lookupRate(bw, zone);
  const perPkg   = baseRate + surcharge;
  const total    = perPkg * qty;

  return {
    tier: 2,
    product:     guide.label,
    box:         boxL + '"L × ' + boxW + '"W × ' + boxH + '"H',
    actualWeight: actualWt + ' lbs',
    dimWeight:   dw + ' lbs',
    billableWt:  bw + ' lbs',
    baseRate:    '$' + baseRate,
    surcharges:  '$' + surcharge.toFixed(2),
    perPackage:  '$' + perPkg.toFixed(2),
    qty,
    grandTotal:  '$' + total.toFixed(2),
    flags,
    notes:       guide.notes
  };
}

// ── QUICK DISPLAY FUNCTION ────────────────────────────────────────────────────
// Use this for site-facing shipping estimate display
function getShippingEstimate(product, widthIn, heightIn, qty, stateCode, isNorman) {
  // Norman: exact rates
  if (isNorman) {
    const cost = normanFreight(widthIn, qty);
    return {
      tier: 1,
      label: widthIn >= 90 ? 'Oversized freight' : 'Standard freight',
      amount: '$' + cost,
      perUnit: widthIn >= 90
        ? '$80 first + $50 each additional'
        : '$25 first + $11 each additional',
      source: 'Exact rate from Norman 2026 price book'
    };
  }

  // Non-Norman: check freight threshold first
  if (widthIn >= FREIGHT_THRESHOLD_W) {
    return {
      tier: 3,
      label: 'Freight shipping required',
      amount: 'Quoted separately',
      perUnit: '~$200–$600+',
      source: 'Width ≥ 80" requires LTL freight carrier — not UPS/FedEx ground'
    };
  }

  // Non-Norman under 80"W: UPS/FedEx estimate
  const zone  = STATE_ZONES[stateCode] || 5; // default zone 5 if unknown
  const result = estimateUPSFedEx(widthIn, heightIn, product, zone, qty);
  if (!result || result.tier === 3) return { tier:3, label:'Freight required', amount:'Quoted separately' };

  return {
    tier: 2,
    label: 'UPS / FedEx Ground estimate',
    amount: result.grandTotal,
    perUnit: result.perPackage + '/pkg',
    flags: result.flags,
    source: 'Estimated — not exact. Final rate confirmed at order.'
  };
}

// ── FREIGHT TIER REFERENCE (Tier 3 — 80"+ products) ──────────────────────────
const FREIGHT_REFERENCE = {
  threshold: '80" wide or wider',
  carriers:  ['FedEx Freight', 'R+L Carriers', 'Estes Express', 'Old Dominion'],
  typicalRanges: [
    { description: '80"–96"W shade, local (PA/NJ/MD)',      estimate: '$120–$180' },
    { description: '80"–96"W shade, mid-range (NC/OH/GA)',   estimate: '$180–$280' },
    { description: '80"–96"W shade, far (TX/CA)',            estimate: '$280–$450' },
    { description: '96"–120"W shade, local',                 estimate: '$160–$240' },
    { description: '96"–120"W shade, mid-range',             estimate: '$240–$360' },
    { description: '96"–120"W shade, far',                   estimate: '$360–$550' },
    { description: 'Plantation shutters (full window set)',   estimate: '$200–$500' },
    { description: '12ft drapery rods',                      estimate: '$100–$250' },
  ],
  customerMessage: 'This product requires freight shipping due to its size. We\'ll calculate the exact freight cost and include it in your quote.',
  note: 'Freight is typically not included in the product price. Always quote freight separately and confirm with customer before processing.'
};

// ── WEIGHT NOTES FOR SOFT PRODUCTS ───────────────────────────────────────────
const WEIGHT_NOTES = {
  drapeLinedHeavy: 'A pair of fully lined drapery panels at 100"W × 108"H can weigh 25–35 lbs. This is one of the heaviest products we ship.',
  romanBlackout:   'A blackout-lined roman shade at 72"W × 84"H weighs approximately 18–24 lbs. Dim weight is typically lower, so actual weight drives the rate.',
  rollerBlackout:  'Blackout roller shades are significantly heavier than sheer rollers — the coating adds 40–60% more weight. A 72"W blackout roller can weigh 8–12 lbs.',
  general:         'When in doubt, over-estimate weight by 25%. Customers are less upset by a refund than an unexpected freight charge.'
};

module.exports = {
  NORMAN_FREIGHT, normanFreight,
  PRODUCT_BOX_GUIDE, STATE_ZONES, GROUND_RATES, SURCHARGES,
  FREIGHT_THRESHOLD_W, FREIGHT_REFERENCE, WEIGHT_NOTES,
  dimWeight, girthPlusLength, lookupRate,
  estimateUPSFedEx, getShippingEstimate
};
