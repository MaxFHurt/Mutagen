"""Turn a supplied kit's LAYOUT.json into a module the app imports: ui/kits/<kit>/layout.js.

Data only; no image is changed. Each piece gets `liquid: true` when its supplied liquid mask has any coverage, so
solid steel pieces are shown as their assembled image and liquid-carrying ones get live liquid behind their overlay.
Run from the repo root after installing or replacing a kit:  python3 tools/kits/layout-module.py home mode-select
"""
import json
import os
import sys

import numpy as np
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

for kit in sys.argv[1:]:
    d = os.path.join(ROOT, 'ui/kits', kit)
    layout = json.load(open(os.path.join(d, 'LAYOUT.json')))
    for p in layout['pieces']:
        mask = p.get('files', {}).get('mask')
        p['liquid'] = bool(mask) and bool((np.array(Image.open(os.path.join(d, mask)).convert('RGB'))[..., 0] > 127).any())
    with open(os.path.join(d, 'layout.js'), 'w') as f:
        f.write(f'// {kit}: generated from LAYOUT.json (supplied by ChatGPT) by tools/kits/layout-module.py. Do not edit.\n')
        f.write('export default ' + json.dumps(layout, indent=2) + ';\n')
    print(kit, sum(p['liquid'] for p in layout['pieces']), 'liquid pieces of', len(layout['pieces']))
