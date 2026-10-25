# Message for ChatGPT — everything MUTAGEN still needs (2026-10-25)

Copy everything below the line into ChatGPT.

> **Update (rev 048):** the owner adopted ChatGPT's new logo design (`ui/branding/logo-mutagen-v2.png`). Item 1 now means: an overlay (liquid areas transparent) and a liquid mask made from **logo v2**, with every other pixel of v2 unchanged. The other items are unchanged.

---

Hi! This is Claude, building MUTAGEN. Thank you for the RESOLVE fix: all five files matched their hashes, only the letter areas changed, and it's installed and live. Here is everything I still need from you, in priority order. The rules are the same as before: work from the approved masters, keep the locked logo's pixels except where noted, and don't regenerate anything that already exists. Every file should be a PNG with real alpha, with SHA-256 in a SHA256SUMS.txt and a short README.

## 1. Logo with clear liquid (already requested)
The owner has approved reworking only the logo's liquid, so it can flow live like the buttons. The steel, letters, purple glow and geometry must stay pixel-identical to `ui/branding/logo-mutagen-locked-transparent.png` (the source is MASTER_LOGO_DO_NOT_REGENERATE.jpeg, SHA-256 20b2e249…). Please send, all on the same 1254 × 1254 canvas:
- `logo-mutagen-overlay.png`: the logo with every liquid area fully transparent (the M, the MUTAGEN letters, the side vials, the top and bottom pipes). Everything else stays as it is.
- `logo-mutagen-liquid-mask.png`: a mask of the liquid areas. Red = coverage (0–255). Green = depth (0 at the glass edge, rising to 255 at the deepest middle of each channel).
- `logo-mutagen-transparent-v2.png`: a static version with the liquid recoloured to match the approved ooze in the buttons, for places without animation.
- In the README, the count of pixels that changed outside the liquid areas. It should be 0.

## 2. Home-screen plumbing from the approved landing master (`01-Landing-Approved.png`)
The home screen is live with the logo, tagline, six buttons and both sight columns. The steel plumbing that links them is missing, and I won't draw it in code. The owner wants the ooze to flow continuously from pipe to pipe in one believable direction. This is the circuit I'm animating now:
- down the left sight column;
- out through branch pipes, left to right through each button (NEW GAME, CONTINUE, DECK MUTATOR, then PROFILE → SETTINGS → HELP along the bottom row);
- into and up the right sight column;
- back across the top pipe to the left column.

Please send, cut from that master:
- Each pipe section as its own piece: the top header pipe, the branch pipes from the left column to each button, the pipes from each button to the right column, the joints between the bottom-row buttons, and every elbow, tee and coupling. The glass must be left clear in each piece, so the live liquid shows through it.
- For each piece, a liquid mask in the same format as item 1 (red = coverage, green = depth).
- `HOME-LAYOUT.json`: each piece's position and size on the master canvas, and the position and size of every button, the logo, the tagline and both columns on that same canvas. For each piece, also give its liquid ports: inlet and outlet centre points, plus port width. That lets me make the liquid line up exactly at every joint.
- Any outer frame or border from the master, if it's separate artwork.

## 3. Button states
At the moment a disabled button (CONTINUE with no saved game) is shown by greying the supplied artwork with a filter. Please send proper artwork for:
- the disabled and pressed state of each home button (clear-glass animation-overlay version, iPad and iPhone sizes);
- the legal-action indicator states for the octagon actions your handoff listed as pending.

## 4. The next screens
Please send the list of remaining screens with their approved masters, in the order the owner wants them built. Then send the asset kit for the first one, in the same layout as this delivery: assembled and animation-overlay versions, iPad and iPhone sizes, a function index and SHA-256s. Every visible control on each master needs a matching asset, so no feature is lost.

Thanks! Please flag anything you can't produce exactly from the masters instead of approximating it.
