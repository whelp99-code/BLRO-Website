import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const CAPABILITIES = [
  {
    name: "가상화 · HCI · 프라이빗 클라우드",
    summary: "라이선스나 장비 교체만 보지 않습니다. 워크로드의 중요도, 용량 증가, 장애도메인, 기존 스토리지 활용과 운영 인력을 함께 보고 전환 경로를 설계합니다.",
    scope: ["워크로드 분류", "용량 기준", "장애도메인", "마이그레이션"],
    href: "/solutions/hci-private-cloud",
  },
  {
    name: "보안 운영 · SASE · 연결성",
    summary: "경계 장비를 늘리기보다 사용자가 어떤 애플리케이션에 어떤 조건으로 접속하는지부터 정리합니다. 지점·원격 사용자·클라우드의 정책과 장애 대응 책임을 하나의 운영 모델로 묶습니다.",
    scope: ["접근 흐름", "정책 매트릭스", "SASE", "SD-WAN"],
    href: "/solutions/network-security",
  },
  {
    name: "VDI · 디지털 워크스페이스",
    summary: "동시 사용자 수가 아니라 사용자 역할과 애플리케이션 특성으로 시작합니다. 일반 업무, 고보안 업무, GPU 업무, 현장·콜센터 환경을 구분해 성능과 보안의 타협점을 검증합니다.",
    scope: ["사용자 프로파일", "GPU", "접속 정책", "단말 보안"],
    href: "/solutions/vdi-digital-workspace",
  },
  {
    name: "검증 · 전환 · 운영 인수",
    summary: "PoC는 데모가 아니라 통과 기준을 확인하는 과정이어야 합니다. 호환성, 성능, 복구, 보안정책, 전환 창과 운영 인수 조건을 사전에 문서화해 다음 단계의 리스크를 낮춥니다.",
    scope: ["PoC 기준", "전환 리허설", "복구 훈련", "운영 인수"],
    href: "/solutions",
  },
] as const

export function CapabilityIndex() {
  return (
    <Section aria-labelledby="capability-heading" id="capabilities" spacing="generous" tone="surface">
      <Container>
        <div className="home-section-heading">
          <Eyebrow>CAPABILITY INDEX</Eyebrow>
          <Heading id="capability-heading" level={2}>고객이 먼저 확인해야 할 네 가지</Heading>
          <Text variant="lead">솔루션 목록이 아니라, 도입 이후에도 운영 가능한가를 판단하는 기준입니다.</Text>
        </div>
        <ol className="capability-index">
          {CAPABILITIES.map((capability, index) => (
            <li className="capability-index__item" key={capability.name}>
              <span aria-hidden="true" className="capability-index__number">0{index + 1}</span>
              <div className="capability-index__content">
                <Heading level={3}>{capability.name}</Heading>
                <Text>{capability.summary}</Text>
                <Link className="capability-index__action" href={capability.href}>
                  검토 기준 보기 <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <Text className="capability-index__scope" variant="small">
                {capability.scope.map((term) => (
                  <span className="capability-index__scope-term" key={term}>{term}</span>
                ))}
              </Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
import Link from "next/link"
