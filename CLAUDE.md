# CLAUDE.md — Philly Blinds Website
> READ THIS ENTIRE FILE BEFORE TOUCHING ANYTHING.
> Every agent — Claude Code, Claude.ai chat, any future agent — must read this first.
> Last updated: May 2026

---

## CRITICAL — HOW ALL AGENTS STAY IN SYNC

### The three agents on this project:
1. **Claude.ai chat** — Design decisions, new page specs, content, review
2. **Claude Code (PowerShell)** — Builds and edits actual files on the computer
3. **GitHub** — The single source of truth. Master copy of all files.

### The golden rules:
- **GitHub is always the master.** Before starting any work, pull latest: `git pull`
- **Claude Code owns the files.** All file edits happen through Claude Code in PowerShell.
- **Claude.ai chat owns design decisions.** New pages, layouts, content come from there.
- **Never overwrite files with old zips.** Zips from Claude.ai chat are outdated — ignore them.
- **Always push when done:** `git add . && git commit -m "what changed" && git push`
- **Vercel auto-deploys** every push to GitHub. phillyblinds.vercel.app updates in ~30 seconds.

### Start of every Claude Code session — run this first:
```powershell
cd "C:\Users\Blind\OneDrive\Desktop\BUSINESS\Important PB\AI claude\phillyblinds"
git pull
```

### End of every Claude Code session — run this:
```powershell
git add .
git commit -m "describe what was built"
git push
```

### If Claude.ai chat gives you a file or code — do this:
Paste the content into the correct file manually or have Claude Code write it,
then push to GitHub. Do NOT unzip and overwrite the whole folder.

---

## PROJECT INFO

**Business:** Philly Blinds · Blindznation · Michael J. Healy Installations
**Phone:** (609) 742-1720 — 24/7 call or text
**Family:** Justin Healy (owner, 10yr exp) · Michael Healy (dad, 60yr exp) · Sarah Healy (sister, design/fab)
**Established:** 2014

## INFRASTRUCTURE

| Item | Value | Status |
|------|-------|--------|
| GitHub repo | github.com/mzgxfnbzpy-commits/phillyblinds | ✅ Live |
| Vercel | phillyblinds.vercel.app | ✅ Live, auto-deploys from GitHub |
| Vercel account | vercel.com/phillyblinds | ✅ |
| Local files | C:\Users\Blind\OneDrive\Desktop\BUSINESS\Important PB\AI claude\phillyblinds | ✅ |
| Domain | phillyblinds.com | ❌ Not purchased yet |
| Business email | Not set up | ❌ |
| Form backend | Not set up (use formspree.io) | ❌ |
| Payment | Not set up (use Stripe) | ❌ |

## DESKTOP SHORTCUTS (on Windows desktop)
- **PhillyBlinds — Site** → opens phillyblinds\index.html locally
- **PhillyBlinds — Execution Plan** → opens phillyblinds_execution_plan.html

---

## DESIGN SYSTEM — DO NOT DEVIATE

```css
--espresso:      #1C1510   /* nav, dark sections, hero */
--espresso-mid:  #251E16   /* cards on dark bg */
--espresso-deep: #120E09   /* footer */
--gold:          #C8973F   /* all CTAs, accents, phone */
--cream:         #F5ECD7   /* headings on dark */
--gold-mid:      #FBF7F0   /* warm section backgrounds */
Font: system sans-serif — no external fonts
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

### ✅ COMPLETE & ON GITHUB
| File | Page | Notes |
|------|------|-------|
| index.html | Homepage | Full design, all sections |
| pages/gallery.html | Gallery | 7 tabs, 75+ photos, 14 videos |
| pages/consult.html | Consultation | 3 paths, booking forms |
| pages/measure.html | Measure guide (shades) | 5 tabs, SVG diagrams, all developer handoff notes |
| pages/about.html | About | Family story, team, services, service areas |
| pages/fabric-calculator.html | Fabric calculator | Drapery, Roman, Cornice — 4 bugs fixed from ChatGPT version |
| css/global.css | Shared styles | 771 lines — complete |
| js/shared.js | Shared nav/footer | Renders nav and footer on all pages |

### ❌ STILL PLACEHOLDER — NEEDS BUILDING
| File | Page | Priority |
|------|------|----------|
| pages/shades.html | All shades | 🔴 HIGH — biggest product page |
| pages/roman-shades.html | Roman shades | 🔴 HIGH |
| pages/drapery.html | Drapery & hardware | 🔴 HIGH — fully designed in chat |
| pages/shutters.html | Plantation shutters | 🟡 MEDIUM |
| pages/measure-shutters.html | Measure guide (shutters) | 🟡 MEDIUM — 3W×3H rules, different from shades |
| pages/measure-drapes.html | Measure guide (drapes) | 🟡 MEDIUM |

---

## BUSINESS RULES — CRITICAL, DO NOT BREAK

### Pricing engine
| Product | Type | Notes |
|---------|------|-------|
| Roller shades | Instant price | $/sqft — tables not provided yet, use placeholder |
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

### Fabric rule — always 3 paths
1. We supply fabric (on-site consultation available)
2. Customer supplies fabric (ships to us)
3. Not sure — book consultation

### Hunter Douglas rule
ALL Hunter Douglas products = custom quote. No exceptions. No instant pricing ever.

### Brands we carry
Lutron, Somfy, Norman, Hunter Douglas, Automate, Rollease Acmeda + many more on request

### Drapery hardware brands
Kirsch, Paris Texas, Orion, Forest, Select + many more on request

### Service areas
- Salt Lake City, Utah (primary)
- Philadelphia, PA (primary)
- Out of state by request — premium pricing, we are upfront about travel costs

### Commercial vs residential
- Residential pricing is higher per unit
- Commercial is lower per unit but larger projects
- We work with interior designers, luxury residential, hotels, restaurants, offices

---

## PORTFOLIO ASSETS ON GITHUB

| Gallery tab | Count | Status |
|-------------|-------|--------|
| Custom draperies | 60 photos | ✅ |
| Roman shades | 11 photos | ✅ |
| Roller shades | 4 photos | ✅ |
| Videos | 14 labeled | ✅ |
| Cellular, Zebra, Woven Wood, Shutters | 0 | ❌ No photos yet |

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
- Use exact color tokens — no hardcoded hex colors except in inline SVG art
- Mobile-first, test at 375px width
- Phone number (609) 742-1720 visible on every page
- Forms must have a success/confirmation state
- No external font dependencies
- No frameworks — vanilla HTML/CSS/JS only
- Filenames: lowercase, hyphenated (roman-shades.html, measure-shutters.html)

## EXECUTION PLAN
Lives at: C:\Users\Blind\OneDrive\Desktop\BUSINESS\Important PB\phillyblinds_execution_plan.html
Update it when completing tasks — mark items done.

---

*This file is the single source of truth. If you change anything on the project, update this file.*
*Last agent to work on this: Claude.ai chat — May 2026*
