// MUTAGEN screen kits: places a supplied kit (ui/kits/<kit>/, made by ChatGPT) on a stage in the kit's own shape, as
// large as the screen allows. Nothing is drawn or changed here: every piece is shown at its LAYOUT.json rectangle,
// scaled uniformly with the stage.
// - Pipes and buttons that hold liquid get live liquid (<mutagen-chamber>) behind their clear-glass overlay, on the
//   shared stream (down the left column, right through branches and buttons, up the right column). Their assembled
//   image is used instead when the liquid is still (Still liquid setting or the device's Reduce Motion).
// - Solid steel pieces, lettering and the background are their supplied images.
// - Buttons are real <button> elements with an accessible name; they show the kit's pressed art while pressed and its
//   disabled art while disabled.
// - The logo is the adopted logo v2 with live liquid, from ui/kits/branding/.
import { html } from '../ui/dom.js';
import '../../../ui/liquid/liquid.js';

const KITS = '../ui/kits/';
const FLOW = { 'left-sight-column': 'down', 'right-sight-column': 'up' };

/**
 * @param {object} layout the kit's generated layout.js
 * @param {string} kit folder name under ui/kits/
 * @param {Record<string, {act?: string, mode?: string, name: string, disabled?: boolean}>} controls buttons by piece id
 */
export function kitStage(layout, kit, controls) {
  const { width: W, height: H } = layout.canvas, dir = `${KITS}${kit}/`;
  const at = ([x, y, w, h]) => `left:${(100 * x) / W}%;top:${(100 * y) / H}%;width:${(100 * w) / W}%;height:${(100 * h) / H}%`;
  const live = (p, flow, bubbles) => html`<mutagen-chamber class="kit-live" mask="${dir}${p.files.mask}" size="${p.rect[2]} ${p.rect[3]}"
      overlay="${dir}${p.files.overlay}" flow="${flow}" stream bubbles="${bubbles}"></mutagen-chamber><img class="kit-still" src="${dir}${p.files.assembled}" alt="">`;
  const piece = p => {
    if (p.type === 'buttons') {
      const c = controls[p.id];
      if (!c) return '';
      return html`<button type="button" class="kit-piece kit-btn" style="${at(p.rect)}" aria-label="${c.name}"
          ${c.act ? html`data-act="${c.act}"` : ''} ${c.mode ? html`data-mode="${c.mode}"` : ''} ${c.disabled ? 'disabled' : ''}>
          ${live(p, 'right', 0.8)}<img class="kit-pressed" src="${dir}${p.files.pressed}" alt=""><img class="kit-disabled" src="${dir}${p.files.disabled}" alt=""></button>`;
    }
    if (p.type === 'branding') {
      return html`<div class="kit-piece kit-logo" style="${at(p.rect)}">
          <mutagen-chamber class="kit-live" mask="${KITS}branding/logo-mutagen-v2-liquid-mask.png" size="2508 2508"
            overlay="${KITS}branding/logo-mutagen-v2-overlay.png" flow="none" bubbles="0.4">MUTAGEN</mutagen-chamber>
          <img class="kit-still" src="${KITS}branding/logo-mutagen-v2.png" alt="MUTAGEN"></div>`;
    }
    if (p.type === 'lettering') return html`<img class="kit-piece" style="${at(p.rect)}" src="${dir}${p.file}" alt="">`;
    if (p.liquid) return html`<div class="kit-piece" style="${at(p.rect)}">${live(p, FLOW[p.id] || 'right', 1)}</div>`;
    return html`<img class="kit-piece" style="${at(p.rect)}" src="${dir}${p.files.assembled}" alt="">`;
  };
  return html`<div class="kit-stage" style="--kit-aspect:${W} / ${H}">
      <img class="kit-piece kit-bg" style="${at([0, 0, W, H])}" src="${dir}${layout.background}" alt="">
      ${layout.pieces.map(piece)}
    </div>`;
}
