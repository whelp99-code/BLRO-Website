import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { ActionLink } from "@/components/ui/link"

const CONVERSIONS = [
  { href: "#customer-path", label: "기술 프로젝트 상담", note: "환경과 목표에서 검토 범위를 정리합니다." },
  { href: "#partner-path", label: "파트너 공동사업", note: "고객과 역량에 맞는 협업 방식을 논의합니다." },
  { href: "#vendor-path", label: "한국 시장 진출", note: "시장 가설과 현지 실행 범위를 검토합니다." },
] as const

export function ConversionPanel() {
  return (
    <Section aria-labelledby="conversion-heading" id="start" spacing="generous" tone="navy">
      <Container>
        <div className="conversion-panel">
          <div className="conversion-panel__intro">
            <Eyebrow>START FROM THE CURRENT STATE</Eyebrow>
            <Heading id="conversion-heading" level={2}>
              제품이나 과제가 아직 <span className="blro-nowrap">명확하지 않아도</span> 괜찮습니다.
            </Heading>
            <Text variant="inverse">현재 환경과 목표에서 시작해 검토 범위를 함께 정리합니다.</Text>
          </div>
          <nav aria-label="대상별 시작점" className="conversion-panel__actions">
            {CONVERSIONS.map((conversion) => (
              <ActionLink className="conversion-action" href={conversion.href} key={conversion.href} variant="standalone">
                <span>
                  <strong>{conversion.label}</strong>
                  <small>{conversion.note}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </ActionLink>
            ))}
          </nav>
        </div>
      </Container>
    </Section>
  )
}
