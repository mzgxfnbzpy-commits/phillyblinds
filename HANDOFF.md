# HANDOFF

Working state for the Philly Blinds / Blindznation dev branches. Update this file
every time a task changes state, not at the end of a session. See UNATTENDED
OPERATION RULES at the top of CLAUDE.md.

Branch: `dev` on both repos. Blindznation lives at
`C:\Users\Blind\Desktop\BUSINESS\Important PB\AI claude\blindznation` and its live
branch is `main`, not `master`.

---

## QUEUE

1. Mirror the soft-treatment pricing rewrite to Blindznation — PB is done, BZ
   has had none of it. Includes the 185" length cap, which must NOT be raised on
   BZ before the ladder lands or a 180" drape prices at the old rate.
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

Nothing mid-flight. Next item is QUEUE #1, the Blindznation soft-treatment port.

**Current Philly Blinds soft-treatment pricing, for reference** (all committed
and verified against the numbers Justin gave in session):

- Drapery per cut: $125 unlined / $135 lined, goblet+barrel +$20. Length bands
  add 0/20/35/70 then +$35 per further 10" to 185". Ladder verified reachable at
  every band; over 185" is a custom quote with no price shown.
- Cuts: `(rod + allowance) × fullness ÷ 54`, allowance = return × 3.
  Yards: `(length + 16) ÷ 36` per cut.
- Cornice / valance: $35/LF, $200 minimum per piece, fabric NOT included. Rate
  steps on HEIGHT: ≤15" $35 · 16–35" $70 · 36–55" $95 · 56–75" $120 · +$25 per
  further 20". Splice checkbox over 80" wide avoids the $500 board freight.
- Romans: lining +$5/sqft; over 80" wide is $500 freight.
- Basic Roller freight: tiered by WIDTH only — ≤80" parcel, 81–100" $200,
  101–150" $300, 151"+ $500 min. (Chart stops at 120" wide, so the top two tiers
  are not reachable through the form yet.)
- Drapery never takes oversize freight at any width.

## BLOCKED

1. **Norman Soluna fabric list.** Justin said the fabric choices have changed and
   he will send the update. Nothing to do until that data arrives. Everything
   else on the Soluna page is current.
2. **Wallace Aluminum colour names.** Still placeholders. The chart is an image
   in the PDF and there is no OCR in this environment. Needs Justin to paste the
   names or send a screenshot.
3. **Soluna Item-1 swatches** (Verona / Sumatra / Lake Tahoe / NA300 / W120).
   W120 is discontinued, the NA300 codes contradict the book, and F0874 collides
   with Clarissa "Burlap". Needs a visual PDF or Justin's call.
4. **Merge to master / main.** Everything below is on dev only. Only the word
   "confirmed" from Justin unlocks a live merge.

### Resolved 2026-09-07
- Oversize freight scope: **Basic Roller yes, drapery no** (Justin). Romans and
  cornice/valance already had it. Norman keeps its own table.
- Width allowance: **return × 3 confirmed** (4"→12", 6"→18").
- Roller freight is TIERED by width, not flat: <=80" parcel, 81-100" $200,
  101-150" $300, 151"+ $500 min. Width only — length never affects it.
- Drapery length cap raised 150" -> 185" so the top four ladder bands are
  reachable. Cap now reads D_LEN_MAX_AUTO so it cannot drift from the ladder.

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
- `1cba5a6` (PB) · `a92111c` (BZ) — soft-treatment pricing rebuild, exterior
  roller crank/motor side, and CONF_PAGES emptied. BZ got only the roller and
  CONF_PAGES halves; the pricing is still queued there.
- `de43383` (PB) · `d9da63e` (BZ) — oversize freight scope, plus a pre-existing
  Basic Roller crash: pbCalcPrice declared its option reader as `gPBs` while
  every line called `gPB`, so it threw at selLines and the estimate panel and
  Add to Cart never rendered on a priced product.
- `747dd94` (PB) · `bdf3971` (BZ) — roller freight tiered by width.
- Fixed: the live-site hostname gate in shared.js had
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
