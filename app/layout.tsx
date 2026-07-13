import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteFooterShell } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { parsePublicEnvironment } from "@/lib/env"
import "./globals.css"
import "./home.css"
import "./navigation.css"

const environment = parsePublicEnvironment(process.env)

export const metadata: Metadata = {
  metadataBase: new URL(environment.NEXT_PUBLIC_SITE_URL),
  title: "BLRO | 글로벌 기술을 한국 시장의 실제 사업으로",
  description:
    "BLRO는 글로벌 엔터프라이즈 기술을 한국 시장의 고객·파트너·벤더가 도입·판매·운영할 수 있는 사업으로 연결합니다.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <a className="blro-skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooterShell />
      </body>
    </html>
  )
}
