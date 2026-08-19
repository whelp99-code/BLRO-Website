import { z } from "zod"
import { resolvePublicSiteUrl } from "@/lib/public-runtime"

const PublicEnvironmentSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_SITE_URL: z.string().optional(),
  })
  .transform((environment) => ({
    NODE_ENV: environment.NODE_ENV,
    NEXT_PUBLIC_SITE_URL: resolvePublicSiteUrl(environment.NEXT_PUBLIC_SITE_URL, environment.NODE_ENV),
  }))
  .pipe(
    z.object({
      NODE_ENV: z.enum(["development", "test", "production"]),
      NEXT_PUBLIC_SITE_URL: z.url(),
    }).readonly(),
  )

export type PublicEnvironment = z.infer<typeof PublicEnvironmentSchema>

export function parsePublicEnvironment(input: unknown): PublicEnvironment {
  return PublicEnvironmentSchema.parse(input)
}
