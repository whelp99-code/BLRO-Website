// 순수 텍스트 포맷 유틸 — 서버 의존성 없음 (클라이언트 컴포넌트에서 사용 가능)

export const PROTECTED_INSIGHT_TITLE_PHRASES = [
  "업무 기준으로",
  "적용 기준",
  "SASE와 SD-WAN의",
] as const

export function formatSolutionCopy(
  value: string,
  protectedPhrases: readonly string[] = [],
): string {
  const normalizedValue = value.replaceAll("-", "\u2011")
  const protectedValue = protectedPhrases.reduce((copy, phrase) => {
    const normalizedPhrase = phrase.replaceAll("-", "\u2011")
    return copy.replaceAll(normalizedPhrase, normalizedPhrase.replaceAll(" ", "\u00a0"))
  }, normalizedValue)

  return protectedValue.replace(/ (?=\S+$)/u, "\u00a0")
}
