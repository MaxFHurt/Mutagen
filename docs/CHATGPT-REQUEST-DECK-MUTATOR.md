# Message for ChatGPT: Deck Mutator screen designs (2026-10-28)

Copy everything below the line into ChatGPT.

---

The owner wants Deck Mutator finished as part of MUTAGEN. It works today (same profile, same installed app, Return to MUTAGEN) but none of its screens has MUTAGEN artwork yet; it still looks like Deck Companion. Please design Deck Mutator in the MUTAGEN style — the same steel, glass, green-ooze and dark-comic-alley look as the approved Home and Choose Game Mode, using the shared backdrop (ui/kits/shared/background-clean.webp) — and keep EVERY feature.

Important: Deck Mutator's code is still developed in the separate Deck Companion app and synced into MUTAGEN, so its layouts change over time. Design it as a SKIN (reusable framed pieces) plus a small number of screen masters, not as one fixed picture per screen. Lists, cards, numbers and text stay live.

## 1. Masters to propose (for owner approval), iPad 1180 × 755 and iPhone 844 × 390 landscape

1. **Deck Mutator home**: the three main tiles — BUILDER (start a new deck: generate from a commander, load a precon, import a list, or start empty), DECKS (saved decks, with count), CARD SEARCH — plus Buy list, Library, Profile and backups, the "continue where you left off" strip, and the three-step guide.
2. **Top navigation** (every screen): DECKS, BUILDER, CARD SEARCH, BUY LIST, LIBRARY, PROFILE, and RETURN TO MUTAGEN.
3. **Decks**: a grid of saved deck tiles (commander art, name, colours, tier) and a NEW DECK tile.
4. **Deck page** — the main screen — with:
   - the **Build pane** on the left: deck name, player / folder / tags, format, commander (VIEW, CHANGE, FIND A COMMANDER), theme chips, mechanics in priority order, the "Best deck with every card under $3 / $12" buttons, REGENERATE UPGRADES, and the lock;
   - the action bar: ALL DECKS, Undo, Duplicate, Share link, Compare, History, Delete deck;
   - the **tabs**: DECKLIST, BUILD STATS, MUTATIONS (upgrades), BUY LIST, LIBRARY;
   - the **Mutations tab**: the status bar (power, tier, price, bracket, swaps, health), the You / Budget / Mid / Apex progress bar, Path to Apex, game and upgrade plans, the add-a-card search, Fill open, Analyze this build, Lands helper, Best by job, Stick to the theme, View / Sort / Card type / Kind filters, the upgrade sheets (Your card / Budget / Mid tier / Apex, with Previous / Next), and APPLY ALL BUDGET / MID TIER / APEX MUTATIONS with the "all swaps together" summary;
   - **Build stats**: stats only (curve, colours, roles, health).
5. **Card search** and the **card details pop-up** (price, every printing, faces, rules text) — the proposed 04-Card-Details-Popup is a starting point.
6. **Buy list** and **Library** (collection).
7. **Profile and backups** (Deck Mutator's part of the shared MUTAGEN profile).

## 2. After approval: the Deck Mutator skin kit

Stretchable 9-slice frames with no words on them (text stays live), in the format in docs/KIT-CONTRACT.md, section 2 (the skin kit): button (+ pressed, disabled — disabled = empty clear glass, faint lettering), primary button, danger button, square button, panel, modal, option and option-on, tab and tab-on, input, plus Deck Mutator specifics:
- **nav-button** and **nav-button-on** (the top navigation);
- **tile** (home and deck tiles; frame only, art and text stay live);
- **chip** (theme and status chips);
- **progress-bar** track and fill (the You / Budget / Mid / Apex bar);
- **sheet** (one upgrade comparison column).

Give SKIN.json slice insets for each, and keep every file at high quality, under 300 KB each, with real alpha. Liquid-filled parts need a clear-glass overlay and an RG liquid mask, as before.

## Rules (unchanged)

- Every feature in docs/FEATURE-INVENTORY.md (Deck Mutator section) stays visible and usable.
- No still, painted bubbles in liquid areas: bubbles must come from MUTAGEN's live liquid.
- Clean edges with no backdrop colour; masks cover the liquid only.
- Test-open every file before packaging; give SHA256SUMS and an honest README.
