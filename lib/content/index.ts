import { join } from "node:path"
import { loadApprovalRegistry, loadContentRecords } from "./load"
import type { ContentLocale, ContentRecord, ContentType } from "./schema"
import { validateContentRecords } from "./validate"
import { compileContentBody } from "./source"

type CreateContentIndexInput = {
  readonly contentRoot: string
  readonly now: Date
}

export type ContentIndex = {
  readonly allRecords: readonly ContentRecord[]
  readonly publicRecords: readonly ContentRecord[]
}

function isPublished(record: ContentRecord, now: Date): boolean {
  if (record.meta.status !== "approved" || record.meta.publishedAt === undefined) {
    return false
  }
  return Date.parse(`${record.meta.publishedAt}T00:00:00.000Z`) <= now.getTime()
}

function compareRecords(left: ContentRecord, right: ContentRecord): number {
  const leftDate = left.meta.publishedAt ?? left.meta.updatedAt
  const rightDate = right.meta.publishedAt ?? right.meta.updatedAt
  const dateOrder = rightDate.localeCompare(leftDate)
  return dateOrder === 0 ? left.meta.slug.localeCompare(right.meta.slug) : dateOrder
}

export async function createContentIndex(input: CreateContentIndexInput): Promise<ContentIndex> {
  const [records, registry] = await Promise.all([
    loadContentRecords(input.contentRoot),
    loadApprovalRegistry(input.contentRoot),
  ])
  validateContentRecords(records, registry, input.now)
  await Promise.all(records.map(compileContentBody))
  return {
    allRecords: [...records].sort(compareRecords),
    publicRecords: records.filter((record) => isPublished(record, input.now)).sort(compareRecords),
  }
}

export async function getPublicContent(
  type: ContentType,
  locale: ContentLocale,
  now: Date,
): Promise<readonly ContentRecord[]> {
  const index = await createContentIndex({ contentRoot: join(process.cwd(), "content"), now })
  return index.publicRecords.filter((record) => record.type === type && record.meta.locale === locale)
}

export { ContentValidationError } from "./error"
export { loadApprovalRegistry, loadContentRecords } from "./load"
export {
  approvalRegistrySchema,
  CONTENT_AUDIENCES,
  CONTENT_LOCALES,
  CONTENT_STATUSES,
  CONTENT_TYPES,
  contentLocaleSchema,
  contentMetaSchema,
  contentRecordSchema,
  contentTypeSchema,
} from "./schema"
export type {
  ApprovalRegistry,
  ContentLocale,
  ContentMeta,
  ContentRecord,
  ContentType,
} from "./schema"
export { compileContentBody, parseContentSource } from "./source"
export { validateContentRecords } from "./validate"
export { createContentDigest } from "./validate"
