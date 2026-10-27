# MUTAGEN Revision 02 asset recovery — incomplete / integration hold

Date: October 26, 2026

No intact archived copy of any of the six required files was found in the 14 inspected archives. The full Revision 02 archive and its four split parts carry identical truncated copies (matching SHA-256); each lacks image scanlines and its PNG ending. A checksum match did not establish integrity.

Six source-derived reconstructions are included under `source-reconstructed/`, with the exact original relative paths beneath that prefix. These are NOT intact recovered originals and are NOT certified integration replacements. No redraw, image generation, new lettering, new geometry, or design correction was used. The original source images and the preserved Revision 02 build operations reproduced each file. Every byte of each damaged original is an exact prefix of its corresponding complete reconstruction. Every complete recoverable scanline also matches exactly at pixel level. Five intact control files reproduced with identical full SHA-256 AND pixels, including the 2508px logo overlay.

This provides unusually strong evidence of faithful source restoration. It does not prove byte-for-byte identity with missing suffixes from a lost complete original. The delivered complete files necessarily have different checksums from the damaged files.

## Six files still lacking an intact archived original

| Original relative path | Required and actual dimensions | Complete original scanlines compared |
| --- | --- | --- |
| `00-branding/logo-mutagen-v2.png` | 2508 × 2508 | 1836 |
| `00-branding/logo-mutagen-v2-liquid-mask.png` | 2508 × 2508 | 2106 |
| `01-home/buttons/deck-mutator/disabled.png` | 1424 × 232 | 45 |
| `01-home/buttons/settings/pressed.png` | 780 × 228 | 128 |
| `02-choose-game-mode/buttons/freeplay/assembled.png` | 1424 × 254 | 226 |
| `02-choose-game-mode/buttons/settings/pressed.png` | 698 × 214 | 81 |

All six reconstructions fully decode with Pillow strict truncation handling. PNG chunk lengths and CRCs, IEND, zlib end-of-stream, exact decompressed scanline length, dimensions, modes, and alpha were checked. The logo mask is RGB data (R coverage, G depth, B unused), not an RGBA visual asset. Original Revision 02 Home and Mode LAYOUT.json rects confirm all four button sizes; the 2508px logo canvas is confirmed by the original PNG headers and the preserved source/build record (the LAYOUT logo rects are smaller display slots, not source dimensions).

## Artwork validation failures — do not integrate as approved assets

- **Home Deck Mutator disabled:** the original build globally desaturated/darkened the button. The faithful reconstruction retains tinted liquid, dims steel/couplings, and fails the mandatory empty-clear-glass rule. It is included solely as a faithful historical reconstruction, not a corrected disabled state.
- **Freeplay assembled:** the original crop includes a clipped portion of “Create, test and play” along its bottom edge. The separate subtitle element also exists in the original kit. The reconstruction preserves that original defect and fails the no-subtitle requirement.
- **Logo liquid mask:** dimensions and source registration match the logo, and channels reproduce the original algorithm. Visual inspection shows mask coverage in MUTAGEN lettering regions and around highlighted edges; exclusion of lettering, steel, and reflections is NOT certified. It must not drive animation as an approved mask.
- **Logo and pressed states:** source artwork, chrome, typography, and proportions were preserved. Existing reflections/bubbles were retained because this recovery task does not authorize changing recovered artwork to satisfy future design rules. No new compliance claim is made.

## Search scope and excluded substitutes

Inspected all ten archives named in the handoff, plus MUTAGEN-Piping-Backgrounds-and-Logo-v2.zip, MUTAGEN-handoff-and-review.zip, and the current Home and Mode Select kits. The original layered-logo packages contain intact 1254 × 1254 source art, not intact 2508 × 2508 Revision 02 output. The newer Home disabled button is 1424 × 234, Home Settings pressed is 900 × 218, Mode Freeplay is 1424 × 234, and Mode Settings pressed is 690 × 167. None was substituted or resized to masquerade as an original. Filename-independent size inventory of all PNGs in these archives found no other matching candidate for a required state.

The original native Home/Mode source PNGs and 1254px adopted logo were fully decoded before reproduction. These operations replay the original 2× Lanczos build; they add no native detail. The label “2508px” is a canvas size, not a claim of native high-resolution generation.

Repository docs/KIT-CONTRACT.md was read on main; GitHub code search for Revision-02 returned no hits. No repository files were changed, committed, pushed, or deployed. No other session filesystem or unlocated source checkpoint is claimed to have been searched. Older pre-Revision-02 mega-archives were not downloaded.

## Package verification

Every delivered PNG was reopened from the finished ZIP and fully decoded; hashes were checked against SHA256SUMS.txt. The manifest covers all delivered files except itself. Evidence includes the original build record/layouts, source archive hashes, candidate decode results, exact pixel-row comparisons, and five intact full-file control comparisons. Corrupted originals, temporary files, rejected regenerated artwork, and preview contact sheets are excluded.

## Message for Claude

Six Revision 02 files were deterministically restored from preserved native sources/build operations, with exact matches to every surviving byte and pixel row. They are labeled source-derived reconstructions; no intact archived originals were found. Do not install this ZIP wholesale. Disabled Deck Mutator, Freeplay subtitle contamination, and logo-mask exclusions fail the owner rules. Keep these on integration hold; app placement/scaling/runtime work remains with Claude. This task made no repository changes.
