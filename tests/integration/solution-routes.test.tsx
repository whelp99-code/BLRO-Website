import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import SolutionsPage from "@/app/solutions/page"
import SolutionPage, { generateMetadata, generateStaticParams } from "@/app/solutions/[slug]/page"
import SolutionNotFound from "@/app/solutions/[slug]/not-found"
import { formatSolutionCopy, SOLUTION_SLUGS } from "@/lib/solutions"

describe("solution routes", () => {
  it("renders the approved five-solution hub when the index route is requested", async () => {
    // Given
    const page = await SolutionsPage()

    // When
    const markup = renderToStaticMarkup(page)

    // Then
    expect(generateStaticParams()).toEqual(SOLUTION_SLUGS.map((slug) => ({ slug })))
    for (const slug of SOLUTION_SLUGS) {
      expect(markup).toContain(`/solutions/${slug}`)
    }
    expect(markup).not.toContain("manufacturing-hci-dr-template")
  })

  it("renders approved detail content and Service JSON-LD when a canonical slug is requested", async () => {
    // Given
    const params = Promise.resolve({ slug: "network-security" })

    // When
    const [page, metadata] = await Promise.all([SolutionPage({ params }), generateMetadata({ params })])
    const markup = renderToStaticMarkup(page)

    // Then
    expect(metadata.title).toBe("네트워크와 보안 · Solutions")
    expect(markup).toContain("검토가 필요한 상황")
    expect(markup).toContain("BLRO의 역할")
    expect(markup).toContain("주요 산출물")
    expect(markup).toContain('"@type":"Service"')
    expect(markup).toContain("ZTNA와 SSL VPN 적용 기준 비교")
    expect(markup).toContain('href="/insights/secure-access-selection"')
    expect(markup).toContain('href="/contact?type=customer-project"')
  })

  it("renders a recovery link when the route-local not-found boundary is used", () => {
    // Given
    const page = <SolutionNotFound />

    // When
    const markup = renderToStaticMarkup(page)

    // Then
    expect(markup).toContain("솔루션을 찾을 수 없습니다.")
    expect(markup).toContain('href="/solutions"')
  })

  it("keeps a trailing Korean phrase and technical hyphen together", () => {
    expect(formatSolutionCopy("업무환경 설계 영역")).toBe("업무환경 설계\u00a0영역")
    expect(formatSolutionCopy("SASE와 SD-WAN의 역할")).toBe("SASE와 SD‑WAN의\u00a0역할")
    expect(formatSolutionCopy("RPO와 RTO를 업무 기준으로 합의하는 방법", ["업무 기준으로"]))
      .toBe("RPO와 RTO를 업무\u00a0기준으로 합의하는\u00a0방법")
    expect(formatSolutionCopy("ZTNA와 SSL VPN 적용 기준 비교", ["적용 기준"]))
      .toBe("ZTNA와 SSL VPN 적용\u00a0기준\u00a0비교")
    expect(formatSolutionCopy("해외지사에서 SASE와 SD-WAN의 역할", ["SASE와 SD-WAN의"]))
      .toBe("해외지사에서 SASE와\u00a0SD‑WAN의\u00a0역할")
  })
})
