import { isAnalyticsCtaId } from "../../../lib/analytics/cta-ids"
import { ANALYTICS_EVENTS, ANALYTICS_FIELDS, ANALYTICS_PLACEMENTS, ANALYTICS_TOPICS } from "../../../lib/analytics/events"

const EVENT_NAMES: ReadonlySet<string> = new Set(ANALYTICS_EVENTS)
const PLACEMENTS: ReadonlySet<string> = new Set(ANALYTICS_PLACEMENTS)
const TOPICS: ReadonlySet<string> = new Set(ANALYTICS_TOPICS)
const FIELDS: ReadonlySet<string> = new Set(ANALYTICS_FIELDS)
const EVENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u
const ALLOWED_PROPERTY_KEYS = new Set(["ctaId", "field", "landingPath", "placement", "topic"])
const REQUIRED_PROPERTY_KEYS: Readonly<Record<string, ReadonlySet<string>>> = {
  cta_clicked: new Set(["ctaId", "landingPath", "placement"]),
  form_started: new Set(["ctaId", "landingPath", "placement"]),
  form_validation_failed: new Set(["field", "landingPath", "placement", "topic"]),
  inquiry_accepted: new Set(["ctaId", "landingPath", "placement", "topic"]),
  lead_magnet_delivered: new Set(["ctaId", "landingPath", "placement", "topic"]),
  turnstile_failed: new Set(["landingPath", "placement", "topic"]),
}
const EVENT_PROPERTY_KEYS: Readonly<Record<string, ReadonlySet<string>>> = {
  cta_clicked: new Set(["ctaId", "landingPath", "placement", "topic"]),
  form_started: new Set(["ctaId", "landingPath", "placement", "topic"]),
  form_validation_failed: new Set(["field", "landingPath", "placement", "topic"]),
  inquiry_accepted: new Set(["ctaId", "landingPath", "placement", "topic"]),
  lead_magnet_delivered: new Set(["ctaId", "landingPath", "placement", "topic"]),
  turnstile_failed: new Set(["landingPath", "placement", "topic"]),
}

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
  const requiredKeys = REQUIRED_PROPERTY_KEYS[value["name"]]
  const eventKeys = EVENT_PROPERTY_KEYS[value["name"]]
  if (requiredKeys === undefined || eventKeys === undefined) return undefined
  const propertyKeys = Object.keys(properties)
  if (propertyKeys.some((key) => !ALLOWED_PROPERTY_KEYS.has(key) || !eventKeys.has(key))) return undefined
  if (Array.from(requiredKeys).some((key) => properties[key] === undefined)) return undefined

  const ctaId = properties["ctaId"]
  const field = properties["field"]
  const landingPath = properties["landingPath"]
  const placement = properties["placement"]
  const topic = properties["topic"]

  if (ctaId !== undefined && !isAnalyticsCtaId(ctaId)) return undefined
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
