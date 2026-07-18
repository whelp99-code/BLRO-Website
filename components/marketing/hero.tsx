import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { SignalRoute } from "@/components/visual/signal-route"

const COMPANY_DEFINITION =
  "BLRO는 인프라·보안 전환을 앞둔 기업이 기술 비교를 실제 운영 판단으로 바꿀 수 있도록, 현황 진단부터 검증·전환·안정화까지 연결하는 기술사업 회사다."

const SUPPORTING_COPY =
  "가상화와 HCI, VDI, 데이터 보호, SASE·보안 운영을 검토할 때 제품을 먼저 권하지 않습니다. 업무 영향·보안 경계·전환 위험·운영 역량을 기준으로, 지금 확인할 범위와 다음 결정을 설계합니다."

const DIAGNOSTIC_OUTPUTS = [
  {
    title: "우선 검증할 워크로드와 제외 범위",
    detail: "업무 영향과 허용 중단 시간을 기준으로 현재 판단이 필요한 범위를 구분합니다.",
  },
  {
    title: "운영 조건의 확인 항목",
    detail: "보안 경계, 데이터 보호, 규정과 기존 운영 제약을 함께 확인합니다.",
  },
  {
    title: "다음 검증과 의사결정",
    detail: "PoC, 전환 리허설 또는 추가 진단 중 무엇을 먼저 할지 합의합니다.",
  },
] as const

type HeroProps = {
  readonly heading: string
}

export function Hero({ heading }: HeroProps) {
  return (
    <Section aria-labelledby="home-heading" className="home-hero" spacing="generous" tone="canvas">
      <Container className="home-hero__layout">
        <div className="home-hero__copy">
          <Eyebrow>BLRO · INFRASTRUCTURE DECISIONS THAT OPERATE</Eyebrow>
          <Heading aria-label={heading} id="home-heading" level={1} size="display">
            <span>가상화·보안 전환,</span>{" "}
            <span className="blro-nowrap">무엇부터 검증할지</span>{" "}
            <span>먼저 정리합니다.</span>
          </Heading>
          <Text aria-label={COMPANY_DEFINITION} className="home-hero__definition" variant="lead">
            인프라·보안 전환을 앞둔 기업이 기술 비교를 <span className="blro-nowrap">실제 운영 판단으로</span>{" "}
            <span className="blro-nowrap">바꿀 수 있도록</span>,
            현황 진단부터 검증·전환·안정화까지 연결합니다.
          </Text>
          <nav aria-label="기업 고객 전환 진단" className="home-action-row">
            <TrackableLink
              className="blro-link blro-link--standalone home-action home-action--primary"
              data-testid="hero-primary-cta"
              href="/contact?type=customer-project"
              properties={{ ctaId: "hero-customer-diagnostic", placement: "hero" }}
            >
              전환 진단 범위 확인
              <span aria-hidden="true">↗</span>
            </TrackableLink>
            <TrackableLink
              className="blro-link home-action"
              href="/insights/hci-readiness-checklist"
              properties={{ ctaId: "hero-hci-readiness-checklist", placement: "hero" }}
            >
              HCI 전환 체크리스트 보기
              <span aria-hidden="true">↗</span>
            </TrackableLink>
          </nav>
          <Text className="home-hero__support">{SUPPORTING_COPY}</Text>
          <nav aria-label="파트너와 벤더 문의 경로" className="home-hero__secondary-actions">
            <TrackableLink href="/contact?type=partner-collaboration" properties={{ ctaId: "hero-partner-path", placement: "hero" }}>
              파트너 공동사업을 검토 중이신가요? <span aria-hidden="true">↗</span>
            </TrackableLink>
            <TrackableLink href="/contact?type=vendor-korea-entry" properties={{ ctaId: "hero-vendor-path", placement: "hero" }}>
              한국 시장 진출을 준비 중이신가요? <span aria-hidden="true">↗</span>
            </TrackableLink>
          </nav>
        </div>
        <section aria-labelledby="diagnostic-output-heading" className="home-diagnostic-output">
          <div className="home-diagnostic-output__header">
            <Eyebrow>FIRST CONVERSATION OUTPUT</Eyebrow>
            <Heading id="diagnostic-output-heading" level={2}>첫 상담의 진단 결과물</Heading>
          </div>
          <div className="home-diagnostic-output__route">
            <SignalRoute label="현재 운영 조건에서 다음 검증과 의사결정으로 이어지는 전환 진단 흐름" />
            <div aria-hidden="true" className="home-diagnostic-output__route-labels">
              <span>현재 조건</span>
              <span>판단 기준</span>
              <span>다음 검증</span>
            </div>
          </div>
          <ol>
            {DIAGNOSTIC_OUTPUTS.map((output, index) => (
              <li key={output.title}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <Heading level={3}>{output.title}</Heading>
                  <Text>{output.detail}</Text>
                </div>
              </li>
            ))}
          </ol>
          <Text className="home-diagnostic-output__note" variant="small">제품 추천보다 판단 기준과 검증 범위를 먼저 정리합니다.</Text>
          <TrackableLink
            className="blro-link home-diagnostic-output__sample-link"
            href="/diagnostic-sample"
            properties={{ ctaId: "hero-diagnostic-sample", placement: "hero" }}
          >
            실제 진단 요약 예시 보기 <span aria-hidden="true">↗</span>
          </TrackableLink>
        </section>
      </Container>
    </Section>
  )
}
