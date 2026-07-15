import type { Metadata } from "next"
import { parsePublicEnvironment } from "@/lib/env"

type BreadcrumbStructuredDataItem = {
  readonly href: string
  readonly label: string
}

const environment = parsePublicEnvironment(process.env)

export const siteUrl = new URL(environment.NEXT_PUBLIC_SITE_URL)

export const siteName = "BLRO"

export const siteDescription =
  "BLRO는 인프라·보안 전환을 앞둔 기업이 기술 비교를 실제 운영 판단으로 바꿀 수 있도록, 현황 진단부터 검증·전환·안정화까지 연결합니다."

export function absoluteUrl(pathname = "/"): string {
  return new URL(pathname, siteUrl).toString()
}

export function isIndexableSite(): boolean {
  return (
    siteUrl.protocol === "https:" &&
    siteUrl.hostname !== "localhost" &&
    !siteUrl.hostname.endsWith(".pages.dev") &&
    !siteUrl.hostname.endsWith(".example")
  )
}

export function canonicalMetadata(pathname: string): Pick<Metadata, "alternates"> {
  return { alternates: { canonical: pathname } }
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: absoluteUrl(),
  description: siteDescription,
}

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: absoluteUrl(),
  inLanguage: "ko-KR",
}

export function breadcrumbStructuredData(items: readonly BreadcrumbStructuredDataItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  }
}
