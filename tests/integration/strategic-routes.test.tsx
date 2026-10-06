import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import AiAutomationPage from "@/app/ai-automation/page"
import BlroPage from "@/app/blro/page"
import PartnerBusinessPage from "@/app/partner-business/page"
import ProjectsPage from "@/app/projects/page"

describe("strategic public routes", () => {
  it.each([
    ["/ai-automation", AiAutomationPage, "통제 가능한 흐름에서"],
    ["/partner-business", PartnerBusinessPage, "제안과 수행 사이의"],
  ])("renders %s with a decision framework and a consultation route", (_route, Page, heading) => {
    const markup = renderToStaticMarkup(<Page />)

    expect(markup).toContain(heading)
    expect(markup).toContain("DECISION FRAMEWORK")
    expect(markup).toMatch(/href="\/contact\?type=(customer-project|partner-collaboration)"/u)
  })

  it("renders the company page as what BLRO does and does not do", () => {
    const markup = renderToStaticMarkup(<BlroPage />)

    expect(markup).toContain("하는 일")
    expect(markup).toContain("하지 않는 일")
    expect(markup).not.toContain("DECISION FRAMEWORK")
    expect(markup).toContain("customer-project")
  })

  it("renders projects as a judgment process without customer names", () => {
    const markup = renderToStaticMarkup(<ProjectsPage />)

    expect(markup).toContain("고객명이 아닌")
    expect(markup).toContain("01")
    expect(markup).not.toContain("시큐아이")
    expect(markup).toContain("customer-project")
  })
})
