import { expect, test } from "@playwright/test"

test("방화벽·IDS·IPS 장면이 데스크톱에서 장치별 판정을 보여 준다", async ({ page }) => {
  const consoleErrors: string[] = []
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text())
  })
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/", { waitUntil: "networkidle" })

  const flow = page.locator(".sf")
  await flow.scrollIntoViewIfNeeded()
  await expect(page.getByRole("heading", { level: 3, name: "방화벽, IDS, IPS는 무엇이 다를까요?" })).toBeVisible()
  await expect(flow.getByRole("button", { name: "방화벽", exact: true, pressed: true })).toBeVisible()

  await flow.getByRole("button", { name: "IDS", exact: true }).click()
  await expect(flow.getByText("IDS 경보 → 도착")).toHaveCount(2)
  await flow.getByRole("button", { name: "IPS", exact: true }).click()
  await expect(flow.getByText("IPS 차단 → 차단됨")).toHaveCount(2)
  await flow.getByRole("button", { name: "함께 구성", exact: true }).click()
  await expect(flow.getByText("방화벽 차단 → 차단됨")).toHaveCount(1)

  await flow.getByRole("button", { name: /허용된 포트 안의 공격 패턴/u }).click()
  await expect(flow.locator(".sf__result")).toContainText("IPS: 위협으로 판단해 서버에 닿기 전에 차단합니다.")
  expect(consoleErrors).toEqual([])
})

test("방화벽·IDS·IPS 장면은 모바일에서 2D로 보이고 가로 넘침이 없다", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 })
  await page.goto("/", { waitUntil: "networkidle" })

  const flow = page.locator(".sf")
  await flow.scrollIntoViewIfNeeded()
  await expect(flow).toHaveAttribute("data-mode", "2d")
  await expect(flow.getByRole("img", { name: /방화벽 구성/u })).toBeVisible()
  await flow.getByRole("button", { name: "IPS", exact: true }).click()
  await expect(flow.getByRole("img", { name: /IPS 구성/u })).toBeVisible()
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})
