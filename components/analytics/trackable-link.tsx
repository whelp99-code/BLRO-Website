"use client"

import type { ComponentPropsWithoutRef, ReactNode } from "react"
import { emitAnalyticsEvent } from "@/components/analytics/emit-analytics-event"
import type { AnalyticsEventProperties } from "@/lib/analytics/events"

export type TrackableLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  readonly children: ReactNode
  readonly href: string
  readonly properties: AnalyticsEventProperties
}

export function TrackableLink({ children, href, onClick, properties, ...anchorProps }: TrackableLinkProps) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onClick?.(event)
    if (event.defaultPrevented) return

    emitAnalyticsEvent("cta_clicked", properties)
  }

  return (
    <a {...anchorProps} href={href} onClick={handleClick}>
      {children}
    </a>
  )
}
