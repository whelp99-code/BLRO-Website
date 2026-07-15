import { expect, test } from "@playwright/test"
import { HOME_HEADING } from "@/app/page"

const VIEWPORTS = [
  { name: "mobile", width: 320, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const

const HOME_ACTIONS = [
  ["전환 진단 범위 확인", "/contact?type=customer-project"],
  ["파트너 공동사업을 검토 중이신가요?", "/contact?type=partner-collaboration"],
  ["한국 시장 진출을 준비 중이신가요?", "/contact?type=vendor-korea-entry"],
] as const

for (const viewport of VIEWPORTS) {
  test(`keeps the complete homepage usable at ${viewport.name}`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text())
    })
    await page.setViewportSize(viewport)

    const response = await page.goto("/", { waitUntil: "networkidle" })

    expect(response?.status()).toBe(200)
    await expect(
      page.getByRole("heading", {
        level: 1,
        name: HOME_HEADING,
      }),
    ).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "고객이 먼저 확인해야 할 네 가지" })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "결정이 필요한 지점에서 시작합니다" })).toBeVisible()

    const homeActions = page.locator(".home-hero")
    for (const [label, href] of HOME_ACTIONS) {
      await expect(homeActions.getByRole("link", { name: label })).toHaveAttribute("href", href)
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    expect(consoleErrors).toEqual([])
  })
}

test("preserves the skip-link and keyboard focus path", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" })

  await page.keyboard.press("Tab")
  const skipLink = page.getByRole("link", { name: "본문으로 건너뛰기" })
  await expect(skipLink).toBeFocused()
  await skipLink.press("Enter")
  await expect(page.locator("#main-content")).toBeFocused()

  const primaryNavigation = page.getByRole("navigation", { name: "주 내비게이션" })
  await primaryNavigation.getByRole("button", { name: "Solutions 메뉴" }).focus()
  await page.keyboard.press("End")
  await expect(primaryNavigation.locator(".blro-nav-cta")).toBeFocused()
})
