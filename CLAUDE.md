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
| pages/shades.html | All shades & blinds | Per-product configurator; roller has fascia/cassette/chain/endcap options; cellular has lift direction (BU/TDBU) + operating system separate; fabric/color placeholder; all quote forms â†’ mailto; delivery section on every form |
| pages/roman-shades.html | Custom Roman Shades | 3 styles, fabric paths, instant pricing; renamed to Custom Roman Shades; mailto + delivery |
| pages/drapery.html | Custom drapery & hardware | 6 pleat styles, hardware selector (type/brand/diameter/finish/finial/rings), motorization â†’ notes only; mailto + delivery |
| pages/shutters.html | Plantation shutters | Norman shutters: Normandy, Woodlore, Woodlore Plus (Brightwood removed); louver/frame options; mailto + delivery |
| pages/measure-shutters.html | Measure guide (shutters) | 4 tabs: inside mount, outside mount, frame styles &amp; depth, tips. 3WÃ—3H rule explained with SVG diagrams |
| pages/catalogs.html | Spec catalogs download | 32 PDFs across Norman/Wallace/Woven/Kirsch/hardware brands, pricing whited out |
| pages/product-specs.html | Product specifications | 9 tabs, 20+ products with full specs |
| pages/soluna-roller-shades.html | Norman Soluna detail page | Full product deep-dive |
| css/global.css | Shared styles | Delivery section styles; identity bar styles |
| js/shared.js | Shared nav/footer | Identity bar (Michael J. Healy Installations LLC + Philly Blinds Â· Blindznation); footer shows both brands + LLC name |

### âŒ STILL NEEDED
| File | Page | Priority | Notes |
|------|------|----------|-------|
| pages/shades.html | Fabric swatch photos | ðŸŸ¡ MEDIUM â€” picker is fully wired with Norman collections + color-dot CSS fallback; upload real swatch photos when available |

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

*This file is the single source of truth. If you change anything on the project, update this file.*
*Last agent to work on this: Claude Code â€” May 3, 2026*
*Last session summary: Header redesign (identity bar, LLC + both brands); motorization rules (Norman=Norman only, Custom=any brand); delivery/pickup section on all quote forms; mailto submit on all forms to blindznation@gmail.com; drapery motor â†’ notes only; roller hardware options (fascia, chain, end caps); cellular lift direction split from operating system; fabric/color placeholder for roller + cellular.*

