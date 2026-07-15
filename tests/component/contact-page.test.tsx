import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import ContactPage, { metadata } from "@/app/contact/page"

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
    expect(screen.getByRole("button", { name: "상담 요청 보내기" })).toBeDisabled()
    expect(screen.getByText("안전한 접수 서비스 연결을 준비 중입니다.")).toBeVisible()
    expect(metadata.robots).toBeUndefined()
  })
})
