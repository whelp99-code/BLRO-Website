import type { Metadata } from "next"
import Link from "next/link"
import { TodoNote } from "@/components/redesign/todo-note"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "국내 파트너",
  description: "공동 영업, 제안·PoC, 구축·운영의 역할 초안입니다. 계약이 아닙니다.",
  ...canonicalMetadata("/partner"),
}

const ROWS = [
  ["공동 영업", "기존 관계 유지", "기술 범위 지원", "고객 접점은 파트너가 유지하고, BLRO는 기술 범위를 지원합니다. 제조사 커뮤니케이션의 주체를 제안 전에 적습니다."],
  ["공동 제안·PoC", "상업 조건", "검증 항목과 한계", "성공 기준과 롤백 조건을 문서에 남깁니다."],
  ["구축", "현장 창구 합의", "합의된 설치·전환", "현장 창구는 합의로 정하고, 설치와 전환은 합의된 범위만 수행합니다."],
  ["운영 인수", "운영 조직 연결", "인수 문서 범위", "응답 시간 약속은 확인된 사실이 없어 쓰지 않습니다."],
  ["자료", "요청", "승인된 자료만 제공", "없는 파일은 만들지 않습니다."],
] as const

export default function PartnerPage() {
  return (
    <article className="rd">
      <section className="rd-hero">
        <div className="rd-wrap">
          <p className="rd-kicker" style={{ color: "var(--copper)" }}>국내 파트너</p>
          <h1 className="blro-heading blro-heading--h1">공동 수행은 역할이 적혀 있어야 제안이 됩니다.</h1>
          <p className="rd-lead">파트너 페이지의 일은 영업 기회 공유, 제안서와 PoC의 범위 합의, 구축과 운영에서의 책임 분담, 그리고 자료가 실제로 있는지 확인하는 것입니다.</p>
          <p>승인되지 않은 제안서, 단가표, 자격 증명서는 보유 자산으로 표시하지 않습니다. 협력 문의는 역할 선택 뒤 회사명, 담당, 제안하려는 고객 상황, 이미 합의된 범위를 받습니다. 비밀번호와 고객 자격 증명은 받지 않습니다.</p>
        </div>
      </section>
      <section className="rd-chapter">
        <div className="rd-wrap rd-split">
          <ol className="rd-steps">
            {ROWS.map(([title, partner, blro, detail], index) => (
              <li className="rd-step" data-reveal data-stagger={String(Math.min(index, 3))} key={title}>
                <span className="rd-idx">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{title}</h2>
                  <p>{detail}</p>
                  <p>파트너: {partner}</p>
                  <p>BLRO: {blro}</p>
                </div>
              </li>
            ))}
          </ol>
          <figure className="rd-panel">
            <figcaption className="rd-kicker">설명 그림 · R&R 초안</figcaption>
            <table className="rd-table">
              <thead>
                <tr>
                  <th>일</th>
                  <th>파트너</th>
                  <th>BLRO</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map(([title, partner, blro]) => (
                  <tr key={title}>
                    <td>{title}</td>
                    <td>{partner}</td>
                    <td>{blro}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="rd-caption">표의 칸은 초안이며 계약이 아닙니다. 좁은 화면에서도 왼쪽 단계 설명이 표와 함께 읽힙니다.</p>
            <TodoNote>파트너 등급, 마진, 등록 절차, 공동 브랜드 사용은 오너 사실 없이 약관으로 쓰지 않습니다.</TodoNote>
            <Link className="rd-btn rd-btn-primary" href="/contact?type=partner-collaboration&role=partner">협력 제안하기</Link>
          </figure>
        </div>
      </section>
    </article>
  )
}
