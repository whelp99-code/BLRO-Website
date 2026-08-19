import { describe, expect, it } from "vitest"
import {
  PRODUCTION_LEAD_API_ORIGIN,
  PRODUCTION_SITE_ORIGIN,
  PRODUCTION_TURNSTILE_SITE_KEY,
  configuredPublicValue,
  isSecureIntakeConfigured,
  resolveLeadApiUrl,
  resolvePublicSiteUrl,
  resolveTurnstileSiteKey,
} from "@/lib/public-runtime"

describe("public runtime defaults", () => {
  it("treats missing and blank values as unset", () => {
    expect(configuredPublicValue(undefined)).toBeUndefined()
    expect(configuredPublicValue("")).toBeUndefined()
    expect(configuredPublicValue("   ")).toBeUndefined()
    expect(configuredPublicValue("https://api.blro.co.kr")).toBe("https://api.blro.co.kr")
  })

  it("keeps local defaults outside production and fills the live origin in production", () => {
    expect(resolvePublicSiteUrl(undefined, "test")).toBe("http://localhost:3000")
    expect(resolvePublicSiteUrl("", "development")).toBe("http://localhost:3000")
    expect(resolvePublicSiteUrl("http://localhost:3000", "development")).toBe("http://localhost:3000")
    expect(resolvePublicSiteUrl("  ", "production")).toBe(PRODUCTION_SITE_ORIGIN)
    expect(resolvePublicSiteUrl("http://localhost:3000", "production")).toBe(PRODUCTION_SITE_ORIGIN)
    expect(resolvePublicSiteUrl("http://blro.co.kr", "production")).toBe(PRODUCTION_SITE_ORIGIN)
    expect(resolvePublicSiteUrl("https://preview.blro-website.pages.dev", "production")).toBe(
      "https://preview.blro-website.pages.dev",
    )
  })

  it("unlocks intake when production public values are blank at build time", () => {
    expect(resolveLeadApiUrl(undefined, "test")).toBeUndefined()
    expect(resolveTurnstileSiteKey("", "development")).toBeUndefined()
    expect(isSecureIntakeConfigured("", "", "test")).toBe(false)
    expect(resolveLeadApiUrl("", "production")).toBe(PRODUCTION_LEAD_API_ORIGIN)
    expect(resolveTurnstileSiteKey(undefined, "production")).toBe(PRODUCTION_TURNSTILE_SITE_KEY)
    expect(isSecureIntakeConfigured("", "   ", "production")).toBe(true)
  })
})
