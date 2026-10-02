"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const ROLES = [
  {
    id: "customer",
    label: "기업 고객",
    href: "/contact?type=customer-project&role=customer",
    items: [
      "상황, 또는 제품이 아직 정해지지 않았는지",
      "관심 제품이 있으면 그 이름",
      "현재 환경 한 단락",
      "연락처",
      "계정 비밀번호는 받지 않습니다",
    ],
  },
  {
    id: "partner",
    label: "국내 파트너",
    href: "/contact?type=partner-collaboration&role=partner",
    items: [
      "회사명과 담당",
      "제안하려는 고객 상황",
      "이미 합의된 범위",
      "성공 기준과 롤백을 문서에 남길 수 있는지",
      "비밀번호와 고객 자격 증명은 받지 않습니다",
    ],
  },
  {
    id: "engineer",
    label: "기술 엔지니어",
    href: "/contact?type=general&role=engineer",
    items: [
      "제품과 버전",
      "증상",
      "이미 확인한 단계",
      "포트 번호는 이 목록에 없습니다. 공식 문서 확인이 필요합니다",
    ],
  },
] as const

const VENDOR_ITEMS = ["국내 고객 검증과 현지 기술 수행에 필요한 첫 실행 조건"] as const

type RoleId = (typeof ROLES)[number]["id"] | "vendor"

function selectedRole(type: string | null, role: string | null): RoleId {
  if (type === "vendor-korea-entry") return "vendor"
  if (type === "partner-collaboration" || role === "partner") return "partner"
  if (role === "engineer") return "engineer"
  return "customer"
}

export function RoleChecklist() {
  const params = useSearchParams()
  const role = selectedRole(params?.get("type") ?? null, params?.get("role") ?? null)
  const product = params?.get("product") === "hci" ? "hci" : undefined
  const active = ROLES.find((item) => item.id === role)
  const items = active ? active.items : VENDOR_ITEMS
  const label = active ? active.label : "한국 시장 실행"

  return (
    <div className="rd-role-panel">
      <div aria-label="상담 역할" className="rd-role-switch" role="group">
        {ROLES.map((item) => (
          <Link aria-current={role === item.id ? "page" : undefined} href={product === undefined ? item.href : `${item.href}&product=${product}`} key={item.id} scroll={false}>
            {item.label}
          </Link>
        ))}
      </div>
      <p className="rd-kicker">{label} 확인 목록</p>
      <ol aria-live="polite" className="rd-checklist">
        {items.map((item, index) => (
          <li key={item}>
            <span className="rd-idx">{String(index + 1).padStart(2, "0")}</span> {item}
          </li>
        ))}
      </ol>
    </div>
  )
}
