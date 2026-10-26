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
import { kitStage, kitFor } from '../../mutagen/kit-stage.js';

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
    // MUTAGEN home: the supplied home kit (ui/kits/home/, ChatGPT revision 02, after the approved landing master) with
    // live liquid in its pipes and buttons and the live logo. Same buttons and actions as before.
    setHtml(root, html`
      <main class="landing mutagen-home kit-screen">
        ${kitStage(kitFor('home'), 'home', {
          'new-game': { act: 'start', name: 'New Game' },
          continue: { act: 'continue', name: 'Continue', disabled: true },
          'deck-mutator': { act: 'decks', name: 'Deck Mutator' },
          profile: { act: 'profile', name: 'Profile' },
          settings: { act: 'settings', name: 'Settings' },
          help: { act: 'help', name: 'Help' }
        })}
        <div class="landing__foot kit-foot">MUTAGEN • ${VERSION}</div>
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
