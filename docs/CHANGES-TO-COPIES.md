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
