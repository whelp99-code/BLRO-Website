import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

const PATHS = [
  {
    id: "customer-path",
    label: "기업 고객",
    situation: "가상화 비용과 운영 부담은 커지는데, 어떤 워크로드부터 옮기고 무엇을 남겨야 할지 판단이 필요합니다.",
    promise: (
      <>
        업무 중요도, 허용 중단시간, 보안·규정 조건을 기준으로 <span className="blro-nowrap">설계·PoC(개념 검증)·전환·안정화</span>의 통과 기준을 정리합니다.
      </>
    ),
    action: "기술 프로젝트 상담",
    href: "/contact?type=customer-project",
  },
  {
    id: "partner-path",
    label: "국내 파트너",
    situation: "새 기술을 제안할 수는 있지만, 고객 환경을 진단하고 PoC(개념 검증)와 구축까지 책임질 수행 체계가 필요합니다.",
    promise: "공동영업·기술검증·구축의 역할을 나누고, 파트너가 반복 실행할 수 있도록 기준 문서와 전환 절차를 남깁니다.",
    action: "파트너 공동사업",
    href: "/contact?type=partner-collaboration",
  },
  {
    id: "vendor-path",
    label: "글로벌 벤더",
    situation: "한국 시장에서 기술 가치가 실제 고객 과제와 맞는지, 누가 제안·구축·지원할 것인지 검증해야 합니다.",
    promise: "시장 가설을 고객 검증으로 전환하고, 파트너 역량·기술 지원·레퍼런스 전략을 실행 가능한 범위로 연결합니다.",
    action: "한국 시장 진출",
    href: "/contact?type=vendor-korea-entry",
  },
] as const

export function AudiencePaths() {
  return (
    <Section aria-labelledby="audience-heading" id="audiences" spacing="generous" tone="canvas">
      <Container>
        <div className="home-section-heading home-section-heading--split">
          <div>
            <Eyebrow>ONE SYSTEM · THREE JOURNEYS</Eyebrow>
          <Heading id="audience-heading" level={2}>결정이 필요한 지점에서 시작합니다</Heading>
          </div>
          <Text variant="lead">고객·파트너·벤더의 역할은 다르지만, 중요한 것은 같습니다. 모호한 조건을 검증 가능한 실행으로 바꾸는 일입니다.</Text>
        </div>
        <div className="audience-paths">
          {PATHS.map((path, index) => (
            <article className="audience-path" id={path.id} key={path.id} tabIndex={-1}>
              <div className="audience-path__meta">
                <span aria-hidden="true">0{index + 1}</span>
                <span>{path.action}</span>
              </div>
              <Heading level={3}>{path.label}</Heading>
              <Text className="audience-path__situation" variant="lead">{path.situation}</Text>
              <Text>{path.promise}</Text>
              <TrackableLink
                className="blro-link audience-path__action"
                href={path.href}
                properties={{ ctaId: `audience-${index + 1}`, placement: "audience-path" }}
              >
                {path.action} <span aria-hidden="true">↗</span>
              </TrackableLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
