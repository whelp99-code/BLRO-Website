import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { LocaleSwitch } from "@/components/layout/locale-switch"
import { MobileNav } from "@/components/layout/mobile-nav"
import { SiteFooter } from "@/components/layout/site-footer"

describe("desktop navigation", () => {
  it("marks current routes and roves through primary controls", async () => {
    // Given
    const user = userEvent.setup()
    render(<DesktopNav pathname="/solutions/network-security" />)
    const solutions = screen.getByRole("button", { name: "솔루션 메뉴" })
    const projects = screen.getByRole("link", { name: "프로젝트" })
    expect(solutions).not.toHaveAttribute("tabindex", "-1")
    solutions.focus()

    // When
    await user.keyboard("{ArrowRight}")

    // Then
    expect(projects).toHaveFocus()
    expect(projects).not.toHaveAttribute("tabindex", "-1")
    expect(solutions).toHaveAttribute("aria-current", "page")

    // When
    await user.keyboard("{End}")

    // Then
    expect(screen.getByRole("link", { name: "상담" })).toHaveFocus()
  })

  it("enters a megamenu with ArrowDown and escapes from inside it", async () => {
    // Given
    const user = userEvent.setup()
    render(<DesktopNav pathname="/" />)
    const trigger = screen.getByRole("button", { name: "솔루션 메뉴" })
    trigger.focus()

    // When
    await user.keyboard("{ArrowDown}")

    // Then
    const overview = screen.getByRole("link", { name: "솔루션 전체 개요 보기" })
    expect(overview).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-expanded", "true")

    // When
    await user.keyboard("{Escape}")

    // Then
    expect(overview).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it("opens a megamenu and returns focus after Escape", async () => {
    // Given
    const user = userEvent.setup()
    render(<DesktopNav pathname="/" />)
    const trigger = screen.getByRole("button", { name: "솔루션 메뉴" })

    // When
    await user.click(trigger)
    await user.keyboard("{Escape}")

    // Then
    expect(screen.queryByRole("link", { name: "네트워크·보안" })).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute("aria-expanded", "false")
  })

  it("closes an open megamenu on outside activation and route change", async () => {
    // Given
    const user = userEvent.setup()
    const view = render(
      <div>
        <DesktopNav pathname="/" />
        <button type="button">Outside</button>
      </div>,
    )
    const trigger = screen.getByRole("button", { name: "솔루션 메뉴" })
    await user.click(trigger)

    // When
    await user.click(screen.getByRole("button", { name: "Outside" }))

    // Then
    expect(trigger).toHaveAttribute("aria-expanded", "false")

    // When
    await user.click(trigger)
    view.rerender(
      <div>
        <DesktopNav pathname="/insights" />
        <button type="button">Outside</button>
      </div>,
    )

    // Then
    expect(screen.getByRole("button", { name: "솔루션 메뉴" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )

    // When
    view.rerender(
      <div>
        <DesktopNav pathname="/" />
        <button type="button">Outside</button>
      </div>,
    )

    // Then
    expect(screen.getByRole("button", { name: "솔루션 메뉴" })).toHaveAttribute(
      "aria-expanded",
      "false",
    )
  })
})

describe("mobile navigation", () => {
  it("locks background scroll and restores trigger focus after Escape", async () => {
    // Given
    const user = userEvent.setup()
    render(<MobileNav pathname="/" />)
    const trigger = screen.getByRole("button", { name: "메뉴 열기" })
    expect(screen.getByRole("navigation", { name: "주 내비게이션" })).toBeInTheDocument()

    // When
    await user.click(trigger)

    // Then
    expect(document.body).toHaveStyle({ overflow: "hidden" })
    expect(screen.getByRole("dialog", { name: "모바일 내비게이션" })).toBeVisible()

    // When
    await user.keyboard("{Escape}")

    // Then
    expect(screen.queryByRole("dialog", { name: "모바일 내비게이션" })).not.toBeInTheDocument()
    expect(document.body).not.toHaveStyle({ overflow: "hidden" })
    expect(trigger).toHaveFocus()
  })

  it("wraps focus in both directions inside the open drawer", async () => {
    // Given
    const user = userEvent.setup()
    render(<MobileNav pathname="/" />)
    await user.click(screen.getByRole("button", { name: "메뉴 열기" }))
    const close = screen.getByRole("button", { name: "메뉴 닫기" })
    const contact = screen.getByRole("link", { name: "상담" })

    // When
    await user.keyboard("{Shift>}{Tab}{/Shift}")

    // Then
    expect(contact).toHaveFocus()

    // When
    await user.keyboard("{Tab}")

    // Then
    expect(close).toHaveFocus()
  })

  it("closes from the backdrop and when the route changes", async () => {
    // Given
    const user = userEvent.setup()
    const view = render(<MobileNav pathname="/" />)
    await user.click(screen.getByRole("button", { name: "메뉴 열기" }))

    // When
    await user.click(screen.getByTestId("mobile-nav-backdrop"))

    // Then
    expect(screen.queryByRole("dialog", { name: "모바일 내비게이션" })).not.toBeInTheDocument()

    // When
    await user.click(screen.getByRole("button", { name: "메뉴 열기" }))
    view.rerender(<MobileNav pathname="/insights" />)

    // Then
    expect(screen.queryByRole("dialog", { name: "모바일 내비게이션" })).not.toBeInTheDocument()

    // When
    view.rerender(<MobileNav pathname="/" />)

    // Then
    expect(screen.queryByRole("dialog", { name: "모바일 내비게이션" })).not.toBeInTheDocument()
  })
})

describe("route-derived shell components", () => {
  it("renders linked breadcrumb ancestors and a current final item", () => {
    // Given / When
    render(<Breadcrumb pathname="/solutions/network-security" />)
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" })

    // Then
    expect(within(breadcrumb).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
    expect(within(breadcrumb).getByRole("link", { name: "Solutions" })).toHaveAttribute(
      "href",
      "/solutions",
    )
    expect(within(breadcrumb).getByText("Network Security")).toHaveAttribute(
      "aria-current",
      "page",
    )
  })

  it("shows a locale switch only for an available counterpart", () => {
    // Given
    const publishedRoutes = new Set(["/", "/en"])

    // When
    const view = render(<LocaleSwitch pathname="/" publishedRoutes={publishedRoutes} />)

    // Then
    expect(screen.getByRole("link", { name: "English" })).toHaveAttribute("href", "/en")

    // When
    view.rerender(<LocaleSwitch pathname="/projects" publishedRoutes={publishedRoutes} />)

    // Then
    expect(screen.queryByRole("link", { name: "English" })).not.toBeInTheDocument()
  })

  it("renders three inquiry routes and policy links without invented contacts", () => {
    // Given / When
    render(<SiteFooter pathname="/" />)
    const footer = screen.getByRole("contentinfo")

    // Then
    expect(within(footer).getByRole("heading", { name: "사업" })).toBeVisible()
    expect(within(footer).getByRole("heading", { name: "상담 시작" })).toBeVisible()
    expect(within(footer).queryByRole("heading", { name: "Business" })).not.toBeInTheDocument()
    expect(within(footer).queryByRole("heading", { name: "Start a conversation" })).not.toBeInTheDocument()
    expect(within(footer).getAllByRole("link", { name: /문의|상담/u })).toHaveLength(3)
    expect(within(footer).getByRole("link", { name: "개인정보 처리방침" })).toHaveAttribute(
      "href",
      "/privacy",
    )
    expect(within(footer).getByRole("link", { name: "이용안내" })).toHaveAttribute(
      "href",
      "/terms",
    )
    expect(within(footer).getByRole("link", { name: "jm.park@blro.co.kr" })).toHaveAttribute("href", "mailto:jm.park@blro.co.kr")
    expect(within(footer).getByText("010-8896-1260")).toBeVisible()
    expect(within(footer).getByText(/420-87-02727/u)).toBeVisible()
    expect(within(footer).queryByText("주소")).not.toBeInTheDocument()
    expect(within(footer).getByText("AI 자동화")).toHaveClass("blro-nowrap")
    expect(within(footer).getByText("실행 파트너")).toHaveClass("blro-nowrap")
  })

  it("keeps the diagnostic scope CTA in order with primary hierarchy", () => {
    // Given / When
    render(<DesktopNav pathname="/" />)

    // Then
    const controls = screen.getByRole("navigation", { name: "주 내비게이션" }).querySelectorAll(
      "[data-primary-control]",
    )
    expect(controls.item(controls.length - 1)).toHaveTextContent("상담")
    expect(screen.getByRole("link", { name: "상담" })).toHaveClass(
      "blro-nav-cta",
    )
  })
})
