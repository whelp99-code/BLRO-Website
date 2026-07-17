export const ANALYTICS_EVENTS = [
  "cta_clicked",
  "form_started",
  "form_validation_failed",
  "turnstile_failed",
  "inquiry_accepted",
  "lead_magnet_delivered",
] as const
export const ANALYTICS_FIELDS = ["company", "name", "workEmail", "phone", "topic", "consent", "message"] as const
export const ANALYTICS_PLACEMENTS = ["hero", "conversion-panel", "audience-path", "solution-detail", "insight-detail", "strategic-page", "contact-form", "diagnostic-sample"] as const
export const ANALYTICS_TOPICS = ["vmware-hci", "vdi", "security", "sase", "dr", "general"] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number]

export type AnalyticsEventProperties = {
  readonly ctaId?: string
  readonly field?: (typeof ANALYTICS_FIELDS)[number]
  readonly landingPath?: string
  readonly placement?: (typeof ANALYTICS_PLACEMENTS)[number]
  readonly topic?: (typeof ANALYTICS_TOPICS)[number]
}

export type AnalyticsEvent = {
  readonly name: AnalyticsEventName
  readonly properties: AnalyticsEventProperties
}

export function createAnalyticsEvent(name: AnalyticsEventName, properties: AnalyticsEventProperties): AnalyticsEvent {
  return { name, properties }
}
