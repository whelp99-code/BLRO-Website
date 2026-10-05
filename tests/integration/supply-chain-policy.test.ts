import { spawnSync } from "node:child_process"
import { describe, expect, it } from "vitest"

describe("supply-chain policy register", () => {
  it("is validated one-to-one with active pnpm exceptions", () => {
    // Given
    const expectedReceipt = "Supply-chain exception register matched 2 active exceptions."

    // When
    const result = spawnSync(process.execPath, ["scripts/check-policy.mjs"], {
      cwd: process.cwd(),
      encoding: "utf8",
    })

    // Then
    expect(result.status).toBe(0)
    expect(result.stdout).toContain(expectedReceipt)
  })
})
