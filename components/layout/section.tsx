import type { ComponentPropsWithoutRef } from "react"

type SectionTone = "canvas" | "surface" | "alternate" | "navy"
type SectionSpacing = "compact" | "default" | "generous"

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  readonly spacing?: SectionSpacing
  readonly tone?: SectionTone
}

export function Section({
  className,
  spacing = "default",
  tone = "canvas",
  ...sectionProps
}: SectionProps) {
  const classes = ["blro-section", `blro-section--${tone}`, `blro-section--${spacing}`, className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return <section {...sectionProps} className={classes} />
}
