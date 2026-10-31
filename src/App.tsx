import { useEffect, useMemo, useRef, useState, type MouseEvent } from 'react'
import { CONTACT_EMAIL, concepts, copy, projects, tradeLook, type Locale, type Market, type Trade } from './data/content'
import { PhoneMock } from './components/PhoneMock'
import { Segmented } from './components/Segmented'
import './styles.css'

type Shot = { src: string; title: string; url?: string }

const reducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches

function initialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('ld-theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    /* storage blocked: fall back to the system setting */
  }
  return typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const money = (n: number) => `$${n.toLocaleString('en-US')}`

export default function App() {
  const locale: Locale = window.location.pathname.startsWith('/es') ? 'es' : 'en'
  const es = locale === 'es'
  const t = copy[locale]

  const [theme, setTheme] = useState(initialTheme)
  const [menu, setMenu] = useState(false)
  const [market, setMarket] = useState<Market>(es ? 'PA' : 'US')
  const [trade, setTrade] = useState<Trade>('cleaning')
  const [name, setName] = useState('')
  const [shot, setShot] = useState<Shot | null>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  // The one animated moment: the example business name types itself into the phone on load.
  const defaultName = t.mock[trade].defaultName
  const [typed, setTyped] = useState(() => (reducedMotion() ? defaultName.length : 0))
  useEffect(() => {
    if (reducedMotion()) return
    let i = 0
    let timer: number | undefined
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1
        setTyped(i)
        if (i >= defaultName.length) window.clearInterval(timer)
      }, 55)
    }, 500)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
    // Run once on load only; later trade changes swap the name without animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const shownName = name.trim() || defaultName.slice(0, typed)

  const tradeLabel = t.mock[trade].label
  const previewMail = useMemo(() => {
    const clean = name.trim()
    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(t.mail.subject(clean))}&body=${encodeURIComponent(
      t.mail.body(clean, tradeLabel),
    )}`
  }, [name, t, tradeLabel])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `${location.origin}/${locale}/`)
  }, [locale, t])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('ld-theme', theme)
    } catch {
      /* theme just isn't remembered */
    }
  }, [theme])

  useEffect(() => {
    if (shot) dialog.current?.showModal()
    else {
      dialog.current?.close()
      trigger.current?.focus()
    }
  }, [shot])

  const openShot = (event: MouseEvent<HTMLElement>, item: Shot) => {
    trigger.current = event.currentTarget
    setShot(item)
  }

  const nav: Array<[string, string]> = [
    ['#prices', t.nav.prices],
    ['#process', t.nav.process],
    ['#work', t.nav.work],
    ['#faq', t.nav.faq],
  ]
  const tradeOptions = (Object.keys(t.mock) as Trade[]).map((key) => ({ value: key, label: t.mock[key].label }))
  const marketOptions = (['US', 'PA'] as Market[]).map((key) => ({ value: key, label: t.prices.markets[key] }))

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>

      <header className="site-header">
        <div className="wrap header-row">
          <a className="brand" href={`/${locale}/`}>
            <span className="brand-mark" aria-hidden="true">
              LD
            </span>
            <span className="brand-text">
              <span className="brand-name">Landing Dollar</span>
              <span className="brand-line">{t.brandLine}</span>
            </span>
          </a>
          <button className="menu-toggle" aria-expanded={menu} aria-controls="site-nav" onClick={() => setMenu(!menu)}>
            {menu ? t.nav.close : t.nav.menu}
          </button>
          <nav id="site-nav" className={menu ? 'site-nav open' : 'site-nav'} aria-label={t.nav.menu}>
            <ul>
              {nav.map(([href, label]) => (
                <li key={href}>
                  <a href={href} onClick={() => setMenu(false)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav-tools">
              <a className="lang" href={es ? '/en/' : '/es/'} hrefLang={es ? 'en' : 'es'} lang={es ? 'en' : 'es'}>
                {es ? 'English' : 'Español'}
              </a>
              <button
                className="theme-toggle"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                aria-label={t.nav.theme}
                aria-pressed={theme === 'dark'}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor" />
                </svg>
              </button>
              <a className="btn btn-primary btn-small" href={previewMail} onClick={() => setMenu(false)}>
                {t.nav.cta}
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main id="main">
        <section className="hero wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <h1 id="hero-title" className="display">
              {t.hero.title}
            </h1>
            <p className="lede">{t.hero.body}</p>

            <div className="try">
              <label className="field-label" htmlFor="business-name">
                {t.hero.nameLabel}
              </label>
              <input
                id="business-name"
                className="name-input"
                type="text"
                autoComplete="organization"
                placeholder={defaultName}
                value={name}
                maxLength={48}
                onChange={(e) => setName(e.target.value)}
              />
              <Segmented
                legend={t.hero.tradeLabel}
                name="trade"
                options={tradeOptions}
                value={trade}
                onChange={(value) => {
                  setTrade(value)
                  setTyped(t.mock[value].defaultName.length)
                }}
              />
            </div>

            <div className="hero-actions">
              <a className="btn btn-primary" href={previewMail}>
                {t.hero.primary}
              </a>
              <a className="text-link" href="#prices">
                {t.hero.secondary}
              </a>
            </div>
            <p className="fine">{t.hero.note}</p>
          </div>

          <figure className="stage">
            <PhoneMock
              trade={trade}
              page={t.mock[trade]}
              name={shownName}
              photo={tradeLook[trade].photo}
              theme={tradeLook[trade].theme}
              alt={t.hero.mockAlt(name.trim() || defaultName)}
            />
            <figcaption>{t.hero.caption}</figcaption>
          </figure>
        </section>

        <section className="band prices" id="prices" aria-labelledby="prices-title">
          <div className="wrap">
            <div className="section-head">
              <div>
                <h2 id="prices-title" className="display">
                  {t.prices.title}
                </h2>
                <p className="section-intro">{t.prices.intro}</p>
              </div>
              <Segmented
                legend={t.prices.marketLabel}
                name="market-prices"
                options={marketOptions}
                value={market}
                onChange={setMarket}
              />
            </div>

            <ol className="board">
              {t.prices.plans.map((plan) => (
                <li className="board-row" key={plan.id}>
                  <div className="row-top">
                    <h3>{plan.name}</h3>
                    <span className="leader" aria-hidden="true" />
                    <p className="price">
                      {plan.from && <span className="from">{t.prices.fromLabel}</span>}
                      <span className="amount">{money(plan.amount[market])}</span>
                      <span className="unit">{plan.unit}</span>
                    </p>
                  </div>
                  <div className="row-body">
                    <p>{plan.body}</p>
                    <ul className="details">
                      {plan.details
                        .map((d) => (typeof d === 'string' ? d : d[market]))
                        .map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="terms">
              {t.prices.terms.map((term) => (
                <li key={term}>{term}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section wrap" id="process" aria-labelledby="process-title">
          <h2 id="process-title" className="display">
            {t.process.title}
          </h2>
          <ol className="steps">
            {t.process.steps.map((step, i) => (
              <li key={step.title}>
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section wrap" id="work" aria-labelledby="work-title">
          <h2 id="work-title" className="display">
            {t.work.title}
          </h2>
          <p className="section-intro">{t.work.intro}</p>

          <h3 className="sub-title">{t.work.liveTitle}</h3>
          <div className="live-grid">
            {projects.map((p, i) => (
              <article className={i === 0 ? 'live live-main' : 'live'} key={p.name}>
                <button
                  className="shot"
                  onClick={(e) => openShot(e, { src: p.desktop, title: p.name, url: p.url })}
                  aria-label={`${t.work.enlarge}: ${p.name}`}
                >
                  <img src={p.desktop} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
                </button>
                <div className="live-meta">
                  <div>
                    <h4>{p.name}</h4>
                    <p>{p.category[locale]}</p>
                  </div>
                  <a className="text-link" href={p.url} target="_blank" rel="noreferrer">
                    {t.work.visit}
                    <span className="visually-hidden"> {p.name}</span>
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="concepts-head">
            <div>
              <h3 className="sub-title">{t.work.conceptsTitle}</h3>
              <p className="fine">{t.work.conceptsNote}</p>
            </div>
            <Segmented
              legend={t.prices.marketLabel}
              name="market-concepts"
              options={marketOptions}
              value={market}
              onChange={setMarket}
            />
          </div>
          <ul className="concept-grid">
            {concepts
              .filter((c) => c.market === market)
              .map((c) => (
                <li key={c.id}>
                  <button
                    className="shot"
                    onClick={(e) => openShot(e, { src: c.image, title: c.title[locale] })}
                    aria-label={`${t.work.enlarge}: ${c.title[locale]}`}
                  >
                    <img src={c.image} alt="" loading="lazy" />
                  </button>
                  <h4>{c.title[locale]}</h4>
                  <p>{c.segment[locale]}</p>
                </li>
              ))}
          </ul>
        </section>

        <section className="section wrap about" id="about" aria-labelledby="about-title">
          <img className="portrait" src="/assets/about/gabriel-supplied-photo.jpg" alt="Gabriel Peçanha" loading="lazy" />
          <div className="about-text">
            <h2 id="about-title" className="display">
              {t.about.title}
            </h2>
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="fine">{t.about.place}</p>
          </div>
        </section>

        <section className="section wrap faq" id="faq" aria-labelledby="faq-title">
          <h2 id="faq-title" className="display">
            {t.faq.title}
          </h2>
          <div className="faq-list">
            {t.faq.items.map((item, i) => (
              <details key={item.q} open={i === 0}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>

      <footer className="closing" id="contact">
        <div className="wrap">
          <h2 className="display">{t.contact.title}</h2>
          <p className="closing-body">{t.contact.body}</p>
          <div className="closing-actions">
            <a className="btn btn-primary" href={previewMail}>
              {t.contact.button}
            </a>
            <p>
              {t.contact.orEmail}{' '}
              <a className="email" href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
          <div className="footer-row">
            <p>
              © {new Date().getFullYear()} {t.footer.rights}
            </p>
            <a href="#main">{t.footer.top}</a>
          </div>
        </div>
      </footer>

      <dialog
        ref={dialog}
        className="shot-dialog"
        onClose={() => setShot(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShot(null)
        }}
        aria-label={shot?.title}
      >
        <div className="dialog-head">
          <strong>{shot?.title}</strong>
          <button onClick={() => setShot(null)}>{t.dialog.close}</button>
        </div>
        {shot && (
          <>
            <div className="dialog-image">
              <img src={shot.src} alt={shot.title} />
            </div>
            <p className="fine">
              {t.dialog.note}{' '}
              {shot.url && (
                <a className="text-link" href={shot.url} target="_blank" rel="noreferrer">
                  {t.dialog.open}
                </a>
              )}
            </p>
          </>
        )}
      </dialog>
    </>
  )
}
