import type { Locale } from '../config/site';
import { t } from '../i18n/ui';

export function crumbs(locale: Locale, trail: { label: string; href?: string }[]) {
  const d = t(locale);
  return [{ label: d.nav.home, href: d.paths.home }, ...trail];
}
