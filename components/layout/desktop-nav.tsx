"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { isCurrentRoute, primaryNavigation } from "@/lib/navigation"

export type DesktopNavProps = {
  readonly pathname: string
}

export function DesktopNav({ pathname }: DesktopNavProps) {
  const [openMenu, setOpenMenu] = useState<{ readonly href: string; readonly pathname: string }>()
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const [activeIndex, setActiveIndex] = useState(() => {
    const currentIndex = primaryNavigation.findIndex((item) => isCurrentRoute(pathname, item.href))
    return currentIndex < 0 ? 0 : currentIndex
  })
  const navRef = useRef<HTMLElement>(null)
  const focusMenuOnOpenRef = useRef<string | undefined>(undefined)
  const triggerRefs = useRef(new Map<string, HTMLButtonElement>())

  const openHref = openMenu?.pathname === pathname ? openMenu.href : undefined

  if (previousPathname !== pathname) {
    const currentIndex = primaryNavigation.findIndex((item) => isCurrentRoute(pathname, item.href))
    setPreviousPathname(pathname)
    setOpenMenu(undefined)
    setActiveIndex(currentIndex < 0 ? 0 : currentIndex)
  }

  useEffect(() => {
    if (!openHref) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setOpenMenu(undefined)
      }
    }
    document.addEventListener("pointerdown", closeOutside)
    return () => document.removeEventListener("pointerdown", closeOutside)
  }, [openHref])

  useEffect(() => {
    if (focusMenuOnOpenRef.current !== openHref) return
    navRef.current?.querySelector<HTMLElement>(`#desktop-menu-${activeIndex} a`)?.focus()
    focusMenuOnOpenRef.current = undefined
  }, [activeIndex, openHref])

  const focusControl = (index: number) => {
    setActiveIndex(index)
    const controls = navRef.current?.querySelectorAll<HTMLElement>("[data-primary-control]")
    controls?.item(index).focus()
  }

  const handleControlKey = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const lastIndex = primaryNavigation.length - 1
    if (event.key === "ArrowRight") {
      event.preventDefault()
      focusControl(index === lastIndex ? 0 : index + 1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      focusControl(index === 0 ? lastIndex : index - 1)
    } else if (event.key === "Home") {
      event.preventDefault()
      focusControl(0)
    } else if (event.key === "End") {
      event.preventDefault()
      focusControl(lastIndex)
    } else if (event.key === "ArrowDown" && primaryNavigation[index]?.children.length) {
      event.preventDefault()
      const item = primaryNavigation[index]
      focusMenuOnOpenRef.current = item.href
      setActiveIndex(index)
      setOpenMenu({ href: item.href, pathname })
    }
  }

  const closeWithFocus = (href: string) => {
    setOpenMenu(undefined)
    triggerRefs.current.get(href)?.focus()
  }

  return (
    <nav
      aria-label="주 내비게이션"
      className="blro-desktop-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape" && openHref) {
          event.preventDefault()
          closeWithFocus(openHref)
        }
      }}
      ref={navRef}
    >
      <ul>
        {primaryNavigation.map((item, index) => {
          const isCurrent = isCurrentRoute(pathname, item.href)
          const isOpen = openHref === item.href
          return (
            <li key={item.href}>
              {item.children.length > 0 ? (
                <button
                  aria-controls={`desktop-menu-${index}`}
                  aria-current={isCurrent ? "page" : undefined}
                  aria-expanded={isOpen}
                  aria-label={`${item.label} 메뉴`}
                  data-primary-control
                  onClick={() => {
                    setActiveIndex(index)
                    setOpenMenu(isOpen ? undefined : { href: item.href, pathname })
                  }}
                  onKeyDown={(event) => handleControlKey(event, index)}
                  ref={(element) => {
                    if (element) triggerRefs.current.set(item.href, element)
                  }}
                  tabIndex={activeIndex === index ? 0 : -1}
                  type="button"
                >
                  {item.label}
                  <span aria-hidden="true">⌄</span>
                </button>
              ) : (
                <a
                  aria-current={isCurrent ? "page" : undefined}
                  className={item.href === "/contact" ? "blro-nav-cta" : undefined}
                  data-primary-control
                  href={item.href}
                  onKeyDown={(event) => handleControlKey(event, index)}
                  tabIndex={activeIndex === index ? 0 : -1}
                >
                  {item.label}
                </a>
              )}
              {isOpen ? (
                <div className="blro-megamenu" id={`desktop-menu-${index}`}>
                  <a
                    aria-label={`${item.label} 전체 개요 보기`}
                    className="blro-megamenu__overview"
                    href={item.href}
                  >
                    <strong>{item.label}</strong>
                    <span>전체 개요 보기</span>
                  </a>
                  <ul>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <a href={child.href}>
                          <strong>{child.label}</strong>
                          <span>{child.description}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
