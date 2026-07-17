import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { ConsentManager } from "@/components/analytics/consent-manager"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { PRIVACY_NOTICE_VERSION } from "@/lib/privacy-notice"

afterEach(() => window.localStorage.clear())

describe("analytics consent", () => {
  it("requires an explicit choice before the measurement prompt disappears", () => {
    render(<ConsentManager />)

    expect(screen.getByTestId("analytics-consent")).toBeVisible()
    fireEvent.click(screen.getByRole("button", { name: "거부" }))

    expect(screen.queryByTestId("analytics-consent")).not.toBeInTheDocument()
    expect(window.localStorage.getItem("blro-analytics-consent")).toBe(`${PRIVACY_NOTICE_VERSION}:rejected`)
  })

  it("dispatches only an approved CTA event after consent", () => {
    window.localStorage.setItem("blro-analytics-consent", `${PRIVACY_NOTICE_VERSION}:accepted`)
    const events: unknown[] = []
    window.addEventListener("blro:analytics", (event) => events.push(Reflect.get(event, "detail")), { once: true })
    render(<TrackableLink href="/contact" properties={{ ctaId: "hero-customer-diagnostic", placement: "hero" }}>상담</TrackableLink>)

    fireEvent.click(screen.getByRole("link", { name: "상담" }))

    expect(events).toEqual([{ name: "cta_clicked", properties: { ctaId: "hero-customer-diagnostic", landingPath: "/", placement: "hero" } }])
  })

  it("does not emit an event when measurement is rejected", () => {
    window.localStorage.setItem("blro-analytics-consent", `${PRIVACY_NOTICE_VERSION}:rejected`)
    const events: unknown[] = []
    window.addEventListener("blro:analytics", (event) => events.push(Reflect.get(event, "detail")), { once: true })
    render(<TrackableLink href="/contact" properties={{ ctaId: "insight-security-consulting-baseline-consultation", placement: "insight-detail" }}>상담</TrackableLink>)

    fireEvent.click(screen.getByRole("link", { name: "상담" }))

    expect(events).toEqual([])
  })

  it("asks again when a stored choice belongs to an older notice format", () => {
    window.localStorage.setItem("blro-analytics-consent", "accepted")

    render(<ConsentManager />)

    expect(screen.getByTestId("analytics-consent")).toBeVisible()
  })
})
