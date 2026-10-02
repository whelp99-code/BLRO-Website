import type { Metadata } from "next"
import Link from "next/link"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "판단 과정",
  description: "고객 식별 정보 없이, 전환에서 반복되는 판단 과정을 단계로 보여 줍니다.",
  ...canonicalMetadata("/projects"),
}

const SCENARIOS = [
  {
    number: "01",
    heading: "가상화·HCI 전환 사전 진단",
    summary: "기존 플랫폼의 비용·운영 부담이 커졌을 때, 대체 기술을 고르기 전에 워크로드와 전환 조건을 분류하는 과정입니다.",
    items: ["우선순위 워크로드와 의존성 분류", "용량·장애도메인·데이터 보호 기준", "PoC(개념 검증), 전환 파동, 롤백 조건의 정의"],
  },
  {
    number: "02",
    heading: "분산 환경의 보안 접근 구조 재정의",
    summary: "지점·원격 사용자·클라우드가 함께 있는 환경에서 접근 정책과 운영 책임을 다시 정리하는 과정입니다.",
    items: ["사용자·장치·애플리케이션 접근 흐름", "기존 VPN·ZTNA·네트워크 정책의 경계", "장애 대응과 정책 변경의 운영 책임"],
  },
  {
    number: "03",
    heading: "반복 운영 업무의 자동화 검증",
    summary: "운영 팀의 반복 작업을 줄이되, 승인·기록·예외 처리가 필요한 지점을 유지하는 과정입니다.",
    items: ["반복 업무와 입력 데이터의 신뢰성 확인", "사람 승인과 자동 실행의 경계", "예외 처리, 감사 기록, 운영 인수 기준"],
  },
] as const

export default function ProjectsPage() {
  return (
    <article className="rd">
      <section className="rd-hero">
        <div className="rd-wrap">
          <p className="rd-kicker">프로젝트</p>
          <h1 className="blro-heading blro-heading--h1">고객명이 아닌 판단 과정으로 보여 줍니다.</h1>
          <p className="rd-lead">공개 승인되지 않은 고객명, 성과 수치, 계약 내용은 사용하지 않습니다. 아래는 특정 고객의 결과가 아니라, 검토가 어떤 순서로 시작되는지에 대한 공개용 과정입니다.</p>
        </div>
      </section>
      <section className="rd-chapter">
        <div className="rd-wrap rd-steps">
          {SCENARIOS.map((scenario) => (
            <article className="rd-step" data-reveal key={scenario.number}>
              <div className="rd-idx">{scenario.number}</div>
              <div>
                <h2>{scenario.heading}</h2>
                <p>{scenario.summary}</p>
                <ol>
                  {scenario.items.map((item, index) => (
                    <li key={item}>
                      <span className="rd-idx">{scenario.number}-{String(index + 1)}</span> {item}
                    </li>
                  ))}
                </ol>
              </div>
            </article>
          ))}
        </div>
        <div className="rd-wrap">
          <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer">도입·운영 상담하기</Link>
        </div>
      </section>
    </article>
  )
}
