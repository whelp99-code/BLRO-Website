export const PRODUCTION_SITE_ORIGIN = "https://blro.co.kr"
export const PRODUCTION_LEAD_API_ORIGIN = "https://api.blro.co.kr"
export const PRODUCTION_TURNSTILE_SITE_KEY = "0x4AAAAAAD1zExguyeYHlmJC"

export function configuredPublicValue(value: string | undefined): string | undefined {
  if (value === undefined) return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

function isUnusableProductionSiteUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol !== "https:" || url.hostname === "localhost" || url.hostname === "127.0.0.1" || url.hostname === "[::1]"
  } catch {
    return false
  }
}

export function resolvePublicSiteUrl(siteUrl: string | undefined, nodeEnv: string | undefined): string {
  const configured = configuredPublicValue(siteUrl)
  const usable = configured !== undefined && (nodeEnv !== "production" || !isUnusableProductionSiteUrl(configured))
    ? configured
    : undefined
  return usable ?? (nodeEnv === "production" ? PRODUCTION_SITE_ORIGIN : "http://localhost:3000")
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
