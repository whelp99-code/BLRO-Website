"use client"

import { useState } from "react"
import type { SecurityLayer } from "@/lib/security-layers"

type SecurityStageProps = {
  readonly layers: readonly SecurityLayer[]
}

const SOURCES = [
  ["본사 사용자", 36],
  ["지점", 106],
  ["원격 사용자", 176],
  ["클라우드", 246],
] as const

const APPS = [
  ["업무 시스템", 70],
  ["SaaS", 150],
  ["사내 앱", 230],
] as const

export function SecurityStage({ layers }: SecurityStageProps) {
  const [active, setActive] = useState(0)
  const current = layers[active] ?? layers[0]
  const activeKey = current?.key ?? "access"

  function pick(index: number) {
    setActive(index)
  }

  function groupProps(key: SecurityLayer["key"], label: string) {
    const index = Math.max(0, layers.findIndex((layer) => layer.key === key))
    return {
      "aria-label": label,
      "aria-pressed": activeKey === key,
      className: "hs-group",
      "data-active": activeKey === key,
      "data-layer": key,
      onClick: () => pick(index),
      onFocus: () => pick(index),
      onKeyDown: (event: React.KeyboardEvent<SVGGElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          pick(index)
        }
      },
      onMouseEnter: () => pick(index),
      role: "button",
      tabIndex: 0,
    }
  }

  return (
    <div className="hci-stage" data-active={activeKey}>
      <div className="hci-stage__view">
        <svg aria-label="보안 구성 예시: 본사, 지점, 원격 사용자, 클라우드가 접근 정책 관문을 거쳐 업무 시스템에 접속하고, 로그를 모아 탐지하며, 담당자가 차단하고, 시나리오로 확인합니다." className="hci-diagram" role="group" viewBox="0 0 640 520">
          {SOURCES.map(([name, y]) => (
            <g key={name}>
              <rect className="hs-node" height="50" rx="10" width="150" x="24" y={y} />
              <text className="hs-small-strong" textAnchor="middle" x="99" y={y + 30}>{name}</text>
            </g>
          ))}
          {APPS.map(([name, y]) => (
            <g key={name}>
              <rect className="hs-node" height="50" rx="10" width="150" x="466" y={y} />
              <text className="hs-small-strong" textAnchor="middle" x="541" y={y + 30}>{name}</text>
            </g>
          ))}

          <g {...groupProps("access", "접근 통제 층 보기")}>
            {SOURCES.map(([name, y]) => (
              <path className="hs-line hs-flow" d={`M174 ${y + 25} L262 ${174}`} key={name} />
            ))}
            {APPS.map(([name, y]) => (
              <path className="hs-line hs-flow" d={`M378 174 L466 ${y + 25}`} key={name} />
            ))}
            <rect className="hs-fill" height="300" rx="14" width="116" x="262" y="24" />
            <text className="hs-title" textAnchor="middle" x="320" y="150">접근</text>
            <text className="hs-title" textAnchor="middle" x="320" y="174">정책</text>
            <path className="hs-line" d="M306 210 h28 v22 h-28 z M312 210 v-8 a8 8 0 0 1 16 0 v8" />
          </g>

          <g {...groupProps("detect", "탐지 층 보기")}>
            <path className="hs-line hs-flow" d="M320 324 V366" />
            <path className="hs-line hs-flow" d="M99 296 V366" />
            <path className="hs-line hs-flow" d="M541 296 V366" />
            <rect className="hs-fill" height="44" rx="10" width="520" x="60" y="366" />
            <text className="hs-small-strong" textAnchor="middle" x="320" y="394">로그·가시성</text>
          </g>

          <g {...groupProps("respond", "대응 층 보기")}>
            <path className="hs-line hs-flow" d="M150 410 V436" />
            <rect className="hs-fill" height="40" rx="10" width="170" x="60" y="436" />
            <text className="hs-small-strong" textAnchor="middle" x="145" y="461">조사·차단 담당</text>
            <circle className="hs-fill" cx="212" cy="262" r="12" />
            <path className="hs-line" d="M206 256 l12 12 M218 256 l-12 12" />
          </g>

          <g {...groupProps("verify", "검증 층 보기")}>
            <path className="hs-line hs-flow" d="M495 436 V410" />
            <rect className="hs-fill" height="40" rx="10" width="170" x="410" y="436" />
            <text className="hs-small-strong" textAnchor="middle" x="495" y="461">시나리오로 확인</text>
          </g>

          <g className="hs-callout">
            <rect height="36" rx="18" width="480" x="80" y="480" />
            <text textAnchor="middle" x="320" y="504">{current?.callout ?? ""}</text>
          </g>
        </svg>
      </div>
      <div className="hci-stage__panel">
        <div aria-label="보안 층" className="hci-stage__tabs" role="group">
          {layers.map((layer, index) => (
            <button aria-pressed={index === active} key={layer.key} onClick={() => pick(index)} onFocus={() => pick(index)} onMouseEnter={() => pick(index)} type="button">
              <span>{String(index + 1).padStart(2, "0")}</span>
              {layer.name}
            </button>
          ))}
        </div>
        {current ? (
          <div aria-live="polite" className="hci-stage__detail">
            <strong>{current.name}</strong>
            <p>{current.summary}</p>
            <ul>
              {current.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="hci-stage__note">구성 예시입니다. 실제 구성은 현재 환경과 운영 조직에 맞춰 확인합니다.</p>
      </div>
    </div>
  )
}
