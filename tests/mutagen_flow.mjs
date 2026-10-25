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
  name: 'Aaron', players: ['Lex'], library: { 'Sol Ring': 1, 'Plains': 20 },
  decks: [
    { id: 'dm-1', name: 'Isamaru Rush', format: 'commander', commander: 'Isamaru, Hound of Konda', cards: [{ n: 'Plains', q: 99 }] },
    { id: 'dm-3', name: 'Lex Elves', format: 'commander', commander: 'Lathril, Blade of the Elves', player: 'Lex', cards: [{ n: 'Forest', q: 99 }] },
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

  // Artwork is large; wait for every home image to finish loading before checking it
  await page.waitForFunction(() => [...document.querySelectorAll('.mutagen-home img')].every(i => i.complete), null, { timeout: 30000 }).catch(() => {});
  // MUTAGEN home screen: supplied buttons over live liquid, logo and tagline, Continue off without a saved game
  const home = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll('.mutagen-home .mh-btn')].map(b => b.getAttribute('aria-label')),
    continueOff: document.querySelector('.mh-btn[data-act="continue"]').disabled,
    art: [...document.querySelectorAll('.mutagen-home img')].every(i => i.complete && i.naturalWidth > 0),
    chambers: document.querySelectorAll('.mutagen-home mutagen-chamber').length
  }));
  check('home shows the six buttons by name', home.buttons.join() === 'New Game,Continue,Deck Mutator,Profile,Settings,Help', home.buttons.join());
  check('Continue is off without a saved game', home.continueOff);
  check('home artwork loads (live logo, tagline, buttons, columns)', home.art && home.chambers === 9, JSON.stringify(home));

  // Preview of the home rebuilt after the approved master (?layout=master): master pipes and columns, same six buttons
  await page.goto(`${BASE}/commander/?layout=master`);
  await ready();
  await page.waitForFunction(() => [...document.querySelectorAll('.mh-stage img')].every(i => i.complete), null, { timeout: 30000 }).catch(() => {});
  const master = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll('.mh-stage .mh-btn')].map(b => b.getAttribute('aria-label')).join(),
    chambers: document.querySelectorAll('.mh-stage mutagen-chamber').length,
    art: [...document.querySelectorAll('.mh-stage img')].every(i => i.complete && i.naturalWidth > 0)
  }));
  check('master home preview: six buttons, live pipes, artwork loads', master.buttons === 'New Game,Continue,Deck Mutator,Profile,Settings,Help' && master.chambers === 15 && master.art, JSON.stringify(master));
  await page.click('.mh-stage [data-act="start"]');
  check('master home preview: New Game opens Choose Game Mode', await page.waitForSelector('.mode-select', { timeout: 5000 }).then(() => true, () => false));
  await page.goto(`${BASE}/commander/`);
  await ready();

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
  check("tablemate's deck listed with its owner", listed.includes('Lex Elves') && listed.includes("Lex's deck"), listed);
  await page.locator('.modal [data-deck]').first().click();
  check('picking it fills the commander', (await page.inputValue('[data-field="commander1"]')) === 'Isamaru, Hound of Konda');

  // Deck Mutator's combo data comes from this site (fresh browser: nothing saved yet)
  {
    const fresh = await browser.newContext(PHONE), p2 = await fresh.newPage();
    const combos = p2.waitForResponse(r => r.url().includes('/combos.json.gz'), { timeout: 60000 }).catch(() => null);
    await p2.goto(`${BASE}/deck/`);
    const combo = await combos;
    check('combo data loads from the MUTAGEN site', !!combo && combo.ok() && combo.url().startsWith(`${BASE}/deck/data/`), combo ? combo.url() : 'no request');
    await fresh.close();
  }

  // Opening Deck Mutator directly, Return lands on the home screen
  await page.goto(`${BASE}/deck/`);
  await page.locator('.mutagen-return').click();
  await page.waitForURL('**/commander/');
  await ready();
  check('direct visit returns to the home screen', await page.locator('.landing').count() === 1);

  // One profile: Deck Mutator's old name is adopted once, then the game side owns it
  await page.click('[data-act="profile"]');
  check('game profile adopted the Deck Mutator name', (await page.inputValue('#profileName')) === 'Aaron');
  const stats = await page.locator('.profile__stats').textContent();
  check('game profile shows Deck Mutator decks', /3\s*Decks/i.test(stats), stats);
  await page.fill('#profileName', 'Max');
  await page.click('[data-act="deck-mutator"]');
  await page.waitForURL('**/deck/');
  await page.click('[data-v="profile"]');
  const name = page.locator('#p-name');
  await name.waitFor();
  check('Deck Mutator shows the MUTAGEN name', (await name.inputValue()) === 'Max');
  check('Deck Mutator name is not edited separately', await name.evaluate(el => el.readOnly));
  const record = await page.locator('.mutagen-record').textContent();
  check('Deck Mutator profile shows the game record', record.includes('0 games'), record);
  await page.click('[data-mutagen="profile"]');
  await page.waitForURL('**/commander/');
  await ready();
  check('Open MUTAGEN profile lands on the game profile', await page.locator('.profile').count() === 1);

  // One backup file holds both sides
  const backup = await page.evaluate(async () => (await import('./src/data/profile-backup.js')).buildProfileBackup());
  check('backup includes Deck Mutator data', backup.deckMutator?.decks?.length === 3 && backup.profile?.account?.displayName === 'Max', JSON.stringify([backup.deckMutator?.decks?.map(d => d.name), backup.profile?.account?.displayName]));
  const restored = await page.evaluate(async b => {
    b.deckMutator.decks = b.deckMutator.decks.slice(0, 1);
    const file = new File([JSON.stringify(b)], 'x.ccsave', { type: 'application/json' });
    await (await import('./src/data/profile-backup.js')).restoreProfileBackupFile(file);
    return JSON.parse(localStorage.getItem('dc.profile')).decks.length;
  }, backup);
  check('restoring the backup restores Deck Mutator data', restored === 1, String(restored));

  check('no page errors', !errors.length, JSON.stringify(errors.slice(0, 3)));
} catch (error) {
  check('flow ran to the end', false, String(error));
} finally {
  await browser.close();
}
console.log(`${passed}/${passed + failed} passed`);
process.exit(failed ? 1 : 0);
