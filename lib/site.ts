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
  "BLRO는 기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다."

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
