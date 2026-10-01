import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home, { HOME_HEADING, HOME_SUPPLY_LINE } from "@/app/page"

const HOME_ACTIONS = [
  ["도입·운영 상담하기", "/contact?type=customer-project&role=customer"],
  ["협력 제안하기", "/contact?type=partner-collaboration&role=partner"],
  ["기술 자료 찾기", "/engineer"],
] as const

describe("BLRO motion homepage", () => {
  it("publishes the two open headlines and keeps the three roles apart", () => {
    render(<Home />)

    expect(screen.getByRole("heading", { level: 1, name: HOME_HEADING })).toBeVisible()
    expect(screen.getByText(HOME_SUPPLY_LINE)).toBeVisible()
    expect(screen.getByText("주식회사 베를로")).toBeVisible()
    expect(screen.getByRole("heading", { level: 2, name: "다섯 초 안에 역할을 고릅니다." })).toBeVisible()
    expect(screen.getByText("기업 고객")).toBeVisible()
    expect(screen.getByText("국내 파트너")).toBeVisible()
    expect(screen.getByText("기술 엔지니어")).toBeVisible()
    expect(screen.getByRole("img", { name: /도입, 전환, 구축, 운영, 기술지원/u })).toBeVisible()
    expect(screen.queryByText("시큐아이")).not.toBeInTheDocument()
    expect(screen.queryByText(/24시간/u)).not.toBeInTheDocument()
  })

  it("connects each role action without merging the paths", () => {
    render(<Home />)
    const hero = within(screen.getByRole("region", { name: HOME_HEADING }))

    for (const [label, destination] of HOME_ACTIONS) {
      expect(hero.getByRole("link", { name: label })).toHaveAttribute("href", destination)
    }
    expect(screen.getByRole("link", { name: "고객 안내 보기" })).toHaveAttribute("href", "/customer")
    expect(screen.getByRole("link", { name: "역할 표 보기" })).toHaveAttribute("href", "/partner")
    expect(screen.getByRole("link", { name: "자료 흐름 보기" })).toHaveAttribute("href", "/engineer")
    expect(screen.getByRole("link", { name: "HCI 상세" })).toHaveAttribute("href", "/solutions/hci")
  })
})
