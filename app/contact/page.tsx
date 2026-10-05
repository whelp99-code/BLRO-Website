import type { Metadata } from "next"
import { Suspense } from "react"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { ContactPathGuide } from "@/components/contact/contact-path-guide"
import { DiagnosticSummarySample } from "@/components/contact/diagnostic-summary-sample"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { RoleChecklist } from "@/components/redesign/role-checklist"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "역할별 상담",
  description: "역할을 먼저 고르면 그 역할의 확인 목록이 바뀝니다. 목록 교체에 자리 이동 애니메이션은 없습니다.",
  ...canonicalMetadata("/contact"),
}

const preparationItems = [
  "현재 사용 중인 인프라·보안 환경과 바꾸려는 이유",
  "업무 중단, 데이터 보호, 규정 준수처럼 반드시 지켜야 할 조건",
  "검토 중인 기술·벤더와 내부 의사결정 시점",
] as const

export default function ContactPage() {
  return (
    <article className="contact-page rd">
      <Section aria-labelledby="contact-heading" className="contact-page__hero" spacing="generous">
        <Container className="contact-page__layout">
          <div className="contact-page__intro">
            <Eyebrow>역할 먼저</Eyebrow>
            <Heading id="contact-heading" level={1}>
              역할을 먼저 고릅니다.
            </Heading>
            <Text variant="lead">
              기업 고객, 국내 파트너, 기술 엔지니어는 확인 목록이 다릅니다. 목록만 바뀌고, 칸의 높이를 애니메이션으로 밀지 않습니다.
            </Text>
            <p className="rd-actions">
              <a className="rd-btn rd-btn-primary" href="#inquiry-form">상담 요청 작성</a>
            </p>
            <Suspense fallback={<div className="rd-role-panel" aria-hidden="true" />}>
              <RoleChecklist />
            </Suspense>
          </div>
          <Suspense fallback={<div className="contact-path-guide" aria-hidden="true" />}>
            <ContactPathGuide />
          </Suspense>
        </Container>
      </Section>

      <Section aria-labelledby="contact-preparation-heading" spacing="default" tone="surface">
        <Container className="contact-page__preparation">
          <div>
            <Eyebrow>첫 논의를 준비합니다</Eyebrow>
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

      <Section aria-labelledby="contact-status-heading" id="inquiry-form" spacing="default" tone="alternate">
        <Container className="contact-page__status">
          <Eyebrow>상담 접수</Eyebrow>
          <Heading id="contact-status-heading" level={2}>전환 진단 범위를 확인하세요.</Heading>
          <Text>입력한 정보는 상담 요청 처리와 회신을 위해서만 사용하며, 제출 전 동의가 필요합니다.</Text>
          <Suspense fallback={null}><InquiryForm /></Suspense>
        </Container>
      </Section>
    </article>
  )
}
