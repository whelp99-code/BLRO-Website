import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { ContactPathGuide } from "@/components/contact/contact-path-guide"
import { RoleChecklist } from "@/components/redesign/role-checklist"

const searchParamsValue = vi.hoisted(() => ({ current: "" }))

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(searchParamsValue.current),
}))

afterEach(cleanup)

describe("contact role routing", () => {
  it.each([
    ["type=general&role=engineer", "기술 엔지니어", "기술 지원 문의"],
    ["role=engineer", "기술 엔지니어", "기술 지원 문의"],
    ["type=partner-collaboration&role=engineer", "국내 파트너", "파트너 공동 수행"],
    ["role=partner", "국내 파트너", "파트너 공동 수행"],
    ["type=customer-project&role=customer", "기업 고객", "기술 프로젝트 상담"],
  ])("keeps the selected role and inquiry guide aligned for %s", (query, role, guide) => {
    searchParamsValue.current = query

    render(<><RoleChecklist /><ContactPathGuide /></>)

    expect(screen.getByRole("link", { name: role })).toHaveAttribute("aria-current", "page")
    expect(screen.getByRole("complementary", { name: guide })).toBeVisible()
  })
})
