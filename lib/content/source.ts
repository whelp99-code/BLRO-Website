import { compile } from "@mdx-js/mdx"
import matter from "gray-matter"
import { ContentValidationError } from "./error"
import { contentMetaSchema } from "./schema"
import type { ContentRecord, ContentType } from "./schema"

const ALLOWED_MDX_COMPONENTS = new Set(["Callout", "Checklist"])
const URL_ATTRIBUTES = new Set(["href", "src", "url"])
const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:"])

type MdxAttribute = {
  readonly name?: string
  readonly type: string
  readonly value?: unknown
}

type MdxNode = {
  readonly attributes?: readonly MdxAttribute[]
  readonly children?: readonly MdxNode[]
  readonly name?: string | null
  readonly type: string
  readonly url?: string
}

type ParseContentSourceInput = {
  readonly filePath: string
  readonly source: string
  readonly type: ContentType
}

function fieldFromPath(path: readonly PropertyKey[]): string {
  const field = path.map(String).join(".")
  return field.length > 0 ? field : "frontmatter"
}

function issueReason(issue: { readonly code: string; readonly message: string }): string {
  return issue.code === "unrecognized_keys" ? "contains unrecognized fields" : issue.message
}

function validateCoercedDate(filePath: string, frontmatter: string, field: string, value: unknown): void {
  if (!(value instanceof Date)) {
    return
  }
  const match = new RegExp(`^${field}:\\s*([^\\s#]+)`, "mu").exec(frontmatter)
  const original = match?.[1]
  if (original === undefined || value.toISOString().slice(0, 10) !== original) {
    throw new ContentValidationError(filePath, field, "invalid calendar date")
  }
}

function validateBody(filePath: string, body: string): void {
  if (/^\s*(?:import|export)\s/mu.test(body)) {
    throw new ContentValidationError(filePath, "body", "MDX import and export are not allowed")
  }
  if (/<\/?[a-z][^>]*>/u.test(body)) {
    throw new ContentValidationError(filePath, "body", "raw HTML is not allowed")
  }
  if (/\]\(\s*javascript:/iu.test(body)) {
    throw new ContentValidationError(filePath, "body", "unsafe link protocol")
  }
  if (/[{}]/u.test(body)) {
    throw new ContentValidationError(filePath, "body", "MDX expressions are not allowed")
  }
  for (const match of body.matchAll(/<\/?([A-Z][A-Za-z0-9]*)\b[^>]*>/gu)) {
    const component = match[1]
    if (component !== undefined && !ALLOWED_MDX_COMPONENTS.has(component)) {
      throw new ContentValidationError(filePath, "body", `component ${component} is not allowed`)
    }
  }
}

function validateUrl(filePath: string, value: string): void {
  const url = value.trim()
  const relative =
    url.startsWith("#") ||
    url.startsWith("./") ||
    url.startsWith("../") ||
    (url.startsWith("/") && !url.startsWith("//"))
  if (relative) {
    return
  }
  try {
    const parsed = new URL(url)
    if (SAFE_URL_PROTOCOLS.has(parsed.protocol)) {
      return
    }
  } catch (error) {
    if (!(error instanceof TypeError)) {
      throw error
    }
  }
  throw new ContentValidationError(filePath, "body", "unsafe URL protocol")
}

function validateMdxNode(filePath: string, node: MdxNode): void {
  if ((node.type === "link" || node.type === "image" || node.type === "definition") && node.url !== undefined) {
    validateUrl(filePath, node.url)
  }
  if (node.type === "mdxJsxFlowElement" || node.type === "mdxJsxTextElement") {
    if (node.name === null || node.name === undefined || !ALLOWED_MDX_COMPONENTS.has(node.name)) {
      throw new ContentValidationError(filePath, "body", `component ${node.name ?? "unknown"} is not allowed`)
    }
    for (const attribute of node.attributes ?? []) {
      if (attribute.name !== undefined && URL_ATTRIBUTES.has(attribute.name)) {
        if (typeof attribute.value !== "string") {
          throw new ContentValidationError(filePath, "body", `component ${attribute.name} must be a string`)
        }
        validateUrl(filePath, attribute.value)
      }
    }
  }
  for (const child of node.children ?? []) {
    validateMdxNode(filePath, child)
  }
}

function createMdxSafetyPlugin(filePath: string): () => (tree: MdxNode) => void {
  return () => (tree) => validateMdxNode(filePath, tree)
}

export function parseContentSource(input: ParseContentSourceInput): ContentRecord {
  let parsed: ReturnType<typeof matter>
  try {
    parsed = matter(input.source)
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentValidationError(input.filePath, "frontmatter", "could not be parsed")
    }
    throw error
  }
  validateCoercedDate(input.filePath, input.source, "publishedAt", parsed.data["publishedAt"])
  validateCoercedDate(input.filePath, input.source, "updatedAt", parsed.data["updatedAt"])
  const result = contentMetaSchema.safeParse(parsed.data)
  if (!result.success) {
    const issue = result.error.issues[0]
    const field = issue === undefined ? "frontmatter" : fieldFromPath(issue.path)
    const reason = issue === undefined ? "is invalid" : issueReason(issue)
    throw new ContentValidationError(input.filePath, field, reason)
  }
  validateBody(input.filePath, parsed.content)
  return {
    body: parsed.content.trim(),
    filePath: input.filePath,
    meta: result.data,
    type: input.type,
  }
}

export async function compileContentBody(record: ContentRecord): Promise<string> {
  validateBody(record.filePath, record.body)
  try {
    const compiled = await compile(record.body, {
      outputFormat: "program",
      remarkPlugins: [createMdxSafetyPlugin(record.filePath)],
    })
    return String(compiled)
  } catch (error) {
    if (error instanceof Error) {
      throw new ContentValidationError(record.filePath, "body", "could not be compiled")
    }
    throw error
  }
}
