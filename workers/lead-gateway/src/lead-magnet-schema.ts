import { z } from "zod"
import { PRIVACY_NOTICE_VERSION } from "../../../lib/privacy-notice"

const leadMagnetSchema = z.object({
  company: z.string().trim().min(2).max(100),
  name: z.string().trim().min(2).max(80),
  workEmail: z.string().trim().email().max(254),
  consent: z.object({
    marketing: z.literal(false),
    privacyVersion: z.literal(PRIVACY_NOTICE_VERSION),
  }),
  attribution: z.object({
    landingPath: z.string().startsWith("/").max(240),
    ctaId: z.string().trim().min(1).max(120),
    utm: z.record(z.string(), z.string().trim().max(120)).default({}),
  }),
  turnstileToken: z.string().trim().min(1).max(4096),
  website: z.string().max(0).optional(),
}).strict()

export type LeadMagnetRequest = z.infer<typeof leadMagnetSchema>

export function parseHciReadinessRequest(value: unknown): LeadMagnetRequest | undefined {
  const result = leadMagnetSchema.safeParse(value)
  return result.success ? result.data : undefined
}
