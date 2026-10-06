import Link from "next/link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import type { ContentRecord } from "@/lib/content"
import { formatSolutionCopy } from "@/lib/solutions"

type SolutionIndexProps = {
  readonly solutions: readonly ContentRecord[]
}

const audienceLabels = {
  customer: "기업 고객",
  partner: "국내 파트너",
  vendor: "글로벌 벤더",
} as const

export function SolutionIndex({ solutions }: SolutionIndexProps) {
  return (
    <div className="solution-page">
      <Section aria-labelledby="solutions-heading" className="solution-hero" spacing="generous">
        <Container>
          <Eyebrow>솔루션 · 공개된 범위</Eyebrow>
          <Heading className="solution-hero__title" id="solutions-heading" level={1}>
            운영 조건에서 시작하는 <span className="blro-nowrap">다섯 가지 솔루션</span>
          </Heading>
          <Text className="solution-hero__lead" variant="lead">
            제품 이름보다 현재 환경, 판단 기준과 검증 범위를 먼저 정리합니다. 제조사 이름은 각 본문에만 적고, 로고 벽은 두지 않습니다.
          </Text>
        </Container>
      </Section>

      <Section aria-labelledby="solution-index-heading" className="solution-index" spacing="generous" tone="surface">
        <Container>
          <div className="solution-section-heading">
            <div>
              <Eyebrow>검토 경로</Eyebrow>
              <Heading id="solution-index-heading" level={2}>검토할 영역을 선택하세요.</Heading>
            </div>
            <Text>다섯 영역은 독립적으로 시작할 수 있고, 실제 프로젝트에서는 운영 조건에 따라 함께 설계할 수 있습니다.</Text>
          </div>
          <ol className="solution-index__list">
            {solutions.map((solution, index) => (
              <li key={solution.meta.contentId}>
                <Link className="solution-index__link" href={`/solutions/${solution.meta.slug}`}>
                  <span className="solution-index__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="solution-index__content">
                    <Heading level={3}>{formatSolutionCopy(solution.meta.title)}</Heading>
                    <Text>{formatSolutionCopy(solution.meta.summary)}</Text>
                    <span className="solution-index__audiences">
                      {solution.meta.audience.map((audience) => audienceLabels[audience]).join(" · ")}
                    </span>
                  </span>
                  <span aria-hidden="true" className="solution-index__arrow">↗</span>
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="solution-next-heading" className="solution-next" spacing="generous" tone="navy">
        <Container>
          <Eyebrow>현재 상태에서 시작</Eyebrow>
          <Heading id="solution-next-heading" level={2}>아직 제품을 정하지 않아도 괜찮습니다.</Heading>
          <Text variant="inverse">현재 환경과 목표에서 시작해 필요한 검토 영역과 다음 증거를 정리합니다.</Text>
          <Link className="solution-next__link" href="/solutions/hci">HCI 상세 미리보기 <span aria-hidden="true">↗</span></Link>
          <Text variant="inverse">제품 상세 시안은 HCI 한 페이지입니다. 나머지 상세는 이번 미리보기에서 같은 문장으로 복제하지 않았습니다. 위의 다섯 영역은 이미 공개된 검토 경로입니다.</Text>
          <Link className="solution-next__link" href="/contact?type=customer-project&role=customer">도입·운영 상담하기 <span aria-hidden="true">↗</span></Link>
        </Container>
      </Section>
    </div>
  )
}
