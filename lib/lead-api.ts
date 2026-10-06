import { createClientUuid } from "@/lib/client-id"

export type InquiryTopic = "vmware-hci" | "vdi" | "security" | "sase" | "dr" | "customer-project" | "partner-collaboration" | "vendor-korea-entry" | "general"

export type InquiryInput = Readonly<{
  attribution: { ctaId: string; landingPath: string; utm: Record<string, string> }
  company: string
  consent: { marketing: false; privacyVersion: string }
  message?: string
  name: string
  phone?: string
  product?: "hci"
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
  return createClientUuid()
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
