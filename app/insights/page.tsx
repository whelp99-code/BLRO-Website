import type { Metadata } from "next"
import { InsightIndex, type InsightIndexItem } from "@/components/insights/insight-index"
import { getPublicContent } from "@/lib/content"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "실무 인사이트",
  description: "인프라·보안 전환에서 확인해야 할 조건, 판단 질문과 검증 방식을 정리한 BLRO 공개 실무 인사이트입니다.",
  ...canonicalMetadata("/insights"),
}

export default async function InsightsPage() {
  const insights = (await getPublicContent("insight", "ko", new Date())).map((insight) => ({
    meta: {
      contentId: insight.meta.contentId,
      title: insight.meta.title,
      summary: insight.meta.summary,
      slug: insight.meta.slug,
      publishedAt: insight.meta.publishedAt ?? "",
      tags: insight.meta.tags,
    },
  })) satisfies readonly InsightIndexItem[]

  return <InsightIndex insights={insights} />
}
