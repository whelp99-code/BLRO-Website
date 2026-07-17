import { renderToStaticMarkup } from "react-dom/server"
import { describe, expect, it } from "vitest"
import InsightsPage from "@/app/insights/page"
import InsightPage, { generateMetadata, generateStaticParams } from "@/app/insights/[slug]/page"
import InsightNotFound from "@/app/insights/[slug]/not-found"

describe("insight routes", () => {
  it("lists only approved public Korean insights", async () => {
    const markup = renderToStaticMarkup(await InsightsPage())

    expect(markup).toContain("보안 컨설팅의 시작점: 장비 목록이 아닌 접근 흐름 지도")
    expect(markup).toContain('href="/insights/security-consulting-baseline"')
    expect(markup).not.toContain("VMware와 Nutanix 비교 평가 매트릭스")
  })

  it("renders an approved insight with article schema and canonical metadata", async () => {
    const params = Promise.resolve({ slug: "security-consulting-baseline" })
    const [page, metadata] = await Promise.all([InsightPage({ params }), generateMetadata({ params })])
    const markup = renderToStaticMarkup(page)

    expect(await generateStaticParams()).toContainEqual({ slug: "security-consulting-baseline" })
    expect(metadata.title).toBe("보안 컨설팅의 시작점: 장비 목록이 아닌 접근 흐름 지도")
    expect(markup).toContain('"@type":"Article"')
    expect(markup).toContain("첫 인터뷰에서 확인할 5개\u00a0축")
    expect(markup).toContain("현재 접근 흐름과 신뢰 경계\u00a0지도")
    expect(markup).toContain('href="/contact?type=customer-project"')
  })

  it("renders a recovery route for unknown insight paths", () => {
    const markup = renderToStaticMarkup(<InsightNotFound />)
    expect(markup).toContain("인사이트를 찾을 수 없습니다.")
    expect(markup).toContain('href="/insights"')
  })
})
