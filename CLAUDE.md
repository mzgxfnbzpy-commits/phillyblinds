# CLAUDE.md â€” Philly Blinds Website
> READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING.
> Every agent â€” Claude Code, Claude.ai chat, any future agent â€” must read this first.
> Last updated: May 2026

---

## CRITICAL â€” HOW ALL AGENTS STAY IN SYNC

### The three agents on this project:
1. **Claude.ai chat** â€” Design decisions, new page specs, content, review
2. **Claude Code (PowerShell)** â€” Builds and edits actual files on the computer
3. **GitHub** â€” The single source of truth. Master copy of all files.

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
| Domain | phillyblinds.com | âŒ Not purchased yet |
| Business email | Not set up | âŒ |
| Form backend | Not set up (use formspree.io) | âŒ |
| Payment | Not set up (use Stripe) | âŒ |

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
| pages/norman-sheers.html | **Norman Sheers (NEW)** | 10-step PerfectSheer + SmartDrape configurator; live validation rules; fabric swatches; valance/splice; accessories; door rules; sticky spec panel; custom quote triggers |
| pages/roman-shades.html | Roman Shades | REDIRECTS to soft-treatments.html?tab=roman |
| pages/roman-shades.html | Custom Roman Shades | 3 styles, fabric paths, instant pricing; renamed to Custom Roman Shades; mailto + delivery |
| pages/drapery.html | Custom drapery & hardware | 6 pleat styles, hardware selector (type/brand/diameter/finish/finial/rings), motorization â†’ notes only; mailto + delivery |
| pages/shutters.html | Plantation shutters | Norman shutters: Normandy, Woodlore, Woodlore Plus (Brightwood removed); louver/frame options; mailto + delivery |
| pages/measure-shutters.html | Measure guide (shutters) | 4 tabs: inside mount, outside mount, frame styles &amp; depth, tips. 3WÃ—3H rule explained with SVG diagrams |
| pages/paris-texas-rods.html | **Paris Texas Hardware Configurator (NEW)** | 8-step configurator. Covers all 3 rod types (stationary, baton traverse, R-TEC motorized, heavy duty). All 35 Portfolio + 6 QS Metal + 5 QS Wood & Resin + PTH Perfect Match finishes. All 3 diameters (1⅛"/1⅜"/2¼"). Full finial catalog with compatibility rules (cuff requirements). R-TEC pricing estimator. Somfy motor options. All compatibility restrictions enforced (AGL only static, 1⅛" cuffs, 1⅜" TT/HC cuffs, 2¼" no metal traverse, Somfy 2¼" only, slim/flat/mitered no finials). Quote via mailto. Linked from hardware.html Paris Texas brand card. |
| pages/kirsch-rods.html | **Kirsch Rod Selector (NEW)** | 7-step configurator for all Kirsch rod types. Covers Designer Metals (8 finishes, 27 finials, 1"/1⅜"/2"), Wood Trends (9 finishes, 18 finials, 1⅜"/2"), Wrought Iron (6 finishes, 18 finials, 1"/1⅜"), Architrac 94001, Basic hardware. AMP™ motorization step. Quote via mailto. Linked from hardware.html Kirsch brand card. |
| pages/select-rods.html | **Select Rod Configurator** | Select brand hardware configurator. Linked from hardware.html Select brand card. |
| pages/city-lights-aluminum-blinds.html | **Norman City Lights Aluminum Blinds** | Norman aluminum blind configurator. |
| pages/synchrony-verticals.html | **Norman Synchrony Verticals** | Norman vertical blind configurator. |
| pages/hardware-quote.html | Hardware Quote | Hardware quote request form. |
| pages/installation.html | Installation Services | Service info and install booking. |
| pages/upholstery.html | Custom Upholstery | Upholstery services page. |
| pages/privacy.html | Privacy Policy | Privacy policy. |
| pages/product-specs.html | Product specifications | 9 tabs, 20+ products with full specs. Brightwood removed (not offered). |
| pages/soluna-roller-shades.html | Norman Soluna detail page | Full product deep-dive. Norman motorization ONLY — do not add Somfy/Automate/Lutron. |
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
*Last agent to work on this: Claude Code — May 16, 2026*
*Last session summary: Full site audit â€” 0 broken links, 0 broken images, all 765 portfolio images verified, all nav/footer/meta/phone present on every page. Replaced 6 remaining SVG placeholders in soft-treatments.html with real photos (3-Prong Tack Bottom, Flat Roman, Hobbled Roman, Relaxed Roman, TDBU, Arch/Specialty). All pleat and roman style cards now use real photos. Chatbot needs ANTHROPIC_API_KEY set in Vercel env vars to go live.*



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
