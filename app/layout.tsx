import type { Metadata } from "next"
import type { ReactNode } from "react"
import { SiteFooterShell } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { parsePublicEnvironment } from "@/lib/env"
import "./globals.css"
import "./navigation.css"

const environment = parsePublicEnvironment(process.env)

export const metadata: Metadata = {
  metadataBase: new URL(environment.NEXT_PUBLIC_SITE_URL),
  title: "BLRO Website Foundation",
  description: "BLRO corporate website implementation foundation.",
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
