# Mutagen

MUTAGEN — Mutate The Gathering. One app combining Commander Companion (play) and
Deck Companion (Deck Mutator).

| Folder | What it is |
|---|---|
| `commander/` | Commander Companion rebuild 1.0.0-rebuild.29, copied unchanged |
| `deck/` | Deck Companion build 164, copied unchanged |
| `docs/STATUS.md` | Current state, decisions and next steps — start here |
| `docs/BASELINE.md` | Source commits, test results, known issues, how to run tests |
| `docs/handoff/` | Design handoff: locked art, liquid assets, approved masters, requirements |

Both apps are static sites with no build step. Serve the repository root (for example
`python3 -m http.server`) and open `/commander/` or `/deck/`.
