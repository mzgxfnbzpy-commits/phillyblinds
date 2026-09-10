# MASTER UI CONSISTENCY AUDIT — QA REPORT
_Philly Blinds website · generated 2026-06-24_

**Gold standard / reference page:** `pages/soluna-roller-shades.html` + shared helpers in `js/shared.js`.
**Standard component vocabulary:**
- Selection controls = `.opt-btn` / `.opt-btn.sel` (teal bubble buttons; `--gold` token renders teal `#2DE0C1`)
- Layout = `.config-grid` (1fr 320px) with right-side **sticky `.summary-card`**
- Product cards = Soluna family `.op-card / .vcard / .lc-card / .mount-card / .related-card` (rounded 12px, teal hover)
- Cart = `pbAddToCart` / `pbCollectItem` / `pbRenderEstimate` / `pbOpenCart` (shared.js)
- Bottom of every configurator = **+ Add to Cart**, **Submit Order for Review**, cart access (nav cart button → `pbOpenCart`)
- Nav/footer/cart auto-render from `<body data-page="…">` (shared.js:1814-1820) — **no inline `renderNav()` needed**

> ⚠️ **Dual-site rule:** every fix below must also be applied to the Blindznation sister site (swap email/domain/brand/colors only).

---

## 1. CONFORMANCE SCOREBOARD (56 pages audited)

| Verdict | Count | Pages |
|---|---|---|
| 🔴 **Broken** | 3 | wallace-3d-sheer · wallace-verticals · walden-premier-woven / walden-select-woven (unbuilt stubs) |
| 🟠 **Major** | 5 | shades (hub) · real-wood-blinds · portfolio-dual-sheer · wallace-woven · hardware-quote |
| 🟡 **Minor** | ~20 | most newer configurators — class-vocabulary drift + submit-bypasses-cart |
| 🟢 **Conforms** | ~26 | soluna (ref), all hubs, redirect stubs, roman/centerpiece/wallace-portfolio-roman, kirsch trio, finial-company, synchrony |

---

## 2. 🔴 BROKEN — fix first

### wallace-3d-sheer.html — file corruption
- Valid document ends at line 459 (`</html>`); **~890 lines of orphaned/duplicated JS follow** (1348 total). 12 `</html>` tags, 9 duplicate `submitQuote` blocks pasted as raw body text, unterminated template-literals (e.g. line 461 `const lines=['Base:`) → JS syntax errors abort page scripts.
- **Fix:** truncate the file at line 459; keep only the clean external JS; re-test cart flow.

### wallace-verticals.html — nav/footer/cart dead
- Uses `id="nav-root"` (line 59) / `id="footer-root"` (line 235). shared.js auto-init writes to `#site-nav` / `#site-footer`, which don't exist → `renderNav()` throws → **no top nav, no cart button, no phone, no footer** on the whole page.
- **Fix:** rename `nav-root`→`site-nav` and `footer-root`→`site-footer`.

### walden-premier-woven.html + walden-select-woven.html — unbuilt stubs
- "Full Configurator Coming Soon" placeholders. All choices are `<select>` dropdowns (no `.opt-btn`), **no pricing**, **no `<img>` assets**, no sticky summary, alert-only name/phone validation, no success state.
- **Fix:** build the real Soluna configurator (or hide/unlink until built — note the woven hub doesn't even link Select).

---

## 3. 🟠 MAJOR

### shades.html (mega-hub)
- PerfectSheer inline configurator hard-disabled (`display:none!important`, lines 2061-2062) — markup + `psCalc` present but unreachable. No working inline Cellular config (card links out).
- Main `addToCart()` uses a **legacy custom cart** (`cart.push` / `.cart-wrap` / `renderCart`), not `pbAddToCart`; only the PB-roller sub-path uses `pbCollectItem`/`pbOpenCart`.
- No `.config-grid`/sticky `.summary-card`; leftover legacy CSS (`.price-box`, `.cart-wrap`, `.rt-card`, `.rn-fabric-card`, etc.); several `<select>` dropdowns instead of `.opt-btn` (HD 1550/1560, PerfectSheer 2123/2243/2276, quick-quote 2418).
- _Note: outward `.product-card` cards ARE Soluna-conformant — no old square cards remain._
- **Fix:** finish the Option-B refactor — convert remaining inline configs to standalone-page links and route the one cart through `pbAddToCart`.

### real-wood-blinds.html
- **No "+ Add to Cart" button and no `pbAddToCart`** — only a mailto `submitForm()`.
- Contact inputs (`f-name`/`f-phone`/`f-email`, lines 463-466) lack `data-pb-contact`; submit lacks `data-pb-require-contact` → shared contact guard never runs (email format unvalidated). No Address field.
- **Fix:** add Add-to-Cart wired to `pbAddToCart`; add `data-pb-contact` attrs + `data-pb-require-contact`.

### portfolio-dual-sheer.html
- Off-template 14-step vertical wizard; **Step 1 is Fabric Type, not Window Measurements** (W/H at step 4, mount step 3, qty step 13); no `.config-grid`/`.summary-card`.
- `submitQuote` is mailto-only (never `pbCollectItem`/`pbRenderEstimate`). **Placeholder phone `(215) 555-0100`** (line 463) — required `(609) 742-1720` absent.
- **Fix:** add Step-1 measurement block + sticky summary; wire cart; fix phone number.

### wallace-woven.html
- Primary choices = custom `.choice-card` rectangles; selection bubbles use `.opt-pill` (not `.opt-btn`). No `.config-grid`/sticky summary.
- **Placeholder fabric data still live** (`code:'ZH-'+…`, `group:'TBD'`) → surfaces "Group ?/TBD" in summary + email.
- 2 of 3 submit paths mailto-only (`submitRollerQuote`, `submitQuote`); only `addWallaceWovenToCart` uses the cart — so "Submit Order for Review" skips the cart.
- **Fix:** route submits through cart; replace placeholder fabric codes/price groups with verified data.

### hardware-quote.html
- **No cart** (no Add-to-Cart / `pbAddToCart` / `pbOpenCart`) — mailto-only. Submit button reads "Complete required fields to submit →", not "Submit Order for Review". Scope overlaps the per-brand rod configurators (possible redundant duplicate).
- **Fix:** add cart + standard button label, or retire in favor of the dedicated brand pages.

---

## 4. FINDINGS BY DELIVERABLE CATEGORY

### Missing features
- shades.html: inline PerfectSheer disabled; no inline Cellular config.
- walden-premier / walden-select: configurators not built.
- real-wood-blinds: no Add-to-Cart, no Address field.
- woven-wood-shades hub: only links 3 of 5 brands (missing Walden Select + Wallace).
- soft-treatments drape/roman tabs: no quantity stepper / mount selector.

### Inconsistent layouts  *(the #1 systemic gap)*
- **~20 newer configurators use `.config-layout` (1fr 300/308px) + `.quote-panel`/`.spec-panel` instead of the gold `.config-grid` (1fr 320px) + `.summary-card`.** Functionally sticky & teal, but the class vocabulary diverges from the reference. Affects: galaxy/dynasty woven, perfectsheer, norman-sheers, wallace-banded, synchrony, shutters, all hardware rod pages, portrait-cellular/faux-wood/city-lights (use `.quote-panel`).
- No `.spec-bar` (sticky spec strip) on most non-roller pages.
- portfolio-dual-sheer & wallace-woven: linear wizards with no right-side summary at all.
- wallace-portfolio-natural-shades: summary is a **left-column** panel, not right-side sticky; submit not styled `.btn-gold`.
- Hardware family splits into two sub-patterns (wizard step-bar vs accordion) — pick one.

### Broken selectors
- wallace-3d-sheer: syntax-error JS (corruption) — selectors dead.
- wallace-banded-shades: `setProd` references non-existent `#opts-2d` (js:161) → TypeError selecting "Banded 2D"; operator-precedence bug in `submitQ` total math (js:629).
- dynasty-woven: liner colors use `<button class="clr-btn">` pills, not `.opt-btn`; dead code in `getValanceSurcharge()`.
- shades.html: multiple `<select>` dropdowns where `.opt-btn` expected.
- Selection-class drift everywhere: `.opt-card` (cellular/wood/perfectsheer/norman-sheers/finial/hardware-quote), `.opt-pill` (paris-texas/kirsch/orion/wallace-woven), `.clr-btn`, `.choice-card` — vs canonical `.opt-btn`. `select-rods` is the only brand page using `.opt-btn` correctly.

### Missing pricing
- walden-premier / walden-select: no estimate at all (mailto body only).
- wallace-woven: placeholder "TBD" price groups.
- shades.html: PerfectSheer instant price unreachable (hidden).
- _(Quote-only by design — NOT misses: shutters, Hunter Douglas, drapery, hardware rods, verticals per owner policy.)_
- Open item from CLAUDE.md: custom roller/zebra/woven still on placeholder $/sqft pending Justin's rates.

### Missing images
- portrait-cellular.html: hero uses `SILOUETTE.JPEG` (a Silhouette photo) on a **Cellular** page — wrong product image (line 22).
- walden-premier / walden-select: zero product images.
- wallace-portfolio-natural-shades: `woven-wood-shades.png` referenced with no `onerror` fallback.
- Many fabric pickers render CSS color-dots instead of swatch `<img>` (portfolio-dual-sheer 95 fabrics, etc.) — **known/acceptable** until real swatch photos are supplied (per CLAUDE.md).
- _All hero/thumbnail/portfolio images spot-checked exist on disk._

### Missing validations
- real-wood-blinds: no shared contact guard (no `data-pb-contact` / `data-pb-require-contact`).
- soft-treatments (drape/roman), walden stubs, wallace-woven (roman path): name+phone via `alert()` only — no email-format check, no `pbContactValid`.
- exterior-roller-shades, wallace-portfolio-natural-shades: submit handlers do their own weaker check (no email format) despite declaring `data-pb-require-contact`.

### Missing cart integration  *(systemic — confirm against policy)*
- **"+ Add to Cart" works almost everywhere**, but **"Submit Order for Review" bypasses the cart** on most pages — routes to `mailto:` or `/api/quote` instead of `pbCollectItem`/`pbRenderEstimate`. Affected: faux-wood, city-lights, wallace-banded, portfolio-dual-sheer, perfectsheer, norman-sheers, wallace-woven, soft-treatments, hardware, hardware-quote, shutters.
- **True cart gaps (no Add-to-Cart at all):** real-wood-blinds, hardware.html, hardware-quote.html.
- ⚠️ **Policy check:** CLAUDE.md documents `mailto:blindznation@gmail.com` as the intended quote backend, and the payment-flow memory says button = "Submit Order for Review". Decide whether Submit should (a) collect into the cart then checkout, or (b) remain mailto — then make ALL pages consistent. Right now it's mixed (mailto vs `/api/quote` vs cart).

---

## 5. SMALLER / POLISH ITEMS
- drapery.html: add `<meta name="robots" content="noindex,nofollow">` for parity with roman-shades redirect stub.
- norman-centerpiece-roman.js:537: dead `autowand`/`automate` motor labels (Centerpiece is Norman-Smart-only) — remove.
- wallace-natural-roller-shades.html: duplicate og/twitter meta block (lines 19-28) — dedupe.
- paris-texas-rods.html:253: PTH Perfect Match shows "$100/$150 minimum" — should be percentage-only (no public wholesale prices), per prior CLAUDE.md audit.
- city-lights: "15% discount" note vs sibling Norman pages' "35%" — confirm correct rate.
- norman-sheers / wallace-banded etc.: success copy says "Your email app opened" while code does a fetch POST — fix message to match actual behavior.
- exterior-roller-shades & roller-shades hub copy advertises "instant quote" but flow is quote-only — reconcile copy.

---

## 6. RECOMMENDED FIX ORDER
1. **Broken pages** (user-facing failures): wallace-3d-sheer (truncate), wallace-verticals (rename IDs), build/hide Walden Premier+Select.
2. **Cart/validation gaps:** real-wood-blinds (add cart + validation), hardware-quote + hardware.html (add cart), portfolio-dual-sheer (phone + cart).
3. **Decide the Submit policy** (cart vs mailto) and apply it uniformly to every configurator.
4. **Data cleanup:** wallace-woven placeholder fabrics; shades.html legacy cart/CSS; portrait-cellular hero image.
5. **Systemic layout/class normalization:** migrate `.config-layout`/`.quote-panel`/`.spec-panel`/`.opt-card`/`.opt-pill` → gold `.config-grid`/`.summary-card`/`.opt-btn` across the ~20 newer pages (largest effort, lowest user-facing risk — schedule as a sweep).
6. **Polish list** (Section 5).
7. **Mirror every change to Blindznation.**
