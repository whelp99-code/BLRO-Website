import { fireEvent, render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Home from "@/app/page"
import { SecurityFlow } from "@/components/redesign/security-flow"

describe("SecurityFlow 장면", () => {
  it("방화벽이 기본이고 네 가지 통신의 판정을 글로 보여 준다", () => {
    render(<SecurityFlow />)

    expect(screen.getByRole("button", { name: "방화벽", pressed: true })).toBeVisible()
    expect(screen.getAllByText("방화벽 허용 → 도착")).toHaveLength(3)
    expect(screen.getAllByText("방화벽 차단 → 차단됨")).toHaveLength(1)
    expect(screen.getAllByRole("button", { pressed: false }).length).toBeGreaterThan(3)
  })

  it("장치를 바꾸면 같은 통신의 판정이 달라진다", () => {
    render(<SecurityFlow />)

    fireEvent.click(screen.getByRole("button", { name: "IDS" }))
    expect(screen.getByRole("button", { name: "IDS", pressed: true })).toBeVisible()
    expect(screen.getAllByText("IDS 경보 → 도착")).toHaveLength(2)
    expect(screen.getByText(/통신을 막지 않으므로/u)).toBeVisible()

    fireEvent.click(screen.getByRole("button", { name: "IPS" }))
    expect(screen.getAllByText("IPS 차단 → 차단됨")).toHaveLength(2)
    expect(screen.getByText(/정상 통신을 위협으로 잘못 판단하면/u)).toBeVisible()

    fireEvent.click(screen.getByRole("button", { name: "함께 구성" }))
    expect(screen.getAllByText("방화벽 허용 · IDS 경보 · IPS 차단 → 차단됨")).toHaveLength(2)
    expect(screen.getByText("방화벽 차단 → 차단됨")).toBeInTheDocument()
  })

  it("통신을 고르면 그 통신의 단계별 설명이 나온다", () => {
    render(<SecurityFlow />)

    fireEvent.click(screen.getByRole("button", { name: "IPS" }))
    fireEvent.click(screen.getByRole("button", { name: /공격과 비슷해 보이는 정상 요청/u }))
    expect(screen.getByRole("button", { name: /공격과 비슷해 보이는 정상 요청/u, pressed: true })).toBeVisible()
    expect(screen.getByText(/오탐/u)).toBeVisible()
    expect(screen.getByText("결과: 서버에 도착하지 못합니다.")).toBeVisible()
  })

  it("홈의 보안 섹션에 들어 있다", () => {
    render(<Home />)

    expect(screen.getByRole("heading", { level: 3, name: "방화벽, IDS, IPS는 무엇이 다를까요?" })).toBeVisible()
    expect(within(screen.getByRole("region", { name: "보안은 접근 흐름으로 봅니다." })).getByRole("img", { name: /방화벽 구성/u })).toBeInTheDocument()
  })
})
