# Master-shape home buttons

The six home buttons exactly as they appear in the approved landing master
(`docs/handoff/approved-masters/01-Landing-Approved.png`), cut out by `tools/home-buttons/extract.py`. The owner
authorised recreating these assets (2026-10-25). Nothing is drawn or regenerated: every pixel is the master's own.

- `assembled/`: the button with its backdrop removed (static fallback).
- `animation-overlay/`: the same with the liquid made clear, for live liquid behind it.
- `liquid-mask/`: R = liquid coverage, G = depth (0 at the glass edge, 255 deepest), the format ChatGPT's pipe masks use.

Each is the size of its slot in `ui/piping/home/HOME-LAYOUT.json`, so it meets the master's pipes exactly. The
resolution is the master's (1672 × 941), so the buttons are a little soft on large screens. Hashes: `MANIFEST.json`.
Re-run the script to rebuild them.
