import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { InsightDetail } from "@/components/insights/insight-detail"
import type { ContentRecord } from "@/lib/content"

const insight: ContentRecord = {
  type: "insight",
  filePath: "content/insights/ko/test.mdx",
  meta: {
    contentId: "insight-test",
    title: "인사이트 화면 표현 테스트",
    summary: "출처 링크와 판단표를 읽기 쉬운 방식으로 표시하는 테스트입니다.",
    slug: "test",
    locale: "ko",
    status: "review",
    updatedAt: "2026-07-15",
    audience: ["customer"],
    tags: ["test"],
    evidenceRefs: [],
    claimIds: [],
    approvalRefs: [],
    relatedContent: [],
  },
  body: "## 판단 기준\n**중요 조건**은 [NIST 기준](https://csrc.nist.gov/)으로 확인합니다.\n\n| 항목 | 확인 값 |\n| --- | --- |\n| 접근 | 사용자·장치 |",
}

describe("InsightDetail", () => {
  it("renders source links, emphasis, and decision tables from safe markdown", () => {
    render(<InsightDetail insight={insight} />)
    expect(screen.getByRole("link", { name: /NIST\s+기준/u })).toHaveAttribute("href", "https://csrc.nist.gov/")
    expect(screen.getByText(/중요\s+조건/u).tagName).toBe("STRONG")
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByRole("columnheader", { name: /확인\s+값/u })).toBeInTheDocument()
  })
})
