import { describe, expect, it } from "vitest"
import {
  approvalRegistrySchema,
  contentRecordSchema,
  createContentDigest,
  validateContentRecords,
} from "@/lib/content"
import type { ApprovalRegistry, ContentMeta, ContentRecord } from "@/lib/content"

const now = new Date("2026-07-13T00:00:00.000Z")

const baseRecord = contentRecordSchema.parse({
    body: "검증된 공개 본문",
    filePath: "/content/services/ko/hci-private-cloud.mdx",
    meta: {
      contentId: "service-hci-private-cloud",
      title: "HCI와 프라이빗 클라우드",
      summary: "운영 기준에서 시작하는 통합 인프라 검토",
      slug: "hci-private-cloud",
      locale: "ko",
      status: "approved",
      publishedAt: "2026-07-01",
      updatedAt: "2026-07-01",
      audience: ["customer"],
      tags: ["hci"],
      evidenceRefs: ["01_BLUEPRINT.md:20-32"],
      claimIds: ["claim-service-hci-methodology"],
      approvalRefs: ["approval-service-hci-methodology"],
      relatedContent: [],
    },
    type: "service",
})

function createRecord(overrides: Readonly<Partial<ContentMeta>> = {}): ContentRecord {
  return { ...baseRecord, meta: { ...baseRecord.meta, ...overrides } }
}

type ApprovalEntry = ApprovalRegistry["approvals"][number]

function createApprovals(
  overrides: Readonly<Partial<ApprovalEntry>> = {},
  record: ContentRecord = baseRecord,
) {
  return approvalRegistrySchema.parse({
    approvals: [
      {
        approvalId: "approval-service-hci-methodology",
        contentId: "service-hci-private-cloud",
        claimId: "claim-service-hci-methodology",
        locale: "ko",
        approverRole: "planning-source-owner",
        source: "approved-planning-package",
        approvedAt: "2026-07-01",
        publicScopes: ["website:public:ko"],
        evidenceRefs: ["01_BLUEPRINT.md:20-32"],
        contentSha256: createContentDigest(record),
        reviewAt: "2026-10-01",
        expiresAt: "2027-07-01",
        ...overrides,
      },
    ],
  })
}

describe("validateContentRecords", () => {
  it("rejects duplicate slugs within a type and locale", () => {
    const records = [createRecord(), createRecord({ contentId: "service-hci-copy" })]

    expect(() => validateContentRecords(records, createApprovals(), now)).toThrow("[slug] duplicate")
  })

  it.each([
    ["missing evidence", createRecord({ evidenceRefs: [] }), createApprovals(), "[evidenceRefs]"],
    ["wrong scope", createRecord(), createApprovals({ publicScopes: ["website:internal:ko"] }), "[approvalRefs]"],
    [
      "expired approval",
      createRecord(),
      createApprovals({ reviewAt: "2026-07-12", expiresAt: "2026-07-12" }),
      "[approvalRefs]",
    ],
    ["overdue review", createRecord(), createApprovals({ reviewAt: "2026-07-12" }), "[approvalRefs]"],
  ])("rejects approved content with %s", (_label, record, approvals, field) => {
    expect(() => validateContentRecords([record], approvals, now)).toThrow(field)
  })

  it("accepts the named review and expiry date for the full calendar day", () => {
    const boundaryNow = new Date("2027-07-01T23:59:59.999Z")
    const approvals = createApprovals({ reviewAt: "2027-07-01", expiresAt: "2027-07-01" })

    expect(() => validateContentRecords([baseRecord], approvals, boundaryNow)).not.toThrow()
  })

  it("accepts an active replacement when an older referenced approval is expired", () => {
    const active = createApprovals().approvals[0]
    expect(active).toBeDefined()
    if (active === undefined) {
      return
    }
    const approvals = approvalRegistrySchema.parse({
      approvals: [
        {
          ...active,
          approvalId: "approval-service-hci-expired",
          reviewAt: "2026-07-12",
          expiresAt: "2026-07-12",
        },
        active,
      ],
    })
    const record = createRecord({
      approvalRefs: ["approval-service-hci-expired", "approval-service-hci-methodology"],
    })

    expect(() => validateContentRecords([record], approvals, now)).not.toThrow()
  })

  it.each([
    ["changed approved content", createRecord({ summary: "승인 후 변경된 공개 요약입니다." }), createApprovals(), "contentSha256"],
    ["unmatched evidence", baseRecord, createApprovals({ evidenceRefs: ["different-evidence"] }), "evidenceRefs"],
  ])("rejects %s", (_label, record, approvals, field) => {
    expect(() => validateContentRecords([record], approvals, now)).toThrow(field)
  })

  it("rejects approved content with a future publication date", () => {
    const record = createRecord({ publishedAt: "2026-07-14" })

    expect(() => validateContentRecords([record], createApprovals({}, record), now)).toThrow("[publishedAt]")
  })

  it("rejects a related slug that is absent from the locale corpus", () => {
    const record = createRecord({ relatedContent: ["insight:missing-insight"] })

    expect(() => validateContentRecords([record], createApprovals(), now)).toThrow(
      "[relatedContent] missing insight:missing-insight",
    )
  })
})
