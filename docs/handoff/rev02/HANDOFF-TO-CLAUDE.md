# MUTAGEN — asset handoff, revision 02

Date: 2026-10-26
Status: PARTIAL DELIVERY — integration candidates and proposals, not a complete production kit.

## Owner decisions

The darker Home preview was approved: remove overwhelming hot pink, shift backdrop toward deeper violet, and lower saturation slightly. Preserve all six Home functions and the adopted v2 logo identity. The owner authorized reconstruction of missing backgrounds/glass and enhancement of smaller source artwork. ChatGPT owns image work; Claude places, sizes proportionally and animates supplied finished assets. Application code remains read-only in this work session.

## Files included

- `01-home/`: approved native preview, 3344×1882 enlarged master, reconstructed clean background, 13 pipe assemblies, six assembled button cutouts, clear-glass overlays, RG masks, disabled and pressed button variants, tagline, LAYOUT.json and assembly review.
- `02-choose-game-mode/`: revised native preview and enlarged master, pipe/button candidates, title and all three description artwork snippets, four bottom controls, states, overlays, masks, LAYOUT.json and assembly review. Revised rendering is a proposal; do not assume independent owner approval.
- `00-branding/`: adopted logo v2 enlarged to 2508×2508, reconstructed reflection overlay and estimated RG mask.
- `03-proposed-masters/`: Player Setup and Host Room proposals, each an individual file. These are not approved production screens.
- `SHA256SUMS.txt`: hashes of all package files except the checksum file itself.

## Material limitations — do not hide these

1. The image generator repeatedly returned 1672×941, even when higher resolution was requested. The 3344×1882 exports are 2× Lanczos enlargements. The logo is similarly enlarged from 1254×1254. They meet pixel dimensions but NOT the requested native-detail quality standard. Do not advertise them as native high-resolution renders.
2. Cutouts use manually surveyed silhouettes. They are candidates requiring edge review; no claim of perfect production trimming is made. Existing coordinate outlines were reused where applicable, and generated geometry can drift.
3. Liquid masks are inferred from green coverage. Neutral highlights are reconstructed as partially transparent white pixels. This is not an exact recovery of glass optical layers. Neutral printed lettering is protected heuristically; inspect letters and bubbles before installation. Do not reuse the old claim of zero changed pixels outside a liquid mask for this new derivation.
4. Depth is an estimated distance-from-edge field, not measured physical liquid thickness. Blue channel is unused. Red is coverage, green is relative depth. Masks are enlarged with the artwork and may have filtered boundary pixels.
5. Disabled and pressed buttons are desaturated/darkened treatments with unchanged footprints. These visual states have not been approved individually.
6. The background reconstructs formerly hidden pixels and preserves exposed approved background where possible. It is a reconstruction, not a recovered original layer.
7. The assembly uses the original adopted v2 logo at its proper square aspect ratio. It can differ from the image generator's interpretation in the screen preview. Review the supplied assembly image before treating it as the final reference.
8. Port positions are manually estimated visible connection centers; internal routes behind opaque steel are not known. Alignment and flow transitions are not yet browser-tested.

## Placement and animation contract

Use each screen's LAYOUT.json canvas coordinates. Keep aspect ratios; scale the entire coordinate system uniformly. The PNG dimensions match each listed rectangle. Each piece's overlay and mask share the assembled asset's dimensions. Render generated liquid behind the clear-glass overlay, clipped by red mask coverage. Green supplies relative depth. Do not stack the static assembled liquid image over the animated liquid. Use assembled images for still-liquid mode.

Home circuit: down the left column, left-to-right through buttons, up the right column, return across the top. Retain Still liquid and Softer green preferences. CONTINUE is disabled when no saved game exists. Preserve semantic HTML controls and accessibility names beneath artwork; visual assets do not replace interaction semantics.

## Player Setup coverage

The proposal includes player tabs, Add Player, Remove Player, player name, deck box, Saved Decks, Precon Catalog, Paste List, View Deck, Commander, Partner/Background, Advice, Playmat, remote-player count, mode note, Back, Deck Mutator, Continue and Open Room.

View Deck is conditional in the existing implementation and was found during read-only review. Continue and Open Room are shown together in the proposal to demonstrate both artwork needs; runtime should show the applicable action. Hosting count only appears when hosting. Do not introduce a deck dropdown merely because generated artwork suggests one. Playmat thumbnails are illustrative, not additions to the user's inventory.

## Remaining work, in order

1. Resolve native-resolution detail shortfall and complete cutout/overlay/port QA. Home and mode candidate files are not certified final.
2. Obtain approval of revised Choose Game Mode assembly and Player Setup proposal. Produce Player Setup kit only after approval.
3. Finish Join Room proposal and review Host Room states including host-device mode and table-rule acceptance.
4. Battlefield: preserve commander/partner, life, library/graveyard/exile, battlefield, lands, hand, opponent summaries, phase, advice, log/stack, undo, full-table view, counters/sort, Card ID, chat, help, settings, profile and role-dependent Host Tools/Edit Game/Challenge. Supply smart-octagon action and legal/unavailable states. No finished battlefield kit exists in this revision.
5. Table Tracker setup, table and join: preserve player management, life/counters/status/mana/tax, tracked cards, log, judge, device/host controls and all role-specific actions. No finished tracker kit exists in this revision.
6. Profile, Settings, Help/Judge and local/host/join mode menus, including their conditional/modal states.
7. Deck Mutator home and card-detail proposals against the CURRENT separate app; preserve Deck List, Stats, mutations, library, buy list, search/filter/printing and all current features. No claim of a complete Deck Companion feature audit in this revision.
8. Package approved screen kits, their finished states, animation layers, layouts and checksums. Deliver each screen separately as completed, with this rolling status updated.

## Source reference

Read-only repository: MaxFHurt/Mutagen. Remote main observed at f2077050d8530362451fb7788455db194ac72458. No application source edits or verified asset commits were made by this revision. This package does not replace either app's source backup.

Native approved Home source: exec-565c717c-44f6-4413-bf2a-d9b0edd19038.png.
Revised mode source: exec-bc34a22a-fbea-43a5-9d99-f70366e83850.png.
Background reconstruction source: exec-8e6e8f1b-a47d-418c-80b1-af610dfe8d3e.png.

Image workflow: built-in image generation for the authorized visual reconstructions and screen proposals; source-pixel crops, alpha-mask derivation and Lanczos enlargement for candidate exports. Prompt intent: preserve layout and all controls, realistic steel/glass, restrained green, deep violet backdrop without pink glare. All differences above are disclosed rather than described as exact extractions.
