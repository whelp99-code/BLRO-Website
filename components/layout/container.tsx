import type { ComponentPropsWithoutRef } from "react"

type ContainerVariant = "standard" | "prose"

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  readonly variant?: ContainerVariant
}

export function Container({ className, variant = "standard", ...divProps }: ContainerProps) {
  const classes = ["blro-container", `blro-container--${variant}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return <div {...divProps} className={classes} />
}
