import type { Metadata } from "next"
import type { ReactNode } from "react"
import { parsePublicEnvironment } from "@/lib/env"
import "./globals.css"

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
      <body>{children}</body>
    </html>
  )
}
