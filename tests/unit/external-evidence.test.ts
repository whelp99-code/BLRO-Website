import { describe, expect, it } from "vitest"
import {
  createExternalEvidenceDigest,
  EXTERNAL_EVIDENCE_APPROVAL_REGISTRY,
  isOfficialSangforStoryUrl,
  SANGFOR_KOREA_CASES,
  SANGFOR_KOREA_FEATURED_CASES,
  SANGFOR_KOREA_INDEX_CASES,
  validateExternalEvidence,
} from "@/lib/external-evidence"

const approvalDate = new Date("2026-08-18T00:00:00.000Z")

describe("external evidence publication boundary", () => {
  it("publishes featured Korea cases plus the remaining official index", () => {
    expect(SANGFOR_KOREA_FEATURED_CASES.map((item) => item.customer)).toEqual(["시큐아이", "롯데건설", "LG생활건강"])
    expect(SANGFOR_KOREA_CASES).toHaveLength(20)
    expect(SANGFOR_KOREA_INDEX_CASES).toHaveLength(17)
    expect(SANGFOR_KOREA_CASES.every((item) => isOfficialSangforStoryUrl(item.sourceUrl))).toBe(true)
    expect(SANGFOR_KOREA_CASES.some((item) => item.customer.includes("삼성전자"))).toBe(false)
    expect(SANGFOR_KOREA_CASES.filter((item) => item.customer === "한신대")).toHaveLength(1)
    expect(SANGFOR_KOREA_CASES.filter((item) => item.customer === "시큐아이")).toHaveLength(1)
  })

  it("publishes only percentage figures that appear in official source pages", () => {
    const factsWithPercent = SANGFOR_KOREA_CASES.filter((item) => item.fact.includes("%"))
    expect(factsWithPercent.map((item) => [item.customer, item.fact])).toEqual([
      ["조선일보", "물리 서버 9대를 HCI로 전환. 원문 기준 구매비용 40% 절감"],
      ["대상", "본사·베트남·태국 법인 생산관리 정보를 동기화. 원문 기준 비용 65% 절감"],
      ["LS산전", "본사·베트남·중국 등 해외 법인 ERP 전송. 원문 기준 회선 비용 50% 절감"],
    ])
  })

  it("rejects a public claim changed after its approval digest", () => {
    const changed = SANGFOR_KOREA_CASES.map((item, index) =>
      index === 0 ? { ...item, fact: "승인 뒤 바뀐 공개 문구" } : item,
    )

    expect(() => validateExternalEvidence(changed, EXTERNAL_EVIDENCE_APPROVAL_REGISTRY, approvalDate)).toThrow("no active approval")
  })

  it("rejects an overdue review while the approval expiry remains active", () => {
    const overdueRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        reviewAt: "2026-08-17",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, overdueRegistry, approvalDate)).toThrow("no active approval")
  })

  it("rejects an expired approval independently of its review date", () => {
    const expiredRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        expiresAt: "2026-08-17",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, expiredRegistry, approvalDate)).toThrow("no active approval")
  })

  it("rejects approval metadata that no longer records the site-owner direction", () => {
    const untrustedRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        approverRole: "unknown",
        source: "unreviewed-import",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, untrustedRegistry, approvalDate)).toThrow("no active approval")
  })

  it.each(["approvedAt", "reviewAt", "expiresAt"] as const)("rejects a malformed %s value", (field) => {
    const malformedRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        [field]: "not-a-date",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, malformedRegistry, approvalDate)).toThrow("no active approval")
  })

  it("rejects a digest-matched verification date that is not a real calendar date", () => {
    const [firstEvidence, ...remainingEvidence] = SANGFOR_KOREA_CASES
    if (!firstEvidence) throw new Error("expected a Sangfor evidence record")
    const malformedFirstEvidence = { ...firstEvidence, verifiedAt: "2026-02-30" }
    const malformedEvidence = [malformedFirstEvidence, ...remainingEvidence]
    const malformedRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) =>
        approval.evidenceId === malformedFirstEvidence.evidenceId
          ? { ...approval, contentSha256: createExternalEvidenceDigest(malformedFirstEvidence) }
          : approval,
      ),
    }

    expect(() => validateExternalEvidence(malformedEvidence, malformedRegistry, approvalDate)).toThrow("no active approval")
  })
})
