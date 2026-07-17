import { describe, expect, it, vi } from "vitest"
import { handleRequest, type LeadDatabase, type LeadGatewayEnvironment } from "@/workers/lead-gateway/src/index"

const environment = {
  ALLOWED_ORIGINS: "https://preview.blro-website.pages.dev",
  ENVIRONMENT: "preview",
  INQUIRY_INTAKE_ENABLED: "false",
} as const

const validInquiry = {
  company: "Example Corp",
  name: "Hong Gil Dong",
  workEmail: "operator@example.com",
  topic: "vmware-hci",
  consent: { privacyVersion: "pending", marketing: false },
  attribution: { landingPath: "/insights/virtualization-hci-migration-guide", ctaId: "insight", utm: {} },
  turnstileToken: "test-token",
}

function request(body: unknown, headers: HeadersInit = {}): Request {
  return new Request("https://api.blro.example/v1/inquiries", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://preview.blro-website.pages.dev", ...headers },
    body: JSON.stringify(body),
  })
}

function leadMagnetRequest(body: unknown, headers: HeadersInit = {}): Request {
  return new Request("https://api.blro.example/v1/lead-magnets/hci-readiness", {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://preview.blro-website.pages.dev", ...headers },
    body: JSON.stringify(body),
  })
}

describe("lead gateway intake boundary", () => {
  it("rejects cross-origin and malformed requests before an inquiry is accepted", async () => {
    const crossOrigin = await handleRequest(request(validInquiry, { origin: "https://untrusted.example" }), environment)
    const malformed = await handleRequest(request({ topic: "unknown" }), environment)

    expect(crossOrigin.status).toBe(403)
    expect(await crossOrigin.json()).toEqual({ error: "origin_not_allowed" })
    expect(malformed.status).toBe(400)
  })

  it("accepts an allowlisted analytics event without enabling PII intake", async () => {
    const run = vi.fn().mockResolvedValue({ meta: { changes: 1 } })
    const first = vi.fn().mockResolvedValue(null)
    const bind = vi.fn().mockReturnValue({ first, run })
    const prepare = vi.fn().mockReturnValue({ bind })
    const database = { batch: vi.fn(), prepare } satisfies LeadDatabase
    const analyticsEnvironment = { ...environment, DB: database } satisfies LeadGatewayEnvironment
    const result = await handleRequest(new Request("https://api.blro.example/v1/analytics", {
      method: "POST",
      headers: { "content-type": "text/plain;charset=UTF-8", origin: "https://preview.blro-website.pages.dev" },
      body: JSON.stringify({
        eventId: "6d6ad56d-9616-49e9-b4a1-6ea7d95beab8",
        name: "cta_clicked",
        properties: { ctaId: "hero-customer-diagnostic", placement: "hero", landingPath: "/" },
      }),
    }), analyticsEnvironment)

    expect(result.status).toBe(202)
    expect(prepare).toHaveBeenCalledWith(expect.stringContaining("INSERT OR IGNORE INTO analytics_events"))
    expect(bind).toHaveBeenCalledWith(
      "6d6ad56d-9616-49e9-b4a1-6ea7d95beab8",
      expect.any(String),
      "cta_clicked",
      "hero-customer-diagnostic",
      "hero",
      "/",
      null,
      null,
      expect.any(String),
    )
  })

  it("keeps valid inquiries unavailable until approved delivery bindings exist", async () => {
    const result = await handleRequest(request(validInquiry), environment)

    expect(result.status).toBe(503)
    expect(result.headers.get("cache-control")).toBe("no-store")
    expect(await result.json()).toEqual({ error: "intake_not_enabled" })
  })

  it("keeps checklist requests behind the same approved intake boundary", async () => {
    const result = await handleRequest(leadMagnetRequest({
      company: "Example Corp",
      name: "Hong Gil Dong",
      workEmail: "operator@example.com",
      consent: { privacyVersion: "pending", marketing: true },
      attribution: { landingPath: "/insights/hci-readiness-checklist", ctaId: "download", utm: {} },
      turnstileToken: "test-token",
    }), environment)

    expect(result.status).toBe(503)
    expect(await result.json()).toEqual({ error: "intake_not_enabled" })
  })

  it("returns CORS preflight headers only for a configured origin", async () => {
    const preflight = await handleRequest(new Request("https://api.blro.example/v1/inquiries", {
      method: "OPTIONS",
      headers: { origin: "https://preview.blro-website.pages.dev" },
    }), environment)
    const rejected = await handleRequest(new Request("https://api.blro.example/v1/inquiries", {
      method: "OPTIONS",
      headers: { origin: "https://untrusted.example" },
    }), environment)

    expect(preflight.status).toBe(204)
    expect(preflight.headers.get("access-control-allow-origin")).toBe("https://preview.blro-website.pages.dev")
    expect(rejected.status).toBe(403)
  })
})
