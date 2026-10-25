import { html, setHtml, on } from '../dom.js';
import { go } from '../../app/router.js';
import { openModal } from '../modal.js';
import { openJudge } from '../judge-modal.js';
import { openSettings } from '../settings-modal.js';
import '../../../../ui/liquid/liquid.js';   // MUTAGEN live liquid (<mutagen-chamber>)

function pickRemoteCount(onPick) {
  openModal({
    title: 'How many players?', size: 'small',
    body: html`<div class="grid-3">${[2, 3, 4, 5, 6].map(n => html`<button type="button" class="option" data-n="${n}"><span><strong>${n} players</strong></span></button>`)}</div>`,
    onMount(el, { close }) { on(el, 'click', '[data-n]', (e, b) => { close(); onPick(Number(b.dataset.n)); }); }
  });
}

// MUTAGEN frame (as the home screen): live sight columns, logo and tagline, the three mode cards, and a bottom row with
// Back and the supplied PROFILE / SETTINGS / HELP buttons over the live liquid. The mode cards and Back stay the existing
// artwork until MUTAGEN versions are supplied; nothing is redrawn here.
export const modeSelectScreen = {
  mount(root) {
    const ui = '../ui/', set = Math.min(screen.width, screen.height) >= 700 ? 'buttons' : 'buttons-iphone';
    const tool = (act, file, name) => html`<button type="button" class="mh-btn" data-act="${act}" aria-label="${name}">
      <mutagen-chamber shell="canister" stream overlay="${ui}${set}/home/animation-overlay/button-${file}.png">${name}</mutagen-chamber></button>`;
    setHtml(root, html`
      <main class="mode-select mutagen-mode" aria-label="Choose game mode">
        <mutagen-chamber class="mh-column mh-column--left" shell="sight-column" flow="down" stream></mutagen-chamber>
        <div class="mm-center">
          <div class="mm-brand">
            <img class="mm-logo" src="${ui}branding/logo-mutagen-v2.png" alt="MUTAGEN">
            <img class="mm-tagline" src="${ui}labels/label-tagline.png" alt="Mutate The Gathering">
            <h1 class="visually-hidden">Choose game mode</h1>
          </div>
          <div class="mode-select__choices">
            <button type="button" data-mode="fully-tracked"><img src="assets/img/mode/guided.png" alt="Fully Guided — Rulebook enforced guided games."></button>
            <button type="button" data-mode="freeplay"><img src="assets/img/mode/freeplay.png" alt="Free Play — Create, Test, and Play."></button>
            <button type="button" data-mode="table-tracker"><img src="assets/img/mode/tracker.png" alt="Table Tracker — Shared table tracking."></button>
          </div>
          <div class="mm-tools">
            <button class="btn-back mm-back" type="button" data-act="back" aria-label="Back"><img src="assets/img/ui/back.png" alt="Back"></button>
            ${tool('profile', 'profile', 'Profile')}${tool('settings', 'settings', 'Settings')}${tool('help', 'help', 'Help')}
          </div>
        </div>
        <mutagen-chamber class="mh-column mh-column--right" shell="sight-column" flow="up" stream></mutagen-chamber>
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
