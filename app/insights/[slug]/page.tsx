import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { InsightDetail } from "@/components/insights/insight-detail"
import { getPublicContent } from "@/lib/content"
import { getBreadcrumbs } from "@/lib/navigation"
import { absoluteUrl, breadcrumbStructuredData, canonicalMetadata } from "@/lib/site"

type InsightPageProps = { readonly params: Promise<{ readonly slug: string }> }

async function getInsight(slug: string) {
  return (await getPublicContent("insight", "ko", new Date())).find((record) => record.meta.slug === slug)
}

export async function generateStaticParams() {
  return (await getPublicContent("insight", "ko", new Date())).map((record) => ({ slug: record.meta.slug }))
}

export async function generateMetadata({ params }: InsightPageProps): Promise<Metadata> {
  const insight = await getInsight((await params).slug)
  return insight
    ? { title: insight.meta.title, description: insight.meta.summary, ...canonicalMetadata(`/insights/${insight.meta.slug}`) }
    : { title: "인사이트를 찾을 수 없습니다." }
}

export default async function InsightPage({ params }: InsightPageProps) {
  const insight = await getInsight((await params).slug)
  if (!insight) notFound()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.meta.title,
    datePublished: insight.meta.publishedAt,
    dateModified: insight.meta.updatedAt,
    inLanguage: "ko-KR",
    mainEntityOfPage: absoluteUrl(`/insights/${insight.meta.slug}`),
    author: { "@type": "Organization", name: "BLRO" },
    publisher: { "@type": "Organization", name: "BLRO" },
  }

  const pathname = `/insights/${insight.meta.slug}`
  const structuredDataWithBreadcrumbs = [structuredData, breadcrumbStructuredData(getBreadcrumbs(pathname))]

  return <><script type="application/ld+json">{JSON.stringify(structuredDataWithBreadcrumbs).replaceAll("<", "\\u003c")}</script><InsightDetail insight={insight} /></>
}
