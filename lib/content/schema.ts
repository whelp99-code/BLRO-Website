import { z } from "zod"

export const CONTENT_TYPES = ["service", "project", "insight"] as const
export const CONTENT_LOCALES = ["ko", "en"] as const
export const CONTENT_STATUSES = ["draft", "review", "approved", "archived"] as const
export const CONTENT_AUDIENCES = ["customer", "partner", "vendor"] as const

export const contentTypeSchema = z.enum(CONTENT_TYPES)
export const contentLocaleSchema = z.enum(CONTENT_LOCALES)
const contentStatusSchema = z.enum(CONTENT_STATUSES)
const contentAudienceSchema = z.enum(CONTENT_AUDIENCES)
const identifierSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/u)
const dateSchema = z.preprocess(
  (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/u)
    .refine((value) => {
      const parsed = new Date(`${value}T00:00:00.000Z`)
      return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value
    }, "invalid calendar date"),
)
const referenceSchema = z.string().min(3).max(240)

export const contentMetaSchema = z
  .object({
    contentId: identifierSchema,
    title: z.string().trim().min(3).max(100),
    summary: z.string().trim().min(10).max(240),
    slug: identifierSchema,
    locale: contentLocaleSchema,
    status: contentStatusSchema,
    publishedAt: dateSchema.optional(),
    updatedAt: dateSchema,
    audience: z.array(contentAudienceSchema).min(1),
    tags: z.array(identifierSchema).min(1),
    evidenceRefs: z.array(referenceSchema).default([]),
    approvedBy: identifierSchema.optional(),
    claimIds: z.array(identifierSchema).default([]),
    approvalRefs: z.array(identifierSchema).default([]),
    relatedContent: z
      .array(z.string().regex(/^(?:service|project|insight):[a-z0-9]+(?:-[a-z0-9]+)*$/u))
      .default([]),
  })
  .strict()
  .superRefine((meta, context) => {
    if (meta.status !== "approved") {
      return
    }
    if (meta.publishedAt === undefined) {
      context.addIssue({ code: "custom", message: "required for approved content", path: ["publishedAt"] })
    }
    if (meta.evidenceRefs.length === 0) {
      context.addIssue({ code: "custom", message: "required for approved content", path: ["evidenceRefs"] })
    }
    if (meta.claimIds.length === 0) {
      context.addIssue({ code: "custom", message: "required for approved content", path: ["claimIds"] })
    }
    if (meta.approvalRefs.length === 0) {
      context.addIssue({ code: "custom", message: "required for approved content", path: ["approvalRefs"] })
    }
  })

export const contentRecordSchema = z.object({
  body: z.string(),
  filePath: z.string().min(1),
  meta: contentMetaSchema,
  type: contentTypeSchema,
})

const approvalSchema = z
  .object({
    approvalId: identifierSchema,
    contentId: identifierSchema,
    claimId: identifierSchema,
    locale: contentLocaleSchema,
    approverRole: z.string().min(3).max(80),
    source: z.string().min(3).max(120),
    approvedAt: dateSchema,
    publicScopes: z.array(z.string().min(3).max(80)).min(1),
    evidenceRefs: z.array(referenceSchema).min(1),
    contentSha256: z.string().regex(/^[a-f0-9]{64}$/u),
    reviewAt: dateSchema,
    expiresAt: dateSchema,
  })
  .strict()
  .superRefine((approval, context) => {
    if (approval.reviewAt < approval.approvedAt) {
      context.addIssue({ code: "custom", message: "must not precede approvedAt", path: ["reviewAt"] })
    }
    if (approval.expiresAt < approval.reviewAt) {
      context.addIssue({ code: "custom", message: "must not precede reviewAt", path: ["expiresAt"] })
    }
  })

export const approvalRegistrySchema = z
  .object({ approvals: z.array(approvalSchema) })
  .strict()
  .superRefine((registry, context) => {
    const seen = new Set<string>()
    registry.approvals.forEach((approval, index) => {
      if (seen.has(approval.approvalId)) {
        context.addIssue({ code: "custom", message: "duplicate approval ID", path: ["approvals", index, "approvalId"] })
      }
      seen.add(approval.approvalId)
    })
  })

type ParsedContentMeta = z.infer<typeof contentMetaSchema>
type ParsedContentRecord = z.infer<typeof contentRecordSchema>
type ParsedApprovalRegistry = z.infer<typeof approvalRegistrySchema>

export type ContentType = z.infer<typeof contentTypeSchema>
export type ContentLocale = z.infer<typeof contentLocaleSchema>
export type ContentMeta = Readonly<ParsedContentMeta> & {
  readonly audience: readonly z.infer<typeof contentAudienceSchema>[]
  readonly tags: readonly string[]
  readonly evidenceRefs: readonly string[]
  readonly claimIds: readonly string[]
  readonly approvalRefs: readonly string[]
  readonly relatedContent: readonly string[]
}
export type ContentRecord = Readonly<Omit<ParsedContentRecord, "meta">> & {
  readonly meta: ContentMeta
}
export type ApprovalRegistry = Readonly<ParsedApprovalRegistry> & {
  readonly approvals: readonly Readonly<ParsedApprovalRegistry["approvals"][number]>[]
}
