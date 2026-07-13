import type { ComponentPropsWithoutRef, ReactNode } from "react"

type ButtonVariant = "primary" | "secondary" | "text" | "danger"
type ButtonSize = "default" | "compact" | "icon"

export class ButtonAccessibilityError extends Error {
  constructor() {
    super("Icon-only buttons require a non-empty aria-label")
    this.name = "ButtonAccessibilityError"
  }
}

export type ButtonProps = Omit<ComponentPropsWithoutRef<"button">, "size"> & {
  readonly children: ReactNode
  readonly loading?: boolean
  readonly loadingLabel?: string
  readonly size?: ButtonSize
  readonly variant?: ButtonVariant
}

export function Button({
  children,
  className,
  disabled = false,
  loading = false,
  loadingLabel = "처리 중",
  size = "default",
  variant = "primary",
  ...buttonProps
}: ButtonProps) {
  const accessibleLabel = buttonProps["aria-label"]
  if (size === "icon" && (typeof accessibleLabel !== "string" || accessibleLabel.trim().length === 0)) {
    throw new ButtonAccessibilityError()
  }

  const classes = ["blro-button", `blro-button--${variant}`, `blro-button--${size}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return (
    <button
      {...buttonProps}
      aria-busy={loading ? true : undefined}
      className={classes}
      data-variant={variant}
      disabled={disabled || loading}
    >
      {loading ? <span aria-hidden="true" className="blro-button__spinner" /> : null}
      <span aria-hidden={loading ? true : undefined} className="blro-button__label-content">
        {children}
      </span>
      {loading ? <span className="blro-visually-hidden">{loadingLabel}</span> : null}
    </button>
  )
}
