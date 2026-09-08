# HANDOFF

Working state for the Philly Blinds / Blindznation dev branches. Update this file
every time a task changes state, not at the end of a session. See UNATTENDED
OPERATION RULES at the top of CLAUDE.md.

Branch: `dev` on both repos. Blindznation lives at
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation` and its live
branch is `main`, not `master`.

---

## QUEUE

1. Mirror the soft-treatment pricing rewrite to Blindznation (see IN PROGRESS —
   PB is done, BZ has had none of it).
2. Woven wood: condense the fabric lists into tabs by price group, Soluna style.
   Affects galaxy-woven-woods, dynasty-woven-woods, walden-premier-woven,
   walden-select-woven. None of the four has tabs today.
3. Zebra / sheer: colours into compact tabs. Basic vs Premium already share one
   page (zebra-shades.html links both tiers to wallace-banded-shades.html), so
   that half of Justin's original request is already satisfied — verify before
   rebuilding anything.
4. General rule from Justin: any product with many colours gets tabs rather than
   one long open list.
5. Fabric width is hardcoded 54" in the drapery cut maths. Justin's 118" goods,
   drop repeats and railroading are NOT handled and are quoted by hand. Build
   this properly as its own piece of work.

## IN PROGRESS

**Soft-treatment pricing rewrite — Philly Blinds only, UNCOMMITTED.**
All of it is in `js/pages/soft-treatments.js` plus the cornice/valance height
inputs in `pages/soft-treatments.html`. Verified with jsdom; all of Justin's
stated numbers reproduce exactly.

- Drapery: $125 unlined / $135 lined per cut, goblet+barrel +$20. Length bands
  add 0 / 20 / 35 / 70 then +$35 per further 10" to 185". Over 185" returns null
  from `dDrapeRatePerWidth` and the page shows no price at all.
- Cuts: `(rod + allowance) × fullness ÷ 54`, allowance = return × 3 (4"→12",
  6"→18" per Justin). Yards: `(length + 16) ÷ 36` per cut.
- Cornice / valance: $35/LF, $200 minimum per piece, fabric NOT included.
  Rate steps on HEIGHT: ≤15" $35 · 16–35" $70 · 36–55" $95 · 56–75" $120 · +$25
  per further 20". Both the dedicated tabs and the drapery add-on share
  `dBoardRatePerFt`.
- Romans: lining adds $5/sqft.
- Oversize freight: over 80" wide, $500 minimum, non-Norman only. Cornice and
  valance can avoid it by splicing (board jointed, fabric one piece) — the
  splice checkbox is read as `<prefix>-splice` but **the checkbox is not in the
  HTML yet**, so it currently always reads false and freight always applies.
  Finish that before committing.

**Exterior roller crank/motor side — BOTH SITES, UNCOMMITTED.**
Step 5 now asks which side the crank (manual) or motor (motorized) sits on. Label
follows the operation and the answer resets if the operation changes. Flows into
the panel, cart line and quote email. Verified on both sites.

## BLOCKED

1. **Norman Soluna fabric list.** Justin said the fabric choices have changed and
   he will send the update. Nothing to do until that data arrives. Everything
   else on the Soluna page is current.
2. **$500 oversize freight — scope.** Justin said "all products over 80 inches
   wide except the Norman products". Applied to romans and to cornice/valance.
   Unclear whether it should also hit **drapery** (soft goods fold into a box and
   arguably ship parcel) and **Basic Roller** (in-house, so non-Norman by the
   letter of the rule, but it would jump an 84" roller from $25 freight to $500).
   Currently NOT applied to either. One word from Justin — "yes both", "drapes
   only", "boards only" — unblocks it.
3. **Width allowance beyond Justin's two numbers.** He gave 4" return → +12" and
   6" → +18". Both are exactly 3× the return, so `dWidthAllowance` uses ×3. If a
   5" return should be +15" this is right; if not, he needs to give the rule.
4. **Wallace Aluminum colour names.** Still placeholders. The chart is an image
   in the PDF and there is no OCR in this environment. Needs Justin to paste the
   names or send a screenshot.
5. **Soluna Item-1 swatches** (Verona / Sumatra / Lake Tahoe / NA300 / W120).
   W120 is discontinued, the NA300 codes contradict the book, and F0874 collides
   with Clarissa "Burlap". Needs a visual PDF or Justin's call.
6. **Merge to master / main.** Everything below is on dev only. Only the word
   "confirmed" from Justin unlocks a live merge.

## DONE

- `5e194a7` (PB) · `f0f7dc3` (BZ) — stopped quote-only products advertising
  instant pricing: 46 spots over 14 pages, hero pills, card badges and the meta
  descriptions Google shows. The six priced products keep their copy.
- `e891e56` (PB) · `dab9746` + `3aec6f3` (BZ) — live pricing scope. Six products
  price (soft treatments, Basic Roller, Norman Soluna roller, Portrait cellular,
  faux wood, real wood); everything else configures fully and submits for a
  custom quote with no price shown. Gated by `PB_QUOTE_ONLY_PAGES` in shared.js.
  Same commits carry the Room Darkening → Blackout display rename.
- Fixed: the "LIVE MODE — hide all public pricing" block in `css/global.css` had
  no body scope, so it hid `.price-box` / `.addon-price` / `#q-total` on every
  page. Faux wood was priced correctly in JS but silenced by that CSS. Now scoped
  to `.pb-quote-only`.
- Fixed (UNCOMMITTED, both sites): the live-site hostname gate in shared.js had
  33 pages (32 on BZ) whose configurator was deleted on load and replaced with a
  "call us" panel — which is why cellular, Soluna roller and faux wood appeared
  to have no pricing on the live domain. `CONF_PAGES` is now empty; pricing is
  gated per product instead. Put a slug back in that array to re-block a page.
- Verified resolved: the Soluna colour-picker bug (default swatches now render on
  load — 96 of them, both sites). The note calling it open was stale.

## NOTES FOR THE NEXT SESSION

- Regression test that matters after any fabric or label change: Portrait
  cellular at 36×60 must price **$311 light filtering vs $373 blackout**
  (ratio 1.20). That ratio is what proves the +20% surcharge still fires.
- jsdom harnesses live in the session scratchpad, not the repo. Two gotchas if
  you rebuild them: jsdom fetches neither `<script src>` nor
  `<link rel=stylesheet>`, so both must be inlined into the HTML **in document
  order**, and pages must be loaded from a `localhost` URL or the live-site gate
  changes what renders.
- When replaying a diff from one site onto the other by string replace, pass a
  **function** to `String.replace`, never the replacement string: these files are
  full of `'): $' +` and `$'` means "everything after the match", which splices
  the whole file in.
- Pricing changes require Justin's explicit approval. Everything currently in the
  code was directed by him in session on 2026-09-07.
