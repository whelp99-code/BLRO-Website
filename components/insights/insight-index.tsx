"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { INSIGHT_CATEGORIES, isInCategory, type InsightCategory } from "@/lib/insight-categories"
import { formatSolutionCopy, PROTECTED_INSIGHT_TITLE_PHRASES } from "@/lib/text-format"

export type InsightIndexItem = {
  readonly meta: {
    readonly contentId: string
    readonly title: string
    readonly summary: string
    readonly slug: string
    readonly publishedAt: string
    readonly tags: readonly string[]
  }
}

export type InsightIndexProps = {
  readonly insights: readonly InsightIndexItem[]
}

export function InsightIndex({ insights }: InsightIndexProps) {
  const [activeCategory, setActiveCategory] = useState<InsightCategory>("전체")

  const filtered = useMemo(
    () => insights.filter((insight) => isInCategory(insight.meta.tags, activeCategory)),
    [insights, activeCategory],
  )

  return (
    <article className="insight-page insight-index">
      <Section aria-labelledby="insight-heading" className="insight-hero" spacing="generous">
        <Container>
          <Eyebrow>APPROVED PRACTICAL INSIGHTS</Eyebrow>
          <Heading className="insight-hero__title" id="insight-heading" level={1}>결정을 앞당기는 실무 판단 자료</Heading>
          <Text className="insight-hero__lead" variant="lead">
            제품 소개보다 먼저, 전환과 운영에서 확인해야 할 조건·질문·검증 방식을 공개합니다. 승인된 자료만 제공합니다.
          </Text>
        </Container>
      </Section>
      <Section aria-label="공개된 실무 인사이트 목록" spacing="generous" tone="surface">
        <Container>
          <div className="insight-index__filters" role="group" aria-label="주제별 필터">
            {INSIGHT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                className={`insight-index__filter${activeCategory === category ? " insight-index__filter--active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <p className="insight-index__empty">선택한 주제의 공개 자료가 아직 없습니다. 다른 주제를 선택해 주세요.</p>
          ) : (
            <ol className="insight-index__list">
              {filtered.map((insight, index) => (
                <li key={insight.meta.contentId}>
                  <Link aria-label={`실무 인사이트: ${insight.meta.title}`} className="insight-index__link" href={`/insights/${insight.meta.slug}`}>
                    <span className="insight-index__number">{String(index + 1).padStart(2, "0")}</span>
                    <span className="insight-index__content">
                      <span className="insight-index__meta">{insight.meta.publishedAt} · {insight.meta.tags.join(" · ")}</span>
                      <Heading level={2}>{formatSolutionCopy(insight.meta.title, PROTECTED_INSIGHT_TITLE_PHRASES)}</Heading>
                      <Text>{formatSolutionCopy(insight.meta.summary)}</Text>
                    </span>
                    <span aria-hidden="true" className="insight-index__arrow">↗</span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </Container>
      </Section>
    </article>
  )
}
