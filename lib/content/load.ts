import type { Dirent } from "node:fs"
import { readdir, readFile } from "node:fs/promises"
import { basename, join } from "node:path"
import { ContentValidationError } from "./error"
import { approvalRegistrySchema, CONTENT_LOCALES, CONTENT_TYPES } from "./schema"
import type { ApprovalRegistry, ContentLocale, ContentRecord, ContentType } from "./schema"
import { parseContentSource } from "./source"

const TYPE_DIRECTORIES = {
  insight: "insights",
  project: "projects",
  service: "services",
} as const satisfies Readonly<Record<ContentType, string>>

async function readTextFile(filePath: string, field: string): Promise<string> {
  try {
    return await readFile(filePath, "utf8")
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentValidationError(filePath, field, "could not be read")
    }
    throw error
  }
}

async function loadDirectory(
  contentRoot: string,
  type: ContentType,
  locale: ContentLocale,
): Promise<readonly ContentRecord[]> {
  const directory = join(contentRoot, TYPE_DIRECTORIES[type], locale)
  let entries: readonly Dirent<string>[]
  try {
    entries = await readdir(directory, { withFileTypes: true })
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentValidationError(directory, "directory", "could not be read")
    }
    throw error
  }
  const paths = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => join(directory, entry.name))
    .sort()
  return Promise.all(
    paths.map(async (filePath) => {
      const source = await readTextFile(filePath, "file")
      const record = parseContentSource({ filePath, source, type })
      if (record.meta.locale !== locale) {
        throw new ContentValidationError(filePath, "locale", `must match ${locale} directory`)
      }
      if (record.meta.slug !== basename(filePath, ".mdx")) {
        throw new ContentValidationError(filePath, "slug", "must match filename")
      }
      return record
    }),
  )
}

export async function loadContentRecords(contentRoot: string): Promise<readonly ContentRecord[]> {
  const batches = await Promise.all(
    CONTENT_TYPES.flatMap((type) =>
      CONTENT_LOCALES.map((locale) => loadDirectory(contentRoot, type, locale)),
    ),
  )
  return batches.flat()
}

export async function loadApprovalRegistry(contentRoot: string): Promise<ApprovalRegistry> {
  const filePath = join(contentRoot, "_registry", "public-approvals.json")
  const source = await readTextFile(filePath, "registry")
  let data: unknown
  try {
    data = JSON.parse(source)
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new ContentValidationError(filePath, "registry", "invalid JSON")
    }
    throw error
  }
  const result = approvalRegistrySchema.safeParse(data)
  if (!result.success) {
    const issue = result.error.issues[0]
    const field = issue === undefined ? "registry" : issue.path.map(String).join(".")
    const reason = issue?.code === "unrecognized_keys" ? "contains unrecognized fields" : issue?.message
    throw new ContentValidationError(filePath, field, reason ?? "invalid approval registry")
  }
  return result.data
}
