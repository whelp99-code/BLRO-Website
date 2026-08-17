import { join } from "node:path"
import { createContentIndex, type ContentRecord } from "@/lib/content"
export { formatSolutionCopy, PROTECTED_INSIGHT_TITLE_PHRASES } from "@/lib/text-format"

export const SOLUTION_SLUGS = [
  "hci-private-cloud",
  "vdi-digital-workspace",
  "backup-disaster-recovery",
  "network-security",
  "sase-global-connectivity",
] as const

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number]

export type SolutionCatalog = {
  readonly insights: readonly ContentRecord[]
  readonly solutions: readonly ContentRecord[]
}

export function isSolutionSlug(value: string): value is SolutionSlug {
  return SOLUTION_SLUGS.some((slug) => slug === value)
}

export async function getSolutionCatalog(now: Date): Promise<SolutionCatalog> {
  const index = await createContentIndex({ contentRoot: join(process.cwd(), "content"), now })
  const publicKoreanRecords = index.publicRecords.filter((record) => record.meta.locale === "ko")
  const services = publicKoreanRecords.filter((record) => record.type === "service")

  return {
    insights: publicKoreanRecords.filter((record) => record.type === "insight"),
    solutions: SOLUTION_SLUGS.flatMap((slug) => {
      const solution = services.find((record) => record.meta.slug === slug)
      return solution ? [solution] : []
    }),
  }
}

export function getRelatedInsights(
  solution: ContentRecord,
  insights: readonly ContentRecord[],
): readonly ContentRecord[] {
  const relatedIds = new Set(
    solution.meta.relatedContent
      .filter((reference) => reference.startsWith("insight:"))
      .map((reference) => reference.slice("insight:".length)),
  )
  return insights.filter((insight) => relatedIds.has(insight.meta.slug))
}
