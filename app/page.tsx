import Link from "next/link"
import { TrackableLink } from "@/components/analytics/trackable-link"
import { LifecycleFigure } from "@/components/redesign/lifecycle-figure"
import { HciStage } from "@/components/redesign/hci-stage"
import { SecurityStage } from "@/components/redesign/security-stage"
import { DatacenterTour } from "@/components/tour/datacenter-tour"
import { SECURITY_LAYERS } from "@/lib/security-layers"
import { SituationChooser } from "@/components/redesign/situation-chooser"
import { HCI_LAYERS } from "@/lib/hci-layers"

export const HOME_HEADING = "기업 IT의 도입, 전환, 구축, 운영, 기술 지원을 역할에 맞게 연결합니다."

export default function Home() {
  return (
    <div className="home-page rd">
      <section aria-labelledby="home-heading" className="rd-hero life-scroll home-hero">
        <div className="rd-wrap rd-hero-grid">
          <div>
            <p className="rd-kicker">주식회사 베를로</p>
            <h1 className="blro-heading blro-heading--display" id="home-heading">
              {HOME_HEADING}
            </h1>
            <div className="rd-actions">
              <TrackableLink
                className="rd-btn rd-btn-primary home-action home-action--primary"
                data-testid="hero-primary-cta"
                href="/contact?type=customer-project&role=customer"
                properties={{ ctaId: "hero-customer-diagnostic", placement: "hero" }}
              >
                도입·운영 상담하기
              </TrackableLink>
              <TrackableLink
                className="rd-btn rd-btn-ghost home-action"
                href="/contact?type=partner-collaboration&role=partner"
                properties={{ ctaId: "hero-partner-path", placement: "hero" }}
              >
                협력 제안하기
              </TrackableLink>
              <Link className="rd-btn rd-btn-ghost home-action" href="/engineer">
                기술 자료 찾기
              </Link>
            </div>
            <p>
              서버 교체, 저장 증설, 업무 데스크톱, 경계 보안처럼 지금 필요한 일에서 시작하세요. 제품이 정해지지 않아도 도입부터 운영 인수, 기술 지원까지 필요한 범위를 함께 정리합니다.
            </p>
          </div>
          <LifecycleFigure />
        </div>
      </section>

      <DatacenterTour />

      <section aria-labelledby="stage-heading" className="rd-chapter hci-stage-section">
        <div className="rd-wrap">
          <h2 id="stage-heading">HCI는 네 개 층으로 구성됩니다.</h2>
          <p>층을 눌러 보세요. 각 층에서 확인할 내용을 보여 드립니다.</p>
          <HciStage layers={HCI_LAYERS} />
          <p className="rd-actions">
            <Link className="rd-btn rd-btn-primary" href="/solutions/hci">HCI 상세 보기</Link>
          </p>
        </div>
      </section>

      <section aria-labelledby="security-heading" className="rd-chapter hci-stage-section">
        <div className="rd-wrap">
          <h2 id="security-heading">보안은 접근 흐름으로 봅니다.</h2>
          <p>사용자와 장치가 애플리케이션에 닿기까지 어디서 정하고, 보고, 막고, 확인하는지를 층별로 보여 드립니다.</p>
          <SecurityStage layers={SECURITY_LAYERS} />
          <p className="rd-actions">
            <Link className="rd-btn rd-btn-primary" href="/solutions/network-security">네트워크와 보안 상세</Link>
          </p>
        </div>
      </section>

      <SituationChooser />

      <section aria-labelledby="roles-heading" className="rd-band">
        <div className="rd-wrap">
          <h2 id="roles-heading">역할을 고릅니다.</h2>
          <div className="rd-roles">
            <article className="rd-role customer" data-reveal>
              <p className="rd-who">기업 고객</p>
              <h3>도입·운영 상담하기</h3>
              <p>서버 교체, 저장, 업무 데스크톱, 경계 보안 등 현재 상황에서 시작합니다. 제품이 정해지지 않아도 필요한 도입·운영 범위를 상담할 수 있습니다.</p>
              <Link className="rd-btn rd-btn-primary" href="/customer">고객 안내 보기</Link>
            </article>
            <article className="rd-role partner" data-reveal data-stagger="1">
              <p className="rd-who">국내 파트너</p>
              <h3>협력 제안하기</h3>
              <p>공동 영업, 공동 제안과 PoC(개념 검증), 구축·운영에 필요한 고객 접점과 기술 수행 역할을 함께 정리합니다.</p>
              <Link className="rd-btn rd-btn-ghost" href="/partner">역할 표 보기</Link>
            </article>
            <article className="rd-role engineer" data-reveal data-stagger="2">
              <p className="rd-who">기술 엔지니어</p>
              <h3>기술 자료 찾기</h3>
              <p>설치, 장애, 호환과 포트에 필요한 기술 자료 및 제조사 공식 안내를 확인하고 기술 지원을 문의할 수 있습니다.</p>
              <Link className="rd-btn rd-btn-ghost" href="/engineer">자료 흐름 보기</Link>
            </article>
          </div>
        </div>
      </section>

      <section aria-labelledby="hci-door-heading" className="rd-chapter">
        <div className="rd-wrap home-close">
          <div data-reveal>
            <h2 id="hci-door-heading">HCI 도입은 현재 환경을 적는 일부터 시작합니다.</h2>
            <p>제품을 고르기 전에 지금 환경과 전환 조건을 정리하면 상담이 짧아집니다. 아래 순서로 함께 검토합니다.</p>
            <ol className="home-flow">
              <li>
                <span className="rd-idx">01</span>
                <div>
                  <strong>현재 환경 확인</strong>
                  <span>올릴 업무 시스템과 지금 가상화의 종류, 랙·전력·냉각·기존 네트워크 구분</span>
                </div>
              </li>
              <li>
                <span className="rd-idx">02</span>
                <div>
                  <strong>전환 조건 정리</strong>
                  <span>멈출 수 있는 시간과 되돌릴 조건, 백업 주기·보관 위치·복구 담당</span>
                </div>
              </li>
              <li>
                <span className="rd-idx">03</span>
                <div>
                  <strong>도입 범위 합의</strong>
                  <span>국내 공급 조건과 BLRO 수행 범위를 상담에서 정리</span>
                </div>
              </li>
            </ol>
          </div>
          <aside className="home-close__aside" data-reveal>
            <h3>함께 확인하는 제품</h3>
            <svg aria-label="HCI와 함께 확인하는 제품: aSV 가상화 계층, Sangfor SCP 자원 관리와 운영 담당, aDesk VDI 사용자와 단말의 업무 화면, aStor 별도 스토리지 구성" className="home-relations" role="img" viewBox="0 0 360 260">
              <g className="hr-lines">
                <path d="M150 100 L88 68" />
                <path d="M210 100 L272 68" />
                <path d="M150 156 L88 188" />
                <path d="M210 156 L272 188" />
              </g>
              <rect className="hr-core" height="56" rx="8" width="100" x="130" y="100" />
              <text className="hr-core-text" textAnchor="middle" x="180" y="134">HCI</text>
              {[
                ["aSV", "가상화 계층", 4, 12],
                ["Sangfor SCP", "자원 관리와 운영 담당", 188, 12],
                ["aDesk VDI", "사용자·단말의 업무 화면", 4, 188],
                ["aStor", "별도 스토리지 구성", 188, 188],
              ].map(([name, role, x, y]) => (
                <g key={String(name)}>
                  <rect className="hr-box" height="56" rx="8" width="168" x={x} y={y} />
                  <text className="hr-name" x={Number(x) + 12} y={Number(y) + 23}>{name}</text>
                  <text className="hr-role" x={Number(x) + 12} y={Number(y) + 42}>{role}</text>
                </g>
              ))}
            </svg>
            <p>각 제품과의 경계와 적용 한계는 HCI 상세에 적어 두었습니다.</p>
            <p className="rd-actions">
              <Link className="rd-btn rd-btn-primary" href="/solutions/hci">HCI 상세</Link>
              <Link className="rd-btn rd-btn-ghost" href="/contact?type=customer-project&role=customer&product=hci">HCI 상담 요청</Link>
            </p>
          </aside>
        </div>
      </section>
    </div>
  )
}
