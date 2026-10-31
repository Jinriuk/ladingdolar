import type { PointerEvent } from 'react'
import type { Market } from '../data/content'

export const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="M5 19 19 5M5 5h14v14" stroke="currentColor" strokeWidth="1.5" />
  </svg>
)

/** Feeds the cursor position to CSS so the "View" orb follows the pointer. */
export function trackPointer(event: PointerEvent<HTMLElement>) {
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
}

export function MarketTabs(props: { value: Market; onChange: (m: Market) => void; label: string }) {
  return (
    <div className="market-tabs" role="group" aria-label={props.label}>
      <button type="button" aria-pressed={props.value === 'US'} onClick={() => props.onChange('US')}>
        USA
      </button>
      <button type="button" aria-pressed={props.value === 'PA'} onClick={() => props.onChange('PA')}>
        Panamá
      </button>
    </div>
  )
}

export function mailto(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
