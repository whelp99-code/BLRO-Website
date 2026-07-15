import { describe, expect, it } from "vitest"
import { decryptPayload, encryptPayload } from "@/workers/lead-gateway/src/payload-crypto"

const encryptionKey = "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY="

describe("lead payload encryption", () => {
  it("encrypts a payload with AES-GCM and restores it only with the same key", async () => {
    const input = { workEmail: "operator@example.com", message: "Sensitive environment context" }
    const encrypted = await encryptPayload(input, encryptionKey, "v1")

    expect(encrypted.keyVersion).toBe("v1")
    expect(encrypted.ciphertext).not.toContain(input.workEmail)
    expect(await decryptPayload(encrypted, encryptionKey)).toEqual(input)
  })

  it("rejects an invalid encryption key before payload storage", async () => {
    await expect(encryptPayload({ value: "test" }, "invalid", "v1")).rejects.toThrow("PII_ENCRYPTION_KEY")
  })
})
