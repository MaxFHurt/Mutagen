# MUTAGEN kit contract

What ChatGPT delivers so each screen can be finished just by installing its art. Every screen already works and is
wired to these names; it keeps its current look until its kit arrives. Claude only installs: copy the folder, run
`python3 tools/kits/layout-module.py <kit>`, test, publish. Claude never cuts, edits, upscales or recreates images.

## 1. Screen kits: one folder per screen, `ui/kits/<kit>/`

The same format as revision 02's home and Choose Game Mode kits:

- `LAYOUT.json`:
  - `canvas` {width, height}, the screen's full artwork size;
  - `background`, the file name of a complete clean plate;
  - `pieces`: one entry per piece, each with `id`, `type` and `rect` [x, y, width, height] in canvas pixels.
- Piece types:
  - `pipes`: `files.assembled`. Add `files.overlay` (clear glass) and `files.mask` (R coverage, G depth) if it holds liquid.
  - `buttons`: `files.assembled`, `files.overlay`, `files.mask`, `files.pressed`, `files.disabled`. The id must be
    one from the list below, because the app binds each id to a real button with its action and accessible name.
  - `lettering`: `file`, finished text artwork such as titles and sub-lines.
  - `branding`: the logo slot. The app shows the live logo v2 there.
  - `panel` (new): a rectangle where the screen's own live content goes (a form, a list, a count). There are no files.
    Draw the panel's frame or glass in the background or as a pipe piece, with its inside left plain so the live
    content stays readable.
- Every PNG is exactly its rect's size, with real alpha. One high-resolution set; the app scales it down.

### Ids per screen

| Kit | Buttons | Panels |
|---|---|---|
| `home` | `new-game`, `continue`, `deck-mutator`, `profile`, `settings`, `help` | none |
| `mode-select` | `fully-guided`, `freeplay`, `table-tracker`, `back`, `profile`, `settings`, `help` | none |
| `player-setup` | `back`, `deck-mutator`, `continue`, `open-room`, `add-player`, `remove-player`, `remote-minus`, `remote-plus`, `saved-decks`, `precon-catalog`, `paste-list`, `view-deck` | `tabs`, `form`, `note`, `remote-count` |

Player setup details:
- `continue` and `open-room` may share one rect: the app shows Continue when playing on one device and Open room when
  hosting.
- `remote-minus`, `remote-plus` and `remote-count` show only when hosting. `remove-player` shows only when there are
  more players than the minimum. `view-deck` shows only once the player has a deck.
- `tabs` holds one tab per player (name plus deck status), live.
- `form` holds the live form: player name, the deck box, Commander, Partner / Background, Advice and Playmat.
- `note` holds the mode note.
- `remote-count` holds the number of players joining from other devices.
- Deck-source buttons drawn as kit buttons (`saved-decks`, `precon-catalog`, `paste-list`, `view-deck`) are hidden
  inside the form automatically, so they never appear twice.

## 2. The skin kit: `ui/kits/skin/`, for every other screen and both apps

These are stretchable frames for the parts every remaining screen is built from: Lobby, Join, the game, Table Tracker,
Profile, the Settings / Help / mode pop-ups, and all of Deck Mutator. Each file is a 9-slice frame: corners stay fixed
and edges and centre stretch, so it must look right at any size.

| File | Used for |
|---|---|
| `button.png` | every standard button (game side `.btn`, Deck Mutator `.btn`) |
| `button-pressed.png`, `button-disabled.png` | that button pressed and disabled |
| `button-primary.png` | the main action (Confirm / Continue / Deck Mutator's primary) |
| `button-danger.png` | destructive actions (Delete, Cancel) |
| `square.png` | small square buttons (− / + steppers, icon buttons, colour pips) |
| `panel.png` | panels and play zones (game zones, tracker panels, Deck Mutator panels) |
| `modal.png` | pop-up windows |
| `option.png`, `option-on.png` | option rows and player tabs, off and on |
| `tab.png`, `tab-on.png` | Deck Mutator tabs, off and selected |
| `input.png` | text fields and drop-downs |
| `back.png` | the Back button, whole (448 × 141 shape or similar) |

`SKIN.json` gives each frame's slice insets in that PNG's pixels, so corners never stretch:

    { "parts": { "button": { "slice": [top, right, bottom, left], "fill": true },
                 "panel":  { "slice": [34, 70, 34, 70], "fill": false } } }

- `fill: true` means the frame's centre is drawn as well (buttons). `false` keeps the centre clear for content
  (panels).
- An optional `width` (CSS, for example `"0.9rem 1.3rem"`) sets how thick the edges are drawn.
- Text on these parts stays live text, so frames carry no words. Keep their centres calm enough for white text to read.

## 3. Delivery

One zip per kit (or per screen), with the folder named as above, a `SHA256SUMS.txt` and a README that states how each
file was made. Leave out temp files and preview-only images.
