import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home, { HOME_HEADING } from "@/app/page"

describe("Home", () => {
  it("exposes the approved homepage message as the page heading", async () => {
    // Given
    render(await Home())

    // When
    const heading = screen.getByRole("heading", { level: 1, name: HOME_HEADING })

    // Then
    expect(heading).toBeVisible()
  })
})
