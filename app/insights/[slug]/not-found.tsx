import Link from "next/link"
import { Heading, Text } from "@/components/content/typography"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"

export default function InsightNotFound() {
  return <Section spacing="generous"><Container variant="prose"><Heading level={1}>인사이트를 찾을 수 없습니다.</Heading><Text>승인된 공개 인사이트 목록에서 다시 확인해 주세요.</Text><Link className="insight-next__link insight-not-found__link" href="/insights">인사이트 목록 보기</Link></Container></Section>
}
