"use client"

import { useMemo, useState } from "react"
import { Heading } from "@/components/content/typography"
import {
  SANGFOR_CASE_FILTERS,
  type ExternalCaseEvidence,
  type SangforCaseFilter,
} from "@/lib/external-evidence"

export type SangforKoreaCaseIndexProps = {
  readonly cases: readonly ExternalCaseEvidence[]
}

export function SangforKoreaCaseIndex({ cases }: SangforKoreaCaseIndexProps) {
  const [activeFilter, setActiveFilter] = useState<SangforCaseFilter>("all")
  const visibleCases = useMemo(
    () => (activeFilter === "all" ? cases : cases.filter((item) => item.category === activeFilter)),
    [activeFilter, cases],
  )

  return (
    <div className="external-cases__index">
      <div className="external-cases__index-heading">
        <Heading level={3}>국내 공식 사례 목록</Heading>
        <div className="external-cases__filters" role="group" aria-label="제품군 필터">
          {SANGFOR_CASE_FILTERS.map((filter) => (
            <button
              aria-pressed={activeFilter === filter.category}
              className={
                activeFilter === filter.category
                  ? "external-cases__filter external-cases__filter--active"
                  : "external-cases__filter"
              }
              key={filter.category}
              onClick={() => setActiveFilter(filter.category)}
              type="button"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
      <ul className="external-cases__grid">
        {visibleCases.map((item) => (
          <li key={item.evidenceId}>
            <article className="external-cases__tile">
              <span className="external-cases__chip">{item.productTag}</span>
              <Heading level={3}>{item.customer}</Heading>
              <p>{item.fact}</p>
              <a href={item.sourceUrl} rel="noreferrer" target="_blank">
                공식 원문 <span aria-hidden="true">↗</span>
              </a>
            </article>
          </li>
        ))}
      </ul>
    </div>
  )
}
