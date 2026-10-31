import type { Trade } from '../data/content'

type Page = {
  tagline: string
  services: string[]
  call: string
  quote: string
  area: string
  hours: string
}

function initials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean)
  return (words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')
}

/**
 * An example mobile landing page drawn in HTML, so the visitor's business name
 * appears in it as they type. It is a picture of a page, not a working one.
 */
export function PhoneMock(props: { trade: Trade; page: Page; name: string; photo: string; theme: string; alt: string }) {
  const { page, name } = props
  return (
    <div className={`phone ${props.theme}`} role="img" aria-label={props.alt} data-trade={props.trade}>
      <div className="phone-screen">
        <div className="m-bar">
          <span className="m-logo">{initials(name).toUpperCase() || '·'}</span>
          <span className="m-bar-name">{name}</span>
          <span className="m-burger" />
        </div>
        <div className="m-hero" style={{ backgroundImage: `url(${props.photo})` }}>
          <div className="m-hero-text">
            <p className="m-name">{name || ' '}</p>
            <p className="m-tag">{page.tagline}</p>
          </div>
        </div>
        <div className="m-actions">
          <span className="m-btn m-call">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1Z"
                fill="currentColor"
              />
            </svg>
            {page.call}
          </span>
          <span className="m-btn m-quote">{page.quote}</span>
        </div>
        <ul className="m-services">
          {page.services.map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
        <p className="m-hours">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {page.hours}
        </p>
        <p className="m-area">{page.area}</p>
      </div>
    </div>
  )
}
