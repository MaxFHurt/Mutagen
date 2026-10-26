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
    buttons: [...document.querySelectorAll('.mutagen-home .kit-btn')].map(b => b.getAttribute('aria-label')),
    continueOff: document.querySelector('.kit-btn[data-act="continue"]').disabled,
    art: [...document.querySelectorAll('.mutagen-home img')].every(i => i.complete && i.naturalWidth > 0),
    chambers: document.querySelectorAll('.mutagen-home mutagen-chamber').length
  }));
  check('home shows the six buttons by name', home.buttons.join() === 'New Game,Continue,Deck Mutator,Profile,Settings,Help', home.buttons.join());
  check('Continue is off without a saved game', home.continueOff);
  check('Continue, when off, has no ooze and its steel at full strength', await page.evaluate(() => {
    const c = document.querySelector('.kit-btn[data-act="continue"]'), shown = [...c.children].filter(e => getComputedStyle(e).display !== 'none');
    return shown.length === 1 && shown[0].classList.contains('kit-empty') && Number(getComputedStyle(shown[0]).opacity) === 1 && Number(getComputedStyle(c).opacity) === 1;
  }));
  check('home kit loads (background, pipes, buttons, live liquid, live logo)', home.art && home.chambers === 15, JSON.stringify(home));


  // Choose Game Mode kit: seven named buttons over live liquid, menus and Back still work
  await page.click('[data-act="start"]');
  await page.waitForSelector('.mode-select');
  await page.waitForFunction(() => [...document.querySelectorAll('.mode-select img')].every(i => i.complete), null, { timeout: 30000 }).catch(() => {});
  const mode = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll('.mode-select .kit-btn')].map(b => b.dataset.mode || b.dataset.act).join(),
    chambers: document.querySelectorAll('.mode-select mutagen-chamber').length,
    art: [...document.querySelectorAll('.mode-select img')].every(i => i.complete && i.naturalWidth > 0)
  }));
  check('game mode kit: seven buttons, live liquid, artwork loads', mode.buttons === 'fully-tracked,freeplay,table-tracker,back,profile,settings,help' && mode.chambers === 16 && mode.art, JSON.stringify(mode));
  await page.click('[data-mode="table-tracker"]');
  check('game mode: Table Tracker opens its menu', await page.waitForSelector('[data-track="local"]', { timeout: 5000 }).then(() => true, () => false));
  await page.click('.modal [data-modal-back]');
  await page.waitForSelector('[data-track="local"]', { state: 'detached', timeout: 5000 }).catch(() => {});
  await page.click('.mode-select [data-act="back"]');
  check('game mode: Back returns home', await page.waitForSelector('.mutagen-home', { timeout: 5000 }).then(() => true, () => false));

  // Landing → Deck Mutator → back to landing
  await page.click('[data-act="decks"]');
  await page.waitForURL('**/deck/');
  const back = page.locator('.mutagen-return');
  check('Deck Mutator shows Return to MUTAGEN', await back.isVisible());
  // One installed app: Deck Mutator works offline and installs as MUTAGEN, covering the whole site
  const deckApp = await page.evaluate(async () => {
    const reg = await Promise.race([navigator.serviceWorker.ready, new Promise(r => setTimeout(() => r(null), 8000))]);
    const m = await (await fetch(document.querySelector('link[rel="manifest"]').href)).json();
    return { sw: reg ? new URL(reg.scope).pathname : null, name: m.name, scope: new URL(m.scope, document.querySelector('link[rel="manifest"]').href).pathname, start: new URL(m.start_url, document.querySelector('link[rel="manifest"]').href).pathname };
  });
  check('Deck Mutator offline cache registers', /\/deck\/$/.test(deckApp.sw || ''), JSON.stringify(deckApp));
  check('Deck Mutator installs as MUTAGEN, starting on the home screen', deckApp.name === 'MUTAGEN' && /\/commander\/$/.test(deckApp.start) && !/(commander|deck)\/$/.test(deckApp.scope), JSON.stringify(deckApp));
  await back.click();
  await page.waitForURL('**/commander/');
  await ready();
  check('return reopens the home screen', await page.locator('.landing').count() === 1);
  const gameApp = await page.evaluate(async () => {
    const href = document.querySelector('link[rel="manifest"]').href, m = await (await fetch(href)).json();
    return { name: m.name, scope: new URL(m.scope, href).pathname };
  });
  check('MUTAGEN install covers Deck Mutator too', gameApp.name === 'MUTAGEN' && !/(commander|deck)\/$/.test(gameApp.scope), JSON.stringify(gameApp));

  // Settings: Still liquid and Softer green set the liquid's modes, and stay set after a reload
  await page.click('[data-act="settings"]');
  await page.click('[data-toggle="stillLiquid"]');
  await page.click('[data-toggle="softGreen"]');
  const prefsOn = await page.evaluate(() => [document.documentElement.dataset.motion, document.documentElement.dataset.green].join());
  await page.reload(); await ready();
  const prefsKept = await page.evaluate(() => [document.documentElement.dataset.motion, document.documentElement.dataset.green].join());
  check('Still liquid and Softer green apply and are kept', prefsOn === 'reduced,reduced' && prefsKept === 'reduced,reduced', prefsOn + ' / ' + prefsKept);
  await page.click('[data-act="settings"]');
  await page.click('[data-toggle="stillLiquid"]');
  await page.click('[data-toggle="softGreen"]');
  check('turning them off restores the moving, full green liquid', await page.evaluate(() => !document.documentElement.dataset.motion && !document.documentElement.dataset.green));
  await page.click('.modal [data-modal-back]');

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

  // Kit contract (docs/KIT-CONTRACT.md): a player-setup kit plugs in with the same controls. The test kit only points at
  // the installed mode-select kit's images, so no artwork is made for it.
  await page.goto(`${BASE}/commander/`);
  await ready();
  await page.evaluate(async () => {
    const kits = (await import('../ui/kits/index.js')).default, src = '../mode-select/buttons/back/';
    const btn = (id, x, y) => ({ id, type: 'buttons', rect: [x, y, 728, 214], files: { assembled: src + 'assembled.png', overlay: src + 'clear-glass-overlay.png', mask: src + 'liquid-mask.png', pressed: src + 'pressed.png', disabled: src + 'disabled.png' }, liquid: true });
    kits['player-setup'] = { canvas: { width: 3344, height: 1882 }, background: '../mode-select/background-clean.png', pieces: [
      btn('back', 252, 1612), btn('deck-mutator', 1300, 1612), btn('continue', 2376, 1612), btn('open-room', 2376, 1612),
      btn('add-player', 252, 1300), btn('remove-player', 252, 1080), btn('remote-minus', 252, 860), btn('remote-plus', 1000, 860),
      btn('saved-decks', 1300, 200), btn('precon-catalog', 2050, 200), btn('paste-list', 1300, 420), btn('view-deck', 2050, 420),
      { id: 'tabs', type: 'panel', rect: [252, 200, 950, 640] }, { id: 'form', type: 'panel', rect: [1300, 640, 1780, 900] },
      { id: 'note', type: 'panel', rect: [252, 1540, 2800, 60] }, { id: 'remote-count', type: 'panel', rect: [1750, 860, 600, 200] }] };
  });
  await page.click('[data-act="start"]'); await page.click('[data-mode="fully-tracked"]'); await page.click('[data-play="local"]');
  await page.waitForSelector('.page--setup.kit-screen');
  const kitSetup = await page.evaluate(() => ({
    buttons: [...document.querySelectorAll('.page--setup .kit-btn')].map(b => b.dataset.kit).join(),
    panels: [...document.querySelectorAll('.page--setup .kit-panel')].map(p => p.dataset.panel + ':' + (p.children.length > 0)).join(),
    formOwnSaved: getComputedStyle(document.querySelector('.kit-panel [data-seat-act="saved"]')).display
  }));
  check('kit contract: player setup shows its local controls on the kit', kitSetup.buttons === 'back,deck-mutator,continue,add-player,saved-decks,precon-catalog,paste-list', JSON.stringify(kitSetup));
  check('kit contract: tabs, form and note go in their panels; the form does not repeat kit buttons', kitSetup.panels.startsWith('tabs:true,form:true,note:true') && kitSetup.formOwnSaved === 'none', JSON.stringify(kitSetup));
  await page.fill('.kit-panel [data-field="name"]', 'Kit Tester');
  check('kit contract: typing a name updates the player tab', (await page.textContent('.setup__tab.is-on b')).trim() === 'Kit Tester');
  await page.click('.kit-btn[data-kit="add-player"]');
  check('kit contract: Add player adds a seat and shows Remove', await page.evaluate(() => document.querySelectorAll('.setup__tab').length === 3 && !!document.querySelector('.kit-btn[data-kit="remove-player"]')));
  await page.click('.kit-btn[data-kit="saved-decks"]');
  check('kit contract: the kit Saved decks button opens the saved-deck picker', await page.waitForSelector('.modal', { timeout: 5000 }).then(() => true, () => false));
  await page.click('.modal [data-modal-back]');
  await page.click('.kit-btn[data-kit="back"]');
  check('kit contract: Back returns to Choose Game Mode', await page.waitForSelector('.mode-select', { timeout: 5000 }).then(() => true, () => false));

  check('no page errors', !errors.length, JSON.stringify(errors.slice(0, 3)));
} catch (error) {
  check('flow ran to the end', false, String(error));
} finally {
  await browser.close();
}
console.log(`${passed}/${passed + failed} passed`);
process.exit(failed ? 1 : 0);
