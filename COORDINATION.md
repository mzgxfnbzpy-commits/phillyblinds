# 🚦 SESSION COORDINATION BOARD

**Multiple Claude Code sessions are editing this ONE repo at the same time.**
Because everyone shares the same files, un-coordinated edits clobber each other and
commits sweep up half-finished work. This board is how we stay out of each other's way.

> **Every session: READ this file before editing. CLAIM your files. UPDATE when done.**

---

## THE 3 RULES (all sessions follow)

1. **Claim before you edit.** Add your files/area to the table below before touching them.
   If a file is already claimed by another session, DON'T edit it — coordinate here first.
2. **NEVER run `git add .` or `git add -A`.** That commits *everyone's* unfinished work.
   Stage only your own files by name: `git add path/to/your-file.js path/to/your-file.html`
3. **Commit small and often, only your files.** One session's commit must not contain
   another session's changes.

---

## 🔴 ACTIVE CROSS-RISKS (fix these first)

| File | Edited by | Problem |
|------|-----------|---------|
| `js/shared.js` | Lane A (marketing/pickers) **and** Lane B (motorization) | Two sessions edit the same file. Split by section (below) or one session applies both. |

**`js/shared.js` section ownership** (so we don't collide inside it):
- **Lane A owns:** top config vars (`_PB_*` pixels/GBP), `_injectHead` (GA/pixels), promo bar, `pbTrackEvent`, footer nav/service-areas/guides links.
- **Lane B owns:** `normanMotorSection()`, `nmGetMotorSummary()`, motor-related helpers.
- Don't edit outside your section without noting it here.

---

## LANE / SESSION MAP

| Lane | Session's job | Files it OWNS (don't touch these unless you're this lane) | Status |
|------|---------------|-----------------------------------------------------------|--------|
| **A** | SEO/advertising + **shared color-picker rollout** | `js/fabric-picker.js`; pickers in `portfolio-dual-sheer`, `wallace-3d-sheer`, `wallace-portfolio-natural-shades`, `galaxy-woven-woods`, `dynasty-woven-woods`, `synchrony-verticals`, `wallace-verticals`, `custom-roller-shades`, `walden-premier-woven`, `walden-select-woven` (.js+.html); all `custom-blinds-*` city pages, `guides*`, `service-areas.html`, `sitemap.xml`; shared.js §A above | 8 pickers done + verified; Walden Premier done; **Walden Select in progress** |
| **B** | Norman motorization + fabric/color PDF audit + Soluna | `soluna-roller-shades.*`, `shades.js`/`shades.html` (roller/cellular audit), `wallace-banded-shades.*`, `wallace-portfolio-roman.*`, `NORMAN-MOTORIZATION-SPEC.md`, shared.js §B above, `soft-treatments` canonical step | active — selectTier fix, Soluna fabric adds, Norman cross-check |
| **B2** | **Soluna PRICING audit (sub-task, DONE+pushed)** | committed `soluna-roller-shades.js` + `shades.js` (pricing only) — see check-in note below | ✅ done — engine locked to May 2026 book |
| **C** | Wallace Aluminum blinds (new product) | `wallace-aluminum-blinds.js`, `wallace-aluminum-blinds.html` | active — new files |
| **D** | _(unclaimed — paste this terminal's task here)_ | | |
| **E** | _(unclaimed — paste this terminal's task here)_ | | |

> ⚠️ Lanes A/B/C inferred from the current uncommitted file changes. **Lanes D & E: each of
> those terminals should add its job + file list here so nothing overlaps.**

---

## 📌 LANE B2 CHECK-IN — Soluna PRICING audit (2026-07-13)

**Status: DONE + pushed to `dev` (NOT live).** PB `7dcab60`+`abf9c98`; BZ `7c06e2b`+`57c654c`.
Scoped commits — pricing lines only. Verified compatible with Lane B's in-progress motor-price
display (they build on my `_solYour`/35%-off vars — no collision).

**What changed (both sites, BOTH pricing surfaces — standalone page AND shades.js inline `rn-` roller):**
- All 7 price charts rebuilt to the **May 2026 book** (were wrong; shades.js `RN_*` were also mis-mapped).
  f3 = split two-panel chart, reconstructed. Verified monotonic + corner-matched. **Do NOT revert these values.**
- Surcharges → book: SmartRelease **$86**, dual **+$70**, coupled **113/226/339**, LightGuard360 **$364**,
  basic LG **$43**, hold-down **$27**, fascia/cassette/raceway tables. Fixed shades.js coupled base×N undercharge.
- Oversize (>120"W/144"H) → manual-review (no clamp). Fascia+LightGuard folded into standalone estimate.
- Stale customer-facing `$89`→`$86` labels fixed in `soluna-roller-shades.html` + `product-specs.html` (committed).
  ⚠ `pages/shades.html` line ~752 has the SAME `$89`→`$86` label fix sitting UNCOMMITTED in the working tree —
  it'll ride with whoever commits shades.html next (Lane B). Leave it; don't be surprised by it.

**⚠ FOR WHOEVER DOES "Soluna fabric adds" (Item 1 — I could NOT safely add these):**
The `_SOL_COLL_GROUP` routing is already wired for all of these, so adding them = just dropping color codes into
`SOLUNA_FABRIC_DATA`. But be careful:
- **W120 (12%)** — Appendix 2 shows ALL colors (F0443–F0449) DISCONTINUED. Don't add.
- **NA300 (1/3/5%), NA400 (1%)** — book CONTRADICTS itself (e.g. F0355 Pearl is on the active NA300 page AND in
  the discontinued appendix under old "A300" naming). Need Norman-rep confirmation before adding.
- **Verona LF / Sumatra / Lake Tahoe** — active collections, BUT `pdftotext` mangled the color-code table AND
  **F0874 conflicts** (our data assigns F0874 to Clarissa "Burlap"; book shows it by "Verona LF"). Need the VISUAL
  PDF or rep to confirm codes. Candidate codes seen: Verona LF F0874(?), Sumatra F0864 Sand/F0865 Cumin
  (F0855 Redwood is discontinued), Lake Tahoe F1577 Stone. **Don't guess codes — would corrupt fabric data.**

---

## SHARED / DO-NOT-DOUBLE-EDIT

- `js/shared.js` — see section ownership above. **Highest collision risk.**
- `css/global.css` — coordinate here before editing (shared by all pages).
- `sitemap.xml`, `CLAUDE.md`, `COORDINATION.md` — Lane A curates; others note requests here.
- Product **fabric-data arrays** (e.g. Galaxy/Dynasty patterns): if Lane B's audit changes
  color data, that's fine — Lane A's pickers render whatever data exists. Just don't have
  the *same file* open in two sessions at once.

---

## HOW TO COMMIT SAFELY (all lanes)

```bash
# stage ONLY your files (never `git add .`)
git add js/fabric-picker.js pages/walden-select-woven.html   # example
git commit -m "Lane A: wire Walden Select color picker"
git push origin dev
```

If `git status` shows files you didn't change, **leave them unstaged** — they belong to
another lane.

---

## 🛠️ BETTER LONG-TERM FIX (recommended)

One shared folder = constant collision. The clean solution is **git worktrees** — each
session gets its own folder on its own branch, so edits never clobber and merges happen in
git. Ask Lane A to set this up if you want to switch. Until then, this board is the guardrail.

---

_Last updated by: Lane A (SEO + color pickers). Add your lane above._
