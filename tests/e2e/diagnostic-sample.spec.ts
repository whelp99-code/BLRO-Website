import { expect, test } from "@playwright/test"

const VIEWPORTS = [
  { name: "mobile", width: 375, height: 844 },
  { name: "tablet", width: 768, height: 900 },
  { name: "desktop", width: 1280, height: 900 },
] as const

for (const viewport of VIEWPORTS) {
  test(`keeps the diagnostic deliverable complete at ${viewport.name}`, async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text())
    })
    await page.setViewportSize(viewport)
    const response = await page.goto("/diagnostic-sample", { waitUntil: "networkidle" })

    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: "고객이 가져가는 것은 제품 목록이 아니라, 다음 결정을 내릴 문서입니다." })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "현재 판단, 필요한 증거, 결정 규칙" })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "상담 후 고객에게 남는 것" })).toBeVisible()
    await expect(page.getByRole("link", { name: "내 환경의 진단 범위 확인" })).toHaveAttribute("href", "/contact?type=customer-project")
    await expect(page.getByText(/특정 고객의 환경·성과가 아닌 가상 시나리오/u)).toBeVisible()

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)
    expect(consoleErrors).toEqual([])
  })
}
