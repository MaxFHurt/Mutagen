"""Split each approved liquid shell (docs/handoff/liquid-v2) into the layers the live liquid needs.

For every shell it writes, into ui/liquid/:
  <name>-frame.png  the shell with its glass window made transparent inside the bevel (steel, bolts, bezel and glass rim
                    stay exactly as supplied)
  <name>-mask.png   R = window coverage, G = depth (distance from the window edge, 0 at the edge, 255 at the deepest point)
The originals are only read. Run: python3 tools/liquid/extract.py
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'docs/handoff/liquid-v2'
OUT = ROOT / 'ui/liquid'
SHELLS = ['canister', 'navigation', 'sight-column', 'smart-octagon']


def window_mask(rgba):
    r, g, b, a = (rgba[..., i].astype(int) for i in range(4))
    green = (g > r + 25) & (g > b + 25) & (a > 200)
    green = ndimage.binary_opening(green, iterations=2)
    labels, n = ndimage.label(green)
    if not n:
        raise SystemExit('no green window found')
    sizes = ndimage.sum(green, labels, range(1, n + 1))
    window = labels == (1 + int(np.argmax(sizes)))
    window = ndimage.binary_closing(window, iterations=3)
    return ndimage.binary_fill_holes(window)   # bubbles and highlights inside the glass belong to the window


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    meta = {}
    for name in SHELLS:
        shell = Image.open(SRC / f'{name}.png').convert('RGBA')
        rgba = np.array(shell)
        window = window_mask(rgba)
        depth = ndimage.distance_transform_edt(window)
        # The glass bevel (the bright rim just inside the steel) is fixed glass, so it stays in the frame layer: the frame
        # keeps a ring about 5.5% of the window's depth wide and fades out over 1.5 px past it, overlapping the live liquid.
        ring = 0.055 * depth.max()
        cut = np.clip((depth - ring) / 1.5, 0, 1)
        frame = rgba.copy()
        frame[..., 3] = (rgba[..., 3] * (1 - cut)).astype(np.uint8)
        Image.fromarray(frame).save(OUT / f'{name}-frame.png', optimize=True)
        coverage = np.clip(depth / 1.5, 0, 1)
        mask = np.zeros(rgba.shape[:2] + (3,), np.uint8)
        mask[..., 0] = (coverage * 255).astype(np.uint8)
        mask[..., 1] = (np.clip(depth / max(depth.max(), 1), 0, 1) * 255).astype(np.uint8)
        Image.fromarray(mask).save(OUT / f'{name}-mask.png', optimize=True)
        ys, xs = np.nonzero(window)
        meta[name] = {'size': list(shell.size), 'window': [int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max())], 'maxDepth': round(float(depth.max()), 1)}
        print(name, meta[name])
    (OUT / 'shells.json').write_text(json.dumps(meta, indent=2) + '\n')


if __name__ == '__main__':
    main()
