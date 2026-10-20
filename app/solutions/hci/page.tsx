import type { Metadata } from "next"
import Link from "next/link"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sangfor HCI",
  description: "Sangfor HCI의 구성과 도입·운영 검토 항목, 제조사 공식 자료 및 상담 경로를 안내합니다.",
  ...canonicalMetadata("/solutions/hci"),
}

const LAYERS = [
  ["컴퓨트", "업무 시스템을 올리는 층입니다. 필요한 대수와 성능은 상담에서 확인합니다."],
  ["스토리지", "클러스터 안에 데이터를 두는 층입니다. 별도 스토리지(aStor)가 필요한지도 함께 확인합니다."],
  ["네트워크", "업무망과 관리망을 나누어 구성하는지 확인합니다."],
  ["관리", "HCI 관리 화면과 별개로, 자원 관리와 운영 담당 체계(SCP)가 필요한지 확인합니다."],
] as const

const QUESTIONS = [
  "올릴 업무 시스템과 지금 가상화의 종류",
  "전환 중 멈출 수 있는 시간과 되돌릴 조건",
  "데이터 보호: 백업 주기, 보관 위치, 복구 담당",
  "랙, 전력, 냉각, 기존 네트워크 구분",
  "국내 공급 조건과 BLRO 수행 범위",
] as const

export default function HciPage() {
  return (
    <article className="rd">
      <section className="rd-hero life-scroll">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker">제품 상세</p>
            <h1 className="blro-heading blro-heading--h1">Sangfor HCI</h1>
            <p className="rd-lead">컴퓨트, 스토리지, 네트워크를 통합해 업무 시스템을 운영하는 인프라입니다. 현재 환경과 전환 조건을 기준으로 도입 범위를 함께 검토합니다.</p>
            <p className="rd-actions">
              <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer&product=hci">도입·운영 상담하기</Link>
              <a className="rd-btn rd-btn-ghost" href="#talk">상담에 보낼 내용</a>
            </p>
            <p>
              제품 사양과 지원 조건은{" "}
              <a href="https://www.sangfor.com/cloud-and-infrastructure/products/hci-hyper-converged-infrastructure">
                Sangfor HCI 공식 안내
              </a>
              에서 확인할 수 있습니다.
            </p>
          </div>
          <figure className="rd-panel">
            <figcaption className="rd-kicker">검토용 분해도 · HCI 구성</figcaption>
            <ol className="rd-layers">
              {LAYERS.map(([name, detail], index) => (
                <li data-step data-stagger={String(Math.min(index, 3))} key={name}>
                  <strong>{name}</strong>
                  <span>{detail}</span>
                </li>
              ))}
            </ol>
            <p className="rd-caption">구성별 검토 항목입니다. 실제 구성과 지원 조건은 제품 버전과 도입 범위에 따라 확인합니다.</p>
          </figure>
        </div>
      </section>

      <section className="rd-chapter">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>역할</h2>
            <p>HCI는 컴퓨트와 스토리지, 네트워크를 한 클러스터로 묶어 업무 시스템을 운영하는 기반입니다. 현재 가상화 환경, 전환 제약, 데이터 보호 요구를 함께 검토합니다.</p>
            <h2>검토 조건</h2>
            <ol className="rd-checklist">
              {QUESTIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div data-reveal>
            <h2>관련 제품</h2>
            <p>aSV는 가상화 계층으로, HCI와 함께 검토할 수 있습니다. Sangfor SCP는 관리할 자원과 운영 담당을 위한 플랫폼이며 HCI 관리 화면과는 따로 검토합니다. aDesk VDI는 사용자와 단말의 업무 화면이고, aStor는 별도 스토리지 구성입니다.</p>
            <h2>적용 한계</h2>
            <p>포트, 호환성과 기능은 제품 버전의 공식 문서로 확인합니다. 외부 방화벽·스위치, 서버 접근 제어, 관제와 SLA는 별도 검토 항목입니다. 공급·구축·지원에 포함되는 범위는 상담에서 확인합니다.</p>
          </div>
        </div>
      </section>

      <section className="rd-band">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>도입 준비</h2>
            <p>현재 클러스터 또는 서버 대수, 주요 업무 시스템, 가상화 제품명, 백업 현황과 중단 가능한 시간을 준비해 주세요. 모델명이 정해지지 않아도 상담할 수 있습니다.</p>
            <h2>제품 자료</h2>
            <p>제품 정보는 제조사 공식 안내에서 확인할 수 있습니다. 필요한 한국어 자료는 상담 시 문의해 주세요.</p>
          </div>
          <div>
            <div className="rd-panel" data-reveal id="talk">
              <strong>상담에 같이 보낼 것</strong>
              <p>관심 제품은 HCI입니다. 고객은 상황과 현재 환경을, 엔지니어는 버전과 증상을, 파트너는 이미 합의된 범위를 적습니다.</p>
              <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer&product=hci">도입·운영 상담하기</Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
