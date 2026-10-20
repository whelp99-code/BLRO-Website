"use client"

import { useEffect, useRef, useState } from "react"
import type { HciLayer } from "@/lib/hci-layers"
import { mountHciScene, type SceneHandle } from "./hci-scene3d"

type HciStageProps = {
  readonly layers: readonly HciLayer[]
}

const LAYER_Y = [62, 118, 174, 230] as const

export function HciStage({ layers }: HciStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<SceneHandle | null>(null)
  const [active, setActive] = useState(0)
  const [mode, setMode] = useState<"2d" | "3d">("2d")

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas === null) return
    if (typeof window.matchMedia !== "function" || typeof IntersectionObserver === "undefined") return
    const wide = window.matchMedia("(min-width: 720px)")
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (!wide.matches || calm.matches) return
    let cancelled = false
    let timeoutId = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        const boot = () => {
          void mountHciScene(canvas, layers).then((handle) => {
            if (handle === null) return
            if (cancelled) {
              handle.dispose()
              return
            }
            sceneRef.current = handle
            setMode("3d")
          })
        }
        timeoutId = window.setTimeout(boot, 250)
      },
      { rootMargin: "200px" },
    )
    observer.observe(canvas)
    return () => {
      cancelled = true
      observer.disconnect()
      window.clearTimeout(timeoutId)
      sceneRef.current?.dispose()
      sceneRef.current = null
    }
  }, [layers])

  function select(index: number) {
    setActive(index)
    sceneRef.current?.setActive(index)
  }

  const current = layers[active] ?? layers[0]

  return (
    <div className="hci-stage" data-mode={mode}>
      <div className="hci-stage__view" aria-hidden="true">
        <svg className="hci-stage__svg" viewBox="0 0 400 300" role="presentation">
          <defs>
            <linearGradient id="hs-top" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#ffffff" stopOpacity="0.5" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <path className="hci-stage__flow" d="M200 20 V285" />
          {layers.map((layer, index) => {
            const y = LAYER_Y[index] ?? 62
            return (
              <g className="hci-stage__slab" data-active={index === active} data-layer={layer.key} key={layer.key}>
                <path className="hs-left" d={`M100 ${y} L200 ${y + 30} L200 ${y + 46} L100 ${y + 16} Z`} />
                <path className="hs-right" d={`M200 ${y + 30} L300 ${y} L300 ${y + 16} L200 ${y + 46} Z`} />
                <path className="hs-top" d={`M200 ${y - 30} L300 ${y} L200 ${y + 30} L100 ${y} Z`} />
                <path d={`M200 ${y - 30} L300 ${y} L200 ${y + 30} L100 ${y} Z`} fill="url(#hs-top)" />
              </g>
            )
          })}
        </svg>
        <canvas className="hci-stage__canvas" ref={canvasRef} />
      </div>
      <div className="hci-stage__panel">
        <div aria-label="HCI 구성 층" className="hci-stage__tabs" role="group">
          {layers.map((layer, index) => (
            <button
              aria-pressed={index === active}
              data-layer={layer.key}
              key={layer.key}
              onBlur={() => undefined}
              onClick={() => select(index)}
              onFocus={() => select(index)}
              onMouseEnter={() => select(index)}
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
      </div>
    </div>
  )
}
