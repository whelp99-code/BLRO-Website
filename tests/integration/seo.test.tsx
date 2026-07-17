import { describe, expect, it } from "vitest"
import robots from "@/app/robots"
import sitemap from "@/app/sitemap"
import { absoluteUrl, breadcrumbStructuredData, isIndexableSite, siteUrl } from "@/lib/site"

describe("search foundation", () => {
  it("uses one canonical site URL and indexes only the production origin", () => {
    expect(absoluteUrl("/contact")).toBe(new URL("/contact", siteUrl).toString())
    const isProductionOrigin = siteUrl.toString() === "https://blro.co.kr/"
    expect(isIndexableSite()).toBe(isProductionOrigin)
    expect(robots()).toEqual(isProductionOrigin
      ? { rules: { userAgent: "*", allow: "/" }, sitemap: "https://blro.co.kr/sitemap.xml" }
      : { rules: { userAgent: "*", disallow: "/" } })
  })

  it("lists static conversion routes and approved public content only", async () => {
    const entries = await sitemap()
    const urls = entries.map((entry) => entry.url)

    expect(urls).toContain(absoluteUrl("/"))
    expect(urls).toContain(absoluteUrl("/contact"))
    expect(urls).toContain(absoluteUrl("/solutions/hci-private-cloud"))
    expect(urls).toContain(absoluteUrl("/insights/security-consulting-baseline"))
    expect(urls.some((url) => url.includes("vmware-nutanix-evaluation-matrix"))).toBe(false)
  })

  it("uses canonical URLs in breadcrumb structured data", () => {
    expect(
      breadcrumbStructuredData([
        { href: "/", label: "Home" },
        { href: "/solutions", label: "Solutions" },
      ]),
    ).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        { position: 1, item: absoluteUrl("/") },
        { position: 2, item: absoluteUrl("/solutions") },
      ],
    })
  })
})
