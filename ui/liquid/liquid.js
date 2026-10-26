// MUTAGEN live liquid: <mutagen-chamber shell="smart-octagon" overlay="…/button-attack.png">Attack</mutagen-chamber>
// overlay = a supplied finished button with clear glass (hardware and lettering), drawn over the live liquid unchanged;
// label = a supplied lettering image on its own. Neither is ever redrawn here.
// The label image is supplied artwork, shown unmodified; the element's text is its accessible name.
//
// Layers, back to front: the moving liquid (drawn here, clipped to the glass window), the fixed glass sheen (also drawn
// here, but never moves), the supplied steel frame with its window cut out (ui/liquid/<shell>-frame.png), then the supplied
// label image.
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
uniform vec2 uFlow;           // flow direction through the pipe, in texture space (y down); (0,0) = still liquid
uniform float uBulb;          // 1 = a wide glass bulb fed by a narrow pipe on the left, drained by one on the right
uniform float uStream;        // 1 = part of a stream of pipes: the liquid is laid out on the page, so it runs on from pipe to pipe
uniform vec2 uPage;           // stream: the window's top-left on the page, in stream units
uniform float uBubble;        // bubble size scale for the shell (1 = the buttons' approved sizes)
uniform float uUnit;          // stream: canvas pixels per stream unit (one unit is about a main button's window height)
float gSeed;                  // seed for hash(): shared by a stream's liquid, per chamber for its bubbles
const float FLOW = 0.05;      // flow speed, window heights per second
const float STREAM_FLOW = 0.5; // stream speed, stream units per second: the speed the sight columns had on their own
// Bulb flow: a source at the inlet and a sink at the outlet (ideal flow through a widening). The stream enters fast and
// narrow, fans out to fill the bulb, slows in the middle and gathers again into the outlet.
vec2 bulbFlow(vec2 q, float aspect){
  vec2 a = q - vec2(-0.04, 0.5), b = q - vec2(aspect + 0.04, 0.5);
  vec2 v = 0.012 * (a / dot(a, a) - b / dot(b, b));
  float l = length(v); return l > 0.25 ? v * (0.25 / l) : v;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7)) + gSeed * 17.13) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y); }
void main(){
  vec2 st = vec2(uv.x, 1.0 - uv.y);                       // texture space, y down
  vec4 m = texture2D(uMask, st);
  float cover = m.r, depth = m.g;
  if (cover < 0.004) { gl_FragColor = vec4(0.0); return; }
  float aspect = uRes.x / uRes.y;
  vec2 q = vec2(st.x * aspect, st.y);                     // square units, 1 = window height
  // Light through the liquid (Beer-Lambert): thicker liquid toward the middle absorbs more, red and blue far more than
  // green, so the edges glow a bright medium green and the middle deepens to a rich saturated green.
  float thick = smoothstep(0.0, 0.3, depth);
  // Flow: the thickness varies broadly and drifts with the flow, slowly; two very low octaves, no fine texture.
  float n;
  if (uBulb > 0.5) {
    // Carry the broad variation along the local flow; two staggered phases blended so it never stretches out of shape.
    vec2 v = bulbFlow(q, aspect) * 1.4;
    float ph = fract(uTime / 4.0), ph2 = fract(uTime / 4.0 + 0.5);
    vec2 f1 = q * 1.4 - v * ph * 4.0, f2 = q * 1.4 - v * ph2 * 4.0 + 3.7;
    float n1 = noise(f1) * 0.65 + noise(f1 * 2.1 + 7.3) * 0.35, n2 = noise(f2) * 0.65 + noise(f2 * 2.1 + 7.3) * 0.35;
    n = mix(n1, n2, abs(ph - 0.5) * 2.0);
  } else {
    // In a stream the liquid is sampled in page units with one shared seed and speed, so what leaves one pipe runs on
    // into the next at the same pace and scale.
    gSeed = uStream > 0.5 ? 0.0 : uSeed;
    vec2 base = uStream > 0.5 ? uPage + st * uRes / uUnit : q;
    vec2 fp = base * 1.4 - uFlow * (1.4 * (uStream > 0.5 ? STREAM_FLOW : FLOW) * uTime);
    n = noise(fp) * 0.65 + noise(fp * 2.1 + 7.3) * 0.35;
  }
  float path = (0.38 + 1.4 * thick) * (0.88 + 0.24 * n);
  vec3 col = vec3(0.95, 1.0, 0.85) * exp(-vec3(4.6, 0.42, 5.6) * path);
  // Light from above scatters inside the liquid: a soft lift toward the top, strongest near the glass.
  float top = 1.0 - st.y;
  col += vec3(0.015, 0.07, 0.012) * top * top * (1.0 - 0.5 * thick);
  // Bubbles: air pockets suspended in the liquid, in a natural mix of sizes (many small, some medium, a few large).
  // Each has a thin lighter rim and a soft glow on its lower side where light focuses through it. Near ones are crisp,
  // deeper ones are smaller, fainter and out of focus. No highlight dot, no shadow, none stuck to the glass.
  gSeed = uSeed;
  float minDim = min(uRes.x, uRes.y);
  vec2 px = st * uRes;
  for (int i = 0; i < 18; i++) {
    float fi = float(i);
    float h1 = hash(vec2(fi, 1.7)), h2 = hash(vec2(fi, 9.1)), h3 = hash(vec2(fi, 4.4)), h4 = hash(vec2(fi, 2.9));
    float z = h3;                                          // 0 near the glass .. 1 deep
    float size = pow(h4, 2.2);                             // 0 small .. 1 large, mostly small
    float rise = mix(0.035, 0.012, z) * (0.75 + 0.45 * size);  // buoyancy, window heights per second
    float x, y;
    if (uBulb > 0.5) {
      // Bulb: in fast at the inlet's height, fanned out along curving paths, slow across the middle (rising a little
      // while slow), then pulled quickly into the outlet.
      float s = fract(h1 + uTime * 0.035 * (0.8 + 0.4 * h4));
      float sp = s - 0.82 * sin(6.28318 * s) / 6.28318;        // slow in the middle, fast near the ports
      float spread = (h2 - 0.5) * 0.9;                          // which path through the bulb
      x = -0.04 + sp * 1.08;
      y = 0.5 + spread * sin(3.14159 * sp) - (0.02 + 0.03 * size) * sin(3.14159 * sp);   // big ones lift a little more
    } else if (abs(uFlow.x) > 0.5) {
      // Horizontal pipe: bubbles ride the stream through the pipe, fastest along the middle, slower near the glass.
      float lane = 0.14 + 0.72 * h2;
      float profile = 0.35 + 1.3 * (1.0 - pow(2.0 * lane - 1.0, 2.0));
      float along = fract(h1 + uFlow.x * uTime * FLOW * profile * (0.8 + 0.4 * h4) * (uStream > 0.5 ? STREAM_FLOW / FLOW * uUnit : uRes.y) / uRes.x);
      x = -0.08 + along * 1.16;
      y = lane - 0.04 * sin(fract(h1 + uTime * rise) * 3.14159) + 0.01 * sin(uTime * (0.5 + h4) + fi * 2.3);
    } else {
      // Vertical pipe or still chamber: bubbles rise; an upward flow carries them a little faster. In a downward stream
      // small bubbles are carried down with it, while the bigger ones are buoyant enough to keep rising slowly.
      float carry = uStream > 0.5 ? STREAM_FLOW * uUnit / uRes.y : FLOW * 0.6;
      float speed = uFlow.y > 0.5 ? mix(0.3 * rise - carry, 0.3 * rise, smoothstep(0.45, 0.8, size)) : rise - uFlow.y * carry;
      y = 1.12 - fract(h2 + uTime * speed) * 1.24;
      float wob = 0.006 + 0.012 * size;
      x = 0.07 + 0.86 * h1 + wob * sin(uTime * (0.5 + h4) + fi * 2.3);
    }
    float r = max(1.5, minDim * uBubble * mix(0.012, 0.075, size) * (1.0 - 0.45 * z));
    float squash = 0.07 * size * sin(uTime * 1.7 + fi);   // larger bubbles flex a little as they rise
    vec2 d = (px - vec2(x, y) * uRes) / vec2(r * (1.0 + squash), r * (1.0 - squash) * 1.04);
    float dist = length(d);
    float blur = mix(1.2, 3.5, z) / r;                     // edge softness in bubble radii: crisp near, soft deep
    float inside = 1.0 - smoothstep(1.0 - blur, 1.0 + blur, dist);
    float rim = inside * smoothstep(0.62 - blur, 0.96, dist);
    float focus = inside * smoothstep(0.15, 0.85, d.y) * (1.0 - smoothstep(0.55, 0.95, dist));
    float vis = (1.0 - 0.6 * z) * smoothstep(0.03, 0.12, depth);
    col = mix(col, col * 1.2 + vec3(0.005, 0.02, 0.005), inside * 0.6 * vis);  // less green inside the air
    col = mix(col, col * 1.45 + vec3(0.03, 0.07, 0.025), focus * 0.5 * vis);   // light gathered on the lower side
    col = mix(col, col * 1.7 + vec3(0.05, 0.1, 0.045), rim * 0.6 * vis);      // thin lighter refractive rim
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
    shared = { canvas, gl, u: { mask: u('uMask'), res: u('uRes'), time: u('uTime'), seed: u('uSeed'), green: u('uGreen'), flow: u('uFlow'), bulb: u('uBulb'), stream: u('uStream'), page: u('uPage'), unit: u('uUnit'), bubble: u('uBubble') } };
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

// Flow direction through the pipe (texture space, y down). Without a flow attribute it follows the pipe: a window wider
// than tall flows sideways, a tall one flows up, a roughly square chamber holds still liquid with rising bubbles.
// flow="bulb" is for a wide glass bulb fed and drained by narrow side pipes (the smart octagon).
const FLOWS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0], none: [0, 0], bulb: [1, 0] };
// A stream's unit, in CSS pixels: about the window height of a main home button on both iPhone and iPad.
const STREAM_UNIT = () => 0.075 * Math.min(innerWidth, innerHeight);
function ownShell(mask, size, bubbles) {
  const [w, h] = (size || '').split(/\s+/).map(Number);
  return w && h ? { size: [w, h], window: [0, 0, w - 1, h - 1], mask: new URL(mask, document.baseURI).href, bubbleScale: Number(bubbles) || 1 } : null;
}
const pipeFlow = (w, h) => (w > h * 1.4 ? FLOWS.right : h > w * 1.4 ? FLOWS.up : FLOWS.none);

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
    // A piece of a supplied screen kit names its own mask and size instead of a shell:
    // <mutagen-chamber mask="…/liquid-mask.png" size="1424 234" overlay="…/clear-glass-overlay.png" bubbles="0.8">.
    const own = this.getAttribute('mask');
    const meta = own ? ownShell(own, this.getAttribute('size'), this.getAttribute('bubbles')) : (await loadShells())[name];
    if (!meta) return console.warn(`Liquid: unknown shell "${name}" (or a mask without a size)`);
    const [W, H] = meta.size, [x0, y0, x1, y1] = meta.window, ww = x1 - x0 + 1, wh = y1 - y0 + 1;
    this._seed = Number(this.getAttribute('seed')) || (++seedCounter * 7.31 + Math.random() * 100);
    this._flow = FLOWS[this.getAttribute('flow')] || pipeFlow(ww, wh);
    this._bulb = this.getAttribute('flow') === 'bulb' ? 1 : 0;   // flow="bulb": a wide glass bulb on a narrow side pipe
    this._bubble = meta.bubbleScale || 1;
    this._stream = this.hasAttribute('stream') ? 1 : 0;          // stream: liquid continues from pipe to pipe (see STREAM_UNIT)
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
    // overlay="…png": a supplied finished button with its glass left clear (hardware + lettering), used as the frame as-is.
    const overlay = this.getAttribute('overlay');
    frame.src = overlay ? new URL(overlay, document.baseURI).href : new URL(`${name}-frame.png`, BASE).href;
    const text = document.createElement('span');
    text.className = 'mutagen-chamber__label';
    Object.assign(text.style, { left: pct(x0, W), top: pct(y0, H), width: pct(ww, W), height: pct(wh, H) });
    // Labels are supplied artwork (label="path/to/label.png"), shown exactly as made: never redrawn or restyled here.
    const face = document.createElement('span');
    face.className = 'mutagen-chamber__text';
    face.append(...label);
    text.append(face);
    const src = this.getAttribute('label');
    if (src) {
      const art = document.createElement('img');
      art.className = 'mutagen-chamber__art'; art.alt = ''; art.decoding = 'async';
      art.src = new URL(src, document.baseURI).href;
      text.append(art);
    }
    this.append(canvas, frame, text);
    this._canvas = canvas; this._ctx = canvas.getContext('2d');
    const maskImg = await loadImage(meta.mask || `${name}-mask.png`);   // a shell may name a supplied mask elsewhere
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
    gl.uniform2f(u.flow, this._flow[0], this._flow[1]); gl.uniform1f(u.bulb, this._bulb);
    gl.uniform1f(u.stream, this._stream); gl.uniform1f(u.bubble, this._bubble);
    if (this._stream) {
      const box = canvas.getBoundingClientRect(), unit = STREAM_UNIT();
      gl.uniform2f(u.page, (box.left + scrollX) / unit, (box.top + scrollY) / unit);
      gl.uniform1f(u.unit, unit * canvas.width / Math.max(1, box.width));
    }
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
      const cover = d[i] / 255, k = Math.min(1, d[i + 1] / 255 / 0.3), s = k * k * (3 - 2 * k), path = 0.38 + 1.4 * s;
      d[i] = 0.95 * Math.exp(-4.6 * path) * 255 * g * cover; d[i + 1] = Math.exp(-0.42 * path) * 255 * g * cover;
      d[i + 2] = 0.85 * Math.exp(-5.6 * path) * 255 * g * cover; d[i + 3] = cover * 255;
    }
    ctx.putImageData(img, 0, 0);
  }
}
customElements.define('mutagen-chamber', MutagenChamber);
