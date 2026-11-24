/**
 * Gallery page items. Categories drive the filter chips.
 * Images live in public/images/ (see CREDITS.md).
 */
import { images } from './images';

export type GalleryCategory = 'churches' | 'frescoes' | 'icons' | 'details';

type GalleryItem = {
  src: string;
  w: number;
  h: number;
  alt: { ro: string; en: string };
  category: GalleryCategory;
};

const m = images.media;

export const galleryItems: GalleryItem[] = [
  { ...m.humor, category: 'churches' },
  { ...m.frescoVoronet, category: 'frescoes' },
  { ...m.iconNicholas, category: 'icons' },
  { src: images.gallery[0].src, w: 1000, h: 1500, alt: images.gallery[0].alt, category: 'churches' },
  { ...m.frescoMoldovita, category: 'frescoes' },
  { ...m.iconTheotokosBlue, category: 'icons' },
  { ...m.candleBoxes, category: 'details' },
  { ...m.voronet, category: 'churches' },
  { ...m.frescoSucevita, category: 'frescoes' },
  { ...m.iconNicholasGlass, category: 'icons' },
  { ...m.stelea, category: 'details' },
  { ...m.botiza, category: 'churches' },
  { ...m.frescoHumor, category: 'frescoes' },
  { ...m.iconTheotokosGlass, category: 'icons' },
  { ...m.candles, category: 'details' },
  { src: images.gallery[1].src, w: 1000, h: 1170, alt: { ro: 'Mănăstirea Sucevița', en: 'Sucevița Monastery' }, category: 'churches' },
  { ...m.iconostasis, category: 'icons' },
  { src: images.gallery[3].src, w: 1000, h: 834, alt: images.gallery[3].alt, category: 'details' },
  { ...m.dragomirna, category: 'churches' },
];

/** Framed icons for the featured band */
export const featuredIcons = [m.iconNicholas, m.iconTheotokosBlue, m.iconNicholasGlass, m.iconTheotokosGlass];
