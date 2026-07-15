"use client"

import { getAnalyticsConsent } from "@/components/analytics/consent-manager"
import { parseAttribution } from "@/lib/analytics/attribution"
import { createAnalyticsEvent, type AnalyticsEventName, type AnalyticsEventProperties } from "@/lib/analytics/events"

export function emitAnalyticsEvent(name: AnalyticsEventName, properties: AnalyticsEventProperties) {
  if (getAnalyticsConsent() !== "accepted") return

  const attribution = parseAttribution(window.location)
  window.dispatchEvent(
    new CustomEvent("blro:analytics", {
      detail: createAnalyticsEvent(name, { ...properties, landingPath: attribution.landingPath }),
    }),
  )
}
