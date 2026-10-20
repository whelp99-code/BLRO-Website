"use client"

import { useState } from "react"
import type { HciLayer } from "@/lib/hci-layers"

type HciStageProps = {
  readonly layers: readonly HciLayer[]
}

const CALLOUT: Record<HciLayer["key"], string> = {
  compute: "업무 시스템(VM)이 올라가는 곳",
  storage: "데이터를 모아 서로 보호하는 곳",
  network: "업무망과 관리망이 지나는 길",
  management: "한 화면에서 자원을 관리하는 곳",
}

const NODE_X = [40, 240, 440] as const

export function HciStage({ layers }: HciStageProps) {
  const [active, setActive] = useState(0)
  const current = layers[active] ?? layers[0]
  const activeKey = current?.key ?? "compute"

  function pick(index: number) {
    setActive(index)
  }

  function layerProps(key: HciLayer["key"], index: number) {
    return {
      className: "hs-group",
      "data-active": activeKey === key,
      "data-layer": key,
      onClick: () => pick(index),
      onMouseEnter: () => pick(index),
    }
  }

  const indexOf = (key: HciLayer["key"]) => Math.max(0, layers.findIndex((layer) => layer.key === key))

  return (
    <div className="hci-stage" data-active={activeKey}>
      <div className="hci-stage__view">
        <svg aria-label="HCI 구성 예시: 서버 세 대 안에 컴퓨트와 스토리지가 함께 있고, 네트워크로 연결되며, 하나의 관리 화면으로 운영합니다." className="hci-diagram" role="group" viewBox="0 0 640 500">
          <defs>
            <filter id="hs-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur result="b" stdDeviation="5" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {NODE_X.map((x, i) => (
            <g key={x}>
              <rect className="hs-node" height="214" rx="14" width="160" x={x} y="124" />
              <text className="hs-small hs-server" textAnchor="middle" x={x + 80} y="143">{`서버 ${i + 1}`}</text>
            </g>
          ))}

          <g {...layerProps("management", indexOf("management"))}>
            <rect className="hs-fill" height="74" rx="12" width="320" x="160" y="14" />
            <text className="hs-title" textAnchor="middle" x="320" y="38">통합 관리 화면</text>
            {[0, 1, 2, 3, 4].map((n) => (
              <rect className="hs-bar" height={10 + ((n * 7) % 22)} key={n} rx="2" width="14" x={226 + n * 26} y={74 - (10 + ((n * 7) % 22))} />
            ))}
            {NODE_X.map((x) => (
              <path className="hs-line hs-flow" d={`M${x + 80} 88 V124`} key={x} />
            ))}
          </g>

          <g {...layerProps("compute", indexOf("compute"))}>
            {NODE_X.map((x) => (
              <g key={x}>
                {[0, 1].map((n) => (
                  <g className="hs-vm" key={n}>
                    <rect className="hs-fill" height="44" rx="8" width="64" x={x + 12 + n * 72} y="156" />
                    <text className="hs-small-strong hs-vm-label" textAnchor="middle" x={x + 44 + n * 72} y="174">VM</text>
                    <text className="hs-tiny" textAnchor="middle" x={x + 44 + n * 72} y="190">업무 시스템</text>
                  </g>
                ))}
              </g>
            ))}
          </g>

          <g {...layerProps("storage", indexOf("storage"))}>
            {NODE_X.map((x) => (
              <g key={x}>
                <rect className="hs-fill" height="66" rx="10" width="136" x={x + 12} y="216" />
                <ellipse className="hs-disk" cx={x + 80} cy="236" rx="26" ry="8" />
                <path className="hs-disk" d={`M${x + 54} 236 V262 A26 8 0 0 0 ${x + 106} 262 V236`} />
                <text className="hs-small-strong hs-data" textAnchor="middle" x={x + 80} y="280">데이터</text>
              </g>
            ))}
            <path className="hs-line hs-flow" d="M200 249 H240" />
            <path className="hs-line hs-flow" d="M400 249 H440" />
            <path className="hs-line hs-flow hs-curve" d="M120 292 Q320 330 520 292" />
          </g>

          <g {...layerProps("network", indexOf("network"))}>
            {NODE_X.map((x) => (
              <path className="hs-line" d={`M${x + 60} 338 V366 M${x + 100} 338 V388`} key={x} />
            ))}
            <rect className="hs-bus hs-bus-work" height="14" rx="7" width="560" x="40" y="360" />
            <rect className="hs-bus hs-bus-admin" height="14" rx="7" width="560" x="40" y="382" />
            <path className="hs-line hs-flow" d="M60 367 H580" />
            <path className="hs-line hs-flow hs-flow-slow" d="M60 389 H580" />
            <text className="hs-small hs-net-work" x="44" y="418">업무망</text>
            <text className="hs-small hs-net-admin" x="104" y="418">관리망</text>
          </g>

          <g className="hs-callout">
            <rect height="40" rx="20" width="440" x="100" y="442" />
            <text textAnchor="middle" x="320" y="467">{CALLOUT[activeKey]}</text>
          </g>
        </svg>
        <p className="hci-stage__callout">{CALLOUT[activeKey]}</p>
      </div>
      <div className="hci-stage__panel">
        <div aria-label="HCI 구성 층" className="hci-stage__tabs" role="group">
          {layers.map((layer, index) => (
            <button
              aria-pressed={index === active}
              data-layer={layer.key}
              key={layer.key}
              onClick={() => pick(index)}
              onFocus={() => pick(index)}
              onMouseEnter={() => pick(index)}
              type="button"
            >
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
        <p className="hci-stage__note">구성 예시입니다. 실제 서버 대수와 구성은 상담에서 확인합니다.</p>
      </div>
    </div>
  )
}
