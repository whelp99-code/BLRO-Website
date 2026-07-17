import type { Metadata } from "next"
import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { canonicalMetadata } from "@/lib/site"
import "./diagnostic-sample.css"

export const metadata: Metadata = {
  title: "전환 진단 결과물 예시",
  description: "BLRO 전환 진단에서 고객이 받는 우선 검증 범위, 보류·제외 조건, 통과 기준의 공개 예시입니다.",
  ...canonicalMetadata("/diagnostic-sample"),
}

const decisionRows = [
  {
    title: "서비스별 복구 목표를 정의했는가",
    condition: "전체 시스템에 하나의 복구 목표만 있고, 핵심 업무와 일반 업무의 허용 중단 시간이 구분되지 않았습니다.",
    evidence: "최근 복구 훈련 기록, 서비스 의존성, 업무별 허용 중단 시간 승인이 필요합니다.",
    rule: "핵심 서비스의 복구 목표와 복구 순서가 합의되기 전에는 해당 워크로드를 1차 전환 범위에서 보류합니다.",
  },
  {
    title: "레거시 워크로드를 원복 가능하게 검증하는가",
    condition: "구형 운영체제와 하드웨어 종속 라이선스가 섞여 있어 일괄 마이그레이션의 실패 비용이 큽니다.",
    evidence: "OS·드라이버·라이선스 목록, 애플리케이션 담당자 확인, 원복 가능한 테스트 복제본이 필요합니다.",
    rule: "테스트 복제본에서 기동·업무 기능·라이선스·원복을 모두 통과한 워크로드만 전환 후보로 올립니다.",
  },
  {
    title: "관리 경계와 백업 권한을 분리했는가",
    condition: "가상화 관리자와 백업 관리자의 권한 경계가 불명확하고, 사고 시 동일 계정 체계가 함께 영향을 받을 수 있습니다.",
    evidence: "관리자 계정·네트워크 경로·백업 저장소 권한과 다중 인증 적용 범위를 확인해야 합니다.",
    rule: "관리 경로와 복구 사본의 권한 분리가 확인되기 전에는 운영 인수 완료로 판정하지 않습니다.",
  },
] as const

const scopeDecisions = [
  ["우선 검증", "업무 영향이 낮고 원복이 쉬운 내부 웹 서비스와 관리 워크로드"],
  ["보류", "복구 순서가 정해지지 않은 핵심 데이터베이스와 지연 민감 워크로드"],
  ["제외", "공급사 지원 여부와 라이선스 이동 조건이 확인되지 않은 레거시 어플라이언스"],
] as const

const verificationSteps = [
  ["01 · 복구 검증", "선택한 테스트 워크로드를 격리 복구하고 업무 담당자가 기능을 확인합니다.", "통과: 합의한 시간 안에 서비스와 데이터가 확인됨"],
  ["02 · 원복 리허설", "전환 실패를 가정해 기존 환경으로 되돌리는 절차와 담당자 역할을 실행합니다.", "통과: 변경 기록과 원복 순서가 재현됨"],
  ["03 · 운영 인수", "경보, 용량, 계정, 백업, 장애 연락 체계를 운영팀이 직접 확인합니다.", "통과: 운영자가 핵심 상태와 대응 절차를 설명함"],
] as const

export default function DiagnosticSamplePage() {
  return (
    <article className="diagnostic-sample">
      <Section aria-labelledby="diagnostic-sample-heading" spacing="generous">
        <Container className="diagnostic-sample__intro">
          <Eyebrow>ILLUSTRATIVE DECISION DOSSIER</Eyebrow>
          <Heading id="diagnostic-sample-heading" level={1}>
            <span className="diagnostic-sample__title-line">제품 목록이 아닌,</span>{" "}
            <span className="diagnostic-sample__title-line">다음 결정을 내릴</span>{" "}
            <span className="diagnostic-sample__title-line">진단 문서입니다.</span>
          </Heading>
          <Text variant="lead">전환 진단 후에는 무엇을 먼저 검증하고, 무엇을 보류하며, 어떤 조건에서 중단할지를 한 문서로 정리합니다.</Text>
          <p className="diagnostic-sample__notice"><strong>공개용 예시:</strong> 아래 내용은 특정 고객의 환경·성과가 아닌 가상 시나리오입니다. 실제 결과는 고객 환경의 증거와 담당자 합의를 바탕으로 달라집니다.</p>
        </Container>
      </Section>

      <Section aria-labelledby="sample-scenario-heading" spacing="default" tone="alternate">
        <Container>
          <div className="diagnostic-sample__scenario">
            <Eyebrow>01 · INPUT CONDITIONS</Eyebrow>
            <Heading id="sample-scenario-heading" level={2}>예시 상황과 진단 경계</Heading>
            <dl>
              <div><dt>검토 상황</dt><dd>기존 가상화 환경의 지원·비용 변화에 대비해 HCI 또는 혼합 운영 전환을 검토하는 중견기업</dd></div>
              <div><dt>지켜야 할 조건</dt><dd>업무 중단 최소화, 기존 백업 복구 유지, 레거시 애플리케이션 호환, 운영팀 인수 가능성</dd></div>
              <div><dt>이번 진단의 범위</dt><dd>제품 선정이 아니라 1차 검증 워크로드, 보류·제외 조건, PoC와 원복 리허설의 통과 기준 정의</dd></div>
              <div><dt>아직 모르는 것</dt><dd>서비스별 복구 목표, 일부 라이선스 이동 조건, 관리 권한 분리 수준, 최근 복구 훈련의 실제 결과</dd></div>
            </dl>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="sample-decision-heading" spacing="generous" tone="surface">
        <Container>
          <div className="diagnostic-sample__section-heading">
            <Eyebrow>02 · DECISION REGISTER</Eyebrow>
            <Heading id="sample-decision-heading" level={2}>현재 판단, 필요한 증거, 결정 규칙</Heading>
            <Text>모르는 것을 감추지 않고, 어떤 증거가 확인되면 결정이 바뀌는지 기록합니다.</Text>
          </div>
          <ol className="diagnostic-sample__decision-table">
            {decisionRows.map((row, index) => (
              <li key={row.title}>
                <span className="diagnostic-sample__decision-number">{String(index + 1).padStart(2, "0")}</span>
                <Heading level={3}>{row.title}</Heading>
                <dl>
                  <div><dt>현재 조건</dt><dd>{row.condition}</dd></div>
                  <div><dt>추가 증거</dt><dd>{row.evidence}</dd></div>
                  <div><dt>결정 규칙</dt><dd>{row.rule}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="sample-scope-heading" spacing="generous" tone="alternate">
        <Container>
          <div className="diagnostic-sample__section-heading">
            <Eyebrow>03 · SCOPE DECISION</Eyebrow>
            <Heading id="sample-scope-heading" level={2}>우선 검증·보류·제외 범위</Heading>
          </div>
          <ul className="diagnostic-sample__scope-grid">
            {scopeDecisions.map(([state, description]) => (
              <li key={state}><span className="diagnostic-sample__state">{state}</span><p>{description}</p></li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section aria-labelledby="sample-verification-heading" spacing="generous" tone="surface">
        <Container>
          <div className="diagnostic-sample__section-heading">
            <Eyebrow>04 · NEXT VERIFICATION</Eyebrow>
            <Heading id="sample-verification-heading" level={2}>다음 검증과 통과 기준</Heading>
          </div>
          <ol className="diagnostic-sample__verification">
            {verificationSteps.map(([title, action, pass]) => (
              <li key={title}><strong>{title}</strong><p>{action}</p><span>{pass}</span></li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="sample-takeaway-heading" spacing="generous" tone="navy">
        <Container className="diagnostic-sample__takeaway">
          <Eyebrow>CUSTOMER TAKEAWAY</Eyebrow>
          <Heading id="sample-takeaway-heading" level={2}>상담 후 고객에게 남는 것</Heading>
          <ul>
            <li>첫 번째로 검증할 워크로드와 지금 제외할 범위</li>
            <li>내부 담당자와 벤더에게 추가로 요구할 증거 목록</li>
            <li>PoC·원복 리허설·운영 인수의 통과 및 중단 기준</li>
            <li>다음 회의에서 결정해야 할 항목과 책임자</li>
          </ul>
          <div className="diagnostic-sample__actions">
            <TrackableLink className="blro-button blro-button--primary" href="/contact?type=customer-project" properties={{ ctaId: "diagnostic-sample-consult", placement: "diagnostic-sample" }}>내 환경의 진단 범위 확인</TrackableLink>
            <Link className="blro-button blro-button--secondary" href="/solutions">검토 영역 먼저 보기</Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
