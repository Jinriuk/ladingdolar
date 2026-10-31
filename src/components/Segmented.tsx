/** A small set of mutually exclusive choices, built on native radio buttons for keyboard support. */
export function Segmented<T extends string>(props: {
  legend: string
  name: string
  options: Array<{ value: T; label: string }>
  value: T
  onChange: (value: T) => void
}) {
  return (
    <fieldset className="segmented">
      <legend className="field-label">{props.legend}</legend>
      <div className="segmented-options">
        {props.options.map((option) => (
          <label key={option.value} className={option.value === props.value ? 'checked' : undefined}>
            <input
              type="radio"
              name={props.name}
              value={option.value}
              checked={option.value === props.value}
              onChange={() => props.onChange(option.value)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}
