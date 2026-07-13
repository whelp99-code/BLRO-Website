import type { ComponentPropsWithoutRef } from "react"

export type ProseProps = ComponentPropsWithoutRef<"div">

export function Prose({ className, ...divProps }: ProseProps) {
  const classes = ["blro-prose", className]
    .filter((value) => typeof value === "string" && value.length > 0)
    .join(" ")

  return <div {...divProps} className={classes} />
}
