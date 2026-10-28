# MUTAGEN V3 — Visual Change Roadmap — Revision 007 (2026-10-12)

## CURRENT REVISION 071 — No still bubbles: live ooze covers the painted liquid, 2026-10-28

Owner: there should be no bubbles that are permanent and do not move; several sat on the ooze tanks on the main screen. They are painted into ChatGPT's art (both the assembled images and the overlays). Code only, no image changes: kit liquid pieces now draw the live ooze fully over the painted liquid (`<mutagen-chamber cover edge="dark">`), so the only bubbles are moving ones; steel and lettering stay the kit's own. The cover ooze keeps the lighter, brighter, glowing look (a lime body, light from above and a glossy band inside the upper rim) at about the previous brightness. Because the masks are rough, small holes surrounded by liquid are filled, and depth is smoothed over the neighbourhood (dents around old bubbles, edge scraps); a faint trace remains around one bubble on the left tank. ChatGPT is asked for clean masks and bubble-free art. mutagen_flow 39/39, liquid 8/8 (repeat runs).


## CURRENT REVISION 070 — Dark alley backdrop and clean edges (ChatGPT Dark Alley R01), 2026-10-27

Installed ChatGPT's Dark Alley R01 delta. All 163 sums verified, all 155 images decode, every piece matches its LAYOUT rect, and the layouts are identical except for `background` (now `background-clean.webp`). The home and Choose Game Mode kits get the new comic dark-alley background (3344 × 1882 WebP, 591 KB; a 2× enlargement of a 1672 × 941 render, as ChatGPT discloses) and re-cut pieces with the old blue backdrop removed from their edges (141 installed files verified). The shared backdrop for every later screen is at `ui/kits/shared/background-clean.webp`. The code darkening stand-in (rev 068) is removed, so the art shows as supplied. Inactive buttons keep the empty-glass rule (ChatGPT: do not set `disabled_empty_glass`). The home screen now downloads 10.7 MB (was 18.9). Records are in `handoff/dark-alley-r01/`. mutagen_flow 39/39, liquid 8/8.


## CURRENT REVISION 069 — Restored revision 02 files installed (4 of 6), 2026-10-27

ChatGPT sent source-derived restorations of the six truncated revision 02 files; no intact originals exist. Verified: all six hashes match, every file fully decodes, and each damaged copy is an exact byte prefix of its restoration. Installed: home settings pressed, mode-select settings pressed, mode-select freeplay assembled (its clipped sub-line is the same as in the overlay already in use, so nothing doubles), and home deck-mutator disabled (stored only; the inactive look stays the empty-glass rule). With these, no kit file is broken. On hold, as ChatGPT also advises: the 2508 logo and mask. The verified 1254 logo stays, and the 2508 mask is not certified. The validation report and evidence are in `handoff/rev02-restoration/`. mutagen_flow 39/39.


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


## CURRENT REVISION 019 — 2026-10-18: Smooth liquid; remove top canisters

Remove both top-border glass canisters/windows; use opaque steel pipe, regular couplings and steel elbows. Preserve physical joint leak. User rejects carbonized-looking ooze: target smooth cohesive viscous gel, slow broad flowing swirls, sparse bubbles, no dense bead clusters or gritty/burned texture. Apply throughout liquid chambers including buttons; retain established green color target and no exterior color bleed. R08-smooth-ooze-steel-top.png is static review proposal, not approved production/animation. Original assets retained; no repository edits.

## CURRENT REVISION 018 — 2026-10-18: Sight-glass proportions and steel finish

User accepts R06 direction and requests wider, nearly full-height sight glasses in each steel column, with slightly darker realistic brushed steel. R07-long-sight-glass-dark-steel.png is new static review proposal. Approximate design targets: window 85% column height / 60% width, intact steel margins and fitted bezels; darker satin metal with fine machining grain and restrained highlights. Retain uniform tubing, regular couplings, opaque steel elbows, source button styling and flow/drip requirements. No implemented animation or repository edits. Preserve prior versions.

## CURRENT REVISION 017 — 2026-10-18: Steel columns and regular fittings

Update MUT-20: side reservoirs are opaque steel columns with small inset ooze sight windows. Reduce border green exposure; keep internal chambers full. Use opaque steel elbows and regular straight couplings joining uniform-diameter pipes. No reducers/tapers or random endpoints; matching flush ports at reservoirs. Retain visible liquid flow at windows and physical joint leaks without exterior green bleed. R06-steel-columns-landing.png is a static unapproved proposal. Exact diameter and supplied button asset reuse still require controlled production assembly. No repository changes or implemented animation.

## CURRENT REVISION 016 — 2026-10-18: MUT-20 flow and drip motion

Use constant-diameter pipes with matching elbows, tees, couplings and ports; no reducers/tapers or unexplained terminations. Vary canister bodies only. User requires visible mutagen travel through the connected network, including buttons, with full chambers and fixed master-style lettering. Leak at actual joint/seal: gather, elongate, detach, fall, impact directly below. Preserve medium green; no exterior color/light bleed.

Claude implementation: clip liquid/bubble motion inside pipes and chambers; use separate explicitly shaped leak masks. Maintain directional continuity through bends and ports and independent bubble phases. Keep lettering still and readable. Validate all connections and pipe diameters before motion assembly. R05-flow-circuit-landing is static only, not implemented animation: header/branch apparent diameters and exact source-button reuse still need correction in controlled assembly. R01–R04 rejected for plumbing; do not propagate them. Repositories remain read only.

## CURRENT REVISION 015 — 2026-10-17: MUT-19 master buttons and physical leaks

QA checkpoint: R01–R04 saved as unapproved composition drafts. Exact source-button reuse is not satisfied; some labels retain unwanted shadow/dark liquid, greens vary, R03 has excessive perimeter canisters. R05–R12 remain pending. Do not use these draft pixels as approved production buttons. Resolve through controlled assembly of source-master derivatives before extending this treatment to remaining pages.

User correction overrides Revision014 no-drip rule: retain physical ooze leaks/drips, remove exterior color bleed/bloom. Use fewer reservoirs of varied shapes/sizes, symmetry allowed, connected plausible plumbing. Fill all reservoirs and buttons with ooze; apply G01B medium spring green throughout.

Exact button source: assets/references/PLAY_BUTTON_MASTER_HORIZONTAL.jpeg. Do not replace its design; user rejected the flat-white PLAY example generated exec-a294b04d-515a-4353-b26e-264d5dd2afed.png. Match original silver/purple lettering as printed on glass with no added shadows, dark backing or empty liquid area. Production must use controlled labeled derivatives of the source asset. Generated page previews are only compositional references and cannot establish pixel-identical source reuse.

Claude: separate leak silhouettes/animation from light containment masks, keep all text readable over filled animated chambers, connect inlet/outlet fittings, validate gravity-aligned drips and varying reservoir sizes, and independently assemble iPhone/iPad views. No implementation here. R-series rebuild authorized, preserve old files and checkpoint each page; proposals await review and exact asset assembly.

## CURRENT REVISION 014 — 2026-10-17: MUT-18 sparse containment

Accepted direction, sample awaiting approval: substantially reduce border green to a few sealed canisters separated by silver/black structure. S01 landing trial uses four outer-frame canisters. Retain G01B green intensity and target unchanged purple, central logo geometry, content and functionality. Preserve all originals and variants. Stop propagation until user reviews S01.

For Claude later: clip liquid, bubbles and glow strictly within glass containment. No drips, splashes, runoff, outward bloom or exterior green spill lighting. This supersedes earlier continuous-green perimeter and drip/splash requirements, including Revision007 animation guidance. Opaque structural connections are allowed. Remove planned drop/splash animation; internal flow/bubbles remain possible. Keep smart-action control structurally integrated and its legal-action illumination contained. Test all animation frames, seams, corners and interactive states at independently designed iPhone/iPad proportions. Do not stretch assets. Preserve printed button-label readability and all app features. No repository edits, production asset approval, animation implementation or device validation performed.

## CURRENT REVISION 013 — 2026-10-17: Approved green midpoint; continue

G01B green treatment explicitly approved. Reference `screens/G01B-landing-green-midpoint.png`, SHA256 b572d7056557df5b578a371cc69cdd571358b3f82c26ba259918977f091f923e. Continue remaining original-page revisions with green-only edits, preserving all original images and non-green properties. Separate image-generation derivatives remain reviewable; no claim of pixel-exact invariance or implementation. Prior dimmed-purple approach is superseded.


## CURRENT REVISION 012 — 2026-10-17: Brighter green midpoint sample

G01 was judged too dark. User requested a slightly brighter midpoint with visual pop, still below original fluorescent lime. G01B adjusts green only; all non-green appearance and geometry remain invariants. Save as separate proposal; originals/earlier alternatives retained. Review G01B before propagating intensity to other pages. Not coded, animated or device-tested.


## CURRENT REVISION 011 — 2026-10-17: GREEN-ONLY corrections resumed

Latest explicit instruction: darker/deeper green liquid and green decorative accents ONLY. Keep purple, chrome, card artwork, text, layout, controls and overall lighting unchanged. This supersedes LC01 whole-scene dimming. Originals stay untouched. G01–G12 are new independent proposals, mapped to originals01–12; report actual saved paths/hashes below. MUT-17 appearance control must not globally darken the screen. Existing motion, profile persistence and accessibility requirements remain. No code implementation or device validation is implied. All unmade pages remain pending, outside this existing-screen correction batch.


## PAUSED — 2026-10-12, 19:17 EDT

User likes the designs but says they are too bright and explicitly requested stopping. Do not generate further variants/screens until resumed. Preserve originals and completed LC01 Landing (unapproved). LC02–LC11 remain pending; do not interpret earlier Settings style approval as final approval of other remakes. No implementation has occurred.


## CURRENT REVISION 010 — 2026-10-12: Approved low-contrast reference and non-destructive remake run

User approved screen 12 low-contrast styling and instructed remaking every screen with originals retained. Reference: `screens/12-settings-low-contrast-mode-proposed.png`, SHA256 549bfedb23c2bea427042e5e11df8247a8b726b1c9f70b71199314716b8b1729. Status: APPROVED STYLE REFERENCE; static only, not implementation or device approval. Preserve originals 01–12 and add LC01–LC11 as separate files/entries. Current remakes retain source layout/content and lower liquid glow/purple intensity to match screen12. All unmade screens follow the same approved treatment. Each derivative remains reviewable; do not claim pixel-perfect invariance from generation. MUT-17 global toggle, readable text, independent motion and persistent shared preference requirements remain. Default mode not decided. Record each new path/hash below and save before generating the next.


## REQUIRED shared-source protocol (binding across Work and GPT-6 chats)
**On EVERY accepted change to a visual, direction, UI behavior, animation, master or future Claude requirement: update this roadmap AND `MUTAGEN-Working-Source.md` during the SAME work cycle.** Record date, revision, what changed, what did not, state (proposed/approved/delivered/implemented/tested), dependency and test. Each chat must retrieve newest versions rather than assume chat files auto-sync. Reconcile conflicting revisions and never overwrite newer changes. If source-file overwrite is not approved or succeeds only locally, say "NOT SYNCED" until verified.

**File-evidence requirement:** A roadmap item marked DONE/DELIVERED must include its actual output file *inside the handoff package*, plus SHA256 and file path, not just a claim. An agreed direction, mockup, transparent asset and working animation are separate outcomes. Do not mark as complete if file absent. The attached assets and image bytes are unchanged.

## Visual and interaction lock
- Exact MUTAGEN logo: `assets/locked/MASTER_LOGO_DO_NOT_REGENERATE.jpeg`, SHA256 20b2e24979e7cbf939333277d72ced6934caf6e82d794e93587bbe90d44d1f73. Absolutely no logo geometry or chrome changes; *only* lime-green liquid within M may be carefully refined, after independent approval.
- Approved landing layout—logo size/position, wide uninterrupted top pipe, chassis, all button shells, texts, tools and framing—is pixel-locked except the specifically approved fluid changes. Do not add top-corner bottle props, rename buttons, move controls, invent decorations or shift pipe structure.
- Glass controls fully filled with realistic luminous lime-green ooze behind printed labels, never black hollow sections. No excessively bright liquid swirls, bronzed/purple metal, cloned/mirrored ooze patterns. Engineering may mirror; ooze bubbles, drips, streaks may not.
- Liquid within smart octagon never changes color. LEDs on the chrome perimeter may signal legal availability. Bubbles rise inside glass. Frame/chrome/text remain still. Bubble timing/position differs per section.
- Static final landing master must be approved BEFORE animation or splitting production assets. **Animation later belongs to the extracted border/glass/ooze layer**, not whole-page flattened background. The user explicitly requested that this layer decision be recorded in Claude handoff.

## Exact right upper pipe drip physics (Claude acceptance gate)
1. Pipe spans whole screen from left to right; there are no bottle-shaped structures in upper corners.
2. A small green droplet grows periodically below the right upper pipe seam; it detaches intermittently, not a constant stream.
3. It drops vertically directly to the chassis beneath its starting x-position. No offset mirrored/diagonal/sideways impact.
4. Small proportional splash **exactly under the drip**, then irregular thin ooze runoff DOWN the chassis front following surface geometry and gravity. Natural intervals and pauses.
5. Separate modest ooze streak at TOP of Help-frame and down HELP button face, avoiding covered lettering. Do not add uncontrolled spills elsewhere.
6. Realistic liquid appearance, nonuniform green tone and asymmetric rising bubble placement; no bright decorative swirl pattern.
7. Later animated transparent border layer demonstrates drop timing, impact, runoff and rising bubbles; reduced-motion state; static screenshot alone is not animation test.

## File-linked stage register
| ID | Item | Status | File IN THIS HANDOFF | Next action |
|---|---|---|---|---|
| VIS-001 | Immutable canonical MUTAGEN logo | APPROVED FILE | `assets/locked/MASTER_LOGO_DO_NOT_REGENERATE.jpeg` | Exactly fixed geometry; only liquid inside M potentially editable later |
| VIS-002 | Landing-page design baseline with wide top pipe | APPROVED BASELINE FILE | `assets/locked/LANDING_PAGE_APPROVED_BASELINE_2026-10-12.png` | Approved design/layout only; drip edit pending |
| VIS-003 | Latest realistic landing-ooze review | REVIEW FILE—DRIP NOT FINAL | `assets/references/LANDING_PAGE_CURRENT_REVIEW_DRIP_NOT_FINAL.png` | Correct upper-right drip landing position |
| VIS-004 | Final static landing master with corrected intermittent drip | PENDING | `NONE` | Controlled edit without layout/logo/border changes |
| VIS-005 | Border/glass ooze bubble/drip/splash/runoff animation | PENDING—AFTER ASSET EXTRACTION | `NONE` | Demonstrate realism; confirm transparent border animation layer |
| VIS-006 | Horizontal PLAY-style mutagen button reference | STYLE REFERENCE FILE | `assets/references/PLAY_BUTTON_MASTER_HORIZONTAL.jpeg` | Stainless/chrome shells; no black glass centers |
| VIS-007 | Octagonal green action canister reference | STYLE REFERENCE FILE | `assets/references/OCTAGON_CANISTER_CONTROL_REFERENCE.jpeg` | Green liquid hue fixed; only metal LEDs respond |
| VIS-008 | Deck Mutator visual direction | REFERENCE FILE | `assets/references/DECK_MUTATOR_VISUAL_REFERENCE.jpeg` | Cross-map existing functionality before finalizing |
| VIS-009 | Continuous battlefield border inspiration | PARTIAL REFERENCE FILE | `assets/references/BATTLEFIELD_CONTINUOUS_BORDER_REFERENCE.jpeg` | No extra random canisters or non-functional clutter |
| VIS-010 | Legacy Commander screenshots | FEATURE-AUDIT ONLY FILES | `assets/feature-audit-only/` | Never adopt old styling |
| VIS-011 | iPhone landscape final layout/layer assets | PENDING | `NONE` | Viewport fill and device verification |
| VIS-012 | iPad landscape final layout/layer assets | PENDING | `NONE` | Dedicated native layout, not stretched phone |
| VIS-013 | Complete production asset exports | PENDING | `NONE` | Transparent shells, states, masks, labels and SHA256 |
| VIS-014 | All-actions feature audit and regression tests | PENDING | `NONE` | Current source, live behavior and old UI controls |
| VIS-015 | Judge/Table and Deck Mutator fully detailed masters | PENDING | `NONE` | Separate screen review and no feature loss |

## Claimed-complete work rules
- Whenever an item changes to DONE, attach the final file to THIS package and update `ASSET_MANIFEST.json` with its SHA256, pixel dimensions or other pertinent specs, revision, and approval date. Verify each file exists before issuing handoff.
- If an image was merely generated but not expressly user-approved, label it "proposed"; if approved as style reference only, label it "approved reference," not complete build.
- When a change implies coding, append/update the canonical `MUT-01`..`MUT-16` change register in `MUTAGEN-Working-Source.md` and include expected checks, affected code component and whether it is implemented/tested. No modification is permission to write to either GitHub repository.

## Pickup procedure for Work mode
1. Retrieve latest rolling source, latest visual roadmap and package assets, check revisions/SHAs; if multiple conversations worked since last read, reconcile them before proceeding.
2. Open the **actual image files** from `assets/locked` and `assets/references`; do not freehand regenerate any locked asset.
3. Finalize the static landing drip picture with a controlled edit, compare against approved baseline for non-liquid drift, ask for user approval.
4. After approved static master, extract border, glass/ooze, label and button states as independent assets; THEN develop/test authentic animation on border glass/ooze layer. Record actual animation output file in roadmap.
5. Audit current game and Deck Mutator features to prevent feature loss. Keep both GitHub repos READ-ONLY until separate authorization.
6. Save and verify BOTH updated source docs and deliverable files at EVERY accepted design/requirements change. Do not promise automatic cross-chat synchronization.

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
