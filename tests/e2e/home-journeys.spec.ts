import { expect, test } from "@playwright/test"
import { HOME_HEADING } from "@/app/page"

const VIEWPORTS = [
  { name: "mobile", width: 320, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
] as const

const HOME_ACTIONS = [
  ["도입·운영 상담하기", "/contact?type=customer-project&role=customer"],
  ["협력 제안하기", "/contact?type=partner-collaboration&role=partner"],
  ["기술 자료 찾기", "/engineer"],
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
    await expect(page.getByRole("heading", { level: 2, name: "역할을 고릅니다." })).toBeVisible()
    await expect(page.locator("#hci-door-heading")).toBeVisible()

    const homeActions = page.locator(".home-hero")
    for (const [label, href] of HOME_ACTIONS) {
      await expect(homeActions.getByRole("link", { name: label })).toHaveAttribute("href", href)
    }

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(0)

    await expect(page.getByRole("img", { name: /도입, 전환, 구축, 운영, 기술지원/u })).toBeVisible()
    await expect(page.locator(".life-step")).toHaveCount(5)
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
  await primaryNavigation.getByRole("button", { name: "솔루션 메뉴" }).focus()
  await page.keyboard.press("End")
  await expect(primaryNavigation.locator(".blro-nav-cta")).toBeFocused()
})

test("keeps consent and the primary decision action inside the narrowest mobile viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 })
  await page.goto("/", { waitUntil: "networkidle" })

  const consentBox = await page.locator(".blro-consent").boundingBox()
  const primaryActionBox = await page.locator(".home-action--primary").boundingBox()

  expect(consentBox).not.toBeNull()
  expect(primaryActionBox).not.toBeNull()

  if (!consentBox || !primaryActionBox) return

  const boxesIntersect = !(
    consentBox.y + consentBox.height <= primaryActionBox.y ||
    primaryActionBox.y + primaryActionBox.height <= consentBox.y ||
    consentBox.x + consentBox.width <= primaryActionBox.x ||
    primaryActionBox.x + primaryActionBox.width <= consentBox.x
  )

  expect(boxesIntersect).toBe(false)
  expect(primaryActionBox.y + primaryActionBox.height).toBeLessThanOrEqual(844)
})

test("keeps the primary decision action visible and process stages readable on desktop", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto("/", { waitUntil: "networkidle" })

  const primaryActionBox = await page.locator(".home-action--primary").boundingBox()
  expect(primaryActionBox).not.toBeNull()
  expect((primaryActionBox?.y ?? 900) + (primaryActionBox?.height ?? 1)).toBeLessThanOrEqual(900)

  const stages = page.locator(".life-step")
  await expect(stages).toHaveCount(5)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
})

test("loads analytics and sends an allowlisted event only after consent", async ({ page }) => {
  let analyticsPayload: unknown
  await page.route("https://static.cloudflareinsights.com/**", (route) => route.fulfill({ body: "", contentType: "application/javascript", status: 200 }))
  await page.route("**/v1/analytics", async (route) => {
    analyticsPayload = JSON.parse(route.request().postData() ?? "{}")
    await route.fulfill({ body: JSON.stringify({ status: "accepted" }), contentType: "application/json", status: 202 })
  })
  await page.goto("/", { waitUntil: "networkidle" })

  await expect(page.locator('script[data-blro-analytics="cloudflare"]')).toHaveCount(0)
  expect(analyticsPayload).toBeUndefined()

  await page.getByRole("button", { name: "동의" }).click()
  await expect(page.locator('script[data-blro-analytics="cloudflare"]')).toHaveCount(1)
  const analyticsRequest = page.waitForRequest(
    (request) => new URL(request.url()).pathname === "/v1/analytics",
    { timeout: 10_000 },
  )
  await page.getByTestId("hero-primary-cta").click()

  const deliveredPayload: unknown = (await analyticsRequest).postDataJSON()
  expect(deliveredPayload).toMatchObject({
    name: "cta_clicked",
    properties: { ctaId: "hero-customer-diagnostic", landingPath: "/", placement: "hero" },
  })
  expect(deliveredPayload).not.toHaveProperty("properties.email")
})
