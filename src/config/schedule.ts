/**
 * Sample weekly services and upcoming feasts.
 * Times are local; edit freely for your parish.
 */
export type ScheduleItem = {
  id: string;
  title: { ro: string; en: string };
  description: { ro: string; en: string };
  /** ISO date YYYY-MM-DD (civil / new calendar) */
  date: string;
  startTime: string; // HH:mm
  endTime: string;
  location?: { ro: string; en: string };
  /** Marks services that are streamed on the livestream page */
  live?: boolean;
};

/** Offset in days: Old Style (Julian) is typically 13 days behind New Style */
export const OLD_STYLE_OFFSET_DAYS = 13;

const thisWeekServicesRaw: ScheduleItem[] = [
  {
    id: 'akathist-wed',
    title: { ro: 'Acatist', en: 'Akathist' },
    description: {
      ro: 'Acatistul Maicii Domnului.',
      en: 'Akathist to the Theotokos.',
    },
    date: nextWeekdayDate(3),
    startTime: '18:00',
    endTime: '18:45',
  },
  {
    id: 'vespers-sat',
    title: { ro: 'Vecernie', en: 'Vespers' },
    description: {
      ro: 'Slujba de seară de sâmbătă.',
      en: 'Saturday evening service.',
    },
    date: nextWeekdayDate(6),
    startTime: '17:00',
    endTime: '18:00',
    live: true,
  },
  {
    id: 'liturgy-sun',
    title: { ro: 'Sfânta Liturghie', en: 'Divine Liturgy' },
    description: {
      ro: 'Sfânta Liturghie duminicală.',
      en: 'Sunday Divine Liturgy.',
    },
    date: nextWeekdayDate(0),
    startTime: '09:00',
    endTime: '11:00',
    live: true,
  },
];

/** Always chronological by date, then start time */
export const thisWeekServices: ScheduleItem[] = [...thisWeekServicesRaw].sort(
  (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
);

const extraWeeklyServices: ScheduleItem[] = [
  {
    id: 'paraklesis-tue',
    title: { ro: 'Paraclisul Maicii Domnului', en: 'Paraklesis to the Theotokos' },
    description: { ro: 'Slujbă de rugăciune către Maica Domnului.', en: 'Service of supplication to the Theotokos.' },
    date: nextWeekdayDate(2),
    startTime: '18:00',
    endTime: '18:40',
  },
  {
    id: 'unction-thu',
    title: { ro: 'Sfântul Maslu', en: 'Holy Unction' },
    description: { ro: 'Taina Sfântului Maslu, pentru cei bolnavi.', en: 'The Sacrament of Holy Unction, for the sick.' },
    date: nextWeekdayDate(4),
    startTime: '18:00',
    endTime: '19:00',
  },
  {
    id: 'akathist-fri',
    title: { ro: 'Acatistul Sf. Nicolae', en: 'Akathist to St Nicholas' },
    description: { ro: 'Acatistul ocrotitorului parohiei.', en: 'Akathist to the patron of the parish.' },
    date: nextWeekdayDate(5),
    startTime: '18:00',
    endTime: '18:45',
  },
  {
    id: 'matins-sun',
    title: { ro: 'Utrenia', en: 'Matins' },
    description: { ro: 'Slujba de dimineață, înainte de Liturghie.', en: 'Morning service before the Liturgy.' },
    date: nextWeekdayDate(0),
    startTime: '07:30',
    endTime: '09:00',
  },
];

/** Fuller weekly pattern for the schedule page calendar */
export const weeklyServices: ScheduleItem[] = [...thisWeekServicesRaw, ...extraWeeklyServices].sort(
  (a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime),
);

export const nextFeast: ScheduleItem = {
  id: 'feast-nicholas',
  title: {
    ro: 'Sfântul Ierarh Nicolae',
    en: 'Saint Nicholas the Wonderworker',
  },
  description: {
    ro: 'Hramul parohiei. Sfânta Liturghie arhierească.',
    en: 'Parish feast day. Hierarchical Divine Liturgy.',
  },
  date: nextOrSameMonthDay(12, 6),
  startTime: '09:00',
  endTime: '12:00',
};

export const upcomingEvents: ScheduleItem[] = [
  nextFeast,
  {
    id: 'concert-colinde',
    title: { ro: 'Concert de colinde', en: 'Carol concert' },
    description: {
      ro: 'Corul parohiei prezintă colinde tradiționale.',
      en: 'Parish choir presents traditional carols.',
    },
    date: nextOrSameMonthDay(12, 20),
    startTime: '18:00',
    endTime: '19:30',
  },
  {
    id: 'catechesis-meeting',
    title: { ro: 'Adunare parohială', en: 'Parish assembly' },
    description: {
      ro: 'Adunarea anuală a credincioșilor.',
      en: 'Annual assembly of the faithful.',
    },
    date: nextOrSameMonthDay(1, 15),
    startTime: '12:00',
    endTime: '13:30',
  },
].sort((a, b) => a.date.localeCompare(b.date) || a.startTime.localeCompare(b.startTime));

export type NewsItem = {
  id: string;
  date: string;
  category: { ro: string; en: string };
  image: string;
  title: { ro: string; en: string };
  summary: { ro: string; en: string };
  body?: { ro: string; en: string };
};

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    date: '2026-11-10',
    category: { ro: 'Anunț', en: 'Notice' },
    image: '/images/dragomirna.webp',
    title: {
      ro: 'Lucrări de întreținere la acoperiș',
      en: 'Roof maintenance works',
    },
    summary: {
      ro: 'În următoarele săptămâni se vor desfășura lucrări de reparație.',
      en: 'Repair works will take place over the coming weeks.',
    },
    body: {
      ro: 'Slujbele continuă după programul obișnuit. Intrarea se face pe ușa laterală până la finalul lucrărilor.',
      en: 'Services continue as usual. Please use the side door until the works are finished.',
    },
  },
  {
    id: 'news-2',
    date: '2026-11-01',
    category: { ro: 'Parohie', en: 'Parish' },
    image: '/images/candle-boxes.webp',
    title: {
      ro: 'Program special de pomeniri',
      en: 'Special memorial schedule',
    },
    summary: {
      ro: 'Pomelnicele pot fi depuse la pangar în timpul săptămânii.',
      en: 'Commemoration lists may be submitted at the candle desk during the week.',
    },
  },
  {
    id: 'news-3',
    date: '2026-10-20',
    category: { ro: 'Mulțumiri', en: 'Thanks' },
    image: '/images/fresco-humor.webp',
    title: {
      ro: 'Mulțumiri pentru donatori',
      en: 'Thanks to donors',
    },
    summary: {
      ro: 'Mulțumim tuturor celor care au sprijinit parohia în această lună.',
      en: 'We thank all who supported the parish this month.',
    },
  },
  {
    id: 'news-4',
    date: '2026-10-04',
    category: { ro: 'Cor', en: 'Choir' },
    image: '/images/iconostasis-gold.webp',
    title: {
      ro: 'Corul parohiei își reia repetițiile',
      en: 'The parish choir resumes rehearsals',
    },
    summary: {
      ro: 'Repetițiile au loc în fiecare joi, la ora 18:30, în sala parohială.',
      en: 'Rehearsals take place every Thursday at 18:30 in the parish hall.',
    },
  },
];

/** Most recent past occurrence of a weekday (0=Sun … 6=Sat), before today */
export function previousWeekdayDate(weekday: number, weeksBack = 0): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const diff = ((d.getDay() - weekday + 7) % 7) || 7;
  d.setDate(d.getDate() - diff - weeksBack * 7);
  return toISODate(d);
}

/** ISO dates for the next `count` days, starting today */
export function nextDays(count: number): string[] {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const x = new Date(d);
    x.setDate(d.getDate() + i);
    return toISODate(x);
  });
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Next occurrence of weekday (0=Sun … 6=Sat), including today */
function nextWeekdayDate(weekday: number): string {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  const diff = (weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + diff);
  return toISODate(d);
}

/** Next occurrence of month/day (1-based month), including this year if upcoming */
function nextOrSameMonthDay(month: number, day: number): string {
  const now = new Date();
  now.setHours(12, 0, 0, 0);
  let d = new Date(now.getFullYear(), month - 1, day, 12);
  if (d < now) {
    d = new Date(now.getFullYear() + 1, month - 1, day, 12);
  }
  return toISODate(d);
}

export function oldStyleDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d, 12);
  dt.setDate(dt.getDate() - OLD_STYLE_OFFSET_DAYS);
  return toISODate(dt);
}
