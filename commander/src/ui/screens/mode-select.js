import { html, setHtml, on } from '../dom.js';
import { go } from '../../app/router.js';
import { openModal } from '../modal.js';
import { openJudge } from '../judge-modal.js';
import { openSettings } from '../settings-modal.js';
import { kitStage, kitFor } from '../../mutagen/kit-stage.js';

function pickRemoteCount(onPick) {
  openModal({
    title: 'How many players?', size: 'small',
    body: html`<div class="grid-3">${[2, 3, 4, 5, 6].map(n => html`<button type="button" class="option" data-n="${n}"><span><strong>${n} players</strong></span></button>`)}</div>`,
    onMount(el, { close }) { on(el, 'click', '[data-n]', (e, b) => { close(); onPick(Number(b.dataset.n)); }); }
  });
}

// Choose Game Mode: the supplied kit (ui/kits/mode-select/, ChatGPT revision 02, after the approved game-mode master)
// with live liquid in its pipes and buttons and the live logo. Same buttons, menus and actions as before.
export const modeSelectScreen = {
  mount(root) {
    setHtml(root, html`
      <main class="mode-select kit-screen" aria-label="Choose game mode">
        <h1 class="visually-hidden">Choose game mode</h1>
        ${kitStage(kitFor('mode-select'), 'mode-select', {
          'fully-guided': { mode: 'fully-tracked', name: 'Fully Guided: rules-aware play and guidance' },
          freeplay: { mode: 'freeplay', name: 'Freeplay: create, test, and play' },
          'table-tracker': { mode: 'table-tracker', name: 'Table Tracker: track life, counters, and your table' },
          back: { act: 'back', name: 'Back' },
          profile: { act: 'profile', name: 'Profile' },
          settings: { act: 'settings', name: 'Settings' },
          help: { act: 'help', name: 'Help' }
        })}
      </main>`);
    const offBack = on(root, 'click', '[data-act]', (event, el) => {
      switch (el.dataset.act) {
        case 'back': return go('landing');
        case 'profile': return go('profile');
        case 'settings': return openSettings();
        case 'help': return openJudge();
      }
    });
    const offMode = on(root, 'click', '[data-mode]', (event, el) => {
      const mode = el.dataset.mode;
      if (mode === 'table-tracker') {
        return openModal({
          title: 'Table Tracker',
          body: html`<div class="option-list">
            <button type="button" class="option" data-track="local"><span><strong>One device</strong><small>Track the whole table on this device</small></span></button>
            <button type="button" class="option" data-track="host-player"><span><strong>Host a table — I am playing too</strong><small>Players track their own seat on their phones; you get the host tools and Judge mode</small></span></button>
            <button type="button" class="option" data-track="host-device"><span><strong>Host device — table view</strong><small>This device shows the whole table and acts as judge</small></span></button>
            <button type="button" class="option" data-track="join"><span><strong>Join a table</strong><small>Enter the code shown on the host device</small></span></button>
          </div>`,
          onMount(box, { close }) {
            on(box, 'click', '[data-track]', (e, b) => { close(); b.dataset.track === 'join' ? go('tracker-join') : go('tracker-setup', { play: b.dataset.track }); });
          }
        });
      }
      openModal({
        title: mode === 'freeplay' ? 'Free Play' : 'Guided Play',
        body: html`<div class="option-list">
          <button type="button" class="option" data-play="local"><span><strong>One device</strong><small>Everyone shares this device and passes it around</small></span></button>
          <button type="button" class="option" data-play="host-player"><span><strong>Host a room — I am playing too</strong><small>Other players join from their own devices; you get the host tools</small></span></button>
          <button type="button" class="option" data-play="host-device"><span><strong>Host device — table view</strong><small>This device shows the battlefield for everyone and acts as judge. It never shows hands</small></span></button>
          <button type="button" class="option" data-play="join"><span><strong>Join a room</strong><small>Enter the code shown on the host device</small></span></button>
        </div>`,
        onMount(el, { close }) {
          on(el, 'click', '[data-play]', (e, b) => {
            close();
            const play = b.dataset.play;
            if (play === 'join') return go('join');
            if (play === 'host-device') return pickRemoteCount(count => go('lobby', { mode, hostDevice: true, localSeats: [], remoteSeats: count }));
            go('player-setup', { mode, play });
          });
        }
      });
    });
    return () => { offBack(); offMode(); };
  }
};
