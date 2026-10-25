# Deck sync plan

How Deck Companion updates come into Mutagen's `deck/`, and what the next sync must check. Mutagen never edits the
Deck-Companion repository; it only reads a checkout of it.

## Procedure

1. On a branch (never `main`), with a clean tree: `sh tools/sync/sync-deck.sh /path/to/Deck-Companion-checkout`.
   - It commits the upstream version on its own first ("Sync Deck from <commit> (upstream, unchanged)"), keeping
     Mutagen's site-shipped `deck/data/combos.json.gz`.
   - It then re-applies `docs/sync/deck-mutagen.patch`, every Mutagen change to `deck/` (listed in
     `CHANGES-TO-COPIES.md`), with a three-way merge, and rebuilds the bundles.
   - A change that no longer fits stops the script with conflict markers. Resolve them by hand; never drop a Mutagen
     change silently.
2. Run the Deck suite (`BASELINE.md`, "Deck full UI suite") and `node tests/mutagen_flow.mjs`. Compare with the
   last results; the known pre-existing Deck issues are listed in `BASELINE.md`.
3. Record the new upstream commit in `BASELINE.md`'s sync log, refresh the patch (the script prints the command),
   and note the sync in the rolling docs.

Tested 2026-10-25 against a stand-in upstream: re-applying onto the original copy reproduced today's `deck/`
byte for byte, bundles included. A changed "Apply All" line stopped at a conflict in `deck/ui/deck.js`, with every
other change applied cleanly.

## Next sync: upgrades layout change (announced by the owner, 2026-10-25)

The owner is changing Deck Companion's deck page:

1. Path to Apex moves from Build Stats to the Upgrades tab, directly under the status bar.
2. Build Stats shows only stats. Game plans and upgrade plans move to the Upgrades tab.
3. APPLY ALL BUDGET / MID / APEX SWAPS move below the upgrade sheets and suggestions.
4. BEST DECK WITH EVERY CARD UNDER $3 / $12 move to the left Build pane.

Mutagen changes that sit exactly where this moves, and are expected to conflict:

| Mutagen change | File | What to keep after the move |
|---|---|---|
| "Apply All … Swaps" buttons use `MUTATION_LABEL` | `ui/deck.js` (5 places) | The buttons, wherever they now are, read "Apply All Budget / Mid Tier / Apex Mutations" |
| Comparison sheet columns | `ui/upgrades.js` | Columns read Your card / Budget / Mid tier / Apex |
| Tab "Upgrades" → "Mutations" | `ui/views.js` | The tab that now holds Path to Apex and the plans is still named Mutations |
| Apply-all label test | `tools/tests/suite/ui-test.mjs` | The test finds the buttons in their new place and expects the Mutation labels |
| `MUTATION_LABEL` constant | `ui/base.js` | Unchanged |

Unaffected, should apply cleanly: `index.html` / `manifest.json` names, `mutagen.js` (Return to MUTAGEN, shared name,
game record), the "Deck Companion" → Deck Mutator wording in `ui/deck.js`, `ui/views.js` and `ui/storage.js`, and the
combo-data location in `ui/storage.js`.

After this sync, check on the page (iPad and iPhone):

- Mutations tab: status bar, then Path to Apex, then game plans and upgrade plans, then the upgrade sheets and
  suggestions, then the three Apply All … Mutations buttons with the "All Apex swaps together" summary.
- Build Stats tab: stats only, with nothing missing that was there before apart from the moved items.
- Left Build pane: both "Best deck with every card under $3 / $12" buttons work.
- Return to MUTAGEN, the shared player name and the game record on the profile page still work.
- MUTAGEN's player setup still lists Deck Mutator decks with their owner (`tests/mutagen_flow.mjs`).
