// All visible text lives here, in English (US) and Spanish (Panama).
// Prices must match the Landing Dollar price list.

export type Locale = 'en' | 'es'
export type Market = 'US' | 'PA'

export const CONTACT_EMAIL = 'gabrielpecanha.dev@gmail.com'

type Plan = {
  id: string
  name: string
  price: Record<Market, string>
  unit: string
  body: string
  // A detail can differ by market; plain strings apply to both.
  details: Array<string | Record<Market, string>>
}

type Copy = {
  meta: { title: string; description: string }
  nav: { work: string; pricing: string; process: string; about: string; cta: string; menu: string; theme: string }
  hero: { label: string; location: string; line1: string; line2: string; body: string; primary: string; secondary: string }
  work: { title: string; label: string; view: string; open: string }
  concepts: { label: string; title: string; note: string; preview: string }
  pricing: { label: string; title: string; intro: string; marketLabel: string; plans: Plan[]; terms: string[] }
  process: { label: string; title: string; steps: Array<{ title: string; body: string }> }
  about: { label: string; title: string; body: string[]; place: string; link: string }
  faq: { label: string; title: string; items: Array<{ q: string; a: string }> }
  contact: {
    label: string
    side: string
    title: string
    body: string
    subject: string
    prompt: string
    footer: string
    top: string
  }
  dialog: { note: string; open: string; close: string }
  skip: string
}

export const copy: Record<Locale, Copy> = {
  en: {
    meta: {
      title: 'Gabriel Peçanha · Websites for local service businesses',
      description:
        'Landing pages, website fixes and redesigns for local service businesses in the US and Panama. See a free preview before you pay.',
    },
    nav: {
      work: 'Work',
      pricing: 'Pricing',
      process: 'How it works',
      about: 'About',
      cta: 'Free preview',
      menu: 'Open menu',
      theme: 'Switch theme',
    },
    hero: {
      label: 'LANDING DOLLAR · WEB DESIGN FOR SERVICE BUSINESSES',
      location: 'Brazil · Working with the US and Panama',
      line1: 'Clear websites.',
      line2: 'See yours before you pay.',
      body: 'I’m Gabriel. I build landing pages and fix websites for cleaning, HVAC, auto detailing and other local service businesses. Send me your business name and I’ll prepare a free preview of your page.',
      primary: 'Get a free preview',
      secondary: 'See pricing',
    },
    work: { title: 'Selected work', label: 'REAL PROJECTS · DESIGN + DEVELOPMENT', view: 'View', open: 'Open project' },
    concepts: {
      label: 'LANDING DOLLAR / CONCEPTS',
      title: 'Different businesses. Different identities.',
      note: 'Self-initiated concepts that show possible directions for each industry. They are not client projects.',
      preview: 'Preview',
    },
    pricing: {
      label: '01 / PRICING',
      title: 'Fixed prices. No surprises.',
      intro: 'Every price below is in US dollars. Choose your market to see the right table.',
      marketLabel: 'Market',
      plans: [
        {
          id: 'lp',
          name: 'Landing page',
          price: { US: 'US$ 499', PA: 'US$ 349' },
          unit: 'one-time',
          body: 'One page that explains your service and makes it easy to call or ask for a quote.',
          details: [
            'Up to 6 sections',
            'Working contact form and tap-to-call button',
            'Built for mobile first',
            'Ready 15 days after your brief',
          ],
        },
        {
          id: 'fix',
          name: 'Website fix',
          price: { US: 'from US$ 149', PA: 'from US$ 99' },
          unit: 'one-time',
          body: 'One problem on your current site fixed: a broken form, a missing call button or a page that breaks on phones.',
          details: [
            '1 problem, in 5 business days',
            { US: 'Up to 3 problems: US$ 249, in 7 business days', PA: 'Up to 3 problems: US$ 149, in 7 business days' },
          ],
        },
        {
          id: 'rd',
          name: 'Redesign',
          price: { US: 'from US$ 899', PA: 'from US$ 599' },
          unit: 'one-time',
          body: 'A new design for a site that no longer explains what you do, up to 5 pages.',
          details: ['Final price after a short review of your site', 'Ready in 15 days for up to 5 pages'],
        },
        {
          id: 'care',
          name: 'Website care',
          price: { US: 'US$ 49', PA: 'US$ 29' },
          unit: 'per month',
          body: 'Small changes and content updates, so the site stays correct after launch.',
          details: ['Up to 1 hour of changes per month', 'Uptime monitoring', 'Cancel with 30 days’ notice'],
        },
      ],
      terms: [
        '50% to start and 50% when you approve the page, before it goes live.',
        'Pay 100% upfront and get 20% off.',
        'Two rounds of revisions included. Extra work is US$ 35 per hour, approved by you beforehand.',
        'The domain is registered in your name, and the code is yours after full payment.',
        'Payments in US dollars through Wise.',
      ],
    },
    process: {
      label: '02 / HOW IT WORKS',
      title: 'From preview to launch in four steps.',
      steps: [
        {
          title: 'Free preview',
          body: 'I prepare a first version of your page with your business details. No payment and no commitment.',
        },
        { title: 'Brief and deposit', body: 'You confirm services, photos and contact details, and pay 50% to start.' },
        { title: 'Build and review', body: 'I finish the page and you review it on a private link, with two rounds of changes.' },
        { title: 'Go live', body: 'After the final payment, the site goes live on a domain registered in your name.' },
      ],
    },
    about: {
      label: '03 / ABOUT',
      title: 'One person.\nA direct line.',
      body: [
        'I’m Gabriel Peçanha, a web designer based in Brazil, working remotely with businesses in the US and Panama.',
        'I use AI-assisted tools to design and build, and I review every page myself, on desktop and on mobile, before you see it.',
        'You talk to me directly, from the first message to the launch.',
      ],
      place: 'Brazil / UTC−3',
      link: 'Start a conversation',
    },
    faq: {
      label: '04 / QUESTIONS',
      title: 'Before you write.',
      items: [
        { q: 'Do I pay for the preview?', a: 'No. If you don’t like the direction, you simply say no and that’s it.' },
        {
          q: 'Who owns the website?',
          a: 'You do. The domain is registered in your name and the code is yours after full payment.',
        },
        {
          q: 'Can you guarantee more customers?',
          a: 'No, and nobody honest can. What I deliver is a page that explains your service clearly and makes it easy to call or ask for a quote.',
        },
        {
          q: 'Where is the site hosted?',
          a: 'On Vercel, under my account while you keep a care plan. If you cancel, I transfer the project to you.',
        },
        {
          q: 'Do you work in Spanish?',
          a: 'Yes. Your page can be in English or Spanish. A second language is quoted separately.',
        },
      ],
    },
    contact: {
      label: 'HAVE A PROJECT IN MIND?',
      side: 'BRAZIL ↗ US · PANAMA',
      title: 'Ask for your\nfree preview.',
      body: 'Send your business name and your website or Google Maps link. I usually reply by email within one business day.',
      subject: 'Free preview request',
      prompt: 'Business name:\nWebsite or Google Maps link:\nCity:\nWhat should the page help with?\n',
      footer: 'Landing Dollar · Web design for service businesses',
      top: 'Back to top',
    },
    dialog: {
      note: 'Saved preview. Explore the design here, or open the website in a new tab.',
      open: 'Open website',
      close: 'Close',
    },
    skip: 'Skip to content',
  },
  es: {
    meta: {
      title: 'Gabriel Peçanha · Sitios web para negocios de servicios',
      description:
        'Landing pages, mejoras y rediseño de sitios para negocios de servicios en Panamá y Estados Unidos. Mira una vista previa gratis antes de pagar.',
    },
    nav: {
      work: 'Trabajos',
      pricing: 'Precios',
      process: 'Cómo funciona',
      about: 'Perfil',
      cta: 'Vista previa gratis',
      menu: 'Abrir menú',
      theme: 'Cambiar tema',
    },
    hero: {
      label: 'LANDING DOLLAR · DISEÑO WEB PARA NEGOCIOS DE SERVICIOS',
      location: 'Brasil · Trabajo con Panamá y EE. UU.',
      line1: 'Sitios web claros.',
      line2: 'Mira el tuyo antes de pagar.',
      body: 'Soy Gabriel. Hago landing pages y mejoro sitios web de limpieza, aire acondicionado, detallado automotriz y otros negocios de servicios. Envíame el nombre de tu negocio y te preparo una vista previa gratis de tu página.',
      primary: 'Pedir vista previa gratis',
      secondary: 'Ver precios',
    },
    work: {
      title: 'Trabajos seleccionados',
      label: 'PROYECTOS REALES · DISEÑO + DESARROLLO',
      view: 'Ver',
      open: 'Abrir proyecto',
    },
    concepts: {
      label: 'LANDING DOLLAR / CONCEPTOS',
      title: 'Otro negocio. Otra identidad.',
      note: 'Conceptos propios que muestran direcciones posibles para cada sector. No son proyectos de clientes.',
      preview: 'Ampliar',
    },
    pricing: {
      label: '01 / PRECIOS',
      title: 'Precios fijos. Sin sorpresas.',
      intro: 'Todos los precios están en dólares. Elige tu mercado para ver la tabla correcta.',
      marketLabel: 'Mercado',
      plans: [
        {
          id: 'lp',
          name: 'Landing page',
          price: { US: 'US$ 499', PA: 'US$ 349' },
          unit: 'pago único',
          body: 'Una página que explica tu servicio y facilita que te llamen o pidan una cotización.',
          details: [
            'Hasta 6 secciones',
            'Formulario que funciona y botón para llamar',
            'Pensada primero para el celular',
            'Lista 15 días después de tu información',
          ],
        },
        {
          id: 'fix',
          name: 'Mejora puntual',
          price: { US: 'desde US$ 149', PA: 'desde US$ 99' },
          unit: 'pago único',
          body: 'Corrijo un problema de tu sitio actual: un formulario roto, un botón de llamada que falta o una página que se ve mal en el celular.',
          details: [
            '1 problema, en 5 días hábiles',
            { US: 'Hasta 3 problemas: US$ 249, en 7 días hábiles', PA: 'Hasta 3 problemas: US$ 149, en 7 días hábiles' },
          ],
        },
        {
          id: 'rd',
          name: 'Rediseño',
          price: { US: 'desde US$ 899', PA: 'desde US$ 599' },
          unit: 'pago único',
          body: 'Un diseño nuevo para un sitio que ya no explica lo que haces, hasta 5 páginas.',
          details: ['Precio final después de revisar tu sitio', 'Listo en 15 días para hasta 5 páginas'],
        },
        {
          id: 'care',
          name: 'Mantenimiento',
          price: { US: 'US$ 49', PA: 'US$ 29' },
          unit: 'al mes',
          body: 'Cambios pequeños y actualización de contenido, para que el sitio siga correcto después del lanzamiento.',
          details: ['Hasta 1 hora de cambios al mes', 'Monitoreo de disponibilidad', 'Cancelas con 30 días de aviso'],
        },
      ],
      terms: [
        '50% para empezar y 50% cuando apruebas la página, antes de publicarla.',
        'Si pagas el 100% al inicio, tienes 20% de descuento.',
        'Incluye dos rondas de cambios. El trabajo extra cuesta US$ 35 por hora, con tu aprobación previa.',
        'El dominio queda a tu nombre y el código es tuyo después del pago total.',
        'Pagos en dólares a través de Wise.',
      ],
    },
    process: {
      label: '02 / CÓMO FUNCIONA',
      title: 'De la vista previa al lanzamiento en cuatro pasos.',
      steps: [
        {
          title: 'Vista previa gratis',
          body: 'Preparo una primera versión de tu página con los datos de tu negocio. Sin pago y sin compromiso.',
        },
        { title: 'Información y anticipo', body: 'Confirmas servicios, fotos y contactos, y pagas el 50% para empezar.' },
        {
          title: 'Desarrollo y revisión',
          body: 'Termino la página y la revisas en un enlace privado, con dos rondas de cambios.',
        },
        { title: 'Publicación', body: 'Después del pago final, el sitio se publica en un dominio a tu nombre.' },
      ],
    },
    about: {
      label: '03 / PERFIL',
      title: 'Una persona.\nTrato directo.',
      body: [
        'Soy Gabriel Peçanha, diseñador web en Brasil. Trabajo a distancia con negocios de Panamá y Estados Unidos.',
        'Uso herramientas asistidas por IA para diseñar y desarrollar, y reviso yo mismo cada página, en computadora y en celular, antes de que la veas.',
        'Hablas directamente conmigo, desde el primer mensaje hasta el lanzamiento.',
      ],
      place: 'Brasil / UTC−3',
      link: 'Conversemos',
    },
    faq: {
      label: '04 / PREGUNTAS',
      title: 'Antes de escribir.',
      items: [
        { q: '¿Pago por la vista previa?', a: 'No. Si no te gusta la dirección, me dices que no y listo.' },
        { q: '¿De quién es el sitio?', a: 'Tuyo. El dominio queda a tu nombre y el código es tuyo después del pago total.' },
        {
          q: '¿Me garantizas más clientes?',
          a: 'No, y nadie honesto puede hacerlo. Lo que entrego es una página que explica tu servicio con claridad y facilita que te llamen o pidan una cotización.',
        },
        {
          q: '¿Dónde se aloja el sitio?',
          a: 'En Vercel, en mi cuenta mientras tengas el plan de mantenimiento. Si lo cancelas, te transfiero el proyecto.',
        },
        { q: '¿Trabajas en inglés?', a: 'Sí. Tu página puede estar en español o en inglés. Un segundo idioma se cotiza aparte.' },
      ],
    },
    contact: {
      label: '¿TIENES UN PROYECTO EN MENTE?',
      side: 'BRASIL ↗ PANAMÁ · EE. UU.',
      title: 'Pide tu\nvista previa gratis.',
      body: 'Envía el nombre de tu negocio y tu sitio web o enlace de Google Maps. Normalmente respondo por correo en un día hábil.',
      subject: 'Solicitud de vista previa gratis',
      prompt: 'Nombre del negocio:\nSitio web o enlace de Google Maps:\nCiudad:\n¿En qué debe ayudar la página?\n',
      footer: 'Landing Dollar · Diseño web para negocios de servicios',
      top: 'Volver arriba',
    },
    dialog: {
      note: 'Vista guardada. Puedes explorar el diseño aquí o abrir el sitio en una nueva pestaña.',
      open: 'Abrir sitio',
      close: 'Cerrar',
    },
    skip: 'Ir al contenido',
  },
}

export type Project = {
  name: string
  category: Record<Locale, string>
  url: string
  desktop: string
  mobile?: string
  accent: 'sage' | 'terracotta' | 'ink'
}

export const projects: Project[] = [
  {
    name: 'Alinhatta',
    category: { en: 'Business website / Professional services', es: 'Sitio empresarial / Servicios profesionales' },
    url: 'https://www.alinhatta.com.br/',
    desktop: '/assets/projects/alinhatta-desktop.png',
    mobile: '/assets/projects/alinhatta-mobile.png',
    accent: 'sage',
  },
  {
    name: 'My Dream',
    category: { en: 'Creative commerce / Digital invitations', es: 'Comercio creativo / Invitaciones digitales' },
    url: 'https://www.mydreamartes.com.br/',
    desktop: '/assets/projects/mydream-current.jpg',
    mobile: '/assets/projects/mydream-mobile.png',
    accent: 'terracotta',
  },
  {
    name: 'Triliva',
    category: { en: 'Web application / Education technology', es: 'Aplicación web / Tecnología educativa' },
    url: 'https://app.trilivaedu.com.br/',
    desktop: '/assets/projects/triliva-current.jpg',
    accent: 'ink',
  },
]

export type Concept = {
  id: string
  market: Market
  title: Record<Locale, string>
  segment: Record<Locale, string>
  image: string
}

// Concept previews are local images only. The old external demos were hosted on a
// temporary third-party domain; publish them on Vercel before linking again.
export const concepts: Concept[] = [
  {
    id: 'cleaning-us',
    market: 'US',
    title: { en: 'Cleaning', es: 'Limpieza' },
    segment: { en: 'Residential & commercial cleaning', es: 'Limpieza residencial y comercial' },
    image: '/assets/concepts/cleaning-us.webp',
  },
  {
    id: 'hvac-us',
    market: 'US',
    title: { en: 'HVAC', es: 'HVAC' },
    segment: { en: 'Heating, cooling & repair', es: 'Climatización y reparación' },
    image: '/assets/concepts/hvac-us.webp',
  },
  {
    id: 'detailing-us',
    market: 'US',
    title: { en: 'Auto detailing', es: 'Detallado automotriz' },
    segment: { en: 'Premium detailing & paint care', es: 'Detallado premium y cuidado de pintura' },
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
