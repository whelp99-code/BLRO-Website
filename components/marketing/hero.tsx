import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ActionLink } from "@/components/ui/link"
import { SignalRoute } from "@/components/visual/signal-route"

const COMPANY_DEFINITION =
  "BLRO는 글로벌 엔터프라이즈 기술을 한국 시장의 실제 사업으로 연결하고, 고객·파트너·벤더가 도입·판매·운영할 수 있는 체계를 만드는 B2B 기술사업 회사다."

const SUPPORTING_COPY =
  "BLRO는 엔터프라이즈 인프라·클라우드·보안 기술의 시장 개발부터 파트너 양성, 기술 프리세일즈, PoC, 구축 지원과 AI 업무 자동화까지 제공합니다."

const ACTIONS = [
  { href: "#customer-path", label: "기술 프로젝트 상담" },
  { href: "#partner-path", label: "파트너 공동사업" },
  { href: "#vendor-path", label: "한국 시장 진출" },
] as const

type HeroProps = {
  readonly heading: string
}

export function Hero({ heading }: HeroProps) {
  return (
    <Section aria-labelledby="home-heading" className="home-hero" spacing="generous" tone="canvas">
      <Container className="home-hero__layout">
        <div className="home-hero__copy">
          <Eyebrow>BLRO · THE KEY TO THE NEXT CLOUD MARKET</Eyebrow>
          <Heading aria-label={heading} id="home-heading" level={1} size="display">
            <span>글로벌 기술을</span>{" "}
            <span className="blro-nowrap">한국 시장의</span>{" "}
            <span className="blro-nowrap">실제 사업으로</span>{" "}
            <span>연결합니다.</span>
          </Heading>
          <Text aria-label={COMPANY_DEFINITION} className="home-hero__definition" variant="lead">
            BLRO는 글로벌 엔터프라이즈 기술을 한국 시장의 실제 사업으로 연결하고,
            고객·파트너·벤더가 <span className="blro-nowrap">도입·판매·운영</span>할 수 있는 체계를
            만드는 B2B 기술사업 회사다.
          </Text>
          <Text className="home-hero__support">{SUPPORTING_COPY}</Text>
          <nav aria-label="홈 주요 문의" className="home-action-row">
            {ACTIONS.map((action, index) => (
              <ActionLink
                className={index === 0 ? "home-action home-action--primary" : "home-action"}
                href={action.href}
                key={action.href}
                variant="standalone"
              >
                {action.label}
                <span aria-hidden="true">↘</span>
              </ActionLink>
            ))}
          </nav>
        </div>
        <SignalRoute
          className="home-hero__route"
          label="시장과 운영 조건을 분석해 설계, 검증, 실행으로 연결하는 BLRO 수행 흐름"
        />
      </Container>
    </Section>
  )
}
