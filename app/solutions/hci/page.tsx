import type { Metadata } from "next"
import Link from "next/link"
import { TodoNote } from "@/components/redesign/todo-note"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "Sangfor HCI",
  description: "업무 시스템을 실행하는 통합 인프라를 검토할 때 여는 페이지입니다. 사양 수치는 확인 전까지 비어 있습니다.",
  ...canonicalMetadata("/solutions/hci"),
}

const LAYERS = [
  ["컴퓨트", "업무 시스템을 올리는 층입니다. 대수와 성능은 이 그림에 없습니다."],
  ["스토리지", "클러스터 안의 데이터 질문입니다. 별도 aStor 검토를 지우지 않습니다."],
  ["네트워크", "업무망과 관리망을 한 선으로 그리지 않습니다."],
  ["관리", "관리 화면이 보인다고 SCP 검토가 끝난 것은 아닙니다."],
] as const

const QUESTIONS = [
  "올릴 업무 시스템과 지금 가상화의 종류",
  "전환 중 멈출 수 있는 시간과 되돌릴 조건",
  "데이터 보호: 백업 주기, 보관 위치, 복구 담당",
  "랙, 전력, 냉각, 기존 네트워크 구분",
  "국내 공급과 BLRO 수행 범위 (미확정, B02/B03)",
] as const

export default function HciPage() {
  return (
    <article className="rd">
      <section className="rd-hero life-scroll">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker">제품 상세 · 시안 1/21</p>
            <h1 className="blro-heading blro-heading--h1">Sangfor HCI</h1>
            <p className="rd-lead">업무 시스템을 실행하는 통합 인프라를 검토할 때 여는 페이지입니다. 제조사 사양을 BLRO의 공급·수행 약속으로 바꾸지 않습니다.</p>
            <p>
              공식 URL:{" "}
              <a href="https://www.sangfor.com/cloud-and-infrastructure/products/hci-hyper-converged-infrastructure">
                sangfor.com HCI
              </a>
              . 확인일: 2026-09-30 시도, Cloudflare에 차단되어 본문 사양을 재수집하지 못했습니다.
            </p>
            <TodoNote>노드 수, 성능, 라이선스, 지원 하이퍼바이저는 공식 페이지를 다시 열기 전에는 적지 않습니다.</TodoNote>
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
            <p className="rd-caption">검토용 분해도입니다. 노드 수, 성능, 라이선스는 적지 않습니다. 제조사 도면의 복제가 아닙니다. 모션을 줄이면 네 층이 처음부터 보입니다.</p>
          </figure>
        </div>
      </section>

      <section className="rd-chapter">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>역할</h2>
            <p>HCI는 컴퓨트와 스토리지, 네트워크를 한 클러스터로 묶어 업무 시스템을 올리는 검토 출발점입니다. BLRO 페이지에서의 역할은 그 출발점을 고객의 현재 가상화, 전환 제약, 데이터 보호와 연결하는 것입니다. 마케팅 문구의 통합률이나 절감률은 확인된 수치가 없어 적지 않습니다.</p>
            <h2>검토 조건</h2>
            <ol className="rd-checklist">
              {QUESTIONS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>
          <div data-reveal>
            <h2>관련 제품</h2>
            <p>aSV는 가상화 계층입니다. HCI와 같이 볼 조건이 있고, 같은 문장이 아닙니다. Sangfor SCP는 관리할 자원과 운영 담당의 플랫폼입니다. 관리 화면이 HCI 안에 보인다고 해서 SCP 검토가 끝난 것은 아닙니다. aDesk VDI는 사용자와 단말의 업무 화면입니다. aStor는 별도 스토리지 질문입니다.</p>
            <h2>적용 한계</h2>
            <p>이 페이지는 특정 모델의 기능 보증이 아닙니다. 포트, 호환, 버전 동작은 공식 출처의 현재 문서로 확인해야 합니다. HCI를 도입한다고 방화벽, 스위치, 서버 접근 제어가 포함되지 않습니다. BLRO의 24시간 관제나 SLA를 의미하지 않습니다. 공급이 미확정이면 미확정이라고 적습니다.</p>
          </div>
        </div>
      </section>

      <section className="rd-band">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>도입 준비</h2>
            <p>상담 전에 준비하면 좋은 것은 현재 클러스터 또는 서버 대수(대략), 주요 업무 시스템 이름, 가상화 제품명, 백업이 있는지, 중단 가능 창구입니다. 모델명이 없어도 상담은 열립니다. 잘못된 제품 ID를 견적 조건으로 저장하지 않습니다.</p>
            <h2>실재 자료</h2>
            <p>이 페이지에는 다운로드 파일이 없습니다. 승인된 한국어 자료가 연결되기 전에는 등록된 공개 파일 없음이 정직한 상태입니다.</p>
            <TodoNote>로컬 사용성 기록의 한국어 자료 3건은 과거 검증입니다. 파일명과 현재 빌드의 일치는 재확인하지 않았습니다.</TodoNote>
          </div>
          <div>
            <div className="rd-slot" data-reveal>
              <strong>제조사 공식 이미지 사용 허가 필요</strong>
              <p>저장소에서 라이선스가 확인된 제품 사진을 찾지 않았습니다. 임의 제품 사진을 넣지 않습니다.</p>
            </div>
            <div className="rd-slot" data-reveal id="talk">
              <strong>상담에 같이 보낼 것</strong>
              <p>관심 제품은 HCI입니다. 고객은 상황과 현재 환경을, 엔지니어는 버전과 증상을, 파트너는 이미 합의된 범위를 적습니다.</p>
              <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer">도입·운영 상담하기</Link>
              <p className="rd-caption">같은 골격의 나머지 제품 상세는 이번 미리보기 범위가 아닙니다. 문장을 복제하지 않습니다.</p>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}
