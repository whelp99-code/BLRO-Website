import { expect, test } from "@playwright/test"

test("keeps the contact intake form enabled for production public defaults", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "load" })

  await expect(page.getByRole("heading", { level: 1, name: /역할을 먼저 고릅니다/u })).toBeVisible()
  await expect(page.getByText("안전한 접수 서비스 연결을 준비 중입니다.")).toHaveCount(0)
  await expect(page.getByRole("button", { name: "상담 요청 보내기" })).toBeEnabled()
})

test("routes the engineer support link to its matching inquiry guide", async ({ page }) => {
  await page.goto("/engineer", { waitUntil: "load" })

  await page.getByRole("link", { name: "기술 지원 문의" }).click()

  await expect(page).toHaveURL(/\/contact\?type=general&role=engineer$/u)
  await expect(page.getByRole("link", { name: "기술 엔지니어", exact: true }).last()).toHaveAttribute("aria-current", "page")
  await expect(page.getByRole("complementary", { name: "기술 지원 문의" })).toBeVisible()
})
