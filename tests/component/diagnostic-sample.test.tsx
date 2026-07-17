import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import DiagnosticSamplePage from "@/app/diagnostic-sample/page"

describe("diagnostic decision dossier sample", () => {
  it("shows the customer deliverable without presenting it as a real customer result", () => {
    render(<DiagnosticSamplePage />)

    expect(screen.getByRole("heading", { level: 1, name: "제품 목록이 아닌, 다음 결정을 내릴 진단 문서입니다." })).toBeVisible()
    expect(screen.getByText(/특정 고객의 환경·성과가 아닌 가상 시나리오/u)).toBeVisible()
    expect(screen.getByRole("heading", { level: 2, name: "우선 검증·보류·제외 범위" })).toBeVisible()
    expect(screen.getByRole("heading", { level: 2, name: "다음 검증과 통과 기준" })).toBeVisible()
    expect(screen.getByRole("link", { name: "내 환경의 진단 범위 확인" })).toHaveAttribute("href", "/contact?type=customer-project")
  })
})
