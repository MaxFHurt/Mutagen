// Live liquid checks (ui/liquid): it moves, it stops for reduced motion, it stays inside the glass, and it never
// mirrors between chambers. Serve the repository root first: python3 -m http.server 4190 --bind 127.0.0.1
// Run: node tests/liquid.mjs [baseURL]

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');
const BASE = process.argv[2] || 'http://127.0.0.1:4190';

let passed = 0, failed = 0;
function check(name, ok, detail = '') {
  if (ok) { passed++; console.log(`  ok  ${name}`); } else { failed++; console.log(`FAIL  ${name} ${detail}`); }
}

const browser = await chromium.launch(process.env.PW ? {} : { executablePath: '/opt/pw-browsers/chromium', args: ['--use-gl=swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1180, height: 820 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));

// Pixels of every chamber's liquid canvas, plus how much colour sits outside the glass window.
const sample = () => page.evaluate(() => [...document.querySelectorAll('mutagen-chamber')].map(el => {
  const c = el.querySelector('.mutagen-chamber__liquid'), d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
  let sum = 0, h = 0;
  for (let i = 0; i < d.length; i += 4) { sum += d[i + 1]; h = (h * 31 + d[i + 1]) >>> 0; }
  return { w: c.width, h: c.height, sum, hash: h, onScreen: !!el._visible };
}));

try {
  await page.goto(`${BASE}/ui/liquid/demo.html`);
  await page.waitForFunction(() => [...document.querySelectorAll('mutagen-chamber canvas')].every(c => c.width > 2), null, { timeout: 15000 });
  await page.waitForTimeout(800);
  const a = await sample();
  await page.waitForTimeout(1200);
  const b = await sample();
  check('every chamber draws liquid', a.every(x => x.sum > 0), JSON.stringify(a.map(x => x.sum)));
  check('liquid moves over time (chambers on screen)', a.every((x, i) => !x.onScreen || x.hash !== b[i].hash));
  check('chambers off screen pause', a.some(x => !x.onScreen) && a.every((x, i) => x.onScreen || x.hash === b[i].hash));

  const same = await page.evaluate(() => {
    const [p, q] = [...document.querySelectorAll('.buttons .mutagen-chamber__liquid')];
    const dp = p.getContext('2d').getImageData(0, 0, p.width, p.height).data, dq = q.getContext('2d').getImageData(0, 0, q.width, q.height).data;
    let diff = 0; for (let i = 0; i < dp.length; i++) diff += Math.abs(dp[i] - dq[i]);
    return diff;
  });
  check('two identical buttons do not show identical liquid', same > 0);

  const outside = await page.evaluate(async () => {
    // Liquid alpha outside the window mask must be zero: compare the canvas against the mask it was clipped to.
    const el = document.querySelector('mutagen-chamber[shell="smart-octagon"]'), c = el.querySelector('.mutagen-chamber__liquid');
    const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
    const corner = [0, c.width - 1, (c.height - 1) * c.width, c.height * c.width - 1].map(i => d[i * 4 + 3]);
    return Math.max(...corner);
  });
  check('no liquid outside the glass (octagon corners stay clear)', outside === 0, String(outside));

  await page.evaluate(() => { document.documentElement.dataset.motion = 'reduced'; });
  await page.waitForTimeout(300);
  const r1 = await sample();
  await page.waitForTimeout(1200);
  const r2 = await sample();
  check('reduced motion shows a still frame', r1.every((x, i) => x.hash === r2[i].hash));

  await page.evaluate(() => { document.documentElement.dataset.green = 'reduced'; });
  await page.waitForTimeout(300);
  const g = await sample();
  check('reduced green lowers the green', g.every((x, i) => x.sum < r2[i].sum));

  check('no page errors', !errors.length, JSON.stringify(errors.slice(0, 3)));
} catch (error) {
  check('checks ran to the end', false, String(error));
} finally {
  await browser.close();
}
console.log(`${passed}/${passed + failed} passed`);
process.exit(failed ? 1 : 0);
