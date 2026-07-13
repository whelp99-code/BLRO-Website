import { join } from "node:path"
import { AudiencePaths } from "@/components/marketing/audience-paths"
import { CapabilityIndex } from "@/components/marketing/capability-index"
import { ConversionPanel } from "@/components/marketing/conversion-panel"
import { EvidenceList } from "@/components/marketing/evidence-list"
import { Hero } from "@/components/marketing/hero"
import { ProcessTimeline } from "@/components/marketing/process-timeline"
import { createContentIndex } from "@/lib/content"

export const HOME_HEADING = "글로벌 기술을 한국 시장의 실제 사업으로 연결합니다."

export default async function Home() {
  const content = await createContentIndex({
    contentRoot: join(process.cwd(), "content"),
    now: new Date(),
  })
  const services = content.publicRecords.filter((record) => record.type === "service")
  const insights = content.publicRecords.filter((record) => record.type === "insight").slice(0, 3)

  return (
    <div className="home-page">
      <Hero heading={HOME_HEADING} />
      <CapabilityIndex />
      <AudiencePaths />
      <ProcessTimeline />
      <EvidenceList insights={insights} services={services} />
      <ConversionPanel />
    </div>
  )
}
