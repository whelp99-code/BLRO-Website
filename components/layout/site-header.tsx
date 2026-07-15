"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"
import { DesktopNav } from "@/components/layout/desktop-nav"
import { MobileNav } from "@/components/layout/mobile-nav"

export function SiteHeader() {
  const pathname = usePathname() ?? "/"

  return (
    <header className="blro-site-header">
      <Container className="blro-site-header__inner">
        <Link
          aria-label="BLRO 홈"
          className="blro-wordmark"
          href="/"
        >
          <span>BLRO</span>
          <span aria-hidden="true" className="blro-wordmark__signal" />
        </Link>
        <DesktopNav pathname={pathname} />
        <MobileNav pathname={pathname} />
      </Container>
    </header>
  )
}
