const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const

export type Attribution = Readonly<{
  landingPath: string
  utm: Readonly<Partial<Record<(typeof UTM_KEYS)[number], string>>>
}>

function normalizeValue(value: string | null): string | undefined {
  const normalized = value?.trim().replace(/\s+/gu, " ").slice(0, 120)
  return normalized && /^[a-zA-Z0-9 ._\-/]+$/u.test(normalized) ? normalized : undefined
}

export function normalizeLandingPath(value: string): string {
  return value.startsWith("/") && !value.startsWith("//") ? value.slice(0, 240) : "/"
}

export function parseAttribution(location: Pick<Location, "pathname" | "search">): Attribution {
  const params = new URLSearchParams(location.search)
  const utm: Partial<Record<(typeof UTM_KEYS)[number], string>> = {}
  for (const key of UTM_KEYS) {
    const value = normalizeValue(params.get(key))
    if (value !== undefined) utm[key] = value
  }

  return { landingPath: normalizeLandingPath(location.pathname), utm }
}
