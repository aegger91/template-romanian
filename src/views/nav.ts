import type { Locale } from '../config/site';
import { t } from '../i18n/ui';

type TabKey = 'parish' | 'history' | 'clergy' | 'gallery' | 'schedule' | 'sacraments' | 'pomelnice' | 'livestream';

export function parishTabs(locale: Locale, current: TabKey) {
  const d = t(locale);
  return [
    { key: 'parish', href: d.paths.parish, label: d.nav.about },
    { key: 'history', href: d.paths.history, label: d.nav.history },
    { key: 'clergy', href: d.paths.clergy, label: d.nav.clergy },
    { key: 'gallery', href: d.paths.gallery, label: d.nav.gallery },
  ].map((i) => ({ ...i, current: i.key === current }));
}

export function serviceTabs(locale: Locale, current: TabKey) {
  const d = t(locale);
  return [
    { key: 'schedule', href: d.paths.schedule, label: d.nav.schedule },
    { key: 'sacraments', href: d.paths.sacraments, label: d.nav.sacraments },
    { key: 'pomelnice', href: d.paths.pomelnice, label: d.nav.pomelnice },
    { key: 'livestream', href: d.paths.livestream, label: d.nav.livestream },
  ].map((i) => ({ ...i, current: i.key === current }));
}

export function crumbs(locale: Locale, trail: { label: string; href?: string }[]) {
  const d = t(locale);
  return [{ label: d.nav.home, href: d.paths.home }, ...trail];
}
