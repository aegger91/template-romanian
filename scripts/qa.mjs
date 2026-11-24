/**
 * Headless QA: every page × every language × 360/768/1280
 * Checks: horizontal overflow, clipped text heuristics, broken in-site links, console errors.
 */
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '..', 'dist');
const widths = [360, 768, 1280];
const routes = [
  '/',
  '/parohie/',
  '/parohie/istoric/',
  '/parohie/cler/',
  '/parohie/galerie/',
  '/program/',
  '/program/taine/',
  '/stiri/',
  '/transmisie/',
  '/pomelnice/',
  '/donatii/',
  '/contact/',
  '/en/',
  '/en/parish/',
  '/en/parish/history/',
  '/en/parish/clergy/',
  '/en/parish/gallery/',
  '/en/schedule/',
  '/en/schedule/sacraments/',
  '/en/news/',
  '/en/livestream/',
  '/en/commemoration/',
  '/en/donate/',
  '/en/contact/',
  '/404.html',
];

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.json': 'application/json',
};

function resolvePath(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0]);
  if (p.endsWith('/')) p += 'index.html';
  if (!extname(p)) {
    const asFile = join(root, p + '.html');
    if (existsSync(asFile)) return asFile;
    const asIndex = join(root, p, 'index.html');
    if (existsSync(asIndex)) return asIndex;
  }
  return join(root, p);
}

const server = createServer((req, res) => {
  const file = resolvePath(req.url || '/');
  if (!file.startsWith(root) || !existsSync(file) || statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
  res.end(readFileSync(file));
});

await new Promise((r) => server.listen(4173, r));
const base = 'http://127.0.0.1:4173';

const browser = await chromium.launch({ headless: true });
const results = [];
let failures = 0;

for (const route of routes) {
  for (const width of widths) {
    const consoleErrors = [];
    const page = await browser.newPage({
      viewport: { width, height: 900 },
    });
    page.on('pageerror', (err) => consoleErrors.push(String(err)));
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const url = base + route;
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    const status = response?.status() ?? 0;

    const metrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const overflowX = Math.max(doc.scrollWidth, body.scrollWidth) > doc.clientWidth + 1;

      function isIgnored(el) {
        if (!el || el.nodeType !== 1) return true;
        if (el.closest('.skip-link, .sr-only, [hidden], .panel:not(.is-open), .panel-backdrop:not(.is-open)')) return true;
        if (el.hasAttribute('hidden') || el.getAttribute('aria-hidden') === 'true') return true;
        if (el.closest('details:not([open])') && !el.closest('summary')) return true;
        const style = getComputedStyle(el);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return true;
        // clipped intentionally for a11y
        if (style.clipPath === 'rect(0px, 0px, 0px, 0px)' || style.clip === 'rect(0px, 0px, 0px, 0px)') return true;
        return false;
      }

      const clipped = [];
      const nodes = Array.from(document.querySelectorAll('h1,h2,h3,p,a,button,label,li,span'));
      for (const el of nodes) {
        if (isIgnored(el)) continue;
        const style = getComputedStyle(el);
        const text = (el.textContent || '').trim();
        if (!text) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1) continue;
        if (el.scrollWidth > el.clientWidth + 2 && (style.overflow === 'hidden' || style.overflowX === 'hidden')) {
          clipped.push({ tag: el.tagName, text: text.slice(0, 60) });
        }
        if (rect.right > window.innerWidth + 2 || rect.left < -2) {
          clipped.push({ tag: el.tagName, text: text.slice(0, 60), reason: 'viewport' });
        }
      }

      const broken = [];
      for (const a of document.querySelectorAll('a[href]')) {
        if (isIgnored(a)) continue;
        const href = a.getAttribute('href') || '';
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http') || href.startsWith('blob:')) continue;
        broken.push(href);
      }

      let overlap = 0;
      const boxes = nodes
        .filter((el) => !isIgnored(el))
        .map((el) => ({ el, r: el.getBoundingClientRect(), t: (el.textContent || '').trim() }))
        .filter((x) => x.t && x.r.width > 20 && x.r.height > 10 && x.r.bottom > 0 && x.r.top < window.innerHeight);
      for (let i = 0; i < Math.min(boxes.length, 80); i++) {
        for (let j = i + 1; j < Math.min(boxes.length, 80); j++) {
          const a = boxes[i].r;
          const b = boxes[j].r;
          if (boxes[i].el.contains(boxes[j].el) || boxes[j].el.contains(boxes[i].el)) continue;
          const ix = Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left));
          const iy = Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top));
          const inter = ix * iy;
          if (inter > 80 && ix > 20 && iy > 12) {
            if (a.top < 90 && b.top < 90) continue;
            overlap++;
          }
        }
      }

      return { overflowX, clipped: clipped.slice(0, 8), linkHrefs: [...new Set(broken)], overlap };
    });

    const brokenLinks = [];
    for (const href of metrics.linkHrefs) {
      let target = href;
      if (href.startsWith('/')) target = href;
      else {
        const u = new URL(href, url);
        target = u.pathname;
      }
      const res = await page.request.get(base + (target.startsWith('/') ? target : '/' + target));
      if (res.status() >= 400) brokenLinks.push({ href, status: res.status() });
    }

    const ok =
      status < 400 &&
      !metrics.overflowX &&
      metrics.clipped.length === 0 &&
      brokenLinks.length === 0 &&
      consoleErrors.length === 0 &&
      metrics.overlap === 0;

    if (!ok) failures++;
    results.push({
      route,
      width,
      status,
      overflowX: metrics.overflowX,
      clipped: metrics.clipped.length,
      overlap: metrics.overlap,
      brokenLinks: brokenLinks.length,
      consoleErrors: consoleErrors.length,
      ok,
      detail: { clipped: metrics.clipped, brokenLinks, consoleErrors },
    });
    await page.close();
  }
}

await browser.close();
server.close();

const checked = results.length;
const passed = results.filter((r) => r.ok).length;
console.log(JSON.stringify({ checked, passed, failed: failures, results }, null, 2));
process.exit(failures ? 1 : 0);
