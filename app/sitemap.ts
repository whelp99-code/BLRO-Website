import { join } from "node:path"
import type { MetadataRoute } from "next"
import { createContentIndex } from "@/lib/content"
import { absoluteUrl } from "@/lib/site"

const STATIC_ROUTES = ["/", "/blro", "/customer", "/partner", "/engineer", "/solutions", "/solutions/hci", "/ai-automation", "/partner-business", "/projects", "/insights", "/diagnostic-sample", "/contact", "/privacy", "/terms"] as const

export const dynamic = "force-static"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const index = await createContentIndex({ contentRoot: join(process.cwd(), "content"), now: new Date() })
  const contentRoutes = index.publicRecords
    .filter((record) => record.type === "service" || record.type === "insight")
    .map((record) => ({
    url: absoluteUrl(record.type === "service" ? `/solutions/${record.meta.slug}` : `/insights/${record.meta.slug}`),
    lastModified: record.meta.updatedAt,
    }))

  return [
    ...STATIC_ROUTES.map((route) => ({ url: absoluteUrl(route) })),
    ...contentRoutes,
  ]
}
