import { createHash } from "node:crypto"
import approvalRegistrySource from "@/content/_registry/external-evidence-approvals.json"

export const SANGFOR_CASE_CATEGORIES = ["hci", "vdi", "security-network"] as const

export type SangforCaseCategory = (typeof SANGFOR_CASE_CATEGORIES)[number]

export type ExternalCaseEvidence = Readonly<{
  approvalRef: string
  category: SangforCaseCategory
  customer: string
  evidenceId: string
  fact: string
  featured: boolean
  productTag: string
  sourceTitle: string
  sourceUrl: string
  verifiedAt: string
}>

export type ExternalEvidenceApprovalRegistry = Readonly<{
  approvals: readonly Readonly<{
    approvalId: string
    approvedAt: string
    approverRole: string
    contentSha256: string
    evidenceId: string
    evidenceRefs: readonly string[]
    expiresAt: string
    publicScopes: readonly string[]
    reviewAt: string
    source: string
  }>[]
}>

export const EXTERNAL_EVIDENCE_APPROVAL_REGISTRY: ExternalEvidenceApprovalRegistry = approvalRegistrySource

export const SANGFOR_CASE_FILTERS = [
  { category: "all", label: "전체" },
  { category: "hci", label: "HCI" },
  { category: "vdi", label: "VDI" },
  { category: "security-network", label: "보안·네트워크" },
] as const

export type SangforCaseFilter = (typeof SANGFOR_CASE_FILTERS)[number]["category"]

const OFFICIAL_SANGFOR_STORY_HOSTS = ["https://www.sangfor.com/kr/success-stories/", "https://www.sangfor.com/success-stories/"] as const

function isIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false
  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

export function isOfficialSangforStoryUrl(sourceUrl: string): boolean {
  return OFFICIAL_SANGFOR_STORY_HOSTS.some((prefix) => sourceUrl.startsWith(prefix))
}

export function createExternalEvidenceDigest(evidence: ExternalCaseEvidence): string {
  const payload = {
    evidenceId: evidence.evidenceId,
    customer: evidence.customer,
    productTag: evidence.productTag,
    category: evidence.category,
    featured: evidence.featured,
    fact: evidence.fact,
    sourceTitle: evidence.sourceTitle,
    sourceUrl: evidence.sourceUrl,
    verifiedAt: evidence.verifiedAt,
  }
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex")
}

export function validateExternalEvidence(
  evidenceRecords: readonly ExternalCaseEvidence[],
  registry: ExternalEvidenceApprovalRegistry,
  now: Date,
): readonly ExternalCaseEvidence[] {
  const today = now.toISOString().slice(0, 10)
  const evidenceIds = new Set<string>()
  for (const evidence of evidenceRecords) {
    if (evidenceIds.has(evidence.evidenceId)) {
      throw new Error(`[external evidence:${evidence.evidenceId}] duplicate evidence ID`)
    }
    evidenceIds.add(evidence.evidenceId)
    if (!isOfficialSangforStoryUrl(evidence.sourceUrl)) {
      throw new Error(`[external evidence:${evidence.evidenceId}] no active approval for the published claim`)
    }
    if (!isIsoDate(evidence.verifiedAt) || evidence.verifiedAt > today) {
      throw new Error(`[external evidence:${evidence.evidenceId}] no active approval for the published claim`)
    }
    const contentSha256 = createExternalEvidenceDigest(evidence)
    const approved = registry.approvals.some(
      (candidate) =>
        candidate.approvalId === evidence.approvalRef &&
        candidate.evidenceId === evidence.evidenceId &&
        candidate.approverRole === "site-owner" &&
        candidate.source === "user-directed-official-source-review" &&
        candidate.publicScopes.includes("website:public:ko") &&
        isIsoDate(candidate.approvedAt) &&
        isIsoDate(candidate.reviewAt) &&
        isIsoDate(candidate.expiresAt) &&
        candidate.approvedAt <= today &&
        candidate.reviewAt >= candidate.approvedAt &&
        candidate.reviewAt >= today &&
        candidate.expiresAt >= candidate.reviewAt &&
        candidate.expiresAt >= today &&
        candidate.contentSha256 === contentSha256 &&
        candidate.evidenceRefs.includes(evidence.sourceUrl) &&
        candidate.evidenceRefs.includes("docs/sangfor-korea-case-evidence.md"),
    )
    if (!approved) {
      throw new Error(`[external evidence:${evidence.evidenceId}] no active approval for the published claim`)
    }
  }
  return evidenceRecords
}

const SANGFOR_KOREA_CASE_RECORDS = [
  {
    approvalRef: "approval-external-sangfor-secui-hci",
    evidenceId: "sangfor-korea-secui-hci",
    customer: "시큐아이",
    productTag: "HCI",
    category: "hci",
    featured: true,
    fact: "보안 통합운영 센터에서 서버·스토리지·네트워크를 통합하고, NFV 가상 방화벽을 운영",
    sourceTitle: "Sangfor HCI 고객 사례 — SECUI",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-gogaeg-salye-secui",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-lotte-vdi",
    evidenceId: "sangfor-korea-lotte-vdi",
    customer: "롯데건설",
    productTag: "VDI",
    category: "vdi",
    featured: true,
    fact: "HCI 기반 aDesk로 플랜트 3D(E3D·SP3D) 환경을 구성하고 GPU, 2차인증, 반출통제를 적용",
    sourceTitle: "Sangfor VDI 고객 사례 — 롯데건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/vdi-losdegeonseol",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-lg-hh-sdwan",
    evidenceId: "sangfor-korea-lg-hh-sdwan",
    customer: "LG생활건강",
    productTag: "SD-WAN",
    category: "security-network",
    featured: true,
    fact: "SD-WAN(SIER)으로 600개 이상 카운터, 400개 이상 지점을 VPN·LTE 백업·중앙 관리로 연결",
    sourceTitle: "Sangfor SD-WAN 고객 사례 — LG생활건강",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/sd-wan-lgsaenghwalgeongang-guchug",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-chosun-hci",
    evidenceId: "sangfor-korea-chosun-hci",
    customer: "조선일보",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "물리 서버 9대를 HCI로 전환. 원문 기준 구매비용 40% 절감",
    sourceTitle: "Sangfor HCI 고객 사례 — 조선일보",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-seobeo-tonghab-gasanghwa-gogaeg-salye-joseonilbo",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-gamechosun-hci",
    evidenceId: "sangfor-korea-gamechosun-hci",
    customer: "게임조선",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "다원화된 게임 서비스 서버를 HCI로 All in One 통합",
    sourceTitle: "Sangfor HCI 고객 사례 — 게임조선",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-seobeo-tonghab-gasanghwa-gogaeg-salye-geimjoseon",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-medici-hci",
    evidenceId: "sangfor-korea-medici-hci",
    customer: "메디치이앤에스",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "VMware VM 마이그레이션(VtoV)으로 콘텐츠 서버를 가상화",
    sourceTitle: "Sangfor HCI 고객 사례 — 메디치이앤에스",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-gogaegsalye",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-kv-materials-hci",
    evidenceId: "sangfor-korea-kv-materials-hci",
    customer: "KV Materials",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "구 삼성코닝. SAP ERP/MES 베어메탈을 프라이빗 클라우드로 전환",
    sourceTitle: "Sangfor HCI 고객 사례 — KV MATERIALS(구. 삼성코닝)",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-seobeo-tonghab-gasanghwa-gogaeg-salye-kv-materialsgu-samseongkoning",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-annotation-hci",
    evidenceId: "sangfor-korea-annotation-hci",
    customer: "어노테이션 AI",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "AI 애플리케이션 서버 6대와 GPU를 HCI로 통합 운영",
    sourceTitle: "Sangfor HCI 고객 사례 — 어노테이션 AI",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-gogaeg-salye-ai-aepeullikeisyeon-seobeo-gasanghwa-tonghab-unyeong-gwanli",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-hanshin-hci",
    evidenceId: "sangfor-korea-hanshin-hci",
    customer: "한신대",
    productTag: "HCI",
    category: "hci",
    featured: false,
    fact: "Dell 서버 3대를 PtoV로 HCI 전환",
    sourceTitle: "Sangfor HCI 고객 사례 — 한신대학교",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hanshin-university",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-gs-vdi",
    evidenceId: "sangfor-korea-gs-vdi",
    customer: "GS건설",
    productTag: "VDI",
    category: "vdi",
    featured: false,
    fact: "분양사무실을 Thin Client VDI로 구성",
    sourceTitle: "Sangfor VDI 고객 사례 — GS건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/vdi-gogaeg-salye-gsgeonseol",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-cj-vdi",
    evidenceId: "sangfor-korea-cj-vdi",
    customer: "CJ대한통운",
    productTag: "VDI",
    category: "vdi",
    featured: false,
    fact: "HCI 기반 aDesk로 데스크톱 환경을 통합 운영",
    sourceTitle: "Sangfor VDI 고객 사례 — CJ Logistics",
    sourceUrl: "https://www.sangfor.com/success-stories/cj-logistics",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-kensington-xddr",
    evidenceId: "sangfor-korea-kensington-xddr",
    customer: "켄싱턴",
    productTag: "XDDR",
    category: "security-network",
    featured: false,
    fact: "NGAF·IAG·Endpoint Secure를 묶은 XDDR 구성",
    sourceTitle: "Sangfor NGAF 고객 사례 — Kensington Hotels & Resorts",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/ngaf-case-study-kensington-hotels-resorts",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-unid-iam",
    evidenceId: "sangfor-korea-unid-iam",
    customer: "유니드",
    productTag: "IAM",
    category: "security-network",
    featured: false,
    fact: "IAM으로 인터넷 접근을 관리",
    sourceTitle: "Sangfor IAM 고객 사례 — 유니드",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/iam-gogaeg-salye-yunideu",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-sk-iam",
    evidenceId: "sangfor-korea-sk-iam",
    customer: "SK건설",
    productTag: "IAM",
    category: "security-network",
    featured: false,
    fact: "IAM 인터넷접근제어",
    sourceTitle: "Sangfor IAM 고객 사례 — SK건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/iam-inteonesjeobgeunjeeo-skgeonseol",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-locknlock-ngaf",
    evidenceId: "sangfor-korea-locknlock-ngaf",
    customer: "락앤락",
    productTag: "NGAF",
    category: "security-network",
    featured: false,
    fact: "NGAF 차세대 방화벽",
    sourceTitle: "Sangfor NGAF 고객 사례 — 락앤락",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/ngaf-gogaeg-salye-rakaenrak",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-zwcad-ngaf",
    evidenceId: "sangfor-korea-zwcad-ngaf",
    customer: "ZWCAD",
    productTag: "NGAF",
    category: "security-network",
    featured: false,
    fact: "NGAF 차세대 방화벽",
    sourceTitle: "Sangfor NGAF 고객 사례 — ZWCAD",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/ngaf-gogaeg-salye-zwcad",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-geumgang-ngaf",
    evidenceId: "sangfor-korea-geumgang-ngaf",
    customer: "금강종합건설",
    productTag: "NGAF+IAG",
    category: "security-network",
    featured: false,
    fact: "NGAF와 IAG를 함께 구축",
    sourceTitle: "Sangfor NGAF 고객 사례 — 금강종합건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/ngaf-gogaeg-salye-geumgangjonghabgeonseol",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-daesang-wano",
    evidenceId: "sangfor-korea-daesang-wano",
    customer: "대상",
    productTag: "WANO",
    category: "security-network",
    featured: false,
    fact: "본사·베트남·태국 법인 생산관리 정보를 동기화. 원문 기준 비용 65% 절감",
    sourceTitle: "Sangfor WANO 고객 사례 — 대상",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/wano-gogaeg-salye-daesang",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-lsmetal-wano",
    evidenceId: "sangfor-korea-lsmetal-wano",
    customer: "LS메탈",
    productTag: "WANO",
    category: "security-network",
    featured: false,
    fact: "WANO 광역망 최적화",
    sourceTitle: "Sangfor WANO 고객 사례 — LS메탈",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/wano-gogaeg-salye-lsmetal",
    verifiedAt: "2026-08-18",
  },
  {
    approvalRef: "approval-external-sangfor-lsis-wano",
    evidenceId: "sangfor-korea-lsis-wano",
    customer: "LS산전",
    productTag: "WANO",
    category: "security-network",
    featured: false,
    fact: "본사·베트남·중국 등 해외 법인 ERP 전송. 원문 기준 회선 비용 50% 절감",
    sourceTitle: "Sangfor WANO 고객 사례 — LS산전",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/wano-gogaeg-salye-lssanjeon",
    verifiedAt: "2026-08-18",
  },
] as const satisfies readonly ExternalCaseEvidence[]

export const SANGFOR_KOREA_CASES = validateExternalEvidence(
  SANGFOR_KOREA_CASE_RECORDS,
  EXTERNAL_EVIDENCE_APPROVAL_REGISTRY,
  new Date(),
)

export const SANGFOR_KOREA_FEATURED_CASES = SANGFOR_KOREA_CASES.filter((item) => item.featured)
export const SANGFOR_KOREA_INDEX_CASES = SANGFOR_KOREA_CASES.filter((item) => !item.featured)
