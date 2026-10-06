import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeEach, describe, expect, it, vi } from "vitest"

const { submitInquiryMock, searchParamsValue } = vi.hoisted(() => ({
  submitInquiryMock: vi.fn<() => Promise<void>>(),
  searchParamsValue: { current: "" },
}))

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(searchParamsValue.current),
}))

vi.mock("@/lib/lead-api", () => ({
  submitInquiry: submitInquiryMock,
}))

describe("InquiryForm", () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unstubAllEnvs()
    submitInquiryMock.mockReset()
    submitInquiryMock.mockResolvedValue(undefined)
    searchParamsValue.current = ""
    window.history.replaceState({}, "", "/contact")
  })

  it("shows success and clears the fields when the inquiry is accepted", async () => {
    const user = userEvent.setup()
    vi.stubEnv("NEXT_PUBLIC_LEAD_API_URL", "https://api.blro.co.kr")
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key")

    try {
      const { InquiryForm } = await import("@/components/contact/inquiry-form")
      const { container } = render(<InquiryForm />)
      const form = container.querySelector("form")
      expect(form).not.toBeNull()
      if (form === null) throw new Error("missing inquiry form")

      const turnstileResponse = document.createElement("input")
      turnstileResponse.setAttribute("type", "hidden")
      turnstileResponse.setAttribute("name", "cf-turnstile-response")
      turnstileResponse.setAttribute("value", "test-turnstile-token")
      form.appendChild(turnstileResponse)

      fireEvent.change(screen.getByRole("textbox", { name: "회사명" }), { target: { value: "BLRO launch canary" } })
      fireEvent.change(screen.getByRole("textbox", { name: "담당자명" }), { target: { value: "운영 테스트" } })
      fireEvent.change(screen.getByRole("textbox", { name: "업무용 이메일" }), { target: { value: "jm.park@blro.co.kr" } })
      fireEvent.change(screen.getByRole("textbox", { name: "현재 상황과 검토 목적" }), { target: { value: "운영 문의 흐름 검증용 테스트입니다." } })
      await user.click(screen.getByRole("checkbox", { name: /개인정보 처리 안내/u }))

      await user.click(screen.getByRole("button", { name: "상담 요청 보내기" }))

      expect(submitInquiryMock).toHaveBeenCalledOnce()
      expect(screen.getByRole("status")).toBeVisible()
      expect(screen.queryByRole("alert")).not.toBeInTheDocument()
      expect(screen.getByRole("textbox", { name: "회사명" })).toHaveValue("")
      expect(screen.getByRole("textbox", { name: "담당자명" })).toHaveValue("")
      expect(screen.getByRole("textbox", { name: "업무용 이메일" })).toHaveValue("")
      expect(screen.getByRole("textbox", { name: "현재 상황과 검토 목적" })).toHaveValue("")
      expect(screen.getByRole("link", { name: "jm.park@blro.co.kr" })).toHaveAttribute("href", "mailto:jm.park@blro.co.kr")
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it("enables submit when production public intake values are blank", async () => {
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("NEXT_PUBLIC_LEAD_API_URL", "")
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "   ")

    const { InquiryForm } = await import("@/components/contact/inquiry-form")
    render(<InquiryForm />)

    expect(screen.getByRole("button", { name: "상담 요청 보내기" })).toBeEnabled()
  })

  it("keeps submit locked on preview production builds when intake values are blank", async () => {
    vi.stubEnv("NODE_ENV", "production")
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://preview.blro-website.pages.dev")
    vi.stubEnv("NEXT_PUBLIC_LEAD_API_URL", "")
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "   ")

    const { InquiryForm } = await import("@/components/contact/inquiry-form")
    render(<InquiryForm />)

    expect(screen.getByRole("link", { name: "jm.park@blro.co.kr" })).toHaveAttribute("href", "mailto:jm.park@blro.co.kr")
    expect(screen.getByRole("button", { name: "상담 요청 보내기" })).toBeDisabled()
  })

  it("preserves partner intent in the inquiry payload", async () => {
    const user = userEvent.setup()
    searchParamsValue.current = "type=partner-collaboration"
    vi.stubEnv("NEXT_PUBLIC_LEAD_API_URL", "https://api.blro.co.kr")
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key")

    try {
      const { InquiryForm } = await import("@/components/contact/inquiry-form")
      const { container } = render(<InquiryForm />)
      const form = container.querySelector("form")
      expect(form).not.toBeNull()
      if (form === null) throw new Error("missing inquiry form")

      const turnstileResponse = document.createElement("input")
      turnstileResponse.setAttribute("type", "hidden")
      turnstileResponse.setAttribute("name", "cf-turnstile-response")
      turnstileResponse.setAttribute("value", "test-turnstile-token")
      form.appendChild(turnstileResponse)

      await user.type(screen.getByRole("textbox", { name: "회사명" }), "Partner Test")
      await user.type(screen.getByRole("textbox", { name: "담당자명" }), "Operator")
      await user.type(screen.getByRole("textbox", { name: "업무용 이메일" }), "partner@example.com")
      await user.click(screen.getByRole("checkbox", { name: /개인정보 처리 안내/u }))
      await user.click(screen.getByRole("button", { name: "상담 요청 보내기" }))

      expect(submitInquiryMock).toHaveBeenCalledWith("https://api.blro.co.kr", expect.objectContaining({
        topic: "partner-collaboration",
        attribution: expect.objectContaining({ ctaId: "contact-partner-collaboration" }),
      }))
    } finally {
      vi.unstubAllEnvs()
    }
  })

  it("puts the HCI page product flag in the inquiry submit payload", async () => {
    const user = userEvent.setup()
    searchParamsValue.current = "type=customer-project&role=customer&product=hci"
    vi.stubEnv("NEXT_PUBLIC_LEAD_API_URL", "https://api.blro.co.kr")
    vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", "test-site-key")

    try {
      const { InquiryForm } = await import("@/components/contact/inquiry-form")
      const { container } = render(<InquiryForm />)
      const form = container.querySelector("form")
      expect(form).not.toBeNull()
      if (form === null) throw new Error("missing inquiry form")

      const turnstileResponse = document.createElement("input")
      turnstileResponse.setAttribute("type", "hidden")
      turnstileResponse.setAttribute("name", "cf-turnstile-response")
      turnstileResponse.setAttribute("value", "test-turnstile-token")
      form.appendChild(turnstileResponse)

      await user.type(screen.getByRole("textbox", { name: "회사명" }), "HCI Test")
      await user.type(screen.getByRole("textbox", { name: "담당자명" }), "Operator")
      await user.type(screen.getByRole("textbox", { name: "업무용 이메일" }), "hci@example.com")
      await user.click(screen.getByRole("checkbox", { name: /개인정보 처리 안내/u }))
      await user.click(screen.getByRole("button", { name: "상담 요청 보내기" }))

      expect(submitInquiryMock).toHaveBeenCalledWith("https://api.blro.co.kr", expect.objectContaining({
        topic: "customer-project",
        product: "hci",
      }))
    } finally {
      vi.unstubAllEnvs()
    }
  })
})
