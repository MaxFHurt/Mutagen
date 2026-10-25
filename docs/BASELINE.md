# MUTAGEN — Phase 0 baseline

Recorded 2026-10-25. This is the starting point before any integration work. Both apps are
copied into this repository **unchanged**; the source repositories were not modified. They
remain editable; this build only reads them.

## Sources

| Folder | Source | Commit | Version | Notes |
|---|---|---|---|---|
| `commander/` | `MaxFHurt/CommanderCompanion`, folder `rebuild/` | `f9dfe396ce5f49b5adc440a9ae61c4440dd128a5` (tree `9b595b411954e18642ad7541410980d09de6d910`) | `1.0.0-rebuild.29` (2026-10-11) | The rewrite, chosen as the Commander base. The older root app (V0.8 KC) is **not** copied. |
| `deck/` | `MaxFHurt/Deck-Companion`, whole repo | `fdf21b78cf8906214e66b31e2a5562ca9e96e0ab` | build 164, v0.9.19 (2026-10-24) | All tracked files. Its `test-data` and `card-data` branches stay in the source repo. |

Every copied file was compared byte-for-byte against the source commit (`git show HEAD:<path>`):
217 files in `commander/`, 213 in `deck/`, no differences.

## Test results on the copies

| App | Check | Result |
|---|---|---|
| Commander | `node tests/node/game.mjs` | 149/149 |
| Commander | `node tests/node/mechanics.mjs` | 64/64 |
| Commander | `node tests/node/tracker.mjs` | 20/20 |
| Commander | `node tests/node/soak.mjs 20` | 20 games, 2702 actions, 0 problems |
| Commander | `python3 tests/game_ui.py` | 27/28 — see known issue 1 |
| Commander | `python3 tests/flows_ui.py` | 25/25 |
| Deck | `check.sh screens,cards quick` → quick UI check | 12/12 |
| Deck | `check.sh screens,cards quick` → semantics | 49/51 — see known issue 2 |
| Deck | `tools/build.sh` rebuild of `app.min.js`, `engine.min.js` | byte-identical to committed bundles |

Not run in Phase 0 (long or need extra setup): Commander `challenge_ui`, `net_ui`,
`tracker_test`, `tracker_net_ui`, screenshot suites, `scan_ui` (internet); Deck full UI suite
(118 tests, ~6–10 min), benchmarks, `accept`, `claims`, `genstrong`.

### Deck full UI suite (126 tests, `check.sh screens live`), 2026-10-25

| Code | Result | Failed |
|---|---|---|
| Original Deck-Companion `fdf21b78` | 124/126 | UI-B145-01, UI-B146-02 |
| Mutagen `deck/` after Phase 1 renames | 124/126 | UI-B145-01, UI-B81-02 (`sameBuild` only) |

UI-B145-01 needs the EDHREC theme pages from `fetchtags.sh`, which was not run (fails on both).

UI-B81-02 / UI-B146-02 are one race present in the source, not a Mutagen regression. They run next
to each other in group 0, and in every run exactly one of them fails: B146-02 on the original page
(failed 3/3, B81-02 passed 3/3), B81-02 on Mutagen's page (failed 3/3, B146-02 passed). Isolating:
Mutagen's code with the original `index.html` behaves exactly like the original, and removing
`mutagen.js` alone does not change it, so the page-text renames shift timing. B146-02 checks that the
background whole-card search finishes; B81-02 then generates the same deck twice and expects
identical cards (`sameBuild`), which fails when that background work is still landing. Worth fixing
upstream in Deck-Companion (its own chat): make generation independent of in-flight background
results, or have B81-02 wait for the search to settle. UI-B144-02 failed once and passed on rerun.

### Known issues present in the sources (not introduced here)

1. **Commander `game_ui` "no console errors"** fails on the phone pass: the browser requests
   `/favicon.ico`, which does not exist. The same failure occurs on the original repo.
2. **Deck semantics 49/51:** `Selvala does not count as your card draw` and `Looting is
   filtering` fail (`← undefined`). The code is identical to the source commit, so this is the
   source state against the current `test-data` snapshot (`db3c324b`). The handoff records
   51/51 at 0.9.2/0.9.3; cause not investigated.

## How to run the tests

Commander (from `commander/`):

    node tests/node/game.mjs; node tests/node/mechanics.mjs; node tests/node/tracker.mjs; node tests/node/soak.mjs 20
    python3 -m http.server 4180 --bind 127.0.0.1 &      # stop it afterwards
    python3 tests/game_ui.py; python3 tests/flows_ui.py

The Python suites need `pip install playwright==1.56.0`. In the cloud sessions the browser is
preinstalled at `/opt/pw-browsers/chromium`; if that Playwright version does not match it,
launch with `executable_path='/opt/pw-browsers/chromium'` rather than downloading browsers.

Deck: `deck/tools/tests/suite/setup.sh` fetches `test-data` from the repo's own `origin`,
which is now Mutagen and has no such branch. Build the layout by hand instead:

    git -C <Deck-Companion clone> fetch --depth 1 origin test-data
    git -C <Deck-Companion clone> archive FETCH_HEAD | tar -x -C $WORK
    # then copy deck/ into $WORK/proto/candidate and deck/tools/tests/suite into $WORK/proto/tests,
    # exactly as setup.sh does, and run: sh $WORK/proto/tests/check.sh screens,cards quick

## Dependencies on the source repositories (to resolve in Phase 1)

- ~~Deck loads combo data from Deck-Companion's `card-data` branch.~~ Resolved 2026-10-25: it ships at
  `deck/data/combos.json.gz` (snapshot of 2026-10-12, 11,705 combos) and `.github/workflows/combo-data.yml`
  refreshes it weekly through a pull request.
- `deck/.github/workflows/card-data.yml` refreshes that branch. It is inert here (workflows only
  run from the repository root `.github/`).
- Commander's root-level GitHub workflows belong to the old root app and were not copied.
- Commander Card ID scan loads Tesseract from `cdn.jsdelivr.net` (unchanged).

## Handoff package

The full design handoff came as two Google Drive zips (not committed; ~911 MB):

| File | Bytes | SHA-256 |
|---|---|---|
| `MUTAGEN-Complete-1-of-2.zip` | 455959425 | `96c3db240f00675bec665bfd0496820f7a34c2d3bbbb437901d8211da5152536` |
| `MUTAGEN-Complete-2-of-2.zip` | 455884705 | `17413d5bdfca79604b6d0abe539c2f2fcf4a81c4cc47f76e59269414590d0284` |
| `MUTAGEN-Liquid-Correction-v2.zip` (chat upload) | — | `a9c19723095fe97cf580a85f2d93fc566cc31ef2c74ff3fb794fd6cadf2ad92c` |

All 329 files in `FILE-INVENTORY.csv` matched their hashes. The nested
`Archive/MUTAGEN-Animated-Screen-Assembly-01.zip` was already truncated at the source (its hash
matches the inventory); 269 of its 272 files were salvaged and verified against its own
`ASSET-HASHES.json`. Lost: `png/ipad/D39.png`, `S03.png`, `C22.png` (preview renders only).

`docs/handoff/` holds the working subset; see its `README.md`.

## Sync log

Last synced source commits. Bring later changes in by diffing from these.

| Date | App | Source commit | Notes |
|---|---|---|---|
| 2026-10-25 | Commander (`rebuild/` → `commander/`) | `f9dfe396` | Initial copy |
| 2026-10-25 | Deck (`/` → `deck/`) | `fdf21b78` | Initial copy |
