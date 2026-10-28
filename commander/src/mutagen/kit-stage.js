// MUTAGEN screen kits: places a supplied kit (ui/kits/<kit>/, made by ChatGPT) on a stage in the kit's own shape, as
// large as the screen allows. Nothing is drawn or changed here: every piece is shown at its LAYOUT.json rectangle,
// scaled uniformly with the stage.
// - Pipes, buttons and the logo show the kit's painted art as supplied, with live motion over their liquid (flow
//   shading and bubbles, <mutagen-chamber painted>) on the shared stream (down the left column, right through branches
//   and buttons, up the right column). With the liquid still (Still liquid or Reduce Motion) the painted art alone shows.
// - Solid steel pieces, lettering and the background are their supplied images.
// - Buttons are real <button> elements with an accessible name; they show the kit's pressed art while pressed. An
//   inactive button keeps its steel and loses only the ooze, with faint lettering (owner; see kitStage).
// - The logo is the adopted logo v2 with live liquid, from ui/kits/branding/.
// - Panels (type "panel") are rectangles where the screen's own live content goes (a form, a list, a count).
// - Art that is not on screen yet (still images, pressed and inactive looks) loads only when it is shown, to save data.
// Screens ask kitFor(name) and keep their current layout until that kit is installed (docs/KIT-CONTRACT.md).
import { html, setHtml } from '../ui/dom.js';
import KITS_INSTALLED from '../../../ui/kits/index.js';
import '../../../ui/liquid/liquid.js';

/** The installed kit for a screen, or null (the screen then keeps its current layout). */
export const kitFor = name => KITS_INSTALLED[name] || null;

const KITS = '../ui/kits/';
// Logo v2, verified (rev 051). Revision 02's 2508 × 2508 copies arrived truncated, and were 2× enlargements anyway.
const LOGO = '../ui/branding/';
const FLOW = { 'left-sight-column': 'down', 'right-sight-column': 'up' };
// Full address for images named inside CSS variables (a relative url() there resolves against the style sheet).
const abs = path => new URL(path, document.baseURI).href;

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
  // Liquid pieces: the kit's painted art as supplied, with live ooze drawn over its liquid area ("cover"), so the
  // only bubbles are moving ones (owner: no still bubbles; the art's painted ones are covered). Steel and lettering
  // stay the kit's own. With the liquid still, the painted art alone shows.
  // A piece whose painted art arrived broken falls back to its clear-glass overlay over full live liquid.
  const live = (p, flow, bubbles) => (p.broken || []).includes('assembled')
    ? html`<mutagen-chamber class="kit-live kit-base" mask="${dir}${p.files.mask}" size="${p.rect[2]} ${p.rect[3]}" overlay="${dir}${p.files.overlay}"
        flow="${flow}" stream bubbles="${bubbles}" edge="dark"></mutagen-chamber>`
    : html`<span class="kit-glow" style="--glow-mask:url('${abs(dir + p.files.mask)}')"></span><img class="kit-base" src="${dir}${p.files.assembled}" alt=""><mutagen-chamber class="kit-live"
      mask="${dir}${p.files.mask}" size="${p.rect[2]} ${p.rect[3]}" cover edge="dark" flow="${flow}" stream bubbles="${bubbles}"></mutagen-chamber><span class="kit-glow kit-glow--spill" style="--glow-mask:url('${abs(dir + p.files.mask)}')"></span>`;
  const piece = p => {
    if (p.type === 'buttons') {
      const c = controls[p.id];
      if (!c || c.hidden) return '';
      const data = Object.entries(c.data || {}).map(([k, v]) => html` data-${k}="${v}"`);
      // Inactive: the button with no ooze in its glass and faint lettering (owner). A kit marked disabled_empty_glass
      // supplies exactly that as its disabled art; otherwise the clear-glass overlay (empty glass, lettering as is).
      const off = layout.disabled_empty_glass && !(p.broken || []).includes('disabled') ? p.files.disabled : p.files.overlay;
      return html`<button type="button" class="kit-piece kit-btn" style="${at(p.rect)}" aria-label="${c.name}" data-kit="${p.id}"
          ${c.act ? html`data-act="${c.act}"` : ''} ${c.mode ? html`data-mode="${c.mode}"` : ''}${data} ${c.disabled ? 'disabled' : ''}>
          ${live(p, 'right', 0.8)}${(p.broken || []).includes('pressed') ? '' : html`<img class="kit-pressed" src="${dir}${p.files.pressed}" alt="" loading="lazy">`}<img class="kit-empty" src="${dir}${off}" alt="" loading="lazy"></button>`;
    }
    if (p.type === 'branding') {
      return html`<div class="kit-piece kit-logo" style="${at(p.rect)}">
          <span class="kit-glow" style="--glow-mask:url('${abs(LOGO + 'logo-mutagen-v2-liquid-mask.png')}')"></span><img class="kit-base" src="${LOGO}logo-mutagen-v2.png" alt="MUTAGEN">
          <mutagen-chamber class="kit-live" mask="${LOGO}logo-mutagen-v2-liquid-mask.png" size="1254 1254" cover edge="dark" flow="none" bubbles="0.4"></mutagen-chamber><span class="kit-glow kit-glow--spill" style="--glow-mask:url('${abs(LOGO + 'logo-mutagen-v2-liquid-mask.png')}')"></span></div>`;
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

// ---------- page screens (Lobby, Join, Table Tracker setup and join, Profile) ----------
// These screens share one shape: a header (Back, title), a body, and a footer of action buttons. When the screen's kit
// is installed (<main class="page" data-kit="…">), its art replaces the header and footer and the screen's own body
// goes in the kit's "body" panel. Each kit button is named after the action it stands for (back, start, join, …) and
// presses the screen's real button, so every condition, disabled state and handler stays exactly as it is.
export function applyPageKit(main) {
  const name = main?.dataset?.kit, kit = name && kitFor(name);
  if (!kit || main.dataset.kitApplied) return;
  main.dataset.kitApplied = '1';
  const real = act => main.querySelector(`.page__head [data-act="${act}"], .page__foot [data-act="${act}"]`);
  const controls = {};
  for (const p of kit.pieces) {
    if (p.type !== 'buttons') continue;
    const b = real(p.id);
    controls[p.id] = b ? { name: b.getAttribute('aria-label') || b.textContent.trim(), disabled: b.disabled, data: { proxy: p.id } } : { hidden: true };
  }
  const stage = document.createElement('div');
  stage.className = 'kit-page';
  setHtml(stage, kitStage(kit, name, controls));
  const title = main.querySelector('.page__head h1');
  if (title) { title.classList.add('visually-hidden'); stage.prepend(title); }
  const body = main.querySelector('.page__body'), bodyPanel = stage.querySelector('[data-panel="body"]');
  if (body && bodyPanel) bodyPanel.append(body);
  // Anything else in the footer (a note, a status line) goes in a "foot" panel when the kit has one.
  const foot = main.querySelector('.page__foot'), footPanel = stage.querySelector('[data-panel="foot"]');
  if (foot && footPanel) for (const n of [...foot.childNodes]) if (!(n instanceof Element && n.matches('[data-act]'))) footPanel.append(n);
  main.classList.add('kit-screen', 'kit-applied');
  main.append(stage);
  main.addEventListener('click', event => {
    const proxy = event.target instanceof Element && event.target.closest('[data-proxy]');
    if (proxy) real(proxy.dataset.proxy)?.click();
  });
}

/** Watches the app for page screens and applies their kits as they are drawn (once, at start-up). */
export function watchPageKits(root = document.body) {
  const scan = () => root.querySelectorAll('main.page[data-kit]:not([data-kit-applied])').forEach(applyPageKit);
  new MutationObserver(scan).observe(root, { childList: true, subtree: true });
  scan();
}
