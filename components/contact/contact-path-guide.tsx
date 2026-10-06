"use client"

import { useSearchParams } from "next/navigation"

const CONTACT_CONTEXTS = {
  "customer-project": {
    label: "기술 프로젝트 상담",
    detail: "현재 환경과 운영 제약을 기준으로 우선 검증할 범위를 정리합니다.",
  },
  "partner-collaboration": {
    label: "파트너 공동 수행",
    detail: "제안, 기술 검증, 구축·운영 단계에서의 역할과 협업 범위를 함께 검토합니다.",
  },
  "vendor-korea-entry": {
    label: "한국 시장 실행",
    detail: "국내 고객 검증과 현지 기술 수행 체계에 필요한 첫 번째 실행 조건을 정리합니다.",
  },
} as const

export function ContactPathGuide() {
  const searchParams = useSearchParams()
  const type = searchParams?.get("type") ?? null
  const role = searchParams?.get("role") ?? null
  const context = type === "vendor-korea-entry"
    ? CONTACT_CONTEXTS["vendor-korea-entry"]
    : type === "partner-collaboration" || role === "partner"
      ? CONTACT_CONTEXTS["partner-collaboration"]
      : role === "engineer"
        ? {
            label: "기술 지원 문의",
            detail: "제품과 버전, 증상, 이미 확인한 단계를 알려주세요.",
          }
        : CONTACT_CONTEXTS["customer-project"]

  return (
    <aside aria-label={context.label} aria-live="polite" className="contact-path-guide">
      <span className="contact-path-guide__label">선택한 시작점</span>
      <strong>{context.label}</strong>
      <p>{context.detail}</p>
    </aside>
  )
}
