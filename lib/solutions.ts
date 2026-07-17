import { join } from "node:path"
import { createContentIndex, type ContentRecord } from "@/lib/content"

export const SOLUTION_SLUGS = [
  "hci-private-cloud",
  "vdi-digital-workspace",
  "backup-disaster-recovery",
  "network-security",
  "sase-global-connectivity",
] as const

export type SolutionSlug = (typeof SOLUTION_SLUGS)[number]

export const audienceLabels = {
  customer: "기업 고객",
  partner: "국내 파트너",
  vendor: "글로벌 벤더",
} as const

type DecisionMap = {
  readonly title: string
  readonly description: string
  readonly stages: readonly {
    readonly label: string
    readonly detail: string
  }[]
  readonly outcome: string
}

export const solutionDecisionMaps: Record<SolutionSlug, DecisionMap> = {
  "hci-private-cloud": {
    title: "유지·전환·혼합 운영을 같은 기준에서 비교합니다.",
    description: "워크로드를 한 번에 옮긴다는 가정 대신, 현재 3‑Tier를 유지할 영역과 가상화·HCI로 검증할 영역을 구분합니다.",
    stages: [
      { label: "WORKLOAD", detail: "업무 중요도·의존성·허용 중단시간" },
      { label: "CAPACITY", detail: "CPU·메모리·IOPS·용량 증가율" },
      { label: "RESILIENCE", detail: "장애도메인·백업·DR 연계" },
      { label: "DECISION", detail: "PoC·리허설·롤백 기준" },
    ],
    outcome: "목표 아키텍처, 용량·장애도메인 산정, PoC 통과 기준과 단계별 전환 계획을 정리합니다.",
  },
  "vdi-digital-workspace": {
    title: "사용자 수가 아니라 업무 경험과 통제 조건을 먼저 분류합니다.",
    description: "일반 사무·고보안·GPU·현장 업무를 같은 데스크톱 모델로 묶지 않고, 대표 사용자 그룹의 실제 업무 흐름으로 검증합니다.",
    stages: [
      { label: "PERSONA", detail: "사용자 역할·주변기기·데이터 요구" },
      { label: "APPLICATION", detail: "핵심 앱·프로파일·GPU 필요도" },
      { label: "POLICY", detail: "MFA·단말·클립보드·파일 전송" },
      { label: "PILOT", detail: "대표 그룹·성능·운영 인수" },
    ],
    outcome: "사용자·애플리케이션 프로파일, 목표 구성과 보안 정책, 파일럿 검증 시나리오를 만듭니다.",
  },
  "backup-disaster-recovery": {
    title: "백업 보유 여부가 아니라 복구 가능한 업무 순서를 확인합니다.",
    description: "데이터 보호 수단을 나열하기 전에 업무 영향, 복구 목표와 의존성을 기준으로 복구 순서와 리허설 범위를 합의합니다.",
    stages: [
      { label: "IMPACT", detail: "업무 영향·외부 의존성·우선순위" },
      { label: "OBJECTIVE", detail: "RPO·RTO·데이터 보호 책임" },
      { label: "SCENARIO", detail: "랜섬웨어·장애·운영 실수" },
      { label: "REHEARSAL", detail: "기동 순서·인수·원복 조건" },
    ],
    outcome: "복구 목표·우선순위, 데이터 보호 정책, DR 아키텍처와 훈련 판정 기준을 정리합니다.",
  },
  "network-security": {
    title: "도구 목록이 아니라 접근·대응 책임이 이어지는지 확인합니다.",
    description: "인터넷·지점·원격 사용자·클라우드 사이의 실제 접근 흐름을 먼저 그리고, 탐지부터 조사·차단·복구까지의 책임을 연결합니다.",
    stages: [
      { label: "FLOW", detail: "사용자·장치·애플리케이션 경로" },
      { label: "POLICY", detail: "접근 조건·예외 승인·신뢰 경계" },
      { label: "RESPONSE", detail: "탐지·조사·차단·복구 책임" },
      { label: "EVIDENCE", detail: "로그·통합 지점·시험 시나리오" },
    ],
    outcome: "접근 흐름도, 정책 매트릭스, 보안 운영 모델과 전환·운영 인수 기준을 정리합니다.",
  },
  "sase-global-connectivity": {
    title: "회선이 아니라 업무 경로와 장애 책임을 같은 화면에서 봅니다.",
    description: "지점·원격 사용자·SaaS·사내 애플리케이션이 만나는 경로를 기준으로 정책, 전환 조건과 지역별 책임을 설계합니다.",
    stages: [
      { label: "PATH", detail: "지점·사용자·SaaS·사내 앱 경로" },
      { label: "QUALITY", detail: "품질 저하 지점·경로 전환 조건" },
      { label: "CONTROL", detail: "신원·장치·애플리케이션 정책" },
      { label: "OWNERSHIP", detail: "지역별 장애 연락·승인·롤백" },
    ],
    outcome: "접속 경로·품질 기준, 정책 매트릭스, 파일럿 통과 기준과 운영 책임표를 정리합니다.",
  },
}

export const PROTECTED_INSIGHT_TITLE_PHRASES = [
  "업무 기준으로",
  "적용 기준",
  "SASE와 SD-WAN의",
] as const

export type SolutionCatalog = {
  readonly insights: readonly ContentRecord[]
  readonly solutions: readonly ContentRecord[]
}

export function formatSolutionCopy(
  value: string,
  protectedPhrases: readonly string[] = [],
): string {
  const normalizedValue = value.replaceAll("-", "\u2011")
  const protectedValue = protectedPhrases.reduce((copy, phrase) => {
    const normalizedPhrase = phrase.replaceAll("-", "\u2011")
    return copy.replaceAll(normalizedPhrase, normalizedPhrase.replaceAll(" ", "\u00a0"))
  }, normalizedValue)

  return protectedValue.replace(/ (?=\S+$)/u, "\u00a0")
}

export function isSolutionSlug(value: string): value is SolutionSlug {
  return SOLUTION_SLUGS.some((slug) => slug === value)
}

export async function getSolutionCatalog(now: Date): Promise<SolutionCatalog> {
  const index = await createContentIndex({ contentRoot: join(process.cwd(), "content"), now })
  const publicKoreanRecords = index.publicRecords.filter((record) => record.meta.locale === "ko")
  const services = publicKoreanRecords.filter((record) => record.type === "service")

  return {
    insights: publicKoreanRecords.filter((record) => record.type === "insight"),
    solutions: SOLUTION_SLUGS.flatMap((slug) => {
      const solution = services.find((record) => record.meta.slug === slug)
      return solution ? [solution] : []
    }),
  }
}

export function getRelatedInsights(
  solution: ContentRecord,
  insights: readonly ContentRecord[],
): readonly ContentRecord[] {
  const relatedIds = new Set(
    solution.meta.relatedContent
      .filter((reference) => reference.startsWith("insight:"))
      .map((reference) => reference.slice("insight:".length)),
  )
  return insights.filter((insight) => relatedIds.has(insight.meta.slug))
}
