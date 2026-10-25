// MUTAGEN round trip between the game side (/commander/) and Deck Mutator (/deck/), both apps for real.
// Serve the repository root first:  python3 -m http.server 4190 --bind 127.0.0.1
// Run:  node tests/mutagen_flow.mjs [baseURL]
// Playwright comes from the global install (PW=/path/to/playwright to override).

import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || '/opt/node22/lib/node_modules/playwright');
const BASE = process.argv[2] || 'http://127.0.0.1:4190';
const PHONE = { viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true };

let passed = 0, failed = 0;
function check(name, ok, detail = '') {
  if (ok) { passed++; console.log(`  ok  ${name}`); } else { failed++; console.log(`FAIL  ${name} ${detail}`); }
}

const MUTATOR = {
  decks: [
    { id: 'dm-1', name: 'Isamaru Rush', format: 'commander', commander: 'Isamaru, Hound of Konda', cards: [{ n: 'Plains', q: 99 }] },
    { id: 'dm-2', name: 'Standard Brew', format: 'standard', commander: '', cards: [{ n: 'Plains', q: 60 }] }
  ]
};

const browser = await chromium.launch(process.env.PW ? {} : { executablePath: '/opt/pw-browsers/chromium' });
const ctx = await browser.newContext(PHONE);
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
const ready = () => page.waitForFunction(() => window.__ccReady === true, null, { timeout: 15000 });

try {
  await page.goto(`${BASE}/commander/`);
  await ready();
  await page.evaluate(p => localStorage.setItem('dc.profile', JSON.stringify(p)), MUTATOR);

  // Landing → Deck Mutator → back to landing
  await page.click('[data-act="decks"]');
  await page.waitForURL('**/deck/');
  const back = page.locator('.mutagen-return');
  check('Deck Mutator shows Return to MUTAGEN', await back.isVisible());
  await back.click();
  await page.waitForURL('**/commander/');
  await ready();
  check('return reopens the home screen', await page.locator('.landing').count() === 1);

  // Player setup → Deck Mutator → back to the same setup
  await page.click('[data-act="start"]');
  await page.click('[data-mode="fully-tracked"]');
  await page.click('[data-play="local"]');
  await page.fill('[data-field="name"]', 'Aaron');
  await page.click('[data-act="deck-mutator"]');
  await page.waitForURL('**/deck/');
  await page.locator('.mutagen-return').click();
  await page.waitForURL('**/commander/');
  await ready();
  check('return reopens player setup', await page.locator('.page--setup').count() === 1);
  check('player setup keeps the typed name', (await page.inputValue('[data-field="name"]')) === 'Aaron');

  // Saved decks are Deck Mutator's Commander decks only
  await page.click('[data-seat-act="saved"]');
  const listed = await page.locator('.modal .option-list').textContent();
  check('Deck Mutator Commander deck listed', listed.includes('Isamaru Rush'), listed);
  check('Standard deck not offered for Commander play', !listed.includes('Standard Brew'), listed);
  await page.locator('.modal [data-deck]').first().click();
  check('picking it fills the commander', (await page.inputValue('[data-field="commander1"]')) === 'Isamaru, Hound of Konda');

  // Opening Deck Mutator directly, Return lands on the home screen
  await page.goto(`${BASE}/deck/`);
  await page.locator('.mutagen-return').click();
  await page.waitForURL('**/commander/');
  await ready();
  check('direct visit returns to the home screen', await page.locator('.landing').count() === 1);

  check('no page errors', !errors.length, JSON.stringify(errors.slice(0, 3)));
} catch (error) {
  check('flow ran to the end', false, String(error));
} finally {
  await browser.close();
}
console.log(`${passed}/${passed + failed} passed`);
process.exit(failed ? 1 : 0);
