import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const STAGES = [
  "현황과 시장 분석",
  "요구사항·사업 가설 정의",
  "아키텍처와 제안 설계",
  "기술검증·PoC",
  "파트너·고객 실행",
  "구축·운영 안정화",
] as const

export function ProcessTimeline() {
  return (
    <Section aria-labelledby="process-heading" id="process" spacing="generous" tone="navy">
      <Container>
        <div className="home-section-heading home-section-heading--inverse">
          <Eyebrow>HOW WE WORK</Eyebrow>
          <Heading id="process-heading" level={2}>판단을 실행 가능한 단계로 바꿉니다.</Heading>
          <Text variant="inverse">제품을 먼저 정하지 않습니다. 현재 조건과 시장 가설을 확인하고 검증 가능한 다음 단계부터 설계합니다.</Text>
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
