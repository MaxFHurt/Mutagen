import { html, setHtml, on } from '../dom.js';
import { go } from '../../app/router.js';
import { openModal } from '../modal.js';
import { openJudge } from '../judge-modal.js';
import { openSettings } from '../settings-modal.js';
import '../../../../ui/liquid/liquid.js';   // MUTAGEN live liquid (<mutagen-chamber>)
import LAYOUT from '../../../../ui/screens/mode-select/layout.js';

function pickRemoteCount(onPick) {
  openModal({
    title: 'How many players?', size: 'small',
    body: html`<div class="grid-3">${[2, 3, 4, 5, 6].map(n => html`<button type="button" class="option" data-n="${n}"><span><strong>${n} players</strong></span></button>`)}</div>`,
    onMount(el, { close }) { on(el, 'click', '[data-n]', (e, b) => { close(); onPick(Number(b.dataset.n)); }); }
  });
}

// Choose Game Mode after its approved master (owner, 2026-10-25): the master's own frame, columns, mode buttons, title,
// sub-lines and bottom row, cut from the master into layers (tools/masters/extract-screen.py), with live liquid in the
// columns and every row, and logo v2 in place of the master's logo. Tap areas sit over the master's buttons.
const at = ([x, y, w, h]) => `left:${(100 * x) / LAYOUT.canvas[0]}%;top:${(100 * y) / LAYOUT.canvas[1]}%;width:${(100 * w) / LAYOUT.canvas[0]}%;height:${(100 * h) / LAYOUT.canvas[1]}%`;

export const modeSelectScreen = {
  mount(root) {
    const ui = '../ui/', dir = `${ui}screens/mode-select/`, [W, H] = LAYOUT.canvas;
    const region = r => html`<mutagen-chamber class="mh-piece" style="${at(r.rect)}" mask="${dir}${r.id}-mask.png" size="${r.rect[2]} ${r.rect[3]}"
      overlay="${dir}${r.id}-overlay.png" flow="${r.flow}" stream bubbles="0.8"></mutagen-chamber>`;
    const tap = t => t.mode
      ? html`<button type="button" class="ms-tap" style="${at(t.rect)}" data-mode="${t.mode}" aria-label="${t.name}"></button>`
      : html`<button type="button" class="ms-tap" style="${at(t.rect)}" data-act="${t.act}" aria-label="${t.name}"></button>`;
    setHtml(root, html`
      <main class="mode-select mutagen-mode-master" aria-label="Choose game mode">
        <div class="mh-stage">
          <img class="mh-piece" style="${at([0, 0, W, H])}" src="${dir}static.png" alt="">
          ${LAYOUT.regions.map(region)}
          <mutagen-chamber class="mh-slot" style="${at(LAYOUT.slots.logo)}" shell="logo-v2" flow="none" overlay="${ui}branding/logo-mutagen-v2-overlay.png">MUTAGEN</mutagen-chamber>
          <img class="mh-slot" style="${at(LAYOUT.slots.tagline)}" src="${ui}labels/label-tagline.png" alt="Mutate The Gathering">
          <h1 class="visually-hidden">Choose game mode</h1>
          ${LAYOUT.taps.map(tap)}
        </div>
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
