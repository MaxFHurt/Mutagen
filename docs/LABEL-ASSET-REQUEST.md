# MUTAGEN label and icon assets — request

**Status 2026-10-25: Sets 1 and 2 and the logo delivered** (ChatGPT asset delivery, 145 files, all checksums verified; stored under `ui/buttons`, `ui/buttons-iphone`, `ui/labels`, `ui/components`, `ui/branding`; records in `handoff/assets-2026-10-25/`). RESOLVE typo ("RESOLYE") fixed in every variant (rev 041, `handoff/assets-2026-10-25/resolve-fix/`).

MUTAGEN shows button lettering only from supplied artwork; it never redraws or restyles letters
(owner, 2026-10-25). The handoff contains no finished label assets: `PLAY_BUTTON_MASTER_HORIZONTAL.jpeg`
has PLAY baked onto its old swirled liquid and a white background, the approved landing has its labels
flattened into the screen at about 40 px tall, and the 335-asset kit was never delivered.

## Format (every file)

- PNG, sRGB, **true transparent background** (real alpha; no white, black or checkerboard pixels).
- **Lettering only**, in the PLAY button master's style: the same letterforms, silver face, purple edge
  and depth. No glass, liquid, shell, glow, drop shadow or background behind the letters.
- One file per label. Cap height 240 px, with 24 px of clear space on every side; the same cap height,
  baseline and edge thickness across the whole set so buttons match.
- Icons (where the approved landing shows one) as separate files, 288 × 288 px, same style and padding.
- Names: `label-<words-with-dashes>.png` (e.g. `label-new-game.png`), `icon-<name>.png`.
- A list of every file with its SHA-256, so the files can be checked on arrival.

## Set 1 — home screen (from `01-Landing-Approved.png`)

| File | Text / content |
|---|---|
| `label-new-game.png` | NEW GAME |
| `label-continue.png` | CONTINUE |
| `label-deck-mutator.png` | DECK MUTATOR |
| `label-profile.png` | PROFILE |
| `label-settings.png` | SETTINGS |
| `label-help.png` | HELP |
| `label-play.png` | PLAY (the master's own lettering, cut out on a transparent background) |
| `label-tagline.png` | Mutate The Gathering (as on the approved landing) |
| `icon-dna.png`, `icon-play.png`, `icon-cards.png`, `icon-profile.png`, `icon-settings.png`, `icon-help.png` | The six landing icons |

## Set 2 — smart octagon actions (labels the game engine can show)

ATTACK, BLOCK, CAST SPELL, CHOOSE, DISCARD, END TURN, NEXT PHASE, PASS, PLAY LAND, RESOLVE,
TO COMBAT, VOTE — one `label-…png` each, same format.

## Logo

The locked logo (`MASTER_LOGO_DO_NOT_REGENERATE.jpeg`) must never be regenerated. A transparent
version should be an exact cut-out of that file, not a remake. Owner to decide who makes the cut-out.

Further screens will add their own lists as each one is built.

## Delivery

Put the files in `ui/labels/` (a zip in the chat or a Drive link works too). Using a label then
needs only `label="../labels/label-new-game.png"` on its button.
