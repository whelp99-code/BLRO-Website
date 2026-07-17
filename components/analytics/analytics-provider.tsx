"use client"

import { useEffect, useSyncExternalStore } from "react"
import { getAnalyticsConsent, subscribeToConsent } from "@/components/analytics/consent-manager"
import type { AnalyticsEvent } from "@/lib/analytics/events"

const ANALYTICS_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_API_URL
const CLOUDFLARE_WEB_ANALYTICS_TOKEN = process.env.NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN
const ANALYTICS_EVENT = "blro:analytics"

function isAnalyticsDetail(value: unknown): value is AnalyticsEvent {
  return typeof value === "object" && value !== null && "name" in value && "properties" in value
}

export function AnalyticsProvider() {
  const consent = useSyncExternalStore(subscribeToConsent, getAnalyticsConsent, () => "undecided")

  useEffect(() => {
    if (consent !== "accepted" || CLOUDFLARE_WEB_ANALYTICS_TOKEN === undefined) return

    const script = document.createElement("script")
    script.defer = true
    script.src = "https://static.cloudflareinsights.com/beacon.min.js"
    script.dataset["blroAnalytics"] = "cloudflare"
    script.dataset["cfBeacon"] = JSON.stringify({ token: CLOUDFLARE_WEB_ANALYTICS_TOKEN })
    document.head.appendChild(script)
    return () => {
      script.parentNode?.removeChild(script)
    }
  }, [consent])

  useEffect(() => {
    if (consent !== "accepted" || ANALYTICS_ENDPOINT === undefined) return

    function sendEvent(event: Event) {
      if (!(event instanceof CustomEvent) || !isAnalyticsDetail(event.detail)) return
      const envelope = JSON.stringify({ eventId: crypto.randomUUID(), ...event.detail })
      navigator.sendBeacon?.(`${ANALYTICS_ENDPOINT}/v1/analytics`, new Blob([envelope], { type: "text/plain;charset=UTF-8" }))
    }

    window.addEventListener(ANALYTICS_EVENT, sendEvent)
    return () => window.removeEventListener(ANALYTICS_EVENT, sendEvent)
  }, [consent])

  return null
}
