import type { Metadata } from "next"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "이용안내",
  description: "BLRO 웹사이트의 정보 이용과 상담 요청 처리 범위에 관한 안내입니다.",
  ...canonicalMetadata("/terms"),
}

export default function TermsPage() {
  return (
    <article className="privacy-page">
      <Section aria-labelledby="terms-heading" spacing="generous">
        <Container className="privacy-page__container">
          <Eyebrow>SITE USE NOTICE</Eyebrow>
          <Heading id="terms-heading" level={1}>이용안내</Heading>
          <Text variant="lead">이 사이트는 BLRO의 기술 검토 영역과 상담 시작점을 안내하기 위한 정보 페이지입니다.</Text>
          <p className="privacy-page__effective">시행일: 2026년 7월 14일</p>
        </Container>
      </Section>

      <Section aria-labelledby="terms-information-heading" spacing="default" tone="surface">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="terms-information-heading" level={2}>정보의 이용</Heading>
          <p>사이트의 내용은 일반적인 기술·운영 검토를 돕기 위한 자료이며, 특정 환경의 설계·구축·보안 적합성 또는 결과를 보증하지 않습니다. 실제 도입과 전환은 고객 환경, 계약 조건, 관련 법령을 바탕으로 별도 검토가 필요합니다.</p>
          <p>공개 인사이트는 작성 시점에 확인한 근거를 바탕으로 하며, 제품 사양·정책·지원 범위는 변경될 수 있습니다. 중요한 의사결정 전에는 해당 공급자의 최신 공식 문서와 계약 조건을 확인해 주세요.</p>
        </Container>
      </Section>

      <Section aria-labelledby="terms-inquiry-heading" spacing="default" tone="alternate">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="terms-inquiry-heading" level={2}>상담 요청</Heading>
          <p>상담 요청은 프로젝트 가능성을 함께 검토하기 위한 시작점입니다. 제출 정보의 수집·이용과 보관 기준은 <a className="blro-link" href="/privacy">개인정보 처리 안내</a>에서 확인할 수 있습니다.</p>
          <p>사이트 내용 또는 상담 요청 처리와 관련한 문의는 <a className="blro-link" href="mailto:jm.park@blro.co.kr">jm.park@blro.co.kr</a>로 보내 주세요.</p>
        </Container>
      </Section>
    </article>
  )
}
