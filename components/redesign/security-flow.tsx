"use client"

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react"
import {
  type ChainElement,
  ACTION_TAG,
  FLOW_PACKETS,
  FLOW_SCENARIOS,
  deviceName,
  describe,
  simulate,
  slotPosition,
  summarize,
  timeline,
} from "@/lib/security-flow"
import { mountFlowScene, type SceneHandle } from "./security-flow-scene"

const STEP_MS = 800
const HOLD_MS = 2400
const X0 = 78
const X1 = 642
const LINE_Y = 118
const TAP_Y = 214

const NO_CHAIN: readonly ChainElement[] = []
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)"

function prefersReducedMotion() {
  return typeof window.matchMedia === "function" && window.matchMedia(REDUCE_QUERY).matches
}

function subscribeReduced(notify: () => void) {
  if (typeof window.matchMedia !== "function") return () => undefined
  const query = window.matchMedia(REDUCE_QUERY)
  query.addEventListener("change", notify)
  return () => query.removeEventListener("change", notify)
}

function slotX(slot: number, length: number) {
  return X0 + (X1 - X0) * slotPosition(slot, length)
}

export function SecurityFlow() {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<SceneHandle | null>(null)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [packetIndex, setPacketIndex] = useState(0)
  // 재생 위치는 어느 패킷의 것인지 함께 저장한다. 다른 패킷으로 바뀌면 처음부터 시작한다.
  const [playhead, setPlayhead] = useState({ key: "", index: 0 })
  const [auto, setAuto] = useState(true)
  const [inView, setInView] = useState(false)
  const [mode, setMode] = useState<"2d" | "3d">("2d")

  const scenario = FLOW_SCENARIOS[scenarioIndex] ?? FLOW_SCENARIOS[0]
  const packet = FLOW_PACKETS[packetIndex] ?? FLOW_PACKETS[0]
  const chain = scenario?.chain ?? NO_CHAIN
  const reduced = useSyncExternalStore(subscribeReduced, prefersReducedMotion, () => true)
  const playKey = `${scenarioIndex}-${packetIndex}`
  const result = useMemo(() => (packet ? simulate(chain, packet) : null), [chain, packet])
  const frames = useMemo(() => (result ? timeline(result) : []), [result])
  const last = frames.length - 1
  const playing = inView && !reduced
  // 화면 밖이거나 모션 감소 설정이면 판정이 모두 드러난 마지막 장면을 보여 준다.
  const shown = playing ? Math.min(playhead.key === playKey ? playhead.index : 0, last) : last
  const frame = frames[shown]

  // 화면에 들어왔을 때만 움직인다
  useEffect(() => {
    const root = rootRef.current
    if (root === null || typeof IntersectionObserver === "undefined") return
    const observer = new IntersectionObserver((entries) => setInView(entries.some((entry) => entry.isIntersecting)))
    observer.observe(root)
    return () => observer.disconnect()
  }, [])

  // 판정 타임라인을 한 칸씩 재생한다. 끝나면 잠시 멈췄다가 자동 재생 중이면 다음 패킷으로 넘어간다.
  useEffect(() => {
    if (!playing) return
    let cancelled = false
    let timer = 0
    function step(index: number) {
      if (cancelled) return
      setPlayhead({ key: playKey, index })
      if (index < last) {
        timer = window.setTimeout(() => step(index + 1), STEP_MS)
      } else if (auto) {
        timer = window.setTimeout(() => {
          if (!cancelled) setPacketIndex((current) => (current + 1) % FLOW_PACKETS.length)
        }, HOLD_MS)
      }
    }
    timer = window.setTimeout(() => step(1), STEP_MS)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [auto, last, playKey, playing])

  // 데스크톱에서만 3D 장면을 붙인다. 실패하거나 모션 감소 설정이면 2D 그림을 그대로 쓴다.
  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (canvas === null || root === null) return
    if (typeof window.matchMedia !== "function" || typeof IntersectionObserver === "undefined") return
    if (!window.matchMedia("(min-width: 900px)").matches || prefersReducedMotion()) return
    let cancelled = false
    let timeoutId = 0
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      observer.disconnect()
      timeoutId = window.setTimeout(() => {
        void mountFlowScene({ canvas, labelHost: canvas.parentElement ?? root }).then((handle) => {
          if (handle === null) return
          if (cancelled) {
            handle.dispose()
            return
          }
          handleRef.current = handle
          setMode("3d")
        })
      }, 250)
    }, { rootMargin: "200px" })
    observer.observe(root)
    return () => {
      cancelled = true
      observer.disconnect()
      window.clearTimeout(timeoutId)
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [])

  const tags = chain.map((_, index) => {
    const reached = result?.steps[index]
    const seen = frame !== undefined && reached !== undefined && frame.slot >= index + 1
    return seen && reached ? `${ACTION_TAG[reached.action].en} ${ACTION_TAG[reached.action].ko}` : null
  })

  useEffect(() => {
    if (mode !== "3d" || frame === undefined) return
    handleRef.current?.update({ chain, slot: frame.slot, branch: frame.branch, action: frame.action, tags })
  })

  function pickScenario(index: number) {
    setScenarioIndex(index)
  }

  function pickPacket(index: number) {
    setAuto(false)
    setPacketIndex(index)
  }

  if (scenario === undefined || packet === undefined || result === null || frame === undefined) return null

  const length = chain.length
  // 차단된 패킷은 장치 앞에서 멈춘다
  const px = slotX(frame.slot, length) - (frame.action === "block" && !frame.branch ? 74 : 0)
  const packetState = frame.action === "start" ? "start" : frame.action
  const lines = describe(result)
  const diagramLabel = `${scenario.name} 구성: 출발지, ${chain.map((element) => deviceName(element.device)).join(", ")}, 서버 순서로 패킷이 지나갑니다.`

  return (
    <div className="sf" data-mode={mode} data-scenario={scenario.key} ref={rootRef}>
      <div className="sf__view">
        <canvas aria-hidden="true" className="sf__canvas" ref={canvasRef} />
        <svg aria-label={diagramLabel} className="sf__svg" role="img" viewBox="0 0 720 292">
          <path className="sf__road" d={`M${X0} ${LINE_Y} H${X1}`} />
          <g>
            <rect className="sf__node" height="60" rx="8" width="96" x={X0 - 48} y={LINE_Y - 30} />
            <text className="sf__node-text" textAnchor="middle" x={X0} y={LINE_Y + 5}>출발지</text>
          </g>
          <g>
            <rect className="sf__node" height="60" rx="8" width="96" x={X1 - 48} y={LINE_Y - 30} />
            <text className="sf__node-text" textAnchor="middle" x={X1} y={LINE_Y + 5}>서버</text>
          </g>
          {chain.map((element, index) => {
            const x = slotX(index + 1, length)
            const step = result.steps[index]
            const seen = frame.slot >= index + 1 && step !== undefined
            const tap = element.mode === "tap"
            const y = tap ? TAP_Y : LINE_Y
            return (
              <g className="sf__device" data-action={seen && step ? step.action : "idle"} data-mode={element.mode} key={`${element.device}-${index}`}>
                {tap ? <path className="sf__branch" d={`M${x} ${LINE_Y} V${y - 32}`} /> : null}
                <rect className="sf__box" height="64" rx="8" width="108" x={x - 54} y={y - 32} />
                <text className="sf__box-text" textAnchor="middle" x={x} y={y - 12}>{deviceName(element.device)}</text>
                <text className="sf__box-sub" textAnchor="middle" x={x} y={y + 24}>{tap ? "사본 감시" : "경로 중간"}</text>
                {seen && step ? (
                  <g className="sf__tag-svg" data-action={step.action}>
                    <rect height="24" rx="4" width="116" x={x - 58} y={tap ? y + 38 : y - 68} />
                    <text textAnchor="middle" x={x} y={tap ? y + 55 : y - 51}>{ACTION_TAG[step.action].en} {ACTION_TAG[step.action].ko}</text>
                  </g>
                ) : null}
              </g>
            )
          })}
          {frame.branch ? <circle className="sf__copy" cx={px} cy={TAP_Y - 44} r="6" /> : null}
          <g className="sf__packet" data-state={packetState} style={{ transform: `translate(${px}px, ${LINE_Y}px)` }}>
            <circle r="11" />
            {packetState === "block" ? <path d="M-5 -5 L5 5 M5 -5 L-5 5" /> : null}
            {packetState === "delivered" ? <path d="M-5 0 L-1 4 L6 -4" /> : null}
          </g>
        </svg>
      </div>

      <div className="sf__panel">
        <div aria-label="장치 선택" className="hci-stage__tabs" role="group">
          {FLOW_SCENARIOS.map((item, index) => (
            <button aria-pressed={index === scenarioIndex} key={item.key} onClick={() => pickScenario(index)} type="button">
              {item.name}
            </button>
          ))}
        </div>
        <p className="sf__role"><strong>{scenario.role}</strong></p>
        <p>{scenario.summary}</p>

        <h4 className="sf__subhead">보내 보는 통신</h4>
        <ul className="sf__packets">
          {FLOW_PACKETS.map((item, index) => {
            const itemResult = simulate(chain, item)
            return (
              <li key={item.key}>
                <button aria-pressed={index === packetIndex} data-delivered={itemResult.delivered} onClick={() => pickPacket(index)} type="button">
                  <span className="sf__packet-label">{item.label}</span>
                  <span className="sf__packet-result">{summarize(itemResult)}</span>
                </button>
              </li>
            )
          })}
        </ul>
        <div aria-live="polite" className="sf__result">
          <p>{packet.detail}</p>
          <ul>
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        <p className="sf__caveat">{scenario.caveat}</p>
        {auto ? null : (
          <button className="sf__auto" onClick={() => setAuto(true)} type="button">
            자동 재생 다시 켜기
          </button>
        )}
      </div>
    </div>
  )
}
