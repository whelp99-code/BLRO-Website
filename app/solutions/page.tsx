import type { Metadata } from "next"
import { SolutionIndex } from "@/components/marketing/solution-index"
import { getSolutionCatalog } from "@/lib/solutions"

export const metadata: Metadata = {
  title: "Solutions | BLRO",
  description: "HCI, VDI, 데이터 보호, 네트워크 보안과 SASE를 운영 조건과 검증 기준에서 살펴봅니다.",
}

export default async function SolutionsPage() {
  const catalog = await getSolutionCatalog(new Date())
  return <SolutionIndex solutions={catalog.solutions} />
}
