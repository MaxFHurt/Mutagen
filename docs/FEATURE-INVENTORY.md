# MUTAGEN feature inventory: every control each screen must keep

Read from the app's code (2026-10-26). Owner: **all features stay**. A screen design or kit that leaves any of these
out, merges them away or hides them is incomplete and goes back to ChatGPT. Items in *(brackets)* appear only in some
situations, and the art must still allow for them.

## Home
New Game · *(Continue: inactive look when there is no saved game)* · Deck Mutator · Profile · Settings · Help ·
version line.

## Choose Game Mode
Fully Guided · Freeplay · Table Tracker, each with its sub-line · Back · Profile · Settings · Help.
Pop-ups:
- Guided / Free Play: One device · Host a room · Host device · Join a room.
- Table Tracker: One device · Host a table · Host device · Join a table.
- Host device: player count 2–6.

## Player Setup (approved proposal, with corrections)
- Two titles: Guided Play and Free Play.
- Player tabs for up to 6 players, each with its colour and deck status ("✓ deck name" / "Needs a deck").
- Add Player *(hosting: "Add player on this device")* · *(Remove Player: when above the minimum)*.
- Player name · deck box (display: "No deck chosen" / deck name and card count).
- Saved Decks · Precon Catalog · Paste List · *(View Deck: once a deck is chosen)*.
- Commander · Partner / Background (optional).
- Advice on/off with its explanation · Playmat choice (the player's own playmats).
- *(Hosting box: players joining from other devices, − / +)*.
- Mode note · Back · Deck Mutator · Continue *(or Open Room when hosting)*.
- Pop-ups after Continue: deck checks · confirm players · choose rules and first player.

## Lobby (hosting a room)
Room code and joined players · Kick a player · Start · Back · *(rules being agreed: Cancel)*.

## Join a room
Room code entry · Join · Watch · Back.

## The game (battlefield)
- Every player: commander and partner portrait · life · library · graveyard · exile (each player's own) ·
  battlefield · lands · counters and status.
- Your hand and opening hand (mulligan) · play / open a card · discard.
- Phase and phase info · Next Phase · End Turn · Pass · the smart action (with legal and not-legal states).
- Combat: Attack · Blocks.
- Stack · decisions and votes · Undo · log · Sort · full-table view · Reverse view · Screen view.
- Opponent summaries and player info · Commander damage / commander actions.
- Card ID (scan) · Chat · Coach / tips · Help · Settings · Profile · Home.
- Corrections and proposals · Challenge · *(host only: Tools, Table)* · Curtain (pass the device) · Complete game.

## Table Tracker setup
Players (Add · Remove · playmat) · Start · Back.

## Table Tracker
- Each player: life (± and life editor) · counters (add, remove, custom) · poison · commander damage and tax ·
  mana · status · tracked cards (add, remove, card counters) · eliminate.
- Next Turn · set active player · Undo · log (clear) · stats · reset.
- Card ID · Judge · devices · menu · Reverse · Screen · Profile · Home.

## Join a table
Table code entry · Join · Back.

## Profile
Player name and avatar · stats · most-played deck · achievements · history · playmats · usual table (players,
preferred decks, table rules) · Deck Mutator summary and button · save profile backup · load profile backup · Back.

## Settings (pop-up)
Guidance level (Coach / Assist / Rules only) · Learning tips · Still liquid · Softer green · version.

## Help / Judge (pop-up)
Rules help and judge questions.

## Deck Mutator (its own app; features owned by Deck Companion)
- Home: Builder, Decks (count), Card search tiles · Buy list · Library · Profile and backups · continue strip · guide.
- Top navigation: Decks · Builder · Card search · Buy list · Library · Profile · Return to MUTAGEN.
- Decks: saved deck tiles · New deck.
- Builder: generate from a commander · load a precon · import a list · start empty.
- Deck page:
  - Build pane: name, player / folder / tags, format, commander (View, Change, Find a commander), theme chips,
    mechanics in priority order, Best deck under $3 / $12, Regenerate upgrades, lock.
  - Action bar: All decks · Undo · Duplicate · Share link · Compare · History · Delete deck.
  - Tabs: Decklist · Build stats (stats only) · Mutations · Buy list · Library.
  - Mutations tab: status bar · You / Budget / Mid / Apex bar · Path to Apex · game and upgrade plans · add a card ·
    Fill open · Analyze this build · Lands helper · Best by job · Stick to the theme · View / Sort / Card type / Kind
    filters · upgrade sheets with Previous / Next · Apply all Budget / Mid tier / Apex mutations with the summary.
- Card search and card details (price, printings, faces, rules text) · Buy list · Library (collection) · Profile and
  backups.
Its layout still changes in Deck Companion (see `sync/DECK-SYNC-PLAN.md`); its art is a skin plus a few masters.
