import type { Locale } from '../config/site';

export const ui = {
  ro: {
    nav: {
      home: 'Acasă',
      parish: 'Parohia',
      schedule: 'Program',
      news: 'Știri',
      livestream: 'Transmisie',
      pomelnice: 'Pomelnice',
      donate: 'Donații',
      contact: 'Contact',
      about: 'Despre',
      history: 'Istoric',
      clergy: 'Cler',
      gallery: 'Galerie',
      sacraments: 'Taine și ierurgii',
      menu: 'Meniu',
      close: 'Închide',
      lang: 'Limbă',
    },
    paths: {
      home: '/',
      parish: '/parohie/',
      schedule: '/program/',
      news: '/stiri/',
      livestream: '/transmisie/',
      pomelnice: '/pomelnice/',
      donate: '/donatii/',
      contact: '/contact/',
      history: '/parohie/istoric/',
      clergy: '/parohie/cler/',
      gallery: '/parohie/galerie/',
      sacraments: '/program/taine/',
    },
    home: {
      heroCta: 'Programul săptămânii',
      heroSecondary: 'Contact',
      thisWeek: 'Slujbele săptămânii',
      nextFeast: 'Următoarea sărbătoare',
      news: 'Știri',
      gallery: 'Galerie',
      donateBandTitle: 'Sprijiniți parohia',
      donateBandText: 'Donațiile susțin slujirea și întreținerea bisericii.',
      donateBandCta: 'Donează',
      viewAll: 'Vezi tot',
      readMore: 'Citește',
    },
    parish: {
      title: 'Parohia noastră',
      aboutTitle: 'Despre',
      aboutText:
        'Parohia Sfântul Nicolae slujește comunitatea locală în tradiția Bisericii Ortodoxe Române. Textul acesta este un loc rezervat. Înlocuiți-l cu prezentarea parohiei.',
      clergyTitle: 'Cler',
      historyTitle: 'Istoric',
      historyText:
        'Biserica a fost ctitorită în secolul trecut. Completați aici pe scurt istoria parohiei, fără explicații catehetice.',
      visitingTitle: 'Vizitare',
      visitingText:
        'Biserica este deschisă în timpul slujbelor și după programul afișat. Pentru grupuri, contactați biroul parohial.',
    },
    schedule: {
      title: 'Programul slujbelor',
      intro: 'Orarul săptămânii curente. Apăsați o slujbă pentru detalii.',
      calendarNew: 'Calendar nou',
      calendarOld: 'Calendar vechi',
      oldStyleLabel: 'Stil vechi',
      addToCalendar: 'Adaugă în calendar',
      downloadIcs: 'Descarcă .ics',
      googleCal: 'Google Calendar',
      directions: 'Indicații',
      close: 'Închide',
      time: 'Ora',
      date: 'Data',
      location: 'Loc',
    },
    news: {
      title: 'Știri și evenimente',
      intro: 'Anunțuri și evenimente din viața parohiei.',
      upcoming: 'Evenimente viitoare',
      archive: 'Știri',
    },
    livestream: {
      title: 'Transmisie live',
      intro: 'Urmăriți slujbele atunci când transmisia este activă.',
      offline: 'Transmisia nu este activă momentan. Reveniți în timpul slujbelor.',
      openExternal: 'Deschide în fereastră nouă',
    },
    pomelnice: {
      title: 'Pomelnice',
      intro: 'Trimiteți numele pentru pomenire. Nu există sumă minimă.',
      living: 'Pentru vii',
      departed: 'Pentru adormiți',
      names: 'Nume (câte unul pe rând)',
      amount: 'Donație (opțional)',
      suggested: 'Sume sugerate',
      freeAmount: 'Altă sumă',
      submit: 'Trimite',
      note: 'Formular demonstrativ. Conectați-l la email sau la sistemul parohiei.',
      success: 'Mulțumim. Pomelnicul a fost înregistrat local (demo).',
    },
    donate: {
      title: 'Donații',
      intro: 'Sprijiniți lucrarea parohiei. Suma începe de la 0. Nu există minim.',
      amount: 'Sumă',
      suggested: 'Sume sugerate',
      freeAmount: 'Altă sumă',
      name: 'Nume',
      email: 'Email',
      message: 'Mesaj (opțional)',
      submit: 'Donează',
      note: 'Formular demonstrativ. Integrați procesatorul de plăți al parohiei.',
      success: 'Mulțumim pentru intenția de donație (demo).',
      progressLabel: 'Progres campanie',
    },
    contact: {
      title: 'Contact și vizitare',
      intro: 'Cum ne găsiți.',
      address: 'Adresă',
      phone: 'Telefon',
      email: 'Email',
      formTitle: 'Scrieți-ne',
      name: 'Nume',
      message: 'Mesaj',
      send: 'Trimite',
      map: 'Hartă',
      hours: 'Program birou',
      hoursText: 'Marți-vineri, 10:00-14:00 (exemplu).',
      success: 'Mesajul a fost salvat local (demo).',
    },
    footer: {
      rights: 'Toate drepturile rezervate.',
      template: 'Șablon parohie ortodoxă română',
    },
    notFound: {
      title: 'Pagina nu a fost găsită',
      text: 'Adresa solicitată nu există.',
      home: 'Înapoi acasă',
    },
    a11y: {
      skip: 'Sari la conținut',
      openSchedule: 'Deschide detaliile slujbei',
    },
  },
  en: {
    nav: {
      home: 'Home',
      parish: 'Our Parish',
      schedule: 'Services',
      news: 'Events & News',
      livestream: 'Livestream',
      pomelnice: 'Commemoration names',
      donate: 'Donate',
      contact: 'Contact',
      about: 'About',
      history: 'History',
      clergy: 'Clergy',
      gallery: 'Gallery',
      sacraments: 'Sacraments & services',
      menu: 'Menu',
      close: 'Close',
      lang: 'Language',
    },
    paths: {
      home: '/en/',
      parish: '/en/parish/',
      schedule: '/en/schedule/',
      news: '/en/news/',
      livestream: '/en/livestream/',
      pomelnice: '/en/commemoration/',
      donate: '/en/donate/',
      contact: '/en/contact/',
      history: '/en/parish/history/',
      clergy: '/en/parish/clergy/',
      gallery: '/en/parish/gallery/',
      sacraments: '/en/schedule/sacraments/',
    },
    home: {
      heroCta: "This week's services",
      heroSecondary: 'Contact',
      thisWeek: "This week's services",
      nextFeast: 'Next feast',
      news: 'News',
      gallery: 'Gallery',
      donateBandTitle: 'Support the parish',
      donateBandText: 'Gifts sustain worship and the care of the church.',
      donateBandCta: 'Donate',
      viewAll: 'View all',
      readMore: 'Read more',
    },
    parish: {
      title: 'Our Parish',
      aboutTitle: 'About',
      aboutText:
        'Saint Nicholas Parish serves the local community in the Romanian Orthodox tradition. This is placeholder copy. Replace it with your parish introduction.',
      clergyTitle: 'Clergy',
      historyTitle: 'History',
      historyText:
        'The church was founded in the last century. Add a short parish history here, without catechetical explanation.',
      visitingTitle: 'Visiting',
      visitingText:
        'The church is open during services and posted hours. For groups, please contact the parish office.',
    },
    schedule: {
      title: 'Service schedule',
      intro: 'Current week timetable. Select a service for details.',
      calendarNew: 'New calendar',
      calendarOld: 'Old calendar',
      oldStyleLabel: 'Old Style',
      addToCalendar: 'Add to calendar',
      downloadIcs: 'Download .ics',
      googleCal: 'Google Calendar',
      directions: 'Directions',
      close: 'Close',
      time: 'Time',
      date: 'Date',
      location: 'Location',
    },
    news: {
      title: 'Events & News',
      intro: 'Announcements and parish life.',
      upcoming: 'Upcoming events',
      archive: 'News',
    },
    livestream: {
      title: 'Livestream',
      intro: 'Watch services when the stream is live.',
      offline: 'The stream is not active right now. Please return during services.',
      openExternal: 'Open in a new window',
    },
    pomelnice: {
      title: 'Commemoration names',
      intro: 'Submit names for commemoration. There is no minimum amount.',
      living: 'For the living',
      departed: 'For the departed',
      names: 'Names (one per line)',
      amount: 'Donation (optional)',
      suggested: 'Suggested amounts',
      freeAmount: 'Other amount',
      submit: 'Submit',
      note: 'Demo form. Connect it to email or your parish system.',
      success: 'Thank you. The list was saved locally (demo).',
    },
    donate: {
      title: 'Donate',
      intro: 'Support the parish. Amounts start at 0. There is no minimum.',
      amount: 'Amount',
      suggested: 'Suggested amounts',
      freeAmount: 'Other amount',
      name: 'Name',
      email: 'Email',
      message: 'Message (optional)',
      submit: 'Donate',
      note: 'Demo form. Integrate your parish payment processor.',
      success: 'Thank you for your gift intention (demo).',
      progressLabel: 'Campaign progress',
    },
    contact: {
      title: 'Contact & Visit',
      intro: 'How to find us.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      formTitle: 'Write to us',
      name: 'Name',
      message: 'Message',
      send: 'Send',
      map: 'Map',
      hours: 'Office hours',
      hoursText: 'Tuesday-Friday, 10:00-14:00 (example).',
      success: 'Your message was saved locally (demo).',
    },
    footer: {
      rights: 'All rights reserved.',
      template: 'Romanian Orthodox parish template',
    },
    notFound: {
      title: 'Page not found',
      text: 'The requested address does not exist.',
      home: 'Back home',
    },
    a11y: {
      skip: 'Skip to content',
      openSchedule: 'Open service details',
    },
  },
} as const;

export type UiDict = (typeof ui)[Locale];

export function t(locale: Locale): UiDict {
  return ui[locale];
}

export function pathFor(locale: Locale, key: keyof UiDict['paths']): string {
  return ui[locale].paths[key];
}

/** Map a path from one locale to the other */
export function switchLocalePath(currentPath: string, target: Locale): string {
  const roToEn: Record<string, string> = {
    '/': '/en/',
    '/parohie/': '/en/parish/',
    '/program/': '/en/schedule/',
    '/stiri/': '/en/news/',
    '/transmisie/': '/en/livestream/',
    '/pomelnice/': '/en/commemoration/',
    '/donatii/': '/en/donate/',
    '/contact/': '/en/contact/',
    '/parohie/istoric/': '/en/parish/history/',
    '/parohie/cler/': '/en/parish/clergy/',
    '/parohie/galerie/': '/en/parish/gallery/',
    '/program/taine/': '/en/schedule/sacraments/',
  };
  const enToRo: Record<string, string> = Object.fromEntries(
    Object.entries(roToEn).map(([ro, en]) => [en, ro]),
  );

  let normalized = currentPath.split('?')[0].split('#')[0];
  if (normalized.endsWith('.html')) normalized = normalized.replace(/\.html$/, '/');
  if (!normalized.endsWith('/')) normalized += '/';
  // 404 and unknown routes fall back to home in the target language
  if (normalized === '/404/' || normalized.startsWith('/404')) {
    return target === 'en' ? '/en/' : '/';
  }

  const from = normalized.startsWith('/en/') || normalized === '/en/' ? 'en' : 'ro';
  if (from === target) {
    if (target === 'en') return enToRo[normalized] ? normalized : '/en/';
    return roToEn[normalized] ? normalized : '/';
  }

  if (target === 'en') return roToEn[normalized] ?? '/en/';
  return enToRo[normalized] ?? '/';
}
