import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const CONVERSIONS = [
  { ctaId: "conversion-customer-project", href: "/contact?type=customer-project", label: "전환 진단 상담", note: "우선순위 워크로드와 검증 범위를 함께 정리합니다." },
  { ctaId: "conversion-partner-collaboration", href: "/contact?type=partner-collaboration", label: "파트너 공동 수행", note: "제안부터 구축까지 역할과 실행 기준을 논의합니다." },
  { ctaId: "conversion-vendor-korea-entry", href: "/contact?type=vendor-korea-entry", label: "한국 시장 실행", note: "고객 검증과 현지 기술 수행 체계를 설계합니다." },
] as const

export function ConversionPanel() {
  return (
    <Section aria-labelledby="conversion-heading" id="start" spacing="generous" tone="navy">
      <Container>
        <div className="conversion-panel">
          <div className="conversion-panel__intro">
            <Eyebrow>START FROM THE CURRENT STATE</Eyebrow>
            <Heading id="conversion-heading" level={2}>
              무엇부터 바꿔야 할지 <span className="blro-nowrap">명확하지 않아도</span> 괜찮습니다.
            </Heading>
            <Text variant="inverse">현재 환경, 업무 영향, 허용 가능한 전환 위험을 기준으로 첫 번째 검증 범위를 함께 정리합니다.</Text>
          </div>
          <nav aria-label="대상별 시작점" className="conversion-panel__actions">
            {CONVERSIONS.map((conversion) => (
              <TrackableLink
                className="blro-link blro-link--standalone conversion-action"
                href={conversion.href}
                key={conversion.href}
                properties={{ ctaId: conversion.ctaId, placement: "conversion-panel" }}
              >
                <span>
                  <strong>{conversion.label}</strong>
                  <small>{conversion.note}</small>
                </span>
                <span aria-hidden="true">↗</span>
              </TrackableLink>
            ))}
          </nav>
        </div>
      </Container>
    </Section>
  )
}
