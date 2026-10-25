# MUTAGEN feature restoration review

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

