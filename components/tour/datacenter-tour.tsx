"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ExplainSteps } from "@/components/redesign/explain-steps"
import { ZONES } from "@/lib/zones"
import { mountTour, type TourHandle } from "./tour-scene"

const STEPS = ZONES.map((zone) => ({
  name: zone.name,
  summary: zone.summary,
  points: zone.settings.map((setting) => `${setting.label}: ${setting.detail}`),
}))

export function DatacenterTour() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const hotspotRefs = useRef<(HTMLButtonElement | null)[]>([])
  const handleRef = useRef<TourHandle | null>(null)
  const [mode, setMode] = useState<"2d" | "3d">("2d")
  const [zone, setZone] = useState(0)
  const [setting, setSetting] = useState(0)

  const onZone = useCallback((index: number) => {
    setZone(index)
    setSetting(0)
    handleRef.current?.setFocus(0)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    if (canvas === null || section === null) return
    if (typeof window.matchMedia !== "function" || typeof IntersectionObserver === "undefined") return
    if (!window.matchMedia("(min-width: 900px)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let cancelled = false
    let timeoutId = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return
        observer.disconnect()
        timeoutId = window.setTimeout(() => {
          const hotspotEls = hotspotRefs.current.filter((el): el is HTMLButtonElement => el !== null)
          void mountTour({ canvas, hotspotEls, labelHost: canvas.parentElement ?? document.body, onZone }).then((handle) => {
            if (handle === null) return
            if (cancelled) {
              handle.dispose()
              return
            }
            handleRef.current = handle
            setMode("3d")
          })
        }, 250)
      },
      { rootMargin: "300px" },
    )
    observer.observe(section)
    return () => {
      cancelled = true
      observer.disconnect()
      window.clearTimeout(timeoutId)
      handleRef.current?.dispose()
      handleRef.current = null
    }
  }, [onZone])

  useEffect(() => {
    if (mode !== "3d") return
    const track = trackRef.current
    if (track === null) return
    function update() {
      if (track === null) return
      const rect = track.getBoundingClientRect()
      const total = track.offsetHeight - window.innerHeight
      if (total <= 0) return
      handleRef.current?.setProgress(-rect.top / total)
    }
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [mode])

  function jumpTo(index: number) {
    const track = trackRef.current
    if (track === null) return
    const total = track.offsetHeight - window.innerHeight
    const top = track.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + (index / (ZONES.length - 1)) * total, behavior: "smooth" })
  }

  function choose(index: number) {
    setSetting(index)
    handleRef.current?.setFocus(index)
  }

  const current = ZONES[zone] ?? ZONES[0]
  const currentSetting = current?.settings[setting] ?? current?.settings[0]

  return (
    <section aria-labelledby="tour-heading" className="tour" data-mode={mode} ref={sectionRef}>
      <div className="rd-wrap tour__intro">
        <h2 id="tour-heading">데이터센터를 한 바퀴 둘러보세요.</h2>
        <p>스크롤하면 네트워크, 서버, 스토리지, 백업·재해복구, 보안 구역을 차례로 지나며 각 구역에서 정하는 설정을 보여 드립니다.</p>
      </div>
      <div className="tour__track" ref={trackRef} style={mode === "3d" ? { height: `${ZONES.length * 100}vh` } : undefined}>
        <div className="tour__sticky">
          <canvas aria-hidden="true" className="tour__canvas" ref={canvasRef} />
          {[0, 1, 2].map((i) => (
            <button
              aria-label={`설정 항목 ${i + 1} 보기`}
              className="tour__hotspot"
              data-active={i === setting}
              key={i}
              onClick={() => choose(i)}
              ref={(el) => {
                hotspotRefs.current[i] = el
              }}
              type="button"
            >
              {i + 1}
            </button>
          ))}
          <div aria-label="구역 이동" className="tour__chips" role="group">
            {ZONES.map((item, index) => (
              <button aria-pressed={index === zone} key={item.key} onClick={() => jumpTo(index)} type="button">
                {item.name}
              </button>
            ))}
          </div>
          {current ? (
            <div aria-live="polite" className="tour__panel">
              <p className="tour__kicker">{String(zone + 1).padStart(2, "0")} / {String(ZONES.length).padStart(2, "0")} 구역</p>
              <h3>{current.name}</h3>
              <p>{current.summary}</p>
              <ul className="tour__settings">
                {current.settings.map((item, index) => (
                  <li key={item.label}>
                    <button aria-pressed={index === setting} onClick={() => choose(index)} type="button">
                      <span>{index + 1}</span>
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              {currentSetting ? <p className="tour__detail">{currentSetting.detail}</p> : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="rd-wrap tour__list">
        <ExplainSteps group="tour-zones" steps={STEPS} />
      </div>
    </section>
  )
}
