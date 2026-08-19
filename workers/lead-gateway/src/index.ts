import { parseAnalyticsEvent } from "./analytics-schema"
import { parseInquiry } from "./inquiry-schema"
import { parseHciReadinessRequest } from "./lead-magnet-schema"
import { decryptPayload, encryptPayload, type EncryptedPayload } from "./payload-crypto"

type LeadDatabaseResult = Readonly<{ meta: Readonly<{ changes?: number }> }>

type LeadDatabaseBoundStatement = Readonly<{
  first<T>(): Promise<T | null>
  run(): Promise<LeadDatabaseResult>
}>

type LeadDatabaseStatement = Readonly<{
  bind(...values: unknown[]): LeadDatabaseBoundStatement
}>

export type LeadDatabase = Readonly<{
  batch(statements: readonly LeadDatabaseBoundStatement[]): Promise<readonly LeadDatabaseResult[]>
  prepare(query: string): LeadDatabaseStatement
}>

export type AnalyticsRateLimiter = Readonly<{
  limit(input: Readonly<{ key: string }>): Promise<Readonly<{ success: boolean }>>
}>

export type LeadGatewayEnvironment = {
  readonly ALLOWED_ORIGINS: string
  readonly ANALYTICS_GLOBAL_RATE_LIMITER?: AnalyticsRateLimiter
  readonly ANALYTICS_RATE_LIMITER?: AnalyticsRateLimiter
  readonly DB?: LeadDatabase
  readonly ENVIRONMENT: "preview" | "production"
  readonly INQUIRY_INTAKE_ENABLED: "true" | "false"
  readonly LEAD_MAGNET_DOWNLOAD_SECRET?: string
  readonly LEAD_MAGNETS?: R2Bucket
  readonly LEAD_QUEUE?: LeadQueueProducer
  readonly PII_ENCRYPTION_KEY?: string
  readonly SLACK_WEBHOOK_URL?: string
  readonly TURNSTILE_SECRET_KEY?: string
}

type LeadQueueMessage = Readonly<{ leadId: string }>

export type LeadQueueProducer = Readonly<{
  send(message: LeadQueueMessage): Promise<void>
}>

export type LeadQueueBatch = Readonly<{
  messages: readonly Readonly<{
    ack(): void
    body: LeadQueueMessage
    retry(): void
  }>[]
}>

type StoredLead = Readonly<{
  encrypted_payload: string
  payload_key_version: string
}>

type IntakeBindings = Readonly<{
  DB: LeadDatabase
  LEAD_QUEUE: LeadQueueProducer
  PII_ENCRYPTION_KEY: string
  SLACK_WEBHOOK_URL: string
  TURNSTILE_SECRET_KEY: string
}>

type LeadMagnetBindings = IntakeBindings & Readonly<{
  LEAD_MAGNET_DOWNLOAD_SECRET: string
  LEAD_MAGNETS: R2Bucket
}>

const MAX_BODY_BYTES = 16 * 1024
const RETENTION_DAYS = 90
const DOWNLOAD_WINDOW_SECONDS = 15 * 60
const HCI_READINESS_OBJECT_KEY = "hci-readiness-checklist.pdf"
const NO_STORE_HEADERS = { "cache-control": "no-store", "content-type": "application/json; charset=utf-8" }

function response(status: number, body: Record<string, string>, origin?: string): Response {
  const headers = origin === undefined ? NO_STORE_HEADERS : { ...NO_STORE_HEADERS, "access-control-allow-origin": origin, vary: "Origin" }
  return new Response(JSON.stringify(body), { status, headers })
}

function allowedOrigins(value: string): ReadonlySet<string> {
  return new Set(value.split(",").map((origin) => origin.trim()).filter(Boolean))
}

function hasJsonContentType(request: Request): boolean {
  return request.headers.get("content-type")?.toLowerCase().startsWith("application/json") ?? false
}

function hasAnalyticsContentType(request: Request): boolean {
  const value = request.headers.get("content-type")?.toLowerCase()
  return value?.startsWith("application/json") === true || value?.startsWith("text/plain") === true
}

async function readTextWithinLimit(request: Request): Promise<string | undefined> {
  const length = Number(request.headers.get("content-length"))
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) return undefined
  if (request.body === null) return ""

  const reader = request.body.getReader()
  const decoder = new TextDecoder()
  let received = 0
  let text = ""
  try {
    while (true) {
      const chunk = await reader.read()
      if (chunk.done) return text + decoder.decode()
      received += chunk.value.byteLength
      if (received > MAX_BODY_BYTES) {
        await reader.cancel()
        return undefined
      }
      text += decoder.decode(chunk.value, { stream: true })
    }
  } finally {
    reader.releaseLock()
  }
}

function allowedOrigin(request: Request, env: LeadGatewayEnvironment): string | undefined {
  const origin = request.headers.get("origin")
  return origin !== null && allowedOrigins(env.ALLOWED_ORIGINS).has(origin) ? origin : undefined
}

function intakeBindings(env: LeadGatewayEnvironment): IntakeBindings | undefined {
  if (
    env.DB === undefined ||
    env.LEAD_QUEUE === undefined ||
    env.PII_ENCRYPTION_KEY === undefined ||
    env.SLACK_WEBHOOK_URL === undefined ||
    env.TURNSTILE_SECRET_KEY === undefined
  ) return undefined
  return {
    DB: env.DB,
    LEAD_QUEUE: env.LEAD_QUEUE,
    PII_ENCRYPTION_KEY: env.PII_ENCRYPTION_KEY,
    SLACK_WEBHOOK_URL: env.SLACK_WEBHOOK_URL,
    TURNSTILE_SECRET_KEY: env.TURNSTILE_SECRET_KEY,
  }
}

function leadMagnetBindings(env: LeadGatewayEnvironment): LeadMagnetBindings | undefined {
  const intake = intakeBindings(env)
  if (intake === undefined || env.LEAD_MAGNET_DOWNLOAD_SECRET === undefined || env.LEAD_MAGNETS === undefined) return undefined
  return { ...intake, LEAD_MAGNET_DOWNLOAD_SECRET: env.LEAD_MAGNET_DOWNLOAD_SECRET, LEAD_MAGNETS: env.LEAD_MAGNETS }
}

function isoAfterDays(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
}

async function sha256(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value))
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"])
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value))
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("")
}

function hciDownloadMessage(leadId: string, expiresAt: number): string {
  return `hci-readiness:${leadId}:${expiresAt}`
}

async function verifyTurnstile(token: string, request: Request, bindings: IntakeBindings): Promise<boolean> {
  const form = new URLSearchParams({ response: token, secret: bindings.TURNSTILE_SECRET_KEY })
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: form,
  })
  if (!response.ok) return false
  const result = await response.json() as { success?: unknown; hostname?: unknown; ["error-codes"]?: unknown }
  const requestOrigin = request.headers.get("origin")
  if (requestOrigin === null) return false
  const hostname = new URL(requestOrigin).hostname
  const verified = result.success === true && result.hostname === hostname
  if (!verified) {
    console.warn("turnstile_verification_failed", {
      expectedHostname: hostname,
      returnedHostname: typeof result.hostname === "string" ? result.hostname : undefined,
      errorCodes: Array.isArray(result["error-codes"]) ? result["error-codes"] : undefined,
    })
  }
  return verified
}

function leadMessage(leadId: string, payload: Record<string, unknown>): Record<string, unknown> {
  const attribution = typeof payload["attribution"] === "object" && payload["attribution"] !== null
    ? payload["attribution"] as Record<string, unknown>
    : {}
  const leadType = payload["leadType"] === "hci-readiness" ? "hci-readiness" : "inquiry"
  const lines = [
    "새 BLRO 리드 알림 (PII 미포함)",
    `접수 ID: ${leadId}`,
    `유형: ${leadType}`,
    `주제: ${String(payload["topic"] ?? "general")}`,
    `랜딩: ${String(attribution["landingPath"] ?? "미상")}`,
    `CTA: ${String(attribution["ctaId"] ?? "미상")}`,
    "상세 개인정보와 문의 본문은 Slack으로 전송하지 않음",
  ]
  return { text: lines.join("\n") }
}

async function handleHciReadinessRequest(
  request: Request,
  origin: string,
  env: LeadGatewayEnvironment,
): Promise<Response> {
  if (!hasJsonContentType(request)) return response(415, { error: "json_required" }, origin)
  const text = await readTextWithinLimit(request)
  if (text === undefined) return response(413, { error: "payload_too_large" }, origin)

  let payload: unknown
  try {
    payload = JSON.parse(text)
  } catch {
    return response(400, { error: "invalid_json" }, origin)
  }
  const leadMagnet = parseHciReadinessRequest(payload)
  if (leadMagnet === undefined || leadMagnet.website !== undefined) return response(400, { error: "invalid_lead_magnet_request" }, origin)
  if (env.INQUIRY_INTAKE_ENABLED !== "true") return response(503, { error: "intake_not_enabled" }, origin)
  const bindings = leadMagnetBindings(env)
  if (bindings === undefined) return response(503, { error: "lead_magnet_not_configured" }, origin)
  if (!await verifyTurnstile(leadMagnet.turnstileToken, request, bindings)) return response(400, { error: "verification_failed" }, origin)

  const idempotencyKey = request.headers.get("idempotency-key")
  if (idempotencyKey === null || idempotencyKey.length < 16 || idempotencyKey.length > 200) {
    return response(400, { error: "idempotency_key_required" }, origin)
  }

  const leadId = crypto.randomUUID()
  const encrypted = await encryptPayload({
    leadType: "hci-readiness",
    company: leadMagnet.company,
    name: leadMagnet.name,
    workEmail: leadMagnet.workEmail,
    marketingConsent: leadMagnet.consent.marketing,
    attribution: leadMagnet.attribution,
  }, bindings.PII_ENCRYPTION_KEY, "v1")
  const inserted = await bindings.DB.prepare(
    "INSERT OR IGNORE INTO leads (lead_id, created_at, consent_version, topic, source, status, encrypted_payload, payload_key_version, delivery_state, expires_at, idempotency_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(
    leadId,
    new Date().toISOString(),
    leadMagnet.consent.privacyVersion,
    "hci-readiness",
    leadMagnet.attribution.landingPath,
    "accepted",
    JSON.stringify(encrypted),
    encrypted.keyVersion,
    "queued",
    isoAfterDays(RETENTION_DAYS),
    await sha256(idempotencyKey),
  ).run()
  if ((inserted.meta.changes ?? 0) === 0) return response(202, { status: "already_accepted" }, origin)

  try {
    await bindings.LEAD_QUEUE.send({ leadId })
  } catch {
    await bindings.DB.prepare("DELETE FROM leads WHERE lead_id = ?").bind(leadId).run()
    return response(503, { error: "delivery_unavailable" }, origin)
  }

  const expiresAt = Math.floor(Date.now() / 1000) + DOWNLOAD_WINDOW_SECONDS
  const signature = await hmac(hciDownloadMessage(leadId, expiresAt), bindings.LEAD_MAGNET_DOWNLOAD_SECRET)
  const downloadUrl = new URL("/v1/lead-magnets/hci-readiness/download", request.url)
  downloadUrl.searchParams.set("lead", leadId)
  downloadUrl.searchParams.set("expires", String(expiresAt))
  downloadUrl.searchParams.set("signature", signature)
  return new Response(JSON.stringify({ status: "accepted", downloadUrl: downloadUrl.toString() }), { status: 202, headers: { ...NO_STORE_HEADERS, "access-control-allow-origin": origin, vary: "Origin" } })
}

async function handleAnalyticsEvent(request: Request, origin: string, env: LeadGatewayEnvironment): Promise<Response> {
  if (!hasAnalyticsContentType(request)) return response(415, { error: "analytics_content_type_required" }, origin)
  if (env.DB === undefined || env.ANALYTICS_RATE_LIMITER === undefined || env.ANALYTICS_GLOBAL_RATE_LIMITER === undefined) {
    return response(503, { error: "analytics_not_configured" }, origin)
  }
  const clientAddress = request.headers.get("cf-connecting-ip") ?? "address-unavailable"
  const clientKey = await sha256(`analytics:${clientAddress}`)
  const [clientLimit, globalLimit] = await Promise.all([
    env.ANALYTICS_RATE_LIMITER.limit({ key: clientKey }),
    env.ANALYTICS_GLOBAL_RATE_LIMITER.limit({ key: "analytics" }),
  ])
  if (!clientLimit.success || !globalLimit.success) return response(429, { error: "analytics_rate_limited" }, origin)
  const text = await readTextWithinLimit(request)
  if (text === undefined) return response(413, { error: "payload_too_large" }, origin)

  let payload: unknown
  try {
    payload = JSON.parse(text)
  } catch {
    return response(400, { error: "invalid_json" }, origin)
  }
  const event = parseAnalyticsEvent(payload)
  if (event === undefined) return response(400, { error: "invalid_analytics_event" }, origin)
  const now = new Date().toISOString()
  await env.DB.prepare(
    "INSERT OR IGNORE INTO analytics_events (event_id, received_at, event_name, cta_id, placement, landing_path, topic, field, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(
    event.eventId,
    now,
    event.name,
    event.properties.ctaId ?? null,
    event.properties.placement ?? null,
    event.properties.landingPath ?? null,
    event.properties.topic ?? null,
    event.properties.field ?? null,
    isoAfterDays(RETENTION_DAYS),
  ).run()
  return response(202, { status: "accepted" }, origin)
}

async function handleHciReadinessDownload(request: Request, env: LeadGatewayEnvironment): Promise<Response> {
  const bindings = leadMagnetBindings(env)
  if (bindings === undefined) return response(503, { error: "lead_magnet_not_configured" })
  const url = new URL(request.url)
  const leadId = url.searchParams.get("lead")
  const expiresAt = Number(url.searchParams.get("expires"))
  const signature = url.searchParams.get("signature")
  if (leadId === null || !Number.isInteger(expiresAt) || signature === null || expiresAt < Math.floor(Date.now() / 1000)) {
    return response(403, { error: "download_link_invalid" })
  }
  const expected = await hmac(hciDownloadMessage(leadId, expiresAt), bindings.LEAD_MAGNET_DOWNLOAD_SECRET)
  if (signature !== expected) return response(403, { error: "download_link_invalid" })
  const object = await bindings.LEAD_MAGNETS.get(HCI_READINESS_OBJECT_KEY)
  if (object === null) return response(503, { error: "lead_magnet_unavailable" })
  const headers = new Headers({
    "cache-control": "private, no-store",
    "content-disposition": 'attachment; filename="BLRO-HCI-readiness-checklist.pdf"',
    "content-type": object.httpMetadata?.contentType ?? "application/pdf",
  })
  object.writeHttpMetadata(headers)
  return new Response(object.body, { headers })
}

async function deliverToSlack(leadId: string, stored: StoredLead, bindings: IntakeBindings): Promise<void> {
  const encrypted = JSON.parse(stored.encrypted_payload) as EncryptedPayload
  const payload = await decryptPayload(encrypted, bindings.PII_ENCRYPTION_KEY) as Record<string, unknown>
  const response = await fetch(bindings.SLACK_WEBHOOK_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(leadMessage(leadId, payload)),
  })
  if (!response.ok) throw new Error("slack_delivery_failed")
}

export async function handleRequest(request: Request, env: LeadGatewayEnvironment): Promise<Response> {
  const origin = allowedOrigin(request, env)
  if (request.method === "OPTIONS") {
    if (origin === undefined) return response(403, { error: "origin_not_allowed" })
    return new Response(null, {
      status: 204,
      headers: {
        "access-control-allow-headers": "content-type, idempotency-key",
        "access-control-allow-methods": "POST, OPTIONS",
        "access-control-allow-origin": origin,
        "cache-control": "no-store",
        vary: "Origin",
      },
    })
  }
  const path = new URL(request.url).pathname
  if (request.method === "GET" && path === "/v1/lead-magnets/hci-readiness/download") {
    return handleHciReadinessDownload(request, env)
  }
  if (request.method !== "POST" || (path !== "/v1/inquiries" && path !== "/v1/lead-magnets/hci-readiness")) {
    if (request.method === "POST" && path === "/v1/analytics") {
      if (origin === undefined) return response(403, { error: "origin_not_allowed" })
      return handleAnalyticsEvent(request, origin, env)
    }
    return response(404, { error: "not_found" })
  }
  if (origin === undefined) return response(403, { error: "origin_not_allowed" })
  if (path === "/v1/lead-magnets/hci-readiness") return handleHciReadinessRequest(request, origin, env)
  if (!hasJsonContentType(request)) return response(415, { error: "json_required" }, origin)

  const text = await readTextWithinLimit(request)
  if (text === undefined) return response(413, { error: "payload_too_large" }, origin)

  let payload: unknown
  try {
    payload = JSON.parse(text)
  } catch {
    return response(400, { error: "invalid_json" }, origin)
  }
  const inquiry = parseInquiry(payload)
  if (inquiry === undefined || inquiry.website !== undefined) return response(400, { error: "invalid_inquiry" }, origin)

  if (env.INQUIRY_INTAKE_ENABLED !== "true") return response(503, { error: "intake_not_enabled" }, origin)
  const bindings = intakeBindings(env)
  if (bindings === undefined) return response(503, { error: "intake_not_configured" }, origin)
  if (!await verifyTurnstile(inquiry.turnstileToken, request, bindings)) return response(400, { error: "verification_failed" }, origin)

  const idempotencyKey = request.headers.get("idempotency-key")
  if (idempotencyKey === null || idempotencyKey.length < 16 || idempotencyKey.length > 200) {
    return response(400, { error: "idempotency_key_required" }, origin)
  }

  const leadId = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  const encrypted = await encryptPayload({
    company: inquiry.company,
    name: inquiry.name,
    workEmail: inquiry.workEmail,
    ...(inquiry.phone === undefined ? {} : { phone: inquiry.phone }),
    ...(inquiry.message === undefined ? {} : { message: inquiry.message }),
    topic: inquiry.topic,
    attribution: inquiry.attribution,
  }, bindings.PII_ENCRYPTION_KEY, "v1")
  const inserted = await bindings.DB.prepare(
    "INSERT OR IGNORE INTO leads (lead_id, created_at, consent_version, topic, source, status, encrypted_payload, payload_key_version, delivery_state, expires_at, idempotency_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
  ).bind(
    leadId,
    createdAt,
    inquiry.consent.privacyVersion,
    inquiry.topic,
    inquiry.attribution.landingPath,
    "accepted",
    JSON.stringify(encrypted),
    encrypted.keyVersion,
    "queued",
    isoAfterDays(RETENTION_DAYS),
    await sha256(idempotencyKey),
  ).run()

  if ((inserted.meta.changes ?? 0) === 0) return response(202, { status: "already_accepted" }, origin)
  try {
    await bindings.LEAD_QUEUE.send({ leadId })
  } catch {
    await bindings.DB.prepare("DELETE FROM leads WHERE lead_id = ?").bind(leadId).run()
    return response(503, { error: "delivery_unavailable" }, origin)
  }
  return response(202, { status: "accepted" }, origin)
}

export async function processLeadQueue(batch: LeadQueueBatch, env: LeadGatewayEnvironment): Promise<void> {
  const bindings = intakeBindings(env)
  if (bindings === undefined) {
    for (const message of batch.messages) message.retry()
    return
  }
  for (const message of batch.messages) {
    try {
      const stored = await bindings.DB.prepare(
        "SELECT encrypted_payload, payload_key_version FROM leads WHERE lead_id = ? AND expires_at > ?",
      ).bind(message.body.leadId, new Date().toISOString()).first<StoredLead>()
      if (stored === null) {
        message.ack()
        continue
      }
      await deliverToSlack(message.body.leadId, stored, bindings)
      await bindings.DB.prepare("UPDATE leads SET delivery_state = ? WHERE lead_id = ?").bind("delivered", message.body.leadId).run()
      message.ack()
    } catch {
      message.retry()
    }
  }
}

export default {
  fetch(request, env: LeadGatewayEnvironment) {
    return handleRequest(request, env)
  },
  queue(batch: MessageBatch<LeadQueueMessage>, env: LeadGatewayEnvironment) {
    return processLeadQueue(batch, env)
  },
  async scheduled(_, env) {
    if (env.DB !== undefined) {
      const now = new Date().toISOString()
      await env.DB.batch([
        env.DB.prepare("DELETE FROM leads WHERE expires_at <= ?").bind(now),
        env.DB.prepare("DELETE FROM analytics_events WHERE expires_at <= ?").bind(now),
      ])
    }
  },
} satisfies ExportedHandler<LeadGatewayEnvironment, LeadQueueMessage>
