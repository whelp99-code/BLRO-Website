import type { Metadata } from "next"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PRIVACY_NOTICE_EFFECTIVE_LABEL } from "@/lib/privacy-notice"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "개인정보 처리 안내",
  description: "BLRO 전환 진단 상담 접수에 필요한 개인정보 수집·이용 및 보관 안내입니다.",
  ...canonicalMetadata("/privacy"),
}

const collectionItems = [
  ["수집 항목", "회사명, 담당자명, 업무용 이메일, 선택 입력한 연락처와 문의 내용, 상담 주제·유입 경로"],
  ["이용 목적", "전환 진단 상담 요청의 확인, 회신, 상담 이력 관리 및 부정 접수 방지"],
  ["보유 기간", "접수일로부터 90일 또는 요청 처리 완료 후 90일 중 먼저 도래하는 시점까지. 법령상 보관 의무가 있는 경우에는 해당 기간 동안 보관합니다."],
] as const

export default function PrivacyPage() {
  return (
    <article className="privacy-page">
      <Section aria-labelledby="privacy-heading" spacing="generous">
        <Container className="privacy-page__container">
          <Eyebrow>PRIVACY NOTICE</Eyebrow>
          <Heading id="privacy-heading" level={1}>전환 진단 상담 개인정보 처리 안내</Heading>
          <Text variant="lead">BLRO는 상담 요청을 처리하고 회신하기 위해 필요한 최소한의 정보만 받습니다. 마케팅 수신 동의는 요청하지 않습니다.</Text>
          <p className="privacy-page__effective">시행일: {PRIVACY_NOTICE_EFFECTIVE_LABEL}</p>
        </Container>
      </Section>

      <Section aria-labelledby="privacy-collection-heading" spacing="default" tone="surface">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="privacy-collection-heading" level={2}>1. 수집·이용</Heading>
          <dl>
            {collectionItems.map(([term, description]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
          <p>동의를 거부할 수 있으나, 상담 요청 접수와 회신은 처리할 수 없습니다.</p>
        </Container>
      </Section>

      <Section aria-labelledby="privacy-processing-heading" spacing="default" tone="alternate">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="privacy-processing-heading" level={2}>2. 처리와 전달</Heading>
          <p>접수 정보는 BLRO의 상담 요청 처리 담당자 1인만 확인합니다. 정보는 전송과 저장 과정에서 암호화하며, 공개 채널이나 공개 문서에 입력 내용을 게시하지 않습니다.</p>
          <p>서비스 운영을 위해 Cloudflare의 웹·보안·데이터 처리 인프라를 사용합니다. 상담 요청 알림은 BLRO 담당자만 접근 가능한 비공개 Slack 공간으로 전달하며, 전체 문의 내용은 공개 Slack 채널로 전달하지 않습니다.</p>
        </Container>
      </Section>

      <Section aria-labelledby="privacy-measurement-heading" id="usage-measurement" spacing="default" tone="surface">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="privacy-measurement-heading" level={2}>3. 선택적 이용 측정</Heading>
          <p>사이트 상단에서 동의한 경우에만 Cloudflare Web Analytics와 BLRO의 비식별 전환 이벤트 측정을 사용합니다. 거부해도 모든 공개 콘텐츠와 상담 기능을 이용할 수 있습니다.</p>
          <dl>
            <div><dt>측정 항목</dt><dd>방문 페이지, 성능 지표, CTA 식별자, 화면 내 위치, 상담 주제, 검증 실패 필드. 이름, 회사명, 이메일, 전화번호, 문의 내용은 분석 이벤트에 넣지 않습니다.</dd></div>
            <div><dt>이용 목적</dt><dd>페이지 품질, 관심 주제, 상담 진입 흐름을 개선하기 위한 집계 분석</dd></div>
            <div><dt>보유 기간</dt><dd>BLRO 전환 이벤트는 90일 후 자동 삭제합니다. Cloudflare Web Analytics의 데이터 처리는 Cloudflare의 해당 서비스 정책을 따릅니다.</dd></div>
            <div><dt>동의 변경</dt><dd>브라우저의 사이트 데이터에서 `blro-analytics-consent`를 삭제하면 다시 선택할 수 있습니다.</dd></div>
          </dl>
        </Container>
      </Section>

      <Section aria-labelledby="privacy-rights-heading" spacing="default" tone="alternate">
        <Container className="privacy-page__container privacy-page__content">
          <Heading id="privacy-rights-heading" level={2}>4. 이용자의 권리와 문의</Heading>
          <p>본인의 정보에 대해 열람, 정정, 삭제 또는 처리정지를 요청할 수 있습니다. 요청은 아래 연락처로 보내면 본인 확인 후 처리합니다.</p>
          <p><strong>개인정보 관련 문의:</strong> <a className="blro-link" href="mailto:jm.park@blro.co.kr">jm.park@blro.co.kr</a></p>
          <p>이 안내의 내용은 처리 방식 또는 관련 법령의 변경에 따라 갱신될 수 있습니다.</p>
        </Container>
      </Section>
    </article>
  )
}
