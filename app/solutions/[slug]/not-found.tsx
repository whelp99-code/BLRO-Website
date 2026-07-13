import Link from "next/link"
import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

export default function SolutionNotFound() {
  return (
    <Section aria-labelledby="solution-not-found-heading" className="solution-not-found" spacing="generous">
      <Container>
        <Eyebrow>404 · SOLUTION ROUTE</Eyebrow>
        <Heading id="solution-not-found-heading" level={1}>솔루션을 찾을 수 없습니다.</Heading>
        <Text variant="lead">주소가 변경되었거나 아직 공개되지 않은 솔루션입니다. 현재 공개된 다섯 가지 검토 영역에서 다시 시작해 주세요.</Text>
        <Link className="solution-not-found__link" href="/solutions">솔루션 전체 보기</Link>
      </Container>
    </Section>
  )
}
