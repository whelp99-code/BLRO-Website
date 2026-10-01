import { expect, test } from "@playwright/test"

test("supports mouse-free desktop navigation and semantic landmarks", async ({ page }) => {
  // Given
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/", { waitUntil: "networkidle" })
  const solutions = page.getByRole("button", { name: "솔루션 메뉴" })

  // When
  await solutions.focus()
  await page.keyboard.press("Enter")

  // Then
  await expect(solutions).toHaveAttribute("aria-expanded", "true")
  await expect(page.getByRole("link", { name: "네트워크·보안" })).toBeVisible()

  // When
  await page.keyboard.press("Escape")

  // Then
  await expect(solutions).toHaveAttribute("aria-expanded", "false")
  await expect(solutions).toBeFocused()
  await expect(page.getByRole("banner")).toBeVisible()
  await expect(page.getByRole("main")).toBeVisible()
  await expect(page.getByRole("contentinfo")).toBeVisible()
})

test("opens and dismisses the mobile menu with focus and scroll restoration", async ({ page }) => {
  // Given
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto("/", { waitUntil: "networkidle" })
  const trigger = page.getByRole("button", { name: "메뉴 열기" })
  await expect(page.getByRole("navigation", { name: "주 내비게이션" })).toBeVisible()

  // When
  await trigger.click()

  // Then
  await expect(page.getByRole("dialog", { name: "모바일 내비게이션" })).toBeVisible()
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden")

  // When
  await page.keyboard.press("Escape")

  // Then
  await expect(page.getByRole("dialog", { name: "모바일 내비게이션" })).toHaveCount(0)
  await expect(trigger).toBeFocused()
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden")
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320)
})

test("moves keyboard focus from the skip link to the global main landmark", async ({ page }) => {
  // Given
  await page.setViewportSize({ width: 768, height: 1024 })
  await page.goto("/", { waitUntil: "networkidle" })

  // When
  await page.keyboard.press("Tab")
  await expect(page.getByRole("link", { name: "본문으로 건너뛰기" })).toBeFocused()
  await page.keyboard.press("Enter")

  // Then
  await expect(page.locator("#main-content")).toBeFocused()
})
