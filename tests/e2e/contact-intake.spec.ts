import { expect, test } from "@playwright/test"

test("keeps the contact intake form enabled for production public defaults", async ({ page }) => {
  await page.goto("/contact", { waitUntil: "load" })

  await expect(page.getByRole("heading", { level: 1, name: /전환의 기준/u })).toBeVisible()
  await expect(page.getByText("안전한 접수 서비스 연결을 준비 중입니다.")).toHaveCount(0)
  await expect(page.getByRole("button", { name: "상담 요청 보내기" })).toBeEnabled()
})
