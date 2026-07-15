import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

describe("lead storage migration", () => {
  it("stores only an encrypted payload and excludes plaintext PII columns", async () => {
    const sql = await readFile(join(process.cwd(), "workers/lead-gateway/migrations/0001_leads.sql"), "utf8")

    expect(sql).toContain("encrypted_payload BLOB NOT NULL")
    expect(sql).not.toMatch(/\b(company|name|work_email|email|phone|message)\b/iu)
  })
})
