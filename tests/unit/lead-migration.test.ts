// @vitest-environment node
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { DatabaseSync } from "node:sqlite"
import { describe, expect, it } from "vitest"

describe("lead storage migration", () => {
  it("stores only an encrypted payload and excludes plaintext PII columns", async () => {
    const sql = await readFile(join(process.cwd(), "workers/lead-gateway/migrations/0001_leads.sql"), "utf8")

    expect(sql).toContain("encrypted_payload BLOB NOT NULL")
    expect(sql).not.toMatch(/\b(company|name|work_email|email|phone|message)\b/iu)
  })

  it("stores only allowlisted non-PII analytics dimensions", async () => {
    const sql = await readFile(join(process.cwd(), "workers/lead-gateway/migrations/0002_analytics_events.sql"), "utf8")
    const database = new DatabaseSync(":memory:")
    database.exec(sql)
    const columns = database.prepare("PRAGMA table_info(analytics_events)").all() as readonly { readonly name: string }[]
    database.close()

    expect(columns.map((column) => column.name)).toEqual([
      "event_id",
      "received_at",
      "event_name",
      "cta_id",
      "placement",
      "landing_path",
      "topic",
      "field",
      "expires_at",
    ])
  })
})
