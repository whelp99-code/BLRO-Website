import { TrackableLink } from "@/components/analytics/trackable-link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

type StrategicSection = {
  readonly heading: string
  readonly items: readonly string[]
  readonly number: string
  readonly summary: string
}

export type StrategicPageProps = {
  readonly ctaId: "strategic-customer-project" | "strategic-partner-collaboration" | "strategic-vendor-korea-entry"
  readonly ctaHref: string
  readonly ctaLabel: string
  readonly eyebrow: string
  readonly heading: React.ReactNode
  readonly intro: string
  readonly sections: readonly StrategicSection[]
  readonly supportingCopy: string
}

export function StrategicPage({ ctaHref, ctaId, ctaLabel, eyebrow, heading, intro, sections, supportingCopy }: StrategicPageProps) {
  return (
    <article className="strategic-page">
      <Section aria-labelledby="strategic-heading" className="strategic-page__hero" spacing="generous">
        <Container>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading className="strategic-page__title" id="strategic-heading" level={1}>{heading}</Heading>
          <Text className="strategic-page__lead" variant="lead">{intro}</Text>
        </Container>
      </Section>

      <Section aria-labelledby="strategic-method-heading" spacing="generous" tone="surface">
        <Container>
          <div className="strategic-page__heading">
            <div>
              <Eyebrow>DECISION FRAMEWORK</Eyebrow>
              <Heading id="strategic-method-heading" level={2}>무엇을 먼저 확인하는가</Heading>
            </div>
            <Text>{supportingCopy}</Text>
          </div>
          <ol className="strategic-page__sections">
            {sections.map((section) => (
              <li key={section.number}>
                <span aria-hidden="true">{section.number}</span>
                <div>
                  <Heading level={3}>{section.heading}</Heading>
                  <Text>{section.summary}</Text>
                  <ul>
                    {section.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section aria-labelledby="strategic-next-heading" className="strategic-page__next" spacing="generous" tone="navy">
        <Container>
          <Eyebrow>NEXT DECISION</Eyebrow>
          <Heading id="strategic-next-heading" level={2}>현재 조건에서 확인할 첫 번째 범위를 정리합니다.</Heading>
          <Text variant="inverse">완성된 답을 전제하지 않습니다. 현재 운영 조건과 의사결정 시점을 함께 확인한 뒤, 필요한 검증과 제외 범위를 정합니다.</Text>
          <TrackableLink className="strategic-page__cta" href={ctaHref} properties={{ ctaId, placement: "strategic-page" }}>
            {ctaLabel} <span aria-hidden="true">↗</span>
          </TrackableLink>
        </Container>
      </Section>
    </article>
  )
}
