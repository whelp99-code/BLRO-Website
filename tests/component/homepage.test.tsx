import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home from "@/app/page"

const BUSINESS_AXES = [
  "Enterprise Technology",
  "Security & Connectivity",
  "Partner & Market Development",
  "AI & Automation",
] as const

const AUDIENCES = ["기업 고객", "국내 파트너", "글로벌 벤더"] as const

const HOME_ACTIONS = [
  ["기술 프로젝트 상담", "#customer-path"],
  ["파트너 공동사업", "#partner-path"],
  ["한국 시장 진출", "#vendor-path"],
] as const

describe("BLRO basic homepage", () => {
  it("publishes the approved company definition and homepage message hierarchy", async () => {
    render(await Home())

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "글로벌 기술을 한국 시장의 실제 사업으로 연결합니다.",
      }),
    ).toBeVisible()
    expect(
      screen.getByLabelText(
        "BLRO는 글로벌 엔터프라이즈 기술을 한국 시장의 실제 사업으로 연결하고, 고객·파트너·벤더가 도입·판매·운영할 수 있는 체계를 만드는 B2B 기술사업 회사다.",
      ),
    ).toBeVisible()

    for (const axis of BUSINESS_AXES) {
      expect(screen.getByRole("heading", { level: 3, name: axis })).toBeVisible()
    }
    for (const audience of AUDIENCES) {
      expect(screen.getByRole("heading", { level: 3, name: audience })).toBeVisible()
    }
  })

  it("connects every major action to a rendered same-page destination", async () => {
    const { container } = render(await Home())

    for (const [label, destination] of HOME_ACTIONS) {
      expect(screen.getAllByRole("link", { name: label }).at(0)).toHaveAttribute("href", destination)
      expect(container.querySelector(destination)).toBeInTheDocument()
    }
  })

  it("renders approved insight evidence without exposing review project templates", async () => {
    render(await Home())

    const evidence = screen.getByRole("region", { name: "공개된 실무 인사이트" })
    expect(within(evidence).getAllByRole("article")).toHaveLength(3)
    expect(within(evidence).getByText("HCI 도입 전 확인할 운영 기준")).toBeVisible()
    expect(screen.queryByText(/template/iu)).not.toBeInTheDocument()
    expect(screen.queryByText(/제조업 HCI와 DR 전환/iu)).not.toBeInTheDocument()
  })

  it("preserves approved final copy and unbroken Korean and technical phrases", async () => {
    const { container } = render(await Home())

    expect(screen.getByRole("heading", { name: "제품이나 과제가 아직 명확하지 않아도 괜찮습니다." })).toBeVisible()
    expect(screen.getByText("현재 환경과 목표에서 시작해 검토 범위를 함께 정리합니다.")).toBeVisible()
    expect(container.querySelectorAll(".home-hero h1 .blro-nowrap")).toHaveLength(2)
    expect(screen.getByText("도입·판매·운영")).toHaveClass("blro-nowrap")
    expect(screen.getByText("확보해야 합니다.")).toHaveClass("blro-nowrap")
    expect(screen.getByText("해외지사에서 SASE와 SD‑WAN의 역할")).toBeVisible()
    expect(screen.getByText("에이전트 오케스트레이션")).toHaveClass("capability-index__scope-term")
    expect(screen.getByText("설계·PoC·구축·안정화까지")).toHaveClass("blro-nowrap")
    expect(screen.getByText("프리세일즈·구축 역량을")).toHaveClass("blro-nowrap")
  })
})
