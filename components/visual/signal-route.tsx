type SignalRouteProps = {
  readonly className?: string
  readonly label: string
}

export class SignalRouteAccessibilityError extends Error {
  constructor() {
    super("SignalRoute requires a non-empty accessible label")
    this.name = "SignalRouteAccessibilityError"
  }
}

export function SignalRoute({ className, label }: SignalRouteProps) {
  if (label.trim().length === 0) {
    throw new SignalRouteAccessibilityError()
  }

  const classes = ["blro-signal-field", className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return (
    <figure aria-label={label} className={classes} role="img">
      <span className="blro-signal-field__label blro-signal-field__label--input" aria-hidden="true">
        INPUT 00
      </span>
      <svg aria-hidden="true" viewBox="0 0 720 360">
        <path className="blro-signal-field__axis" d="M56 300H664M80 60V300" />
        <path
          className="blro-signal-field__route"
          d="M80 260C152 260 158 188 238 188S326 238 398 170 510 84 640 84"
        />
        <circle cx="80" cy="260" r="7" />
        <circle cx="238" cy="188" r="7" />
        <circle cx="398" cy="170" r="7" />
        <circle cx="512" cy="104" r="7" />
        <circle cx="640" cy="84" r="7" />
      </svg>
      <span className="blro-signal-field__label blro-signal-field__label--output" aria-hidden="true">
        OUTPUT 01
      </span>
    </figure>
  )
}
