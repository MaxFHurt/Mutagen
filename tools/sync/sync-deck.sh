#!/bin/sh
# Bring a newer Deck Companion into deck/ and re-apply Mutagen's own changes to it.
#
#   sh tools/sync/sync-deck.sh /path/to/Deck-Companion-checkout
#
# Mutagen never edits the Deck-Companion repository; this only reads a checkout of it. Steps:
#   1. Copy the checkout over deck/ exactly (Mutagen's site-shipped combo data is kept) and commit that as
#      "Sync Deck from <commit> (upstream, unchanged)", so the upstream version is in history on its own.
#   2. Re-apply docs/sync/deck-mutagen.patch (every Mutagen change to deck/, see CHANGES-TO-COPIES.md) with a three-way
#      merge. Anything that no longer fits is left as a conflict to resolve by hand, never dropped silently.
#   3. Rebuild deck/app.min.js and deck/engine.min.js from the sources.
# Then: run the tests, update docs/BASELINE.md's sync log, and refresh the patch (the script prints the commands).
set -e
SRC=$1
ROOT=$(cd "$(dirname "$0")/../.." && pwd)
cd "$ROOT"
[ -n "$SRC" ] && [ -d "$SRC/.git" ] || { echo "usage: sh tools/sync/sync-deck.sh /path/to/Deck-Companion-checkout" >&2; exit 2; }
[ -z "$(git status --porcelain)" ] || { echo "Working tree not clean; commit or stash first." >&2; exit 1; }
BRANCH=$(git branch --show-current)
[ "$BRANCH" != "main" ] || { echo "Run this on a branch, not main." >&2; exit 1; }
UP=$(git -C "$SRC" rev-parse --short HEAD)
echo "Deck Companion $UP -> deck/"

# 1. Upstream copy, unchanged (keep Mutagen's combo data, which ships with this site).
KEEP=$(mktemp -d)
[ -f deck/data/combos.json.gz ] && cp deck/data/combos.json.gz "$KEEP/"
git rm -rq deck
rm -rf deck
mkdir deck
(cd "$SRC" && tar --exclude=./.git -cf - .) | (cd deck && tar -xf -)
[ -f "$KEEP/combos.json.gz" ] && mkdir -p deck/data && cp "$KEEP/combos.json.gz" deck/data/
rm -rf "$KEEP"
git add -A deck
git commit -qm "Sync Deck from $UP (upstream, unchanged)"
BASE=$(git rev-parse HEAD)

# 2. Mutagen's changes on top.
if git apply --3way --whitespace=nowarn docs/sync/deck-mutagen.patch; then
  echo "Mutagen changes re-applied cleanly."
else
  echo "Some Mutagen changes conflict with the new upstream. Resolve the conflict markers, then continue." >&2
  git diff --name-only --diff-filter=U >&2
  exit 3
fi

# 3. Bundles from the sources.
sh deck/tools/build.sh

cat <<EOF

Next:
  node deck/tools/tests/... (Deck suite, see docs/BASELINE.md), node tests/mutagen_flow.mjs, node tests/liquid.mjs
  Check docs/sync/DECK-SYNC-PLAN.md for what this sync must still show.
  Record the sync: docs/BASELINE.md sync log -> Deck $UP
  Refresh the patch:  git diff --full-index $BASE -- deck/ ':!deck/app.min.js' ':!deck/engine.min.js' ':!deck/data/combos.json.gz' > docs/sync/deck-mutagen.patch
EOF
