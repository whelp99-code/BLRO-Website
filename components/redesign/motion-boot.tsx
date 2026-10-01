"use client"

import { useEffect } from "react"

export function MotionBoot() {
  useEffect(() => {
    const root = document.documentElement
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const nodes = document.querySelectorAll("[data-reveal], [data-step]")
    const progress = document.querySelectorAll(".life-progress")
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add("is-in")
          if (entry.target.classList.contains("life-progress")) entry.target.classList.add("is-drawn")
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.2 },
    )

    const apply = () => {
      root.classList.remove("js-io", "js-timeline")
      observer.disconnect()
      if (media.matches) return
      root.classList.add("js-io")
      const timeline = typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")
      if (timeline) root.classList.add("js-timeline")
      for (const node of nodes) observer.observe(node)
      if (!timeline) {
        for (const node of progress) observer.observe(node)
      }
    }

    apply()
    media.addEventListener("change", apply)
    return () => {
      media.removeEventListener("change", apply)
      observer.disconnect()
      root.classList.remove("js-io", "js-timeline")
    }
  }, [])

  return null
}
