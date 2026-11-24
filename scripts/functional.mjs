import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';

const dist = 'dist';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon' };
const server = createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(dist, p);
  if (!existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': mime[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const b = await chromium.launch();
const out = [];
const check = (name, ok, extra = '') => out.push(`${ok ? 'PASS' : 'FAIL'} ${name} ${extra}`);

const inner = ['/parohie/', '/parohie/istoric/', '/parohie/cler/', '/parohie/galerie/', '/program/', '/program/taine/', '/stiri/', '/transmisie/', '/pomelnice/', '/donatii/', '/contact/',
  '/en/parish/', '/en/parish/history/', '/en/parish/clergy/', '/en/parish/gallery/', '/en/schedule/', '/en/schedule/sacraments/', '/en/news/', '/en/livestream/', '/en/commemoration/', '/en/donate/', '/en/contact/'];

// JS off: every .reveal visible
const noJs = await b.newContext({ javaScriptEnabled: false });
for (const r of inner) {
  const p = await noJs.newPage();
  await p.goto(base + r);
  const hidden = await p.$$eval('.reveal', (els) => els.filter((e) => Number(getComputedStyle(e).opacity) < 1).length);
  const jsOnlyShown = await p.$$eval('.js-only', (els) => els.filter((e) => getComputedStyle(e).display !== 'none').length);
  check(`no-js ${r}`, hidden === 0 && jsOnlyShown === 0, `hiddenReveal=${hidden} jsOnlyVisible=${jsOnlyShown}`);
  await p.close();
}
await noJs.close();

// Reveal timeout fallback: no scrolling, wait 3s
const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } });
for (const r of ['/parohie/istoric/', '/en/donate/']) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  await p.waitForTimeout(3200);
  const hidden = await p.$$eval('.reveal', (els) => els.filter((e) => Number(getComputedStyle(e).opacity) < 0.99).length);
  check(`reveal timeout ${r}`, hidden === 0, `hidden=${hidden}`);
  await p.close();
}

// Schedule panels in every layout on the schedule page
for (const r of ['/program/', '/en/schedule/', '/transmisie/', '/stiri/']) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  const roots = await p.$$('[data-schedule-root]');
  let okAll = roots.length > 0;
  for (const root of roots) {
    const btn = await root.$('[data-schedule-open]');
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await p.waitForTimeout(250);
    const panel = await root.$('[data-schedule-panel]');
    const open = await panel.evaluate((e) => !e.hidden && e.classList.contains('is-open'));
    const ics = await panel.$eval('[data-panel-ics]', (a) => a.getAttribute('href') || '');
    const g = await panel.$eval('[data-panel-google]', (a) => a.getAttribute('href') || '');
    const map = await panel.$eval('[data-panel-map]', (a) => a.getAttribute('href') || '');
    const title = await panel.$eval('[data-panel-title]', (e) => e.textContent.trim());
    if (!(open && ics.startsWith('blob:') || open && ics.startsWith('data:')) || !g.includes('calendar.google.com') || !map.startsWith('http') || !title) okAll = false;
    await p.keyboard.press('Escape');
    await p.waitForTimeout(600);
    const closed = await panel.evaluate((e) => e.hidden || !e.classList.contains('is-open'));
    if (!closed) okAll = false;
  }
  check(`schedule panels ${r}`, okAll, `roots=${roots.length}`);
  const badge = await p.$$eval('.calendar-badge', (els) => els.map((e) => e.textContent.trim()));
  check(`calendar label ${r}`, badge.length > 0 || r === '/transmisie/' , JSON.stringify(badge.slice(0, 2)));
  await p.close();
}

// Forms start at 0 and chips toggle back to 0
for (const r of ['/pomelnice/', '/donatii/', '/en/commemoration/', '/en/donate/']) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  const input = await p.$('[data-amount-input]');
  const v0 = await input.inputValue();
  const min = await input.getAttribute('min');
  const disp0 = await p.$eval('[data-amount-display]', (e) => e.textContent.trim());
  const chip = await p.$('[data-amount-chip]');
  await chip.click();
  const v1 = await input.inputValue();
  await chip.click();
  const v2 = await input.inputValue();
  await input.fill('17');
  const disp = await p.$eval('[data-amount-display]', (e) => e.textContent.trim());
  check(`amount ${r}`, v0 === '0' && min === '0' && disp0 === '0' && Number(v1) > 0 && v2 === '0' && disp === '17', `v0=${v0} min=${min} chip=${v1} toggled=${v2} disp=${disp}`);
  await p.close();
}
const enC = await ctx.newPage();
await enC.goto(base + '/en/commemoration/');
const enTitle = await enC.$eval('h1', (e) => e.textContent.trim());
check('EN says Commemoration names', enTitle === 'Commemoration names', enTitle);
await enC.close();

// Gallery filter + lightbox
for (const r of ['/parohie/galerie/', '/en/parish/gallery/']) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  const total = await p.$$eval('.masonry__item', (els) => els.length);
  await p.click('[data-filter="icons"]');
  const visible = await p.$$eval('.masonry__item', (els) => els.filter((e) => !e.hidden).length);
  await p.click('[data-filter="all"]');
  await p.click('.masonry__item:not([hidden]) a');
  const open = await p.$eval('dialog.lightbox', (d) => d.open);
  const src1 = await p.$eval('[data-lightbox-img]', (i) => i.getAttribute('src'));
  await p.keyboard.press('ArrowRight');
  const src2 = await p.$eval('[data-lightbox-img]', (i) => i.getAttribute('src'));
  await p.keyboard.press('Escape');
  const closed = await p.$eval('dialog.lightbox', (d) => !d.open);
  check(`gallery ${r}`, total > visible && visible > 0 && open && src1 !== src2 && closed, `total=${total} icons=${visible}`);
  await p.close();
}

// Request preselect
for (const r of ['/program/taine/', '/en/schedule/sacraments/']) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  const picks = await p.$$('[data-request-pick]');
  const last = picks[picks.length - 1];
  const want = await last.getAttribute('data-request-pick');
  await last.click();
  await p.waitForTimeout(400);
  const sel = await p.$eval('[data-request-service]', (s) => s.value);
  check(`request preselect ${r}`, sel === want, `${want} -> ${sel}`);
  await p.close();
}

// Mobile menu still works on an inner page
const m = await b.newContext({ viewport: { width: 360, height: 800 } });
for (const r of ['/parohie/cler/', '/en/schedule/sacraments/']) {
  const p = await m.newPage();
  await p.goto(base + r);
  const toggle = await p.$('.nav-toggle, [data-nav-toggle], button[aria-controls]');
  await toggle.click();
  await p.waitForTimeout(400);
  const expanded = await toggle.getAttribute('aria-expanded');
  check(`mobile menu ${r}`, expanded === 'true', `expanded=${expanded}`);
  await p.close();
}

// Em dash scan in built HTML of inner pages
for (const r of inner) {
  const p = await ctx.newPage();
  await p.goto(base + r);
  const txt = await p.evaluate(() => document.body.innerText);
  check(`no em dash ${r}`, !txt.includes('\u2014'), '');
  await p.close();
}

await b.close();
server.close();
console.log(out.filter((l) => l.startsWith('FAIL')).join('\n') || 'ALL PASS');
console.log(`${out.length} checks`);
