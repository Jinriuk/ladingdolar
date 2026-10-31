import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { CONTACT_EMAIL, concepts, copy, projects, type Locale, type Market } from './data/content'
import { Arrow, MarketTabs, mailto, trackPointer } from './components/ui'
import './styles.css'

type Preview = { src: string; title: string; url?: string }

export default function App() {
  const locale: Locale = window.location.pathname.startsWith('/es') ? 'es' : 'en'
  const es = locale === 'es'
  const t = copy[locale]

  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('gp-theme') === 'dark'
    } catch {
      return false
    }
  })
  const [menu, setMenu] = useState(false)
  const [preview, setPreview] = useState<Preview | null>(null)
  // Spanish visitors are most likely from Panama, English visitors from the US.
  const [market, setMarket] = useState<Market>(es ? 'PA' : 'US')
  const trigger = useRef<HTMLElement | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  const previewMail = mailto(CONTACT_EMAIL, t.contact.subject, t.contact.prompt)

  // Page metadata per language
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title
    const set = (selector: string, attr: string, value: string) => document.querySelector(selector)?.setAttribute(attr, value)
    set('meta[name="description"]', 'content', t.meta.description)
    set('meta[property="og:title"]', 'content', t.meta.title)
    set('meta[property="og:description"]', 'content', t.meta.description)
    set('link[rel="canonical"]', 'href', `${location.origin}/${locale}/`)
    document
      .querySelectorAll('link[rel="alternate"]')
      .forEach((link) =>
        link.setAttribute('href', `${location.origin}/${link.getAttribute('hreflang') === 'es-PA' ? 'es' : 'en'}/`),
      )
  }, [locale, t])

  // Theme
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    try {
      localStorage.setItem('gp-theme', dark ? 'dark' : 'light')
    } catch {
      /* storage blocked: theme just isn't remembered */
    }
  }, [dark])

  // Reveal-on-scroll; content stays visible if the observer is unavailable
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('seen')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.08 },
    )
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('will-reveal')
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Preview dialog
  useEffect(() => {
    if (preview) {
      dialog.current?.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.current?.close()
      document.body.style.overflow = ''
      trigger.current?.focus()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [preview])

  const openPreview = (event: MouseEvent<HTMLElement>, item: Preview) => {
    trigger.current = event.currentTarget
    setPreview(item)
  }

  const nav: Array<[string, string]> = [
    ['#work', t.nav.work],
    ['#pricing', t.nav.pricing],
    ['#process', t.nav.process],
    ['#about', t.nav.about],
  ]
  const plans = t.pricing.plans

  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>

      <header className="header wrap">
        <a href={`/${locale}/`} className="brand" aria-label="Gabriel Peçanha">
          <span className="brand-symbol" aria-hidden="true">
            g<span>p</span>
            <i />
          </span>
          <span>
            gabriel
            <br />
            peçanha
          </span>
        </a>
        <nav aria-label="Menu" className={menu ? 'navigation open' : 'navigation'}>
          {nav.map(([url, label]) => (
            <a key={url} href={url} onClick={() => setMenu(false)}>
              {label}
              <span className="nav-dot" />
            </a>
          ))}
          <a className="nav-cta" href={previewMail} onClick={() => setMenu(false)}>
            {t.nav.cta} <Arrow />
          </a>
        </nav>
        <div className="header-tools">
          <a className="language" href={es ? '/en/' : '/es/'} hrefLang={es ? 'en' : 'es'}>
            {es ? 'EN' : 'ES'}
          </a>
          <button className="theme-switch" onClick={() => setDark(!dark)} aria-label={t.nav.theme} aria-pressed={dark}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M12 5a7 7 0 0 1 0 14Z" fill="currentColor" />
            </svg>
          </button>
          <button className="menu-button" aria-expanded={menu} aria-label={t.nav.menu} onClick={() => setMenu(!menu)}>
            {menu ? '×' : '☰'}
          </button>
        </div>
      </header>

      <main id="main">
        {/* Hero */}
        <section className="hero wrap">
          <div className="hero-top">
            <a className="intro-portrait" href="#about">
              <img src="/assets/about/gabriel-supplied-photo.jpg" alt="Gabriel Peçanha" />
              <span>Gabriel Peçanha</span>
            </a>
            <p className="label">
              <span className="status-dot" />
              {t.hero.label}
            </p>
            <span className="location">{t.hero.location}</span>
          </div>
          <h1>
            <span className="line">
              <span>{t.hero.line1}</span>
            </span>
            <span className="line">
              <span className="muted-title">{t.hero.line2}</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <p>{t.hero.body}</p>
            <div className="hero-actions">
              <a className="button primary" href={previewMail}>
                <span>{t.hero.primary}</span>
                <Arrow />
              </a>
              <a className="underlink" href="#pricing">
                {t.hero.secondary}
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* Real projects */}
        <section className="work wrap" id="work" aria-labelledby="work-title">
          <div className="section-bar reveal">
            <h2 id="work-title">
              {t.work.title}
              <sup>0{projects.length}</sup>
            </h2>
            <span className="label">{t.work.label}</span>
          </div>
          <div className="work-grid">
            {projects.map((p, index) => (
              <article className={`project project-${index} reveal`} key={p.name}>
                <button
                  className={`project-art art-${p.accent}`}
                  onPointerMove={trackPointer}
                  onClick={(e) => openPreview(e, { src: p.desktop, title: p.name, url: p.url })}
                  aria-label={`${t.work.open}: ${p.name}`}
                >
                  <span className="art-top">
                    <span>{p.name.toUpperCase()}</span>
                    <span>0{index + 1} / WEB</span>
                  </span>
                  <div className="desktop-frame">
                    <div className="window-bar">
                      <span>● ● ●</span>
                      <span>{new URL(p.url).hostname}</span>
                      <span>↗</span>
                    </div>
                    <img src={p.desktop} alt="" loading={index < 2 ? 'eager' : 'lazy'} />
                  </div>
                  {p.mobile && (
                    <div className="phone-frame">
                      <img src={p.mobile} alt="" loading="lazy" />
                    </div>
                  )}
                  <span className="view-orb" aria-hidden="true">
                    {t.work.view}
                    <Arrow />
                  </span>
                  <span className="art-open" aria-hidden="true">
                    <Arrow />
                  </span>
                </button>
                <div className="project-caption">
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.category[locale]}</p>
                  </div>
                  <a href={p.url} target="_blank" rel="noreferrer" aria-label={`${t.work.open}: ${p.name}`}>
                    <Arrow />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Concepts */}
        <section className="experiments wrap" id="concepts" aria-labelledby="concept-title">
          <div className="section-bar reveal">
            <div>
              <p className="label">{t.concepts.label}</p>
              <h2 id="concept-title">{t.concepts.title}</h2>
            </div>
            <MarketTabs value={market} onChange={setMarket} label={t.pricing.marketLabel} />
          </div>
          <p className="concept-note">{t.concepts.note}</p>
          <div className="concept-grid" key={market}>
            {concepts
              .filter((c) => c.market === market)
              .map((c) => (
                <article key={c.id}>
                  <button
                    className="concept-image"
                    onClick={(e) => openPreview(e, { src: c.image, title: c.title[locale] })}
                    aria-label={`${t.concepts.preview}: ${c.title[locale]}`}
                  >
                    <img src={c.image} alt="" loading="lazy" />
                    <span>
                      <Arrow />
                    </span>
                  </button>
                  <div className="concept-caption">
                    <h3>{c.title[locale]}</h3>
                  </div>
                  <p>{c.segment[locale]}</p>
                </article>
              ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="pricing wrap" id="pricing" aria-labelledby="pricing-title">
          <div className="section-bar reveal">
            <div>
              <p className="label">{t.pricing.label}</p>
              <h2 id="pricing-title">{t.pricing.title}</h2>
              <p className="section-sub">{t.pricing.intro}</p>
            </div>
            <MarketTabs value={market} onChange={setMarket} label={t.pricing.marketLabel} />
          </div>
          <div className="plan-grid">
            {plans.map((plan, i) => (
              <article className={`plan reveal${i === 0 ? ' plan-main' : ''}`} key={plan.id}>
                <h3>{plan.name}</h3>
                <p className="plan-price">
                  {plan.price[market]}
                  <span>{plan.unit}</span>
                </p>
                <p className="plan-body">{plan.body}</p>
                <ul>
                  {plan.details
                    .map((d) => (typeof d === 'string' ? d : d[market]))
                    .map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                </ul>
              </article>
            ))}
          </div>
          <ul className="terms reveal">
            {t.pricing.terms.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
        </section>

        {/* Process */}
        <section className="process wrap" id="process" aria-labelledby="process-title">
          <div className="section-intro reveal">
            <p className="label">{t.process.label}</p>
            <h2 id="process-title">{t.process.title}</h2>
          </div>
          <ol className="steps">
            {t.process.steps.map((s, i) => (
              <li className="step reveal" key={s.title}>
                <span className="step-n">0{i + 1}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* About */}
        <section className="about wrap" id="about" aria-labelledby="about-title">
          <div className="about-heading reveal">
            <p className="label">{t.about.label}</p>
            <h2 id="about-title">{t.about.title}</h2>
            <figure className="about-portrait">
              <img src="/assets/about/gabriel-supplied-photo.jpg" alt="Gabriel Peçanha" loading="lazy" />
              <figcaption>
                Gabriel Peçanha <span>{t.about.place}</span>
              </figcaption>
            </figure>
          </div>
          <div className="about-text reveal">
            {t.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a className="underlink" href="#contact">
              {t.about.link}
              <Arrow />
            </a>
          </div>
        </section>

        {/* FAQ */}
        <section className="services faq wrap" id="faq" aria-labelledby="faq-title">
          <div className="section-intro reveal">
            <p className="label">{t.faq.label}</p>
            <h2 id="faq-title">{t.faq.title}</h2>
          </div>
          <div className="service-list">
            {t.faq.items.map((item, i) => (
              <details className="service reveal" key={item.q} open={i === 0}>
                <summary>
                  <span className="service-n">0{i + 1}</span>
                  <h3>{item.q}</h3>
                  <span className="plus" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="wrap">
            <div className="contact-top reveal">
              <p className="label">{t.contact.label}</p>
              <span className="label">{t.contact.side}</span>
            </div>
            <div className="contact-main reveal">
              <div>
                <h2 id="contact-title">{t.contact.title}</h2>
                <p className="contact-body">{t.contact.body}</p>
              </div>
              <a className="contact-orb" href={previewMail} aria-label={t.hero.primary}>
                <Arrow />
              </a>
            </div>
            <div className="contact-bottom">
              <a className="email" href={previewMail}>
                {CONTACT_EMAIL}
              </a>
            </div>
            <footer>
              <span>© {new Date().getFullYear()} Gabriel Peçanha</span>
              <span>{t.contact.footer}</span>
              <a href="#main">{t.contact.top} ↑</a>
            </footer>
          </div>
        </section>
      </main>

      <dialog
        ref={dialog}
        className="preview"
        onCancel={() => setPreview(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setPreview(null)
        }}
        aria-label={preview?.title}
      >
        <div className="preview-head">
          <strong>{preview?.title}</strong>
          <button onClick={() => setPreview(null)}>{t.dialog.close} ×</button>
        </div>
        {preview && (
          <>
            <p className="preview-note">{t.dialog.note}</p>
            <div className="preview-image">
              <img src={preview.src} alt={preview.title} />
            </div>
            {preview.url && (
              <a className="preview-link" href={preview.url} target="_blank" rel="noreferrer">
                {t.dialog.open}
                <Arrow />
              </a>
            )}
          </>
        )}
      </dialog>
    </>
  )
}
