# MUTAGEN — rolling situation report and visual inventory

## CURRENT REVISION 068 — Backdrop black and very dark purple, 2026-10-27

Owner: turn the blue background black and very dark purple, like "a dark alley in a comic". A display-only recolour of the supplied background in `kit.css` (darkened, shifted from blue to purple, less saturated, more contrast, plus a dark vignette at the edges); the image file is unchanged. It applies to every kit screen. A true comic dark-alley background is new art, requested from ChatGPT, along with removing the blue fringes painted into the edges of the button and pipe cut-outs. mutagen_flow 39/39.


## CURRENT REVISION 067 — Lighter, brighter, glowing ooze, 2026-10-27

Owner: the ooze should be lighter and brighter in colour, and glow. Code only, no image changes.
- Brighter: the live layer over the painted ooze adds a light lime glow, strongest in the body of each tube and fading at the liquid's edge so the lettering's dark outlines stay sharp. Measured liquid on NEW GAME: painted (34, 115, 24) to (80, 161, 48); letters within about 3% of before.
- Glow: a halo behind each piece and logo, shaped by its liquid mask (`.kit-glow`), plus the light spilling over the glass edge and steel (`.kit-glow--spill`, screen blend, so white lettering stays white). Colour dodge was tried and dropped (it produced dark streaks).
- Softer green dims both; inactive buttons (no ooze) have no glow. Mask URLs in CSS variables are now full addresses (relative ones resolved against the style sheet). Tests: mutagen_flow 39/39, liquid 8/8.


## CURRENT REVISION 066 — Home screen matches the approved preview; 6 damaged files in revision 02, 2026-10-27

Owner: the landing page is close but not close enough. Two causes, both fixed:
1. Damaged files: six revision 02 files are truncated, yet their hashes match, so they were packaged broken. They are the 2508 logo and its mask, home deck-mutator disabled, home settings pressed, mode-select freeplay assembled, and mode-select settings pressed. Browsers showed the logo cut off at the bottom. `tools/kits/layout-module.py` now test-decodes every kit file and lists broken ones in layout.js, and `kit-stage.js` falls back (no pressed look; overlay with live liquid for a broken painted image). The logo uses the verified 1254 v2 set (rev 051). ChatGPT is asked to re-send.
2. Liquid look: the live liquid replaced ChatGPT's painted liquid, so its rich lime colour, glossy highlights and painted bubbles were lost. Kit pieces now show the painted art exactly as supplied, with the motion drawn over its liquid only. The new `<mutagen-chamber painted>` mode draws the drifting thickness as soft see-through light and shade, plus the moving bubbles. Measured against the kit art by depth band, colour and contrast now match within a few levels (before: the live core was 30 brighter and the glossy highlights were missing). The still setting shows the painted art alone.
Remaining differences from ChatGPT's preview are its own: an inactive CONTINUE (owner rule, faint lettering pending from ChatGPT), and the logo slot is ChatGPT's LAYOUT rect. Tests: mutagen_flow 39/39, liquid 8/8.


## CURRENT REVISION 065 — Online play tested; page screens wired for their kits, 2026-10-26

- Multi-device play, tested with the same-browser loopback transport (no outside service): rooms (net_ui) 26/26, Table Tracker hosting and joining (tracker_net_ui) 44/44, challenges (challenge_ui) 13/13, judge and host views on phone and iPad (shots_judge) with no errors.
- Lobby, Join, Table Tracker setup, Table Tracker join and Profile are wired for their kits (`KIT-CONTRACT.md`, page screens). `applyPageKit` / `watchPageKits` in `kit-stage.js` replace a tagged page's header and footer with its kit and put its own body in the kit's `body` panel. Kit buttons are named by action and press the screen's real buttons, so every condition and disabled state stays. Each screen only gained a `data-kit` tag. Until a kit is installed nothing changes.
- Tests: mutagen_flow 39/39 (2 new page-kit checks with a test kit pointing at installed images: buttons named from the real ones, body in its panel, the kit Start starts tracking), flows_ui 24/24, net_ui 26/26, tracker_net_ui 44/44, game_ui 28/28.


## CURRENT REVISION 064 — Deck Mutator synced to Deck Companion 0.9.21 (upgrades layout change), 2026-10-26

Owner: the Deck Companion layout change is done. Synced `deck/` from Deck Companion `027a41f` (0.9.21, build 166) with `tools/sync/sync-deck.sh`, read-only. The upstream copy is committed on its own, then Mutagen's changes are re-applied: every one applied cleanly except the expected test conflict. UI-B132-01, the test for the new layout, keeps upstream's new checks with Mutagen's "Apply All … Mutations" labels. What changed upstream (0.9.20): Path to Apex, the level sentence and the plans moved to the Upgrades tab (Mutations in MUTAGEN), and Build Stats is stats only; plus fixes. Bundles rebuilt. Tests: Deck full UI suite 125/127 (UI-B145-01 needs EDHREC theme pages; UI-B146-02 is a known race; both fail in the source too), quick check 12/12, semantics 49/51 (as before), mutagen_flow 37/37. The sync log is in BASELINE and the Deck patch is refreshed against the new upstream.


## CURRENT REVISION 063 — Lighter home screen, site icon, small-phone tap size, 2026-10-26

- Download: the home screen fetched 29.2 MB of images. Art that is not on screen (still images, pressed and inactive looks) now loads only when shown (`loading="lazy"` in `kit-stage.js`), bringing it to 18.9 MB with nothing visible changed. The rest is mostly the uncompressed background (6.8 MB) and logo glass layer (5.6 MB). Compressing them is image work, so it is requested from ChatGPT (WebP / JPEG). Unused files in the repo cost users nothing (only requested files download), so they stay for now.
- Site icon: `commander/index.html` links `assets/img/icon-192.png` as the icon, so browsers no longer request a missing `/favicon.ico`. This fixes the long-standing game_ui failure (now 28/28).
- Every reachable screen (home, Choose Game Mode, Player Setup local and hosting, Join, Table Tracker setup, Profile, Settings, Help) was checked at 1180×755, 1366×1024, 844×390 and 667×375 for page overflow, controls off screen and tiny tap targets. The only issue was the hosting − / + at about 26 px on an iPhone SE, now at least 36 px (`ui/fixes.css`, new, Mutagen-owned).


## CURRENT REVISION 062 — Player Setup proposal approved; full feature inventory for ChatGPT, 2026-10-26

Owner approved ChatGPT's Player Setup proposal, with the corrections recorded in `KIT-CONTRACT.md`: a display deck box, Continue or Open Room one at a time, the player's own playmats, Guided and Free Play titles (`title-guided` / `title-freeplay`, wired in the kit path), up to 6 live tabs with player colours and deck status, and the hosting wording. Owner: "I want all features. If any are missing tell ChatGPT to fix it." `FEATURE-INVENTORY.md` lists every control on every screen, read from the code, as the checklist each design and kit must meet. mutagen_flow 37/37.


## CURRENT REVISION 061 — No bright rims: kit liquid darkens at the glass edge, 2026-10-26

Owner: the light highlighting around the edges of the buttons is bright; why? The cause was in Claude's live liquid, not the art. The approved liquid makes the thinnest liquid, at the edge of its mask, the brightest. ChatGPT's kit masks reach right to the glass rim, where its own still art shows a dark edge, so the live liquid drew a bright lime rim exactly where real glass is darkest, with the kit's semi-transparent highlights adding white on top. Kit chambers now use `edge="dark"`: the liquid darkens toward the rim (up to 62% darker in the outer quarter of the depth), matching the kit's still images. Code only (`ui/liquid/liquid.js` uniform `uEdge`; set for kit pipes, buttons and the logo). Chambers without it are unchanged. Tests: mutagen_flow 37/37, liquid 8/8.


## CURRENT REVISION 060 — Inactive button: steel as is, glass empty, lettering faint (from ChatGPT), 2026-10-26

Owner correction to revision 059: "the button should only be missing the ooze and the lettering should be faint, not the entire button". The whole-button fade is removed. A disabled kit button now shows its clear-glass overlay at full strength, so the steel is as normal and the glass is empty; kit buttons also opt out of Commander's app-wide 45% fade for disabled buttons (`button:disabled`), which had been fading it too. Faint lettering needs artwork: in the supplied files the lettering and steel are one image, and separating them would be image work. The contract (`KIT-CONTRACT.md`) now asks ChatGPT for disabled art that is exactly the owner's look; a kit marked `"disabled_empty_glass": true` uses it automatically. Until then the lettering is at full strength. mutagen_flow 37/37.


## CURRENT REVISION 059 — Inactive buttons are faint with empty glass, 2026-10-26

Owner: an inactive button "should be faint and have no ooze in its glass chamber". A disabled kit button (CONTINUE with no saved game) now shows only its supplied clear-glass overlay, which is the button with its glass empty, faded (opacity 0.58, desaturated), with no live liquid behind it. ChatGPT's revision 02 disabled art is no longer used, because it still had ooze in the glass. Placement and CSS only. Test: mutagen_flow 37/37 (1 new check).

Owner asked how ChatGPT's Player Setup proposal differs from today's screen. Every current control is present. It changes the layout and look: a pipe frame top and bottom, the title in a glass canister with the logo, player tabs across the top with Add / Remove Player, green glass deck buttons with icons, an Advice switch, a Hosting box with large −/+, the mode note as a strip, and Back / Deck Mutator / Continue / Open Room along the bottom. Cautions: the deck box is drawn as a drop-down, but the app has none (decks come from Saved Decks / Precon Catalog / Paste List); Continue and Open Room never show together; the playmat pictures are illustrations. Approval pending.


## CURRENT REVISION 058 — Every screen wired for its art; the assets are the last thing to wait on, 2026-10-26

Owner: ChatGPT is remaking assets, so make everything that does not need them and leave the assets as the last thing to wait on. No image work. `docs/KIT-CONTRACT.md` is the exact spec ChatGPT delivers to; each screen is already wired to its names.

- Installed-kit lookup: `tools/kits/layout-module.py` now also writes `ui/kits/index.js`, the list of installed kits. Screens ask `kitFor(name)` and keep their current layout until their kit is installed, so installing is: copy the folder, run the tool, test, publish.
- Kits can hold live content: the new piece type `panel` is a rectangle for the screen's own content (a form, a list, a count). Buttons can carry any data attribute and can be hidden when they do not apply.
- Player Setup is wired for its kit: 12 named buttons (back, deck-mutator, continue / open-room, add / remove player, remote − / +, saved decks, precon catalog, paste list, view deck) with the same actions and conditions as today, and panels for the player tabs, the live form, the mode note and the remote count. Deck-source buttons drawn by the kit are not repeated inside the form.
- Skin kit for every other screen and both apps: stretchable frames (button with pressed / disabled, primary, danger, square, panel, modal, option and option-on, tab and tab-on, input, Back) plus SKIN.json slices. The tool turns them into `ui/kits/skin.css` (game side: buttons, steppers, panels, game and tracker zones, pop-ups, option rows, tabs, fields, Back) and `ui/kits/skin-deck.css` (Deck Mutator: `.btn` and its variants, pips, panels, modals, tabs, fields), linked by `commander/index.html` and by Mutagen's `deck/mutagen.js`. Both are empty until a skin is installed. Only frame sources and slices change, never a layout.
- Tested without making art: a test kit for Player Setup that points at the installed mode-select images (6 new checks: kit buttons by state, panels with live content, no repeated buttons, typing a name, Add player, the Saved decks picker, Back). Also the skin pipeline in a scratch copy with Commander's existing frames as stand-ins: both apps take the frames, sizes unchanged, paths resolve.
- Tests: mutagen_flow 36/36, liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404), Deck quick check 12/12, semantics 49/51 (pre-existing). Deck patch refreshed.


## CURRENT REVISION 057 — ChatGPT revision 02 kits installed: home and Choose Game Mode, 2026-10-26

ChatGPT delivered `MUTAGEN-Revision-02` in four parts (163 files). 160 of the 162 SHA256SUMS entries are stored and verified at their new paths. Two were not installed: `03-proposed-masters/04-Host-Room-Proposed.png` fails its hash and is truncated (needs re-sending), and `01-home/.SOURCE-NATIVE-1672x941.png.eXeefl` is a stray truncated temp copy. Stored unchanged: `ui/kits/home/`, `ui/kits/mode-select/` (background, pipes, buttons with assembled / clear-glass overlay / liquid mask / pressed / disabled, lettering, LAYOUT.json), `ui/kits/branding/` (logo v2 at 2508 × 2508 with overlay and mask). Handoff, sums, build record, previews, sources and the Player Setup proposal are in `handoff/rev02/`.

Placement only, with no image changes. `tools/kits/layout-module.py` turns each LAYOUT.json into `layout.js`, marking pieces whose supplied mask has liquid. `commander/src/mutagen/kit-stage.js` places every piece at its rectangle on a stage in the kit's shape (scaled uniformly, centred). Liquid pieces get live liquid behind their overlay on the shared stream; their assembled image is used when the liquid is still (Still liquid or Reduce Motion), as the handoff asks. Buttons are real buttons with accessible names, showing the kit's pressed art while pressed and its disabled art when disabled (CONTINUE without a save). The logo is live logo v2 from the 2× layers. `<mutagen-chamber>` again takes `mask` / `size` / `bubbles` attributes. The home and Choose Game Mode screens use their kits, with the same buttons, menus and actions.

As ChatGPT states: the 3344 × 1882 art is a 2× enlargement of 1672 × 941 sources, not native detail; cut-outs, reflections, masks, ports and the pressed/disabled states are candidates, not certified. The revised Choose Game Mode rendering is ChatGPT's proposal after the approved master. Checked at 1180×755, 1366×1024, 844×390 and 667×375: no overflow or load errors. Tests: mutagen_flow 30/30 (4 game-mode kit checks), liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404).


## CURRENT REVISION 056 — One installed app; Still liquid and Softer green settings, 2026-10-26

Merge work only, with no image changes (owner: "Do any work you can to merge the two apps").

- One installed app: MUTAGEN's manifest scope now covers the whole site (`commander/manifest.webmanifest` scope `../`), so Deck Mutator opens inside an installed MUTAGEN instead of leaving it for Safari. Deck Mutator's own `manifest.json` now installs the same MUTAGEN app: name MUTAGEN, starting on the home screen, standalone, MUTAGEN icons. Its iOS title is MUTAGEN.
- Offline: Deck Mutator had no offline cache. The new `deck/sw.js` is network first and uses its cache only when offline, like the game side, so an installed MUTAGEN opens Deck Mutator without a connection once visited. It is registered from Mutagen's own `deck/mutagen.js`, so the copied Deck code is unchanged.
- MUT-21: Settings has "Still liquid" (one still frame instead of motion; the device's Reduce Motion setting still applies) and "Softer green" (the green dimmed and desaturated only). They are saved with the device settings and applied at start-up and on change (`commander/src/mutagen/preferences.js`).
- Checked: decks in player setup and in the profile's Usual table already come from Deck Mutator only, and the old Commander deck editor is unreachable.
- Tests: mutagen_flow 27/27 (5 new: offline cache, both manifests, the two settings applied, kept and cleared), liquid 8/8, Commander node 149/64/20, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404), Deck quick check 12/12 and semantics 49/51 (pre-existing). `docs/sync/deck-mutagen.patch` is refreshed with the new Deck changes.


## CURRENT REVISION 055 — Image work by Claude undone; all image work goes to ChatGPT, 2026-10-26

Owner: "No more image work here. Tell chat gpt what you need and undo this mess." Undone: revision 053 (home rebuilt on the master's layout with buttons Claude cut from the master; `ui/buttons-master/`, `tools/home-buttons/`), revision 054 (Choose Game Mode cut from its master; `ui/screens/mode-select/`, `tools/masters/`, the chamber `mask`/`size` attributes), and the master-layout home preview from revision 052 (`ui/home/master-layout.js`, the `home-*` shells, the `?layout=` switch). Back in place: the centred home with the supplied buttons and sight columns (revisions 040–047), and Choose Game Mode in that frame with the supplied buttons (revision 049). Kept: logo v2 with live liquid (owner, revision 052), and every file ChatGPT delivered (revision 051), stored unchanged. Tests match the state before the image work: mutagen_flow 22/22, liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404). Revisions 052–054 stay above as history.

Rule from now on: Claude does no image work (no cutting, editing, upscaling or recreating). ChatGPT delivers every asset finished, at high resolution, and Claude only places, sizes and animates it. Everything needed is in `CHATGPT-REQUEST-2026-10-26-complete.md`, which replaces the earlier requests.


## CURRENT REVISION 054 — Choose Game Mode matches its master, 2026-10-26

Owner: all screens should match their masters. Choose Game Mode is now built from its approved master (`02-Game-Mode-Proposed.png`, approved 2026-10-25). It uses the master's own frame, side columns, FULLY GUIDED / FREEPLAY / TABLE TRACKER buttons with their branch pipes, CHOOSE GAME MODE title, sub-lines, and BACK / PROFILE / SETTINGS / HELP row. The live logo v2 and the tagline label replace the master's logo, as approved. Nothing is drawn: a new general tool, `tools/masters/extract-screen.py` (config `tools/masters/mode-select.json`), cuts a master into a static foreground (backdrop and logo removed) plus live regions, each with a clear-glass overlay and an RG liquid mask, and writes `ui/screens/mode-select/` (layers, `layout.js`, MANIFEST). Six live regions (columns down/up, the three rows and the bottom row to the right, on the shared stream); no liquid left outside them. The thin letters of the sub-lines are kept; lightning glints around the logo and title are cleared. Tap areas are clear buttons over the master's buttons, with press feedback; every mode menu and Back / Profile / Settings / Help work as before. `<mutagen-chamber>` can take its own `mask`, `size` and `bubbles` attributes instead of a shell. Checked at 1180×755, 1366×1024, 844×390 and 667×375 with no overflow or load errors. Tests: mutagen_flow 27/27 (3 new game-mode checks), liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404). The interim mode cards (old Commander art) are no longer used on this screen.


## CURRENT REVISION 053 — Home is now the master layout, with the master's own buttons, 2026-10-25

Owner: "You can recreate these assets if necessary." No new artwork was drawn: the six master-shape buttons were cut from the approved master itself by `tools/home-buttons/extract.py`, into `ui/buttons-master/home/`. For each there is an assembled version (backdrop removed), a clear-glass animation overlay, and an RG liquid mask (R coverage, G depth) in the same format as ChatGPT's pipes, with hashes in MANIFEST.json and a README. Method: blue/purple backdrop, and near-black within a thin band along the slot edge, connected to the slot edge is removed, keeping a one-pixel dark outline. Liquid is the green-dominant pixels inside the button, including shaded liquid and small dull-green patches. Lettering, icons and bright glints stay in the overlay, so the glass keeps its highlights. Each button is exactly its HOME-LAYOUT.json slot, so it meets the master's branch pipes and bottom joints with no gaps. Buttons are at the master's resolution (1672 × 941), a little soft on large screens.

The home screen is now this layout (the master's pipes, columns and buttons, the live logo and the tagline, on the master-shaped stage), with live liquid in the columns, branches and all six buttons on the shared stream. The previous layout stays available at `commander/?layout=classic`. Same actions; Continue still disabled without a save. Tests: mutagen_flow 24/24 (home checks updated, classic layout checked), liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404).


## CURRENT REVISION 052 — Live logo on; home rebuilt after the master (preview), 2026-10-25

Owner decisions: (1) live liquid in the logo; (2) rebuild the home to resemble the approved master.

(1) The home and Choose Game Mode logos are now live `<mutagen-chamber shell="logo-v2">` elements using ChatGPT's overlay and mask as made.

(2) Preview at `commander/?layout=master`; the live home is unchanged until the owner approves. It is a stage in the master's 1672 × 941 shape, as large as the screen allows and centred, with the background filling the rest. On it, at the positions copied from the supplied HOME-LAYOUT.json (`ui/home/master-layout.js`, generated): the master's top header pipe, side columns, six branch pipes, bottom elbows and joints; the live logo; the tagline; and the six buttons. Columns and branches carry live liquid through their supplied overlays and masks, on the shared stream (down the left column, right through the branches, up the right column). The header, elbows and joints are solid steel with no liquid and are shown as made. Buttons are the current supplied ones fitted into the master's button slots without stretching, so the gaps between branch ends and buttons remain until buttons made for the master's sockets are supplied (master-shape NEW GAME / CONTINUE / DECK MUTATOR about 712 × 125, PROFILE / SETTINGS / HELP about 450 × 120, with icons as in the master). Same actions, Continue still disabled without a save. Checked at 1180×755, 1366×1024, 844×390 and 667×375 with no overflow or load errors. Tests: mutagen_flow 24/24 (2 new preview checks), liquid 8/8, flows_ui 24/24, game_ui 27/28 (pre-existing favicon 404).


## CURRENT REVISION 051 — Piping and logo v2 layers received; held for owner decisions, 2026-10-25

ChatGPT delivered `MUTAGEN-Piping-Backgrounds-and-Logo-v2.zip` (136 files). All 134 entries in its SHA256SUMS were verified, and the stored copies were checked again at their new paths. Its copy of `01-Landing-Approved.png` is byte-identical to ours. Stored unchanged: home plumbing from the approved landing master at `ui/piping/home/` (13 pipe assemblies, clear-glass overlays, RG liquid masks, 25 detail slices, a full-canvas piping layer, the visible-background and foreground layers, HOME-LAYOUT.json); battlefield and Deck Mutator reference cuts at `ui/piping/*-reference/` (references only, not approved masters); logo v2 overlay and liquid mask at `ui/branding/`; notes, sources and preview at `handoff/piping-2026-10-25/`.

Logo v2 layers checked independently: no RGB changed anywhere, 0 alpha changes outside the mask, every covered pixel clear in the overlay, and the selection covers all bright green but 1 pixel of 274,082. `<mutagen-chamber>` can now use a shell whose mask lives elsewhere (`shells.json` `mask`) and a per-shell bubble scale (`bubbleScale`); shell `logo-v2` is added. Live preview: `ui/liquid/logo-preview.html`; comparison: `previews/logo-v2-static-vs-live.png`. Not switched on, owner to decide: the mask also took in the logo's glass highlights and glow, so the live logo matches the button ooze but looks flatter and darker than the supplied static logo.

Home plumbing held, owner to decide: the pieces fit the master's own geometry (a fixed 1672 × 941 canvas and the master's wide, short buttons). With the supplied 3:1 buttons in the master's places, every branch pipe stops well short of its button and the bottom joints float (`previews/home-master-piping-with-supplied-buttons.png`). The master's side columns are also a different design from the current sight columns, and a fixed-shape canvas would leave bars on iPad and iPhone. The home screen is unchanged.


## CURRENT REVISION 050 — Game-mode master approved; player setup needs its own master, 2026-10-25

Owner approved `02-Game-Mode-Proposed.png` as the design for Choose Game Mode, with logo v2 and the supplied PROFILE / SETTINGS / HELP buttons in place of the master's own versions. The CHOOSE GAME MODE title stays blank until its artwork is supplied.

Player setup: tried the home frame (full-height sight columns at both sides) and did not ship it. The columns take about 40% of the width, so the title wrapped into the Back button, the deck form became one narrow column with cut-off fields, and Playmat fell off screen. The columns cannot be made narrow without making them short (fixed artwork shape, never stretched). Form-heavy screens need their own approved master, for example with pipes along the top and bottom edges instead of tall side columns. Player setup is unchanged.


## CURRENT REVISION 049 — Choose Game Mode in the MUTAGEN frame, 2026-10-25

Owner: keep going on the next screen with the artwork we have. Choose Game Mode now uses the home screen's frame: live sight columns (same stream: down on the left, up on the right), logo v2 and tagline at the top, the three mode cards in the middle, and a bottom row with BACK, PROFILE, SETTINGS and HELP, laid out after the proposed master `02-Game-Mode-Proposed.png` (not yet owner-approved). PROFILE / SETTINGS / HELP are the supplied clear-glass buttons over the live liquid and do what they do on the home screen. That is new on this screen, matching the master. The three mode cards and BACK stay the existing artwork, unchanged, until MUTAGEN versions are supplied. The old title strip ("Choose Game Mode" with the old crest) is no longer shown; the screen keeps a hidden heading for screen readers until the title artwork arrives. Every mode flow is unchanged (same buttons and modals). Checked centred, with no overflow, at seven iPad and iPhone sizes. Commander UI suites match the baseline (flows 24/24; game 27/28, the failure being the pre-existing favicon 404).

Still needed from ChatGPT for this screen: FULLY GUIDED, FREEPLAY and TABLE TRACKER buttons with their sub-lines (assembled and animation-overlay, iPad and iPhone), the CHOOSE GAME MODE title, and a BACK button in the canister style.


## CURRENT REVISION 048 — New logo design adopted, 2026-10-25

Owner decision: use ChatGPT's new logo design. It is stored exactly as supplied at `ui/branding/logo-mutagen-v2.png` (1254 × 1254, SHA-256 cc3fd853db478dbf831282a8273028893c19fe71c79de09c6342b8273874ae9a) and is now the home logo. Its art has a wider margin on the canvas, so the image is shown about 7.7% larger and keeps the same visible size as before. The locked master JPEG and `logo-mutagen-locked-transparent.png` stay in the repo unchanged, as the record of the original. To make the logo's liquid live, ChatGPT still needs to supply an overlay and liquid mask made from v2 (`CHATGPT-REQUEST-2026-10-25b.md`, item 1). Owner confirmed the home screen is centred on iPad and looks good on iPhone.


## CURRENT REVISION 047 — Big bubbles keep rising in the down column, 2026-10-25

Owner: the bubbles look fine, and slowly moving up looks realistic for bigger bubbles. In a downward stream, bubbles now behave by size: small ones are carried down with the ooze, and the bigger ones (about one in five) are buoyant enough to keep rising slowly (about 7 px/s on iPad). The left column still reads as running down overall (about 30 px/s measured). Upward and horizontal flow are unchanged.

Logo received from ChatGPT (owner upload, SHA-256 cc3fd853…) and NOT installed: it is a regenerated logo, not a liquid-only edit of the locked one. The octagon is smaller and moved, and the steel, screws, wear, lettering and glow are redrawn (21 of about 1,030,000 overlapping pixels identical). It also came without the overlay and mask files. The locked logo stays in place. Correction message given to the owner; adopting the new design would need the owner's explicit yes.


## CURRENT REVISION 046 — Left column visibly runs down, 2026-10-25

Owner could not see the ooze running down the left column. The liquid drifted down, but the bubbles, which carry most of the visible motion in a tall column, hovered against the current. In a downward stream, bubbles are now carried down with it, held back a little by their rise. Measured: the left column moves down about 23 px/s and the right column up about 23 px/s (iPad Safari size). Chambers outside a stream are unchanged.


## CURRENT REVISION 045 — Bottom row laid out as a grid, 2026-10-25

Owner's iPad photo still showed the stack right of the columns. The photo matched the styles from before revision 042 (version text still on the bottom edge), so Safari had kept the old stylesheet: GitHub Pages lets browsers keep files for 10 minutes. To be safe in every browser engine, the PROFILE / SETTINGS / HELP row no longer relies on flex shrinking: it is three equal grid tracks that can never be wider than the space between the columns. Checked centred, with no overflow, at 11 sizes, including Safari's shorter iPad and iPhone viewports (address bar showing).


## CURRENT REVISION 044 — Stream at the old column speed; version text above the bottom edge, 2026-10-25

Owner: the whole home stream runs at the speed the sight columns had on their own (about 31 px/s on iPad), not the slower button speed. Bubbles in the buttons ride the stream at the same pace. In the down-flowing left column they hover and drift slowly, as bubbles do against a downward current; in the up-flowing right column they rise as before. The version text moved up to clear the background's bright bottom edge; checked at six iPad and iPhone sizes. Owner confirmed the home screen is centred (rev 042) and the RESOLVE fix.


## CURRENT REVISION 043 — Home ooze flows as one stream, 2026-10-25

Owner direction: the ooze flows horizontally through the pipes, with continuous motion from pipe to pipe in a believable direction. All eight home chambers now share one stream (`stream` attribute on `<mutagen-chamber>`): the liquid is laid out in page units (one unit ≈ a main button's window height) with one shared seed and speed. Liquid leaving one pipe therefore runs on into the next at the same pace and scale, and pipes in a line (the bottom row) show one unbroken stream. Bubbles stay per chamber. Circuit, as a pumped loop: down the left column, left to right through every button, up the right column, back across the top. The columns now move at the approved button speed. Approved colour, bubbles, octagon bulb flow and every chamber without `stream` are unchanged. Exact joins at corners wait for the plumbing artwork and HOME-LAYOUT.json, requested in `CHATGPT-REQUEST-2026-10-25b.md` together with the logo liquid files, button states and the next screens.


## CURRENT REVISION 042 — Home screen centred, 2026-10-25

Owner reported (iPad photo) the home screen shifted right. Cause: the three tool buttons were wider than the space between the sight columns, which pushed the centre stack about 50 px right. They now shrink to fit, so the logo, tagline and all buttons sit on the screen centre. Checked at 1180×820, 1194×834, 1366×1024, 1024×768, 844×390, 932×430 and 667×375: centred within 1 px, no overflow.


## CURRENT REVISION 041 — RESOLVE typo fixed at source, 2026-10-25

ChatGPT delivered corrected RESOLVE artwork (5 files: label, iPad and iPhone assembled and animation-overlay buttons). All five match their SHA-256 and replace the "RESOLYE" files at the same paths. Verified against the previous files: the only changed pixels are inside the stated letter areas, with the same pixel counts and bounds as the delivery's PATCH-VERIFICATION; size, shell, liquid and the other letters are untouched. The word now reads RESOLVE. Records: `handoff/assets-2026-10-25/resolve-fix/`. The RESOLVE hold in revision 040 is lifted; generated lettering stays conditionally approved. Still awaited from ChatGPT: the reworked logo liquid files and the home-screen pipe/frame artwork.


## CURRENT REVISION 040 — MUTAGEN home screen live; logo liquid rework authorised, 2026-10-25

Home screen built to the approved landing layout with supplied artwork only: transparent logo, tagline label, NEW GAME / CONTINUE / DECK MUTATOR stacked, PROFILE / SETTINGS / HELP below, live sight columns at both sides; buttons are the supplied clear-glass versions over the approved liquid (iPad and other large screens use `ui/buttons/`, phones `ui/buttons-iphone/`). All six buttons keep their existing actions; Continue stays disabled without a saved game. Checked at iPhone (844×390) and iPad (1180×820) landscape. Not yet in place because no artwork exists for them: the steel pipes linking the buttons to the columns and the top pipe/frame from the master. They will not be drawn in code.

Owner decisions: generated lettering conditionally approved, avoiding anything with RESOLVE until ChatGPT corrects "RESOLYE". Owner authorised reworking the locked logo's liquid only to match the approved ooze (the exception allowed by revision 007); steel, letters, glow and geometry stay pixel-identical. Requested from ChatGPT: `logo-mutagen-overlay.png` (liquid transparent), `logo-mutagen-liquid-mask.png`, `logo-mutagen-transparent-v2.png` (static), plus corrected RESOLVE files. Until they arrive the home screen uses the verified transparent original.


## CURRENT REVISION 039 — Full button asset delivery stored, 2026-10-25

All 145 files of the ChatGPT asset delivery received (six zips); all 143 files in its SHA256SUMS verified, same checksum list as the earlier metadata. Stored unchanged at their delivered paths: `ui/buttons/` (iPad/high-density, assembled + animation-overlay), `ui/buttons-iphone/`, `ui/labels/`, `ui/components/`, `ui/branding/`. Home buttons (canister) and octagon actions use the animation-overlay files over the approved live liquid; review page shows both. Supplied `ui/components/*-frame.png` differ from the approved `ui/liquid/*-frame.png`; the approved ones stay in use. Open defect: RESOLVE reads "RESOLYE" (all variants). Owner has not yet approved the generated lettering (only PLAY is the master's own).


## CURRENT REVISION 038 — Transparent logo received and verified, 2026-10-25

`ui/branding/logo-mutagen-locked-transparent.png` (1254 × 1254 RGBA, SHA-256 fdaf4e01edb3ca7ae732b952811dbfa60233ea27654f62cacd2bb90cc1a76dec) matches the asset manifest. Verified against `MASTER_LOGO_DO_NOT_REGENERATE.jpeg` (SHA-256 20b2e249…): same canvas, all 1,168,182 opaque pixels identical to the locked original (zero differences); only near-white exterior matte made transparent; hard edge with no white fringe on the dark background. The locked JPEG stays unchanged. This is the logo for the home screen; it is never regenerated.


## CURRENT REVISION 037 — First supplied button artwork in use, 2026-10-25

Received from ChatGPT (owner upload): asset handoff, MANIFEST.json, SHA256SUMS, BUTTON-FUNCTION-INDEX and preview for 140 PNGs, plus 12 of the PNG files: the iPhone smart-octagon `animation-overlay` buttons (finished hardware and lettering, glass left clear). All 12 match the manifest SHA-256 and are stored unchanged in `ui/buttons-iphone/game-actions/animation-overlay/`. `<mutagen-chamber overlay="…">` now uses such a file as the frame layer, as supplied, over the approved live liquid; nothing is redrawn. Review page shows all 12 with bulb flow. Known defect in the supplied artwork: the RESOLVE button reads "RESOLYE" (all variants) and needs correcting at source. Still to receive: the other 128 PNGs (iPad sizes, home buttons, navigation, labels, components, transparent logo). The handoff's notes that the liquid is unapproved and octagon flow undecided are superseded by revisions 035–036.


## CURRENT REVISION 036 — Live liquid APPROVED, 2026-10-25

Owner approved the live liquid after reviewing revision 035 on device: "These are perfect!" Status: APPROVED REFERENCE IMPLEMENTATION for the liquid material and motion (colour, bubbles, pipe flow, smart-octagon bulb flow, reduced motion, reduced green). Not yet used on app screens; device performance budget and iPhone/iPad layout validation still pending. Label lettering is NOT part of this approval: labels come only from supplied artwork (`docs/LABEL-ASSET-REQUEST.md`). Live review page: https://maxfhurt.github.io/Mutagen/ui/liquid/demo.html. Approved files (ui/liquid), SHA-256:

```
    ba946afbda06be8ed8cf0056484a7956c6c563fc93d358c328d2fb9f76dcedcf  liquid.js
    8a0162a4d6cd3ff2803a416632d7758c2077ea198869fba0f94799b613bea5cd  liquid.css
    ad49b266c9254182bfd7e0f45bb543f51fc8f4ac1e0930b166522e6b2471cb44  shells.json
    3bb7766641f9ee7bdd7e41e55a7be7f30439efaaf068866c5f0377b9be2f1288  canister-frame.png
    41481b261825e39dd4ce64fcbcc7f554917266fa83bd1d68cd7f0562f60a7668  navigation-frame.png
    26740260e3dd22fe9ce4da3d17af9497943f472c37ac7d30ca7f7b2a79d06a6e  sight-column-frame.png
    9010838bcdbd206f44b73df6befcaa1f13cf9b697598d4c14be3d5085f529157  smart-octagon-frame.png
    a4090d8320c3ba99529896ff46a7470da8b416105fcde28fb61ee015851612b5  canister-mask.png
    3794a9d045e02393aee083f78b4198eb8c9def30c140de885b9d5c4a11d710c3  navigation-mask.png
    e4fdfdea1be0475929359f7eb67579644c5eda2abcd5fe8c41fb21f3d0160c31  sight-column-mask.png
    206b2dea1c18e7a6ebbbd3794fd7451eed32a83937581135ee79fbd7b7f82b1a  smart-octagon-mask.png
```

Change these only with owner direction; screens reuse `<mutagen-chamber>` as approved.


## CURRENT REVISION 035 — Smart octagon: flow through a wider glass bulb, 2026-10-25

Owner: the octagon's flow is horizontal, but should behave like liquid entering a glass bulb of larger diameter. Changed (PROPOSED): new `flow="bulb"` mode, used by the smart octagon. Ideal flow through a widening (source at the left port, sink at the right): the stream enters fast and narrow at the inlet's height, fans out to fill the bulb, slows across the middle and gathers again into the outlet. The liquid's broad variation is carried along that local flow (two staggered phases, so it never smears). Bubbles ride in quickly, spread along curving paths, drift slowly across the middle (larger ones lifting slightly by buoyancy) and are pulled out the other side. Pipes (canisters, columns) unchanged.


## CURRENT REVISION 034 — Labels come only from supplied artwork, 2026-10-25

Owner: letters must come directly from the master and be made assets; MUTAGEN must not rebuild or remake assets. Code-drawn lettering (revisions 032–033) and the bundled font are removed. `<mutagen-chamber label="…png">` now shows a supplied label image exactly as made, only scaled to fit the glass; the element's text is the accessible name. No finished label assets exist in the handoff (PLAY master is a flattened JPEG on the old liquid; approved landing labels are flattened at ~40 px; the 335-asset kit was never delivered). Requested set and format: `docs/LABEL-ASSET-REQUEST.md` (owner will have ChatGPT make them). Liquid, flow and colour from revision 033 unchanged.


## CURRENT REVISION 033 — Label depth, brighter green, flow through the pipe, 2026-10-25

Owner: lettering better but flat compared with the master; liquid needs a brighter green; these are pipes, so a pipe wider than it is tall should carry the ooze horizontally through it. Changed (PROPOSED): labels are rendered like the PLAY master: deep purple extrusion for thickness, dark purple edge with a fine violet rim around the outside only, brushed-silver face with a bevel lit from the upper left and a darker mid band; accessible text kept in the page. Liquid green brighter (absorption lowered). Flow follows the pipe: wider-than-tall windows flow sideways and carry the bubbles through the pipe (faster along the middle, slower near the glass), tall columns flow up, square chambers hold still liquid with rising bubbles; the smart octagon flows sideways between its left and right ports. Speed kept.


## CURRENT REVISION 032 — Printed-label lettering fixed, 2026-10-25

Owner: the preview lettering looked terrible; purple outlines crossed through the middle of letters (CSS text-stroke traces the font's overlapping inner contours). Fixed (PROPOSED): labels follow the PLAY button master — heavy squared letters (Russo One, OFL, bundled in `ui/fonts/` for offline use) with a brushed-silver gradient face and a purple edge drawn as a separate copy behind the face, so the edge only shows around the outside of each letter. Letters are sized from the glass window (tall in the glass; long words shrink to fit). No shadow slab. Still not the exact master lettering pixels; exact pre-labelled button derivatives remain a production step.


## CURRENT REVISION 031 — Live liquid tuned after owner review, 2026-10-25

Owner reviewed the live prototype on device: bubbles too small; needs different bubble sizes; speed is good; ooze slightly brighter and richer with a more realistic look. Changed (PROPOSED, still not approved): 18 bubbles per chamber in a natural size mix (mostly small, some medium, a few large up to ~7.5% of the window's short side), larger ones rise slightly faster, wobble and flex a little, each with a thin lighter rim and a soft light-focus glow on its lower side (no hard highlight dot). Liquid colour now follows light absorption through the liquid (Beer-Lambert): brighter medium green at the glass (about RGB 35,193,21), richer deep green in the middle (about 0,84,0), soft scattered light from above; flow drifts the liquid thickness, not painted lines. Speed unchanged. Live at /ui/liquid/demo.html.


## CURRENT REVISION 030 — Live liquid component, review prototype, 2026-10-25

PROPOSED, not approved. Branch `phase-2-liquid`. `ui/liquid/` adds `<mutagen-chamber>`: the four rev 027 shells split by `tools/liquid/extract.py` into a frame layer (window cut out inside the glass bevel; steel, bolts, bezel and glass rim kept as supplied) and a window mask with depth. Liquid is rendered live behind the fixed glass: smooth medium green calibrated to the shells (edge ~RGB 38,140,20, deep ~5,64,5), broad absorption deepening toward the middle, slow time-based drift of that absorption along a flow direction, 16 sparse air bubbles per chamber suspended in the liquid with thin lighter rims, crisp near and soft/faint deep, rising independently (per-chamber seed, never mirrored). Fixed faint glass sheen. No streaks, veins, grain or exterior glow. One shared WebGL context, up to 30 fps, pauses off screen and when hidden, still frame for reduced motion, `data-green="reduced"` lowers green only, still gradient without WebGL. Review page `ui/liquid/demo.html`; checks `tests/liquid.mjs` 7/7. Originals in `docs/handoff/liquid-v2/` unchanged. Not done: drips/leaks, piping continuity, smart-octagon LED states, final printed-label lettering from the PLAY master, image size optimisation, device testing, use on app screens.


## CURRENT REVISION 029 — Phase 1 integration, 2026-10-25

Delivered on branch `phase-0-baseline` (PR into `main`; owner merges). State: implemented and tested in a desktop browser at phone/iPad sizes; not device-tested, not deployed.
- MUT-01: Commander's Deck Builder opens Deck Mutator (`deck/`); Return to MUTAGEN reopens the calling screen, including player setup with its seats. Commander's old Deck Editor and its saved decks are no longer used (owner: Deck Mutator takes all decks and deck building).
- MUT-02: one profile, each fact stored once. Game side keeps name, avatar, games, achievements, history; Deck Mutator keeps decks, collection, buy lists, tablemates. Each side shows the other's data; one MUTAGEN backup saves and restores both. Player setup lists every Deck Mutator Commander deck with its owner.
- MUT-03: app-owned names are MUTAGEN and Deck Mutator. Main tier labels only (owner option b): Mutations tab, Budget Mutation / Mid Tier Mutation / Apex Mutation, comparison sheet Your card / Budget / Mid tier / Apex. Sentences, storage keys, backup format keys, card names, rules and bracket labels unchanged. Artwork with old names waits for Phase 2.
- Combo data ships with the site (`deck/data/combos.json.gz`), refreshed weekly by a workflow PR. Hosting: GitHub Pages from `main`, repo public (owner).
- Evidence: `tests/mutagen_flow.mjs` 19/19; results and known source issues (incl. Deck UI-B81-02/UI-B146-02 race) in `docs/BASELINE.md`; every edit to the copies in `docs/CHANGES-TO-COPIES.md`.
Not changed: visual masters, locked assets, MUT-04..MUT-22 requirements.


## CURRENT REVISION 028 — Phase 0 baseline in MaxFHurt/Mutagen, 2026-10-25

Decisions (owner, 2026-10-25): build MUTAGEN in the new repository `MaxFHurt/Mutagen`. Commander base is `rebuild/` (1.0.0-rebuild.29), not the root V0.8 KC app. Copy both apps in unchanged, then integrate (Commander is the shell, Deck Mutator a section of the same site). Function first (merge, routing, unified profile/decks, renaming), visual layer after. Implementation is authorized in Mutagen only. Superseded the same day: CommanderCompanion and Deck-Companion stay editable and may keep being developed; this build only reads them and syncs their updates into `commander/` and `deck/` from the recorded baseline commits (sync log in `docs/BASELINE.md`, edits to the copies in `docs/CHANGES-TO-COPIES.md`).

Delivered (Phase 0, branch `phase-0-baseline`): `commander/` = CommanderCompanion `f9dfe396` rebuild/ (217 files), `deck/` = Deck-Companion `fdf21b78` build 164 (213 files), both byte-identical to source. Working handoff subset in `docs/handoff/` with hashes verified; full package hashes, test results and known pre-existing failures in `docs/BASELINE.md`. Status and next steps in `docs/STATUS.md`. Not changed: any app code, visual masters or requirements MUT-01..MUT-22. Nothing deployed. State: baseline delivered, not integrated.


## CURRENT REVISION 027 — Smooth liquid correction, 2026-10-24

User rejected swirled ooze and weird green lines. Applies to every liquid area including buttons, smart control, sight columns, and modal windows. Use smooth translucent viscous medium-green liquid with subtle broad absorption gradients and sparse submerged bubbles. No painted flow streaks, luminous veins, marbling, granular/carbonized texture, mirrored bubble arrangements, or exterior bloom. Steel geometry and printed labels must remain intact. Flow must be actual time-based animation; do not suggest it with decorative lines. Preserve approved boundaries; drips align under their outlet inside a capture area.

Four revised transparent static material assets are provided in MUTAGEN-Liquid-Correction-v2.zip. These replace the rejected material examples, not the source game functionality. Raster edits are visual candidates, not a claim of pixel-identical hardware preservation or completed real-time animation. The earlier 335-asset assembly was interrupted before durable packaging; do not claim it delivered. Rebuild dependent labeled assets from corrected bases before releasing the complete asset kit. Both repositories remain read-only.


## CURRENT REVISION 026 — Feature restoration review, 2026-10-23

Repositories remain READ ONLY; no implementation changed. New standalone review images live in mutagen-complete-masters/rework. Originals are retained.

Restored source-based layouts: C13 Table Tracker v3 (four detailed players, editable names, life/tax steppers, status, counters, mana, tracked cards, permanent log, Next Turn/Undo, Table/Judge and editing footer); C11 Free Play v3 (three-column player layout, commander/tax/status, mana and zones, battlefield/lands/hand, opponent summaries, log/stack/undo, coaching, Board/Table, Edit Game, phase track and smart octagon); C10 Guided v2 uses the same preserved layout with role-dependent Challenge.

Supporting review drafts: C02 setup v2; C03 rules v2 with all 14 toggles and life/mulligan/timer; C09 opening hand; C12 oversight; C14 expanded log; C15 populated zone; C17 player details plus distinct counter and status editors; C21 attack and block; C23 target selection; S05-game card editing popup. These are static review proposals, not approved production assets or proof that every conditional state is covered.

Claude requirements:
- Retain all current handlers, permissions, state-dependent actions and data. Reskin existing components rather than reconstructing functionality from these images.
- Tracker: preserve room/turn/current-player display, player activation, host-only edit/reset/clear-log; full counter presets, custom counters/statuses, tracked-card selection and counter badges; tax controls must remain separate from life.
- Free Play/Guided: identity-filtered mana, poison/status values, commander zone/action, role-dependent Host Tools/Challenge/Edit Game, correction state, empty/disabled states and context-sensitive smart action must remain. DRAW is only a sample, never hard-code it in Main 1. Keep coaching above hand cards without overlap.
- Rules: preserve all actual dropdown choices and 0=off timer semantics; do not use generated sample numbers as defaults.
- Combat: preserve Stay Home, goad/must-attack, legal blocker options, multiple blockers where allowed, busy/disabled choices and confirmation behavior. Generated one-block example is not a universal one-blocker rule.
- Targets: preserve choose-one immediate selection vs choose-many confirmation, valid counts, filtering threshold and legality. Generated sample names/stats are not authoritative.
- Popups: keep game card details distinct from Deck Mutator printing/price/faces/ownership. Restore exact card images and source data, not generated card text.
- Exact master logo/button reuse, transparent layer extraction, restrained green with containment, real fluid animation, reduced intensity setting, and separate iPhone/iPad layouts still require production assembly.
- Keep the 025 audit's UNVERIFIED screens unverified until directly matched. Do not approve them on visual resemblance.

Known review defects: sample cards/counts/log entries are illustrative and sometimes inconsistent; C09 land count needs reconciliation; C15 has duplicate Close buttons; C17 player detail is supplementary, not the counter editor; artwork does not yet reproduce the exact approved buttons/logo. Deck-context S05 and remaining source-unmatched screens are not certified. All original assets and audit history retained. See FEATURE-RESTORATION-REVIEW.md and gallery for this revision.

## CURRENT REVISION 025 — Full current-set visual audit

Inspected all 26 current detailed PNGs individually. See MASTER-COMPARISON-AUDIT.md for per-image findings. C10/C11 player views and C13 Tracker are rejected layouts; restore actual supplied app layouts, not decorative battlefield concepts. C02/C03/C09/C12/C14/C15/C17/C21/C23/S05 also require rework or scope restoration. Unmatched source screens remain UNVERIFIED, never passed on catalog alone. Preserve approved S01 material treatment and all originals. Rework begins with C10/C13 source-based proposals; not final assets. Repositories read-only. Audit of all historical drafts and exact unmatched source screens remains pending.

## CURRENT REVISION 024 — Screen-feature preservation gate (October 22, 2026)

User reminder: supplied visual masters are mandatory screen-content references. No features may be removed from any screen. The batch using only landing/popup style references plus summarized catalog entries was stopped. Existing generated pages remain unverified proposals, not completed replacements.

MUT-22 — Before rebuilding each screen, map its exact supplied master to every visible control, information panel, tab, navigation destination and state. Reconcile with read-only application functionality. Preserve all features on their respective screen; do not move them into hidden menus, replace them with decoration, merge away controls or simplify scope without explicit user direction. The summarized 86-screen catalog is an index, not sufficient feature acceptance evidence. Retain source master identity, an itemized comparison and unresolved discrepancies per screen. A missing control fails acceptance even if the new artwork looks polished. In particular, the Fully Guided proposal missing the integrated smart-action octagon requires correction. No production approval or complete coverage claim until these comparisons pass. Both repositories remain strictly read-only.


## CURRENT REVISION 023 — Landing material approved; more screens authorized

User explicitly approved the displayed submerged-bubble revision: “Looks good save it and make some more.” Approved static reference: mutagen-approved-masters/01-Landing-Approved.png (source exec-41c3392b-2951-4baf-90a0-9154c7338a99.png). Preserve exact image and carry its liquid/bubble appearance forward. This supersedes the assistant's preceding concern about larger bubbles; do not keep adjusting an approved treatment without direction. Approval is static visual/material approval, not proof of working animation, production assets, integration or device testing. Actual flowing ooze and aligned intermittent drips remain required. Next independent screen proposals: game mode selection, Deck Mutator home, card-details popup. Both repositories remain read-only. Future Claude assembly must keep approved liquid treatment, fixed printed labels/glass/hardware, submerged depth-attenuated bubbles and full chambers, while preserving all app features.


## CURRENT REVISION 022 — Bubble depth correction

User says the smoother liquid looks better, but bubbles appear ON the ooze rather than IN it. Retain the improved liquid material and correct only bubble depth. Bubbles must be air pockets suspended within translucent viscous liquid, with depth-dependent attenuation, soft refractive edges, variable focus, small irregular/oval silhouettes and sparse independent placement. Avoid raised green beads, embossed circles, hard highlight dots, drop shadows and surface-adhered droplets. Glass reflections remain fixed in front of liquid and bubbles. Claude must implement bubbles beneath glass/reflection layers, with green absorption increasing with depth and no surface-bead lighting. This is a material correction proposal; actual motion and final approval remain outstanding. Preserve originals and all non-liquid artwork.


## CURRENT REVISION 021 — 2026-10-21: Landing liquid rejected

User rejected the ooze appearance in the detailed landing-page attempt. The initial edited plate and its animation are NOT approved masters. Preserve them only as historical drafts. Correct liquid material before propagation: cohesive translucent medium green gel, restrained highlights, subtle depth, sparse small bubbles, no bright ribbon swirls or oversized spheres. Keep full chambers, fixed printed lettering and all existing non-liquid artwork. Preserve the requirement for real-time motion and physically aligned intermittent dripping; a corrected still is only material review, not completed animation. Existing repositories remain read-only. Future Claude implementation must keep fixed glass highlights/metal/text separate from moving liquid and must not fake flow with bright painted streaks. New liquid treatment is proposed until reviewed.


## CURRENT REVISION 020 — 2026-10-20: Animated screen assembly drafts

User explicitly authorized all screens with working animation; this supersedes earlier static-first staging for review prototypes, without approving final artwork or repository writes. Delivered working Canvas animation across 86 catalog screen families (35 Commander, 39 Deck Mutator, 12 shared), each with independent HTML preview and two device compositions. Gallery: index.html; register: SCREEN-REGISTER.md; implementation requirements and limitations: CLAUDE-HANDOFF.md. All 172 native render checks change with time and return exactly at the twelve-second seam; verification.json records results. Browser/Safari and physical-device tests remain pending.

Status is ANIMATED ASSEMBLY DRAFT, NOT LOCKED FINAL MASTER. Placeholder card art, generic list-family layouts, final hardware integration, exact source-button typography and integrated smart octagon remain unfinished. Existing originals are preserved. Source art is reused through controlled runtime derivatives; no claim of full pixel-exact final assembly. Both application repositories remain untouched. New code requirements MUT-21: bind shared profile/deck identities, preserve all existing routes and modals, retain Deck Build 144 mutation/Buy List/printing/scroll requirements, implement green-only intensity and reduced-motion preferences, use masked independent liquid fields with fixed lettering, and validate safe-area/device layouts. See full numbered requirements in CLAUDE-HANDOFF.md. Do not treat sample scores, card names or placeholders as engine output.

This checkpoint is in MUTAGEN-Animated-Screen-Assembly-01.zip. ASSET-HASHES.json records actual file hashes. The prior rolling archive remains preserved independently; this is an additive checkpoint, not a repository backup. Further visual refinement is authorized and still outstanding.


## CURRENT REVISION 019 — 2026-10-18: Smooth ooze and opaque top border

User says pipe treatment is better but ooze looks worse and carbonized; explicitly remove top-border canisters. R08-smooth-ooze-steel-top.png replaces both top sight chambers with continuous opaque steel pipe and regular couplings. Top joint leak remains. New ooze treatment is cohesive smooth viscous gel with broad gentle swirls and sparse bubbles; remove dense spherical bubbles, gritty speckling and burned-looking patches across all liquid areas. Retain long side sight glasses, dark brushed steel, constant-diameter plumbing and source-button design requirement. Static proposal awaiting review; no animation/code changes. All earlier versions preserved. Generated page is not proof of exact source-asset reuse.

## CURRENT REVISION 018 — 2026-10-18: Longer sight glasses and darker steel

User judged R06 much better and requested slightly wider side sight glasses extending almost the full column length, plus somewhat darker, more realistic steel. R07-long-sight-glass-dark-steel.png applies this targeted visual revision. Target windows approximately 85% of column height and 60% of width, with steel margins and fitted bezels. Steel finish: darker satin brushed stainless/gunmetal, restrained highlights, fine machining texture. Preserve plumbing routes, button master design, full liquid chambers, purple styling and existing leaks. Dimensions are visual targets, not measured production specifications. Static proposal awaiting review; all earlier files preserved. No code or animation changes.

## CURRENT REVISION 017 — 2026-10-18: Steel columns and limited sight windows

User approved direction: replace large exposed side ooze tubes with predominantly steel reservoir columns containing small viewing windows. Reduce visible ooze throughout borders while retaining full liquid internally. All elbows opaque steel. Regular straight steel couplings only, matching a uniform tube diameter; no reducer couplings, tapers or random terminations. Pipes connect into matching flush reservoir ports. Master button design remains required; physical flow/drips retained without color bleed. R06-steel-columns-landing.png is the new static review proposal, not approved exact production assembly or animation. Preserve all prior versions. In final assembly verify actual equal diameters; image generation alone does not certify geometry or exact button reuse.

## CURRENT REVISION 016 — 2026-10-18: Visible flow and connected uniform plumbing

User rejects random pipe endings and changes in pipe diameter. All pipe runs must keep a constant diameter, with matching elbows/tees/couplings and visible connections to real ports. Canister bodies may vary in size; pipes must not taper or use reducers. Mutagen visibly flows through connected pipes, reservoirs and button chambers; all chambers remain full. Leak motion: accumulate at a visible damaged joint/seal, elongate, detach under gravity, fall and meet the lower rail directly beneath. Keep physical leaks but prohibit green light/color bleed. Labels remain fixed on glass using supplied master button appearance.

MUT-20 for Claude: implement continuous directional liquid motion and separately masked bubbles within the connected network; maintain continuity through elbows and matching ports, use distinct bubble phases, keep text motionless and fully readable. Leak emitters must correspond to actual joints; animate accumulation/stretch/detachment/fall/impact with aligned coordinates. No code authorized here. R05-flow-circuit-landing is a STATIC concept, not an animation or production asset. It improves visible routing but still needs exact geometry assembly: differing apparent header/branch widths and master-button fidelity remain unresolved. Do not treat generation as verified engineering. R01–R04 remain rejected as plumbing assembly references. All originals retained.

## CURRENT REVISION 015 — 2026-10-17: Master buttons, leaks restored

Review checkpoint: R01–R04 are composition drafts only. They fail exact button-asset reuse; several labels still have dark liquid regions and edge shadow, and green intensity/canister count vary. R03 is too dense around the perimeter. Do not approve these as production masters or propagate their defects. Remaining R05–R12 not yet generated. Exact controlled assembly from the supplied button asset is needed; whole-page generation cannot verify the user's exact-asset requirement.

Supersedes Revision014's no-leaks interpretation. User explicitly wants physical leaking ooze and drips; forbids color bleed, exterior green bloom and wash. Few border canisters, varied shapes/sizes, symmetry allowed, visibly correct plumbing with attached ports and continuous routes. All canisters INCLUDING buttons must be full of ooze. Apply approved G01B softer medium spring green to ALL liquid areas. Preserve purple and other styling.

LOCKED BUTTON SOURCE: assets/references/PLAY_BUTTON_MASTER_HORIZONTAL.jpeg, matching user's supplied PLAY canister. Use this master construction and lettering appearance directly in eventual assembly. Do not invent replacement buttons. Rejected example: generated exec-a294b04d-515a-4353-b26e-264d5dd2afed.png (flat white lettering). User wants printed-on-glass labels like original master, no added text shadow or dark label slab. Retain master silver texture/purple edging. Different labels require controlled derivatives of supplied master; full-page generated mockups are references only and do NOT prove exact source pixels were reused.

MUT-19 Claude requirements: separate physical leak geometry/masks from lighting masks. Permit leak motion in intended paths, prohibit color/light bleed. Filled liquid behind every label; no empty dark central chamber. Maintain readable printed appearance over moving liquid. Inspect connected inlet/outlet geometry, varying reservoir dimensions, independent bubbles, gravity-aligned drip/landing positions. Keep animation and device-specific production assembly pending. Repositories remain read only here. User authorized rebuilding pages sequentially; preserve originals and checkpoint each page. R-series are new proposals, not approved production assets.

## CURRENT REVISION 014 — 2026-10-17: Sparse, sealed containment trial

User requires substantially less green: a few sealed canisters per border, separated by silver/chrome and black structure. Green liquid, bubbles and glow must remain wholly inside glass; no spill, drip, splash, runoff or outward bloom. This supersedes older continuous-green perimeter and drip/splash requirements, including Revision007 motion treatment. G01B remains the approved green intensity; purple, artwork, text, functions and locked central logo geometry remain unchanged targets.

S01 is a landing-page outer-frame trial with four accent canisters, not yet approved. Original images and G-series variants are preserved. Pause propagation until this sample is reviewed. No code, production layers, animation or device validation completed; repositories remain read only.

Claude implementation requirement MUT-18: use explicit containment masks for liquid, bubbles and emissive glow, including every animation frame, seams, corners and button states. No green spill lighting on exterior surfaces. Opaque metal connections may separate canisters; continuous visible liquid piping is no longer required. Remove planned drop/splash motion. Smart-action control remains structurally integrated; its legal-action glow must stay contained. Validate independently sized iPhone and iPad layouts without stretching. Preserve readable printed button labels and existing features. Exact production geometry awaits approval of the sparse-frame sample.

## CURRENT REVISION 013 — 2026-10-17: Green midpoint APPROVED

User explicitly approved G01B Landing (“Yes!”) and instructed continuing. Approved green reference: `screens/G01B-landing-green-midpoint.png`, SHA256 b572d7056557df5b578a371cc69cdd571358b3f82c26ba259918977f091f923e. Apply this green-only appearance to remaining original screens; preserve non-green appearance, content/layout and all originals. Approval is for this green treatment, not implementation/device testing. Earlier G01 intensity and LC01 whole-scene dimming remain historical alternatives. Save/display each revision before proceeding.


## CURRENT REVISION 012 — 2026-10-17: Brighter green midpoint

User found G01 too dark and requested a little brighter so the design pops. Target a midpoint between original fluorescent lime and G01 deeper green. Change green only; preserve purple, chrome, text, artwork and geometry. New G01B Landing is a review sample, not yet approved. Preserve original01, LC01 and G01. Do not propagate the rejected G01 intensity to remaining pages. MUT-17 should use the subsequently approved green appearance, not global dimming. No code changed.


## CURRENT REVISION 011 — 2026-10-17: GREEN ONLY, resumed

User resumed editing: dial back fluorescent lime to a slightly darker richer green; EVERYTHING ELSE stays unchanged. Supersedes prior whole-screen low-contrast treatment: do not dim purple, silver, artwork, text, background or overall exposure. Retain original layouts/labels and exact logo geometry. Preserve every original and LC01; add separate G01–G12 versions. Settings12 remains the softer-green reference but its earlier whole-theme dimming is not the instruction for other pages. Full page batch is existing 12 screens, not all unmade app pages. Present/save each sequentially. MUT-17 must target green liquid/accent appearance, not a blanket opacity/filter; retain independent Reduce Motion, persistent preference, functional state indicators and readable text. No repository changes authorized. Static generated derivatives require fidelity review before production extraction.


## PAUSED — 2026-10-12, 19:17 EDT

User: “I personally after looking at the screenshots, I do like them, but they are way too bright. Let’s stop for a second.” Stop all further screen generation/remakes pending direction. LC01 Landing was already generated before this instruction; preserve it as an unapproved variant alongside original01. Screens LC02–LC11 have NOT been generated. Settings12 earlier style approval does not authorize continuing after this pause. Brightness direction remains under discussion. No repository code changed.


## REVISION 010 — 2026-10-12: Low-contrast master approved; preserve originals

Aaron approved the appearance shown in `screens/12-settings-low-contrast-mode-proposed.png` (SHA256 549bfedb23c2bea427042e5e11df8247a8b726b1c9f70b71199314716b8b1729) and requested every screen remade in this low-contrast mode while keeping all originals. Approval covers the visual intensity/style reference, not implementation or device testing. Produce separate `LC01`–`LC11` variants of existing screens 01–11; screen 12 is already the approved low-contrast reference. Preserve original image bytes and entries. Remakes change decorative intensity only, not page functions, labels, layout or logo geometry. Save/present each variant before proceeding. Remaining not-yet-created app screens also use this approved treatment. MUT-17 stays required, not coded/tested. Do not interpret this as removing normal mode or changing default-mode preference without confirmation.


## REVISION 007 — 2026-10-12: LOCKED visual-change and cross-chat source protocol

**STANDING MANDATORY RULE:** Whenever GPT-6, Work mode, or another participating chat changes any accepted visual master, design direction, asset, gameplay requirement, or Claude implementation requirement, update BOTH `MUTAGEN-Working-Source.md` AND `MUTAGEN-Visual-Change-Roadmap.md` immediately in the same work cycle. All chats must consult their latest shared versions and reconcile concurrent updates; a file in one chat does NOT automatically update files in other chats. Maintain revision number, timestamp, what changed, what stayed locked, ownership, approval status, expected test and actual artifact path/hash. Never silently alter or regenerate approved assets. Preserve older decisions with explicit supersession. If the shared-source update requires approval and remains blocked, mark NOT SYNCED and provide the new complete files, never claim synchronization succeeded.

**EVIDENCE RULE:** Every task recorded as DONE/DELIVERED/APPROVED must have its actual relevant file IN THE HANDOFF PACKAGE and named in the roadmap with SHA-256. A prompt, chat image, prose description, plan, or screenshot alone is not completion of animated UI, extracted asset, or implemented feature. Approved visual direction and completed production asset are distinct.

**STATIC-FIRST / ANIMATION-STAGE GATE:** Present the corrected STATIC LANDING PAGE visual master for approval first. Only AFTER the exact static master has been approved and individual assets extracted, implement upward moving bubbles, occasional drip, splash, and runoff on the transparent BORDER/GLASS/OOZE animation layer; do not flatten the functional page to a video or animate button/label geometry. A composited animation preview can be produced later for approval. Claude must preserve exact motion parameters below and validate them, not substitute a different animation. Record a real animation file and testing evidence before marking it done. Reduced-motion fallback needed.

**EXACT DRIP PHYSICS:** Right-side leak comes from an identifiable seam directly beneath the WIDE uninterrupted upper pipe spanning screen left to right. A SMALL droplet builds periodically and drops straight down with the same screen X coordinate to the lower chassis directly beneath it, splashes softly at that exact impact spot and flows DOWN the chassis face along its contours under gravity. Long pauses between droplets; no constant stream, sideways jump, diagonal misaligned landing, mirrored twin drip, or large hero spill. Help button retains small separate non-obscuring ooze across top of its frame and down its button face. No bottle-like decorations in top corners. Rest of landing composition stays EXACTLY locked.

**ALL-ASSET NO DRIFT:** Canonical `MASTER_LOGO_DO_NOT_REGENERATE.jpeg` SHA256 `20b2e24979e7cbf939333277d72ced6934caf6e82d794e93587bbe90d44d1f73`; never reinterpret, regenerate, morph, or move geometry, chrome, typography, framing, proportions or placement. ONLY lime green liquid already within the M may be modified to match liquid style, with separate signoff; all other original details stay identical. Every non-ooze element of approved layout/piping/buttons stays fixed. Stainless/chrome hardware, no brass/bronze/purple-painted metal. Glass chambers FULL of visibly green realistic ooze behind print-on-glass words; never black/hollow/shadow slabs. Bubbles rise asymmetrically, changing count, size and spacing independently on each side; frames and pipe construction MAY be symmetrical but the ooze MUST NOT be mirror-copied. Green octagon liquid hue is permanent; only metal indicator LEDs may change color/glow on legal-action availability. Bulk liquid streaming animation optional; upward bubbles mandatory.

**STATUS at revision 007:** Exact logo file and the approved landing composition baseline are included in `MUTAGEN_VISUAL_HANDOFF_007.zip`. Current drip review screenshot is supplied but NOT finally approved for physics. Corrected static drip landing master, motion preview, extracted production layers, gameplay feature audit and code implementation are PENDING. Both GitHub repositories remain READ-ONLY; no push/commit/deployment authorized. See separate `MUTAGEN-Visual-Change-Roadmap.md` for file-linked statuses and Work/Claude gates.

---

Revision 005 · 2026-10-11, 20:16 EDT · Current coding requirements and visual/motion decisions consolidated

## CURRENT DIRECTIVE — read before historical notes
This section supersedes conflicting earlier design proposals and pending-handoff statements below. The October 11 MUTAGEN V3 handoff has now been received, all five Markdown files read, all eight unique images reviewed, and the ten image-file checksums verified against its manifest. Preserve the uploaded archive unchanged. This document authorizes planning only: no repository changes, commits, branches, uploads or deployments. Claude implementation requires separate authorization.

### Evidence and approval status
- The earlier live inspection concerned Commander root V0.8 KC and Deck Build 80. It is historical evidence, NOT a complete audit of the newer rebuild.
- Subsequent read-only repository checks found Commander `rebuild/build.json` reporting `1.0.0-rebuild.29` and Deck `version.json` reporting build `93`. These are source-file observations, not independently verified deployments. Handoff claims rebuild.28/build87 are older. A complete latest-source/route/handler audit remains outstanding.
- Source locations: https://github.com/MaxFHurt/CommanderCompanion/blob/main/rebuild/build.json and https://github.com/MaxFHurt/Deck-Companion/blob/main/version.json .
- The user called the first reference board “pretty damn close,” then requested button-only corrections. This is directional acceptance, not final approval of every screen, layout, label or production asset.
- Board A: `generated_images/exec-6d530315-bfee-4627-b59b-878d64b2ae60.png`.
- Board B, latest button revision: `generated_images/exec-f84c0b69-62a0-4c1a-81e0-c5f23aa301f6.png`.
- Both boards are static visual proposals. Actual animation has NOT been implemented or demonstrated. Board B is not a validated button-only pixel diff; incidental generation changes must not become new requirements.
- Known board defects remain: generated logos differ from the canonical master; labeled iPad panels do not have true target proportions; illustrative card text/counts are not functional specifications. Do not implement those errors. Screen labels alone do not establish device validation.

### Locked visual sources and hierarchy
1. Exact canonical logo: `visual_references/approved_direction/MASTER_LOGO_DO_NOT_REGENERATE.jpeg` inside the uploaded handoff. SHA-256 `20b2e24979e7cbf939333277d72ced6934caf6e82d794e93587bbe90d44d1f73`. Never regenerate, trace, repaint or substitute it. Original must remain unchanged. Transparent extraction, cropping or sized derivatives need explicit approval under the handoff; the supplied JPEG is not a production transparent asset.
2. Horizontal button construction: `PLAY_BUTTON_MASTER_HORIZONTAL.jpeg`; preserve its shared stainless/chrome containment-shell language, subject to the latest lettering correction below.
3. Contextual control: `OCTAGON_CANISTER_CONTROL_REFERENCE.jpeg`; octagonal containment, never sphere/orb/jewel.
4. Deck feature visual direction: `DECK_MUTATOR_VISUAL_REFERENCE.jpeg`; preserve its strong direction while mapping every real capability.
5. Battlefield border reference and collage are partial references, not approved complete layouts. Legacy Commander images are feature recognition ONLY, never visual styling sources.

## FUTURE CODING CHANGE REGISTER — mandatory for Claude
Standing workflow rule (Aaron, October 11, 2026): whenever a decision, visual revision, finding or requested behavior requires future coding by Claude, update this rolling register in the same work cycle without waiting for another reminder. Record the requirement, reason, affected screens/components, expected behavior/state transitions, acceptance test, dependencies, approval status and unresolved questions. Supersede contradictory entries explicitly; preserve history. Clearly distinguish proposed, user-required, approved, implemented and tested states. Saving a note is not implementation, and this rule grants no repository-write authority.

These are implementation requirements and acceptance tests, not claims that changes already exist. Preserve existing game/deck engines; trace each behavior to current source before implementation.

| ID | Required coded change | Acceptance evidence |
|---|---|---|
| MUT-01 | One primary MUTAGEN destination. Replace Commander’s legacy Deck Builder destination with integrated Deck Mutator; provide Return to MUTAGEN and return-to-player-setup context. Repository merger is optional, not pre-decided. | Round-trip navigation preserves caller, unsaved work and running game; no competing legacy editor exposed inadvertently. |
| MUT-02 | Unified profile and versioned deck identity/storage contracts. Shared saved decks appear in player setup; preserve names, commanders/partners, quantities/printings, aims, locks, exclusions, ownership/buy lists, stats/defaults/achievements/history/avatars and backups where currently supported. | Old/new profile and deck migration, duplicate names, conflict/reload tests, recoverable migration; saved library edits do not silently rewrite an active game. |
| MUT-03 | Rebrand app-owned names to MUTAGEN and Deck Mutator. Upgrade feature labels become Budget Mutation, Mid Tier Mutation, Apex Mutation and appropriate mutation actions. | Audit UI, image text, accessibility labels, title/manifest/icons, help, exports/backups and cached assets. Preserve official rules, bracket labels, card names and legacy compatibility keys. |
| MUT-04 | One fully themed component system across ALL screens and states. Engineered silver/chrome, black and purple atmosphere with lime liquid under glass. No purple-painted metal or unrelated canister filler. | Headers, footer overlays, navigation, inputs, selects, switches, lists, dialogs, empty/loading/error/disabled/focus states all intentionally styled; no generic black strip holding novelty buttons. |
| MUT-05 | Buttons are liquid-filled glass containers with words physically appearing printed on the glass. Remove broad dark label backing, black shadow slabs, hollow-looking centers and heavy text extrusion/drop shadows. Fluid remains visible behind/around lettering. | Crisp readable printed labels over visibly full chambers at actual device size; consistent shell geometry and subtly varied bubble/current patterns. Retain clear destructive/confirmation semantics. |
| MUT-06 | Integrate the gameplay smart octagon into the same surrounding containment frame. Connect left/right neighboring pipe runs and a physically continuous inlet/downflow/outlet/return route through the chamber. No abrupt pipe ends, floating badge or independent orb. | Inspect joins at full resolution and actual size: connected glass/liquid paths, no gaps, no decorative dead ends around control; no overlap of hand, guidance or phase controls. |
| MUT-07 | Implement actual contained liquid animation, not a static green texture or glow-only substitute. Liquid travels through connected channels and downward through smart-control chamber; bubbles rise. Vary loop phase/current/bubble arrangement across buttons without discontinuous piping. | Motion preview plus running-device proof of direction, seamless loops, clipped liquid inside glass, stationary printed labels and stationary metal. No spilled ooze. |
| MUT-08 | Drive smart-action label, enabled state and localized brighter glow from current legal actions for the current viewer/player/mode. No hardcoded permanent Draw or Attack. Re-evaluate on phase, priority, stack, resources and game-state changes. | No-action state lacks inviting legal-action glow and cannot invoke an illegal Guided action; available-action state glows and invokes the matching handler; multiple choices are discoverable. Free Play overrides remain explicit, not falsely labeled legal. |
| MUT-09 | Keep Next Phase and End Turn persistent and separate from smart action. Guidance panel belongs beneath those phase controls. Preserve blocking prerequisites, warnings and actual coach content. | Untap/draw/combat/priority/cleanup transitions retain engine checks; controls remain discoverable even when disabled; guidance never hidden by footer/safe area. |
| MUT-10 | Each player owns separate Graveyard and Exile affordances. Four-player board must expose four Graveyards and four Exiles, clearly labeled by owner, with correct counts and routes. Adapt to verified supported player counts. | All eight links select correct owner/zone; no shared or missing pair; test 2–6 players if latest source supports them. |
| MUT-11 | Commander card image serves as the player character portrait. Connect playable glow to actual commander legality, including zone, tax, mana, timing/priority and restrictions; preserve partners if supported. Status indicator remains distinct and functional. | Legal/illegal, taxed and partner commander tests; portrait action and status popup remain separately discoverable; do not substitute unrelated avatar art. |
| MUT-12 | Design Judge/host review as a separate full-capability view, not a scaled Player Battlefield. Preserve role-authorized inspection/editing, life/status/counters, cards/tokens/zones, phase/turn, stack/log/undo, veto/end-game and rules tools where implemented. | Trace each host action and access guard; no unauthorized edits or exposure of hidden opponent hands/libraries. Judge and Table Tracker remain functionally distinct. |
| MUT-13 | Preserve every current game function: mana/source/payment tools, hand/card inspection, battlefield/lands, tokens/attachments, counters/status, stack/priority/resolution, combat, undo/history, Card ID/scanning, chat/help/settings, save/continue and mode-specific tools. | Per-action source/handler/state/persistence/undo mapping and regression test. A screenshot is never an interactive substitute. Mark pre-existing gaps separately from rebuild regressions. |
| MUT-14 | Preserve Deck Mutator workflows: creation modes, generation/import/precons, commander/format/filters/mechanics/locks, legality/health/statistics, mutations and reasons/alternatives/exclusions, printing selection, collection, buy list, profile/backups and export. | End-to-end behavior tests; do not infer new Test/Analytics/Versions/Import-from-Game capabilities solely from concept artwork. Verify or classify as proposed before coding. |
| MUT-15 | Independent iPhone-landscape and iPad-landscape compositions and exports, no stretching, authentic card ratios, readable touch controls and safe-area/keyboard handling. | Correct aspect-ratio masters and device testing; no duplicate footer, rotation distortion, hidden controls, clipped labels or pointless giant gaps. |
| MUT-16 | Yellow industrial warning/sticker presentation only for alerts/confirmations, with truthful consequence copy. Back/Close/Cancel never commits. | Confirm executes once; Cancel/Back leaves state unchanged. Do not label a reversible card cut “permanent” unless the actual operation is irreversible. |

### Animation and interaction implementation contract
- Separate static chrome shell, glass/highlights, liquid masks/flow paths, bubble layers, label layer and state-driven glow. Final renderer choice is for Claude after profiling; this is not permission to implement now.
- Fixed-label production buttons must have the approved printed-letter appearance and correct accessible names. Dynamic smart-action labels use approved variants or a matching live-text treatment; never bake game state or user text into a screenshot.
- Always keep hit regions, focus indicators, disabled semantics and interaction above decorative layers. Decorative animation must not capture taps or communicate legality by color alone.
- Map action availability to the authoritative game/view/controller APIs found in the latest audit; do not invent a second legality engine or a new hardcoded “playable” flag. Invalidate stale choices after state changes.
- An available smart action causes localized brightening in the chamber; idle flow and legal-action glow are separate states. Reduced motion preserves static action-availability cues and full functionality.
- Honor reduced-motion preference and provide a static presentation; pause unnecessary animation when hidden/offscreen. Define/test a measured mobile performance budget before release; no unverified frame-rate claims.
- Multiple legal choices: expose a themed chooser when required by existing behavior, with explicit labels and a non-committing dismissal; do not silently auto-select a strategic choice. Exact chooser artwork remains to be approved.

### Names and copy reconciliation
- Main app: MUTAGEN. Secondary feature: Deck Mutator.
- Original user slogan remains “Mutate The Gathering.” Incoming handoff and reference-board line: “Design. Test. Mutate. Repeat.” Their exact placements must be approved; neither is silently erased or assumed to replace the other globally.
- Preserve technically correct Magic terminology. “Mutation” here is product language; never rewrite official card mechanic “mutate” or rules text to match branding.

### Required approval and recovery gates
1. Complete latest-source/live feature audit, with source path/selector, handler, trigger, role, preconditions, enabled/disabled states, mutation/persistence/output/error/undo and test evidence for every action.
2. Preserve both original apps independently: exact source/deployment IDs, dependency locks/assets, data schema/export fixtures and verified restore instructions. No current backup has yet been created by this chat.
3. Approve corrected per-screen masters and dedicated device proportions. Current reference boards are visual studies; canonical logo, dense screen readability, exact player zones and feature completeness require verification.
4. Approve actual motion preview and printed-container button treatment. A still picture does not pass the animation gate.
5. Produce exact production assets and manifest: IDs, dimensions, alpha bounds, clear space/padding, device mapping, state variants, slice/scale rules and hashes. Derive from approved masters, never approximate-regenerate them. No final exports are approved yet.
6. Obtain separate implementation authorization. Claude then integrates in safe stages and validates no-feature-loss, migration, device layout and performance before any separately authorized release.

### Current checkpoint
Saved requirements include handoff reconciliation, board revisions and latest button/flow/glow corrections. No repository edits, implementation, animation runtime, complete regression audit, final asset set, recovery snapshot or official rules/mechanics reference compilation has been completed. Historical sections below remain useful inspection evidence but do not override this current directive.

## Authority and scope
Aaron authorized read-only study of both repositories and live apps, planning, reference files, and visual asset creation. No repository edits, commits, pushes, deployments, or merge actions are authorized for this assistant. Claude owns future implementation. Two forthcoming final handoffs must be reconciled before freezing recovery baselines. This document is a working source, not a completed release handoff or source backup.

## Locked product direction
- Product name: MUTAGEN. Slogan: Mutate The Gathering.
- Commander Companion becomes the primary MUTAGEN destination; Deck Companion becomes its featured deck-building capability.
- Commander’s Deck Builder entry must open the integrated deck capability. Add a clear return to the primary app.
- One unified profile; decks saved on the deck side appear for the player on the game side.
- Preserve Commander’s functionality and overall layout while replacing visual presentation.
- Lime green, purple, silver and black. Futuristic industrial; controlled luminous accents, no spilled ooze or goofy styling.
- Present design alternatives before final production. Approved masters must become the delivered assets without approximate regeneration.
- Fixed-label buttons must be supplied pre-labeled. Transparent backgrounds, accurate edge trimming and consistent styling are mandatory.
- Replace product-brand references to the former app names and rename upgrade features to mutation terminology. Do not blindly alter official card names, card rules, game mechanics, or official bracket labels.

## Current observed state
Direct live browser inspection on October 11, 2026:

| App | Live URL | Visible version | Evidence limits |
|---|---|---|---|
| Commander Companion | https://maxfhurt.github.io/CommanderCompanion/ | V0.8 KC | Display label only; not a verified repository commit or final handoff |
| Deck Companion | https://maxfhurt.github.io/Deck-Companion/ | Build 80 | Display label only; card data was still downloading |

Repositories identified: MaxFHurt/CommanderCompanion and MaxFHurt/Deck-Companion. No repository modifications performed. No current repository snapshot has yet been archived. October 4 Commander handoff is historical reference only.

The initial browser failure was resolved on retry. Both apps are accessible. Inspection used a desktop browser viewport, approximately 1363 × 936; it is not iPhone/iPad device validation.

## Screens and functions inspected
| Surface | Evidence | Asset implications |
|---|---|---|
| Commander landing | Visually inspected; Start Game, Profile, Deck Builder, Settings, Help; Continue initially appeared in accessibility state but was absent on later fresh landing | Primary logo, slogan lockup, hero buttons, utility buttons, outer frame, version placement, disabled/absent resume state |
| Mode selection | Visually inspected; Fully Guided, Freeplay, Table Tracker | Three coordinated labeled feature tiles, header divider, back control |
| Guided player setup | Controls inspected; Player 1/2 tabs, add player, name, saved deck, precon, view deck, cancel/continue | Player tabs, selected tab, add/remove controls, deck-selector frame, input states, validation dialog |
| Commander profile | Visually inspected; avatar/upload, player name, table defaults, games/wins/win rate, most played deck, achievements, load/save | Unified profile panels, avatar frame and placeholder, achievement states, compact controls |
| Commander deck editor | Visually inspected; separate legacy editor still opens from Deck Builder | Integration replacement point; preserve legacy deck import/migration requirements, not a second competing editor |
| Table Tracker rules/device setup | Controls inspected; rule toggles, starting life, mulligan, house rules, single-device, proceed/cancel | Switches, numeric field, select menu, house-rule badge, shared setup overlay |
| Table Tracker table | Visually inspected with default two-player table; life/tax/energy, mana icons, tracked counters, status, judge, log, utility controls | Player frames, active state, counter controls, readable compact toolbar, game-log frame, judge button, footer controls |
| Table Tracker counter dialog | Controls inspected; energy, experience, rad, luck, wish, custom counter | Counter symbols, selection controls, custom input and confirm/cancel |
| Deck landing | Visually inspected; Builder, Decks, Card Search, Profile and Backups, onboarding copy | Secondary feature lockup, three feature entries, shared shell, refreshed explanatory copy |
| Deck builder menu | Visually inspected; generate from commander/cards, precon, text import, empty Commander/Standard | Six feature controls; consistent compact and large variants |
| Commander generation dialog | Controls inspected; commander search and Standard theme suggestions | Search/modal frame, result rows, generate button, format labels |
| Deck profile | Visually inspected; local profile name, saved decks, backup/restore/auto-backup, card database update/import | Shared profile integration, backup status, file controls, progress and error states |
| Existing sample deck workspace | Controls inspected; build settings, commander, mechanic priorities, filters, colors, locks, Theme First, generation; decklist/upgrades/buy list/library tabs | Compact tabs, mechanic chips, priority arrows, lock states, format toggles, card rows and filters |
| Upgrade workspace | Visually inspected; build statistics, health, bracket meter, tier summaries; detailed mutation-row controls read | Mutation tier markers, progress meter, stats panels, filter chips, apply-all, swap, alternatives, exclusion and ownership controls |

The sample Lathril deck was already present in the browser session. It was opened, not generated or manually edited. Table Tracker was entered with default setup for inspection; no life/counter edits or profile saves were made. Normal app initialization downloaded card data and may maintain local session state.

Coverage expanded in checkpoint 004 below. Still unverified: populated combat/stack/target-resolution states, camera permission/capture, all failure states, 3–6-player layouts and physical iPhone/iPad behavior. Exact production quantities and dimensions await the incoming directive and approved masters.

## Findings affecting design and integration
1. Commander has heavy chrome image buttons; Deck has compact text controls and fantasy scenery. Retain an industrial family resemblance but provide separate large and compact masters.
2. Commander’s table header visibly combines artwork and overlaid labels in a crowded area at this viewport. Branding, navigation and dynamic labels need independent layout regions.
3. The legacy deck editor’s footer showed cramped validation copy beside action buttons. New assets must reserve usable content space rather than add thicker borders.
4. Both apps expose different profile features. Unification must preserve Commander stats/defaults/achievements and Deck’s saved decks, aims, locks and backups.
5. Deck results were explicitly marked provisional while card data downloaded. This inspection does not establish recommendation quality or final numeric outputs.
6. “Upgraded” also occurs in a Commander bracket display. Preserve official terminology in rules/bracket contexts; brand-renaming is semantic, not a global string substitution.

## Provisional asset families
| Family | Required deliverables |
|---|---|
| Identity | MUTAGEN primary emblem/wordmark; secondary deck-feature lockup sharing the exact master; slogan; compact header mark; app-icon treatment |
| Navigation | Home/Back/Close; Start/Continue; deck feature; Profile/Settings/Help; Builder/Decks/Card Search; explicit Return to MUTAGEN |
| Feature tiles | Fully Guided, Freeplay, Table Tracker; six deck creation entry types |
| Actions | Confirm/Cancel/Proceed/Save/Load/Import/Export/Search/View/Add/Remove; Generate/Analyze; mutation apply/swap/alternatives/exclude/ownership controls |
| Structure | Outer shell, header/footer rails, modal frame, section frame, player frame, card-detail frame, list row and empty-state panels |
| State | Default/pressed/selected/disabled/focus; loading/progress; success/warning/error; lock/unlock; active-player highlight |
| Game controls | Life and counter increments, mana/zone symbols, phase/combat controls and judge/log tools after remaining gameplay inspection |
| Mutation system | Budget Mutation, Mid Tier Mutation, Apex Mutation labels, tier progression, applied/available/unavailable states |
| Profile | Avatar frame/placeholder/upload, achievements, stats, most-played deck, saved decks, backup/restore status |

Dynamic names, prices, counts, card text and user content must remain live text. Pre-labeled assets cover fixed labels; accessible button names must match their visible labels. Color cannot be the only status indicator.

## Asset approval and fidelity contract
### Clean app presentation — user clarification, October 11
- APP-WIDE ACCEPTANCE GATE: This requirement applies to everything, not just the footer. Every app-owned visible surface must be intentionally designed for MUTAGEN. No blank/default HTML styling, generic unstyled boxes or unfinished fallback controls may appear anywhere in either integrated feature.
- Audit every screen and state: landing, navigation, headers, footers, game tables, deck workspaces, profiles, settings, help, search/results, lists, forms, dialogs, tooltips, notifications, validation messages, loading, empty, error, selected and disabled states. All must share the approved visual language and appropriate device-specific composition. A styled shell around unstyled content fails acceptance.
- Every visible surface must look like a finished application, with coherent MUTAGEN styling. No unstyled HTML controls, generic browser-default boxes, or disconnected page-like formatting in the app surface.
- When a footer is visible, the entire footer must be a purpose-designed MUTAGEN overlay. Explicitly prohibited: a black rectangular box with themed buttons placed inside it. Its silhouette, transparent negative space, framing, accents and controls must form one coherent app-specific composition.
- Hide generic HTML box appearances throughout the interface. Create a distinct visual flow connecting header, content, dialogs and footer; do not present a conventional webpage with decorated controls pasted on top.
- Deliver dedicated iPhone and iPad asset sets and approved landscape compositions for each. Do not stretch a phone overlay to fill a tablet or distort artwork to fit any viewport. Preserve aspect ratios, border thickness, typography and card proportions. Use deliberate device-specific composition and suitable export resolutions, with transparent backgrounds for overlay assets.
- Each screen-to-asset mapping must identify its iPhone and iPad variants, intended display bounds, alignment and safe-area rules. Validate the complete composition separately on both device classes; desktop inspection is not acceptance evidence.
- Theme headers, footers, input fields, selects, tabs, switches, dialogs, list rows, loading/error states, empty states and app-controlled scrollbars consistently. File upload triggers must use the same presentation; operating-system file pickers remain system UI.
- Maintain clean hierarchy and readable content. Decorative borders and glow must not crowd labels, overlap live text, or diminish the usable table/deck area.
- Footer layouts need explicit safe-area padding, button alignment and reserved content clearance at each target device proportion. No covered content, stretched labels, orphaned controls or duplicate footers.
- Include a footer-overlay sample in the design options and approve its container, buttons and interaction states together. Claude must implement the whole approved composition using the supplied assets and styling contract.
- This is a presentation requirement, not a ban on semantic HTML: retain accessible live controls and labels beneath the themed appearance.

1. Present distinct visual directions using the same representative content: logo, hero button, compact control, panel, player tile, mutation tiers.
2. After direction approval, create and approve production masters. Compose final mockups from those exact masters; never regenerate approved art to approximate it.
3. Freeze approved source bytes and assign asset IDs. Record filenames, dimensions, alpha bounds, alignment baseline, internal padding, intended display sizes, and SHA-256 hashes.
4. Supply transparent exports with clean alpha edges. Preserve intentional glow within declared padding; do not crop by eye or flatten onto a sample background.
5. Provide fixed-state exports, clear-space guidance, device layout examples and a screen-to-asset mapping. Variable frames need explicit scaling rules that protect corners and border widths.
6. Verify on light/dark/checkerboard backgrounds, at actual phone/tablet sizes, for clipping, text accuracy, halos, inconsistent margins and stretched typography.
7. Claude uses supplied files exactly. Missing assets are reported, not improvised. Screenshots of the implementation are compared against approved compositions.

## Proposed organized handoff structure
00-START-HERE: index, authority, instructions for Claude.
01-ORIGINAL-HANDOFFS: both incoming packages unchanged with received dates and hashes.
02-PRE-MERGE-BASELINES: separate source archives, commit/build/deployment IDs, asset inventories, dependency/config notes, recovery instructions. Never include secrets.
03-ROLLING-STATUS: current state, dated observations, known issues, decisions, tested/untested coverage.
04-RULES-AND-MECHANICS: dated official-rules source register and permitted source copies; mechanic reference with rule citations; separate informal deck-strategy glossary.
05-INTEGRATION: route map, profile/deck contracts, migration and rollback plan.
06-DESIGN: options, approved masters, typography/palette/spacing, device examples.
07-ASSETS: identity, navigation, buttons, frames, gameplay, mutations, profiles, states; manifest and checksums.
08-CLAUDE-ROADMAP: phases, dependencies, acceptance gates, complete implementation prompt.
09-VALIDATION: visual comparisons, migration fixtures, gameplay regression checklist, release checklist.
99-ARCHIVE: superseded plans and approved historical checkpoints.

This is the proposed filing structure, not a claim that all folders/files already exist.

## Roadmap for Claude — draft dependency order
### 0. Freeze and preserve
Receive both final handoffs. Record exact source commits and deployed versions separately. Archive each app independently with checksums; include existing assets and dependency locks. Export representative profiles/decks and document schemas. Prove each baseline can be restored separately before merging. Current inspection labels are not recovery snapshots.
### 1. Finish reference audit
Complete remaining screen/state coverage. Inventory all fixed labels and old-brand occurrences in UI, image text, titles, manifests, icons, help, exports, backup filenames and accessibility labels. Fetch current official rules and construct a cited mechanics catalog; distinguish keyword abilities/actions, general rules concepts and informal deck strategies.
### 2. Approve MUTAGEN design
Select visual direction, then approve exact reusable masters and device compositions. Confirm secondary feature name and navigation wording through the samples. Produce all state variants, asset manifest and checksums. No final production assets are approved yet.
### 3. Define shared data and navigation
Specify stable profile IDs, deck IDs and versioned schemas. Preserve commander identities, format, full card lists/quantities, printings, aims, locks, exclusions and relevant ownership/buy-list state. Preserve stats, achievements, avatars and table defaults. Design conflict handling and reversible migration. Select repository topology only after inspecting final architecture; one app experience does not require one repository.
### 4. Connect feature routes
Make Commander’s Deck Builder entry open the integrated deck feature. Provide return navigation and preserved caller context, including a safe return to player setup. Shared saved Commander decks must populate player selectors. Keep Standard support in the deck feature; validate game-format suitability before selection into Commander play. Do not lose unsaved work or mutate an in-progress game deck when a library deck changes.
### 5. Apply shared presentation
Use one shell/theme contract and approved asset files across both halves. Preserve game logic while applying screen-scoped presentation changes. Use readable compact variants for dense controls. Reconcile safe areas, viewport ratios, scrolling and keyboard behavior on target devices. Preserve card aspect ratios and usable hit areas.
### 6. Terminology and migration validation
Replace brand text and upgrade feature wording with approved MUTAGEN/mutation labels. Retain necessary compatibility readers for old backups/storage. Do not rename rules/card identifiers indiscriminately. Test new and old profiles, duplicate deck names, failed imports, reloads, browser back, offline/data-loading states, and migration rollback.
### 7. Release gates
Run retained gameplay regression tests, representative deck flows and end-to-end shared-profile/deck selection tests. Visually verify approved compositions on actual iPhone Safari/iPad targets. Verify icons, manifests, caches and displayed build version. Archive the merged release separately without overwriting either pre-merge baseline.

## Rolling checkpoint
Completed: live access verified for both; first visual/function inventory; merge touchpoints identified; initial asset and roadmap requirements recorded.
Pending: final handoffs and recovery snapshots; remaining screens; repository reference audit; official rules/mechanics sources; visual sample options; design approval; production assets; final Claude package.

## Expanded live inspection — checkpoint 004
The forthcoming handoff will determine the current design directive. Existing artwork is reference only. No production art was created and neither repository was modified.

### Additional Commander coverage
| Surface | Observed result | Asset implications |
|---|---|---|
| Incomplete Guided setup | Missing names/commanders/decks listed; acknowledging returned to landing in this session | Field errors, validation summary; Claude should verify unexpected navigation |
| Guided precon selection | 206 decks loaded; searchable rows, commander image, full card list and loading selection | Catalog rows, thumbnails, selected/loading states and action rail |
| Valid Guided setup | Two temporary Visual Audit players using Calling All Angels / Giada; validation passed 100 cards each | Validation pass/fail and progress overlay |
| Opening hands | Seven cards per player; Mulligan, Customize, Confirm & Next / Start Game; custom checkbox list opened and canceled | Hand tray, selection frames, count, mulligan controls and next-player footer |
| Guided game entry | Started successfully; controls read for commander tax, life, mana, zones, hand 7/library 92, opponent, phase, log/stack and undo | Populated player/card frames and counters; not a complete combat test |
| Freeplay | Default two-player game, hand tracking off; advanced Untap to Upkeep after choosing Don't Skip Phases | Empty/untracked states, active phase, contextual actions and skipping dialog |
| Card ID | Visually inspected search/category, Camera/Scanner entry, Basic Lands switch and close | Search/filter controls and scanner entry; capture not exercised |
| Game chat | Empty transcript, message field, Send and Close inspected; nothing sent | Transcript surface, input, empty state and send control |
| Game settings | Save Game, Undo, Rule Modifications, Home, Tabletop View, Concede, End Game and phase direction inspected | Compact action grid, direction callout and confirmation states |
| Game history | One phase event and Undo Last Step visually inspected | Timeline/event rows and footer overlay; existing undo artwork stretches across desktop width |
| Help / Player Rescue | Strategy Advisor, Available Actions, Current Direction, Quick Legend and Rules Rescue inspected | Long-form reference overlay, section hierarchy, legal-action rows and scrolling |

Help identifies the public zones as Graveyard, Exile, Tokens and Attachments; individual zone dialogs were not opened in this pass. Game zone buttons expose only numeric counts in the inspected accessibility tree; the next-phase button also lacked a useful accessible name. Claude must give these controls meaningful names.

### Additional Deck coverage
| Surface | Observed result | Asset implications |
|---|---|---|
| Recommendations | Stats, health, bracket/curve, tier path, paired removal/addition cards, reasons, apply-all, swap, alternatives, exclusion and ownership | Tier emblems, progress, paired rows, badges and compact actions |
| Buy list | Grouped replacements, colors, quantities, set/rarity, tiers/prices; Copy as Text and Save Text File | List rows, dividers, quantity/price columns and export actions |
| Collection | Empty library; owned-card search, paste list, set search/add and deck actions | Empty state, collection rows, import/search forms and owned markers |
| Card detail | Lathril portrait, printing carousel, price/legal/identity/P-T/rank/role/source, Buy List and Make Commander | Detail overlay, printing selection, portrait frame, badges and footer |
| Card search | Card grid with prices/badges; name/type/rules, printing, format, color, type, price and mechanics filters | Filter panel, results, loading and empty states |
| Text import | File chooser, format, deck name, multiline list and Import as New Deck; closed without importing | The native gray Choose File trigger needs themed presentation; text area and validation |
| Generate from cards | Search, Paste List Instead and initial empty state inspected; no generation | Selected-card tray, paste overlay and search/generate actions |
| Precon load | Initially 16 fallback decks with warning; subsequently 176 loaded, 50 displayed | Transient warning/loading, catalog rows, colors/difficulty/set/year and Load |
| Commander generation | Giada options: Best Overall, Theme First, Focus Mechanics; Apex/Mid/Budget, sets and owned-only disabled due empty collection | Mode/tier options, mechanics, disabled explanation and Generate |

Database eventually reported 32,115 cards. The existing sample deck was viewed without applying mutations, altering ownership, importing or generating decks. Scores changed while downloading; recommendation quality was not validated.

### Baseline screen-to-asset checklist
This is a functional inventory, not a frozen export count. Each family needs iPhone/iPad composition mapping, fixed-label review and applicable default/pressed/selected/disabled/focus/loading/error states.

1. Identity: primary MUTAGEN lockup, secondary deck-feature lockup, slogan, compact mark and icon/splash treatment.
2. Shared shell: background, header, navigation, content framing and complete footer overlays with safe-area clearance.
3. Entry screens: start/resume, three game-mode tiles, six deck-creation entries and feature navigation.
4. Setup: player tabs, add/remove, profile/deck/commander selectors, rules, device setup, validation and opening hands.
5. Table: active/opponent frames, commander portraits/tax, life/status, mana, battlefield/land/hand trays, zones, counters, phase/context actions, log/stack and undo.
6. Game overlays: card ID/scanner entry, chat, help/advisor, settings/rules, history, zones and confirmation states.
7. Deck workspace: card rows, commander, format/color/mechanics/filters/locks, tabs and stats/curve/bracket panels.
8. Mutations: Budget/Mid Tier/Apex, progression, swap pairs, reasons, apply-all/alternatives/exclusion/ownership and results.
9. Catalog/search/detail: precon rows, card grid, filters, printing carousel, card portrait/detail and source/actions.
10. Collection/buy list: ownership, quantities, dividers, prices/status, import/export and empty states.
11. Unified profile: avatar/upload, defaults, saved decks, stats, achievements, backup/restore/database status.
12. Common controls: labeled actions, inputs, selects, switches, checkboxes, chips, tooltips, scrolling, toast/confirmation/validation/loading/empty/error states.

### Concrete issues for Claude
- Separate crowded game-header artwork, navigation hit areas and live labels.
- Replace oversized blank dialog regions with intentional device-specific compositions.
- Card ID Search differs from neighboring chrome controls; Deck import exposes a native file-upload trigger.
- Game history stretches its footer-button artwork; provide exact-size variants and explicit scaling rules.
- Chat transcript and ordinary form panels need the full themed surface treatment.
- Opening-hand cards appear small at the desktop viewport; define useful card and tap sizes per device.
- Brand references remain in titles, landing identity/tagline, help prose and upgrade labels. Source/image/export/manifest audit remains pending; this is not an exhaustive rename audit.

### Incoming handoff reconciliation
Preserve the handoff unchanged. Map approved screens/masters to these twelve families, resolve feature names and fixed wording, confirm device orientations and dimensions, identify missing states, then freeze the approved masters. Derive transparent exports from those exact files and produce manifest/checksums and Claude instructions. No approximate recreation of approved artwork.

Status: broad live visual/function inventory collected for both apps. Not exhaustive gameplay QA or device acceptance. Awaiting incoming directive to finalize production assets. Recovery archives, source-commit audit and official rules/mechanics references remain outstanding.

### Individual-screen checkpoint LC01
- File: screens/LC01-landing-low-contrast-proposed.png
- SHA-256: e4b5b52b4a3244947179ee837e5d4118d24f9fcd2c10d6b4b1770410d2a88e80
- Status: PROPOSED; static only; not user-approved, implemented or device-tested.
- Review: Low-contrast variant of original01; original preserved. Generated before user pause. NOT approved. Batch PAUSED at user request. Geometry/logo fidelity not pixel-validated; retain canonical originals. Static only.

### Green-only checkpoint G01
- File: screens/G01-landing-green-only.png
- SHA256: 674d8c61c8d67d8da45ce74e742d436fdd7dd2482f7a3e40cec643eb04aae805
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G01B
- File: screens/G01B-landing-green-midpoint.png
- SHA256: b572d7056557df5b578a371cc69cdd571358b3f82c26ba259918977f091f923e
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G02
- File: screens/G02-card-details-green-midpoint.png
- SHA256: 193711575d31e7dcd4ed5a1f2caf17b2f40bd4c63b30e6d27855823cdaf45e25
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G03
- File: screens/G03-confirmation-green-midpoint.png
- SHA256: 589e84470df5c813034e134c996aae1b1adaee2403703de8733adc4650a2823e
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G04
- File: screens/G04-deck-mutator-home-green-midpoint.png
- SHA256: 12389bb2211065959ea3ec44e1a41bc1b73b1a2be0091c229c70872b23208ac1
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G05
- File: screens/G05-creation-menu-green-midpoint.png
- SHA256: d55986c7ccff7cd1b307a369af4f2c854eb23aa5d7269523a2235603541ba81e
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G06
- File: screens/G06-commander-generation-green-midpoint.png
- SHA256: a74ec16b0dbefb605c6e4fe383ac36097bce6a4bf5a2b4f5bddcd1109b85241e
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G07
- File: screens/G07-decks-you-can-build-green-midpoint.png
- SHA256: 629ac6f5831cb121f8e0a321f69acb0a0d6cd58d4135628c24efbe25adcd21ce
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G08
- File: screens/G08-generate-from-cards-green-midpoint.png
- SHA256: cfd53a33979f973ccf02ef42a5e579599e9001fc2aef1e98ab2a3da23b372739
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Green-only checkpoint G09
- File: screens/G09-precon-catalog-green-midpoint.png
- SHA256: 213d82ab0fb78156851c13e70763b2465ce72dc958261534d90842a08694b2e1
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint S01
- File: screens/S01-landing-sparse-containment-proposed.png
- SHA256: 9b5dc5032d7997096e39ec670abb083a40e5d5498d4cf2089404c0714eef47c5
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R01
- File: screens/R01-landing-master-buttons.png
- SHA256: 3fce21492f7b1db79f29b97894adb994847e1b2b2203763f72dfd2194a0aa817
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R02
- File: screens/R02-card-details-master-buttons.png
- SHA256: 1779d233c2f55303934f689ae55bcfa873d6d31de37fb90ea58fe4c49b5ff206
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R03
- File: screens/R03-confirmation-master-buttons.png
- SHA256: 144fe53e7e22a4448e35274c00a6c84efcf71c9e6944030624d77e9d78730ba6
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R04
- File: screens/R04-deck-mutator-home-master-buttons.png
- SHA256: 54bb8ac4096ef6b747fb6c1fb906514aeca2b92a7ff2b41bc499077927011420
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R05
- File: screens/R05-flow-circuit-landing.png
- SHA256: 6f6d4ee7b8a3cda7027a5ad5d26c38710320f92f243c8085dabad62d4f2514f4
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R06
- File: screens/R06-steel-columns-landing.png
- SHA256: d7e55270eb4f6d80b63119cb58476152469ff368e496c46ce194e74ee89a3104
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R07
- File: screens/R07-long-sight-glass-dark-steel.png
- SHA256: 189c7d90407e73a1de3eea06be2f8ef176a5c650f809908dc4ae52a8fb6ba561
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

### Visual checkpoint R08
- File: screens/R08-smooth-ooze-steel-top.png
- SHA256: fde0af2d454e63dc227490f1bf0ec6e90656cbf86359c2c04595c8ab8e573385
- Status: delivered static proposal, not final approved, coded or device tested. Original preserved.

## Delivered visual proposals

02-Game-Mode-Proposed.png, 03-Deck-Mutator-Home-Proposed.png and 04-Card-Details-Popup-Proposed.png are separate generated static visual proposals, not yet user-approved. Source is the approved landing. Generated artwork is not proof of pixel-exact button/logo reuse or engineering geometry. Preserve canonical source assets for controlled production assembly. Popup card back is illustrative, not a Sol Ring printing. Price/printing/face fields and detailed information must remain available in final functional popup. Dedicated device layouts, extracted transparent layers, and animation remain pending for these new images. Hashes: IMAGE-HASHES.json. Package: MUTAGEN-Visual-Masters-Set-01.zip.
