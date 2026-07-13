import type { ComponentPropsWithoutRef, ReactNode } from "react"

type LinkVariant = "inline" | "standalone" | "muted"

export type ActionLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  readonly children: ReactNode
  readonly disabled?: boolean
  readonly href: string
  readonly variant?: LinkVariant
}

export function ActionLink({
  "aria-label": ariaLabel,
  children,
  className,
  disabled = false,
  href,
  onAuxClick,
  onClick,
  onKeyDown,
  onKeyUp,
  variant = "inline",
  ...anchorProps
}: ActionLinkProps) {
  const classes = ["blro-link", `blro-link--${variant}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")
  const disabledProps = Object.fromEntries(
    Object.entries(anchorProps).filter(([property]) => !/^on[A-Z]/u.test(property)),
  )

  if (disabled) {
    return (
      <span
        {...disabledProps}
        aria-disabled="true"
        aria-label={ariaLabel}
        className={`${classes} blro-link--disabled`}
      >
        {children}
      </span>
    )
  }

  return (
    <a
      {...anchorProps}
      aria-label={ariaLabel}
      className={classes}
      href={href}
      onAuxClick={onAuxClick}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
    >
      {children}
    </a>
  )
}
