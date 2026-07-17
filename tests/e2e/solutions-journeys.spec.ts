import { expect, test } from "@playwright/test"

const SOLUTIONS = [
  { breadcrumb: "HCI & Private Cloud", insight: "HCI 도입 전 확인할 운영 기준", insightSlug: "hci-readiness-checklist", slug: "hci-private-cloud", title: "HCI와 프라이빗 클라우드" },
  { breadcrumb: "VDI & Digital Workspace", insight: "VDI 사용자 유형별 자원 산정", insightSlug: "vdi-capacity-planning", slug: "vdi-digital-workspace", title: "VDI와 디지털 워크스페이스" },
  { breadcrumb: "Backup & Disaster Recovery", insight: "RPO와 RTO를 업무 기준으로 합의하는 방법", insightSlug: "recovery-objectives-guide", slug: "backup-disaster-recovery", title: "백업과 재해복구" },
  { breadcrumb: "Network Security", insight: "ZTNA와 SSL VPN 적용 기준 비교", insightSlug: "secure-access-selection", slug: "network-security", title: "네트워크와 보안" },
  { breadcrumb: "SASE & Global Connectivity", insight: "해외지사에서 SASE와 SD-WAN의 역할", insightSlug: "sase-sdwan-roles", slug: "sase-global-connectivity", title: "SASE와 글로벌 연결" },
] as const

function normalizeDisplayText(value: string): string {
  return value.replaceAll("\u00a0", " ").replaceAll("\u2011", "-")
}

test("opens the Solutions hub from the desktop menu", async ({ page }) => {
  // Given
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto("/", { waitUntil: "networkidle" })
  const menu = page.getByRole("button", { name: "Solutions 메뉴" })

  // When
  await menu.click()
  const overview = page.getByRole("link", { name: "Solutions 전체 개요 보기" })
  await overview.click()

  // Then
  await expect(page).toHaveURL(/\/solutions$/u)
  await expect(
    page.getByRole("heading", { level: 1, name: "운영 조건에서 시작하는 다섯 가지 솔루션" }),
  ).toBeVisible()
  for (const solution of SOLUTIONS) {
    await expect(page.getByRole("link", { name: solution.title })).toHaveAttribute(
      "href",
      `/solutions/${solution.slug}`,
    )
  }
})

for (const solution of SOLUTIONS) {
  test(`renders approved content and structured data for ${solution.slug}`, async ({ page }) => {
    // Given
    const consoleErrors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text())
    })

    // When
    const response = await page.goto(`/solutions/${solution.slug}`, { waitUntil: "networkidle" })

    // Then
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: solution.title })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "검토가 필요한 상황" })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "BLRO의 역할" })).toBeVisible()
    await expect(page.getByRole("heading", { level: 2, name: "주요 산출물" })).toBeVisible()
    await expect(page.locator(".solution-next").getByRole("link", { name: "전환 진단 범위 확인" })).toHaveAttribute(
      "href",
      "/contact?type=customer-project",
    )
    const relatedInsightLink = page.getByRole("link", { name: `관련 인사이트: ${solution.insight}` })
    await expect(relatedInsightLink).toHaveAttribute("href", `/insights/${solution.insightSlug}`)
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toContainText(solution.breadcrumb)
    expect(await page.locator('#main-content script[type="application/ld+json"]').textContent()).toContain(
      '"@type":"Service"',
    )
    expect(await page.title()).toContain(solution.title)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
    expect(consoleErrors).toEqual([])

    await relatedInsightLink.click()
    await page.waitForURL(`**/insights/${solution.insightSlug}`)
    expect(normalizeDisplayText(await page.getByRole("heading", { level: 1 }).textContent() ?? "")).toContain(
      normalizeDisplayText(solution.insight),
    )
  })
}

test("returns a 404 status for an unknown static solution slug", async ({ page }) => {
  // Given / When
  const response = await page.goto("/solutions/not-a-solution", { waitUntil: "networkidle" })

  // Then
  expect(response?.status()).toBe(404)
  await expect(page.getByText("manufacturing-hci-dr-template")).toHaveCount(0)
})

for (const viewport of [
  { name: "mobile", width: 320, height: 800 },
  { name: "tablet", width: 768, height: 900 },
  { name: "desktop", width: 1440, height: 1000 },
] as const) {
  test(`keeps the Solutions hub usable at ${viewport.name}`, async ({ page }) => {
    // Given
    const consoleErrors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") consoleErrors.push(message.text())
    })
    await page.setViewportSize(viewport)

    // When
    const response = await page.goto("/solutions", { waitUntil: "networkidle" })

    // Then
    expect(response?.status()).toBe(200)
    await expect(page.getByRole("heading", { level: 1, name: "운영 조건에서 시작하는 다섯 가지 솔루션" })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(0)
    expect(consoleErrors).toEqual([])
  })
}
