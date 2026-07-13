import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const PATHS = [
  {
    id: "customer-path",
    label: "기업 고객",
    situation: "인프라 전환, DR, 보안, 글로벌 연결, AI 자동화를 검토하고 있습니다.",
    promise: (
      <>
        현재 환경을 분석하고 <span className="blro-nowrap">설계·PoC·구축·안정화까지</span> 필요한 검증 범위를 정리합니다.
      </>
    ),
    action: "기술 프로젝트 상담",
  },
  {
    id: "partner-path",
    label: "국내 파트너",
    situation: (
      <>
        새 솔루션과 <span className="blro-nowrap">프리세일즈·구축 역량을</span>{" "}
        <span className="blro-nowrap">확보해야 합니다.</span>
      </>
    ),
    promise: "공동영업과 기술 수행체계를 함께 만들고 독립 실행에 필요한 문서와 절차를 남깁니다.",
    action: "파트너 공동사업",
  },
  {
    id: "vendor-path",
    label: "글로벌 벤더",
    situation: "한국 시장에서 고객과 파트너, 현지 기술지원 가설을 검증해야 합니다.",
    promise: "시장 검증부터 파트너·고객 개발과 현지 실행 범위까지 연결합니다.",
    action: "한국 시장 진출",
  },
] as const

export function AudiencePaths() {
  return (
    <Section aria-labelledby="audience-heading" id="audiences" spacing="generous" tone="canvas">
      <Container>
        <div className="home-section-heading home-section-heading--split">
          <div>
            <Eyebrow>ONE SYSTEM · THREE JOURNEYS</Eyebrow>
            <Heading id="audience-heading" level={2}>세 가지 시작점</Heading>
          </div>
          <Text variant="lead">역할이 달라도 첫 질문은 같습니다. 지금의 조건과 다음 실행을 어떻게 연결할 것인가.</Text>
        </div>
        <div className="audience-paths">
          {PATHS.map((path, index) => (
            <article className="audience-path" id={path.id} key={path.id} tabIndex={-1}>
              <div className="audience-path__meta">
                <span aria-hidden="true">0{index + 1}</span>
                <span>{path.action}</span>
              </div>
              <Heading level={3}>{path.label}</Heading>
              <Text className="audience-path__situation" variant="lead">{path.situation}</Text>
              <Text>{path.promise}</Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
