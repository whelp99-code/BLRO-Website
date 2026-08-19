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
    expect(parseAnalyticsEvent({
      ...validEvent,
      properties: { ctaId: "hero-diagnostic-sample", placement: "hero", landingPath: "/" },
    })).toBeDefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, email: "person@example.com" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, landingPath: "/contact?email=person" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, landingPath: "/person@example.com" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, landingPath: "/010-1234-5678" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, ctaId: "010-1234-5678" } })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ...validEvent.properties, ctaId: "contact-secret-campaign" } })).toBeUndefined()
  })

  it("rejects unknown names and non-v4 event identifiers", () => {
    expect(parseAnalyticsEvent({ ...validEvent, name: "page_profiled" })).toBeUndefined()
    expect(parseAnalyticsEvent({ ...validEvent, eventId: "visitor-1" })).toBeUndefined()
  })

  it("enforces the property contract for each event type", () => {
    expect(parseAnalyticsEvent({ ...validEvent, properties: { ctaId: "hero-customer-diagnostic", landingPath: "/" } })).toBeUndefined()
    expect(parseAnalyticsEvent({
      ...validEvent,
      name: "form_validation_failed",
      properties: { field: "consent", landingPath: "/contact", placement: "contact-form", topic: "general" },
    })).toBeDefined()
    expect(parseAnalyticsEvent({
      ...validEvent,
      name: "inquiry_accepted",
      properties: { ctaId: "contact-partner-collaboration", landingPath: "/contact", placement: "contact-form", topic: "partner-collaboration" },
    })).toBeDefined()
    expect(parseAnalyticsEvent({
      ...validEvent,
      name: "turnstile_failed",
      properties: { ctaId: "contact-general", landingPath: "/contact", placement: "contact-form", topic: "general" },
    })).toBeUndefined()
  })
})
