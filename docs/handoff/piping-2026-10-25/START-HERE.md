# MUTAGEN — exact source piping separation + v2 logo layers

## What to use
- **01-home-approved/** is the home plumbing cut from the current explicitly approved `01-Landing-Approved.png`, the exact source named by Claude's current request. It has 13 main pipe assemblies, 25 optional detail slices, a full-canvas piping layer, a separate visible-background layer, and HOME-LAYOUT.json. No artwork was generated, resized or recoloured.
- **02-battlefield-source-reference/** and **03-deck-mutator-source-reference/** are cuts from the original supplied references. They are not newly approved screen masters. Their old liquid treatments remain unchanged because this delivery isolates source pixels rather than reworking them.
- **04-logo-v2/** has the new adopted logo's exact source, clear-liquid overlay, RG mask and verification. Source SHA-256 begins cc3fd853. Every RGBA pixel outside the supplied liquid mask is unchanged; RGB is unchanged everywhere.

## Separate layers
`piping-full-canvas.png` contains only the traced visible exterior piping, with real alpha. Original logo, labels, buttons, cards and player UI are excluded. Gaps at control locations are intentional: controls occupy those places in the source. Cut pipes are not extended or completed behind them.

`background-visible-original.png` contains original visible background pixels separately. **It is not a complete clean background plate:** a flattened image has no recoverable background behind opaque controls. Those regions are transparent. The background exclusion is conservative around controls and pipe edges to keep hardware/text out. Do not stretch this into an invented full-page background or fill holes by mirroring tiles. An exact opaque clean plate requires the original layered background source.

`foreground-original.png` preserves the excluded control regions and edge pixels for alignment/reconstruction; it is not a new production control layer. Together, piping + visible background + foreground exactly reconstruct the decoded source (0 changed pixels). This checks retained pixel fidelity, not independent approval of the manually traced edges.

## Claude assembly
Place each layer at (0,0) on the master canvas; or use the pieces' rect coordinates. Do not draw both the full-canvas layer and its pieces. Use detail slices instead of, not on top of, their containing assemblies. Some master images fuse pipe joints and controls, so only their visible portions can be cut without invention. No hidden tee geometry has been made up.

Each pipe piece has a matching window-transparent overlay and RG liquid mask (R coverage; G depth). Those inferred glass selections and ports are supplied for review, not as a certification of physically correct reconstructed plumbing. Source columns, assemblies and button sockets remain at their original coordinates. Preserve the existing shared-stream direction recorded in HOME-LAYOUT.json.

Logo: put animated liquid behind `logo-mutagen-v2-overlay.png` using `logo-mutagen-v2-liquid-mask.png`. Both are 1254 × 1254. Keep current v2 display sizing. The mask includes green M and word fills, side/top/bottom vials and glowing slots. The zero-change test is relative to this explicit mask; inspect its review image before installing.

## Remaining work
Disabled/pressed button states and legal-action indicator artwork are still pending. New Game/mode select is next in the original build order, followed by rules and player setup, then opening hand/game modes; Deck Mutator follows its separate feature inventory. Existing `02-Game-Mode-Proposed.png`, `03-Deck-Mutator-Home-Proposed.png` and `04-Card-Details-Popup-Proposed.png` are proposals, not approved screen masters. Claude can prepare behavior with available assets, but must not mark their visual assembly approved or replace missing graphics with code drawings.

## Scope
This supersedes the earlier piping ZIP's treatment of the October 12 baseline as the only home source. The R05–R08 proposals are deliberately not used here. The adopted logo v2 supersedes the original logo for this liquid-overlay task; original locked files remain unchanged. No application/repository code was edited.
