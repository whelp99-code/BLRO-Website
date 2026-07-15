import type { Metadata } from "next"
import { InsightIndex } from "@/components/insights/insight-index"
import { getPublicContent } from "@/lib/content"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "실무 인사이트",
  description: "인프라·보안 전환에서 확인해야 할 조건, 판단 질문과 검증 방식을 정리한 BLRO 공개 실무 인사이트입니다.",
  ...canonicalMetadata("/insights"),
}

export default async function InsightsPage() {
  return <InsightIndex insights={await getPublicContent("insight", "ko", new Date())} />
}
