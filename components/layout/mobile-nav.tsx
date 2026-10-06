"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { isCurrentRoute, primaryNavigation } from "@/lib/navigation"

export type MobileNavProps = {
  readonly pathname: string
}

export function MobileNav({ pathname }: MobileNavProps) {
  const [openPathname, setOpenPathname] = useState<string>()
  const [previousPathname, setPreviousPathname] = useState(pathname)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  const isOpen = openPathname === pathname

  if (previousPathname !== pathname) {
    setPreviousPathname(pathname)
    setOpenPathname(undefined)
  }

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.querySelector<HTMLElement>("button, a")?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  const closeMenu = () => {
    setOpenPathname(undefined)
    triggerRef.current?.focus()
  }

  const trapFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault()
      closeMenu()
      return
    }
    if (event.key !== "Tab") return

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>("button, a")
    if (!focusable || focusable.length === 0) return
    const first = focusable.item(0)
    const last = focusable.item(focusable.length - 1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <nav aria-label="주 내비게이션" className="blro-mobile-nav">
      <button
        aria-expanded={isOpen}
        aria-label="메뉴 열기"
        className="blro-mobile-nav__trigger"
        onClick={() => setOpenPathname(pathname)}
        ref={triggerRef}
        type="button"
      >
        <span aria-hidden="true" className="blro-mobile-nav__bars" />
      </button>
      {isOpen ? (
        <div
          className="blro-mobile-nav__backdrop"
          data-testid="mobile-nav-backdrop"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) closeMenu()
          }}
        >
          <div
            aria-label="모바일 내비게이션"
            aria-modal="true"
            className="blro-mobile-nav__dialog"
            onKeyDown={trapFocus}
            ref={dialogRef}
            role="dialog"
          >
            <div className="blro-mobile-nav__heading">
              <span>메뉴</span>
              <button aria-label="메뉴 닫기" onClick={closeMenu} type="button">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <ul>
                {primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <a
                      aria-current={isCurrentRoute(pathname, item.href) ? "page" : undefined}
                      className={item.href === "/contact" ? "blro-nav-cta" : undefined}
                      href={item.href}
                    >
                      {item.label}
                    </a>
                    {item.children.length > 0 ? (
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a href={child.href}>
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ) : null}
    </nav>
  )
}
