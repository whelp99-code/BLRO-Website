import type { Metadata } from "next"
import Link from "next/link"
import { ExplainSteps } from "@/components/redesign/explain-steps"
import { canonicalMetadata } from "@/lib/site"

export const metadata: Metadata = {
  title: "기업 고객",
  description: "서버, 저장, 업무 화면과 경계에서 출발하는 도입·운영 상담입니다.",
  ...canonicalMetadata("/customer"),
}

const JOURNEY = [
  { name: "상황", summary: "서버, 저장, 업무 화면, 경계, 접근", points: ["지금 필요한 일이 서버 교체인지, 저장 증설인지, 업무 화면이나 경계 보안인지 적어 주세요.", "제품이 정해지지 않아도 됩니다."] },
  { name: "검토 대상", summary: "관련 제품 또는 제품 미정", points: ["서버 상황에서는 Sangfor HCI, aSV, GIGABYTE 서버, KAYTUS 서버를 함께 검토합니다.", "제품보다 상황부터 시작하면 미정으로 상담합니다."] },
  { name: "전환 제약", summary: "데이터 보호, 중단 가능 시간", points: ["현재 환경, 옮길 수 있는 데이터, 중단할 수 있는 시간, 되돌릴 조건, 누가 승인하는지를 상담 전에 적어 주세요.", "단순 제품 공급이라면 전환 단계 없이 공급 범위만 정리할 수 있습니다."] },
  { name: "구축과 인수", summary: "합의한 범위만", points: ["구축은 합의한 범위의 설치와 확인입니다.", "성능과 절감 효과는 확인된 범위에서만 안내합니다."] },
  { name: "운영 지원", summary: "담당, 연락, 기술 지원 경로", points: ["인수 후 담당, 기록할 항목, 기술 지원 연락 경로를 정합니다.", "지원 시간과 대응 범위는 상담에서 확인합니다."] },
] as const

const SITUATION_IDS = ["situation-server", "situation-storage", "situation-workspace"] as const

const SITUATIONS = [
  ["01", "서버를 새로 구성하거나 교체합니다", "업무 시스템이 어디에 있고, 지금 가상화와 랙·전력 제약이 무엇인지가 먼저입니다. 검토 대상은 Sangfor HCI, aSV, GIGABYTE 서버, KAYTUS 서버입니다. HCI를 검토하더라도 서버 제품군은 함께 비교해 볼 수 있습니다."],
  ["02", "저장과 증설을 검토합니다", "응답, 용량, 기존 연결, 보호 요구를 적습니다. aStor All-Flash와 Hybrid Flash는 서로 다른 질문입니다. HCI에 스토리지가 포함되는 구성이어도 별도 스토리지 검토가 필요한지 함께 확인합니다."],
  ["03", "업무 화면, 경계, 관리자 접근", "데스크톱은 사용자·애플리케이션·단말·동시 접속이 질문입니다. 방화벽과 접속 보안, 위협 대응, 서버 접근 제어는 각각 다른 상세로 갑니다. 제품보다 상황부터면 미정으로 상담합니다."],
] as const

export default function CustomerPage() {
  return (
    <article className="rd">
      <section className="rd-hero">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker" style={{ color: "var(--customer)" }}>기업 고객</p>
            <h1 className="blro-heading blro-heading--h1">상황에서 출발합니다. 제품이 정해지지 않아도 됩니다.</h1>
            <p className="rd-lead">서버 교체, 저장 증설, 업무 화면, 경계 보안처럼 지금 필요한 일에서 시작해 도입과 운영을 맡길 범위를 정리합니다.</p>
            <p>제품 공급과 구축, 기술 지원에 필요한 범위를 함께 정리합니다. 현재 환경과 요구 사항을 바탕으로 직접 수행할 범위와 협력할 역할을 상담에서 확인합니다.</p>
          </div>
          <figure className="rd-panel" data-reveal>
            <figcaption className="rd-kicker">설명 그림 · 고객 여정</figcaption>
            <ExplainSteps group="customer-journey" steps={JOURNEY} />
            <p className="rd-caption">한 제품이 여러 상황에 걸칠 수 있어, 상담에서 상황에 맞게 범위를 나눕니다.</p>
          </figure>
        </div>
      </section>

      <section className="rd-chapter" id="situations">
        <div className="rd-wrap">
          <h2>상황별 과제</h2>
          <p>제품을 정해 두지 않아도 상황에 맞는 검토 범위를 함께 잡습니다.</p>
          <div className="rd-steps">
            {SITUATIONS.map(([index, title, body]) => (
              <article className="rd-step" data-reveal data-stagger={String(Math.min(Number(index) - 1, 3))} id={SITUATION_IDS[Number(index) - 1]} key={index}>
                <div className="rd-idx">{index}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-band" id="migration">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>솔루션과 서비스</h2>
            <p>HCI 구성과 도입 조건을 상세 안내에서 확인하세요. 다른 검토 영역은 <Link href="/solutions">솔루션 목록</Link>에서 살펴볼 수 있습니다.</p>
            <p>백업·DR, 업무 자동화 등 제품 외 서비스가 필요하면 함께 상담할 수 있습니다.</p>
            <Link className="rd-btn rd-btn-primary" href="/solutions/hci">Sangfor HCI 상세</Link>
          </div>
          <div data-reveal>
            <h2>도입과 전환에서 적을 것</h2>
            <p>현재 환경, 옮길 수 있는 데이터, 중단할 수 있는 시간, 되돌릴 조건, 누가 승인하는지를 상담 전에 적으면 견적 질문이 짧아집니다. 단순 제품 공급이라면 전환 단계 없이 공급 범위만 정리할 수 있습니다.</p>
            <p>구축은 합의한 범위의 설치와 확인입니다. 성능과 절감 효과는 확인된 범위에서만 안내합니다.</p>
          </div>
        </div>
      </section>

      <section className="rd-chapter" id="ops">
        <div className="rd-wrap rd-split">
          <div data-reveal>
            <h2>운영 지원</h2>
            <p>운영 지원은 인수 후 담당, 기록할 항목, 기술 지원 연락 경로를 정하는 일입니다. 지원 시간과 대응 범위는 상담에서 확인합니다.</p>
            <p>인수 문서에 들어갈 최소 항목은 구성, 계정 권한의 주체, 백업과 복구의 담당, 알려진 예외입니다. 계정 비밀번호 원문은 웹 폼으로 받지 않습니다.</p>
          </div>
          <div className="rd-slot" data-reveal id="consult">
            <strong>상담·견적</strong>
            <p>견적 금액은 상담에서 범위를 확인한 뒤 안내합니다.</p>
            <p>박재민 · <a href="tel:010-8896-1260">010-8896-1260</a> · <a href="mailto:jm.park@blro.co.kr">jm.park@blro.co.kr</a> · 사업자등록번호 420-87-02727</p>
            <Link className="rd-btn rd-btn-primary" href="/contact?type=customer-project&role=customer">도입·운영 상담하기</Link>
            <p className="rd-caption">문의 접수 시 개인정보 처리 안내를 확인하고 동의해 주세요.</p>
          </div>
        </div>
      </section>
    </article>
  )
}
