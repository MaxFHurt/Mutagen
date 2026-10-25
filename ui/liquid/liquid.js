// MUTAGEN live liquid: <mutagen-chamber shell="canister" flow="right">Label</mutagen-chamber>
//
// Layers, back to front: the moving liquid (drawn here, clipped to the glass window), the fixed glass sheen (also drawn
// here, but never moves), the supplied steel frame with its window cut out (ui/liquid/<shell>-frame.png), then the label.
// Material (revision 027): smooth translucent medium green, broad absorption that deepens toward the middle, sparse air
// bubbles suspended IN the liquid with depth-dependent attenuation and soft edges, no streaks, veins, marbling, grain or
// glow outside the glass. Flow is real time-based motion of the broad absorption, never painted lines.
//
// One shared WebGL context renders every chamber in turn and copies the result into each chamber's own canvas, so a
// screen full of buttons never runs out of WebGL contexts. Animation runs at up to 30 fps, only while a chamber is on
// screen and the page is visible. Reduced motion (system setting, or <html data-motion="reduced">) shows one still frame.
// <html data-green="reduced"> lowers the green's brightness and saturation only. Without WebGL a still gradient is drawn.

const BASE = new URL('.', import.meta.url);
const FPS = 30;
let shellsPromise = null;
const loadShells = () => (shellsPromise ||= fetch(new URL('shells.json', BASE)).then(r => r.json()));
const images = new Map();
function loadImage(name) {
  if (!images.has(name)) images.set(name, new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = new URL(name, BASE).href; }));
  return images.get(name);
}

const motionQuery = matchMedia('(prefers-reduced-motion: reduce)');
const reducedMotion = () => motionQuery.matches || document.documentElement.dataset.motion === 'reduced';
const greenLevel = () => (document.documentElement.dataset.green === 'reduced' ? 0.72 : 1);

// ---------- shared WebGL renderer ----------
const VERT = `attribute vec2 p; varying vec2 uv; void main(){ uv = p * 0.5 + 0.5; gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `precision highp float;
varying vec2 uv;
uniform sampler2D uMask;      // R coverage, G depth (0 edge .. 1 deepest)
uniform vec2 uRes;            // canvas size in pixels
uniform float uTime, uSeed, uGreen;
uniform vec2 uFlow;           // flow direction (window units per second)
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)) + uSeed * 17.13) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y); }
void main(){
  vec2 st = vec2(uv.x, 1.0 - uv.y);                       // texture space, y down
  vec4 m = texture2D(uMask, st);
  float cover = m.r, depth = m.g;
  if (cover < 0.004) { gl_FragColor = vec4(0.0); return; }
  float aspect = uRes.x / uRes.y;
  vec2 q = vec2(st.x * aspect, st.y);                     // square units, 1 = window height
  // Broad absorption: thicker liquid toward the middle is deeper green; glass edges stay brighter.
  float thick = smoothstep(0.0, 0.3, depth);
  vec3 edge = vec3(0.15, 0.55, 0.08), deep = vec3(0.02, 0.25, 0.02);   // measured from the rev 027 shells
  vec3 col = mix(edge, deep, thick);
  // Flow: the broad variation drifts with the flow, slowly; two very low octaves, no fine texture.
  vec2 fp = q * 1.4 - uFlow * uTime;
  float n = noise(fp) * 0.65 + noise(fp * 2.1 + 7.3) * 0.35;
  col *= 0.9 + 0.2 * n;
  // Light from above through the glass: a little brighter at the top.
  col *= 1.0 + 0.14 * (1.0 - st.y) * (1.0 - thick * 0.5);
  // Bubbles: small air pockets in the liquid, each with a thin lighter rim. Near ones are crisp, deeper ones are
  // smaller, fainter and out of focus. No highlight dot, no shadow, none stuck to the glass.
  float minDim = min(uRes.x, uRes.y);
  vec2 px = st * uRes;
  for (int i = 0; i < 16; i++) {
    float fi = float(i);
    float h1 = hash(vec2(fi, 1.7)), h2 = hash(vec2(fi, 9.1)), h3 = hash(vec2(fi, 4.4)), h4 = hash(vec2(fi, 2.9));
    float z = h3;                                          // 0 near the glass .. 1 deep
    float speed = mix(0.035, 0.012, z) * (0.7 + 0.6 * h4);  // window heights per second, rising
    float y = 1.08 - fract(h2 + uTime * speed) * 1.16;
    float x = 0.06 + 0.88 * h1 + 0.01 * sin(uTime * (0.6 + h4) + fi * 2.3);
    float r = max(1.5, minDim * mix(0.016, 0.006, z) * (0.6 + 0.7 * h4 * h1));
    vec2 d = (px - vec2(x, y) * uRes) / vec2(r * 0.92, r * 1.06);   // slightly oval
    float dist = length(d);
    float blur = mix(1.2, 3.5, z) / r;                     // edge softness in bubble radii: crisp near, soft deep
    float inside = 1.0 - smoothstep(1.0 - blur, 1.0 + blur, dist);
    float rim = inside * smoothstep(0.55 - blur, 0.95, dist);
    float vis = (1.0 - 0.65 * z) * smoothstep(0.03, 0.12, depth);
    col = mix(col, col * 1.18, inside * 0.6 * vis);                          // less green inside the air
    col = mix(col, col * 1.75 + vec3(0.06, 0.1, 0.05), rim * 0.75 * vis);    // thin lighter refractive rim
  }
  // Fixed glass sheen in front of the liquid: one broad, faint diagonal band near the top. Never moves.
  float band = smoothstep(0.30, 0.0, abs((st.y - 0.12) + (st.x - 0.5) * 0.18)) * 0.07;
  col += vec3(band * 0.8, band, band * 0.8);
  // Reduced green: lower brightness and saturation of the green only.
  float lum = dot(col, vec3(0.3, 0.59, 0.11));
  col = mix(vec3(lum), col, mix(0.65, 1.0, uGreen)) * mix(0.8, 1.0, uGreen);
  gl_FragColor = vec4(col * cover, cover);
}`;

let shared = null;
function renderer() {
  if (shared !== null) return shared;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return (shared = false);
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT)); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG)); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
    gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = n => gl.getUniformLocation(prog, n);
    shared = { canvas, gl, u: { mask: u('uMask'), res: u('uRes'), time: u('uTime'), seed: u('uSeed'), green: u('uGreen'), flow: u('uFlow') } };
  } catch (error) {
    console.warn('Liquid: WebGL unavailable, showing still liquid', error);
    shared = false;
  }
  return shared;
}

function maskTexture(r, chamber) {
  const { gl } = r;
  if (chamber._tex) return chamber._tex;
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, chamber._maskCrop);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return (chamber._tex = tex);
}

const FLOWS = { up: [0, 0.05], down: [0, -0.05], left: [0.05, 0], right: [-0.05, 0], none: [0, 0] };

// ---------- animation loop shared by every chamber ----------
const live = new Set();
let raf = 0, last = 0;
const start = performance.now();
function tick(now) {
  raf = 0;
  if (document.hidden) return;
  if (now - last >= 1000 / FPS - 1) {
    last = now;
    const t = (now - start) / 1000;
    for (const c of live) if (c._visible) c._draw(t);
  }
  if (!reducedMotion() && [...live].some(c => c._visible)) raf = requestAnimationFrame(tick);
}
function wake() { if (!raf && !document.hidden) raf = requestAnimationFrame(tick); }
document.addEventListener('visibilitychange', () => { if (!document.hidden) { for (const c of live) c._draw(c._still); wake(); } });
motionQuery.addEventListener?.('change', () => { for (const c of live) c._draw(c._still); wake(); });
new MutationObserver(() => { for (const c of live) c._draw(c._still); wake(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion', 'data-green'] });
const seen = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  for (const e of entries) e.target._visible = e.isIntersecting;
  wake();
}) : null;

let seedCounter = 0;
class MutagenChamber extends HTMLElement {
  async connectedCallback() {
    if (this._ready) { live.add(this); seen?.observe(this); return wake(); }
    this._ready = true;
    const name = this.getAttribute('shell') || 'canister';
    const shells = await loadShells();
    const meta = shells[name];
    if (!meta) return console.warn(`Liquid: unknown shell "${name}"`);
    const [W, H] = meta.size, [x0, y0, x1, y1] = meta.window, ww = x1 - x0 + 1, wh = y1 - y0 + 1;
    this._seed = Number(this.getAttribute('seed')) || (++seedCounter * 7.31 + Math.random() * 100);
    this._flow = FLOWS[this.getAttribute('flow') || 'none'] || FLOWS.none;
    this._still = this._seed % 13;   // reduced motion: a still frame, different per chamber
    const pct = (v, of) => `${(100 * v) / of}%`;
    const label = [...this.childNodes];
    this.classList.add('mutagen-chamber');
    this.style.aspectRatio = `${W} / ${H}`;
    this.innerHTML = '';
    const canvas = document.createElement('canvas');
    canvas.className = 'mutagen-chamber__liquid';
    Object.assign(canvas.style, { left: pct(x0, W), top: pct(y0, H), width: pct(ww, W), height: pct(wh, H) });
    canvas.setAttribute('aria-hidden', 'true');
    const frame = document.createElement('img');
    frame.className = 'mutagen-chamber__frame'; frame.alt = ''; frame.decoding = 'async';
    frame.src = new URL(`${name}-frame.png`, BASE).href;
    const text = document.createElement('span');
    text.className = 'mutagen-chamber__label';
    Object.assign(text.style, { left: pct(x0, W), top: pct(y0, H), width: pct(ww, W), height: pct(wh, H) });
    text.append(...label);
    this.append(canvas, frame, text);
    this._canvas = canvas; this._ctx = canvas.getContext('2d');
    const maskImg = await loadImage(`${name}-mask.png`);
    const crop = document.createElement('canvas'); crop.width = ww; crop.height = wh;
    crop.getContext('2d').drawImage(maskImg, x0, y0, ww, wh, 0, 0, ww, wh);
    this._maskCrop = crop;
    this._resize = () => {
      const box = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.max(2, Math.round(box.width * dpr)), h = Math.max(2, Math.round(box.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; this._draw(this._still); }
    };
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(canvas);
    this._visible = !seen;
    live.add(this); seen?.observe(this);
    this._resize(); this._draw(this._still); wake();
  }
  disconnectedCallback() { live.delete(this); seen?.unobserve(this); }
  _draw(t) {
    const canvas = this._canvas;
    if (!canvas || !this._maskCrop || canvas.width < 2) return;
    const time = reducedMotion() ? this._still : t;
    const r = renderer();
    if (!r) return this._drawStill();
    const { gl, u } = r;
    if (r.canvas.width !== canvas.width || r.canvas.height !== canvas.height) { r.canvas.width = canvas.width; r.canvas.height = canvas.height; }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, maskTexture(r, this));
    gl.uniform1i(u.mask, 0);
    gl.uniform2f(u.res, canvas.width, canvas.height);
    gl.uniform1f(u.time, time); gl.uniform1f(u.seed, this._seed % 97); gl.uniform1f(u.green, greenLevel());
    gl.uniform2f(u.flow, this._flow[0], this._flow[1]);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    this._ctx.clearRect(0, 0, canvas.width, canvas.height);
    this._ctx.drawImage(r.canvas, 0, 0);
  }
  // No WebGL: the same edge-to-deep absorption, drawn once, without motion or bubbles.
  _drawStill() {
    const canvas = this._canvas, ctx = this._ctx, w = canvas.width, h = canvas.height;
    const tmp = document.createElement('canvas'); tmp.width = w; tmp.height = h;
    const tc = tmp.getContext('2d'); tc.drawImage(this._maskCrop, 0, 0, w, h);
    const img = tc.getImageData(0, 0, w, h), d = img.data, g = greenLevel();
    for (let i = 0; i < d.length; i += 4) {
      const cover = d[i] / 255, k = Math.min(1, d[i + 1] / 255 / 0.3), s = k * k * (3 - 2 * k);
      d[i] = (0.15 + (0.02 - 0.15) * s) * 255 * g * cover; d[i + 1] = (0.55 + (0.25 - 0.55) * s) * 255 * g * cover;
      d[i + 2] = (0.08 + (0.02 - 0.08) * s) * 255 * g * cover; d[i + 3] = cover * 255;
    }
    ctx.putImageData(img, 0, 0);
  }
}
customElements.define('mutagen-chamber', MutagenChamber);
