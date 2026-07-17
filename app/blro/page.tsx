import type { Metadata } from "next"
import { StrategicPage } from "@/components/marketing/strategic-page"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "BLRO의 역할",
  description: "BLRO는 인프라·보안 전환을 진단, 검증, 전환, 안정화의 실행 흐름으로 연결합니다.",
  ...canonicalMetadata("/blro"),
}

export default function BlroPage() {
  return (
    <StrategicPage
      ctaId="strategic-customer-project"
      ctaHref="/contact?type=customer-project"
      ctaLabel="기술 프로젝트 상담"
      eyebrow="BLRO · OPERATING PARTNER"
      heading={<>전환을 제품 선택으로 <span className="blro-nowrap">끝내지 않습니다.</span></>}
      intro="BLRO는 인프라·보안 전환에서 기술 비교를 실제 운영 판단으로 바꾸는 실행 파트너입니다. 현재 환경의 제약과 업무 영향을 먼저 확인하고, 검증·전환·운영 인수가 이어지는 기준을 함께 설계합니다."
      supportingCopy="같은 기술도 업무 중요도, 보안 경계, 변경 가능 시간, 운영 인력에 따라 다른 선택이 필요합니다. BLRO는 그 차이를 초기 검토 단계에서 드러내고 다음 의사결정으로 연결합니다."
      sections={[
        { number: "01", heading: "운영 조건을 설계 입력으로 바꿉니다.", summary: "도입 목표만으로는 전환 범위를 정할 수 없습니다. 지켜야 할 업무와 바꿀 수 있는 조건을 먼저 구분합니다.", items: ["업무 중요도와 허용 가능한 중단 시간", "데이터 보호·접근 통제·규정 준수 조건", "기존 인프라 활용 범위와 운영 역할"] },
        { number: "02", heading: "검증의 통과 기준을 먼저 합의합니다.", summary: "PoC는 제품 시연이 아니라 다음 단계로 넘어갈 수 있는지를 확인하는 과정입니다.", items: ["호환성, 성능, 복구와 보안 정책의 확인 범위", "성공 조건과 중단·롤백 조건", "검증 결과를 기록할 책임과 의사결정 방식"] },
        { number: "03", heading: "전환 이후의 운영 인수까지 연결합니다.", summary: "구축 완료가 끝이 되지 않도록 전환 순서와 초기 운영에서 확인할 데이터를 남깁니다.", items: ["워크로드별 전환 파동과 리허설 범위", "장애·변경·복구 대응 책임", "초기 운영 데이터 기반의 설계 보정"] },
      ]}
    />
  )
}
