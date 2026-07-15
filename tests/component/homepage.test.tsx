import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home from "@/app/page"

const BUSINESS_AXES = [
  "가상화 · HCI · 프라이빗 클라우드",
  "보안 운영 · SASE · 연결성",
  "VDI · 디지털 워크스페이스",
  "검증 · 전환 · 운영 인수",
] as const

const AUDIENCES = ["기업 고객", "국내 파트너", "글로벌 벤더"] as const

const HOME_ACTIONS = [
  ["전환 진단 범위 확인", "/contact?type=customer-project"],
  ["파트너 공동사업을 검토 중이신가요?", "/contact?type=partner-collaboration"],
  ["한국 시장 진출을 준비 중이신가요?", "/contact?type=vendor-korea-entry"],
] as const

describe("BLRO basic homepage", () => {
  it("publishes the approved company definition and homepage message hierarchy", async () => {
    render(await Home())

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "가상화·보안 전환, 무엇부터 검증할지 먼저 정리합니다.",
      }),
    ).toBeVisible()
    expect(
      screen.getByLabelText(
        "BLRO는 인프라·보안 전환을 앞둔 기업이 기술 비교를 실제 운영 판단으로 바꿀 수 있도록, 현황 진단부터 검증·전환·안정화까지 연결하는 기술사업 회사다.",
      ),
    ).toBeVisible()

    for (const axis of BUSINESS_AXES) {
      expect(screen.getByRole("heading", { level: 3, name: axis })).toBeVisible()
    }
    for (const audience of AUDIENCES) {
      expect(screen.getByRole("heading", { level: 3, name: audience })).toBeVisible()
    }
    expect(screen.getByRole("heading", { level: 2, name: "첫 상담에서 함께 정리하는 것" })).toBeVisible()
    expect(screen.getByRole("heading", { level: 3, name: "우선 검증할 워크로드와 제외 범위" })).toBeVisible()
  })

  it("connects every major action to a typed inquiry destination", async () => {
    render(await Home())

    for (const [label, destination] of HOME_ACTIONS) {
      expect(screen.getAllByRole("link", { name: label }).at(0)).toHaveAttribute("href", destination)
    }
  })

  it("renders approved insight evidence without exposing review project templates", async () => {
    render(await Home())

    const evidence = screen.getByRole("region", { name: "공개된 실무 인사이트" })
    expect(within(evidence).getAllByRole("article")).toHaveLength(8)
    expect(within(evidence).getByText("HCI 도입 전 확인할 운영 기준")).toBeVisible()
    expect(document.querySelector("#insight-secure-access-selection")).toBeInTheDocument()
    expect(document.querySelector("#insight-sase-sdwan-roles")).toBeInTheDocument()
    expect(screen.queryByText(/template/iu)).not.toBeInTheDocument()
    expect(screen.queryByText(/제조업 HCI와 DR 전환/iu)).not.toBeInTheDocument()
  })

  it("preserves approved final copy and unbroken Korean and technical phrases", async () => {
    const { container } = render(await Home())

    expect(screen.getByRole("heading", { name: "무엇부터 바꿔야 할지 명확하지 않아도 괜찮습니다." })).toBeVisible()
    expect(screen.getByText("현재 환경, 업무 영향, 허용 가능한 전환 위험을 기준으로 첫 번째 검증 범위를 함께 정리합니다.")).toBeVisible()
    expect(container.querySelectorAll(".home-hero h1 .blro-nowrap")).toHaveLength(1)
    expect(screen.getByText("무엇부터 검증할지")).toHaveClass("blro-nowrap")
    expect(screen.getByText("운영 판단")).toHaveClass("blro-nowrap")
    expect(screen.getByText("해외지사에서 SASE와 SD‑WAN의 역할")).toBeVisible()
    expect(screen.getByText("전환 리허설")).toHaveClass("capability-index__scope-term")
    expect(screen.getByText("설계·PoC·전환·안정화")).toHaveClass("blro-nowrap")
  })
})
