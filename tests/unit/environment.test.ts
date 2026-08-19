import { describe, expect, it } from "vitest"
import { parsePublicEnvironment } from "@/lib/env"

describe("parsePublicEnvironment", () => {
  it("returns a typed site URL when the boundary input is valid", () => {
    // Given
    const input = {
      NODE_ENV: "test",
      NEXT_PUBLIC_SITE_URL: "https://www.blro.example",
    }

    // When
    const environment = parsePublicEnvironment(input)

    // Then
    expect(environment.NEXT_PUBLIC_SITE_URL).toBe("https://www.blro.example")
  })

  it("rejects a malformed site URL at the environment boundary", () => {
    // Given
    const input = { NEXT_PUBLIC_SITE_URL: "not-a-url" }

    // When
    const parse = () => parsePublicEnvironment(input)

    // Then
    expect(parse).toThrow()
  })

  it("uses the live origin when production builds omit or blank the site URL", () => {
    expect(parsePublicEnvironment({ NODE_ENV: "production" }).NEXT_PUBLIC_SITE_URL).toBe("https://blro.co.kr")
    expect(parsePublicEnvironment({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "   ",
    }).NEXT_PUBLIC_SITE_URL).toBe("https://blro.co.kr")
  })

  it("uses the live origin when production is given a localhost site URL", () => {
    expect(parsePublicEnvironment({
      NODE_ENV: "production",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    }).NEXT_PUBLIC_SITE_URL).toBe("https://blro.co.kr")
  })
})
