export type InquiryTopic = "vmware-hci" | "vdi" | "security" | "sase" | "dr" | "general"

export type InquiryInput = Readonly<{
  attribution: { ctaId: string; landingPath: string; utm: Record<string, string> }
  company: string
  consent: { marketing: false; privacyVersion: string }
  message?: string
  name: string
  phone?: string
  topic: InquiryTopic
  turnstileToken: string
  workEmail: string
}>

export type HciReadinessLeadInput = Readonly<{
  attribution: { ctaId: string; landingPath: string; utm: Record<string, string> }
  company: string
  consent: { marketing: boolean; privacyVersion: string }
  name: string
  turnstileToken: string
  workEmail: string
}>

function createIdempotencyKey(): string {
  if (typeof globalThis.crypto?.randomUUID === "function") return globalThis.crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
}

export async function submitInquiry(endpoint: string, input: InquiryInput): Promise<void> {
  const response = await fetch(`${endpoint.replace(/\/$/u, "")}/v1/inquiries`, {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": createIdempotencyKey() },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("inquiry_not_accepted")
  await response.json()
}

export async function requestHciReadinessChecklist(
  endpoint: string,
  input: HciReadinessLeadInput,
): Promise<{ readonly downloadUrl: string }> {
  const response = await fetch(`${endpoint.replace(/\/$/u, "")}/v1/lead-magnets/hci-readiness`, {
    method: "POST",
    headers: { "content-type": "application/json", "idempotency-key": createIdempotencyKey() },
    body: JSON.stringify(input),
  })
  if (!response.ok) throw new Error("lead_magnet_not_accepted")
  const result = await response.json() as { downloadUrl?: unknown }
  if (typeof result.downloadUrl !== "string" || !result.downloadUrl.startsWith("https://")) {
    throw new Error("lead_magnet_download_unavailable")
  }
  return { downloadUrl: result.downloadUrl }
}
