import { describe, expect, it } from "vitest"
import { normalizeLandingPath, parseAttribution } from "@/lib/analytics/attribution"
import { createAnalyticsEvent } from "@/lib/analytics/events"

describe("analytics attribution", () => {
  it("keeps relative landing paths and normalized UTM values only", () => {
    expect(normalizeLandingPath("https://untrusted.example")).toBe("/")
    expect(normalizeLandingPath("//untrusted.example")).toBe("/")
    expect(parseAttribution({ pathname: "/contact", search: "?utm_source=naver&utm_campaign=Q3%20HCI&utm_term=<email>" })).toEqual({
      landingPath: "/contact",
      utm: { utm_source: "naver", utm_campaign: "Q3 HCI" },
    })
  })

  it("creates events only from the explicit non-PII properties contract", () => {
    expect(createAnalyticsEvent("cta_clicked", { ctaId: "hero-customer", placement: "hero" })).toEqual({
      name: "cta_clicked",
      properties: { ctaId: "hero-customer", placement: "hero" },
    })
  })
})
