import { createHash } from "node:crypto"
import approvalRegistrySource from "@/content/_registry/external-evidence-approvals.json"

export type ExternalCaseEvidence = Readonly<{
  approvalRef: string
  customer: string
  decisionLesson: string
  evidenceId: string
  operatingSituation: string
  sourceTitle: string
  sourceUrl: string
  technology: string
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

export function createExternalEvidenceDigest(evidence: ExternalCaseEvidence): string {
  const payload = {
    evidenceId: evidence.evidenceId,
    customer: evidence.customer,
    technology: evidence.technology,
    operatingSituation: evidence.operatingSituation,
    decisionLesson: evidence.decisionLesson,
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
    const contentSha256 = createExternalEvidenceDigest(evidence)
    const approved = registry.approvals.some(
      (candidate) =>
        candidate.approvalId === evidence.approvalRef &&
        candidate.evidenceId === evidence.evidenceId &&
        candidate.publicScopes.includes("website:public:ko") &&
        candidate.approvedAt <= today &&
        candidate.reviewAt >= today &&
        candidate.expiresAt >= today &&
        candidate.contentSha256 === contentSha256 &&
        candidate.evidenceRefs.includes(evidence.sourceUrl) &&
        candidate.evidenceRefs.includes("docs/sangfor-korea-case-evidence.md"),
    )
    if (!approved || evidence.verifiedAt > today) {
      throw new Error(`[external evidence:${evidence.evidenceId}] no active approval for the published claim`)
    }
  }
  return evidenceRecords
}

const SANGFOR_KOREA_CASE_RECORDS = [
  {
    approvalRef: "approval-external-sangfor-secui-hci",
    evidenceId: "sangfor-korea-secui-hci",
    customer: "SECUI",
    technology: "HCI",
    operatingSituation: "보안관제센터의 서버·스토리지·네트워크 자원을 통합하고, 수요 변화에 즉시 대응할 운영 가시성이 필요했던 사례입니다.",
    decisionLesson: "자원 통합 여부만 보지 않고, 운영 가시성·확장 방식·가상 방화벽 운영까지 함께 검증해야 합니다.",
    sourceTitle: "Sangfor HCI 고객 사례 — SECUI",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/hci-gogaeg-salye-secui",
    verifiedAt: "2026-07-17",
  },
  {
    approvalRef: "approval-external-sangfor-lotte-vdi",
    evidenceId: "sangfor-korea-lotte-vdi",
    customer: "롯데건설",
    technology: "VDI",
    operatingSituation: "3D 모델링 자원 공유와 협력사 접근을 지원하면서 정보 유출 방지, 애플리케이션 호환성, 이중 인증을 함께 다뤄야 했던 사례입니다.",
    decisionLesson: "GPU 자원만 산정하지 않고, 사용자·그룹 정책과 반출 통제, 인증, 가용성까지 하나의 검증 범위로 묶어야 합니다.",
    sourceTitle: "Sangfor VDI 고객 사례 — 롯데건설",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/vdi-losdegeonseol",
    verifiedAt: "2026-07-17",
  },
  {
    approvalRef: "approval-external-sangfor-lg-hh-sdwan",
    evidenceId: "sangfor-korea-lg-hh-sdwan",
    customer: "LG생활건강",
    technology: "SD-WAN",
    operatingSituation: "600개 이상의 카운터와 400개 이상의 지점망에서 연결 연속성과 중앙 운영 가시성을 확보해야 했던 사례입니다.",
    decisionLesson: "회선 전환만 보지 않고, 암호화 연결·LTE 백업·중앙 정책·장애 시 운영 절차를 함께 통과 기준으로 정의해야 합니다.",
    sourceTitle: "Sangfor SD-WAN 고객 사례 — LG생활건강",
    sourceUrl: "https://www.sangfor.com/kr/success-stories/sd-wan-lgsaenghwalgeongang-guchug",
    verifiedAt: "2026-07-17",
  },
] as const satisfies readonly ExternalCaseEvidence[]

export const SANGFOR_KOREA_CASES = validateExternalEvidence(
  SANGFOR_KOREA_CASE_RECORDS,
  EXTERNAL_EVIDENCE_APPROVAL_REGISTRY,
  new Date(),
)
