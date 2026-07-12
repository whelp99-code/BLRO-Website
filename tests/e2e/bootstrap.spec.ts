import { expect, test } from "@playwright/test"

const BOOTSTRAP_HEADING = "BLRO Website Foundation"

test("serves the accessible bootstrap page without browser errors", async ({ context, page }) => {
  // Given
  const consoleErrors: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text())
    }
  })

  // When
  const response = await page.goto("/", { waitUntil: "networkidle" })

  // Then
  expect(response?.status()).toBe(200)
  await expect(page.getByRole("heading", { level: 1, name: BOOTSTRAP_HEADING })).toBeVisible()
  const favicon = page.locator('link[rel="icon"]')
  await expect(favicon).toHaveAttribute("href", "/favicon.ico")

  const faviconPage = await context.newPage()
  const faviconResponse = await faviconPage.goto("/favicon.ico", { waitUntil: "load" })
  expect(faviconResponse?.status()).toBe(200)
  expect(faviconResponse?.headers()["content-type"]).toContain("image/x-icon")
  await faviconPage.close()

  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      }),
  )
  expect(consoleErrors).toEqual([])
})
