import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import AiAutomationPage from "@/app/ai-automation/page"
import BlroPage from "@/app/blro/page"
import PartnerBusinessPage from "@/app/partner-business/page"
import ProjectsPage from "@/app/projects/page"

describe("strategic public routes", () => {
  it.each([
    ["/blro", BlroPage, "전환을 제품 선택으로"],
    ["/ai-automation", AiAutomationPage, "통제 가능한 흐름에서"],
    ["/partner-business", PartnerBusinessPage, "제안과 수행 사이의"],
    ["/projects", ProjectsPage, "고객명이 아닌"],
  ])("renders %s with a decision framework and a consultation route", (_route, Page, heading) => {
    const markup = renderToStaticMarkup(<Page />)

    expect(markup).toContain(heading)
    expect(markup).toContain("DECISION FRAMEWORK")
    expect(markup).toMatch(/href="\/contact\?type=(customer-project|partner-collaboration)"/u)
  })
})
