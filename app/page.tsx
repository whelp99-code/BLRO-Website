import { join } from "node:path"
import { AudiencePaths } from "@/components/marketing/audience-paths"
import { CapabilityIndex } from "@/components/marketing/capability-index"
import { ConversionPanel } from "@/components/marketing/conversion-panel"
import { EvidenceList } from "@/components/marketing/evidence-list"
import { Hero } from "@/components/marketing/hero"
import { ProcessTimeline } from "@/components/marketing/process-timeline"
import { createContentIndex } from "@/lib/content"

export const HOME_HEADING = "가상화·보안 전환, 무엇부터 검증할지 먼저 정리합니다."

export default async function Home() {
  const content = await createContentIndex({
    contentRoot: join(process.cwd(), "content"),
    now: new Date(),
  })
  const services = content.publicRecords.filter((record) => record.type === "service")
  const insights = content.publicRecords.filter((record) => record.type === "insight")

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
