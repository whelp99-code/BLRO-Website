import { readFile } from "node:fs/promises"
import { spawnSync } from "node:child_process"

const registerSource = await readFile("security/supply-chain-exceptions.json", "utf8")
const register = JSON.parse(registerSource)
const today = new Date().toISOString().slice(0, 10)
const ignored = []

if (typeof register !== "object" || register === null || !Array.isArray(register.exceptions)) {
  console.error("audit: exception register is unreadable")
  process.exit(1)
}

for (const entry of register.exceptions) {
  if (typeof entry !== "object" || entry === null || entry.setting !== "auditIgnoreGhsa") {
    continue
  }
  if (typeof entry.reviewDate !== "string" || entry.reviewDate < today) {
    console.error(`audit: expired or invalid exception ${entry.package ?? "unknown"}`)
    process.exit(1)
  }
  if (typeof entry.package === "string") {
    ignored.push(entry.package)
  }
}

const result = spawnSync("pnpm", ["audit", "--json"], { encoding: "utf8" })
const stdout = result.stdout ?? ""
const jsonStart = stdout.indexOf("{")
if (jsonStart === -1) {
  console.error(result.stderr)
  console.error("audit: pnpm audit did not return JSON")
  process.exit(1)
}

const data = JSON.parse(stdout.slice(jsonStart))
const advisories = data.advisories
if (typeof advisories !== "object" || advisories === null) {
  console.error("audit: advisories missing")
  process.exit(1)
}

const blocking = []
const present = []
for (const advisory of Object.values(advisories)) {
  if (typeof advisory !== "object" || advisory === null) {
    continue
  }
  const severity = advisory.severity
  if (severity !== "high" && severity !== "critical") {
    continue
  }
  const id = advisory.github_advisory_id
  if (typeof id !== "string") {
    blocking.push(`${severity} ${advisory.module_name} missing GHSA id`)
    continue
  }
  present.push(id)
  if (!ignored.includes(id)) {
    blocking.push(`${severity} ${advisory.module_name} ${id}`)
  }
}

const stale = ignored.filter((id) => !present.includes(id))
if (blocking.length > 0 || stale.length > 0) {
  for (const item of blocking) {
    console.error(`audit: blocking ${item}`)
  }
  for (const id of stale) {
    console.error(`audit: documented exception is no longer reported, remove ${id}`)
  }
  process.exit(1)
}

console.log(`High and critical audit passed with ${ignored.length} documented exception.`)
