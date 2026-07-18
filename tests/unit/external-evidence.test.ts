import { describe, expect, it } from "vitest"
import {
  createExternalEvidenceDigest,
  EXTERNAL_EVIDENCE_APPROVAL_REGISTRY,
  SANGFOR_KOREA_CASES,
  validateExternalEvidence,
} from "@/lib/external-evidence"

const approvalDate = new Date("2026-07-17T00:00:00.000Z")

describe("external evidence publication boundary", () => {
  it("publishes the three active Sangfor Korea source records", () => {
    expect(SANGFOR_KOREA_CASES).toHaveLength(3)
    expect(SANGFOR_KOREA_CASES.every((item) => item.sourceUrl.startsWith("https://www.sangfor.com/kr/success-stories/"))).toBe(true)
  })

  it("rejects a public claim changed after its approval digest", () => {
    const changed = SANGFOR_KOREA_CASES.map((item, index) =>
      index === 0 ? { ...item, decisionLesson: "승인 뒤 바뀐 공개 문구" } : item,
    )

    expect(() => validateExternalEvidence(changed, EXTERNAL_EVIDENCE_APPROVAL_REGISTRY, approvalDate)).toThrow("no active approval")
  })

  it("rejects an overdue review while the approval expiry remains active", () => {
    const overdueRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        reviewAt: "2026-07-16",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, overdueRegistry, approvalDate)).toThrow("no active approval")
  })

  it("rejects an expired approval independently of its review date", () => {
    const expiredRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        expiresAt: "2026-07-16",
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
