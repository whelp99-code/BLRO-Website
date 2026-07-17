import { Eyebrow, Heading, Text } from "@/components/content/typography"
import { SANGFOR_KOREA_CASES } from "@/lib/external-evidence"

export function SangforKoreaCases() {
  return (
    <section aria-labelledby="sangfor-cases-heading" className="external-cases">
      <div className="external-cases__heading">
        <div>
          <Eyebrow>VENDOR-PUBLISHED KOREA CASES</Eyebrow>
          <Heading id="sangfor-cases-heading" level={3}>Sangfor 국내 공식 사례</Heading>
        </div>
        <Text>
          Sangfor 공식 사이트의 공개 사례를 BLRO의 진단 관점으로 정리한 외부 참고 자료입니다. <span className="blro-nowrap">BLRO 수행 실적</span> 또는 <span className="blro-nowrap">성과 보증</span>이 아닙니다.
        </Text>
      </div>
      <ol className="external-cases__list">
        {SANGFOR_KOREA_CASES.map((item, index) => (
          <li key={item.customer}>
            <div className="external-cases__meta">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.technology}</span>
            </div>
            <Heading level={3}>{item.customer}</Heading>
            <dl>
              <div>
                <dt>공개된 운영 상황</dt>
                <dd>{item.operatingSituation}</dd>
              </div>
              <div>
                <dt>BLRO 진단에 적용할 질문</dt>
                <dd>{item.decisionLesson}</dd>
              </div>
            </dl>
            <a href={item.sourceUrl} rel="noreferrer" target="_blank">
              Sangfor 공식 원문 확인 <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>
      <Text className="external-cases__source-note" variant="small">출처 확인일: 2026년 7월 17일 · 사례의 사실관계와 제품 설명은 각 제조사 원문을 우선합니다.</Text>
    </section>
  )
}
