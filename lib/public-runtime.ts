export const PRODUCTION_SITE_ORIGIN = "https://blro.co.kr"
export const PRODUCTION_LEAD_API_ORIGIN = "https://api.blro.co.kr"
export const PRODUCTION_TURNSTILE_SITE_KEY = "0x4AAAAAAD1zExguyeYHlmJC"

export function configuredPublicValue(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

export function resolvePublicSiteUrl(siteUrl: string | undefined, nodeEnv: string | undefined): string {
  return configuredPublicValue(siteUrl) ?? (nodeEnv === "production" ? PRODUCTION_SITE_ORIGIN : "http://localhost:3000")
}

export function resolveLeadApiUrl(leadApiUrl: string | undefined, nodeEnv: string | undefined): string | undefined {
  return configuredPublicValue(leadApiUrl) ?? (nodeEnv === "production" ? PRODUCTION_LEAD_API_ORIGIN : undefined)
}

export function resolveTurnstileSiteKey(siteKey: string | undefined, nodeEnv: string | undefined): string | undefined {
  return configuredPublicValue(siteKey) ?? (nodeEnv === "production" ? PRODUCTION_TURNSTILE_SITE_KEY : undefined)
}

export function isSecureIntakeConfigured(
  leadApiUrl: string | undefined,
  siteKey: string | undefined,
  nodeEnv: string | undefined,
): boolean {
  return resolveLeadApiUrl(leadApiUrl, nodeEnv) !== undefined && resolveTurnstileSiteKey(siteKey, nodeEnv) !== undefined
}
