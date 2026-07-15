import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import type { ContentRecord } from "@/lib/content"
import { formatSolutionCopy, PROTECTED_INSIGHT_TITLE_PHRASES } from "@/lib/solutions"

type SolutionDetailProps = {
  readonly insights: readonly ContentRecord[]
  readonly solution: ContentRecord
}

type SolutionBodySection = {
  readonly heading: string
  readonly items: readonly string[]
  readonly paragraphs: readonly string[]
}

const processSteps = [
  "현황과 운영 조건 분석",
  "판단 기준과 검증 범위 정의",
  "아키텍처·PoC 설계",
  "전환과 운영 인수 기준 정리",
] as const

function parseSolutionSections(body: string): readonly SolutionBodySection[] {
  return body
    .trim()
    .split(/\n(?=## )/u)
    .flatMap((block) => {
      const [headingLine = "", ...contentLines] = block.split("\n")
      const heading = headingLine.replace(/^##\s+/u, "").trim()
      if (heading.length === 0) return []

      const items = contentLines
        .filter((line) => line.startsWith("- "))
        .map((line) => line.slice(2).trim())
      const paragraphs = contentLines
        .filter((line) => !line.startsWith("- "))
        .join("\n")
        .split(/\n{2,}/u)
        .map((paragraph) => paragraph.trim())
        .filter((paragraph) => paragraph.length > 0)

      return [{ heading, items, paragraphs }]
    })
}

export function SolutionDetail({ insights, solution }: SolutionDetailProps) {
  const sections = parseSolutionSections(solution.body)
  const pathname = `/solutions/${solution.meta.slug}`

  return (
    <article className="solution-page solution-detail">
      <Container className="solution-detail__breadcrumb">
        <Breadcrumb pathname={pathname} />
      </Container>

      <Section aria-labelledby="solution-heading" className="solution-detail__hero" spacing="generous">
        <Container>
          <Eyebrow>SOLUTION · {solution.meta.tags.join(" · ").toUpperCase()}</Eyebrow>
          <Heading className="solution-detail__title" id="solution-heading" level={1}>
            {formatSolutionCopy(solution.meta.title)}
          </Heading>
          <Text className="solution-detail__summary" variant="lead">
            {formatSolutionCopy(solution.meta.summary)}
          </Text>
          <div className="solution-detail__audience" aria-label="주요 대상">
            {solution.meta.audience.map((audience) => <span key={audience}>{audience}</span>)}
          </div>
        </Container>
      </Section>

      <Section aria-label="솔루션 상세 검토 범위" className="solution-detail__body" spacing="generous" tone="surface">
        <Container>
          <div className="solution-detail__sections">
            {sections.map((section, index) => (
              <section aria-labelledby={`solution-section-${index}`} className="solution-detail__section" key={section.heading}>
                <span className="solution-detail__section-number">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <Heading id={`solution-section-${index}`} level={2}>{section.heading}</Heading>
                  {section.paragraphs.map((paragraph) => (
                    <Text key={paragraph}>{formatSolutionCopy(paragraph)}</Text>
                  ))}
                  {section.items.length > 0 ? (
                    <ul>
                      {section.items.map((item) => <li key={item}>{formatSolutionCopy(item)}</li>)}
                    </ul>
                  ) : null}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="solution-process-heading" className="solution-detail__process" spacing="generous" tone="alternate">
        <Container>
          <div className="solution-section-heading">
            <div>
              <Eyebrow>VERIFICATION PATH</Eyebrow>
              <Heading id="solution-process-heading" level={2}>검토 절차와 판단 기준</Heading>
            </div>
            <Text>각 단계의 통과 조건과 제외 범위를 먼저 합의하고, 확인된 증거를 다음 실행의 입력으로 사용합니다.</Text>
          </div>
          <ol className="solution-process__list">
            {processSteps.map((step, index) => <li key={step}><span>{index + 1}</span>{step}</li>)}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="related-insight-heading" className="solution-detail__evidence" spacing="generous">
        <Container>
          <Eyebrow>APPROVED EVIDENCE</Eyebrow>
          <Heading id="related-insight-heading" level={2}>관련 실무 인사이트</Heading>
          <Text>공개 승인된 판단 자료만 연결합니다. 프로젝트 사례는 공개 승인 전까지 노출하지 않습니다.</Text>
          <div className="solution-related__list">
            {insights.map((insight) => (
              <Link
                aria-label={`관련 인사이트: ${insight.meta.title}`}
                className="solution-related__link"
                href={`/insights/${insight.meta.slug}`}
                key={insight.meta.contentId}
              >
                <span>{insight.meta.publishedAt}</span>
                <strong>
                  {formatSolutionCopy(insight.meta.title, PROTECTED_INSIGHT_TITLE_PHRASES)}
                </strong>
                <span>{formatSolutionCopy(insight.meta.summary)}</span>
                <span aria-hidden="true">↗</span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="solution-cta-heading" className="solution-next" spacing="generous" tone="navy">
        <Container>
          <Eyebrow>NEXT DECISION</Eyebrow>
          <Heading id="solution-cta-heading" level={2}>현재 조건에서 검증할 첫 단계를 정리합니다.</Heading>
          <Text variant="inverse">제품 제안보다 먼저 환경, 목표, 제약과 필요한 증거를 확인합니다.</Text>
          <div className="solution-next__actions">
            <TrackableLink className="solution-next__link" href="/contact?type=customer-project" properties={{ ctaId: `solution-${solution.meta.slug}-consultation`, placement: "solution-detail" }}>
              전환 진단 범위 확인 <span aria-hidden="true">↗</span>
            </TrackableLink>
            <Link className="solution-next__secondary" href="/solutions">다른 솔루션 보기</Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
