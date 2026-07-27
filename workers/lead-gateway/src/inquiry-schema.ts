import { z } from "zod"
import { PRIVACY_NOTICE_VERSION } from "../../../lib/privacy-notice"

export const inquiryTopics = ["vmware-hci", "vdi", "security", "sase", "dr", "customer-project", "partner-collaboration", "vendor-korea-entry", "general"] as const

const inquirySchema = z.object({
  company: z.string().trim().min(2).max(100),
  name: z.string().trim().min(2).max(80),
  workEmail: z.string().trim().email().max(254),
  phone: z.string().trim().min(7).max(30).optional(),
  topic: z.enum(inquiryTopics),
  message: z.string().trim().min(1).max(2000).optional(),
  consent: z.object({ privacyVersion: z.literal(PRIVACY_NOTICE_VERSION), marketing: z.literal(false) }),
  attribution: z.object({
    landingPath: z.string().startsWith("/").max(240),
    ctaId: z.string().trim().min(1).max(120),
    utm: z.record(z.string(), z.string().trim().max(120)).default({}),
  }),
  turnstileToken: z.string().trim().min(1).max(4096),
  website: z.string().max(0).optional(),
}).strict()

export type Inquiry = z.infer<typeof inquirySchema>

export function parseInquiry(value: unknown): Inquiry | undefined {
  const result = inquirySchema.safeParse(value)
  return result.success ? result.data : undefined
}
