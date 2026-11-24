# Romanian Orthodox Parish Template

Static-exportable parish website with a modern Romanian Orthodox design: Voroneț blue page frame, white rounded header card with a gold line-art church mark, tile-grid home on cream, photo banners and flat cards on inner pages. Accents are deep red and gold, with sparing embroidery motifs. Built with **Astro**: no CMS, no Vercel-specific dependencies. Fonts (Playfair Display, Inter, latin + latin-ext) are self-hosted in `public/fonts/`.

**Languages:** Romanian (default, `/`) and English (`/en/…`), with a RO | EN switcher in the header.

## Setup

```bash
npm install
npm run dev      # local preview
npm run build    # writes static site to dist/
```

Serve `dist/` with any static host or drop the folder into a website builder.

## Configuration

| File | Purpose |
|------|---------|
| `src/config/site.ts` | Parish name, address, phone, email, livestream URL, clergy, feature flags |
| `src/config/images.ts` | Image paths and alt text (swap photos in one place) |
| `src/config/schedule.ts` | Weekly services, feasts, news items |
| `src/config/gallery.ts` | Gallery photos, categories and featured icons |
| `src/i18n/ui.ts` | Navigation, paths and shared UI strings (RO / EN) |
| `src/i18n/pages.ts` | Inner page copy: headings, cards, timeline, sacraments, steps (RO / EN) |

Inner pages are built from shared views in `src/views/`; each file under `src/pages/` only passes the locale.

### `calendarStyle`

In `site.ts`, set:

```ts
calendarStyle: 'new' // or 'old'
```

- `'new'` (default): civil / Revised Julian dates; badge shows “Calendar nou / New calendar”
- `'old'`: also shows Old Style (Julian, −13 days) next to schedule items

### Optional blocks

```ts
features: {
  aboutBlock: true,      // About section on Our Parish
  visitingBlock: true,   // Visiting / office hours copy
  donationProgress: false,
  donationAutoCount: false, // progress only if both true
}
```

## Swapping images

1. Replace WebP files under `public/images/` (keep filenames) **or** point `src/config/images.ts` to new paths.
2. Update `public/images/CREDITS.md`.

## Swapping text

Edit `src/i18n/ui.ts` for labels and placeholders. Parish-specific prose also lives in `site.ts` (names) and schedule/news config.

## Pages

| RO | EN |
|----|----|
| `/` | `/en/` |
| `/parohie/` | `/en/parish/` |
| `/parohie/istoric/` | `/en/parish/history/` |
| `/parohie/cler/` | `/en/parish/clergy/` |
| `/parohie/galerie/` | `/en/parish/gallery/` |
| `/program/` | `/en/schedule/` |
| `/program/taine/` | `/en/schedule/sacraments/` |
| `/stiri/` | `/en/news/` |
| `/transmisie/` | `/en/livestream/` |
| `/pomelnice/` | `/en/commemoration/` |
| `/donatii/` | `/en/donate/` |
| `/contact/` | `/en/contact/` |
| `404` | (shared; language switcher available) |

## Forms & schedule

- Donation and Pomelnice / Commemoration forms: amount starts at **0**, suggested chips + free field, **no minimum**, no QR codes.
- Schedule items (week calendar, event list, weekly list) open a detail panel with **.ics** download, **Google Calendar** link, and directions.
- Sacrament request form: each sacrament card preselects its service in the form.
- Contact phone field uses mask `(000)-000-0000`.

## QA script

```bash
npm run build
npx playwright install chromium
node scripts/qa.mjs          # overflow, clipping, links at 360/768/1280
node scripts/functional.mjs  # JS-off content, schedule panels, forms at 0, gallery, menu
node scripts/language-fit.mjs # RO/EN diacritics, overflow, nav alignment, menus at 360/768/1280
```
