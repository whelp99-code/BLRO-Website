import { fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { ConsentManager } from "@/components/analytics/consent-manager"
import { TrackableLink } from "@/components/analytics/trackable-link"

afterEach(() => window.localStorage.clear())

describe("analytics consent", () => {
  it("requires an explicit choice before the measurement prompt disappears", () => {
    render(<ConsentManager />)

    fireEvent.click(screen.getByRole("button", { name: "거부" }))

    expect(screen.queryByRole("dialog", { name: "웹사이트 측정 동의" })).not.toBeInTheDocument()
    expect(window.localStorage.getItem("blro-analytics-consent")).toBe("rejected")
  })

  it("dispatches only an approved CTA event after consent", () => {
    window.localStorage.setItem("blro-analytics-consent", "accepted")
    const events: unknown[] = []
    window.addEventListener("blro:analytics", (event) => events.push(Reflect.get(event, "detail")), { once: true })
    render(<TrackableLink href="/contact" properties={{ ctaId: "hero-customer", placement: "hero" }}>상담</TrackableLink>)

    fireEvent.click(screen.getByRole("link", { name: "상담" }))

    expect(events).toEqual([{ name: "cta_clicked", properties: { ctaId: "hero-customer", landingPath: "/", placement: "hero" } }])
  })

  it("does not emit an event when measurement is rejected", () => {
    window.localStorage.setItem("blro-analytics-consent", "rejected")
    const events: unknown[] = []
    window.addEventListener("blro:analytics", (event) => events.push(Reflect.get(event, "detail")), { once: true })
    render(<TrackableLink href="/contact" properties={{ ctaId: "insight-security-consultation", placement: "insight-detail" }}>상담</TrackableLink>)

    fireEvent.click(screen.getByRole("link", { name: "상담" }))

    expect(events).toEqual([])
  })
})
