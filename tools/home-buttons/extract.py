"""Cut the six home buttons out of the approved landing master, for live liquid.

Owner authorised recreating the master-shape buttons (2026-10-25). Nothing is drawn: every button is the master's own
pixels. For each control slot in ui/piping/home/HOME-LAYOUT.json this writes:

  assembled/button-<id>.png          the button as in the master, background removed (static fallback)
  animation-overlay/button-<id>.png  the same with its liquid made clear, for live liquid behind it
  liquid-mask/button-<id>.png        R = liquid coverage, G = depth (0 at the glass edge, 255 deepest), as the pipes use

Background: the master's backdrop is saturated blue/purple lightning on near-black; the buttons are neutral steel, black
outlines, green liquid and white lettering. Backdrop-coloured or near-black pixels connected to the slot's edge are
removed (keeping a one-pixel dark outline); the button is what remains connected to its centre. Liquid: green-dominant pixels inside the button. Bright glints stay in
the overlay, so the glass keeps its highlights over the live liquid.

Run from the repo root: python3 tools/home-buttons/extract.py
"""
import hashlib
import json
import os

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
MASTER = os.path.join(ROOT, 'docs/handoff/approved-masters/01-Landing-Approved.png')
LAYOUT = os.path.join(ROOT, 'ui/piping/home/HOME-LAYOUT.json')
OUT = os.path.join(ROOT, 'ui/buttons-master/home')
EDGE_Y, EDGE_X = 9, 4   # px of the slot's top/bottom and left/right edges where near-black is backdrop
BUTTONS = ['new-game', 'continue', 'deck-mutator', 'profile', 'settings', 'help']


def hsv(rgb):
    r, g, b = [rgb[..., i] / 255.0 for i in range(3)]
    mx, mn = np.max(rgb, axis=2) / 255.0, np.min(rgb, axis=2) / 255.0
    d = mx - mn + 1e-9
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, (mx - mn) / (mx + 1e-9), 0)
    return h, s, mx


def extract(master, rect):
    x, y, w, h = rect
    crop = master[y:y + h, x:x + w, :3].astype(float)
    hue, sat, val = hsv(crop)
    # Backdrop: blue/violet/magenta with some colour, or very dark with a blue cast. Steel is neutral, liquid green.
    # Near-black counts as backdrop only in a thin band along the slot's edges (the shadow between stacked buttons);
    # further in, black is the button's own outline between glass and steel and must stay.
    dark = val < 0.14
    band = np.zeros_like(dark)
    band[:EDGE_Y], band[-EDGE_Y:], band[:, :EDGE_X], band[:, -EDGE_X:] = True, True, True, True
    backdrop = ((hue >= 200) & (hue <= 330) & (sat > 0.22) & (val > 0.06)) | (dark & band)
    # Only backdrop that reaches the slot's edge counts (purple inside the button, e.g. letter outlines, stays).
    lab, _ = ndimage.label(backdrop)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bg = np.isin(lab, list(edge))
    # The button is the part left connected to the slot's centre; holes inside it are filled.
    lab2, _ = ndimage.label(~bg)
    body = lab2 == lab2[h // 2, w // 2]
    body = ndimage.binary_fill_holes(body)
    body = ndimage.binary_opening(body, iterations=1)
    # Keep the button's own dark outline: one pixel of the near-black border around the cut.
    body |= ndimage.binary_dilation(body, iterations=1) & dark
    # Soft 1 px edge so the cut does not alias.
    alpha = ndimage.gaussian_filter(body.astype(float), 0.6)
    alpha = np.clip((alpha - 0.15) / 0.7, 0, 1)
    # Liquid: green-dominant pixels inside the body, away from the cut edge, including liquid in shadow.
    r, g, b = crop[..., 0], crop[..., 1], crop[..., 2]
    green = (g > 30) & (g > r * 1.35) & (g > b * 1.35) & ndimage.binary_erosion(body, iterations=3)
    liquid = ndimage.binary_opening(green, iterations=1)
    # Drop tiny specks; keep the liquid body and its painted bubbles as one.
    lab3, n = ndimage.label(liquid)
    sizes = ndimage.sum(liquid, lab3, range(1, n + 1))
    liquid = np.isin(lab3, [i + 1 for i, s in enumerate(sizes) if s >= 40])
    liquid = ndimage.binary_closing(liquid, iterations=1) & body
    # Small enclosed patches of darker or duller green (shading painted in the master's liquid) are liquid too; the
    # lettering, icons and white glints are bright or not green and stay in the overlay.
    holes, nh = ndimage.label(ndimage.binary_fill_holes(liquid) & ~liquid)
    for i in range(1, nh + 1):
        m = holes == i
        if m.sum() <= 400 and g[m].mean() > r[m].mean() * 1.08 and g[m].mean() > b[m].mean() * 1.08 and val[m].mean() < 0.62:
            liquid |= m
    # Depth: distance to the glass edge, normalised per connected channel.
    dist = ndimage.distance_transform_edt(liquid)
    depth = np.zeros_like(dist)
    lab4, n4 = ndimage.label(liquid)
    for i in range(1, n4 + 1):
        m = lab4 == i
        depth[m] = dist[m] / max(dist[m].max(), 1)
    rgba = np.dstack([crop, alpha * 255]).astype(np.uint8)
    overlay = rgba.copy()
    overlay[..., 3] = np.where(liquid, 0, overlay[..., 3])
    mask = np.dstack([liquid * 255, (depth * 255).round(), np.zeros_like(depth)]).astype(np.uint8)
    return rgba, overlay, mask, int(body.sum()), int(liquid.sum())


def main():
    master = np.array(Image.open(MASTER).convert('RGBA'))
    layout = json.load(open(LAYOUT))
    slots = {c['id']: c['rect'] for c in layout['controls']}
    for sub in ('assembled', 'animation-overlay', 'liquid-mask'):
        os.makedirs(os.path.join(OUT, sub), exist_ok=True)
    manifest = {'source': 'docs/handoff/approved-masters/01-Landing-Approved.png',
                'source_sha256': hashlib.sha256(open(MASTER, 'rb').read()).hexdigest(),
                'method': __doc__.strip().splitlines()[0], 'buttons': {}}
    for bid in BUTTONS:
        rgba, overlay, mask, body, liquid = extract(master, slots[bid])
        files = {}
        for sub, img in (('assembled', rgba), ('animation-overlay', overlay), ('liquid-mask', mask)):
            path = os.path.join(OUT, sub, f'button-{bid}.png')
            Image.fromarray(img, 'RGBA' if img.shape[2] == 4 else 'RGB').save(path, optimize=True)
            files[sub] = hashlib.sha256(open(path, 'rb').read()).hexdigest()
        manifest['buttons'][bid] = {'rect': slots[bid], 'button_px': body, 'liquid_px': liquid, 'sha256': files}
        print(f'{bid:13s} rect {slots[bid]} button {body} px, liquid {liquid} px')
    json.dump(manifest, open(os.path.join(OUT, 'MANIFEST.json'), 'w'), indent=2)


if __name__ == '__main__':
    main()
