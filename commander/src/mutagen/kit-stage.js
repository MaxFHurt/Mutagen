// MUTAGEN screen kits: places a supplied kit (ui/kits/<kit>/, made by ChatGPT) on a stage in the kit's own shape, as
// large as the screen allows. Nothing is drawn or changed here: every piece is shown at its LAYOUT.json rectangle,
// scaled uniformly with the stage.
// - Pipes and buttons that hold liquid get live liquid (<mutagen-chamber>) behind their clear-glass overlay, on the
//   shared stream (down the left column, right through branches and buttons, up the right column). Their assembled
//   image is used instead when the liquid is still (Still liquid setting or the device's Reduce Motion).
// - Solid steel pieces, lettering and the background are their supplied images.
// - Buttons are real <button> elements with an accessible name; they show the kit's pressed art while pressed. An
//   inactive button keeps its steel and loses only the ooze, with faint lettering (owner; see kitStage).
// - The logo is the adopted logo v2 with live liquid, from ui/kits/branding/.
// - Panels (type "panel") are rectangles where the screen's own live content goes (a form, a list, a count).
// Screens ask kitFor(name) and keep their current layout until that kit is installed (docs/KIT-CONTRACT.md).
import { html } from '../ui/dom.js';
import KITS_INSTALLED from '../../../ui/kits/index.js';
import '../../../ui/liquid/liquid.js';

/** The installed kit for a screen, or null (the screen then keeps its current layout). */
export const kitFor = name => KITS_INSTALLED[name] || null;

const KITS = '../ui/kits/';
const FLOW = { 'left-sight-column': 'down', 'right-sight-column': 'up' };

/**
 * @param {object} layout the kit's generated layout.js
 * @param {string} kit folder name under ui/kits/
 * @param {Record<string, {act?: string, mode?: string, name: string, disabled?: boolean, hidden?: boolean,
 *   data?: Record<string, string>}>} controls buttons by piece id; data adds data-* attributes
 * @param {Record<string, unknown>} [panels] live content (html``) for each panel piece by id
 */
export function kitStage(layout, kit, controls, panels = {}) {
  const { width: W, height: H } = layout.canvas, dir = `${KITS}${kit}/`;
  const at = ([x, y, w, h]) => `left:${(100 * x) / W}%;top:${(100 * y) / H}%;width:${(100 * w) / W}%;height:${(100 * h) / H}%`;
  const live = (p, flow, bubbles) => html`<mutagen-chamber class="kit-live" mask="${dir}${p.files.mask}" size="${p.rect[2]} ${p.rect[3]}"
      overlay="${dir}${p.files.overlay}" flow="${flow}" stream bubbles="${bubbles}" edge="dark"></mutagen-chamber><img class="kit-still" src="${dir}${p.files.assembled}" alt="">`;
  const piece = p => {
    if (p.type === 'buttons') {
      const c = controls[p.id];
      if (!c || c.hidden) return '';
      const data = Object.entries(c.data || {}).map(([k, v]) => html` data-${k}="${v}"`);
      // Inactive: the button with no ooze in its glass and faint lettering (owner). A kit marked disabled_empty_glass
      // supplies exactly that as its disabled art; otherwise the clear-glass overlay (empty glass, lettering as is).
      const off = layout.disabled_empty_glass ? p.files.disabled : p.files.overlay;
      return html`<button type="button" class="kit-piece kit-btn" style="${at(p.rect)}" aria-label="${c.name}" data-kit="${p.id}"
          ${c.act ? html`data-act="${c.act}"` : ''} ${c.mode ? html`data-mode="${c.mode}"` : ''}${data} ${c.disabled ? 'disabled' : ''}>
          ${live(p, 'right', 0.8)}<img class="kit-pressed" src="${dir}${p.files.pressed}" alt=""><img class="kit-empty" src="${dir}${off}" alt=""></button>`;
    }
    if (p.type === 'branding') {
      return html`<div class="kit-piece kit-logo" style="${at(p.rect)}">
          <mutagen-chamber class="kit-live" mask="${KITS}branding/logo-mutagen-v2-liquid-mask.png" size="2508 2508"
            overlay="${KITS}branding/logo-mutagen-v2-overlay.png" flow="none" bubbles="0.4" edge="dark">MUTAGEN</mutagen-chamber>
          <img class="kit-still" src="${KITS}branding/logo-mutagen-v2.png" alt="MUTAGEN"></div>`;
    }
    if (p.type === 'panel') return html`<div class="kit-piece kit-panel" style="${at(p.rect)}" data-panel="${p.id}">${panels[p.id] ?? ''}</div>`;
    if (p.type === 'lettering') return controls[p.id]?.hidden ? '' : html`<img class="kit-piece" style="${at(p.rect)}" src="${dir}${p.file}" alt="">`;
    if (p.liquid) return html`<div class="kit-piece" style="${at(p.rect)}">${live(p, FLOW[p.id] || 'right', 1)}</div>`;
    return html`<img class="kit-piece" style="${at(p.rect)}" src="${dir}${p.files.assembled}" alt="">`;
  };
  return html`<div class="kit-stage" style="--kit-aspect:${W} / ${H}">
      <img class="kit-piece kit-bg" style="${at([0, 0, W, H])}" src="${dir}${layout.background}" alt="">
      ${layout.pieces.map(piece)}
    </div>`;
}
