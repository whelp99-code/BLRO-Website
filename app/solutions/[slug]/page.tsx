import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SolutionDetail } from "@/components/marketing/solution-detail"
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
    ? { title: `${solution.meta.title} | BLRO Solutions`, description: solution.meta.summary }
    : { title: "솔루션을 찾을 수 없습니다. | BLRO" }
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
    url: `/solutions/${solution.meta.slug}`,
  }

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>
      <SolutionDetail insights={getRelatedInsights(solution, catalog.insights)} solution={solution} />
    </>
  )
}
