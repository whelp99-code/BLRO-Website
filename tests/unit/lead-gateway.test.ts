import { describe, expect, it, vi } from "vitest"
import { PRIVACY_NOTICE_VERSION } from "@/lib/privacy-notice"
import { handleRequest, type AnalyticsRateLimiter, type LeadDatabase, type LeadGatewayEnvironment } from "@/workers/lead-gateway/src/index"

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
  consent: { privacyVersion: PRIVACY_NOTICE_VERSION, marketing: false },
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

function analyticsRateLimiter(success = true): AnalyticsRateLimiter {
  return { limit: vi.fn().mockResolvedValue({ success }) }
}

describe("lead gateway intake boundary", () => {
  it("rejects cross-origin and malformed requests before an inquiry is accepted", async () => {
    const crossOrigin = await handleRequest(request(validInquiry, { origin: "https://untrusted.example" }), environment)
    const malformed = await handleRequest(request({ topic: "unknown" }), environment)
    const outdatedConsent = await handleRequest(request({
      ...validInquiry,
      consent: { privacyVersion: "2026-07-14", marketing: false },
    }), environment)

    expect(crossOrigin.status).toBe(403)
    expect(await crossOrigin.json()).toEqual({ error: "origin_not_allowed" })
    expect(malformed.status).toBe(400)
    expect(outdatedConsent.status).toBe(400)
  })

  it("accepts an allowlisted analytics event without enabling PII intake", async () => {
    const run = vi.fn().mockResolvedValue({ meta: { changes: 1 } })
    const first = vi.fn().mockResolvedValue(null)
    const bind = vi.fn().mockReturnValue({ first, run })
    const prepare = vi.fn().mockReturnValue({ bind })
    const database = { batch: vi.fn(), prepare } satisfies LeadDatabase
    const analyticsEnvironment = {
      ...environment,
      ANALYTICS_GLOBAL_RATE_LIMITER: analyticsRateLimiter(),
      ANALYTICS_RATE_LIMITER: analyticsRateLimiter(),
      DB: database,
    } satisfies LeadGatewayEnvironment
    const result = await handleRequest(new Request("https://api.blro.example/v1/analytics", {
      method: "POST",
      headers: { "cf-connecting-ip": "192.0.2.10", "content-type": "text/plain;charset=UTF-8", origin: "https://preview.blro-website.pages.dev" },
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

  it("rejects analytics before D1 when an edge rate limit is exhausted", async () => {
    const prepare = vi.fn()
    const database = { batch: vi.fn(), prepare } satisfies LeadDatabase
    const result = await handleRequest(new Request("https://api.blro.example/v1/analytics", {
      method: "POST",
      headers: { "cf-connecting-ip": "192.0.2.11", "content-type": "text/plain", origin: "https://preview.blro-website.pages.dev" },
      body: JSON.stringify({
        eventId: "6d6ad56d-9616-49e9-b4a1-6ea7d95beab8",
        name: "cta_clicked",
        properties: { ctaId: "hero-customer-diagnostic", placement: "hero", landingPath: "/" },
      }),
    }), {
      ...environment,
      ANALYTICS_GLOBAL_RATE_LIMITER: analyticsRateLimiter(),
      ANALYTICS_RATE_LIMITER: analyticsRateLimiter(false),
      DB: database,
    })

    expect(result.status).toBe(429)
    expect(prepare).not.toHaveBeenCalled()
  })

  it("keeps valid inquiries unavailable until approved delivery bindings exist", async () => {
    const result = await handleRequest(request(validInquiry), environment)

    expect(result.status).toBe(503)
    expect(result.headers.get("cache-control")).toBe("no-store")
    expect(await result.json()).toEqual({ error: "intake_not_enabled" })
  })

  it("keeps checklist requests behind the same approved intake boundary", async () => {
    const validChecklist = {
      company: "Example Corp",
      name: "Hong Gil Dong",
      workEmail: "operator@example.com",
      consent: { privacyVersion: PRIVACY_NOTICE_VERSION, marketing: false },
      attribution: { landingPath: "/insights/hci-readiness-checklist", ctaId: "download", utm: {} },
      turnstileToken: "test-token",
    }
    const result = await handleRequest(leadMagnetRequest(validChecklist), environment)
    const marketingRequest = await handleRequest(leadMagnetRequest({
      ...validChecklist,
      consent: { privacyVersion: PRIVACY_NOTICE_VERSION, marketing: true },
    }), environment)

    expect(result.status).toBe(503)
    expect(await result.json()).toEqual({ error: "intake_not_enabled" })
    expect(marketingRequest.status).toBe(400)
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

  it("keeps PII and inquiry text out of Slack delivery alerts", async () => {
    const slackFetch = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("ok", { status: 200 }))
    const storedPayload = {
      company: "Secret Company",
      name: "Secret Person",
      workEmail: "secret@example.com",
      phone: "010-1234-5678",
      message: "Do not send this to Slack",
      topic: "vmware-hci",
      attribution: { landingPath: "/contact", ctaId: "customer-project", utm: {} },
    }
    const encryptedPayload = await (async () => {
      const { encryptPayload } = await import("@/workers/lead-gateway/src/payload-crypto")
      return encryptPayload(storedPayload, "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "v1")
    })()
    const first = vi.fn().mockResolvedValue({ encrypted_payload: JSON.stringify(encryptedPayload), payload_key_version: "v1" })
    const run = vi.fn().mockResolvedValue({ meta: { changes: 1 } })
    const bind = vi.fn().mockReturnValue({ first, run })
    const prepare = vi.fn().mockReturnValue({ bind })
    const database = { batch: vi.fn(), prepare } satisfies LeadDatabase
    const queue = { send: vi.fn(async () => undefined) }
    const worker = await import("@/workers/lead-gateway/src/index")

    await worker.processLeadQueue({ messages: [{ body: { leadId: "lead-123" }, ack: vi.fn(), retry: vi.fn() }] }, {
      ...environment,
      ENVIRONMENT: "production",
      INQUIRY_INTAKE_ENABLED: "true",
      DB: database,
      LEAD_QUEUE: queue,
      PII_ENCRYPTION_KEY: "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
      SLACK_WEBHOOK_URL: "https://hooks.slack.test",
      TURNSTILE_SECRET_KEY: "test-turnstile",
    })

    const body = String(slackFetch.mock.calls[0]?.[1]?.body ?? "")
    expect(body).toContain("lead-123")
    expect(body).toContain("PII 미포함")
    expect(body).not.toContain("Secret Company")
    expect(body).not.toContain("Secret Person")
    expect(body).not.toContain("secret@example.com")
    expect(body).not.toContain("Do not send this to Slack")
    expect(body).not.toContain("010-1234-5678")
    slackFetch.mockRestore()
  })
})
