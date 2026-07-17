import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("lead storage migration", () => {
  it("stores only an encrypted payload and excludes plaintext PII columns", async () => {
    const sql = await readFile(join(process.cwd(), "workers/lead-gateway/migrations/0001_leads.sql"), "utf8")

    expect(sql).toContain("encrypted_payload BLOB NOT NULL")
    expect(sql).not.toMatch(/\b(company|name|work_email|email|phone|message)\b/iu)
  })

  it("stores only allowlisted non-PII analytics dimensions", async () => {
    const sql = await readFile(join(process.cwd(), "workers/lead-gateway/migrations/0002_analytics_events.sql"), "utf8")

    expect(sql).toContain("CREATE TABLE IF NOT EXISTS analytics_events")
    expect(sql).toContain("expires_at TEXT NOT NULL")
    expect(sql).not.toMatch(/\b(company|name|work_email|email|phone|message|ip|user_agent|referrer)\b/iu)
  })
})
