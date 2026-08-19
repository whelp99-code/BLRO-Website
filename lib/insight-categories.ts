// 카테고리 매핑: 태그 → 사용자 대상 카테고리
// ULW Goal 1 — insights 주제별 필터 (2026-08-16)

export const INSIGHT_CATEGORIES = [
  "전체",
  "가상화 · HCI",
  "VDI · 워크스페이스",
  "보안 · SASE",
  "백업 · DR",
  "운영 · 거버넌스",
] as const

export type InsightCategory = (typeof INSIGHT_CATEGORIES)[number]

const CATEGORY_TAGS: Readonly<Record<Exclude<InsightCategory, "전체">, readonly string[]>> = {
  "가상화 · HCI": ["hci", "virtualization", "vmware", "nutanix", "azure-local", "hyper-v", "migration", "lifecycle", "update", "infrastructure", "cloud"],
  "VDI · 워크스페이스": ["vdi", "azure-virtual-desktop", "rdp-multipath", "workspace", "capacity", "gpu"],
  "보안 · SASE": ["security", "sase", "sd-wan", "ztna", "ssl-vpn", "secure-access", "pan-os", "globalprotect", "vpn", "kev", "network", "branch-network", "access-control"],
  "백업 · DR": ["backup", "disaster-recovery", "rpo", "rto", "business-continuity"],
  "운영 · 거버넌스": ["operations", "governance", "ai", "risk-management", "decision-making", "checklist", "consulting", "automation", "acm", "acme", "tls", "hybrid", "internal"],
}

function isNamedCategory(value: string): value is Exclude<InsightCategory, "전체"> {
  return Object.hasOwn(CATEGORY_TAGS, value)
}

export function categoryOf(tags: readonly string[]): InsightCategory {
  for (const [category, categoryTags] of Object.entries(CATEGORY_TAGS)) {
    if (isNamedCategory(category) && tags.some((tag) => categoryTags.includes(tag))) {
      return category
    }
  }
  return "운영 · 거버넌스"
}

export function isInCategory(tags: readonly string[], category: InsightCategory): boolean {
  if (category === "전체") return true
  return categoryOf(tags) === category
}
