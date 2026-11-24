/**
 * Central image map: swap paths here to rebrand the template.
 * All files live under public/images/ as WebP. See CREDITS.md.
 */
export const images = {
  hero: {
    src: '/images/hero-monastery.webp',
    alt: {
      ro: 'Mănăstire ortodoxă românească la răsărit',
      en: 'Romanian Orthodox monastery at sunrise',
    },
  },
  parish: {
    src: '/images/parish-exterior.webp',
    alt: {
      ro: 'Fațada bisericii parohiale',
      en: 'Parish church exterior',
    },
  },
  interior: {
    src: '/images/church-interior.webp',
    alt: {
      ro: 'Interior de biserică ortodoxă',
      en: 'Orthodox church interior',
    },
  },
  gallery: [
    {
      src: '/images/gallery-01.webp',
      alt: { ro: 'Turnuri de lemn Maramureș', en: 'Maramureș wooden church spires' },
    },
    {
      src: '/images/gallery-02.webp',
      alt: { ro: 'Fresce moldovenești', en: 'Moldavian frescoes' },
    },
    {
      src: '/images/gallery-03.webp',
      alt: { ro: 'Arhitectură brâncovenească', en: 'Brâncovenesc architecture' },
    },
    {
      src: '/images/gallery-04.webp',
      alt: { ro: 'Curtea mănăstirii', en: 'Monastery courtyard' },
    },
  ],
  donate: {
    src: '/images/donate-band.webp',
    alt: {
      ro: 'Mănăstirea Putna, exterior calm',
      en: 'Putna Monastery, calm exterior',
    },
  },
  contact: {
    src: '/images/contact-visit.webp',
    alt: {
      ro: 'Poarta bisericii',
      en: 'Church gate',
    },
  },
  livestream: {
    src: '/images/livestream-poster.webp',
    alt: {
      ro: 'Iconostas, imagine de fundal transmisie',
      en: 'Iconostasis, livestream poster',
    },
  },
  /** Photographic heroes for the inner pages (1920x960) */
  pages: {
    parish: { src: '/images/page-parish.webp', alt: { ro: 'Mănăstirea Humor, biserica pictată', en: 'Humor Monastery, the painted church' } },
    history: { src: '/images/page-history.webp', alt: { ro: 'Judecata de Apoi, fresca de la Voroneț', en: 'The Last Judgement fresco at Voroneț' } },
    clergy: { src: '/images/page-clergy.webp', alt: { ro: 'Interior pictat al Bisericii Stelea', en: 'Painted interior of Stelea Church' } },
    gallery: { src: '/images/page-gallery.webp', alt: { ro: 'Fresce pe fond albastru la Mănăstirea Humor', en: 'Frescoes on a blue ground at Humor Monastery' } },
    schedule: { src: '/images/page-schedule.webp', alt: { ro: 'Iconostas pictat într-o biserică românească', en: 'Painted iconostasis in a Romanian church' } },
    sacraments: { src: '/images/page-sacraments.webp', alt: { ro: 'Iconostas aurit', en: 'Gilded iconostasis' } },
    news: { src: '/images/page-news.webp', alt: { ro: 'Mănăstirea Voroneț iarna', en: 'Voroneț Monastery in winter' } },
    livestream: { src: '/images/page-livestream.webp', alt: { ro: 'Interiorul Bisericii Stavropoleos', en: 'Interior of Stavropoleos Church' } },
    pomelnice: { src: '/images/page-pomelnice.webp', alt: { ro: 'Lumânări aprinse', en: 'Lit candles' } },
    donate: { src: '/images/page-donate.webp', alt: { ro: 'Biserica pictată a Mănăstirii Arbore', en: 'The painted church of Arbore Monastery' } },
    contact: { src: '/images/page-contact.webp', alt: { ro: 'Mănăstirea Sucevița', en: 'Sucevița Monastery' } },
    notFound: { src: '/images/page-404.webp', alt: { ro: 'Frescă de la Voroneț', en: 'Fresco at Voroneț' } },
  },
  /** Supporting photos and icons used across inner pages */
  media: {
    humor: { src: '/images/humor-ensemble.webp', w: 1200, h: 900, alt: { ro: 'Mănăstirea Humor', en: 'Humor Monastery' } },
    dragomirna: { src: '/images/dragomirna.webp', w: 1200, h: 900, alt: { ro: 'Mănăstirea Dragomirna', en: 'Dragomirna Monastery' } },
    botiza: { src: '/images/wooden-botiza.webp', w: 900, h: 1200, alt: { ro: 'Biserica de lemn din Botiza, Maramureș', en: 'Wooden church in Botiza, Maramureș' } },
    voronet: { src: '/images/voronet-summer.webp', w: 1200, h: 900, alt: { ro: 'Mănăstirea Voroneț', en: 'Voroneț Monastery' } },
    candleBoxes: { src: '/images/candle-boxes.webp', w: 1200, h: 900, alt: { ro: 'Sfeșnice pentru vii și pentru adormiți', en: 'Candle stands for the living and the departed' } },
    candles: { src: '/images/candles.webp', w: 900, h: 1200, alt: { ro: 'Lumânări aprinse', en: 'Lit candles' } },
    frescoMoldovita: { src: '/images/fresco-moldovita.webp', w: 1200, h: 900, alt: { ro: 'Asediul Constantinopolului, frescă la Moldovița', en: 'The Siege of Constantinople, fresco at Moldovița' } },
    frescoSucevita: { src: '/images/fresco-sucevita.webp', w: 1200, h: 900, alt: { ro: 'Fresce la Sucevița', en: 'Frescoes at Sucevița' } },
    frescoVoronet: { src: '/images/fresco-voronet.webp', w: 1200, h: 900, alt: { ro: 'Fresce pe fond albastru la Voroneț', en: 'Frescoes on Voroneț blue' } },
    frescoHumor: { src: '/images/fresco-humor.webp', w: 1200, h: 900, alt: { ro: 'Fresce la Humor', en: 'Frescoes at Humor' } },
    iconNicholas: { src: '/images/icon-nicholas.webp', w: 900, h: 1200, alt: { ro: 'Sfântul Nicolae, icoană din Banat, secolul al XVIII-lea', en: 'Saint Nicholas, icon from Banat, 18th century' } },
    iconNicholasGlass: { src: '/images/icon-nicholas-glass.webp', w: 900, h: 1200, alt: { ro: 'Sfântul Nicolae, icoană pe sticlă din Maramureș', en: 'Saint Nicholas, icon on glass from Maramureș' } },
    iconTheotokosGlass: { src: '/images/icon-theotokos-glass.webp', w: 900, h: 1200, alt: { ro: 'Maica Domnului, icoană pe sticlă din Transilvania', en: 'The Theotokos, icon on glass from Transylvania' } },
    iconTheotokosBlue: { src: '/images/icon-theotokos-blue.webp', w: 900, h: 1200, alt: { ro: 'Maica Domnului cu Pruncul, icoană pe sticlă', en: 'Theotokos and Child, icon on glass' } },
    iconostasis: { src: '/images/iconostasis-gold.webp', w: 1200, h: 900, alt: { ro: 'Iconostas aurit', en: 'Gilded iconostasis' } },
    stelea: { src: '/images/interior-stelea.webp', w: 900, h: 1200, alt: { ro: 'Interior pictat, Biserica Stelea', en: 'Painted interior, Stelea Church' } },
  },
  og: {
    src: '/images/og-default.webp',
    alt: { ro: 'Imagine socială', en: 'Social share image' },
  },
} as const;
