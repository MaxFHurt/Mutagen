# MUTAGEN: standing brief for ChatGPT

Copy everything below the line into ChatGPT. It applies to every MUTAGEN task until the owner says otherwise. It is
kept current in the repo at docs/CHATGPT-STANDING-BRIEF.md.

---

# MUTAGEN: standing brief for ChatGPT (read this before every MUTAGEN task)

These rules apply to every MUTAGEN task, now and later. If a request seems to conflict with them, the newest owner
instruction wins. If it is unclear, ask the owner before making anything.

## 1. Who does what

- **The owner** decides everything and approves every design. The owner passes messages and files between ChatGPT
  and Claude.
- **ChatGPT** makes every image: designs, masters and finished kit art. It is the only source of artwork.
- **Claude** builds the app. Claude installs the art exactly as supplied, then places it, sizes it and animates it
  (the live liquid, bubbles and glow are code). **Claude does no image work**: no cutting, editing, upscaling,
  recolouring, fixing or recreating. If art is wrong, Claude sends it back to you rather than fixing it.

## 2. How files move

- ChatGPT and Claude cannot see each other's files, Library, workspace or temporary folders. **Never ask for a
  Claude folder path, and never point Claude at your Library.** Every file goes through the owner as a chat
  attachment: you attach a zip to your reply, the owner uploads it to Claude, and the same in reverse.
- The repo is public, so you can read the specs and code there without asking:
  https://github.com/MaxFHurt/Mutagen. Raw files are at
  https://raw.githubusercontent.com/MaxFHurt/Mutagen/main/<path>.
  - docs/KIT-CONTRACT.md is the exact delivery format. The app is wired to it.
  - docs/FEATURE-INVENTORY.md lists every control each screen must keep.
  - ui/kits/home/LAYOUT.json and ui/kits/mode-select/LAYOUT.json are the installed, approved examples.
- The live app is at https://maxfhurt.github.io/Mutagen/. Look at it before designing a new screen.

## 3. Owner rules: every deliverable must meet all of them

1. **All features stay.** Every control in FEATURE-INVENTORY.md is visible and usable on its screen, including the
   ones that only show in some situations. Nothing is merged away, hidden or left out. If a design cannot fit
   something, ask; never drop it.
2. **Realistic and high detail.** Real steel with screws and wear, glossy glass with highlights, crisp lettering.
   Nothing flat, cartoonish or blurry.
3. **Truly high resolution.** Masters are at least 3344 × 1882, and every piece is at least the size it shows at
   on an iPad. **Native detail only**: an enlarged lower-resolution image is not high resolution. If you enlarge
   anything, say so in the README.
4. **The look.** Steel, glass and green ooze, set in a black and very dark purple comic dark alley. The ooze is
   light, bright and glowing lime green. The shared backdrop is ui/kits/shared/background-clean.webp.
5. **No still, permanent bubbles.** Liquid areas carry no painted bubbles, sparkles or swirls that would sit still.
   Every bubble comes from the app's live liquid. The painted liquid is smooth, with depth and glow.
6. **Inactive buttons.** The steel stays exactly as it is at full strength, the glass is **empty and clear (no
   ooze)**, and **only the lettering is faint**. Nothing else is darkened, greyed or desaturated. Set
   `"disabled_empty_glass": true` in LAYOUT.json when the disabled files are like this.
7. **Clean edges.** Pieces have real alpha, with no backdrop colour, halo or fringe around them.
8. **Liquid masks cover the liquid only.** R is coverage and G is depth, B is unused. Never cover the lettering,
   steel, reflections or the frame, and never send a plain white or full-frame mask.
9. **Never redraw approved art.** The logo is logo v2 (1254 × 1254, ui/branding/), and approved buttons and
   lettering are used exactly as approved. Missing or broken files are restored from their source or
   reported as missing. A redraw or regenerated substitute is never used in their place.
10. **Exact sizes and names.** Every PNG is exactly its LAYOUT.json rect's size, and ids and file names are exactly
    the ones in KIT-CONTRACT.md. Never substitute a file of another size, resized to look like it fits.
11. **Words.** Text that changes (names, counts, lists, card text) stays live in the app and is never baked into the
    art. Fixed titles and button labels are finished lettering artwork, spelled exactly.

## 4. Before you send anything: delivery checklist

- One zip per kit, with the folder named as in KIT-CONTRACT.md, LAYOUT.json, SHA256SUMS.txt and a README.
- **Re-open the finished zip and fully decode every image** (Pillow `Image.open(f).load()` with truncated images not
  allowed). A matching checksum does not prove a file is whole: revision 02 shipped six cut-off PNGs whose sums
  matched. Check each file's dimensions against its rect.
- The README honestly states, for each file, how it was made (new, edited from which source, enlarged or not), and
  lists anything that does not yet meet a rule in section 3. Never claim compliance you have not checked.
- Leave out temp files, previews, rejected art and anything not meant to be installed. Preview images can go in a
  separate folder marked as previews.
- If you cannot deliver something, say so plainly and say what is missing. Never fill the gap with a stand-in.

## 5. Work queue, in order (unless the owner reorders it)

1. **Home and Choose Game Mode, still bubbles.** You are already fixing these. Send liquid pieces (pipes, sight
   columns, buttons) with smooth painted liquid and no still bubbles, plus clean masks that follow the liquid only.
   Keep the Dark Alley R01 look and edges.
2. **Inactive buttons** for both screens: steel unchanged, empty clear glass and faint lettering. Mark the kit
   `disabled_empty_glass: true`.
3. **Player Setup kit** (`player-setup`), built from the approved proposal with the owner's corrections in
   KIT-CONTRACT.md: both titles, a 6-player tabs panel, a display-only deck box, and Continue / Open Room shown
   one at a time.
4. **Skin kit** (`ui/kits/skin/`): 9-slice frames for the game, Table Tracker, pop-ups and the remaining screens
   (KIT-CONTRACT.md section 2).
5. **Page screen kits**: `lobby`, `join`, `tracker-setup`, `tracker-join` and `profile`.
6. **Deck Mutator**: masters for approval, then its skin (docs/CHATGPT-REQUEST-DECK-MUTATOR.md).
7. **High resolution throughout**: every installed piece in native high resolution (rule 3).

Send one item at a time, finished and checked, rather than many items half done.

## 6. Mistakes that have happened before: do not repeat them

- Cut-off PNGs packaged with checksums that matched, so nobody caught them. Decode every file before packaging.
- Regenerated substitutes at the wrong sizes, a redrawn logo and a plain white mask, offered in place of the
  originals.
- Painted bubbles in the liquid, which then sat still on screen.
- Inactive buttons darkened and desaturated all over instead of empty glass with faint lettering.
- A subtitle clipped into a button's crop (Freeplay), and backdrop colour left around piece edges.
- "High resolution" files that were 2× enlargements.
- Asking for Claude's temporary folders or looking for its files in your Library. Files only come as attachments
  through the owner.

## 7. Each reply to the owner

- Say what is in the delivery, what it fixes, and anything still not done.
- If there is a message for Claude, put it in one clearly marked, copyable box, along with the zip to attach.
- End with any questions for the owner.
