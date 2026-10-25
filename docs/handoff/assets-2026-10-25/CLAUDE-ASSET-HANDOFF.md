# MUTAGEN assembled button asset delivery — 2026-10-25

## Start here
Use the individual files in `ui/buttons/*/assembled/` as complete static buttons: shell, filled liquid and finished lettering/icon are already combined. No cutting or lettering reconstruction is needed. `ui/buttons-iphone/` contains proportional half-resolution exports; the full-resolution files also cover iPad. These are resolution variants of controls, not separate full-screen device layouts. Always use contain sizing with the original aspect ratio.

The current requested set is complete as exported artwork: seven home text controls (NEW GAME, CONTINUE, DECK MUTATOR, PROFILE, SETTINGS, HELP, PLAY), twelve octagon actions, six navigation controls; 25 assembled designs, each at two resolutions. Supporting lettering, tagline, icons, fixed frames and masks are also included. Further app screens and the historical 335-asset kit are NOT certified complete by this delivery. New artwork has been visually checked but is not owner-approved or a pixel-identical extension of the four source letters.

## Exact sources
`ui/branding/logo-mutagen-locked-transparent.png` preserves all original decoded RGB pixels and the 1254 × 1254 canvas of MASTER_LOGO_DO_NOT_REGENERATE.jpeg; only exterior white matte alpha changed. Original JPEG SHA-256: 20b2e24979e7cbf939333277d72ced6934caf6e82d794e93587bbe90d44d1f73. Never regenerate this logo.

`ui/labels/label-play-source-cutout.png` is the native 569 × 162 source lettering extraction. `label-play.png` is its uniformly scaled padded derivative. It adds no detail beyond that native source. The other words/icons are newly generated artwork referenced to PLAY, not text rendered in application code. Label exports have 240 px visible-art height and 24 px padding; this describes artwork bounds, not a separately measured font cap height. Icons are 288 × 288. Final assembled labels fit proportionally inside the glass; long words are smaller to avoid stretching or clipping.

The three button shells are copied from current liquid-v2 sources; their hardware, liquid colour and geometry are not regenerated. Source files are included under ui/components. The logo retains its locked original liquid, as instructed.

## Required Claude coding
1. Replace the home logo JPEG reference with ui/branding/logo-mutagen-locked-transparent.png. Keep the JPEG immutable.
2. Bind each static button to the matching assembled PNG in BUTTON-FUNCTION-INDEX.json. Use semantic accessible names and hit targets; do not draw a second text label, shadow, or background behind the supplied button.
3. For real flowing liquid, use the matched `animation-overlay` PNG (hardware plus lettering, liquid window transparent) over the existing animated chamber. Use the associated frame/mask dimensions. Do NOT put a filled static PNG over the animation, since that would hide it.
4. All files have genuine alpha; do not use blend-mode tricks to hide a rectangular background. Avoid non-proportional stretching.
5. Recheck layout and label readability on actual iPhone and iPad; no full-screen layout or runtime behaviour was changed in this delivery.

## Pending owner decisions
This asset delivery does not approve the live liquid colour/flow. Octagon flow remains unresolved between current sideways flow through its side ports and the older downward-flow direction. Preserve current code until owner direction. Legal-action indicator states, press/disabled variants, remaining screens, and full-app asset inventory still need completion.

## Verification
MANIFEST.json and SHA256SUMS.txt identify every delivered file. BUTTON-FUNCTION-INDEX.json maps all 100 static/animation and device variants to their purpose. The original source artwork, letter extraction and generated extensions are distinguished here; do not treat review screenshots as production assets.
