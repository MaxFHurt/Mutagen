# MUTAGEN — Dark Alley R01

Owner direction: a visible black and very dark purple comic alley throughout the full scene, including the centre. Exposed areas show brick, service door, fire escape, grime, hard ink shadows and pavement. No bright-blue backdrop, no empty central void, no edge-only composition.

## Contents and installation

This is an ASSET DELTA for the original Revision 02 layouts currently on MaxFHurt/Mutagen main, read October 27, 2026. It is not a replacement with the newer, differently sized Library kits. Overlay `ui/kits/home/` and `ui/kits/mode-select/` onto their matching original Revision 02 kits. 137 PNG state/layer files for 37 pieces are included. Existing lettering and branding files remain supplied by the base kit. The subtitle text caught OUTSIDE button silhouettes was removed; proper separate subtitle elements remain in the base kit.

Both LAYOUT.json files keep every canvas, piece, id, rect, port and coordinate identical. Their only data change is `background` from `background-clean.png` to `background-clean.webp`. The obsolete background PNG need not be loaded. Claude should remove the current code darkening/filter stand-in when installing this background; otherwise the new art will be darkened twice. No code or repository change was performed here.

`shared/background-clean.webp` is the universal future-screen master, with identical copies under the listed screen-kit folders. Home, Choose Game Mode, Player Setup, Host Room/Lobby, Join, Battlefield, Table Tracker, Tracker setup/join, Profile, Settings, Help/Judge and Deck Mutator all use this same backdrop direction. Folders for later screens contain ONLY the backdrop: no new layout or completed screen is claimed. Claude maps any later runtime kit naming to this master, keeping each existing layout. Every later kit should include it as background-clean.webp.

## Exact size and quality disclosure

Every delivered background-clean.webp is 3344 × 1882 and 591,276 bytes (under 600,000 bytes), WebP quality 87. It is a new illustrated scene, not a darkened old backdrop. The built-in image tool returned a 1672 × 941 native image despite the larger request; the target export is a 2× Lanczos enlargement. This is NOT native 3344px detail and is not presented as such. No unrelated native-detail claim is made for the original cut-outs.

## Cut-out preservation

Final cut-outs preserve their exact original pixel canvases and placement. Retained RGB pixels are unchanged: the pass edits source alpha and clips corresponding R/G liquid data to the same silhouette. Existing green liquid and purple lettering outlines are preserved. Transparency has zero RGB outside the silhouette. Blue/violet exterior pixels are removed rather than made darker or hidden behind a black border.

One documented exception restores a stray background glyph crossing Home NEW GAME's top rail: destination x=1056..1095, y=0..28 uses the adjacent clean rail from x=1100..1139 in the SAME source/state. This is a local source-pixel repair, not newly generated steel or lettering. No output from the AI extraction reference was substituted for the original cut-out artwork. The narrow source-derived state restorations from the prior recovery task supply the previously truncated states; those remain labeled source-derived in the prior report.

This is an exterior cleanup, not a redesign of disabled glass or the logo mask. The historical disabled files still have the previously documented liquid/dimming defect; do not set disabled_empty_glass=true or claim those interiors are compliant. Existing bubbles/reflections and logo-mask limitations were not changed. These prior issues remain separate from this backdrop/edge delta.

## Verification

All delivered PNGs were fully decoded, dimension-checked against the original rects, and compared for retained source RGB outside the documented rail patch. All 37 assembled silhouettes have zero pixels matching the blue/violet backdrop detector in their outer nine-pixel contour band. The detector is a practical chroma check, not a semantic guarantee of arbitrary image content. R/G masks retain their data mode and share the same pixel registration; no new claim about the original interior mask exclusions is made.

The 3344 × 1882 compressed backdrop was decoded and checked for darkness and absence of bright-blue lights. Asset assembly previews and piece sheets were visually reviewed on the plum/black backdrop. They are offline compositions, not browser tests. Every image was reopened directly from the finished ZIP and fully decoded; all files match SHA256SUMS.txt. No temp files or rejected generated replacement art are included. The repo remains read-only; Claude owns installation, scaling, runtime and browser testing.
