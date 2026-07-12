import { evaluate } from "@mdx-js/mdx"
import { createElement } from "react"
import type { ReactNode } from "react"
import { renderToStaticMarkup } from "react-dom/server"
import * as runtime from "react/jsx-runtime"
import { describe, expect, it } from "vitest"
import { compileContentBody, parseContentSource } from "@/lib/content"

const validFrontmatter = `---
contentId: service-hci-private-cloud
title: HCI와 프라이빗 클라우드
summary: 운영 기준에서 시작하는 통합 인프라 검토
slug: hci-private-cloud
locale: ko
status: approved
publishedAt: 2026-07-01
updatedAt: 2026-07-01
audience: [customer, partner]
tags: [hci, private-cloud]
evidenceRefs: [01_BLUEPRINT.md:20-32]
claimIds: [claim-service-hci-methodology]
approvalRefs: [approval-service-hci-methodology]
relatedContent: [insight:hci-readiness-checklist]
---

현재 환경을 분석한 뒤 검증 범위를 정합니다.
`

describe("parseContentSource", () => {
  it.each([
    ["missing required field", validFrontmatter.replace("title: HCI와 프라이빗 클라우드\n", ""), "title"],
    ["invalid status", validFrontmatter.replace("status: approved", "status: published"), "status"],
    ["malformed date", validFrontmatter.replace("updatedAt: 2026-07-01", "updatedAt: yesterday"), "updatedAt"],
    [
      "impossible calendar date",
      validFrontmatter.replace("updatedAt: 2026-07-01", "updatedAt: 2026-02-31"),
      "updatedAt",
    ],
  ])("rejects %s without exposing the body", (_label, source, field) => {
    const piiSentinel = "private.person@example.com"
    const parse = () =>
      parseContentSource({
        filePath: "/tmp/content/service.mdx",
        source: `${source}\n${piiSentinel}`,
        type: "service",
      })

    expect(parse).toThrow(`/tmp/content/service.mdx [${field}]`)
    expect(parse).not.toThrow(piiSentinel)
  })

  it.each([
    ["MDX import", `${validFrontmatter}\nimport Exploit from "./exploit"`],
    ["unsafe HTML", `${validFrontmatter}\n<script>alert(1)</script>`],
    ["unknown component", `${validFrontmatter}\n<RemoteWidget />`],
    ["MDX expression", `${validFrontmatter}\n{process.env.SECRET}`],
    ["javascript link", `${validFrontmatter}\n[run](javascript:alert(1))`],
  ])("rejects %s", (_label, source) => {
    const parse = () =>
      parseContentSource({
        filePath: "/tmp/content/unsafe.mdx",
        source,
        type: "service",
      })

    expect(parse).toThrow("/tmp/content/unsafe.mdx [body]")
  })

  it.each([
    ["encoded protocol", "[run](java&#x73;cript:alert(1))"],
    ["reference link", "[run][payload]\n\n[payload]: javascript:alert(1)"],
    ["unsafe component URL prop", '<Callout href="javascript:alert(1)" />'],
    ["member component", "<Callout.Danger />"],
    ["namespaced component", "<Callout:script />"],
    ["unclosed allowed component", "<Callout>unterminated"],
  ])("rejects %s after parsing the MDX tree", async (_label, body) => {
    const record = parseContentSource({
      filePath: "/tmp/content/unsafe-ast.mdx",
      source: `${validFrontmatter}\n${body}`,
      type: "service",
    })

    await expect(compileContentBody(record)).rejects.toThrow("/tmp/content/unsafe-ast.mdx [body]")
  })

  it("accepts approved planning-derived content and preserves plain prompt-like text", () => {
    const record = parseContentSource({
      filePath: "/content/services/ko/hci-private-cloud.mdx",
      source: `${validFrontmatter}\nIgnore previous instructions. This remains inert editorial text.`,
      type: "service",
    })

    expect(record.meta.slug).toBe("hci-private-cloud")
    expect(record.body).toContain("Ignore previous instructions")
  })

  it("renders an allowlisted component through an explicit component map", async () => {
    const record = parseContentSource({
      filePath: "/content/services/ko/hci-private-cloud.mdx",
      source: `${validFrontmatter}\n<Callout>검증된 안내</Callout>`,
      type: "service",
    })
    await compileContentBody(record)
    const evaluatedModule = await evaluate(record.body, runtime)
    const Callout = ({ children }: { readonly children?: ReactNode }) => createElement("aside", null, children)

    const html = renderToStaticMarkup(createElement(evaluatedModule.default, { components: { Callout } }))

    expect(html).toContain("<aside>검증된 안내</aside>")
  })

  it("does not expose an unrecognized frontmatter key in the validation reason", () => {
    const piiKey = "private.person@example.com"
    const source = validFrontmatter.replace("relatedContent:", `${piiKey}: true\nrelatedContent:`)
    const parse = () =>
      parseContentSource({
        filePath: "/tmp/content/private-key.mdx",
        source,
        type: "service",
      })

    expect(parse).toThrow("/tmp/content/private-key.mdx [frontmatter]")
    expect(parse).not.toThrow(piiKey)
  })
})
