import { afterEach, describe, expect, it, vi } from "vitest"
import { createClientUuid } from "@/lib/client-id"

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/u

describe("client UUID generation", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("returns a valid v4 identifier when randomUUID is unavailable", () => {
    vi.stubGlobal("crypto", { getRandomValues: (bytes: Uint8Array) => bytes.fill(17) })

    expect(createClientUuid()).toMatch(UUID_V4)
  })

  it("keeps a valid fallback when the crypto API is unavailable", () => {
    vi.stubGlobal("crypto", undefined)
    vi.spyOn(Math, "random").mockReturnValue(0.5)

    expect(createClientUuid()).toMatch(UUID_V4)
  })
})
