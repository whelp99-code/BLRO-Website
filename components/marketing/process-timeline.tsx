import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const STAGES = [
  "업무 영향과 현재 제약을 확인합니다",
  "우선순위 워크로드와 위험을 분류합니다",
  "목표 아키텍처와 제외 범위를 합의합니다",
  "PoC의 통과 기준과 실패 조건을 정합니다",
  "전환 리허설과 운영 인수 조건을 검증합니다",
  "초기 운영 데이터로 설계를 보정합니다",
] as const

export function ProcessTimeline() {
  return (
    <Section aria-labelledby="process-heading" id="process" spacing="generous" tone="navy">
      <Container>
        <div className="home-section-heading home-section-heading--inverse">
          <Eyebrow>HOW WE WORK</Eyebrow>
          <Heading id="process-heading" level={2}>제품보다 먼저, 실패하기 쉬운 조건을 확인합니다.</Heading>
          <Text variant="inverse">전환의 핵심은 새 플랫폼 자체가 아니라 업무 중단, 호환성, 보안 경계, 운영 인수에서 발생하는 리스크를 얼마나 일찍 드러내고 검증하는가입니다.</Text>
        </div>
        <ol className="process-timeline">
          {STAGES.map((stage, index) => (
            <li className="process-timeline__stage" key={stage}>
              <span aria-hidden="true" className="process-timeline__marker">{index + 1}</span>
              <span>{stage}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
