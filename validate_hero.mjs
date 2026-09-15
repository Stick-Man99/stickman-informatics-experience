import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

// Exercise the canvas lifecycle without browser inspection or a DOM dependency.
const source = fs.readFileSync('story.js', 'utf8');
const start = source.indexOf('  function createHeroNetwork()');
const end = source.indexOf('  const mainlineReturn', start);
assert(start >= 0 && end > start);
let arcs = 0, paused = false, hidden = false, nextId = 0;
const frames = new Map();
const events = new Map();
const media = {matches: false, addEventListener: (type, callback) => events.set(`media:${type}`, callback)};
const ctx = {clearRect() {}, setTransform() {}, beginPath() {}, moveTo() {}, lineTo() {}, stroke() {}, fill() {}, arc() { arcs++; }};
const canvas = {getContext: () => ctx};
const hero = {clientWidth: 1200, clientHeight: 630};
const environment = {
  $: selector => selector === '#hero-network' ? canvas : hero,
  window: {devicePixelRatio: 3, matchMedia: () => media, addEventListener() {}},
  document: {get hidden() { return hidden; }, body: {classList: {contains: () => paused}}, addEventListener: (type, callback) => events.set(type, callback)},
  requestAnimationFrame: callback => { const id = ++nextId; frames.set(id, callback); return id; },
  cancelAnimationFrame: id => frames.delete(id),
  ResizeObserver: class { constructor(callback) { this.callback = callback; } observe() { this.callback(); } },
  IntersectionObserver: class { constructor(callback) { events.set('intersection', callback); } observe() {} }
};
environment.window.ResizeObserver = environment.ResizeObserver;
environment.window.IntersectionObserver = environment.IntersectionObserver;
const sync = vm.runInNewContext(`${source.slice(start, end)}\ncreateHeroNetwork();`, environment);
assert(arcs > 0, 'Initial canvas frame must draw');
assert.equal(canvas.width, 2400, 'Pixel ratio must be capped at 2');
assert.equal(frames.size, 1, 'Only one animation loop');
function tick(now) {
  const [id, callback] = [...frames][0];
  frames.delete(id); callback(now);
}
const initialArcs = arcs;
tick(100); tick(140);
assert(arcs > initialArcs, 'Animation must redraw');
paused = true; sync(); assert.equal(frames.size, 0, 'Manual pause');
paused = false; sync(); assert.equal(frames.size, 1, 'Manual resume');
hidden = true; events.get('visibilitychange')(); assert.equal(frames.size, 0, 'Hidden tab pause');
hidden = false; events.get('visibilitychange')();
events.get('intersection')([{isIntersecting: false}]); assert.equal(frames.size, 0, 'Offscreen pause');
events.get('intersection')([{isIntersecting: true}]); assert.equal(frames.size, 1, 'Onscreen resume');
media.matches = true; events.get('media:change')(); assert.equal(frames.size, 0, 'Reduced-motion preference');
console.log('PASS: initial drawing, frame updates, bounded resolution, manual pause/resume, hidden-tab and offscreen pause, reduced motion');
