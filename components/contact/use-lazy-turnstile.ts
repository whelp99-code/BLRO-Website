"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// Turnstile 스크립트(약 700KB)는 폼이 화면 근처에 오거나 사용자가 폼에 손댈 때 불러옵니다.
// 첫 화면 로딩(LCP)과 경쟁하지 않게 하려는 목적입니다.
export function useLazyTurnstile() {
  const formRef = useRef<HTMLFormElement>(null)
  const [shouldLoad, setShouldLoad] = useState(false)
  const trigger = useCallback(() => setShouldLoad(true), [])

  useEffect(() => {
    const node = formRef.current
    if (shouldLoad || node === null) return
    if (typeof IntersectionObserver === "undefined") return // 폼에 포커스하면 trigger()가 불러옵니다.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin: "300px" },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [shouldLoad])

  return { formRef, shouldLoad, trigger }
}
