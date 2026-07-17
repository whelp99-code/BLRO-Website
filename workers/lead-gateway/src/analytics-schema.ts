const EVENT_NAMES = new Set([
  "cta_clicked",
  "form_started",
  "form_validation_failed",
  "turnstile_failed",
  "inquiry_accepted",
  "lead_magnet_delivered",
])
const PLACEMENTS = new Set(["hero", "conversion-panel", "audience-path", "solution-detail", "insight-detail", "strategic-page", "contact-form", "diagnostic-sample"])
const TOPICS = new Set(["vmware-hci", "vdi", "security", "sase", "dr", "general"])
const FIELDS = new Set(["company", "name", "workEmail", "phone", "topic", "consent", "message"])
const EVENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u
const ID_PATTERN = /^[a-z0-9][a-z0-9-]{0,79}$/u
const ALLOWED_PROPERTY_KEYS = new Set(["ctaId", "field", "landingPath", "placement", "topic"])

export type ParsedAnalyticsEvent = Readonly<{
  eventId: string
  name: string
  properties: Readonly<{
    ctaId?: string
    field?: string
    landingPath?: string
    placement?: string
    topic?: string
  }>
}>

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function isLandingPath(value: unknown): value is string {
  return typeof value === "string" && value.length <= 240 && value.startsWith("/") && !value.startsWith("//") && !value.includes("?") && !value.includes("#")
}

export function parseAnalyticsEvent(value: unknown): ParsedAnalyticsEvent | undefined {
  if (!isRecord(value) || typeof value["eventId"] !== "string" || !EVENT_ID_PATTERN.test(value["eventId"])) return undefined
  if (typeof value["name"] !== "string" || !EVENT_NAMES.has(value["name"])) return undefined
  if (!isRecord(value["properties"])) return undefined
  const properties = value["properties"]
  if (Object.keys(properties).some((key) => !ALLOWED_PROPERTY_KEYS.has(key))) return undefined

  const ctaId = properties["ctaId"]
  const field = properties["field"]
  const landingPath = properties["landingPath"]
  const placement = properties["placement"]
  const topic = properties["topic"]

  if (ctaId !== undefined && (typeof ctaId !== "string" || !ID_PATTERN.test(ctaId))) return undefined
  if (field !== undefined && (typeof field !== "string" || !FIELDS.has(field))) return undefined
  if (landingPath !== undefined && !isLandingPath(landingPath)) return undefined
  if (placement !== undefined && (typeof placement !== "string" || !PLACEMENTS.has(placement))) return undefined
  if (topic !== undefined && (typeof topic !== "string" || !TOPICS.has(topic))) return undefined

  return {
    eventId: value["eventId"],
    name: value["name"],
    properties: {
      ...(ctaId === undefined ? {} : { ctaId }),
      ...(field === undefined ? {} : { field }),
      ...(landingPath === undefined ? {} : { landingPath }),
      ...(placement === undefined ? {} : { placement }),
      ...(topic === undefined ? {} : { topic }),
    },
  }
}
