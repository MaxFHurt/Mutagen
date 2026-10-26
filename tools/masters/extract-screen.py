"""Cut an approved screen master into layers for live liquid, without drawing anything.

Owner: all screens should match their masters; assets may be recreated where necessary (2026-10-25/26). Every pixel
written here is the master's own. Usage, from the repo root:

  python3 tools/masters/extract-screen.py tools/masters/<screen>.json

The config names the master, the region to clear (the master's own logo, replaced by the adopted logo v2), the live
regions (each a rect with a flow direction), and the tap areas. It writes to ui/screens/<screen>/:

  static.png               the master's foreground (backdrop removed, logo cleared), live regions cut out of it
  <region>-overlay.png     that region's foreground with its liquid made clear, for live liquid behind it
  <region>-mask.png        R = liquid coverage, G = depth (0 at the glass edge, 255 deepest)
  layout.js                canvas, layers, regions and tap areas, for the page (generated, do not edit by hand)
  MANIFEST.json            hashes of everything above

Backdrop: the masters' backdrop is saturated blue/purple lightning and near-black; the artwork is neutral steel, black
outlines, green liquid and white lettering. Backdrop-coloured or near-black pixels connected to the canvas edge are
removed, as is any large backdrop area the frame encloses (one pixel of dark outline is kept). Liquid: green-dominant pixels in the foreground, including shaded liquid.
"""
import hashlib
import json
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
BACKDROP_MIN = 3000   # px: a backdrop-coloured area at least this big is backdrop even when enclosed by the frame


def hsv(rgb):
    r, g, b = [rgb[..., i] / 255.0 for i in range(3)]
    mx, mn = np.max(rgb, axis=2) / 255.0, np.min(rgb, axis=2) / 255.0
    d = mx - mn + 1e-9
    h = np.where(mx == r, ((g - b) / d) % 6, np.where(mx == g, (b - r) / d + 2, (r - g) / d + 4)) * 60
    s = np.where(mx > 0, (mx - mn) / (mx + 1e-9), 0)
    return h, s, mx


def foreground(rgb, lettering=()):
    hue, sat, val = hsv(rgb)
    dark = val < 0.14
    backdrop = ((hue >= 200) & (hue <= 330) & (sat > 0.22) & (val > 0.06)) | dark
    # Backdrop is what touches the canvas edge or is large: the frame can enclose backdrop, while purple and black inside
    # the artwork (letter outlines, glass edges) come in small pieces.
    lab, n = ndimage.label(backdrop)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = ndimage.sum(backdrop, lab, range(1, n + 1))
    big = {i + 1 for i, s in enumerate(sizes) if s >= BACKDROP_MIN}
    fg = ~np.isin(lab, list(edge | big))
    # Drop specks of backdrop texture that survived. Inside the config's lettering rects, small bright pieces are thin
    # letters and commas and stay. Larger lightning glints near the artwork are cleared by rect in the config.
    lab2, n2 = ndimage.label(fg)
    sizes2 = ndimage.sum(fg, lab2, range(1, n2 + 1))
    bright = ndimage.mean(val, lab2, range(1, n2 + 1))
    in_text = np.zeros_like(fg)
    for x, y, w, h in lettering:
        in_text[y:y + h, x:x + w] = True
    texty = ndimage.maximum(in_text, lab2, range(1, n2 + 1))
    fg = np.isin(lab2, [i + 1 for i, (s, v, t) in enumerate(zip(sizes2, bright, texty)) if s >= 60 or (t and s >= 4 and v > 0.5)])
    fg |= ndimage.binary_dilation(fg, iterations=1) & dark   # keep a one-pixel dark outline
    alpha = ndimage.gaussian_filter(fg.astype(float), 0.6)
    return np.clip((alpha - 0.15) / 0.7, 0, 1), fg, val


def liquid_mask(rgb, fg, val):
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    liquid = (g > 30) & (g > r * 1.35) & (g > b * 1.35) & ndimage.binary_erosion(fg, iterations=2)
    liquid = ndimage.binary_opening(liquid, iterations=1)
    lab, n = ndimage.label(liquid)
    sizes = ndimage.sum(liquid, lab, range(1, n + 1))
    liquid = np.isin(lab, [i + 1 for i, s in enumerate(sizes) if s >= 40])
    liquid = ndimage.binary_closing(liquid, iterations=1) & fg
    holes, nh = ndimage.label(ndimage.binary_fill_holes(liquid) & ~liquid)
    for i in range(1, nh + 1):
        m = holes == i
        if m.sum() <= 400 and g[m].mean() > r[m].mean() * 1.08 and g[m].mean() > b[m].mean() * 1.08 and val[m].mean() < 0.62:
            liquid |= m
    dist = ndimage.distance_transform_edt(liquid)
    depth = np.zeros_like(dist)
    lab2, n2 = ndimage.label(liquid)
    for i in range(1, n2 + 1):
        m = lab2 == i
        depth[m] = dist[m] / max(dist[m].max(), 1)
    return liquid, depth


def save(img, path, mode):
    Image.fromarray(img, mode).save(path, optimize=True)
    return hashlib.sha256(open(path, 'rb').read()).hexdigest()


def main(config_path):
    cfg = json.load(open(config_path))
    name = cfg['screen']
    out = os.path.join(ROOT, 'ui/screens', name)
    os.makedirs(out, exist_ok=True)
    src = os.path.join(ROOT, cfg['master'])
    rgb = np.array(Image.open(src).convert('RGB')).astype(float)
    H, W = rgb.shape[:2]
    alpha, fg, val = foreground(rgb, cfg.get('lettering', []))
    for x, y, w, h in cfg.get('clear', []):          # the master's own logo, replaced by logo v2 on the page
        alpha[y:y + h, x:x + w] = 0
        fg[y:y + h, x:x + w] = False
    liquid, depth = liquid_mask(rgb, fg, val)
    rgba = np.dstack([rgb, alpha * 255]).astype(np.uint8)
    hashes, regions = {}, []
    static = rgba.copy()
    for reg in cfg['regions']:
        x, y, w, h = reg['rect']
        crop = rgba[y:y + h, x:x + w].copy()
        liq = liquid[y:y + h, x:x + w]
        crop[..., 3] = np.where(liq, 0, crop[..., 3])
        mask = np.dstack([liq * 255, (depth[y:y + h, x:x + w] * 255).round(), np.zeros((h, w))]).astype(np.uint8)
        hashes[reg['id'] + '-overlay.png'] = save(crop, os.path.join(out, reg['id'] + '-overlay.png'), 'RGBA')
        hashes[reg['id'] + '-mask.png'] = save(mask, os.path.join(out, reg['id'] + '-mask.png'), 'RGB')
        static[y:y + h, x:x + w, 3] = 0
        regions.append({**reg, 'liquid_px': int(liq.sum())})
    left = int((liquid & (static[..., 3] > 0)).sum())
    hashes['static.png'] = save(static, os.path.join(out, 'static.png'), 'RGBA')
    layout = {'screen': name, 'master': cfg['master'], 'canvas': [W, H], 'regions': regions, 'slots': cfg.get('slots', {}),
              'taps': cfg.get('taps', [])}
    with open(os.path.join(out, 'layout.js'), 'w') as f:
        f.write(f'// {name}: layers cut from {cfg["master"]} by tools/masters/extract-screen.py. Generated, do not edit.\n')
        f.write('export default ' + json.dumps(layout, indent=2) + ';\n')
    hashes['layout.js'] = hashlib.sha256(open(os.path.join(out, 'layout.js'), 'rb').read()).hexdigest()
    json.dump({'master': cfg['master'], 'master_sha256': hashlib.sha256(open(src, 'rb').read()).hexdigest(),
               'files': hashes}, open(os.path.join(out, 'MANIFEST.json'), 'w'), indent=2)
    for reg in regions:
        print(f"{reg['id']:12s} {reg['rect']} flow {reg['flow']:5s} liquid {reg['liquid_px']} px")
    print(f'liquid left outside live regions: {left} px (should be about 0)')


if __name__ == '__main__':
    main(sys.argv[1])
