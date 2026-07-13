import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const CAPABILITIES = [
  {
    name: "Enterprise Technology",
    summary: "검증된 엔터프라이즈 기술을 고객 운영환경에 맞게 분석하고 설계합니다.",
    scope: ["인프라", "프라이빗 클라우드", "업무환경", "데이터 보호"],
  },
  {
    name: "Security & Connectivity",
    summary: "사용자·지사·클라우드를 안전하고 일관된 운영 모델로 연결합니다.",
    scope: ["접근제어", "SASE", "SD-WAN", "글로벌 연결"],
  },
  {
    name: "Partner & Market Development",
    summary: "파트너가 직접 영업하고 구축할 수 있는 공동사업 체계를 만듭니다.",
    scope: ["시장 검증", "프리세일즈", "PoC", "파트너 실행"],
  },
  {
    name: "AI & Automation",
    summary: "사람의 승인을 유지하면서 업무 흐름의 속도와 추적성을 높입니다.",
    scope: ["업무 분석", "승인 자동화", "에이전트 오케스트레이션"],
  },
] as const

export function CapabilityIndex() {
  return (
    <Section aria-labelledby="capability-heading" id="capabilities" spacing="generous" tone="surface">
      <Container>
        <div className="home-section-heading">
          <Eyebrow>CAPABILITY INDEX</Eyebrow>
          <Heading id="capability-heading" level={2}>네 가지 사업축</Heading>
          <Text variant="lead">기술 공급에서 멈추지 않고 시장 판단부터 현장 실행까지 하나의 흐름으로 연결합니다.</Text>
        </div>
        <ol className="capability-index">
          {CAPABILITIES.map((capability, index) => (
            <li className="capability-index__item" key={capability.name}>
              <span aria-hidden="true" className="capability-index__number">0{index + 1}</span>
              <div className="capability-index__content">
                <Heading level={3}>{capability.name}</Heading>
                <Text>{capability.summary}</Text>
              </div>
              <Text className="capability-index__scope" variant="small">
                {capability.scope.map((term) => (
                  <span className="capability-index__scope-term" key={term}>{term}</span>
                ))}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
