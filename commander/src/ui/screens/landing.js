import { html, setHtml, on } from '../dom.js';
import { go } from '../../app/router.js';
import { VERSION } from '../../version.js';
import { loadRecord } from '../../data/store.js';
import { TRACKER_SAVE_KEY } from '../../game/tracker.js';
import { GAME_SAVE_KEY } from '../../game/save-keys.js';
import { openJudge } from '../judge-modal.js';
import { openSettings } from '../settings-modal.js';
import { toast } from '../toast.js';
import { openDeckMutator } from '../../mutagen/bridge.js';
import '../../../../ui/liquid/liquid.js';   // MUTAGEN live liquid (<mutagen-chamber>)
import { CANVAS, PIECES, CONTROLS } from '../../../../ui/home/master-layout.js';

// Place a box from the master canvas on the stage, in percent so the stage can scale.
const at = ([x, y, w, h]) => `left:${(100 * x) / CANVAS[0]}%;top:${(100 * y) / CANVAS[1]}%;width:${(100 * w) / CANVAS[0]}%;height:${(100 * h) / CANVAS[1]}%`;
// Fit art of a given shape inside a master slot, centred, without stretching.
function fit([x, y, w, h], aspect) {
  const fw = Math.min(w, h * aspect), fh = fw / aspect;
  return [x + (w - fw) / 2, y + (h - fh) / 2, fw, fh];
}

function masterHome(ui) {
  const pipe = p => p.liquid
    ? html`<mutagen-chamber class="mh-piece" style="${at(p.rect)}" shell="home-${p.id}" flow="${p.flow}" stream overlay="${ui}piping/home/${p.file}"></mutagen-chamber>`
    : html`<img class="mh-piece" style="${at(p.rect)}" src="${ui}piping/home/${p.file}" alt="">`;
  // The master's own buttons, cut from the master (tools/home-buttons/extract.py), in their exact slots over live liquid.
  const btn = (slot, act, file, name, disabled = false) => html`<button type="button" class="mh-btn mh-slot" style="${at(CONTROLS[slot])}" data-act="${act}" aria-label="${name}" ${disabled ? 'disabled' : ''}>
    <mutagen-chamber shell="home-button-${slot}" flow="right" stream overlay="${ui}buttons-master/home/animation-overlay/button-${file}.png">${name}</mutagen-chamber></button>`;
  return html`
    <main class="landing mutagen-home mh-master">
      <div class="mh-stage">
        ${PIECES.map(pipe)}
        <mutagen-chamber class="mh-slot" style="${at(fit(CONTROLS.logo, 1))}" shell="logo-v2" flow="none" overlay="${ui}branding/logo-mutagen-v2-overlay.png">MUTAGEN</mutagen-chamber>
        <img class="mh-slot" style="${at(fit(CONTROLS.tagline, 2231 / 288))}" src="${ui}labels/label-tagline.png" alt="Mutate The Gathering">
        ${btn('new-game', 'start', 'new-game', 'New Game')}
        ${btn('continue', 'continue', 'continue', 'Continue', true)}
        ${btn('deck-mutator', 'decks', 'deck-mutator', 'Deck Mutator')}
        ${btn('profile', 'profile', 'profile', 'Profile')}
        ${btn('settings', 'settings', 'settings', 'Settings')}
        ${btn('help', 'help', 'help', 'Help')}
      </div>
      <div class="landing__foot">MUTAGEN • ${VERSION}</div>
    </main>`;
}

/** Most recent saved session of either kind, or null. */
async function latestSave() {
  const [tracker, game] = await Promise.all([loadRecord(TRACKER_SAVE_KEY), loadRecord(GAME_SAVE_KEY)]);
  const rows = [];
  if (tracker && !tracker.result) rows.push({ screen: 'tracker', at: Date.parse(tracker.savedAt || tracker.startedAt || 0) || 0 });
  if (game && game.status !== 'complete') rows.push({ screen: 'game', at: Date.parse(game.savedAt || 0) || 0 });
  rows.sort((a, b) => b.at - a.at);
  return rows[0] || null;
}

export const landingScreen = {
  mount(root) {
    // MUTAGEN home (approved landing layout): logo and tagline, three main buttons, three tool buttons, live sight
    // columns at the sides. Buttons are the supplied finished artwork with clear glass over the live liquid; iPad and
    // other large screens use the full-resolution set, phones the half-resolution set.
    const ui = '../ui/', set = Math.min(screen.width, screen.height) >= 700 ? 'buttons' : 'buttons-iphone';
    const btn = (act, file, name, disabled = false) => html`<button type="button" class="mh-btn" data-act="${act}" aria-label="${name}" ${disabled ? 'disabled' : ''}>
      <mutagen-chamber shell="canister" stream overlay="${ui}${set}/home/animation-overlay/button-${file}.png">${name}</mutagen-chamber></button>`;
    // The home rebuilt after the approved master (owner, rev 052-053): the master's own pipes, columns and buttons at
    // their supplied positions on a stage that keeps the master's shape. ?layout=classic shows the previous layout.
    if (new URLSearchParams(location.search).get('layout') !== 'classic') setHtml(root, masterHome(ui));
    else setHtml(root, html`
      <main class="landing mutagen-home">
        <mutagen-chamber class="mh-column mh-column--left" shell="sight-column" flow="down" stream></mutagen-chamber>
        <div class="mh-center">
          <div class="mh-brand">
            <mutagen-chamber class="mh-logo" shell="logo-v2" flow="none" overlay="${ui}branding/logo-mutagen-v2-overlay.png">MUTAGEN</mutagen-chamber>
            <img class="mh-tagline" src="${ui}labels/label-tagline.png" alt="Mutate The Gathering">
          </div>
          <div class="mh-primary">
            ${btn('start', 'new-game', 'New Game')}
            ${btn('continue', 'continue', 'Continue', true)}
            ${btn('decks', 'deck-mutator', 'Deck Mutator')}
          </div>
          <nav class="mh-tools" aria-label="Tools">
            ${btn('profile', 'profile', 'Profile')}
            ${btn('settings', 'settings', 'Settings')}
            ${btn('help', 'help', 'Help')}
          </nav>
        </div>
        <mutagen-chamber class="mh-column mh-column--right" shell="sight-column" flow="up" stream></mutagen-chamber>
        <div class="landing__foot">MUTAGEN • ${VERSION}</div>
      </main>`);

    let resume = null;
    latestSave().then(save => {
      resume = save;
      const button = root.querySelector('[data-act="continue"]');
      if (button) button.disabled = !save;
    });

    return on(root, 'click', '[data-act]', (event, el) => {
      switch (el.dataset.act) {
        case 'start': return go('mode-select');
        case 'continue': return resume ? go(resume.screen, { resume: true }) : toast('No saved game yet.');
        case 'profile': return go('profile');
        case 'decks': return openDeckMutator({ screen: 'landing' });
        case 'settings': return openSettings();
        case 'help': return openJudge();
      }
    });
  }
};
