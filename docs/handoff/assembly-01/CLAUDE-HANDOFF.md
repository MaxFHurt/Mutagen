# MUTAGEN — animated screen assembly checkpoint

Status: review prototypes, not approved final masters or implemented application screens.

## Scope and preservation

Both CommanderCompanion and Deck-Companion repositories remain read-only in this work. The existing applications, older art, and earlier motion prototype are untouched. This folder is a separate visual assembly deliverable. It covers 35 Commander, 39 Deck Mutator, and 12 shared screen families from the recovered inventory. It is not an exhaustive claim about every conditional runtime state.

Open index.html for the self-contained animated gallery. Individual screens live in screens/ and use the adjacent shared source and assets. Keep the folder structure when extracting. PNGs are still reference frames; use HTML to see motion. iPhone landscape and iPad landscape use different layout heights and content geometry. No application login, persistence, camera, networking, game legality, card prices, or scoring is connected in these prototypes.

## Working motion

The procedural liquid field is time-dependent and loops every twelve seconds. It animates inside side sight glasses and filled canister buttons. Separate sampling offsets prevent mirrored left/right chambers. Lettering and steel remain fixed. The leaking coupling uses a repeating gather/fall/impact sequence. Pause and reduced-green controls are in the review toolbar; system reduced-motion initially pauses playback. Hidden pages do not advance the animation clock. This is procedural animation, not a physical fluid simulation.

## Artwork provenance and limits

button-master.jpeg is the saved user-supplied PLAY source, preserved unchanged. Rendering reuses its end caps with uniform scaling, extends the central chamber and paints new stationary silver/purple lettering. A connected exterior white matte is removed at runtime, preserving interior silver pixels. These are controlled assembly derivatives, not byte-identical relabeled assets. The saved R08 frame supplies the sight-column art and steel texture. logo-master.jpeg remains preserved unchanged; the landing preview uses the corresponding logo region from the R08 composition.

These references do not yet meet the user's exact final-art standard: clean production masks, residual green in source endcaps, final printed-lettering typography, full card artwork, responsive readability, the integrated octagonal smart control, and exact approved hardware continuity need further visual work. Generic list-family pages are content coverage drafts, not individually finished artwork. Do not describe this package as locked or final-approved. Do not substitute simplified reference panels for the user's approved final styling without review.

## Required coding work for Claude

1. Preserve independent recoverable baselines before integration. Record repository commits, builds, local-data schemas, and export backups. This visual package is not a complete source-code backup.
2. Make MUTAGEN the single shell. Route Commander deck-builder entry to Deck Mutator; preserve all Deck Companion pages and provide return navigation. Repository relocation is optional, not a requirement.
3. Introduce a shared profile/deck identity layer. Commander setup and player profile must display the same saved decks as Deck Mutator. Migrate existing data with a recovery export and explicit versioned transformations.
4. Bind the common motion component to production asset masks. Keep full chambers, constant pipe diameter, opaque steel elbows, regular couplings, and connected routes. No reducers, top canisters, exterior green glow, mirrored liquids, or shadow backing behind lettering. Integrate the smart octagon within connected borders; illuminate only when legal actions exist. Drips fall vertically below their leak and terminate at a physical surface.
5. Use distinct device layout constraints, safe-area insets, stable card aspect ratios, and accessible touch targets. Add reduced-green and reduced-motion settings. Avoid resetting the full canvas or redrawing static artwork every frame in production; cache hardware and separate moving liquid layers. Validate resource use on actual iPhone/iPad.
6. Keep Commander modes, setup validation, multiplayer flows, tracker, legal priority, combat, zones, mana, counters, scanner, rules help, logs, undo, continuation and profile features intact. Back/Close must not commit changes.
7. Preserve Deck Mutator's commander/partner/seed/precon/import/empty workflows, Library, search, printings/faces, backups, history, compare, diagnostics, mechanics, lands and existing practice analysis. Preserve scroll availability immediately after reload and independent workspace scrolling.
8. Mutation comparison is Your Card / Budget / Mid tier / Apex with rating and selected-printing price under each. Keep deck power and strength-based Apex progress visible on Mutations and Build Stats. Printing changes never change a recommendation's tier. Regenerate recommendations without changing installed cards. Show deck value, not money spent.
9. Buy List groups stay per-deck plus Other. Export selected groups as canonical quantity/name lines. Add All excludes basic lands, includes commander and nonbasics, and is idempotent. Installing a listed card prompts removal of the corresponding quantity for that deck only; never remove automatically.
10. Audit all visible old names and upgrade terminology, including titles, metadata, manifests, tooltips, empty/error states, exports and install prompts. Preserve identifiers needed for migration; do not blindly rename storage keys. Use MUTAGEN / Deck Mutator and Budget mutation / Mid tier mutation / Apex mutation in user-facing labels.
11. Maintain this handoff and the screen register whenever new code requirements are discovered. Official rules and mechanics compilation remains a separate outstanding source deliverable; this package does not supply authoritative rules text.

## Verification

The generation script renders every catalog screen at 1400×650 (iPhone reference composition) and 1400×1000 (iPad reference composition). verification.json records frame-change and twelve-second loop-seam checks. Native Canvas rendering is available; browser/Safari/device interaction has not been tested. Sample card frames intentionally use placeholders rather than fabricated card art, rules, market prices or engine findings. Visual coverage is broader than individual visual QA; representative screens were inspected, not every state on a device.

## Source inspection checkpoint

Commander route inventory: rebuild/src/main.js, blob c0ac687e1bf2d0a9a31bfd6feab8d851a93f3aff. Deck version file reported Build 144, blob 8cc84f74b67e45be5c1b074d2ff85edb2dbf5e99; ui.js blob a3dd411c12b07aef92194ca810c937eb42eb0a4e. These are inspected snapshots, not a guarantee that live builds have remained unchanged.
