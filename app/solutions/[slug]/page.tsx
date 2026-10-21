import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SolutionDetail } from "@/components/marketing/solution-detail"
import { SecurityStage } from "@/components/redesign/security-stage"
import { SECURITY_LAYERS } from "@/lib/security-layers"
import { getBreadcrumbs } from "@/lib/navigation"
import { absoluteUrl, breadcrumbStructuredData, canonicalMetadata } from "@/lib/site"
import { getRelatedInsights, getSolutionCatalog, SOLUTION_SLUGS } from "@/lib/solutions"

type SolutionPageProps = {
  readonly params: Promise<{ readonly slug: string }>
}

export function generateStaticParams() {
  return SOLUTION_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params
  const catalog = await getSolutionCatalog(new Date())
  const solution = catalog.solutions.find((record) => record.meta.slug === slug)

  return solution
    ? {
        title: `${solution.meta.title} · Solutions`,
        description: solution.meta.summary,
        ...canonicalMetadata(`/solutions/${solution.meta.slug}`),
      }
    : { title: "솔루션을 찾을 수 없습니다." }
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { slug } = await params
  const catalog = await getSolutionCatalog(new Date())
  const solution = catalog.solutions.find((record) => record.meta.slug === slug)
  if (!solution) notFound()

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    areaServed: "KR",
    audience: solution.meta.audience,
    description: solution.meta.summary,
    name: solution.meta.title,
    provider: { "@type": "Organization", name: "BLRO" },
    url: absoluteUrl(`/solutions/${solution.meta.slug}`),
  }

  const pathname = `/solutions/${solution.meta.slug}`
  const structuredDataWithBreadcrumbs = [structuredData, breadcrumbStructuredData(getBreadcrumbs(pathname))]

  return <><script type="application/ld+json">{JSON.stringify(structuredDataWithBreadcrumbs).replaceAll("<", "\\u003c")}</script><SolutionDetail insights={getRelatedInsights(solution, catalog.insights)} solution={solution} />{solution.meta.slug === "network-security" ? <section aria-label="보안 구성 보기" className="rd hci-stage-section" style={{ paddingBlock: "2rem" }}><div className="rd-wrap"><SecurityStage layers={SECURITY_LAYERS} /></div></section> : null}</>
}
