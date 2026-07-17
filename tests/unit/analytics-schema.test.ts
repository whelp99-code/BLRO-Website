import { describe, expect, it } from "vitest"
import { parseAnalyticsEvent } from "@/workers/lead-gateway/src/analytics-schema"

const validEvent = {
  eventId: "6d6ad56d-9616-49e9-b4a1-6ea7d95beab8",
  name: "cta_clicked",
  properties: { ctaId: "hero-customer-diagnostic", placement: "hero", landingPath: "/" },
}

describe("analytics event boundary", () => {
  it("accepts only allowlisted non-PII fields", () => {
    expect(parseAnalyticsEvent(validEvent)).toEqual(validEvent)
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, email: "person@example.com" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, landingPath: "/contact?email=person" } })).toBeUndefined()
  })

  it("rejects unknown names and non-v4 event identifiers", () => {
    expect(parseAnalyticsEvent({ ...validEvent, name: "page_profiled" })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, eventId: "visitor-1" })).toBeUndefined()
  })
})
