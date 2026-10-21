import { act, cleanup, render, screen } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { afterEach, describe, expect, it, vi } from "vitest"
import { DatacenterTour } from "@/components/tour/datacenter-tour"
import { mountTour } from "@/components/tour/tour-scene"

vi.mock("@/components/tour/tour-scene", () => ({
  mountTour: vi.fn(),
}))

const DESKTOP = "(min-width: 900px)"
const REDUCE = "(prefers-reduced-motion: reduce)"

type Rect = { top: number; bottom: number; height?: number }

function box(partial: Rect) {
  const height = partial.height ?? partial.bottom - partial.top
  return {
    top: partial.top,
    bottom: partial.bottom,
    left: 0,
    right: 100,
    width: 100,
    height,
    x: 0,
    y: partial.top,
    toJSON() {
      return {}
    },
  }
}

function installViewport(initial: { desktop: boolean; reduce: boolean }) {
  const matches = new Map<string, boolean>([
    [DESKTOP, initial.desktop],
    [REDUCE, initial.reduce],
  ])
  const listeners = new Map<string, Set<() => void>>()
  window.matchMedia = (query: string) =>
    ({
      get matches() {
        return matches.get(query) ?? false
      },
      media: query,
      addEventListener: (_type: string, listener: () => void) => {
        const group = listeners.get(query) ?? new Set()
        group.add(listener)
        listeners.set(query, group)
      },
      removeEventListener: (_type: string, listener: () => void) => {
        listeners.get(query)?.delete(listener)
      },
      dispatchEvent: () => false,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
    }) as MediaQueryList

  return {
    set(query: string, value: boolean) {
      matches.set(query, value)
      listeners.get(query)?.forEach((listener) => listener())
    },
  }
}

function installObserver() {
  let callback: IntersectionObserverCallback | null = null
  class FakeObserver implements IntersectionObserver {
    readonly root = null
    readonly rootMargin = ""
    readonly scrollMargin = ""
    readonly thresholds = []
    constructor(cb: IntersectionObserverCallback) {
      callback = cb
    }
    observe() {}
    unobserve() {}
    disconnect() {
      callback = null
    }
    takeRecords() {
      return []
    }
  }
  vi.stubGlobal("IntersectionObserver", FakeObserver)
  return {
    intersect() {
      callback?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver)
    },
  }
}

describe("DatacenterTour mode switches", () => {
  const handle = {
    setProgress: vi.fn(),
    setFocus: vi.fn(),
    dispose: vi.fn(),
  }

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
    vi.unstubAllGlobals()
    document.body.replaceChildren()
    Reflect.deleteProperty(window, "matchMedia")
  })

  it("keeps the following chapter still when 3D mounts after the reader has moved on", async () => {
    let scrollY = 4800
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY })
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 })
    window.scrollTo = ((options?: ScrollToOptions | number) => {
      scrollY = typeof options === "object" && options !== null ? (options.top ?? scrollY) : scrollY
    }) as typeof window.scrollTo
    const header = document.createElement("header")
    header.className = "blro-site-header"
    header.getBoundingClientRect = () => box({ top: 0, bottom: 72, height: 72 })
    document.body.appendChild(header)
    installViewport({ desktop: true, reduce: false })
    const observer = installObserver()
    vi.mocked(mountTour).mockReset()
    vi.mocked(mountTour).mockResolvedValue(handle)
    handle.setProgress.mockClear()
    vi.useFakeTimers()

    render(<DatacenterTour />)
    const section = document.querySelector(".tour")
    const track = document.querySelector(".tour__track")
    if (section === null || track === null) throw new Error("tour markup missing")
    section.getBoundingClientRect = () =>
      section.getAttribute("data-mode") === "3d" ? box({ top: -2200, bottom: 2800 }) : box({ top: -2200, bottom: -400 })
    track.getBoundingClientRect = () => box({ top: -1800, bottom: 2800 })

    await act(async () => {
      observer.intersect()
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(section.getAttribute("data-mode")).toBe("3d")
    expect(scrollY).toBe(4800 + (2800 - -400))
  })

  it("does not move the page when 3D mounts while the tour is still the thing on screen", async () => {
    let scrollY = 200
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY })
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 })
    window.scrollTo = ((options?: ScrollToOptions | number) => {
      scrollY = typeof options === "object" && options !== null ? (options.top ?? scrollY) : scrollY
    }) as typeof window.scrollTo
    installViewport({ desktop: true, reduce: false })
    const observer = installObserver()
    vi.mocked(mountTour).mockReset()
    vi.mocked(mountTour).mockResolvedValue(handle)
    vi.useFakeTimers()

    render(<DatacenterTour />)
    const section = document.querySelector(".tour")
    if (section === null) throw new Error("tour markup missing")
    section.getBoundingClientRect = () => box({ top: 120, bottom: 980 })

    await act(async () => {
      observer.intersect()
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(section.getAttribute("data-mode")).toBe("3d")
    expect(scrollY).toBe(200)
  })

  it("hides the fallback accordion from keyboard users while the 3D stage is showing", async () => {
    installViewport({ desktop: true, reduce: false })
    const observer = installObserver()
    vi.mocked(mountTour).mockReset()
    vi.mocked(mountTour).mockResolvedValue(handle)
    vi.useFakeTimers()

    render(<DatacenterTour />)
    const list = document.querySelector(".tour__list")
    if (list === null) throw new Error("accordion missing")
    expect(list.hasAttribute("inert")).toBe(false)
    expect(screen.getAllByRole("group").length).toBeGreaterThan(0)

    await act(async () => {
      observer.intersect()
      await vi.advanceTimersByTimeAsync(250)
    })

    expect(list.hasAttribute("inert")).toBe(true)
    const css = readFileSync(resolve(process.cwd(), "app/redesign.css"), "utf8")
    expect(css).toMatch(/\.tour\[data-mode="3d"\] \.tour__list\s*\{\s*display:\s*none;/u)
    expect(css).not.toMatch(/\.tour\[data-mode="3d"\] \.tour__list[\s\S]*clip-path/u)
  })

  it("returns to the accordion when the viewport becomes narrow or reduced motion is requested", async () => {
    let scrollY = 2600
    Object.defineProperty(window, "scrollY", { configurable: true, get: () => scrollY })
    Object.defineProperty(window, "innerHeight", { configurable: true, value: 800 })
    window.scrollTo = ((options?: ScrollToOptions | number) => {
      scrollY = typeof options === "object" && options !== null ? (options.top ?? scrollY) : scrollY
    }) as typeof window.scrollTo
    const header = document.createElement("header")
    header.className = "blro-site-header"
    header.getBoundingClientRect = () => box({ top: 0, bottom: 72, height: 72 })
    document.body.appendChild(header)
    const media = installViewport({ desktop: true, reduce: false })
    const observer = installObserver()
    vi.mocked(mountTour).mockReset()
    handle.dispose.mockClear()
    vi.mocked(mountTour).mockResolvedValue(handle)
    vi.useFakeTimers()

    render(<DatacenterTour />)
    const section = document.querySelector(".tour")
    const track = document.querySelector(".tour__track")
    if (section === null || track === null) throw new Error("tour markup missing")
    section.getBoundingClientRect = () =>
      section.getAttribute("data-mode") === "3d" ? box({ top: -1400, bottom: 3600 }) : box({ top: 40, bottom: 860 })
    track.getBoundingClientRect = () =>
      section.getAttribute("data-mode") === "3d" ? box({ top: -900, bottom: 3600 }) : box({ top: 0, bottom: 0, height: 0 })

    await act(async () => {
      observer.intersect()
      await vi.advanceTimersByTimeAsync(250)
    })
    expect(section.getAttribute("data-mode")).toBe("3d")

    await act(async () => {
      media.set(DESKTOP, false)
    })

    expect(section.getAttribute("data-mode")).toBe("2d")
    expect(handle.dispose).toHaveBeenCalled()
    expect(document.querySelector(".tour__list")?.hasAttribute("inert")).toBe(false)
    expect(scrollY).toBe(40 + 2600 - 72)

    await act(async () => {
      media.set(DESKTOP, true)
    })
    await act(async () => {
      observer.intersect()
      await vi.advanceTimersByTimeAsync(250)
    })
    expect(section.getAttribute("data-mode")).toBe("3d")

    await act(async () => {
      media.set(REDUCE, true)
    })
    expect(section.getAttribute("data-mode")).toBe("2d")
  })
})
