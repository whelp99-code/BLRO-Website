import type { ComponentPropsWithoutRef } from "react"

type HeadingLevel = 1 | 2 | 3
type HeadingSize = "display" | "h1" | "h2" | "h3"

export type HeadingProps = Omit<ComponentPropsWithoutRef<"h1">, "size"> & {
  readonly level: HeadingLevel
  readonly size?: HeadingSize
}

export function Heading({ className, level, size, ...headingProps }: HeadingProps) {
  const visualSize = size ?? `h${level}`
  const classes = ["blro-heading", `blro-heading--${visualSize}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  switch (level) {
    case 1:
      return <h1 {...headingProps} className={classes} />
    case 2:
      return <h2 {...headingProps} className={classes} />
    case 3:
      return <h3 {...headingProps} className={classes} />
  }
}

type TextVariant = "lead" | "body" | "small" | "inverse"

export type TextProps = ComponentPropsWithoutRef<"p"> & {
  readonly variant?: TextVariant
}

export function Text({ className, variant = "body", ...paragraphProps }: TextProps) {
  const classes = ["blro-text", `blro-text--${variant}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return <p {...paragraphProps} className={classes} />
}

export type EyebrowProps = ComponentPropsWithoutRef<"p">

export function Eyebrow({ className, ...paragraphProps }: EyebrowProps) {
  const classes = ["blro-eyebrow", className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return <p {...paragraphProps} className={classes} />
}
