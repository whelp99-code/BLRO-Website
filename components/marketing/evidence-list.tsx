import Link from "next/link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import type { ContentRecord } from "@/lib/content"
import { formatSolutionCopy, PROTECTED_INSIGHT_TITLE_PHRASES } from "@/lib/solutions"

type EvidenceListProps = {
  readonly insights: readonly ContentRecord[]
  readonly services: readonly ContentRecord[]
}

export function EvidenceList({ insights, services }: EvidenceListProps) {
  return (
    <Section aria-labelledby="evidence-heading" id="evidence" spacing="generous" tone="alternate">
      <Container>
        <div className="home-section-heading home-section-heading--split">
          <div>
            <Eyebrow>APPROVED EVIDENCE</Eyebrow>
            <Heading id="evidence-heading" level={2}>
              공개된 수행 범위와 <span className="blro-nowrap">판단 기준</span>
            </Heading>
          </div>
          <Text variant="lead">승인되지 않은 고객명·로고·성과 수치 대신 실제 검토 영역과 실무 문서를 공개합니다.</Text>
        </div>
        <div className="evidence-layout">
          <section aria-labelledby="service-evidence-heading" className="evidence-capabilities">
            <Heading id="service-evidence-heading" level={3}>현재 공개된 기술 검토 영역</Heading>
            <ul>
              {services.map((service) => <li key={service.meta.contentId}>{service.meta.title}</li>)}
            </ul>
          </section>
          <section aria-labelledby="insight-evidence-heading" aria-label="공개된 실무 인사이트" className="evidence-insights">
            <Heading id="insight-evidence-heading" level={3}>공개된 실무 인사이트</Heading>
            <div className="evidence-insights__list">
              {insights.map((insight) => (
                <article className="evidence-insight" id={`insight-${insight.meta.slug}`} key={insight.meta.contentId}>
                  <Text className="evidence-insight__date" variant="small">{insight.meta.publishedAt}</Text>
                  <Heading level={3}><Link href={`/insights/${insight.meta.slug}`}>{formatSolutionCopy(insight.meta.title, PROTECTED_INSIGHT_TITLE_PHRASES)}</Link></Heading>
                  <Text>{formatSolutionCopy(insight.meta.summary)}</Text>
                </article>
              ))}
            </div>
          </section>
        </div>
      </Container>
    </Section>
  )
}
