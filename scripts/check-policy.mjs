import { readdir, readFile } from "node:fs/promises"
import { extname, join, relative } from "node:path"

const roots = ["app", "components", "lib", "scripts", "tests"]
const rootFiles = ["next.config.ts", "playwright.config.ts", "vitest.config.ts"]
const sourceExtensions = new Set([".js", ".mjs", ".ts", ".tsx"])
const forbidden = [
  { label: "focused or disabled test", pattern: /\b(?:describe|it|test)\.(?:only|skip)\s*\(/u },
  { label: "TypeScript suppression", pattern: /@ts-(?:ignore|expect-error)/u },
  { label: "unsafe any assertion", pattern: /\bas\s+any\b/u },
  { label: "unsafe unknown assertion", pattern: /\bas\s+unknown\b/u },
  {
    label: "type assertion",
    pattern: /\bas\s+(?!const\b)(?:[A-Z_$][\w$<>{}\[\]|&., ]*|string\b|number\b|boolean\b)/u,
  },
  { label: "explicit any type", pattern: /:\s*any\b/u },
  { label: "non-null assertion", pattern: /[\w)\]]!(?:[.[]|\s*[,;)\]])/u },
  { label: "lint suppression", pattern: /eslint-disable/u },
]

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name)
      return entry.isDirectory() ? collectFiles(path) : [path]
    }),
  )
  return nested.flat()
}

function readYamlList(source, key) {
  const lines = source.split("\n")
  const headingIndex = lines.findIndex((line) => line === `${key}:`)
  if (headingIndex === -1) {
    return []
  }

  const values = []
  for (const line of lines.slice(headingIndex + 1)) {
    if (line.length > 0 && !line.startsWith("  ")) {
      break
    }
    if (line.startsWith("  - ")) {
      values.push(line.slice(4))
    }
  }
  return values
}

async function validateSupplyChainRegister() {
  const [workspaceSource, registerSource] = await Promise.all([
    readFile("pnpm-workspace.yaml", "utf8"),
    readFile("security/supply-chain-exceptions.json", "utf8"),
  ])
  const register = JSON.parse(registerSource)
  if (typeof register !== "object" || register === null || !Array.isArray(register.exceptions)) {
    return { activeCount: 0, violations: ["supply-chain register: exceptions must be an array"] }
  }

  const settings = ["minimumReleaseAgeExclude", "trustPolicyExclude"]
  const active = settings.flatMap((setting) =>
    readYamlList(workspaceSource, setting).map((packageName) => `${setting}:${packageName}`),
  )
  const registered = []
  const auditIgnored = []
  const violations = []
  const today = new Date().toISOString().slice(0, 10)

  for (const entry of register.exceptions) {
    if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
      violations.push("supply-chain register: every exception must be an object")
      continue
    }

    const requiredText = ["package", "setting", "reason", "owner", "introducedDate", "reviewDate", "removalCondition"]
    for (const field of requiredText) {
      if (typeof entry[field] !== "string" || entry[field].trim().length === 0) {
        violations.push(`supply-chain register: ${field} must be a non-empty string`)
      }
    }

    if (entry.setting === "auditIgnoreGhsa") {
      if (typeof entry.package !== "string" || !/^GHSA-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}$/u.test(entry.package)) {
        violations.push("supply-chain register: auditIgnoreGhsa package must be a GHSA id")
      } else {
        auditIgnored.push(entry.package)
      }
    } else if (typeof entry.setting === "string" && typeof entry.package === "string") {
      registered.push(`${entry.setting}:${entry.package}`)
    }
    if (typeof entry.introducedDate === "string" && !/^\d{4}-\d{2}-\d{2}$/u.test(entry.introducedDate)) {
      violations.push(`supply-chain register: invalid introducedDate for ${entry.package ?? "unknown"}`)
    }
    if (typeof entry.reviewDate === "string") {
      if (!/^\d{4}-\d{2}-\d{2}$/u.test(entry.reviewDate)) {
        violations.push(`supply-chain register: invalid reviewDate for ${entry.package ?? "unknown"}`)
      } else if (entry.reviewDate < today) {
        violations.push(`supply-chain register: expired reviewDate for ${entry.package ?? "unknown"}`)
      }
    }
  }

  if (new Set(registered).size !== registered.length || new Set(auditIgnored).size !== auditIgnored.length) {
    violations.push("supply-chain register: duplicate exception entry")
  }
  const missing = active.filter((entry) => !registered.includes(entry))
  const inactive = registered.filter((entry) => !active.includes(entry))
  for (const entry of missing) {
    violations.push(`supply-chain register: missing active exception ${entry}`)
  }
  for (const entry of inactive) {
    violations.push(`supply-chain register: inactive exception ${entry}`)
  }

  return { activeCount: active.length, auditCount: auditIgnored.length, violations }
}

const files = [...rootFiles, ...(await Promise.all(roots.map(collectFiles))).flat()]
  .filter((file) => sourceExtensions.has(extname(file)))
  .filter((file) => file !== "scripts/check-policy.mjs")
  .sort()

const violations = []
for (const file of files) {
  const source = await readFile(file, "utf8")
  for (const rule of forbidden) {
    if (rule.pattern.test(source)) {
      violations.push(`${relative(process.cwd(), file)}: ${rule.label}`)
    }
  }
}

const supplyChain = await validateSupplyChainRegister()
violations.push(...supplyChain.violations)

if (violations.length > 0) {
  console.error("Policy violations detected:")
  for (const violation of violations) {
    console.error(`- ${violation}`)
  }
  process.exitCode = 1
} else {
  console.log(`Policy scan passed for ${files.length} source files.`)
  console.log(
    `Supply-chain exception register matched ${supplyChain.activeCount} active exceptions.`,
  )
  console.log(`Audit advisory exceptions: ${supplyChain.auditCount}.`)
}
