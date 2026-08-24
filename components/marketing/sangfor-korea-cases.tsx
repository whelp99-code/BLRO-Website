import { Heading, Text } from "@/components/content/typography"
import { SangforKoreaCaseIndex } from "@/components/marketing/sangfor-korea-case-index"
import { SANGFOR_KOREA_CASES, SANGFOR_KOREA_FEATURED_CASES, SANGFOR_KOREA_INDEX_CASES } from "@/lib/external-evidence"

const sourceVerificationDates = [...new Set(SANGFOR_KOREA_CASES.map((item) => item.verifiedAt))]
  .sort()
  .map((value) => {
    const [year, month, day] = value.split("-")
    return `${year}년 ${Number(month)}월 ${Number(day)}일`
  })
  .join(", ")

export function SangforKoreaCases() {
  return (
    <section aria-labelledby="sangfor-cases-heading" className="external-cases">
      <div className="external-cases__heading">
        <div>
          <p className="external-cases__label">국내 구축 경험</p>
          <Heading id="sangfor-cases-heading" level={3}>상포코리아 시절 국내 구축 경험</Heading>
        </div>
        <Text>
          박재민이 상포코리아 지사장 시절 수행한 국내 구축 경험입니다. 사실관계와 제품 설명은 Sangfor 공식 원문을 따릅니다. 현재 BLRO 법인의 수행 계약과 구분할 때는 <span className="blro-nowrap">당시 상포코리아에서 수행</span>한 구축 경험으로 보시면 됩니다.
        </Text>
      </div>
      <ol className="external-cases__featured">
        {SANGFOR_KOREA_FEATURED_CASES.map((item) => (
          <li key={item.evidenceId}>
            <article className="external-cases__card">
              <span className="external-cases__chip">{item.productTag}</span>
              <Heading level={3}>{item.customer}</Heading>
              <p>{item.fact}</p>
              <a href={item.sourceUrl} rel="noreferrer" target="_blank">
                공식 원문 <span aria-hidden="true">↗</span>
              </a>
            </article>
          </li>
        ))}
      </ol>
      <SangforKoreaCaseIndex cases={SANGFOR_KOREA_INDEX_CASES} />
      <Text className="external-cases__source-note" variant="small">
        출처 확인일: {sourceVerificationDates} · 사실관계·제품 설명은 Sangfor 공식 원문
      </Text>
    </section>
  )
}
