import { expect, test } from "@playwright/test"

const VIEWPORTS = [
  { name: "mobile", width: 320, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const

const HOME_ACTIONS = [
  ["기술 프로젝트 상담", "customer-path"],
  ["파트너 공동사업", "partner-path"],
  ["한국 시장 진출", "vendor-path"],
] as const

for (const viewport of VIEWPORTS) {
  test(`keeps the complete homepage usable at ${viewport.name}`, async ({ page }) => {
    const consoleErrors: string[] = []
    const failedRequests: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text())
    })
    page.on("requestfailed", (request) => failedRequests.push(request.url()))
    await page.setViewportSize(viewport)

    const response = await page.goto("/", { waitUntil: "networkidle" })

    expect(response?.status()).toBe(200)
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "글로벌 기술을 한국 시장의 실제 사업으로 연결합니다.",
      }),
    ).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "네 가지 사업축" })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "세 가지 시작점" })).toBeVisible()

    for (const [label, targetId] of HOME_ACTIONS) {
      await page.getByRole("link", { name: label }).first().click()
      await expect(page).toHaveURL(new RegExp(`#${targetId}$`, "u"))
      await expect(page.locator(`#${targetId}`)).toBeInViewport()
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    expect(consoleErrors).toEqual([])
    expect(failedRequests).toEqual([])
  })
}

test("preserves the skip-link and keyboard focus path", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" })

  await page.keyboard.press("Tab")
  const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" })
  await expect(skipLink).toBeFocused()
  await skipLink.press("Enter")
  await expect(page.locator("#main-content")).toBeFocused()

  await page.keyboard.press("Tab")
  await expect(page.getByRole("link", { name: "기술 프로젝트 상담" }).first()).toBeFocused()
})
