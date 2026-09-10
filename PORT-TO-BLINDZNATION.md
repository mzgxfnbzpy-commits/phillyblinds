# Port checklist — Philly Blinds consistency work → Blindznation

**Purpose:** apply the July 2026 configurator-consistency overhaul (done on phillyblinds `dev`) to Blindznation.
**Run this FROM a Blindznation session** (in the `blindznation` folder). Do NOT copy phillyblinds files over — BZ has its own branding, its own standardization commits, and (as of this writing) 8 unpushed commits + 12 uncommitted files. Apply the changes below onto BZ's own files.

**Reference:** the exact code lives in the phillyblinds repo, commit range `00e455a..dce79ad` on `dev`. From BZ you can open the phillyblinds files side-by-side or `git show <sha>:<path>` in the phillyblinds repo to copy exact snippets. Key reference files: `js/shared.js`, `css/global.css`, `pages/real-wood-blinds.html` (Step-1 + final-step reference), `pages/soluna-roller-shades.html` (master), `pages/faux-wood-blinds.html` (pill reference).

**Brand rule:** everything below is brand-neutral markup/JS. Do NOT change BZ's email/domain/brand strings. Forms already `mailto:blindznation@gmail.com` on both sites.

---

## 1. `js/shared.js` — add these (brand-neutral, additive). Copy from PB shared.js.
- **`pbContactStepHTML(opts)`** — the canonical final "Your details" step (Name+Phone, Email, Address, Notes, file upload, optional `+ Add to Cart`, `Submit Order for Review →`). Field ids `cf-name/cf-phone/cf-email/cf-address/cf-notes`, files `cf-files`, error `cf-contact-err`. Options: `stepNum`, `submitFn`, `cartFn`, `bare`. Includes a hidden honeypot `pb-hp`.
- **`pbSizeMountStepHTML(opts)`** — canonical Step 1 dim-box (Width/Height + mount pills + qty). Options incl. `noMount` (drapes), `noQty`, `coupled` (Soluna only), `bare`, ids/min/max/hints.
- **`pbAdjQty(id,delta,min,max)`** — shared qty stepper handler.
- **`_pbContactEl(key)`** — returns the first *visible* `[data-pb-contact=key]`; **`pbContactValid`** must use it (so a hidden 2nd form can't block submit).
- **Per-unit labels:** `pbRenderShadeLabels(wrap)`, `_initShadeLabels()` (auto-injects a qty-driven label block after every `.qty-btns`), `pbGetShadeLabels()`.
- **Wiring:**
  - init: add `_initShadeLabels();` to the `setTimeout(...)` in `renderFooter` (next to `_initFileUploads`/`_initCartExtras`).
  - `_pbMergeCartExtras(item)`: append `pbGetShadeLabels()` as an item line (see PB `dd7bc35`).
  - the `data-pb-require-contact` capture-phase click interceptor: (1) block if honeypot `pb-hp` is filled; (2) after contact passes, fold `pbGetShadeLabels()` into `#cf-notes`.

## 2. `css/global.css` — add
`.step-note`, `.qty-btns`, `.qty-btn`, `.qty-num`, `.dim-unit` (see PB global.css; `.dim-box`/`.form-row`/`.form-group`/`.opt-btn`/`.opt-row` should already exist).

## 3. Per-configurator pattern (apply to every product page)
- **Step 1 = "Window measurements & mount"** (exact lowercase title): teal `.dim-box` with single decimal Width/Height inputs (`step="0.125"`) + `.dim-unit` hints → `.step-note` "How to measure → • Approximate is fine…" → **Mount type** `.opt-row` of `.opt-btn` pills **"Inside mount" / "Outside mount"** (lowercase) → shared `.qty-btns` stepper. Merge any scattered Mount/Dimensions/Quantity steps into this ONE first step; renumber `.step-num` contiguously; fix orphaned refs.
- **Final step:** replace the page's contact fields + Submit/Add-to-Cart with `<div id="pb-final-step"></div>` + a bottom inline script: `document.getElementById('pb-final-step').innerHTML = pbContactStepHTML({bare:true, cartFn:'…', submitFn:'…'});` Rewire the page's submit fn to read `cf-*` and use `cf-contact-err`. (PB reference `2d6b0c2`.)
- **Options:** big `opt-card` boxes → small `.opt-btn` pills in `.opt-row`; descriptions → a `.step-note`. Keep **photo/SVG pickers** as-is (pleat styles, roman styles). Update JS `.opt-card` selection selectors → `.opt-btn`.
- **Per-unit labels:** remove any ad-hoc "room/window label" field + its JS reads — the shared feature (after `.qty-btns`) now handles it. (PB `4cd2493`,`956c0c1`.)
- **Text normalization:** mount labels lowercase ("Inside mount"); remove "from Huntingdon Valley" from all ship text; Soluna operating option "Continuous Cord Loop" → **"Manual with chain"** (button + description + summary + quote map).

## 4. Product-specific rules
- **Drapes** (soft-treatments): NO inside/outside mount. Flow: size + **quantity** (add `drape-qty`) → **Panel configuration** ("Single panel" / "Pair (split draw)" default) → Overlaps & returns (editable Overlap, default 3") → Fullness → **Hems** (editable Side 2" / Bottom 4"). Ripple: size → qty → single/pair → fullness → **butt master / overlap**. Pricing: qty scales only per-window labor/fabric/lining/trim; cornice/valance/shipping added ONCE. (PB `90f363e`,`bbd1a00`,`76136d2`.)
- **Roman** (soft-treatments): Step 1 = size + Inside/Outside mount + qty (merge dims+mount+qty). **Cornice/Valance:** add Inside/Outside mount + qty. Rename the cornval valance fabric group to `grp-cv-val-fabric` (avoid dup id with roman valance). (PB `6f82a9a`,`f2f3541`.)
- **Hardware/rods** (kirsch/paris-texas/orion/select/finial): **Width only + qty** (no height/mount). (PB `4e64698`.)
- **SmartDrape** (norman-sheers): keep **Wall/Ceiling** mount (outside-only) — do NOT add Inside/Outside.
- **Shutters:** keep its own W×H per opening; add qty stepper + Inside(frame-to-frame)/Outside measurement pills.
- **Coupled Shades:** Norman Soluna roller ONLY — never elsewhere.

## 5. Watch-outs / preserve on BZ
- BZ has uncommitted WIP in soft-treatments/shades/galaxy/dynasty/portfolio-dual-sheer/3d-sheer/etc. — reconcile with these changes, don't discard blindly.
- BZ already has `CONFIGURATOR-STANDARD.md` and a "shrink opt-btn pill" commit — align, don't duplicate/fight it.
- After each page: `node --check` its JS; confirm no duplicate ids; confirm one `.qty-btns` per single-flow page.

## 6. PB commit map (for exact diffs, `00e455a..dce79ad` on phillyblinds `dev`)
- `5c89a05` add pbContactStepHTML · `2d6b0c2` final-step template · `b6272c0`/`fa1a71c`/`92801c7`/`7018eea`/`7cdc8b8`/`7e40015` final-step rollout
- `cea2bcf` shipping origin removed · `d527832`+`336b144`/`d85e4d9`/`25dad8f` opt-btn pills · `516c665` Manual with chain
- `a698fbd` cellular Step 1 · `912b3f7`/`30a2d5d`/`807fb6d`/`0fc58d9`/`0fac04e` Step-1 batches · `4e64698` hardware Step 1
- `76136d2`/`6f82a9a`/`90f363e`/`bbd1a00` soft-treatments (drapes/roman/cornice/valance) · `4c1643e` shades.html
- `dd7bc35`/`4cd2493`/`956c0c1` per-unit labels · `77468b8` honeypot · `f2f3541` dup-id · `3a56935`/`9c42960` text normalization
