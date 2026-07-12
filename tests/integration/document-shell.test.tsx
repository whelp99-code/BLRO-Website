import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import RootLayout from "@/app/layout"
import Home, { BOOTSTRAP_HEADING } from "@/app/page"

describe("bootstrap document shell", () => {
  it("joins the Korean document language and accessible page contract", () => {
    // Given
    const page = <Home />

    // When
    const markup = renderToStaticMarkup(<RootLayout>{page}</RootLayout>)

    // Then
    expect(markup).toContain('lang="ko"')
    expect(markup).toContain(`<h1 id="bootstrap-heading">${BOOTSTRAP_HEADING}</h1>`)
  })
})
