import { createHash } from "node:crypto"
import { ContentValidationError } from "./error"
import type { ApprovalRegistry, ContentRecord, ContentType } from "./schema"

function currentDate(now: Date): string {
  return now.toISOString().slice(0, 10)
}

export function createContentDigest(record: ContentRecord): string {
  const approvedMeta = Object.fromEntries(
    Object.entries(record.meta).filter(([key]) => key !== "approvalRefs"),
  )
  const payload = {
    type: record.type,
    body: record.body,
    meta: approvedMeta,
  }
  return createHash("sha256").update(JSON.stringify(payload)).digest("hex")
}

function validateUniqueRecords(records: readonly ContentRecord[]): void {
  const slugs = new Map<string, string>()
  const contentIds = new Map<string, string>()
  for (const record of records) {
    const slugKey = `${record.type}:${record.meta.locale}:${record.meta.slug}`
    if (slugs.has(slugKey)) {
      throw new ContentValidationError(record.filePath, "slug", `duplicate ${record.meta.slug}`)
    }
    slugs.set(slugKey, record.filePath)
    if (contentIds.has(record.meta.contentId)) {
      throw new ContentValidationError(record.filePath, "contentId", `duplicate ${record.meta.contentId}`)
    }
    contentIds.set(record.meta.contentId, record.filePath)
  }
}

function relatedParts(reference: string): readonly [ContentType, string] {
  const separator = reference.indexOf(":")
  const type = reference.slice(0, separator)
  const slug = reference.slice(separator + 1)
  if (type === "service" || type === "project" || type === "insight") {
    return [type, slug]
  }
  throw new ContentValidationError("content registry", "relatedContent", "invalid content type")
}

function validateRelatedRecords(records: readonly ContentRecord[]): void {
  const available = new Set(records.map((record) => `${record.type}:${record.meta.locale}:${record.meta.slug}`))
  for (const record of records) {
    for (const reference of record.meta.relatedContent) {
      const [type, slug] = relatedParts(reference)
      if (!available.has(`${type}:${record.meta.locale}:${slug}`)) {
        throw new ContentValidationError(record.filePath, "relatedContent", `missing ${reference}`)
      }
    }
  }
}

function validateApproval(record: ContentRecord, registry: ApprovalRegistry, now: Date): void {
  if (record.meta.status !== "approved") {
    return
  }
  if (record.meta.evidenceRefs.length === 0) {
    throw new ContentValidationError(record.filePath, "evidenceRefs", "approved content requires evidence")
  }
  if (record.meta.claimIds.length === 0) {
    throw new ContentValidationError(record.filePath, "claimIds", "approved content requires a claim")
  }
  if (record.meta.approvalRefs.length === 0) {
    throw new ContentValidationError(record.filePath, "approvalRefs", "approved content requires approval")
  }
  const today = currentDate(now)
  if (record.meta.publishedAt !== undefined && record.meta.publishedAt > today) {
    throw new ContentValidationError(record.filePath, "publishedAt", "approved content cannot be future dated")
  }
  const allowedScope = `website:public:${record.meta.locale}`
  const contentSha256 = createContentDigest(record)
  for (const claimId of record.meta.claimIds) {
    const approved = registry.approvals.some(
      (candidate) =>
        record.meta.approvalRefs.includes(candidate.approvalId) &&
        candidate.contentId === record.meta.contentId &&
        candidate.claimId === claimId &&
        candidate.locale === record.meta.locale &&
        candidate.publicScopes.includes(allowedScope) &&
        candidate.approvedAt <= today &&
        candidate.reviewAt >= today &&
        candidate.expiresAt >= today &&
        candidate.contentSha256 === contentSha256 &&
        record.meta.evidenceRefs.every((reference) => candidate.evidenceRefs.includes(reference)),
    )
    if (!approved) {
      const matchingApprovals = registry.approvals.filter(
        (candidate) =>
          record.meta.approvalRefs.includes(candidate.approvalId) &&
          candidate.contentId === record.meta.contentId &&
          candidate.claimId === claimId &&
          candidate.locale === record.meta.locale,
      )
      const digestMatched = matchingApprovals.some((candidate) => candidate.contentSha256 === contentSha256)
      const evidenceMatched = matchingApprovals.some(
        (candidate) =>
          candidate.contentSha256 === contentSha256 &&
          record.meta.evidenceRefs.every((reference) => candidate.evidenceRefs.includes(reference)),
      )
      const field = !digestMatched ? "contentSha256" : !evidenceMatched ? "evidenceRefs" : "approvalRefs"
      throw new ContentValidationError(record.filePath, field, `no active public approval for ${claimId}`)
    }
  }
}

export function validateContentRecords(
  records: readonly ContentRecord[],
  registry: ApprovalRegistry,
  now: Date,
): void {
  validateUniqueRecords(records)
  validateRelatedRecords(records)
  for (const record of records) {
    validateApproval(record, registry, now)
  }
}
