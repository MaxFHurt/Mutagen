# MUTAGEN — status

Read this first when picking up the work. Keep it short and current.

## Where things stand (2026-10-25)

- **Phase 0 — baseline: done** on branch `phase-0-baseline`. Both apps copied in unchanged,
  tests run, handoff subset committed. Details: `BASELINE.md`.
- **Phase 1 — integrate: not started.** Waiting for the owner's go-ahead.
- Nothing is deployed. `main` holds only the initial README.

## Decisions (owner, 2026-10-25)

- Commander base: CommanderCompanion `rebuild/` (1.0.0-rebuild.29).
- Merge: copy both apps in, then integrate. Commander is the shell; Deck Mutator is a section of
  the same site (shared origin, so shared storage).
- Order: function first, then the visual layer, screen by screen as masters are approved.
- CommanderCompanion and Deck-Companion stay editable and may keep being developed (owner,
  2026-10-25; supersedes "frozen"). This build only reads them and never writes to them.
- Keep Mutagen easy to sync: add new files rather than editing the copied apps, keep edits to
  copied files small and listed in `CHANGES-TO-COPIES.md`, and record every sync in
  `BASELINE.md`. Sync = diff the source from its last synced commit and apply it to
  `commander/` (from `rebuild/`) or `deck/`.
- Engine/logic work fits best in the source repos; layout/visual work there gets harder to sync
  once Mutagen is reskinned.
- Work in bounded chunks; stop and report at each agreed stopping point.
- End every reply with a short summary and a restatement of any open questions (owner, 2026-10-25).

## Rules carried from the source handoffs

- Never push to `main` / ship a build without the owner's explicit yes.
- Do only what was asked; ask when a change goes beyond it.
- No feature loss (MUT-13, MUT-14, MUT-22). Reskin existing handlers; mockups are not specs.
- Locked art is used exactly as supplied (`handoff/locked-references/locked/`).
- On every accepted change, update `MUTAGEN-Working-Source.md` and
  `MUTAGEN-Visual-Change-Roadmap.md` in `docs/` (the received rev 027 copies stay in
  `handoff/current/`).

## Phase 1 plan (proposed)

1. One shell: Commander's Deck Builder opens Deck Mutator; Return to MUTAGEN keeps the caller
   (including player setup) and unsaved work (MUT-01).
2. Shared profile and versioned deck storage; Deck Mutator decks appear in player setup;
   migrate existing data from both apps with a recovery export; old backups still load (MUT-02).
3. Renaming by meaning, not find-and-replace: MUTAGEN / Deck Mutator, Budget / Mid Tier / Apex
   Mutation; keep card names, rules text, bracket labels and storage keys (MUT-03).
4. Resolve the source-repo dependencies listed in `BASELINE.md`.
5. Regression tests for each step, on current styling.
