import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { HciReadinessDownload } from "@/components/insights/hci-readiness-download"
import { Breadcrumb } from "@/components/layout/breadcrumb"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import type { ContentRecord } from "@/lib/content"
import { formatSolutionCopy, PROTECTED_INSIGHT_TITLE_PHRASES } from "@/lib/solutions"

type InsightBlock =
  | { readonly type: "paragraph"; readonly value: string }
  | { readonly type: "unordered-list"; readonly values: readonly string[] }
  | { readonly type: "ordered-list"; readonly values: readonly string[] }
  | { readonly type: "table"; readonly headers: readonly string[]; readonly rows: readonly (readonly string[])[] }

type InlinePart =
  | { readonly type: "text"; readonly value: string }
  | { readonly type: "strong"; readonly value: string }
  | { readonly type: "link"; readonly label: string; readonly href: string }

type InsightSection = {
  readonly heading: string | undefined
  readonly level: 2 | 3
  readonly blocks: readonly InsightBlock[]
}

function parseTableRow(line: string): readonly string[] | undefined {
  const trimmed = line.trim()
  if (!trimmed.startsWith("|") || !trimmed.endsWith("|")) return undefined
  return trimmed.slice(1, -1).split("|").map((cell) => cell.trim())
}

function isTableDivider(line: string): boolean {
  const cells = parseTableRow(line)
  return cells !== undefined && cells.length > 0 && cells.every((cell) => /^:?-{3,}:?$/u.test(cell))
}

function parseInlineParts(value: string): readonly InlinePart[] {
  const parts: InlinePart[] = []
  const pattern = /(\*\*([^*]+)\*\*)|(\[([^\]]+)\]\((https?:\/\/[^)\s]+)\))/gu
  let cursor = 0
  for (const match of value.matchAll(pattern)) {
    if (match.index === undefined) continue
    if (match.index > cursor) parts.push({ type: "text", value: value.slice(cursor, match.index) })
    if (match[2] !== undefined) parts.push({ type: "strong", value: match[2] })
    if (match[4] !== undefined && match[5] !== undefined) parts.push({ type: "link", label: match[4], href: match[5] })
    cursor = match.index + match[0].length
  }
  if (cursor < value.length) parts.push({ type: "text", value: value.slice(cursor) })
  return parts.length > 0 ? parts : [{ type: "text", value }]
}

function renderInline(value: string) {
  return parseInlineParts(value).map((part, index) => {
    if (part.type === "strong") return <strong key={`${part.value}-${index}`}>{formatSolutionCopy(part.value)}</strong>
    if (part.type === "link") return <a href={part.href} key={`${part.href}-${index}`} rel="noreferrer" target="_blank">{formatSolutionCopy(part.label)}</a>
    return <span key={`${part.value}-${index}`}>{formatSolutionCopy(part.value)}</span>
  })
}

function parseInsightBody(body: string): readonly InsightSection[] {
  const sections: Array<{ heading: string | undefined; level: 2 | 3; lines: string[] }> = [{ heading: undefined, level: 2, lines: [] }]
  for (const line of body.trim().split("\n")) {
    const match = /^(##|###)\s+(.+)$/u.exec(line)
    if (match) {
      sections.push({ heading: match[2], level: match[1] === "###" ? 3 : 2, lines: [] })
    } else {
      sections.at(-1)?.lines.push(line)
    }
  }

  return sections.map(({ heading, level, lines }) => {
    const blocks: InsightBlock[] = []
    let paragraph: string[] = []
    let unordered: string[] = []
    let ordered: string[] = []
    const flush = () => {
      if (paragraph.length > 0) blocks.push({ type: "paragraph", value: paragraph.join(" ") })
      if (unordered.length > 0) blocks.push({ type: "unordered-list", values: unordered })
      if (ordered.length > 0) blocks.push({ type: "ordered-list", values: ordered })
      paragraph = []
      unordered = []
      ordered = []
    }

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const line = lines[lineIndex] ?? ""
      const trimmed = line.trim()
      if (trimmed.length === 0) {
        flush()
      } else if (parseTableRow(trimmed) !== undefined && isTableDivider(lines[lineIndex + 1] ?? "")) {
        flush()
        const headers = parseTableRow(trimmed) ?? []
        const rows: Array<readonly string[]> = []
        lineIndex += 2
        while (lineIndex < lines.length) {
          const row = parseTableRow(lines[lineIndex] ?? "")
          if (row === undefined) {
            lineIndex -= 1
            break
          }
          rows.push(row)
          lineIndex += 1
        }
        blocks.push({ type: "table", headers, rows })
      } else if (trimmed.startsWith("- ")) {
        if (paragraph.length > 0 || ordered.length > 0) flush()
        unordered.push(trimmed.slice(2))
      } else if (/^\d+\.\s+/u.test(trimmed)) {
        if (paragraph.length > 0 || unordered.length > 0) flush()
        ordered.push(trimmed.replace(/^\d+\.\s+/u, ""))
      } else {
        if (unordered.length > 0 || ordered.length > 0) flush()
        paragraph.push(trimmed)
      }
    }
    flush()
    return { heading, level, blocks }
  }).filter((section) => section.heading !== undefined || section.blocks.length > 0)
}

export type InsightDetailProps = { readonly insight: ContentRecord }

export function InsightDetail({ insight }: InsightDetailProps) {
  const sections = parseInsightBody(insight.body)
  const pathname = `/insights/${insight.meta.slug}`

  return (
    <article className="insight-page insight-detail">
      <Container className="insight-detail__breadcrumb"><Breadcrumb pathname={pathname} /></Container>
      <Section aria-labelledby="insight-detail-heading" className="insight-detail__hero" spacing="generous">
        <Container>
          <Eyebrow>INSIGHT · {insight.meta.tags.join(" · ").toUpperCase()}</Eyebrow>
          <Heading className="insight-detail__title" id="insight-detail-heading" level={1}>
            {formatSolutionCopy(insight.meta.title, PROTECTED_INSIGHT_TITLE_PHRASES)}
          </Heading>
          <Text className="insight-detail__summary" variant="lead">{formatSolutionCopy(insight.meta.summary)}</Text>
          <p className="insight-detail__meta">공개일 {insight.meta.publishedAt} · 업데이트 {insight.meta.updatedAt}</p>
        </Container>
      </Section>
      <Section aria-label="실무 인사이트 본문" spacing="generous" tone="surface">
        <Container variant="prose">
          <div className="insight-detail__body">
            {sections.map((section, index) => (
              <section aria-labelledby={section.heading ? `insight-section-${index}` : undefined} key={`${section.heading ?? "intro"}-${index}`}>
                {section.heading ? <Heading id={`insight-section-${index}`} level={section.level}>{renderInline(section.heading)}</Heading> : null}
                {section.blocks.map((block, blockIndex) => {
                  if (block.type === "paragraph") return <Text key={blockIndex}>{renderInline(block.value)}</Text>
                  if (block.type === "table") return (
                    <div className="insight-detail__table-wrap" key={blockIndex}>
                      <table className="insight-detail__table">
                        <thead><tr>{block.headers.map((header) => <th key={header} scope="col">{renderInline(header)}</th>)}</tr></thead>
                        <tbody>{block.rows.map((row, rowIndex) => <tr key={`${row.join("-")}-${rowIndex}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}>{renderInline(cell)}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  )
                  const List = block.type === "ordered-list" ? "ol" : "ul"
                  return <List key={blockIndex}>{block.values.map((value) => <li key={value}>{renderInline(value)}</li>)}</List>
                })}
              </section>
            ))}
          </div>
        </Container>
      </Section>
      {insight.meta.slug === "hci-readiness-checklist" ? (
        <Section aria-label="HCI 사전진단 체크리스트 다운로드" spacing="generous">
          <Container>
            <HciReadinessDownload />
          </Container>
        </Section>
      ) : null}
      <Section aria-labelledby="insight-next-heading" className="insight-next" spacing="generous" tone="navy">
        <Container>
          <Eyebrow>NEXT DECISION</Eyebrow>
          <Heading id="insight-next-heading" level={2}>현재 환경에 맞는 검증 범위를 정리합니다.</Heading>
          <Text variant="inverse">이 자료의 질문을 바탕으로, 업무 영향과 운영 제약을 함께 확인할 수 있습니다.</Text>
          <div className="insight-next__actions">
            <TrackableLink className="insight-next__link" href="/contact?type=customer-project" properties={{ ctaId: `insight-${insight.meta.slug}-consultation`, placement: "insight-detail" }}>
              전환 진단 범위 확인 <span aria-hidden="true">↗</span>
            </TrackableLink>
            <Link className="insight-next__secondary" href="/insights">다른 인사이트 보기</Link>
          </div>
        </Container>
      </Section>
    </article>
  )
}
