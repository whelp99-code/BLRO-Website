import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ContactPage, { metadata } from "@/app/contact/page"
import { isSecureIntakeConfigured } from "@/lib/public-runtime"

describe("contact page", () => {
  it("keeps the conversion context and requires explicit privacy consent before secure intake can be enabled", () => {
    render(<ContactPage />)

    expect(screen.getByRole("heading", { level: 1, name: /전환의 기준/u })).toBeVisible()
    expect(screen.getByText("기술 프로젝트 상담")).toBeVisible()
    expect(screen.getByRole("heading", { level: 2, name: "상담 후 받게 될 진단 요약의 형태" })).toBeVisible()
    expect(screen.getByText("입력 조건")).toBeVisible()
    expect(screen.getByText("다음 검증")).toBeVisible()
    expect(screen.getAllByRole("textbox")).toHaveLength(5)
    expect(screen.getByRole("checkbox", { name: /개인정보 처리 안내/u })).toBeRequired()
    const intakeConfigured = isSecureIntakeConfigured(
      process.env.NEXT_PUBLIC_LEAD_API_URL,
      process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      process.env.NODE_ENV,
      process.env.NEXT_PUBLIC_SITE_URL,
    )
    expect(screen.getByRole("button", { name: "상담 요청 보내기" })).toHaveProperty("disabled", !intakeConfigured)
    expect(screen.getByRole("link", { name: "jm.park@blro.co.kr" })).toHaveAttribute("href", "mailto:jm.park@blro.co.kr")
    if (intakeConfigured) {
      expect(screen.queryByText(/안전한 접수 서비스 연결을 준비 중입니다/u)).not.toBeInTheDocument()
    } else {
      expect(screen.getByText(/안전한 접수 서비스 연결을 준비 중입니다/u)).toBeVisible()
    }
    expect(metadata.robots).toBeUndefined()
  })
})
