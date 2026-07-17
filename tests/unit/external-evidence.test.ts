import { describe, expect, it } from "vitest"
import {
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

  it("rejects approvals after their review boundary", () => {
    const expiredRegistry = {
      approvals: EXTERNAL_EVIDENCE_APPROVAL_REGISTRY.approvals.map((approval) => ({
        ...approval,
        expiresAt: "2026-07-16",
        reviewAt: "2026-07-16",
      })),
    }

    expect(() => validateExternalEvidence(SANGFOR_KOREA_CASES, expiredRegistry, approvalDate)).toThrow("no active approval")
  })
})
