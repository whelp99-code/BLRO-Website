import Link from "next/link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"

const sampleRows = [
  {
    label: "입력 조건",
    detail: "대상 워크로드, 업무 영향, 현재 제약과 의사결정 시점을 함께 정리합니다.",
  },
  {
    label: "판단 기준",
    detail: "유지·전환·혼합 운영을 열어 둔 상태에서 반드시 충족할 조건을 구분합니다.",
  },
  {
    label: "우선순위",
    detail: "먼저 검증할 범위와 지금은 제외할 범위를 명확히 합니다.",
  },
  {
    label: "다음 검증",
    detail: "PoC, 전환 리허설 또는 추가 진단 중 다음 행동과 통과 기준을 정의합니다.",
  },
] as const

export function DiagnosticSummarySample() {
  return (
    <section aria-labelledby="diagnostic-summary-heading" className="diagnostic-summary-sample">
      <div>
        <Eyebrow>WHAT YOU RECEIVE</Eyebrow>
        <Heading id="diagnostic-summary-heading" level={2}>상담 후 받게 될 진단 요약의 형태</Heading>
        <Text>
          아래는 익명 환경을 전제로 한 공개용 예시입니다. 특정 제품 추천이나 고객 결과를 약속하지 않고, 다음 의사결정에 필요한 조건과 검증 범위를 남깁니다.
        </Text>
      </div>
      <dl aria-label="전환 진단 요약 예시">
        {sampleRows.map((row, index) => (
          <div key={row.label}>
            <dt><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{row.label}</dt>
            <dd>{row.detail}</dd>
          </div>
        ))}
      </dl>
      <Link className="blro-link" href="/diagnostic-sample">전체 진단 결과물 예시 보기 <span aria-hidden="true">↗</span></Link>
    </section>
  )
}
