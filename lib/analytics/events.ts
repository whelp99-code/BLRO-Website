export const ANALYTICS_EVENTS = [
  "cta_clicked",
  "form_started",
  "form_validation_failed",
  "turnstile_failed",
  "inquiry_accepted",
  "lead_magnet_delivered",
] as const
export const ANALYTICS_FIELDS = ["company", "name", "workEmail", "phone", "topic", "consent", "message"] as const
export const ANALYTICS_LANDING_PATHS = [
  "/",
  "/ai-automation",
  "/blro",
  "/contact",
  "/diagnostic-sample",
  "/insights",
  "/insights/hci-readiness-checklist",
  "/insights/infrastructure-consulting-baseline",
  "/insights/recovery-objectives-guide",
  "/insights/sase-sdwan-roles",
  "/insights/secure-access-selection",
  "/insights/security-consulting-baseline",
  "/insights/vdi-capacity-planning",
  "/insights/virtualization-hci-migration-guide",
  "/partner-business",
  "/privacy",
  "/projects",
  "/solutions",
  "/solutions/backup-disaster-recovery",
  "/solutions/hci-private-cloud",
  "/solutions/network-security",
  "/solutions/sase-global-connectivity",
  "/solutions/vdi-digital-workspace",
  "/terms",
] as const
export const ANALYTICS_PLACEMENTS = ["hero", "conversion-panel", "audience-path", "solution-detail", "insight-detail", "strategic-page", "contact-form", "diagnostic-sample"] as const
export const ANALYTICS_TOPICS = ["vmware-hci", "vdi", "security", "sase", "dr", "general"] as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[number]

const ANALYTICS_LANDING_PATH_SET: ReadonlySet<string> = new Set(ANALYTICS_LANDING_PATHS)

export function isAnalyticsLandingPath(value: unknown): value is (typeof ANALYTICS_LANDING_PATHS)[number] {
  return typeof value === "string" && ANALYTICS_LANDING_PATH_SET.has(value)
}

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
