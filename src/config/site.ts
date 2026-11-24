/**
 * Site-level configuration for the Romanian Orthodox parish template.
 * Swap parish details, calendar style, and feature flags here.
 */
export const siteConfig = {
  /** Parish display name (Romanian diacritics supported) */
  name: {
    ro: 'Parohia Sfântul Nicolae',
    en: 'Saint Nicholas Parish',
  },
  shortName: {
    ro: 'Sf. Nicolae',
    en: 'St. Nicholas',
  },
  tagline: {
    ro: 'Biserica Ortodoxă Română',
    en: 'Romanian Orthodox Church',
  },
  /** Julian ('old') or Revised Julian / civil ('new') calendar label on schedules */
  calendarStyle: 'new' as 'new' | 'old',
  address: {
    street: 'Strada Bisericii 12',
    city: 'Cluj-Napoca',
    region: 'Cluj',
    postal: '400000',
    country: {
      ro: 'România',
      en: 'Romania',
    },
  },
  phone: '(026)-412-3456',
  email: 'contact@parohie-exemplu.ro',
  mapQuery: 'Biserica Ortodoxa Cluj-Napoca',
  mapUrl: 'https://www.openstreetmap.org/search?query=Cluj-Napoca%20Biserica',
  livestreamUrl: 'https://www.youtube.com/embed/live_stream?channel=CHANNEL_ID',
  social: {
    facebook: '',
    youtube: '',
  },
  /** Optional page blocks — set false to hide */
  features: {
    aboutBlock: true,
    visitingBlock: true,
    donationProgress: false,
    /** Only meaningful when donationProgress is true and totals are auto-counted */
    donationAutoCount: false,
  },
  donation: {
    suggestedAmounts: [50, 100, 200, 500],
    currency: 'RON',
  },
  /** Map links used on the contact page */
  maps: {
    google: 'https://www.google.com/maps/search/?api=1&query=Biserica%20Ortodoxa%20Cluj-Napoca',
    apple: 'https://maps.apple.com/?q=Biserica%20Ortodoxa%20Cluj-Napoca',
    osm: 'https://www.openstreetmap.org/search?query=Cluj-Napoca%20Biserica',
  },
  /** First entry is featured on the clergy page. Leave photo empty to show the placeholder portrait. */
  clergy: [
    {
      name: 'Pr. Ioan Popescu',
      role: { ro: 'Paroh', en: 'Parish Priest' },
      bio: {
        ro: 'Slujește în parohie din 2008. Text exemplu: adăugați aici o scurtă prezentare.',
        en: 'Has served the parish since 2008. Sample text: add a short introduction here.',
      },
      email: 'paroh@parohie-exemplu.ro',
      phone: '(026)-412-3456',
      photo: '',
    },
    {
      name: 'Pr. Andrei Ionescu',
      role: { ro: 'Preot slujitor', en: 'Assistant Priest' },
      bio: { ro: 'Slujește în parohie din 2019.', en: 'Has served the parish since 2019.' },
      email: 'preot@parohie-exemplu.ro',
      photo: '',
    },
    {
      name: 'Diac. Mihai Stan',
      role: { ro: 'Diacon', en: 'Deacon' },
      bio: { ro: 'Slujește la Sfânta Liturghie de duminică.', en: 'Serves at the Sunday Divine Liturgy.' },
      photo: '',
    },
    {
      name: 'Ion Marin',
      role: { ro: 'Cântăreț bisericesc', en: 'Cantor' },
      bio: { ro: 'Conduce strana la toate slujbele.', en: 'Leads the chant at every service.' },
      photo: '',
    },
    {
      name: 'Elena Pop',
      role: { ro: 'Dirijorul corului', en: 'Choir director' },
      bio: { ro: 'Repetiții în fiecare joi, la ora 18:30.', en: 'Rehearsals every Thursday at 18:30.' },
      photo: '',
    },
    {
      name: 'Gheorghe Dumitru',
      role: { ro: 'Epitrop', en: 'Churchwarden' },
      bio: { ro: 'Se ocupă de administrarea parohiei.', en: 'Looks after parish administration.' },
      photo: '',
    },
  ],
} as const;

export type Locale = 'ro' | 'en';
export type CalendarStyle = typeof siteConfig.calendarStyle;
