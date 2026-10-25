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
    setHtml(root, html`
      <main class="landing mutagen-home">
        <mutagen-chamber class="mh-column mh-column--left" shell="sight-column" flow="down" stream></mutagen-chamber>
        <div class="mh-center">
          <div class="mh-brand">
            <img class="mh-logo" src="${ui}branding/logo-mutagen-v2.png" alt="MUTAGEN">
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
