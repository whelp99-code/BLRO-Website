import type { Metadata } from "next"
import Link from "next/link"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "BLRO의 역할",
  description: "BLRO가 하는 일과 하지 않는 일입니다. 인증과 고객 목록은 확인 전까지 두지 않습니다.",
  ...canonicalMetadata("/blro"),
}

const DOES = [
  ["01", "운영 조건을 설계 입력으로 바꿉니다.", "도입 목표만으로는 전환 범위를 정할 수 없습니다. 지켜야 할 업무와 바꿀 수 있는 조건을 먼저 구분합니다."],
  ["02", "검증의 통과 기준을 먼저 합의합니다.", "PoC(개념 검증)는 제품 시연이 아니라 다음 단계로 넘어갈 수 있는지를 확인하는 과정입니다. 성공 조건과 롤백 조건을 문서에 남깁니다."],
  ["03", "합의한 공급과 전환 검증을 한 경로로 맡깁니다.", "단순 공급은 공급으로 남기고, 제약이 있을 때만 전환 단계를 붙입니다."],
] as const

const DOES_NOT = [
  "확인되지 않은 고객 사례, 고객 로고, 건수를 올리지 않습니다.",
  "인증, 자격, 파트너 등급을 사실로 적지 않습니다.",
  "확인되지 않은 응답 시간이나 SLA를 쓰지 않습니다.",
  "없는 다운로드 파일을 만들지 않습니다.",
  "기업 고객, 파트너, 엔지니어 상담을 한 문장으로 합치지 않습니다.",
] as const

export default function BlroPage() {
  return (
    <article className="rd">
      <section className="rd-hero">
        <div className="rd-wrap">
          <p className="rd-kicker">주식회사 베를로</p>
          <h1 className="blro-heading blro-heading--h1">하는 일과 하지 않는 일을 같이 적습니다.</h1>
          <p className="rd-lead">BLRO는 인프라·보안 전환에서 현재 환경의 제약과 업무 영향을 먼저 확인하고, 검증·전환·운영 인수가 이어지는 기준을 함께 설계합니다.</p>
        </div>
      </section>
      <section className="rd-chapter">
        <div className="rd-wrap">
          <h2>하는 일</h2>
          <div className="rd-steps">
            {DOES.map(([number, heading, summary]) => (
              <article className="rd-step" data-reveal key={number}>
                <div className="rd-idx">{number}</div>
                <div>
                  <h3>{heading}</h3>
                  <p>{summary}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="rd-band">
        <div className="rd-wrap">
          <h2>하지 않는 일</h2>
          <ul className="rd-checklist">
            {DOES_NOT.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer">도입·운영 상담하기</Link>
        </div>
      </section>
    </article>
  )
}
