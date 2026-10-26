# Message for ChatGPT: everything MUTAGEN needs (2026-10-26)

Replaces `CHATGPT-REQUEST-2026-10-25b.md` and `CHATGPT-REQUEST-2026-10-26-high-res.md`. Copy everything below the line
into ChatGPT.

---

Hi! This is Claude, building MUTAGEN. The owner has decided that from now on **all image work is yours**. I only place, size and animate finished assets; I won't cut, edit, upscale or recreate any image. So every asset needs to arrive finished and ready to place. The owner also requires the app to look **realistic: every image high-detail and high quality**.

## Standards for every file

- **Resolution:** screen masters at least **3344 × 1882**, and every piece cut at that scale. The last masters were 1672 × 941 and get stretched 1.2–1.6× on iPhone and iPad, which made everything soft. One high-resolution set is enough; I scale it down for smaller screens.
- **Realism:** real steel texture, screws and wear; crisp lettering; glossy glass with highlights and reflections; translucent liquid with depth and bubbles.
- **Format:** PNG with real alpha, nothing stretched, the original aspect ratio kept.
- **Live liquid:** every glass part that holds liquid needs two extra files:
  1. a **clear-glass overlay** with the liquid fully transparent, keeping the glass highlights and reflections as semi-transparent pixels over the liquid;
  2. an **RG liquid mask** (red = liquid coverage, green = depth: 0 at the glass edge, 255 at the deepest middle).
- **Layout:** one `LAYOUT.json` per screen, giving the canvas size and the position and size of every piece and button on that canvas, plus each pipe's and button's inlet and outlet port points, so the liquid lines up at every joint.
- **Records:** SHA256SUMS.txt, plus a README saying how each file was made and anything that differs from the approved master.

## 1. Home screen (approved master `01-Landing-Approved.png`)

A complete kit matching the master, at high resolution:
- **Frame:** the top header pipe with its elbows, both side sight columns, the six branch pipes, the bottom elbows and the bottom-row joints.
- **Buttons:** the six buttons in the master's own shape, with its icons, sized to meet the branch pipes and joints exactly:
  - NEW GAME (DNA), CONTINUE (play) and DECK MUTATOR (cards);
  - PROFILE (person), SETTINGS (gear) and HELP (question mark).
- **For each button:** an assembled version, a clear-glass overlay, a liquid mask, a **disabled** version (CONTINUE is disabled with no saved game) and a **pressed** version.
- **Background:** a complete clean background plate of the master's electric backdrop, with no holes and nothing on it.
- **Logo v2:** the adopted logo at 2508 × 2508, with its clear-glass overlay and liquid mask. Keep the glass highlights in the overlay: the last mask included them, so the live logo looked flat.

## 2. Choose Game Mode (approved master `02-Game-Mode-Proposed.png`)

The same kind of kit at high resolution:
- the frame, the side columns and the branch pipes;
- FULLY GUIDED, FREEPLAY and TABLE TRACKER buttons, each with its sub-line as artwork:
  - "Rules-aware play and guidance";
  - "Create, test, and play";
  - "Track life, counters, and your table";
- the CHOOSE GAME MODE title;
- BACK, PROFILE, SETTINGS and HELP in the master's bottom-row shape, with their joints and elbows;
- disabled and pressed states for every button;
- a clean background plate and LAYOUT.json.

Use logo v2 and the "Mutate The Gathering" tagline in place of this master's older logo.

## 3. Masters for the remaining screens (for the owner to approve)

Each one must keep every control the screen has now, with none removed, merged away or hidden. Please make them at 3344 × 1882 or larger, in the same style as the two approved masters. Once the owner approves one, please send its kit as in item 1.

- **Player Setup:**
  - player tabs, + ADD PLAYER and Remove player;
  - player name, the deck box, SAVED DECKS, PRECON CATALOG and PASTE LIST;
  - the commander and partner/background fields, the Advice toggle and the playmat choice;
  - the remote-player count when hosting;
  - the mode note, DECK MUTATOR, CONTINUE / OPEN ROOM, and BACK.

  This is a form screen: the tall side columns took too much width here, so please consider pipes along the top and bottom edges instead.
- **Rooms:** Lobby (hosting) and Join room (enter code).
- **The game (battlefield):** every zone, the hand, the action bar with the smart-octagon actions (with legal and not-legal indicator states), the life totals, the log, and the menus.
- **Table Tracker:** setup, the tracker table and Join table.
- **Menus and pop-ups:** Profile, the Settings pop-up, Help / Judge, and the mode menus (One device, Host a room, Host device, Join).
- **Deck Mutator:** home (the proposed `03-Deck-Mutator-Home-Proposed.png`) and card details (the proposed `04-Card-Details-Popup-Proposed.png`), both at high resolution, keeping every Deck Mutator feature. Deck Mutator is still being developed in its own app, so please keep its layout close to the current Deck Companion screens.

## 4. Order

1. Home kit and logo v2 at high resolution.
2. Choose Game Mode kit.
3. The Player Setup master.
4. The remaining masters, in the build order.

If something can't be made exactly from an approved master, please flag it rather than approximating it.
