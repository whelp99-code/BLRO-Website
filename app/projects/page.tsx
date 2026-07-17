import type { Metadata } from "next"
import { StrategicPage } from "@/components/marketing/strategic-page"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Projects",
  description: "BLRO가 다루는 인프라·보안 전환 과제를 고객 식별 정보 없는 수행 시나리오로 소개합니다.",
  ...canonicalMetadata("/projects"),
}

export default function ProjectsPage() {
  return (
    <StrategicPage
      ctaId="strategic-customer-project"
      ctaHref="/contact?type=customer-project"
      ctaLabel="전환 진단 범위 확인"
      eyebrow="PROJECTS · ANONYMIZED SCENARIOS"
      heading={<>고객명이 아닌 <span className="blro-nowrap">판단 과정으로</span> 보여드립니다.</>}
      intro="공개 승인되지 않은 고객명·성과 수치·계약 내용은 사용하지 않습니다. 대신 실제 전환에서 반복적으로 만나는 상황과, BLRO가 함께 정리하는 판단 기준·검증 범위를 익명 수행 시나리오로 설명합니다."
      supportingCopy="아래 시나리오는 특정 고객의 결과를 뜻하지 않습니다. 현재 과제가 어떤 검토 흐름으로 시작될 수 있는지 이해하기 위한 공개용 예시입니다."
      sections={[
        { number: "01", heading: "가상화·HCI 전환 사전 진단", summary: "기존 플랫폼의 비용·운영 부담이 커졌을 때, 대체 기술을 고르기 전에 워크로드와 전환 조건을 분류하는 시나리오입니다.", items: ["우선순위 워크로드와 의존성 분류", "용량·장애도메인·데이터 보호 기준", "PoC, 전환 파동, 롤백 조건의 정의"] },
        { number: "02", heading: "분산 환경의 보안 접근 구조 재정의", summary: "지점·원격 사용자·클라우드가 함께 있는 환경에서 접근 정책과 운영 책임을 다시 정리하는 시나리오입니다.", items: ["사용자·장치·애플리케이션 접근 흐름", "기존 VPN·ZTNA·네트워크 정책의 경계", "장애 대응과 정책 변경의 운영 책임"] },
        { number: "03", heading: "반복 운영 업무의 자동화 검증", summary: "운영 팀의 반복 작업을 줄이되, 승인·기록·예외 처리가 필요한 지점을 유지하는 시나리오입니다.", items: ["반복 업무와 입력 데이터의 신뢰성 확인", "사람 승인과 자동 실행의 경계", "예외 처리, 감사 기록, 운영 인수 기준"] },
      ]}
    />
  )
}
