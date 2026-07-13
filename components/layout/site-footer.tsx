"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"
import { LocaleSwitch } from "@/components/layout/locale-switch"
import {
  footerInquiries,
  footerPolicyLinks,
  primaryNavigation,
  publishedRoutes,
} from "@/lib/navigation"

export type SiteFooterProps = {
  readonly pathname: string
}

export function SiteFooter({ pathname }: SiteFooterProps) {
  return (
    <footer className="blro-site-footer">
      <Container className="blro-site-footer__grid">
        <div className="blro-site-footer__identity">
          <strong>BLRO</strong>
          <p>
            엔터프라이즈 기술과 보안, 파트너 사업, <span className="blro-nowrap">AI 자동화</span>
            {"를 연결하는 "}
            <span className="blro-nowrap">실행 파트너</span>입니다.
          </p>
        </div>
        <nav aria-label="Footer business routes">
          <h2>Business</h2>
          <ul>
            {primaryNavigation.slice(0, 6).map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={publishedRoutes.has(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Footer inquiries">
          <h2>Start a conversation</h2>
          <ul>
            {footerInquiries.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={publishedRoutes.has(item.href)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="blro-site-footer__legal">
        <span>© BLRO</span>
        <nav aria-label="정책">
          {footerPolicyLinks.map((item) => (
            <Link href={item.href} key={item.href} prefetch={publishedRoutes.has(item.href)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <LocaleSwitch pathname={pathname} publishedRoutes={publishedRoutes} />
      </Container>
    </footer>
  )
}

export function SiteFooterShell() {
  return <SiteFooter pathname={usePathname() ?? "/"} />
}
