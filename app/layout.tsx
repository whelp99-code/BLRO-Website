import type { Metadata } from "next"
import type { ReactNode } from "react"
import { AnalyticsProvider } from "@/components/analytics/analytics-provider"
import { ConsentManager } from "@/components/analytics/consent-manager"
import { SiteFooterShell } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { MotionBoot } from "@/components/redesign/motion-boot"
import { organizationStructuredData, siteDescription, siteName, siteUrl, websiteStructuredData } from "@/lib/site"
import "./pretendard.css"
import "./globals.css"
import "./home.css"
import "./insights.css"
import "./navigation.css"
import "./contact.css"
import "./strategic.css"
import "./redesign.css"

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: { default: "BLRO | 기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다.", template: "%s | BLRO" },
  description: siteDescription,
  alternates: { canonical: "/" },
  verification: {
    other: {
      "naver-site-verification": "31a34b84b4e54d714d367bded4b7a007ffea207b",
    },
  },
  openGraph: { type: "website", locale: "ko_KR", siteName, title: "BLRO | 기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다.", description: siteDescription },
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
    shortcut: "/favicon.ico",
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationStructuredData, websiteStructuredData]).replaceAll("<", "\\u003c") }} />
        <a className="blro-skip-link" href="#main-content">
          본문으로 건너뛰기
        </a>
        <SiteHeader />
        <ConsentManager />
        <AnalyticsProvider />
        <MotionBoot />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooterShell />
      </body>
    </html>
  )
}
