import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Prose } from "@/components/content/prose"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { Button, ButtonAccessibilityError } from "@/components/ui/button"
import { ActionLink } from "@/components/ui/link"
import { SignalRoute, SignalRouteAccessibilityError } from "@/components/visual/signal-route"

describe("Button", () => {
  it("rejects an icon-only control without an accessible label", () => {
    const renderUnnamedButton = () => render(<Button size="icon">+</Button>)

    expect(renderUnnamedButton).toThrow(ButtonAccessibilityError)
  })

  it("exposes loading and error states without enabling interaction", () => {
    render(
      <Button aria-label="문의 전송" loading variant="danger">
        문의 전송
      </Button>,
    )

    const button = screen.getByRole("button", { name: "문의 전송" })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("data-variant", "danger")
    expect(screen.getByText("문의 전송", { selector: ".blro-button__label-content" })).toHaveAttribute(
      "aria-hidden",
      "true",
    )
  })

  it("uses the compact target without dropping below the accessibility floor", () => {
    render(<Button size="compact">범위 확인</Button>)

    expect(screen.getByRole("button", { name: "범위 확인" })).toHaveClass("blro-button--compact")
  })

  it("renders every visual and size variant through stable class contracts", () => {
    render(
      <>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">Text</Button>
        <Button variant="danger">Danger</Button>
        <Button size="default">Default</Button>
        <Button size="compact">Compact</Button>
        <Button aria-label="Next" size="icon">→</Button>
      </>,
    )

    for (const variant of ["primary", "secondary", "text", "danger"]) {
      expect(screen.getByText(variant[0]?.toUpperCase() + variant.slice(1)).closest("button")).toHaveClass(
        `blro-button--${variant}`,
      )
    }
    expect(screen.getByRole("button", { name: "Default" })).toHaveClass("blro-button--default")
    expect(screen.getByRole("button", { name: "Compact" })).toHaveClass("blro-button--compact")
    expect(screen.getByRole("button", { name: "Next" })).toHaveClass("blro-button--icon")
  })
})

describe("ActionLink", () => {
  it("does not navigate or invoke handlers while disabled", () => {
    const handleClick = vi.fn()
    const handleContextMenu = vi.fn()
    const handlePointerDown = vi.fn()
    render(
      <ActionLink
        disabled
        href="/contact"
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        onPointerDown={handlePointerDown}
      >
        기술 프로젝트 상담
      </ActionLink>,
    )

    const disabledLink = screen.getByText("기술 프로젝트 상담")
    fireEvent.click(disabledLink)
    fireEvent.contextMenu(disabledLink)
    fireEvent.pointerDown(disabledLink)

    expect(handleClick).not.toHaveBeenCalled()
    expect(handleContextMenu).not.toHaveBeenCalled()
    expect(handlePointerDown).not.toHaveBeenCalled()
    expect(disabledLink).toHaveAttribute("aria-disabled", "true")
    expect(disabledLink).not.toHaveAttribute("href")
  })

  it("keeps an enabled destination and descriptive accessible name", () => {
    render(<ActionLink href="/solutions">솔루션 판단 기준 보기</ActionLink>)

    expect(screen.getByRole("link", { name: "솔루션 판단 기준 보기" })).toHaveAttribute(
      "href",
      "/solutions",
    )
    expect(screen.getByRole("link", { name: "솔루션 판단 기준 보기" })).toHaveClass("blro-link--inline")
  })

  it("renders every link variant and preserves safe semantics while disabled", () => {
    render(
      <>
        <ActionLink href="/inline" variant="inline">Inline</ActionLink>
        <ActionLink href="/standalone" variant="standalone">Standalone</ActionLink>
        <ActionLink href="/muted" variant="muted">Muted</ActionLink>
        <ActionLink
          aria-describedby="disabled-help"
          data-purpose="contact"
          disabled
          href="/disabled"
          id="disabled-link"
          title="승인 대기"
        >
          Disabled
        </ActionLink>
      </>,
    )

    for (const variant of ["inline", "standalone", "muted"]) {
      expect(screen.getByRole("link", { name: variant[0]?.toUpperCase() + variant.slice(1) })).toHaveClass(
        `blro-link--${variant}`,
      )
    }
    expect(screen.getByText("Disabled")).toHaveAttribute("id", "disabled-link")
    expect(screen.getByText("Disabled")).toHaveAttribute("aria-describedby", "disabled-help")
    expect(screen.getByText("Disabled")).toHaveAttribute("data-purpose", "contact")
    expect(screen.getByText("Disabled")).toHaveAttribute("title", "승인 대기")
  })
})

describe("layout and content primitives", () => {
  it("composes semantic section, container, and typography without changing heading level", () => {
    render(
      <Section aria-labelledby="design-heading" tone="alternate">
        <Container>
          <Eyebrow>Design system</Eyebrow>
          <Heading id="design-heading" level={2} size="display">
            Enterprise Precision
          </Heading>
          <Text variant="lead">근거와 흐름이 먼저 보이는 기술사업 인터페이스입니다.</Text>
        </Container>
      </Section>,
    )

    expect(screen.getByRole("heading", { level: 2, name: "Enterprise Precision" })).toHaveClass(
      "blro-heading--display",
    )
    expect(screen.getByLabelText("Enterprise Precision")).toHaveClass("blro-section--alternate")
  })

  it("constrains prose separately from the page container", () => {
    render(
      <Container variant="prose">
        <Prose>
          <h2>판단 기준</h2>
          <p>본문은 읽기 너비와 한국어 줄바꿈 규칙을 공유합니다.</p>
        </Prose>
      </Container>,
    )

    expect(screen.getByText("판단 기준").parentElement).toHaveClass("blro-prose")
    expect(screen.getByText("판단 기준").closest(".blro-container")).toHaveClass(
      "blro-container--prose",
    )
  })

  it("renders the precision-cartography route as a reusable labelled visual", () => {
    render(<SignalRoute label="입력에서 검증 산출물로 이어지는 흐름" />)

    const route = screen.getByRole("img", { name: "입력에서 검증 산출물로 이어지는 흐름" })
    expect(route).toHaveClass("blro-signal-field")
    expect(route.querySelectorAll("circle")).toHaveLength(5)
  })

  it("rejects an unlabelled precision-cartography visual", () => {
    const renderUnlabelledRoute = () => render(<SignalRoute label="   " />)

    expect(renderUnlabelledRoute).toThrow(SignalRouteAccessibilityError)
  })

  it("covers every container, section, heading, and text variant", () => {
    const { container } = render(
      <>
        <Container data-testid="standard" variant="standard" />
        <Container data-testid="prose" variant="prose" />
        {(["canvas", "surface", "alternate", "navy"] as const).map((tone) => (
          <Section data-testid={`tone-${tone}`} key={tone} tone={tone} />
        ))}
        {(["compact", "default", "generous"] as const).map((spacing) => (
          <Section data-testid={`spacing-${spacing}`} key={spacing} spacing={spacing} />
        ))}
        {(["display", "h1", "h2", "h3"] as const).map((size) => (
          <Heading key={size} level={2} size={size}>{size}</Heading>
        ))}
        {(["lead", "body", "small", "inverse"] as const).map((variant) => (
          <Text key={variant} variant={variant}>{variant}</Text>
        ))}
      </>,
    )

    expect(screen.getByTestId("standard")).toHaveClass("blro-container--standard")
    expect(screen.getByTestId("prose")).toHaveClass("blro-container--prose")
    for (const tone of ["canvas", "surface", "alternate", "navy"]) {
      expect(screen.getByTestId(`tone-${tone}`)).toHaveClass(`blro-section--${tone}`)
    }
    for (const spacing of ["compact", "default", "generous"]) {
      expect(screen.getByTestId(`spacing-${spacing}`)).toHaveClass(`blro-section--${spacing}`)
    }
    for (const size of ["display", "h1", "h2", "h3"]) {
      expect(screen.getByRole("heading", { name: size })).toHaveClass(`blro-heading--${size}`)
    }
    for (const variant of ["lead", "body", "small", "inverse"]) {
      expect(container.querySelector(`.blro-text--${variant}`)).toHaveTextContent(variant)
    }
  })
})

describe("design token contract", () => {
  it("connects focus, touch targets, and reduced motion to named tokens", async () => {
    const css = await readFile(join(process.cwd(), "app", "globals.css"), "utf8")

    expect(css).toContain("--color-focus: #1d4ed8")
    expect(css).toContain("--color-blro-focus: var(--color-focus)")
    expect(css).toContain("--spacing-blro-12: var(--space-12)")
    expect(css).toContain("--radius-blro-control: var(--radius-control)")
    expect(css).toContain("--duration-blro-micro: var(--duration-micro)")
    expect(css).toContain("--duration-blro-spinner: var(--duration-spinner)")
    expect(css).toContain("--duration-micro: 180ms")
    expect(css).toContain("font: var(--type-control)")
    expect(css).toContain("min-height: var(--signal-field-min-height)")
    expect(css).toMatch(/\.blro-button:focus-visible[\s\S]*var\(--color-focus\)/u)
    expect(css).toMatch(/\.blro-button--compact[\s\S]*min-height: var\(--target-min\)/u)
    expect(css).toContain("font: var(--type-display)")
    expect(css).toMatch(/\.blro-link:active[\s\S]*transform: translateY\(1px\)/u)
    expect(css).toMatch(/\.blro-link[\s\S]*min-height: var\(--target-min\)/u)
    expect(css).toMatch(/\.blro-text[\s\S]*word-break: keep-all/u)
    expect(css).toContain("@media (prefers-reduced-motion: reduce)")
    expect(css).toMatch(/prefers-reduced-motion[\s\S]*transform: none/u)
    expect(css).toMatch(/@keyframes blro-spin[\s\S]*translate\(-50%, -50%\) rotate\(360deg\)/u)
    expect(css).toMatch(/\.blro-section--navy \.blro-link[\s\S]*var\(--color-ink-inverse\)/u)
  })
})
