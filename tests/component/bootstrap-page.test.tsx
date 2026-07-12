import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home, { BOOTSTRAP_HEADING } from "@/app/page"

describe("Home", () => {
  it("exposes the bootstrap outcome as the page heading", () => {
    // Given
    render(<Home />)

    // When
    const heading = screen.getByRole("heading", { level: 1, name: BOOTSTRAP_HEADING })

    // Then
    expect(heading).toBeVisible()
  })
})
