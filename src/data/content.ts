// All visible text lives here, in English (US) and Spanish (Panama).
// Prices must match the Landing Dollar price list.

export type Locale = 'en' | 'es'
export type Market = 'US' | 'PA'
export type Trade = 'cleaning' | 'hvac' | 'detailing'

export const CONTACT_EMAIL = 'gabrielpecanha.dev@gmail.com'

type Plan = {
  id: string
  name: string
  /** Price in US dollars per market. */
  amount: Record<Market, number>
  /** True when the amount is a starting price. */
  from: boolean
  unit: string
  body: string
  // A detail can differ by market; plain strings apply to both.
  details: Array<string | Record<Market, string>>
}

/** The example page shown inside the phone in the hero. */
type MockPage = {
  label: string
  defaultName: string
  tagline: string
  services: string[]
  call: string
  quote: string
  area: string
  hours: string
}

type Copy = {
  meta: { title: string; description: string }
  brandLine: string
  nav: { prices: string; process: string; work: string; faq: string; cta: string; menu: string; close: string; theme: string }
  hero: {
    title: string
    body: string
    nameLabel: string
    tradeLabel: string
    primary: string
    secondary: string
    note: string
    caption: string
    mockAlt: (name: string) => string
  }
  mock: Record<Trade, MockPage>
  prices: {
    title: string
    intro: string
    marketLabel: string
    markets: Record<Market, string>
    fromLabel: string
    plans: Plan[]
    terms: string[]
  }
  process: { title: string; steps: Array<{ title: string; body: string }> }
  work: {
    title: string
    intro: string
    liveTitle: string
    conceptsTitle: string
    conceptsNote: string
    visit: string
    enlarge: string
  }
  about: { title: string; body: string[]; place: string }
  faq: { title: string; items: Array<{ q: string; a: string }> }
  contact: { title: string; body: string; button: string; orEmail: string }
  mail: { subject: (name: string) => string; body: (name: string, trade: string) => string }
  footer: { rights: string; top: string }
  dialog: { note: string; open: string; close: string }
  skip: string
}

export const copy: Record<Locale, Copy> = {
  en: {
    meta: {
      title: 'Landing Dollar | Websites for local service businesses',
      description:
        'Landing pages, website fixes and redesigns for local service businesses in the US and Panama. See a free preview of your page before you pay.',
    },
    brandLine: 'by Gabriel Peçanha',
    nav: {
      prices: 'Prices',
      process: 'How it works',
      work: 'Work',
      faq: 'Questions',
      cta: 'Get my free preview',
      menu: 'Menu',
      close: 'Close',
      theme: 'Switch between light and dark',
    },
    hero: {
      title: 'See your new website before you pay for it.',
      body: 'I build landing pages for cleaning companies, HVAC contractors, auto detailers and other local service businesses in the US and Panama. Send me your business name and I’ll make a free preview of your page.',
      nameLabel: 'Try it with your business name',
      tradeLabel: 'Type of business',
      primary: 'Send me my free preview',
      secondary: 'See prices',
      note: 'Free and without commitment. You only pay if you decide to go ahead.',
      caption: 'Example layout. Your real preview uses your services, photos and city.',
      mockAlt: (name) => `Example of a mobile website for ${name}`,
    },
    mock: {
      cleaning: {
        label: 'Cleaning',
        defaultName: 'Sparkle Cleaning Co.',
        tagline: 'Home and office cleaning, booked in two minutes.',
        services: ['Standard cleaning', 'Deep cleaning', 'Move-out cleaning'],
        call: 'Call now',
        quote: 'Free quote',
        area: 'Serving your city and nearby areas',
        hours: 'Open Monday to Saturday, 8 am to 6 pm',
      },
      hvac: {
        label: 'HVAC',
        defaultName: 'Northside Air',
        tagline: 'AC and heating repair, with same-week visits.',
        services: ['AC repair', 'Furnace tune-up', 'New system installs'],
        call: 'Call now',
        quote: 'Book a visit',
        area: 'Serving your city and nearby areas',
        hours: 'Open Monday to Saturday, 7 am to 7 pm',
      },
      detailing: {
        label: 'Auto detailing',
        defaultName: 'Gloss Lab Detailing',
        tagline: 'Paint correction, ceramic coating and interior detail.',
        services: ['Full detail', 'Ceramic coating', 'Interior refresh'],
        call: 'Call now',
        quote: 'Get a price',
        area: 'Mobile service in your city',
        hours: 'By appointment, Tuesday to Sunday',
      },
    },
    prices: {
      title: 'Prices',
      intro: 'Fixed prices, all in US dollars. Choose your market.',
      marketLabel: 'Market',
      markets: { US: 'United States', PA: 'Panama' },
      fromLabel: 'from',
      plans: [
        {
          id: 'lp',
          name: 'Landing page',
          amount: { US: 499, PA: 349 },
          from: false,
          unit: 'one-time',
          body: 'One page that explains your service and makes it easy to call you or ask for a quote.',
          details: [
            'Up to 6 sections',
            'Contact form that sends to your email',
            'Tap-to-call button',
            'Ready 15 days after your brief',
          ],
        },
        {
          id: 'fix',
          name: 'Website fix',
          amount: { US: 149, PA: 99 },
          from: true,
          unit: 'one-time',
          body: 'A fix on your current site: a broken form, a missing call button, a page that falls apart on phones.',
          details: [
            'One problem, in 5 business days',
            { US: 'Up to three problems: $249, in 7 business days', PA: 'Up to three problems: $149, in 7 business days' },
          ],
        },
        {
          id: 'rd',
          name: 'Redesign',
          amount: { US: 899, PA: 599 },
          from: true,
          unit: 'one-time',
          body: 'A new design for a site that no longer explains what you do.',
          details: ['Up to 5 pages', 'Final price after a short look at your site', 'Ready in 15 days'],
        },
        {
          id: 'care',
          name: 'Website care',
          amount: { US: 49, PA: 29 },
          from: false,
          unit: 'per month',
          body: 'Small changes and content updates after launch, so the site stays correct.',
          details: ['Up to 1 hour of changes a month', 'Uptime monitoring', 'Cancel with 30 days’ notice'],
        },
      ],
      terms: [
        'Pay 50% to start and 50% when you approve the page, before it goes live.',
        'Pay everything upfront and get 20% off.',
        'Two rounds of changes are included. Extra work is $35 an hour, and you approve it first.',
        'The domain is registered in your name. The code is yours after the final payment.',
        'Payments in US dollars through Wise.',
      ],
    },
    process: {
      title: 'How it works',
      steps: [
        {
          title: 'Free preview',
          body: 'I make a first version of your page with your business details. No payment, no commitment.',
        },
        { title: 'Brief and deposit', body: 'You confirm services, photos and contact details, and pay 50% to start.' },
        { title: 'Build and review', body: 'I finish the page. You review it on a private link and ask for changes twice.' },
        { title: 'Go live', body: 'After the final payment, the site goes live on a domain in your name.' },
      ],
    },
    work: {
      title: 'Work',
      intro: 'Live sites I designed and built, and design concepts for local service businesses.',
      liveTitle: 'Live projects',
      conceptsTitle: 'Concepts for local services',
      conceptsNote: 'Self-initiated designs to show possible directions. They are not client projects.',
      visit: 'Visit site',
      enlarge: 'Enlarge',
    },
    about: {
      title: 'Who you’ll work with',
      body: [
        'I’m Gabriel Peçanha, a web designer based in Brazil, working remotely with businesses in the US and Panama.',
        'I use AI-assisted tools to design and build, and I review every page myself, on a computer and on a phone, before you see it.',
        'You talk to me directly, from the first email to the launch.',
      ],
      place: 'Based in Brazil: one hour ahead of New York in summer, two hours ahead in winter.',
    },
    faq: {
      title: 'Questions',
      items: [
        { q: 'Do I pay for the preview?', a: 'No. If you don’t like the direction, you say no and that’s it.' },
        {
          q: 'Who owns the website?',
          a: 'You do. The domain is registered in your name, and the code is yours after the final payment.',
        },
        {
          q: 'Can you guarantee more customers?',
          a: 'No, and nobody honest can. What you get is a page that explains your service clearly and makes it easy to call you or ask for a quote.',
        },
        {
          q: 'Where is the site hosted?',
          a: 'On Vercel, under my account while you have a care plan. If you cancel, I transfer the project to you.',
        },
        {
          q: 'Can the page be in Spanish?',
          a: 'Yes. Your page can be in English or Spanish. A second language is quoted separately.',
        },
      ],
    },
    contact: {
      title: 'Get your free preview',
      body: 'Send your business name and your website or Google Maps link. I usually reply within one business day.',
      button: 'Send me my free preview',
      orEmail: 'Or write to',
    },
    mail: {
      subject: (name) => (name ? `Free preview request: ${name}` : 'Free preview request'),
      body: (name, trade) =>
        `Business name: ${name}\nType of business: ${trade}\nWebsite or Google Maps link:\nCity:\nWhat should the page help with?\n`,
    },
    footer: { rights: 'Landing Dollar is the web design service of Gabriel Peçanha.', top: 'Back to top' },
    dialog: { note: 'Saved screenshot of the page.', open: 'Open the live site', close: 'Close' },
    skip: 'Skip to content',
  },
  es: {
    meta: {
      title: 'Landing Dollar | Sitios web para negocios de servicios',
      description:
        'Landing pages, mejoras y rediseño de sitios para negocios de servicios en Panamá y Estados Unidos. Mira una vista previa gratis de tu página antes de pagar.',
    },
    brandLine: 'por Gabriel Peçanha',
    nav: {
      prices: 'Precios',
      process: 'Cómo funciona',
      work: 'Trabajos',
      faq: 'Preguntas',
      cta: 'Quiero mi vista previa',
      menu: 'Menú',
      close: 'Cerrar',
      theme: 'Cambiar entre claro y oscuro',
    },
    hero: {
      title: 'Mira tu nuevo sitio web antes de pagar por él.',
      body: 'Hago landing pages para empresas de limpieza, aire acondicionado, detallado automotriz y otros negocios de servicios en Panamá y Estados Unidos. Envíame el nombre de tu negocio y te hago una vista previa gratis de tu página.',
      nameLabel: 'Pruébalo con el nombre de tu negocio',
      tradeLabel: 'Tipo de negocio',
      primary: 'Quiero mi vista previa gratis',
      secondary: 'Ver precios',
      note: 'Gratis y sin compromiso. Solo pagas si decides seguir.',
      caption: 'Diseño de ejemplo. Tu vista previa real usa tus servicios, tus fotos y tu ciudad.',
      mockAlt: (name) => `Ejemplo de sitio web móvil para ${name}`,
    },
    mock: {
      cleaning: {
        label: 'Limpieza',
        defaultName: 'Casa Limpia Servicios',
        tagline: 'Limpieza de casas y oficinas, reservada en dos minutos.',
        services: ['Limpieza regular', 'Limpieza profunda', 'Limpieza de mudanza'],
        call: 'Llamar ahora',
        quote: 'Cotización gratis',
        area: 'Atendemos tu ciudad y alrededores',
        hours: 'Abierto de lunes a sábado, de 8 a. m. a 6 p. m.',
      },
      hvac: {
        label: 'Aire acondicionado',
        defaultName: 'Aire Norte',
        tagline: 'Reparación de aire acondicionado, con visitas en la misma semana.',
        services: ['Reparación de A/C', 'Mantenimiento preventivo', 'Instalación nueva'],
        call: 'Llamar ahora',
        quote: 'Agendar visita',
        area: 'Atendemos tu ciudad y alrededores',
        hours: 'Abierto de lunes a sábado, de 7 a. m. a 7 p. m.',
      },
      detailing: {
        label: 'Detallado automotriz',
        defaultName: 'Brillo Auto Spa',
        tagline: 'Corrección de pintura, recubrimiento cerámico y detallado interior.',
        services: ['Detallado completo', 'Recubrimiento cerámico', 'Interior a fondo'],
        call: 'Llamar ahora',
        quote: 'Pedir precio',
        area: 'Servicio a domicilio en tu ciudad',
        hours: 'Con cita, de martes a domingo',
      },
    },
    prices: {
      title: 'Precios',
      intro: 'Precios fijos, todos en dólares. Elige tu mercado.',
      marketLabel: 'Mercado',
      markets: { US: 'Estados Unidos', PA: 'Panamá' },
      fromLabel: 'desde',
      plans: [
        {
          id: 'lp',
          name: 'Landing page',
          amount: { US: 499, PA: 349 },
          from: false,
          unit: 'pago único',
          body: 'Una página que explica tu servicio y facilita que te llamen o te pidan una cotización.',
          details: [
            'Hasta 6 secciones',
            'Formulario que llega a tu correo',
            'Botón para llamar',
            'Lista 15 días después de recibir tu información',
          ],
        },
        {
          id: 'fix',
          name: 'Mejora puntual',
          amount: { US: 149, PA: 99 },
          from: true,
          unit: 'pago único',
          body: 'Una corrección en tu sitio actual: un formulario roto, un botón de llamada que falta, una página que se rompe en el celular.',
          details: [
            'Un problema, en 5 días hábiles',
            { US: 'Hasta tres problemas: $249, en 7 días hábiles', PA: 'Hasta tres problemas: $149, en 7 días hábiles' },
          ],
        },
        {
          id: 'rd',
          name: 'Rediseño',
          amount: { US: 899, PA: 599 },
          from: true,
          unit: 'pago único',
          body: 'Un diseño nuevo para un sitio que ya no explica lo que haces.',
          details: ['Hasta 5 páginas', 'Precio final después de revisar tu sitio', 'Listo en 15 días'],
        },
        {
          id: 'care',
          name: 'Mantenimiento',
          amount: { US: 49, PA: 29 },
          from: false,
          unit: 'al mes',
          body: 'Cambios pequeños y actualización de contenido después del lanzamiento, para que el sitio siga correcto.',
          details: ['Hasta 1 hora de cambios al mes', 'Monitoreo de disponibilidad', 'Cancelas con 30 días de aviso'],
        },
      ],
      terms: [
        'Pagas el 50% para empezar y el 50% cuando apruebas la página, antes de publicarla.',
        'Si pagas todo al inicio, tienes 20% de descuento.',
        'Incluye dos rondas de cambios. El trabajo extra cuesta $35 la hora, y lo apruebas antes.',
        'El dominio queda a tu nombre. El código es tuyo después del pago final.',
        'Pagos en dólares a través de Wise.',
      ],
    },
    process: {
      title: 'Cómo funciona',
      steps: [
        {
          title: 'Vista previa gratis',
          body: 'Hago una primera versión de tu página con los datos de tu negocio. Sin pago y sin compromiso.',
        },
        { title: 'Información y anticipo', body: 'Confirmas servicios, fotos y contactos, y pagas el 50% para empezar.' },
        { title: 'Desarrollo y revisión', body: 'Termino la página. La revisas en un enlace privado y pides cambios dos veces.' },
        { title: 'Publicación', body: 'Después del pago final, el sitio se publica en un dominio a tu nombre.' },
      ],
    },
    work: {
      title: 'Trabajos',
      intro: 'Sitios publicados que diseñé y desarrollé, y conceptos de diseño para negocios de servicios.',
      liveTitle: 'Proyectos publicados',
      conceptsTitle: 'Conceptos para negocios de servicios',
      conceptsNote: 'Diseños propios para mostrar direcciones posibles. No son proyectos de clientes.',
      visit: 'Ver sitio',
      enlarge: 'Ampliar',
    },
    about: {
      title: 'Con quién vas a trabajar',
      body: [
        'Soy Gabriel Peçanha, diseñador web en Brasil. Trabajo a distancia con negocios de Panamá y Estados Unidos.',
        'Uso herramientas asistidas por IA para diseñar y desarrollar, y reviso yo mismo cada página, en computadora y en celular, antes de que la veas.',
        'Hablas directamente conmigo, desde el primer correo hasta el lanzamiento.',
      ],
      place: 'En Brasil: dos horas por delante de Panamá.',
    },
    faq: {
      title: 'Preguntas',
      items: [
        { q: '¿Pago por la vista previa?', a: 'No. Si no te gusta la dirección, me dices que no y listo.' },
        { q: '¿De quién es el sitio?', a: 'Tuyo. El dominio queda a tu nombre y el código es tuyo después del pago final.' },
        {
          q: '¿Me garantizas más clientes?',
          a: 'No, y nadie honesto puede hacerlo. Lo que recibes es una página que explica tu servicio con claridad y facilita que te llamen o te pidan una cotización.',
        },
        {
          q: '¿Dónde se aloja el sitio?',
          a: 'En Vercel, en mi cuenta mientras tengas el plan de mantenimiento. Si lo cancelas, te transfiero el proyecto.',
        },
        {
          q: '¿La página puede estar en inglés?',
          a: 'Sí. Tu página puede estar en español o en inglés. Un segundo idioma se cotiza aparte.',
        },
      ],
    },
    contact: {
      title: 'Pide tu vista previa gratis',
      body: 'Envía el nombre de tu negocio y tu sitio web o enlace de Google Maps. Normalmente respondo en un día hábil.',
      button: 'Quiero mi vista previa gratis',
      orEmail: 'O escribe a',
    },
    mail: {
      subject: (name) => (name ? `Solicitud de vista previa gratis: ${name}` : 'Solicitud de vista previa gratis'),
      body: (name, trade) =>
        `Nombre del negocio: ${name}\nTipo de negocio: ${trade}\nSitio web o enlace de Google Maps:\nCiudad:\n¿En qué debe ayudar la página?\n`,
    },
    footer: { rights: 'Landing Dollar es el servicio de diseño web de Gabriel Peçanha.', top: 'Volver arriba' },
    dialog: { note: 'Captura guardada de la página.', open: 'Abrir el sitio publicado', close: 'Cerrar' },
    skip: 'Ir al contenido',
  },
}

/** Photo and colours of the example page for each type of business. */
export const tradeLook: Record<Trade, { photo: string; theme: string }> = {
  cleaning: { photo: '/assets/concepts/room.webp', theme: 'mock-cleaning' },
  hvac: { photo: '/assets/concepts/hvac.webp', theme: 'mock-hvac' },
  detailing: { photo: '/assets/concepts/car.webp', theme: 'mock-detailing' },
}

export type Project = {
  name: string
  category: Record<Locale, string>
  url: string
  desktop: string
  mobile?: string
}

export const projects: Project[] = [
  {
    name: 'Alinhatta',
    category: { en: 'Business website, professional services', es: 'Sitio empresarial, servicios profesionales' },
    url: 'https://www.alinhatta.com.br/',
    desktop: '/assets/projects/alinhatta-desktop.png',
    mobile: '/assets/projects/alinhatta-mobile.png',
  },
  {
    name: 'My Dream',
    category: { en: 'Online shop, digital invitations', es: 'Tienda en línea, invitaciones digitales' },
    url: 'https://www.mydreamartes.com.br/',
    desktop: '/assets/projects/mydream-current.jpg',
    mobile: '/assets/projects/mydream-mobile.png',
  },
  {
    name: 'Triliva',
    category: { en: 'Web application, education', es: 'Aplicación web, educación' },
    url: 'https://app.trilivaedu.com.br/',
    desktop: '/assets/projects/triliva-current.jpg',
  },
]

export type Concept = {
  id: string
  market: Market
  title: Record<Locale, string>
  segment: Record<Locale, string>
  image: string
}

// Concept previews are local images only. Publish the demos on Vercel before linking them.
export const concepts: Concept[] = [
  {
    id: 'cleaning-us',
    market: 'US',
    title: { en: 'Cleaning', es: 'Limpieza' },
    segment: { en: 'Residential and commercial cleaning', es: 'Limpieza residencial y comercial' },
    image: '/assets/concepts/cleaning-us.webp',
  },
  {
    id: 'hvac-us',
    market: 'US',
    title: { en: 'HVAC', es: 'HVAC' },
    segment: { en: 'Heating, cooling and repair', es: 'Climatización y reparación' },
    image: '/assets/concepts/hvac-us.webp',
  },
  {
    id: 'detailing-us',
    market: 'US',
    title: { en: 'Auto detailing', es: 'Detallado automotriz' },
    segment: { en: 'Detailing and paint care', es: 'Detallado y cuidado de pintura' },
    image: '/assets/concepts/detailing-us.webp',
  },
  {
    id: 'cleaning-pa',
    market: 'PA',
    title: { en: 'Commercial cleaning', es: 'Limpieza' },
    segment: { en: 'Offices, common areas and condos', es: 'Oficinas, áreas comunes y condominios' },
    image: '/assets/concepts/cleaning-pa.webp',
  },
  {
    id: 'hvac-pa',
    market: 'PA',
    title: { en: 'Air conditioning', es: 'Aire acondicionado' },
    segment: { en: 'Installation and maintenance', es: 'Instalación y mantenimiento' },
    image: '/assets/concepts/hvac-pa.webp',
  },
  {
    id: 'detailing-pa',
    market: 'PA',
    title: { en: 'Auto detailing', es: 'Detallado automotriz' },
    segment: { en: 'Protection and interior care', es: 'Protección y cuidado interior' },
    image: '/assets/concepts/detailing-pa.webp',
  },
]
