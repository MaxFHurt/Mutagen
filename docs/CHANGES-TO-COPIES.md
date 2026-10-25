# Edits to the copied apps

Every change Mutagen makes to a file inside `commander/` or `deck/` is listed here, so updates
from CommanderCompanion and Deck-Companion can be merged without surprises. New files Mutagen
adds alongside the copies do not need listing.

| Date | File | Change | Why |
|---|---|---|---|
| 2026-10-25 | `commander/src/data/deck-store.js` | `listDecks` returns Deck Mutator's Commander decks (via `src/mutagen/bridge.js`) instead of this store's own decks | Deck Mutator owns all decks (owner, 2026-10-25) |
| 2026-10-25 | `commander/src/ui/screens/landing.js` | Deck Builder opens Deck Mutator (`../deck/`) instead of the old Deck Editor | MUT-01 |
| 2026-10-25 | `commander/src/main.js` | On start, reopen the screen recorded before leaving for Deck Mutator | MUT-01 return navigation |
| 2026-10-25 | `commander/src/ui/screens/player-setup.js` | Footer button "Deck Mutator"; leaving saves the seats so the return restores them | MUT-01 return to player setup |
| 2026-10-25 | `commander/src/ui/seat-form.js` | Empty saved-decks message says "Build one in Deck Mutator" | Old editor no longer reachable |
| 2026-10-25 | `commander/tests/flows_ui.py` | `deck_editor` test now checks Deck Builder → Deck Mutator and a Deck Mutator deck in player setup | Old editor no longer reachable |
| 2026-10-25 | `deck/index.html` | Loads `mutagen.js` (Return to MUTAGEN, shared name, game record on the profile page) | MUT-01, MUT-02 |
| 2026-10-25 | `commander/src/main.js` | On start, adopt Deck Mutator's pre-merge player name once if this side has none | MUT-02 one profile |
| 2026-10-25 | `commander/src/ui/screens/profile.js` | Stats show Deck Mutator's deck count; footer button "Deck Mutator" | MUT-02 one profile |
| 2026-10-25 | `commander/styles/app.css` | `.profile__stats` has 4 columns (was 3) | Room for the Decks stat |
| 2026-10-25 | `commander/src/ui/seat-form.js` | Saved-decks list shows a tablemate's decks as "<name>'s deck" | All decks, owner shown (owner, 2026-10-25) |
| 2026-10-25 | `commander/src/data/profile-backup.js` | Backup also carries Deck Mutator's profile (`deckMutator`) and restores it; file named `<player>-MUTAGEN-<date>.ccsave` | One backup for the whole profile |
| 2026-10-25 | `commander/index.html`, `manifest.webmanifest` | Title, home-screen name, boot error and manifest name/description say MUTAGEN | MUT-03 |
| 2026-10-25 | `commander/src/ui/settings-modal.js`, `ui/screens/landing.js` | Version lines say MUTAGEN | MUT-03 |
| 2026-10-25 | `commander/src/engine/state.js`, `data/store.js`, `data/playmats.js`, `data/profile-backup.js` | User-facing messages and the default playmat name say MUTAGEN; backup format key `commander-companion-profile` unchanged so old backups still load | MUT-03 |
| 2026-10-25 | `deck/index.html`, `manifest.json` | Title, home-screen name, header DECK MUTATOR, footer "MUTAGEN is unofficial Fan Content" | MUT-03 |
| 2026-10-25 | `deck/ui/deck.js`, `ui/views.js`, `ui/storage.js` | "Deck Companion" in UI sentences and the backup file type becomes Deck Mutator; storage keys (`dc.*`, IndexedDB `deck-companion`) unchanged | MUT-03 |
| 2026-10-25 | `deck/app.min.js` | Rebuilt with `sh tools/build.sh` from the edited sources (`engine.min.js` unchanged) | Bundles must match sources |
| 2026-10-25 | `deck/tools/tests/suite/ui-test.mjs` | UI-B116-01 expects the header "DECK MUTATOR" | MUT-03 |
| 2026-10-25 | `deck/ui/storage.js` | Combo data loads from `data/combos.json.gz` on this site instead of Deck-Companion's `card-data` branch | Owner: move the download; ships in the site, refreshed by `.github/workflows/combo-data.yml` via PR |
| 2026-10-25 | `deck/ui/base.js` | New `MUTATION_LABEL` (Budget Mutation / Mid Tier Mutation / Apex Mutation) | MUT-03, owner option (b): main labels only |
| 2026-10-25 | `deck/ui/views.js` | Tab "Upgrades" → "Mutations" | MUT-03 (b) |
| 2026-10-25 | `deck/ui/deck.js` | Tier chips on mutation rows, tier choice buttons (deck, generate dialogs) and "Apply All … Mutations" use `MUTATION_LABEL`; sentences unchanged | MUT-03 (b) |
| 2026-10-25 | `deck/ui/upgrades.js` | Comparison sheet columns: Your card / Budget / Mid tier / Apex | Handoff requirement 8 |
| 2026-10-25 | `deck/tools/tests/suite/ui-test.mjs` | Apply-all label check expects "Apply All (Budget\|Mid Tier\|Apex) Mutations" | MUT-03 (b) |
| 2026-10-25 | `commander/src/ui/screens/landing.js` | Home screen markup replaced with the MUTAGEN home (logo, tagline, six supplied buttons over live liquid, sight columns); same `data-act` handlers, Continue still enabled only with a saved game | Phase 2 home screen |
| 2026-10-25 | `commander/index.html` | Loads `../ui/liquid/liquid.css` and `../ui/home/home.css` | Phase 2 home screen |
| 2026-10-25 | `commander/tests/shots.py` | Test URL can be set with `CC_URL` (serve the repo root, use `/commander/index.html`) because the app now uses shared `../ui/` files | Tests reach shared assets |
| 2026-10-25 | `commander/src/ui/screens/landing.js` | Home chambers join one liquid stream (`stream`); left column flows down, right column up | Phase 2 home ooze circuit (rev 043) |
| 2026-10-25 | `commander/src/ui/screens/landing.js` | Home logo uses `ui/branding/logo-mutagen-v2.png` (owner adopted the new design) | Phase 2 logo (rev 048) |
| 2026-10-25 | `commander/src/ui/screens/mode-select.js` | Choose Game Mode in the MUTAGEN frame (sight columns, logo, mode cards, BACK / PROFILE / SETTINGS / HELP row); the same mode buttons and modals; PROFILE / SETTINGS / HELP added after the master | Phase 2 mode screen (rev 049) |
| 2026-10-25 | `commander/index.html` | Loads `../ui/mode/mode.css` | Phase 2 mode screen (rev 049) |
| 2026-10-25 | `commander/src/ui/screens/landing.js` | Live logo (`logo-v2` chamber); master-layout home preview behind `?layout=master` (master pipes, columns and slots from `ui/home/master-layout.js`) | Phase 2 home after the master (rev 052) |
| 2026-10-25 | `commander/src/ui/screens/mode-select.js` | Live logo (`logo-v2` chamber) | Phase 2 logo (rev 052) |
