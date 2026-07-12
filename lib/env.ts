import { z } from "zod"

const PublicEnvironmentSchema = z
  .object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  })
  .readonly()

export type PublicEnvironment = z.infer<typeof PublicEnvironmentSchema>

export function parsePublicEnvironment(input: unknown): PublicEnvironment {
  return PublicEnvironmentSchema.parse(input)
}
