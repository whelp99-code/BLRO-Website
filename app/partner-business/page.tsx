import type { Metadata } from "next"
import { StrategicPage } from "@/components/marketing/strategic-page"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Partner Business",
  description: "BLRO는 국내 파트너와 글로벌 벤더의 공동 제안, 기술 검증, 수행 인수를 실행 가능한 역할 구조로 연결합니다.",
  ...canonicalMetadata("/partner-business"),
}

export default function PartnerBusinessPage() {
  return (
    <StrategicPage
      ctaId="strategic-partner-collaboration"
      ctaHref="/contact?type=partner-collaboration"
      ctaLabel="파트너 협업 문의"
      eyebrow="PARTNER BUSINESS · JOINT EXECUTION"
      heading={<>제안과 수행 사이의 <span className="blro-nowrap">공백을 줄입니다.</span></>}
      intro="새 기술을 소개하는 것만으로는 고객 프로젝트가 움직이지 않습니다. BLRO는 파트너·벤더·고객이 각자의 역할을 분명히 하고, 기술 검증부터 전환과 운영 인수까지 이어질 수 있도록 공동 수행 구조를 설계합니다."
      supportingCopy="협업의 핵심은 역할을 겹치게 만드는 것이 아니라, 고객 의사결정에 필요한 증거와 책임의 경계를 분명하게 남기는 일입니다."
      sections={[
        { number: "01", heading: "공동 제안의 판단 범위를 맞춥니다.", summary: "고객이 해결하려는 운영 과제와 각 참여자의 역할을 먼저 정리합니다.", items: ["고객 과제, 제약 조건, 의사결정 시점", "영업·프리세일즈·기술 검증의 책임 구분", "제안에 포함할 범위와 제외할 범위"] },
        { number: "02", heading: "기술 검증을 수행 가능한 계획으로 만듭니다.", summary: "데모가 아닌 고객 환경의 검증을 위해 통과 조건과 증거를 문서화합니다.", items: ["PoC 환경, 검증 워크로드와 일정", "호환성·보안·복구·운영성의 확인 기준", "결과 검토와 다음 의사결정의 참여 구조"] },
        { number: "03", heading: "반복 가능한 수행 체계를 남깁니다.", summary: "한 번의 프로젝트가 끝나도 다음 기회에서 재사용할 수 있도록 실행 자산을 정리합니다.", items: ["구축·전환·운영 인수 절차", "역할별 체크리스트와 고객 커뮤니케이션 기준", "재검토가 필요한 위험과 후속 지원 범위"] },
      ]}
    />
  )
}
