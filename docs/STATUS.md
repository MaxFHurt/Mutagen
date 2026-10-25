# MUTAGEN — status

Read this first when picking up the work. Keep it short and current.

## Where things stand (2026-10-25)

- **Phase 0 — baseline: done.** Details: `BASELINE.md`.
- **Phase 1 — integrate: done**, merged to `main` (PR #1) and live at https://maxfhurt.github.io/Mutagen/.
  Deck Builder opens Deck Mutator with return to the caller; one profile across both sides; app
  names renamed; Deck Mutator's main tier labels are Mutations; combo data ships with the site.
  Every edit to the copied apps is in `CHANGES-TO-COPIES.md`.
- **Going live:** GitHub Pages from `main` (owner, 2026-10-25), repo made public. The root
  `index.html` forwards to `commander/`; `.nojekyll` serves every file as is.
- **Phase 2 — visual layer:** live liquid APPROVED (rev 036); button artwork delivered (rev 039); home screen live
  (rev 040). RESOLVE typo fixed (rev 041); home ooze runs as one stream (rev 043). Waiting on ChatGPT (`CHATGPT-REQUEST-2026-10-25b.md`): reworked logo liquid, and pipe/frame artwork for the home
  screen. Labels and artwork are never redrawn in code.
- **Then:** the visual layer, screen by screen as masters are approved. Deck Mutator's
  remaining "upgrade" sentences wait until Deck development settles (owner option b).

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
- Owner, rev 053: assets may be recreated where necessary. Prefer cutting them from an approved master (as `tools/home-buttons/extract.py` does) over drawing anything new.
- Locked art is used exactly as supplied (`handoff/locked-references/locked/`). The home logo is now ChatGPT's v2 design (`ui/branding/logo-mutagen-v2.png`, owner decision rev 048); the original locked logo stays unchanged as the record. Never rebuild or remake assets
  (labels, lettering, icons); missing assets are requested, not improvised (owner, 2026-10-25).
- On every accepted change, update `MUTAGEN-Working-Source.md` and
  `MUTAGEN-Visual-Change-Roadmap.md` in `docs/` (the received rev 027 copies stay in
  `handoff/current/`).

## Phase 1 plan (done)

1. One shell: Commander's Deck Builder opens Deck Mutator; Return to MUTAGEN keeps the caller
   (including player setup) and unsaved work (MUT-01).
2. Shared profile and versioned deck storage; Deck Mutator decks appear in player setup;
   migrate existing data from both apps with a recovery export; old backups still load (MUT-02).
3. Renaming by meaning, not find-and-replace: MUTAGEN / Deck Mutator, Budget / Mid Tier / Apex
   Mutation; keep card names, rules text, bracket labels and storage keys (MUT-03).
4. Resolve the source-repo dependencies listed in `BASELINE.md`.
5. Regression tests for each step, on current styling.
