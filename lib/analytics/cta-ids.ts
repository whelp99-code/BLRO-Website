export const ANALYTICS_CTA_IDS = [
  "audience-1",
  "audience-2",
  "audience-3",
  "contact-customer-project",
  "contact-general",
  "contact-partner-collaboration",
  "contact-vendor-korea-entry",
  "conversion-customer-project",
  "conversion-partner-collaboration",
  "conversion-vendor-korea-entry",
  "diagnostic-sample-consult",
  "hero-customer-diagnostic",
  "hero-diagnostic-sample",
  "hero-hci-readiness-checklist",
  "hero-partner-path",
  "hero-vendor-path",
  "insight-acm-acme-hybrid-tls-automation-consultation",
  "insight-bedrock-automated-reasoning-policy-operations-consultation",
  "insight-globalprotect-auth-override-response-consultation",
  "insight-hci-readiness-checklist-consultation",
  "insight-hci-readiness-download",
  "insight-hyper-v-gpu-partitioning-readiness-consultation",
  "insight-infrastructure-consulting-baseline-consultation",
  "insight-recovery-objectives-guide-consultation",
  "insight-sase-sdwan-roles-consultation",
  "insight-secure-access-selection-consultation",
  "insight-security-consulting-baseline-consultation",
  "insight-vdi-capacity-planning-consultation",
  "insight-virtualization-hci-migration-guide-consultation",
  "insight-vmware-nutanix-evaluation-matrix-consultation",
  "solution-backup-disaster-recovery-consultation",
  "solution-hci-private-cloud-consultation",
  "solution-network-security-consultation",
  "solution-sase-global-connectivity-consultation",
  "solution-vdi-digital-workspace-consultation",
  "strategic-customer-project",
  "strategic-partner-collaboration",
  "strategic-vendor-korea-entry",
] as const

export type AnalyticsCtaId = (typeof ANALYTICS_CTA_IDS)[number]

const ANALYTICS_CTA_ID_SET: ReadonlySet<string> = new Set(ANALYTICS_CTA_IDS)

export function isAnalyticsCtaId(value: unknown): value is AnalyticsCtaId {
  return typeof value === "string" && ANALYTICS_CTA_ID_SET.has(value)
}
