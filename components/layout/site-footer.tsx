"use client"

import { usePathname } from "next/navigation"
import { Container } from "@/components/layout/container"
import { LocaleSwitch } from "@/components/layout/locale-switch"
import {
  footerBusinessRoutes,
  footerInquiries,
  footerPolicyLinks,
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
          <p>
            주식회사 베를로 · 대표 박재민 · 사업자등록번호 420-87-02727
            {" · "}
            <a href="tel:010-8896-1260">010-8896-1260</a>
            {" · "}
            <a href="mailto:jm.park@blro.co.kr">jm.park@blro.co.kr</a>
          </p>
          <p>소재지는 확인 전이라 적지 않습니다.</p>
        </div>
        <nav aria-label="사업">
          <h2>사업</h2>
          <ul>
            {footerBusinessRoutes.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="상담">
          <h2>상담 시작</h2>
          <ul>
            {footerInquiries.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
      <Container className="blro-site-footer__legal">
        <span>© BLRO</span>
        <nav aria-label="정책">
          {footerPolicyLinks.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
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
