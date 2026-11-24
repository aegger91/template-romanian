/**
 * Language-fit check: every page in RO and EN at 360, 768 and 1280.
 * Counts clipped diacritics (ă â î ș ț), missing diacritic glyphs, text overflow,
 * nav misalignment and mobile/desktop menu glitches. Exits 1 on any issue.
 */
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const widths = [360, 768, 1280];
const ro = ['/', '/parohie/', '/parohie/istoric/', '/parohie/cler/', '/parohie/galerie/', '/program/', '/program/taine/', '/stiri/', '/transmisie/', '/pomelnice/', '/donatii/', '/contact/', '/404.html'];
const en = ['/en/', '/en/parish/', '/en/parish/history/', '/en/parish/clergy/', '/en/parish/gallery/', '/en/schedule/', '/en/schedule/sacraments/', '/en/news/', '/en/livestream/', '/en/commemoration/', '/en/donate/', '/en/contact/'];
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };

const server = createServer((req, res) => {
  let p = decodeURIComponent((req.url || '/').split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  const f = join(root, p);
  if (!existsSync(f) || statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'Content-Type': mime[extname(f)] || 'application/octet-stream' });
  res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch();

const totals = { pages: 0, diacriticNodes: 0, clippedDiacritics: 0, tightLineHeight: 0, missingGlyphs: 0, textOverflow: 0, pageOverflow: 0, navMisaligned: 0, menuGlitches: 0 };
const issues = [];

for (const route of [...ro, ...en]) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() => document.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-visible')));
    await page.waitForTimeout(800);
    totals.pages++;

    const r = await page.evaluate(() => {
      const DIA = /[ăâîșțĂÂÎȘȚşţŞŢ]/;
      const out = { diacriticNodes: 0, clipped: [], tight: [], glyphs: [], overflow: [], pageOverflow: false };
      const visible = (el) => {
        if (el.closest('[hidden], .sr-only, .panel, .panel-backdrop, dialog:not([open])')) return false;
        const det = el.closest('details:not([open])');
        if (det && !el.closest('summary')) return false;
        const s = getComputedStyle(el);
        return s.display !== 'none' && s.visibility !== 'hidden';
      };
      const clippers = (el) => {
        const list = [];
        for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
          const s = getComputedStyle(a);
          if (['hidden', 'clip', 'auto', 'scroll'].includes(s.overflowY) || ['hidden', 'clip', 'auto', 'scroll'].includes(s.overflowX)) list.push(a);
        }
        return list;
      };
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const seenFonts = new Set();
      for (let n = walker.nextNode(); n; n = walker.nextNode()) {
        const text = n.textContent || '';
        if (!DIA.test(text)) continue;
        const el = n.parentElement;
        if (!el || !visible(el)) continue;
        const range = document.createRange();
        range.selectNodeContents(n);
        const rects = Array.from(range.getClientRects()).filter((rc) => rc.width > 0 && rc.height > 0);
        if (!rects.length) continue;
        out.diacriticNodes++;
        const s = getComputedStyle(el);
        const fs = parseFloat(s.fontSize);
        const lh = s.lineHeight === 'normal' ? fs * 1.2 : parseFloat(s.lineHeight);
        for (const c of clippers(el)) {
          const cr = c.getBoundingClientRect();
          for (const rc of rects) {
            if (rc.top < cr.top - 1 || rc.bottom > cr.bottom + 1 || rc.left < cr.left - 1 || rc.right > cr.right + 1) {
              out.clipped.push(`${el.tagName}.${el.className}: "${text.trim().slice(0, 40)}" in ${c.tagName}.${c.className}`);
              break;
            }
          }
        }
        if (lh / fs < 1.12 && /[ȘȚÂÎĂ]/.test(text)) out.tight.push(`${el.tagName}.${el.className} lh=${(lh / fs).toFixed(2)}`);
        const family = s.fontFamily.split(',')[0].replace(/["']/g, '').trim();
        const key = `${family}|${s.fontStyle}|${s.fontWeight}`;
        if (!seenFonts.has(key)) {
          seenFonts.add(key);
          const spec = `${s.fontStyle} ${s.fontWeight} 16px "${family}"`;
          if (!document.fonts.check(spec, 'ăâîșțĂÂÎȘȚ')) out.glyphs.push(spec);
        }
      }
      const doc = document.documentElement;
      out.pageOverflow = doc.scrollWidth > doc.clientWidth + 1;
      for (const el of document.querySelectorAll('h1,h2,h3,h4,p,a,button,label,li,span,dt,dd,time,legend')) {
        if (!visible(el) || !(el.textContent || '').trim()) continue;
        const rc = el.getBoundingClientRect();
        if (rc.width < 1) continue;
        if (rc.right > doc.clientWidth + 1 || rc.left < -1) out.overflow.push(`${el.tagName}.${el.className}: viewport "${el.textContent.trim().slice(0, 30)}"`);
        else if (el.scrollWidth > el.clientWidth + 2 && getComputedStyle(el).display !== 'inline' && (getComputedStyle(el).overflowX !== 'visible' || el.children.length === 0)) out.overflow.push(`${el.tagName}.${el.className}: scroll "${el.textContent.trim().slice(0, 30)}"`);
      }
      return out;
    });

    const nav = await page.evaluate((w) => {
      const glitches = [];
      let misaligned = 0;
      const navbar = document.querySelector('.navbar');
      const bar = document.querySelector('.masthead__bar');
      const top = document.querySelector('.masthead__top');
      const shown = (el) => el && getComputedStyle(el).display !== 'none';
      if (w >= 1024) {
        if (!shown(navbar) || !shown(top)) glitches.push('desktop header hidden');
        if (shown(bar)) glitches.push('mobile bar visible on desktop');
        const links = Array.from(document.querySelectorAll('.mainnav__list > .mainnav__item > .mainnav__link'));
        const tops = links.map((l) => Math.round(l.getBoundingClientRect().top));
        if (Math.max(...tops) - Math.min(...tops) > 2) misaligned++;
        const list = document.querySelector('.mainnav__list').getBoundingClientRect();
        const last = links[links.length - 1].getBoundingClientRect();
        const first = links[0].getBoundingClientRect();
        if (Math.abs((first.left - list.left) - (list.right - last.right)) > 3) misaligned++;
        const cols = Array.from(top.children).map((c) => c.getBoundingClientRect());
        for (let i = 1; i < cols.length; i++) if (cols[i].left < cols[i - 1].right - 1) misaligned++;
      } else {
        if (shown(navbar)) glitches.push('desktop nav visible on mobile');
        if (!shown(bar)) glitches.push('mobile bar hidden');
        const b = bar.getBoundingClientRect();
        const brand = bar.querySelector('.brand').getBoundingClientRect();
        const toggle = bar.querySelector('summary').getBoundingClientRect();
        if (brand.right > toggle.left) glitches.push('brand overlaps menu button');
        if (toggle.right > b.right + 9) glitches.push('menu button outside bar');
      }
      return { glitches, misaligned };
    }, width);

    if (width >= 1024) {
      for (const idx of [2, 3]) {
        await page.hover(`.mainnav__item:nth-child(${idx}) > .mainnav__link`);
        await page.waitForTimeout(300);
        const box = await page.$eval(`.mainnav__item:nth-child(${idx}) > .mainnav__sub`, (e) => {
          const r = e.getBoundingClientRect();
          return { vis: getComputedStyle(e).visibility, left: r.left, right: r.right, sw: e.scrollWidth, cw: e.clientWidth };
        });
        if (box.vis !== 'visible' || box.left < 0 || box.right > width || box.sw > box.cw + 1) nav.glitches.push(`dropdown ${idx} ${JSON.stringify(box)}`);
      }
    } else {
      await page.click('[data-mnav] > summary');
      await page.waitForTimeout(300);
      const m = await page.evaluate(() => {
        const panel = document.querySelector('.mnav__panel').getBoundingClientRect();
        const doc = document.documentElement;
        const bad = Array.from(document.querySelectorAll('.mnav__panel a')).filter((a) => {
          const r = a.getBoundingClientRect();
          return r.height > 0 && (r.right > doc.clientWidth + 1 || a.scrollWidth > a.clientWidth + 2);
        }).length;
        return { open: document.querySelector('[data-mnav]').open, top: panel.top, left: panel.left, right: panel.right, bad, overflow: doc.scrollWidth > doc.clientWidth + 1, cw: doc.clientWidth };
      });
      if (!m.open || m.left < -1 || m.right > m.cw + 1 || m.bad || m.overflow || m.top > 80) nav.glitches.push(`mobile menu ${JSON.stringify(m)}`);
      await page.keyboard.press('Escape');
    }

    totals.diacriticNodes += r.diacriticNodes;
    totals.clippedDiacritics += r.clipped.length;
    totals.tightLineHeight += r.tight.length;
    totals.missingGlyphs += r.glyphs.length;
    totals.textOverflow += r.overflow.length;
    totals.pageOverflow += r.pageOverflow ? 1 : 0;
    totals.navMisaligned += nav.misaligned;
    totals.menuGlitches += nav.glitches.length;
    const list = [...r.clipped, ...r.tight, ...r.glyphs.map((g) => `missing glyphs ${g}`), ...r.overflow, ...(r.pageOverflow ? ['page overflow'] : []), ...(nav.misaligned ? [`nav misaligned x${nav.misaligned}`] : []), ...nav.glitches];
    if (list.length) issues.push({ route, width, list: list.slice(0, 6) });
    await page.close();
  }
}

await browser.close();
server.close();
console.log(JSON.stringify({ totals, issues }, null, 2));
const bad = totals.clippedDiacritics + totals.tightLineHeight + totals.missingGlyphs + totals.textOverflow + totals.pageOverflow + totals.navMisaligned + totals.menuGlitches;
process.exit(bad ? 1 : 0);
