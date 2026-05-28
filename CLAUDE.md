# CLAUDE.md â€” Philly Blinds Website
> READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING.
> Every agent â€” Claude Code, Claude.ai chat, any future agent â€” must read this first.
> Last updated: May 2026

---

## ⚠️ SISTER PROJECT — BLINDZNATION

Blindznation is a separate sister-brand project that copies this site's structure with different branding.

**phillyblinds is the MASTER.** All product specs, business rules, motorization rules, and configurator data originate HERE first, then get ported to blindznation.

| Rule | What it means |
|------|--------------|
| Do NOT edit blindznation files from a phillyblinds session | Open a separate Claude Code session from the blindznation folder |
| When you change a product spec here, flag it | Note in the commit message: “→ also apply to blindznation” |
| When you change a business rule here, flag it | Same — blindznation must stay in sync |
| Never push phillyblinds changes to blindznation's GitHub repo | Each project has its own separate repo |

**Blindznation project location:**
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation\`

---

## LIVE LAUNCH RULES — READ FIRST

### Contact info (always use exactly)
- **Phone:** (609) 742-1720 — call or text 24/7
- **Email (PhillyBlinds — Justin):** justin@phillyblinds.com
- **Email (PhillyBlinds — Sarah):** sarah@phillyblinds.com
- **Email (Blindznation):** justin@blindznation.com

### Branch structure
```
dev    → all work happens here. Safe to push anytime.
master → LIVE website. Only merge from dev when user says “confirmed push to live”.
```

### ⚠️ NEVER auto-push to master. Always ask first.
Claude Code must say: **”Ready to push to live — confirm?”**
User must reply: “confirmed” or “yes push live”

```powershell
# Start every session:
git checkout dev
git pull

# End of session (safe, not live):
git add . && git commit -m “what changed” && git push origin dev

# Merge to LIVE (only after confirmation):
git checkout master && git merge dev && git push origin master && git checkout dev
```

### LIVE vs TEST behavior
| Feature | TEST (dev) | LIVE (master) |
|---------|-----------|---------------|
| Configurators | Full | Contact popup only |
| Pricing | Visible | Hidden |
| Gallery, About, Measure guides | Full | Full |
| Phone number | Everywhere | Everywhere |

On LIVE — ALL product card clicks and configure buttons must call `pbShowContact()` instead of opening configurators. **This feature is still to be built.**

---

## CRITICAL â€” HOW ALL AGENTS STAY IN SYNC

### The three agents on this project:
1. **Claude.ai chat** — Design decisions, new page specs, content, review
2. **Claude Code (PowerShell)** — Builds and edits actual files on the computer
3. **GitHub** — The single source of truth. Master copy of all files.

### The golden rules:
- **GitHub is always the master.** Before starting any work, pull latest: `git pull`
- **Claude Code owns the files.** All file edits happen through Claude Code in PowerShell.
- **Claude.ai chat owns design decisions.** New pages, layouts, content come from there.
- **Never overwrite files with old zips.** Zips from Claude.ai chat are outdated â€” ignore them.
- **Always push when done:** `git add . && git commit -m "what changed" && git push`
- **Vercel auto-deploys** every push to GitHub. phillyblinds.vercel.app updates in ~30 seconds.

### Start of every Claude Code session â€” run this first:
```powershell
cd "C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\phillyblinds"
git pull
```

### End of every Claude Code session â€” run this:
```powershell
git add .
git commit -m "describe what was built"
git push
```

### If Claude.ai chat gives you a file or code â€” do this:
Paste the content into the correct file manually or have Claude Code write it,
then push to GitHub. Do NOT unzip and overwrite the whole folder.

---

## PROJECT INFO

**Business:** Philly Blinds Â· Blindznation Â· Michael J. Healy Installations
**Phone:** (609) 742-1720 â€” 24/7 call or text
**Family:** Justin Healy (owner, 10yr exp) Â· Michael Healy (dad, 60yr exp) Â· Sarah Healy (sister, design/fab)
**Established:** 2014

## INFRASTRUCTURE

| Item | Value | Status |
|------|-------|--------|
| GitHub repo | github.com/mzgxfnbzpy-commits/phillyblinds | âœ… Live |
| Vercel | phillyblinds.vercel.app | âœ… Live, auto-deploys from GitHub |
| Vercel account | vercel.com/phillyblinds | âœ… |
| Local files | C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\phillyblinds | âœ… |
| Domain | phillyblinds.com → 308 → www.phillyblinds.com (canonical) | ✅ Live |
| www domain | www.phillyblinds.com (canonical serving domain) | ✅ Live |
| Google Search Console | phillyblinds.com verified (HTML file method) | ✅ Verified |
| Business email | justin@phillyblinds.com · sarah@phillyblinds.com | ✅ Set |
| Form backend | All quote forms: mailto:blindznation@gmail.com | ✅ Active |
| Payment | Not set up (use Stripe when ready) | ❌ |

## DESKTOP SHORTCUTS (on Windows desktop)
- **PhillyBlinds â€” Site** â†’ opens phillyblinds\index.html locally
- **PhillyBlinds â€” Execution Plan** â†’ opens phillyblinds_execution_plan.html

---

## DESIGN SYSTEM â€” DO NOT DEVIATE

```css
--espresso:      #1C1510   /* nav, dark sections, hero */
--espresso-mid:  #251E16   /* cards on dark bg */
--espresso-deep: #120E09   /* footer */
--gold:          #C8973F   /* all CTAs, accents, phone */
--cream:         #F5ECD7   /* headings on dark */
--gold-mid:      #FBF7F0   /* warm section backgrounds */
Font: system sans-serif â€” no external fonts
Border radius: 8px buttons, 12px cards
```

Every page MUST include:
```html
<link rel="stylesheet" href="../css/global.css">  <!-- or css/global.css for index.html -->
<script src="../js/shared.js"></script>
<script>renderNav('Page Name'); renderFooter(false);</script>
```

---

## SITE MAP & PAGE STATUS

### âœ… COMPLETE & ON GITHUB
| File | Page | Notes |
|------|------|-------|
| index.html | Homepage | Full design, all sections |
| pages/gallery.html | Gallery | 7 tabs, 75+ photos, 14 videos |
| pages/consult.html | Consultation | 3 paths, booking forms |
| pages/measure.html | Measure guide (shades) | 5 tabs, SVG diagrams |
| pages/about.html | About | Family story, team, services, service areas |
| pages/fabric-calculator.html | Fabric calculator | Drapery, Roman, Cornice |
| pages/shades.html | All shades & blinds | Per-product configurator; roller has fascia/cassette/chain/endcap options; cellular has lift direction (BU/TDBU) + operating system separate; fabric/color placeholder; all quote forms â†’ mailto; delivery section on every form. Wood Blinds card links to faux-wood-blinds.html |
| pages/faux-wood-blinds.html | **Norman SmartPrivacy® Faux Wood Blinds (NEW)** | Full standalone configurator. 8 steps. 16 colors (12 solid, 4 printed +20%). 2" and 2.5" slats. Live pricing from matrix (width cols 24â€"72, height rows 30â€"96). Valance surcharge. Hold down brackets auto â‰¤30". Shims outside mount only $7 ea. Wand drop selector. Freight $25 + $11 ea. mailto quote with full spec. |
| pages/soft-treatments.html | **Soft Treatments (NEW)** | Combines drapery + roman shades in 2 tabs; 6 pleat SVGs; 3 roman styles; fabric/lining/motor/delivery; cross-sell hardware; mailto |
| pages/hardware.html | **Drapery Hardware (NEW)** | Decorative vs non-decorative flow; brand selector (Select/Orion/Kirsch/Paris Texas/Finial Co.); Architrac info; cross-sell drapery; delivery; mailto |
| pages/norman-sheers.html | **Norman SmartDrape™ Configurator** | SmartDrape ONLY (PerfectSheer is in shades.html). Outside Mount only (wall/ceiling/ceiling pocket). Stack options, fabric, accessories, motorization. DC Low Voltage blocked. No valance (valance-free headrail). Custom quote via mailto. |
| pages/roman-shades.html | Roman Shades | REDIRECTS to soft-treatments.html?tab=roman |
| pages/dynasty-woven-woods.html | **Wallace Dynasty Woven Wood Shades (NEW)** | 9-step configurator. 48 patterns, 5 price groups. Styles: Waterfall/Flat Fold/Hobbled (hobbled +30%). Controls: Loop Chain/Cordless/TDBU/Motorized/Dual Shade with full validation. All price matrices embedded (groups 1-5, W×H). Liner surcharge tables (privacy/blackout, single & dual). Edge binding (½″/1½″), hobble valance (12″/18″), hardware options. TDBU blocked for groups 1+2; pattern-specific limits for groups 3-5. Motorized: Rollease Acmeda Automate $515 + accessories. Slim clutch rules (B3311/B3312 ≤60×60; others ≤72×72). Pricing labeled as estimate only. Delivery + mailto. Linked from shades.html. |
| pages/roman-shades.html | Custom Roman Shades | 3 styles, fabric paths, instant pricing; renamed to Custom Roman Shades; mailto + delivery |
| pages/drapery.html | Custom drapery & hardware | 6 pleat styles, hardware selector (type/brand/diameter/finish/finial/rings), motorization â†’ notes only; mailto + delivery |
| pages/shutters.html | **Plantation Shutters — Rebuilt May 2026** | 16-step configurator. Line first (Normandy/Woodlore/WLP). Per-opening W×H dims. Panel layout (L/R/LR/LLRR/bi-fold/bypass). T-posts (vertical + horizontal). SHUTTER_LINES JS object enforces line-specific louver maxes (ND: 30/36/42; WL: 24/30/36; WLP: 24/36). InvisibleTilt™ blocked for 1⅞″. Divider rail auto-warning over 74″(WL)/78″(ND/WLP). Normandy: Paint(24)/Stain(18)/OSMO(6) tabs with surcharge flags. WL: 6 colors. WLP: 24 colors. Specialty options toggles. Delivery + mailto. |
| pages/measure-shutters.html | Measure guide (shutters) | 4 tabs: inside mount, outside mount, frame styles &amp; depth, tips. 3WÃ—3H rule explained with SVG diagrams |
| pages/paris-texas-rods.html | **Paris Texas Hardware Configurator (NEW)** | 8-step configurator. Covers all 3 rod types (stationary, baton traverse, R-TEC motorized, heavy duty). All 35 Portfolio + 6 QS Metal + 5 QS Wood & Resin + PTH Perfect Match finishes. All 3 diameters (1⅛"/1⅜"/2¼"). Full finial catalog with compatibility rules (cuff requirements). R-TEC pricing estimator. Somfy motor options. All compatibility restrictions enforced (AGL only static, 1⅛" cuffs, 1⅜" TT/HC cuffs, 2¼" no metal traverse, Somfy 2¼" only, slim/flat/mitered no finials). Quote via mailto. Linked from hardware.html Paris Texas brand card. |
| pages/kirsch-rods.html | **Kirsch Rod Selector (NEW)** | 7-step configurator for all Kirsch rod types. Verified against 2026 PDF library May 2026. Designer Metals (8 finishes, 27 finials, 1"/1⅜"/2"), Wood Trends (9 finishes, 18 finials, 1⅜"/2", Unfinished not on Estate Traverse), Wrought Iron (6 finishes: Black/Iron Oxide/Rust/Graphite/Chalk/Heirloom Copper, 18 finials, 1"/1⅜", Estate 1⅜" only), Architrac (7 models: 94001/94003/94004/94005/9046/9600/K-Rail — each with model-specific limits, bend/curve rules, mount types), Basic hardware. AMP™ motorization: Estate Traverse + Architrac 94001 ONLY. AMP max 16ft/64 lbs. 94001 AMP cannot be bent/curved. Quote via mailto. |
| pages/select-rods.html | **Select Rod Configurator** | Select brand hardware configurator. Linked from hardware.html Select brand card. |
| pages/city-lights-aluminum-blinds.html | **Norman City Lights Aluminum Blinds** | Norman aluminum blind configurator. |
| pages/synchrony-verticals.html | **Norman Synchrony Verticals** | Norman vertical blind configurator. |
| pages/wallace-verticals.html | **Wallace Vertical Blinds configurator** | 36 patterns (PVC Groups 0–7; Fabric FH/CP Groups 3–7: Berks/Cambria/Chester/Franklin/Lancaster/Lehigh/Montgomery/Westmorland). Vane type logic: PVC auto-selects; FH/CP patterns offer free-hang or channel panel (CP surcharge noted). Draw: One-way + Stack side / Split draw. Optional: Center stack, Off-center draw, Opposite stack/controls (all surcharge-flagged). Tilt chain: vinyl or metal (no charge). Track: Regular/Replacement/Top-bottom. Valance: Regular/Deluxe/Single/Laser trim/None. Accessories: Auto Wand (free), Verticlips ($6 ea), Hinged valance corners ($6 ea), T-handles ($8.25 ea) with qty fields. Vane count + stack-width estimate from ordered width (3.5″ vane). Width > 193″: split into 2 blinds (max 240″). Width or height ≥ 92″: common carrier freight warning. Freight: $25 first + $15 each additional. No public pricing per owner policy. Delivery + mailto:blindznation@gmail.com. |
| pages/sheer-shades.html | **Sheer Shades brand-choice landing** | Two-card choice: Hunter Douglas (Silhouette/Pirouette/Luminette/Vignette → pbShowContact popup) or Wallace 3D Dual Sheer (→ wallace-3d-sheer.html). Linked from index.html Sheer Shades card. |
| pages/wallace-3d-sheer.html | **Wallace 3D Dual Sheer Shades configurator** | 13 collections (Group A: Lux/Natural; Group B: Arcadia/Bellus/Chagall/Eco/Vivid/Fresh Band/One Band; Group C: Blackout Ares/Chelsea/Shiny/Sunlux). Collection-driven rules: band size (2″/3″/3⅛″), light control, fabric headrail insert availability, bottom rail type (Moon Shape standard / Deluxe +$40 for Chelsea/Fresh Band/One Band). Controls: Continuous Cord Loop + stainless chain upgrade ($15) OR Battery Motor ($350 + accessories: charger/remote/hub/solar). Motor: min 23″W / max 100″W. TDBU not offered. 2-on-1 / 3-on-1 headrail (max 110″ combined; seam warn over 106″). Side-by-side alignment (¼″ tolerance). Inside/outside mount with finished dimension table. No public pricing per owner policy — quote-only. Delivery + mailto:blindznation@gmail.com. Linked from index.html. |
| pages/galaxy-woven-woods.html | **Wallace Galaxy Woven Woods configurator** | 73 patterns, 6 price groups. Styles: Waterfall/Flat Fold/Hobbled/TDBU/Motorized/Dual Shade. All price matrices embedded (PG1-PG6, W×H). Control surcharges (Loop/Cordless/TDBU/Motor). Liner (Privacy/Blackout, single &amp; dual shade). Edge binding (½″/1½″). Valance upgrades (6″/12″/18″). Motor: Rollease Acmeda Automate $515 + hub/remote/charger/solar accessories. Freight: $25 first + $8 ea; $80 oversize ≥90″. Hobbled +30%. TDBU/motor pattern limits enforced. Pricing labeled estimate only. Delivery + mailto:blindznation@gmail.com. Linked from index.html Woven Wood Shades card. |
| pages/hardware-quote.html | Hardware Quote | Hardware quote request form. |
| pages/installation.html | Installation Services | Service info and install booking. |
| pages/upholstery.html | Custom Upholstery | Upholstery services page. |
| pages/privacy.html | Privacy Policy | Privacy policy. |
| pages/product-specs.html | Product specifications | 9 tabs, 20+ products with full specs. Brightwood removed (not offered). |
| pages/soluna-roller-shades.html | Norman Soluna detail page | Full product deep-dive. Norman motorization ONLY — do not add Somfy/Automate/Lutron. |
| pages/norman-centerpiece-roman.html | **Norman Centerpiece™ Roman Shades configurator** | Separate from custom Roman shades. 15-step: product type, lift system, dimensions, style, fabric, lining, banding, D&N roller, valance, accessories, motorization, quote. Norman-only motorization. All pricing marked as MSRP estimates. Fabric data needs PDF verification (PDF is image-based). Linked from soft-treatments.html Norman Centerpiece card. |
| pages/portfolio-dual-sheer.html | **Wallace Portfolio Collection™ Dual Sheer Shades (NEW)** | 14-step configurator. 95 fabrics in 2 types: Light-Filtering (16 pattern families — Addison/Alaia/Albion/Alessa/Asher/Bixby/Bryson/Kingston/Lani/Leigh/Loma/Marble/Matteo/Solana/Theo/Tory) and Room-Darkening (9 families — Brantley/Briggs/Declan/Evlin/Kane/Landry/Lena/Mara/Nika). All 5 price groups A-E with full 12×12 matrices (W: 24–110″; H: 36–108″). Tory: large bottom bar required, no cordless, no square bottom bar. All RD: large bottom bar required. Cassette: rounded (fabric insert standard) or square (wrap +$80). Colors: white/beige/gray/bronze/black. Controls: Clutch (cord length, metal chain +$62), Cordless (+$192, lift assist +$80, max 96″W×99″H), Pro Wand (+$232, 4 lengths), Remote Motor (+$460, LI/DC/DC-ext/AC types). Full motor accessories: remote +$111, wall switch +$114, hub +$458, LI pack +$160, plug adapter +$60, extension cables, charger +$83. Bottom bar wrap priced by width. Side-by-side guidance included. Pricing labeled estimate only. Delivery + mailto:blindznation@gmail.com. Linked from shades.html Specialty Shades section. |
| css/global.css | Shared styles | Delivery section styles; identity bar styles |
| js/shared.js | Shared nav/footer | Identity bar (Michael J. Healy Installations LLC + Philly Blinds Â· Blindznation); footer shows both brands + LLC name |

### âŒ STILL NEEDED
| File | Page | Priority | Notes |
|------|------|----------|-------|
| pages/shades.html | Fabric swatch photos | MEDIUM — picker is fully wired with Norman collections + color-dot CSS fallback; upload real swatch photos when available |
| pages/catalogs.html | Spec catalogs download | MISSING — page does not exist; removed from sitemap.xml (May 2026). Recreate only when catalog PDFs are confirmed safe for public exposure (no wholesale pricing). |

---

## BUSINESS RULES â€” CRITICAL, DO NOT BREAK

### Quote form email
All quote forms submit via `mailto:blindznation@gmail.com`. They open the user's email client with a pre-filled body containing all form data. No backend/Formspree needed for now.

### Delivery section rule
Every quote form on every page MUST include the delivery/pickup section above the submit button. Options: "Ship to me" (UPS/FedEx from Huntingdon Valley PA, tariff disclosure) or "I'll pick up" (location: 527 Hoyt Rd, Huntingdon Valley PA 19006 â€” disclosed after order). Always include the tariff/duties warning note in the shipping option.

### Drapery hardware motorization rule
Motor brand for drapery hardware goes in the customer notes â€” there is NO motor brand dropdown on the drapery page. Each hardware manufacturer supports different motor systems so compatibility must be confirmed per order. Customer can specify preference (Somfy, Lutron Sivoia, Rollease Acmeda, etc.) in the notes field.

### Pricing engine
| Product | Type | Notes |
|---------|------|-------|
| Roller shades | Instant price | $/sqft â€” tables not provided yet, use placeholder |
| Cellular shades | Instant price | $/sqft placeholder |
| Zebra shades | Instant price | $/sqft placeholder |
| Woven wood shades | Instant price | $/sqft placeholder |
| Roman shades | Instant price | $/sqft placeholder |
| Wood blinds | Instant price | $/sqft placeholder |
| Custom drapery | Custom quote | ALWAYS quote, never instant price |
| Silhouette shadings | Custom quote | Hunter Douglas = ALWAYS custom quote |
| Pirouette shadings | Custom quote | Hunter Douglas = ALWAYS custom quote |
| Plantation shutters | Custom quote | ALWAYS quote |

### Motorization rule
**Motorization is ALWAYS a sub-option inside each product configurator.**
NEVER a separate top-level page, product, or nav item.

### Motorization brand compatibility â€” CRITICAL
| Product | Motor options |
|---------|--------------|
| Norman brand shades (roller, cellular, zebra, woven) | **Norman Motorization only** â€” no Lutron/Somfy/etc. |
| Custom Roller Shades (Philly Blinds custom fab) | Any brand: Lutron Serena, Somfy, Automate, Rollease Acmeda |
| Custom Roman Shades (Philly Blinds custom fab) | Any brand: Lutron Serena, Somfy, Automate, Rollease Acmeda |
| Drapery hardware (Kirsch, Paris Texas, Orion, Forest, Select) | **Brand-specific** â€” each manufacturer only supports certain motors/track systems. Do NOT show a generic motor list for drapery hardware â€” verify per brand before adding motor options. |
| Hunter Douglas (Silhouette, Pirouette) | PowerView â€” always custom quote, no instant pricing |

### Product naming rules
- Non-Norman custom fabricated roller shades â†’ **"Custom Roller Shades"** (not just "Roller Shades")
- Non-Norman custom fabricated roman shades â†’ **"Custom Roman Shades"** (not just "Roman Shades")
- Norman brand products â†’ "Norman [Product Name]" when displayed in the configurator title

### Fabric rule â€” always 3 paths
1. We supply fabric (on-site consultation available)
2. Customer supplies fabric (ships to us)
3. Not sure â€” book consultation

### Hunter Douglas rule
ALL Hunter Douglas products = custom quote. No exceptions. No instant pricing ever.

### Brands we carry
Lutron, Somfy, Norman, Hunter Douglas, Automate, Rollease Acmeda + many more on request

### Drapery hardware brands
Kirsch, Paris Texas, Orion, Forest, Select + many more on request

### Service areas
- Salt Lake City, Utah (primary)
- Philadelphia, PA (primary)
- Out of state by request â€” premium pricing, we are upfront about travel costs

### Commercial vs residential
- Residential pricing is higher per unit
- Commercial is lower per unit but larger projects
- We work with interior designers, luxury residential, hotels, restaurants, offices

---

## PORTFOLIO ASSETS ON GITHUB

| Gallery tab | Count | Status |
|-------------|-------|--------|
| Custom draperies | 60 photos | âœ… |
| Roman shades | 11 photos | âœ… |
| Roller shades | 4 photos | âœ… |
| Videos | 14 labeled | âœ… |
| Cellular, Zebra, Woven Wood, Shutters | 0 | âŒ No photos yet |

---

## CONTENT STILL NEEDED FROM CLIENT

- [ ] Pricing tables ($/sqft per product)
- [ ] Logo file (SVG preferred)
- [ ] Hero lifestyle photo for homepage
- [ ] Spec sheet PDFs (Hunter Douglas, Norman, Lutron, Somfy)
- [ ] Real customer testimonials/reviews (currently placeholders)
- [ ] Gallery photos for Cellular, Zebra, Woven Wood, Shutters
- [ ] Service area zip codes / counties

---

## CODE STANDARDS

- All pages use `../css/global.css` and `../js/shared.js`
- Use exact color tokens â€” no hardcoded hex colors except in inline SVG art
- Mobile-first, test at 375px width
- Phone number (609) 742-1720 visible on every page
- Forms must have a success/confirmation state
- No external font dependencies
- No frameworks â€” vanilla HTML/CSS/JS only
- Filenames: lowercase, hyphenated (roman-shades.html, measure-shutters.html)

## EXECUTION PLAN
Lives at: C:\Users\Blind\Desktop\BUSINESS\Important PB\phillyblinds_execution_plan.html
Update it when completing tasks â€” mark items done.

---

## PRODUCT DATA INTEGRITY NOTES (Updated May 2026)

### Norman motorization — DO NOT mix brands
Norman-branded product pages (Soluna, Portrait Cellular, Synchrony Verticals, City Lights, SmartPrivacy Faux Wood) must use ONLY Norman-brand motors:
- Norman Smart ($482/shade)
- AutoWand ($166/shade)
- Automate Home™ ($682/shade)
Do NOT list Somfy, Lutron, Automate (the separate brand), or Rollease on these pages.
Custom non-Norman roller/roman shades CAN offer any brand in notes.

### Brightwood shutters — removed
Norman no longer offers Brightwood. Removed from product-specs.html (May 2026). If user adds it back, verify against current Norman shutter PDF catalog first.

### Normandy shutter spec corrections (May 2026)
- Max single-panel widths: 1⅞″→30″, 2½″/3″→36″, 3½″/4½″→42″ (not 24/30/36 as previously coded)
- Divider rail required over 78″ (not 74″)
- InvisibleTilt™ is the correct Norman brand name (not “Clearview” — that is Hunter Douglas)
- Matte Black (246) is a STAIN color, not a paint color
- Paint surcharge colors: 017 Gray Black, 836 Classic Black, 609 Chateau Brown (3 colors, not 4)

### Discontinued Norman fabrics
User will provide updated discontinued fabric list. When received: remove from configurators, update this section with date and affected files.

*This file is the single source of truth. If you change anything on the project, update this file.*


---

## SEO STATUS (May 2026)

- ✅ Google Search Console verified — phillyblinds.com (HTML file method)
- ✅ Canonical domain: www.phillyblinds.com (apex 308 → www)
- ✅ sitemap.xml at www.phillyblinds.com/sitemap.xml — all URLs use www.phillyblinds.com
- ✅ robots.txt with correct sitemap pointer
- ✅ All 48+ pages have og:url, og:title, og:description tags pointing to www.phillyblinds.com
- ✅ JSON-LD LocalBusiness schema in shared.js with @id/url pointing to www.phillyblinds.com
- ✅ canonical link injected by shared.js (normalizes to www.phillyblinds.com)
- ⬜ Sitemaps not yet submitted to Google Search Console (must be done manually)
*Last agent to work on this: Claude Code — May 27, 2026*
*Last session: SEO production launch — both domains live, Google Search Console verified, all og:url/canonical tags fixed to use www.phillyblinds.com on all 48+ pages, OG tags added to 18 newer product pages.*



---

## Norman Motorization Audit (May 2026)

### Source PDF verified against
- `C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\Norman\Norman Automated - Motorized shades.pdf`
- PDF title (from metadata): **"Automate Home-Norman Smart Motorization Program Reference Guide"**
- This confirms both "Automate Home" and "Norman Smart" are Norman-brand motor systems.
- AutoWand is also a Norman-brand motor system.

### Core rule — CRITICAL
Norman-brand product pages must NEVER show Somfy, Lutron, Automate (the separate brand), Rollease Acmeda, or PowerView as motor options. Use Norman-brand motors only.

### Norman motor systems (confirmed Norman-brand)
- **Norman Smart** — app, voice (Alexa/Google/HomeKit), remote, rechargeable or hardwired
- **AutoWand** — wand-controlled, rechargeable battery, no remote needed
- **Automate Home™** — 15-ch remote, wall switch, rechargeable or DC low voltage

Note: "Automate Home" is Norman's own brand — NOT the separate "Automate" brand. Do not confuse.

### Product-specific motor availability (from PDF + site audit May 2026)

| Norman Product | Motorization | Motor Systems | Charging Wand | DC Low Voltage | Notes |
|---|---|---|---|---|---|
| Soluna Roller Shades | Yes | Norman Smart, AutoWand, Automate Home | Roller: Yes (not with cassette/dual) | Yes | Rechargeable or hardwired |
| Portrait Cellular / Honeycomb | Yes | Norman Smart | Cellular: Yes (not with cassette/dual) | Yes | Motor type confirmed at measurement |
| PerfectSheer | Yes | Norman Smart | No — battery Charging Wand not available for PerfectSheer | Yes | Via shared.js normanMotorSection |
| SmartDrape | Yes | Norman Smart | Charging Extension Wand: YES as optional accessory (not a battery charger type) — DC battery charged via AC adapter only | **NO** — DC Low Voltage NOT available for SmartDrape | $642/shade; rechargeable battery or AC adapter plug-in only |
| Synchrony Verticals | No motorization | N/A | N/A | N/A | Cordless wand tilt only |
| City Lights Aluminum | No motorization | N/A | N/A | N/A | Cordless or cord-tilt only |
| SmartPrivacy Faux Wood | No motorization | N/A | N/A | N/A | Cordless only |

### Rules enforced in shared.js normanMotorSection()
- Charging Wand (battery charger type): available only for Roller and Honeycomb (Cellular) — NOT for Roman, PerfectSheer, SmartDrape, SmartFold
- SmartDrape Charging Extension Wand: this is a separate ACCESSORY (not a battery charger) — correctly shown in Step 9 accessories of norman-sheers.html for motorized SmartDrape
- SmartDrape: DC Low Voltage is NOT available (button disabled/strikethrough in UI)
- Norman Smart and Automate Home are incompatible (different RF protocols) — conflict warning enforced in shades.html
- Max 2 remotes per Norman Smart system

### Spec bar correction (May 2026)
- `soluna-roller-shades.html` line 227: Changed "Yes — multiple brands" → "Yes — Norman-brand only"

### Quote email corrections (May 2026)
- Norman Soluna roller quote: now includes `nmGetMotorSummary()` (power source, remote, hub) when motorized
- Norman Cellular quote: now includes `nmGetMotorSummary()` when motorized and brand=norman

### Prices (April 2026 Norman price book — shown as MSRP estimates on site)
- Norman Smart: $482/shade
- AutoWand: $166/shade
- Automate Home: $682/shade
- SmartDrape Norman Smart: $642/shade

---

## Discontinued Fabric Updates

### Portrait Honeycomb / Cellular — Wallace/Norman Email Chain 2025–2026

Source files inspected:
- C:\Users\Blind\PhillyBlinds Photos\fabrics\Honeycomb Shade Discontinued Colors.pdf
- C:\Users\Blind\PhillyBlinds Photos\fabrics\portrait disc (1).pdf
- C:\Users\Blind\PhillyBlinds Photos\fabrics\discontinued.png (email screenshot)
- C:\Users\Blind\PhillyBlinds Photos\fabrics\HC Color Coordination (1).xlsx

**IMPORTANT: Two product programs were audited separately:**

#### Product 1: Norman Portrait Cellular (our active product in pages/shades.html)
Uses 2025-2026 color codes with K-suffix (LF) and T-suffix (RD), e.g. C7015K, C4008T.

**Known removed color:**
- **Light Filtering C7018K Soft Stone** — removed from all cell sizes per Wallace email 2026-04-23
  - Effective: 3/6/2026
  - Affects: all 6 cell sizes (9/16"S, 3/8"S, 1/2"D, 3/4"S, 3/4"D, 1-1/4"S)
  - Status: **Already removed** from CELL_COLLECTIONS in pages/shades.html as of the 2025-2026 data update
  - ⚠️ DO NOT re-add C7018K Soft Stone to any active Portrait Honeycomb/Cellular color data

**Note on "Soft Stone RD" (C4011T):**
- C4011T is a DIFFERENT color (Room Darkening, different code)
- C4011T Soft Stone RD is STILL ACTIVE — do not remove it

**Other discontinued colors from 2025 rounds:**
The 2025 discontinued lists (8/1/2025 and 4/30/2025) affected OLD-format codes (C7001, C7002, etc.)
without K/T suffixes. These were NEVER in our active CELL_COLLECTIONS (which was rebuilt
from scratch using the new 2025-2026 HC Color Coordination spreadsheet format).
No additional removals required in site code.

**Rustica Designer Fabric (discontinued 2/1/2026):**
Rustica colors (C7004, C7409, C7610, C7113 LF + C4004, C4403, C4606, C4115 RD)
were never in our CELL_COLLECTIONS. Already handled.

#### Product 2: Wallace Honeycomb / HC Program
Wallace does NOT have a separate honeycomb/cellular product on our website.
Wallace appears in pages/product-specs.html for roller, roman, woven, and vertical products only.
No action required for Wallace honeycomb in our site code.

### Verification Completed 2026-05-16
- C7018K: not present in active CELL_COLLECTIONS ✓
- Soft Stone LF: not selectable by customer ✓
- Soft Stone RD (C4011T): still active, correct ✓
- All other discontinued codes from 2025: not in our data ✓
- Wallace Honeycomb: not a separate product on our site ✓

*Last agent to work on this: Claude Code — May 16, 2026*
*Last session: Norman motorization audit. Corrected soluna-roller-shades.html spec bar ("multiple brands" → "Norman-brand only"). Added nmGetMotorSummary() to Norman Roller and Norman Cellular quote emails. Added Norman Motorization Audit section to CLAUDE.md with product-by-product motor compatibility table. No Somfy/Lutron/Rollease/Automate-brand references found on any Norman product page. All rules in shared.js normanMotorSection() verified against PDF.*

---

## Norman PerfectSheer + SmartDrape Audit (May 2026)

### Source PDFs verified against
- `C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\Norman\Norman - Perfect Sheer Smart Drape.pdf` — February 2026 Program Reference Guide and Price Book
- `C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\Norman\Norman Automated - Motorized shades.pdf`

### CRITICAL: These are TWO separate products — never merge their configurators

---

### PerfectSheer™ Shades — Confirmed Specs (PDF Feb 2026)

**Description:** Horizontal sheer vane shade. Vanes tilt open/closed. 100% polyester fabric.

**Size limits (PDF p.4):**
- Continuous Cord Loop: min 12"W × 12"H, max **98"W × 98"H**
- Motorized: min per motorization guide; max per price book (up to **110"W × 120"H**)
- Ratio limit: height cannot exceed 4× width (1:4 ratio)
- Inside mount deduction: shade width = order width – 1/8"

**Fabric collections (PDF p.18):**
- Light Filtering: 22 colors (F1178–F1197, F1363, F1364)
- Room Darkening: 10 colors (F1200–F1209) — +20% surcharge

**Valance options (PDF p.8):**
- Curved Fascia with Fabric — free, 3.5" or 4.5", max single 93" (splice if wider)
- Fabric Valance — 3.5" or 4.5", max single 93" (splice if wider), returns on semi-IB/OB
- Modern Wood Valance — 4.5" only, 6 paint + 6 stain finishes, max single 93"
- **Valances NOT recommended for door applications**

**Mount types:** Inside Mount, Semi-Inside Mount, Outside Mount

**Operation:** Continuous Cord Loop (default right, optional left) or Motorized (Norman Smart)

**Motorization:** Norman Smart Rechargeable Battery (AC adapter charger) or AC Adapter Plug-in
- **Charging Wand (battery charger type): NOT available for PerfectSheer**
- DC Low Voltage: YES available

**Room darkening note:** Not blackout — some light passes through edges/vanes

**Door application:** Magnetic hold-downs required (+$28). Extra 1/16" fabric deduction per side.

**Accessories:** Basic Light Guard (+$45), Premium Wood Light Guard (+$117), Magnetic hold-down (+$28), Shims (+$7 each), Keystone (+$73)

**Site location:** pages/shades.html — PerfectSheer configurator, card #card-perfectsheer

---

### SmartDrape™ Shades — Confirmed Specs (PDF Feb 2026)

**Description:** Vertical sheer vane system. Fabric vanes hang from metal headrail. Drapery-style. Cordless (Best for Kids certified).

**Size limits (PDF p.24):**
- Single shade wand tilt: min track 17 5/8", max track 285 5/8", shade (F) 280 1/8"
- Side by side (wand): min track 15 5/8" each, max 284 3/8" each
- Min height: **24"**, Max height: **144"**
- Max area: **237 sq ft** (track width × height)
- Motorized min width: see motorization guide

**Fabric collections (PDF pp.40–41):**
- Light Filtering: Plain, Net, Pacific, Circle, Coronado, Teardrop (6 collections × 5–10 colors each)
- Light Filtering Essentials: Lakeshore Stripe (10 colors)
- Room Darkening: 6 colors standard, Plain and Pacific sub-collections (12 more RD colors)
- All 100% polyester. Room Darkening: +20% surcharge. Alternating colors: +10% surcharge.

**Headrail:** Sleek metal, valance-free — **NO valance available**. Colors: White, Cottage White, Matte Silver, Black, Bronze, Brass.

**Stack options (wand tilt):** Left Stack, Right Stack, Traveling Center Stack
**Stack options (motorized):** Left Stack, Right Stack, Center Stack (new Jan 2026), Center Opening

**Side by side:** Two independently operated shades butted together. Wand Tilt only. Same height required.

**Mount types (PDF p.32):** **Outside Mount ONLY**
- Wall Mount (L bracket — standard, 3 15/16" long)
- Ceiling Mount (direct mount using pre-drilled headrail, or C clip)
- Ceiling Pocket Mount (direct mount using pre-drilled headrail, min pocket depth 4 7/8")
- **NEVER inside mount — no deductions taken**

**Operation:** Wand Tilt (manual) or Norman Smart Motorized (rechargeable battery or AC adapter plug-in)

**Motorization:**
- Motor: Norman Smart ($642/shade)
- Power: Rechargeable battery (AC adapter charger) or AC Adapter Plug-in
- **DC Low Voltage NOT available for SmartDrape** — enforced in shared.js
- **Charging Wand (battery charger type): NOT available** — battery charged via AC adapter
- **Charging Extension Wand: YES — optional ACCESSORY** (not a charger), defaults to fabric color. Colors: Cloud Cream, Day Light, Silver, Black, Chocolate, Moonbeam. Available for Norman Smart rechargeable battery only. (PDF p.42, revision log 5/31/2025)

**Accessories:** Keystones ($73), Additional Wand ($89), Alternating Colors (+10%), Additional Vane Packs ($230–$540), Aluminum Shims ($28 — wall mount only), Long L Brackets ($61/shade)

**SmartJoints:** Tracks 97 5/8"–189 5/8": 1 SmartJoint. Tracks 193 5/8"–285 5/8": 2 SmartJoints.

**Patio door recommendation:** Fabric vanes overlap opening min 4" width, 3" height. Min ½" floor clearance.

**Site location:** pages/norman-sheers.html — dedicated SmartDrape configurator

---

### Corrections Made (May 2026)

| File | Correction | Source |
|---|---|---|
| pages/norman-sheers.html | req-info button: changed "PerfectSheer™ / SmartDrape™" → "SmartDrape™" | Product separation |
| pages/norman-sheers.html | normanMotorSection call: changed "PerfectSheer™ / SmartDrape™" → "SmartDrape™" | Product separation; DC Low Voltage now correctly blocked |
| pages/norman-sheers.html | Mount step: replaced Inside/Outside/Semi-Inside with Wall/Ceiling/Ceiling Pocket (Outside Mount only) | PDF p.32 |
| pages/norman-sheers.html | Auto-select default changed from 'inside' to 'wall' mount | PDF p.32 |
| pages/norman-sheers.html | Door checkbox label: "Installed on a door" → "Patio door / slider application" | SmartDrape terminology |
| pages/norman-sheers.html | Door warning: removed magnetic hold-down reference (SmartDrape does not use hold-downs) | PDF — hold-downs are PerfectSheer only |
| pages/norman-sheers.html | Quote email: mount labels updated to wall/ceiling/pocket; patio door note corrected | PDF p.32 |
| pages/norman-sheers.html | Accessories: removed magnetic hold-down from door-triggered items (SmartDrape only) | PDF |
| pages/shades.html | PerfectSheer dim notes: added CCL/motorized size distinction (CCL max 98"×98") | PDF p.4 |
| pages/shades.html | psCalc(): added CCL size validation — blocks >98" W or H for CCL, directs to motorized | PDF p.4 |
| CLAUDE.md | Motor table: clarified Charging Wand (charger type) vs Charging Extension Wand (accessory) for SmartDrape | PDF p.42 |
| CLAUDE.md | normanMotorSection() rules: added clarification on SmartDrape extension wand as accessory | PDF p.42 |

### Restrictions Confirmed

| Product | Rule | Source |
|---|---|---|
| PerfectSheer CCL | Max 98" × 98" | PDF p.4 |
| PerfectSheer Motorized | Max 110" × 120" (price book range) | PDF p.5 |
| PerfectSheer | Room Darkening +20% surcharge | PDF p.5 |
| PerfectSheer | Valance NOT recommended for doors | PDF p.8 |
| SmartDrape | Outside Mount ONLY (wall, ceiling, ceiling pocket) | PDF p.32 |
| SmartDrape | No valance — valance-free metal headrail | PDF p.23 |
| SmartDrape | Room Darkening +20% surcharge | PDF p.23 |
| SmartDrape | Alternating colors +10% surcharge | PDF p.23 |
| SmartDrape | DC Low Voltage NOT available | PDF p.24 |
| SmartDrape | Min height 24", max height 144" | PDF p.24 |
| SmartDrape | Max area 237 sq ft per shade | PDF p.24 |
| SmartDrape | Side by side: Wand Tilt only (no motorized side-by-side) | PDF p.24 |
| SmartDrape | Center Opening: Motorized only | PDF p.24–25 |
| SmartDrape | Center Stack (motorized): added Jan 2026 | PDF p.2 revision log |

### Needs Owner Confirmation
- SmartDrape motorized min width: PDF p.2 says "9/24/2025: Updated Motorized shade min. width" — exact value not in this PDF, in motorization binder
- PerfectSheer motorized min width: same — in motorization binder

*Audit completed: Claude Code — May 16, 2026*


---

## Norman Portrait Cellular / Honeycomb Audit

Audit date: 2026-05-16

### Discontinued color confirmed removed
- Light Filtering C7018K Soft Stone removed from all 6 cell sizes per Wallace email 2026-04-23
- Verified absent from CELL_COLLECTIONS and CELL_916S_LF
- DO NOT re-add. C4011T Soft Stone RD is a different active color.

### Bug fixed: 9/16" Room Darkening incorrectly blocked
- CELL_COMPAT[rd] was [2,3,4,5] but CELL_916S_RD (16 colors) was defined and used
- Fixed to [1,2,3,4,5] — RD correctly available in 9/16"S with limited 16-color palette
- FABRIC_NOTES[rd] updated to reflect this

### Motorization confirmed Norman-only for cellular
- motor-sub-norman: Norman Smart, AutoWand, Automate Home (Norman products)
- Non-Norman brands only appear in motor-sub-custom for non-Norman products

### Owner confirmation still needed
1. D&N cell sizes: HTML tooltip says 9/16"S, 3/4"S, 1.25"S only but CELL_COMPAT allows all 6
2. Automate Home motor: confirm this is Norman product, not Automate Rollease Acmeda brand
3. Windsong as D&N valid top: dn-note mentions it but D&N top picker only shows Sheer/LF

---

## Norman Soluna + Portrait Cellular Audit — 2026-05-16

### Soluna Roller Shades Audit
Verified against: Norman - Soluna Roller Shades.pdf (February 2026)

**Errors found and corrected in SOLUNA_COLLECTIONS (pages/shades.html):**

1. **Commercial solar section was missing active colors** (incorrectly commented as "all discontinued"):
   - The Feb 2026 PDF (page 20 active fabric list) shows these as ACTIVE:
     - NA400 3%: F0381 Chalk, F0382 Chalk/Beige, F0384 Charcoal
     - NA820 3%: F0407 Oyster/Pewter
     - NA400 5%: F0388 Chalk/Beige, F0390 Charcoal
     - NA400 10%: F0396 Charcoal
   - These codes also appear in the Appendix 2 under old "A400"/"A820" naming, but
     they are still offered in the current catalog under "NA400"/"NA820" naming.
   - All restored to 'commercial' section of SOLUNA_COLLECTIONS.

2. **Elements White Backing (F1108-F1113) incorrectly removed**:
   - Feb 2026 PDF (page 16) shows F1108-F1113 as ACTIVE under "Elements White Backing"
   - Old "Glamour" collection NAME was discontinued; same F-codes now under new collection name
   - Appendix p.66 lists them as discontinued from "Glamour" — not from "Elements White Backing"
   - Restored: added 'Elements White Backing' collection back to 'rd' section of SOLUNA_COLLECTIONS

**Verified correct (no changes needed):**
- Fabric collections and color codes match the Feb 2026 PDF
- Discontinued codes (Emery F0756/F0757, Shimmer F1433-F1435/F1438, Breeze F0892, Francis F0880/F0881/F0887,
  Bali F0666/F0667, Sumatra F0855, old Sheer codes) are all absent from active picker
- Bermuda F0833 Gray: correctly absent
- Pricing matrices (7 price groups) were previously verified correct

**Motorization (Norman Soluna):**
- "Norman Smart", "AutoWand", and "Automate Home™" are Norman-brand motorization products
- These are correctly labeled "Norman-brand motorization exclusively"
- Third-party brands (Somfy, Lutron, Rollease) do NOT appear as Norman Soluna motor options ✓

### Portrait Cellular Audit
Verified against: Norman - Portrait Cellular (2).pdf, discontinued files

**Previously corrected (prior session):**
- C7018K Soft Stone LF: absent from active CELL_COLLECTIONS ✓
- All 2025-round discontinued codes: never in our data (new K/T suffix format) ✓
- Rustica designer colors: never in our data ✓

**Motorization (Norman Portrait Cellular):**
- Norman Smart Motor, AutoWand, and Automate Home™ are Norman-brand options ✓
- Third-party brands (Somfy, Lutron, Rollease Acmeda) appear only for custom/PB roller shades section ✓

---

## Norman Synchrony Verticals Audit — 2026-05-16

Verified against: Norman - Synchrony Verticals.pdf (February 2026 price book)
Motorization PDF checked: No Synchrony motorization exists — confirmed cordless wand tilt only.

### Errors found and corrected in pages/synchrony-verticals.html:

1. **Grasscloth section mislabeled 5 Willow colors as "Grasscloth"**
   - Grasscloth has ONE active color: Botanical Garden
   - Mist, Birch, Burnished Clay, Cloud, Natural Gray belong to the separate "Willow" collection
   - Fixed: Split into two sections; Willow colors now call `pickFabric(this,'Willow',...)` (quote email was showing wrong collection)
   - Source: PDF p.11 Color Availability table

2. **Hero pill said "4 fabric collections"** — there are 10 distinct collections
   - Fixed to "10 fabric collections"
   - Source: PDF p.11 (Classic, S-Curved, Sandblasted, Flaxen, Adobe, Shantung, Linen, Grasscloth, Willow, Faux Wood)

3. **Hero description said "4 fabric collections"** — fixed to "10 fabric collections"

4. **Semi-inside mount was missing** — PDF has 3 mount types
   - Added: Semi-inside mount option (min depth 2 13/16″, same deductions as IM)
   - Source: PDF p.9 Mounting Requirements

5. **Shim logic allowed shims for inside mount** — fixed to outside mount only
   - Semi-inside mount also disables shims (shims = outside mount only)
   - Source: PDF p.10 Parts & Hardware: "Available for OM only"

6. **Center support note said "may require"** — it IS required at ≥78″
   - Fixed: "required and included for widths 78″ or wider"
   - Source: PDF p.10 Parts & Hardware

7. **Side-by-side rule missing** — PDF says both blinds must use same stack direction (LL or RR)
   - Added to dimensions step note
   - Source: PDF p.7 Side by Side section

8. **No wand side preference field** — headrail is reversible upon installation
   - Added wand side selector (Left/Right/No preference) in Options step
   - Field included in quote email output
   - Source: PDF p.6 Control section

9. **shared.js loaded twice** — was at line 108 AND line 585
   - Fixed: Single load at bottom with nav+footer render

### Verified correct (no changes needed):
- Pricing matrices (Groups 1–4, all widths/heights): match PDF p.33 ✓
- Size limits 18″–100″ W / 36″–108″ H: correct ✓
- Inside mount deductions −3/8″ W / −3/16″ H: correct ✓
- Discontinued Grasscloth colors (Silver Cloud, Coffee, Onyx): absent ✓
- No motorization options shown: correct ✓
- S-Curved vane data-vane attribute: correct ✓
- Shim price $7 each: correct ✓
- Freight rates ($25 first + $11 ea; $80/$50 for ≥90″): correct ✓

### Active collections (Price Group 4 includes Willow):
- Price Group 1: Classic (5 colors)
- Price Group 2: S-Curved (5 colors) + Sandblasted (4 colors)
- Price Group 3: Flaxen (4) + Adobe (5) + Shantung (7)
- Price Group 4: Linen (6) + Grasscloth (1) + Willow (5) + Faux Wood (5)

### Motorization rule:
- Synchrony Vertical Blinds = NO motorization. Cordless wand tilt only.
- Do NOT add motor options to this page ever.
- Source: Synchrony PDF has no motorization section. Norman Automated PDF does not list Synchrony.

---

## Norman City Lights Aluminum Blinds Audit — 2026-05-16

Verified against:
C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\Norman\Norman - City Lights Aluminum Blinds.pdf
(October 2025 edition)

### Product Rules
- City Lights is separate from Norman Faux Wood / SmartPrivacy Faux Wood / any wood blind.
- Do NOT mix colors, motor options, or slat rules with other Norman products.
- City Lights is CORDLESS only — NO motorization in the PDF. Do not add motor options.

### Slat Sizes (all cordless)
- ½″ Micro: min 9″ / max 78″ width, min 10″ / max 96″ height, max 50 sq ft — +10% surcharge
- 1″ Standard: same size limits as ½″ — base price (no slat surcharge)
- 2″ SmartPrivacy®: min 10.5″ / max 96″ width, min 16″ / max 96″ height, max 48 sq ft — +20% surcharge (SmartPrivacy included)

### SmartPrivacy
- STANDARD on 2″ slats only (included in 20% slat surcharge)
- NOT available on ½″ or 1″ as an add-on
- Do NOT add a separate SmartPrivacy surcharge — it is bundled into the 2″ slat price

### Privacy Slats
- Optional add-on for 1″ ONLY (+10%)
- NOT available for ½″ (regular route hole only)
- NOT available for 2″ (SmartPrivacy is already standard)

### Colors
- 33 total colors across all slat sizes
- ½″: 20 colors · 1″: 30 colors · 2″: 16 colors
- Colors with * in the PDF carry a finish surcharge: +10% metallic/perforated/matte, +20% textured
- Champagne (7029): 1″ only, +20% textured
- Porcelain (7031): 1″ only, +10% matte
- See color coordination charts (PDF pages 17-20) for headrail/rail color matching

### Mounting
- Inside Mount (IM): deducts 3/8″ from ordered width automatically
- Outside Mount (OM): shims available (optional, + each)
- Side Mount bracket: 2″ only, +/blind, inside mount only

### Pricing Matrix (1″ slat base — October 2025)
Width cols: 24-96″ (14 columns). Height rows: 42,48,54,61,66,73,78,84,90,96.
Max width for ½″ and 1″ is 78″ (84/90/96 columns are 2″ only).
Matrix verified correct in pages/city-lights-aluminum-blinds.html.

### Freight
- Standard:  first +  each additional
- Oversized (≥90″ width):  first +  each additional

### Audit Result (2026-05-16)
- Pricing matrix: CORRECT — all values match PDF ✓
- Colors/codes/surcharges: CORRECT ✓
- Size limits: CORRECT ✓
- Motorization: ABSENT (correct — not in PDF) ✓
- Bug FIXED: Privacy slat add-on was incorrectly shown for 2″ slats.
  SmartPrivacy is already standard on 2″; privacy add-on is 1″ only.

---

## Paris Texas Hardware Audit (May 2026)

### Source PDFs verified against
- `C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\paris texas\2025 Paris Texas Hardware Price List wTARIFF (email) (1).pdf` — 2022 Drapery Hardware Catalog (celebrating 30 years)
- `C:\Users\Blind\PhillyBlinds Photos\PDF PRODUCTS\paris texas\2025 Paris Texas Hardware Price List wTARIFF bdd.pdf` — Retail Price List, effective June 2, 2025 (includes 10% tariff surcharge)

### Product Systems Confirmed
| System | Diameters | Finishes Available | Max Length |
|---|---|---|---|
| Stationary / Decorative Pole | 1⅛", 1⅜", 2¼" | All (Portfolio, QS Metal, QS Wood, PTH) | 12' metal / 16' wood |
| Baton Draw Metal Traverse | 1⅛", 1⅜" | Portfolio (no AGL), QS Metal, QS Wood (1⅜" only), PTH | 20' max (spliced) |
| R-TEC Motorized Metal Traverse | 1⅜" ONLY | Portfolio (no AGL), QS Metal, QS Wood, PTH | 24' max (2 splices) |
| R-TEC Motorized Heavy Duty Traverse | 1⅜" and 2¼" fascia | Portfolio, QS Wood, PTH (NO QS Metal) | 36' max |
| Somfy Motorized Heavy Duty Traverse | 2¼" fascia ONLY | Portfolio, QS Wood, PTH (NO QS Metal, NO 1⅜") | 36' max |
| Heavy Duty Corded or Baton Traverse | 1⅜" and 2¼" fascia | Portfolio, QS Wood, PTH (NO QS Metal) | 40' max |

### Finish Collections
| Collection | Count | Systems Available |
|---|---|---|
| Portfolio (hand-painted) | 35 finishes | All systems |
| Quick Ship Metal | 6 finishes (BN, SG, RGD, BZ, CZ, MK) | 1⅜" R-TEC, 1⅛" Baton, 1⅜" Baton ONLY — NOT for HD traverse or Somfy |
| Quick Ship Wood & Resin | 5 finishes (AB, ORB, PL, RG, WAL) | 1⅜" R-TEC, 1⅜" Baton, all HD traverse — NOT available for 1⅛" systems |
| PTH Perfect Match | Any Benjamin Moore color | All systems |

**35 Portfolio finishes (confirmed):** Amulet (AM), Andiron (AND), Antique Gold (AG), Antique Gold Leaf (AGL), Art Bronze (AB), Barnwood (BW), Black (BL), Blush (BLU), Bronzed Pewter (BP), Concrete (CO), Couture (COU), Dark Chocolate (DC), Firelight (FL), Gossamer (GOS), Greige (GRE), Halo (HA), Java (JA), Linen (LIN), Luminous (LU), Manor (MA), Mink (MK), Moonlight (ML), Mystic (MYS), New Age Bronze (NAB), Patina (PAT), Shimmer (SH), Silver Maple (SM), Spicewood (SPW), Spun Gold (SPG), Stardust (STA), Starlet (ST), Titanium (TTM), Truffle (TRU), Urban Bronze (URB), White (WH)

**AGL restriction:** Antique Gold Leaf (AGL) is stationary poles ONLY — not available on any traverse system.

### Finial Collections and Cuff Rules
| Diameter | Style Category | Cuff Required for Traverse? | Notes |
|---|---|---|---|
| 1⅛" | Modern, Clean Deco, Transitional Luxe, Bohemian Chic, Rustic Retreat | YES — ALL 1⅛" finials require Transitional Cuff (PO118CUFF) or Deco Cuff (PO118DECUFF) | 2 cuff styles available |
| 1⅜" | Modern | NO — attaches directly to traverse with set screw | Finials: Adair, Ainsley End Cap, Asher End Cap, Cohen, Exton, London-Crystal, Quinn, Remi-Crystal, Sterling-Crystal, Zara |
| 1⅜" | Today's Traditional | YES — requires Transitional Cuff (PO138CUFF / QS138CUFF) | Also required when using QS Wood & Resin finishes |
| 1⅜" | Heritage Classics | YES — requires Transitional Cuff (PO138CUFF / QS138CUFF) | Also required when using QS Wood & Resin finishes |
| 2¼" | Today's Traditional, Heritage Classics | NO cuff needed for stationary or HD traverse | Not compatible with metal traverse or R-TEC slim track |

**Additional rule:** QS Wood & Resin 1⅜" traverse ALWAYS requires a Transitional Cuff for any finial style (confirmed in PDF General Info: "All 1 1/8" and Wood & Resin 1 3/8" require Transitional Cuff / Finial Adapters").

### R-TEC Motorization Details
- Motor: R-TEC Automation® Slim Drapery Motor (RTMLDSS50)
- Slim 1⅜" traverse: max 77 lbs, max 24' (2 splices), 4' minimum
- HD traverse R-TEC: max 110 lbs, max 36' (spliced), 4' minimum, 19' max continuous
- Power options: Li-ion Battery (rechargeable, 500+ cycles) or 110v AC/DC Power Transformer
- Included: Push5 5-channel handheld remote with wall mount
- Controls: 1-ch remote, 5-ch push remote, 15-ch push remote, 15-ch LCD remote, 5-ch surface wall switch, 15-ch wall box switch, interior sun sensor, **R-TEC Hub RTMHUB2** (Wi-Fi, R-TEC Automation App + voice control)
- App: R-TEC Automation App (Apple App Store / Google Play)
- **NOTE:** The control hub is called "R-TEC Hub (RTMHUB2)" — NOT "Automate Pulse 2" (that is a different brand). Do not confuse.
- 5-year warranty
- Motor can be top-mounted (HD) or side-mounted

### Somfy Motorization Details
- Somfy HD traverse: 2¼" fascia ONLY — 1⅜" NOT available with Somfy systems (confirmed PDF)
- 6' minimum, 20' max continuous, up to 36' spliced
- Motors: Glydea ULTRA 60e (132 lbs, 36' max), Glydea ULTRA 35e (77 lbs, 32' max), Irismo 45 (99 lbs, 32' max, rechargeable battery), Irismo 35 Mini (77 lbs, 32' max, DC transformer)
- App: TaHoma® (Apple App Store / Google Play)
- Curved tracks available with minimum 11.8" radius; curving fees apply
- $25 packaging surcharge for Somfy traverse orders

### Tariff / Freight Notes (PDF confirmed)
- **Tariff:** Due to U.S. government tariff policy, all Paris Texas Hardware products are subject to surcharges:
  - Existing 10% surcharge on Drapery Hardware (in place since 2019, remains in effect)
  - Additional 6% price increase effective June 2, 2025 (to offset significant cost impact of new tariffs)
- **Freight:** FOB Dallas, TX. Rowley Flat Rate Shipping Program (rates increased 10% eff. June 2, 2025). Visit paristexashardware.com/freightrate for current rates.
- **Li-ion battery surcharge:** +$25 shipping surcharge on any order containing a Li-ion battery
- **Packaging fees (net):** $10/order with pole, $10/order with traverse rod <16ft, $25 for traverse with returns, motorized traverse, or poles/rods ≥16ft
- **All prices are Suggested Retail Prices subject to change without notice. Customer-facing pricing must be labeled as estimated MSRP, confirmed at quote.**

### Bugs Fixed in paris-texas-rods.html (May 2026)
| Bug | Fix | Source |
|---|---|---|
| QS Wood & Resin incorrectly dimmed for all baton draw | Fixed: QS Wood available for 1⅜" baton draw (not 1⅛") | PDF General Info + p.56 |
| 2¼" incorrectly blocked for baton draw | Fixed: 2¼" blocked only for R-TEC (which is 1⅜" only) | PDF system table |
| QS Metal not blocked for HD traverse | Fixed: QS Metal dimmed when type=HD | PDF: HD traverse = Portfolio/QS Wood/PTH only |
| Wi-Fi Hub labeled "Automate Pulse 2 Hub" | Fixed: renamed to "R-TEC Hub RTMHUB2" | PDF p.63 |
| Irismo 45 max listed as 33' | Fixed: corrected to 32' per motor weight chart | PDF bdd p.58 |
| Somfy warn banner mentioned Kirsch tape compatibility | Fixed: removed Kirsch reference, added Somfy-specific specs | Audit |
| PTH Perfect Match showed net dollar minimums ($100/$150) | Fixed: replaced with percentage upcharges only | Policy: no wholesale prices public |
| Finial price estimates unlabeled | Fixed: labeled as "estimated MSRP, confirmed at quote" | Policy |
| Price estimate box note unlabeled | Fixed: added tariff caveat | Policy |
| 1⅜" QS Wood traverse always needs cuff | Fixed: added to cuff detection logic | PDF General Info |
| HD description max width said 40' for all modes | Fixed: clarified per motor type | PDF spec |
| Baton draw tag said "4-12' track" | Fixed: corrected to "up to 20' track" | PDF baton max 20' |

### Needs Owner Confirmation
- Exact Rowley Flat Rate Shipping Program rates (visit paristexashardware.com/freightrate for current rates)
- Whether Glydea 35e and Irismo 35 are truly both 32' max or if one differs
- Whether any finishes have been discontinued since June 2025 price list

*Audit completed: Claude Code — May 2026*
