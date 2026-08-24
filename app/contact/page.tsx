import type { Metadata } from "next"
import { Suspense } from "react"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { ContactPathGuide } from "@/components/contact/contact-path-guide"
import { DiagnosticSummarySample } from "@/components/contact/diagnostic-summary-sample"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "전환 진단 상담",
  description: "BLRO와 함께 인프라·보안 전환의 우선순위, 검증 범위, 실행 조건을 정리합니다.",
  ...canonicalMetadata("/contact"),
}

const preparationItems = [
  "현재 사용 중인 인프라·보안 환경과 바꾸려는 이유",
  "업무 중단, 데이터 보호, 규정 준수처럼 반드시 지켜야 할 조건",
  "검토 중인 기술·벤더와 내부 의사결정 시점",
] as const

export default function ContactPage() {
  return (
    <article className="contact-page">
      <Section aria-labelledby="contact-heading" className="contact-page__hero" spacing="generous">
        <Container className="contact-page__layout">
          <div className="contact-page__intro">
            <Eyebrow>START WITH THE OPERATING CONDITIONS</Eyebrow>
            <Heading id="contact-heading" level={1}>
              제품보다 먼저, <span className="blro-nowrap">전환의 기준</span>을 정리합니다.
            </Heading>
            <Text variant="lead">
              도입할 제품보다, 현재 운영에서 지켜야 할 조건을 먼저 확인합니다. 그 기준을 바탕으로 검증 범위와 다음 결정을 함께 설계합니다.
            </Text>
          </div>
          <Suspense fallback={<div className="contact-path-guide" aria-hidden="true" />}>
            <ContactPathGuide />
          </Suspense>
        </Container>
      </Section>

      <Section aria-labelledby="contact-preparation-heading" spacing="default" tone="surface">
        <Container className="contact-page__preparation">
          <div>
            <Eyebrow>PREPARE THE FIRST CONVERSATION</Eyebrow>
            <Heading id="contact-preparation-heading" level={2}>첫 논의에서 확인할 내용</Heading>
          </div>
          <ol>
            {preparationItems.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-label="전환 진단 산출물 예시" spacing="generous">
        <Container>
          <DiagnosticSummarySample />
        </Container>
      </Section>

      <Section aria-labelledby="contact-status-heading" spacing="default" tone="alternate">
        <Container className="contact-page__status">
          <Eyebrow>SECURE INQUIRY INTEGRATION</Eyebrow>
          <Heading id="contact-status-heading" level={2}>전환 진단 범위를 확인하세요.</Heading>
          <Text>입력한 정보는 상담 요청 처리와 회신을 위해서만 사용하며, 제출 전 동의가 필요합니다.</Text>
          <Suspense fallback={null}><InquiryForm /></Suspense>
        </Container>
      </Section>
    </article>
  )
}
