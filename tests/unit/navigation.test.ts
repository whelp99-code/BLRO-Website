import { describe, expect, it } from "vitest"
import {
  footerBusinessRoutes,
  footerInquiries,
  getBreadcrumbs,
  getLocaleCounterpart,
  isCurrentRoute,
  primaryNavigation,
} from "@/lib/navigation"

describe("navigation registry", () => {
  it("exposes only launch-ready primary routes and one solution megamenu", () => {
    // Given
    const expectedLabels = [
      "기업 고객",
      "국내 파트너",
      "기술 엔지니어",
      "솔루션",
      "판단 과정",
      "상담",
    ]

    // When
    const megamenus = primaryNavigation.filter((item) => item.children.length > 0)

    // Then
    expect(primaryNavigation.map((item) => item.label)).toEqual(expectedLabels)
    expect(megamenus.map((item) => item.label)).toEqual(["솔루션"])
  })

  it("keeps company information in the footer without diluting the primary journey", () => {
    expect(footerBusinessRoutes.map((item) => item.label)).toEqual([
      "BLRO",
      "솔루션",
      "인사이트",
      "AI와 자동화",
      "파트너 사업",
    ])
  })

  it("matches only a route or its true descendants", () => {
    // Given
    const route = "/solutions"

    // When
    const matches = [
      isCurrentRoute("/solutions", route),
      isCurrentRoute("/solutions/network-security", route),
      isCurrentRoute("/solutions-old", route),
    ]

    // Then
    expect(matches).toEqual([true, true, false])
  })

  it("builds known breadcrumbs and rejects unknown hierarchy", () => {
    // Given
    const knownPath = "/solutions/network-security"
    const unknownPath = "/solutions/not-a-real-solution"

    // When
    const known = getBreadcrumbs(knownPath)
    const unknown = getBreadcrumbs(unknownPath)

    // Then
    expect(known).toEqual([
      { href: "/", label: "Home" },
      { href: "/solutions", label: "Solutions" },
      { href: "/solutions/network-security", label: "Network Security" },
    ])
    expect(unknown).toEqual([])
  })

  it("exposes locale counterparts only when the target is published", () => {
    // Given
    const publishedRoutes = new Set(["/", "/en"])
    const KoreanOnlyRoutes = new Set(["/"])

    // When
    const publishedCounterpart = getLocaleCounterpart("/", publishedRoutes)
    const futureCounterpart = getLocaleCounterpart("/", KoreanOnlyRoutes)
    const unknownCounterpart = getLocaleCounterpart("/unknown", publishedRoutes)

    // Then
    expect(publishedCounterpart).toEqual({ href: "/en", label: "English", lang: "en" })
    expect(futureCounterpart).toBeUndefined()
    expect(unknownCounterpart).toBeUndefined()
  })

  it("keeps the three inquiry destinations distinct", () => {
    // Given
    const expectedHrefs = [
      "/contact?type=customer-project",
      "/contact?type=partner-collaboration",
      "/contact?type=vendor-korea-entry",
    ]

    // When
    const hrefs = footerInquiries.map((item) => item.href)

    // Then
    expect(hrefs).toEqual(expectedHrefs)
    expect(new Set(hrefs).size).toBe(3)
  })
})
