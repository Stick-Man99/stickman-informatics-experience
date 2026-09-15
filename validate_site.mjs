import fs from 'node:fs';
import assert from 'node:assert/strict';
import path from 'node:path';

const html = fs.readFileSync('index.html', 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
assert.equal(ids.length, new Set(ids).size, 'Duplicate element IDs');
for (const [,reference] of html.matchAll(/(?:src|href|poster)="([^"]+)"/g)) {
  if (/^https?:/.test(reference)) continue;
  if (reference.startsWith('#')) {
    assert(ids.includes(reference.slice(1)), `Missing anchor: ${reference}`);
  } else {
    assert(fs.existsSync(reference), `Missing local file: ${reference}`);
    assert(fs.statSync(reference).size > 0, `Empty asset: ${reference}`);
  }
}
for (const file of ['app.js', 'story.js', 'styles.css', 'narrative.css']) {
  assert(fs.existsSync(path.resolve(file)), `Missing source: ${file}`);
}
assert(html.includes('data-ai-step="3"'));
assert(html.includes('data-growth-step="5"'));
assert(html.includes('id="newton-recap"') && html.includes('id="lab-recap"'));
assert(html.includes('<h1>stickman的信息学体验馆</h1>'), 'Missing stickman branding');
assert(html.includes('id="hero-network"') && html.includes('class="hero-signal"'), 'Missing homepage animation');
console.log('PASS: local assets, unique IDs, story anchors, AI and growth stages, experiment return destinations');
