"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { HciLayer } from "@/lib/hci-layers"
import { mountHciScene, type SceneHandle } from "./hci-scene3d"

type HciStageProps = {
  readonly layers: readonly HciLayer[]
}

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
        <div className="hci-stage__stack">
          {layers.map((layer, index) => (
            <Image
              alt=""
              className="hci-stage__layer"
              data-active={index === active}
              data-layer={layer.key}
              height={400}
              key={layer.key}
              unoptimized
              src={`/images/hci/layer-${layer.key}.webp`}
              style={{ top: `${3.75 + index * 18.75}%`, zIndex: 10 - index }}
              width={1000}
            />
          ))}
          <span className="hci-stage__beam" />
        </div>
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
