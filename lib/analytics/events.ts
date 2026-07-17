export const ANALYTICS_EVENTS = [
  "cta_clicked",
  "form_started",
  "form_validation_failed",
  "turnstile_failed",
  "inquiry_accepted",
  "lead_magnet_delivered",
] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number]

export type AnalyticsEventProperties = {
  readonly ctaId?: string
  readonly field?: "company" | "name" | "workEmail" | "phone" | "topic" | "consent" | "message"
  readonly landingPath?: string
  readonly placement?: "hero" | "conversion-panel" | "audience-path" | "solution-detail" | "insight-detail" | "strategic-page" | "contact-form" | "diagnostic-sample"
  readonly topic?: "vmware-hci" | "vdi" | "security" | "sase" | "dr" | "general"
}

export type AnalyticsEvent = {
  readonly name: AnalyticsEventName
  readonly properties: AnalyticsEventProperties
}

export function createAnalyticsEvent(name: AnalyticsEventName, properties: AnalyticsEventProperties): AnalyticsEvent {
  return { name, properties }
}
