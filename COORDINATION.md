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
| **C** | Wallace Aluminum blinds (new product) | `wallace-aluminum-blinds.js`, `wallace-aluminum-blinds.html` | active — new files |
| **D** | _(unclaimed — paste this terminal's task here)_ | | |
| **E** | _(unclaimed — paste this terminal's task here)_ | | |

> ⚠️ Lanes A/B/C inferred from the current uncommitted file changes. **Lanes D & E: each of
> those terminals should add its job + file list here so nothing overlaps.**

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
