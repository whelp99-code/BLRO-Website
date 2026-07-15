import type { Metadata } from "next"
import { StrategicPage } from "@/components/marketing/strategic-page"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "AI & Automation",
  description: "BLRO는 인프라·보안 운영에서 반복 업무를 통제 가능한 AI와 자동화 흐름으로 설계합니다.",
  ...canonicalMetadata("/ai-automation"),
}

export default function AiAutomationPage() {
  return (
    <StrategicPage
      ctaHref="/contact?type=customer-project"
      ctaLabel="자동화 검토 상담"
      eyebrow="AI & AUTOMATION · CONTROLLED OPERATIONS"
      heading={<>AI 자동화는 <span className="blro-nowrap">통제 가능한 흐름에서</span> 시작합니다.</>}
      intro="BLRO는 AI를 별도의 유행어로 다루지 않습니다. 인프라·보안 운영에서 반복되고 지연되기 쉬운 업무를 찾고, 사람의 승인과 기록이 필요한 지점을 포함한 자동화 흐름으로 설계합니다."
      supportingCopy="자동화 후보의 수보다 중요한 것은 권한, 데이터, 예외 처리, 사람이 최종 판단해야 할 경계를 명확히 하는 일입니다."
      sections={[
        { number: "01", heading: "반복 업무와 병목을 먼저 찾습니다.", summary: "문서·티켓·점검·변경 요청처럼 반복되는 업무를 업무 흐름 단위로 확인합니다.", items: ["반복 빈도와 업무 지연이 발생하는 지점", "입력 데이터의 출처와 민감도", "자동화가 가능한 부분과 사람이 유지할 판단"] },
        { number: "02", heading: "통제와 승인 흐름을 설계합니다.", summary: "자동화 결과가 바로 실행으로 이어지지 않도록 권한과 검토 단계를 함께 만듭니다.", items: ["역할 기반 접근과 실행 권한", "예외·실패·되돌림 처리", "검토·승인·변경 이력의 기록 방식"] },
        { number: "03", heading: "작은 검증에서 운영 적용으로 확장합니다.", summary: "한 번에 전체 업무를 바꾸기보다 영향이 제한된 흐름에서 통과 기준을 확인합니다.", items: ["제한된 업무 범위와 성공 기준", "운영자 피드백과 품질 확인", "확장 전에 확인할 보안·비용·유지보수 조건"] },
      ]}
    />
  )
}
