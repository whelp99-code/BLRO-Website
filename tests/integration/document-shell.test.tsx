import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import RootLayout from "@/app/layout"
import Home, { HOME_HEADING } from "@/app/page"

describe("homepage document shell", () => {
  it("joins the Korean document language and accessible page contract", async () => {
    // Given
    const page = await Home()

    // When
    const markup = renderToStaticMarkup(<RootLayout>{page}</RootLayout>)

    // Then
    expect(markup).toContain('lang="ko"')
    expect(markup).toContain(
      `<h1 aria-label="${HOME_HEADING}" id="home-heading" class="blro-heading blro-heading--display">`,
    )
    expect(markup).toContain('href="#main-content"')
    expect(markup).toContain('<header class="blro-site-header">')
    expect(markup).toContain('<main id="main-content" tabindex="-1"><div class="home-page">')
    expect(markup).toContain('<footer class="blro-site-footer">')
  })
})
